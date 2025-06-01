import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StartOffer.css";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";

const StartOffer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offersLoading, setOffersLoading] = useState(false);
  const [error, setError] = useState("");
  const [getOffer, setGetOffer] = useState([]);
  const [offerProducts, setOfferProducts] = useState({});

  const imagePath = "https://apitourism.today.alayaarts.com/uploads/products/";
  const navigate = useNavigate();

  // Fetch products from the API based on user query
  const fetchProducts = async (query) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`https://apitourism.today.alayaarts.com/api/getallproducts/${query}`);
      if (response.data && response.data.products.length > 0) {
        setSuggestions(response.data.products);
      } else {
        setSuggestions([]);
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
      fetchProducts(query);
    } else {
      setSuggestions([]);
    }
  };

  const handleProductClick = (product) => {
    navigate('/Final-Offer', { state: { p_id: product.id } });
  };

  // Fetch offers when component mounts
  useEffect(() => {
    getOfferProduct();
  }, []);
  // Fetch products for each offer
  useEffect(() => {
    const fetchProductsForOffers = async () => {
      if (getOffer.length > 0) {
        setOffersLoading(true);
        const productMap = {};
        
        try {
          // Get unique product IDs
          const productIds = [...new Set(getOffer.map(offer => offer.p_id))];
          
          // Fetch all products in a single request
          const response = await axios.get("https://apitourism.today.alayaarts.com/api/get-products");
          
          if (response.data && response.data.status === 200) {
            // Filter products to only those with offers
            const productsWithOffers = response.data.products.filter(product => 
              productIds.includes(product.id.toString())
            );
            
            // Create a map of product ID to product data
            productsWithOffers.forEach(product => {
              productMap[product.id] = {
                ...product,
                // Format price to match the previous structure if needed
                price: product.price,
                title: product.title,
                location: product.location,
                desc: product.desc,
                images: product.images || []
              };
            });
            
            setOfferProducts(productMap);
          }
        } catch (error) {
          console.error("Error fetching products for offers:", error);
          setError("Failed to fetch product details for offers.");
        } finally {
          setOffersLoading(false);
        }
      }
    };
    
    fetchProductsForOffers();
  }, [getOffer]);

  const getOfferProduct = async () => {
    setOffersLoading(true);
    try {
      const response = await axios.get("https://apitourism.today.alayaarts.com/api/get-start-offer");
      if (response.data && response.data.status === 200 && response.data.start_an_offer.length > 0) {
        setGetOffer(response.data.start_an_offer);
      } else {
        setGetOffer([]);
      }
    } catch (error) {
      console.error("Error fetching offers:", error);
      setError("Failed to fetch offers. Please try again.");
    } finally {
      setOffersLoading(false);
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
                onClick={() => handleProductClick(product)}
              >
                <div className="product-suggestion">
                  <img
                    src={`${imagePath}${product.images[0]?.image}`}
                    alt={product.title}
                    className="product-thumbnail"
                  />
                  <div className="product-details">                    <p className="product-title">{product.title}</p>
                    <p className="product-location">{product.location}</p>
                    <p className="product-price">Rs {product.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Display offers with their products */}
        <div className="offers-section">
          <h2>Your Offers</h2>
          
          {offersLoading ? (
            <div className="offers-loading">
              <p>Loading offers...</p>
              <div className="spinner"></div>
            </div>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : getOffer.length > 0 ? (
            <div className="offers-grid">
              {getOffer.map(offer => {
                const product = offerProducts[offer.p_id];
                return (
                  <div key={offer.id} className="offer-card">
                    <div className="offer-header">
                      <h3>Offer #{offer.id}</h3>
                      <span className="offer-date">{formatDate(offer.created_at)}</span>
                    </div>
                      {product ? (
                      <div className="product-info-card">
                        <div className="product-image-wrapper">
                          {product.images && product.images.length > 0 ? (
                            <img 
                              src={`${imagePath}${product.images[0]?.image}`} 
                              alt={product.title} 
                              className="offer-product-image"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://apitourism.today.alayaarts.com/uploads/default-thumbnail.jpg";
                              }}
                            />
                          ) : (
                            <div className="no-image-placeholder">No Image</div>
                          )}
                          {product.overview_sales && product.overview_sales[0] && (
                            <div className="image-overlay-tag">
                              <i className="fa-solid fa-tag"></i> {product.overview_home_tags && product.overview_home_tags[0]?.tag_name ? product.overview_home_tags[0].tag_name.split(' ')[0] : 'Featured'}
                            </div>
                          )}
                        </div>
                        <div className="product-content">
                          <h4 className="product-title">{product.title || 'Unknown Product'}</h4>
                          <p className="product-location">
                            <i className="fa-solid fa-location-dot"></i> {product.location || 'Location not available'}
                          </p>
                          
                          <div className="product-price-container">
                            <div className="product-price">
                              <span className="price-label">Listing Price:</span>
                              <span className="price-value">Rs {product.price ? Number(product.price).toLocaleString() : 'N/A'}</span>
                            </div>
                            {product.overview_sales && product.overview_sales[0] && (
                              <div className="estimated-price">
                                <span className="est-label">Est. Monthly:</span>
                                <span className="est-value">Rs {product.overview_sales[0].est_price?.replace('$', '') || 'N/A'}</span>
                              </div>
                            )}
                          </div>
                          
                          {product.overview_sales && product.overview_sales[0] && (
                            <div className="property-specs">
                              <div className="spec-item">
                                <i className="fa-solid fa-bed"></i>
                                <span>{product.overview_sales[0].beds || '0'} Beds</span>
                              </div>
                              <div className="spec-item">
                                <i className="fa-solid fa-bath"></i>
                                <span>{product.overview_sales[0].bath || '0'} Baths</span>
                              </div>
                              <div className="spec-item">
                                <i className="fa-solid fa-ruler-combined"></i>
                                <span>{product.overview_sales[0].sq_ft || 'N/A'}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="no-product-info">
                        <p>Product information not available</p>
                      </div>
                    )}
                    
                    <div className="offer-details">                      <div className="offer-detail-item">
                        <span className="offer-label">Your Offer:</span>
                        <span className="offer-value offer-amount">Rs {parseInt(offer.how_much_you_offer).toLocaleString()}</span>
                      </div>
                      <div className="offer-detail-item">
                        <span className="offer-label">Plan on Buying:</span>
                        <span className="offer-value">{offer.plan_on_buying === "1" ? "Yes" : "No"}</span>
                      </div>
                      <div className="offer-detail-item">
                        <span className="offer-label">Tour in Person:</span>
                        <span className="offer-value">{offer.tour_this_home_in_person === "1" ? "Yes" : "No"}</span>
                      </div>
                      <div className="offer-detail-item">
                        <span className="offer-label">Contact Phone:</span>
                        <span className="offer-value">{offer.phone}</span>
                      </div>
                      
                      {offer.comments && (
                        <div className="offer-comments">
                          <p className="comments-label">Comments:</p>
                          <p className="comments-text">{offer.comments}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="offer-actions">                      <button className="view-details-btn" onClick={() => navigate(`/ProductDetail/${offer.p_id}`)}>
                        View Property Details
                      </button>
                      {/* <button className="modify-offer-btn" onClick={() => navigate('/Final-Offer', { state: { p_id: offer.p_id } })}>
                        Modify Offer
                      </button> */}
                    </div>
                  </div>
                );
              })}
            </div>          ) : (
            <div className="no-offers">
              <div className="no-offers-icon">
                <i className="fa-solid fa-house-circle-exclamation"></i>
              </div>
              <h3>No Offers Yet</h3>
              <p>You haven't made any offers yet. Use the search box above to find properties and make your first offer!</p>
              <button className="explore-btn" onClick={() => navigate('/Buy')}>
                Explore Properties
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StartOffer;
