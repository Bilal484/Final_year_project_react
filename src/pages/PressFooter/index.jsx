import React from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet
import './PressFooter.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import pressHeroImage from '../../assets/images/premier.jpg';
import newsImage1 from '../../assets/images/purchase-3347053_1280.jpg';
import newsImage2 from '../../assets/images/Agent.png';

const PressFooter = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
        <Helmet>
                <title>URBANCRAFT REAL ESTATE Newsroom - Latest News and Media Resources</title>
                <meta name="description" content="Stay updated with the latest news, press releases, and media resources from URBANCRAFT REAL ESTATE. Explore our comprehensive coverage on company updates, media inquiries, and press materials." />
                <meta name="keywords" content="ZNET, newsroom, press releases, media resources, company news, technology updates, media contacts" />
            </Helmet>
            <Header isOpen={isOpen} toggle={toggle} />
            <div className="press-container">
                {/* Hero Section */}
                <section className="press-hero-section text-center text-white position-relative">
                    <div className="container py-5">
                        <h1 className="display-3 fw-bold mb-4">URBANCRAFT REAL ESTATE Newsroom</h1>
                        <p className="lead mb-4">Latest News, Press Releases, and Media Resources</p>
                        
                    </div>
                </section>

                {/* Latest News Section */}
                <section className="latest-news py-5">
                    <div className="container">
                        <h2 className="section-title mb-4">Latest News</h2>
                        <div className="row g-4">
                            <div className="col-md-8">
                                <div className="featured-news-card shadow-sm">
                                    <div className="card-body p-4">
                                        <span className="badge bg-custom-press mb-2">Featured</span>
                                        <h3>URBANCRAFT REAL ESTATE Expands Operations to Southeast Asian Markets</h3>
                                        <p className="text-muted">March 15, 2024</p>
                                        <p className="mb-4">URBANCRAFT REAL ESTATE announces strategic expansion into Southeast Asian markets, marking a significant milestone in the company's global growth strategy...</p>
                                        <Link to="#" className="btn btn-outline-custom-press">Read More</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="recent-news-list">
                                    <div className="news-item mb-3 p-3 bg-light rounded">
                                        <span className="badge bg-success mb-2">Company News</span>
                                        <h5>Q4 2023 Financial Results Released</h5>
                                        <p className="text-muted mb-0">March 10, 2024</p>
                                    </div>
                                    <div className="news-item mb-3 p-3 bg-light rounded">
                                        <span className="badge bg-info mb-2">Technology</span>
                                        <h5>New Platform Features Announced</h5>
                                        <p className="text-muted mb-0">March 5, 2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* More News Section */}
                <section className="more-news py-5 bg-light">
                    <div className="container">
                        <h2 className="section-title mb-4">More News</h2>
                        <div className="row g-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="col-md-6 col-lg-3">
                                    <div className="news-card h-100 bg-white shadow-sm rounded">
                                        <img 
                                            src={item % 2 === 0 ? newsImage1 : newsImage2} 
                                            alt={`News ${item}`} 
                                            className="card-img-top"
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                        <div className="card-body p-3">
                                            <span className="badge bg-secondary mb-2">Industry News</span>
                                            <h5 className="card-title">URBANCRAFT REAL ESTATE Launches New Innovation Hub</h5>
                                            <p className="text-muted small">February {item + 15}, 2024</p>
                                            <p className="card-text">Expanding our commitment to technological advancement with state-of-the-art facilities...</p>
                                            <Link to="#" className="btn btn-sm btn-outline-custom-press">Read More</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4">
                            <Link to="#" className="btn btn-custom-press-button">View All News</Link>
                        </div>
                    </div>
                </section>

                {/* Press Releases */}
                <section className="press-releases py-5 bg-light">
                    <div className="container">
                        <h2 className="section-title mb-4">Press Releases</h2>
                        <div className="row g-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="col-md-4">
                                    <div className="press-release-card bg-white p-4 rounded shadow-sm h-100">
                                        <div className="date-badge mb-3">
                                            <span className="text-custom-press">March {item}, 2024</span>
                                        </div>
                                        <h4>URBANCRAFT REAL ESTATE Announces New Partnership with Leading Tech Firm</h4>
                                        <p className="text-muted">Strategic collaboration aims to enhance digital capabilities and expand market reach...</p>
                                        <div className="mt-3">
                                            <Link to="#" className="btn btn-sm btn-outline-custom-press me-2">Read More</Link>
                                            <Link to="#" className="btn btn-sm btn-outline-secondary">Download PDF</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Media Resources */}
                <section className="media-resources py-5">
                    <div className="container">
                        <h2 className="section-title mb-5">Media Resources</h2>
                        <div className="row g-4">
                            <div className="col-md-6 col-lg-3">
                                <div className="resource-card text-center p-4">
                                    <i className="fas fa-images fa-3x text-custom-press mb-3"></i>
                                    <h4>Image Gallery</h4>
                                    <p>High-resolution images and logos</p>
                                    <Link to="#" className="btn btn-outline-custom-press btn-sm">Browse Gallery</Link>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="resource-card text-center p-4">
                                    <i className="fas fa-file-pdf fa-3x text-custom-press mb-3"></i>
                                    <h4>Press Kits</h4>
                                    <p>Comprehensive media information</p>
                                    <Link to="#" className="btn btn-outline-custom-press btn-sm">Download Kit</Link>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="resource-card text-center p-4">
                                    <i className="fas fa-video fa-3x text-custom-press mb-3"></i>
                                    <h4>Video Content</h4>
                                    <p>B-roll footage and interviews</p>
                                    <Link to="#" className="btn btn-outline-custom-press btn-sm">View Videos</Link>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="resource-card text-center p-4">
                                    <i className="fas fa-microphone-alt fa-3x text-custom-press mb-3"></i>
                                    <h4>Media Contacts</h4>
                                    <p>Press and media inquiries</p>
                                    <Link to="#" className="btn btn-outline-custom-press btn-sm">Contact Us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Company Facts */}
                <section className="company-facts py-5 bg-light">
                    <div className="container">
                        <h2 className="section-title text-center mb-5">Company Facts</h2>
                        <div className="row g-4">
                            <div className="col-md-3">
                                <div className="fact-card text-center">
                                    <h3 className="display-4 fw-bold text-custom-press">2010</h3>
                                    <p>Founded</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="fact-card text-center">
                                    <h3 className="display-4 fw-bold text-custom-press">1000+</h3>
                                    <p>Employees</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="fact-card text-center">
                                    <h3 className="display-4 fw-bold text-custom-press">20+</h3>
                                    <p>Countries</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="fact-card text-center">
                                    <h3 className="display-4 fw-bold text-custom-press">5M+</h3>
                                    <p>Customers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Media Contact */}
                <section className="media-contact py-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h2 className="mb-4">Media Inquiries</h2>
                                <p className="lead mb-4">For press and media inquiries, please contact our media relations team</p>
                                <div className="contact-info">
                                    <p><i className="fas fa-envelope me-2"></i>press@znet.com</p>
                                    <p><i className="fas fa-phone me-2"></i>+1 (555) 123-4567</p>
                                </div>
                                <button className="btn btn-custom-press-button btn-lg mt-4">Contact Media Relations</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Awards & Recognition */}
                <section className="awards-recognition py-5">
                    <div className="container">
                        <h2 className="section-title text-center mb-5">Awards & Recognition</h2>
                        <div className="row g-4">
                            {['2023', '2022', '2021', '2020'].map((year) => (
                                <div key={year} className="col-md-6 col-lg-3">
                                    <div className="award-card p-4 bg-white shadow-sm rounded">
                                        <div className="year-badge mb-3 text-custom-press fw-bold">{year}</div>
                                        <h4>Innovation Award</h4>
                                        <p className="text-muted">Best Technology Solution Provider</p>
                                        <small>Awarded by Tech Excellence</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Executive Leadership */}
                <section className="executive-leadership py-5 bg-light">
                    <div className="container">
                        <h2 className="section-title text-center mb-5">Executive Leadership</h2>
                        <div className="row g-4">
                            {['CEO', 'CTO', 'CFO', 'COO'].map((position) => (
                                <div key={position} className="col-md-3">
                                    <div className="executive-card text-center">
                                        <div className="executive-image mb-3">
                                            <div className="placeholder-image rounded-circle mx-auto" style={{ width: '150px', height: '150px', backgroundColor: '#ddd' }}></div>
                                        </div>
                                        <h4>John Doe</h4>
                                        <p className="text-custom-press">{position}</p>
                                        <Link to="#" className="btn btn-sm btn-outline-custom-press">View Profile</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Upcoming Events */}
                <section className="upcoming-events py-5">
                    <div className="container">
                        <h2 className="section-title mb-4">Upcoming Events</h2>
                        <div className="row g-4">
                            {[1, 2, 3].map((event) => (
                                <div key={event} className="col-md-4">
                                    <div className="event-card bg-white p-4 rounded shadow-sm">
                                        <div className="event-date mb-3">
                                            <span className="text-custom-press fw-bold">April {event * 5}, 2024</span>
                                        </div>
                                        <h4>URBANCRAFT REAL ESTATE Tech Conference {event}</h4>
                                        <p className="text-muted">Join us for our annual technology conference featuring industry leaders...</p>
                                        <div className="event-details mb-3">
                                            <p><i className="fas fa-map-marker-alt me-2"></i>San Francisco, CA</p>
                                            <p><i className="fas fa-clock me-2"></i>9:00 AM - 5:00 PM</p>
                                        </div>
                                        <Link to="#" className="btn btn-custom-press-button">Register Now</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter Signup */}
                <div className="container">
                <section className="newsletter-signup rounded-5  py-5 bg-custom-press text-white">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h2 className="mb-4">Stay Updated</h2>
                                <p className="lead mb-4">Subscribe to our newsletter for the latest news and updates</p>
                                <div className="row justify-content-center">
                                    <div className="col-md-8">
                                        <div className="input-group mb-3">
                                            <input type="email" className="form-control" placeholder="Enter your email address" />
                                            <button className="btn btn-light">Subscribe</button>
                                        </div>
                                        <small className="form-text text-white-50">We respect your privacy. Unsubscribe at any time.</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PressFooter;