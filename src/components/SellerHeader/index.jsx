import React, { useEffect, useState } from "react";
import "./SellerHeader.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet"; 

const SellerHeader = () => {
    const [totalFavJobs, setTotalFavJobs] = useState(0);

    const fetchTotalFavJobs = async () => {
        try {
            const storedTotalFavJobs = localStorage.getItem("totalFavJobs");
            setTotalFavJobs(parseInt(storedTotalFavJobs));
        } catch (err) {
        }
    }

    useEffect(() => {
        fetchTotalFavJobs();
    }, [])


    return (
        <>
            <>
            <Helmet>
                <title>Seller Header - Job Opportunities</title>
                <meta name="description" content="Explore various job opportunities with us including real estate agents, title, escrow jobs, and more." />
                <meta name="keywords" content="real estate, job opportunities, apply, agent, full time, job listing" />
                <meta name="author" content="UrbanCraft REAL ESTATE Careers" />
                <meta property="og:title" content="Seller Header - Job Opportunities" />
                <meta property="og:description" content="Find job opportunities and explore career growth at UrbanCraft REAL ESTATE. Apply to real estate and agent jobs now." />
                <meta property="og:image" content="/assets/images/real-estate-opportunities.jpg" />
                <meta name="twitter:title" content="Seller Header - Job Opportunities" />
                <meta name="twitter:description" content="Explore job listings and apply to the best real estate and agent opportunities at UrbanCraft REAL ESTATE." />
                <meta name="twitter:image" content="/assets/images/real-estate-opportunities.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                {/* Include any additional meta tags you may need */}
            </Helmet>
                <div id="customHeader">
                    <div className="user-header-parent">
                        <div className="bg-background text-black w-100">
                            <nav className="navbar navbar-expand-lg">
                                <div className="container-fluid justify-content-end ">
                                    <button
                                        className="navbar-toggler"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#navbarNav"
                                        aria-controls="navbarNav"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                        <span className="navbar-toggler-icon" />
                                    </button>
                                    <div
                                        className="collapse navbar-collapse justify-content-around"
                                        id="navbarNav"
                                    >
                                        <ul className="navbar-nav">
                                            <li className="nav-item dropdown">
                                                <Link
                                                    className="nav-link dropdown-toggle btn-more-user-panel border-0 pt-2"
                                                    to="#"
                                                    id="navbarDropdown"
                                                    role="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Job Opportunities
                                                </Link>
                                                <ul
                                                    className="dropdown-menu"
                                                    aria-labelledby="navbarDropdown"
                                                >
                                                    <li>
                                                        <Link className="dropdown-item" to="/AllTeam">
                                                            All Team
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/JoinAgent">
                                                            Join as Agent
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/AllJob">
                                                            All Jobs
                                                        </Link>
                                                    </li>
                                                    {/* <li>
                                                        <Link className="dropdown-item" to="/HVHApply">
                                                            Real Estate Agents
                                                        </Link>
                                                    </li> */}
                                                    <li>
                                                        <Link
                                                            className="dropdown-item"
                                                            to="/AssociateAgentIndependent"
                                                        >
                                                            Asociate Agent-Independent Constructor
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="#">
                                                            Title And Escrow Jobs
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            className="dropdown-item"
                                                            to="/JoinTalentCommunity"
                                                        >
                                                            Join Our Talent Community
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            {/* <li className="nav-item dropdown">
                                                <Link
                                                    className="nav-link dropdown-toggle btn-more-user-panel border-0 pt-2"
                                                    to="#"
                                                    id="navbarDropdown"
                                                    role="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Why Choose UrbanCraft REAL ESTATE
                                                </Link>
                                                <ul
                                                    className="dropdown-menu"
                                                    aria-labelledby="navbarDropdown"
                                                >
                                                    <li>
                                                        <Link className="dropdown-item" to="#">
                                                            Mission Values
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="#">
                                                            Diversity
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="#">
                                                            Life At UrbanCraft REAL ESTATE
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="#">
                                                            Community Impact
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li> */}
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/CareerAgent">
                                                    Career
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                {/* Candidate Login Modal Button */}
                                                {/* Candidate Login Modal Button */}
                                                <Link
                                                    className="nav-link"
                                                    to="#"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#candidateLoginModal"
                                                >
                                                    Candidate Login
                                                </Link>
                                            </li>
                                            {/* login model */}
                                            {/*  */}
                                            <li className="nav-item">
                                                <Link className="nav-link" to="#">
                                                    <i className="fa-regular fa-user" /> SignUp
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/SaveJob">
                                                    <i className="fa-regular fa-heart" /> Saved Jobs({totalFavJobs})
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/CreateJob">
                                                    Create New Job
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                <main>
                    {/* Candidate Login Modal */}
                    {/* Candidate Login Modal */}
                    <div
                        className="modal fade candidate-login-modal-unique"
                        id="candidateLoginModal"
                        tabIndex={-1}
                        aria-labelledby="candidateLoginModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered candidate-login-dialog-unique">
                            <div className="modal-content candidate-login-content-unique">
                                <div className="modal-header candidate-login-header-unique">
                                    <h5
                                        className="modal-title candidate-login-title-unique"
                                        id="candidateLoginModalLabel"
                                    >
                                        Sign in to save your personalized profile
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-custom-unique"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body candidate-login-body-unique">
                                    <form className="candidate-login-form-unique">
                                        {/* Email input */}
                                        <div className="mb-3 candidate-login-email-group-unique">
                                            <label
                                                htmlFor="email"
                                                className="form-label candidate-login-label-unique"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control candidate-login-email-input-unique"
                                                id="email"
                                                placeholder="name@email.com"
                                                required=""
                                            />
                                        </div>
                                        {/* Password input with eye icon */}
                                        <div className="mb-3 candidate-login-password-group-unique">
                                            <label
                                                htmlFor="password"
                                                className="form-label candidate-login-label-unique"
                                            >
                                                Password
                                            </label>
                                            <div className="input-group candidate-login-password-input-group-unique">
                                                <input
                                                    type="password"
                                                    className="form-control candidate-login-password-input-unique"
                                                    id="password"
                                                    placeholder="Your Password"
                                                    required=""
                                                />
                                            </div>
                                        </div>
                                        {/* Sign in button */}
                                        <button
                                            type="submit"
                                            className="btn btn-danger w-100 candidate-login-submit-btn-unique"
                                        >
                                            Sign in
                                        </button>
                                        {/* Stay signed in checkbox and Forgot password link */}
                                        <div className="d-flex justify-content-between mt-3 candidate-login-stay-signedin-unique">
                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input candidate-login-checkbox-unique"
                                                    id="staySignedIn"
                                                />
                                                <label
                                                    className="form-check-label candidate-login-checkbox-label-unique"
                                                    htmlFor="staySignedIn"
                                                >
                                                    Stay signed in
                                                </label>
                                            </div>
                                            <div>
                                                <Link
                                                    href="#"
                                                    className="text-danger text-decoration-none candidate-login-forgot-password-link-unique"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                        </div>
                                        {/* Social login */}
                                        <div className="text-center text-muted mt-4 candidate-login-social-text-unique">
                                            or use your social account
                                        </div>
                                        <div className="d-flex justify-content-center mt-3 candidate-login-social-buttons-unique">
                                            <Link className="btn btn-white social-btn me-2 candidate-login-social-linkedin-unique">
                                                <i className="fa-brands fa-facebook-f" />
                                            </Link>
                                            <Link
                                                type="button"
                                                className="btn btn-danger social-btn candidate-login-social-google-unique"
                                            >
                                                <img
                                                    src="/assets/images/Apps-google-chrome-icon.png"
                                                    alt="Google"
                                                    className="social-icon"
                                                />
                                            </Link>
                                        </div>
                                        {/* Sign up link */}
                                        <div className="text-center mt-4 candidate-login-signup-unique">
                                            <p>
                                                Don’t have an account?
                                                <Link
                                                    href="#"
                                                    className="text-danger text-decoration-none candidate-login-signup-link-unique"
                                                >
                                                    Sign up
                                                </Link>
                                            </p>
                                        </div>
                                        {/* Terms and privacy */}
                                        <div className="modal-footer-links text-center text-muted candidate-login-footer-links-unique">
                                            <Link
                                                href="#"
                                                className="text-decoration-none candidate-login-terms-link-unique"
                                            >
                                                Terms Of Use
                                            </Link>{" "}
                                            |
                                            <Link
                                                href="#"
                                                className="text-decoration-none candidate-login-privacy-link-unique"
                                            >
                                                Privacy Policy
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>

        </>
    )

}
export default SellerHeader;
