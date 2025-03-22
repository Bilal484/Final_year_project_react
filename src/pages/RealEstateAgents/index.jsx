import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, Button, Row, Col, Image, Carousel } from "react-bootstrap";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import "./AgentProfile.css"; // Use a CSS file for custom styles
import img1 from "../../assets/images/real estate _12.jpg";
import img2 from "../../assets/images/Owner-Dashboard/Sell with Redfin/PresidentsClub_NoYear.svg";
import man1 from "../../assets/images/Owner-Dashboard/Sell with Redfin/man_01.jpg";
import man2 from "../../assets/images/Owner-Dashboard/Sell with Redfin/man_02.jpg";
import man3 from "../../assets/images/Owner-Dashboard/Sell with Redfin/man_03.jpg";
import man4 from "../../assets/images/Owner-Dashboard/Sell with Redfin/man_04.jpg";
import ProductAllCardsAgents from "../../components/Agent/ProductList";
import ProductMap from "../../components/Agent/ProductMap";
import ChatComponent from "../../components/ChatComponent";

const agentData = {
  name: "Tiffeny Meyers",
  license: "475166803",
  homesClosed: 284,
  areas: [
    "Far North Side",
    "Lake View",
    "Lincoln Park",
    "North Center",
    "Northwest",
  ],
  phone: "(773) 570-9981",
  totalSales: 284,
  salesVolume: "$118M",
  highestSale: "$1.9M",
};

