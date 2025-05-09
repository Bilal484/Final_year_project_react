import React, { useState, useEffect } from 'react';
import './Footer.css';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Footer = () => {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('user_email');
    const isLoggedIn = !!userEmail;
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClick = (path) => {
        navigate(path);
        scrollToTop();
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Implement newsletter subscription logic
        alert(`Thank you for subscribing with: ${email}`);
        setEmail('');
    };

    return (
        <>
            <Helmet>
                <title>URBANCRAFT REAL ESTATE - Simplify Real Estate Networking</title>
                <meta name="description" content="Join URBANCRAFT REAL ESTATE to simplify real estate networking. Explore opportunities to become an agent, careers, community impact, and more." />
                <meta name="keywords" content="URBANCRAFT, Real Estate, Careers, Agents, Networking, Fair Housing Policy, Subsidiaries" />
                <meta name="author" content="URBANCRAFT" />
            </Helmet>

            <div className={`back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={scrollToTop}>
                <i className="fa-solid fa-arrow-up"></i>
            </div>

            <footer className="py-4 mt-5 position-relative">
                {/* Banner Section */}
                <div className="footer-banner text-white py-5 px-3 text-center mb-5">
                    <div className="container">
                        <h2 className="fw-bold mb-3">Ready to Simplify Real Estate Networking?</h2>
                        <p className="lead mb-4 mx-auto" style={{ maxWidth: '700px' }}>
                            Join thousands of professionals on UrbanCraft REAL ESTATE today and elevate your real estate experience.
                        </p>
                        {isLoggedIn ? (
                            <div className="user-email py-2">
                                <p className="text-white mb-0 fs-5">
                                    <i className="fa-regular fa-envelope me-2"></i> 
                                    {userEmail}
                                </p>
                            </div>
                        ) : (
                            <Link
                                to="/SignUp"
                                className="btn btn-light text-primary fw-semibold px-4 py-2"
                            >
                                Sign Up for Free <i className="fa-solid fa-arrow-right ms-2"></i>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="container">
                    <div className="row g-4">
                        {/* First Column - Join us */}
                        <div className="col-12 col-sm-6 col-md-3 footer-column">
                            <h6 className="footer-heading">Join UrbanCraft</h6>
                            <ul className="footer-links">
                                <li>
                                    <Link
                                        onClick={() => handleClick('/BecomeAnAgent')}
                                        to='/BecomeAnAgent'
                                        className="hover-link"
                                    >
                                        Become an Agent
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/Careers')}
                                        to='/Careers'
                                        className="hover-link"
                                    >
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/Partnerships')}
                                        to='/Partnerships'
                                        className="hover-link"
                                    >
                                        Partners Program
                                    </Link>
                                </li>
                            </ul>

                            <h6 className="footer-heading mt-4">Stay Updated</h6>
                            <p className="text-muted small">Subscribe to our newsletter</p>
                            <form onSubmit={handleSubscribe} className="newsletter-form">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="newsletter-input"
                                    placeholder="Your email address"
                                    required
                                />
                                <button type="submit" className="newsletter-btn">Subscribe</button>
                            </form>
                        </div>

                        {/* Second Column - About us */}
                        <div className="col-12 col-sm-6 col-md-3 footer-column">
                            <h6 className="footer-heading">About Us</h6>
                            <ul className="footer-links">
                                <li>
                                    <Link
                                        onClick={() => handleClick('/WhyZnet')}
                                        to='/WhyZnet'
                                        className="hover-link"
                                    >
                                        Why URBANCRAFT REAL ESTATE?
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/CommunityImpact')}
                                        to='/CommunityImpact'
                                        className="hover-link"
                                    >
                                        Community Impact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/DiversityInclusion')}
                                        to='/DiversityInclusion'
                                        className="hover-link"
                                    >
                                        Diversity &amp; Inclusion
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/ZnetLife')}
                                        to='/ZnetLife'
                                        className="hover-link"
                                    >
                                        Life at URBANCRAFT
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/PressFooter')}
                                        to='/PressFooter'
                                        className="hover-link"
                                    >
                                        Press Releases
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/Blog')}
                                        to='/Blog'
                                        className="hover-link"
                                    >
                                        Blog &amp; Resources
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/News')}
                                        to='/News'
                                        className="hover-link"
                                    >
                                        Real Estate News
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Third Column - Find us */}
                        <div className="col-12 col-sm-6 col-md-3 footer-column">
                            <h6 className="footer-heading">Resources</h6>
                            <ul className="footer-links">
                                <li>
                                    <Link
                                        onClick={() => handleClick('/Contact')}
                                        to='/Contact'
                                        className="hover-link"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/HelpCenter')}
                                        to='/HelpCenter'
                                        className="hover-link"
                                    >
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/AdvertiseFooter')}
                                        to='/AdvertiseFooter'
                                        className="hover-link"
                                    >
                                        Advertise With Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/FAQs')}
                                        to='/FAQs'
                                        className="hover-link"
                                    >
                                        FAQs
                                    </Link>
                                </li>
                            </ul>

                            <h6 className="footer-heading mt-4">Connect With Us</h6>
                            <div className="social-icons d-flex gap-3 mt-2 flex-wrap flex-row "> 
                                <a href="https://www.facebook.com/share/18XKUtcGCC/?mibextid=wwXIfr" className="social-icon" aria-label="Facebook">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/zhara-fernandez-256b8b148?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="social-icon" aria-label="LinkedIn">
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </a>
                                <a href="https://www.instagram.com/zharanashvillerealtor_/profilecard/?igsh=d2o1cXh4OW40cnIw" className="social-icon" aria-label="Instagram">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                                <a href="https://twitter.com/urbancraft" className="social-icon" aria-label="Twitter">
                                    <i className="fa-brands fa-twitter"></i>
                                </a>
                            </div>
                        </div>

                        {/* Fourth Column - Subsidiaries and Countries */}
                        <div className="col-12 col-sm-6 col-md-3 footer-column">
                            <h6 className="footer-heading">Our Network</h6>
                            <ul className="footer-links">
                                <li>
                                    <a href="https://www.rent.com/" className="hover-link">
                                        Rent.com
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.apartmentguide.com/" className="hover-link">
                                        ApartmentGuide
                                    </a>
                                </li>
                                <li>
                                    <a href="https://bayequityhomeloans.com/" className="hover-link">
                                        Bay Equity Home Loans
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.titleforward.com/tf" className="hover-link">
                                        Title Forward
                                    </a>
                                </li>
                            </ul>

                            <h6 className="footer-heading mt-4">Locations</h6>
                            <div className="countries-dropdown">
                                <span><i className="fa-solid fa-location-dot me-2"></i> Rahim Yar Khan</span>
                            </div>
                    
                        </div>
                    </div>

                </div>
            </footer>
        </>
    );
};

export default Footer;

