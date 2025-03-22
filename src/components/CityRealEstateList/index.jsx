import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const CityRealEstateList = () => {
  // State to manage city data from the API
  const [cities, setCities] = useState([]);
  // State to manage visibility of the second half of the cities
  const [showMore, setShowMore] = useState(false);

  // Fetch cities from the API when the component mounts
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("https://api.biznetusa.com/api/get-searchbyhome");
        setCities(response.data.home_by_city); // Set the cities from the 'home_by_city' array
      } catch (error) {
      }
    };
    fetchCities();
  }, []);

  // Toggle between showing more or less
  const handleToggle = () => {
    setShowMore(!showMore);
  };

  // Split cities into two halves
  const firstHalf = cities.slice(0, 10); // First 10 cities
  const secondHalf = cities.slice(10); // Remaining cities

  return (
    <> <Helmet>
    <title>Real Estate Listings by City</title>
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
      content="https://via.placeholder.com/1200x630?text=Real+Estate+Listings+by+City" // Placeholder image URL
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
      content="https://via.placeholder.com/1200x630?text=Real+Estate+Listings+by+City" // Placeholder image URL
    />
  </Helmet>
    <div className="container">
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
        {/* First half (Always visible) */}
        {firstHalf.map((city, index) => (
          <div className="col my-1" key={city.id}>
            <Link
              to={`/ProductMainDetail?cityId=${city.id}`} // Passing city.id as a query parameter
              className="text-dark text-decoration-none"
            >
              {city.title}
            </Link>
          </div>
        ))}

        {/* Second half (Initially hidden, shown when 'showMore' is true) */}
        {showMore && secondHalf.map((city, index) => (
          <div className="col my-1" key={city.id}>
            <Link
              to={`/ProductMainDetail?cityId=${city.id}`} // Passing city.id as a query parameter
              className="text-dark text-decoration-none"
            >
              {city.title}
            </Link>
          </div>
        ))}
      </div>

      {/* Show more/less button */}
      <button className="btn show_more_layoutSet mt-4" onClick={handleToggle}>
        {showMore ? "Show less" : "Show more"}
      </button>
    </div>
    </>
  );
};

export default CityRealEstateList;
