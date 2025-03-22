import React from "react";
import { FaUser, FaBullhorn, FaBriefcase, FaUserPlus, FaHome, FaHandshake } from "react-icons/fa";
import "./Advertise.css"; // Update your CSS file to match the styles below
import { Helmet } from "react-helmet";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import FAQs from "../../components/FAQs";
import { Link } from "react-router-dom";
import img01 from '../../assets/images/Sell_1.jpg'
import img02 from '../../assets/images/sell_2.jpg'
import img03 from '../../assets/images/sell_3.jpg'

const Step = ({ stepNumber, title, description, Icon, color }) => {
    return (
        <div className="col-md-4 text-center">
            <div
                className="step-icon p-4 rounded-circle text-white d-inline-flex justify-content-center align-items-center"
                style={{ backgroundColor: color }}
            >
                <Icon style={{ width: "25px", height: "25px" }} />
            </div>
            <h5 className="mt-4 text-dark fw-semibold">{title}</h5>
            <p className="text-muted">{description}</p>
        </div>
    );
};

const Feature = ({ icon: Icon, title, description, color }) => {
    return (
        <div className="col-md-4 my-3">
            <div className="feature-card text-center p-4 border rounded bg-white shadow-sm">
                <div
                    className="icon-container mb-3 text-white d-flex justify-content-center align-items-center"
                    style={{
                        backgroundColor: color,
                        borderRadius: "50%",
                        width: "80px",
                        height: "80px",
                    }}
                >
                    <Icon size={48} style={{ width: "48px", height: "48px" }} />
                </div>
                <h5 className="mt-3 text-dark fw-semibold">{title}</h5>
                <p className="text-muted">{description}</p>
            </div>
        </div>
    );
};

const Advertise = () => {
    const colors = ["#FF5733", "#33A1FD", "#FFC300", "#6C3483", "#229954", "#AF7AC5"];

    const FAQData = [
        {
            question: "Do you charge for listing properties?",
            answer: "No, we offer completely free property listings for everyone, including individuals, agencies, and developers.",
        },
        {
            question: "How can I list my property?",
            answer: "Simply create an account, provide property details, and publish your listing for free on our platform.",
        },
        {
            question: "Can I promote my listings?",
            answer: "Yes, you can highlight your properties for greater visibility in search results, completely free of charge.",
        },
        {
            question: "How do I edit or delete my listing?",
            answer: "Log in to your account, go to 'My Listings,' and choose the edit or delete option for your property.",
        },
        {
            question: "What types of properties can I list?",
            answer: "You can list residential, commercial, rental properties, plots, and new developments — all for free.",
        },
        {
            question: "Do you verify listings?",
            answer: "Yes, we verify all listings to ensure quality and provide accurate information to potential buyers or renters.",
        },
        {
            question: "How can I contact support?",
            answer: "Reach out to us via the contact form on our website or send us an email. Our support team is available 24/7, free of charge.",
        },
    ];

    const steps = [
        {
            stepNumber: 1,
            title: "Create an Account",
            description: "Sign up for free and get instant access to our platform.",
            Icon: FaUserPlus, // React Icon for Step 1
        },
        {
            stepNumber: 2,
            title: "List Your Property",
            description: "Add property details and publish your listing in minutes.",
            Icon: FaHome, // React Icon for Step 2
        },
        {
            stepNumber: 3,
            title: "Connect with Clients",
            description: "Reach a broad audience of potential buyers or renters.",
            Icon: FaHandshake, // React Icon for Step 3
        },
    ];

    const features = [
        {
            title: "For Individuals",
            description: "List your properties for free and connect directly with buyers and renters.",
            icon: FaUser, // React Icon for Individuals
        },
        {
            title: "For Agencies",
            description: "Showcase multiple properties, build credibility, and expand your reach effortlessly.",
            icon: FaBullhorn, // React Icon for Agencies
        },
        {
            title: "For Developers",
            description: "Advertise new projects, attract investors, and gain visibility at no cost.",
            icon: FaBriefcase, // React Icon for Developers
        },
    ];

    return (
        <>
            <Helmet>
                <title>Advertise with Znet - Free Real Estate Listing Platform</title>
                <meta
                    name="description"
                    content="List your properties for free on Znet. Showcase your properties and connect with buyers or renters at no cost."
                />
                <meta
                    name="keywords"
                    content="Free real estate listing, advertise properties for free, property visibility, free agency profiles"
                />
            </Helmet>
            <Header />
            <div className="advertise-page">
                {/* Hero Section */}
                <section className="hero-section text-center text-white">
                    <div className="hero-overlay d-flex flex-column align-items-center justify-content-center">
                        <h1 id="Advertis_Heading" className="display-5 fw-bold mb-3">
                            Advertise Your <span className="highlight">Real Estate</span> for Free
                        </h1>
                        <p id="Advertis_Para" className="lead mb-4">
                            List properties for free and connect with buyers, renters, and developers effortlessly.
                        </p>
                        <button className="btn btn-gradient btn-lg">
                            <Link to="/Contact" className="text-decoration-none text-white">
                                Get Started for Free
                            </Link>
                        </button>
                    </div>
                </section>        {/* How It Works Section */}
                <section className="steps-section py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center fw-bold mb-5 text-dark">How It Works</h2>
                        <div className="row gy-4">
                            {steps.map((step, index) => (
                                <Step
                                    key={index}
                                    stepNumber={step.stepNumber}
                                    title={step.title}
                                    description={step.description}
                                    Icon={step.Icon}
                                    color={colors[index % colors.length]} // Assign unique colors
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Our Features Section */}
                <section className="features-section py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center fw-bold mb-5 text-dark">Why Choose Znet?</h2>
                        <div className="row">
                            {features.map((feature, index) => (
                                <Feature
                                    key={index}
                                    title={feature.title}
                                    description={feature.description}
                                    icon={feature.icon}
                                    color={colors[index % colors.length + 3]} // Assign unique colors
                                />
                            ))}
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

                {/* FAQ Section */}
                <section className="faq-section py-5 bg-light">
                    <h2 className="text-center fw-bold mb-4">Frequently Asked Questions</h2>
                    <FAQs faqs={FAQData} />
                </section>
            </div>
            <Footer />
        </>
    );
};

export default Advertise;
