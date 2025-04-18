import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import "./UserHeader.css"



const UserHeader = () => {
    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>User Dashboard | UrbanCraft REAL ESTATE</title>
                <meta name="description" content="Manage your user dashboard with easy access to favorites, saved searches, appointments, offers, and more." />
                <meta property="og:title" content="User Dashboard | UrbanCraft REAL ESTATE" />
                <meta property="og:description" content="Manage your user dashboard with easy access to favorites, saved searches, appointments, offers, and more." />
                <meta property="og:image" content="https://yourwebsite.com/images/user-dashboard-banner.jpg" /> {/* Replace with actual image URL */}
                <meta property="og:url" content="https://yourwebsite.com/user-dashboard" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="User Dashboard | UrbanCraft REAL ESTATE" />
                <meta name="twitter:description" content="Manage your user dashboard with easy access to favorites, saved searches, appointments, offers, and more." />
                <meta name="twitter:image" content="https://yourwebsite.com/images/user-dashboard-banner.jpg" /> {/* Replace with actual image URL */}
            </Helmet>
            <div className="container-fluid" id="customHeader">
                <div className="user-header-parent">
                    <div className="bg-background text-black w-100">
                        <nav className="navbar navbar-expand-lg">
                            <div className="container-fluid justify-content-end ">
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
                                <div
                                    className="collapse navbar-collapse justify-content-around"
                                    id="navbarNav"
                                >
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/Favorites">
                                                Favorites
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/SavedSearches">
                                                Saved Searches
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/OpenHouseSchedule">
                                                Open House Schedule
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/Appointments">
                                                Appointments
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/Agent">
                                                Your Agent
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/Offer">
                                                Offers
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/Review">
                                                Reviews
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/OwnerDashboard">
                                                Owner Dashboard
                                            </Link>
                                        </li>
                                        {/* Dropdown */}
                                        <li className="nav-item dropdown">
                                            <Link
                                                className="nav-link dropdown-toggle btn-more-user-panel border-0 pt-2"
                                                to="#"
                                                id="navbarDropdown"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                More
                                            </Link>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li>
                                                    <Link className="dropdown-item" to="/AccountSettings">
                                                        Account Setting
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/UserSetting">
                                                        User Setting
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

        </>
    )

}
export default UserHeader;