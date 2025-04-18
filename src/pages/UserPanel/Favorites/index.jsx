import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./Favorites.css";
import UserHeader from "../../../components/UserHeader";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import axios from "axios";
import { Carousel, Card, Button, Modal, Form } from "react-bootstrap"; // Import necessary components from React-Bootstrap
import Notification, {useNotification} from "../../../components/Notification";


const Favorites = () => {
    const [notification, showNotification] = useNotification(); // Destructure the returned values
  const [favorites, setFavorites] = useState([]);
  const [imagePath, setImagePath] = useState(""); // New state for storing image path
  const [loading, setLoading] = useState(true);
  const [showNewListModal, setShowNewListModal] = useState(false); // State for controlling modal visibility
  const [listName, setListName] = useState(""); // State for the new list name
  const [isPrimaryList, setIsPrimaryList] = useState(false); // State for the checkbox
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      axios
        .get(`https://api.biznetusa.com/api/get-fvtproducts/${userId}`)
        .then((response) => {
          setFavorites(response.data.products); // Store products in state
          setImagePath(response.data.imagePath); // Store image path
          setLoading(false);
        })
        .catch((error) => {
          showNotification("Error fetching favorites:", error);
          setLoading(false);
        });
    } else {
      showNotification("User ID not found in localStorage");
      setLoading(false);
    }
  }, []);

  // Function to handle saving the new list
const handleSaveNewList = () => {
  if (!listName.trim()) {
    setErrorMessage("List name cannot be empty.");
    return;
  }

  const userId = localStorage.getItem("user_id"); // Retrieve the user_id from localStorage

  if (!userId) {
    setErrorMessage("User ID is required. Please log in again.");
    return;
  }

  const payload = {
    name: listName,
    primarily_list: isPrimaryList ? 1 : 0,
    user_id: userId, // Add the user_id to the payload
  };

  axios
    .post("https://api.biznetusa.com/api/store-new-list", payload)
    .then((response) => {
      showNotification("List created successfully:", response.data);
      // Reset form and close modal
      setListName("");
      setIsPrimaryList(false);
      setShowNewListModal(false);
      setErrorMessage("");
    })
    .catch((error) => {
      showNotification("Error creating list:", error);
      setErrorMessage("Failed to create the list. Please try again.");
    });
};

  return (
    <>
      {notification.message && <Notification {...notification} />}

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
          content="https://api.biznetusa.com/uploads/favorites-banner.jpg"
        />
        <meta property="og:url" content="https://biznetusa.com/favorites" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <UserHeader />
      <div id="main-content">
        <div className="container favourite-container">
          <div className="favorites-header d-flex justify-content-between align-items-center mb-4">
            <div className="header-title">
              <h2>Favorites</h2>
              <a
                href="#"
                className="text-muted ms-2 add-search-partner"
                data-bs-toggle="modal"
                data-bs-target="#userFavouriteSearchPartnerModal"
              >
                <i className="bi bi-person-plus-fill" /> Add search partner
              </a>
            </div>
            <div className="action-buttons d-flex align-items-center">
              <a href="#" className="text-muted me-3">
                <i className="bi bi-download" /> Download all
              </a>
              <button
                className="text-light"
                onClick={() => setShowNewListModal(true)} // Open the modal on button click
              >
                <i className="bi bi-plus-circle" /> New list
              </button>
            </div>
          </div>

          {/* Display favorite items */}
          <div className="favorites-list">
            {loading ? (
              <p>Loading favorites...</p>
            ) : favorites.length > 0 ? (
              <div className="row">
                {favorites.map((favorite, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <Card className="favorite-card">
                      <Carousel>
                        {favorite.images && favorite.images.length > 0 ? (
                          favorite.images.map((image, imgIndex) => (
                            <Carousel.Item key={imgIndex}>
                              <img
                                className="d-block w-100 favorite-image"
                                src={`${imagePath}${image.image}`}
                                alt={`Slide ${imgIndex}`}
                              />
                            </Carousel.Item>
                          ))
                        ) : (
                          <Carousel.Item>
                            <img
                              className="d-block w-100 favorite-image bg-blue"
                              src="/placeholder-image.png"
                              alt="Placeholder"
                            />
                          </Carousel.Item>
                        )}
                      </Carousel>

                      <Card.Body>
                        <Card.Title>{favorite.title}</Card.Title>
                        <Card.Text>{favorite.desc}</Card.Text>
                        <Card.Text>{favorite.location}</Card.Text>
                        <Card.Text>${favorite.price}</Card.Text>
                        <Button variant="danger">
                          <i className="bi bi-heart-fill"></i> Favorite
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <p>No favorites found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for creating a new list */}
      <Modal show={showNewListModal} onHide={() => setShowNewListModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new list</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <Form>
            <Form.Group controlId="listName">
              <Form.Label>List name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter list name"
                value={listName}
                onChange={(e) => setListName(e.target.value)} // Update list name state
                maxLength="50"
              />
            </Form.Group>
            <Form.Group controlId="primaryList" className="mt-3">
              <Form.Check
                type="checkbox"
                label="Make this my primary list"
                checked={isPrimaryList}
                onChange={(e) => setIsPrimaryList(e.target.checked)} // Update checkbox state
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewListModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveNewList}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default Favorites;
