import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShareListingModal from "../SharePopup";
import FavoriteButton from "../FavoriteButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification, { useNotification } from "../../components/Notification";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const MainCards = () => {
    const [notification, showNotification] = useNotification(); // Destructure the returned values
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

    const navigate = useNavigate();
    const numberOfProperties = 3;

    // Retrieve userId from localStorage
    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
        }
    }, []);

    const handleSectionClick = (section) => {
        setActiveSection(section); // Update the active section
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
        } catch (err) { }
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
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        // Fetch all products regardless of login status
        fetchProductData();
    }, []);


    const handleSelect = (selectedIndex, propertyId) => {
        setCarouselIndex((prevState) => {
            return {
                ...prevState,
                [propertyId]: selectedIndex,
            };
        });
    };

    const toggleMapView = (propertyId) => {
        setShowMap((prevState) => {
            return {
                ...prevState,
                [propertyId]: !prevState?.[propertyId] || false,
            };
        });
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
        (() => {
            if (activeSection === "favorites") {
                if (!favoriteProperties) {
                    setFilteredProperties([]);
                } else {
                    setFilteredProperties(
                        properties.filter((property) =>
                            favoriteProperties.some((fav) => fav.id === property.id)
                        )
                    );
                    setShownProperties(
                        properties.filter((property) =>
                            favoriteProperties.some((fav) => fav.id === property.id)
                        )
                    );
                    // setShownProperties(filteredProperties.slice(0, 6));
                }
            } else if (activeSection === "sold") {
                if (!soldProperties) {
                    setFilteredProperties([]);
                } else {
                    setFilteredProperties(
                        properties.filter((property) =>
                            soldProperties.some((sold) => sold.id === property.id)
                        )
                    );
                    setShownProperties(
                        properties.filter((property) =>
                            soldProperties.some((sold) => sold.id === property.id)
                        )
                    );
                }
            } else if (activeSection === "new") {
                if (!recentProperties) {
                    setFilteredProperties([]);
                } else {
                    setFilteredProperties(
                        properties.filter((property) =>
                            recentProperties.some((recent) => recent.id === property.id)
                        )
                    );
                    setShownProperties(
                        properties.filter((property) =>
                            recentProperties.some((recent) => recent.id === property.id)
                        )
                    );
                }
            } else if (activeSection === "sales") {
                if (!salesProperties) {
                    setFilteredProperties([]);
                } else {
                    setFilteredProperties(
                        properties.filter((property) =>
                            salesProperties.some((sales) => sales.id === property.id)
                        )
                    );
                    setShownProperties(
                        properties.filter((property) =>
                            salesProperties.some((sales) => sales.id === property.id)
                        )
                    );
                }
            } else {
                setFilteredProperties(properties);
                setShownProperties(properties.slice(0, 6));
            }
        })();
    }, [activeSection]);

    const increaseShown = () => {
        if (
            shownProperties.length + numberOfProperties <
            filteredProperties.length
        ) {
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

    // if (loading) return <p className="text-center">Loading...</p>;
    // if (error) return <p className="text-center">Error: {error}</p>;

    return (
        <>
            <Helmet>
                <title>Main Cards - Property Listings</title>
                <meta
                    name="description"
                    content="Explore a wide range of properties including favorites, recent listings, sales, and sold properties."
                />
                <meta
                    name="keywords"
                    content="Properties, Real Estate, Listings, Favorites, Sales, Sold"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="Main Cards - Property Listings" />
                <meta
                    property="og:description"
                    content="Browse through categorized property listings for your needs."
                />
                <meta property="og:image" content="/placeholder.jpg" />
                <meta name="author" content="Your Company Name" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            {notification.message && <Notification {...notification} />}

            <div className="container py-4">
                <ToastContainer />
                <h1 className="h2 fw-bold">Feed</h1>
                <div className="d-flex feed_all_button flex-wrap gap-2 my-3">
                    {[
                        "all",
                        "favorites",
                        "new",
                        "open-house",
                        "insights",
                        "sales",
                        "sold",
                    ].map((section) => (
                        <button
                            key={section}
                            className={`btn ${activeSection === section
                                ? "btn-primary"
                                : "btn-outline-primary"
                                }`}
                            onClick={() => handleSectionClick(section)}
                            style={{
                                backgroundColor:
                                    activeSection === section ? "green" : "transparent",
                                color: activeSection === section ? "white" : "black",
                                border: "1px solid green",
                                textTransform: "capitalize",
                            }}
                        >
                            {section.replace(/-/g, " ")}
                        </button>
                    ))}
                </div>
                <div className="row">
                    {shownProperties.length === 0 && (
                        <h3 className="text-center mt-4">{`You have no ${activeSection} properties`}</h3>
                    )}
                    {shownProperties.map((property) => (
                        <div
                            className="col-sm-6 home_cards col-lg-4 mb-4"
                            key={property.id}
                        >
                            <div className="card position-relative">
                                {!showMap[property.id] ? (
                                    <div
                                        id={`carouselProperty${property.id}`}
                                        className="carousel slide"
                                        data-bs-ride="carousel"
                                    >
                                        <div className="carousel-inner position-relative">
                                            {property.images.length > 0 ? (
                                                property.images.map((image, index) => (
                                                    <div
                                                        className={`carousel-item position-relative ${index === (carouselIndex[property.id] || 0)
                                                            ? "active"
                                                            : ""
                                                            }`}
                                                        key={index}
                                                    >
                                                        <div className="position-absolute end-0 bottom-0 mx-4 mb-3 px-2 py-1 bg-dark opacity-75 rounded-circle">
                                                            <i
                                                                className={`fa fa-map fs-6 text-white ${showMap[property.id]
                                                                    ? "text-primary"
                                                                    : "text-secondary"
                                                                    }`}
                                                                role="button"
                                                                aria-label="Show Map"
                                                                onClick={() => toggleMapView(property.id)}
                                                            />
                                                        </div>
                                                        <img
                                                            onClick={() =>
                                                                navigate(`/ProductDetail/${property.id}`)
                                                            }
                                                            src={`https://api.biznetusa.com/uploads/products/${image}`}
                                                            alt={`Property ${property.id} Image ${index + 1}`}
                                                            className="d-block w-100"
                                                            style={{
                                                                height: "250px",
                                                                objectFit: "cover",
                                                                cursor: "pointer",
                                                            }}
                                                        />
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="carousel-item active">
                                                    <img
                                                        src="/placeholder.jpg"
                                                        alt="Placeholder"
                                                        className="d-block w-100"
                                                        style={{
                                                            height: "250px",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        {property.images.length > 1 && (
                                            <>
                                                <button
                                                    className="carousel-control-prev"
                                                    type="button"
                                                    onClick={() =>
                                                        handleSelect(
                                                            (carouselIndex[property.id] || 0) === 0
                                                                ? property.images.length - 1
                                                                : (carouselIndex[property.id] || 0) - 1,
                                                            property.id
                                                        )
                                                    }
                                                >
                                                    <span
                                                        className="carousel-control-prev-icon"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button
                                                    className="carousel-control-next"
                                                    type="button"
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
                                                    <span
                                                        className="carousel-control-next-icon"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div
                                        className="map-container position-relative"
                                        style={{ height: "250px" }}
                                    >
                                        <div className="position-absolute end-0 bottom-0 mx-4 mb-3 px-2 py-1 bg-dark opacity-75 rounded-circle">
                                            <i
                                                className={`fa fa-image fs-6 text-white ${!showMap[property.id]
                                                    ? "text-primary"
                                                    : "text-secondary"
                                                    }`}
                                                role="button"
                                                aria-label="Show Images"
                                                onClick={() => toggleMapView(property.id)}
                                            />
                                        </div>
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            style={{ border: 0 }}
                                            src={property.map_url}
                                            allowFullScreen
                                        />
                                    </div>
                                )}
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h3 className="h5 fw-bold text-dark">${Number(property.price).toLocaleString('en-GB')}</h3>
                                        <div>
                                            <i
                                                className="fa-solid fa-share"
                                                role="button"
                                                aria-label="Share"
                                                onClick={() => openShareModal(property.slug)}
                                            />
                                            <FavoriteButton userId={userId} productId={property.id} />
                                        </div>
                                    </div>
                                    <div className="gap-2 d-flex flex-row mb-3">
                                        <div className="fs-6 text-muted">
                                            <strong className="fs-6 text-dark me-2">
                                                {property?.overview_sales?.[0]?.beds || "N/A"}
                                            </strong>
                                            Beds
                                        </div>
                                        ||
                                        <div className="fs-6 text-muted">
                                            <strong className="fs-6 text-dark me-2">
                                                {property?.overview_sales?.[0]?.bath || "N/A"}
                                            </strong>
                                            Baths
                                        </div>
                                        ||
                                        <div className="fs-6 text-muted">
                                            <strong className="fs-6 text-dark me-2">
                                                {property?.overview_sales?.[0]?.sq_ft || "N/A"}
                                            </strong>
                                            Sq Ft
                                        </div>
                                    </div>
                                    <p className="small text-dark">{property.location}</p>
                                    {/* New Section for Chat and Phone Icons */}
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <div
                                            className="d-flex align-items-center"
                                        // onClick={() => handleOpenChat(property)}
                                        >
                                            <Link to="/Start-chat-with-znet">
                                                <i
                                                    className="fa-solid fa-comments text-primary me-2"
                                                    role="button"
                                                    aria-label="Chat"
                                                ></i>
                                                <span>Chat</span>
                                            </Link>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <i
                                                className="fa-solid fa-phone text-success me-2"
                                                role="button"
                                                aria-label="Phone"
                                            ></i>
                                            <span>Call</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        className={`btn show_more_layoutSet mt-4  mx-auto ${shownProperties.length >= filteredProperties.length
                            ? "d-none"
                            : ""
                            }`}
                        onClick={increaseShown}
                    >
                        {shownProperties.length >= filteredProperties.length
                            ? "Show Less"
                            : "Show More"}
                    </button>
                </div>
                <ShareListingModal
                    isOpen={showShareModal}
                    onClose={closeShareModal}
                    productSlug={selectedProductSlug}
                />
            </div>
        </>
    )
};

export default MainCards;
