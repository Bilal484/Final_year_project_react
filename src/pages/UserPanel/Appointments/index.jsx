import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Carousel, Spinner, Tab, Tabs, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Appoinments.css";
import UserHeader from "../../../components/UserHeader";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import Notification, { useNotification } from "../../../components/Notification";



const Appointments = () => {
  const [notification, showNotification] = useNotification();
  
  const [tourInPerson, setTourInPerson] = useState([]);
  const [tourOnVideoChat, setTourOnVideoChat] = useState([]);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inPerson');
  useEffect(() => {
    const userId = localStorage.getItem("user_id") || 2; // Get from localStorage or use default
    const p_id = 13; // Default product ID

    // Fetch Tour In Person data
    fetch(`https://api.biznetusa.com/api/get-tourinpersons/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.tour_in_person) {
          setTourInPerson(data.tour_in_person);
        } else {
          setTourInPerson([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching tour in person:", error);
        showNotification("Error", `Error fetching tour in person: ${error.message}`);
      });

    // Fetch Tour On Video Chat data
    fetch(`https://api.biznetusa.com/api/get-touronvideochat/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.tour_on_video_chat) {
          setTourOnVideoChat(data.tour_on_video_chat);
        } else {
          setTourOnVideoChat([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching tour on video chat:", error);
        showNotification("Error", `Error fetching video chat tours: ${error.message}`);
      });

    // Fetch Product data (we'll use a sample p_id for now, you'll need to adjust this logic)
    fetch(`https://api.biznetusa.com/api/get-product/${p_id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.products) {
          setProductData(data.products);
        } else {
          setProductData(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        showNotification("Error", `Error fetching product data: ${error.message}`);
      })
      .finally(() => setLoading(false));
  }, [showNotification]);
  // Format date to a more readable format
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
        <meta
          property="og:image"
          content="https://api.biznetusa.com/uploads/appointments-banner.jpg"
        />
        <meta property="og:url" content="https://biznetusa.com/appointments" />
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
              <div className="col-md-4 text-md-end">
                <button className="btn btn-primary">
                  <i className="bi bi-plus-lg me-2"></i>Schedule New Tour
                </button>
              </div>
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
                            </div>
                            
                            <div className="property-image">
                              {productData && productData.images && productData.images.length > 0 ? (
                                <Carousel controls indicators>
                                  {productData.images.map((image, imgIndex) => (
                                    <Carousel.Item key={imgIndex}>
                                      <img
                                        className="d-block w-100"
                                        src={`https://api.biznetusa.com/uploads/products/${image.image}`}
                                        alt={`Property ${imgIndex + 1}`}
                                      />
                                    </Carousel.Item>
                                  ))}
                                </Carousel>
                              ) : (
                                <div className="no-image">
                                  <i className="bi bi-house"></i>
                                </div>
                              )}
                            </div>
                            
                            <div className="card-body">
                              <h3 className="property-title">
                                {productData ? productData.title : `Property Tour`}
                              </h3>
                              
                              <div className="appointment-info">
                                <div className="info-item">
                                  <i className="bi bi-calendar-check"></i>
                                  <span>{formatDate(appointment.date)}</span>
                                </div>
                                
                                <div className="info-item">
                                  <i className="bi bi-geo-alt"></i>
                                  <span>{productData ? productData.location : "Location unavailable"}</span>
                                </div>
                                
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
                
                <Tab eventKey="videoChat" title={<span><i className="bi bi-camera-video me-2"></i>Video Chat Tours</span>}>
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
                            </div>
                            
                            <div className="property-image">
                              {productData && productData.images && productData.images.length > 0 ? (
                                <Carousel controls indicators>
                                  {productData.images.map((image, imgIndex) => (
                                    <Carousel.Item key={imgIndex}>
                                      <img
                                        className="d-block w-100"
                                        src={`https://api.biznetusa.com/uploads/products/${image.image}`}
                                        alt={`Property ${imgIndex + 1}`}
                                      />
                                    </Carousel.Item>
                                  ))}
                                </Carousel>
                              ) : (
                                <div className="no-image">
                                  <i className="bi bi-camera-video"></i>
                                </div>
                              )}
                            </div>
                            
                            <div className="card-body">
                              <h3 className="property-title">
                                {productData ? productData.title : `Virtual Property Tour`}
                              </h3>
                              
                              <div className="appointment-info">
                                <div className="info-item">
                                  <i className="bi bi-calendar-check"></i>
                                  <span>{formatDate(appointment.date)}</span>
                                </div>
                                
                                <div className="info-item">
                                  <i className="bi bi-camera-video"></i>
                                  <span>Video Tour Link: <a href="#">Join Meeting</a></span>
                                </div>
                                
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
                </Tab>
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
