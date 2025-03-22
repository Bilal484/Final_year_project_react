import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./Saved-Searches.css";
import UserHeader from "../../../components/UserHeader";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import { Modal, Button, Form } from "react-bootstrap"; // Ensure you have React Bootstrap installed

const SavedSearches = () => {
  const [savedSearches, setSavedSearches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSearch, setCurrentSearch] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  useEffect(() => {
    // Retrieve the user_id from localStorage
    const userId = localStorage.getItem("user_id");

    if (userId) {
      // Fetch the saved searches for the specific user from the API
      axios.get(`https://api.biznetusa.com/api/get-user-search/${userId}`)
        .then((response) => {
          if (response.data && response.data.user_search) {
            setSavedSearches(response.data.user_search);
          }
        })
        .catch((error) => {
          console.error("Error fetching saved searches:", error);
        });
    } else {
      console.error("User ID not found in localStorage");
    }
  }, []);

  const handleEdit = (search) => {
    setCurrentSearch(search);
    setUpdatedTitle(search.title); // Pre-fill with the current title
    setShowModal(true); // Show modal
  };

  const handleUpdate = () => {
    const updatedData = { 
      title: updatedTitle, 
      user_id: currentSearch.user_id // Make sure user_id is sent along with the title
    };

    // Call the update API
    axios.put(`https://api.biznetusa.com/api/update-user-search/${currentSearch.id}`, updatedData)
      .then((response) => {
        // Update the search locally in the list
        setSavedSearches(savedSearches.map(search => 
          search.id === currentSearch.id ? { ...search, title: updatedTitle } : search
        ));
        setShowModal(false); // Close modal after update
      })
      .catch((error) => {
        console.error("Error updating search:", error);
      });
  };

  const handleDelete = (id) => {
    // Call the delete API
    axios.delete(`https://api.biznetusa.com/api/deleteusersearch/${id}`)
      .then(() => {
        // Remove the search from the list after successful deletion
        setSavedSearches(savedSearches.filter(search => search.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting search:", error);
      });
  };

  return (
    <>
    <Helmet>
        <title>Saved Searches | Znet</title>
        <meta
          name="description"
          content="Manage and edit your saved property searches with ease. Stay updated with the latest property listings that match your preferences."
        />
        <meta name="keywords" content="saved searches, real estate, property management, Znet, notifications" />
        <meta property="og:title" content="Saved Searches | Znet" />
        <meta
          property="og:description"
          content="Access and edit your saved property searches on Znet. Get instant notifications for new property listings."
        />
        <meta property="og:url" content="https://biznetusa.com/saved-searches" />
        <meta
          property="og:image"
          content="https://api.biznetusa.com/uploads/saved-search-placeholder.jpg"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Saved Searches | Znet" />
        <meta
          name="twitter:description"
          content="Manage and edit your saved searches for real estate properties with Znet."
        />
        <meta
          name="twitter:image"
          content="https://api.biznetusa.com/uploads/saved-search-placeholder.jpg"
        />
      </Helmet>
      <Header />
      <UserHeader />
      <div className="container container-saved-searches mt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="pt-5">Saved Searches</h1>
            <div className="border py-3 px-2 d-flex">
              <div className="text-danger">
                <span className="icon-position">
                  <i className="fa-solid fa-heart"></i>
                  <i className="fa-solid fa-heart"></i>
                </span>
              </div>
              <div>
                <p className="pb-0 mb-0 ps-3">
                  Share your favorite homes with your search partner.
                </p>
                <a className="pt-0 mt-0 ps-5" href="#">
                  Invite your search partner
                </a>
              </div>
            </div>

            {savedSearches.length > 0 ? (
              <div className="saved-searches-grid">
                {savedSearches.map((search) => (
                  <div className="saved-search-card" key={search.id}>
                    <div className="card-body">
                      <p className="search-title">For sale</p>
                      <h2 className="search-id">{search.title}</h2>
                      <p>Email me <span className="search-frequency">Instantly</span></p>
                      <div className="search-actions">
                        <button className="btn-icon" onClick={() => handleEdit(search)}>
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button className="btn-icon" onClick={() => handleDelete(search.id)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 border py-4 mobile-size d-flex">
                <div className="px-5">
                  <span>
                    <i className="fa-regular fa-bookmark fa-2x"></i>
                  </span>
                </div>
                <div className="pt-0 mt-0 pe-5">
                  <h2>You have not saved any searches.</h2>
                  <p>
                    Get notifications when new homes that match your criteria hit the market.
                  </p>
                  <button type="button" className="btn btnss-color text-white">
                    Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSearchTitle">
              <Form.Label>Search Title</Form.Label>
              <Form.Control
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default SavedSearches;
