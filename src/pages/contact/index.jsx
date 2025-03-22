import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import FAQs from "../../components/FAQs";
import "./Contact.css";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import { Link } from "react-router-dom";

const Contact = () => {
    const [faqData, setFaqData] = useState([]);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await fetch("https://api.biznetusa.com/api/all-mainfaqs");
                const data = await response.json();
                if (data.status === 200) {
                    const formattedFaqs = data.mainfaqs.map((faq) => ({
                        question: faq.title,
                        answer: faq.desc,
                    }));
                    setFaqData(formattedFaqs);
                }
            } catch (error) {
                console.error("Failed to fetch FAQs", error);
            }
        };

        fetchFaqs();
    }, []);

    return (
        <>
            <Helmet>
                <title>Contact Us - ZNET</title>
                <meta name="description" content="Reach out to ZNET for all your real estate inquiries or customer support needs." />
                <meta name="keywords" content="ZNET contact, real estate help, customer support" />
                <meta property="og:title" content="Contact Us - ZNET" />
                <meta property="og:description" content="Get in touch with ZNET for inquiries related to real estate services and customer support." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="path_to_image_for_social_media_sharing" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Us - ZNET" />
                <meta name="twitter:description" content="Contact ZNET for professional real estate advice and support." />
            </Helmet>
            <Header />

            {/* hero container */}
            <div className="contact-parent">
                <div className="container-fluid hero-container-contact">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center justify-content-center">
                                <div
                                    className="bg-white p-4 rounded-3 shadow-lg text-center"
                                    style={{ maxWidth: 500 }}
                                >
                                    <h2 className="h4 fw-bold text-dark">Contact Us</h2>
                                    <p className="mt-3 text-muted">
                                        We’re here to help! Connect with our live chat support, available 8am - 5pm PST, seven days a week.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* contact way container */}
                <div className="container contact-way-container mt-5">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="d-flex flex-column align-items-center">
                                <i className="fa-solid fa-comments contact-icon" />
                                <span className="fs-5 fw-semibold span-heading-contact">
                                    Live Chat
                                </span>
                                <p className="text-muted text-center mt-2">
                                    Chat live with a Customer Service Representative for help with our site,
                                    app, or finding a Znet Agent.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="d-flex flex-column align-items-center">
                                <i className="fa-solid fa-envelope contact-icon" />
                                <span className="fs-5 fw-semibold span-heading-contact">
                                    Message us
                                </span>
                                <p className="text-muted text-center mt-2">
                                    Send our Customer Service Team questions about our site, app, or
                                    finding a Znet Agent.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="d-flex flex-column align-items-center">
                                <i className="fa-solid fa-share-nodes contact-icon" />
                                <span className="fs-5 fw-semibold span-heading-contact">
                                    Connect with us
                                </span>
                                <div className="d-flex gap-2 mt-2">
                                    <Link
                                        to="#"
                                        className="text-muted text-decoration-none hover:text-dark icon-share-contact"
                                    >
                                        <i className="fa-brands fa-facebook" />
                                    </Link>
                                    <Link
                                        to="#"
                                        className="text-muted text-decoration-none hover:text-dark icon-share-contact"
                                    >
                                        <i className="fa-brands fa-twitter" />
                                    </Link>
                                    <Link
                                        to="#"
                                        className="text-muted text-decoration-none hover:text-dark icon-share-contact"
                                    >
                                        <i className="fa-brands fa-instagram" />
                                    </Link>
                                    <Link
                                        to="#"
                                        className="text-muted text-decoration-none hover:text-dark icon-share-contact"
                                    >
                                        <i className="fa-brands fa-pinterest" />
                                    </Link>
                                    <Link
                                        to="#"
                                        className="text-muted text-decoration-none hover:text-dark icon-share-contact"
                                    >
                                        <i className="fa-brands fa-google" />
                                    </Link>
                                    <Link
                                        to="#"
                                        className="text-muted text-decoration-none hover:text-dark icon-share-contact"
                                    >
                                        <i className="fa-brands fa-linkedin" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* biznet office */}
            </div>

            {/* faq section */}
            <FAQs faqs={faqData} />
            <ContactForm />

            {/* footer */}
            <Footer />
        </>
    );
};

export default Contact;
