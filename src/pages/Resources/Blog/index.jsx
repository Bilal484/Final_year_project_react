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
        <div className="language-switcher">
            <label>
                <TranslateText>Select Language:</TranslateText>
                <LanguageSelector className="language-dropdown" />
            </label>
        </div>
    );
}

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [imagePath, setImagePath] = useState("");
    const [loading, setLoading] = useState(true);
    const [visibleBlogs, setVisibleBlogs] = useState(4);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("https://api.biznetusa.com/api/all-blogs");
                if (response.data.status === 200) {
                    setBlogs(response.data.blogs);
                    setImagePath(response.data.imagePath);
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const loadMoreBlogs = () => {
        setVisibleBlogs((prev) => prev + 4);
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
                <title>Blog - Latest Real Estate News & Updates</title>
                <meta name="description" content="Explore our latest blog posts for updates on real estate trends, investment tips, and market analysis. Stay informed with Znet's expert insights." />
                <meta name="keywords" content="real estate, blogs, property investment, market trends, housing updates, Znet blogs" />
                <meta name="author" content="Znet Team" />
            </Helmet>
            <Header />
            <main>
                <LanguageSwitcher />
                <Container className="my-5">
                    <Row>
                        <Col lg={8} md={12} className="mb-4">
                            <FeaturedSection />
                        </Col>
                        <Col lg={4} md={12} className="mb-4">
                            <WhatsNewSection />
                        </Col>
                    </Row>
                </Container>

                <section id="featured" className="py-5">
                    <Container>
                        <h4 className="mb-4"><TranslateText>Latest Blogs</TranslateText></h4>
                        <Row className="gy-4">
                            {blogs.slice(0, visibleBlogs).map((blog) => (
                                <Col md={6} lg={calculateColSize(visibleBlogs)} key={blog.id}>
                                    <Card className="h-100">
                                        <Card.Img
                                            variant="top"
                                            src={`${imagePath}/${blog.images[0]?.image}`}
                                            alt={blog.title}
                                            className="rounded"
                                        />
                                        <Card.Body>
                                            <Card.Title>
                                                <TranslateText>{blog.title}</TranslateText>
                                            </Card.Title>
                                            <Card.Text>
                                                <TranslateText>{blog.desc.replace(/<[^>]+>/g, "").slice(0, 100)}...</TranslateText>
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => handleReadMore(blog.id)}>
                                                <TranslateText>Read More</TranslateText>
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        {visibleBlogs < blogs.length && (
                            <div className="d-flex justify-content-center mt-4">
                                <Button onClick={loadMoreBlogs} className="btn-blog">
                                    <TranslateText>Load More</TranslateText>
                                </Button>
                            </div>
                        )}
                    </Container>
                </section>

                <section className="subscription-section py-5 bg-light">
                    <Container>
                        <HousingSubscriptionForm />
                    </Container>
                </section>

                <section className="social-section text-center py-5">
                    <Container>
                        <h4><TranslateText>Follow Znet</TranslateText></h4>
                        <div className="social-icons mt-3">
                            <a href="#" className="twitter mx-2" aria-label="Twitter">
                                <i className="fab fa-twitter" />
                            </a>
                            <a href="#" className="facebook mx-2" aria-label="Facebook">
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a href="#" className="pinterest mx-2" aria-label="Pinterest">
                                <i className="fab fa-pinterest-p" />
                            </a>
                            <a href="#" className="linkedin mx-2" aria-label="LinkedIn">
                                <i className="fab fa-linkedin-in" />
                            </a>
                            <a href="#" className="youtube mx-2" aria-label="YouTube">
                                <i className="fab fa-youtube" />
                            </a>
                            <a href="#" className="instagram mx-2" aria-label="Instagram">
                                <i className="fab fa-instagram" />
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
