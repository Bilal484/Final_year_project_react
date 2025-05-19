import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import "./Guides.css";
import GuideFAQs from "../../../components/GuideFAQs";
import img01 from "../../../assets/images/guide 01.jpg";
import img02 from "../../../assets/images/guide 02.jpg";
import img03 from "../../../assets/images/guide 03.jpg";
import img04 from "../../../assets/images/guide 04.jpg";
import img05 from "../../../assets/images/guide 05.jpg";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

// FAQs Component
const Guides = () => {
  return (
    <>
    <Helmet>
        <title>Guides for Selling Your Property | Biznet</title>
        <meta 
          name="description" 
          content="Explore detailed guides to prepare your home for sale, price your property correctly, market it effectively, and understand legal considerations." 
        />
        <meta 
          name="keywords" 
          content="selling guides, property selling tips, real estate, prepare home for sale, price property, market property, legal documentation, real estate agent" 
        />
        <meta name="author" content="Biurbancraft real estate Team" />
        <meta property="og:title" content="Guides for Selling Your Property | Biznet" />
        <meta 
          property="og:description" 
          content="Discover essential tips and strategies for selling your property. Learn how to prepare your home, price it correctly, market it, and more." 
        />
        <meta property="og:image" content={img01} />
        <meta property="og:url" content="https://www.biznetusa.com/guides" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Guides for Selling Your Property | Biznet" />
        <meta 
          name="twitter:description" 
          content="Get expert advice on selling your property efficiently and effectively with our comprehensive guides." 
        />
        <meta name="twitter:image" content={img01} />
      </Helmet>
    <Header/>
      <div className="guide-page-main">
        <GuideFAQs />
        <section className="sell-guides-highlight container mt-5">
          <h1 className="section-title text-center my-4">
            Selling Guides Highlights
          </h1>
          {/* Section 1 */}
          <div className="row my-4">
            <div className="col-md-6">
              <img
                src={img01}
                className="img-fluid"
                alt="Preparing Your Home for Sale"
              />
            </div>
            <div className="col-md-6 my-auto">
              <h3>Preparing Your Home for Sale</h3>
              <p>
                Clean, declutter, and stage your home to make it more appealing
                to potential buyers.
              </p>
            </div>
          </div>
          {/* Section 2 */}
          <div className="row my-4">
            <div className="col-md-6 my-auto">
              <h3>Pricing Your Property Correctly</h3>
              <p>
                Research local market trends to set a competitive and fair price
                for your property.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src={img02}
                className="img-fluid"
                alt="Pricing Your Property Correctly"
              />
            </div>
          </div>
          {/* Section 3 */}
          <div className="row my-4">
            <div className="col-md-6">
              <img
                src={img03}
                className="img-fluid"
                alt="Marketing Your Property Effectively"
              />
            </div>
            <div className="col-md-6 my-auto">
              <h3>Marketing Your Property Effectively</h3>
              <p>
                Utilize online listings and social media to reach a broad
                audience of potential buyers.
              </p>
            </div>
          </div>
          {/* Section 4 */}
          <div className="row my-4">
            <div className="col-md-6 my-auto">
              <h3>Legal Considerations &amp; Documentation</h3>
              <p>
                Be aware of legal requirements and prepare necessary documents
                for a smooth transaction.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src={img04}
                className="img-fluid"
                alt="Legal Considerations & Documentation"
              />
            </div>
          </div>
          {/* Section 5 */}
          <div className="row my-4">
            <div className="col-md-6">
              <img
                src={img05}
                className="img-fluid"
                alt="Working with a Real Estate Agent"
              />
            </div>
            <div className="col-md-6 my-auto">
              <h3>Working with a Real Estate Agent</h3>
              <p>
                A qualified agent can help you navigate the selling process more
                efficiently.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
};

export default Guides;
