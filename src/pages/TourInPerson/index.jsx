import React, { useState, useEffect } from "react";
import "./TourRequestPage.css";
// import SellerHeader from "../../components/SellerAgentHeader";
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
    FaSync
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Check, CheckIcon, X } from "lucide-react";

const TourRequestPage = () => {
    const [tourRequests, setTourRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    
    // Get current user's ID from localStorage to filter requests
    const currentUserId = localStorage.getItem("user_id");    // Function to fetch tour requests data - extracted outside useEffect for reuse
    const fetchTourRequests = async () => {
        try {
            if (!loading) setRefreshing(true);
            const response = await fetch("https://apitourism.today.alayaarts.com/api/get-tourinpersons");
            const data = await response.json();
            if (data.status === 200) {
                // Process the tour requests to correctly set the approved status
                const processedRequests = data.tour_in_person.map(request => ({
                    ...request,
                    // Set approved to true if approved_tour is 1, false otherwise
                    approved: request.approved_tour === 1
                }));
                
                // Filter requests to show only those for the current seller's properties
                const filteredRequests = processedRequests.filter(request => 
                    request.seller_id === currentUserId
                );
                
                setTourRequests(filteredRequests);

                // For debugging
                console.log("Filtered tour requests data:", filteredRequests);
            }
        } catch (error) {
            console.error("Error fetching tour requests:", error);
            toast.error("Failed to load tour requests");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };
    // Fetching the tour request data from API
    useEffect(() => {
        fetchTourRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleApproved = async (requestId, val) => {
        try {
            // Call the correct approval endpoint
            const response = await fetch(
                `https://apitourism.today.alayaarts.com/api/approve-tour/${requestId}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const result = await response.json();

            if (result.status === 200) {
                setTourRequests((prevRequests) =>
                    prevRequests.map((req) =>
                        req.id === requestId ? { ...req, approved: val == 1, approved_tour: val } : req
                    )
                );
                // Show success message
                if (val == 1) {
                    toast.success("Tour request has been approved and email notification has been sent to Buyer!");
                } else {
                    toast.success("Tour request has been rejected and email notification has been sent to Buyer!");
                }


                // Refresh the data to ensure consistency with the server
                setTimeout(() => fetchTourRequests(), 2000);
            } else {
                toast.error("Failed to approve the tour. Please try again.");
                console.error("Failed to approve the tour:", result);
            }

        } catch (error) {
            toast.error("Error connecting to server. Please try again later.");
            console.error("Error approving tour:", error);
        }
    };

    // Loading state
    if (loading) {
        return (
            <>
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
                />
                <Header />
                {/* <SellerAgentHeader /> */}
                <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                    <Spinner animation="border" role="status" variant="primary">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
                <Footer />
            </>
        );
    } return (
        <>
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
            />

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
            {/* <SellerAgentHeader /> */}            <div className="tour-request-hero">
                <Container>
                    <Row>
                        <Col md={8} lg={6}>
                            <div className="hero-content">
                                <h1 className="greeting-text">Tour Requests</h1>
                                <p className="hero-subtitle  text-white">
                                    View all the people who want to tour your house
                                </p>
                            </div>
                        </Col>
                        <Col md={4} lg={6} className="d-flex justify-content-end align-items-center">
                            <Button
                                variant="outline-light"
                                onClick={() => fetchTourRequests()}
                                className="refresh-button"
                            >
                                {refreshing ? (
                                    <Spinner animation="border" size="sm" className="me-2" />
                                ) : (
                                    <FaSync className="me-2" />
                                )}
                                Refresh Requests
                            </Button>
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
                                            {/* Show Approve button only if not approved */}
                                            {!(request.approved_tour == 1) && (
                                                <>
                                                    <Button
                                                        variant="outline-primary"
                                                        onClick={() => handleApproved(request.id, 1)}
                                                        title="Approve this tour request"
                                                        size="sm"
                                                    >
                                                        <Check />
                                                    </Button>
                                                </>
                                            )}

                                            <Button
                                                variant="outline-secondary"
                                                onClick={() => handleApproved(request.id, 0)}
                                                title="Approve this tour request"
                                                size="sm"
                                                className="ms-2"
                                            >
                                                <X size={24} />
                                            </Button>
                                            {/* You can show a label or leave blank when approved */}
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
