import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductByLocation.css";
import ShareListingModal from "../SharePopup";
import FavoriteButton from "../FavoriteButton";
import { Helmet } from "react-helmet";
const GetLocation = () => {
  const [products, setProducts] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedProductSlug, setSelectedProductSlug] = useState(null);

  const fetchProducts = async (latitude, longitude) => {
    try {
      const url = `https://api.biznetusa.com/api/getproduct/${longitude}/${latitude}`;
      const response = await axios.get(url);
      if (response.status === 200 && response.data.status === 200) {
        setProducts(response.data.products);
        setImagePath(response.data.imagePath);
      } else {
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchProducts(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
        }
      );
    } else {
    }
  }, []);

  const openShareModal = (productSlug) => {
    setSelectedProductSlug(productSlug);
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setSelectedProductSlug(null);
  };

  return (
    <>
    <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Explore properties available near your location. Browse homes, apartments, and rentals with images and prices." />
        <meta name="keywords" content="real estate, properties, homes, apartments, rentals, location-based" />
        <meta property="og:title" content="Properties Near You" />
        <meta property="og:description" content="Find real estate listings near you, including homes and apartments for sale or rent." />
        <meta property="og:image" content={`${imagePath}/${products.image}`} />
        <meta property="og:image:alt" content={`Property image from ${`${imagePath}/${products.image}` || "Listing"}`} />
        <meta name="twitter:title" content="Properties Near You" />
        <meta name="twitter:description" content="Find real estate listings near you, including homes and apartments for sale or rent." />
        <meta name="twitter:image" content={`${imagePath}/${products.image}`} />
        <title>Browse Properties Near You</title>
      </Helmet>
    <Container>
      <h3 className="h2 fw-bold mb-4">Products Near You:</h3>
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col md={4} sm={6} xs={12} key={product.id} className="mb-4">
              <div className="card shadow-sm border-0 rounded">
                <div className="card-image">
                  <Carousel interval={null} indicators={false}>
                    {product.images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <img
                          className="d-block w-100"
                          src={`${imagePath}/${image.image}`}
                          alt={`Slide ${index + 1}`}
                          style={{
                            height: "250px",
                            objectFit: "cover",
                            borderRadius: "8px 8px 0 0",
                          }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
                <div className="card-body">
                  <h5 className="card-title mb-2">${product.price}</h5>
                  <p className="card-text text-muted mb-1">{product.location}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <i
                      className                      ="fa fa-share text-secondary"
                      style={{ cursor: "pointer" }}
                      title="Share"
                      onClick={() => openShareModal(product.slug)}
                    ></i>
                    <FavoriteButton productId={product.id} />
                  </div>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Col>
            <p>No products found near your location.</p>
          </Col>
        )}
      </Row>
      <ShareListingModal
        isOpen={showShareModal}
        onClose={closeShareModal}
        productSlug={selectedProductSlug}
      />
    </Container>
    </>
  );
};

export default GetLocation;

