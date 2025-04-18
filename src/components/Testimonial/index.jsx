import React from "react";
import { Helmet } from "react-helmet";
import './testimonial.css'

const testimonials = [
    [
        {
            title: "Outstanding Service",
            text: "UrbanCraft REAL ESTATE helped us find our dream home with exceptional service. Their professionalism, attention to detail, and dedication were truly outstanding. We couldn’t have asked for a better real estate partner.",
            author: "Sarah L.",
            role: "Home Buyer",
            bgColor: "bg-primary",
            initial: "S",
        },
        {
            title: "Fantastic Support",
            text: "The team at UrbanCraft REAL ESTATE always provided quick and effective support. They truly care about their clients and go above and beyond!",
            author: "Fiona G.",
            role: "First-Time Buyer",
            bgColor: "bg-danger",
            initial: "F",
        },
        {
            title: "Exceeded Expectations",
            text: "UrbanCraft REAL ESTATE exceeded our expectations in every aspect. From the initial consultation to closing the deal, they were attentive, responsive, and highly professional. Our investment process was seamless.",
            author: "Emily W.",
            role: "Investor",
            bgColor: "bg-success",
            initial: "E",
        },
    ],
    [
        {
            title: "Highly Responsive",
            text: "ZNet's responsiveness and attention to detail made the entire process smooth. They kept us informed every step of the way.",
            author: "Henry K.",
            role: "Investor",
            bgColor: "bg-info",
            initial: "H",
        },
        {
            title: "Smooth & Stress-Free",
            text: "We sold our property in no time, thanks to the expertise of UrbanCraft REAL ESTATE’s team. Their market knowledge and proactive approach made the process smooth and stress-free. Highly recommend!",
            author: "Mark D.",
            role: "Property Seller",
            bgColor: "bg-secondary",
            initial: "M",
        },
        {
            title: "Impressive Results",
            text: "We achieved fantastic results with UrbanCraft REAL ESTATE’s team. Their expertise and dedication were unmatched. Truly a great experience!",
            author: "Irene T.",
            role: "Property Seller",
            bgColor: "bg-warning",
            initial: "I",
        },
    ],
];

const TestimonialCard = ({ title, text, author, role, bgColor, initial }) => {
    const textColor = bgColor.replace("bg-", "text-");
    return (
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>What Our Clients Say | UrbanCraft REAL ESTATE</title>
                <meta name="description" content="Read testimonials from satisfied clients of UrbanCraft REAL ESTATE. Learn about their experiences in finding homes, buying properties, and selling with ease." />
                <meta property="og:title" content="What Our Clients Say | UrbanCraft REAL ESTATE" />
                <meta property="og:description" content="Read testimonials from satisfied clients of UrbanCraft REAL ESTATE. Learn about their experiences in finding homes, buying properties, and selling with ease." />
                <meta property="og:image" content="https://yourwebsite.com/images/testimonials-banner.jpg" /> {/* Example image for sharing */}
                <meta property="og:url" content="https://yourwebsite.com/testimonials" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="What Our Clients Say | UrbanCraft REAL ESTATE" />
                <meta name="twitter:description" content="Read testimonials from satisfied clients of UrbanCraft REAL ESTATE. Learn about their experiences in finding homes, buying properties, and selling with ease." />
                <meta name="twitter:image" content="https://yourwebsite.com/images/testimonials-banner.jpg" /> {/* Example image for Twitter sharing */}
            </Helmet>
        <div className="col-md-4 d-flex align-items-stretch">
            <div className="card bg-white p-4 shadow border-0 w-100 h-100 d-flex flex-column">
                <h5 className={`fw-bold ${textColor} mb-3`}>{title}</h5>
                <p className="testimonial text-muted mb-4 flex-grow-1">{`"${text}"`}</p>
                <div className="d-flex align-items-center">
                    <div
                        className={`author-image rounded-circle ${bgColor} d-flex justify-content-center align-items-center text-white me-3`}
                        style={{ width: "50px", height: "50px" }}
                        aria-label="Author's Initial"
                    >
                        {initial}
                    </div>
                    <div>
                        <h6 className="fw-bold mb-0">{author}</h6>
                        <small className="text-muted">{role}</small>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};



const Testimonial = () => {
    return (
        <section className="py-5 bg-light">
            <div className="container">
                <h2 className="section-title fw-bold h1 text-center mb-4">
                    What Our Clients Say
                </h2>
                <p className="text-center text-muted mb-5">
                    Hear directly from our satisfied clients about their experiences with UrbanCraft REAL ESTATE. We take pride in making real estate seamless and successful for everyone.
                </p>
                <div
                    id="testimonialCarousel"
                    className="carousel slide position-relative"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-inner" style={{ height: "100% !important" }}>
                        {testimonials.map((group, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                                style={{ height: "100%" }}
                            >
                                <div className="row g-3">
                                    {group.map((testimonial, idx) => (
                                        <TestimonialCard key={idx} {...testimonial} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        className="carousel-control-prev position-absolute top-0"
                        type="button"
                        data-bs-target="#testimonialCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next position-absolute top-0"
                        type="button"
                        data-bs-target="#testimonialCarousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;

