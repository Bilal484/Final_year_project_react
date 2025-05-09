import React, { useState, useEffect, useRef } from "react";
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
    const [isLoading, setIsLoading] = useState(false);
    
    // Refs for animations
    const sectionRefs = {
        about: useRef(null),
        mission: useRef(null),
        coreValues: useRef(null),
        testimonials: useRef(null),
        contact: useRef(null)
    };
    
    // Handle intersection observer for animations
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('uc-visible');
                }
            });
        };
        
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        // Observe all section refs
        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) {
                const elements = ref.current.querySelectorAll('.uc-fade-in');
                elements.forEach(el => observer.observe(el));
            }
        });
        
        return () => {
            Object.values(sectionRefs).forEach(ref => {
                if (ref.current) {
                    const elements = ref.current.querySelectorAll('.uc-fade-in');
                    elements.forEach(el => observer.unobserve(el));
                }
            });
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
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
            toast.error("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
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
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            <Header />
            <main className="uc-about-page">
                {/* Hero Section */}
                <section className="uc-hero-section">
                    <div className="container-fluid uc-hero-container d-flex justify-content-center align-items-center flex-column">
                        <h1 className="uc-hero-title">Welcome to UrbanCraft REAL ESTATE</h1>
                        <p className="uc-hero-subtitle">
                            Leading the Real Estate Market with Integrity and Innovation.
                        </p>
                        <a href="#about" className="uc-hero-btn btn">
                            Learn More About Us
                        </a>
                    </div>
                </section>
                
                {/* About Section */}
                <section id="about" ref={sectionRefs.about} className="uc-about-section py-5">
                    <div className="container">
                        <h2 className="uc-section-title uc-fade-in">About UrbanCraft REAL ESTATE</h2>
                        <div className="row align-items-center uc-fade-in">
                            <ImagewithText
                                content="At UrbanCraft REAL ESTATE, we're revolutionizing the real estate industry by creating a smarter, faster, and more efficient way to connect professionals. Our platform is designed to bridge the gap between buyers, sellers, investors, and service providers, empowering them to achieve their goals through seamless collaboration and personalized solutions."
                                imgSrc={aboutImage1}
                                altText="About UrbanCraft REAL ESTATE"
                            />
                        </div>
                    </div>
                </section>
                
                {/* Mission & Vision Section (Component) */}
                <div ref={sectionRefs.mission}>
                    <MissionVision />
                </div>
                
                {/* Core Values Section */}
                <section ref={sectionRefs.coreValues} className="uc-core-values py-5 bg-light">
                    <div className="container">
                        <h2 className="uc-section-title uc-fade-in">Our Core Values</h2>
                        <div className="row text-light">
                            <div className="col-md-4 mb-4 uc-fade-in">
                                <CoreValueCard
                                    title="Integrity"
                                    text="We uphold transparency, honesty, and ethical practices in all our transactions, ensuring that our clients' interests are always our top priority."
                                />
                            </div>
                            <div className="col-md-4 mb-4 uc-fade-in" style={{ animationDelay: '0.2s' }}>
                                <CoreValueCard
                                    title="Innovation"
                                    text="We continually embrace new trends and technologies to offer creative, cutting-edge solutions that meet the evolving demands of the real estate industry."
                                />
                            </div>
                            <div className="col-md-4 mb-4 uc-fade-in" style={{ animationDelay: '0.4s' }}>
                                <CoreValueCard
                                    title="Excellence"
                                    text="We are committed to delivering outstanding results in every project, consistently striving for the highest standards of quality and client satisfaction."
                                />
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Testimonial Section (Component) */}
                <div ref={sectionRefs.testimonials}>
                    <Testimonial />
                </div>
                
                {/* Contact Section */}
                <section ref={sectionRefs.contact} id="contact" className="uc-contact-section py-5">
                    <div className="container">
                        <h2 className="uc-section-title uc-fade-in">Get in Touch</h2>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="uc-contact-form uc-fade-in">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row mb-4">
                                            <div className="col-md-6 mb-3 mb-md-0">
                                                <label htmlFor="name" className="uc-form-label form-label">
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="uc-form-control form-control"
                                                    name="name"
                                                    id="name"
                                                    placeholder="Your Name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="email" className="uc-form-label form-label">
                                                    Your Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="uc-form-control form-control"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Your Email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="message" className="uc-form-label form-label">
                                                Your Message
                                            </label>
                                            <textarea
                                                className="uc-form-control form-control"
                                                name="message"
                                                id="message"
                                                placeholder="Your Message"
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="text-center">
                                            <button 
                                                type="submit" 
                                                className="uc-contact-btn"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-paper-plane me-2"></i>
                                                        Send Message
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default About;
