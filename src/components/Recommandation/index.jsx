import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../FavoriteButton";
import ShareListingModal from "../SharePopup";
import './recommandation.css';
import { Helmet } from "react-helmet";
import axios from "axios";

const Recommendations = () => {
    const [recommendedProperties, setRecommendedProperties] = useState([]);
    const [shownRecommendations, setShownRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMap, setShowMap] = useState({});
    const [carouselIndex, setCarouselIndex] = useState({});
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedProductSlug, setSelectedProductSlug] = useState(null);
    const navigate = useNavigate();
    const numberOfProperties = 3;

    useEffect(() => {
        const fetchRecommendedProperties = async () => {
            try {
                const [productResponse, productImageResponse] = await Promise.all([
                    fetch("https://apitourism.today.alayaarts.com/api/get-products"),
                    fetch("https://apitourism.today.alayaarts.com/api/get-productimages"),
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

                    setRecommendedProperties(mergedProperties);
                    setShownRecommendations(mergedProperties.slice(0, 6)); // Display initial set
                } else {
                    throw new Error("Failed to load product or image data");
                }
            } catch (err) {
                setError(err.message || "An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendedProperties();
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

    const increaseShown = () => {
        if (shownRecommendations.length + numberOfProperties < recommendedProperties.length) {
            setShownRecommendations(
                recommendedProperties.slice(0, shownRecommendations.length + numberOfProperties)
            );
        } else if (shownRecommendations.length === recommendedProperties.length) {
            setShownRecommendations(recommendedProperties.slice(0, 6));
        } else {
            setShownRecommendations(recommendedProperties.slice(0, recommendedProperties.length));
        }
    };

    // if (loading) return <p className="text-center">Loading recommendations...</p>;
    // if (error) return <p className="text-center">Error: {error}</p>;

    return (
        <>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta
                    name="description"
                    content="Browse through a collection of recommended properties with detailed images, prices, and location information."
                />
                <meta
                    name="keywords"
                    content="real estate, properties, homes for sale, recommended properties, property listings"
                />
                <meta
                    property="og:title"
                    content="Recommended Properties - Find Your Ideal Home"
                />
                <meta
                    property="og:description"
                    content="Discover recommended properties based on your preferences and needs, with detailed images and location information."
                />
                <meta
                    property="og:image"
                    content="https://example.com/path-to-your-image.jpg" // Replace with actual image URL
                />
                <meta property="og:image:alt" content="Recommended Properties" />
                <meta name="twitter:title" content="Recommended Properties - Find Your Ideal Home" />
                <meta
                    name="twitter:description"
                    content="Browse recommended properties with detailed images, pricing, and location information."
                />
                <meta
                    name="twitter:image"
                    content="https://example.com/path-to-your-image.jpg" // Replace with actual image URL
                />
                <title>Recommended Properties - Find Your Ideal Home</title>
            </Helmet>
            <div className="container py-4 mt-5">
                <h2 className="h3 fw-bold">Recommended Properties</h2>
                <div className="row">
                    {shownRecommendations.map((property) => (
                        <div className="col-sm-6 home_cards col-lg-4 mb-4" key={property.id}>
                            <div className="card position-relative">
                                {!showMap[property.id] ? (
                                    <div
                                        id={`carouselRecommendation${property.id}`}
                                        className="carousel slide"
                                        data-bs-ride="carousel"
                                    >
                                        <div className="carousel-inner position-relative">
                                            {property.images.length > 0 ? (
                                                property.images.map((image, index) => (
                                                    <div
                                                        className={`carousel-item position-relative ${index === (carouselIndex[property.id] || 0) ? "active" : ""
                                                            }`}
                                                        key={index}
                                                    >
                                                        <div className="position-absolute end-0 bottom-0 mx-4 mb-3 px-2 py-1 bg-dark opacity-75 rounded-circle">
                                                            <i
                                                                className={`fa fa-map fs-6 text-white ${showMap[property.id] ? "text-primary" : "text-secondary"
                                                                    }`}
                                                                role="button"
                                                                aria-label="Show Map"
                                                                onClick={() => toggleMapView(property.id)}
                                                            />
                                                        </div>
                                                        <img
                                                            onClick={() => navigate(`/ProductDetail/${property.id}`)}
                                                            src={`https://apitourism.today.alayaarts.com/uploads/products/${image}`}
                                                            alt={`Property ${property.id} view ${index + 1}`}
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
                                                        style={{ height: "250px", objectFit: "cover" }}
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
                                                            (carouselIndex[property.id] || 0) + 1 >= property.images.length
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
                                                className={`fa fa-image fs-6 text-white ${!showMap[property.id] ? "text-primary" : "text-secondary"
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
                                            title={`Map location for ${property.location}`}
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
                                            <FavoriteButton userId={property.user_id} productId={property.id} />
                                        </div>
                                    </div>
                                    <p className="small text-dark">{property.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        className={`btn p-0 mt-4 mx-auto  ${recommendedProperties.length <= 6 && "d-none"
                            }`}
                        onClick={increaseShown}
                        style={{
                            height: "40px",
                            width: "150px",
                        }}
                    >
                        {shownRecommendations.length === recommendedProperties.length
                            ? "Show Less"
                            : "Show more"}
                    </button>
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

export default Recommendations;
