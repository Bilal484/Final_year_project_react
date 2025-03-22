import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import {
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple,
} from "../../authMethods";
import ZnetLogo from "../../assets/images/PNG Logo Files/Transparent Logo NameLess.png";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role_id: "",
        password: "",
        questions: [], // Ensure this is part of your formData if questions are dynamic per user
        answers: [],
        customAnswersEnabled: {}, // Tracks whether custom answers are enabled for each question
    });

    const [roles, setRoles] = useState([]);
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch roles immediately when the component mounts
        fetchRoles();
    }, []);

    const registerUser = async (payload) => {
        try {
            const response = await fetch("https://api.biznetusa.com/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                // Save user details in local storage
                localStorage.setItem("user_id", data.id);
                localStorage.setItem("user_email", data.email);
                localStorage.setItem("roles", data.user_role);
                localStorage.setItem("permissions", JSON.stringify(data.permissions));

                toast.success("Registration successful!");
                navigate("/login", { state: { user_id: data.user_id } });
            } else {
                toast.error(data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("An error occurred during registration.");
        }
    };

    const handleCustomAnswerToggle = (questionId) => {
        setFormData((prevState) => ({
            ...prevState,
            customAnswersEnabled: {
                ...prevState.customAnswersEnabled,
                [questionId]: !prevState.customAnswersEnabled[questionId],
            },
        }));
    };

    const handleSocialLogin = (loginFunction) => {
        loginFunction()
            .then((response) => {
                const { displayName, email, uid } = response;
                // Pre-fill the formData with social login details
                setFormData((prevState) => ({
                    ...prevState,
                    name: displayName,
                    email: email,
                    password: uid, // Use UID as a placeholder password
                }));
                // Prompt the user to continue filling in additional required fields
                alert("Please select your role and answer the required questions.");
                // Fetch roles and questions based on defaults or ask user to choose
                fetchRoles();
                fetchQuestions("default_role"); // Modify this if role selection affects available questions
            })
            .catch((error) => {
                console.error("Login error:", error);
                alert(`Login failed: ${error.message}`);
            });
    };

    const fetchRoles = async () => {
        try {
            const response = await fetch("https://api.biznetusa.com/api/get-roles");
            const data = await response.json();
            if (response.ok) {
                setRoles(data.roles || []);
            } else {
                throw new Error("Failed to fetch roles");
            }
        } catch (error) {
            toast.error("Unable to fetch roles.");
        }
    };

    const fetchQuestions = async (roleName) => {
        try {
            const response = await fetch(
                `https://api.biznetusa.com/api/get-questions/${roleName}`
            );
            const data = await response.json();
            if (response.ok) {
                setQuestions(data.questions || []);
            } else {
                throw new Error("Failed to fetch questions");
            }
        } catch (error) {
            toast.error("Unable to fetch questions. Please try again later.");
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));

        if (id === "role_id") {
            const selectedRole = roles.find((role) => role.id === parseInt(value));
            if (selectedRole) {
                fetchQuestions(selectedRole.role_name);
            }
        }
    };

    const handleAnswerChange = (questionId, selectedValue, isChecked) => {
        setFormData((prevState) => {
            const existingAnswer = prevState.answers.find(
                (ans) => ans.question_id === questionId
            );

            // Update the selected options
            const updatedAnswers = existingAnswer
                ? prevState.answers.map((ans) =>
                    ans.question_id === questionId
                        ? {
                            ...ans,
                            answer_id: isChecked
                                ? [...ans.answer_id, selectedValue] // Add the selected value
                                : ans.answer_id.filter((value) => value !== selectedValue), // Remove the deselected value
                            isCustom: ans.isCustom || selectedValue === "Other",
                            customAnswer:
                                selectedValue === "Other" && !isChecked
                                    ? undefined
                                    : ans.customAnswer, // Clear custom answer if "Other" is deselected
                        }
                        : ans
                )
                : [
                    ...prevState.answers,
                    {
                        question_id: questionId,
                        answer_id: [selectedValue],
                        isCustom: selectedValue === "Other",
                        customAnswer: selectedValue === "Other" ? "" : undefined,
                    },
                ];

            return { ...prevState, answers: updatedAnswers };
        });
    };

    const handleAnswerupdate = (questionId, answerId) => {
        const containsBracket = answerId.includes("Budget");
        setFormData((prevState) => {
            const updatedAnswers = prevState.answers.filter(
                (ans) => ans.question_id !== questionId
            );
            updatedAnswers.push({
                question_id: questionId,
                answer_id: answerId,
                isCustom: answerId === "Other" || containsBracket,
                customAnswer: answerId === "Other" || containsBracket ? "" : undefined,
            });
            return {
                ...prevState,
                answers: updatedAnswers,
            };
        });
    };

    const handleCustomAnswerInput = (questionId, value) => {
        setFormData((prevState) => {
            const updatedAnswers = prevState.answers.map((ans) =>
                ans.question_id === questionId ? { ...ans, customAnswer: value } : ans
            );
            return { ...prevState, answers: updatedAnswers };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, role_id, password, answers } = formData;

        if (!role_id || answers.length === 0) {
            toast.error(
                "Please make sure you have selected a role and answered all questions."
            );
            return;
        }

        // Ensure only the first selected answer for each question is included in the payload
        const processedAnswers = answers.map((ans) => ({
            question_id: ans.question_id,
            answer_id: ans.answer_id[0], // Only include the first selected answer
            isCustom: ans.isCustom,
            customAnswer: ans.isCustom ? ans.customAnswer : undefined,
        }));

        const payload = {
            name,
            email,
            user_role: role_id,
            password,
            answers: processedAnswers,
        };

        registerUser(payload);
    };

    return (
        <>
            <Helmet>
                <title>Sign Up | Znet</title>
                <meta
                    name="description"
                    content="Sign up to Znet for access to top real estate services, role-based customization, and personalized solutions. Register now!"
                />
                <meta
                    name="keywords"
                    content="Znet, Sign Up, Real Estate Services, Registration, Role-based Access"
                />
                <meta name="author" content="Znet Corporation" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Sign Up | Znet" />
                <meta
                    property="og:description"
                    content="Join Znet and access top-tier real estate services, tailored to your needs."
                />
                <meta
                    property="og:image"
                    content="https://example.com/path-to-signup-page-image.jpg"
                />
                <meta property="og:url" content="https://znet.com/signup" />
                <meta property="og:type" content="website" />
            </Helmet>
            <main className="background_color_fixed">
                <ToastContainer />
                <div className="d-flex align-items-center justify-content-center min-vh-100">
                    <div
                        className="card body_color shadow-lg p-4"
                        style={{ width: "32rem" }}
                    >
                        <img
                            src={ZnetLogo}
                            alt="Znet Logo"
                            className="mx-auto"
                            style={{ width: "100px" }}
                        />
                        {/* <h2 className="h4 fw-bold text-center mb-4">Welcome to Znet</h2> */}
                        <div className="my-3 d-flex justify-content-center align-items-center gap-0 ">
                            <Link
                                className="btn btn-primary text-decoration-none w-50"
                                style={{ backgroundColor: `var(--color)` }}
                                to="/Login"
                            >
                                <h3 className="h6 fw-semibold  m-0 text-white">Sign In</h3>
                            </Link>
                            <Link
                                className="btn btn-primary text-decoration-none w-50"
                                style={{ backgroundColor: "var(--background_color)" }}
                                to="/SignUp"
                            >
                                <h3 className="h6 fw-semibold  m-0 text-decoration-none  text-white">
                                    New Account
                                </h3>
                            </Link>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="role_id" className="form-label">
                                    User Role
                                </label>
                                <select
                                    className="form-control"
                                    id="role_id"
                                    value={formData.role_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a role</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.role_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {questions.map((question) => (
                                <div key={question.id} className="mb-3">
                                    <label className="form-label">{question.question}</label>
                                    <div>
                                        {question.options.map((option) => (
                                            <>
                                                <div key={option.id} className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={`option-${option.id}`}
                                                        value={option.option_value}
                                                        checked={
                                                            formData.answers
                                                                .find((ans) => ans.question_id === question.id)
                                                                ?.answer_id.includes(option.option_value) || false
                                                        }
                                                        onChange={(e) =>
                                                            handleAnswerChange(
                                                                question.id,
                                                                option.option_value,
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                    {option.img ?
                                                        <img src={option.img} alt="" style={{ width: "300px" }} />
                                                        :
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`option-${option.id}`}
                                                        >
                                                            {option.option_value}
                                                        </label>
                                                    }
                                                </div>

                                            </>
                                        ))}

                                        {question?.question?.includes("upload") && (
                                            <Form.Group controlId="formFileUpload">
                                                <Form.Label>Upload File</Form.Label>
                                                <Form.Control type="file" />
                                            </Form.Group>
                                        )}
                                        {/* Render "Other" option */}
                                        {question.options.find(opt => opt.option_value.toLowerCase().includes("yes"))
                                            &&
                                            < div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`option-other-${question.id}`}
                                                    value="Other"
                                                    checked={
                                                        formData.answers
                                                            .find((ans) => ans.question_id === question.id)
                                                            ?.answer_id.includes("Other") || false
                                                    }
                                                    onChange={(e) =>
                                                        handleAnswerChange(
                                                            question.id,
                                                            "Other",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`option-other-${question.id}`}
                                                >
                                                    Other (Please Specify)
                                                </label>
                                            </div>
                                        }

                                        {/* Render custom input field if "Other" is selected */}
                                        {formData.answers
                                            .find((ans) => ans.question_id === question.id)
                                            ?.answer_id.some(
                                                (selectedAnswer) =>
                                                    selectedAnswer === "Other" ||
                                                    selectedAnswer.includes("[")
                                            ) && (
                                                <input
                                                    type="text"
                                                    className="form-control mt-2"
                                                    placeholder="Provide details for your selection"
                                                    value={
                                                        formData.answers.find(
                                                            (ans) => ans.question_id === question.id
                                                        )?.customAnswer || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleCustomAnswerInput(question.id, e.target.value)
                                                    }
                                                />
                                            )}

                                        {formData.answers
                                            .find((ans) => ans.question_id === question.id)
                                            ?.answer_id.some(
                                                (selectedAnswer) =>
                                                    selectedAnswer.includes("Budget")
                                            ) && (
                                                <input
                                                    type="number"
                                                    className="form-control mt-2"
                                                    placeholder="Enter your budget"
                                                    value={
                                                        formData.answers.find(
                                                            (ans) => ans.question_id === question.id
                                                        )?.customAnswer || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleCustomAnswerInput(question.id, e.target.value)
                                                    }
                                                />
                                            )}
                                    </div>

                                    {/* Display selected options */}
                                    < div className="mt-2" >
                                        <strong>Selected Options:</strong>{" "}
                                        < ul >
                                            {
                                                formData.answers
                                                    .find((ans) => ans.question_id === question.id)
                                                    ?.answer_id.map((selectedOption, index) => (
                                                        <li key={index}>{selectedOption}</li>
                                                    ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ))}

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <div className="password_control">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <ul className="form-text d-flex flex-column py-3 px-3">
                                        <li>At least 8 characters.</li>
                                        <li>Mix of letters and numbers.</li>
                                        <li>At least 1 special character.</li>
                                        <li>At least 1 lowercase letter.</li>
                                        <li>At least 1 uppercase letter.</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-center mt-3">
                                By submitting, I accept Znet{" "}
                                <a href="#" className="text-decoration -underline">
                                    terms of use
                                </a>
                                .
                            </p>
                            <button type="submit" className="btn btn-primary w-100">
                                Register
                            </button>
                        </form>

                        <div className="my-4 border-top text-center pt-3">
                            <p>Or connect with:</p>
                            <div className="d-flex flex-row gap-3">
                                <button
                                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                                    style={{ flexGrow: "1" }}
                                    onClick={() => handleSocialLogin(signInWithApple)}
                                >
                                    <i className="fab fa-apple fs-3 py-1" />
                                </button>
                                <button
                                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                                    style={{ flexGrow: "1" }}
                                    onClick={() => handleSocialLogin(signInWithGoogle)}
                                >
                                    <i className="fab fa-google fs-4 py-1" />
                                </button>
                                <button
                                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                                    style={{ flexGrow: "1" }}
                                    onClick={() => handleSocialLogin(signInWithFacebook)}
                                >
                                    <i className="fab fa-facebook-f fs-3 py-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
            </main >
        </>
    );
};

export default SignUp;
