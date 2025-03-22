import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const RentByCity = () => {
  // State to manage city data from the API
  const [cities, setCities] = useState([]);
  // State to manage visibility of the second half of the cities
  const [showMore, setShowMore] = useState(false);

  // Fetch cities from the API when the component mounts
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://api.biznetusa.com/api/get-searchbyrent"
        );
        setCities(response.data.rent_by_city); // Set the cities from the 'home_by_city' array
      } catch (error) {}
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
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Browse rental properties by city. Find your perfect rental home, apartment, or condo in top cities across the country."
        />
        <meta
          name="keywords"
          content="rental properties, rent by city, apartments for rent, homes for rent, condos, rental homes"
        />
        <meta
          property="og:title"
          content="Rent by City - Find Your Next Rental Property"
        />
        <meta
          property="og:description"
          content="Explore rental properties by city. Search by location, budget, and preferences to find your ideal rental."
        />
        <meta
          property="og:image"
          content="https://example.com/assets/images/rent_by_city_image.jpg" // Replace with the actual image URL
        />
        <meta property="og:image:alt" content="Rent by City Image" />
        <meta
          name="twitter:title"
          content="Rent by City - Find Your Next Rental Property"
        />
        <meta
          name="twitter:description"
          content="Explore rental properties by city. Search by location, budget, and preferences to find your ideal rental."
        />
        <meta
          name="twitter:image"
          content="https://example.com/assets/images/rent_by_city_image.jpg" // Replace with the actual image URL
        />
        <title>Rent by City - Find Your Next Rental Property</title>
      </Helmet>
      <div className="container">
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 p-5">
          {/* First half (Always visible) */}
          {firstHalf.map((city, index) => (
            <div className="col my-1" key={city.id}>
              <Link
                to={`/ProductMainDetail?RentByCityId=${city.id}`}
                className="text-dark text-decoration-none"
              >
                {city.title}
              </Link>
            </div>
          ))}

          {/* Second half (Initially hidden, shown when 'showMore' is true) */}
          {showMore &&
            secondHalf.map((city, index) => (
              <div className="col my-1" key={city.id}>
                <Link
                  to={`/ProductMainDetail?RentByCityId=${city.id}`}
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

export default RentByCity;
