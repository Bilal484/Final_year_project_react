import React from 'react';
import './AdvertiseFooter.css';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import img01 from '../../assets/images/Owner-Dashboard/home-active.jpg'
import img02 from '../../assets/images/Owner-Dashboard/home-active.jpg'
import img03 from '../../assets/images/Owner-Dashboard/home-active.jpg'
import ContactForm from '../../components/ContactForm';

const AdvertiseFooter = () => {
    return (
        <>
         <Helmet>
                <title>Advertise with URBANCRAFT REAL ESTATE - Reach Your Real Estate Goals</title>
                <meta name="description" content="Maximize your business's exposure with URBANCRAFT REAL ESTATE's effective advertising solutions tailored for the real estate industry." />
                <meta name="keywords" content="URBANCRAFT REAL ESTATE advertising, real estate marketing, effective advertising, real estate exposure, business growth" />
                <meta property="og:title" content="Advertise with URBANCRAFT REAL ESTATE - Reach Your Real Estate Goals" />
                <meta property="og:description" content="Discover how URBANCRAFT REAL ESTATE can help boost your visibility and connect with a vast network of real estate professionals and potential clients." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="/path/to/image.jpg" />  {/* Replace with a relevant image URL */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Advertise with URBANCRAFT REAL ESTATE - Reach Your Real Estate Goals" />
                <meta name="twitter:description" content="Enhance your real estate business's reach with our targeted advertising solutions, expert guidance, and dedicated support." />
                <meta name="twitter:image" content="/path/to/image.jpg" />  {/* Replace with a relevant image URL */}
            </Helmet>
            <Header />
            <div className="advertise-container">
                {/* Hero Section */}
                <section className="hero-section text-center text-white position-relative">
                    <div className="container py-5">
                        <h1 className="display-3 fw-bold mb-4">Advertise With URBANCRAFT REAL ESTATE</h1>
                        <p className="lead mb-4">Connect with millions of real estate professionals and potential clients</p>
                        <button className="btn btn-light btn-lg">Get Started</button>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="why-choose-us py-5">
                    <div className="container">
                        <h2 className="text-center mb-5">Why Choose URBANCRAFT REAL ESTATE Advertising?</h2>
                        <div className="row g-4">
                            <div className="col-md-3">
                                <div className="feature-box h-100 text-center">
                                    <i className="fas fa-chart-line fa-3x mb-3 text-primary"></i>
                                    <h4 className="h5 mb-3">Data-Driven Results</h4>
                                    <p className="text-muted">Advanced analytics and reporting to optimize your campaigns</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="feature-box h-100 text-center">
                                    <i className="fas fa-users fa-3x mb-3 text-primary"></i>
                                    <h4 className="h5 mb-3">Targeted Audience</h4>
                                    <p className="text-muted">Reach qualified real estate professionals and motivated buyers</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="feature-box h-100 text-center">
                                    <i className="fas fa-tools fa-3x mb-3 text-primary"></i>
                                    <h4 className="h5 mb-3">Flexible Tools</h4>
                                    <p className="text-muted">Customizable advertising solutions for any budget</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="feature-box h-100 text-center">
                                    <i className="fas fa-headset fa-3x mb-3 text-primary"></i>
                                    <h4 className="h5 mb-3">Expert Support</h4>
                                    <p className="text-muted">Dedicated team to help you achieve your marketing goals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="stats-section py-5">
                    <div className="container">
                        <div className="row g-4 text-center">
                            <div className="col-md-4">
                                <div className="stat-card">
                                    <h3 className="display-4 fw-bold text-primary">2M+</h3>
                                    <p className="text-muted">Monthly Active Users</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="stat-card">
                                    <h3 className="display-4 fw-bold text-primary">85%</h3>
                                    <p className="text-muted">Customer Engagement Rate</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="stat-card">
                                    <h3 className="display-4 fw-bold text-primary">50K+</h3>
                                    <p className="text-muted">Real Estate Professionals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Integration Benefits */}
                <section className="integration-benefits py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center mb-5">Seamless Platform Integration</h2>
                        <div className="row g-4">
                            <div className="col-md-6 col-lg-3">
                                <div className="integration-card text-center">
                                    <i className="fas fa-sync fa-3x mb-3 text-primary"></i>
                                    <h4 className="h5 mb-3">Real-Time Updates</h4>
                                    <p className="text-muted">Instant synchronization with your listing management system</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="integration-card text-center">
                                    <i className="fas fa-shield-alt fa-3x mb-3 text-primary"></i>
                                    <h4 className="h5 mb-3">Secure Integration</h4>
                                    <p className="text-muted">Enterprise-level security for all your data transfers</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="integration-card text-center">
                                    <i className="fas fa-code fa-3x mb-3 text-primary"></i>
                                    <h4 className="h5 mb-3">API Access</h4>
                                    <p className="text-muted">Full API support for custom integration needs</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="integration-card text-center">
                                    <i className="fas fa-plug fa-3x mb-3 text-primary"></i>
                                    <h4 className="h5 mb-3">Easy Setup</h4>
                                    <p className="text-muted">Quick implementation with major CRM platforms</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Advertising Options */}
                <section className="advertising-options py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center mb-5">Advertising Solutions</h2>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="option-card h-100">
                                    <div className="card-icon mb-4">
                                        <i className="fas fa-desktop fa-2x"></i>
                                    </div>
                                    <h3 className="h4 mb-3">Display Advertising</h3>
                                    <p className="text-muted mb-4">Premium placement across our platform with targeted display ads.</p>
                                    <ul className="feature-list">
                                        <li>Multiple ad sizes available</li>
                                        <li>Geo-targeting options</li>
                                        <li>Detailed performance metrics</li>
                                    </ul>
                                    <Link to="#" className="btn btn-outline-primary mt-auto">Learn More</Link>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="option-card h-100 featured">
                                    <div className="card-icon mb-4">
                                        <i className="fas fa-bullseye fa-2x"></i>
                                    </div>
                                    <h3 className="h4 mb-3">Sponsored Listings</h3>
                                    <p className="text-muted mb-4">Priority placement in search results and featured property sections.</p>
                                    <ul className="feature-list">
                                        <li>Enhanced visibility</li>
                                        <li>Custom branding options</li>
                                        <li>Lead generation tools</li>
                                    </ul>
                                    <Link to="#" className="btn btn-primary mt-auto">Get Started</Link>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="option-card h-100">
                                    <div className="card-icon mb-4">
                                        <i className="fas fa-envelope fa-2x"></i>
                                    </div>
                                    <h3 className="h4 mb-3">Email Marketing</h3>
                                    <p className="text-muted mb-4">Reach our subscriber base with targeted email campaigns.</p>
                                    <ul className="feature-list">
                                        <li>Segmented audiences</li>
                                        <li>A/B testing</li>
                                        <li>Campaign analytics</li>
                                    </ul>
                                    <Link to="#" className="btn btn-outline-primary mt-auto">Learn More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Platform Features */}
                <section className="platform-features py-5">
                    <div className="container">
                        <h2 className="text-center mb-5">Advanced Platform Features</h2>
                        <div className="row align-items-center g-5">
                            <div className="col-lg-6">
                                <div className="feature-list-wrapper">
                                    <div className="feature-item d-flex align-items-start mb-4">
                                        <div className="feature-icon me-3">
                                            <i className="fas fa-analytics fa-2x text-primary"></i>
                                        </div>
                                        <div>
                                            <h4 className="h5 mb-2">Advanced Analytics Dashboard</h4>
                                            <p className="text-muted">Track performance metrics and ROI in real-time with our comprehensive analytics suite.</p>
                                        </div>
                                    </div>
                                    <div className="feature-item d-flex align-items-start mb-4">
                                        <div className="feature-icon me-3">
                                            <i className="fas fa-robot fa-2x text-primary"></i>
                                        </div>
                                        <div>
                                            <h4 className="h5 mb-2">AI-Powered Optimization</h4>
                                            <p className="text-muted">Automatic campaign optimization using machine learning algorithms.</p>
                                        </div>
                                    </div>
                                    <div className="feature-item d-flex align-items-start">
                                        <div className="feature-icon me-3">
                                            <i className="fas fa-mobile-alt fa-2x text-primary"></i>
                                        </div>
                                        <div>
                                            <h4 className="h5 mb-2">Cross-Platform Compatibility</h4>
                                            <p className="text-muted">Seamless experience across all devices and platforms.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="feature-image text-center">
                                    <img src={img01} alt="Platform Features" className="img-fluid rounded shadow" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Success Stories */}
                <section className="success-stories py-5">
                    <div className="container">
                        <h2 className="text-center mb-5">Success Stories</h2>
                        <div className="row g-4">
                            <div className="col-md-6 col-lg-4">
                                <div className="story-card">
                                    <div className="story-content">
                                        <p className="story-text">"ZNET's advertising platform helped us increase our lead generation by 150% in just three months."</p>
                                        <div className="story-author">
                                            <img src={img01} alt="Client" className="author-image" />
                                            <div>
                                                <h4 className="author-name">John Smith</h4>
                                                <p className="author-title">CEO, Real Estate Pro</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="story-card">
                                    <div className="story-content">
                                        <p className="story-text">"The targeted advertising options helped us reach the exact audience we were looking for."</p>
                                        <div className="story-author">
                                            <img src={img02} alt="Client" className="author-image" />
                                            <div>
                                                <h4 className="author-name">Sarah Johnson</h4>
                                                <p className="author-title">Marketing Director</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="story-card">
                                    <div className="story-content">
                                        <p className="story-text">"Outstanding ROI and excellent support team. Highly recommended for real estate advertising."</p>
                                        <div className="story-author">
                                            <img src={img03} alt="Client" className="author-image" />
                                            <div>
                                                <h4 className="author-name">Michael Brown</h4>
                                                <p className="author-title">Agency Owner</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className=" py-5 bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 mb-4 mb-lg-0">
                                <h2 className="mb-4">Ready to Get Started?</h2>
                                <p className="lead mb-4">Our advertising specialists are here to help you create the perfect campaign for your business.</p>
                                <ul className="contact-info">
                                    <li><i className="fas fa-phone me-2"></i> (800) 123-4567</li>
                                    <li><i className="fas fa-envelope me-2"></i> advertising@znet.com</li>
                                </ul>
                            </div>
                            <div className="col-lg-6">
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

export default AdvertiseFooter;