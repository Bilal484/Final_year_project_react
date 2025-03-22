import React from "react";
import { Helmet } from "react-helmet";
import {
    FaUserPlus,
    FaBullseye,
    FaLightbulb,
    FaUsers,
    FaHandshake,
    FaChartLine,
} from "react-icons/fa";

function ProcessSection() {
    const steps = [
        {
            icon: <FaUserPlus size={24} className="text-white" />,
            title: "Sign Up and Select Your Role",
            description:
                "Create a free account and choose your role in the real estate industry: Investor, Flipper, Licensed Realtor, Wholesaler, Buyer, Seller, Contractor, or Developer.",
            bgColor: "bg-primary",
        },
        {
            icon: <FaBullseye size={24} className="text-white" />,
            title: "Define Your Goals",
            description:
                "Answer role-specific questions to customize your experience, like Sellers needing a quick sale or Buyers looking for rental properties.",
            bgColor: "bg-secondary",
        },
        {
            icon: <FaLightbulb size={24} className="text-white" />,
            title: "Get Personalized Insights",
            description:
                "Receive tailored strategies like Sellers getting pricing advice or Buyers finding the best investment deals.",
            bgColor: "bg-success",
        },
        {
            icon: <FaUsers size={24} className="text-white" />,
            title: "Match with the Right Connections",
            description:
                "ZNet’s smart algorithm connects you with users who meet your specific needs, like Wholesalers finding Buyers.",
            bgColor: "bg-danger",
        },
        {
            icon: <FaHandshake size={24} className="text-white" />,
            title: "Network and Collaborate",
            description:
                "Chat, share documents, and coordinate seamlessly with your matches to build strong partnerships.",
            bgColor: "bg-warning",
        },
        {
            icon: <FaChartLine size={24} className="text-white" />,
            title: "Stay Ahead with Real-Time Insights",
            description:
                "Access market trends, farming data, and more to make informed decisions and track deals easily.",
            bgColor: "bg-info",
        },
    ];

    return (
        <>
         <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Learn about our process to connect and collaborate in the real estate industry with tailored insights and networking opportunities." />
                <meta name="keywords" content="real estate, process, connect, collaborate, networking, insights, goals" />
                <meta property="og:title" content="Our Process" />
                <meta property="og:description" content="Explore our process for signing up, defining goals, getting insights, and collaborating in the real estate industry." />
                <meta name="twitter:title" content="Our Process" />
                <meta name="twitter:description" content="Explore our process for signing up, defining goals, getting insights, and collaborating in the real estate industry." />
                <title>Our Process - Real Estate</title>
            </Helmet>
        <section className="our-process-section py-5 bg-light">
            <div className="container">
                <h2 className="display-5 fw-bold text-center mb-5">Our Process</h2>
                <div className="row g-4">
                    {steps.map((step, index) => (
                        <div key={index} className="col-md-4  d-flex">
                            <div className="p-4 card h-100 shadow w-100 text-center">
                                <div className={`card-header rounded-circle mx-auto ${step.bgColor}`} style={{ width: "60px", height: "60px" }}>
                                    <div className="d-flex justify-content-center align-items-center h-100">
                                        {step.icon}
                                    </div>
                                </div>
                                <div className="card-body bg-white mt-0">
                                    <h5 className="card-title fw-bold display-6 fs-5 text-dark">{step.title}</h5>
                                    <p className="card-text text-secondary">{step.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </>
    );
}

export default ProcessSection;

