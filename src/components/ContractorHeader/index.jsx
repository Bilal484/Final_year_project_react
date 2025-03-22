import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

const ContractorHeader = () => {
    return (
        <>
           <Helmet>
                <title>Contractor Panel | Manage Services and Projects</title>
                <meta
                    name="description"
                    content="Access the Contractor Panel to manage services, handle project inquiries, schedule projects, track progress, and more."
                />
                <meta
                    name="keywords"
                    content="Contractor Panel, Manage Services, Project Inquiries, Schedule Projects, Track Progress, Client Communication, Review Management"
                />
                <meta property="og:title" content="Contractor Panel | Manage Services and Projects" />
                <meta
                    property="og:description"
                    content="Manage your services, track progress, communicate with clients, and handle project inquiries all in one place through the Contractor Panel."
                />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="URL_TO_IMAGE" /> {/* Placeholder for image */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contractor Panel | Manage Services and Projects" />
                <meta
                    name="twitter:description"
                    content="Access the Contractor Panel to manage services, schedule projects, track progress, and communicate with clients."
                />
                <meta name="twitter:image" content="URL_TO_IMAGE" /> {/* Placeholder for image */}
            </Helmet>
  
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/ManageServiceContractor">
                            Contractor Panel
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
                                        to="/ManageServiceContractor"
                                    >
                                        Manage Services
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/ProjectInquiries">
                                        Project Inquiries
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/ScheduleProject">
                                        Schedule Projects
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/TaskProgress">
                                        Track Progress
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/ClientCommunication">
                                        Client Communication
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/ReviewManagement">
                                        Review Management
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
        </>

    )
}

export default ContractorHeader;