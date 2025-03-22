import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet'; 
import './ExecutiveLeaders.css';
import Notification, { useNotification } from "../../components/Notification";
import { Link } from "react-router-dom";

// SkeletonLoader Component
const SkeletonLoader = () => {
    return (
        <>
         <Helmet>
                <title>Executive Leadership</title>
                <meta
                    name="description"
                    content="Meet our executive leadership team, the individuals who drive the vision and strategy of our company."
                />
                <meta name="keywords" content="executive leadership, company leaders, executive team, leadership" />
                <meta property="og:title" content="Executive Leadership" />
                <meta
                    property="og:description"
                    content="Meet our executive leadership team, the individuals who drive the vision and strategy of our company."
                />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="https://api.biznetusa.com/uploads/leaders/default-image.jpg" /> {/* Default image */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Executive Leadership" />
                <meta
                    name="twitter:description"
                    content="Meet our executive leadership team, the individuals who drive the vision and strategy of our company."
                />
                <meta name="twitter:image" content="https://api.biznetusa.com/uploads/leaders/default-image.jpg" /> {/* Default image */}
            </Helmet>
        <div className="col-lg-3 col-md-4 col-sm-6 d-flex flex-column align-items-center mb-4">
            <div
                className="rounded-circle bg-light mb-3"
                style={{
                    width: "120px",
                    height: "120px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                }}
            >
                <div className="skeleton-circle"></div>
            </div>
            <div className="skeleton-text mb-2" style={{ width: "80%" }}></div>
            <div className="skeleton-text mb-3" style={{ width: "60%" }}></div>
            <div className="skeleton-text" style={{ width: "50%" }}></div>
        </div>
        </>
    );
};

const ExecutiveLeaders = () => {
    const [notification, showNotification] = useNotification(); // Destructure the returned values
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const imagePath = "https://api.biznetusa.com/uploads/leaders/";

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const response = await fetch("https://api.biznetusa.com/api/all-executiveleaders");
                const data = await response.json();
                if (data.status === 200 && data.leaders) {
                    setLeaders(data.leaders);
                    setLoading(false);
                } else {
                    throw new Error("Error fetching data");
                }
            } catch (error) {
                showNotification("Error fetching leaders:", error.message);
                setLoading(false);
            }
        };
        fetchLeaders();
    }, []);

    return (
        <div className="container py-5" id="leaders">
            <Notification />
            <h3 className="text-center mb-5 display-5 fw-bold">Executive Leadership</h3>
            <div className="row justify-content-center">
                {loading
                    ? Array(4)
                        .fill(0)
                        .map((_, index) => <SkeletonLoader key={index} />)
                    : leaders.map((leader) => (
                        <div
                            className="col-lg-3 col-md-4 col-sm-6 d-flex flex-column align-items-center mb-4 leader-card"
                            key={leader.id}
                        >
                            <div
                                className="rounded-circle bg-secondary mb-3"
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    src={`${imagePath}${leader.image}`}
                                    alt={leader.title}
                                    className="w-100 h-100"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <h5 className="mb-1">{leader.title}</h5>
                            <p className="text-muted mb-2">{leader.role}</p>
                            <p className="text-muted mb-2 leader-description">{leader.description}</p>
                            <Link
                                to="#leaders"
                                className="text-decoration-none fw-bold"
                                style={{ fontSize: "0.9rem", color: "var(--color)" }}
                            >
                                View Profile
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ExecutiveLeaders;