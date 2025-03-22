import React from "react";
import { Helmet } from 'react-helmet';
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import img1 from "../../../assets/images/sell_7.jpg"
import img2 from "../../../assets/images/sell_2.jpg"
import SellersCard from "../../../components/SellersCard";
import CityRealEstateList from "../../../components/CityRealEstateList";
import FAQs from "../../../components/FAQs";
import RentalInfo from "../../../components/RentalInfo";


const Sell = () => {
    const faqData = [
        {
            question: 'What is Sell?',
            answer: 'Sell is a platform that helps you find the best deals on real estate properties...'
        },
        {
            question: 'How do I get started?',
            answer: 'To get started, simply click on the "Get Started" button on our homepage...'
        },
        {
            question: 'What kind of properties do you offer?',
            answer: 'We offer a wide range of properties, including luxury villas, modern apartments, and more...'
        },
        {
            question: 'How do you negotiate the best deals?',
            answer: 'Our team of experts has years of experience in negotiating the best deals on behalf of our clients...'
        },
        {
            question: 'What kind of support do you offer?',
            answer: 'We offer expert guidance throughout the entire process, from start to finish...'
        },
        {
            question: 'How long does the process take?',
            answer: 'The length of the process varies depending on your specific requirements and the complexity of the deal...'
        },
        {
            question: 'Do you offer flexible payment plans?',
            answer: 'Yes, we offer flexible payment plans and options to fit your budget and needs...'
        },
        {
            question: 'Can I cancel my subscription at any time?',
            answer: 'Yes, you can cancel your subscription at any time. We offer a flexible cancellation policy...'
        },
        {
            question: 'How do I contact your team?',
            answer: 'You can contact our team by clicking on the "Contact Us" button on our website or by calling us...'
        },
        {
            question: 'Is my personal information secure?',
            answer: 'Yes, your personal information is completely secure. We use industry-standard security measures...'
        }
    ];

    return (
        <>
         <Helmet>
                <title>Sell Real Estate | Your Trusted Real Estate Platform</title>
                <meta name="description" content="Discover the best way to sell your property with expert insights and tailored services. Get started with us today!" />
                <meta name="keywords" content="sell real estate, home sales, property listings, real estate market, selling homes" />
                <meta property="og:title" content="Sell Real Estate | Your Trusted Real Estate Platform" />
                <meta property="og:description" content="Maximize your real estate sales with our comprehensive support and expert advice." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content={img1} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Sell Real Estate | Your Trusted Real Estate Platform" />
                <meta name="twitter:description" content="Explore effective strategies for selling your property and achieving the best market price." />
                <meta name="twitter:image" content={img1} />
            </Helmet>
            <Header />
            <main className="Main_portion">
                <div className="container_fluid ">
                    <div className="row g-0  px-md-5  p-2 steps_buttons_real">
                        <div className="col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="px-5">
                                <h2>Discover the perfect place to Sell</h2>
                                <p>
                                    See updated listings every day, search with tailored filters, and
                                    contact property managers—all from one place.
                                </p>
                                <div className="search-bar">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="City, Address, School, Agent, ZIP"
                                    />
                                    <button type="button">
                                        <i className="fa-solid fa-magnifying-glass" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src={img1} className="img-fluid" alt="" />
                        </div>
                    </div>
                    <div className="container">
                        <SellersCard title="Resources for Sellers" />
                    </div>
                  <RentalInfo/>
                    <div className="container py-4">
                        <div className="d-flex flex-column text-center p-5">
                            <h5>You've seen everything</h5>
                            <p>Check back soon for new homes</p>
                        </div>
                        <h3 className="h4 fw-semibold mb-3">Search for homes by city</h3>
                        <CityRealEstateList />
                        <hr className="my-5" />
                        <h5> Search for apartments by city </h5>
                        <CityRealEstateList />
                        <hr className="my-5" />
                        {/* Houses Section */}
                        <h5>Search for houses for rent by city </h5>
                        <CityRealEstateList />
                    </div>
                    <div className="container">
                        <section className="faq">
                            <FAQs faqs={faqData} />
                        </section>
                    </div>
                </div>
            </main>
            <Footer />

        </>
    );

}
export default Sell;