import React from "react";
import { Helmet } from 'react-helmet';
import FAQs from "../../../components/FAQs";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import "./Sub2Deals.css";
import Sub2DealCard from '../../../components/Sub2DealCard';
import img1 from '../../../assets/images/sub2Deal 02.jpg';
import img2 from '../../../assets/images/sub2Deal 03.jpg';
import img3 from '../../../assets/images/sub2Deal 04.jpg';


const Sub2Deals = () => {
    const faqData = [
        {
            question: 'What is Sub2 Deals?',
            answer: 'Sub2 Deals is a platform that helps you find the best deals on real estate properties. We provide a curated list of properties that fit your criteria, negotiate the best deals on your behalf, and offer expert guidance throughout the process.'
        },
        {
            question: 'How do I get started?',
            answer: 'To get started, simply click on the "Get Started" button on our homepage and fill out the form with your details. Our team will then contact you to discuss your requirements and provide you with a personalized list of properties.'
        },
        {
            question: 'What kind of properties do you offer?',
            answer: 'We offer a wide range of properties, including luxury villas, modern apartments, cozy condos, and more. Our properties are carefully selected to ensure that they meet our high standards of quality and value.'
        },
        {
            question: 'How do you negotiate the best deals?',
            answer: 'Our team of experts has years of experience in negotiating the best deals on behalf of our clients. We use our knowledge of the market and our relationships with property owners to secure the best possible prices for our clients.'
        },
        {
            question: 'What kind of support do you offer?',
            answer: 'We offer expert guidance throughout the entire process, from start to finish. Our team is available to answer any questions you may have and provide support every step of the way.'
        },
        {
            question: 'How long does the process take?',
            answer: 'The length of the process varies depending on your specific requirements and the complexity of the deal. However, we strive to complete the process as quickly and efficiently as possible while ensuring that our high standards of quality are met.'
        },
        {
            question: 'Do you offer flexible payment plans?',
            answer: 'Yes, we offer flexible payment plans and options to fit your budget and needs. We understand that every client is unique, and we work with you to find a payment plan that works for you.'
        },
        {
            question: 'Can I cancel my subscription at any time?',
            answer: 'Yes, you can cancel your subscription at any time. We offer a flexible cancellation policy that allows you to cancel your subscription with no penalties or fees.'
        },
        {
            question: 'How do I contact your team?',
            answer: 'You can contact our team by clicking on the "Contact Us" button on our website or by calling us at [phone number]. We are available to answer any questions you may have and provide support every step of the way.'
        },
        {
            question: 'Is my personal information secure?',
            answer: 'Yes, your personal information is completely secure. We use industry-standard security measures to protect your data and ensure that it is kept confidential.'
        }
    ];
    const properties = [
        {
            imgSrc: img1,
            altText: 'Property 1',
            title: 'Property 1: Luxury Villa',
            description: 'This luxurious villa is located in a prime area and offers stunning views of the city.',
        },
        {
            imgSrc: img2,
            altText: 'Property 2',
            title: 'Property 2: Modern Apartment',
            description: 'This modern apartment is located in a trendy neighborhood and features a rooftop pool.',
        },
        {
            imgSrc: img3,
            altText: 'Property 3',
            title: 'Property 3: Cozy Condo',
            description: 'This cozy condo is located in a quiet area and offers a private balcony with a garden view.',
        },
    ];

    return (
        <>
         <Helmet>
                <title>Sub2 Deals - Discover Real Estate Investment Opportunities</title>
                <meta name="description" content="Explore Sub2 Deals to find the best real estate investment opportunities. Benefit from expert advice and exclusive property listings." />
                <meta name="keywords" content="sub2 deals, real estate investment, property listings, buy property, invest in real estate" />
                <meta property="og:title" content="Sub2 Deals - Discover Real Estate Investment Opportunities" />
                <meta property="og:description" content="Join Sub2 Deals to access the best real estate investment opportunities with expert advice." />
                <meta property="og:image" content={img1} />
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Sub2 Deals - Discover Real Estate Investment Opportunities" />
                <meta name="twitter:description" content="Find the best real estate investments with Sub2 Deals and maximize your returns." />
                <meta name="twitter:image" content={img1} />
            </Helmet>
            <Header />
            <div className="subDeal">
                <section className="hero">
                    <div className="container main-banner d-flex justify-content-center align-items-center flex-column">
                        <h1>Sub2 Deals</h1>
                        <p>Find the best deals on real estate properties</p>
                        <button className="btn px-4 btn-subdeal">Get Started</button>
                    </div>
                </section>
                {/* Section 1: Featured Properties */}
                <section className="featured-properties">
                    <div className="container mt-5">
                        <div className="row">
                            <h2>Featured Properties</h2>
                            {properties.map((property, index) => (
                                <Sub2DealCard
                                    key={index}
                                    imgSrc={property.imgSrc}
                                    altText={property.altText}
                                    title={property.title}
                                    description={property.description}
                                />
                            ))}
                        </div>
                    </div>
                </section>
                {/* Section 2: Benefits */}
                <section className="benefits">
                    <div className="container">
                        <h2>Benefits</h2>
                    </div>
                    <div className="container mt-5">
                        <div className="row">
                            {properties.map((property, index) => (
                                <Sub2DealCard
                                    key={index}
                                    imgSrc={property.imgSrc}
                                    altText={property.altText}
                                    title={property.title}
                                    description={property.description}
                                />
                            ))}
                        </div>
                    </div>
                </section>
                {/* Add more sections here... */}
                {/* Section 20: Call to Action */}
                <section className="call-to-action">
                    <div className="container my-auto">
                        <h2>Get Started Today!</h2>
                        <p>Ready to find your dream property? Contact us today to get started!</p>
                        <button className="btn btn-subdeal">Contact Us</button>
                    </div>
                </section>
                {/* Section 2: Benefits */}
                <section className="benefits">
                    <div className="container">
                        <h2>More Benefits</h2>
                    </div>
                    <div className="container mt-5">
                        <div className="row">
                            {properties.map((property, index) => (
                                <Sub2DealCard
                                    key={index}
                                    imgSrc={property.imgSrc}
                                    altText={property.altText}
                                    title={property.title}
                                    description={property.description}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <FAQs faqs={faqData} />


                </section>

            </div>
            <Footer />
        </>
    );

}
export default Sub2Deals;