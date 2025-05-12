import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Image,
    Card,
    Badge,
    Toast,
    Spinner
} from "react-bootstrap";
import TimezoneSelect from "react-timezone-select";
import "./AccountSettings.css";
import SellerAgentHeader from "../../../components/SellerAgentHeader";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import { signInWithGoogle, signInWithFacebook } from "../../../authMethods";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaPhone, FaEnvelope, FaUser, FaClock, FaUserTie, FaCamera, FaSave, FaSignOutAlt } from "react-icons/fa";

const AccountSettings = () => {
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        user_role: "",
        phone_number_type: "",
        phone_number: "",
        connect_with_facebook: null,
        connect_with_google: null,
        image: "",
        agent_id: "",
        timezone: "",
    });

    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [userName, setUserName] = useState(null);
    const [selectedTimezone, setSelectedTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState("success");
    const [imagePreview, setImagePreview] = useState(null);
    const [activeTab, setActiveTab] = useState("profile");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const userId = localStorage.getItem("user_id");

            if (userId) {
                try {
                    const userResponse = await axios.get(`https://apitourism.today.alayaarts.com/api/user-profile/${userId}`);
                    const { data } = userResponse;
                    setUser((prevState) => ({
                        ...prevState,
                        ...data.allusers,
                        timezone: data.allusers.timezone || selectedTimezone,
                    }));
                    setSelectedTimezone(data.allusers.timezone || selectedTimezone);

                    if (data.allusers.image) {
                        setImagePreview(`https://apitourism.today.alayaarts.com/uploads/users/${data.allusers.image}`);
                    }

                    // Fetch all agents
                    const agentsResponse = await axios.get("https://apitourism.today.alayaarts.com/api/all-agents");
                    setAgents(agentsResponse.data.allusers || []);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    showToastMessage("Failed to load profile data", "danger");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate, selectedTimezone]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const showToastMessage = (message, variant = "success") => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleProfileUpdate = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem("user_id");
            const formData = new FormData();

            // Append all user fields to the FormData object
            Object.keys(user).forEach((key) => {
                if (user[key] !== undefined && user[key] !== null) {
                    formData.append(key, user[key]);
                }
            });

            // Append timezone
            formData.append("timezone", selectedTimezone.value || selectedTimezone);

            // Append the profile image if it exists
            if (profileImage) {
                formData.append("image", profileImage);
            }

            await axios.put(`https://apitourism.today.alayaarts.com/api/profile-update/${userId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            showToastMessage("Profile updated successfully!");
            setErrors({});
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
                showToastMessage("Please correct the errors in the form", "danger");
            } else {
                showToastMessage("Failed to update profile", "danger");
                console.error("Update error:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (loginFunction, platform) => {
        loginFunction()
            .then((userCredential) => {
                if (userCredential.user) {
                    if (platform === "google") {
                        setUser((prevState) => ({
                            ...prevState,
                            connect_with_google: userCredential.user.displayName || "Connected",
                        }));
                        showToastMessage("Connected with Google successfully!");
                    } else if (platform === "facebook") {
                        setUser((prevState) => ({
                            ...prevState,
                            connect_with_facebook: userCredential.user.displayName || "Connected",
                        }));
                        showToastMessage("Connected with Facebook successfully!");
                    }
                }
            })
            .catch((err) => {
                console.error("Failed to connect:", err.message);
                showToastMessage(`Failed to connect with ${platform}: ${err.message}`, "danger");
            });
    };

    const handleLogout = () => {
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        localStorage.removeItem("token");
        setUserName(null);
        navigate("/login");
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    if (loading && !user.name) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Account Settings | Candidate Profile</title>
                <meta
                    name="description"
                    content="Manage your account settings, update your profile information, and configure preferences effortlessly on the Biurbancraft real estate Candidate platform."
                />
                <meta
                    name="keywords"
                    content="account settings, candidate profile, profile update, Biurbancraft real estate settings, user management, timezone selection"
                />
                <meta name="author" content="Biurbancraft real estate Team" />
            </Helmet>

            <Header />
            <SellerAgentHeader />

            <div className="account-settings-hero">
                <div className="overlay"></div>
                <Container>
                    <h1 className="text-white">Account Settings</h1>
                    <p className="text-white">Manage your profile and preferences</p>
                </Container>
            </div>

            <Container className="account-settings-container my-5">
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    className="position-fixed top-0 end-0 m-4 z-index-toast"
                    bg={toastVariant}
                    text={toastVariant === "danger" ? "white" : "dark"}
                >
                    <Toast.Header closeButton>
                        <strong className="me-auto">Notification</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>

                <Row>
                    <Col lg={3} md={4} className="mb-4">
                        <Card className="profile-sidebar">
                            <Card.Body className="text-center">
                                <div className="profile-image-container mb-3">
                                    {imagePreview ? (
                                        <Image
                                            src={imagePreview}
                                            alt="Profile"
                                            className="profile-image"
                                            roundedCircle
                                        />
                                    ) : (
                                        <div className="profile-placeholder">
                                            <FaUser size={40} />
                                        </div>
                                    )}
                                </div>
                                <h4>{user.name || "User"}</h4>
                                <p className="text-muted">{user.email}</p>
                                <Badge bg="primary" className="mb-3">{user.user_role || "Candidate"}</Badge>

                                <div className="sidebar-menu">
                                    <Button
                                        variant={activeTab === "profile" ? "primary" : "light"}
                                        className="w-100 text-start mb-2 d-flex align-items-center"
                                        onClick={() => handleTabChange("profile")}
                                    >
                                        <FaUser className="me-2" /> Profile Information
                                    </Button>
                                    <Button
                                        variant={activeTab === "connections" ? "primary" : "light"}
                                        className="w-100 text-start mb-2 d-flex align-items-center"
                                        onClick={() => handleTabChange("connections")}
                                    >
                                        <FaGoogle className="me-2" /> Social Connections
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        className="w-100 text-start d-flex align-items-center mt-4"
                                        onClick={handleLogout}
                                    >
                                        <FaSignOutAlt className="me-2" /> Logout
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={9} md={8}>
                        <Card>
                            <Card.Body>
                                {activeTab === "profile" && (
                                    <>
                                        <h4 className="mb-4">Profile Information</h4>
                                        <Form>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group controlId="formName" className="mb-3">
                                                        <Form.Label>
                                                            <FaUser className="me-2 text-primary" /> Full Name
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="name"
                                                            value={user.name || ""}
                                                            onChange={handleInputChange}
                                                            isInvalid={!!errors.name}
                                                            placeholder="Enter your full name"
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.name && errors.name[0]}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="formEmail" className="mb-3">
                                                        <Form.Label>
                                                            <FaEnvelope className="me-2 text-primary" /> Email Address
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            name="email"
                                                            value={user.email || ""}
                                                            onChange={handleInputChange}
                                                            isInvalid={!!errors.email}
                                                            placeholder="Enter your email"
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.email && errors.email[0]}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group controlId="formPhoneNumberType" className="mb-3">
                                                        <Form.Label>
                                                            <FaPhone className="me-2 text-primary" /> Phone Type
                                                        </Form.Label>
                                                        <Form.Select
                                                            name="phone_number_type"
                                                            value={user.phone_number_type || ""}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="">Select type</option>
                                                            <option value="Mobile">Mobile</option>
                                                            <option value="Home">Home</option>
                                                            <option value="Work">Work</option>
                                                            <option value="Other">Other</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="formPhoneNumber" className="mb-3">
                                                        <Form.Label>
                                                            <FaPhone className="me-2 text-primary" /> Phone Number
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="phone_number"
                                                            value={user.phone_number || ""}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter your phone number"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group controlId="formAgentId" className="mb-3">
                                                        <Form.Label>
                                                            <FaUserTie className="me-2 text-primary" /> Assigned Agent
                                                        </Form.Label>
                                                        <Form.Select
                                                            name="agent_id"
                                                            value={user.agent_id || ""}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="">Select an agent</option>
                                                            {agents.map((agent) => (
                                                                <option key={agent.id} value={agent.id}>
                                                                    {agent.name}
                                                                </option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="formTimezone" className="mb-3">
                                                        <Form.Label>
                                                            <FaClock className="me-2 text-primary" /> Timezone
                                                        </Form.Label>
                                                        <TimezoneSelect
                                                            value={selectedTimezone}
                                                            onChange={setSelectedTimezone}
                                                            className="timezone-select"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group controlId="formProfileImage" className="mb-4">
                                                <Form.Label>
                                                    <FaCamera className="me-2 text-primary" /> Profile Image
                                                </Form.Label>
                                                <div className="profile-upload-container">
                                                    <div className="current-image">
                                                        {imagePreview && (
                                                            <Image
                                                                src={imagePreview}
                                                                alt="Profile Preview"
                                                                className="image-preview"
                                                                thumbnail
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="upload-controls">
                                                        <Form.Control
                                                            type="file"
                                                            onChange={handleImageChange}
                                                            className="mb-2"
                                                        />
                                                        <small className="text-muted">
                                                            Recommended size: 500x500 pixels (JPG, PNG)
                                                        </small>
                                                    </div>
                                                </div>
                                            </Form.Group>

                                            <div className="d-flex justify-content-end mt-4">
                                                <Button
                                                    variant="primary"
                                                    onClick={handleProfileUpdate}
                                                    disabled={loading}
                                                    className="d-flex align-items-center"
                                                >
                                                    {loading ? (
                                                        <>
                                                            <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                                className="me-2"
                                                            />
                                                            <span>Saving...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaSave className="me-2" /> Save Changes
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </Form>
                                    </>
                                )}

                                {activeTab === "connections" && (
                                    <>
                                        <h4 className="mb-4">Social Connections</h4>
                                        <Card className="mb-4">
                                            <Card.Body>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <div className="social-icon google-icon me-3">
                                                            <FaGoogle size={24} />
                                                        </div>
                                                        <div>
                                                            <h5 className="mb-0">Google</h5>
                                                            <p className="text-muted mb-0">
                                                                {user.connect_with_google
                                                                    ? `Connected as ${user.connect_with_google}`
                                                                    : "Connect your Google account"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {user.connect_with_google ? (
                                                        <Badge bg="success">Connected</Badge>
                                                    ) : (
                                                        <Button
                                                            variant="outline-primary"
                                                            onClick={() => handleSocialLogin(signInWithGoogle, "google")}
                                                        >
                                                            <FaGoogle className="me-2" /> Connect
                                                        </Button>
                                                    )}
                                                </div>
                                            </Card.Body>
                                        </Card>

                                        <Card>
                                            <Card.Body>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <div className="social-icon facebook-icon me-3">
                                                            <FaFacebook size={24} />
                                                        </div>
                                                        <div>
                                                            <h5 className="mb-0">Facebook</h5>
                                                            <p className="text-muted mb-0">
                                                                {user.connect_with_facebook
                                                                    ? `Connected as ${user.connect_with_facebook}`
                                                                    : "Connect your Facebook account"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {user.connect_with_facebook ? (
                                                        <Badge bg="success">Connected</Badge>
                                                    ) : (
                                                        <Button
                                                            variant="outline-primary"
                                                            onClick={() => handleSocialLogin(signInWithFacebook, "facebook")}
                                                        >
                                                            <FaFacebook className="me-2" /> Connect
                                                        </Button>
                                                    )}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </>
    );
};

export default AccountSettings;