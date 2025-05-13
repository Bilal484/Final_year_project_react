import React from "react";
import { Helmet } from "react-helmet";
import img01 from "../../../src/assets/images/blog 01.jpg";
import img02 from "../../../src/assets/images/blog 02.jpg";
import img03 from "../../../src/assets/images/blog 03.jpg";
import img04 from "../../../src/assets/images/blog 04.jpg";
import img05 from "../../../src/assets/images/blog 05.jpg";
import img06 from "../../../src/assets/images/blog 06.jpg";
import InvestorPanel from "../InvestorPanel";
import InvestorHeader from "../../components/InvestorHeader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const RealEstateOpportunities = () => {
  const investInOpportunity = (title) => {
    alert(`You have expressed interest in investing in ${title}`);
  };

  return (
    <>
     <Helmet>
        <title>Real Estate Investment Opportunities</title>
        <meta
          name="description"
          content="Explore lucrative real estate investment opportunities. Invest in properties with high ROI, including luxury apartments, commercial spaces, and housing developments."
        />
        <meta
          name="keywords"
          content="real estate investment, investment opportunities, ROI, properties for investment, housing development, commercial real estate"
        />
        <meta name="author" content="Real Estate Insights" />
      </Helmet>
      <Header />
      <InvestorHeader />
      <div className="container my-5">
        <h2 className=" mb-4">Real Estate Investment Opportunities</h2>

        <div className="row">
          {/* Opportunity 1: Luxury Apartment Complex */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <img
                src={img01}
                className="card-img-top"
                alt="Luxury Apartment Complex"
              />
              <div className="card-body">
                <h5 className="card-title">Luxury Apartment Complex</h5>
                <p className="card-text">
                  <strong>Location:</strong> Miami, Florida <br />
                  <strong>Seeking:</strong> $500,000 <br />
                  <strong>Projected ROI:</strong> 8-10% annually
                </p>
                <p className="card-text">
                  A luxury apartment project located in the high-demand Miami
                  rental market, offering upscale living with top-notch
                  amenities.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    investInOpportunity("Luxury Apartment Complex")
                  }
                >
                  Invest Now
                </button>
              </div>
            </div>
          </div>

          {/* Opportunity 2: Commercial Office Building */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <img
                src={img02}
                className="card-img-top"
                alt="Commercial Office Building"
              />
              <div className="card-body">
                <h5 className="card-title">Commercial Office Building</h5>
                <p className="card-text">
                  <strong>Location:</strong> Dallas, Texas <br />
                  <strong>Seeking:</strong> $1,200,000 <br />
                  <strong>Projected ROI:</strong> 6-7% annually
                </p>
                <p className="card-text">
                  Invest in a high-end office building in Dallas, with secure
                  tenants and long-term lease agreements, ensuring stable
                  returns.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    investInOpportunity("Commercial Office Building")
                  }
                >
                  Invest Now
                </button>
              </div>
            </div>
          </div>

          {/* Opportunity 3: Residential Housing Development */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <img
                src={img03}
                className="card-img-top"
                alt="Residential Housing Development"
              />
              <div className="card-body">
                <h5 className="card-title">Residential Housing Development</h5>
                <p className="card-text">
                  <strong>Location:</strong> Austin, Texas <br />
                  <strong>Seeking:</strong> $750,000 <br />
                  <strong>Projected ROI:</strong> 10-12% annually
                </p>
                <p className="card-text">
                  Large-scale housing development in Austin. Over 200
                  single-family homes, targeting the booming population of the
                  city.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    investInOpportunity("Residential Housing Development")
                  }
                >
                  Invest Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Opportunity 4: Vacation Rental Property */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <img
                src={img04}
                className="card-img-top"
                alt="Vacation Rental Property"
              />
              <div className="card-body">
                <h5 className="card-title">Vacation Rental Property</h5>
                <p className="card-text">
                  <strong>Location:</strong> Honolulu, Hawaii <br />
                  <strong>Seeking:</strong> $300,000 <br />
                  <strong>Projected ROI:</strong> 12-15% annually
                </p>
                <p className="card-text">
                  High-demand vacation rental in Honolulu. Prime location for
                  tourists, offering excellent returns from short-term rentals.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    investInOpportunity("Vacation Rental Property")
                  }
                >
                  Invest Now
                </button>
              </div>
            </div>
          </div>

          {/* Opportunity 5: Retail Shopping Center */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <img
                src={img05}
                className="card-img-top"
                alt="Retail Shopping Center"
              />
              <div className="card-body">
                <h5 className="card-title">Retail Shopping Center</h5>
                <p className="card-text">
                  <strong>Location:</strong> Los Angeles, California <br />
                  <strong>Seeking:</strong> $2,500,000 <br />
                  <strong>Projected ROI:</strong> 7-9% annually
                </p>
                <p className="card-text">
                  Acquire and redevelop a shopping center in a prime retail
                  area. Well-known brands have long-term leases in place.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => investInOpportunity("Retail Shopping Center")}
                >
                  Invest Now
                </button>
              </div>
            </div>
          </div>

          {/* Opportunity 6: Senior Living Facility */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <img
                src={img06}
                className="card-img-top"
                alt="Senior Living Facility"
              />
              <div className="card-body">
                <h5 className="card-title">Senior Living Facility</h5>
                <p className="card-text">
                  <strong>Location:</strong> Phoenix, Arizona <br />
                  <strong>Seeking:</strong> $600,000 <br />
                  <strong>Projected ROI:</strong> 9% annually
                </p>
                <p className="card-text">
                  A growing market for senior living facilities in Phoenix. This
                  facility offers healthcare services and long-term housing
                  solutions.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => investInOpportunity("Senior Living Facility")}
                >
                  Invest Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* View and Respond to Investment Opportunities Section */}
        <div className="container mt-5">
          <h2 className="text-center mb-4">Investment Opportunities</h2>
          <div className="row">
            {/* Opportunity 1 */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Opportunity 1</h5>
                  <p className="card-text">
                    Details about investment opportunity 1. This opportunity is
                    ideal for those looking for high growth in a short span of
                    time.
                  </p>
                  <a href="#" className="btn btn-primary btn-block">
                    View &amp; Respond
                  </a>
                </div>
                <div className="card-footer text-muted">
                  <small>Posted 2 days ago</small>
                </div>
              </div>
            </div>
            {/* Opportunity 2 */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Opportunity 2</h5>
                  <p className="card-text">
                    Details about investment opportunity 2. Perfect for
                    long-term investors seeking stability and steady returns.
                  </p>
                  <a href="#" className="btn btn-primary btn-block">
                    View &amp; Respond
                  </a>
                </div>
                <div className="card-footer text-muted">
                  <small>Posted 1 week ago</small>
                </div>
              </div>
            </div>
            {/* Opportunity 3 */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Opportunity 3</h5>
                  <p className="card-text">
                    Details about investment opportunity 3. This is a high-risk,
                    high-reward option for experienced investors.
                  </p>
                  <a href="#" className="btn btn-primary btn-block">
                    View &amp; Respond
                  </a>
                </div>
                <div className="card-footer text-muted">
                  <small>Posted 3 days ago</small>
                </div>
              </div>
            </div>
            {/* Opportunity 4 */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Opportunity 4</h5>
                  <p className="card-text">
                    Details about investment opportunity 4. Focused on real
                    estate for those interested in long-term property
                    investments.
                  </p>
                  <a href="#" className="btn btn-primary btn-block">
                    View &amp; Respond
                  </a>
                </div>
                <div className="card-footer text-muted">
                  <small>Posted 2 weeks ago</small>
                </div>
              </div>
            </div>
            {/* Opportunity 5 */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Opportunity 5</h5>
                  <p className="card-text">
                    Details about investment opportunity 5. This opportunity
                    offers an innovative tech start-up looking for seed funding.
                  </p>
                  <a href="#" className="btn btn-primary btn-block">
                    View &amp; Respond
                  </a>
                </div>
                <div className="card-footer text-muted">
                  <small>Posted 1 month ago</small>
                </div>
              </div>
            </div>
            {/* Opportunity 6 */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Opportunity 6</h5>
                  <p className="card-text">
                    Details about investment opportunity 6. This green energy
                    project is perfect for environmentally conscious investors.
                  </p>
                  <a href="#" className="btn btn-primary btn-block">
                    View &amp; Respond
                  </a>
                </div>
                <div className="card-footer text-muted">
                  <small>Posted 3 months ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer/>
    </>
  );
};

export default RealEstateOpportunities;
