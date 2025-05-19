import React, { useState } from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import "./LicenseVerification.css"; 
function LicenseVerification() {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        licenseNumber: '',
        state: ''
    });
    const [formErrors, setFormErrors] = useState({});

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate form data
    const validateForm = () => {
        let errors = {};
        if (!formData.name) {
            errors.name = 'Name is required';
        }
        if (!formData.licenseNumber) {
            errors.licenseNumber = 'License number is required';
        }
        if (!formData.state) {
            errors.state = 'State is required';
        }
        return errors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            // Open the modal if no errors
            setShowModal(true);
        }
    };

    // Close modal and redirect back to this page
    const handleCloseModal = () => {
        setShowModal(false);
        window.location.href = "/Licenese-Verifications"; // Adjust path if necessary
    };

    return (
        <>
        <Helmet>
                <title>License Verification - UrbanCraft REAL ESTATE</title>
                <meta name="description" content="Verify real estate licenses through UrbanCraft REAL ESTATE's quick and secure verification portal." />
                <meta name="keywords" content="real estate, license verification, UrbanCraft REAL ESTATE, professional verification, state license" />
            </Helmet>
            <Header />
            <div className="license-verification-page">
                {/* Main Content Section */}
                <Container className="main-content">
                    <Row className="text-center">
                        <Col>
                            <h2 className="content-title">Verify a Real Estate Agent's License</h2>
                            <p className="content-description">
                                Please submit your details below to proceed with the verification process.
                            </p>

                            {/* License Submission Form */}
                            <Form onSubmit={handleSubmit} className="license-form">
                                <Form.Group controlId="formName">
                                    <Form.Label className='text-start my-3'>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        isInvalid={!!formErrors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formLicenseNumber">
                                    <Form.Label className='text-start my-3'>License Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="licenseNumber"
                                        value={formData.licenseNumber}
                                        onChange={handleInputChange}
                                        placeholder="Enter your license number"
                                        isInvalid={!!formErrors.licenseNumber}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.licenseNumber}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formState">
                                    <Form.Label className='text-start my-3'>State</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        placeholder="Enter your state"
                                        isInvalid={!!formErrors.state}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.state}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Submit Button */}
                                <Button className='mt-3' variant="primary" type="submit">
                                    Submit & Verify License
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>

                {/* Modal for License Verification */}
                <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>License Verification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Iframe displaying the ARELLO license verification page */}
                        <iframe
                            src="https://www.arello.com/search/"
                            title="License Verification"
                            width="100%"
                            height="500"
                            style={{ border: '1px solid #ccc' }}
                            allowFullScreen
                        ></iframe>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Custom Footer
                <footer className="custom-footer">
                    <Container>
                        <Row>
                            <Col>
                                <p>© 2024 UrbanCraft REAL ESTATE. All Rights Reserved.</p>
                            </Col>
                        </Row>
                    </Container>
                </footer> */}
            </div>
            <Footer />
        </>
    );
}

export default LicenseVerification;
