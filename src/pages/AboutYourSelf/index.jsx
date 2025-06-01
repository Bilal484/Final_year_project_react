import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/header";
import { Helmet } from "react-helmet";
import "./AboutYourSelf.css";


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
    });    const [loading, setLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);    const location = useLocation(); // Get the location object
    const selectedDate = location.state?.date; // Access the date from state
    const notSure = location.state?.notSure;
    const p_id = location.state?.p_id;
    const seller_id = location.state?.seller_id; // Get seller_id from state
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
    };    const handleContactMethodChange = (e) => {
        const { value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            best_way_to_contact: value
        }));
    };    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError(null);
        
        const payload = {
            p_id: p_id,
            user_id: userId,
            seller_id: seller_id,
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

            const data = await response.json();
            
            if (response.ok) {
                setSubmitSuccess(true);
                // Optional: redirect after success
                // setTimeout(() => {
                //     navigate('/thank-you');
                // }, 3000);
            } else {
                setSubmitError(data.message || "Failed to submit. Please try again.");
            }
        } catch (error) {
            setSubmitError("An error occurred while submitting the form. Please try again.");
            console.error("Form submission error:", error);
        } finally {
            setLoading(false);
        }
    };return (
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
            <div className="container-fluid py-5" style={{backgroundColor: "#f8f9fa"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            {/* Form 1: Displayed by default */}
                            {!showForm2 && (                                <div className="about-yourself-container form-section">
                                    <form id="form1" onSubmit={(e) => {
                                        e.preventDefault();
                                        handleModalShow();
                                    }}>
                                        <h2 className="page-title">Tell us about yourself</h2>
                                        <p className="mb-4 text-muted">We'll use this information to match you with the right agent and personalize your experience.</p>
                                        
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="firstname" className="form-label">
                                                        <i className="fas fa-user me-2 text-muted"></i>First Name
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
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="lastname" className="form-label">
                                                        <i className="fas fa-user me-2 text-muted"></i>Last Name
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
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="email" className="form-label">
                                                        <i className="fas fa-envelope me-2 text-muted"></i>Email
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
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="phone" className="form-label">
                                                        <i className="fas fa-phone me-2 text-muted"></i>Phone
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="phone"
                                                        name="phone"
                                                        placeholder="(___) ___-____"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <small className="form-text">
                                                        By providing your phone number you consent to receive
                                                        calls/text messages from UrbanCraft REAL ESTATE about your tour.
                                                    </small>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="notes" className="form-label">
                                                <i className="fas fa-comment me-2 text-muted"></i>Notes (optional)
                                            </label>
                                            <textarea
                                                className="form-control text-area-field"
                                                id="notes"
                                                name="notes"
                                                rows="3"
                                                placeholder="Are there other times that could work for a tour? We could get you confirmed faster."
                                                value={formData.notes}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <div className="form-check">
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
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">
                                                <i className="fas fa-building me-2 text-muted"></i>
                                                Are you currently working with a real estate agent?
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

                                        <div className="form-group">
                                            <label className="form-label">
                                                <i className="fas fa-bell me-2 text-muted"></i>
                                                What's the best way to contact you? (optional)
                                            </label>
                                            <div className="contact-methods">
                                                <div 
                                                    className={`contact-method-item ${formData.best_way_to_contact === 'email' ? 'active' : ''}`}
                                                    onClick={() => handleContactMethodChange({target: {value: 'email'}})}
                                                >
                                                    <i className="fas fa-envelope"></i>
                                                    <span>Email</span>
                                                </div>
                                                <div 
                                                    className={`contact-method-item ${formData.best_way_to_contact === 'call' ? 'active' : ''}`}
                                                    onClick={() => handleContactMethodChange({target: {value: 'call'}})}
                                                >
                                                    <i className="fas fa-phone"></i>
                                                    <span>Call</span>
                                                </div>
                                                <div 
                                                    className={`contact-method-item ${formData.best_way_to_contact === 'text' ? 'active' : ''}`}
                                                    onClick={() => handleContactMethodChange({target: {value: 'text'}})}
                                                >
                                                    <i className="fas fa-comment-dots"></i>
                                                    <span>Text</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-grid mt-4">
                                            <button
                                                type="button"
                                                className="btn-next"
                                                onClick={handleModalShow}
                                                disabled={!formData.firstname || !formData.lastname || !formData.email || !formData.phone}
                                            >
                                                Continue <i className="fas fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}                            {/* Modal */}
                            <Modal
                                show={showModal}
                                onHide={handleModalClose}
                                backdrop="static"
                                keyboard={false}
                                centered
                                className="custom-modal"
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        <i className="fas fa-question-circle me-2"></i>
                                        Agent Agreement
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h5 className="modal-question">
                                        Have you signed an agreement committing you to work with your agent?
                                    </h5>
                                    <p className="modal-description">
                                        Some agents require you to sign a "buyer's agency agreement" that commits you to working 
                                        with that agent when you buy a home. Have you signed such an agreement?
                                    </p>
                                    <form>
                                        <div className="form-check mb-3">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                id="yes"
                                                name="agreement_committing_to_work_with_agent"
                                                value="1"
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="yes">
                                                Yes, I've signed an agreement
                                            </label>
                                        </div>
                                        <div className="form-check mb-4">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                id="no"
                                                name="agreement_committing_to_work_with_agent"
                                                value="0"
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="no">
                                                No, I haven't signed anything
                                            </label>
                                        </div>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="outline-secondary" onClick={handleModalClose}>
                                        <i className="fas fa-arrow-left me-2"></i> Back
                                    </Button>
                                    <button
                                        type="button"
                                        className="btn-next"
                                        onClick={handleNextClick}
                                        disabled={!formData.agreement_committing_to_work_with_agent}
                                    >
                                        Continue <i className="fas fa-arrow-right"></i>
                                    </button>
                                </Modal.Footer>
                            </Modal>                            {/* Form 2: Displayed after form 1 is submitted */}
                            {showForm2 && !submitSuccess && (
                                <div className="about-yourself-container form-section">
                                    <form onSubmit={handleSubmit}>
                                        <h2 className="page-title">Confirm Your Information</h2>
                                        <p className="mb-4 text-muted">Please review your details below before submitting.</p>
                                        
                                        <div className="row mb-4">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label text-muted">Name</label>
                                                    <p className="form-control-static fw-bold">
                                                        {formData.firstname} {formData.lastname}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label text-muted">Contact</label>
                                                    <p className="form-control-static fw-bold">
                                                        {formData.email}<br/>
                                                        {formData.phone}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group mb-4">
                                            <label className="form-label text-muted">Tour Date</label>
                                            <p className="form-control-static fw-bold">
                                                {notSure === 1 ? "Schedule to be determined" : selectedDate}
                                            </p>
                                        </div>
                                        
                                        {formData.notes && (
                                            <div className="form-group mb-4">
                                                <label className="form-label text-muted">Additional Notes</label>
                                                <p className="form-control-static">{formData.notes}</p>
                                            </div>
                                        )}
                                        
                                        <div className="form-group mb-4">
                                            <label className="form-label text-muted">Preferences</label>
                                            <ul className="list-unstyled">
                                                {formData.financing_options && (
                                                    <li><i className="fas fa-check-circle text-success me-2"></i> Interest in financing options</li>
                                                )}
                                                <li>
                                                    <i className="fas fa-check-circle text-success me-2"></i> 
                                                    Working with agent: {formData.working_as_realstate_agent === "1" ? "Yes" : "No"}
                                                </li>
                                                {formData.best_way_to_contact && (
                                                    <li>
                                                        <i className="fas fa-check-circle text-success me-2"></i> 
                                                        Preferred contact method: {formData.best_way_to_contact}
                                                    </li>
                                                )}
                                                <li>
                                                    <i className="fas fa-check-circle text-success me-2"></i> 
                                                    Signed agent agreement: {formData.agreement_committing_to_work_with_agent === "1" ? "Yes" : "No"}
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        {submitError && (
                                            <div className="alert alert-danger" role="alert">
                                                <i className="fas fa-exclamation-circle me-2"></i>
                                                {submitError}
                                            </div>
                                        )}
                                        
                                        <div className="d-flex gap-3 mt-4">
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowForm2(false)}
                                                disabled={loading}
                                            >
                                                <i className="fas fa-arrow-left me-2"></i> Back
                                            </button>
                                            <button 
                                                type="submit" 
                                                className="btn-submit"
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-check me-2"></i> Submit
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                            
                            {/* Success message */}
                            {submitSuccess && (
                                <div className="about-yourself-container form-section">
                                    <div className="text-center py-5">
                                        <div className="mb-4">
                                            <i className="fas fa-check-circle text-success" style={{ fontSize: '5rem' }}></i>
                                        </div>
                                        <h2 className="page-title text-center">Thank You!</h2>
                                        <p className="mb-4">Your tour request has been submitted successfully.</p>
                                        <p className="mb-4">
                                            A UrbanCraft REAL ESTATE agent will contact you soon to confirm your tour details.
                                        </p>
                                        <div className="mt-5">
                                            <Link to="/" className="btn-next">
                                                <i className="fas fa-home me-2"></i> Return to Home
                                            </Link>
                                        </div>
                                    </div>
                                </div>
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
