import React, { useState, useEffect } from "react";
import "./CandidateHome.css";
import SellerAgentHeader from "../../../components/SellerAgentHeader";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet"; // Import Helmet for meta tags

const CandidateHome = () => {
  const [user, setUser] = useState({
    name: "John Doe", // Placeholder; can be updated with real data
    email: "",
    id: "",
  });

  // Retrieve user data from localStorage when the component mounts
  useEffect(() => {
    const userEmail = localStorage.getItem("user_email");
    const userId = localStorage.getItem("user_id");

    // Update the user state with data from localStorage if available
    setUser({
      name: "John Doe", // Replace with an actual name or logic to fetch it
      email: userEmail || "No email found",
      id: userId || "No ID found",
    });
  }, []);

  // Function to get the first letter of a given string (email or name)
  const getInitial = (text) => {
    return text ? text.charAt(0).toUpperCase() : "";
  };

  return (
    <>
     <Helmet>
        <title>Candidate Home - Manage Your Applications</title>
        <meta
          name="description"
          content="Welcome to Candidate Home. Manage your applications, update account settings, and explore job opportunities tailored for you."
        />
        <meta name="keywords" content="Candidate Home, job applications, account settings, job search" />
        <meta name="author" content="UrbanCraft REAL ESTATE Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Candidate Home - Manage Your Applications" />
        <meta
          property="og:description"
          content="Manage your job applications and account settings at Candidate Home. Explore personalized job opportunities and take the next step in your career."
        />
        <meta property="og:url" content="https://yourwebsite.com/candidate-home" />
        <meta property="og:image" content="https://yourwebsite.com/path-to-candidate-home-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Header />
      <SellerAgentHeader />
      <div className="candidate-home">
        <section>
          <div className="container">
            <div className="row">
              <h1 className="text-start py-3">Welcome to Candidate Home</h1>
              <div className="col-12 col-md-12 col-lg-12 bg-white rounded-2 py-5 px-4">
                <h4>My Applications</h4>
                <div className="text-center">
                  {/* Display the first letter of the user's email instead of the name */}
                  <div
                    className="initial-circle text-center pt-5 d-flex justify-content-center align-items-center"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      backgroundColor: "#f5f5f5",
                      fontSize: "48px",
                      color: "#333",
                    }}
                  >
                    {getInitial(user.email)}
                  </div>
                  <p>You have no applications.</p>
                  <a
                    className="btn px-4 fw-bold py-2 bg-danger text-white rounded-pill"
                    href="#"
                  >
                    Search for Jobs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container py-5">
            <div className="row">
              <div className="col-12 col-md-12 col-lg- bg-white rounded-2 px-4 py-5">
                <h4>My Account</h4>
                {/* Display the user's email and ID */}
                <p>
                  User Email: <strong>{user.email}</strong>
                </p>
                <p>
                  User ID: <strong>{user.id}</strong>
                </p>
                <p>
                  To update your personal information, click Update Contact
                  Information. To change the email address for your account,
                  click Edit Account Settings.
                </p>
                <Link
                  className="btn px-4 fw-bold py-2 bg-danger text-white rounded-pill"
                  to="/AccountSettingCandidate"
                >
                  Edit Account Settings
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Remaining sections unchanged */}
        <Footer />
      </div>
    </>
  );
};

export default CandidateHome;
