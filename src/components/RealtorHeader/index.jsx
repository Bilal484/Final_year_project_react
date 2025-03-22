import React from "react";
import { Helmet } from "react-helmet"; 
import { Link } from "react-router-dom";

const RealtorHeader = () => {
  return (
    <>
    <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Manage your real estate listings and coordinate with agents and buyers through the Realtor Panel."
        />
        <meta
          name="keywords"
          content="Realtor, real estate, listings, agents, buyers, manage listings, realtor panel"
        />
        <meta property="og:title" content="Realtor Panel | Manage Listings & Coordinate with Agents" />
        <meta
          property="og:description"
          content="Access the Realtor Panel to manage your listings and coordinate with agents and buyers for successful deals."
        />
        <meta property="og:image" content="https://example.com/path-to-your-image.jpg" />
        <meta property="og:image:alt" content="Realtor Panel" />
        <meta name="twitter:title" content="Realtor Panel | Manage Listings & Coordinate with Agents" />
        <meta
          name="twitter:description"
          content="Manage your real estate listings and connect with agents and buyers through the Realtor Panel."
        />
        <meta name="twitter:image" content="https://example.com/path-to-your-image.jpg" />
        <title>Realtor Panel | Manage Listings & Coordinate with Agents</title>
      </Helmet>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/RealtorPanel">
            Realtor Panel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/RealtorPanel"
                >
                  Manage Listings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/CoordinateAgentsBuyers">
                  Coordinate with Agents and Buyers
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default RealtorHeader;
