import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShareListingModal from "../SharePopup";
import FavoriteButton from "../FavoriteButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification, { useNotification } from "../../components/Notification";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./MainCards.css"; // Make sure to create this CSS file

const MainCards = () => {
    const [notification, showNotification] = useNotification();
    const [productData, setProductData] = useState(null);
    const [shownProperties, setShownProperties] = useState([]);
    const [activeSection, setActiveSection] = useState("all");
    const [carouselIndex, setCarouselIndex] = useState({});
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedProductSlug, setSelectedProductSlug] = useState(null);
    const [showMap, setShowMap] = useState({});
    const [userId, setUserId] = useState(null);
    const [favoriteProperties, setFavoriteProperties] = useState([]);
    const [soldProperties, setSoldProperties] = useState([]);
    const [recentProperties, setRecentProperties] = useState([]);
    const [salesProperties, setSalesProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [animated, setAnimated] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    // Create refs for scroll animations
    const sectionRef = useRef(null);

    const navigate = useNavigate();
    const numberOfProperties = 3;

    // Retrieve userId from localStorage
    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        if (storedUserId) {
            setUserId(storedUserId);
        }
        
        // Set up scroll animation observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setAnimated(prev => ({ ...prev, [entry.target.dataset.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        // Observe all property cards
        document.querySelectorAll('.property-card').forEach(card => {
            observer.observe(card);
        });
        
        return () => observer.disconnect();
    }, [shownProperties]);

    // Fetch data for all sections
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                await Promise.all([
                    fetchFavorites(),
                    fetchSoldProperties(),
                    fetchRecentProperties(),
                    fetchSalesProperties()
                ]);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        
        if (userId) {
            fetchAllData();
        } else {
            fetchSoldProperties();
            fetchRecentProperties();
            fetchSalesProperties();
        }
    }, [userId]);

    const handleSectionClick = (section) => {
        setActiveSection(section);
        
        // Add animation when changing sections
        if (sectionRef.current) {
            sectionRef.current.classList.add('section-change-animation');
            setTimeout(() => {
                sectionRef.current.classList.remove('section-change-animation');
            }, 500);
        }
    };

    const fetchSalesProperties = async () => {
        try {
            const data = await axios.get(
                "https://api.biznetusa.com/api/get-saleproperty"
            );
            setSalesProperties(data.data.products);
        } catch (err) {
            showNotification(err.message || "Failed to fetch Sales Properties");
        }
    };

    const fetchRecentProperties = async () => {
        try {
            const data = await axios.get(
                "https://api.biznetusa.com/api/get-recentproducts"
            );
            setRecentProperties(data.data.products);
        } catch (err) {
            showNotification(err || "Failed to fetch Recent Properties");
        }
    };

    const fetchSoldProperties = async () => {
        try {
            const response = await fetch(
                "https://api.biznetusa.com/api/get-soldproperty"
            );
            const data = await response.json();
            if (data.status === 200) {
                setSoldProperties(data.products);
            }
        } catch (err) { 
            console.error("Error fetching sold properties:", err);
        }
    };
    
    const fetchFavorites = async () => {
        try {
            if (!userId) return;
            const response = await axios.get(
                `https://api.biznetusa.com/api/get-fvtproducts/${userId}`
            );
            if (response.data.status === 200) {
                setFavoriteProperties(response.data.products || []);
            }
        } catch (err) {
            showNotification(err.message || "Failed to fetch favorite properties.");
        }
    };

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                const [productResponse, productImageResponse] = await Promise.all([
                    fetch("https://api.biznetusa.com/api/get-products"),
                    fetch("https://api.biznetusa.com/api/get-productimages"),
                ]);

                const productData = await productResponse.json();
                const productImageData = await productImageResponse.json();

                if (productData.status === 200 && productImageData.status === 200) {
                    const mergedProperties = productData.products.map((product) => {
                        const images = productImageData.products
                            .filter((image) => image.pd_id === product.id)
                            .map((img) => img.image);

                        return { ...product, images };
                    });

                    setProperties(mergedProperties);
                    setFilteredProperties(mergedProperties); // Set filtered properties initially
                    setShownProperties(mergedProperties.slice(0, 12)); // Display the initial set
                } else {
                    throw new Error("Failed to load product or image data");
                }
            } catch (err) {
                setError(err.message || "An error occurred while fetching data");
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        // Fetch all products regardless of login status
        fetchProductData();
    }, []);

    const handleSelect = (selectedIndex, propertyId) => {
        setCarouselIndex((prevState) => ({
            ...prevState,
            [propertyId]: selectedIndex,
        }));
    };

    const toggleMapView = (propertyId) => {
        setShowMap((prevState) => ({
            ...prevState,
            [propertyId]: !prevState?.[propertyId] || false,
        }));
    };

    const openShareModal = (productSlug) => {
        setSelectedProductSlug(productSlug);
        setShowShareModal(true);
    };

    const closeShareModal = () => {
        setShowShareModal(false);
        setSelectedProductSlug(null);
    };

    useEffect(() => {
        const filterProperties = () => {
            let filtered = [];
            
            switch (activeSection) {
                case "favorites":
                    if (favoriteProperties && favoriteProperties.length > 0) {
                        filtered = properties.filter((property) =>
                            favoriteProperties.some((fav) => fav.id === property.id)
                        );
                    }
                    break;
                    
                case "sold":
                    if (soldProperties && soldProperties.length > 0) {
                        filtered = properties.filter((property) =>
                            soldProperties.some((sold) => sold.id === property.id)
                        );
                    }
                    break;
                    
                case "new":
                    if (recentProperties && recentProperties.length > 0) {
                        filtered = properties.filter((property) =>
                            recentProperties.some((recent) => recent.id === property.id)
                        );
                    }
                    break;
                    
                case "sales":
                    if (salesProperties && salesProperties.length > 0) {
                        filtered = properties.filter((property) =>
                            salesProperties.some((sales) => sales.id === property.id)
                        );
                    }
                    break;
                    
                default:
                    filtered = properties;
                    break;
            }
            
            // Apply search filter if search term exists
            if (searchTerm.trim()) {
                const term = searchTerm.toLowerCase();
                filtered = filtered.filter(
                    property => 
                        property.title?.toLowerCase().includes(term) ||
                        property.location?.toLowerCase().includes(term) ||
                        property.desc?.toLowerCase().includes(term)
                );
            }
            
            setFilteredProperties(filtered);
            setShownProperties(filtered.slice(0, 6));
        };
        
        filterProperties();
    }, [activeSection, properties, favoriteProperties, soldProperties, recentProperties, salesProperties, searchTerm]);

    const increaseShown = () => {
        if (shownProperties.length + numberOfProperties < filteredProperties.length) {
            setShownProperties(
                filteredProperties.slice(0, shownProperties.length + numberOfProperties)
            );
        } else if (shownProperties.length === filteredProperties.length) {
            setShownProperties(filteredProperties.slice(0, 6));
        } else {
            setShownProperties(
                filteredProperties.slice(0, filteredProperties.length)
            );
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <Helmet>
                <title>Property Listings | UrbanCraft REAL ESTATE</title>
                <meta
                    name="description"
                    content="Explore our curated collection of properties. Find your dream home with UrbanCraft REAL ESTATE's diverse property listings."
                />
                <meta
                    name="keywords"
                    content="Properties, Real Estate, Listings, Favorites, Sales, Sold Properties"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="Property Listings | UrbanCraft REAL ESTATE" />
                <meta
                    property="og:description"
                    content="Browse through our categorized property listings for your real estate needs."
                />
                <meta name="author" content="UrbanCraft REAL ESTATE" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            {notification.message && <Notification {...notification} />}

            <div className="main-cards-container container py-4">
                <ToastContainer />
                <div className="section-header mb-4">
                    <h1 className="section-title">Explore Properties</h1>
                    {/* <p className="section-subtitle">Find your perfect match from our curated collection</p> */}
                </div>
                
                {/* Search Bar */}
                <div className="search-container mb-4">
                    <div className="search-wrapper">
                        <i className="fa fa-search search-icon"></i>
                        <input 
                            type="text" 
                            placeholder="Search properties by location, title or description" 
                            value={searchTerm}
                            onChange={handleSearch}
                            className="search-input"
                        />
                        {searchTerm && (
                            <button 
                                className="clear-search" 
                                onClick={() => setSearchTerm("")}
                            >
                                <i className="fa fa-times"></i>
                            </button>
                        )}
                    </div>
                </div>
                
                {/* Filter Tabs */}
                <div className="filter-tabs mb-4">
                    {[
                        {id: "all", label: "All Properties", icon: "fa-th-large"},
                        {id: "favorites", label: "Favorites", icon: "fa-heart"},
                        {id: "new", label: "New Listings", icon: "fa-certificate"},
                        {id: "sales", label: "Sales", icon: "fa-tag"},
                        {id: "sold", label: "Sold", icon: "fa-check-circle"},
                        {id: "open-house", label: "Open House", icon: "fa-door-open"},
                        {id: "insights", label: "Insights", icon: "fa-chart-line"},
                    ].map((section) => (
                        <button
                            key={section.id}
                            className={`filter-tab ${activeSection === section.id ? "active" : ""}`}
                            onClick={() => handleSectionClick(section.id)}
                        >
                            <i className={`fas ${section.icon} tab-icon`}></i>
                            <span className="tab-label">{section.label}</span>
                        </button>
                    ))}
                </div>
                
                {/* Properties Grid */}
                <div className="properties-section" ref={sectionRef}>
                    {loading ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Loading properties...</p>
                        </div>
                    ) : error ? (
                        <div className="error-container">
                            <i className="fas fa-exclamation-circle error-icon"></i>
                            <p>{error}</p>
                            <button className="retry-btn" onClick={() => window.location.reload()}>
                                Retry
                            </button>
                        </div>
                    ) : (
                        <div className="row properties-grid">
                            {shownProperties.length === 0 ? (
                                <div className="no-properties">
                                    <i className="fas fa-home no-properties-icon"></i>
                                    <h3>No properties found</h3>
                                    <p>
                                        {activeSection !== "all" 
                                            ? `You have no ${activeSection} properties. Try another category.`
                                            : searchTerm 
                                                ? "No properties match your search. Try different keywords."
                                                : "No properties available at the moment."
                                        }
                                    </p>
                                </div>
                            ) : (
                                shownProperties.map((property) => (
                                    <div
                                        className="col-sm-6 col-lg-4 mb-4"
                                        key={property.id}
                                    >
                                        <div 
                                            className={`property-card ${animated[property.id] ? 'animate' : ''}`}
                                            data-id={property.id}
                                        >
                                            <div className="property-card-content">
                                                <div className="property-media">
                                                    {!showMap[property.id] ? (
                                                        <div className="property-carousel">
                                                            <div className="carousel-inner">
                                                                {property.images.length > 0 ? (
                                                                    property.images.map((image, index) => (
                                                                        <div
                                                                            className={`carousel-item ${index === (carouselIndex[property.id] || 0) ? "active" : ""}`}
                                                                            key={index}
                                                                        >
                                                                            <img
                                                                                onClick={() => navigate(`/ProductDetail/${property.id}`)}
                                                                                src={`https://api.biznetusa.com/uploads/products/${image}`}
                                                                                alt={`Property ${property.title || property.id}`}
                                                                                className="property-image"
                                                                            />
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <div className="carousel-item active">
                                                                        <img
                                                                            src="/placeholder.jpg"
                                                                            alt="Placeholder"
                                                                            className="property-image"
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {property.images.length > 1 && (
                                                                <div className="carousel-controls">
                                                                    <button
                                                                        className="carousel-control prev"
                                                                        onClick={() =>
                                                                            handleSelect(
                                                                                (carouselIndex[property.id] || 0) === 0
                                                                                    ? property.images.length - 1
                                                                                    : (carouselIndex[property.id] || 0) - 1,
                                                                                property.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="fas fa-chevron-left"></i>
                                                                    </button>
                                                                    <button
                                                                        className="carousel-control next"
                                                                        onClick={() =>
                                                                            handleSelect(
                                                                                (carouselIndex[property.id] || 0) + 1 >=
                                                                                    property.images.length
                                                                                    ? 0
                                                                                    : (carouselIndex[property.id] || 0) + 1,
                                                                                property.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="fas fa-chevron-right"></i>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="map-container">
                                                            <iframe
                                                                width="100%"
                                                                height="100%"
                                                                frameBorder="0"
                                                                src={property.map_url}
                                                                allowFullScreen
                                                            />
                                                        </div>
                                                    )}
                                                    
                                                    <div className="property-media-controls">
                                                        <button
                                                            className="media-control-btn"
                                                            onClick={() => toggleMapView(property.id)}
                                                        >
                                                            <i className={`fas ${showMap[property.id] ? 'fa-image' : 'fa-map-marker-alt'}`}></i>
                                                        </button>
                                                        <div className="property-indicators">
                                                            {property.images.length > 0 && !showMap[property.id] && 
                                                                property.images.map((_, index) => (
                                                                    <span 
                                                                        key={index}
                                                                        className={`indicator ${index === (carouselIndex[property.id] || 0) ? 'active' : ''}`}
                                                                        onClick={() => handleSelect(index, property.id)}
                                                                    ></span>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="property-details">
                                                    <div className="property-header">
                                                        <h3 className="property-price">
                                                            ${Number(property.price).toLocaleString('en-GB')}
                                                        </h3>
                                                        <div className="property-actions">
                                                            <button 
                                                                className="action-btn share-btn"
                                                                onClick={() => openShareModal(property.slug)}
                                                                aria-label="Share property"
                                                            >
                                                                <i className="fas fa-share-alt"></i>
                                                            </button>
                                                            <FavoriteButton 
                                                                userId={userId} 
                                                                productId={property.id}
                                                                className="action-btn favorite-btn"
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="property-features">
                                                        <div className="feature">
                                                            <i className="fas fa-bed feature-icon"></i>
                                                            <span>{property?.overview_sales?.[0]?.beds || "N/A"}</span>
                                                            <span className="feature-label">Beds</span>
                                                        </div>
                                                        <div className="feature">
                                                            <i className="fas fa-bath feature-icon"></i>
                                                            <span>{property?.overview_sales?.[0]?.bath || "N/A"}</span>
                                                            <span className="feature-label">Baths</span>
                                                        </div>
                                                        <div className="feature">
                                                            <i className="fas fa-vector-square feature-icon"></i>
                                                            <span>{property?.overview_sales?.[0]?.sq_ft || "N/A"}</span>
                                                            <span className="feature-label">Sq Ft</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="property-location">
                                                        <i className="fas fa-map-marker-alt location-icon"></i>
                                                        <span>{property.location}</span>
                                                    </div>
                                                    
                                                    <div className="property-cta">
                                                        <Link to="/Start-chat-with-znet" className="cta-btn chat-btn">
                                                            <i className="fas fa-comments"></i>
                                                            <span>Chat</span>
                                                        </Link>
                                                        <a href={`tel:${property.phone || '1234567890'}`} className="cta-btn call-btn">
                                                            <i className="fas fa-phone-alt"></i>
                                                            <span>Call</span>
                                                        </a>
                                                        <Link to={`/ProductDetail/${property.id}`} className="cta-btn details-btn">
                                                            <span>View Details</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    
                    {!loading && shownProperties.length > 0 && shownProperties.length < filteredProperties.length && (
                        <div className="load-more-container">
                            <button
                                className="load-more-btn"
                                onClick={increaseShown}
                            >
                                <span>Load More Properties</span>
                                <i className="fas fa-chevron-down"></i>
                            </button>
                        </div>
                    )}
                </div>
                
                <ShareListingModal
                    isOpen={showShareModal}
                    onClose={closeShareModal}
                    productSlug={selectedProductSlug}
                />
            </div>
        </>
    );
};

export default MainCards;

