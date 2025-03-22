import React from "react";
import { FaRegHandshake } from "react-icons/fa";
import { Helmet } from "react-helmet";

const ProcessStep = ({
    icon,
    title,
    description,
    cardsCount = 4,
    pos = "center",
    bgColor = "bg-primary",
    textColor = "text-white"
}) => {
    const colSize = Math.floor(12 / cardsCount);

    return (
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Our Process | Your Company</title>
                <meta name="description" content="Discover how our process works to deliver top-notch services to our clients." />
                <meta property="og:title" content="Our Process | Your Company" />
                <meta property="og:description" content="Discover how our process works to deliver top-notch services to our clients." />
                <meta property="og:image" content="https://example.com/process-image.jpg" /> {/* Image for social media sharing */}
                <meta property="og:url" content="https://yourcompany.com/our-process" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Our Process | Your Company" />
                <meta name="twitter:description" content="Discover how our process works to deliver top-notch services to our clients." />
                <meta name="twitter:image" content="https://example.com/process-image.jpg" />
            </Helmet>
        <div className={`col-md-${colSize}`} style={{ height: '100% !important' }}>
            <div className={`process-step p-4 rounded shadow d-flex flex-column align-items-${pos} text-${pos}`} style={{ height: '100%' }}>
                <div className="process-icon mb-3">
                    <div
                        className={`text-white rounded-circle d-flex justify-content-center align-items-center mx-auto ${bgColor}`}
                        style={{ width: "50px", height: "50px" }}
                    >
                        {icon || <FaRegHandshake size={24} className={textColor} />}
                    </div>
                </div>
                <h5 className="fw-bold mb-2">{title}</h5>
                <p className="text-muted p-0 m-0">{description}</p>
            </div>
        </div >
        </>
    );
};

export default ProcessStep;

