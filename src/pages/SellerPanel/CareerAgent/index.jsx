import React, { useEffect, useState } from "react";
import "./CareerAgent.css";
import img1 from "../../../assets/images/img_agent_career/H1-img-2.jpg";
import img2 from "../../../assets/images/img_agent_career/H1-img-3.jpg";
import img3 from "../../../assets/images/img_agent_career/H1-img-1.jpg";
import SellerHeader from "../../../components/SellerHeader";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";


const CareerAgent = () => {
    const [careers, setCareers] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("https://apitourism.today.alayaarts.com/api/get-careers");
            setCareers(response.data.careers);
            toast.success("Data fetched successfully");
        } catch (err) {
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <Helmet>
                <title>Career Opportunities - Join UrbanCraft REAL ESTATE</title>
                <meta
                    name="description"
                    content="Discover exciting career opportunities at UrbanCraft REAL ESTATE. Join our team and contribute to redefining real estate. Explore available positions today."
                />
                <meta name="keywords" content="UrbanCraft REAL ESTATE careers, real estate jobs, work at UrbanCraft REAL ESTATE, career opportunities" />
                <meta name="author" content="UrbanCraft REAL ESTATE Team" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="Career Opportunities - Join UrbanCraft REAL ESTATE" />
                <meta
                    property="og:description"
                    content="Explore career opportunities at UrbanCraft REAL ESTATE and become part of a team redefining real estate. Check out the latest job openings."
                />
                <meta property="og:url" content="https://yourwebsite.com/career-agent" />
                <meta property="og:image" content="https://yourwebsite.com/path-to-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <Header />
            {/* <SellerHeader /> */}
            <ToastContainer />
            <div className="career-agent">
                <section className="header-section-career-agent">
                    <div className="career-agent full-screen-overlay-hero">
                        <h1 className="career-agent custom-title-display-heading w-50 text-start">
                            Be a Part of Something Bigger
                        </h1>
                        <p className="w-50 text-start">
                            Our mission is to redefine real estate in the customer’s favor.
                            From the technology we build to the brokerage services we provide,
                            every UrbanCraft REAL ESTATEnian plays a part.
                        </p>
                        <form className="career-agent unique-search-bar-wrapper input-group">
                            <input
                                type="text"
                                className="career-agent form-control unique-input-textbox"
                                placeholder="Search job title or location"
                            />
                            <button
                                className="career-agent btn custom-btn-search-action"
                                type="submit"
                            >
                                Search <i className="fas fa-search" />
                            </button>
                        </form>
                    </div>
                </section>
                {/* Job Listings Section */}
                <section className="job-listings py-5">
                    <div className="container">
                        <h2 className=" mb-4">Be the First to Apply</h2>
                        <div className="row">
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <div className="card">
                                    <div className="card-body p-4">
                                        <div className="d-inline-flex">
                                            <h5 className="card-title pe-5">
                                                Real Estate Agent - St.Louis
                                            </h5>
                                            <a href="#">
                                                <span className=" text-danger">
                                                    <i className="fa-regular fa-heart fa-2x" />
                                                </span>
                                            </a>
                                        </div>
                                        <div className="d-inline-flex">
                                            <span>
                                                <i className="fa-solid fa-location-dot" />
                                            </span>
                                            <p className="ps-2">
                                                Location :St. Louis, Missouri, United States of America
                                            </p>
                                        </div>
                                        <div className="d-inline-flex">
                                            <span>
                                                <i className="fa-solid fa-briefcase" />
                                            </span>
                                            <p className="ps-2 pe-4">Real Estate Agent</p>
                                            <span>
                                                <i className="fa-regular fa-clock" />
                                            </span>
                                            <p className="ps-1">Full Time</p>
                                        </div>
                                        <div className="d-inline-flex">
                                            <span className="pe-2">
                                                <i className="fa-solid fa-calendar-days" />
                                            </span>
                                            <p>October 20th 2024</p>
                                        </div>
                                        <p>
                                            Additional bonuses for closing transactions. Spend your
                                            time building relationships with customers.
                                        </p>
                                        <button className="btn  px-4 py-2">Apply Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <div className="card">
                                    <div className="card-body p-4">
                                        <div className="d-inline-flex">
                                            <h5 className="card-title pe-5">
                                                Real Estate Agent - Palm Springs
                                            </h5>
                                            <a href="#">
                                                <span className=" text-danger">
                                                    <i className="fa-regular fa-heart fa-2x" />
                                                </span>
                                            </a>
                                        </div>
                                        <div className="d-inline-flex">
                                            <span>
                                                <i className="fa-solid fa-location-dot" />
                                            </span>
                                            <p className="ps-2">
                                                Palm Desert, California, United States of America
                                            </p>
                                        </div>
                                        <div className="d-inline-flex">
                                            <span>
                                                <i className="fa-solid fa-briefcase" />
                                            </span>
                                            <p className="ps-2 pe-4">Real Estate Agent</p>
                                            <span>
                                                <i className="fa-regular fa-clock" />
                                            </span>
                                            <p className="ps-1">Full Time</p>
                                        </div>
                                        <div className="d-inline-flex">
                                            <span className="pe-2">
                                                <i className="fa-solid fa-calendar-days" />
                                            </span>
                                            <p>October 20th 2024</p>
                                        </div>
                                        <p>
                                            Support from a dedicated transaction coordinator, listing
                                            coordinator, and a team of showing agents.
                                        </p>
                                        <button className="btn  px-4 py-2">Apply Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <div className="card">
                                    <div className="card-body p-4">
                                        <div className="d-inline-flex">
                                            <h5 className="card-title pe-5">
                                                Real Estate Agent - Louisville
                                            </h5>
                                            <a href="#">
                                                <span className=" text-danger">
                                                    <i className="fa-regular fa-heart fa-2x" />
                                                </span>
                                            </a>
                                        </div>
                                        <div className="d-inline-flex">
                                            <span>
                                                <i className="fa-solid fa-location-dot" />
                                            </span>
                                            <p className="ps-2">
                                                Location :St. Louis, Missouri, United States of America
                                            </p>
                                        </div>
                                        <div className="d-inline-flex">
                                            <span>
                                                <i className="fa-solid fa-briefcase" />
                                            </span>
                                            <p className="ps-2 pe-4">Real Estate Agent</p>
                                            <span>
                                                <i className="fa-regular fa-clock" />
                                            </span>
                                            <p className="ps-1">Full Time</p>
                                        </div>
                                        <div className="d-inline-flex">
                                            <span className="pe-2">
                                                <i className="fa-solid fa-calendar-days" />
                                            </span>
                                            <p>October 20th 2024</p>
                                        </div>
                                        <p>
                                            Highly skilled in guiding a customer through the home
                                            buying and selling process from start to finish.
                                        </p>
                                        <button className="btn  px-4 py-2">Apply Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-5">
                            <button className="btn  px-4 py-2">View More</button>
                        </div>
                    </div>
                </section>
                {/* Explore Careers Section */}
                <section className="careers py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center mb-4">Explore All Careers</h2>
                        <div className="row ">
                            <div className=" col-12 col-md-4 col-lg-4 mt-3">
                                <button className="btn btn-block mb-2 py-3">
                                    Real Estate Agent
                                </button>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="btn btn-block mb-2 py-3">
                                    Associate Agent
                                </button>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="btn btn-block mb-2 py-3">Other</button>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="btn btn-block mb-2 py-3">
                                    Rental &amp; Multifamily
                                </button>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="btn btn-block mb-2 py-3">
                                    Title &amp; Settlement
                                </button>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="btn btn-block mb-2 py-3">
                                    Data Science &amp; Analytics
                                </button>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="btn btn-block mb-2 py-3">
                                    Accounting &amp; Finance &amp; Legal
                                </button>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="btn btn-block mb-2 py-3">
                                    Real Estate Brokerage Support
                                </button>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 mt-3">
                                <button className="btn btn-block mb-2 py-3">
                                    Engineering &amp; Product
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Our Culture Section */}
                <section className="culture py-5">
                    <div className="container">
                        <h2 className="text-center mb-4">Our Culture</h2>
                        <div className="row">
                            <div className="col-12 col-md-4 col-lg-4">
                                <div className="card h-100 border-0">
                                    {" "}
                                    {/* Removed the nested 'card' div to simplify */}
                                    <img src={img1} className="card-img-top" alt="img" />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Live our values. Shape our future.
                                        </h5>
                                        <p className="card-text">
                                            Our company values represent the behaviors that will help
                                            us achieve our mission and unite UrbanCraft REAL ESTATE's culture. Our
                                            purpose and history are why we are all here, but our
                                            values are actionable behaviors we expect of UrbanCraft REAL ESTATEnians
                                            when it comes to how to drive results, make better
                                            decisions and serve customers.
                                        </p>
                                        <a href="#" className="">
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4">
                                <div className="card h-100 border-0">
                                    <img src={img2} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">Life at UrbanCraft REAL ESTATE</h5>
                                        <p className="card-text">
                                            At UrbanCraft REAL ESTATE, authenticity is our cornerstone. We embrace and
                                            celebrate diversity, fostering an inclusive community
                                            where every individual feels valued. Our mission is to
                                            improve the home buying and selling process, directly
                                            impacting our customers' well-being. UrbanCraft REAL ESTATE is a hub of
                                            excellence, attracting top talent from various fields,
                                            where you'll have the opportunity to learn from the best
                                            and be challenged daily in your career journey.
                                        </p>
                                        <a href="#" className="">
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4">
                                <div className="card h-100 border-0">
                                    <img src={img3} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Live our values. Shape our future.
                                        </h5>
                                        <p className="card-text">
                                            A diverse, inclusive culture is vital to our mission of
                                            making real estate better for regular people from all
                                            walks of life. We're proud that UrbanCraft REAL ESTATE is a place where
                                            different points of view are encouraged and respected. At
                                            the same time, we recognize that meaningful change
                                            requires ongoing analysis and action. We're cultivating
                                            greater inclusion and diversity with employee-led
                                            initiatives across the company.
                                        </p>
                                        <a href="#" className="">
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Talent Community Section */}
                <section className="talent-community-section bg-color-talent-community pt-1 pb-5">
                    <div className="talent-community container mb-5 ">
                        <h4 className="talent-community-title bold">
                            Join our talent community
                        </h4>
                        <p>Receive up-to-the-minute job openings tailored just for you</p>
                        <button className="btn  px-4 py-2 ">Join us</button>
                    </div>
                    <div className="text-center container">
                        <h6>Equal Opportunity</h6>
                        <p>
                            UrbanCraft REAL ESTATE is an equal opportunity employer. Individuals seeking
                            employment at UrbanCraft REAL ESTATE are considered without regard to race, color,
                            religion, national origin, age, sex, marital status, ancestry,
                            physical or mental disability, veteran status or sexual
                            orientation.
                        </p>
                    </div>
                </section>
                {/* Bootstrap JS */}
            </div>
            <Footer />
        </>
    );
};
export default CareerAgent;
