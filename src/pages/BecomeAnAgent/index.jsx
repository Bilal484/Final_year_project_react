import React from 'react';
import { Helmet } from 'react-helmet';
import './BecomeAnAgent.css';
import Header from '../../components/header';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import SuccessStories from '../../components/SuccessStories';


const BecomeAnAgent = () => {
    return (
        <>
        <Helmet>
                <title>Become an Agent - UrbanCraft REAL ESTATE</title>
                <meta name="description" content="Join URBANCRAFT REAL ESTATE's network of top real estate agents and gain access to the best tools, resources, and support to grow your career." />
                <meta name="keywords" content="ZNET, real estate career, become an agent, real estate agent, join real estate network" />
                <meta property="og:title" content="Become an Agent - UrbanCraft REAL ESTATE" />
                <meta property="og:description" content="Explore the benefits of becoming a URBANCRAFT REAL ESTATE agent, including professional tools, continuous learning, and a competitive commission structure." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="/path/to/image.jpg" />  {/* Replace with an actual image URL */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Become an Agent - UrbanCraft REAL ESTATE" />
                <meta name="twitter:description" content="Join our network to leverage advanced tools and comprehensive support to boost your real estate career." />
                <meta name="twitter:image" content="/path/to/image.jpg" />  {/* Replace with an actual image URL */}
            </Helmet>
   <Header/>
    <div className="become-agent-container">
      {/* Hero Section */}
      <section className="hero-section text-center py-3 py-md-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3 mb-md-4 fs-2 fs-md-1">Join Our Network of Top Real Estate Agents</h1>
          <p className="lead mb-3 mb-md-4 fs-6 fs-md-5">Transform your real estate career with URBANCRAFT REAL ESTATE's cutting-edge platform and support</p>
         <Link to='/AllJob'>
          <button className="btn btn-primary btn-lg px-4 py-2">Apply Now</button>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section py-4 py-md-5">
        <div className="container">
          <h2 className="text-center mb-4 mb-md-5 fs-3">Why Choose URBANCRAFT REAL ESTATE?</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col-md-4">
              <div className="benefit-card p-4 text-center">
                <i className="fas fa-chart-line mb-3 fa-2x"></i>
                <h3 className="h5">Grow Your Business</h3>
                <p>Access to qualified leads and advanced marketing tools to expand your client base</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="benefit-card p-4 text-center">
                <i className="fas fa-tools mb-3 fa-2x"></i>
                <h3 className="h5">Professional Tools</h3>
                <p>State-of-the-art CRM, listing management, and client communication tools</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="benefit-card p-4 text-center">
                <i className="fas fa-graduation-cap mb-3 fa-2x"></i>
                <h3 className="h5">Continuous Learning</h3>
                <p>Access to training resources, market insights, and professional development</p>
              </div>
            </div>
          </div>
        </div>
      </section>

     <SuccessStories/>

      {/* New Commission Structure Section */}
      <section className="commission-section py-4 py-md-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4 mb-md-5 fs-3">Competitive Commission Structure</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="commission-table table-responsive">
                <table className="table table-bordered">
                  <thead className="table-primary">
                    <tr>
                      <th>Sales Volume</th>
                      <th>Commission Split</th>
                      <th>Additional Benefits</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>$0 - $5M</td>
                      <td>70/30</td>
                      <td>Basic Marketing Package</td>
                    </tr>
                    <tr>
                      <td>$5M - $10M</td>
                      <td>80/20</td>
                      <td>Premium Marketing + Lead Generation</td>
                    </tr>
                    <tr>
                      <td>$10M+</td>
                      <td>90/10</td>
                      <td>Elite Package + Personal Assistant</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New FAQ Section */}
      <section className="faq-section py-4 py-md-5">
        <div className="container">
          <h2 className="text-center mb-4 mb-md-5 fs-3">Frequently Asked Questions</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      What are the requirements to join URBANCRAFT REAL ESTATE?
                    </button>
                  </h3>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      You need a valid real estate license, good standing with your local board, and a commitment to excellence in client service.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      How long does the application process take?
                    </button>
                  </h3>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Typically, the entire process takes 1-2 weeks from application to approval, depending on background check and reference verification.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section py-4 py-md-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4 mb-md-5 fs-3">How to Join</h2>
          <div className="row row-cols-2 row-cols-md-4 g-3 g-md-4">
            <div className="col-md-3">
              <div className="step-card text-center">
                <div className="step-number">1</div>
                <a href='/AllJob'>
                <h3 className="h5">Apply Online</h3>
                </a>
                <p>Fill out our simple application form</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="step-card text-center">
                <div className="step-number">2</div>
                <h3 className="h5">Interview</h3>
                <p>Meet with our team virtually or in-person</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="step-card text-center">
                <div className="step-number">3</div>
                <h3 className="h5">Get Approved</h3>
                <p>Quick review of your credentials</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="step-card text-center">
                <div className="step-number">4</div>
                <h3 className="h5">Start Growing</h3>
                <p>Begin your journey with URBANCRAFT REAL ESTATE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="application-section py-4 py-md-5">
        <div className="container">
          <h2 className="text-center mb-4 mb-md-5 fs-3">Ready to Get Started?</h2>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <form className="application-form p-3 p-md-4 border rounded">
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="fullName" required />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" required />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input type="tel" className="form-control" id="phone" required />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="license" className="form-label">Real Estate License Number</label>
                    <input type="text" className="form-control" id="license" required />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="experience" className="form-label">Years of Experience</label>
                  <select className="form-select" id="experience" required>
                    <option value="">Select experience</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Why do you want to join URBANCRAFT REAL ESTATE?</label>
                  <textarea className="form-control" id="message" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2">Submit Application</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>

   <Footer/>
   </>
    );
};

export default BecomeAnAgent;
