import React, { useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";
import "./About.css";
import aboutImage1 from "../../assets/images/real estate _20.jpg";
import ImagewithText from "../../components/ImagewithText";
import MissionVision from "../../components/MissionVision";
import Testimonial from "../../components/Testimonial";
import CoreValueCard from "../../components/CoreValueCard";
import { ToastContainer, toast } from "react-toastify";

const About = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://api.biznetusa.com/api/store-getintouch", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                toast.success("Your message has been sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                toast.error("Failed to send your message. Please try again.");
            }
        } catch (error) {
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <>
        <Helmet>
                <title>About UrbanCraft REAL ESTATE - Leading Real Estate Innovators</title>
                <meta name="description" content="Learn about UrbanCraft REAL ESTATE's mission to lead the real estate market through innovation, integrity, and excellence. Discover our core values and how we empower our clients." />
                <meta name="keywords" content="UrbanCraft REAL ESTATE, about UrbanCraft REAL ESTATE, UrbanCraft REAL ESTATE mission, UrbanCraft REAL ESTATE values, real estate innovation, professional real estate services" />
                <meta property="og:title" content="About UrbanCraft REAL ESTATE - Leading Real Estate Innovators" />
                <meta property="og:description" content="Explore UrbanCraft REAL ESTATE's commitment to leading the real estate industry with ethical practices and innovative solutions. Get to know our mission and values." />
                <meta property="og:image" content={aboutImage1} />
                <meta property="og:image:alt" content="About UrbanCraft REAL ESTATE Image - Real Estate Innovators" />
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About UrbanCraft REAL ESTATE - Leading Real Estate Innovators" />
                <meta name="twitter:description" content="Learn about how UrbanCraft REAL ESTATE is transforming the real estate market with our innovative platform and services." />
                <meta name="twitter:image" content={aboutImage1} />
                <meta name="twitter:image:alt" content="About UrbanCraft REAL ESTATE Image - Real Estate Innovators" />
            </Helmet>
            <ToastContainer />
            <Header />
            <main className="about">
                {/* Hero Section */}
                <section className="">
                    <div className="container-fluid hero d-flex justify-content-center align-items-center flex-column">
                        <h1 className="">Welcome to UrbanCraft REAL ESTATE</h1>
                        <p className="">
                            Leading the Real Estate Market with Integrity and Innovation.
                        </p>
                        <a href="#about" className="btn btn-primary ">
                            Learn More About Us
                        </a>
                    </div>
                </section>
                {/* About Section */}
                <section id="about" className="py-5">
                    <div className="container">
                        <h2 className="section-title ">About UrbanCraft REAL ESTATE</h2>
                        <div className="row align-items-center">
                            <ImagewithText
                                content=" At UrbanCraft REAL ESTATE, we’re revolutionizing the real estate industry by creating a smarter, faster, and more efficient way to connect professionals. Our platform is designed to bridge the gap between buyers, sellers, investors, and service providers, empowering them to achieve their goals through seamless collaboration and personalized solutions. "
                                imgSrc={aboutImage1}
                                altText="About UrbanCraft REAL ESTATE"
                            />
                        </div>
                    </div>
                </section>
                <MissionVision />
                {/* Core Values Section */}
                <section className="py-5 bg-light">
                    <div className="container">
                        <h2 className="section-title ">Our Core Values</h2>
                        <div className="row text-light">
                            <CoreValueCard
                                title="Integrity"
                                text="We uphold transparency, honesty, and ethical practices in all our transactions, ensuring that our clients' interests are always our top priority."
                            />
                            <CoreValueCard
                                title="Innovation"
                                text="We continually embrace new trends and technologies to offer creative, cutting-edge solutions that meet the evolving demands of the real estate industry."
                            />
                            <CoreValueCard
                                title="Excellence"
                                text="We are committed to delivering outstanding results in every project, consistently striving for the highest standards of quality and client satisfaction."
                            />
                        </div>
                    </div>
                </section>
                <Testimonial />
                {/* Contact Section */}
                <section id="contact" className="py-2 bg-light">
                    <div className="container">
                        <h2 className="text-center mb-4">Get in Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="name" className="form-label">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        id="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <label htmlFor="message" className="form-label">
                                        Your Message
                                    </label>
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        id="message"
                                        placeholder="Your Message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-outline-info">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default About;
