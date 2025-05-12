import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './HousingSubscriptionForm.css';
import axios from "axios";
import { Helmet } from "react-helmet";
import { TranslateText } from "../../translation";

const HousingSubscriptionForm = () => {
    const [email, setEmail] = useState("");
    const [getEmails, setGetEmails] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://apitourism.today.alayaarts.com/api/store-email-alerts", {
                email,
                get_emails: getEmails,
            });
            if (response.status === 200) {
                toast.success("You have successfully subscribed to email alerts!");
                setEmail("");
                setGetEmails(false);
            } else {
                toast.error("Failed to subscribe. Please try again later.");
            }
        } catch (error) {
            toast.error("Failed to subscribe. Please try again later.");
        }
    };

    return (
        <>
            <Helmet>
                <title>Subscribe for Housing Alerts - UrbanCraft REAL ESTATE</title>
                <meta
                    name="description"
                    content="Stay updated with the latest housing news, tips, and exclusive offers. Subscribe to UrbanCraft REAL ESTATE's email alerts today!"
                />
                <meta
                    name="keywords"
                    content="Housing Alerts, Real Estate News, Email Subscription, Housing Listings"
                />
                <meta property="og:title" content="Subscribe for Housing Alerts - UrbanCraft REAL ESTATE" />
                <meta
                    property="og:description"
                    content="Get the latest housing updates and exclusive offers directly in your inbox. Subscribe now and stay informed."
                />
                <meta
                    property="og:image"
                    content="/path/to/default-subscription-banner.jpg"
                />
                <meta name="author" content="UrbanCraft REAL ESTATE Team" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <Container fluid className="subscription-section py-5 bg-light">
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
                <Row className="justify-content-center align-items-center p-4">
                    <Col lg={6} md={8} sm={12} className="text-center">
                        <h2 className="mb-4"><TranslateText>Stay Updated with the Latest Listings</TranslateText></h2>
                        <p className="text-muted mb-4">
                            <TranslateText>
                                Subscribe to receive the latest housing news, tips, and exclusive offers directly in your inbox.
                            </TranslateText>
                        </p>
                        <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center gap-3">
                            <InputGroup className="w-100">
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="rounded-pill shadow-sm"
                                />
                                <Button variant="primary" type="submit" className="rounded-pill ms-3 shadow-sm px-4">
                                    <TranslateText> Subscribe </TranslateText>
                                </Button>
                            </InputGroup>
                            <Form.Check
                                type="checkbox"
                                label="I agree to receive email alerts."
                                checked={getEmails}
                                onChange={(e) => setGetEmails(e.target.checked)}
                                className="text-muted"
                            />
                        </Form>
                        <small className="text-muted d-block mt-3">
                            <TranslateText>
                                By subscribing, you agree to UrbanCraft REAL ESTATE’s <a href="#" className="text-decoration-none">Terms of Use</a> and <a href="#" className="text-decoration-none">Privacy Policy</a>.
                            </TranslateText>
                        </small>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HousingSubscriptionForm;
