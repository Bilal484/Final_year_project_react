import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AppartementsRealEstate.css";
import { Helmet } from "react-helmet";

const AppartementsRealEstate = () => {
    // State to manage city data from the API
    const [Appartements, setAppartements] = useState([]);
    // State to manage visibility of the second half of the cities
    const [showMore, setShowMore] = useState(false);

    // Fetch cities from the API when the component mounts
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get("https://api.biznetusa.com/api/get-searchbyapartment");
                setAppartements(response.data.apartment_by_city); // Set the cities from the 'apartment_by_city' array
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
    const firstHalf = Appartements.slice(0, 10); // First 10 cities
    const secondHalf = Appartements.slice(10); // Remaining cities

    return (
        <>
        <Helmet>
        <title>Available Apartments in Various Cities - Find Your Dream Home</title>
        <meta
          name="description"
          content="Explore available apartments in various cities. Find your dream apartment in top cities with the best amenities and locations."
        />
        <meta
          name="keywords"
          content="apartments, real estate, city apartments, rent apartments, dream apartments, apartment listings"
        />
        <meta property="og:title" content="Available Apartments in Various Cities" />
        <meta
          property="og:description"
          content="Browse our listings of available apartments across cities. Discover your ideal apartment with the best features and locations."
        />
        <meta
          property="og:image"
          content="https://via.placeholder.com/1200x630?text=Available+Apartments"
        />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Available Apartments in Various Cities" />
        <meta
          name="twitter:description"
          content="Browse through available apartments in various cities. Find your next home with ease and convenience."
        />
        <meta
          name="twitter:image"
          content="https://via.placeholder.com/1200x630?text=Available+Apartments"
        />
      </Helmet>
        <div className="container">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
                {/* First half (Always visible) */}
                {firstHalf.map((Appartements, index) => (
                    <div className="col my-1" key={Appartements.id}>
                        <Link to={`/ProductMainDetail?appartmentId=${Appartements.id}`} className="text-dark text-decoration-none">
                            {Appartements.title}
                        </Link>
                    </div>
                ))}

                {/* Second half (Initially hidden, shown when 'showMore' is true) */}
                {showMore && secondHalf.map((Appartements, index) => (
                    <div className="col my-1" key={Appartements.id}>
                        <Link to={`/ProductMainDetail?appartmentId=${Appartements.id}`} className="text-dark text-decoration-none">
                            {Appartements.title}
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

export default AppartementsRealEstate;
