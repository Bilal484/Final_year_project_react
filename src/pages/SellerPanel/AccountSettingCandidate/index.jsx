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
    Tab,
    Nav,
    Alert,
} from "react-bootstrap";
import TimezoneSelect from "react-timezone-select";
import "./AccountSettingCandidate.css";
import img1 from "../../../assets/images/img_agent_career/salman-saqib-WaC-JFfF21M-unsplash.jpg";
import SellerAgentHeader from "../../../components/SellerAgentHeader";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import { signInWithGoogle, signInWithFacebook } from "../../../authMethods";
import imgLogo from "../../../assets/images/PNG Logo Files/Original Logo.png";
import { useNavigate } from "react-router-dom";

const AccountSettingCandidate = () => {
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

    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        if (userId) {
            axios
                .get(`https://api.biznetusa.com/api/user-profile/${userId}`)
                .then((response) => {
                    const { data } = response;
                    setUser((prevState) => ({
                        ...prevState,
                        ...data.allusers,
                        timezone: data.allusers.timezone || selectedTimezone,
                    }));
                    setSelectedTimezone(data.allusers.timezone || selectedTimezone);
                })
                .catch((error) => {
                    console.error("Error fetching user profile:", error);
                });
        }

        // Fetch all agents
        axios
            .get("https://api.biznetusa.com/api/all-agents")
            .then((response) => {
                setAgents(response.data.allusers || []);
            })
            .catch((error) => {
                console.error("Error fetching agents:", error);
            });
    }, [selectedTimezone]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleProfileUpdate = () => {
        const userId = localStorage.getItem("user_id");
        const formData = new FormData();

        // Append all user fields to the FormData object
        Object.keys(user).forEach((key) => {
            if (user[key] !== undefined && user[key] !== null) {
                formData.append(key, user[key]);
            }
        });

        // Append the profile image if it exists
        if (profileImage) {
            formData.append("image", profileImage);
        }

        axios
            .put(`https://api.biznetusa.com/api/profile-update/${userId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                alert("Profile updated successfully!");
                setErrors({});
            })
            .catch((error) => {
                if (error.response && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                } else {
                    alert("Failed to update profile.");
                    console.error("Update error:", error);
                }
            });
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
                    } else if (platform === "facebook") {
                        setUser((prevState) => ({
                            ...prevState,
                            connect_with_facebook: userCredential.user.displayName || "Connected",
                        }));
                    }
                }
            })
            .catch((err) => {
                console.error("Failed to connect:", err.message);
            });
    };

    const handleLogout = () => {
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name"); // Ensure this is also cleared
        localStorage.removeItem("token"); // If you use token
        setUserName(null);
        navigate("/login");
    };

    return (
        <>
            <Helmet>
                <title>Account Settings | Candidate Profile</title>
                <meta
                    name="description"
                    content="Manage your account settings, update your profile information, and configure preferences effortlessly on the Biznet Candidate platform."
                />
                <meta
                    name="keywords"
                    content="account settings, candidate profile, profile update, Biznet settings, user management, timezone selection"
                />
                <meta name="author" content="Biznet Team" />
            </Helmet>
            <Header />
            <SellerAgentHeader />
            <Container fluid className="account-setting-candidate-home py-4">
                <Image src={img1} alt="Header" className="w-100 mb-4" />
                <Row>
                    <Col>
                        <h4 className="py-4">Account Settings</h4>
                        <Tab.Container defaultActiveKey="profile">
                            <Row>
                                <Col md={3}>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="profile" className="btn d-flex justify-center">Profile</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col md={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="profile">
                                            <h5>Profile Information</h5>
                                            <Form>
                                                <Form.Group controlId="formName" className="mb-3">
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="name"
                                                        value={user.name}
                                                        onChange={handleInputChange}
                                                        isInvalid={!!errors.name}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.name && errors.name[0]}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group controlId="formEmail" className="mb-3">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        value={user.email}
                                                        onChange={handleInputChange}
                                                        isInvalid={!!errors.email}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.email && errors.email[0]}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group controlId="formPhoneNumberType" className="mb-3">
                                                    <Form.Label>Phone Number Type</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="phone_number_type"
                                                        value={user.phone_number_type}
                                                        onChange={handleInputChange}
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="formPhoneNumber" className="mb-3">
                                                    <Form.Label>Phone Number</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="phone_number"
                                                        value={user.phone_number}
                                                        onChange={handleInputChange}
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="formAgentId" className="mb-3">
                                                    <Form.Label>Agent</Form.Label>
                                                    <Form.Select
                                                        name="agent_id"
                                                        value={user.agent_id}
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
                                                <Form.Group controlId="formProfileImage" className="mb-3">
                                                    <Form.Label>Profile Image</Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        onChange={handleImageChange}
                                                    />
                                                    {user.image && (
                                                        <div className="mt-3">
                                                            <Image
                                                                src={`https://api.biznetusa.com/uploads/users/${user.image}`}
                                                                roundedCircle
                                                                style={{ width: "100px", height: "100px" }}
                                                            />
                                                        </div>
                                                    )}
                                                </Form.Group>
                                                <Form.Group controlId="formTimezone" className="mb-3">
                                                    <Form.Label>Select Timezone</Form.Label>
                                                    <TimezoneSelect
                                                        value={selectedTimezone}
                                                        onChange={setSelectedTimezone}
                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Connect with Google</Form.Label>
                                                    {user.connect_with_google ? (
                                                        <p>{`Connected with Google as ${user.connect_with_google}`}</p>
                                                    ) : (
                                                        <Button
                                                            onClick={() =>
                                                                handleSocialLogin(signInWithGoogle, "google")
                                                            }
                                                        >
                                                            Connect with Google
                                                        </Button>
                                                    )}
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Connect with Facebook</Form.Label>
                                                    {user.connect_with_facebook ? (
                                                        <p>{`Connected with Facebook as ${user.connect_with_facebook}`}</p>
                                                    ) : (
                                                        <Button
                                                            onClick={() =>
                                                                handleSocialLogin(signInWithFacebook, "facebook")
                                                            }
                                                        >
                                                            Connect with Facebook
                                                        </Button>
                                                    )}
                                                </Form.Group>

                                                <Button variant="primary" onClick={handleProfileUpdate}>
                                                    Save
                                                </Button>
                                            </Form>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default AccountSettingCandidate;
