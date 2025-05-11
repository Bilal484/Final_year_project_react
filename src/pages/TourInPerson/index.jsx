import React, { useState, useEffect } from "react";
import "./TourRequestPage.css";
import SellerAgentHeader from "../../components/SellerAgentHeader";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Spinner,
} from "react-bootstrap";
import {
    FaUser,
    FaCalendarAlt,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";

const TourRequestPage = () => {
    const [tourRequests, setTourRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetching the tour request data from API
    useEffect(() => {
        const fetchTourRequests = async () => {
            try {
                const response = await fetch("https://api.biznetusa.com/api/get-tourinpersons");
                const data = await response.json();
                if (data.status === 200) {
                    setTourRequests(data.tour_in_person);
                }
            } catch (error) {
                console.error("Error fetching tour requests:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTourRequests();
    }, []);

    // Loading state
    if (loading) {
        return (
            <>
                <Header />
                <SellerAgentHeader />
                <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                    <Spinner animation="border" role="status" variant="primary">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>Tour Requests - View All Tour Requests</title>
                <meta
                    name="description"
                    content="View all the people who want to tour your house. Manage tour requests and schedule appointments."
                />
                <meta name="keywords" content="tour requests, house tours, real estate" />
                <meta name="author" content="UrbanCraft REAL ESTATE Team" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>

            <Header />
            <SellerAgentHeader />

            <div className="tour-request-hero">
                <Container>
                    <Row>
                        <Col md={8} lg={6}>
                            <div className="hero-content">
                                <h1 className="greeting-text">Tour Requests</h1>
                                <p className="hero-subtitle">
                                    View all the people who want to tour your house
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="tour-request-container">
                <Row>
                    {tourRequests.map((request) => (
                        <Col md={4} key={request.id} className="mb-4">
                            <Card className="tour-request-card">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="tour-request-name">
                                                {request.firstname} {request.lastname}
                                            </h5>
                                            <p className="tour-request-date">
                                                <FaCalendarAlt /> {new Date(request.date).toLocaleDateString()}
                                            </p>
                                            <p className="tour-request-contact">
                                                <FaPhoneAlt /> {request.phone}
                                            </p>
                                            <p className="tour-request-contact">
                                                <FaEnvelope /> {request.email}
                                            </p>
                                        </div>
                                        <div className="text-end">
                                            <Button variant="outline-primary" size="sm">
                                                Approve
                                            </Button>
                                        </div>
                                    </div>
                                    {request.notes && (
                                        <div className="tour-request-notes mt-3">
                                            <strong>Notes:</strong> <p>{request.notes}</p>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Footer />
        </>
    );
};

export default TourRequestPage;
