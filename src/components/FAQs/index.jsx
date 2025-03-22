import React from 'react';
import { Helmet } from 'react-helmet';

const FAQs = ({ faqs }) => {
    return (
        <>
            <Helmet>
                <title>Frequently Asked Questions (FAQs)</title>
                <meta
                    name="description"
                    content="Find answers to the most commonly asked questions about our services, policies, and support."
                />
                <meta name="keywords" content="FAQs, Frequently Asked Questions, help, support, questions and answers" />
                <meta property="og:title" content="Frequently Asked Questions (FAQs)" />
                <meta
                    property="og:description"
                    content="Find answers to the most commonly asked questions about our services, policies, and support."
                />
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Frequently Asked Questions (FAQs)" />
                <meta
                    name="twitter:description"
                    content="Find answers to the most commonly asked questions about our services, policies, and support."
                />
            </Helmet>
            <div className="container mt-4 rounded-4">
                <div className="accordion accordion-flush" id="accordionFAQ">
                    {faqs.map((faq, index) => (
                        <div className="accordion-item" key={index}>
                            <h2 className="accordion-header" id={`heading${index}`}>
                                <button
                                    id="anas__ka__faq__button"
                                    className="accordion-button fs-5 fw-semibold collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${index}`}
                                    aria-expanded="false"
                                    aria-controls={`collapse${index}`}
                                >
                                    {faq.question}
                                </button>
                            </h2>
                            <div
                                id={`collapse${index}`}
                                className="accordion-collapse collapse"
                                aria-labelledby={`heading${index}`}
                                data-bs-parent="#accordionFAQ"
                            >
                                <div className="accordion-body">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FAQs;
