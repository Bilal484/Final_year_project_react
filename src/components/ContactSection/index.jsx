import React from "react";
import './ContactSection.css'
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

const ContactSection = () => {

    return (
        <>
         <Helmet>
                <title>Contact Us | Znet Corporation</title>
                <meta
                    name="description"
                    content="Get in touch with Znet Corporation for any inquiries. Our team is available for investor relations, press inquiries, and general information."
                />
                <meta
                    name="keywords"
                    content="contact, Znet Corporation, investor relations, press inquiries, Seattle contact"
                />
                <meta property="og:title" content="Contact Us | Znet Corporation" />
                <meta
                    property="og:description"
                    content="Contact Znet Corporation for investor relations, press inquiries, or general information."
                />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="URL_TO_IMAGE" /> {/* Placeholder for image */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Us | Znet Corporation" />
                <meta
                    name="twitter:description"
                    content="Get in touch with Znet Corporation for all your inquiries and media needs."
                />
                <meta name="twitter:image" content="URL_TO_IMAGE" /> {/* Placeholder for image */}
            </Helmet>
            <section className="mt-4 container">
                <div className="p-4 bg-light rounded shadow-sm">
                    <h2 className="h4 fw-semibold mb-4">Contacts</h2>
                    <div className="row g-4">
                        <div className="col-12  col-md-4">
                            <div className="p-3   h-100 bg-white rounded shadow-sm">
                                <h3 className="h5 fw-bold">Company</h3>
                                <p>Znet Corporation</p>
                                <p>1099 Stewart Street</p>
                                <p>Suite 600</p>
                                <p>Seattle, WA 98101</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="p-3 bg-white h-100 rounded shadow-sm">
                                <h3 className="h5 fw-bold">Investor relations</h3>
                                <p>Meg Nunnally</p>
                                <p>Head of Investor Relations</p>
                                <Link to="javascript:void(0)" className="text-primary">
                                    ir@Znet.com
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="p-3 bg-white h-100 rounded shadow-sm">
                                <h3 className="h5 fw-bold">Press</h3>
                                <p>Mariam Sughayer</p>
                                <p>Head of Communications</p>
                                <Link to="javascript:void(0)" className="text-primary">
                                    press@Znet.com
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default ContactSection;
