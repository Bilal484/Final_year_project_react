import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Offcanvas, Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import SellerHeader from '../../../components/SellerHeader';
import SellerAgentHeader from '../../../components/SellerAgentHeader';
import Header from '../../../components/header';
import Footer from '../../../components/Footer';
import './JobAlert.css'; // Assuming custom styles are still used
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
      const response = await axios.post('https://api.biznetusa.com/api/store-email-alerts', {
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
      <Container className="container-job-alert-custom my-5">
        <Row className="bg-white p-5 rounded shadow-sm">
          <Col className="text-center">
            {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}
            <h2 className="fs-4 fw-bold">Job Alerts</h2>
            <p className="text-muted">
              We’ll send you an email about jobs that match your preferences.
            </p>
            <Button variant="primary" onClick={handleShow} className="mb-3">
              <i className="fa-regular fa-bell px-1"></i>
              Create Job Alert
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Create Job Alert</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="getEmails">
                    <Form.Check
                      type="checkbox"
                      label="Receive Job Alert Emails"
                      checked={getEmails}
                      onChange={(e) => setGetEmails(e.target.checked)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="jobAlertName">
                    <Form.Label>Job Alert Name *</Form.Label>
                    <Form.Control
                      type="text"
                      value={jobAlertName}
                      onChange={(e) => setJobAlertName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="frequency">
                    <Form.Label>Frequency *</Form.Label>
                    <Form.Select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select One</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="jobCategory">
                    <Form.Label>Job Category</Form.Label>
                    <Form.Control
                      type="text"
                      value={jobCategory}
                      onChange={(e) => setJobCategory(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="locations">
                    <Form.Label>Locations</Form.Label>
                    <Form.Control
                      type="text"
                      value={locations}
                      onChange={(e) => setLocations(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="jobType">
                    <Form.Label>Job Type</Form.Label>
                    <Form.Control
                      type="text"
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-5" controlId="employmentType">
                    <Form.Label>Full/Part-time</Form.Label>
                    <Form.Control
                      type="text"
                      value={employmentType}
                      onChange={(e) => setEmploymentType(e.target.value)}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button variant="danger" type="submit">
                      Create
                    </Button>
                  </div>
                </Form>
              </Offcanvas.Body>
            </Offcanvas>
            <hr className="my-4 w-100 text-muted" />
            <img
              alt="paper airplane"
              src="https://openui.fly.dev/openui/100x100.svg?text=✈️"
              className="me-2"
            />
            <p className="text-muted mt-2">You currently have no job alerts.</p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default JobAlert;
