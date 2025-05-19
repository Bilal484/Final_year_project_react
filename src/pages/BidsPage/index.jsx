import React, { useState, useEffect } from "react";
import "./BidsPage.css";
import SellerAgentHeader from "../../components/SellerAgentHeader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";

const BidsPage = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch offers data
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await fetch("https://apitourism.today.alayaarts.com/api/offers/");
                const data = await response.json();
                console.log(data);
                setOffers(data);  // Assuming "offers" is an array in the response
            } catch (error) {
                console.error("Error fetching offers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    // Handle delete offer
    const handleDelete = async (offerId) => {
        try {
            const response = await fetch(`https://apitourism.today.alayaarts.com/api/offers/${offerId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setOffers(offers.filter((offer) => offer.id !== offerId));  // Remove the offer from the UI
                alert("Offer deleted successfully.");
            } else {
                alert("Failed to delete the offer.");
            }
        } catch (error) {
            console.error("Error deleting offer:", error);
            alert("An error occurred while deleting the offer.");
        }
    };

    // Handle reject offer
    const handleReject = async (offerId) => {
        try {
            const response = await fetch(`https://apitourism.today.alayaarts.com/api/offers/reject/${offerId}`, {
                method: "PUT",  // Assuming PUT request for updating the offer
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "rejected" }),  // Update status or any other relevant field
            });
            if (response.ok) {
                const updatedOffers = offers.map((offer) =>
                    offer.id === offerId ? { ...offer, status: "rejected" } : offer
                );
                setOffers(updatedOffers);  // Update the offer's status in the UI
                alert("Offer rejected successfully.");
            } else {
                alert("Failed to reject the offer.");
            }
        } catch (error) {
            console.error("Error rejecting offer:", error);
            alert("An error occurred while rejecting the offer.");
        }
    };

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
                <title>View Offers - See All Offers/Bids for Properties</title>
                <meta name="description" content="View all the offers placed on your properties." />
                <meta name="keywords" content="real estate offers, bids, property offers" />
                <meta name="author" content="UrbanCraft REAL ESTATE Team" />
            </Helmet>

            <Header />
            <SellerAgentHeader />

            <div className="offers-page-hero">
                <Container>
                    <Row>
                        <Col md={8} lg={6}>
                            <div className="hero-content">
                                <h1 className="greeting-text text-dark">View Offers</h1>
                                <p className="hero-subtitle">All the bids placed for your property</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="offers-page-container">
                <Row>
                    {offers?.map((offer) => (
                        <Col md={4} key={offer.id} className="mb-4">
                            <Card className="offer-card">
                                <Card.Body>
                                    <h5 className="offer-price">Offer Price: ${offer.offer_price}</h5>
                                    <h6 className="property-title">{offer.product.title}</h6>
                                    <p className="property-location">Location: {offer.product.location}</p>
                                    <p className="property-price">Property Price: ${offer.product.price}</p>
                                    <p className="offer-comments">Comments: {offer.comments || "No comments provided"}</p>

                                    <div className="d-flex justify-content-between">
                                        <Button variant="danger" onClick={() => handleDelete(offer.id)}>Reject Offer</Button>

                                    </div>
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

export default BidsPage;

