import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Card, Button, Row, Col, Image, Carousel, Spinner } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import "./AgentProfile.css";
import img2 from "../../assets/images/Owner-Dashboard/Sell with Redfin/PresidentsClub_NoYear.svg";
import img1 from "../../assets/images/real estate _12.jpg";
import man1 from "../../assets/images/Owner-Dashboard/Sell with Redfin/man_01.jpg";
import man2 from "../../assets/images/Owner-Dashboard/Sell with Redfin/man_02.jpg";
import man3 from "../../assets/images/Owner-Dashboard/Sell with Redfin/man_03.jpg";
import man4 from "../../assets/images/Owner-Dashboard/Sell with Redfin/man_04.jpg";
import ProductAllCardsAgents from "../../components/Agent/ProductList";
import ProductMap from "../../components/Agent/ProductMap";
import ChatComponent from "../../components/ChatComponent";

// Placeholder data for when API call is loading or fails
const placeholderData = {
  name: "Agent Profile",
  license: "License Pending",
  homesClosed: 0,
  areas: ["Area information unavailable"],
  phone: "Contact information unavailable",
  totalSales: 0,
  salesVolume: "N/A",
  highestSale: "N/A",
};

const AgentProfile = () => {
  const [activeSection, setActiveSection] = useState("active");
  const [buying, setBuying] = useState(true);
  const [selling, setSelling] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the agent ID from URL parameters
  const { id } = useParams();

  // Format phone number for display
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return 'N/A';

    // If number already has formatting, return as is
    if (phoneNumber.includes('(') || phoneNumber.includes('-')) {
      return phoneNumber;
    }

    // Remove any non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Check if it's a valid US/Canadian number (10 digits)
    if (cleaned.length === 10) {
      return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
    } else if (cleaned.length === 11 && cleaned[0] === '1') {
      // Handle numbers with country code 1
      return `(${cleaned.substring(1, 4)}) ${cleaned.substring(4, 7)}-${cleaned.substring(7, 11)}`;
    } else {
      return phoneNumber; // Return original if format is unknown
    }
  };

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        setLoading(true);

        // If we have an ID, fetch specific agent
        if (id) {
          // First try to get the specific agent
          try {
            const response = await axios.get(`https://api.biznetusa.com/api/agent/${id}`);
            if (response.data) {
              setAgent(response.data);
              setLoading(false);
              return;
            }
          } catch (specificErr) {
            console.error("Error fetching specific agent, trying all agents:", specificErr);
          }

          // If the specific endpoint fails, get all agents and filter
          const allResponse = await axios.get('https://api.biznetusa.com/api/all-agents');
          if (allResponse.data && allResponse.data.allusers) {
            const foundAgent = allResponse.data.allusers.find(agent => agent.id.toString() === id.toString());
            if (foundAgent) {
              setAgent(foundAgent);
            } else {
              setError("Agent not found");
            }
          }
        } else {
          // If no ID provided, get all agents and use first one
          const response = await axios.get('https://api.biznetusa.com/api/all-agents');
          if (response.data && response.data.allusers && response.data.allusers.length > 0) {
            const agentData = response.data.allusers.filter(agent => agent.user_role === "10");
            if (agentData.length > 0) {
              setAgent(agentData[0]); // Use the first agent in the list
            } else {
              setError("No agents found");
            }
          }
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching agent data:", err);
        setError("Failed to load agent data. Please try again later.");
        setLoading(false);
      }
    };

    fetchAgentData();
  }, [id]);

  // Enhanced agent data (with combined data from API and static data)
  const agentData = agent ? {
    name: agent.name || "Unknown Agent",
    license: agent.license || "475166803",
    homesClosed: 284,
    areas: [
      "Far North Side",
      "Lake View",
      "Lincoln Park",
      "North Center",
      "Northwest",
    ],
    phone: formatPhoneNumber(agent.phone_number) || "(773) 570-9981",
    email: agent.email || "agent@example.com",
    totalSales: 284,
    salesVolume: "$118M",
    highestSale: "$1.9M",
    role: agent.roles?.role_name || "Agent"
  } : placeholderData;

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const toggleChat = () => {
    setShowChat((prevShowChat) => !prevShowChat);
  };

  const reviews = [
    {
      text: "Working with our agent as first time home buyers was great. They initially met with us to walk us through what the home buying process looked like from start to end.",
      author: "Arpit K",
      date: "Closed May '23",
      price: "$317,000",
    },
    {
      text: "Our agent was an incredible guide through our selling process. Their knowledge and dedication helped us achieve the best price for our home.",
      author: "John D",
      date: "Closed Dec '23",
      price: "$520,000",
    },
    {
      text: "Buying our second home with this agent was a breeze. They really understand what their clients want and delivers.",
      author: "Emily R",
      date: "Closed Jun '24",
      price: "$475,000",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Agent Profile - {agentData.name} | UrbanCraft Premier</title>
        <meta
          name="description"
          content={`Explore ${agentData.name}'s agent profile. Learn about their expertise, areas served, sales stats, and client reviews. Connect with them for your real estate needs.`}
        />
        <meta
          name="keywords"
          content={`Real Estate, ${agentData.name}, Agent Profile, UrbanCraft Premier, Homes for Sale, Homes Sold, Real Estate Agent, Property Listings, Client Reviews`}
        />
        <meta name="author" content="UrbanCraft Premier" />
      </Helmet>

      <Header />

      {loading ? (
        <div className="loading-container">
          <Spinner animation="border" variant="primary" />
          <p>Loading agent profile...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="alert alert-danger">
            {error}
            <Link to="/agents" className="btn btn-outline-primary mt-3">
              Return to Agent Search
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="container mx-auto">
            <div className="agent-profile-container">
              <div className="back-link">
                <Link to="/Agent" className="text-muted ms-5">
                  <i className="fas fa-arrow-left me-2"></i>Back to Agent Search
                </Link>
              </div>
            </div>

            {/* Agent Card Section */}
            <div className="container set_width_height_margin">
              <Row className="align-items-center agent-row d-flex">
                <div className="col-lg-1"></div>
                <Col xs={12} md={5}>
                  <Card className="agent-details-card shadow">
                    <Card.Body>
                      <div className="logo-section">
                        <span className="redfin-principal text-uppercase">
                          UrbanCraft {agentData.role}
                        </span>
                        <div className="logo">{agentData.role?.charAt(0) || 'A'}</div>
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
                      <Button variant="link" className="view-more-btn p-0">View More</Button>
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
                    src={agent?.image ? `https://api.biznetusa.com/uploads/${agent.image}` : img1}
                    alt={agentData.name}
                    fluid
                    rounded
                    className="agent-image"
                  />
                </Col>
                <div className="col-lg-1"></div>
              </Row>

              {/* Sales Stats */}
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

          {/* About Section */}
          <div className="container my-5">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <h4>
                  <strong>About {agentData.name.split(' ')[0]}</strong>
                </h4>
                <div className="border_sec_bottom_set"></div>

                <p>
                  Assisting someone with a huge milestone in their life, such as
                  buying a home, is a very rewarding experience, and one
                  responsibility I do not take lightly. When I found out that UrbanCraft
                  not only provides up-to-date technology and valuable market
                  resources, but also holds the same values as me, it wasn't a hard
                  decision to leave the traditional real estate role and become part
                  of something greater! If you are in the market to find your dream
                  home, I will help you navigate through the nuances of the real
                  estate market until you find the perfect one to call home.
                </p>
              </div>
            </div>
          </div>

          {/* Icon Section */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 bg_icon_section d-flex justify-content-center py-5">
                <img src={img2} alt="President's Club Award" className="set_images_svg_width" />
              </div>
            </div>
          </div>

          {/* Listing Tabs */}
          <div className="container my-5">
            <div className="row">
              <div className="tab-buttons-container">
                <button
                  className={`tab-button ${activeSection === "active" ? "active" : ""}`}
                  onClick={() => handleSectionChange("active")}
                >
                  <i className="fas fa-list-ul me-2"></i>
                  Active Listing
                </button>
                <button
                  className={`tab-button ${activeSection === "sold" ? "active" : ""}`}
                  onClick={() => handleSectionChange("sold")}
                >
                  <i className="fas fa-check-circle me-2"></i>
                  Sold With {agentData.name.split(' ')[0]}
                </button>
                <button
                  className={`tab-button ${activeSection === "bought" ? "active" : ""}`}
                  onClick={() => handleSectionChange("bought")}
                >
                  <i className="fas fa-shopping-bag me-2"></i>
                  Bought With {agentData.name.split(' ')[0]}
                </button>
              </div>

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

          {/* Reviews Carousel */}
          <div className="container-fluid review-carousel">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="review-carousel">
                  <Carousel interval={null} indicators={false}>
                    {reviews.map((review, index) => (
                      <Carousel.Item key={index}>
                        <div className="carousel-review">
                          <p className="review-text">
                            <span className="quote-mark">"</span>
                            {review.text}
                            <span className="quote-mark">"</span>
                          </p>
                          <p className="review-author">
                            {review.author} • {review.date} • {review.price}
                          </p>
                          <Button
                            className="see-reviews-btn"
                            variant="outline-primary"
                          >
                            <i className="fas fa-star me-2"></i>
                            See all agent reviews
                          </Button>
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>

                  <div className="carousel-controls">
                    <Button variant="link" className="control-btn">
                      <i className="fas fa-chevron-left"></i>
                    </Button>
                    <Button variant="link" className="control-btn">
                      <i className="fas fa-chevron-right"></i>
                    </Button>
                  </div>

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
          {/* Promo Section */}
          <div className="container-fluid">
            <div className="row">
              <div className="promo-container">
                <div className="promo-overlay">
                  <div className="promo-content">
                    <h1 className="promo-title">URBANCRAFT PREMIER</h1>
                    <h2 className="promo-subtitle">
                      The highest level of service from UrbanCraft's best agents
                    </h2>
                    <p className="promo-text">
                      UrbanCraft Premier agents are local luxury experts with years of
                      experience buying and selling high-end homes. Only our best
                      agents qualify to become UrbanCraft Premier agents.
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
                    <button className="promo-button">
                      <i className="fas fa-arrow-right me-2"></i>
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team & Contact Section */}
          <div className="container-fluid my-5">
            <div className="team-contact-container">
              {/* Team Section */}
              <div className="team-section">
                <h3>
                  <strong>MEET {agentData.name.toUpperCase()}'S TEAM</strong>
                </h3>
                <p>
                  When you work with UrbanCraft, one agent is responsible for your success,
                  but you really get a whole team. UrbanCraft agents work closely with a
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
                <form className="contact-form text-white">
                  <h3>
                    <strong className="text-white">ASK {agentData.name.toUpperCase().split(' ')[0]} A QUESTION</strong>
                  </h3>
                  <label className="text-white" htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" placeholder="(  ) -" className="text-white" />

                  <div className="checkbox-group">
                    <label>
                      <strong className="text-white">I'm considering</strong>
                    </label>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          className="text-white"
                          checked={buying}
                          onChange={() => setBuying(!buying)}
                        />
                        <span className="text-white">Buying</span>

                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={selling}
                          className="text-white"
                          onChange={() => setSelling(!selling)}
                        />
                        <span className="text-white">Selling</span>
                      </label>
                    </div>
                  </div>

                  <label htmlFor="message" className="text-white">What can we do for you?</label>
                  <textarea id="message" rows="4" className="text-white" />

                  <button type="submit" className="contact-button">
                    <i className="fas fa-paper-plane me-2"></i>
                    Contact {agentData.name.split(' ')[0]}
                  </button>
                </form>

                <div className="contact-agent-image">
                  <img src={man4} alt="Tiffeny" />
                </div>
              </div>
            </div>      </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default AgentProfile;
