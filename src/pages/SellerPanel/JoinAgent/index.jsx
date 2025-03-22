import React from "react";
import { Helmet } from "react-helmet";
import SellerAgentCard from "../../../components/SellerAgentCard";
import SellerSideDetailPortion from "../../../components/SellerSideDetailPortion";
import SellerHeader from "../../../components/SellerHeader";
import SellerDetailPortion from "../../../components/SellerDetailPortion";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";

const JoinAgent = () => {
  return (
    <>
    <Helmet>
        <title>Join Us as a Real Estate Agent | Transform Real Estate</title>
        <meta
          name="description"
          content="Join our team of real estate agents to reshape the real estate experience. Empower clients, collaborate with a dynamic team, and grow your career."
        />
        <meta
          name="keywords"
          content="real estate agent, join real estate team, career in real estate, empower agents, real estate jobs"
        />
        <meta name="author" content="Your Company Name" />
      </Helmet>
      <Header />
      <SellerHeader />
      <div className="parent-join-agent">
        <div className="full-screen-overlay-hero">
          <h1 className="custom-title-display-heading">Real Estate Agent</h1>
          <form className="unique-search-bar-wrapper input-group">
            <input
              type="text"
              className="form-control unique-input-textbox"
              placeholder="Search job title or location"
            />
            <button className="btn custom-btn-search-action" type="submit">
              Search <i className="fas fa-search" />
            </button>
          </form>
        </div>
        {/* second container */}
        <section className="container-fluid w-100">
          <div className="bg-light p-4">
            <h1 className="display-20 fw-bold text-dark text-center mb-4">
              Transform the Real Estate Experience with Us
            </h1>
            <p className="text-muted mb-4 text-center">
              At our company, we are dedicated to enhancing the real estate
              journey for everyone involved. Our innovative approach focuses on
              exceptional service for clients and empowering agents. Join us in
              reshaping the future of real estate.
            </p>
            <SellerAgentCard />
          </div>
        </section>
        <section className="container mt-5">
          <div className="row">
            <SellerSideDetailPortion />
            {/* second column */}
            <SellerDetailPortion />
            {/* Include Bootstrap Icons if not already loaded */}
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css"
            />
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
};
export default JoinAgent;
