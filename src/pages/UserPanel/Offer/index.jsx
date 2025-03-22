import React from "react";
import { Helmet } from "react-helmet";
import img1 from "../../../assets/images/offer.png";
import UserHeader from "../../../components/UserHeader";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";

const Offer = () => {
  return (
    <>
    <Helmet>
        <title>My Offers | Znet</title>
        <meta
          name="description"
          content="View and manage your offers with Znet. Start a new offer anytime and take advantage of our seamless real estate process."
        />
        <meta
          name="keywords"
          content="real estate offers, property offers, start an offer, Znet offers"
        />
        <meta name="author" content="Znet" />
        <meta property="og:title" content="My Offers | Znet" />
        <meta
          property="og:description"
          content="You don't have any offers yet. Get started on an offer with Znet any time, day or night."
        />
        <meta
          property="og:image"
          content="https://api.biznetusa.com/uploads/offer-placeholder.jpg"
        />
        <meta property="og:url" content="https://biznetusa.com/my-offers" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="My Offers | Znet" />
        <meta
          property="twitter:description"
          content="View and manage your offers with Znet. Start a new offer anytime and take advantage of our seamless real estate process."
        />
        <meta
          property="twitter:image"
          content="https://api.biznetusa.com/uploads/offer-placeholder.jpg"
        />
      </Helmet>
      <Header />
      <UserHeader />
      <div id="main-content">
        <div className="parent-user-offer">
          <div className="container container-user-offer">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 col-sm-10 col-12">
                <div className="offer-placeholder pt-5">
                  {/* Offer Icon */}
                  <img src={img1} alt="Offer Icon" />
                  {/* Heading */}
                  <h5>You don't have any offers, currently.</h5>
                  {/* Subtext */}
                  <p>
                    Get started on an offer day or night, seven days a week.
                  </p>
                  {/* Call to Action */}
                  <Link to="/start-an-offer">Start an offer</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};
export default Offer;
