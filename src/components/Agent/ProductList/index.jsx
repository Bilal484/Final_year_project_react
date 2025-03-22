import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"; // Import Helmet for adding meta tags

const ProductAllCardsAgents = () => {
  const [properties, setProperties] = useState([]);
  const imageBasePath = "https://api.biznetusa.com/uploads/products/"; // Define base path for images

  const location = useLocation();
  const navigate = useNavigate(); // Hook to navigate to another page

  // Fetch product data
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
              .filter((image) => image.pd_id === product.id) // Ensure proper matching of product ID with image
              .map((img) => img.image); // Get only the image name or path

            return { ...product, images }; // Merge product data with its images
          });

          setProperties(mergedProperties); // Set merged data into state
        } else {
          throw new Error("Failed to load product or image data");
        }
      } catch (err) {
        console.error("Error fetching product data", err);
      }
    };

    fetchProductData();
  }, []);

  // Function to handle tour request button click
  const handleRequestTourClick = () => {
    navigate("/RequestShowing"); // Navigate to the RequestShowing page
  };

  return (
    <>
      <Helmet>
        <title>Real Estate Listings - Explore Our Properties</title>
        <meta
          name="description"
          content="Explore our real estate listings, including stunning homes, apartments, and commercial properties. Request a tour today!"
        />
        <meta name="keywords" content="real estate, property listings, homes for sale, commercial properties" />
        <meta property="og:title" content="Real Estate Listings - Explore Our Properties" />
        <meta
          property="og:description"
          content="Discover amazing properties for sale or rent. View detailed descriptions, images, and request a tour of your favorite listings."
        />
        {properties.length > 0 && (
          <meta
            property="og:image"
            content={`${imageBasePath}${properties[0].images[0]}`} // Using the first image of the first property
          />
        )}
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Real Estate Listings - Explore Our Properties" />
        <meta
          name="twitter:description"
          content="Browse real estate listings with detailed property information. Request a tour of your next home or office!"
        />
        {properties.length > 0 && (
          <meta
            name="twitter:image"
            content={`${imageBasePath}${properties[0].images[0]}`} // Using the first image of the first property
          />
        )}
      </Helmet>

      {properties.map((product, index) => (
        <div className="col-sm-12 home_cards col-lg-12 mb-4" key={product.id}>
          <div className="card">
            {/* Start of Carousel */}
            <div
              id={`carouselProperty${index}`}
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {product.images && product.images.length > 0 ? (
                  product.images.map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      className={`carousel-item ${imgIndex === 0 ? "active" : ""}`}
                    >
                      <img
                        src={`${imageBasePath}${image}`} // Construct full image URL
                        alt={`Property ${product.title} - Image ${imgIndex + 1}`}
                        className="d-block w-100"
                      />
                    </div>
                  ))
                ) : (
                  <div className="carousel-item active">
                    <img
                      src="https://via.placeholder.com/400x300?text=No+Image+Available"
                      alt="No Image Available"
                      className="d-block w-100"
                    />
                  </div>
                )}
              </div>
              {/* Carousel controls */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#carouselProperty${index}`}
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
                data-bs-target={`#carouselProperty${index}`}
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            {/* End of Carousel */}
            <div className="card-body">
              <div className="d-flex justify-content-between flex-row">
                <h3 className="h5 fw-bold text-decoration-none">
                  ${product.price}
                </h3>
                <div>
                  <i className="fa-solid fa-share" />
                  <i className="fa-regular fa-heart ms-2" />
                </div>
              </div>
              <p className="small text-decoration-none">
                {product.location || "Location not available"}
              </p>
              <p className="small text-decoration-none">
                {product.desc || "No description available"}
              </p>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn"
                  onClick={handleRequestTourClick} // Navigate to RequestShowing page on click
                >
                  Request a Tour
                </button>
                <button className="btn">(244) 278-7009</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductAllCardsAgents;
