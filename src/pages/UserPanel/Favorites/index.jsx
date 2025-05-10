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
  const [userLists, setUserLists] = useState([]); // New state for storing user's lists
  const [imagePath, setImagePath] = useState(""); // New state for storing image path
  const [loading, setLoading] = useState(true);
  const [loadingLists, setLoadingLists] = useState(true); // State to track if lists are loading
  const [showNewListModal, setShowNewListModal] = useState(false); // State for controlling modal visibility
  const [listName, setListName] = useState(""); // State for the new list name
  const [isPrimaryList, setIsPrimaryList] = useState(false); // State for the checkbox
  const [activeList, setActiveList] = useState(null); // State to track active list
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      // Fetch user lists
      axios
        .get(`https://api.biznetusa.com/api/get-new-list/${userId}`)
        .then((response) => {
          if (response.data && response.data.new_list) {
            setUserLists(response.data.new_list);
            
            // Set default active list to the primary list if available
            const primaryList = response.data.new_list.find(list => list.primarily_list === "1");
            if (primaryList) {
              setActiveList(primaryList.id);
            } else if (response.data.new_list.length > 0) {
              // Otherwise use the first list
              setActiveList(response.data.new_list[0].id);
            }
          }
          setLoadingLists(false);
          
          // For now keep the favorites as is - we'll update this later
          if (response.data.favorites) {
            setFavorites(response.data.favorites);
          }
          if (response.data.imagePath) {
            setImagePath(response.data.imagePath);
          }
          setLoading(false);
        })
        .catch((error) => {
          showNotification("Error fetching lists: " + (error.response?.data?.message || error.message));
          setLoadingLists(false);
          setLoading(false);
        });
    } else {
      showNotification("User ID not found in localStorage");
      setLoadingLists(false);
      setLoading(false);
    }
  }, [showNotification]);

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
      // Create a new list object
      const newList = {
        id: response.data.id || Date.now(), // use response ID if available, otherwise timestamp
        user_id: parseInt(userId),
        name: listName,
        primarily_list: isPrimaryList ? "1" : "0",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Update userLists state with the new list
      setUserLists(prevLists => {
        const updatedLists = [...prevLists, newList];
        
        // If this is a primary list, update other lists to not be primary
        if (isPrimaryList) {
          return updatedLists.map(list => ({
            ...list,
            primarily_list: list.id === newList.id ? "1" : "0"
          }));
        }
        
        return updatedLists;
      });
      
      // If this is the first list or it's primary, set it as active
      if (isPrimaryList || userLists.length === 0) {
        setActiveList(newList.id);
      }
      
      showNotification({
        type: "success",
        message: "List created successfully!"
      });
      
      // Reset form and close modal
      setListName("");
      setIsPrimaryList(false);
      setShowNewListModal(false);
      setErrorMessage("");
    })
    .catch((error) => {
      showNotification({
        type: "error",
        message: "Error creating list: " + (error.response?.data?.message || error.message)
      });
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
        <div className="container favourite-container">          <div className="favorites-header d-flex justify-content-between align-items-center mb-4">
            <div className="header-title">
              <h2>Favorites</h2>
              <button
                className="text-muted ms-2 add-search-partner border-0 bg-transparent"
                data-bs-toggle="modal"
                data-bs-target="#userFavouriteSearchPartnerModal"
              >
                <i className="bi bi-person-plus-fill" /> Add search partner
              </button>
            </div>
            <div className="action-buttons d-flex align-items-center">
              <button className="text-muted me-3 border-0 bg-transparent">
                <i className="bi bi-download" /> Download all
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowNewListModal(true)} // Open the modal on button click
              >
                <i className="bi bi-plus-circle" /> New list
              </button>
            </div>
          </div>

          {/* Display user lists */}
          <div className="user-lists mb-4">
            <h3 className="mb-3">My Lists</h3>
            {loadingLists ? (
              <p>Loading lists...</p>
            ) : userLists.length > 0 ? (
              <div className="list-tabs">
                <ul className="nav nav-tabs">
                  {userLists.map((list) => (
                    <li className="nav-item" key={list.id}>
                      <button
                        className={`nav-link ${activeList === list.id ? 'active' : ''}`}
                        onClick={() => setActiveList(list.id)}
                      >
                        {list.name}
                        {list.primarily_list === "1" && (
                          <span className="badge bg-success ms-2">Primary</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="alert alert-info">
                You don't have any lists yet. Create your first list to start saving favorites.
              </div>
            )}
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
      </div>      {/* Modal for creating a new list */}
      <Modal show={showNewListModal} onHide={() => setShowNewListModal(false)}>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>
            <i className="bi bi-bookmarks me-2"></i>Create a New List
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <Form>
            <Form.Group controlId="listName" className="mb-3">
              <Form.Label>
                <i className="bi bi-list-ul me-2"></i>List Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a name for your list"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                maxLength="50"
                className={listName.trim() ? "is-valid" : ""}
                isInvalid={errorMessage && !listName.trim()}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a name for your list.
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Give your list a meaningful name to help you organize your favorites.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="primaryList" className="mt-4">
              <Form.Check
                type="checkbox"
                label={
                  <>
                    <i className="bi bi-star-fill me-2 text-warning"></i>
                    Make this my primary list
                  </>
                }
                checked={isPrimaryList}
                onChange={(e) => setIsPrimaryList(e.target.checked)}
              />
              <Form.Text className="text-muted ms-4 ps-1">
                Your primary list will be shown by default when you visit your favorites.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="outline-secondary" 
            onClick={() => {
              setShowNewListModal(false);
              setListName("");
              setIsPrimaryList(false);
              setErrorMessage("");
            }}
          >
            <i className="bi bi-x me-1"></i> Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSaveNewList}
            disabled={!listName.trim()}
          >
            <i className="bi bi-save me-1"></i> Create List
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default Favorites;