const AgentProfile = () => {
  const [activeSection, setActiveSection] = useState("active");
  const [buying, setBuying] = useState(true);
  const [selling, setSelling] = useState(false);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const [showChat, setShowChat] = useState(false); // Manage chat component visibility

  const toggleChat = () => {
    setShowChat((prevShowChat) => !prevShowChat);
  };

  const reviews = [
    {
      text: "Working with Tiffeny as first time home buyers was great. She initially met with us to walk us through what the home buying process looked like from start to end.",
      author: "Arpit K",
      date: "Closed May '18",
      price: "$317,000",
    },
    {
      text: "Tiffeny was an incredible guide through our selling process. Her knowledge and dedication helped us achieve the best price for our home.",
      author: "John D",
      date: "Closed Dec '20",
      price: "$520,000",
    },
    {
      text: "Buying our second home with Tiffeny was a breeze. She really understands what her clients want and delivers.",
      author: "Emily R",
      date: "Closed Jun '21",
      price: "$475,000",
    },
  ];

  return (
    <>
    <Helmet>
        <title>Agent Profile - Tiffeny Meyers | DRD Premier</title>
        <meta name="description" content="Explore Tiffeny Meyers' agent profile. Learn about her expertise, areas served, sales stats, and client reviews. Connect with her for your real estate needs." />
        <meta name="keywords" content="Real Estate, Tiffeny Meyers, Agent Profile, DRD Premier, Homes for Sale, Homes Sold, Real Estate Agent, Property Listings, Client Reviews" />
        <meta name="author" content="DRD Premier" />
      </Helmet>
      <Header />
      <div className="container mx-auto   ">
        <div className="agent-profile-container " style={{ height: "45vh" }}>
          <div className="back-link">
            <a href="/agents" className="text-muted ms-5">
              Back to Far North Side Agents
            </a>
          </div>
        </div>
        <div className="container set_width_height_margin">
          <Row className="align-items-center agent-row  d-flex ">
            <div className="col-lg-1"></div>
            <Col xs={12} md={5}>
              <Card className="agent-details-card shadow">
                <Card.Body>
                  <div className="logo-section">
                    <span className="redfin-principal text-uppercase">
                      DRD Principal Agent
                    </span>
                    <div className="logo">P</div>{" "}
                    {/* Add your logo image or icon */}
                  </div>
                  <Card.Title className="agent-name">
                    {agentData.name}
                  </Card.Title>
                  <Card.Text className="license">
                    License # <strong>{agentData.license}</strong>
                    <div className="border_bottom_set"></div>
                  </Card.Text>
                  <Card.Text className="homes-closed">
                    <strong>{agentData.homesClosed} Homes Closed In:</strong>
                    <br />
                    {agentData.areas.join(" • ")}
                  </Card.Text>
                  <a className="view-more">View More</a>
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <Button variant="danger" className="contact-button">
                        <i className="fas fa-phone-alt"></i> Get in Touch
                      </Button>

                      <Card.Text className="contact-details">
                        <strong>
                          <i className="fas fa-phone-alt"></i> {agentData.phone}
                        </strong>
                        <br />
                        English
                        <br />
                        <span className="text-success">
                          <i className="fas fa-phone-volume"></i> Currently
                          taking calls
                        </span>
                      </Card.Text>

                      <Button
                        variant="outline-primary"
                        className="chat-button"
                        onClick={toggleChat}
                      >
                        <i className="fas fa-comments"></i>
                      </Button>
                    </div>

                    {/* ChatComponent - visible when showChat is true */}
                    {showChat && (
                      <div className="chat-component">
                        <ChatComponent />
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={5} className="text-center">
              <Image
                src={img1}
                alt={agentData.name}
                fluid
                rounded
                className="agent-image"
              />
            </Col>
            <div className="col-lg-1"></div>
          </Row>

          <Row className="sales-stats mt-4 text-center">
            <Col className="d-flex justify-content-evenly" xs={12} sm={4}>
              <div>
                <h5>
                  <strong>{agentData.totalSales}</strong>
                </h5>
                <p>Total Sales Closed</p>
              </div>
              <div className="border_left_set"></div>
            </Col>

            <Col className="d-flex justify-content-evenly" xs={12} sm={4}>
              <div>
                <h5>
                  <strong>{agentData.salesVolume}</strong>
                </h5>
                <p>Sales Volume</p>
              </div>
              <div className="border_left_set"></div>
            </Col>
            <Col className="" xs={12} sm={4}>
              <div>
                <h5>
                  <strong>{agentData.highestSale}</strong>
                </h5>
                <p>Highest Sales Price</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <h4>
              <strong>About Tiffeny</strong>
            </h4>
            <div className="border_sec_bottom_set"></div>

            <p>
              Assisting someone with a huge milestone in their life, such as
              buying a home, is a very rewarding experience, and one
              responsibility I do not take lightly. When I found out that DRD
              not only provides up-to-date technology and valuable market
              resources, but also holds the same values as me, it wasn’t a hard
              decision to leave the traditional real estate role and become part
              of something greater! If you are in the market to find your dream
              home, I will help you navigate through the nuances of the real
              estate market until you find the perfect one to call home.
            </p>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 bg_icon_section d-flex justify-content-center py-5">
            <img src={img2} alt="" className="set_images_svg_width" />
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row">
          {/* Buttons for toggling between sections */}
          <div className="d-flex justify-content-center my-3 align-items-center mx-auto">
            <button
              className={`p-3 mx-3 rounded-3 ${
                activeSection === "active" ? "btn-primary" : ""
              }`}
              onClick={() => handleSectionChange("active")}
            >
              Active Listing
            </button>
            <button
              className={`p-3 mx-3 rounded-3 ${
                activeSection === "sold" ? "btn-primary" : ""
              }`}
              onClick={() => handleSectionChange("sold")}
            >
              Sold With Tiffany
            </button>
            <button
              className={`p-3 mx-3 rounded-3 ${
                activeSection === "bought" ? "btn-primary" : ""
              }`}
              onClick={() => handleSectionChange("bought")}
            >
              Bought With Tiffany
            </button>
          </div>

          {/* Conditionally render sections based on the active section */}
          {activeSection === "active" && (
            <div className="col-lg-8 mx-auto d-flex flex-row">
              <div
                className="col-lg-5 d-flex flex-column align-items-center"
                style={{ height: "480px", overflowY: "scroll" }}
              >
                <ProductAllCardsAgents />
              </div>
              <div className="col-lg-7">
                <ProductMap />
              </div>
            </div>
          )}

          {activeSection === "sold" && (
            <div className="col-lg-8 mx-auto d-flex flex-row">
              <div
                className="col-lg-5 d-flex flex-column align-items-center"
                style={{ height: "480px", overflowY: "scroll" }}
              >
                <ProductAllCardsAgents />
              </div>
              <div className="col-lg-7">
                <ProductMap />
              </div>
            </div>
          )}

          {activeSection === "bought" && (
            <div className="col-lg-8 mx-auto d-flex flex-row">
              <div
                className="col-lg-5 d-flex flex-column align-items-center"
                style={{ height: "480px", overflowY: "scroll" }}
              >
                <ProductAllCardsAgents />
              </div>
              <div className="col-lg-7">
                <ProductMap />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container-fluid review-carousel">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="review-carousel">
              <Carousel interval={null} indicators={false}>
                {reviews.map((review, index) => (
                  <Carousel.Item key={index}>
                    <div className="carousel-review">
                      <p className="review-text">
                        <span className="quote-mark">“</span>
                        {review.text}
                        <span className="quote-mark">”</span>
                      </p>
                      <p className="review-author">
                        {review.author} {review.date} for {review.price}
                      </p>
                      <Button
                        className="see-reviews-btn"
                        variant="outline-primary"
                      >
                        See all agent reviews
                      </Button>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>

              {/* Carousel Controls */}
              <div className="carousel-controls">
                <Button variant="link" className="control-btn">
                  ←
                </Button>
                <Button variant="link" className="control-btn">
                  →
                </Button>
              </div>

              {/* Pagination */}
              <div className="carousel-pagination">
                {reviews.map((_, index) => (
                  <span
                    key={index}
                    className={`pagination-dot ${index === 0 ? "active" : ""}`}
                  ></span>
                ))}
                <span className="pagination-text">3/3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="promo-container">
            <div className="promo-overlay">
              <div className="promo-content">
                <h1 className="promo-title">DRD PREMIER</h1>
                <h2 className="promo-subtitle">
                  The highest level of service from DRD's best agents
                </h2>
                <p className="promo-text">
                  DRD Premier agents are local luxury experts with years of
                  experience buying and selling high-end homes. Only our best
                  agents qualify to become DRD Premier agents.
                </p>
                <p className="promo-text">
                  When you're ready to buy, your agent will know what it takes
                  to write a winning offer for the most highly sought-after
                  homes. And when it's time to sell, they will know how to
                  price, prepare, and market your home, so it attracts qualified
                  buyers and sells for more.
                </p>
                <p className="promo-text">
                  Plus, keep more of the proceeds from your home sale by paying
                  a 1% listing fee when you buy and sell with us, less than half
                  of what brokerages commonly charge.
                </p>
                <button className="promo-button">Learn more</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid my-5">
        <div className="team-contact-container">
          {/* Team Section */}
          <div className="team-section">
            <h3>
              <strong>MEET TIFFENY'S TEAM</strong>
            </h3>
            <p>
              When you work with DRD, one agent is responsible for your success,
              but you really get a whole team. DRD agents work closely with a
              team of real estate professionals to ensure every sale closes
              without a hitch.
            </p>
            <div className="team-members">
              <div className="team-member">
                <img src={man1} alt="Cody South" />
                <h5>
                  <strong>Cody South</strong>
                </h5>
                <p>LISTING COORDINATOR</p>
              </div>
              <div className="team-member">
                <img src={man2} alt="Linda Mueller" />
                <h5>
                  <strong>Linda Mueller</strong>
                </h5>
                <p>TRANSACTION COORDINATOR</p>
              </div>
              <div className="team-member">
                <img src={man3} alt="Adrienne Flowers" />
                <h5>
                  <strong>Adrienne Flowers</strong>
                </h5>
                <p>SALES ADVISOR</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <form className="contact-form">
              <h3>
                <strong>ASK TIFFENY A QUESTION</strong>
              </h3>
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" placeholder="(  ) -" />

              <div className="checkbox-group">
                <label>
                  <strong>I'm considering</strong>
                </label>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={buying}
                      onChange={() => setBuying(!buying)}
                    />
                    Buying
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={selling}
                      onChange={() => setSelling(!selling)}
                    />
                    Selling
                  </label>
                </div>
              </div>

              <label htmlFor="message">What can we do for you?</label>
              <textarea id="message" rows="4" />

              <button type="submit" className="contact-button">
                Contact Tiffeny
              </button>
            </form>

            <div className="contact-agent-image">
              <img src={man4} alt="Tiffeny" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AgentProfile;
