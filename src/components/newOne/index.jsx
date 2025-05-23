import React, { useEffect, useState } from "react";
import "./header.css";
import imgLogo from "../../assets/favicon/znet.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BellIcon } from "lucide-react";
import { Dropdown, Modal, Button } from "react-bootstrap";

const Header = () => {
    const [userMenu, setUserMenu] = useState([])
    const [userName, setUserName] = useState(null);
    const [categories, setCategories] = useState([]); // To store categories
    const [loadingSubCategories, setLoadingSubCategories] = useState({}); // Loading state for subcategories
    const [subCategories, setSubCategories] = useState({}); // Store subcategories based on category ID
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [similarUsers, setSimilarUsers] = useState([]);
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [userRole, setUserRole] = useState(1);
    const [currentUser, setCurrentUser] = useState(null);
    const userId = localStorage.getItem('user_id')
    const menuItems = {
        1: [
            { path: "/Favorites", label: "Favorites" },
            { path: "/SavedSearches", label: "Saved Searches" },
            { path: "/OpenHouseSchedule", label: "Open House Schedule" },
            { path: "/Appointments", label: "Appointments" },
            { path: "/Agent", label: "Your Agent" },
            { path: "/start-an-offer", label: "Offers" },
            { path: "/Review", label: "Reviews" },
            // { path: "/OwnerDashboard", label: "Owner Dashboard" },
            { path: "/AccountSettings", label: "Account Settings" },
            // { path: "/UserSetting", label: "User Setting" }
        ],
        2: [
            { path: "/SellerProduct", label: "Home" },
            { path: "/AllTeam", label: "All Team" },
            { path: "/AllJob", label: "All Job" },
            // { path: "/CareerAgent", label: "Career Agent" },
            { path: "/JoinAgent", label: "Join Agent" },
            { path: "/AccountSettingCandidate", label: "Account Setting Candidate" },
            // { path: "/AssociateAgentIndependent", label: "Associate Agent Independent" },
            { path: "/CandidateHome", label: "Candidate Home" },
            // { path: "/HVHApply", label: "HVH Apply" },
            // { path: "/AgentThanks", label: "Agent Thanks" },
            // { path: "/MultiStepForm", label: "Multi-Step Form" },
            // { path: "/SuccessfulApply", label: "Successful Apply" },
            { path: "/JobAlert", label: "Job Alert" },
            { path: "/JoinTalentCommunity", label: "Join Talent Community" },
            { path: "/SaveJob", label: "Save Job" }
        ],
        10: [
            { path: "/Agent", label: "Your Agent" },
            { path: "/AccountSettingCandidate", label: "Account Setting Candidate" }
        ],
        14: [
            { path: "/ManageServiceContractor", label: "Manage Service Contractor" },
            { path: "/ContractorProduct", label: "Contractor Product" },
            { path: "/TaskProgress", label: "Task Progress" },
            { path: "/ScheduleProject", label: "Schedule Project" },
            { path: "/ReviewManagement", label: "Review Management" },
            { path: "/ProjectInquiries", label: "Project Inquiries" },
            { path: "/ClientCommunication", label: "Client Communication" }
        ],
        15: [
            { path: "/RealtorPanel", label: "Realtor Panel" }
        ]
    };

    const getMenuItemsForRole = (userRole) => menuItems[userRole] || [];



    useEffect(() => {
        const storedUserName = localStorage.getItem("user_name");
        const storedUserEmail = localStorage.getItem("user_email");

        if (storedUserName) {
            setUserName(storedUserName);
        } else if (storedUserEmail) {
            const emailNamePart = storedUserEmail.split("@")[0];
            setUserName(emailNamePart);
        } else {
            setUserName(null);
        }

        const storedUserRole = localStorage.getItem("roles");
        if (storedUserRole) {
            const cleanedRole = storedUserRole.replace(/"/g, "");
            const roleInt = parseInt(cleanedRole, 10);
            if (!isNaN(roleInt)) {
                setUserRole(roleInt);
                setUserMenu(getMenuItemsForRole(roleInt));
            } else {
                setUserRole(null);
            }
        }
    }, [location]); // Make sure 'location' is defined in your component or remove it if not used.

    const isAuthenticated = !!userName;
    const handleUserMatchClick = (user) => {
        setCurrentUser(user);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name"); // Ensure this is also cleared
        localStorage.removeItem("token"); // If you use token
        setUserName(null);
        navigate("/login");
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    "https://apitourism.today.alayaarts.com/api/get-category"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data.categories || []); // Set categories, ensure it's an array
            } catch (error) { }
        };

        fetchCategories();
    }, []);

    const fetchSubCategories = async (categoryId) => {
        try {
            setLoadingSubCategories((prevState) => ({
                ...prevState,
                [categoryId]: true,
            }));
            const response = await fetch(` https://apitourism.today.alayaarts.com/api/subcategories/${categoryId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch subcategories");
            }
            const data = await response.json();
            setSubCategories((prevState) => ({
                ...prevState,
                [categoryId]: data.categories[0].sub_categories,
            }));
        } catch (error) {
        } finally {
            setLoadingSubCategories((prevState) => ({
                ...prevState,
                [categoryId]: false,
            }));
        }
    };

    useEffect(() => {
        const fetchSimilarUsers = async () => {
            try {
                const response = await fetch(
                    `https://apitourism.today.alayaarts.com/api/getsimilarusers/${userId}`
                );
                const data = await response.json();
                if (data.status) {
                    setSimilarUsers(data.similar_users);
                }
            } catch (error) {
                console.error("Failed to fetch similar users", error);
            }
        };

        fetchSimilarUsers();
    }, []);

    const NotificationsDropdown = ({ users }) => {
        return (
            <Dropdown.Menu className="bg-white" show>
                {users.length > 0 ? (
                    users.map((user) => (
                        <Dropdown.Item key={user.user_id} href="#">
                            <strong>{user.name}</strong>
                            <br />
                            {user.email}
                            <br />
                            Matches: {user.match_count}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item>No users found</Dropdown.Item>
                )}
            </Dropdown.Menu>
        );
    };

    // const [userRole, setUserRole] = useState(null);
    // useEffect(() => {
    //     const fetchUserRole = () => {
    //         const storedUserRole = localStorage.getItem("roles");
    //         if (storedUserRole) {
    //             setUserRole(String(storedUserRole));  // Ensure it's treated as a string
    //         } else {
    //             setUserRole('Guest');  // Default to 'Guest' if no role found
    //         }
    //     };

    //     fetchUserRole();

    //     const handleStorageChange = (event) => {
    //         if (event.key === "roles") {
    //             fetchUserRole();
    //         }
    //     };

    //     window.addEventListener("storage", handleStorageChange);
    //     return () => {
    //         window.removeEventListener("storage", handleStorageChange);
    //     };
    // }, []);

    return (
        <>
            <Helmet>
                <title>UrbanCraft REAL ESTATE - Your Partner in Success</title>
                <meta
                    name="description"
                    content="Explore UrbanCraft REAL ESTATE's professional services. Navigate through categories and subcategories seamlessly to find the service you need."
                />
                <meta
                    name="keywords"
                    content="UrbanCraft REAL ESTATE, Categories, Subcategories, Professional Services"
                />
                <meta name="author" content="UrbanCraft REAL ESTATE Team" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="UrbanCraft REAL ESTATE" />
                <meta
                    property="og:description"
                    content="Browse through UrbanCraft REAL ESTATE's extensive categories and subcategories of professional services."
                />
                <meta property="og:image" content={imgLogo} />
                <meta property="og:url" content="https://www.biznetusa.com" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <div className="header-parent w-100">
                <header>
                    <nav className="navbar navbar-expand-lg bg-light p-md-3 p-0">
                        <div className="container-fluid ">
                            <div className="d-flex justify-content-between flex-row align-items-center small__div">
                                <div className="nav-item logo-nav">
                                    <Link className="navbar-brand text-danger fw-bold h1" to="/">
                                        <img src={imgLogo} width="80" alt="Logo" />
                                    </Link>
                                </div>

                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarNav"
                                    aria-controls="navbarNav"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </div>

                            <div
                                className="collapse navbar-collapse justify-content-md-end gap-3"
                                id="navbarNav"
                            >
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="text-muted" to="/">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="text-muted" to="/About">
                                            About
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="text-muted" to="/Licenese-Verifications">
                                            License Verifications
                                        </Link>
                                    </li>

                                    {/* Dynamic Categories and Subcategories */}
                                    {categories.length > 0 ? (
                                        categories.map((category) => (
                                            <>
                                                <li className="nav-item dropdown" key={category.id}>
                                                    <Link
                                                        className="nav-link text-start dropdown-toggle"
                                                        to={`/ category / ${category.id}`}
                                                        id={`navbarDropdown - ${category.id}`}
                                                        role="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        {category.cat_title}
                                                    </Link>
                                                    <ul
                                                        className="dropdown-menu"
                                                        aria-labelledby={`navbarDropdown - ${category.id}`}
                                                    >
                                                        <div className="dropdown-column">
                                                            <div className="dropdown-grid">
                                                                {category.sub_categories &&
                                                                    category.sub_categories.length > 0 ? (
                                                                    category.sub_categories.map((subCategory) => (
                                                                        <li key={subCategory.id}>
                                                                            <Link
                                                                                className="dropdown-item"
                                                                                to={`/ ${subCategory.sub_title.replace(
                                                                                    /\s+/g,
                                                                                    ""
                                                                                )
                                                                                    } / ${subCategory.id}`} // Generate URL based on title and ID
                                                                            >
                                                                                {subCategory.sub_title}
                                                                            </Link>
                                                                        </li>
                                                                    ))
                                                                ) : (
                                                                    <li>
                                                                        <span className="dropdown-item">
                                                                            No Subcategories
                                                                        </span>
                                                                    </li>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </ul>
                                                </li></>
                                        ))
                                    ) : (
                                        <li>No categories available.</li>
                                    )}

                                    <li className="nav-item">
                                        <Link className="text-muted" to="/HowtoWork">
                                            How It Works
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="text-muted" to="/Advertise">
                                            Advertise
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="text-muted" to="/Contact">
                                            Contact
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="text-muted" to="chat">
                                            Notifications
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Modal show={showModal} onHide={closeModal} centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Match Found!</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                {currentUser ? (
                                                    <>
                                                        Congratulations, you have matched with{" "}
                                                        {currentUser.name}!
                                                        <p>
                                                            Match Percentage: {currentUser.match_count * 10}%
                                                        </p>
                                                    </>
                                                ) : (
                                                    <p>No user data available.</p>
                                                )}
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={closeModal}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

                                        <Dropdown
                                            onMouseOver={() => setDropdownVisible(true)}
                                            onMouseLeave={() => setDropdownVisible(false)}
                                            show={dropdownVisible}
                                            align="end" // Align dropdown to the right end if it's under a bell icon on the right side of your nav
                                            className="notification-dropdown"
                                        >
                                            <Dropdown.Toggle
                                                as="span"
                                                className="text-muted"
                                                style={{
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <BellIcon />
                                                {similarUsers.length > 0 && (
                                                    <span className="notification-count">
                                                        {similarUsers.length}
                                                    </span>
                                                )}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="notification-menu bg-white">
                                                {similarUsers.length > 0 ? (
                                                    similarUsers.map((user) => (
                                                        <Dropdown.Item
                                                            key={user.user_id}
                                                            onClick={() => navigate("/chat")}
                                                            className="notification-item bg-white"
                                                        >
                                                            <div className="bg-white">
                                                                <strong>
                                                                    Wow, you got matched with {user.name}!
                                                                </strong>
                                                                <span>
                                                                    Match Percentage: {user.match_count * 10}%
                                                                </span>
                                                            </div>
                                                        </Dropdown.Item>
                                                    ))
                                                ) : (
                                                    <Dropdown.Item className="no-users">
                                                        No users found
                                                    </Dropdown.Item>
                                                )}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                </ul>

                                {/* Right Side (User Display or Login/Signup) */}
                                <div className="d-flex Listing_Details align-items-center ">
                                    {!isAuthenticated ? (
                                        <Link to="/Login">
                                            <button className="btn me-2 ">Login / SignUp</button>
                                        </Link>
                                    ) : (
                                        <li className="nav-item dropdown ">
                                            <Link
                                                className="nav-link"
                                                to="#"
                                                id="userDropdown"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <button className="btn me-2 ">{userName}</button>
                                            </Link>
                                            <ul
                                                className="dropdown-menu p-2 mt-2 two-column-dropdown"
                                                aria-labelledby="userDropdown"
                                            >
                                                <div className="dropdown-column">
                                                    <div className="dropdown-grid">
                                                        {userMenu.length > 0 ? (
                                                            userMenu.map((item, index) => (
                                                                <li key={index}>
                                                                    <Link to={item.path}>
                                                                        <span className="dropdown-item text-dark">{item.label}</span>
                                                                    </Link>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li className="dropdown-item text-muted">No menu available</li>
                                                        )}
                                                        <li>
                                                            <span
                                                                className="dropdown-item text-dark"
                                                                onClick={handleLogout}
                                                            >
                                                                Logout
                                                            </span>
                                                        </li>
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>
                </header >
            </div >
        </>
    );
};

export default Header;
