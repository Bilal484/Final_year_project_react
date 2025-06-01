import React from "react";
import { Helmet } from 'react-helmet';  
import rent from "../../../assets/images/rent_main.jpg"
import RentalInfo from "../../../components/RentalInfo";
import SellersCard from "../../../components/SellersCard";
import CityRealEstateList from "../../../components/CityRealEstateList";
import PropertyCard from "../../../components/PropertyCard"
import Footer from "../../../components/Footer"
import Header from "../../../components/header"
import FAQs from "../../../components/FAQs";
import img1 from "../../../assets/images/blog 01.jpg";
import img2 from "../../../assets/images/blog 02.jpg";
import img3 from "../../../assets/images/blog 04.jpg";
import img4 from "../../../assets/images/blog 05.jpg";
import img5 from "../../../assets/images/blog 06.jpg";
import img6 from "../../../assets/images/blog 07.jpg";


const Rent = () => {
    const faqData = [
        {
            question: 'What is RENT?',
            answer: 'RENT is a platform that helps you find the best deals on real estate properties. We provide a curated list of properties that fit your criteria, negotiate the best deals on your behalf, and offer expert guidance throughout the process.'
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
            id: 1,
            price: 850000,
            images: [img1, img5, img3],
            beds: 4,
            baths: 4.5,
            area: 2378,
            address: '36 Beach Side Dr Unit 36AP, Ocean City, MD 218'
        },
        {
            id: 2,
            price: 850000,
            images: [img6, img2, img4],
            beds: 4,
            baths: 4.5,
            area: 2378,
            address: '36 Beach Side Dr Unit 36AP, Ocean City, MD 218'
        },
        {
            id: 3,
            price: 850000,
            images: [img2, img6, img1],
            beds: 4,
            baths: 4.5,
            area: 2378,
            address: '36 Beach Side Dr Unit 36AP, Ocean City, MD 218'
        }
    ];


    return (
        <>
         <Helmet>
                <title>Rent Real Estate | UrbanCraft REAL ESTATE</title>
                <meta name="description" content="Explore rental properties with URBANCRAFT REAL ESTATE. Find apartments, houses, and more for rent across your favorite cities." />
                <meta name="keywords" content="rental real estate, properties for rent, URBANCRAFT REAL ESTATE rentals, city apartments, house renting" />
                <meta property="og:title" content="Rent Real Estate | UrbanCraft REAL ESTATE" />
                <meta property="og:description" content="Find your perfect rental home or apartment with UrbanCraft REAL ESTATE. Explore our listings and find the best rental deals." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="/path/to/image.jpg" />  
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Rent Real Estate | UrbanCraft REAL ESTATE" />
                <meta name="twitter:description" content="Discover rental properties and find your next home with UrbanCraft REAL ESTATE." />
                <meta name="twitter:image" content="/path/to/image.jpg" />  
            </Helmet>
            <Header />
            <main className="Main_portion">
                <div className="container_fluid ">
                    <div className="row g-0  px-md-5  p-2 steps_buttons_real">
                        <div className="col-lg-6 d-flex justify-content-center align-items-center">
                            <div className="px-5">
                                <h2>Discover the perfect place to rent</h2>
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
                            <img src={rent} className="img-fluid" alt="" />
                        </div>
                    </div>
                    <RentalInfo />
                    <div className="container">
                        <SellersCard />
                    </div>
                    <div className="container">
                        <div className="row mt-4 py-md-4 py-2 ">
                            <h2 className="h2 fw-bold mb-4"> For Rents</h2>
                            <div className="row mt-4 d-flex flex-row">
                                {properties.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        id={property.id}
                                        price={property.price}
                                        images={property.images}
                                        beds={property.beds}
                                        baths={property.baths}
                                        area={property.area}
                                        address={property.address}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
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
                        <style dangerouslySetInnerHTML={{ __html: "\n\n                " }} />
                    </div>
                    <FAQs faqs={faqData} />
                </div>
            </main>
            <Footer />
            
        </>
    );

};
export default Rent;
