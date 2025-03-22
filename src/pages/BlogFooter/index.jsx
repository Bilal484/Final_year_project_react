import React from 'react';
import { Helmet } from 'react-helmet';
import './BlogFooter.css';
import Header from '../../components/header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import blogImg1 from '../../assets/images/blog 01.jpg'
import blogImg2 from '../../assets/images/blog 01.jpg'
import blogImg3 from '../../assets/images/blog 01.jpg'

const BlogFooter = () => {
    return (
        <>
        <Helmet>
                <title>ZNET Real Estate Blog</title>
                <meta name="description" content="Explore the latest insights, tips, and trends in real estate to help you make informed decisions." />
                <meta name="keywords" content="real estate, ZNET blog, real estate tips, real estate trends, real estate investment" />
                <meta property="og:title" content="ZNET Real Estate Blog" />
                <meta property="og:description" content="Stay updated with the latest insights, tips, and trends in real estate on the ZNET Real Estate Blog." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="/path/to/image.jpg" />  {/* Replace with an actual image URL */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="ZNET Real Estate Blog" />
                <meta name="twitter:description" content="Discover expert insights and the latest trends in real estate with the ZNET Blog." />
                <meta name="twitter:image" content="/path/to/image.jpg" />  {/* Replace with an actual image URL */}
            </Helmet>
            <Header />
            <div className="blog-container">
                {/* Hero Section */}
                <section className="blog-hero-section text-center text-white position-relative">
                    <div className="container py-5">
                        <h1 className="display-3 fw-bold mb-4">ZNET Real Estate Blog</h1>
                        <p className="lead mb-4">Insights, Tips, and Trends in Real Estate</p>
                        <div className="search-container">
                            <input type="text" className="form-control form-control-lg" placeholder="Search articles..." />
                            <button className="btn btn-primary btn-lg">Search</button>
                        </div>
                    </div>
                </section>

                {/* Featured Posts */}
                <section className="featured-posts py-5">
                    <div className="container">
                        <h2 className="text-center mb-5">Featured Articles</h2>
                        <div className="row g-4">
                            <div className="col-md-6 col-lg-4">
                                <div className="featured-post-card h-100">
                                    <div className="post-image">
                                        <img src={blogImg1} alt="Blog Post" className="img-fluid" />
                                        <div className="category-badge">Market Trends</div>
                                    </div>
                                    <div className="post-content p-4">
                                        <h3 className="h4 mb-3">2024 Real Estate Market Forecast</h3>
                                        <p className="text-muted">Expert analysis on upcoming real estate trends and market predictions.</p>
                                        <div className="post-meta d-flex justify-content-between align-items-center">
                                            <span className="date">March 15, 2024</span>
                                            <Link to="#" className="read-more">Read More →</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="featured-post-card h-100">
                                    <div className="post-image">
                                        <img src={blogImg2} alt="Blog Post" className="img-fluid" />
                                        <div className="category-badge">Investment</div>
                                    </div>
                                    <div className="post-content p-4">
                                        <h3 className="h4 mb-3">Smart Investment Strategies</h3>
                                        <p className="text-muted">Key insights for maximizing your real estate investment returns.</p>
                                        <div className="post-meta d-flex justify-content-between align-items-center">
                                            <span className="date">March 12, 2024</span>
                                            <Link to="#" className="read-more">Read More →</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className="featured-post-card h-100">
                                    <div className="post-image">
                                        <img src={blogImg3} alt="Blog Post" className="img-fluid" />
                                        <div className="category-badge">Tips & Tricks</div>
                                    </div>
                                    <div className="post-content p-4">
                                        <h3 className="h4 mb-3">Home Staging Essentials</h3>
                                        <p className="text-muted">Professional tips to make your property stand out in the market.</p>
                                        <div className="post-meta d-flex justify-content-between align-items-center">
                                            <span className="date">March 10, 2024</span>
                                            <Link to="#" className="read-more">Read More →</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="categories-section py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center mb-5">Browse by Category</h2>
                        <div className="row g-4">
                            <div className="col-md-3">
                                <Link to="#" className="category-card d-flex align-items-center p-4">
                                    <i className="fas fa-chart-line fa-2x me-3 text-primary"></i>
                                    <div>
                                        <h4 className="h5 mb-1">Market Analysis</h4>
                                        <span className="text-muted">48 Articles</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <Link to="#" className="category-card d-flex align-items-center p-4">
                                    <i className="fas fa-home fa-2x me-3 text-primary"></i>
                                    <div>
                                        <h4 className="h5 mb-1">Buying Guide</h4>
                                        <span className="text-muted">36 Articles</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <Link to="#" className="category-card d-flex align-items-center p-4">
                                    <i className="fas fa-key fa-2x me-3 text-primary"></i>
                                    <div>
                                        <h4 className="h5 mb-1">Selling Tips</h4>
                                        <span className="text-muted">42 Articles</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <Link to="#" className="category-card d-flex align-items-center p-4">
                                    <i className="fas fa-coins fa-2x me-3 text-primary"></i>
                                    <div>
                                        <h4 className="h5 mb-1">Investment</h4>
                                        <span className="text-muted">31 Articles</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Latest Posts Grid */}
                <section className="latest-posts py-5">
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                            <h2>Latest Articles</h2>
                            <div className="view-options">
                                <button className="btn btn-outline-primary me-2">Grid View</button>
                                <button className="btn btn-outline-primary">List View</button>
                            </div>
                        </div>
                        <div className="row g-4">
                            {/* Repeat this block for each blog post */}
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="col-md-6 col-lg-4">
                                    <article className="blog-post-card">
                                        <div className="post-image">
                                            <img src={blogImg1} alt="Blog Post" className="img-fluid" />
                                        </div>
                                        <div className="post-content p-4">
                                            <div className="post-meta mb-3">
                                                <span className="category">Real Estate</span>
                                                <span className="date">March {item}, 2024</span>
                                            </div>
                                            <h3 className="h5 mb-3">Essential Tips for First-Time Home Buyers</h3>
                                            <p className="text-muted">A comprehensive guide to help you navigate the home buying process with confidence.</p>
                                            <Link to="#" className="btn btn-outline-primary btn-sm">Read More</Link>
                                        </div>
                                    </article>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-5">
                            <button className="btn btn-primary btn-lg">Load More Articles</button>
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="newsletter-section py-5 bg-light">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h2 className="mb-4">Subscribe to Our Newsletter</h2>
                                <p className="lead mb-4">Get the latest real estate insights and updates delivered to your inbox</p>
                                <form className="newsletter-form">
                                    <div className="input-group mb-3">
                                        <input type="email" className="form-control form-control-lg" placeholder="Enter your email address" />
                                        <button className="btn btn-primary btn-lg" type="submit">Subscribe</button>
                                    </div>
                                </form>
                                <p className="text-muted small">By subscribing, you agree to our Privacy Policy</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default BlogFooter;
