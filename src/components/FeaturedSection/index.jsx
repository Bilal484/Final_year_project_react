import React, { useEffect, useState, useRef } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { TranslateText, useTranslation } from "../../translation";
import "./FeaturedSection.css";

const FeaturedSection = () => {
    const [featuredBlogs, setFeaturedBlogs] = useState([]);
    const [imagePath, setImagePath] = useState("");
    const [error, setError] = useState(null);
    const sectionRef = useRef(null);
    const navigate = useNavigate();
    const { translateBatch } = useTranslation();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    entries[0].target.classList.add("fs-visible");
                }
            },
            { threshold: 0.1 }
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
        fetchFeaturedBlogs();
    }, [translateBatch]);

    const fetchFeaturedBlogs = async () => {
        setError(null);
        
        try {
            const response = await fetch(
                "https://api.biznetusa.com/api/get-featurrblog"
            );
            const data = await response.json();
            
            if (data.status === 200) {
                const titlesArray = data.blogs.map(item => item.title);
                const translatedTitle = await translateBatch(titlesArray);

                const translatedBlogs = data.blogs.map((el, index) => ({
                    ...el,
                    title: translatedTitle[index]
                }));

                setFeaturedBlogs(translatedBlogs);
                setImagePath(data.imagePath);
            }
        } catch (error) {
            console.error("Error fetching featured blogs:", error);
        }
    };

    const handleReadMore = (id) => {
        navigate(`/blog/${id}`);
    };
    
    // Format date function
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <Helmet>
                <title>Featured Blogs | UrbanCraft REAL ESTATE</title>
                <meta name="description" content="Explore our featured blogs section, showcasing top stories and highlights from various categories." />
                <meta name="keywords" content="blogs, featured blogs, stories, articles, highlights, blog section" />
                <meta name="author" content="UrbanCraft REAL ESTATE" />
                <meta property="og:title" content="Featured Blogs | UrbanCraft REAL ESTATE" />
                <meta property="og:description" content="Explore our featured blogs section, showcasing top stories and highlights from various categories." />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="fs-section fs-animate" ref={sectionRef}>
                <div className="fs-header">
                    <h4 className="fs-title">
                        <TranslateText>Featured</TranslateText>
                    </h4>
                    <div className="fs-line"></div>
                </div>
                
                <div className="fs-blog-grid">
                    {featuredBlogs.map((blog, index) => (
                        <div 
                            key={blog.id} 
                            className="fs-blog-card"
                            onClick={() => handleReadMore(blog.id)}
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <div className="fs-blog-image-container">
                                {blog.images && blog.images.length > 0 ? (
                                    <img
                                        src={`${imagePath}/${blog.images[0].image}`}
                                        alt={blog.title}
                                        className="fs-blog-image"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="fs-no-image">
                                        <i className="fas fa-image"></i>
                                    </div>
                                )}
                                <div className="fs-blog-overlay">
                                    <span className="fs-read-more">
                                        Read More
                                    </span>
                                </div>
                            </div>
                            <div className="fs-blog-content">
                                <h5 className="fs-blog-title">{blog.title}</h5>
                                {blog.created_at && (
                                    <div className="fs-blog-date">
                                        <i className="far fa-calendar-alt"></i>
                                        <span>{formatDate(blog.created_at)}</span>
                                    </div>
                                )}
                                {blog.desc && (
                                    <p className="fs-blog-excerpt">
                                        {blog.desc.replace(/<[^>]+>/g, '').substring(0, 120)}
                                        {blog.desc.length > 120 ? '...' : ''}
                                    </p>
                                )}
                                <div className="fs-blog-footer">
                                    <button 
                                        className="fs-read-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleReadMore(blog.id);
                                        }}
                                    >
                                        Continue Reading
                                        <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FeaturedSection;
