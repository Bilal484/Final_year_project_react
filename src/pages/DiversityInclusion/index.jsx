import React from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet
import './DiversityInclusion.css';
import Header from '../../components/header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom'; // You'll need to add this image

const DiversityInclusion = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
        <Helmet>
                <title>Diversity, Equity & Inclusion at ZNET</title>
                <meta name="description" content="Learn about ZNET's commitment to diversity, equity, and inclusion in the real estate industry." />
                <meta name="keywords" content="diversity, equity, inclusion, real estate, ZNET, DEI" />
                <meta property="og:title" content="Diversity, Equity & Inclusion at ZNET" />
                <meta property="og:description" content="Discover how ZNET promotes diversity, equity, and inclusion within the real estate sector." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="URL_to_an_image_that_represents_the_page" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Diversity, Equity & Inclusion at ZNET" />
                <meta name="twitter:description" content="Explore ZNET's initiatives for promoting DEI in real estate." />
            </Helmet>
            <Header isOpen={isOpen} toggle={toggle} />
            <div className="diversity-inclusion-container">
                {/* Hero Section */}
                <section className="hero-section text-white position-relative">
                    <div className="container py-5">
                        <h1 className="display-3 fw-bold mb-4">Diversity, Equity & Inclusion at ZNET</h1>
                        <p className="lead mb-4">Building a more inclusive real estate industry, one connection at a time.</p>
                    </div>
                </section>

                {/* Our Commitment */}
                <section className="commitment-section py-5">
                    <div className="container">
                        <h2 className="section-title mb-4">Our Commitment</h2>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <p className="lead">At ZNET, we believe that diversity drives innovation and creates better outcomes for our employees, customers, and communities.</p>
                            </div>
                            <div className="col-md-6">
                                <div className="stats-container">
                                    <div className="stat-item">
                                        <h3 className="text-primary">50%</h3>
                                        <p>Women in Leadership</p>
                                    </div>
                                    <div className="stat-item">
                                        <h3 className="text-primary">40%</h3>
                                        <p>People of Color</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* DEI Initiatives */}
                <section className="initiatives-section py-5 bg-light">
                    <div className="container">
                        <h2 className="section-title mb-4">Our DEI Initiatives</h2>
                        <div className="row g-4">
                            {[
                                {
                                    title: "Inclusive Hiring",
                                    description: "Implementing blind resume screening and diverse interview panels",
                                    icon: "fa-users"
                                },
                                {
                                    title: "Employee Resource Groups",
                                    description: "Supporting communities within our workplace",
                                    icon: "fa-hands-helping"
                                },
                                {
                                    title: "Training & Development",
                                    description: "Regular DEI workshops and leadership development programs",
                                    icon: "fa-graduation-cap"
                                },
                                {
                                    title: "Community Outreach",
                                    description: "Partnerships with diverse real estate organizations",
                                    icon: "fa-handshake"
                                }
                            ].map((initiative, index) => (
                                <div key={index} className="col-md-6 col-lg-3">
                                    <div className="initiative-card  text-center p-4 bg-white rounded shadow-sm h-100">
                                        <i className={`fas ${initiative.icon} fa-2x text-primary mb-3`}></i>
                                        <h4>{initiative.title}</h4>
                                        <p>{initiative.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Employee Resource Groups */}
                <section className="erg-section py-5">
                    <div className="container">
                        <h2 className="section-title mb-4">Employee Resource Groups</h2>
                        <div className="row g-4">
                            {[
                                "Women in Real Estate",
                                "Black Professionals Network",
                                "LGBTQ+ Alliance",
                                "Asian Pacific Islander Network",
                                "Hispanic/Latino Network",
                                "Veterans Network"
                            ].map((group, index) => (
                                <div key={index} className="col-md-4">
                                    <div className="erg-card h-100 p-4 bg-white rounded shadow-sm">
                                        <h4>{group}</h4>
                                        <p>Supporting and empowering our {group} community through mentorship, networking, and professional development.</p>
                                        <Link to="#" className="btn mt-auto btn-outline-primary">Learn More</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Supplier Diversity */}
                <section className="supplier-diversity py-5 bg-light">
                    <div className="container">
                        <h2 className="section-title mb-4">Supplier Diversity Program</h2>
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h3>Building Inclusive Supply Chains</h3>
                                <p className="lead">We're committed to working with diverse suppliers and vendors to create economic opportunities for underrepresented communities.</p>
                                <ul className="list-unstyled">
                                    <li><i className="fas fa-check text-primary me-2"></i>Minority-owned businesses</li>
                                    <li><i className="fas fa-check text-primary me-2"></i>Women-owned businesses</li>
                                    <li><i className="fas fa-check text-primary me-2"></i>Veteran-owned businesses</li>
                                    <li><i className="fas fa-check text-primary me-2"></i>LGBTQ+-owned businesses</li>
                                </ul>
                                <Link to="#" className="btn btn-primary mt-3">Become a Supplier</Link>
                            </div>
                            <div className="col-md-6">
                                <div className="stats-container">
                                    <div className="stat-item text-center">
                                        <h3 className="display-4 text-primary">$100M+</h3>
                                        <p>Annual Spend with Diverse Suppliers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Community Partnerships */}
                <section className="partnerships-section py-5">
                    <div className="container">
                        <h2 className="section-title mb-4">Community Partnerships</h2>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="partnership-card p-4 bg-white rounded shadow-sm">
                                    <h4>National Association of Real Estate Brokers</h4>
                                    <p>Supporting initiatives to increase Black homeownership</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="partnership-card p-4 bg-white rounded shadow-sm">
                                    <h4>NAHREP</h4>
                                    <p>Advancing sustainable Hispanic homeownership</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Leadership Commitment */}
                <section className="leadership-commitment py-5 bg-light">
                    <div className="container">
                        <h2 className="section-title mb-4">Leadership Commitment</h2>
                        <div className="row">
                            <div className="col-md-8 mx-auto text-center">
                                <blockquote className="blockquote">
                                    <p className="mb-4">"Our commitment to diversity and inclusion is not just a program – it's core to who we are and how we operate."</p>
                                    <footer className="blockquote-footer">CEO, ZNET</footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Training & Development */}
                <section className="training-section py-5">
                    <div className="container">
                        <h2 className="section-title mb-4">Training & Development</h2>
                        <div className="row g-4">
                            {[
                                "Unconscious Bias Training",
                                "Inclusive Leadership",
                                "Cultural Competency",
                                "Allyship Workshop"
                            ].map((training, index) => (
                                <div key={index} className="col-md-6 col-lg-3">
                                    <div className="training-card p-4 bg-white rounded shadow-sm h-100">
                                        <h4>{training}</h4>
                                        <p>Comprehensive training programs for all employees</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Awards & Recognition */}
                <section className="awards-section py-5 bg-light">
                    <div className="container">
                        <h2 className="section-title mb-4">Awards & Recognition</h2>
                        <div className="row g-4">
                            {[
                                "Best Places to Work for LGBTQ+ Equality",
                                "Top Company for Diversity",
                                "Military Friendly Employer",
                                "Women's Choice Award"
                            ].map((award, index) => (
                                <div key={index} className="col-md-6 col-lg-3">
                                    <div className="award-card text-center p-4 bg-white rounded shadow-sm h-100">
                                        <i className="fas fa-award fa-2x text-primary mb-3"></i>
                                        <h4>{award}</h4>
                                        <p>2024 Recognition</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Goals & Metrics */}
                <section className="goals-section py-5">
                    <div className="container">
                        <h2 className="section-title mb-4">Our Goals & Metrics</h2>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="goal-card p-4 bg-white rounded shadow-sm h-100">
                                    <h4>Representation</h4>
                                    <p>Increase diversity in leadership positions by 30% by 2025</p>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: '65%'}} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">65%</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="goal-card p-4 bg-white rounded shadow-sm h-100">
                                    <h4>Inclusion</h4>
                                    <p>Achieve 90% employee satisfaction in inclusion surveys</p>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: '80%'}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">80%</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="goal-card p-4 bg-white rounded shadow-sm h-100">
                                    <h4>Supplier Diversity</h4>
                                    <p>Double spend with diverse suppliers by 2025</p>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: '45%'}} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">45%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default DiversityInclusion;