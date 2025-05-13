import React from 'react';
import { Helmet } from 'react-helmet';
import './Careers.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ImageWithText from '../../components/ImagewithText';
import img01 from '../../assets/images/Owner-Dashboard/photography.jpg';
import img02 from '../../assets/images/Owner-Dashboard/Sell with Redfin/MarketingIcon_cash_offer.png';
import img03 from '../../assets/images/Owner-Dashboard/Sell with Redfin/AboutPremierDesktop.jpg';

const Careers = () => {
    return (
        <>
         <Helmet>
                <title>Careers at Our Company - Join Our Mission</title>
                <meta name="description" content="Explore career opportunities at our company and help us transform the future of real estate networking. Join our team today!" />
                <meta name="keywords" content="careers, job openings, real estate careers, join our team, employment opportunities" />
                <meta property="og:title" content="Careers at Our Company - Join Our Mission" />
                <meta property="og:description" content="Discover your next career opportunity with us and be a part of a team that values innovation and collaboration." />
                <meta property="og:image" content={img01} />
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Careers at Our Company - Join Our Mission" />
                <meta name="twitter:description" content="Join our team and contribute to the future of real estate networking. Explore our current job openings and apply today." />
                <meta name="twitter:image" content={img01} />
            </Helmet>
            <Header />
            <div className="careers-container">
                {/* Hero Section */}
                <section className="hero-section text-center py-5 bg-primary text-white">
                    <div className="container">
                        <h1 className="display-4 fw-bold mb-3">Join Our Mission</h1>
                        <p className="lead mb-4">Help us transform the future of real estate networking</p>
                        <div className="stats-row row justify-content-center text-center mt-5">
                            <div className="col-md-4">
                                <h2 className="display-3 fw-bold">500+</h2>
                                <p>Team Members</p>
                            </div>
                            <div className="col-md-4">
                                <h2 className="display-3 fw-bold">20+</h2>
                                <p>Office Locations</p>
                            </div>
                            <div className="col-md-4">
                                <h2 className="display-3 fw-bold">4.8★</h2>
                                <p>Employee Rating</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Current Openings Section */}
                <section className="openings-section py-5">
                    <div className="container">
                        <h2 className="text-center mb-5">Current Opportunities</h2>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="department-card p-4 shadow-sm rounded">
                                    <h3 className="h5 mb-3">Engineering</h3>
                                    <ul className="list-unstyled">
                        
                                        <li className="mb-3">
                                            <a href="#" className="text-decoration-none">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>Senior Frontend Developer</span>
                                                    <i className="fas fa-arrow-right"></i>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="mb-3">
                                            <a href="#" className="text-decoration-none">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>Backend Engineer</span>
                                                    <i className="fas fa-arrow-right"></i>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="department-card p-4 shadow-sm rounded">
                                    <h3 className="h5 mb-3">Sales & Marketing</h3>
                                    <ul className="list-unstyled">
                                        <li className="mb-3">
                                            <a href="#" className="text-decoration-none">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>Sales Manager</span>
                                                    <i className="fas fa-arrow-right"></i>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="mb-3">
                                            <a href="#" className="text-decoration-none">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>Digital Marketing Specialist</span>
                                                    <i className="fas fa-arrow-right"></i>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="department-card p-4 shadow-sm rounded">
                                    <h3 className="h5 mb-3">Customer Success</h3>
                                    <ul className="list-unstyled">
                                        <li className="mb-3">
                                            <a href="#" className="text-decoration-none">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>Customer Support Lead</span>
                                                    <i className="fas fa-arrow-right"></i>
                                                </div>
                                            </a>
                                        </li>
                                        <li className="mb-3">
                                            <a href="#" className="text-decoration-none">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span>Account Manager</span>
                                                    <i className="fas fa-arrow-right"></i>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="benefits-section py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center mb-5">Why Work With Us</h2>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="benefit-card text-center p-4">
                                    <i className="fas fa-heart fa-2x text-primary mb-3"></i>
                                    <h3 className="h5">Health & Wellness</h3>
                                    <p>Comprehensive health coverage, wellness programs, and mental health support</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="benefit-card text-center p-4">
                                    <i className="fas fa-chart-line fa-2x text-primary mb-3"></i>
                                    <h3 className="h5">Growth & Development</h3>
                                    <p>Learning stipend, mentorship programs, and career advancement opportunities</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="benefit-card text-center p-4">
                                    <i className="fas fa-balance-scale fa-2x text-primary mb-3"></i>
                                    <h3 className="h5">Work-Life Balance</h3>
                                    <p>Flexible work arrangements, unlimited PTO, and paid parental leave</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="container">
                <ImageWithText
                    content="Join a culture of innovation and collaboration where your ideas matter. We're building the future of real estate networking together, fostering an environment where creativity thrives and every team member can make a real impact."
                    imgSrc={img01}
                    altText="URBANCRAFT REAL ESTATE company culture and workspace"
                    title="Culture of Innovation"
                    imagePosition="left"
                />
                <ImageWithText
                    content="We invest in our people with competitive compensation, comprehensive benefits, and continuous learning opportunities. From health and wellness programs to flexible work arrangements, we ensure our team members thrive both professionally and personally."
                    imgSrc={img02}
                    altText="Employee benefits and perks"
                    title="Benefits That Matter"
                    imagePosition="right"
                />
                <ImageWithText
                    content="Your growth is our priority. We provide clear career paths, mentorship programs, and learning opportunities to help you achieve your professional goals. Join us and be part of a team that's committed to your success."
                    imgSrc={img03}
                    altText="Professional development and growth"
                    title="Grow With Us"
                    imagePosition="left"
                />
            </div>
            <Footer />
        </>
    );
};

export default Careers;