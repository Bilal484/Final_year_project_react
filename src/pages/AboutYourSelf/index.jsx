import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/header";
import { Helmet } from "react-helmet";


const AboutYourSelf = () => {
    const [showModal, setShowModal] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        notes: "",
        financing_options: false,
        working_as_realstate_agent: "",
        best_way_to_contact: "",
        agreement_committing_to_work_with_agent: "",
    });

    const location = useLocation(); // Get the location object
    const selectedDate = location.state?.date; // Access the date from state
    const notSure = location.state?.notSure;
    const p_id = location.state?.p_id;
    const userId = localStorage.getItem("user_id"); // Get user_id from local storage

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    const handleNextClick = () => {
        setShowForm2(true);
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleContactMethodChange = (e) => {
        const { value } = e.target;
        setFormData((prevState) => {
            const currentMethods = prevState.best_way_to_contact;
            if (currentMethods.includes(value)) {
                return {
                    ...prevState,
                    best_way_to_contact: currentMethods.filter(
                        (method) => method !== value
                    ),
                };
            } else {
                return { ...prevState, best_way_to_contact: value };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            p_id: p_id,
            user_id: userId,
            date: selectedDate,
            not_sure_about_this_schedule: notSure,
            ...formData,
        };

        try {
            const response = await fetch(
                "https://apitourism.today.alayaarts.com/api/store-tourinperson",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (response.ok) {
                // Handle success (e.g., show a success message or redirect)
                alert("Form submitted successfully!");
            } else {
                // Handle error (e.g., show an error message)
                alert("Failed to submit the form.");
            }
        } catch (error) {
            alert("An error occurred while submitting the form.");
        }
    };

    return (
        <>
         <Helmet>
                <title>About Yourself - UrbanCraft REAL ESTATE</title>
                <meta name="description" content="Tell us about yourself to help us find the best real estate options for you. Fill out the form to provide your details and preferences." />
                <meta name="keywords" content="UrbanCraft REAL ESTATE, about yourself, real estate form, client information, real estate services" />
                <meta property="og:title" content="About Yourself - UrbanCraft REAL ESTATE" />
                <meta property="og:description" content="Provide your personal and contact information to let us tailor our real estate services to your needs." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="/path/to/image.jpg" /> 
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About Yourself - UrbanCraft REAL ESTATE" />
                <meta name="twitter:description" content="Complete our form to start your personalized real estate experience with UrbanCraft REAL ESTATE." />
                <meta name="twitter:image" content="/path/to/image.jpg" /> 
            </Helmet>
            <Header />
            <div className="container-fluid">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            {/* Form 1: Displayed by default */}
                            {!showForm2 && (
                                <form id="form1" onSubmit={handleSubmit}>
                                    <h2>Tell us a little about yourself</h2>
                                    <div className="mb-3 d-flex gap-4 flex-column">
                                        <div>
                                            <label htmlFor="firstname" className="form-label">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstname"
                                                name="firstname"
                                                placeholder="Enter Your First Name"
                                                value={formData.firstname}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lastname" className="form-label">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastname"
                                                name="lastname"
                                                placeholder="Enter Your Last Name"
                                                value={formData.lastname}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                placeholder="Enter Your Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="form-label">
                                                Phone
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phone"
                                                name="phone"
                                                placeholder="(   )   -   "
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-text">
                                            By providing your phone number you consent to receive
                                            calls/text messages from UrbanCraft REAL ESTATE about your tour.
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="notes" className="form-label">
                                            Notes (optional)
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="notes"
                                            name="notes"
                                            rows="3"
                                            placeholder="Are there other times that could work for a tour? We could get you confirmed faster."
                                            value={formData.notes}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="financingOptions"
                                            name="financing_options"
                                            checked={formData.financing_options}
                                            onChange={handleChange}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="financingOptions"
                                        >
                                            I want to learn about financing options
                                        </label>
                                    </div>

                                    <div className="mb-3">
                                        <label>
                                            Are you currently working with a real estate agent to help
                                            you buy a home?
                                        </label>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="working_as_realstate_agent"
                                                id="noAgent"
                                                value="0"
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="noAgent">
                                                No
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="working_as_realstate_agent"
                                                id="yesAgent"
                                                value="1"
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="yesAgent">
                                                Yes
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mb-3 d-flex flex-column">
                                        <label className="form-label">
                                            What's the best way to contact you? (optional)
                                        </label>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="contactEmail"
                                                value="email"
                                                onChange={handleContactMethodChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="contactEmail"
                                            >
                                                Email
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="contactCall"
                                                value="call"
                                                onChange={handleContactMethodChange}
                                            />
                                            <label className="form-check-label" htmlFor="contactCall">
                                                Call
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="contactText"
                                                value="text"
                                                onChange={handleContactMethodChange}
                                            />
                                            <label className="form-check-label" htmlFor="contactText">
                                                Text
                                            </label>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-outline-info"
                                        onClick={handleModalShow}
                                    >
                                        Next
                                    </button>
                                </form>
                            )}

                            {/* Modal */}
                            <Modal
                                show={showModal}
                                onHide={handleModalClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Tell us a little about yourself</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="container">
                                        <h5>
                                            Have you signed an agreement committing you to work with
                                            your agent?
                                        </h5>
                                        <p>
                                            Some agents require you to sign a "buyer's agency
                                            agreement" that commits you to working with that agent
                                            when you buy a home. Have you signed such an agreement?
                                        </p>
                                        <form>
                                            <div className="mb-3 form-check">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    id="yes"
                                                    name="agreement_committing_to_work_with_agent"
                                                    value="1"
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label" htmlFor="yes">
                                                    Yes
                                                </label>
                                            </div>
                                            <div className="mb-3 form-check">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    id="no"
                                                    name="agreement_committing_to_work_with_agent"
                                                    value="0"
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label" htmlFor="no">
                                                    No
                                                </label>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-outline-info"
                                                onClick={handleNextClick}
                                            >
                                                Next
                                            </button>
                                        </form>
                                    </div>
                                </Modal.Body>
                            </Modal>

                            {/* Form 2: Displayed after form 1 is submitted */}
                            {showForm2 && (
                                <form onSubmit={handleSubmit}>
                                    <h2>Additional Information</h2>
                                    <p>
                                        Please review your information and click submit to confirm.
                                    </p>
                                    <button type="submit" className="btn btn-success">
                                        Submit
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutYourSelf;
