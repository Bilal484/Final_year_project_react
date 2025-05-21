import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetail.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/real estate _12.jpg";
import img2 from "../../assets/images/real estate _16.jpg";
import img3 from "../../assets/images/real estate _18.jpg";
import Header from "../../components/Header";
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
    "https://apitourism.today.alayaarts.com/uploads/products/"
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

  const navigate = useNavigate();

  // Retrieve userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProductData = async () => {
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
    // Set the images for the modal
    setShowModal(true); // Show the modal
  };
  useEffect(() => {
    // Function to fetch the product data
    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `https://apitourism.today.alayaarts.com/api/get-product/${id}`
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

  return (
    <>
      <Helmet>
        <title>Product Details | Explore Our Exclusive Product</title>
        <meta
          name="description"
          content="Discover the features, specifications, and pricing of our exclusive product. Enhance your lifestyle with quality and innovation."
        />
        <meta
          name="keywords"
          content="Product Details, Exclusive Products, Features, Specifications, Pricing, Innovative Products, Quality Products"
        />
        <meta
          property="og:title"
          content="Product Details | Explore Our Exclusive Product"
        />
        <meta
          property="og:description"
          content="Explore the detailed features and benefits of our product. Designed to meet your needs and exceed expectations."
        />
        <meta
          property="og:image"
          content="https://apitourism.today.alayaarts.com/uploads/product-image-placeholder.jpg"
        />
        <meta
          property="og:url"
          content="https://apitourism.today.alayaarts.com/product-detail"
        />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Product Details | Explore Our Exclusive Product"
        />
        <meta
          name="twitter:description"
          content="Check out the exclusive features and pricing of our product. A perfect choice for quality and innovation."
        />
        <meta
          name="twitter:image"
          content="https://apitourism.today.alayaarts.com/uploads/product-image-placeholder.jpg"
        />
      </Helmet>

      <Header />
      <main>
        <div className="container-fluid ">
          <nav className="position-sticky top-0 product-nav ">
            <div className="container d-flex flex-wrap justify-content-between">
              <ul>
                <li>
                  <a href="#overview">Overview</a>{" "}
                </li>
                <li>
                  <a href="#neighbor">Neighborhood</a>{" "}
                </li>
                <li>
                  <a href="#Property_section">Property details</a>{" "}
                </li>
                <li>
                  <a href="#Sale_section">Sales & tax history</a>{" "}
                </li>
                <li>
                  <a href="#Climate_scetion">Climate</a>{" "}
                </li>
              </ul>
              <ul>
                <li>
                  <a href="#">
                    <i className="fa fa-heart me-2"></i>Favorite
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-share me-2"></i>share
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div id="overview" className="container-fluid mt-3  firs_top_portion">
            <>
              <div className="row g-3">
                {/* Map through the first three images */}
                {productData?.images.slice(0, 3).map((image, index) => (
                  <div className="col-md-4 position-relative" key={image.id}>
                    <div
                      className="card custom-card"
                      onClick={handleImageClick}
                    >
                      <img
                        src={`${"https://apitourism.today.alayaarts.com/uploads/products/"}/${
                          image.image
                        }`}
                        alt={`Image ${index + 1}`}
                      />
                      {index === 0 && (
                        <span className="tag-label">OPEN SUN, 12PM TO 2PM</span>
                      )}
                      {index === 2 && (
                        <div className="photo-btn">
                          <i className="bi bi-camera" />{" "}
                          {productData?.images.length} photos
                        </div>
                      )}
                      {index === 0 && (
                        <div className="custom-btn-group d-flex justify-content-start mt-2 p-2">
                          <button className="btn me-2">
                            <i className="bi bi-file-earmark-text" /> Floor
                            Plans
                          </button>
                          <button className="btn me-2">
                            <i className="bi bi-house-door" /> Street View
                          </button>
                          <button className="btn ">
                            <i className="bi bi-pencil-square" /> Redesign
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
              >
                <Modal.Header closeButton>
                  <Modal.Title>All Images</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row g-3">
                    {productData?.images.length !== 0 &&
                      productData?.images.map((image) => (
                        <div className="col-md-4" key={image.id}>
                          <img
                            src={`${imagePath}/${image.image}`}
                            alt={`Image ${image.id}`}
                            className="img-fluid"
                          />
                        </div>
                      ))}
                  </div>
                </Modal.Body>
              </Modal>
            </>
          </div>
          {/* ============================= below portion ==================== */}
          <div className="container my-4">
            <div className="row Listing_Details">
              {/* Left Column: Listing Details */}
              <div className="col-lg-8  scroll_section">
                <div className="card mb-4">
                  <div className="card-body p-5">
                    <h5 className="card-title mb-3">
                      {productData?.location || "Location not available"}{" "}
                      {/* Fallback for undefined location */}
                    </h5>
                    <div className="d-flex justify-content-between ">                      <div className="price">
                        <h6 className="price-tag fs-4 fw-bold">
                          Rs {productData?.price || "N/A"}
                        </h6>{" "}
                        {/* Fallback for price */}
                        <p className="text-muted fs-14">
                          Est.{" "}
                          {productData?.overview_sales?.[0]?.est_price || "N/A"}{" "}
                          {/* Optional chaining for nested fields */}
                        </p>
                      </div>
                      <div className="gap-5 d-flex flex-row mb-3">
                        <div className="d-flex flex-column fs-6 text-muted">
                          <strong className="fs-4 text-dark">
                            {productData?.overview_sales?.[0]?.beds || "N/A"}
                          </strong>
                          Beds
                        </div>
                        <div className="d-flex flex-column fs-6 text-muted">
                          <strong className="fs-4 text-dark">
                            {productData?.overview_sales?.[0]?.bath || "N/A"}
                          </strong>
                          Baths
                        </div>
                        <div className="d-flex flex-column fs-6 text-muted">
                          <strong className="fs-4 text-dark">
                            {productData?.overview_sales?.[0]?.sq_ft || "N/A"}
                          </strong>
                          Sq Ft {/* Correct property for Sq Ft */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mt-4 px-2 py-4">
                  <div className="p-4">
                    Rates have dropped <br /> Lower rates mean lower monthly
                    payments
                  </div>
                </div>
                <div className="card mt-4 px-3 py-4 shadow-sm">
                  <div className="p-4">
                    <h5 className="fw-bold">About this home</h5>
                    <p>{productData?.desc}</p>
                  </div>

                  <div className="row d-flex justify-content-start">
                    {productData?.overview_home_tags?.map((tag, index) => (
                      <div
                        key={index}
                        className="col-12 col-sm-6 d-flex justify-content-start mb-3"
                      >
                        <p className="px-3">
                          <i className="fas fa-tag text-muted me-2"></i>{" "}
                          {tag.tag_name}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 px-3">
                    <p className="mb-1">
                      Listed by <strong>Kristen Gebhart</strong> • Northrop
                      Realty •
                      <a href="tel:3025392900" className="text-primary ms-1">
                        302-539-2900
                      </a>{" "}
                      (broker)
                    </p>
                    <p>
                      Znet checked:{" "}
                      <span className="text-primary">2 minutes ago</span> (Sept
                      10, 2024 at 3:59pm)
                    </p>
                    <p className="text-muted">
                      Source: BRIGHT MLS #MDWO2022874
                    </p>
                  </div>

                  <Row className="justify-content-center text-center">
                    <Col xs={12} sm={6} md={6} lg={6}>
                      <Card className="mb-4 border-0 shadow">
                        <Card.Body className="d-flex align-items-center">
                          <Link
                            to={`/real-estate-agents/tiffeny-meyers`}
                            className="d-flex align-items-center"
                          >
                            <img
                              src={img1}
                              alt="Tiffeny Meyers"
                              className="rounded-circle me-3"
                              width="80"
                              height="80"
                            />
                            <div>
                              <Card.Title className="mb-0">
                                Tiffeny Meyers
                              </Card.Title>
                              <Card.Text className="text-muted">
                                Znet Corporation
                              </Card.Text>
                            </div>
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col xs={12} sm={6} md={6} lg={6}>
                      <Card className="mb-4 border-0 shadow">
                        <Card.Body className="d-flex align-items-center">
                          <Link
                            to={`/real-estate-agents/daniel-csuk`}
                            className="d-flex align-items-center"
                          >
                            <img
                              src={img2}
                              alt="Daniel Csuk"
                              className="rounded-circle me-3"
                              width="80"
                              height="80"
                            />
                            <div>
                              <Card.Title className="mb-0">
                                Daniel Csuk
                              </Card.Title>
                              <Card.Text className="text-muted">
                                Znet Corporation
                              </Card.Text>
                            </div>
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  <Row className="text-center mt-3">
                    <Col>
                      <p className="text-muted">
                        Znet checked:{" "}
                        <span className="text-primary">
                          1 minute ago (Oct 29, 2024 at 11:26am)
                        </span>
                        <br />
                        <small>
                          Source: MRED as Distributed by MLS Grid #12097522
                        </small>
                      </p>
                    </Col>
                  </Row>
                </div>
                {/* Commute */}
                <div className="card px-3 mt-4">
                  <div className="p-4">
                    <h3 className="mt-3">Commute</h3>
                    <div className="mx-auto py-3">
                      <iframe
                        src={productData?.map_url}
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
                {/* Ask Znet agent Kim a question  */}
                {productData?.id && <CommentSection p_id={productData.id} />}
                {/*Payment calculator  */}

                <PaymentCalculator />

                <div className="card p-5 rounded-lg mt-4">
                  <h2 className="h5 fw-bold mb-4">Additional resources</h2>
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
                          <i className="fas fa-hand-holding-usd me-2" /> Down
                          payment assistance
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
                          <i className="fas fa-percentage me-2" /> Mortgage
                          rates
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
                          <i className="fas fa-solar-panel me-2" /> Electricity
                          and solar
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
                          <i className="fas fa-wifi me-2" /> Internet
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
                  </div>
                  <p className="small text-muted mt-4">
                    Provided by Down Payment Resource, RateUpdate.com, Wattbuy,
                    and AllConnect
                  </p>
                </div>
                <div className="card p-5 rounded-lg mt-4 ">
                  <h2 className="h5 fw-bold mb-4">Additional services</h2>
                  {/* Internet Deals Section */}
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <h3 className="h6 fw-semibold">
                        Find internet deals in your area
                      </h3>
                      <p className="text-muted">
                        Get a great deal on fast wifi
                      </p>
                    </div>
                    <div className="text-muted text-end">
                      <span>Advertisement</span>
                      <span className="fw-semibold">xfinity</span>
                    </div>
                  </div>
                  {/* Free Credit Report Section */}
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3 className="h6 fw-semibold">Free Credit Report</h3>
                      <p className="text-muted">
                        Get your credit report for free
                      </p>
                    </div>
                    <div className="text-muted text-end">
                      <span>Advertisement</span>
                      <span className="fw-semibold">credit sesame</span>
                    </div>
                  </div>
                </div>
                <div className="card p-5 rounded mt-4">
                  <div className="card-body">
                    <h2 className="card-title h4 mb-2">Open houses</h2>
                    <p className="text-muted mb-4">No upcoming open houses</p>
                    <h3 className="h5 mb-1">Schedule a tour today</h3>
                    <p className="text-muted mb-4">
                      Tour with Znet and one of our agents will be there to
                      answer all your questions.
                    </p>
                    <p className="font-weight-bold">Wednesday, Sep 11</p>
                    <div className="mt-2 d-flex justify-content-around">
                      <span className="text-dark">
                        <b>10:00 am</b>
                      </span>{" "}
                      •{" "}
                      <span className="text-dark">
                        <b>11:00 am</b>
                      </span>{" "}
                      •{" "}
                      <span className="text-dark">
                        <b>12:00 pm</b>
                      </span>{" "}
                      •
                      <span className="text-dark">
                        <b>1:00 pm</b>
                      </span>{" "}
                      •
                      <span className="text-dark">
                        <b>2:00 pm</b>
                      </span>
                      <a href="#" className="text-dark  ">
                        Check for more
                      </a>
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
                  <h2 className="h4">Znet Estimate for 10 128th St #5</h2>
                  <p className="text-muted">
                    Znet has the most accurate online home estimate
                  </p>
                  <h3 className="display-6">$725,861</h3>
                  <p className="text-muted">+$961 over list price of $725K</p>
                  <h4 className="mt-4">Nearby comparable homes</h4>
                  <p className="text-muted">
                    The Znet Estimate uses 6 recent nearby sales, priced between
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

              {/* Right Column: Call-to-action */}
              <ProductDetailSidePortion p_id={id} />
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          {/* <h2 className="h4 fw-semibold mt-5">Recommended for you</h2>
          <h6 className="h6 fw-semibold mt-3">
            Based on homes you’ve looked at.
          </h6> */}
          {/* product */}
          <div className="container py-4">
            <div className="row">
             <MainCards/>
            </div>
          </div>
          <ShareListingModal
            isOpen={showShareModal}
            onClose={closeShareModal}
            productSlug={selectedProductSlug}
          />
          {/* product */}
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
                    id="heat"
                    role="tabpanel"
                    aria-labelledby="heat-tab"
                  >
                    <p>This is the content for the Heat tab.</p>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="wind"
                    role="tabpanel"
                    aria-labelledby="wind-tab"
                  >
                    <p>This is the content for the Wind tab.</p>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="air"
                    role="tabpanel"
                    aria-labelledby="air-tab"
                  >
                    <p>This is the content for the Air tab.</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer ">
                <button type="button" className="btn " data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn ">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* School Modal */}
        <div
          className="modal fade"
          id="schoolDetailsModal"
          tabIndex={-1}
          aria-labelledby="schoolDetailsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="schoolDetailsModalLabel">
                  School Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="card bg-light text-dark p-4 my-3 rounded-lg shadow-lg max-w-md mx-auto">
                <h2 className="h5 fw-bold mb-4">
                  Ocean City Elementary School
                </h2>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="h4 fw-semibold">10/10</span>
                  <span className="text-warning">4.0 ★★★★☆ (7 reviews)</span>
                </div>
                <h3 className="h6 fw-semibold mt-4">GreatSchools Subrating</h3>
                <ul className="list-unstyled mb-4">
                  <li>10/10 Equity</li>
                  <li>10/10 Student Growth</li>
                  <li>10/10 Test Scores</li>
                </ul>
                <h3 className="h6 fw-semibold">Details</h3>
                <ul className="list-unstyled mb-4">
                  <li>Assigned</li>
                  <li>Public, PreK-4</li>
                  <li>529 students (11 per teacher)</li>
                  <li>7.6mi away</li>
                  <li>12828 Center Dr, Ocean City, MD 21842</li>
                </ul>
                <h3 className="h6 fw-semibold">Community Reviews</h3>
                <div className="mb-4">
                  <span className="text-warning">4.0 ★★★★☆ (7)</span>
                  <p className="text-muted">Parent</p>
                  <p className="text-muted">2.0 ★★☆☆☆ June 2023</p>
                  <p>
                    The only good things I can say about this school - are...
                  </p>
                </div>
                <a href="#" className="text-dark text-decoration-none">
                  Worcester County Public Schools
                </a>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal for Places */}
        <div
          className="modal fade"
          id="placesModal"
          tabIndex={-1}
          aria-labelledby="placesModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen  Listing_Details">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="placesModalLabel">
                  Places
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="card modal-body">
                <div className="p-4 bg-light text-dark rounded-lg shadow-lg">
                  <h2 className="h4 font-bold mb-4">Around this home</h2>
                  <div className="d-flex flex-wrap mb-4">
                    <button
                      className="p-2 border-0 rounded me-2 mb-2 btn btn-primary"
                      type="button"
                      onclick="showSection('highlightsSection')"
                    >
                      Highlights
                    </button>
                    <button
                      className="p-2 border-0 rounded me-2 mb-2 btn btn-primary"
                      type="button"
                      onclick="showSection('grocerySection')"
                    >
                      Grocery
                    </button>
                    <button
                      className="p-2 border-0 rounded me-2 mb-2 btn btn-primary"
                      type="button"
                      onclick="showSection('foodDrinkSection')"
                    >
                      Food &amp; Drink
                    </button>
                    <button
                      className="p-2 border-0 rounded me-2 mb-2 btn btn-primary"
                      type="button"
                      onclick="showSection('parksSection')"
                    >
                      Parks
                    </button>
                    <button
                      className="p-2 border-0 rounded me-2 mb-2 btn btn-primary"
                      type="button"
                      onclick="showSection('shoppingSection')"
                    >
                      Shopping
                    </button>
                    <button
                      className="p-2 border-0 rounded me-2 mb-2 btn btn-primary"
                      type="button"
                      onclick="showSection('sportsSection')"
                    >
                      Sports and Recreation
                    </button>
                    <button
                      className="p-2 border-0 rounded me-2 mb-2 btn btn-primary"
                      type="button"
                      onclick="showSection('entertainmentSection')"
                    >
                      Entertainment
                    </button>
                  </div>
                  <div
                    className="row g-4  collapse  active"
                    id="highlightsSection"
                  >
                    <div className="col-md-5 col-sm-12 mx-auto multiple_cards_boxs">
                      <div className="p-3 border mx-2 rounded">
                        <h5 className="fw-semibold">
                          <i className="fa-solid fa-beer-mug-empty me-2" />
                          Beach Barrels
                        </h5>
                        <p className="text-muted">
                          Sports Bar, Italian Restaurant • 0.7 miles
                        </p>
                      </div>
                    </div>
                    <div className="col-md-5 col-sm-12 mx-auto multiple_cards_boxs">
                      <div className="p-3 border mx-2 rounded">
                        <h5 className="fw-semibold">
                          <i className="fa-solid fa-golf-ball-tee me-2" />
                          Lost Treasure Golf
                        </h5>
                        <p className="text-muted">
                          Mini Golf Course • 0.2 miles
                        </p>
                      </div>
                    </div>
                    <div className="col-md-5 col-sm-12 mx-auto multiple_cards_boxs">
                      <div className="p-3 border mx-2 rounded">
                        <h5 className="fw-semibold">
                          <i className="fa-solid fa-anchor me-2" />
                          Discoversea Shipwreck Museum
                        </h5>
                        <p className="text-muted">History Museum • 0.7 miles</p>
                      </div>
                    </div>
                    <div className="col-md-5 col-sm-12 mx-auto multiple_cards_boxs">
                      <div className="p-3 border mx-2 rounded">
                        <h5 className="fw-semibold">
                          <i className="fa-solid fa-golf-club me-2" />
                          Old Pro Golf Indoor/Outdoor Pirate/Safari
                        </h5>
                        <p className="text-muted">
                          Mini Golf Course • 0.4 miles
                        </p>
                      </div>
                    </div>
                    <div className="col-md-5 col-sm-12 mx-auto multiple_cards_boxs">
                      <div className="p-3 border mx-2 rounded">
                        <h5 className="fw-semibold">
                          <i className="fa-solid fa-film me-2" />
                          Sun &amp; Surf Cinema
                        </h5>
                        <p className="text-muted">Movie Theater • 0.1 miles</p>
                      </div>
                    </div>
                    <div className="col-md-5 col-sm-12 mx-auto multiple_cards_boxs">
                      <div className="p-3 border mx-2 rounded">
                        <h5 className="fw-semibold">
                          <i className="fa-solid fa-car me-2" />
                          Viking Golf &amp; Go Carts
                        </h5>
                        <p className="text-muted">
                          Mini Golf Course • 0.3 miles
                        </p>
                      </div>
                    </div>
                    <div className="col-md-5 col-sm-12 mx-auto multiple_cards_boxs">
                      <div className="p-3 border mx-2 rounded">
                        <h5 className="fw-semibold">
                          <i className="fa-solid fa-water me-2" />
                          Viking Amusements and Thunder Lagoon Waterpark
                        </h5>
                        <p className="text-muted">Amusement Park • 0.3 miles</p>
                      </div>
                    </div>
                    <div className="col-md-5 col-sm-12 mx-auto multiple_cards_boxs">
                      <div className="p-3 border mx-2 rounded">
                        <h5 className="fw-semibold">
                          <i className="fa-solid fa-pizza-slice me-2" />
                          Game World
                        </h5>
                        <p className="text-muted">Pizzeria • 0.2 miles</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="grocerySection" className="collapse">
                  <div className="card card-body">
                    This is the content for the Grocery section.
                  </div>
                </div>
                <div id="foodDrinkSection" className="collapse">
                  <div className="card card-body">
                    This is the content for the Food &amp; Drink section.
                  </div>
                </div>
                <div id="parksSection" className="collapse">
                  <div className="card card-body">
                    This is the content for the Parks section.
                  </div>
                </div>
                <div id="shoppingSection" className="collapse">
                  <div className="card card-body">
                    This is the content for the Shopping section.
                  </div>
                </div>
                <div id="sportsSection" className="collapse">
                  <div className="card card-body">
                    This is the content for the Sports and Recreation section.
                  </div>
                </div>
                <div id="entertainmentSection" className="collapse">
                  <div className="card card-body">
                    This is the content for the Entertainment section.
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};
export default ProductDetail;
