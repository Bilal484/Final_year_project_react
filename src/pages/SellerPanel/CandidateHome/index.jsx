import React, { useState, useEffect } from "react";
import "./CandidateHome.css";
// import SellerHeader from "../../../components/SellerAgentHeader";
import Header from "../../../components/Header";
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
  Image
} from "react-bootstrap";
import {
  FaUser,
  FaBriefcase,
  FaSearch,
  FaCog,
  FaEnvelope,
  FaIdCard,
  FaChartLine,
  FaStar,
  FaBell,
  FaRegBookmark,
  FaRegClock
} from "react-icons/fa";

const CandidateHome = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    id: "",
  });
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    applications: 0,
    savedJobs: 5,
    recentViews: 12,
    notifications: 3
  });

  // Retrieve user data from localStorage when the component mounts
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      const userEmail = localStorage.getItem("user_email");
      const userId = localStorage.getItem("user_id");
      const userName = localStorage.getItem("user_name");

      // Update the user state with data from localStorage if available
      setUser({
        name: userName || "John Doe",
        email: userEmail || "johndoe@example.com",
        id: userId || "USER12345",
      });
      setLoading(false);
    }, 800);
  }, []);

  // Function to get the first letter of a given string (email or name)
  const getInitial = (text) => {
    return text ? text.charAt(0).toUpperCase() : "";
  };

  // Function to determine the greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Mock recommended jobs data
  const recommendedJobs = [
    {
      id: 1,
      title: "Real Estate Agent",
      company: "Urban Properties Inc.",
      location: "New York, NY",
      posted: "2 days ago",
      salary: "Rs 70,000 - Rs 90,000"
    },
    {
      id: 2,      title: "Property Manager",
      company: "Elevation Realty",
      location: "San Francisco, CA",
      posted: "3 days ago",
      salary: "Rs 65,000 - Rs 85,000"
    },
    {
      id: 3,      title: "Mortgage Broker",
      company: "FinWell Solutions",
      location: "Remote",
      posted: "1 day ago",
      salary: "Rs 80,000 - Rs 110,000"
    }
  ];

  // Loading state
  if (loading) {
    return (
      <>
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
  }

  return (
    <>
      <Helmet>
        <title>Candidate Home - Manage Your Applications</title>
        <meta
          name="description"
          content="Welcome to Candidate Home. Manage your applications, update account settings, and explore job opportunities tailored for you."
        />
        <meta name="keywords" content="Candidate Home, job applications, account settings, job search" />
        <meta name="author" content="UrbanCraft REAL ESTATE Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Candidate Home - Manage Your Applications" />
        <meta
          property="og:description"
          content="Manage your job applications and account settings at Candidate Home. Explore personalized job opportunities and take the next step in your career."
        />
        <meta property="og:url" content="https://yourwebsite.com/candidate-home" />
        <meta property="og:image" content="https://yourwebsite.com/path-to-candidate-home-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Header />
      {/* {/* <SellerAgentHeader /> */} 

      <div className="candidate-home-hero">
        <Container>
          <Row>
            <Col md={8} lg={6}>
              <div className="hero-content">
                <h1 className="greeting-text">
                  {getGreeting()}, {user.name.split(' ')[0]}!
                </h1>
                <p className="hero-subtitle">
                  Welcome back to your dashboard
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="candidate-home-container">
        {/* Quick Stats Section */}
        <Row className="stats-container">
          <Col md={3} sm={6} className="mb-4">
            <Card className="stat-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="stat-icon applications-icon">
                    <FaBriefcase />
                  </div>
                  <div className="ms-3">
                    <h3 className="stat-number">{stats.applications}</h3>
                    <p className="stat-label mb-0">Applications</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <Card className="stat-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="stat-icon saved-icon">
                    <FaRegBookmark />
                  </div>
                  <div className="ms-3">
                    <h3 className="stat-number">{stats.savedJobs}</h3>
                    <p className="stat-label mb-0">Saved Jobs</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <Card className="stat-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="stat-icon views-icon">
                    <FaRegClock />
                  </div>
                  <div className="ms-3">
                    <h3 className="stat-number">{stats.recentViews}</h3>
                    <p className="stat-label mb-0">Recent Views</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <Card className="stat-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="stat-icon notifications-icon">
                    <FaBell />
                  </div>
                  <div className="ms-3">
                    <h3 className="stat-number">{stats.notifications}</h3>
                    <p className="stat-label mb-0">Notifications</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Main Content */}
        <Row className="main-content">
          <Col lg={8} className="mb-4">
            {/* Applications Section */}
            <Card className="mb-4 dashboard-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="card-title mb-0">
                    <FaBriefcase className="section-icon me-2" /> My Applications
                  </h4>
                  <Button variant="outline-primary" size="sm">
                    View All
                  </Button>
                </div>

                {stats.applications === 0 ? (
                  <div className="empty-state text-center py-5">
                    <div className="empty-icon-container mb-3">
                      <FaBriefcase className="empty-icon" />
                    </div>
                    <h5>No Applications Yet</h5>
                    <p className="text-muted mb-4">
                      Start applying to jobs to build your career in real estate.
                    </p>
                    <Button
                      variant="primary"
                      className="search-jobs-btn"
                    >
                      <FaSearch className="me-2" /> Search for Jobs
                    </Button>
                  </div>
                ) : (
                  <div className="applications-list">
                    {/* Applications would go here */}
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Recommended Jobs Section */}
            <Card className="dashboard-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="card-title mb-0">
                    <FaStar className="section-icon me-2" /> Recommended Jobs
                  </h4>
                  <Badge bg="success" pill>New</Badge>
                </div>

                <Row>
                  {recommendedJobs.map(job => (
                    <Col md={12} key={job.id} className="mb-3">
                      <Card className="job-card">
                        <Card.Body>
                          <div className="d-flex justify-content-between">
                            <div>
                              <h5 className="job-title">{job.title}</h5>
                              <p className="job-company mb-2">{job.company}</p>
                              <div className="job-details">
                                <span className="job-location me-3">
                                  <i className="fas fa-map-marker-alt me-1"></i> {job.location}
                                </span>
                                <span className="job-posted">
                                  <i className="far fa-clock me-1"></i> {job.posted}
                                </span>
                              </div>
                            </div>
                            <div className="text-end">
                              <div className="job-salary mb-3">{job.salary}</div>
                              <Button variant="outline-primary" size="sm">View Job</Button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            {/* Profile Summary */}
            <Card className="mb-4 dashboard-card profile-card">
              <Card.Body>
                <div className="text-center mb-4">
                  <div className="profile-image-container">
                    {user.name ? (
                      <div className="profile-avatar">
                        {getInitial(user.name)}
                      </div>
                    ) : (
                      <div className="profile-avatar">
                        <FaUser />
                      </div>
                    )}
                  </div>
                  <h5 className="mt-3 mb-1">{user.name}</h5>
                  <p className="text-muted mb-2">{user.email}</p>
                  <div className="profile-completion">
                    <div className="progress mb-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "65%" }}
                        aria-valuenow="65"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small className="text-muted">Profile Completion: 65%</small>
                  </div>
                </div>

                <div className="account-details">
                  <div className="detail-item">
                    <FaEnvelope className="detail-icon" />
                    <div>
                      <small className="text-muted">Email</small>
                      <p className="mb-0">{user.email}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaIdCard className="detail-icon" />
                    <div>
                      <small className="text-muted">User ID</small>
                      <p className="mb-0">{user.id}</p>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <Link
                    className="btn btn-primary w-100"
                    to="/AccountSettingCandidate"
                  >
                    <FaCog className="me-2" /> Edit Account Settings
                  </Link>
                  <p className="mt-3 mb-0 text-muted small">
                    Update your personal information and preferences to enhance your job search experience.
                  </p>
                </div>
              </Card.Body>
            </Card>

            {/* Activity Summary */}
            <Card className="dashboard-card">
              <Card.Body>
                <h5 className="card-title mb-4">
                  <FaChartLine className="section-icon me-2" /> Activity Summary
                </h5>

                <div className="activity-item">
                  <div className="activity-icon bg-light-blue">
                    <FaSearch />
                  </div>
                  <div className="activity-content">
                    <h6>Job Searches</h6>
                    <p className="text-muted mb-0">8 searches this week</p>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon bg-light-green">
                    <FaRegClock />
                  </div>
                  <div className="activity-content">
                    <h6>Time Spent</h6>
                    <p className="text-muted mb-0">3.5 hours on platform</p>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon bg-light-purple">
                    <FaRegBookmark />
                  </div>
                  <div className="activity-content">
                    <h6>Saved Items</h6>
                    <p className="text-muted mb-0">5 jobs, 2 companies</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default CandidateHome;
