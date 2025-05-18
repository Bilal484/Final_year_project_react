import React, { useEffect, useState, useRef, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShareListingModal from "../SharePopup";
import FavoriteButton from "../FavoriteButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification, { useNotification } from "../../components/Notification";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";
import "./MainCards.css";
import { debounce } from "lodash";
import pLimit from "p-limit";


const limit = pLimit(2);

const MainCards = () => {
    const [notification, showNotification] = useNotification();
    const [shownProperties, setShownProperties] = useState([]);
    const [activeSection, setActiveSection] = useState("all");
    const [carouselIndex, setCarouselIndex] = useState({});
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [apiError, setApiError] = useState(null);
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
    const [offersData, setOffersData] = useState({});
    const [showOfferModal, setShowOfferModal] = useState(false); const [selectedOffer, setSelectedOffer] = useState(null);
    const [offerLoading, setOfferLoading] = useState(false);
    const [userProfiles, setUserProfiles] = useState({});
    const [showAgentModal, setShowAgentModal] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [agentLoading, setAgentLoading] = useState(false);

    const sectionRef = useRef(null);
    const navigate = useNavigate();
    const numberOfProperties = 10;

    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        if (storedUserId) {
            setUserId(storedUserId);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setAnimated((prev) => ({ ...prev, [entry.target.dataset.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll(".property-card").forEach((card) => {
            observer.observe(card);
        });
        return () => observer.disconnect();
    }, [shownProperties]);


    const fetchOffersForProperty = async (productId, signal) => {
        try {
            setOfferLoading(true);
            const response = await axios.get(
                `https://apitourism.today.alayaarts.com/api/get-start-offer/${productId}`,
                { timeout: 30000, signal }
            );
            if (response.data.status === 200 && response.data.start_an_offer) {
                return response.data.start_an_offer;
            }
            return [];
        } catch (err) {
            toast("Failed to load offers for this property", { type: "error" });
            return [];
        } finally {
            setOfferLoading(false);
        }
    };




    const handleOfferClick = async (propertyId) => {
        const abortController = new AbortController();
        try {
            setOfferLoading(true);
            const offers = await fetchOffersForProperty(propertyId, abortController.signal);
            if (offers && offers.length > 0) {
                setSelectedOffer(offers[0]);
                setShowOfferModal(true);
            } else {
                toast("No offers found for this property", { type: "info" });
            }
        } catch (err) {
            // if (err.name !== "AbortError") {
            //     // console.error("Error fetching offer details:", err?.message || "Unknown error");
            //     toast("Failed to load offer details", { type: "error" });
            // }
            toast("Failed to load offer details", { type: "error" });
        } finally {
            setOfferLoading(false);
        }
        return () => abortController.abort();
    };

    const handleSectionClick = useCallback(
        debounce((section) => {
            setActiveSection(section);
            if (sectionRef.current) {
                sectionRef.current.classList.add("section-change-animation");
                setTimeout(() => {
                    sectionRef.current.classList.remove("section-change-animation");
                }, 500);
            }
        }, 300),
        []
    );

    const fetchSalesProperties = useCallback(async (signal) => {
        const cacheKey = "salesProperties";
        if (localStorage.getItem(cacheKey)) {
            setSalesProperties(JSON.parse(localStorage.getItem(cacheKey)));
            return;
        }
        try {
            const data = await axios.get(
                "https://apitourism.today.alayaarts.com/api/get-saleproperty",
                { timeout: 30000, signal }
            );
            const products = data.data.products || [];
            localStorage.setItem(cacheKey, JSON.stringify(products));
            setSalesProperties(products);
        } catch (err) {
            // if (err.name !== "AbortError") {
            //     // console.error("Error fetching sales properties:", err.message);
            //     setSalesProperties([]);
            //     setTimeout(() => {
            //         showNotification("Failed to fetch Sales Properties. Please try again later.");
            //     }, 3000);
            // }
            // setSalesProperties([]);
            setTimeout(() => {
                showNotification("Failed to fetch Sales Properties. Please try again later.");
            }, 3000);
        }
    }, [showNotification]);

    const fetchRecentProperties = useCallback(async (signal) => {
        const cacheKey = "recentProperties";
        if (localStorage.getItem(cacheKey)) {
            setRecentProperties(JSON.parse(localStorage.getItem(cacheKey)));
            return;
        }
        try {
            const data = await axios.get(
                "https://apitourism.today.alayaarts.com/api/get-recentproducts",
                { timeout: 30000, signal }
            );
            const products = data.data.products || [];
            localStorage.setItem(cacheKey, JSON.stringify(products));
            setRecentProperties(products);
        } catch (err) {
            // if (err.name !== "AbortError") {
            //     // console.error("Error fetching recent properties:", err.message);

            // }
        }
        setRecentProperties([]);
        setTimeout(() => {
            showNotification("Failed to fetch Recent Properties. Please try again later.");
        }, 3000);
    }, [showNotification]);

    const fetchSoldProperties = useCallback(async (signal) => {
        const cacheKey = "soldProperties";
        if (localStorage.getItem(cacheKey)) {
            setSoldProperties(JSON.parse(localStorage.getItem(cacheKey)));
            return;
        }
        try {
            const response = await axios.get(
                "https://apitourism.today.alayaarts.com/api/get-soldproperty",
                { timeout: 30000, signal }
            );
            if (response.data.status === 200) {
                const products = response.data.products;
                localStorage.setItem(cacheKey, JSON.stringify(products));
                setSoldProperties(products);
            }
        } catch (err) {
            if (err.name !== "AbortError") {
                // console.error("Error fetching sold properties:", err.message);
                setSoldProperties([]);
            }
        }
    }, []);

    const fetchFavorites = useCallback(async (signal) => {
        if (!userId) return;
        const cacheKey = `favoriteProperties_${userId}`;
        if (localStorage.getItem(cacheKey)) {
            setFavoriteProperties(JSON.parse(localStorage.getItem(cacheKey)));
            return;
        }
        try {
            const response = await axios.get(
                `https://apitourism.today.alayaarts.com/api/get-fvtproducts/${userId}`,
                { timeout: 30000, signal }
            );
            if (response.data.status === 200) {
                const products = response.data.products || [];
                localStorage.setItem(cacheKey, JSON.stringify(products));
                setFavoriteProperties(products);
            } else {
                setFavoriteProperties([]);
            }
        } catch (err) {
            if (err.name !== "AbortError") {
                setError(true);
                // console.error("Error fetching favorite properties:", err.message);
                // setFavoriteProperties([]);
                setTimeout(() => {
                    showNotification("Failed to fetch favorite properties. Please try again later.");
                }, 3000);
            }
        }
    }, [userId, favoriteProperties]);

    const fetchProductData = async (signal) => {

        const props = JSON.parse(localStorage.getItem("properties"))

        setShownProperties(props.slice(0, 6));
        setProperties(props);
        setFilteredProperties(props);
        try {
            setLoading(true);
            const [productResponse, productImageResponse] = await Promise.all([
                fetch("https://apitourism.today.alayaarts.com/api/get-products", { signal }),
                fetch("https://apitourism.today.alayaarts.com/api/get-productimages", { signal }),
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
                if (props !== productData.data) {
                    localStorage.setItem("properties", JSON.stringify(productData.products))
                    setProperties(productData.products);
                    setFilteredProperties(productData.products);
                    setShownProperties((productData.products).slice(0, 6));
                }

                // Load offers data
                const offersPromises = mergedProperties.slice(0, 6).map((property) =>
                    limit(() => fetchOffersForProperty(property.id, signal))
                );
                const offersResults = await Promise.all(offersPromises);
                const offersMap = {};
                offersResults.forEach((offers, index) => {
                    offersMap[mergedProperties[index].id] = offers;
                });
                setOffersData(offersMap);

                // Also fetch user profiles
                await fetchUserProfilesFromProducts(signal);
            } else {
                throw new Error("Failed to load product or image data");
            }
        } catch (err) {
            if (err.name !== "AbortError") {
                setError(err.message || "An error occurred while fetching data");
                console.error(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchUserProfilesFromProducts = useCallback(async (signal) => {
        const cacheKey = "userProfiles";
        if (localStorage.getItem(cacheKey)) {
            setUserProfiles(JSON.parse(localStorage.getItem(cacheKey)));
            return;
        }

        try {
            // First get products to extract user IDs
            const productRes = await fetch(
                'https://apitourism.today.alayaarts.com/api/get-products',
                { signal }
            );
            const productData = await productRes.json();

            if (productData.status === 200) {
                // Extract unique user IDs from products (filter out null values)
                const userIds = [...new Set(productData.products
                    .filter(p => p.user_id) // Filter out null user_ids
                    .map(p => p.user_id))];

                // Fetch user profiles for each user ID
                const userProfilePromises = userIds.map(id =>
                    limit(() =>
                        fetch(`https://api.biznetusa.com/api/user-profile/${id}`, { signal })
                            .then(res => res.json())
                    )
                );

                const userProfilesData = await Promise.all(userProfilePromises);

                // Create a map of user ID to user profile
                const profilesMap = {};
                userProfilesData.forEach(profile => {
                    if (profile.status === 200 && profile.allusers) {
                        profilesMap[profile.allusers.id] = profile.allusers;
                    }
                });

                localStorage.setItem(cacheKey, JSON.stringify(profilesMap));
                setUserProfiles(profilesMap);
            }
        } catch (err) {
            if (err.name !== "AbortError") {
                console.error('Error fetching user profiles:', err);
                setTimeout(() => {
                    showNotification("Failed to fetch user profiles. Please try again later.");
                }, 3000);
            }
        }
    }, [showNotification]);


    const fetchSectionData = useCallback(async (section, signal) => {
        switch (section) {
            case "favorites":
                if (userId) await fetchFavorites(signal);
                break;
            case "sold":
                await fetchSoldProperties(signal);
                break;
            case "new":
                await fetchRecentProperties(signal);
                break;
            case "sales":
                await fetchSalesProperties(signal);
                break;
            default:
                break;
        }
    }, [userId, fetchFavorites, fetchSoldProperties, fetchRecentProperties, fetchSalesProperties]);

    useEffect(() => {
        const abortController = new AbortController();
        let isMounted = true;

        if (isMounted) {
            fetchProductData(abortController.signal);
        }

        return () => {
            isMounted = false;
            abortController.abort();
        };
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        let isMounted = true;

        if (isMounted) {
            fetchSectionData(activeSection, abortController.signal);
        }

        return () => {
            isMounted = false;
            abortController.abort();
        };
    }, [activeSection, fetchSectionData]);

    const filterProperties = useCallback(
        debounce(() => {
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

            if (searchTerm.trim()) {
                const term = searchTerm.toLowerCase();
                filtered = filtered.filter(
                    (property) =>
                        property.title?.toLowerCase().includes(term) ||
                        property.location?.toLowerCase().includes(term) ||
                        property.desc?.toLowerCase().includes(term)
                );
            }

            setFilteredProperties(filtered);
            setShownProperties(filtered.slice(0, 6));
        }, 300),
        [activeSection, properties, favoriteProperties, soldProperties, recentProperties, salesProperties, searchTerm]
    );

    useEffect(() => {
        filterProperties();
    }, [filterProperties]);

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

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const increaseShown = () => {
        if (shownProperties.length + numberOfProperties < filteredProperties.length) {
            setShownProperties(
                filteredProperties.slice(0, shownProperties.length + numberOfProperties)
            );
        } else if (shownProperties.length === filteredProperties.length) {
            setShownProperties(filteredProperties.slice(0, 6));
        } else {
            setShownProperties(filteredProperties.slice(0, filteredProperties.length));
        }
    };

    const handleAgentClick = async (userId) => {
        if (!userId) return;

        try {
            setAgentLoading(true);
            setSelectedAgent(userProfiles[userId]);
            setShowAgentModal(true);
        } catch (err) {
            console.error('Error loading agent details:', err);
            toast.error('Failed to load agent details');
        } finally {
            setAgentLoading(false);
        }
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
                </div>

                {apiError && (
                    <div className="error-container">
                        <i className="fas fa-exclamation-circle error-icon"></i>
                        <p>{apiError}</p>
                        <button className="retry-btn" onClick={() => fetchSectionData(activeSection)}>
                            Retry
                        </button>
                    </div>
                )}

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
                            <button className="clear-search" onClick={() => setSearchTerm("")}>
                                <i className="fa fa-times"></i>
                            </button>
                        )}
                    </div>
                </div>

                <div className="filter-tabs mb-4">
                    {[
                        { id: "all", label: "All Properties", icon: "fa-th-large" },
                        { id: "favorites", label: "Favorites", icon: "fa-heart" },
                        { id: "new", label: "New Listings", icon: "fa-certificate" },
                        { id: "sales", label: "Sales", icon: "fa-tag" },
                        { id: "sold", label: "Sold", icon: "fa-check-circle" },
                        { id: "open-house", label: "Open House", icon: "fa-door-open" },
                        { id: "insights", label: "Insights", icon: "fa-chart-line" },
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
                            <button className="retry-btn" onClick={() => fetchProductData(new AbortController().signal)}>
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
                                shownProperties?.map((property) => (
                                    <div className="col-sm-6 col-lg-4 mb-4" key={property.id}>
                                        <div
                                            className={`property-card ${animated[property.id] ? "animate" : ""}`}
                                            data-id={property.id}
                                        >
                                            <div className="property-card-content">
                                                <div className="property-media">
                                                    {offersData[property.id]?.length > 0 && (
                                                        <div
                                                            className="offer badge"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleOfferClick(property.id);
                                                            }}
                                                        >
                                                            <i className="fas fa-tag"></i>
                                                            ${Number(offersData[property.id][0]?.how_much_you_offer || 0).toLocaleString()}
                                                        </div>
                                                    )}

                                                    {property.user_id && userProfiles[property.user_id] && (
                                                        <div className="user_info badge" style={{
                                                            backgroundColor: "#6c757d",
                                                            marginLeft: "5px",
                                                            display: "inline-flex",
                                                            alignItems: "center"
                                                        }}>
                                                            <i className="fas fa-user-circle mr-1"></i>
                                                            {userProfiles[property.user_id].name}
                                                        </div>
                                                    )}

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
                                                                                src={`https://apitourism.today.alayaarts.com/uploads/products/${image.image}`}
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
                                                            <i
                                                                className={`fas ${showMap[property.id] ? "fa-image" : "fa-map-marker-alt"
                                                                    }`}
                                                            ></i>
                                                        </button>
                                                        <div className="property-indicators">
                                                            {property.images.length > 0 &&
                                                                !showMap[property.id] &&
                                                                property.images.map((_, index) => (
                                                                    <span
                                                                        key={index}
                                                                        className={`indicator ${index === (carouselIndex[property.id] || 0)
                                                                            ? "active"
                                                                            : ""
                                                                            }`}
                                                                        onClick={() => handleSelect(index, property.id)}
                                                                    ></span>
                                                                ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="property-details">
                                                    <div className="property-header">
                                                        <h3 className="property-price">
                                                            ${Number(property.price).toLocaleString("en-GB")}
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
                                                        <Link to="/chat" className="cta-btn chat-btn">
                                                            <i className="fas fa-comments"></i>
                                                            <span>Chat</span>
                                                        </Link>
                                                        <a
                                                            href={`tel:${property.phone || "1234567890"}`}
                                                            className="cta-btn call-btn"
                                                        >
                                                            <i className="fas fa-phone-alt"></i>
                                                            <span>Call</span>
                                                        </a>
                                                        <Link
                                                            to={`/ProductDetail/${property.id}`}
                                                            className="cta-btn details-btn"
                                                        >
                                                            <span>View Details</span>                                                        </Link>
                                                    </div>

                                                    {/* Property Agent Information */}
                                                    <div className="property-agent">
                                                        {property.user_id && userProfiles[property.user_id] && (
                                                            <div
                                                                className="agent-info"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleAgentClick(property.user_id);
                                                                }}
                                                            >
                                                                <div className="agent-avatar">
                                                                    {userProfiles[property.user_id].image ? (
                                                                        <img
                                                                            src={`https://apitourism.today.alayaarts.com/uploads/users/${userProfiles[property.user_id].image}`}
                                                                            alt={`Agent ${userProfiles[property.user_id].name}`}
                                                                            className="agent-image"
                                                                        />
                                                                    ) : (
                                                                        <i className="fas fa-user-circle"></i>
                                                                    )}
                                                                </div>
                                                                <div className="agent-details">
                                                                    <span className="agent-name">{userProfiles[property.user_id].name}</span>
                                                                    <span className="agent-role">{userProfiles[property.user_id].roles?.role_name || "Agent"}</span>
                                                                </div>
                                                            </div>
                                                        )}
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
                            <button className="load-more-btn" onClick={increaseShown}>
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
                <Modal
                    show={showOfferModal}
                    onHide={() => setShowOfferModal(false)}
                    centered
                    className="offer-details-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <i className="fas fa-tag me-2"></i>
                            Offer Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {offerLoading ? (
                            <div className="text-center p-4">
                                <Spinner animation="border" variant="primary" />
                                <p className="mt-3">Loading offer details...</p>
                            </div>
                        ) : selectedOffer ? (
                            <div className="offer-details">
                                <div className="offer-amount mb-4">
                                    <div className="offer-label">Offer Amount:</div>
                                    <div className="offer-value price">
                                        ${Number(selectedOffer.how_much_you_offer).toLocaleString()}
                                    </div>
                                </div>

                                <div className="offer-info-grid">
                                    <div className="offer-info-item">
                                        <div className="info-icon">
                                            <i className="fas fa-phone"></i>
                                        </div>
                                        <div className="info-content">
                                            <div className="info-label">Contact Phone:</div>
                                            <div className="info-value">{selectedOffer.phone}</div>
                                        </div>
                                    </div>

                                    <div className="offer-info-item">
                                        <div className="info-icon">
                                            <i className="fas fa-shopping-cart"></i>
                                        </div>
                                        <div className="info-content">
                                            <div className="info-label">Plan on Buying:</div>
                                            <div className="info-value">
                                                {selectedOffer.plan_on_buying === "1" ? "Yes" : "No"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="offer-info-item">
                                        <div className="info-icon">
                                            <i className="fas fa-home"></i>
                                        </div>
                                        <div className="info-content">
                                            <div className="info-label">Tour in Person:</div>
                                            <div className="info-value">
                                                {selectedOffer.tour_this_home_in_person === "1" ? "Yes" : "No"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="offer-info-item">
                                        <div className="info-icon">
                                            <i className="fas fa-calendar"></i>
                                        </div>
                                        <div className="info-content">
                                            <div className="info-label">Offer Date:</div>
                                            <div className="info-value">
                                                {new Date(selectedOffer.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {selectedOffer.comments && (
                                    <div className="offer-comments mt-4">
                                        <div className="comments-label">
                                            <i className="fas fa-comment-alt me-2"></i> Comments:
                                        </div>
                                        <div className="comments-content">{selectedOffer.comments}</div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center p-4">
                                <i className="fas fa-exclamation-circle text-warning display-4"></i>
                                <p className="mt-3">No offer details available.</p>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowOfferModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => setShowOfferModal(false)}>
                            Got it
                        </Button>                    </Modal.Footer>
                </Modal>

                {/* Agent Modal */}
                <Modal
                    show={showAgentModal}
                    onHide={() => setShowAgentModal(false)}
                    centered
                    className="agent-details-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <i className="fas fa-user-tie me-2"></i>
                            Agent Profile
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {agentLoading ? (
                            <div className="text-center p-4">
                                <Spinner animation="border" variant="primary" />
                                <p className="mt-3">Loading agent details...</p>
                            </div>
                        ) : selectedAgent ? (
                            <div className="agent-details-content">
                                <div className="agent-profile-header">
                                    <div className="agent-profile-avatar">
                                        {selectedAgent.image ? (
                                            <img
                                                src={`https://apitourism.today.alayaarts.com/uploads/users/${selectedAgent.image}`}
                                                alt={`Agent ${selectedAgent.name}`}
                                                className="agent-profile-image"
                                            />
                                        ) : (
                                            <i className="fas fa-user-circle"></i>
                                        )}
                                    </div>
                                    <div className="agent-profile-info">
                                        <h3 className="agent-profile-name">{selectedAgent.name}</h3>
                                        <p className="agent-profile-role">{selectedAgent.roles?.role_name || "Real Estate Agent"}</p>
                                    </div>
                                </div>

                                <div className="agent-contact-info mt-4">
                                    <h4 className="section-title">
                                        <i className="fas fa-address-card me-2"></i>
                                        Contact Information
                                    </h4>
                                    <div className="contact-grid">
                                        {selectedAgent.email && (
                                            <div className="contact-item">
                                                <div className="contact-icon">
                                                    <i className="fas fa-envelope"></i>
                                                </div>
                                                <div className="contact-detail">
                                                    <span className="contact-label">Email:</span>
                                                    <a href={`mailto:${selectedAgent.email}`} className="contact-value">
                                                        {selectedAgent.email}
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {selectedAgent.phone && (
                                            <div className="contact-item">
                                                <div className="contact-icon">
                                                    <i className="fas fa-phone"></i>
                                                </div>
                                                <div className="contact-detail">
                                                    <span className="contact-label">Phone:</span>
                                                    <a href={`tel:${selectedAgent.phone}`} className="contact-value">
                                                        {selectedAgent.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {selectedAgent.bio && (
                                    <div className="agent-bio mt-4">
                                        <h4 className="section-title">
                                            <i className="fas fa-user-tag me-2"></i>
                                            About
                                        </h4>
                                        <p className="bio-content">{selectedAgent.bio}</p>
                                    </div>
                                )}

                                <div className="agent-cta-buttons mt-4">
                                    {selectedAgent.email && (
                                        <Button
                                            variant="primary"
                                            className="contact-agent-btn"
                                            onClick={() => window.location.href = `mailto:${selectedAgent.email}`}
                                        >
                                            <i className="fas fa-envelope me-2"></i>
                                            Contact Agent
                                        </Button>
                                    )}

                                    {selectedAgent.phone && (
                                        <Button
                                            variant="outline-primary"
                                            className="call-agent-btn"
                                            onClick={() => window.location.href = `tel:${selectedAgent.phone}`}
                                        >
                                            <i className="fas fa-phone me-2"></i>
                                            Call Agent
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center p-4">
                                <i className="fas fa-exclamation-circle text-warning display-4"></i>
                                <p className="mt-3">No agent details available.</p>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAgentModal(false)}>
                            Close
                        </Button>                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default MainCards;
