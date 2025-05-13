import React, { useState } from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet
import './HelpCenter.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';

const HelpCenter = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality
    };

    return (
        <>
        <Helmet>
                <title>Help Center | Get the Support You Need</title>
                <meta name="description" content="Find all the support you need in our Help Center. Browse FAQs, user guides, and contact our support team for assistance." />
                <meta name="keywords" content="help center, customer support, FAQs, contact support, troubleshooting, user guides" />
            </Helmet>
            <Header />
            <div className="help-center-container">
                {/* Hero Section with Search */}
                <section className="help-hero text-center py-5">
                    <div className="container">
                        <h1 className="display-4 fw-bold mb-4">How can we help you?</h1>
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <form onSubmit={handleSearch} className="search-form">
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Search for help articles..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <button className="btn btn-primary btn-lg" type="submit">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Links Section */}
                <section className="quick-links py-5">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-md-3">
                                <div className="quick-link-card">
                                    <div className="icon-wrapper mb-3">
                                        <i className="fas fa-user-circle fa-2x"></i>
                                    </div>
                                    <h3 className="h5">Account Management</h3>
                                    <ul className="list-unstyled">
                                        <li><a href="#">Create an Account</a></li>
                                        <li><a href="#">Reset Password</a></li>
                                        <li><a href="#">Profile Settings</a></li>
                                        <li><a href="#">Billing Information</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="quick-link-card">
                                    <div className="icon-wrapper mb-3">
                                        <i className="fas fa-handshake fa-2x"></i>
                                    </div>
                                    <h3 className="h5">Referral Program</h3>
                                    <ul className="list-unstyled">
                                        <li><a href="#">How Referrals Work</a></li>
                                        <li><a href="#">Commission Structure</a></li>
                                        <li><a href="#">Track Referrals</a></li>
                                        <li><a href="#">Payment Process</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="quick-link-card">
                                    <div className="icon-wrapper mb-3">
                                        <i className="fas fa-shield-alt fa-2x"></i>
                                    </div>
                                    <h3 className="h5">Safety & Security</h3>
                                    <ul className="list-unstyled">
                                        <li><a href="#">Privacy Settings</a></li>
                                        <li><a href="#">Security Tips</a></li>
                                        <li><a href="#">Report an Issue</a></li>
                                        <li><a href="#">Terms of Service</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="quick-link-card">
                                    <div className="icon-wrapper mb-3">
                                        <i className="fas fa-tools fa-2x"></i>
                                    </div>
                                    <h3 className="h5">Technical Support</h3>
                                    <ul className="list-unstyled">
                                        <li><a href="#">System Requirements</a></li>
                                        <li><a href="#">Troubleshooting</a></li>
                                        <li><a href="#">Browser Support</a></li>
                                        <li><a href="#">Mobile App Help</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Popular Articles Section */}
                <section className="popular-articles py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center mb-4">Popular Articles</h2>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="article-card">
                                    <h3 className="h6 mb-3">
                                        <i className="fas fa-star text-warning me-2"></i>
                                        How to Maximize Your Referral Earnings
                                    </h3>
                                    <p className="text-muted">Learn the best practices for increasing your referral success rate and maximizing your earnings potential.</p>
                                    <Link to="#" className="btn btn-outline-primary btn-sm">Read More</Link>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="article-card">
                                    <h3 className="h6 mb-3">
                                        <i className="fas fa-star text-warning me-2"></i>
                                        Understanding Commission Structures
                                    </h3>
                                    <p className="text-muted">A comprehensive guide to our commission tiers and how to advance to higher earning levels.</p>
                                    <Link to="#" className="btn btn-outline-primary btn-sm">Read More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section - New Addition */}
                <section className="faq-section py-5">
                    <div className="container">
                        <h2 className="text-center mb-4">Frequently Asked Questions</h2>
                        <div className="row g-4">
                            <div className="col-lg-6">
                                <div className="accordion" id="faqAccordion">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                                How do I start earning referral commissions?
                                            </button>
                                        </h2>
                                        <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                Getting started is easy! Simply sign up for an account, complete your profile, and share your unique referral link with potential customers.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                                When do I receive my commission payments?
                                            </button>
                                        </h2>
                                        <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body">
                                                Commissions are processed monthly and paid out by the 15th of each month for the previous month's earnings.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="accordion" id="faqAccordion2">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                                What are the system requirements?
                                            </button>
                                        </h2>
                                        <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion2">
                                            <div className="accordion-body">
                                                Our platform works on any modern web browser. For the best experience, we recommend using the latest versions of Chrome, Firefox, or Safari.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                                                How can I track my referrals?
                                            </button>
                                        </h2>
                                        <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion2">
                                            <div className="accordion-body">
                                                You can track all your referrals in real-time through your dashboard. It shows detailed statistics, conversion rates, and earnings.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Resources Section - New Addition */}
                <section className="resources-section py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center mb-4">Additional Resources</h2>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="resource-card text-center p-4">
                                    <i className="fas fa-book-open fa-3x mb-3 text-primary"></i>
                                    <h3 className="h5">User Guides</h3>
                                    <p>Comprehensive guides to help you navigate our platform effectively.</p>
                                    <Link to="#" className="btn btn-outline-primary">View Guides</Link>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="resource-card text-center p-4">
                                    <i className="fas fa-video fa-3x mb-3 text-primary"></i>
                                    <h3 className="h5">Video Tutorials</h3>
                                    <p>Step-by-step video guides for visual learners.</p>
                                    <Link to="#" className="btn btn-outline-primary">Watch Videos</Link>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="resource-card text-center p-4">
                                    <i className="fas fa-file-download fa-3x mb-3 text-primary"></i>
                                    <h3 className="h5">Downloads</h3>
                                    <p>Access marketing materials, templates, and other useful resources.</p>
                                    <Link to="#" className="btn btn-outline-primary">Download Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Support Section */}
                <section className="contact-support py-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h2 className="mb-4">Still Need Help?</h2>
                                <p className="lead mb-4">Our support team is available 24/7 to assist you with any questions or concerns.</p>
                                <div className="contact-options">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="icon-wrapper me-3">
                                            <i className="fas fa-phone"></i>
                                        </div>
                                        <div>
                                            <h4 className="h6 mb-1">Call Us</h4>
                                            <p className="mb-0">1-844-759-7732</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="icon-wrapper me-3">
                                            <i className="fas fa-envelope"></i>
                                        </div>
                                        <div>
                                            <h4 className="h6 mb-1">Email Us</h4>
                                            <p className="mb-0">support@znet.com</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="icon-wrapper me-3">
                                            <i className="fas fa-comments"></i>
                                        </div>
                                        <div>
                                            <h4 className="h6 mb-1">Live Chat</h4>
                                            <p className="mb-0">Available 24/7</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default HelpCenter;