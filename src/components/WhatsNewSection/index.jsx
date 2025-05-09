import React, { useEffect, useState, useRef } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { TranslateText, useTranslation } from "../../translation";
import "./WhatsNewSection.css";

const WhatsNewSection = () => {
    const { translateBatch, t } = useTranslation();
    const [newsItems, setNewsItems] = useState([]);
    const [imagePath, setImagePath] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const sectionRef = useRef(null);
    const navigate = useNavigate();

    const handleReadMore = (id) => {
        navigate(`/blog/${id}`);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    entries[0].target.classList.add("wn-visible");
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const fetchLatestBlogs = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                const response = await fetch("https://api.biznetusa.com/api/get-latestblog");
                const data = await response.json();

                if (data.status === 200) {
                    const titleArray = data.blogs.map(blog => blog.title);

                    const translatedTitles = await translateBatch(titleArray);

                    const translatedBlogs = data.blogs.map((blog, index) => ({
                        ...blog,
                        title: translatedTitles[index]
                    }));

                    setNewsItems(translatedBlogs);
                    setImagePath(data.imagePath);
                } else {
                    setError("Failed to fetch latest blogs");
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setError("An error occurred while fetching the latest blogs");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLatestBlogs();
    }, [translateBatch]);

    // Format date function
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>What's New | UrbanCraft REAL ESTATE</title>
                <meta name="description" content="Stay updated with the latest blogs and news from UrbanCraft REAL ESTATE." />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="What's New | UrbanCraft REAL ESTATE" />
                <meta property="og:description" content="Stay updated with the latest blogs and news from UrbanCraft REAL ESTATE." />
                <meta property="og:image" content="https://via.placeholder.com/150" />
                <meta property="og:url" content="https://www.biznetusa.com/whats-new" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="What's New | UrbanCraft REAL ESTATE" />
                <meta name="twitter:description" content="Stay updated with the latest blogs and news from UrbanCraft REAL ESTATE." />
                <meta name="twitter:image" content="https://via.placeholder.com/150" />
            </Helmet>
            
            <div className="wn-section wn-animate" ref={sectionRef}>
                <div className="wn-header">
                    <h4 className="wn-title">
                        <TranslateText>What's New</TranslateText>
                    </h4>
                    <div className="wn-line"></div>
                </div>

                {isLoading ? (
                    <div className="wn-loading">
                        <Spinner animation="border" variant="primary" size="sm" />
                        {/* <p><TranslateText>Loading latest news...</TranslateText></p> */}
                    </div>
                ) : newsItems.length === 0 ? (
                    <div className="wn-empty">
                        <i className="fas fa-newspaper"></i>
                        <p><TranslateText>No news available</TranslateText></p>
                    </div>
                ) : (
                    <div className="wn-news-list">
                        {newsItems.map((newsItem, index) => (
                            <div 
                                key={index} 
                                className="wn-news-item"
                                onClick={() => handleReadMore(newsItem.id)}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="wn-news-image-container">
                                    <img
                                        src={
                                            newsItem.images && newsItem.images.length > 0
                                                ? `${imagePath}/${newsItem.images[0].image}`
                                                : "https://via.placeholder.com/150"
                                        }
                                        alt={newsItem.title}
                                        className="wn-news-image"
                                        loading="lazy"
                                    />
                                    <div className="wn-news-overlay"></div>
                                </div>
                                <div className="wn-news-content">
                                    <h5 className="wn-news-title">{newsItem.title}</h5>
                                    {newsItem.created_at && (
                                        <div className="wn-news-date">
                                            <i className="far fa-calendar-alt"></i>
                                            <span>{formatDate(newsItem.created_at)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        <button 
                            className="wn-view-all-btn"
                            onClick={() => navigate('/blog')}
                        >
                            <TranslateText>View All Articles</TranslateText>
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default WhatsNewSection;
