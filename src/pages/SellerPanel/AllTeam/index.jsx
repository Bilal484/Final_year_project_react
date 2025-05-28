import React from "react";
import { Helmet } from "react-helmet"; // Import Helmet for meta tags
import "./AllTeam.css";
import SellerHeader from "../../../components/SellerHeader";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const AllTeam = () => {
    return (
        <>
         <Helmet>
                <title>All Careers - Pursue Your Passion at UrbanCraft REAL ESTATE</title>
                <meta
                    name="description"
                    content="Explore exciting career opportunities at UrbanCraft REAL ESTATE. Discover your perfect job match and take your career to the next level."
                />
                <meta name="keywords" content="UrbanCraft REAL ESTATE careers, job opportunities, real estate jobs, talent community" />
                <meta name="author" content="UrbanCraft REAL ESTATE Team" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="All Careers - Pursue Your Passion at UrbanCraft REAL ESTATE" />
                <meta
                    property="og:description"
                    content="Join UrbanCraft REAL ESTATE to pursue your passion. Explore career opportunities and become a part of our dynamic team."
                />
                <meta property="og:url" content="https://yourwebsite.com/all-team" />
                <meta property="og:image" content="https://yourwebsite.com/path-to-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <Header />
            {/* <SellerHeader /> */}
            <div className="all-team">
                <section className="all-team-header-section">
                    <div className="all-team full-screen-overlay-hero">
                        <h1 className="all-team custom-title-display-heading w-50 text-start">
                            Pursue Your Passion
                        </h1>
                        <p className="w-50 text-start">
                            Whether you’re starting your career, perfecting your skills, or
                            changing gears, there’s a place for you at UrbanCraft REAL ESTATE.
                        </p>
                        <form className="all-team unique-search-bar-wrapper input-group">
                            <input
                                type="text"
                                className="all-team form-control unique-input-textbox"
                                placeholder="Search job title or location"
                            />
                            <button
                                className="all-team btn custom-btn-search-action"
                                type="submit"
                            >
                                Search <i className="fas fa-search" />
                            </button>
                        </form>
                    </div>
                </section>
                {/* Explore Careers Section */}
                <section className="all-team-careers py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center mb-4">Explore All Careers</h2>
                        <p className="text-center mb-4 px-5 mx-5">
                            We give you the tools you need to discover your perfect job match,
                            and the freedom and support to take your career to the next level.
                        </p>
                        <div className="row">
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="all-team btn btn-block mb-2 py-1">
                                    Real Estate Agent
                                </button>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="all-team btn btn-block mb-2 py-1">
                                    Associate Agent
                                </button>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="all-team btn btn-block mb-2 py-1">
                                    Rental &amp; Multifamily
                                </button>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="all-team btn btn-block mb-2 py-1">
                                    Title &amp; Settlement
                                </button>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="all-team btn btn-block mb-2 py-1">
                                    Other
                                </button>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="all-team btn btn-block mb-2 py-1">
                                    Data Science &amp; Analytics
                                </button>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="all-team btn btn-block mb-2 py-1">
                                    Accounting &amp; Finance &amp; Legal
                                </button>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="all-team btn btn-block mb-2 py-1">
                                    Real Estate Brokerage Support
                                </button>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="all-team btn btn-block mb-2 py-1">
                                    Engineering &amp; Product
                                </button>
                            </div>
                        </div>
                        <div className="text-center mt-5">
                            <button className="all-team btn px-4 py-3">View More</button>
                        </div>
                    </div>
                </section>
                {/* Talent Community Section */}
                <section className="all-team-talent-community-section bg-color-talent-community pt-1 pb-4">
                    <div className="all-team-talent-community container mb-5">
                        <h4 className="all-team-title bold">Join our talent community</h4>
                        <p>Receive up-to-the-minute job openings tailored just for you</p>
                        <button className="all-team btn px-4 py-2">Join us</button>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};
export default AllTeam;
