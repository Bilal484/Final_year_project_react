import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetail.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/real estate _12.jpg";
import img2 from "../../assets/images/real estate _16.jpg";
import img3 from "../../assets/images/real estate _18.jpg";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import ProductDetailSidePortion from "../../components/ProductDetailSidePortion";
import { Row, Col, Card, Modal } from "react-bootstrap";
import CommentSection from "../../components/CommentSection";
import PaymentCalculator from "../../components/PaymentCalculator";
import MainCards from "../../components/MainCards";
import FavoriteButton from "../../components/FavoriteButton";
import ShareListingModal from "../../components/SharePopup";

const ProductDetail = () => {
  const { id } = useParams(); // Get the 'id' from URL params
  const [imagePath, setImagePth] = useState(
    "https://api.biznetusa.com/uploads/products/"
  );
  const [productData, setProductData] = useState(null); // State to hold product data
  const [loading, setLoading] = useState(true); // State for loading indication
  const [error, setError] = useState(null); // State for error handling
  const [currentImages, setCurrentImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState({});
  const [properties, setProperties] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedProductSlug, setSelectedProductSlug] = useState(null);
  const [showMap, setShowMap] = useState({});
  const [userId, setUserId] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const overviewRef = useRef(null);
  const neighborRef = useRef(null);
  const propertyRef = useRef(null);
  const saleRef = useRef(null);
  const climateRef = useRef(null);

  // Retrieve userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Handle scroll event to add shadow to nav on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        } else {
          throw new Error("Failed to load product or image data");
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  const handleSelect = (selectedIndex, propertyId) => {
    setCarouselIndex({ ...carouselIndex, [propertyId]: selectedIndex });
  };

  const toggleMapView = (propertyId) => {
    setShowMap((prevState) => ({
      ...prevState,
      [propertyId]: !prevState[propertyId],
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

  const handleImageClick = () => {
    setShowModal(true); // Show the modal
  };

  useEffect(() => {
    // Function to fetch the product data
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.biznetusa.com/api/get-product/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProductData(data.products); // Set the fetched data to state
        setImagePth(data.imagePath);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductData(); // Call the fetch function when component mounts
  }, [id]);

  useEffect(() => {
    // Automatically scroll the col-lg-8 content when scrolling on col-lg-4
    const fixedColumn = document.querySelector(".sec_scroll_section");
    const scrollableColumn = document.querySelector(".scroll_section");

    const handleScroll = (e) => {
      // Prevent the default scroll behavior of col-lg-4
      e.preventDefault();
      // Scroll the col-lg-8 instead when scrolling inside col-lg-4
      scrollableColumn.scrollTop += e.deltaY;
    };

    // Listen for the scroll event on col-lg-4
    if (fixedColumn) {
      fixedColumn.addEventListener("wheel", handleScroll);
    }

    return () => {
      // Clean up the event listener when the component unmounts
      if (fixedColumn) {
        fixedColumn.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  // Function to handle nav tab clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Format price with commas
  const formatPrice = (price) => {
    if (!price) return "N/A";
    return Number(price).toLocaleString('en-US');
  };

  // Format date for better display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h3>Loading property details...</h3>
          <p className="text-muted">Please wait while we gather the latest information</p>
        </div>
        <Footer />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Header />
        <div className="error-container">
          <i className="fas fa-exclamation-circle"></i>
          <h3>Unable to load property details</h3>
          <p>{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            <i className="fas fa-sync-alt me-2"></i>
            Try Again
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{productData?.title || 'Property Details'} | UrbanCraft Real Estate</title>
        <meta
          name="description"
          content={`${productData?.desc?.substring(0, 160) || 'Discover the features, specifications, and pricing of this exclusive property. Enhance your lifestyle with quality and innovation.'}`}
        />
        <meta
          name="keywords"
          content={`${productData?.location || ''}, Real Estate, Property, ${productData?.overview_sales?.[0]?.beds || ''} Bedroom, ${productData?.overview_sales?.[0]?.bath || ''} Bathroom`}
        />
        <meta property="og:title" content={`${productData?.title || 'Property Details'} | UrbanCraft Real Estate`} />
        <meta
          property="og:description"
          content={`${productData?.desc?.substring(0, 160) || 'Explore the detailed features and benefits of this property. Designed to meet your needs and exceed expectations.'}`}
        />
        <meta
          property="og:image"
          content={productData?.images?.length > 0 ? `${imagePath}/${productData?.images[0].image}` : "https://api.biznetusa.com/uploads/product-image-placeholder.jpg"}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Header />

      <main className="product-detail-container">
        {/* Sticky Navigation */}
        <nav className={`product-nav ${isScrolled ? 'shadow' : ''}`}>
          <div className="container d-flex flex-wrap justify-content-between">
            <ul>
              <li>
                <a
                  href="#overview"
                  className={activeTab === 'overview' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick('overview');
                  }}
                >
                  <i className="fas fa-home me-1"></i> Overview
                </a>
              </li>
              <li>
                <a
                  href="#neighbor"
                  className={activeTab === 'neighbor' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick('neighbor');
                  }}
                >
                  <i className="fas fa-map-marker-alt me-1"></i> Neighborhood
                </a>
              </li>
              <li>
                <a
                  href="#Property_section"
                  className={activeTab === 'Property_section' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick('Property_section');
                  }}
                >
                  <i className="fas fa-info-circle me-1"></i> Property details
                </a>
              </li>
              <li>
                <a
                  href="#Sale_section"
                  className={activeTab === 'Sale_section' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick('Sale_section');
                  }}
                >
                  <i className="fas fa-dollar-sign me-1"></i> Sales & tax history
                </a>
              </li>
              <li>
                <a
                  href="#Climate_scetion"
                  className={activeTab === 'Climate_scetion' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTabClick('Climate_scetion');
                  }}
                >
                  <i className="fas fa-cloud-sun me-1"></i> Climate
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  productData?.id && openShareModal(productData.slug);
                }}>
                  <i className="fas fa-share-alt me-2"></i>Share
                </a>
              </li>
              <li>
                {productData?.id && (
                  <FavoriteButton
                    userId={userId}
                    productId={productData.id}
                    asPill={true}
                  />
                )}
              </li>
            </ul>
          </div>
        </nav>

        {/* Property Gallery Section */}
        <div id="overview" ref={overviewRef} className="container-fluid mt-3 firs_top_portion animate-fadeIn">
          <div className="row g-4">
            {/* Map through the first three images */}
            {productData?.images.slice(0, 3).map((image, index) => (
              <div className="col-md-4 position-relative" key={image.id}>
                <div
                  className={`custom-card animate-fadeInUp delay-${index + 1}`}
                  onClick={handleImageClick}
                >
                  <img
                    src={`${imagePath}/${image.image}`}
                    alt={`Image ${index + 1} of ${productData.title || 'property'}`}
                  />
                  {index === 0 && (
                    <span className="tag-label">OPEN SUN, 12PM TO 2PM</span>
                  )}
                  {index === 2 && (
                    <div className="photo-btn">
                      <i className="fas fa-camera"></i>{" "}
                      {productData?.images.length} photos
                    </div>
                  )}
                  {index === 0 && (
                    <div className="custom-btn-group">
                      <button className="btn me-2">
                        <i className="fas fa-sitemap me-1"></i> Floor Plans
                      </button>
                      <button className="btn me-2">
                        <i className="fas fa-street-view me-1"></i> Street View
                      </button>
                      <button className="btn">
                        <i className="fas fa-pencil-alt me-1"></i> Redesign
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Modal to display all images */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            centered
            className="image-gallery-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>{productData?.title || 'Property Images'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row g-3">
                {productData?.images.length !== 0 &&
                  productData?.images.map((image, index) => (
                    <div className="col-md-4 col-6" key={image.id}>
                      <div className="position-relative image-gallery-item">
                        <img
                          src={`${imagePath}/${image.image}`}
                          alt={`Image ${index + 1} of ${productData.title || 'property'}`}
                          className="img-fluid rounded shadow"
                        />
                        <span className="image-number">{index + 1}/{productData?.images.length}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </Modal.Body>
          </Modal>
        </div>

        {/* Main Content Container */}
        <div className="container my-5">
          <div className="row Listing_Details">
            {/* Left Column: Listing Details */}
            <div className="col-lg-8 scroll_section">
              {/* Property Overview */}
              <div className="card mb-4 animate-fadeInUp">
                <div className="card-body p-5">
                  <h1 className="card-title mb-3">
                    {productData?.location || "Location not available"}
                  </h1>
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div className="price">
                      <h2 className="price-tag mb-2">
                        ${formatPrice(productData?.price)}
                      </h2>
                      <p className="text-muted">
                        Est. {productData?.overview_sales?.[0]?.est_price || "N/A"}/mo
                      </p>
                    </div>

                    <div className="property-detail-stats">
                      <div className="detail-stat">
                        <span className="stat-value">{productData?.overview_sales?.[0]?.beds || "N/A"}</span>
                        <span className="stat-label">Beds</span>
                      </div>
                      <div className="detail-stat">
                        <span className="stat-value">{productData?.overview_sales?.[0]?.bath || "N/A"}</span>
                        <span className="stat-label">Baths</span>
                      </div>
                      <div className="detail-stat">
                        <span className="stat-value">{productData?.overview_sales?.[0]?.sq_ft || "N/A"}</span>
                        <span className="stat-label">Sq Ft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rates Notification */}
              <div className="card mt-4 animate-fadeInUp delay-1">
                <div className="card-body feature-card d-flex align-items-center">
                  <div className="feature-icon me-3">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div>
                    <h3 className="h5 mb-2 fw-bold">Rates have dropped</h3>
                    <p className="mb-0">Lower rates mean lower monthly payments - now is a great time to buy!</p>
                  </div>
                </div>
              </div>

              {/* About This Home */}
              <div className="card mt-4 shadow-sm animate-fadeInUp delay-2">
                <div className="card-body p-5">
                  <h2 className="h4 fw-bold mb-4">About this home</h2>
                  <p className="lead">{productData?.desc}</p>

                  <div className="row mt-4">
                    {productData?.overview_home_tags?.map((tag, index) => (
                      <div
                        key={index}
                        className="col-12 col-md-6 col-lg-4 property-feature mb-3"
                      >
                        <div className="property-feature-icon">
                          <i className="fas fa-check"></i>
                        </div>
                        <span>{tag.tag_name}</span>
                      </div>
                    ))}
                  </div>

                  <hr className="my-4" />

                  <div className="listing-info">
                    <p className="mb-1">
                      <span className="fw-bold">Listed by:</span> Kristen Gebhart • Northrop Realty •
                      <a href="tel:3025392900" className="text-primary ms-1">
                        302-539-2900
                      </a>{" "}
                      <span className="badge bg-secondary">Broker</span>
                    </p>
                    <p>
                      <span className="fw-bold">Last checked:</span>{" "}
                      <span className="text-primary">2 minutes ago</span> (Sept
                      10, 2024 at 3:59pm)
                    </p>
                    <p className="text-muted small">
                      Source: BRIGHT MLS #MDWO2022874
                    </p>
                  </div>

                  {/* Agent Cards */}
                  <div className="mt-5">
                    <h3 className="section-heading">Property Agents</h3>
                    <div className="agent-cards-container">
                      <div className="agent-card-wrapper">
                        <div className="agent-card">
                          <Link
                            to={`/real-estate-agents/tiffeny-meyers`}
                            className="agent-card-link"
                          >
                            <div className="agent-card-image-container">
                              <img
                                src={img1}
                                alt="Tiffeny Meyers"
                                className="agent-image"
                              />
                              <div className="agent-card-badge">Lead Agent</div>
                            </div>
                            <div className="agent-card-content">
                              <h4 className="agent-name">Tiffeny Meyers</h4>
                              <div className="agent-rating">
                                <div className="stars">
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star-half-alt"></i>
                                </div>
                                <span className="rating-number">4.5</span>
                                <span className="rating-count">(24 reviews)</span>
                              </div>
                              <p className="agent-company">UrbanCraft Real Estate</p>
                              <div className="agent-stats">
                                <div className="agent-stat">
                                  <span className="stat-value">68</span>
                                  <span className="stat-label">Sales</span>
                                </div>
                                <div className="agent-stat">
                                  <span className="stat-value">12</span>
                                  <span className="stat-label">Years</span>
                                </div>
                                <div className="agent-stat">
                                  <span className="stat-value">98%</span>
                                  <span className="stat-label">Success</span>
                                </div>
                              </div>
                              <div className="agent-contact">
                                <button className="contact-btn">
                                  <i className="fas fa-phone-alt"></i>
                                </button>
                                <button className="contact-btn">
                                  <i className="fas fa-envelope"></i>
                                </button>
                                <button className="contact-btn">
                                  <i className="fas fa-comment"></i>
                                </button>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>

                      <div className="agent-card-wrapper">
                        <div className="agent-card">
                          <Link
                            to={`/real-estate-agents/daniel-csuk`}
                            className="agent-card-link"
                          >
                            <div className="agent-card-image-container">
                              <img
                                src={img2}
                                alt="Daniel Csuk"
                                className="agent-image"
                              />
                              <div className="agent-card-badge">Co-Agent</div>
                            </div>
                            <div className="agent-card-content">
                              <h4 className="agent-name">Daniel Csuk</h4>
                              <div className="agent-rating">
                                <div className="stars">
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="far fa-star"></i>
                                </div>
                                <span className="rating-number">4.0</span>
                                <span className="rating-count">(18 reviews)</span>
                              </div>
                              <p className="agent-company">UrbanCraft Real Estate</p>
                              <div className="agent-stats">
                                <div className="agent-stat">
                                  <span className="stat-value">42</span>
                                  <span className="stat-label">Sales</span>
                                </div>
                                <div className="agent-stat">
                                  <span className="stat-value">8</span>
                                  <span className="stat-label">Years</span>
                                </div>
                                <div className="agent-stat">
                                  <span className="stat-value">95%</span>
                                  <span className="stat-label">Success</span>
                                </div>
                              </div>
                              <div className="agent-contact">
                                <button className="contact-btn">
                                  <i className="fas fa-phone-alt"></i>
                                </button>
                                <button className="contact-btn">
                                  <i className="fas fa-envelope"></i>
                                </button>
                                <button className="contact-btn">
                                  <i className="fas fa-comment"></i>
                                </button>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rates Notification */}
                <div className="card mt-4 animate-fadeInUp delay-1">
                  <div className="card-body feature-card d-flex align-items-center">
                    <div className="feature-icon me-3">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div>
                      <h3 className="h5 mb-2 fw-bold">Rates have dropped</h3>
                      <p className="mb-0">Lower rates mean lower monthly payments - now is a great time to buy!</p>
                    </div>
                  </div>
                </div>

                {/* About This Home */}
                <div className="card mt-4 shadow-sm animate-fadeInUp delay-2">
                  <div className="card-body p-5">
                    <h2 className="h4 fw-bold mb-4">About this home</h2>
                    <p className="lead">{productData?.desc}</p>

                    <div className="row mt-4">
                      {productData?.overview_home_tags?.map((tag, index) => (
                        <div
                          key={index}
                          className="col-12 col-md-6 col-lg-4 property-feature mb-3"
                        >
                          <div className="property-feature-icon">
                            <i className="fas fa-check"></i>
                          </div>
                          <span>{tag.tag_name}</span>
                        </div>
                      ))}
                    </div>

                    <hr className="my-4" />

                    <div className="listing-info">
                      <p className="mb-1">
                        <span className="fw-bold">Listed by:</span> Kristen Gebhart • Northrop Realty •
                        <a href="tel:3025392900" className="text-primary ms-1">
                          302-539-2900
                        </a>{" "}
                        <span className="badge bg-secondary">Broker</span>
                      </p>
                      <p>
                        <span className="fw-bold">Last checked:</span>{" "}
                        <span className="text-primary">2 minutes ago</span> (Sept
                        10, 2024 at 3:59pm)
                      </p>
                      <p className="text-muted small">
                        Source: BRIGHT MLS #MDWO2022874
                      </p>
                    </div>

                    {/* Agent Cards */}
                    <div className="mt-5">
                      <h3 className="section-heading">Property Agents</h3>
                      <div className="agent-cards-container">
                        <div className="agent-card-wrapper">
                          <div className="agent-card">
                            <Link
                              to={`/real-estate-agents/tiffeny-meyers`}
                              className="agent-card-link"
                            >
                              <div className="agent-card-image-container">
                                <img
                                  src={img1}
                                  alt="Tiffeny Meyers"
                                  className="agent-image"
                                />
                                <div className="agent-card-badge">Lead Agent</div>
                              </div>
                              <div className="agent-card-content">
                                <h4 className="agent-name">Tiffeny Meyers</h4>
                                <div className="agent-rating">
                                  <div className="stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                  </div>
                                  <span className="rating-number">4.5</span>
                                  <span className="rating-count">(24 reviews)</span>
                                </div>
                                <p className="agent-company">UrbanCraft Real Estate</p>
                                <div className="agent-stats">
                                  <div className="agent-stat">
                                    <span className="stat-value">68</span>
                                    <span className="stat-label">Sales</span>
                                  </div>
                                  <div className="agent-stat">
                                    <span className="stat-value">12</span>
                                    <span className="stat-label">Years</span>
                                  </div>
                                  <div className="agent-stat">
                                    <span className="stat-value">98%</span>
                                    <span className="stat-label">Success</span>
                                  </div>
                                </div>
                                <div className="agent-contact">
                                  <button className="contact-btn">
                                    <i className="fas fa-phone-alt"></i>
                                  </button>
                                  <button className="contact-btn">
                                    <i className="fas fa-envelope"></i>
                                  </button>
                                  <button className="contact-btn">
                                    <i className="fas fa-comment"></i>
                                  </button>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>

                        <div className="agent-card-wrapper">
                          <div className="agent-card">
                            <Link
                              to={`/real-estate-agents/daniel-csuk`}
                              className="agent-card-link"
                            >
                              <div className="agent-card-image-container">
                                <img
                                  src={img2}
                                  alt="Daniel Csuk"
                                  className="agent-image"
                                />
                                <div className="agent-card-badge">Co-Agent</div>
                              </div>
                              <div className="agent-card-content">
                                <h4 className="agent-name">Daniel Csuk</h4>
                                <div className="agent-rating">
                                  <div className="stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="far fa-star"></i>
                                  </div>
                                  <span className="rating-number">4.0</span>
                                  <span className="rating-count">(18 reviews)</span>
                                </div>
                                <p className="agent-company">UrbanCraft Real Estate</p>
                                <div className="agent-stats">
                                  <div className="agent-stat">
                                    <span className="stat-value">42</span>
                                    <span className="stat-label">Sales</span>
                                  </div>
                                  <div className="agent-stat">
                                    <span className="stat-value">8</span>
                                    <span className="stat-label">Years</span>
                                  </div>
                                  <div className="agent-stat">
                                    <span className="stat-value">95%</span>
                                    <span className="stat-label">Success</span>
                                  </div>
                                </div>
                                <div className="agent-contact">
                                  <button className="contact-btn">
                                    <i className="fas fa-phone-alt"></i>
                                  </button>
                                  <button className="contact-btn">
                                    <i className="fas fa-envelope"></i>
                                  </button>
                                  <button className="contact-btn">
                                    <i className="fas fa-comment"></i>
                                  </button>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Property Location / Map */}
                  <div className="card mt-4 animate-fadeInUp delay-3">
                    <div className="card-body p-5">
                      <h2 className="h4 fw-bold mb-4">
                        <i className="fas fa-map-marked-alt me-2"></i>
                        Location & Commute
                      </h2>
                      <div className="map-container mx-auto rounded overflow-hidden shadow-sm mb-4">
                        <iframe
                          src={productData?.map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101.211242289797!2d-77.04403712352016!3d38.89767694583591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c6de5af6e45b%3A0xc2524522d4885d2a!2sWhite%20House!5e0!3m2!1sen!2sus!4v1651258481976!5m2!1sen!2sus"}
                          width="100%"
                          height="400"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Property Location Map"
                          className="rounded"
                        ></iframe>
                      </div>

                      <div className="row mt-4">
                        <div className="col-md-4">
                          <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center p-4">
                              <div className="mb-3">
                                <i className="fas fa-car text-primary fa-2x"></i>
                              </div>
                              <h3 className="h5 fw-bold mb-3">Driving</h3>
                              <p className="mb-0">15 min to downtown</p>
                              <p className="text-muted small">Light traffic conditions</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center p-4">
                              <div className="mb-3">
                                <i className="fas fa-bus text-primary fa-2x"></i>
                              </div>
                              <h3 className="h5 fw-bold mb-3">Public Transit</h3>
                              <p className="mb-0">25 min to downtown</p>
                              <p className="text-muted small">Bus line 42 nearby</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center p-4">
                              <div className="mb-3">
                                <i className="fas fa-walking text-primary fa-2x"></i>
                              </div>
                              <h3 className="h5 fw-bold mb-3">Walk Score</h3>
                              <p className="mb-0">63/100 - Somewhat Walkable</p>
                              <p className="text-muted small">Most errands require a car</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comment Section */}
                  <div className="comments-section animate-fadeInUp delay-4">
                    <h2 className="h4 fw-bold mb-4">
                      <i className="fas fa-comments me-2"></i>
                      Questions & Comments
                    </h2>
                    {productData?.id && <CommentSection p_id={productData.id} />}
                  </div>

                  {/* Payment calculator */}
                  <div className="animate-fadeInUp delay-4">
                    <PaymentCalculator />
                  </div>

                  {/* Additional Resources */}
                  <div className="card mt-4 animate-fadeInUp delay-5">
                    <div className="card-body p-5">
                      <h2 className="h4 fw-bold mb-4">
                        <i className="fas fa-tools me-2"></i>
                        Additional resources
                      </h2>
                      <div className="accordion" id="resourcesAccordion">
                        {/* Down payment assistance */}
                        <div className="accordion-item border-0">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="false"
                              aria-controls="collapseOne"
                            >
                              <i className="fas fa-hand-holding-usd me-2"></i>
                              Down payment assistance
                            </button>
                          </h2>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingOne"
                            data-bs-parent="#resourcesAccordion"
                          >
                            <div className="accordion-body">
                              <p>Programs may be available to help with your down payment.</p>
                              <a
                                href="#"
                                className="btn btn-sm btn-outline-primary"
                              >
                                Learn more about assistance programs
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Mortgage rates */}
                        <div className="accordion-item border-0">
                          <h2 className="accordion-header" id="headingTwo">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              <i className="fas fa-percentage me-2"></i>
                              Mortgage rates
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#resourcesAccordion"
                          >
                            <div className="accordion-body">
                              <p>Current mortgage rates for this property:</p>
                              <div className="table-responsive">
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                      <th>Loan Type</th>
                                      <th>Rate</th>
                                      <th>APR</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>30-Year Fixed</td>
                                      <td>5.25%</td>
                                      <td>5.45%</td>
                                    </tr>
                                    <tr>
                                      <td>15-Year Fixed</td>
                                      <td>4.50%</td>
                                      <td>4.75%</td>
                                    </tr>
                                    <tr>
                                      <td>5/1 ARM</td>
                                      <td>4.25%</td>
                                      <td>4.85%</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Electricity and solar */}
                        <div className="accordion-item border-0">
                          <h2 className="accordion-header" id="headingThree">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              <i className="fas fa-solar-panel me-2"></i>
                              Electricity and solar
                            </button>
                          </h2>
                          <div
                            id="collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingThree"
                            data-bs-parent="#resourcesAccordion"
                          >
                            <div className="accordion-body">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <p className="mb-1"><strong>Current electrical costs:</strong></p>
                                  <p className="mb-0">Est. $273/month</p>
                                </div>
                                <div>
                                  <p className="mb-1"><strong>With solar panels:</strong></p>
                                  <p className="mb-0 text-success">Est. $162/month (Save $111)</p>
                                </div>
                              </div>
                              <hr />
                              <a href="#" className="btn btn-sm btn-outline-primary">
                                Get solar quotes
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Internet */}
                        <div className="accordion-item border-0">
                          <h2 className="accordion-header" id="headingFour">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseFour"
                              aria-expanded="false"
                              aria-controls="collapseFour"
                            >
                              <i className="fas fa-wifi me-2"></i>
                              Internet
                            </button>
                          </h2>
                          <div
                            id="collapseFour"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingFour"
                            data-bs-parent="#resourcesAccordion"
                          >
                            <div className="accordion-body">
                              <p>Available internet providers for this location:</p>
                              <div className="d-flex align-items-center mb-2">
                                <img src="https://via.placeholder.com/50x30" alt="Xfinity" className="me-3" />
                                <div>
                                  <p className="mb-0"><strong>Xfinity</strong></p>
                                  <p className="mb-0 text-muted">Up to 1.2 Gbps</p>
                                </div>
                                <div className="ms-auto">
                                  <span className="badge bg-primary me-2">$69.99/mo</span>
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                <img src="https://via.placeholder.com/50x30" alt="Verizon" className="me-3" />
                                <div>
                                  <p className="mb-0"><strong>Verizon</strong></p>
                                  <p className="mb-0 text-muted">Up to 940 Mbps</p>
                                </div>
                                <div className="ms-auto">
                                  <span className="badge bg-primary">$89.99/mo</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="small text-muted mt-4">
                        Information provided by Down Payment Resource, RateUpdate.com, Wattbuy, and AllConnect
                      </p>
                    </div>
                  </div>

                  {/* Additional Services */}
                  <div className="card mt-4 animate-fadeInUp delay-5">
                    <div className="card-body p-5">
                      <h2 className="h4 fw-bold mb-4">
                        <i className="fas fa-concierge-bell me-2"></i>
                        Additional services
                      </h2>

                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h3 className="h5 fw-bold mb-1">Find internet deals in your area</h3>
                              <p className="text-muted mb-0">Get fast, reliable Wi-Fi at competitive prices</p>
                            </div>
                            <div className="text-end">
                              <div className="text-muted small">Advertisement</div>
                              <div className="fw-bold">xfinity</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h3 className="h5 fw-bold mb-1">Free Credit Report</h3>
                              <p className="text-muted mb-0">Check your credit score before applying for a mortgage</p>
                            </div>
                            <div className="text-end">
                              <div className="text-muted small">Advertisement</div>
                              <div className="fw-bold">credit sesame</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tour Schedule */}
                  <div className="card mt-4 animate-fadeInUp delay-5">
                    <div className="card-body p-5">
                      <h2 className="h4 fw-bold mb-4">
                        <i className="fas fa-calendar-alt me-2"></i>
                        Schedule a tour
                      </h2>

                      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                        <div>
                          <p className="fw-bold mb-1">No upcoming open houses</p>
                          <p className="text-muted mb-0">Schedule a private tour instead</p>
                        </div>
                        <button className="btn btn-primary">
                          <i className="fas fa-calendar-plus me-2"></i>Request Tour
                        </button>
                      </div>

                      <div className="card bg-light">
                        <div className="card-body p-4">
                          <h3 className="h5 fw-bold mb-3">Tour with an agent</h3>
                          <p className="text-muted mb-4">
                            Tour with UrbanCraft Real Estate and one of our experienced agents will be there to
                            answer all your questions and help you envision living in this home.
                          </p>

                          <div className="mb-4">
                            <h4 className="h6 fw-bold mb-3">Wednesday, Sep 11</h4>
                            <div className="d-flex flex-wrap gap-2">
                              <button className="btn btn-outline-primary">10:00 am</button>
                              <button className="btn btn-outline-primary">11:00 am</button>
                              <button className="btn btn-outline-primary">12:00 pm</button>
                              <button className="btn btn-outline-primary">1:00 pm</button>
                              <button className="btn btn-outline-primary">2:00 pm</button>
                            </div>
                          </div>

                          <div className="mb-3">
                            <h4 className="h6 fw-bold mb-3">Thursday, Sep 12</h4>
                            <div className="d-flex flex-wrap gap-2">
                              <button className="btn btn-outline-primary">9:00 am</button>
                              <button className="btn btn-outline-primary">10:30 am</button>
                              <button className="btn btn-outline-primary">1:00 pm</button>
                              <button className="btn btn-outline-primary">3:30 pm</button>
                            </div>
                          </div>

                          <div className="text-center mt-4">
                            <a href="#" className="fw-bold text-decoration-none">
                              <i className="fas fa-calendar-week me-2"></i>See more available times
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="Property_section" className="card p-5 rounded-lg mt-4">
                    <h2 className="h5 fw-bold mb-4">
                      Property details for 104-C 142nd St
                    </h2>
                    <div className="accordion" id="resourcesAccordion">
                      {/* Parking */}
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="false"
                            aria-controls="collapseOne"
                          >
                            <i className="fas fa-parking me-2" /> Parking
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingOne"
                          data-bs-parent="#resourcesAccordion"
                        >
                          <div className="accordion-body">
                            Programs may be available.{" "}
                            <a
                              href="#"
                              className="text-decoration-none text-info small"
                            >
                              Learn more
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* Interior */}
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header" id="headingTwo">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            <i className="fas fa-home me-2" /> Interior
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#resourcesAccordion"
                        >
                          <div className="accordion-body">
                            View current mortgage rates for this home.
                          </div>
                        </div>
                      </div>
                      {/* Exterior */}
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header" id="headingThree">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            <i className="fas fa-building me-2" /> Exterior
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingThree"
                          data-bs-parent="#resourcesAccordion"
                        >
                          <div className="accordion-body">
                            Est. $273/month, save $111 with rooftop solar.
                          </div>
                        </div>
                      </div>
                      {/* Financial */}
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header" id="headingFour">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFour"
                            aria-expanded="false"
                            aria-controls="collapseFour"
                          >
                            <i className="fas fa-dollar-sign me-2" /> Financial
                          </button>
                        </h2>
                        <div
                          id="collapseFour"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingFour"
                          data-bs-parent="#resourcesAccordion"
                        >
                          <div className="accordion-body">
                            You may need to disable ad blockers to view Internet
                            info.
                          </div>
                        </div>
                      </div>
                      {/* Location */}
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header" id="headingFive">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFive"
                            aria-expanded="false"
                            aria-controls="collapseFive"
                          >
                            <i className="fas fa-map-marker-alt me-2" /> Location
                          </button>
                        </h2>
                        <div
                          id="collapseFive"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingFive"
                          data-bs-parent="#resourcesAccordion"
                        >
                          <div className="accordion-body">
                            You may need to disable ad blockers to view Internet
                            info.
                          </div>
                        </div>
                      </div>
                      {/* Public Facts */}
                      <div className="accordion-item border-0">
                        <h2 className="accordion-header" id="headingSix">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseSix"
                            aria-expanded="false"
                            aria-controls="collapseSix"
                          >
                            <i className="fas fa-info-circle me-2" /> Public Facts
                          </button>
                        </h2>
                        <div
                          id="collapseSix"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingSix"
                          data-bs-parent="#resourcesAccordion"
                        >
                          <div className="accordion-body">
                            You may need to disable ad blockers to view Internet
                            info.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sale and Tax History */}
                  <div
                    id="Sale_section"
                    className="card p-5 bg-light mt-4 rounded-lg "
                  >
                    <h2 className="h5 fw-bold mb-4">
                      Sale and tax history for 104-C 142nd St
                    </h2>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-semibold">Today</span>
                      <a href="#" className="text-primary text-decoration-none">
                        Sale History
                      </a>
                      <a href="#" className="text-primary text-decoration-none">
                        Tax History
                      </a>
                    </div>
                    <hr className="border-secondary mb-4" />
                    <div className="mb-4">
                      <span className="text-muted">Sep 6, 2024</span>
                      <div className="fw-semibold">Listed (Active)</div>
                      <div className="fs-5 fw-bold">$604,990</div>
                      <span className="text-muted">Price</span>
                    </div>
                    <h3 className="h6 fw-semibold mb-2">Aug, 2024</h3>
                    <ul className="list-unstyled">
                      <li className="mb-3 d-flex justify-content-between">
                        <div>
                          <div className="text-muted">Aug 27, 2024</div>
                          <span>Date</span>
                        </div>
                        <div className="fw-semibold">Sold (MLS) (Closed)</div>
                        <div>
                          <div className="fs-5 fw-bold">$549,990</div>
                          <span className="text-muted">Price</span>
                        </div>
                      </li>
                      <li className="mb-3 d-flex justify-content-between">
                        <div>
                          <div className="text-muted">Aug 3, 2024</div>
                          <span>Date</span>
                        </div>
                        <div className="fw-semibold">Pending</div>
                        <div>
                          <div className="fs-5 fw-bold">$549,990</div>
                          <span className="text-muted">Price</span>
                        </div>
                      </li>
                      <li className="mb-3 d-flex justify-content-between">
                        <div>
                          <div className="text-muted">Aug 2, 2024</div>
                          <span>Date</span>
                        </div>
                        <div className="fw-semibold">Price Changed</div>
                        <div>
                          <div className="fs-5 fw-bold">$599,990</div>
                          <span className="text-muted">Price</span>
                        </div>
                      </li>
                      <li className="mb-3 d-flex justify-content-between">
                        <div>
                          <div className="text-muted">Jul 30, 2024</div>
                          <span>Date</span>
                        </div>
                        <div className="fw-semibold">Price Changed</div>
                        <div>
                          <div className="fs-5 fw-bold">$549,990</div>
                          <span className="text-muted">Price</span>
                        </div>
                      </li>
                      <li className="mb-3 d-flex justify-content-between">
                        <div>
                          <div className="text-muted">Jul 21, 2024</div>
                          <span>Date</span>
                        </div>
                        <div className="fw-semibold">Price Changed</div>
                        <div>
                          <div className="fs-5 fw-bold">$569,990</div>
                          <span className="text-muted">Price</span>
                        </div>
                      </li>
                      <li className="mb-3 d-flex justify-content-between">
                        <div>
                          <div className="text-muted">Jun 21, 2024</div>
                          <span>Date</span>
                        </div>
                        <div className="fw-semibold">Listed (Active)</div>
                        <div>
                          <div className="fs-5 fw-bold">$609,990</div>
                          <span className="text-muted">Price</span>
                        </div>
                      </li>
                      <li className="mb-3 d-flex justify-content-between">
                        <div>
                          <div className="text-muted">May 24, 2024</div>
                          <span>Date</span>
                        </div>
                        <div className="fw-semibold">Price Changed</div>
                        <div>
                          <div className="fs-5 fw-bold">$619,980</div>
                          <span className="text-muted">Price</span>
                        </div>
                      </li>
                      <li className="mb-3 d-flex justify-content-between">
                        <div>
                          <div className="text-muted">Apr 21, 2024</div>
                          <span>Date</span>
                        </div>
                        <div className="fw-semibold">Listed (Active)</div>
                        <div>
                          <div className="fs-5 fw-bold">$648,190</div>
                          <span className="text-muted">Price</span>
                        </div>
                      </li>
                    </ul>
                    <hr className="border-secondary my-4" />
                    <p className="text-muted">
                      Listing provided courtesy of Bright MLS
                    </p>
                    <p className="mt-2">
                      Welcome to Lennar's Tyndale model located at Low Tide at
                      Lighthouse Bay. This three-story townhome features a
                      generous floorplan with entertaining in mind. Enter this
                      brand new home from the two-car garage or front entrance
                      with
                      <a href="#" className="text-primary text-decoration-none">
                        show more
                      </a>
                    </p>
                  </div>
                  <div
                    id="school_section"
                    className="card max-w-lg mx-auto p-5 mt-4 bg-light rounded-lg "
                  >
                    <h2 className="h4 fw-bold mb-4">Schools</h2>
                    <div className="border-bottom mb-4 pb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="text-success fw-semibold">10/10</span>
                          <span className="h6 mb-0">
                            Ocean City Elementary School
                          </span>
                          <p className="text-muted">
                            Public, PreK-4 • Assigned • 7.6mi
                          </p>
                        </div>
                        {/* Icon that triggers the modal */}
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#schoolDetailsModal"
                        >
                          <i className="fas fa-chevron-right" />
                        </a>
                      </div>
                    </div>
                    <div className="border-bottom mb-4 pb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="text-success fw-semibold">5/10</span>
                          <span className="h6 mb-0">
                            Berlin Intermediate School
                          </span>
                          <p className="text-muted">
                            Public, 5-6 • Assigned • 11.8mi
                          </p>
                        </div>
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#schoolDetailsModal"
                        >
                          <i className="fas fa-chevron-right" />
                        </a>
                      </div>
                    </div>
                    <div className="border-bottom mb-4 pb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="text-success fw-semibold">10/10</span>
                          <span className="h6 mb-0">
                            Stephen Decatur Middle School
                          </span>
                          <p className="text-muted">
                            Public, 7-8 • Assigned • 10.6mi
                          </p>
                        </div>
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#schoolDetailsModal"
                        >
                          <i className="fas fa-chevron-right" />
                        </a>
                      </div>
                    </div>
                    <div className="border-bottom mb-4 pb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="text-success fw-semibold">7/10</span>
                          <span className="h6 mb-0">
                            Stephen Decatur High School
                          </span>
                          <p className="text-muted">
                            Public, 9-12 • Assigned • 10.4mi
                          </p>
                        </div>
                        <a
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#schoolDetailsModal"
                        >
                          <i className="fas fa-chevron-right" />
                        </a>
                      </div>
                    </div>
                    <p className="small text-muted">Provided by GreatSchools</p>
                  </div>
                  <div
                    id="neighbor"
                    className="card bg-light p-5 mt-4 rounded-lg "
                  >
                    <h2 className="h6 fw-semibold">Around this home</h2>
                    <div className="text-muted">
                      <span>Znet</span> &gt; <span>Maryland</span> &gt;{" "}
                      <span>Worcester County</span> &gt;
                      <span>21842</span>
                    </div>
                    <h3 className="h6 fw-medium mt-4">
                      Transportation near 104-C 142nd St
                    </h3>
                    <div className="d-flex align-items-center mt-2">
                      <span className="h4 fw-bold ms-1">63</span>
                      <span className="text-muted">/100</span>
                    </div>
                    <p className="mt-1 text-dark">Somewhat walkable</p>
                    <p className="small text-muted">Walk Score®</p>
                    {/* Section with ">" Icon */}
                    <div className="mt-4 d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="fw-semibold">Places</h4>
                        <p className="text-dark">
                          1 grocery, 36 restaurants, 1 park
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn btn-link text-light"
                        data-bs-toggle="modal"
                        data-bs-target="#placesModal"
                      >
                        <i className="fas fa-chevron-right" />
                      </button>
                    </div>
                    <div className="mt-2 d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="fw-semibold">Transit</h4>
                        <p className="text-dark">1 stop nearby</p>
                      </div>
                      <button
                        type="button"
                        className="btn btn-link text-light"
                        data-bs-toggle="modal"
                        data-bs-target="#placesModal"
                      >
                        <i className="fas fa-chevron-right" />
                      </button>
                    </div>
                  </div>
                  <div
                    id="Climate_scetion"
                    className="container card max-w-md mt-4 mx-auto bg-light p-5 rounded-lg "
                  >
                    <h2 className="h5 fw-semibold mb-2">Climate risks</h2>
                    <p className="text-muted mb-4">
                      Most homes have some risk of natural disasters, and may be
                      impacted by climate change due to rising temperatures and
                      sea levels.
                    </p>
                    <div className="border-bottom mb-2 pb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-medium">Flood Factor - Major</span>
                        <span className="text-muted">
                          59% chance of flooding in next 30 years
                        </span>
                        <button
                          className="btn  py-1 px-3"
                          data-bs-toggle="modal"
                          data-bs-target="#ClimateModal"
                        >
                          {" "}
                          <i className="fas fa-chevron-right" />
                        </button>
                      </div>
                    </div>
                    <div className="border-bottom mb-2 pb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-medium">Fire Factor - Minimal</span>
                        <span className="text-muted">
                          Unlikely to be in a wildfire in next 30 years
                        </span>
                        <button
                          className="btn  py-1 px-3"
                          data-bs-toggle="modal"
                          data-bs-target="#ClimateModal"
                        >
                          {" "}
                          <i className="fas fa-chevron-right" />
                        </button>
                      </div>
                    </div>
                    <div className="border-bottom mb-2 pb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-medium">Heat Factor - Extreme</span>
                        <span className="text-muted">
                          7 days above 100° expected this year, 18 days in 30
                          years
                        </span>
                        <button
                          className="btn  py-1 px-3"
                          data-bs-toggle="modal"
                          data-bs-target="#ClimateModal"
                        >
                          {" "}
                          <i className="fas fa-chevron-right" />
                        </button>
                      </div>
                    </div>
                    <div className="border-bottom mb-2 pb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-medium">Wind Factor - Severe</span>
                        <span className="text-muted">
                          80% chance of strong winds in next 30 years
                        </span>
                        <button
                          className="btn  py-1 px-3"
                          data-bs-toggle="modal"
                          data-bs-target="#ClimateModal"
                        >
                          {" "}
                          <i className="fas fa-chevron-right" />
                        </button>
                      </div>
                    </div>
                    <div className="border-bottom mb-2 pb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-medium">Air Factor - Minor</span>
                        <span className="text-muted">
                          2 unhealthy days expected this year, 2 days in 30 years
                        </span>
                        <button
                          className="btn  py-1 px-3"
                          data-bs-toggle="modal"
                          data-bs-target="#ClimateModal"
                        >
                          {" "}
                          <i className="fas fa-chevron-right" />
                        </button>
                      </div>
                    </div>
                    <a href="#" className="text-primary fw-semibold">
                      View full report
                    </a>
                    <p className="text-muted mt-2 small">
                      Provided by First Street
                    </p>
                  </div>
                  <div className="container card mt-4 my-4 p-5 bg-light rounded ">
                    <h2 className="h4">UrbanCraft REAL ESTATE Estimate for 10 128th St #5</h2>
                    <p className="text-muted">
                      UrbanCraft REAL ESTATE has the most accurate online home estimate
                    </p>
                    <h3 className="display-6">$725,861</h3>
                    <p className="text-muted">+$961 over list price of $725K</p>
                    <h4 className="mt-4">Nearby comparable homes</h4>
                    <p className="text-muted">
                      The UrbanCraft REAL ESTATE Estimate uses 6 recent nearby sales, priced between
                      $540K to $745K.
                    </p>
                    <div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
                      <div className="col">
                        <div className="card h-100">
                          {/* Carousel for the first card */}
                          <div
                            id="carouselExampleIndicators1"
                            className="carousel slide"
                          >
                            <div className="carousel-inner">
                              <div className="carousel-item active">
                                <img
                                  src="assets/images/real estate _21.jpg"
                                  className="d-block w-100 rounded"
                                  alt="Sold home on July 19, 2024"
                                />
                              </div>
                              <div className="carousel-item">
                                <img
                                  src="assets/images/real estate _22.jpg"
                                  className="d-block w-100 rounded"
                                  alt="Another view"
                                />
                              </div>
                              {/* Add more carousel items here if needed */}
                            </div>
                            <button
                              className="carousel-control-prev"
                              type="button"
                              data-bs-target="#carouselExampleIndicators1"
                              data-bs-slide="prev"
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
                              data-bs-target="#carouselExampleIndicators1"
                              data-bs-slide="next"
                            >
                              <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                              />
                              <span className="visually-hidden">Next</span>
                            </button>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">
                              $540,000{" "}
                              <span className="text-muted small">Sold Price</span>
                            </h5>
                            <p className="card-text">
                              2 beds | 2 baths | 1,015 sq ft
                            </p>
                            <p className="text-muted small">
                              13100 Coastal Hwy #1712, Ocean City, MD 21842
                            </p>
                            <p className="text-muted small">
                              -$249/sq ft | 5 years newer
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card h-100">
                          {/* Carousel for the second card */}
                          <div
                            id="carouselExampleIndicators2"
                            className="carousel slide"
                          >
                            <div className="carousel-inner">
                              <div className="carousel-item active">
                                <img
                                  src="assets/images/real estate _16.jpg"
                                  className="d-block w-100 rounded"
                                  alt="Sold home on August 6, 2024"
                                />
                              </div>
                              <div className="carousel-item">
                                <img
                                  src="assets/images/real estate _17.jpg"
                                  className="d-block w-100 rounded"
                                  alt="Another view"
                                />
                              </div>
                              {/* Add more carousel items here if needed */}
                            </div>
                            <button
                              className="carousel-control-prev"
                              type="button"
                              data-bs-target="#carouselExampleIndicators2"
                              data-bs-slide="prev"
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
                              data-bs-target="#carouselExampleIndicators2"
                              data-bs-slide="next"
                            >
                              <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                              />
                              <span className="visually-hidden">Next</span>
                            </button>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">
                              $725,000{" "}
                              <span className="text-muted small">Sold Price</span>
                            </h5>
                            <p className="card-text">
                              3 beds | 3 baths | 2,175 sq ft
                            </p>
                            <p className="text-muted small">
                              101 Oyster Ln, Ocean City, MD 21842
                            </p>
                            <p className="text-muted small">
                              -$448/sq ft | 46 years newer
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 mx-auto my-4">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#comparablesModal"
                      >
                        View comparables on map
                      </button>
                    </div>
                    <div className=" row d-flex flex-row border-top pt-4">
                      <h5>More resources</h5>
                      <div className="col-md-12 d-flex justify-content-between">
                        <div>
                          <p className="mb-1">Rental earnings</p>
                          <p className="text-muted">
                            Est. $2,550 per month, based on comparable rentals
                          </p>
                        </div>
                        <div>
                          <button
                            className="btn  py-1 px-3"
                            data-bs-toggle="modal"
                            data-bs-target="#comparablesModal"
                          >
                            {" "}
                            <i className="fas fa-chevron-right" />
                          </button>
                        </div>
                      </div>
                      <div className="col-md-12 d-flex justify-content-between">
                        <div>
                          <p className="mt-2 mb-1">21842 real estate market</p>
                          <p className="text-muted">
                            Homes go pending in 62 days
                          </p>
                        </div>
                        <div>
                          <button
                            className="btn  py-1 px-3"
                            data-bs-toggle="modal"
                            data-bs-target="#comparablesModal"
                          >
                            {" "}
                            <i className="fas fa-chevron-right" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal it self  */}
              <div
                className="modal fade"
                id="comparablesModal"
                tabIndex={-1}
                aria-labelledby="comparablesModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="comparablesModalLabel">
                        Nearby Comparable Homes
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      {/* This is your existing content inside the modal */}
                      <div className="bg-light p-4 rounded-lg shadow-lg">
                        <h2 className="h5 font-weight-bold text-dark">
                          Nearby comparable homes
                        </h2>
                        <p className="text-muted">
                          These are recently sold homes with similar features to this
                          home, such as bedrooms, bathrooms, location, and square
                          footage.
                        </p>
                        <div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
                          {/* First card */}
                          <div className="col">
                            <div className="card h-100">
                              <div
                                id="carouselExampleIndicators4"
                                className="carousel slide"
                              >
                                <div className="carousel-inner">
                                  <div className="carousel-item active">
                                    <img
                                      src="assets/images/real estate _21.jpg"
                                      className="d-block w-100 rounded"
                                      alt="Sold home on July 19, 2024"
                                    />
                                  </div>
                                  <div className="carousel-item">
                                    <img
                                      src="assets/images/real estate _22.jpg"
                                      className="d-block w-100 rounded"
                                      alt="Another view"
                                    />
                                  </div>
                                </div>
                                <button
                                  className="carousel-control-prev"
                                  type="button"
                                  data-bs-target="#carouselExampleIndicators4"
                                  data-bs-slide="prev"
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
                                  data-bs-target="#carouselExampleIndicators4"
                                  data-bs-slide="next"
                                >
                                  <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                  />
                                  <span className="visually-hidden">Next</span>
                                </button>
                              </div>
                              <div className="card-body">
                                <h5 className="card-title">
                                  $540,000{" "}
                                  <span className="text-muted small">Sold Price</span>
                                </h5>
                                <p className="card-text">
                                  2 beds | 2 baths | 1,015 sq ft
                                </p>
                                <p className="text-muted small">
                                  13100 Coastal Hwy #1712, Ocean City, MD 21842
                                </p>
                                <p className="text-muted small">
                                  -$249/sq ft | 5 years newer
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* Second card */}
                          <div className="col">
                            <div className="card h-100">
                              <div
                                id="carouselExampleIndicators3"
                                className="carousel slide"
                              >
                                <div className="carousel-inner">
                                  <div className="carousel-item active">
                                    <img
                                      src="assets/images/real estate _16.jpg"
                                      className="d-block w-100 rounded"
                                      alt="Sold home on August 6, 2024"
                                    />
                                  </div>
                                  <div className="carousel-item">
                                    <img
                                      src="assets/images/real estate _17.jpg"
                                      className="d-block w-100 rounded"
                                      alt="Another view"
                                    />
                                  </div>
                                </div>
                                <button
                                  className="carousel-control-prev"
                                  type="button"
                                  data-bs-target="#carouselExampleIndicators3"
                                  data-bs-slide="prev"
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
                                  data-bs-target="#carouselExampleIndicators3"
                                  data-bs-slide="next"
                                >
                                  <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                  />
                                  <span className="visually-hidden">Next</span>
                                </button>
                              </div>
                              <div className="card-body">
                                <h5 className="card-title">
                                  $725,000{" "}
                                  <span className="text-muted small">Sold Price</span>
                                </h5>
                                <p className="card-text">
                                  3 beds | 3 baths | 2,175 sq ft
                                </p>
                                <p className="text-muted small">
                                  101 Oyster Ln, Ocean City, MD 21842
                                </p>
                                <p className="text-muted small">
                                  -$448/sq ft | 46 years newer
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="d-flex justify-content-between flex-column align-items-center">
                            <div className="d-flex justify-content-between gap-5 flex-row">
                              <span className="text-muted">Map</span>
                              <span className="text-muted">Satellite</span>
                            </div>
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d22379.51025630765!2d70.41938789999999!3d28.3736176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1726037909132!5m2!1sen!2s"
                              width={700}
                              height={300}
                              className="img-fluid"
                              style={{ border: 0 }}
                              allowFullScreen=""
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Call-to-action */}
            <ProductDetailSidePortion p_id={id} />
          </div>
        </div>

        <hr />
       <MainCards/>
        {/* Modal it self  */}
        <div
          className="modal fade"
          id="comparablesModal"
          tabIndex={-1}
          aria-labelledby="comparablesModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="comparablesModalLabel">
                  Nearby Comparable Homes
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {/* This is your existing content inside the modal */}
                <div className="bg-light p-4 rounded-lg shadow-lg">
                  <h2 className="h5 font-weight-bold text-dark">
                    Nearby comparable homes
                  </h2>
                  <p className="text-muted">
                    These are recently sold homes with similar features to this
                    home, such as bedrooms, bathrooms, location, and square
                    footage.
                  </p>
                  <div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
                    {/* First card */}
                    <div className="col">
                      <div className="card h-100">
                        <div
                          id="carouselExampleIndicators4"
                          className="carousel slide"
                        >
                          <div className="carousel-inner">
                            <div className="carousel-item active">
                              <img
                                src="assets/images/real estate _21.jpg"
                                className="d-block w-100 rounded"
                                alt="Sold home on July 19, 2024"
                              />
                            </div>
                            <div className="carousel-item">
                              <img
                                src="assets/images/real estate _22.jpg"
                                className="d-block w-100 rounded"
                                alt="Another view"
                              />
                            </div>
                          </div>
                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleIndicators4"
                            data-bs-slide="prev"
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
                            data-bs-target="#carouselExampleIndicators4"
                            data-bs-slide="next"
                          >
                            <span
                              className="carousel-control-next-icon"
                              aria-hidden="true"
                            />
                            <span className="visually-hidden">Next</span>
                          </button>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">
                            $540,000{" "}
                            <span className="text-muted small">Sold Price</span>
                          </h5>
                          <p className="card-text">
                            2 beds | 2 baths | 1,015 sq ft
                          </p>
                          <p className="text-muted small">
                            13100 Coastal Hwy #1712, Ocean City, MD 21842
                          </p>
                          <p className="text-muted small">
                            -$249/sq ft | 5 years newer
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Second card */}
                    <div className="col">
                      <div className="card h-100">
                        <div
                          id="carouselExampleIndicators3"
                          className="carousel slide"
                        >
                          <div className="carousel-inner">
                            <div className="carousel-item active">
                              <img
                                src="assets/images/real estate _16.jpg"
                                className="d-block w-100 rounded"
                                alt="Sold home on August 6, 2024"
                              />
                            </div>
                            <div className="carousel-item">
                              <img
                                src="assets/images/real estate _17.jpg"
                                className="d-block w-100 rounded"
                                alt="Another view"
                              />
                            </div>
                          </div>
                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleIndicators3"
                            data-bs-slide="prev"
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
                            data-bs-target="#carouselExampleIndicators3"
                            data-bs-slide="next"
                          >
                            <span
                              className="carousel-control-next-icon"
                              aria-hidden="true"
                            />
                            <span className="visually-hidden">Next</span>
                          </button>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">
                            $725,000{" "}
                            <span className="text-muted small">Sold Price</span>
                          </h5>
                          <p className="card-text">
                            3 beds | 3 baths | 2,175 sq ft
                          </p>
                          <p className="text-muted small">
                            101 Oyster Ln, Ocean City, MD 21842
                          </p>
                          <p className="text-muted small">
                            -$448/sq ft | 46 years newer
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="d-flex justify-content-between flex-column align-items-center">
                      <div className="d-flex justify-content-between gap-5 flex-row">
                        <span className="text-muted">Map</span>
                        <span className="text-muted">Satellite</span>
                      </div>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d22379.51025630765!2d70.41938789999999!3d28.3736176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1726037909132!5m2!1sen!2s"
                        width={700}
                        height={300}
                        className="img-fluid"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Climate Modal */}
        <div
          className="modal fade "
          id="ClimateModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content  Listing_Details ">
              <div className="modal-header ">
                <h5 className="modal-title" id="exampleModalLabel">
                  Risk Factor
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body ">
                <ul
                  className="nav nav-tabs nav-tabs-custom d-flex gap-4"
                  role="tablist"
                  style={{ borderBottom: "none" }}
                >
                  <li className="nav-item">
                    <button className="rounded ">
                      <a
                        className="nav-link active"
                        id="flood-tab"
                        data-bs-toggle="tab"
                        href="#flood"
                        role="tab"
                        aria-controls="flood"
                        aria-selected="true"
                      >
                        Flood
                      </a>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="rounded ">
                      <a
                        className="nav-link"
                        id="fire-tab"
                        data-bs-toggle="tab"
                        href="#fire"
                        role="tab"
                        aria-controls="fire"
                        aria-selected="false"
                      >
                        Fire
                      </a>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="rounded ">
                      <a
                        className="nav-link"
                        id="heat-tab"
                        data-bs-toggle="tab"
                        href="#heat"
                        role="tab"
                        aria-controls="heat"
                        aria-selected="false"
                      >
                        Heat
                      </a>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="rounded ">
                      <a
                        className="nav-link"
                        id="wind-tab"
                        data-bs-toggle="tab"
                        href="#wind"
                        role="tab"
                        aria-controls="wind"
                        aria-selected="false"
                      >
                        Wind
                      </a>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="rounded ">
                      <a
                        className="nav-link"
                        id="air-tab"
                        data-bs-toggle="tab"
                        href="#air"
                        role="tab"
                        aria-controls="air"
                        aria-selected="false"
                      >
                        Air
                      </a>
                    </button>
                  </li>
                </ul>
                <div className="tab-content mt-4">
                  <div
                    className="tab-pane fade show active"
                    id="flood"
                    role="tabpanel"
                    aria-labelledby="flood-tab"
                  >
                    <div className="card">
                      <div className="p-4 bg-light text-dark rounded-lg ">
                        <h2 className="h5 fw-semibold">Flood</h2>
                        <hr className="my-2 border-muted" />
                        <div className="d-flex align-items-center">
                          <div className="bg-primary text-white p-2 rounded-lg fs-2 fw-bold me-2">
                            6
                          </div>
                          <span className="h5 fw-semibold">Major</span>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <span className="text-primary fw-bold me-1">
                            F L O O D
                          </span>
                          <span className="text-primary fw-bold me-1">
                            F A C T O R
                          </span>
                          <span className="text-muted">™</span>
                        </div>
                        <p className="mt-2 text-muted">
                          This property's risk of flooding is increasing as sea
                          levels rise and weather patterns change. This
                          assessment is based on the likelihood of water
                          reaching the overall building footprint, and not
                          necessarily an individual unit.
                        </p>
                        <h2 className="h5 fw-semibold mb-2">
                          Flood likelihood over time
                          <span aria-hidden="true" className="text-muted">
                            ℹ️
                          </span>
                        </h2>
                        <div className="d-flex justify-content-start gap-4 progress_setting">
                          <div className="d-flex flex-column align-items-center">
                            <div className="bar-container">
                              <div className="bar-fill bar-1" />
                            </div>
                            <span className="small">1y</span>
                            <span className="small">1%</span>
                          </div>
                          <div className="d-flex flex-column align-items-center">
                            <div className="bar-container">
                              <div className="bar-fill bar-5" />
                            </div>
                            <span className="small">5y</span>
                            <span className="small">9%</span>
                          </div>
                          <div className="d-flex flex-column align-items-center">
                            <div className="bar-container">
                              <div className="bar-fill bar-10" />
                            </div>
                            <span className="small">10y</span>
                            <span className="small">18%</span>
                          </div>
                          <div className="d-flex flex-column align-items-center">
                            <div className="bar-container">
                              <div className="bar-fill bar-15" />
                            </div>
                            <span className="small">15y</span>
                            <span className="small">29%</span>
                          </div>
                          <div className="d-flex flex-column align-items-center">
                            <div className="bar-container">
                              <div className="bar-fill bar-20" />
                            </div>
                            <span className="small">20y</span>
                            <span className="small">39%</span>
                          </div>
                          <div className="d-flex flex-column align-items-center">
                            <div className="bar-container">
                              <div className="bar-fill bar-25" />
                            </div>
                            <span className="small">25y</span>
                            <span className="small">50%</span>
                          </div>
                          <div className="d-flex flex-column align-items-center">
                            <div className="bar-container">
                              <div className="bar-fill bar-30" />
                            </div>
                            <span className="small">30y</span>
                            <span className="small">59%</span>
                          </div>
                        </div>
                        <a
                          onClick={(e) => e.preventDefault()}
                          className="text-primary text-decoration-none"
                          style={{ cursor: "pointer" }}
                        >
                          See all flood risk data on firststreet.org
                        </a>

                        <h3 className="h5 fw-semibold mt-4">
                          About FEMA Zone X (unshaded)
                          <span aria-hidden="true" className="text-muted">
                            ℹ️
                          </span>
                        </h3>
                        <p className="text-muted">
                          FEMA designates Zone X (unshaded) as a low-to-moderate
                          flood area. In this zone, the risk of flooding is
                          reduced, but not completely removed.
                        </p>
                        <a
                          onClick={(e) => e.preventDefault()}
                          className="text-primary text-decoration-none"
                          style={{ cursor: "pointer" }}
                        >
                          Learn more on floodsmart.gov
                        </a>

                        <h2 className="h5 fw-semibold text-dark">
                          Flood Insurance
                          <span aria-hidden="true" className="text-muted">
                            ℹ️
                          </span>
                        </h2>
                        <p className="text-secondary">
                          Based on your estimated FEMA zone, flood insurance is
                          not required. However, FEMA always recommends
                          considering insurance.
                        </p>
                        <p className="text-secondary">
                          Insurance for 10 128th St #5 ranges from
                          <span className="fw-bold">$507</span> to
                          <span className="fw-bold">$1088</span> per year.
                        </p>
                        <button className="mt-2 px-2 py-1 rounded ">
                          <a href="#">Get a quote</a>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="fire"
                    role="tabpanel"
                    aria-labelledby="fire-tab"
                  >
                    <div className="card">
                      <div className="p-4 bg-light text-dark rounded-lg ">
                        <h2 className="h5 fw-semibold">Fire</h2>
                        <hr className="my-2 border-muted" />
                        <div className="d-flex align-items-center">
                          <div className="bg-primary text-white p-2 rounded-lg fs-2 fw-bold me-2">
                            6
                          </div>
                          <span className="h5 fw-semibold">Major</span>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <span className="text-primary fw-bold me-1">
                            F L O O D
                          </span>
                          <span className="text-primary fw-bold me-1">
                            F A C T O R
                          </span>
                          <span className="text-muted">™</span>
                        </div>
                        <p className="mt-2 text-muted">
                          This property's risk of flooding is increasing as sea
                          levels rise and weather patterns change. This
                          assessment is based on the likelihood of water
                          reaching the overall building footprint, and not
                          necessarily an individual unit.
                        </p>
                        <h2 className="h5 fw-semibold mb-2">
                          Flood likelihood over time
                          <span aria-hidden="true" className="text-muted">
                            ℹ️
                          </span>
                        </h2>
                        <div className="d-flex justify-content-start gap-4 progress_setting">
                          <div className="d-flex flex-column align-items-center">
                            <div className="bar-container">
                              <div className="bar-fill bar-1" />
                            </div>
                            <span className="small">1y</span>
                            <span className="small">1%</span>
                          </div>
                          <div className="d-flex flex-column align-items-center">
                            <div className="bar-container">
                              <div className="bar-fill bar-5" />
                            </div>
                            <span className="small">5y</span>
                            <span className="small">9%</span>
                          </div>
                          <div className="d-flex flex-column align-items-center">
                            <div className="bar-container">
                              <div className="bar-fill bar-10" />
                            </div>
                            <span className="small">10y</span>
                            <span className="small">18%</span>
                          </div>
                          <div className="d-flex flex-column align-items-center">
                            <div className="bar-container">
                              <div className="bar-fill bar-15" />
                            </div>
                            <span className="small">15y</span>
                            <span className="small">29%</span>
                          </div>
                          <div className="d-flex flex-column align-items-center">
                            <div className="bar-container">
                              <div className="bar-fill bar-20" />
                            </div>
                            <span className="small">20y</span>
                            <span className="small">39%</span>
                          </div>
                          <div className="d-flex flex-column align-items-center">
                            <div className="bar-container">
                              <div className="bar-fill bar-25" />
                            </div>
                            <span className="small">25y</span>
                            <span className="small">50%</span>
                          </div>
                          <div className="d-flex flex-column align-items-center">
                            <div className="bar-container">
                              <div className="bar-fill bar-30" />
                            </div>
                            <span className="small">30y</span>
                            <span className="small">59%</span>
                          </div>
                        </div>
                        <a
                          onClick={(e) => e.preventDefault()}
                          className="text-primary text-decoration-none"
                          style={{ cursor: "pointer" }}
                        >
                          See all flood risk data on firststreet.org
                        </a>

                        <h3 className="h5 fw-semibold mt-4">
                          About FEMA Zone X (unshaded)
                          <span aria-hidden="true" className="text-muted">
                            ℹ️
                          </span>
                        </h3>
                        <p className="text-muted">
                          FEMA designates Zone X (unshaded) as a low-to-moderate
                          flood area. In this zone, the risk of flooding is
                          reduced, but not completely removed.
                        </p>
                        <a
                          onClick={(e) => e.preventDefault()}
                          className="text-primary text-decoration-none"
                          style={{ cursor: "pointer" }}
                        >
                          Learn more on floodsmart.gov
                        </a>
