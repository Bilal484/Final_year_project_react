import React from "react";
import { Helmet } from "react-helmet";
import img01 from "../../../../src/assets/images/Owner-Dashboard/photography.jpg";
import img02 from "../../../../src/assets/images/Owner-Dashboard/sign.jpg";
import img03 from "../../../../src/assets/images/Owner-Dashboard/flyers.jpg";
import img04 from "../../../../src/assets/images/Owner-Dashboard/home-active.jpg";
import UserHeader from "../../../components/UserHeader";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";

const OwnerDashboard = () => {
    return (
        <>
         <Helmet>
                <title>Owner Dashboard | UrbanCraft REAL ESTATE</title>
                <meta
                    name="description"
                    content="Manage your property listings and track their value with UrbanCraft REAL ESTATE's Owner Dashboard. Explore marketing services and claim your property today."
                />
                <meta
                    name="keywords"
                    content="owner dashboard, property management, UrbanCraft REAL ESTATE, property marketing, professional photos, MLS listing"
                />
                <meta property="og:title" content="Owner Dashboard | UrbanCraft REAL ESTATE" />
                <meta
                    property="og:description"
                    content="Optimize your property value and marketing with UrbanCraft REAL ESTATE's Owner Dashboard. Get professional photos, yard signs, and more."
                />
                <meta
                    property="og:image"
                    content="https://apitourism.today.alayaarts.com/uploads/owner-dashboard-placeholder.jpg"
                />
                <meta property="og:url" content="https://apitourism.today.alayaarts.com/owner-dashboard" />
                <meta property="og:type" content="website" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="Owner Dashboard | UrbanCraft REAL ESTATE" />
                <meta
                    property="twitter:description"
                    content="Manage your property listings and marketing with UrbanCraft REAL ESTATE's Owner Dashboard. Claim your property and explore professional marketing services."
                />
                <meta
                    property="twitter:image"
                    content="https://apitourism.today.alayaarts.com/uploads/owner-dashboard-placeholder.jpg"
                />
            </Helmet>
            <Header />
            <UserHeader />
            <div className="owner-dashboaed-parent py-5 mt-5 ">
                <div id="main-content">
                    {/* ==========Nav tab============= */}
                    <section>
                        <ul className="nav nav-tabs justify-content-center">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    My Properties
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle text-dark"
                                    data-bs-toggle="dropdown"
                                    href="#"
                                    role="button"
                                    aria-expanded="false"
                                >
                                    Selling Options
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Why Sell with UrbanCraft REAL ESTATE
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Full-Service Selling
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Find an Agent
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle text-dark"
                                    data-bs-toggle="dropdown"
                                    href="#"
                                    role="button"
                                    aria-expanded="false"
                                >
                                    Resources
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Home Selling Guide
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Should I Sell?
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Recommended Contractors
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Market Trends
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </section>
                    {/* ==========home start============= */}
                    <section>
                        <div className="container">
                            <div className="row">
                                <h1 className="text-center odhadding pb-3">Owner Dashboard</h1>
                                <div className="col-12 col-md-8 col-lg-8 px-4">
                                    <h3>What’s Your Property Worth?</h3>
                                    <p className="pt-4">
                                        Claim your property to monitor its value and see how many
                                        buyers are looking for homes like yours with UrbanCraft REAL ESTATE Real
                                        Estate.
                                    </p>
                                </div>
                                <div className="col-12 col-md-6 col-lg-6 px-4 pb-3 odborder">
                                    <label htmlFor="formGroupExampleInput" className="form-label">
                                        Property Address
                                    </label>
                                    <div className="d-flex border-0 bg-transparent align-items-center position-relative w-100">
                                        <input
                                            type="text"
                                            className="form-control py-2"
                                            id="formGroupExampleInput"
                                            placeholder="Enter your property address"
                                        />
                                        <span className="pt-2 position-absolute odsearch-icon bg-transparent">
                                            <i className="fa-solid fa-circle-xmark" />
                                        </span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-6 mt-2 px-4 border-bottom pb-3">
                                    <div className="ms-0">
                                        <button
                                            type="button"
                                            className="px-5 fw-bold odbtn-color py-2 mt-4 border-0 text-white"
                                        >
                                            Claim Your Property
                                        </button>
                                    </div>
                                </div>
                                <div className="col-12 col-md-12 col-lg-12">
                                    <h3 className="pt-5">Marketing Your Property</h3>
                                    <p className="pt-3">
                                        Get the best results with UrbanCraft REAL ESTATE’s professional marketing
                                        services.{" "}
                                        <a className="text-decoration-none" href="#">
                                            Learn more about our marketing solutions
                                        </a>
                                        .
                                    </p>
                                </div>
                                <div className="col-6 col-md-3 col-lg-3">
                                    <p className="mb-0">Professional Photos</p>
                                    <img
                                        className="w-100"
                                        src={img01}
                                        alt="Professional Photos"
                                    />
                                </div>
                                <div className="col-6 col-md-3 col-lg-3">
                                    <p className="mb-0">Yard Sign</p>
                                    <img className="w-100" src={img02} alt="Yard Sign" />
                                </div>
                                <div className="col-6 col-md-3 col-lg-3">
                                    <p className="mb-0">Brochure Flyers</p>
                                    <img className="w-100" src={img03} alt="Brochure Flyers" />
                                </div>
                                <div className="col-6 col-md-3 col-lg-3">
                                    <p className="mb-0">MLS Listing</p>
                                    <img className="w-100" src={img04} alt="MLS Listing" />
                                </div>
                                <a className="py-4" href="#">
                                    Show more
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default OwnerDashboard;
