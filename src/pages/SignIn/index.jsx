import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { 
    FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle, 
    FaArrowRight, FaArrowLeft, FaGoogle, FaFacebookF, FaApple, 
    FaUserTag, FaHome, FaTags, FaChartLine, FaKey, FaQuestionCircle, 
    FaCloudUploadAlt 
} from "react-icons/fa";
import {
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple,
} from "../../authMethods";
import ZnetLogo from "../../assets/images/FYP_ Logo/FYP_ Logo/Header Logo.png";
import { motion } from "framer-motion";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role_id: "",
        password: "",
        questions: [],
        answers: [],
        customAnswersEnabled: {},
    });

    const [roles, setRoles] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    useEffect(() => {
        // Fetch roles immediately when the component mounts
        fetchRoles();
    }, []);

    const registerUser = async (payload) => {
        setIsLoading(true);
        try {
            const response = await fetch("https://apitourism.today.alayaarts.com/api/register", {
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
        } finally {
            setIsLoading(false);
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

    const handleSocialLogin = (loginFunction, provider) => {
        setIsLoading(true);
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

                toast.info(`Connected with ${provider}. Please complete your registration.`);
                // Fetch roles and questions based on defaults or ask user to choose
                fetchRoles();
                setCurrentStep(2); // Move to role selection
            })
            .catch((error) => {
                console.error(`${provider} login error:`, error);
                toast.error(`Login failed: ${error.message}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const fetchRoles = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("https://apitourism.today.alayaarts.com/api/get-roles");
            const data = await response.json();
            if (response.ok) {
                const availableRoles = data.roles || [];

                const preferredRoles = ["seller", "buyer", "agent"];

                const filteredRoles = preferredRoles
                    .map(preferred => availableRoles.find(role => role.role_name.toLowerCase() === preferred))
                    .filter(role => role);

                setRoles(filteredRoles);
            } else {
                throw new Error("Failed to fetch roles");
            }
        } catch (error) {
            toast.error("Unable to fetch roles.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchQuestions = async (roleName) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://apitourism.today.alayaarts.com/api/get-questions/${roleName}`
            );
            const data = await response.json();
            if (response.ok) {
                setQuestions(data.questions || []);
                setCurrentStep(3); // Move to questions after role selection
            } else {
                throw new Error("Failed to fetch questions");
            }
        } catch (error) {
            toast.error("Unable to fetch questions. Please try again later.");
        } finally {
            setIsLoading(false);
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

    const nextStep = () => {
        if (currentStep === 1) {
            // Validate personal info
            if (!formData.name || !formData.email || !formData.password) {
                toast.error("Please fill in all required fields");
                return;
            }
            setCurrentStep(2);
        } else if (currentStep === 2) {
            // Validate role selection
            if (!formData.role_id) {
                toast.error("Please select a role");
                return;
            }
            const selectedRole = roles.find((role) => role.id === parseInt(formData.role_id));
            if (selectedRole) {
                fetchQuestions(selectedRole.role_name);
            }
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <>
            <Helmet>
                <title>Sign Up | UrbanCraft REAL ESTATE</title>
                <meta
                    name="description"
                    content="Sign up to UrbanCraft REAL ESTATE for access to top real estate services, role-based customization, and personalized solutions. Register now!"
                />
                <meta
                    name="keywords"
                    content="Znet, Sign Up, Real Estate Services, Registration, Role-based Access"
                />
                <meta name="author" content="UrbanCraft REAL ESTATE Corporation" />
            </Helmet>
            <main className="auth-background">
                <div className="auth-container">
                    <motion.div
                        className="auth-card signup-card"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.div className="logo-container " variants={itemVariants}>
                            <Link to="/">
                                <img
                                    src={ZnetLogo}
                                    alt="UrbanCraft REAL ESTATE Logo"
                                    className="auth-logo"
                                />
                            </Link>
                            <div className="logo-shine"></div>
                        </motion.div>

                        <motion.div className="auth-tabs" variants={itemVariants}>
                            <Link
                                className="auth-tab"
                                to="/Login"
                            >
                                Sign In
                            </Link>
                            <Link
                                className="auth-tab auth-tab-active"
                                to="/SignUp"
                            >
                                New Account
                            </Link>
                        </motion.div>

                        <motion.div className="signup-progress" variants={itemVariants}>
                            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
                                <span className="step-number">1</span>
                                <span className="step-name">Personal Info</span>
                            </div>
                            <div className="progress-line"></div>
                            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
                                <span className="step-number">2</span>
                                <span className="step-name">Role</span>
                            </div>
                            <div className="progress-line"></div>
                            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
                                <span className="step-number">3</span>
                                <span className="step-name">Questions</span>
                            </div>
                        </motion.div>

                        <motion.form
                            onSubmit={handleSubmit}
                            variants={itemVariants}
                        >
                            {currentStep === 1 && (
                                <motion.div
                                    className="form-step"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >                                    <div className="form-group">
                                        <label htmlFor="name">
                                            <FaUser /> Full Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            <FaEnvelope /> Email Address
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>                                    <div className="form-group">
                                        <label htmlFor="password">
                                            <FaLock /> Password
                                        </label>
                                        <div className="password-input-container">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                id="password"
                                                placeholder="Create a password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="password-toggle-btn"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>                                        <div className="password-requirements">
                                            <div className="req-item">
                                                <FaCheckCircle />
                                                <span>At least 8 characters</span>
                                            </div>
                                            <div className="req-item">
                                                <FaCheckCircle />
                                                <span>Mix of letters and numbers</span>
                                            </div>
                                            <div className="req-item">
                                                <FaCheckCircle />
                                                <span>At least 1 special character</span>
                                            </div>
                                            <div className="req-item">
                                                <FaCheckCircle />
                                                <span>At least 1 uppercase letter</span>
                                            </div>
                                        </div>
                                    </div>                                    <div className="form-buttons">
                                        <button
                                            type="button"
                                            className="auth-submit-btn"
                                            onClick={nextStep}
                                        >
                                            Next <FaArrowRight />
                                        </button>
                                    </div>

                                    <div className="social-login-container">
                                        <div className="social-divider">
                                            <span>Or sign up with</span>
                                        </div>

                                        <div className="social-buttons">                                            <button
                                                type="button"
                                                onClick={() => handleSocialLogin(signInWithGoogle, "Google")}
                                                className="social-btn google-btn"
                                                disabled={isLoading}
                                            >
                                                <FaGoogle />
                                                <span className="social-btn-text">Google</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleSocialLogin(signInWithFacebook, "Facebook")}
                                                className="social-btn facebook-btn"
                                                disabled={isLoading}
                                            >
                                                <FaFacebookF />
                                                <span className="social-btn-text">Facebook</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleSocialLogin(signInWithApple, "Apple")}
                                                className="social-btn apple-btn"
                                                disabled={isLoading}
                                            >
                                                <FaApple />
                                                <span className="social-btn-text">Apple</span>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    className="form-step"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >                                    <div className="form-group role-selection">
                                        <label htmlFor="role_id">
                                            <FaUserTag /> Select Your Role
                                        </label>
                                        <div className="role-options">
                                            {roles.map((role) => (
                                                <div
                                                    key={role.id}
                                                    className={`role-option ${parseInt(formData.role_id) === role.id ? 'selected' : ''}`}
                                                    onClick={() => setFormData({ ...formData, role_id: role.id.toString() })}
                                                >
                                                    <div className="role-icon">
                                                        {role.role_name === 'buyer' && <FaHome />}
                                                        {role.role_name === 'seller' && <FaTags />}
                                                        {role.role_name === 'contractor' && <FaChartLine />}
                                                        {role.role_name === 'agent' && <FaKey />}
                                                    </div>
                                                    <div className="role-info">
                                                        <h4>{role.role_name}</h4>
                                                        <p>
                                                            {role.role_name === 'buyer' && "I'm looking to purchase property"}
                                                            {role.role_name === 'seller' && "I want to sell my property"}
                                                            {role.role_name === 'contractor' && "I'm interested in contracting opportunities"}
                                                            {role.role_name === 'agent' && "I'm a real estate professional"}
                                                        </p>
                                                    </div>
                                                    <div className="role-check">
                                                        {parseInt(formData.role_id) === role.id && <FaCheckCircle />}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>                                    <div className="form-buttons">
                                        <button
                                            type="button"
                                            className="auth-back-btn"
                                            onClick={prevStep}
                                        >
                                            <FaArrowLeft /> Back
                                        </button>
                                        <button
                                            type="button"
                                            className="auth-submit-btn"
                                            onClick={nextStep}
                                            disabled={!formData.role_id}
                                        >
                                            Next <FaArrowRight />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div
                                    className="form-step"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="questions-container">
                                        {questions.length === 0 ? (                                            <div className="no-questions">
                                                <FaQuestionCircle />
                                                <p>No questions available for this role.</p>
                                            </div>
                                        ) : (
                                            questions.map((question, qIndex) => (
                                                <div key={question.id} className="question-card">
                                                    <h4 className="question-text">
                                                        <span className="question-number">{qIndex + 1}</span>
                                                        {question.question}
                                                    </h4>
                                                    <div className="options-container">
                                                        {question.options.map((option) => (
                                                            <div key={option.id} className="option-item">
                                                                <label className="custom-checkbox">
                                                                    <input
                                                                        type="checkbox"
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
                                                                    <span className="checkmark"></span>
                                                                    {option.img ? (
                                                                        <div className="option-img-container">
                                                                            <img src={option.img} alt={option.option_value} />
                                                                        </div>
                                                                    ) : (
                                                                        <span className="option-text">{option.option_value}</span>
                                                                    )}
                                                                </label>
                                                            </div>
                                                        ))}

                                                        {/* Other option */}
                                                        {question.options.find(opt => opt.option_value.toLowerCase().includes("yes")) && (
                                                            <div className="option-item">
                                                                <label className="custom-checkbox">
                                                                    <input
                                                                        type="checkbox"
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
                                                                    <span className="checkmark"></span>
                                                                    <span className="option-text">Other (Please Specify)</span>
                                                                </label>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Custom input fields */}
                                                    {formData.answers
                                                        .find((ans) => ans.question_id === question.id)
                                                        ?.answer_id.some(
                                                            (selectedAnswer) =>
                                                                selectedAnswer === "Other" ||
                                                                selectedAnswer.includes("[")
                                                        ) && (
                                                            <div className="custom-answer">
                                                                <input
                                                                    type="text"
                                                                    className="form-control custom-input"
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
                                                            </div>
                                                        )}

                                                    {formData.answers
                                                        .find((ans) => ans.question_id === question.id)
                                                        ?.answer_id.some(
                                                            (selectedAnswer) =>
                                                                selectedAnswer.includes("Budget")
                                                        ) && (
                                                            <div className="custom-answer">
                                                                <input
                                                                    type="number"
                                                                    className="form-control custom-input"
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
                                                            </div>
                                                        )}

                                                    {/* File upload */}
                                                    {question?.question?.includes("upload") && (                                                        <div className="file-upload-container">
                                                            <label className="file-upload">
                                                                <FaCloudUploadAlt />
                                                                <span>Upload File</span>
                                                                <input type="file" />
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>                                    <div className="form-buttons">
                                        <button
                                            type="button"
                                            className="auth-back-btn"
                                            onClick={prevStep}
                                        >
                                            <FaArrowLeft /> Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="auth-submit-btn"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Registering...
                                                </>
                                            ) : (
                                                <>
                                                    Complete Registration <FaCheckCircle />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.form>

                        <motion.div className="auth-footer" variants={itemVariants}>
                            <p>
                                By signing up, you agree to our{" "}
                                <Link to="/terms-of-service">Terms of Service</Link> &{" "}
                                <Link to="/privacy-policy">Privacy Policy</Link>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </main>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default SignUp;
