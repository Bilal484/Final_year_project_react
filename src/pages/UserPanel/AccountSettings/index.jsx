import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Navbar, Nav, Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./AccountSettings.css";
import UserHeader from "../../../components/UserHeader";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";

const AccountSettings = () => {
  const [userData, setUserData] = useState({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneType: "Type",
    userRole: "", 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  
  const user_id = localStorage.getItem("user_id");

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://api.biznetusa.com/api/user-profile/${user_id}`);
        const data = response.data;

        
        setUserData({
          name: data.name || "", 
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          phoneType: data.phone_type || "Type",
          userRole: data.user_role || "", 
        });

        setLoading(false);
      } catch (error) {
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    };

    if (user_id) {
      fetchUserData();
    } else {
      setError("User not logged in.");
      setLoading(false);
    }
  }, [user_id]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.put(`https://api.biznetusa.com/api/profile-update/${user_id}`, {
        name: userData.name,
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        phone_type: userData.phoneType,
        user_role: userData.userRole, 
      });
      setMessage("Profile updated successfully!");
    } catch (error) {
      
      if (error.response && error.response.data.errors) {
        setError(Object.values(error.response.data.errors).flat().join(", "));
      } else {
        setError("Failed to update profile.");
      }
    }
  };

  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
    <Helmet>
        <title>Account Settings | UrbanCraft REAL ESTATE</title>
        <meta
          name="description"
          content="Manage your account settings, update your profile, link accounts, and adjust preferences for a personalized experience on UrbanCraft REAL ESTATE."
        />
        <meta
          name="keywords"
          content="Account Settings, Profile Management, Linked Accounts, User Role, UrbanCraft REAL ESTATE"
        />
        <meta name="author" content="UrbanCraft REAL ESTATE" />
        <meta property="og:title" content="Account Settings | UrbanCraft REAL ESTATE" />
        <meta
          property="og:description"
          content="Easily manage your profile settings, linked accounts, and preferences with UrbanCraft REAL ESTATE's comprehensive account management tools."
        />
        <meta
          property="og:image"
          content="https://api.biznetusa.com/uploads/account-settings-banner.jpg"
        />
        <meta property="og:url" content="https://biznetusa.com/account-settings" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <UserHeader />
      <div className="account-settings-container">
            {/* Top Navigation Bar */}
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand href="#home">Account Settings</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#profile">Profile</Nav.Link>
                            <Nav.Link href="#group-settings">Group Settings</Nav.Link>
                            <Nav.Link href="#linked-accounts">Linked Accounts</Nav.Link>
                            <Nav.Link href="#touring-offers">Touring & Offers</Nav.Link>
                            <Nav.Link href="#close-account">Close Account</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main Content */}
            <Container>
                <h2 className="text-center mb-4">Account Settings</h2>

                <Form>
                    {/* Full Name */}
                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group controlId="fullName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter full name" />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* First and Last Name, Email */}
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter first name" />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter last name" />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Phone Number and User Role */}
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="phone">
                                <Form.Label>Phone Number</Form.Label>
                                <div className="d-flex">
                                    <Form.Select className="me-2">
                                        <option>Type</option>
                                        <option value="mobile">Mobile</option>
                                        <option value="home">Home</option>
                                    </Form.Select>
                                    <Form.Control type="text" placeholder="Enter phone number" />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="userRole">
                                <Form.Label>User Role</Form.Label>
                                <Form.Control type="text" placeholder="Enter user role" />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Save Button */}
                    <div className="text-end">
                        <Button type="submit" variant="success">
                            Save Updates
                        </Button>
                    </div>
                </Form>

                {/* Additional Sections */}
                <section id="group-settings" className="mt-5">
                    <h4>Group Settings</h4>
                    <p>Your Shared Search</p>
                    <Button variant="light" className="mb-2">
                        <i className="fa fa-heart" /> Add your search partner
                    </Button>
                </section>

                <section id="linked-accounts" className="mt-5">
                    <h4>Linked Accounts</h4>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" className="me-3">Connect Facebook</Button>
                        <Button variant="secondary">Unlink Google</Button>
                    </div>
                </section>

                <section id="touring-offers" className="mt-5">
                    <h4>Touring and Offers</h4>
                    <div>
                        <p>
                            <Form.Label>Pre-Approval Letter</Form.Label>
                            <span className="ms-2 text-muted">None specified</span>
                            <Button variant="light" className="ms-3">Upload letter</Button>
                        </p>
                        <p>
                            <Form.Label>Verify Your ID</Form.Label>
                            <span className="ms-2 text-danger">Not yet verified</span>
                            <Button variant="light" className="ms-3">Verify ID</Button>
                        </p>
                        <Form.Check type="checkbox" id="allowInsights" label="Allow offer insights" />
                    </div>
                </section>

                <section id="close-account" className="mt-5">
                    <h4>Close Account</h4>
                    <p className="text-danger">Delete Your Account</p>
                </section>
            </Container>
        </div>
      <Footer />
    </>
  );
};

export default AccountSettings;
