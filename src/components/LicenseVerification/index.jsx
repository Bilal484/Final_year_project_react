import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import './LicenseVerification.css'; // Importing custom styles

function LicenseVerification() {
    return (
        <>
         <Helmet>
                <title>Znet License Verification - Verify Real Estate Agents</title>
                <meta name="description" content="Use Znet's license verification tool powered by ARELLO to verify the status of real estate agents' licenses and ensure compliance." />
                <meta name="keywords" content="License Verification, Real Estate License, ARELLO, Verify Agent License, Znet Real Estate" />
                <meta property="og:title" content="Znet License Verification - Verify Real Estate Agents" />
                <meta property="og:description" content="Easily verify real estate agents' licenses using ARELLO through Znet's platform for secure and compliant transactions." />
                <meta name="author" content="Znet Team" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
            </Helmet>
        <div className="license-verification-page">
            {/* Custom Header (Replace with your site's Header component if available) */}
            <header className="custom-header">
                <Container>
                    <Row>
                        <Col className='text-center'>
                            <h1 className="header-title">Znet License Verification</h1>
                        </Col>
                    </Row>
                </Container>
            </header>

            {/* Main Content Section */}
            <Container className="main-content">
                <Row className="text-center">
                    <Col className='col-6'>
                        <h2 className="content-title">Verify a Real Estate Agent's License</h2>
                        <p className="content-description">
                            Use the ARELLO verification tool below to check the status of a real estate agent's license.
                        </p>
                        {/* Iframe displaying the ARELLO license verification page */}
                        <iframe
                            src="https://www.arello.com/search/"
                            title="License Verification"
                            width="100%"
                            height="600"
                            style={{ border: '1px solid #ccc' }}
                            allowFullScreen
                        ></iframe>
                    </Col>
                </Row>
            </Container>

            {/* Custom Footer (Replace with your site's Footer component if available) */}
            <footer className="custom-footer">
                <Container>
                    <Row>
                        <Col>
                            <p>© 2024 Znet. All Rights Reserved.</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
        </>
    );
}

export default LicenseVerification;
