import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Appoinments.css";
import UserHeader from "../../../components/UserHeader";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import Notification, {useNotification} from "../../../components/Notification";



const Appointments = () => {
    const [notification, showNotification] = useNotification(); // Destructure the returned values
  
  const [tourInPerson, setTourInPerson] = useState([]);
  const [tourOnVideoChat, setTourOnVideoChat] = useState([]);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = 2; // Replace with logic to fetch actual user_id if needed

    // Fetch Tour In Person data
    fetch(`https://api.biznetusa.com/api/get-tourinpersons/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setTourInPerson(data.tour_in_person || []);
      })
      .catch((error) => showNotification("Error fetching tour in person:", error));

    // Fetch Tour On Video Chat data
    fetch(`https://api.biznetusa.com/api/get-touronvideochat/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setTourOnVideoChat(data.tour_on_video_chat || []);
      })
      .catch((error) => showNotification("Error fetching tour on video chat:", error));

    // Fetch Product data using p_id from the tourInPerson data
    const p_id = 13; // Replace with logic to fetch p_id dynamically if needed
    fetch(`https://api.biznetusa.com/api/get-product/${p_id}`)
      .then((response) => response.json())
      .then((productData) => {
        setProductData(productData.products);
      })
      .catch((error) => showNotification("Error fetching product data:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    
    <>
    {notification.message && <Notification {...notification} />}

     <Helmet>
        <title>User Appointments | Znet</title>
        <meta
          name="description"
          content="View and manage your appointments, including in-person and video chat tours, with Znet's real estate services."
        />
        <meta
          name="keywords"
          content="real estate appointments, in-person tours, video chat tours, Znet real estate, property management"
        />
        <meta name="author" content="Znet" />
        <meta property="og:title" content="User Appointments | Znet" />
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
      <div className="parent-user-appointment">
        <div id="main-content">
          <div className="container-fluid mt-5 appointment-container">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="row mt-4 justify-content-center">
                  {/* Tour In Person Appointments */}
                  {tourInPerson.map((appointment, index) => (
                    <div className="col-sm-6 col-lg-4 mb-4" key={appointment.id}>
                      <div className="card home_cards">
                        <div
                          id={`carouselTourInPerson${index}`}
                          className="carousel slide"
                          data-bs-ride="carousel"
                        >
                          <div className="carousel-inner">
                            {productData && productData.images.map((image, imgIndex) => (
                              <div
                                key={imgIndex}
                                className={`carousel-item ${imgIndex === 0 ? "active" : ""}`}
                              >
                                <img
                                  src={`https://api.biznetusa.com/uploads/products/${image.image}`}
                                  alt={`Appointment ${index}`}
                                  className="d-block w-100"
                                />
                              </div>
                            ))}
                          </div>
                          {/* Carousel controls */}
                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target={`#carouselTourInPerson${index}`}
                            data-bs-slide="prev"
                          >
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target={`#carouselTourInPerson${index}`}
                            data-bs-slide="next"
                          >
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="visually-hidden">Next</span>
                          </button>
                        </div>

                        {/* Appointment Details */}
                        <div className="card-body">
                          <h3 className="h5 fw-bold">
                            {appointment.firstname} {appointment.lastname}
                          </h3>
                          <p className="mb-1 small">Date: {appointment.date}</p>
                          <p className="small">Notes: {appointment.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Tour On Video Chat Appointments */}
                  {tourOnVideoChat.map((appointment, index) => (
                    <div className="col-sm-6 col-lg-4 mb-4" key={appointment.id}>
                      <div className="card home_cards">
                        <div
                          id={`carouselTourOnVideoChat${index}`}
                          className="carousel slide"
                          data-bs-ride="carousel"
                        >
                          <div className="carousel-inner">
                            {productData && productData.images.map((image, imgIndex) => (
                              <div
                                key={imgIndex}
                                className={`carousel-item ${imgIndex === 0 ? "active" : ""}`}
                              >
                                <img
                                  src={`https://api.biznetusa.com/uploads/products/${image.image}`}
                                  alt={`Appointment ${index}`}
                                  className="d-block w-100"
                                />
                              </div>
                            ))}
                          </div>
                          {/* Carousel controls */}
                          <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target={`#carouselTourOnVideoChat${index}`}
                            data-bs-slide="prev"
                          >
                            <span className="carousel-control-prev-icon" aria-hidden="true" />
                            <span className="visually-hidden">Previous</span>
                          </button>
                          <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target={`#carouselTourOnVideoChat${index}`}
                            data-bs-slide="next"
                          >
                            <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="visually-hidden">Next</span>
                          </button>
                        </div>

                        {/* Appointment Details */}
                        <div className="card-body">
                          <h3 className="h5 fw-bold">
                            {appointment.firstname} {appointment.lastname}
                          </h3>
                          <p className="mb-1 small">Date: {appointment.date}</p>
                          <p className="small">Notes: {appointment.notes}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Appointments;
