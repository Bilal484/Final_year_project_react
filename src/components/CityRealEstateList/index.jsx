import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./CityRealEstateList.css";

const CityRealEstateList = () => {
  // State to manage city data from the API
  const [cities, setCities] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to manage error status
  const [error, setError] = useState(null);
  // State to manage visibility of the second half of the cities
  const [showMore, setShowMore] = useState(false);
  // State to track animated items
  const [animated, setAnimated] = useState({});
  
  // Reference for animation observer
  const citiesRef = useRef(null);

  // Fetch cities from the API when the component mounts
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://apitourism.today.alayaarts.com/api/get-searchbyhome");
        setCities(response.data.home_by_city || []); // Set the cities from the 'home_by_city' array
        setError(null);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setError("Failed to load cities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCities();
  }, []);
  
  // Set up intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(prev => ({
              ...prev,
              [entry.target.dataset.id]: true
            }));
          }
        });
      },
      { threshold: 0.2 }
    );
    
    // Observe all city items
    if (citiesRef.current) {
      const items = citiesRef.current.querySelectorAll('.city-item');
      items.forEach(item => {
        observer.observe(item);
      });
    }
    
    return () => observer.disconnect();
  }, [cities, showMore]);

  // Toggle between showing more or less
  const handleToggle = () => {
    setShowMore(!showMore);
  };

  // Split cities into two halves
  const firstHalf = cities.slice(0, 10); // First 10 cities
  const secondHalf = cities.slice(10); // Remaining cities

  return (
    <>
      <Helmet>
        <title>Real Estate Listings by City | UrbanCraft</title>
        <meta
          name="description"
          content="Explore a variety of real estate listings across different cities. Find homes and properties in popular locations."
        />
        <meta
          name="keywords"
          content="real estate, homes for sale, property listings, cities, homes, buy home"
        />
        <meta property="og:title" content="Real Estate Listings by City" />
        <meta
          property="og:description"
          content="Browse real estate listings by city. Find homes, condos, and more in top cities across the country."
        />
        <meta
          property="og:image"
          content="https://via.placeholder.com/1200x630?text=Real+Estate+Listings+by+City"
        />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Real Estate Listings by City" />
        <meta
          name="twitter:description"
          content="Explore real estate listings in various cities. Find the perfect home in your desired location."
        />
        <meta
          name="twitter:image"
          content="https://via.placeholder.com/1200x630?text=Real+Estate+Listings+by+City"
        />
      </Helmet>
      
      <section className="city-listings-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Browse by City</h2>
            <p className="section-subtitle">Explore real estate listings in popular cities across the country</p>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading cities...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <i className="fas fa-exclamation-triangle"></i>
              <p>{error}</p>
              <button className="retry-button" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          ) : (
            <div className="city-list-container" ref={citiesRef}>
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-3">
                {/* First half (Always visible) */}
                {firstHalf.map((city, index) => (
                  <div className="col" key={city.id}>
                    <Link
                      to={`/ProductMainDetail?cityId=${city.id}`}
                      className={`city-item ${animated[city.id] ? 'animate' : ''}`}
                      data-id={city.id}
                      style={{"--animation-order": index}}
                    >
                      <span className="city-icon">
                        <i className="fas fa-city"></i>
                      </span>
                      <span className="city-name">{city.title}</span>
                      <span className="city-arrow">
                        <i className="fas fa-chevron-right"></i>
                      </span>
                    </Link>
                  </div>
                ))}

                {/* Second half (Initially hidden, shown when 'showMore' is true) */}
                {showMore && secondHalf.map((city, index) => (
                  <div className="col" key={city.id}>
                    <Link
                      to={`/ProductMainDetail?cityId=${city.id}`}
                      className={`city-item ${animated[city.id] ? 'animate' : ''}`}
                      data-id={city.id}
                      style={{"--animation-order": index + 10}}
                    >
                      <span className="city-icon">
                        <i className="fas fa-city"></i>
                      </span>
                      <span className="city-name">{city.title}</span>
                      <span className="city-arrow">
                        <i className="fas fa-chevron-right"></i>
                      </span>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Show more/less button */}
              {cities.length > 10 && (
                <div className="toggle-container">
                  <button className="toggle-button" onClick={handleToggle}>
                    {showMore ? (
                      <>
                        <span>Show Less</span>
                        <i className="fas fa-chevron-up"></i>
                      </>
                    ) : (
                      <>
                        <span>Show More Cities</span>
                        <i className="fas fa-chevron-down"></i>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CityRealEstateList;
