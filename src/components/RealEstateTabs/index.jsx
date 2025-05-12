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
    const [isInputFocused, setIsInputFocused] = useState(false);
    const abortControllerRef = useRef(null);
    const searchTimeout = useRef(null);

    const tabOptions = [
        { id: "buy", label: "Buy", icon: "fa-home" },
        { id: "rent", label: "Rent", icon: "fa-key" },
        { id: "sell", label: "Sell", icon: "fa-tag" },
        { id: "mortgage", label: "Mortgage", icon: "fa-dollar-sign" },
        { id: "estimate", label: "Estimate", icon: "fa-calculator" }
    ];

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
                `https://apitourism.today.alayaarts.com/api/get-searchproduct/${query}`,
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
                setError("No properties found matching your search criteria");
                setSearchResults([]);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            setError("Please enter a search term");
            setSearchResults([]);
            return;
        }

        // Clear previous timeout
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        // Debounce search to avoid too many requests
        searchTimeout.current = setTimeout(() => {
            fetchSearchResults(searchTerm);
        }, 500);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value.trim().length > 2) {
            handleSearch();
        } else if (e.target.value.trim().length === 0) {
            setSearchResults([]);
            setError("");
        }
    };

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>Real Estate Search | UrbanCraft REAL ESTATE</title>
                <meta name="description" content="Find the perfect property with our easy-to-use search tool. Buy, rent, or sell properties with UrbanCraft REAL ESTATE." />
            </Helmet>

            <div className="col-lg-6  pt-4 mb-4">
                <div className="real-estate-search-container">
                    <h1>Find the right home at the right price</h1>

                    {/* Navigation Tabs */}
                    <div className="tab-navigation">
                        {tabOptions.map((tab) => (
                            <button
                                key={tab.id}
                                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <i className={`fas ${tab.icon} me-2`}></i>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                        {tabOptions.map((tab) => (
                            <div
                                key={tab.id}
                                className={`tab-pane ${activeTab === tab.id ? "active" : "d-none"}`}
                                id={tab.id}
                                role="tabpanel"
                            >
                                <div className={`search-bar-wrapper ${isInputFocused ? "focused" : ""}`}>
                                    <div className="search-bar">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={`Search for ${tab.label.toLowerCase()} properties...`}
                                            value={searchTerm}
                                            onChange={handleInputChange}
                                            onFocus={() => setIsInputFocused(true)}
                                            onBlur={() => setIsInputFocused(false)}
                                        />
                                        <button type="button" onClick={handleSearch} aria-label="Search">
                                            <i className="fa-solid fa-magnifying-glass" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Loading and Error Messages */}
                    {loading && (
                        <div className="loading-indicator">
                            <div className="spinner"></div>
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            {error}
                        </div>
                    )}

                    {/* Display Search Results */}
                    <div className="search-results">
                        {searchResults.length > 0 ? (
                            <ul className="list-group">
                                {searchResults.slice(0, 3).map((property, index) => (
                                    <Link
                                        to={`/ProductDetail/${property.id}`}
                                        key={property.id}
                                        className="text-decoration-none"
                                    >
                                        <li className="list-group-item property-card">
                                            <div className="property-image-wrapper">
                                                <img
                                                    src={property.image_url || `https://source.unsplash.com/random/600x400/?house,property&sig=${index}`}
                                                    alt={property.title}
                                                    className="property-image"
                                                />
                                            </div>

                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h5 className="mb-1">{property.title}</h5>
                                                <span className="property-price">${property.price}</span>
                                            </div>

                                            <p className="text-truncate mb-2" title={property.desc}>
                                                {property.desc.length > 100
                                                    ? `${property.desc.substring(0, 100)}...`
                                                    : property.desc}
                                            </p>

                                            <div className="property-location">
                                                <i className="fa-solid fa-location-dot"></i>
                                                {property.location}
                                            </div>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        ) : (
                            !loading && searchTerm.trim() !== "" && (
                                <div className="no-results-found">
                                    <i className="fa-solid fa-search me-2"></i>
                                    No properties found. Try different keywords.
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RealEstateTabs;
