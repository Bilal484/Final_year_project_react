import React from "react";
import ProcessStep from "../../components/StepCard";
import { FaLightbulb, FaUsers, FaRegHandshake } from "react-icons/fa";
import { Helmet } from "react-helmet"; 

const MissionVision = () => {
    const data = [
        {
            title: "Our Mission",
            description:
                "To simplify real estate networking and transactions by providing tailored connections, actionable insights, and a platform that brings together every professional in the industry under one digital roof.",
            icon: <FaRegHandshake size={24} />,
            bgColor: "bg-success",
        },
        {
            title: "Our Vision",
            description:
                "To become the leading hub for real estate professionals worldwide, fostering a collaborative ecosystem that transforms how people buy, sell, and invest in properties. At ZNet, we believe in building a future where opportunities are just one connection away.",
            icon: <FaLightbulb size={24} />,
            bgColor: "bg-warning",
        },
    ];

    return (
        <>
         <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Learn about our mission and vision to transform the real estate industry by connecting professionals worldwide." />
                <meta name="keywords" content="real estate, mission, vision, networking, platform, professionals, opportunities" />
                <meta property="og:title" content="Our Mission and Vision" />
                <meta property="og:description" content="Discover our mission and vision at ZNet for revolutionizing the real estate industry." />
                <meta property="og:image" content="https://via.placeholder.com/1200x630?text=Mission+and+Vision" />
                <meta property="og:url" content="https://www.example.com/mission-vision" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Our Mission and Vision" />
                <meta name="twitter:description" content="Learn about our mission and vision to transform the real estate industry by connecting professionals worldwide." />
                <meta name="twitter:image" content="https://via.placeholder.com/1200x630?text=Mission+and+Vision" />
                <title>Our Mission and Vision</title>
            </Helmet>
        <section className="py-5 bg-light">
            <div className="container">
                <h2 className="section-title text-center mb-4">About Us</h2>
                <div className="row g-4">
                    {data.map((item, index) => (
                        <ProcessStep
                            key={index}
                            title={item.title}
                            description={item.description}
                            icon={item.icon}
                            bgColor={item.bgColor}
                            textColor="text-white"
                            cardsCount={2}
                            pos="center"
                        />
                    ))}
                </div>
            </div>
        </section>
        </>
    );
};

export default MissionVision;

