import React, { useState, useEffect, useRef } from "react";
import "./CandidateHome.css";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Badge,
    Spinner,
    Modal
} from "react-bootstrap";
import {
    FaHome,
    FaPlus,
    FaEye,
    FaUsers,
    FaEnvelope,
    FaCalendarAlt,
    FaDollarSign,
    FaChartLine,
    FaBell,
    FaCog,
    FaBuilding,
    FaMapMarkerAlt,
    FaCamera,
    FaEdit,
    FaCheck,
    FaTimes
} from "react-icons/fa";

const CandidateHome = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        id: "",
        phone: "",
        location: ""
    });
    const [loading, setLoading] = useState(true);
    const [sellerStats, setSellerStats] = useState({
        totalProperties: 0,
        activeListings: 0,
        tourRequests: 0,
        receivedOffers: 0,
        totalViews: 0,
        monthlyRevenue: 0
    });

    const [recentActivity, setRecentActivity] = useState([]);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);

    // Retrieve user data and fetch seller statistics
    useEffect(() => {
        const fetchSellerData = async () => {
            try {
                const userEmail = localStorage.getItem("user_email");
                const userId = localStorage.getItem("user_id");
                const userName = localStorage.getItem("user_name");

                setUser({
                    name: userName || "Seller User",
                    email: userEmail || "seller@example.com",
                    id: userId || "SELLER12345",
                    phone: "+1 (555) 123-4567",
                    location: "New York, NY"
                });

                // Simulate API call for seller statistics
                await new Promise(resolve => setTimeout(resolve, 1000));

                setSellerStats({
                    totalProperties: 12,
                    activeListings: 8,
                    tourRequests: 24,
                    receivedOffers: 15,
                    totalViews: 1247,
                    monthlyRevenue: 45000
                });

                setRecentActivity([
                    { id: 1, type: 'tour', message: 'New tour request for 123 Oak Street', time: '2 hours ago', status: 'pending' },
                    { id: 2, type: 'offer', message: 'Offer received for $350,000', time: '5 hours ago', status: 'new' },
                    { id: 3, type: 'view', message: 'Property viewed 15 times today', time: '1 day ago', status: 'info' },
                    { id: 4, type: 'listing', message: 'Property approved by admin', time: '2 days ago', status: 'approved' }
                ]);

                setLoading(false);

                // Show welcome modal for new users
                const hasSeenWelcome = localStorage.getItem('hasSeenSellerWelcome');
                if (!hasSeenWelcome) {
                    setShowWelcomeModal(true);
                    localStorage.setItem('hasSeenSellerWelcome', 'true');
                }
            } catch (error) {
                console.error("Error fetching seller data:", error);
                setLoading(false);
            }
        };

        fetchSellerData();
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'tour': return <FaCalendarAlt />;
            case 'offer': return <FaDollarSign />;
            case 'view': return <FaEye />;
            case 'listing': return <FaBuilding />;
            default: return <FaBell />;
        }
    };

    const getActivityColor = (status) => {
        switch (status) {
            case 'pending': return 'warning';
            case 'new': return 'success';
            case 'approved': return 'info';
            default: return 'secondary';
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="seller-dashboard-loading-container">
                    <Spinner animation="border" role="status" variant="primary" className="seller-dashboard-loading-spinner">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p className="seller-dashboard-loading-text">Loading your seller dashboard...</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>Seller Dashboard - UrbanCraft REAL ESTATE</title>
                <meta name="description" content="Manage your real estate listings, view analytics, and handle property inquiries from your seller dashboard." />
                <meta name="keywords" content="seller dashboard, real estate management, property listings, real estate analytics" />
            </Helmet>

            <Header />

            {/* Hero Section */}
            <section className="seller-dashboard-hero">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={8}>
                            <div className="hero-content">
                                <h1 className="seller-dashboard-hero-title">
                                    {getGreeting()}, {user.name.split(' ')[0]}!
                                </h1>
                                <p className="seller-dashboard-hero-subtitle">
                                    Welcome to your seller dashboard. Manage your properties and grow your real estate business.
                                </p>
                                <div className="seller-dashboard-hero-actions">
                                    <Link to="/SellerProduct" className="btn btn-primary btn-lg me-3">
                                        <FaPlus className="me-2" /> Add New Property
                                    </Link>
                                    <Link to="/TourRequest" className="btn btn-outline-primary btn-lg">
                                        <FaCalendarAlt className="me-2" /> View Tour Requests
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="hero-image">
                                <div className="seller-dashboard-avatar-large">
                                    {getInitials(user.name)}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Container className="seller-dashboard-main-container">
                {/* Statistics Cards */}
                <Row className="seller-dashboard-stats-row">
                    <Col xl={2} lg={4} md={6} className="mb-4">
                        <Card className="seller-dashboard-stat-card properties">
                            <Card.Body>
                                <div className="seller-dashboard-stat-content">
                                    <div className="seller-dashboard-stat-icon">
                                        <FaBuilding />
                                    </div>
                                    <div className="stat-info">
                                        <h3 className="seller-dashboard-stat-number">{sellerStats.totalProperties}</h3>
                                        <p className="seller-dashboard-stat-label">Total Properties</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={2} lg={4} md={6} className="mb-4">
                        <Card className="seller-dashboard-stat-card active">
                            <Card.Body>
                                <div className="seller-dashboard-stat-content">
                                    <div className="seller-dashboard-stat-icon">
                                        <FaHome />
                                    </div>
                                    <div className="stat-info">
                                        <h3 className="seller-dashboard-stat-number">{sellerStats.activeListings}</h3>
                                        <p className="seller-dashboard-stat-label">Active Listings</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={2} lg={4} md={6} className="mb-4">
                        <Card className="seller-dashboard-stat-card tours">
                            <Card.Body>
                                <div className="seller-dashboard-stat-content">
                                    <div className="seller-dashboard-stat-icon">
                                        <FaCalendarAlt />
                                    </div>
                                    <div className="stat-info">
                                        <h3 className="seller-dashboard-stat-number">{sellerStats.tourRequests}</h3>
                                        <p className="seller-dashboard-stat-label">Tour Requests</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={2} lg={4} md={6} className="mb-4">
                        <Card className="seller-dashboard-stat-card offers">
                            <Card.Body>
                                <div className="seller-dashboard-stat-content">
                                    <div className="seller-dashboard-stat-icon">
                                        <FaDollarSign />
                                    </div>
                                    <div className="stat-info">
                                        <h3 className="seller-dashboard-stat-number">{sellerStats.receivedOffers}</h3>
                                        <p className="seller-dashboard-stat-label">Received Offers</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={2} lg={4} md={6} className="mb-4">
                        <Card className="seller-dashboard-stat-card views">
                            <Card.Body>
                                <div className="seller-dashboard-stat-content">
                                    <div className="seller-dashboard-stat-icon">
                                        <FaEye />
                                    </div>
                                    <div className="stat-info">
                                        <h3 className="seller-dashboard-stat-number">{sellerStats.totalViews.toLocaleString()}</h3>
                                        <p className="seller-dashboard-stat-label">Total Views</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={2} lg={4} md={6} className="mb-4">
                        <Card className="seller-dashboard-stat-card revenue">
                            <Card.Body>
                                <div className="seller-dashboard-stat-content">
                                    <div className="seller-dashboard-stat-icon">
                                        <FaChartLine />
                                    </div>
                                    <div className="stat-info">
                                        <h3 className="seller-dashboard-stat-number">{formatCurrency(sellerStats.monthlyRevenue)}</h3>
                                        <p className="seller-dashboard-stat-label">Monthly Revenue</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Main Content */}
                <Row>
                    <Col lg={8}>
                        {/* Quick Actions */}
                        <Card className="seller-dashboard-content-card mb-4">
                            <Card.Body>
                                <h4 className="seller-dashboard-card-title mb-4">
                                    <FaCog className="me-2" /> Quick Actions
                                </h4>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Link to="/SellerProduct" className="seller-dashboard-quick-action-btn">
                                            <div className="seller-dashboard-action-icon">
                                                <FaPlus />
                                            </div>
                                            <div className="seller-dashboard-action-content">
                                                <h6>Add Property</h6>
                                                <p>List a new property for sale</p>
                                            </div>
                                        </Link>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Link to="/TourRequest" className="seller-dashboard-quick-action-btn">
                                            <div className="seller-dashboard-action-icon">
                                                <FaCalendarAlt />
                                            </div>
                                            <div className="seller-dashboard-action-content">
                                                <h6>Tour Requests</h6>
                                                <p>Manage property tour requests</p>
                                            </div>
                                        </Link>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Link to="/Property-Offers" className="seller-dashboard-quick-action-btn">
                                            <div className="seller-dashboard-action-icon">
                                                <FaDollarSign />
                                            </div>
                                            <div className="seller-dashboard-action-content">
                                                <h6>View Offers</h6>
                                                <p>Review and manage offers</p>
                                            </div>
                                        </Link>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Link to="/JoinTalentCommunity" className="seller-dashboard-quick-action-btn">
                                            <div className="seller-dashboard-action-icon">
                                                <FaUsers />
                                            </div>
                                            <div className="seller-dashboard-action-content">
                                                <h6>Community</h6>
                                                <p>Join seller community</p>
                                            </div>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="seller-dashboard-content-card">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="seller-dashboard-card-title mb-0">
                                        <FaBell className="me-2" /> Recent Activity
                                    </h4>
                                    <Badge bg="primary" pill>{recentActivity.length}</Badge>
                                </div>

                                <div className="seller-dashboard-activity-timeline">
                                    {recentActivity.map(activity => (
                                        <div key={activity.id} className="seller-dashboard-activity-item">
                                            <div className={`seller-dashboard-activity-icon bg-${getActivityColor(activity.status)}`}>
                                                {getActivityIcon(activity.type)}
                                            </div>
                                            <div className="seller-dashboard-activity-content">
                                                <p className="seller-dashboard-activity-message">{activity.message}</p>
                                                <small className="seller-dashboard-activity-time">{activity.time}</small>
                                            </div>
                                            <Badge bg={getActivityColor(activity.status)} className="seller-dashboard-activity-badge">
                                                {activity.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>

                                <div className="text-center mt-4">
                                    <Button variant="outline-primary">View All Activity</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        {/* Profile Card */}
                        <Card className="seller-dashboard-content-card seller-dashboard-profile-card mb-4">
                            <Card.Body className="text-center">
                                <div className="seller-dashboard-profile-avatar mb-3">
                                    {getInitials(user.name)}
                                </div>
                                <h5 className="seller-dashboard-profile-name">{user.name}</h5>
                                <p className="seller-dashboard-profile-email">{user.email}</p>

                                <div className="seller-dashboard-profile-details">
                                    <div className="seller-dashboard-detail-row">
                                        <FaMapMarkerAlt className="seller-dashboard-detail-icon" />
                                        <span>{user.location}</span>
                                    </div>
                                    <div className="seller-dashboard-detail-row">
                                        <FaEnvelope className="seller-dashboard-detail-icon" />
                                        <span>{user.phone}</span>
                                    </div>
                                </div>

                                <div className="seller-dashboard-profile-completion mb-4">
                                    <div className="seller-dashboard-completion-bar">
                                        <div className="seller-dashboard-completion-fill" style={{ width: '85%' }}></div>
                                    </div>
                                    <small className="seller-dashboard-completion-text">Profile 85% Complete</small>
                                </div>

                                <Link to="/AccountSettingCandidate" className="btn btn-primary w-100">
                                    <FaEdit className="me-2" /> Edit Profile
                                </Link>
                            </Card.Body>
                        </Card>

                        {/* Performance Summary */}
                        <Card className="seller-dashboard-content-card">
                            <Card.Body>
                                <h5 className="seller-dashboard-card-title mb-4">
                                    <FaChartLine className="me-2" /> Performance Summary
                                </h5>

                                <div className="seller-dashboard-performance-item">
                                    <div className="seller-dashboard-performance-label">
                                        <span>Property Views</span>
                                        <span className="seller-dashboard-performance-trend positive">+12%</span>
                                    </div>
                                    <div className="seller-dashboard-performance-bar">
                                        <div className="seller-dashboard-performance-fill" style={{ width: '78%' }}></div>
                                    </div>
                                </div>

                                <div className="seller-dashboard-performance-item">
                                    <div className="seller-dashboard-performance-label">
                                        <span>Tour Requests</span>
                                        <span className="seller-dashboard-performance-trend positive">+8%</span>
                                    </div>
                                    <div className="seller-dashboard-performance-bar">
                                        <div className="seller-dashboard-performance-fill" style={{ width: '65%' }}></div>
                                    </div>
                                </div>

                                <div className="seller-dashboard-performance-item">
                                    <div className="seller-dashboard-performance-label">
                                        <span>Offer Conversion</span>
                                        <span className="seller-dashboard-performance-trend negative">-3%</span>
                                    </div>
                                    <div className="seller-dashboard-performance-bar">
                                        <div className="seller-dashboard-performance-fill" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Welcome Modal */}
            <Modal show={showWelcomeModal} onHide={() => setShowWelcomeModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to Your Seller Dashboard!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <div className="seller-dashboard-welcome-icon mb-3">
                            <FaHome />
                        </div>
                        <h5>Get Started with UrbanCraft</h5>
                        <p>Your seller dashboard is ready! Start by adding your first property listing and connecting with potential buyers.</p>
                        <ul className="seller-dashboard-welcome-steps text-start">
                            <li>Add your first property listing</li>
                            <li>Set up your seller profile</li>
                            <li>Review and respond to tour requests</li>
                            <li>Manage offers from buyers</li>
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowWelcomeModal(false)}>
                        Skip Tour
                    </Button>
                    <Link to="/SellerProduct" className="btn btn-primary" onClick={() => setShowWelcomeModal(false)}>
                        Add First Property
                    </Link>
                </Modal.Footer>
            </Modal>

            <Footer />
        </>
    );
};

export default CandidateHome;
