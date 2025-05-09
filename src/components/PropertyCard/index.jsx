import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './PropertyCard.css';

const PropertyCard = ({ id, price, images, beds, baths, area, address, description, title }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showFullAddress, setShowFullAddress] = useState(false);

    // Safely get the first image or use a placeholder
    const firstImage = images && images.length > 0 ? images[0] : 'https://via.placeholder.com/400x300?text=No+Image+Available';

    // Format price with commas
    const formattedPrice = Number(price).toLocaleString('en-US');

    // Truncate address if too long
    const shortAddress = address && address.length > 30 ? `${address.substring(0, 30)}...` : address;

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    // Ensure all meta values are strings to prevent React Helmet errors
    const safeDescription = description ? String(description) : '';
    const safeTitle = title ? String(title) : 'Property Listing';
    const safeFirstImage = firstImage ? String(firstImage) : '';

    return (
        <>
            <Helmet>
                <meta name="description" content={safeDescription || "Property details and listing"} />
                <meta name="keywords" content={`real estate, ${safeTitle}, homes for sale, house for rent`} />
                <meta property="og:title" content={safeTitle} />
                <meta property="og:description" content={safeDescription || "Explore this property listing."} />
                {safeFirstImage && <meta property="og:image" content={safeFirstImage} />}
                <meta property="og:image:alt" content={`Image of property ${safeTitle}`} />
                <meta name="twitter:title" content={safeTitle} />
                <meta name="twitter:description" content={safeDescription || "Explore this property listing."} />
                {safeFirstImage && <meta name="twitter:image" content={safeFirstImage} />}
            </Helmet>

            <div
                className={`col-sm-6 col-lg-4 mb-4 uc-property-card-wrapper ${isVisible ? 'uc-visible' : ''}`}
                ref={cardRef}
            >
                <div className="uc-property-card">
                    {/* Property Image Gallery */}
                    <div className="uc-property-media">
                        <div id={`carouselProperty${id}`} className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner uc-carousel-inner">
                                {images && images.length > 0 ? (
                                    images.map((img, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                            <img
                                                src={String(img)}
                                                alt={`${safeTitle} - Image ${index + 1}`}
                                                className="uc-property-img"
                                                loading="lazy"
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="carousel-item active">
                                        <img
                                            src="https://via.placeholder.com/400x300?text=No+Image+Available"
                                            alt="No image available"
                                            className="uc-property-img"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Carousel Navigation */}
                            {images && images.length > 1 && (
                                <>
                                    <button
                                        className="carousel-control-prev uc-carousel-control"
                                        type="button"
                                        data-bs-target={`#carouselProperty${id}`}
                                        data-bs-slide="prev"
                                    >
                                        <span className="uc-control-icon">
                                            <i className="fas fa-chevron-left"></i>
                                        </span>
                                    </button>
                                    <button
                                        className="carousel-control-next uc-carousel-control"
                                        type="button"
                                        data-bs-target={`#carouselProperty${id}`}
                                        data-bs-slide="next"
                                    >
                                        <span className="uc-control-icon">
                                            <i className="fas fa-chevron-right"></i>
                                        </span>
                                    </button>
                                </>
                            )}

                            {/* Image count indicator */}
                            {images && images.length > 0 && (
                                <div className="uc-image-count">
                                    <i className="fas fa-camera"></i> {images.length}
                                </div>
                            )}
                        </div>

                        {/* Property Status Badge */}
                        <div className="uc-property-status">
                            <span>For Sale</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="uc-property-actions">
                            <button
                                className="uc-action-btn uc-share-btn"
                                title="Share this property"
                                aria-label="Share property"
                            >
                                <i className="fas fa-share-alt"></i>
                            </button>
                            <button
                                className={`uc-action-btn uc-favorite-btn ${isFavorite ? 'uc-favorited' : ''}`}
                                onClick={() => setIsFavorite(!isFavorite)}
                                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            >
                                <i className={isFavorite ? "fas fa-heart" : "far fa-heart"}></i>
                            </button>
                        </div>
                    </div>

                    {/* Property Details */}
                    <div className="uc-property-content">
                        <div className="uc-property-price">
                            <h3>${formattedPrice}</h3>
                        </div>

                        <div className="uc-property-details">
                            <div className="uc-detail">
                                <i className="fas fa-bed"></i>
                                <span>{beds} {beds === 1 ? 'Bed' : 'Beds'}</span>
                            </div>
                            <div className="uc-detail">
                                <i className="fas fa-bath"></i>
                                <span>{baths} {baths === 1 ? 'Bath' : 'Baths'}</span>
                            </div>
                            <div className="uc-detail">
                                <i className="fas fa-ruler-combined"></i>
                                <span>{area ? area.toLocaleString() : 0} sq ft</span>
                            </div>
                        </div>

                        <h4 className="uc-property-title">{safeTitle}</h4>

                        <div
                            className="uc-property-address"
                            onClick={() => setShowFullAddress(!showFullAddress)}
                        >
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{showFullAddress ? address : shortAddress}</span>
                        </div>

                        <button className="uc-view-details-btn">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PropertyCard;