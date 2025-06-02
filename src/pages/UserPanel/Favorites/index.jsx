import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./Favorites.css";
// // import UserHeader from "../../../components/UserHeader";  // Commented out
import Header from "../../../components/Header";  // Use main Header instead
import Footer from "../../../components/Footer";
import axios from "axios";
import { Carousel, Card, Button, Modal } from "react-bootstrap";



const Favorites = () => {  
  const [favorites, setFavorites] = useState([]);
  const [imagePath, setImagePath] = useState("https://apitourism.today.alayaarts.com/api/uploads/products");
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchFavoriteProducts = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      const response = await axios.get(
        `https://apitourism.today.alayaarts.com/api/get-fvtproducts/${userId}`,
        { timeout: 10000 }
      );
      
      if (response.data?.status === 200) {
        setFavorites(response.data.products || []);
        setImagePath(response.data.imagePath || "https://apitourism.today.alayaarts.com/api/uploads/products");
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error?.response?.data?.message || error?.message || "Network error");
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const loadInitialData = async () => {
      if (!isMounted) return;
      await fetchFavoriteProducts();
    };

    loadInitialData();
    
    return () => {
      isMounted = false;
    };
  }, []); 

  const removeFavorite = async (productId) => {
    try {
      const response = await axios.delete(
        `https://apitourism.today.alayaarts.com/api/deletefvtproduct/${productId}`,
        { timeout: 10000 }
      );
      
      if (response.data?.status === 200) {
        setFavorites(prevFavorites => 
          prevFavorites.filter(favorite => favorite.id !== productId)
        );
        console.log("Favorite removed successfully");
        fetchFavoriteProducts();
      } else {
        console.error("Failed to remove favorite:", response.data?.message || "Unknown error");
        
      }
    } catch (error) {
      console.error("Error removing favorite:", error?.response?.data?.message || error?.message || "Network error");
      
    } finally {
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  return (
    <>
      {/* {notification.message && <Notification {...notification} />} */}

      <Helmet>
        <title>Favorites | UrbanCraft REAL ESTATE</title>
        <meta
          name="description"
          content="Manage your favorite properties and create personalized lists with UrbanCraft REAL ESTATE. Add search partners, download your favorites, and track your preferred properties effortlessly."
        />
        <meta
          name="keywords"
          content="real estate favorites, property management, create lists, UrbanCraft REAL ESTATE favorites, real estate"
        />
        <meta name="author" content="Znet" />
        <meta property="og:title" content="Favorites | UrbanCraft REAL ESTATE" />
        <meta
          property="og:description"
          content="Save and organize your favorite properties with UrbanCraft REAL ESTATE. Create new lists, add search partners, and explore your saved favorites easily."
        />
        <meta
          property="og:image"
          content="https://apitourism.today.alayaarts.com/uploads/favorites-banner.jpg"
        />
        <meta property="og:url" content="https://apitourism.today.alayaarts.com/favorites" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      {/* <UserHeader /> */}
      <div id="main-content">
        <div className="container favourite-container">          
          <div className="favorites-header d-flex justify-content-between align-items-center mb-4">
            <div className="header-title">
              <h2>Favorites</h2>
            </div>
            {/* <div className="action-buttons d-flex align-items-center">
              <button className="text-muted me-3 border-0 bg-transparent">
                <i className="bi bi-download" /> Download all
              </button>
            </div> */}
          </div>

          {/* Display favorite items */}
          <div className="favorites-list">
            {loading ? (
              <div className="d-flex justify-content-center my-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : favorites.length > 0 ? (
              <div className="row">
                {favorites.map((favorite) => (
                  <div key={favorite.id} className="col-md-4 mb-4">
                    <Card className="favorite-card h-100">
                      <Carousel>
                        {favorite.images && favorite.images.length > 0 ? (
                          favorite.images.map((image, imgIndex) => (
                            <Carousel.Item key={imgIndex}>
                              <img
                                className="d-block w-100 favorite-image"
                                src={`${imagePath}${image.image}`}
                                alt={`${favorite.title} - ${imgIndex + 1}`}
                                style={{ height: '200px', objectFit: 'cover' }}
                              />
                            </Carousel.Item>
                          ))
                        ) : (
                          <Carousel.Item>
                            <img
                              className="d-block w-100 favorite-image"
                              src="/placeholder-image.png"
                              alt="Placeholder"
                              style={{ height: '200px', objectFit: 'cover' }}
                            />
                          </Carousel.Item>
                        )}
                      </Carousel>

                      <Card.Body>
                        <Card.Title>{favorite.title}</Card.Title>
                        <Card.Text className="text-truncate">{favorite.desc}</Card.Text>
                        <Card.Text><i className="bi bi-geo-alt"></i> {favorite.location}</Card.Text>
                        <Card.Text className="fw-bold">Rs {Number(favorite.price).toLocaleString()}</Card.Text>
                      </Card.Body>
                      <Card.Footer className="bg-white border-top-0">
                        <Button 
                          variant="outline-danger" 
                          className="w-100"
                          onClick={() => handleDeleteClick(favorite)}
                        >
                          <i className="bi bi-trash"></i> Remove from Favorites
                        </Button>
                      </Card.Footer>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                You don't have any favorite properties yet. Browse properties and add them to your favorites!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Remove from Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove <strong>{productToDelete?.title}</strong> from your favorites?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => productToDelete && removeFavorite(productToDelete.id)}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default Favorites;
