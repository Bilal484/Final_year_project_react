import React, { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Carousel, Spinner, Tab, Tabs, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Appoinments.css";
import UserHeader from "../../../components/UserHeader";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Notification, { useNotification } from "../../../components/Notification";



const Appointments = () => {
  const [notification, showNotification] = useNotification(); const [tourInPerson, setTourInPerson] = useState([]);
  const [tourOnVideoChat, setTourOnVideoChat] = useState([]);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inPerson');
  const [requestInProgress, setRequestInProgress] = useState(false);

  // const fetchTourOnVideoChat = useCallback(async () => {
  //   try {
  //     const userId = localStorage.getItem("user_id") || 2;
  //     const response = await axios.get(
  //       `https://apitourism.today.alayaarts.com/api/get-touronvideochat/${userId}`,
  //       { timeout: 10000 }
  //     );

  //     if (response.data && response.data.tour_on_video_chat) {
  //       setTourOnVideoChat(response.data.tour_on_video_chat);
  //     } else {
  //       setTourOnVideoChat([]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching video chat tours:", error?.message || "Network error");
  //     setTourOnVideoChat([]);
  //     // Use a delayed notification to prevent render loops
  //     setTimeout(() => {
  //       showNotification("Error", `Error fetching video chat tours: ${error?.message || "Network error"}`);
  //     }, 100);
  //   }
  // }, [showNotification]);

  const fetchTourInPerson = useCallback(async () => {
    try {
      const userId = localStorage.getItem("user_id") || 2;
      const response = await axios.get(
        `https://apitourism.today.alayaarts.com/api/get-tourinpersons/${userId}`,
        { timeout: 10000 }
      );

      if (response.data && response.data.tour_in_person) {
        setTourInPerson(response.data.tour_in_person);
      } else {
        setTourInPerson([]);
      }
    } catch (error) {
      console.error("Error fetching tour in person:", error?.message || "Network error");
      setTourInPerson([]);

      // Use setTimeout to avoid potential infinite update loops
      setTimeout(() => {
        showNotification("Error", `Error fetching tour in person: ${error?.message || "Network error"}`);
      }, 100);
    }
  }, [showNotification]); const fetchProduct = useCallback(async () => {
    try {
      if (!tourInPerson.length && !tourOnVideoChat.length) return;

      // Get unique property IDs from both tour types
      const propertyIds = [
        ...new Set([
          ...tourInPerson.map(tour => tour.p_id),
          ...tourOnVideoChat.map(tour => tour.p_id)
        ])
      ];

      console.log("Property IDs to fetch:", propertyIds);
      // Fetch product details for each unique property ID
      const productDetailsMap = {};
      await Promise.all(
        propertyIds.map(async (productId) => {
          try {
            const response = await axios.get(
              `https://apitourism.today.alayaarts.com/api/get-product/${productId}`,
              { timeout: 10000 }
            );

            if (response.data && response.data.status === 200) {
              // Process and validate each image URL before adding to product details
              const product = response.data.product;
              
              if (product.images && Array.isArray(product.images)) {
                // Validate image data exists
                product.images = product.images.filter(img => img && img.image);
                
                // Log number of valid images found
                console.log(`Product ${productId}: Found ${product.images.length} valid images`);
              } else {
                // Initialize empty images array if none exists
                product.images = [];
                console.log(`Product ${productId}: No images available`);
              }
              
              productDetailsMap[productId] = product;
              console.log(`Successfully loaded product ${productId}:`, product.title);
            } else {
              console.warn(`No data returned for product ${productId}`);
              // Add empty placeholder for this product to avoid null checks
              productDetailsMap[productId] = {
                title: `Property ID: ${productId}`,
                location: "Location unavailable",
                images: []
              };
            }
          } catch (error) {
            console.error(`Error fetching product ${productId}:`, error?.message || "Network error");
            // Add empty placeholder for this product
            productDetailsMap[productId] = {
              title: `Property ID: ${productId}`,
              location: "Error loading property data",
              images: []
            };
          }
        })
      );

      console.log("Final product details map:", productDetailsMap);
      setProductData(productDetailsMap);
    } catch (error) {
      console.error("Error fetching product data:", error?.message || "Network error");
      setProductData(null);
      // Use a delayed notification to prevent render loops
      setTimeout(() => {
        showNotification("Error", `Error fetching property details: ${error?.message || "Network error"}`);
      }, 100);
    }
  }, [tourInPerson, tourOnVideoChat, showNotification]);

  //     setTimeout(() => {
  //       showNotification("Error", `Error fetching product data: ${error?.message || "Network error"}`);
  //     }, 100);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [showNotification]);
  useEffect(() => {
    // Flag to prevent state updates after component unmount
    let isMounted = true;

    // Anti-pattern prevention: only fetch if not already in progress
    if (!requestInProgress) {
      setRequestInProgress(true);
      setLoading(true);
      // First fetch tour data
      Promise.allSettled([
        fetchTourInPerson(),
        // fetchTourOnVideoChat()
      ])
        .then(results => {
          if (!isMounted) return;
          // Log any errors from the API calls
          results.forEach((result, index) => {
            if (result.status === 'rejected') {
              const apis = ['In-person tours', 'Video chat tours'];
              console.error(`Error in API call for ${apis[index]}:`, result.reason);
            }
          });

          // Now fetch product details after tour data is loaded
          return fetchProduct();
        })
        .catch(err => {
          if (!isMounted) return;
          console.error("Error in API calls:", err?.message);
        })
        .finally(() => {
          if (isMounted) {
            setRequestInProgress(false);
            setLoading(false);
          }
        });
    }

    // Cleanup function to prevent state updates after unmounting
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once when component mounts

  const formatDate = (dateString) => {
    if (!dateString) return "Schedule to be determined";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {notification.message && <Notification {...notification} />}

      <Helmet>
        <title>My Appointments | UrbanCraft REAL ESTATE</title>
        <meta
          name="description"
          content="View and manage your appointments, including in-person and video chat tours, with UrbanCraft REAL ESTATE's real estate services."
        />
        <meta
          name="keywords"
          content="real estate appointments, in-person tours, video chat tours, UrbanCraft REAL ESTATE, property management"
        />
        <meta name="author" content="UrbanCraft" />
        <meta property="og:title" content="User Appointments | UrbanCraft REAL ESTATE" />
        <meta
          property="og:description"
          content="Manage your real estate appointments and tours, including in-person and video chat options, with ease."
        />

        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      <UserHeader />

      <div className="appointments-container">
        <div className="container py-4">
          <div className="appointments-header mb-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h1 className="mb-2">My Appointments</h1>
                <p className="text-muted">
                  View and manage your property tour appointments
                </p>
              </div>
              {/* <div className="col-md-4 text-md-end">
                <button className="btn btn-primary">
                  <i className="bi bi-plus-lg me-2"></i>Schedule New Tour
                </button>
              </div> */}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading your appointments...</p>
            </div>
          ) : (
            <div className="appointments-content">
              <Tabs
                id="appointments-tabs"
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-4"
              >
                <Tab eventKey="inPerson" title={<span><i className="bi bi-person me-2"></i>In-Person Tours</span>}>
                  {tourInPerson && tourInPerson.length > 0 ? (
                    <div className="row">
                      {tourInPerson.map((appointment, index) => (
                        <div className="col-md-6 col-lg-4 mb-4" key={appointment.id || index}>
                          <div className="card appointment-card">
                            <div className="appointment-status">
                              <Badge bg={appointment.not_sure_about_this_schedule ? "warning" : "success"}>
                                {appointment.not_sure_about_this_schedule ? "Schedule Pending" : "Confirmed"}
                              </Badge>
                            </div>                            <div className="property-image">                              {productData && productData[appointment.p_id] && productData[appointment.p_id].images && productData[appointment.p_id].images.length > 0 ? (
                                <Carousel controls indicators>
                                  {productData[appointment.p_id].images.map((image, imgIndex) => (
                                    <Carousel.Item key={imgIndex}>
                                      <img
                                        className="d-block w-100"
                                        src={`https://apitourism.today.alayaarts.com/uploads/products/${image.image}`}
                                        alt={`Property ${imgIndex + 1}`}
                                        onError={(e) => {
                                          console.log(`Image failed to load: ${image.image}`);
                                          e.target.onerror = null;
                                          e.target.src = "https://via.placeholder.com/400x220?text=Property+Image+Unavailable";
                                        }}
                                      />
                                    </Carousel.Item>
                                  ))}
                                </Carousel>
                              ) : (
                                <div className="no-image">
                                  <i className="bi bi-house"></i>
                                  <p className="mt-2">No images available</p>
                                </div>
                              )}
                            </div>

                            <div className="card-body">
                              <h3 className="property-title">
                                {productData && productData[appointment.p_id]
                                  ? productData[appointment.p_id].title
                                  : `Property Tour #${appointment.id}`}
                                <small className="text-muted ms-2">(Property ID: {appointment.p_id})</small>
                              </h3>
                              <div className="appointment-info">
                                <div className="info-item">
                                  <i className="bi bi-calendar-check"></i>
                                  <span>{formatDate(appointment.date)}</span>
                                </div>

                                <div className="info-item">
                                  <i className="bi bi-geo-alt"></i>
                                  <span>{productData && productData[appointment.p_id] ? productData[appointment.p_id].location : "Location unavailable"}</span>
                                </div>

                                {productData && productData[appointment.p_id] && productData[appointment.p_id].price && (
                                  <div className="info-item">
                                    <i className="bi bi-tag"></i>
                                    <span>Rs {Number(productData[appointment.p_id].price).toLocaleString()}</span>
                                  </div>
                                )}

                                <div className="info-item">
                                  <i className="bi bi-person-circle"></i>
                                  <span>{`${appointment.firstname || ''} ${appointment.lastname || ''}`}</span>
                                </div>
                              </div>

                              {appointment.notes && (
                                <div className="appointment-notes">
                                  <p><strong>Notes:</strong> {appointment.notes}</p>
                                </div>
                              )}

                              {/* <div className="appointment-actions mt-3">
                                <button className="btn btn-outline-primary btn-sm me-2">
                                  <i className="bi bi-pencil me-1"></i> Edit
                                </button>
                                <button className="btn btn-outline-danger btn-sm">
                                  <i className="bi bi-x-circle me-1"></i> Cancel
                                </button>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="text-center py-5">
                        <i className="bi bi-calendar-x display-1 text-muted"></i>
                        <h3 className="mt-3">No In-Person Tours Scheduled</h3>
                        <p className="text-muted">You don't have any in-person property tours scheduled yet.</p>
                        <button className="btn btn-primary mt-3">
                          <i className="bi bi-plus-lg me-2"></i>Schedule a Tour
                        </button>
                      </div>
                    </div>
                  )}
                </Tab>
{/*  */}
                {/* <Tab eventKey="videoChat" title={<span><i className="bi bi-camera-video me-2"></i>Video Chat Tours</span>}>
                  {tourOnVideoChat && tourOnVideoChat.length > 0 ? (
                    <div className="row">
                      {tourOnVideoChat.map((appointment, index) => (
                        <div className="col-md-6 col-lg-4 mb-4" key={appointment.id || index}>
                          <div className="card appointment-card">
                            <div className="appointment-status">
                              <Badge bg={appointment.not_sure_about_this_schedule ? "warning" : "success"}>
                                {appointment.not_sure_about_this_schedule ? "Schedule Pending" : "Confirmed"}
                              </Badge>
                              <Badge bg="info" className="ms-2">Video Chat</Badge>
                            </div>                            <div className="property-image">
                              {productData && productData[appointment.p_id] && productData[appointment.p_id].images && productData[appointment.p_id].images.length > 0 ? (
                                <Carousel controls indicators>
                                  {productData[appointment.p_id].images.map((image, imgIndex) => (
                                    <Carousel.Item key={imgIndex}>
                                      <img
                                        className="d-block w-100"
                                        src={`https://apitourism.today.alayaarts.com/uploads/products/${image.image}`}
                                        alt={`Property ${imgIndex + 1}`}
                                        onError={(e) => {
                                          console.log(`Image failed to load: ${image.image}`);
                                          e.target.onerror = null;
                                          e.target.src = "https://via.placeholder.com/400x220?text=Property+Image+Unavailable";
                                        }}
                                      />
                                    </Carousel.Item>
                                  ))}
                                </Carousel>
                              ) : (
                                <div className="no-image">
                                  <i className="bi bi-camera-video"></i>
                                  <p className="mt-2">No images available</p>
                                </div>
                              )}
                            </div>

                            <div className="card-body">                              <h3 className="property-title">
                              {productData && productData[appointment.p_id]
                                ? productData[appointment.p_id].title
                                : `Virtual Property Tour #${appointment.id}`}
                              <small className="text-muted ms-2">(Property ID: {appointment.p_id})</small>
                            </h3><div className="appointment-info">
                                <div className="info-item">
                                  <i className="bi bi-calendar-check"></i>
                                  <span>{formatDate(appointment.date)}</span>
                                </div>
                                <div className="info-item">
                                  <i className="bi bi-camera-video"></i>
                                  <span>Video Tour Link: <button className="btn-link p-0 border-0 bg-transparent text-primary">Join Meeting</button></span>
                                </div>

                                {productData && productData[appointment.p_id] && productData[appointment.p_id].price && (
                                  <div className="info-item">
                                    <i className="bi bi-tag"></i>
                                    <span>Rs {Number(productData[appointment.p_id].price).toLocaleString()}</span>
                                  </div>
                                )}

                                <div className="info-item">
                                  <i className="bi bi-person-circle"></i>
                                  <span>{`${appointment.firstname || ''} ${appointment.lastname || ''}`}</span>
                                </div>
                              </div>

                              {appointment.notes && (
                                <div className="appointment-notes">
                                  <p><strong>Notes:</strong> {appointment.notes}</p>
                                </div>
                              )}

                              <div className="appointment-actions mt-3">
                                <button className="btn btn-success btn-sm me-2">
                                  <i className="bi bi-camera-video me-1"></i> Join Call
                                </button>
                                <button className="btn btn-outline-primary btn-sm me-2">
                                  <i className="bi bi-pencil me-1"></i> Edit
                                </button>
                                <button className="btn btn-outline-danger btn-sm">
                                  <i className="bi bi-x-circle me-1"></i> Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="text-center py-5">
                        <i className="bi bi-camera-video-off display-1 text-muted"></i>
                        <h3 className="mt-3">No Video Chat Tours Scheduled</h3>
                        <p className="text-muted">You don't have any video chat property tours scheduled yet.</p>
                        <button className="btn btn-primary mt-3">
                          <i className="bi bi-plus-lg me-2"></i>Schedule a Video Tour
                        </button>
                      </div>
                    </div>
                  )}
                </Tab> */}
              </Tabs>

              <div className="mt-5 p-4 bg-light rounded">
                <h4><i className="bi bi-info-circle me-2"></i>Need Help?</h4>
                <p>If you need to reschedule or have questions about your appointment, please contact us:</p>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-telephone-fill text-primary me-2 fs-4"></i>
                      <div>
                        <p className="mb-0 fw-bold">Phone</p>
                        <p className="mb-0">(555) 123-4567</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-envelope-fill text-primary me-2 fs-4"></i>
                      <div>
                        <p className="mb-0 fw-bold">Email</p>
                        <p className="mb-0">support@urbancraft.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-chat-dots-fill text-primary me-2 fs-4"></i>
                      <div>
                        <p className="mb-0 fw-bold">Live Chat</p>
                        <p className="mb-0">Available 9AM-5PM EST</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Appointments;
