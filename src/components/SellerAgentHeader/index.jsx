import React, { useEffect, useState } from "react";
import "./SellerAgentHeader.css";
import img1 from "../../assets/images/PNG Logo Files/Transparent Logo.png";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const SellerAgentHeader = () => {
  // State to store the user name
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Fetch user name from localStorage when the component mounts
  useEffect(() => {
    const storedUserName = localStorage.getItem("user_email");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name"); // Ensure this is also cleared
    localStorage.removeItem("token"); // If you use token
    setUserName(null);
    navigate("/login");
  };

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Seller Agent Portal for managing job applications, account settings, and job alerts."
        />
        <meta
          name="keywords"
          content="real estate, seller agent, job search, job alerts, account settings, candidate home"
        />
        <meta
          property="og:title"
          content="Seller Agent Portal - Job Search, Account Settings, Alerts"
        />
        <meta
          property="og:description"
          content="Manage your job applications, account settings, and alerts in the Seller Agent Portal."
        />
        <meta
          property="og:image"
          content="https://example.com/assets/images/PNG Logo Files/Transparent Logo.png" // Replace with the actual image URL you want to use
        />
        <meta property="og:image:alt" content="Seller Agent Logo" />
        <meta
          name="twitter:title"
          content="Seller Agent Portal - Job Search, Account Settings, Alerts"
        />
        <meta
          name="twitter:description"
          content="Manage your job applications, account settings, and alerts in the Seller Agent Portal."
        />
        <meta
          name="twitter:image"
          content="https://example.com/assets/images/PNG Logo Files/Transparent Logo.png" // Replace with the actual image URL you want to use
        />
        <title>
          Seller Agent Portal - Job Search, Account Settings, Alerts
        </title>
      </Helmet>

      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          {/* Left side: Brand logo */}
          <a className="navbar-brand" href="/">
            <img width={50} src={img1} alt="Logo" />
          </a>
          {/* Toggler for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-light" />
          </button>
          {/* Right side: User email and navigation links */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="d-flex flex-column align-items-end w-100">
              {/* Dropdown for user name */}
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle user-email d-flex justify-center"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-regular fa-user" /> {userName || "Guest"}
                </button>
                <ul
                  className="dropdown-menu W-100"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <a
                      className="dropdown-item"
                      href="/AccountSettingCandidate"
                    >
                      Account Setting
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent the default anchor link behavior
                        handleLogout();
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
              <ul className="navbar-nav d-flex flex-row justify-content-end">
                <li className="nav-item">
                  <a className="nav-link" href="/AllJob">
                    Search for Jobs
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/CandidateHome">
                    Candidate Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/JobAlert">
                    Job Alerts
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SellerAgentHeader;
