import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomeBannerCard.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

const HomeBannerCard = ({ isLarge = false }) => {
    const [banners, setBanners] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const imagePath = 'https://api.biznetusa.com/uploads/banners/';

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get('https://api.biznetusa.com/api/get-banners');
                setBanners(response.data.banners);
            } catch (error) {
                console.error("Error fetching banners", error);
            }
        };
        fetchBanners();
        
        // Set animation visibility after component mounts
        setTimeout(() => {
            setIsVisible(true);
        }, 100);
    }, []);

    const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    // Determine the size class based on isLarge prop
    const bannerSizeClass = isLarge ? "banner-large" : "banner-medium";

    return (
        <>
            <Helmet>
                <title>Home Banner Carousel - UrbanCraft REAL ESTATE</title>
                <meta
                    name="description"
                    content="Explore UrbanCraft REAL ESTATE's banner carousel showcasing top properties with detailed descriptions and prices. Dynamic and user-friendly design."
                />
                <meta
                    name="keywords"
                    content="UrbanCraft REAL ESTATE, Banner Carousel, Property Listings, Dynamic Banners"
                />
                <meta property="og:title" content="Home Banner Carousel - UrbanCraft REAL ESTATE" />
                <meta
                    property="og:description"
                    content="Discover featured properties through our Home Banner Carousel. Seamless navigation with high-quality images and property details."
                />
                <meta
                    property="og:image"
                    content={banners.length > 0 && `${imagePath}${banners[0]?.image}`}
                />
                <meta name="author" content="UrbanCraft REAL ESTATE Team" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            
            <div className={`banner-card-container  ${isVisible ? 'visible' : ''}`}>
                {banners.length > 0 && (
                    <div className="property-badge">
                        <i className="badge-icon fas fa-home"></i>
                        Featured
                    </div>
                )}
                
                {banners.length > 0 && banners[activeIndex]?.price && (
                    <div className="price-tag">
                        {banners[activeIndex].price}
                    </div>
                )}
                
                <Carousel 
                    activeIndex={activeIndex}
                    onSelect={handleSelect}
                    indicators={true}
                    controls={true}
                    interval={5000}
                    className="banner-carousel"
                >
                    {banners.length > 0 ? (
                        banners.map((banner, index) => (
                            <Carousel.Item key={banner.id} className={bannerSizeClass}>
                                <img
                                    src={banner.image ? `${imagePath}${banner.image}` : 'https://via.placeholder.com/800x600?text=Property+Image'}
                                    alt={banner.title || "Property Banner"}
                                    className="banner-image"
                                />
                                
                                <div className="banner-overlay">
                                    <div className="banner-content">
                                        <h2 className="banner-title">
                                            {banner.title || "Featured Property"}
                                        </h2>
                                        <p className="banner-description">
                                            {banner.desc || "Explore this beautiful property with amazing features."}
                                        </p>
                                        <Link to={banner.link || "/property-details"} className="banner-btn">
                                            View Details
                                            <span className="icon">
                                                <i className="fas fa-arrow-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </Carousel.Item>
                        ))
                    ) : (
                        <Carousel.Item className={bannerSizeClass}>
                            <img 
                                src="https://via.placeholder.com/800x600?text=No+Properties+Available"
                                alt="No banners available"
                                className="banner-image"
                            />
                            <div className="banner-overlay">
                                <div className="banner-content">
                                    <h2 className="banner-title">No Properties Available</h2>
                                    <p className="banner-description">Check back soon for new listings.</p>
                                </div>
                            </div>
                        </Carousel.Item>
                    )}
                </Carousel>
            </div>
        </>
    );
};

export default HomeBannerCard;
