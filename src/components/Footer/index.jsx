import React from 'react'
import './Footer.css'
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Footer = () => {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('user_email');
    const isLoggedIn = userEmail ? true : false;


    const handleClick = (path) => {
        navigate(path);
        setTimeout(scrollToTop, 200)
    };

    const scrollToTop = () => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <Helmet>
                <title>ZNET - Simplify Real Estate Networking</title>
                <meta name="description" content="Join ZNET to simplify real estate networking. Explore opportunities to become an agent, careers, community impact, and more." />
                <meta name="keywords" content="ZNET, Real Estate, Careers, Agents, Networking, Fair Housing Policy, Subsidiaries" />
                <meta name="author" content="ZNET" />
            </Helmet>
            <footer className="bg-light text-dark py-4 my-3 mb-5 position-relative">
                <button
                    onClick={scrollToTop}
                    className="position-sticky  d-md-block bottom-0 end-0 m-3 btn btn-primary rounded-circle"
                    style={{
                        width: '45px',
                        height: '45px',
                        zIndex: 1000,
                        backgroundColor: 'var(--background_color)'
                    }}
                >
                    <i className="fa-solid fa-arrow-up fs-5"></i>
                </button>

                <div className="text-white py-4 py-md-5 px-2 text-center mb-4"
                    style={{
                        backgroundColor: 'var(--background_color)',
                        borderTopLeftRadius: '30px',
                        borderTopRightRadius: '30px'
                    }}
                >
                    <h2 className="fw-bold mb-3 fs-3 fs-md-2">Ready to Simplify Real Estate Networking?</h2>
                    <p className="lead mb-4 fs-6 fs-md-5">Join thousands of professionals on ZNet today.</p>
                    {isLoggedIn ? (
                        <div className="user-email">
                            <p className="text-white py-2 py-md-2 text-center mb-1"> {userEmail}</p>
                        </div>
                    ) : (
                        <Link
                            to="/SignUp"
                            className="btn btn-secondary btn-lg text-white fw-semibold"
                        >
                            Sign Up for Free
                        </Link>
                    )}
                </div>

                <div className="container">
                    <div className="row g-4">
                        <div className="col-12 col-sm-6 col-md-2">
                            <h6 className="fw-semibold">Join us</h6>
                            <ul className="list-unstyled mt-2">
                                <li>
                                    <Link
                                        onClick={() => handleClick('/BecomeAnAgent')}
                                        to='/BecomeAnAgent'
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        Become an Agent
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/Careers')}
                                        to='/Careers'
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        Careers
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-sm-6 col-md-2">
                            <h6 className="fw-semibold">About us</h6>
                            <ul className="list-unstyled mt-2">
                                <li>
                                    <Link
                                        onClick={() => handleClick('/WhyZnet')}
                                        to='/WhyZnet'
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        Why ZNET?
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/CommunityImpact')}
                                        to='/CommunityImpact'
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        Community Impact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/DiversityInclusion')}
                                        to='/DiversityInclusion'
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        Diversity &amp; Inclusion
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/ZnetLife')}
                                        to='/ZnetLife'
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        Life at ZNET
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/PressFooter')}
                                        to='/PressFooter'
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        Press
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/InvestorsFooter')}
                                        to='/InvestorsFooter'
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        
                                        
                                        
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/Blog')}
                                        to='/Blog'
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/News')}
                                        to='/News'
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        Real Estate News
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-sm-6 col-md-2">
                            <h6 className="fw-semibold">Find us</h6>
                            <ul className="list-unstyled mt-2">
                                <li>
                                    <Link
                                        onClick={() => handleClick('/Contact')}
                                        to='/Contact'
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/HelpCenter')}
                                        to='/HelpCenter'
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        Help  Center
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={() => handleClick('/AdvertiseFooter')}
                                        to='/AdvertiseFooter'
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        Advertise
                                    </Link>
                                </li>
                            </ul>
                            <div className="d-flex my-3">
                                <a href="https://www.facebook.com/share/18XKUtcGCC/?mibextid=wwXIfr" className="text-muted me-2">
                                    <i className="fa-brands fa-facebook" />
                                </a>
                                <Link to="https://www.linkedin.com/in/zhara-fernandez-256b8b148?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="text-muted me-2">
                                    <i className="fa-brands fa-linkedin" />
                                </Link>
                                <Link to="https://www.instagram.com/zharanashvillerealtor_/profilecard/?igsh=d2o1cXh4OW40cnIw" className="text-muted">
                                    <i className="fa-brands fa-instagram" />
                                </Link>
                            </div>
                            <h6 className="fw-semibold">Subsidiaries</h6>
                            <ul className="list-unstyled mt-2">
                                <li>
                                    <a
                                        href="https://www.rent.com/"
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        Rent.
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.apartmentguide.com/"
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        ApartmentGuide
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://bayequityhomeloans.com/"
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        Bay Equity Home Loans
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.titleforward.com/tf"
                                        className="text-muted text-decoration-none hover-link"
                                    >
                                        Title Forward
                                    </a>
                                </li>
                            </ul>
                            <h6 className="fw-semibold">Countries</h6>
                            <ul className="list-unstyled mt-2">
                                <li className="d-flex align-items-center">
                                    <span>🇺🇸 United States</span>
                                </li>
                                {/* <li className="d-flex align-items-center">
                                    <span>🇨🇦 Canada</span>
                                </li> */}
                            </ul>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="bg-light p-3 p-md-4 text-muted">
                                <p className="mb-2 small">
                                    Copyright: © 2025 ZNET. All rights reserved.
                                </p>
                                <p className="mb-2 small">
                                    Updated January 2025: By searching, you agree to the{" "}
                                    <Link to="/TermandUse" className="text-decoration-none ">
                                        Terms of Use
                                    </Link>
                                    , and{" "}
                                    <Link to="/PrivacyPolicy" className="text-decoration-none ">
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                                <p className="mb-2 small">
                                    <Link to="javascript:void(0)" className="text-decoration-none ">
                                        Do not sell or share my personal information.
                                    </Link>
                                </p>
                                <p className="mb-2 small">
                                    ZNet is not licensed anywhere. It’s just a platform for networking.
                                </p>
                                <p className="mb-2 small">
                                    <Link to="javascript:void(0)" className="text-decoration-none ">
                                        TN Standard Operating Procedures
                                    </Link>
                                </p>
                                <p className="mb-2 small">New Mexico Real Estate Licenses</p>
                                <p className="mb-2 small">
                                    {/* <Link to="javascript:void(0)" className="text-decoration-none ">
                                        TREC: Info About Brokerage Services, Consumer Protection Notice
                                    </Link> */}
                                </p>
                                <p className="mt-4 small">
                                    If you are using a screen reader, or having trouble reading this
                                    website, please call ZNET Customer Support for help at{" "}
                                    <Link to="tel:(844) 844-2707" className="text-decoration-none ">
                                    (844) 844-2707
                                    </Link>
                                    .
                                </p>
                                <p className="mt-4 small font-weight-bold">
                                    🏠 ZNET IS COMMITTED TO AND ABIDES BY THE FAIR HOUSING ACT AND
                                    EQUAL OPPORTUNITY ACT.
                                    <Link to="javascript:void(0)" className="text-decoration-none ">
                                        READ ZNET'S FAIR HOUSING POLICY
                                    </Link>{" "}
                                    AND THE
                                    <Link to="javascript:void(0)" className="text-decoration-none ">
                                    Tennessee  STATE FAIR HOUSING NOTICE
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;

