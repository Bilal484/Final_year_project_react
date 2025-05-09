import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FeaturedSection from "../../../components/FeaturedSection";
import WhatsNewSection from "../../../components/WhatsNewSection";
import HousingSubscriptionForm from "../../../components/HousingSubscriptionForm";
import "../../../assets/css/Blog.css";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { TranslateText, LanguageSelector } from "../../../translation";

export function LanguageSwitcher() {
    return (
        <div className="uc-language-switcher">
            <label>
                <TranslateText>Select Language:</TranslateText>
                <LanguageSelector className="uc-language-dropdown" />
            </label>
        </div>
    );
}

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [imagePath, setImagePath] = useState("");
    const [visibleBlogs, setVisibleBlogs] = useState(4);
    const navigate = useNavigate();
    
    // References for scroll animations
    const latestBlogsRef = React.useRef(null);
    const socialSectionRef = React.useRef(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("https://api.biznetusa.com/api/all-blogs");
                if (response.data.status === 200) {
                    setBlogs(response.data.blogs);
                    setImagePath(response.data.imagePath);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
        
        // Add scroll animation observers
        const observerOptions = { threshold: 0.1, rootMargin: "0px" };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('uc-visible');
                }
            });
        }, observerOptions);
        
        const elements = document.querySelectorAll('.uc-animate');
        elements.forEach(el => observer.observe(el));
        
        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, []);

    const loadMoreBlogs = () => {
        setTimeout(() => {
            setVisibleBlogs((prev) => prev + 4);
        }, 300);
    };

    const handleReadMore = (id) => {
        navigate(`/blog/${id}`);
    };

    const calculateColSize = (visibleBlogs) => {
        if (visibleBlogs <= 4) return 3;
        if (visibleBlogs <= 8) return 4;
        return 6;
    };

    return (
        <>
            <Helmet>
                <title>Blog - Latest Real Estate News & Updates | UrbanCraft</title>
                <meta name="description" content="Explore our latest blog posts for updates on real estate trends, investment tips, and market analysis. Stay informed with UrbanCraft REAL ESTATE's expert insights." />
                <meta name="keywords" content="real estate, blogs, property investment, market trends, housing updates, UrbanCraft REAL ESTATE blogs" />
                <meta name="author" content="UrbanCraft REAL ESTATE Team" />
                <meta property="og:title" content="Blog - Latest Real Estate News & Updates" />
                <meta property="og:description" content="Stay updated with the latest trends in real estate market, investment opportunities, and expert guidance from UrbanCraft REAL ESTATE." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
            </Helmet>
            <Header />
            <main className="uc-blog-page">
                <div className="uc-blog-hero uc-animate">
                    <Container>
                        <h1 className="uc-blog-hero-title">
                            <span className="uc-text-highlight">Real Estate</span> Blog & Resources
                        </h1>
                        <p className="uc-blog-hero-subtitle">
                            <TranslateText>
                                Stay updated with the latest industry trends, investment opportunities, and expert advice
                            </TranslateText>
                        </p>
                        <LanguageSwitcher />
                    </Container>
                </div>
                
                <Container className="my-5">
                    <Row className="uc-featured-row uc-animate">
                        <Col lg={8} md={12} className="mb-4">
                            <FeaturedSection />
                        </Col>
                        <Col lg={4} md={12} className="mb-4">
                            <WhatsNewSection />
                        </Col>
                    </Row>
                </Container>

                <section ref={latestBlogsRef} id="featured" className="uc-latest-blogs py-5 uc-animate">
                    <Container>
                        <div className="uc-section-header">
                            <h2 className="uc-section-title">
                                <TranslateText>Latest Blogs</TranslateText>
                            </h2>
                            <div className="uc-section-line"></div>
                        </div>
                        
                        {blogs.length === 0 ? (
                            <div className="uc-no-blogs">
                                <i className="fas fa-newspaper uc-no-blogs-icon"></i>
                                <h3>No blogs available</h3>
                                <p>Check back soon for new content!</p>
                            </div>
                        ) : (
                            <Row className="gy-4">
                                {blogs.slice(0, visibleBlogs).map((blog, index) => (
                                    <Col 
                                        md={6} 
                                        lg={calculateColSize(visibleBlogs)} 
                                        key={blog.id}
                                        className="uc-blog-card-wrapper"
                                        style={{ animationDelay: `${index * 0.15}s` }}
                                    >
                                        <Card className="uc-blog-card h-100">
                                            <div className="uc-blog-img-wrapper">
                                                <Card.Img
                                                    variant="top"
                                                    src={blog.images && blog.images[0]?.image 
                                                        ? `${imagePath}/${blog.images[0].image}` 
                                                        : "https://via.placeholder.com/400x300?text=No+Image"}
                                                    alt={blog.title}
                                                    className="uc-blog-img"
                                                    loading="lazy"
                                                />
                                                <div className="uc-blog-img-overlay"></div>
                                            </div>
                                            <Card.Body className="uc-blog-content">
                                                <Card.Title className="uc-blog-title">
                                                    <TranslateText>{blog.title}</TranslateText>
                                                </Card.Title>
                                                <div className="uc-blog-meta">
                                                    <span className="uc-blog-date">
                                                        <i className="far fa-calendar-alt"></i> 
                                                        {new Date(blog.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <Card.Text className="uc-blog-excerpt">
                                                    <TranslateText>
                                                        {blog.desc ? blog.desc.replace(/<[^>]+>/g, "").slice(0, 100) + "..." : ""}
                                                    </TranslateText>
                                                </Card.Text>
                                                <Button 
                                                    variant="primary" 
                                                    className="uc-read-more-btn"
                                                    onClick={() => handleReadMore(blog.id)}
                                                >
                                                    <TranslateText>Read More</TranslateText>
                                                    <i className="fas fa-arrow-right"></i>
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                        
                        {visibleBlogs < blogs.length && (
                            <div className="d-flex justify-content-center mt-5">
                                <Button 
                                    onClick={loadMoreBlogs} 
                                    className="uc-load-more-btn"
                                >
                                    <TranslateText>Load More</TranslateText>
                                    <i className="fas fa-chevron-down ms-2"></i>
                                </Button>
                            </div>
                        )}
                    </Container>
                </section>

                <section className="uc-subscription-section py-5 uc-animate">
                    <Container>
                        <div className="uc-subscription-container">
                            <h2 className="uc-subscription-title">
                                <TranslateText>Subscribe to Our Newsletter</TranslateText>
                            </h2>
                            <p className="uc-subscription-text">
                                <TranslateText>
                                    Get the latest updates, market insights, and exclusive property alerts directly to your inbox
                                </TranslateText>
                            </p>
                            <HousingSubscriptionForm />
                        </div>
                    </Container>
                </section>

                <section ref={socialSectionRef} className="uc-social-section py-5 uc-animate">
                    <Container>
                        <h2 className="uc-social-title">
                            <TranslateText>Connect with UrbanCraft REAL ESTATE</TranslateText>
                        </h2>
                        <p className="uc-social-subtitle">
                            <TranslateText>
                                Follow us on social media for daily updates, property highlights, and real estate tips
                            </TranslateText>
                        </p>
                        <div className="uc-social-icons">
                            <a href="#" className="uc-social-icon uc-twitter" aria-label="Twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="uc-social-icon uc-facebook" aria-label="Facebook">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="uc-social-icon uc-pinterest" aria-label="Pinterest">
                                <i className="fab fa-pinterest-p"></i>
                            </a>
                            <a href="#" className="uc-social-icon uc-linkedin" aria-label="LinkedIn">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a href="#" className="uc-social-icon uc-youtube" aria-label="YouTube">
                                <i className="fab fa-youtube"></i>
                            </a>
                            <a href="#" className="uc-social-icon uc-instagram" aria-label="Instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </Container>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Blog;
