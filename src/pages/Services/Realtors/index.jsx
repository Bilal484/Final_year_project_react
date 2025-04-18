import React from "react";
import { Helmet } from "react-helmet";
import "../../../assets/css/realtors.css";
import ImagewithText from "../../../components/ImagewithText";
import ContactSection from "../../../components/ContactSection";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import PropertyCard from "../../../components/PropertyCard";
import Testimonials from "../../../components/Testimonial";
import img1 from "../../../assets/images/blog 01.jpg";
import img2 from "../../../assets/images/blog 02.jpg";
import img3 from "../../../assets/images/blog 04.jpg";
import img4 from "../../../assets/images/blog 05.jpg";
import img5 from "../../../assets/images/blog 06.jpg";
import img6 from "../../../assets/images/blog 07.jpg";

const Realtors = () => {
    const properties = [
        {
            id: 1,
            price: 850000,
            images: [img1, img5, img3],
            beds: 4,
            baths: 4.5,
            area: 2378,
            address: "36 Beach Side Dr Unit 36AP, Ocean City, MD 218",
        },
        {
            id: 2,
            price: 750000,
            images: [img6, img2, img4],
            beds: 3,
            baths: 3,
            area: 1950,
            address: "100 Marina Bay Dr, Red Bank, NJ 07701",
        },
        {
            id: 3,
            price: 960000,
            images: [img2, img6, img1],
            beds: 5,
            baths: 5,
            area: 3200,
            address: "2021 Pine Drive, Mountain View, CA 94043",
        },
    ];

    return (
        <>
            <Helmet>
                <title>Realtors | Professional Real Estate Services</title>
                <meta
                    name="description"
                    content="Discover expert real estate services from our certified realtors dedicated to helping you buy or sell your home effectively."
                />
                <meta
                    name="keywords"
                    content="Realtors, Real Estate, Professional Real Estate Services, Buying Home, Selling Home"
                />
                <meta name="author" content="UrbanCraft REAL ESTATE Corporation" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Professional Realtors | Your Real Estate Experts" />
                <meta
                    property="og:description"
                    content="Connect with our professional realtors for top-notch services in buying and selling properties efficiently."
                />
                <meta property="og:image" content={img1} />
                <meta property="og:url" content="https://znet.com/realtors" />
                <meta property="og:type" content="website" />
            </Helmet>
            <Header />

            <main className="Realtor_main_section">
                {/* Hero Section */}
                <section id="hero" className="bg-light text-center p-5">
                    <div className="container">
                        <h1 className="display-4">Professional Real Estate Services</h1>
                        <p className="lead">
                            Whether you're buying or selling, our realtors are here to support you every step of the way.
                        </p>
                        <a href="#services" className="btn btn-primary mt-3">Learn More</a>
                    </div>
                </section>

                {/* About Realtors Section */}
                <section id="about-realtors" className="py-5">
                    <div className="container">
                        <ImagewithText
                            title="Who Are Realtors?"
                            content="Realtors are licensed real estate professionals who are members of the National Association of Realtors (NAR). They adhere to a strict code of ethics which is based on professionalism and protection of the public. Our Realtors at UrbanCraft REAL ESTATE are committed to treating all parties of a transaction honestly. They have the expertise to help clients navigate the complex process of buying and selling real estate."
                            imgSrc={img1}
                            reverse={true}
                        />
                    </div>
                </section>

                {/* Realtors at UrbanCraft REAL ESTATE Section */}
                <section id="realtors-role" className="bg-white py-5">
                    <div className="container">
                        <ImagewithText
                            title="Realtors at UrbanCraft REAL ESTATE"
                            content="At UrbanCraft REAL ESTATE, Realtors play a crucial role in enhancing the property buying and selling experience. They provide personalized guidance, up-to-date market insights, and expert negotiations to ensure you receive the best possible outcomes in your real estate transactions. Our Realtors work diligently to match you with the ideal property or buyer, leveraging their extensive network and the latest technologies."
                            imgSrc={img2}
                        />
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="bg-light py-5">
                    <div className="container">
                        <h2 className="text-center mb-4">What We Offer</h2>
                        <div className="row text-center">
                            <div className="col-md-4 mb-3">
                                <i className="fa fa-home fa-3x text-primary mb-3" />
                                <h5>Buying Services</h5>
                                <p>Guidance through every step of buying a home, from finding the right property to closing the deal.</p>
                            </div>
                            <div className="col-md-4 mb-3">
                                <i className="fa fa-balance-scale fa-3x text-primary mb-3" />
                                <h5>Selling Services</h5>
                                <p>Expert strategies to market your home effectively, ensuring a quick sale at the highest possible price.</p>
                            </div>
                            <div className="col-md-4 mb-3">
                                <i className="fa fa-chart-line fa-3x text-primary mb-3" />
                                <h5>Market Analysis</h5>
                                <p>Detailed market insights to help you make informed decisions whether buying or selling.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Properties Section */}
                <section id="featured-properties" className="py-5 bg-white">
                    <div className="container">
                        <h2 className="text-center mb-4">Featured Properties</h2>
                        <div className="row">
                            {properties.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    {...property}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center mb-4">Client Testimonials</h2>
                        <Testimonials />
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-5">
                    <ContactSection />
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Realtors;
