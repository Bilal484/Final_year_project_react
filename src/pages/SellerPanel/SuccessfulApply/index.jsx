import React from "react";
import img1 from "../../../assets/images/ok-1976099_1280.webp";
// import SellerHeader from "../../../components/SellerAgentHeader";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import { Helmet } from "react-helmet"; // Import Helmet for meta tags

const SuccessfulApply = () => {
  return (
    <>
    <Helmet>
        <title>Application Successful</title>
        <meta
          name="description"
          content="You have successfully applied for a job. View your application status or return to the job search."
        />
        <meta
          name="keywords"
          content="successful application, job application, real estate jobs, candidate login, back to job search"
        />
        <meta name="author" content="UrbanCraft REAL ESTATE" />
      </Helmet>
      <Header />
      {/* <SellerAgentHeader /> */}
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        {/* Icon */}
        <div className="mb-4">
          <img src={img1} width={100} alt="" />
        </div>
        {/* Heading */}
        <h1 className="fs-2 fw-bold mb-2 text-center">
          You have successfully applied for:
        </h1>
        {/* Job Information Card */}
        <div className="bg-white p-4 rounded shadow-sm text-center mb-4">
          <p className="fs-5 fw-semibold mb-1">Real Estate Agent - Maryland</p>
          <p className="text-muted">This job is available in 13 locations</p>
        </div>
        {/* Buttons */}
        <div className="d-flex gap-3">
          {/* <button> */}
          <a href="/JobAlert">
            <button className="btn btn">Candidate Login</button>
          </a>
          <a href="/AllJob">
            <button className="btn btn">Back To Job Search</button>
          </a>
        </div>
      </div>
      <Footer/>
    </>
  );
};
export default SuccessfulApply;
