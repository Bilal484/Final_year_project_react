import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const InvestorHeader = () => {
    return (

        <>
            <Helmet>
                <title>Investor Panel - Manage Your Investments</title>
                <meta name="description" content="Access the Investor Panel to manage investments, explore opportunities, track ROI, and analyze performance." />
                <meta name="keywords" content="Investor Panel, Manage Investments, Real Estate Opportunities, ROI Tracking, Analytics" />
                <meta property="og:title" content="Investor Panel - Your Investment Dashboard" />
                <meta property="og:description" content="Track and manage your investments with the Investor Panel." />
                <meta name="author" content="Your Website Team" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/InvestorPanel">Investor Panel</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/InvestorPanel">Manage Investments</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/RealEstateOpportunities">Opportunities</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/TrackRIO">
                                    Track ROI
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/AnalyticsPerformace">
                                    Analytics
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="#">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default InvestorHeader;