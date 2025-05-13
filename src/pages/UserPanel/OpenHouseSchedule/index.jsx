import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OpenHouseSchedule.css";
import img01 from "../../../../src/assets/images/Home copy.png";
import UserHeader from "../../../components/UserHeader";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const OpenHouseSchedule = () => {
  const [openHouse, setOpenHouse] = useState(null); // Store single open house data
  const [productData, setProductData] = useState(null); // Store product data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user_id from localStorage
    const userId = localStorage.getItem("user_id");

    // Fetch open house schedules from API
    fetch(`https://apitourism.today.alayaarts.com/api/get-tourinpersons/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const fetchedHouses = data.tour_in_person || [];

        if (fetchedHouses.length > 0) {
          const firstHouse = fetchedHouses[0]; // Show only the first open house
          setOpenHouse(firstHouse);

          // Fetch product details using the p_id of the first open house
          const p_id = firstHouse.p_id;
          fetch(`https://apitourism.today.alayaarts.com/api/get-product/${p_id}`)
            .then((response) => response.json())
            .then((productData) => {
              setProductData(productData.products);
            });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching open house schedules:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
    <Helmet>
        <title>Open House Schedule | UrbanCraft REAL ESTATE</title>
        <meta
          name="description"
          content="Plan your real estate journey with UrbanCraft REAL ESTATE's Open House Schedule. View upcoming open house details, including property descriptions, prices, and more."
        />
        <meta
          name="keywords"
          content="open house schedule, real estate planning, property listings, UrbanCraft REAL ESTATE open houses"
        />
        <meta property="og:title" content="Open House Schedule | UrbanCraft REAL ESTATE" />
        <meta
          property="og:description"
          content="Track and plan your upcoming open house visits with UrbanCraft REAL ESTATE. View detailed property information and images."
        />
        <meta
          property="og:image"
          content="https://apitourism.today.alayaarts.com/uploads/open-house-placeholder.jpg"
        />
        <meta property="og:url" content="https://apitourism.today.alayaarts.com/open-house-schedule" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Open House Schedule | UrbanCraft REAL ESTATE" />
        <meta
          property="twitter:description"
          content="Plan your real estate journey with UrbanCraft REAL ESTATE's Open House Schedule. View upcoming open house details and property information."
        />
        <meta
          property="twitter:image"
          content="https://apitourism.today.alayaarts.com/uploads/open-house-placeholder.jpg"
        />
      </Helmet>
      <Header />
      <UserHeader />
      <div className="Home-parent">
        <div id="main-content">
          <div className="container mt-5 text-center container-open-house">
            {loading ? (
              <p>Loading...</p>
            ) : openHouse && productData ? (
              <div
                className="card mx-auto"
                style={{
                  maxWidth: "600px", // Set a max width for the card
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Add a subtle shadow for a unique design
                  borderRadius: "10px", // Smooth rounded corners
                }}
              >
                <div className="card-body">
                  {/* Open House Details */}
                  <h5 className="card-title">Open House on {openHouse.date}</h5>
                  <p className="card-text">
                    <strong>First Name:</strong> {openHouse.firstname} <br />
                    <strong>Last Name:</strong> {openHouse.lastname} <br />
                    <strong>Email:</strong> {openHouse.email} <br />
                    <strong>Phone:</strong> {openHouse.phone} <br />
                    <strong>Notes:</strong> {openHouse.notes}
                  </p>

                  {/* Product Details */}
                  <h5 className="card-title mt-4">{productData.title}</h5>
                  <p className="card-text">
                    <strong>Description:</strong> {productData.desc} <br />
                    <strong>Price:</strong> ${productData.price} <br />
                  </p>

                  {/* React Bootstrap Carousel for Product Images */}
                  <Carousel
                    className="product-carousel"
                    style={{ borderRadius: "8px", overflow: "hidden" }}
                  >
                    {productData.images.map((image) => (
                      <Carousel.Item key={image.id}>
                        <img
                          className="d-block w-100"
                          src={`https://apitourism.today.alayaarts.com/uploads/products/${image.image}`}
                          alt={productData.title}
                          style={{
                            height: "300px",
                            objectFit: "cover",
                          }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              </div>
            ) : (
              <>
                <img src={img01} alt="No data" height="150px" width="auto" />
                <h3>You have no upcoming open houses</h3>
                <p>
                  Add homes to your open house schedule to help you plan out your
                  home search.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OpenHouseSchedule;
