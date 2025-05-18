import React from "react";
import "../../../assets/css/investors.css";
import ImagewithText from "../../../components/ImagewithText";
import aboutImage1 from "../../../assets/images/Developer.jpg";
import ContactSection from "../../../components/ContactSection";
import FinancialResults from "../../../components/FinancialResults";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import img1 from "../../../assets/images/blog 01.jpg";

import { Helmet } from "react-helmet";

const Investors = () => {
  return (
    <>
      <Helmet>
        <title>Investor Relations | Redefining Real Estate with UrbanCraft REAL ESTATE</title>
        <meta
          name="description"
          content="Explore UrbanCraft REAL ESTATE's investor relations page. Learn about our innovations in real estate, financial highlights, and growth in the U.S. and Canada."
        />
        <meta
          name="keywords"
          content="Znet, Investor Relations, Real Estate, Financial Results, Market Trends, Real Estate Brokerage, Innovations in Real Estate"
        />
        <meta name="author" content="UrbanCraft REAL ESTATE Corporation" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Investor Relations | Redefining Real Estate with UrbanCraft REAL ESTATE"
        />
        <meta
          property="og:description"
          content="UrbanCraft REAL ESTATE helps people buy and sell homes across the U.S. and Canada with technology-driven innovations. Learn more about our investor relations."
        />
        <meta property="og:image" content={aboutImage1} />
        <meta property="og:url" content="https://znet.com/investors" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      <main>
        <div className="investor-page">
          <div className="investor-main d-flex justify-content-center align-items-center">
            <div className="container">
              <p>Investor relations</p>
              <h1 className="">
                Redefining real estate in the consumer’s favor
              </h1>
              <p className="w-50"></p>
            </div>
          </div>
          <section id="about-realtors" className="py-5">
            <div className="container">
              <ImagewithText
                title="Who Are Investors?"
                content=" Real estate investors make money by buying, managing, and
                selling properties. There are different types of investments,
                including rental properties, where investors earn income by
                renting homes or apartments; fix-and-flip, where they buy,
                renovate, and sell for a profit; commercial real estate, which
                includes office buildings, retail spaces, and warehouses rented
                to businesses; real estate investment trusts (REITs) that let
                people invest in property portfolios without owning physical
                buildings; and creative financing strategies like Subject-To
                (Sub2) deals, where investors take over a property's mortgage
                without getting a new loan. Each approach has its risks and
                rewards, depending on market conditions and investment goals."
                reverse={true}
                imgSrc={img1}
              />
            </div>
          </section>
          <div className="second-section d-flex justify-content-between container my-5">
            <h1 className="h3 font-weight-bold mb-4">
              Redefining real estate in the consumer's favor
            </h1>
            <button className="btn-investor text-light">Get Started</button>
          </div>

          {/* Latest News Section */}
          <section className="mt-4">
            <div className="container">
              <h2 className="h4 font-weight-bold mb-4">Latest news</h2>
              <div className="bg-second-section p-3">
                <p>Investor relations</p>
                <h1 className="w-50 fs-1">
                  Redefining real estate in the consumer’s favor
                </h1>
                <p className="w-50">
                  UrbanCraft REAL ESTATE helps people buy and sell homes in over 100 markets
                  across the U.S. and Canada. As a residential real estate
                  brokerage, we combine our agents and technology to create a
                  faster, better and more affordable service.{" "}
                </p>
                <div className="btn">
                  <button className=" btn-investor">Learn more</button>
                </div>
              </div>
              <div className="row g-4 ">
                <div className="card col-lg-4 h-100 p-4">
                  <h2 className="h5 mb-3">September 12, 2024 • 8:00 am EDT</h2>
                  <h6>
                    UrbanCraft REAL ESTATE Reports Falling Mortgage Rates Mean Housing Payments
                    Are Now More Affordable Than a Year Ago Despite Higher
                    Prices
                  </h6>
                  <a href="#">Learn more</a>
                </div>

                <div className="card col-lg-4 h-100 p-4">
                  <h2 className="h5 mb-3">September 10, 2024 • 8:01 am EDT</h2>
                  <h6>
                    UrbanCraft REAL ESTATE Reports Asking Rents Rose the Most in Over a Year in
                    August, But Remain Below Record Highs Hit Two Years Earlier
                  </h6>
                  <a href="#">Learn more</a>
                </div>
                <div className="card col-lg-4 h-100 p-4">
                  <h2 className="h5 mb-3">September 9, 2024 • 8:30 am EDT</h2>
                  <h6>
                    New NAR Rules Are a Bargaining Chip, Putting Pressure on
                    Commissions in Competitive Markets, Are Willing to Cover
                    Some Fees
                  </h6>
                  <a href="#">Learn more</a>
                </div>
              </div>
            </div>
          </section>
          {/* Corporation at a Glance Section */}
          <FinancialResults />
          {/* corporation at a glance */}
          <div className="container">
            <div className="row">
              <div className=" p-4">
                <h2 className="text-center mb-4 h3 fw-bold">
                  UrbanCraft REAL ESTATE corporation at a glance
                </h2>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                  <div className="col">
                    <div className="bg-white p-4 rounded shadow-sm">
                      <h3 className="h2 fw-semibold">559,000</h3>
                      <hr className="border-2 border-success my-2" />
                      <p className="text-muted">
                        Customers bought or sold homes with us through 2023
                      </p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="bg-white p-4 rounded shadow-sm">
                      <h3 className="h2 fw-semibold">$281B</h3>
                      <hr className="border-2 border-success my-2" />
                      <p className="text-muted">
                        Worth of homes bought or sold by our customers through
                        2023
                      </p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="bg-white p-4 rounded shadow-sm">
                      <h3 className="h2 fw-semibold">50 million</h3>
                      <hr className="border-2 border-success my-2" />
                      <p className="text-muted">
                        Average monthly visitors to our website and mobile app
                        in 2023
                      </p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="bg-white p-4 rounded shadow-sm">
                      <h3 className="h2 fw-semibold">4,693</h3>
                      <hr className="border-2 border-success my-2" />
                      <p className="text-muted">Employees</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="bg-white p-4 rounded shadow-sm">
                      <h3 className="h2 fw-semibold">1,776</h3>
                      <hr className="border-2 border-success my-2" />
                      <p className="text-muted">
                        Average number of lead agents for 2023
                      </p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="bg-white p-4 rounded shadow-sm">
                      <h3 className="h2 fw-semibold">100 +</h3>
                      <hr className="border-2 border-success my-2" />
                      <p className="text-muted">Markets</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Innovative Solutions Section */}
          <section className="mt-4 container">
            <div className="row p-4 bg-light rounded-lg shadow-lg">
              <div className="row align-items-center">
                <ImagewithText
                  content="UrbanCraft REAL ESTATE has been at the forefront of real estate, offering unparalleled services to clients. From residential to commercial, we have the expertise and commitment to help you find your perfect space."
                  imgSrc={aboutImage1}
                  altText="About UrbanCraft REAL ESTATE"
                />
              </div>
              <div className="d-flex align-items-center justify-content-between p-4 bg-light border-bottom">
                <div className="d-flex flex-row gap-5">
                  <h2 className="h4 fw-bold text-dark">Stay up to date</h2>
                  <p className="text-muted">
                    Get the latest news and reports delivered right to your
                    inbox.
                  </p>
                </div>
                <button className="btn   btn-investor text-light px-4 py-2 rounded">
                  Sign up
                </button>
              </div>
            </div>
          </section>
          {/* Contact Section */}
          <ContactSection />
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Investors;
