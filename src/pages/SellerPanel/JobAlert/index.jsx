import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Offcanvas, Button, Form, Container, Row, Col, Alert, Card, Badge } from 'react-bootstrap';
import SellerHeader from '../../../components/SellerHeader';
import SellerAgentHeader from '../../../components/SellerAgentHeader';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import './JobAlert.css';
import axios from 'axios';

const JobAlert = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [getEmails, setGetEmails] = useState(false);
  const [jobAlertName, setJobAlertName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [locations, setLocations] = useState('');
  const [jobType, setJobType] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://apitourism.today.alayaarts.com/api/store-email-alerts', {
        email,
        get_emails: getEmails,
        job_alert_name: jobAlertName,
        frequency,
        job_category: jobCategory,
        locations,
        job_type: jobType,
        employment_type: employmentType,
      });

      if (response.status === 200) {
        setAlert({ type: 'success', message: 'Job alert created successfully!' });
        setShow(false); // Close the offcanvas after successful submission
      } else {
        setAlert({ type: 'danger', message: 'Failed to create job alert. Please try again.' });
      }
    } catch (error) {
      setAlert({ type: 'danger', message: 'An error occurred. Please try again later.' });
    }
  };

  // Popular categories for display
  const popularCategories = [
    { title: "Real Estate Agent", description: "Stay updated on agent positions in your area" },
    { title: "Property Manager", description: "Get alerts for property management roles" },
    { title: "Broker Positions", description: "New opportunities for licensed brokers" }
  ];

  return (
    <>
      <Helmet>
        <title>Job Alerts | UrbanCraft REAL ESTATE</title>
        <meta name="description" content="Create and manage job alerts to stay updated on the latest job opportunities that match your preferences." />
        <meta name="keywords" content="job alerts, job notifications, career updates, UrbanCraft REAL ESTATE jobs" />
        <meta name="author" content="UrbanCraft REAL ESTATE" />
      </Helmet>
      <Header />
      <SellerAgentHeader />
      
      {/* Page header */}
      <div className="bg-light py-4 mb-4 border-bottom">
        <Container>
          <Row>
            <Col>
              <h1 className="h3 mb-0">Job Alerts</h1>
              <p className="text-muted mb-0">Stay updated on the latest opportunities</p>
            </Col>
          </Row>
        </Container>
      </div>
      
      <Container className="container-job-alert-custom my-5">
        {/* Alert messages */}
        {alert.message && (
          <Alert 
            variant={alert.type} 
            className="d-flex align-items-center shadow-sm"
            dismissible
            onClose={() => setAlert({ type: '', message: '' })}
          >
            {alert.type === 'success' ? (
              <i className="fas fa-check-circle me-2"></i>
            ) : (
              <i className="fas fa-exclamation-circle me-2"></i>
            )}
            {alert.message}
          </Alert>
        )}
        
        {/* Main card */}
        <Card className="shadow-sm border-0 mb-4">
          <Card.Header className="bg-white py-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center">
            <div>
              <h2 className="fs-4 fw-bold mb-1">Your Job Alerts</h2>
              <p className="text-muted mb-md-0">
                We'll send you an email about jobs that match your preferences.
              </p>
            </div>
            <Button 
              variant="primary" 
              onClick={handleShow} 
              className="d-flex align-items-center"
            >
              <i className="fa-regular fa-bell me-2"></i>
              Create Job Alert
            </Button>
          </Card.Header>
          <Card.Body className="text-center py-5">
            <div className="mb-4">
              <div className="bg-light p-4 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                <i className="fa-regular fa-bell fa-2x text-primary"></i>
              </div>
              <h3 className="fs-5 fw-bold">No job alerts yet</h3>
              <p className="text-muted mx-auto" style={{ maxWidth: '550px' }}>
                Create your first job alert to receive notifications when new positions 
                matching your criteria are posted.
              </p>
              <Button variant="outline-primary" onClick={handleShow}>
                Get Started
              </Button>
            </div>
          </Card.Body>
        </Card>
        
        {/* Popular Categories */}
        <h3 className="fs-5 fw-bold mb-3">Popular Alert Categories</h3>
        <Row className="g-4 mb-5">
          {popularCategories.map((category, index) => (
            <Col md={4} key={index}>
              <Card className="h-100 border-0 shadow-sm hover-shadow transition">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                      <i className={`fa-solid ${index === 0 ? 'fa-user-tie' : index === 1 ? 'fa-building' : 'fa-handshake'} text-primary`}></i>
                    </div>
                    <h4 className="fs-6 fw-bold mb-0">{category.title}</h4>
                  </div>
                  <p className="text-muted small mb-3">{category.description}</p>
                  <Button 
                    variant="link" 
                    className="text-decoration-none p-0 mt-auto align-self-start"
                    onClick={handleShow}
                  >
                    Create Alert <i className="fas fa-chevron-right ms-1 small"></i>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        {/* Offcanvas */}
        <Offcanvas 
          show={show} 
          onHide={handleClose} 
          placement="end"
          className="offcanvas-custom"
          backdrop="static"
        >
          <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title className="fw-bold">Create Job Alert</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="form-control-custom"
                />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="getEmails">
                <Form.Check
                  type="checkbox"
                  label="Receive Job Alert Emails"
                  checked={getEmails}
                  onChange={(e) => setGetEmails(e.target.checked)}
                  className="custom-checkbox"
                />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="jobAlertName">
                <Form.Label>Job Alert Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  value={jobAlertName}
                  onChange={(e) => setJobAlertName(e.target.value)}
                  required
                  placeholder="My Job Alert"
                  className="form-control-custom"
                />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="frequency">
                <Form.Label>Frequency <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  required
                  className="form-select-custom"
                >
                  <option value="" disabled>Select One</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="jobCategory">
                <Form.Label>Job Category</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fas fa-briefcase text-muted"></i>
                  </span>
                  <Form.Control
                    type="text"
                    value={jobCategory}
                    onChange={(e) => setJobCategory(e.target.value)}
                    placeholder="e.g. Real Estate Agent"
                    className="form-control-custom border-start-0"
                  />
                </div>
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="locations">
                <Form.Label>Locations</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fas fa-map-marker-alt text-muted"></i>
                  </span>
                  <Form.Control
                    type="text"
                    value={locations}
                    onChange={(e) => setLocations(e.target.value)}
                    placeholder="e.g. New York, Remote"
                    className="form-control-custom border-start-0"
                  />
                </div>
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="jobType">
                <Form.Label>Job Type</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fas fa-file-contract text-muted"></i>
                  </span>
                  <Form.Control
                    type="text"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    placeholder="e.g. Permanent, Contract"
                    className="form-control-custom border-start-0"
                  />
                </div>
              </Form.Group>
              
              <Form.Group className="mb-4" controlId="employmentType">
                <Form.Label>Employment Type</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fas fa-clock text-muted"></i>
                  </span>
                  <Form.Control
                    type="text"
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    placeholder="e.g. Full-time, Part-time"
                    className="form-control-custom border-start-0"
                  />
                </div>
              </Form.Group>
              
              <div className="pt-3 border-top mt-4">
                <div className="d-flex justify-content-end gap-2">
                  <Button variant="outline-secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Create Alert
                  </Button>
                </div>
              </div>
            </Form>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
      <Footer />
    </>
  );
};

export default JobAlert;
