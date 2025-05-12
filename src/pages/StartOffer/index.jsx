import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import "./StartOffer.css"; // Custom CSS file for styling
import Header from "../../components/header";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet"; // Import Helmet for meta tags
const StartOffer = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Store the user's search input
  const [suggestions, setSuggestions] = useState([]); // Store product suggestions
  const [loading, setLoading] = useState(false); // Manage loading state
  const [error, setError] = useState(""); // Manage error state

  const imagePath = "https://apitourism.today.alayaarts.com/uploads/products/";
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch products from the API based on user query
  const fetchProducts = async (query) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`https://apitourism.today.alayaarts.com/api/getallproducts/${query}`);
      if (response.data && response.data.products.length > 0) {
        setSuggestions(response.data.products); // Update suggestions with product data
      } else {
        setSuggestions([]); // Handle no suggestions
      }
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
    }

    setLoading(false);
  };

  // Handle user input and fetch products when query changes
  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Fetch products dynamically based on user input
    if (query.length > 2) {
      fetchProducts(query); // Call the API with the user's query
    } else {
      setSuggestions([]); // Clear suggestions if query is too short
    }
  };

  const handleProductClick = (product) => {
    navigate('/Final-Offer', { state: { p_id: product.id } }); // Pass product.id as p_id
  };
  
  
  

  return (
    <>
    <Helmet>
        <title>Start an Offer | Biznet</title>
        <meta
          name="description"
          content="Find your perfect product and start an offer today on Biznet. Search for products by name or location, explore deals, and make your choice with ease."
        />
        <meta
          name="keywords"
          content="Biznet, Start an Offer, Real Estate, Products, Deals, Offers, Search"
        />
        <meta name="author" content="UrbanCraft REAL ESTATE" />
        <meta property="og:title" content="Start an Offer | Biznet" />
        <meta
          property="og:description"
          content="Discover products and make an offer seamlessly with Biznet. Browse through our listings and find the perfect deal for you."
        />
        <meta
          property="og:image"
          content="https://apitourism.today.alayaarts.com/uploads/default-thumbnail.jpg"
        />
        <meta property="og:url" content="https://apitourism.today.alayaarts.com/start-offer" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <div className="start-offer-container">
        <h1>Start an Offer</h1>
        <p>Hi! Find a product to get started.</p>
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Enter product name or location"
            value={searchQuery}
            onChange={handleSearchInput}
          />
          <button type="button" className="search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        {/* Display suggestions in a dropdown */}
        {searchQuery && suggestions.length > 0 && (
          <ul className="dropdown-suggestions">
            {suggestions.map((product) => (
              <li
                key={product.id}
                className="dropdown-item"
                onClick={() => handleProductClick(product)} // Redirect on product click
              >
                <div className="product-suggestion">
                  <img
                    src={`${imagePath}${product.images[0]?.image}`}
                    alt={product.title}
                    className="product-thumbnail"
                  />
                  <div className="product-details">
                    <p className="product-title">{product.title}</p>
                    <p className="product-location">{product.location}</p>
                    <p className="product-price">${product.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
      </div>
      <Footer />
    </>
  );
};

export default StartOffer;
