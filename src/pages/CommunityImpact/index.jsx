import React from 'react';
import { Helmet } from 'react-helmet';
import './CommunityImpact.css';
import Header from '../../components/header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
 // Add this image

const CommunityImpact = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
         <Helmet>
                <title>Community Impact - URBANCRAFT REAL ESTATE</title>
                <meta name="description" content="Learn about URBANCRAFT REAL ESTATE's commitment to building stronger communities through innovative real estate practices and social responsibility." />
                <meta name="keywords" content="community, real estate, social responsibility, innovation" />
                <meta property="og:title" content="Community Impact - URBANCRAFT REAL ESTATE" />
                <meta property="og:description" content="Discover how URBANCRAFT REAL ESTATE is transforming communities through sustainable real estate development and active social engagement." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="path_to_your_image_for_social_media" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Community Impact - URBANCRAFT REAL ESTATE" />
                <meta name="twitter:description" content="Join URBANCRAFT REAL ESTATE in making a real difference in our communities through dedicated initiatives and partnerships." />
            </Helmet>
            <Header isOpen={isOpen} toggle={toggle} />
            <div className="community-impact-container">
                {/* Hero Section */}
                <section className="hero-section-CommunityImpact text-white position-relative">
                    <div className="container py-5">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h1 className="display-3 fw-bold mb-4">Community Impact</h1>
                                <p className="lead mb-4">Building stronger communities through real estate innovation and social responsibility</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Statement */}
                <section className="mission-section py-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h2 className="section-title">Our Mission</h2>
                                <p className="lead mb-4">
                                    At URBANCRAFT REAL ESTATE, we believe in the power of real estate to transform communities. 
                                    Our mission is to create lasting positive impact through sustainable practices, 
                                    community engagement, and innovative solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impact Numbers */}
                <section className="impact-numbers py-5 bg-light">
                    <div className="container">
                        <div className="row text-center">
                            <div className="col-md-3">
                                <div className="impact-stat">
                                    <h3 className="display-4 text-primary">$5M+</h3>
                                    <p>Community Investment</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="impact-stat">
                                    <h3 className="display-4 text-primary">10K+</h3>
                                    <p>Volunteer Hours</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="impact-stat">
                                    <h3 className="display-4 text-primary">100+</h3>
                                    <p>Local Partners</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="impact-stat">
                                    <h3 className="display-4 text-primary">50+</h3>
                                    <p>Community Programs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Key Initiatives */}
                <section className="key-initiatives py-5">
                    <div className="container">
                        <h2 className="section-title text-center mb-5">Key Initiatives</h2>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="initiative-content">
                                    <h3>Affordable Housing</h3>
                                    <p>Working with local organizations to increase access to affordable housing through:</p>
                                    <ul className="initiative-list">
                                        <li>First-time homebuyer programs</li>
                                        <li>Housing assistance partnerships</li>
                                        <li>Community development projects</li>
                                    </ul>
                                    <Link to="#" className="btn btn-outline-primary">Learn More</Link>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="initiative-content">
                                    <h3>Environmental Sustainability</h3>
                                    <p>Promoting sustainable real estate practices through:</p>
                                    <ul className="initiative-list">
                                        <li>Green building initiatives</li>
                                        <li>Energy efficiency programs</li>
                                        <li>Sustainable development guidelines</li>
                                    </ul>
                                    <Link to="#" className="btn btn-outline-primary">Learn More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Community Programs */}
                <section className="community-programs py-5 bg-light">
                    <div className="container">
                        <h2 className="section-title text-center mb-5">Our Programs</h2>
                        <div className="row">
                            <div className="col-lg-8 mx-auto">
                                <div className="program-timeline">
                                    <div className="program-item">
                                        <h4>Youth Education Initiative</h4>
                                        <p>Mentoring programs and real estate education for young professionals</p>
                                    </div>
                                    <div className="program-item">
                                        <h4>Community Revitalization</h4>
                                        <p>Partnering with local organizations to restore and improve neighborhoods</p>
                                    </div>
                                    <div className="program-item">
                                        <h4>Small Business Support</h4>
                                        <p>Providing resources and mentorship to local real estate entrepreneurs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Success Stories */}
                <section className="success-stories py-5">
                    <div className="container">
                        <h2 className="section-title text-center mb-5">Impact Stories</h2>
                        <div className="row">
                            <div className="col-md-8 mx-auto">
                                <div className="story-content">
                                    <blockquote className="impact-quote">
                                        <p>"Through URBANCRAFT REAL ESTATE's first-time homebuyer program, we were able to achieve our dream of homeownership. The support and guidance we received was invaluable."</p>
                                        <footer className="blockquote-footer">Sarah & John Martinez, Program Participants</footer>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Get Involved */}
                <section className="get-involved py-5 bg-primary text-white">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h2 className="mb-4">Make an Impact</h2>
                                <p className="lead mb-4">Join us in building stronger communities through real estate</p>
                                <div className="cta-buttons">
                                    <button className="btn btn-light btn-lg me-3">Volunteer</button>
                                    <button className="btn btn-outline-light btn-lg">Partner With Us</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Annual Report */}
                <section className="annual-report py-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h2 className="section-title">2024 Community Impact Report</h2>
                                <p className="lead mb-4">Download our annual report to learn more about our community initiatives and their impact.</p>
                                <button className="btn btn-primary">Download Report</button>
                            </div>
                            <div className="col-md-6">
                                <div className="report-highlights">
                                    <h4>Report Highlights:</h4>
                                    <ul className="highlight-list">
                                        <li>Community Investment Overview</li>
                                        <li>Program Success Metrics</li>
                                        <li>Partner Testimonials</li>
                                        <li>Future Initiatives</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default CommunityImpact;
