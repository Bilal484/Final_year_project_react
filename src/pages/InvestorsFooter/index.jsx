import React from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet
import './InvestorsFooter.css';
import Header from '../../components/header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import investorHero from '../../assets/images/Owner-Dashboard/Sell with Redfin/MarketingIcon_cash_offer.png'
import chartImage from '../../assets/images/Owner-Dashboard/Sell with Redfin/MarketingIcon_user.png'
import teamImage from '../../assets/images/Owner-Dashboard/Sell with Redfin/MarketingIcon_yard_sign.png'

const InvestorsFooter = () => {
    return (
        <>
        <Helmet>
                <title>Investor Relations - URBANCRAFT REAL ESTATE</title>
                <meta name="description" content="Join URBANCRAFT REAL ESTATE's investor relations to explore strategic real estate investment opportunities with high returns and managed risks." />
                <meta name="keywords" content="real estate, investors, URBANCRAFT REAL ESTATE, investment opportunities, strategic investment, real estate market" />
            </Helmet>
            <Header />
            <div className="investors-container">
                {/* Hero Section */}
                <section className="investor-hero-section text-center text-white position-relative">
                    <div className="container py-5">
                        <h1 className="display-3 fw-bold mb-4">Investor Relations</h1>
                        <p className="lead mb-4">Building Value Through Strategic Real Estate Investment</p>
                        <div className="hero-stats row justify-content-center mt-5">
                            <div className="col-md-3">
                                <div className="stat-item">
                                    <h3 className="display-4 fw-bold">$2.8B</h3>
                                    <p>Assets Under Management</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="stat-item">
                                    <h3 className="display-4 fw-bold">18.5%</h3>
                                    <p>Annual ROI</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="stat-item">
                                    <h3 className="display-4 fw-bold">500+</h3>
                                    <p>Active Investors</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Investment Highlights */}
                <section className="investment-highlights py-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <h2 className="mb-4">Why Invest With URBANCRAFT REAL ESTATE?</h2>
                                <div className="highlight-item d-flex align-items-start mb-4">
                                    <div className="highlight-icon me-3">
                                        <i className="fas fa-chart-line fa-2x text-primary"></i>
                                    </div>
                                    <div>
                                        <h4>Strong Performance Track Record</h4>
                                        <p className="text-muted">Consistent returns above market average for the past 10 years.</p>
                                    </div>
                                </div>
                                <div className="highlight-item d-flex align-items-start mb-4">
                                    <div className="highlight-icon me-3">
                                        <i className="fas fa-shield-alt fa-2x text-primary"></i>
                                    </div>
                                    <div>
                                        <h4>Risk-Managed Approach</h4>
                                        <p className="text-muted">Sophisticated risk assessment and management strategies.</p>
                                    </div>
                                </div>
                                <div className="highlight-item d-flex align-items-start">
                                    <div className="highlight-icon me-3">
                                        <i className="fas fa-handshake fa-2x text-primary"></i>
                                    </div>
                                    <div>
                                        <h4>Expert Management Team</h4>
                                        <p className="text-muted">Led by industry veterans with decades of experience.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="performance-chart">
                                    <img src={chartImage} alt="Performance Chart" className="img-fluid rounded shadow" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Investment Options */}
                <section className="investment-options py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center mb-5">Investment Opportunities</h2>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="investment-card">
                                    <div className="card-header">
                                        <h3>Core Properties</h3>
                                        <p className="min-investment">Minimum: $100,000</p>
                                    </div>
                                    <div className="card-body">
                                        <ul className="feature-list">
                                            <li><i className="fas fa-check"></i> Stable income-producing assets</li>
                                            <li><i className="fas fa-check"></i> Lower risk profile</li>
                                            <li><i className="fas fa-check"></i> Quarterly distributions</li>
                                            <li><i className="fas fa-check"></i> Professional management</li>
                                        </ul>
                                        <div className="text-center mt-4">
                                            <Link to="#" className="btn btn-outline-primary">Learn More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="investment-card featured">
                                    <div className="card-header">
                                        <h3>Value-Add Properties</h3>
                                        <p className="min-investment">Minimum: $250,000</p>
                                    </div>
                                    <div className="card-body">
                                        <ul className="feature-list">
                                            <li><i className="fas fa-check"></i> Higher potential returns</li>
                                            <li><i className="fas fa-check"></i> Active asset management</li>
                                            <li><i className="fas fa-check"></i> Strategic improvements</li>
                                            <li><i className="fas fa-check"></i> Regular reporting</li>
                                        </ul>
                                        <div className="text-center mt-4">
                                            <Link to="#" className="btn btn-primary">Learn More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="investment-card">
                                    <div className="card-header">
                                        <h3>Development Projects</h3>
                                        <p className="min-investment">Minimum: $500,000</p>
                                    </div>
                                    <div className="card-body">
                                        <ul className="feature-list">
                                            <li><i className="fas fa-check"></i> Ground-up development</li>
                                            <li><i className="fas fa-check"></i> Highest return potential</li>
                                            <li><i className="fas fa-check"></i> Project milestone updates</li>
                                            <li><i className="fas fa-check"></i> Exit strategy planning</li>
                                        </ul>
                                        <div className="text-center mt-4">
                                            <Link to="#" className="btn btn-outline-primary">Learn More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="team-section py-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <img src={teamImage} alt="Investment Team" className="img-fluid rounded shadow" />
                            </div>
                            <div className="col-lg-6">
                                <h2 className="mb-4">Expert Investment Team</h2>
                                <p className="lead mb-4">Our team brings decades of experience in real estate investment, development, and asset management.</p>
                                <div className="team-stats row g-4">
                                    <div className="col-6">
                                        <div className="stat-box">
                                            <h4>25+</h4>
                                            <p>Years Average Experience</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="stat-box">
                                            <h4>$5B+</h4>
                                            <p>Transactions Completed</p>
                                        </div>
                                    </div>
                                </div>
                                <Link to="#" className="btn btn-primary mt-4">Meet Our Team</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Resources Section */}
                <section className="resources-section py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center mb-5">Investor Resources</h2>
                        <div className="row g-4">
                            <div className="col-md-6 col-lg-3">
                                <div className="resource-card">
                                    <i className="fas fa-file-pdf fa-3x mb-3 text-primary"></i>
                                    <h4>Annual Reports</h4>
                                    <p className="text-muted">Download our latest financial reports and presentations</p>
                                    <Link to="#" className="btn btn-outline-primary btn-sm">View Reports</Link>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="resource-card">
                                    <i className="fas fa-calendar-alt fa-3x mb-3 text-primary"></i>
                                    <h4>Events Calendar</h4>
                                    <p className="text-muted">Stay updated with upcoming investor events and meetings</p>
                                    <Link to="#" className="btn btn-outline-primary btn-sm">View Calendar</Link>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="resource-card">
                                    <i className="fas fa-newspaper fa-3x mb-3 text-primary"></i>
                                    <h4>News & Updates</h4>
                                    <p className="text-muted">Latest news and press releases about our investments</p>
                                    <Link to="#" className="btn btn-outline-primary btn-sm">Read News</Link>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="resource-card">
                                    <i className="fas fa-question-circle fa-3x mb-3 text-primary"></i>
                                    <h4>FAQ</h4>
                                    <p className="text-muted">Find answers to common investor questions</p>
                                    <Link to="#" className="btn btn-outline-primary btn-sm">View FAQ</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Market Insights Section */}
                <section className="market-insights py-5 bg-white">
                    <div className="container">
                        <h2 className="text-center mb-5">Market Insights & Analysis</h2>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="insight-card shadow-sm p-4 h-100">
                                    <h4 className="text-primary mb-3">Market Trends</h4>
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="fas fa-chart-bar fa-2x text-primary me-3"></i>
                                        <div>
                                            <h5>Real Estate Market Analysis</h5>
                                            <p className="mb-0">Quarterly updates on market trends, opportunities, and forecasts.</p>
                                        </div>
                                    </div>
                                    <ul className="list-unstyled">
                                        <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i>Property value trends</li>
                                        <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i>Regional market analysis</li>
                                        <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i>Investment opportunity zones</li>
                                    </ul>
                                    <Link to="#" className="btn btn-outline-primary mt-3">View Market Reports</Link>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="insight-card shadow-sm p-4 h-100">
                                    <h4 className="text-primary mb-3">Investment Strategy</h4>
                                    <div className="d-flex align-items-center mb-3">
                                        <i className="fas fa-lightbulb fa-2x text-primary me-3"></i>
                                        <div>
                                            <h5>Strategic Investment Planning</h5>
                                            <p className="mb-0">Expert insights on portfolio diversification and growth strategies.</p>
                                        </div>
                                    </div>
                                    <ul className="list-unstyled">
                                        <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i>Portfolio optimization</li>
                                        <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i>Risk management strategies</li>
                                        <li className="mb-2"><i className="fas fa-check-circle text-success me-2"></i>Growth opportunities</li>
                                    </ul>
                                    <Link to="#" className="btn btn-outline-primary mt-3">Download Strategy Guide</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Success Stories Section */}
                <section className="success-stories py-5 bg-light">
                    <div className="container">
                        <h2 className="text-center mb-5">Success Stories</h2>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="story-card shadow-sm bg-white p-4 h-100">
                                    <div className="story-header mb-3">
                                        <i className="fas fa-building fa-2x text-primary mb-3"></i>
                                        <h4>Downtown Revival Project</h4>
                                        <p className="text-muted">Commercial Development</p>
                                    </div>
                                    <div className="story-details">
                                        <p>Transformed a vacant downtown property into a thriving mixed-use development.</p>
                                        <ul className="list-unstyled">
                                            <li className="mb-2"><strong>ROI:</strong> 22%</li>
                                            <li className="mb-2"><strong>Timeline:</strong> 18 months</li>
                                            <li className="mb-2"><strong>Investment:</strong> $12M</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="story-card shadow-sm bg-white p-4 h-100">
                                    <div className="story-header mb-3">
                                        <i className="fas fa-home fa-2x text-primary mb-3"></i>
                                        <h4>Residential Portfolio</h4>
                                        <p className="text-muted">Multi-Family Housing</p>
                                    </div>
                                    <div className="story-details">
                                        <p>Acquisition and optimization of 300-unit residential complex.</p>
                                        <ul className="list-unstyled">
                                            <li className="mb-2"><strong>ROI:</strong> 18%</li>
                                            <li className="mb-2"><strong>Timeline:</strong> 24 months</li>
                                            <li className="mb-2"><strong>Investment:</strong> $45M</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="story-card shadow-sm bg-white p-4 h-100">
                                    <div className="story-header mb-3">
                                        <i className="fas fa-warehouse fa-2x text-primary mb-3"></i>
                                        <h4>Industrial Conversion</h4>
                                        <p className="text-muted">Industrial Development</p>
                                    </div>
                                    <div className="story-details">
                                        <p>Conversion of industrial space into modern logistics center.</p>
                                        <ul className="list-unstyled">
                                            <li className="mb-2"><strong>ROI:</strong> 25%</li>
                                            <li className="mb-2"><strong>Timeline:</strong> 12 months</li>
                                            <li className="mb-2"><strong>Investment:</strong> $28M</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <Link to="#" className="btn btn-primary">View All Case Studies</Link>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className=" py-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8 text-center">
                                <h2 className="mb-4">Ready to Invest?</h2>
                                <p className="lead mb-5">Connect with our investment team to explore opportunities</p>
                                <div className="contact-buttons">
                                    <button className="btn btn-primary btn-lg me-3">Schedule a Call</button>
                                    <button className="btn btn-outline-primary btn-lg">Download Brochure</button>
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

export default InvestorsFooter;
