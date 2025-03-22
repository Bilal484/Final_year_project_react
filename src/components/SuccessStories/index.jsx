import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './success_stories.css';
import { Helmet } from 'react-helmet';

const SuccessStories = () => {
    const [successStories, setSuccessStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSuccessStories = async () => {
            try {
                const response = await axios.get("https://api.biznetusa.com/api/all-stories");
                setSuccessStories(response.data.success_stories.slice(0, 3)); // Store success stories in an array
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                console.error("Error fetching success stories:", err);
                setLoading(false); // Set loading to false if there is an error
            }
        };
        fetchSuccessStories();
    }, []);

    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Success Stories | Company Name</title>
                <meta name="description" content="Read success stories from our customers and see how they achieved their goals using our services." />
                <meta property="og:title" content="Success Stories | Company Name" />
                <meta property="og:description" content="Read success stories from our customers and see how they achieved their goals using our services." />
                <meta property="og:image" content="https://api.biznetusa.com/uploads/placeholder-image.jpg" /> {/* Default image for social sharing */}
                <meta property="og:url" content="https://yourcompany.com/success-stories" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Success Stories | Company Name" />
                <meta name="twitter:description" content="Read success stories from our customers and see how they achieved their goals using our services." />
                <meta name="twitter:image" content="https://api.biznetusa.com/uploads/placeholder-image.jpg" />
            </Helmet>
        <div className="container py-5">
            <h3 className="text-center mb-4 fw-bold display-5">Success Stories</h3>
            <div className="row justify-content-center d-flex align-items-stretch">
                {loading ? (
                    Array(4).fill().map((_, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                            <div className="card text-center shadow-x border-0 rounded-4 h-100">
                                <div className="card-body">
                                    <div className="skeleton-text mb-3" />
                                    <div className="d-flex justify-content-start align-items-center mb-3">
                                        <div className="skeleton-image me-3" />
                                        <div style={{ width: '150px' }}>
                                            <div className="skeleton-title mb-1" />
                                            <div className="skeleton-subtitle" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    successStories.map((story) => (
                        <div className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch" key={story.id}>
                            <div className="card text-center shadow-lg border-0 rounded-4 h-100">
                                <div className="card-body h-100 d-flex flex-column">
                                    <p className="card-text mb-3 align-content-center " style={{ fontStyle: 'italic' }}>
                                        "{story.desc}"
                                    </p>
                                    <div className="d-flex justify-content-start align-items-center mt-auto">
                                        <img
                                            src={`https://api.biznetusa.com/uploads/stories/${story.image}`}
                                            alt={story.name}
                                            className="rounded-circle me-3"
                                            style={{ width: '60px', height: '60px' }}
                                        />
                                        <div>
                                            <h5 className="card-title mb-1 text-start">{story.name}</h5>
                                            <h6 className="card-subtitle fw-medium text-capitalize text-muted text-start" style={{ fontSize: '0.9rem' }}>{story.role}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
        </>
    );
};

export default SuccessStories;
