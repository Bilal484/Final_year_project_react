import React from "react";
import './ContactFrom.css';
import { Helmet } from 'react-helmet';

const ContactFrom = () => {
    return (
        <>
         <Helmet>
        <title>Contact Us | Your Company Name</title>
        <meta
            name="description"
            content="Send us a message for any inquiries or support. We're here to assist you with your concerns and questions."
        />
        <meta
            name="keywords"
            content="contact form, send message, customer support, inquiry, technical support"
        />
        <meta property="og:title" content="Contact Us | Your Company Name" />
        <meta
            property="og:description"
            content="Send us a message for inquiries or customer support. Our team is ready to assist you."
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="URL_TO_IMAGE" /> {/* Placeholder for image */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Your Company Name" />
        <meta
            name="twitter:description"
            content="Have a question or need assistance? Send us a message and we'll get back to you."
        />
        <meta name="twitter:image" content="URL_TO_IMAGE" /> {/* Placeholder for image */}
    </Helmet>

            <div className="support-form-card">
                <h3 className="h5 mb-4">Send us a message</h3>
                <form>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Your Name" />
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Email Address" />
                    </div>
                    <div className="mb-3">
                        <select className="form-select">
                            <option selected>Select Topic</option>
                            <option>Account Issues</option>
                            <option>Referral Program</option>
                            <option>Technical Support</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" rows="4" placeholder="Describe your issue"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Send Message</button>
                </form>
            </div>
        </>
    );
};

export default ContactFrom;
