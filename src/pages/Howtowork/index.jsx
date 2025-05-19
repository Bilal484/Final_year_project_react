import React from "react";
import { Helmet } from 'react-helmet'; // Import Helmet
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./HowtoWork.css";
import ProcessSection from "../../components/ProcessSection";

const Howtowork = () => {


    return (
        <>
         <Helmet>
                <title>How to Work with Us - Your Guide to Real Estate Success</title>
                <meta name="description" content="Learn how to work with us for the best real estate experience. From buying to selling, we make your journey seamless and efficient." />
                <meta name="keywords" content="real estate, buying homes, selling homes, real estate process" />
            </Helmet>
            <Header />
            <div className="parent-how-to-work">
                {/* Hero Section */}
                <div className="hero-parent">
                    <section className="hero-section d-flex justify-content-center align-items-center">
                        <div className="container text-center">
                            <h1 className="display-3 fw-bold text-light mb-3">
                                Find Your Dream Home
                            </h1>
                            <p className="lead text-light mb-4">
                                We make the process of buying and selling real estate seamless and
                                stress-free.
                            </p>
                            <a href="#properties" className="btn btn-primary">
                                Explore Properties
                            </a>
                            <div className="hero-search mt-4 p-3 rounded bg-light">
                                <form className="d-flex justify-content-center align-items-center">
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        placeholder="Enter location, property type, etc."
                                    />
                                    <button type="submit" className="btn btn-dark">
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
                {/* Our Process Section */}
                <ProcessSection />

                {/* <section className="our-process-section py-5 bg-light"> */}
                {/*     <div className="container"> */}
                {/*         <h2 className="display-5 fw-bold text-center mb-5">Our Process</h2> */}
                {/*         <div className="row text-center g-4"> */}
                {/*             <div className="col-md-3"> */}
                {/*                 <div className="process-step p-4 rounded shadow"> */}
                {/*                     <div className="process-icon mb-3"> */}
                {/*                         <span className="step-number  text-dark rounded-circle">1</span> */}
                {/*                     </div> */}
                {/*                     <h5 className="fw-bold mb-2">Consultation</h5> */}
                {/*                     <p className="text-muted"> */}
                {/*                         Discuss your goals and needs with our experts to understand the */}
                {/*                         best investment options available. */}
                {/*                     </p> */}
                {/*                 </div> */}
                {/*             </div> */}
                {/*             <div className="col-md-3"> */}
                {/*                 <div className="process-step p-4 rounded shadow"> */}
                {/*                     <div className="process-icon mb-3"> */}
                {/*                         <span className="step-number  text-dark rounded-circle">2</span> */}
                {/*                     </div> */}
                {/*                     <h5 className="fw-bold mb-2">Property Search</h5> */}
                {/*                     <p className="text-muted"> */}
                {/*                         Explore a range of properties that meet your requirements and */}
                {/*                         budget, ensuring the best match. */}
                {/*                     </p> */}
                {/*                 </div> */}
                {/*             </div> */}
                {/*             <div className="col-md-3"> */}
                {/*                 <div className="process-step p-4 rounded shadow"> */}
                {/*                     <div className="process-icon mb-3"> */}
                {/*                         <span className="step-number  text-dark rounded-circle">3</span> */}
                {/*                     </div> */}
                {/*                     <h5 className="fw-bold mb-2">Legal &amp; Financial</h5> */}
                {/*                     <p className="text-muted"> */}
                {/*                         We assist with all legal and financial processes to make your */}
                {/*                         investment smooth and secure. */}
                {/*                     </p> */}
                {/*                 </div> */}
                {/*             </div> */}
                {/*             <div className="col-md-3"> */}
                {/*                 <div className="process-step p-4 rounded shadow"> */}
                {/*                     <div className="process-icon mb-3"> */}
                {/*                         <span className="step-number  text-dark rounded-circle">4</span> */}
                {/*                     </div> */}
                {/*                     <h5 className="fw-bold mb-2">Final Purchase</h5> */}
                {/*                     <p className="text-muted"> */}
                {/*                         Complete the purchase with confidence, knowing you have made a */}
                {/*                         smart investment decision. */}
                {/*                     </p> */}
                {/*                 </div> */}
                {/*             </div> */}
                {/*         </div> */}
                {/*     </div> */}
                {/* </section> */}

                {/* Property Investment Tips Section */}
                <section className="investment-tips-section py-5 text-center">
                    <div className="container">
                        <h2 className="display-5 fw-bold mb-4">Property Investment Tips</h2>
                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="tip-card h-100 p-4 rounded shadow">
                                    <i className="fa fa-search-dollar fa-3x  mb-3" />
                                    <h5 className="fw-bold mb-2">Research Market Trends</h5>
                                    <p className="text-muted">
                                        Analyze market conditions and trends to make informed investment
                                        decision.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="tip-card h-100 p-4 rounded shadow">
                                    <i className="fa fa-hand-holding-usd fa-3x mb-3" />
                                    <h5 className="fw-bold mb-2">Evaluate Property Value</h5>
                                    <p className="text-muted">
                                        Assess the property’s current and future value to ensure you get
                                        the best deal and long-term benefits.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="tip-card h-100 p-4 rounded shadow">
                                    <i className="fa fa-chart-line fa-3x  mb-3" />
                                    <h5 className="fw-bold mb-2">Plan Investment Strategy</h5>
                                    <p className="text-muted">
                                        Develop a solid investment strategy that aligns with your
                                        financial goals and risk tolerance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Meet Our Agents Section */}
                <div className="agent-parent">
                    <div className="container agents-section align-items-center">
                        <h2 className="display-5 fw-bold text-center mb-5">Meet Our Agents</h2>
                        <div className="divider mb-4" />
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <select id="agentFilter" className="form-select">
                                    <option value="all">All Agents</option>
                                    <option value="residential">Residential</option>
                                    <option value="commercial">Commercial</option>
                                    <option value="luxury">Luxury</option>
                                </select>
                            </div>
                        </div>
                        <div className="row" id="agentList">
                            <div className="col-md-4 agent-item" data-category="residential">
                                <div className="card agent-card text-center">
                                    <img
                                        src="/assets/images/team 1.jpg"
                                        alt="Agent 1"
                                        className="card-img-top agent-img"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-light">John Doe</h5>
                                        <p className="card-text text-light">
                                            Senior Real Estate Agent specializing in residential properties
                                            and first-time home buyers.
                                        </p>
                                        <div className="social-icons">
                                            <a href="#">
                                                <i className="bi bi-facebook" />
                                            </a>
                                            <a href="#">
                                                <i className="bi bi-twitter" />
                                            </a>
                                            <a href="#">
                                                <i className="bi bi-linkedin" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 agent-item" data-category="commercial">
                                <div className="card agent-card text-center">
                                    <img
                                        src="/assets/images/team 3.jpg"
                                        alt="Agent 2"
                                        className="card-img-top agent-img"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-light">Jane Smith</h5>
                                        <p className="card-text text-light">
                                            Expert in commercial real estate and investment properties.
                                            Known for her negotiation skills.
                                        </p>
                                        <div className="social-icons">
                                            <a href="#">
                                                <i className="bi bi-facebook" />
                                            </a>
                                            <a href="#">
                                                <i className="bi bi-twitter" />
                                            </a>
                                            <a href="#">
                                                <i className="bi bi-linkedin" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 agent-item" data-category="luxury">
                                <div className="card agent-card text-center">
                                    <img
                                        src="/assets/images/team 3.avif"
                                        alt="Agent 3"
                                        className="card-img-top agent-img"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-light">Emily Johnson</h5>
                                        <p className="card-text text-light">
                                            Specializes in luxury properties and vacation homes. Passionate
                                            about helping clients find their dream homes.
                                        </p>
                                        <div className="social-icons">
                                            <a href="#">
                                                <i className="bi bi-facebook" />
                                            </a>
                                            <a href="#">
                                                <i className="bi bi-twitter" />
                                            </a>
                                            <a href="#">
                                                <i className="bi bi-linkedin" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>
    )

}
export default Howtowork;
