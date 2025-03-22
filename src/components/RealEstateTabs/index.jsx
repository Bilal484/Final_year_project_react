import React, { useEffect, useRef, useState } from "react";
import "./RealEstateTabs.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";

const RealEstateTabs = () => {
    const [activeTab, setActiveTab] = useState("buy");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const abortControllerRef = useRef(null);

    const fetchSearchResults = async (query) => {
        setLoading(true);
        setError("");

        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const response = await axios.get(
                `https://api.biznetusa.com/api/get-searchproduct/${query}`,
                { signal: controller.signal }
            );
            if (response.data.status) {
                setSearchResults(response.data.products || []);
            } else {
                setError(response.data.message || "Failed to fetch search results");
                setSearchResults([]);
            }
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log("Request canceled:", err.message);
            } else {
                setError("sorry nothing found");
                setSearchResults([]);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setError("Please enter a search term");
            return;
        }
        fetchSearchResults(searchTerm);
    };

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>Real Estate Search | ZNet</title>
            </Helmet>
            <div className="col-lg-5 pt-4 mb-4">
                <div className="container steps_buttons_real justify-content-center d-flex align-content-center flex-column">
                    <h1 className="text-start fs-2 fw-bold my-4">
                        Find the right home at the right price
                    </h1>

                    {/* Navigation Tabs */}
                    <ul
                        className="nav nav-tabs mb-3 d-flex flex-wrap"
                        id="realEstateTabs"
                    >
                        {["buy", "rent", "sell", "mortgage", "estimate"].map((tab) => (
                            <li key={tab} className="nav-item mx-2" >
                                <button
                                    className={`nav-link w-100 text-center ${activeTab === tab ? "active" : ""
                                        }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Tab Content */}
                    <div className="tab-content rounded-2">
                        {["buy", "rent", "sell", "mortgage", "estimate"].map((tab) => (
                            <div
                                key={tab}
                                className={`tab-pane fade ${activeTab === tab ? "show active" : ""
                                    }`}
                                id={tab}
                                role="tabpanel"
                            >
                                <div className="search-bar overflow-hidden rounded-2">
                                    <input
                                        type="text"
                                        className="form-control overflow-hidden"
                                        placeholder={`Search for ${tab}`}
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            handleSearch();
                                        }}
                                    />
                                    <button type="button" onClick={handleSearch} className="m-0">
                                        <i className="fa-solid fa-magnifying-glass m-0" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Loading and Error Messages */}
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-danger">{error}</p>}

                    {/* Display Search Results */}
                    <div className="search-results">
                        {searchResults.length > 0 ? (
                            <ul className="list-group">
                                {searchResults.slice(0, 3).map((property) => (
                                    <Link to={`/ProductDetail/${property.id}`}>
                                        <li
                                            key={property.id}
                                            className="list-group-item property-card text-decoration-none"
                                        >
                                            <h5 className="mb-2">{property.title}</h5>
                                            <p className="text-truncate" title={property.desc}>
                                                {property.desc.length > 100
                                                    ? `${property.desc.substring(0, 100)}...`
                                                    : property.desc}
                                            </p>
                                            <p>
                                                <strong>Location:</strong> {property.location}
                                            </p>
                                            <p>
                                                <strong>Price:</strong> ${property.price}
                                            </p>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        ) : (
                            !loading && <p>No results found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RealEstateTabs;
