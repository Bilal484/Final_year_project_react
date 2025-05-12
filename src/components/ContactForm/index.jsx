import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Toast } from 'react-bootstrap';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://apitourism.today.alayaarts.com/api/store-getintouch', formData);
      if (response.status === 200) {
        setToastMessage('Message sent successfully!');
        setToastVariant('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setToastMessage('Failed to send message. Please try again.');
        setToastVariant('danger');
      }
    } catch (error) {
      setToastMessage('An error occurred while sending your message.');
      setToastVariant('danger');
    } finally {
      setShowToast(true);
    }
  };

  return (
    <>
     <Helmet>
        <title>Contact Us | Your Company Name</title>
        <meta
          name="description"
          content="Get in touch with us for personalized assistance. We're here to help with all your inquiries and real estate needs."
        />
        <meta
          name="keywords"
          content="contact us, real estate, customer support, inquiry, message us"
        />
        <meta property="og:title" content="Contact Us | Your Company Name" />
        <meta
          property="og:description"
          content="Send us a message or get in touch for expert advice and assistance with your real estate inquiries."
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="URL_TO_IMAGE" /> {/* Add your image URL for social media sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Your Company Name" />
        <meta
          name="twitter:description"
          content="Contact us to discuss your real estate needs or to inquire about our services. We're here to assist you."
        />
        <meta name="twitter:image" content="URL_TO_IMAGE" /> {/* Add your image URL for Twitter sharing */}
      </Helmet>
    <section id="contact" className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4">Get in Touch</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={6}>
              <Form.Control
                type="email"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Control
                as="textarea"
                placeholder="Your Message"
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>
          <div className="text-center">
            <Button type="submit" variant="info">
              Send Message
            </Button>
          </div>
        </Form>
        {showToast && (
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
            className={`bg-${toastVariant} text-white mt-4`}
          >
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        )}
      </Container>
    </section>
    </>
  );
};

export default ContactForm;