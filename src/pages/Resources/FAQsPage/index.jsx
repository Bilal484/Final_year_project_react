import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import FAQs from "../../../components/FAQs";



const faqData = [
    {
        question: 'What is Znet?',
        answer: 'Znet is a real estate platform that helps you find, buy, or rent the best properties suited to your needs, including residential and commercial spaces.'
    },
    {
        question: 'How do I get started on Znet?',
        answer: 'To get started, simply sign up on our website and explore properties by filtering based on your preferences such as location, price range, and property type.'
    },
    {
        question: 'What kind of properties does Znet offer?',
        answer: 'Znet offers a wide range of properties, including luxury villas, modern apartments, office spaces, and land for development.'
    },
    {
        question: 'How does Znet ensure the best deals?',
        answer: 'Our team of real estate experts carefully analyzes market trends and negotiates on behalf of clients to secure the best deals.'
    },
    {
        question: 'What support does Znet provide to buyers and sellers?',
        answer: 'Znet offers end-to-end support, including property listings, negotiations, legal assistance, and closing deals to ensure a seamless experience.'
    },
    {
        question: 'How long does the property purchase process take with Znet?',
        answer: 'The timeline depends on factors like the type of property, financing approvals, and legal processes. Our team strives to make the process as quick and efficient as possible.'
    },
    {
        question: 'Does Znet offer flexible payment plans?',
        answer: 'Yes, Znet partners with financial institutions to provide flexible payment plans tailored to fit your budget and requirements.'
    },
    {
        question: 'Can I cancel my property booking on Znet?',
        answer: 'Yes, cancellations are possible, but they may be subject to the terms and conditions of the seller or property owner. Contact our support team for more details.'
    },
    {
        question: 'How can I contact the Znet support team?',
        answer: 'You can contact our support team via the "Contact Us" page on our website or by calling our 24/7 customer support helpline.'
    },
    {
        question: 'Is my personal information secure on Znet?',
        answer: 'Yes, we prioritize your privacy and security. Znet uses industry-standard encryption and security measures to protect your personal information.'
    }
];



const FAQsPage = () => {

    return (
        <>
            <Helmet>
                <title>Frequently Asked Questions | Biznet</title>
                <meta
                    name="description"
                    content="Find answers to common questions about Biznet services, support, and more. Explore our FAQs for quick and detailed information."
                />
                <meta
                    name="keywords"
                    content="Biznet FAQs, support, help, questions and answers, Biznet support, frequently asked questions"
                />
                <meta name="author" content="Biznet Team" />
            </Helmet>

            <Header />
            <main>
               
                <Container className="my-5">
                    <Row className="align-items-center">
                        <Col lg={12} md={12} className="mb-4">
                            <h2>What Clients Say About Us</h2>
                            <p>
                                We help clients buy and sell homes, yes, but it's about far more than
                                closing deals for us.
                            </p>
                            <a href="#" className="btn btn-outline-primary">
                                Explore All →
                            </a>
                        </Col>
                        <Col lg={12} md={12}>
                            <div
                                id="testimonialCarousel"
                                className="carousel slide"
                                data-bs-ride="carousel"
                                data-bs-interval={5000}
                            >
                                <div className="carousel-inner ">
                                    <div className="carousel-item active">
                                        <Card className="p-4 text-center">
                                            <p>
                                                Amazing customer support so far, working well with a theme that's so
                                                easily customizable and great to use. Thanks and 5 stars!
                                            </p>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <img
                                                    src="https://randomuser.me/api/portraits/women/65.jpg"
                                                    alt="Maggie Strickland"
                                                    className="rounded-circle me-3"
                                                    style={{ width: 50 }}
                                                />
                                                <div>
                                                    <strong>Maggie Strickland</strong>
                                                    <p className="mb-0 text-muted">Manchester</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                    <div className="carousel-item">
                                        <Card className="p-4 text-center">
                                            <p>
                                                Working with @GrandHome is like having a family member who can fix
                                                everything. They know what you need, exactly when you need it.
                                            </p>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <img
                                                    src="https://randomuser.me/api/portraits/women/66.jpg"
                                                    alt="Dollie Horton"
                                                    className="rounded-circle me-3"
                                                    style={{ width: 50 }}
                                                />
                                                <div>
                                                    <strong>Dollie Horton</strong>
                                                    <p className="mb-0 text-muted">San Diego</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                    <div className="carousel-item">
                                        <Card className="p-4 text-center">
                                            <p>
                                                Very good and fast support. Solved all my problems within a week.
                                                Excited to see more themes they make!
                                            </p>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <img
                                                    src="https://randomuser.me/api/portraits/men/65.jpg"
                                                    alt="Michael Johnson"
                                                    className="rounded-circle me-3"
                                                    style={{ width: 50 }}
                                                />
                                                <div>
                                                    <strong>Michael Johnson</strong>
                                                    <p className="mb-0 text-muted">Los Angeles</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                                <button
                                    className="carousel-control-prev bg-transparent"
                                    type="button"
                                    data-bs-target="#testimonialCarousel"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button
                                    className="carousel-control-next bg-transparent"
                                    type="button"
                                    data-bs-target="#testimonialCarousel"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <section className="faq">
                    <FAQs faqs={faqData} />
                </section>
            </main>
            <Footer />
        </>
    );
};

export default FAQsPage;