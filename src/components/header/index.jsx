import React, { useEffect, useState, useRef } from "react";
import "./header.css";
import imgLogo from "../../assets/favicon/Logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ChevronDown, BellIcon, User, LogOut, Menu, X } from "lucide-react";
import { Dropdown, Modal, Button } from "react-bootstrap";

const Header = () => {
    const [userMenu, setUserMenu] = useState([]);
    const [userName, setUserName] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loadingSubCategories, setLoadingSubCategories] = useState({});
    const [subCategories, setSubCategories] = useState({});
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [similarUsers, setSimilarUsers] = useState([]);
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [userRole, setUserRole] = useState(1);
    const [currentUser, setCurrentUser] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const headerRef = useRef(null);

    const userId = localStorage.getItem("user_id");
    const menuItems = {
        1: [
            { path: "/Favorites", label: "Favorites", icon: "❤️" },
            // { path: "/SavedSearches", label: "Saved Searches", icon: "🔍" },
            { path: "/OpenHouseSchedule", label: "Open House Schedule", icon: "🏠" },
            { path: "/Appointments", label: "Appointments", icon: "📅" },
            { path: "/Agent", label: "Your Agent", icon: "👤" },
            { path: "/Offer", label: "Offers", icon: "📝" },
            { path: "/Review", label: "Reviews", icon: "⭐" },
            // { path: "/OwnerDashboard", label: "Owner Dashboard", icon: "📊" },
            { path: "/AccountSettings", label: "Account Settings", icon: "⚙️" },
            { path: "/UserSetting", label: "User Setting", icon: "🔧" },
        ],
        2: [
            { path: "/SellerProduct", label: "Home", icon: "🏠" },
            // { path: "/AllTeam", label: "All Team", icon: "👥" },
            // { path: "/AllJob", label: "All Job" },
            // { path: "/CareerAgent", label: "Career Agent" },
            // { path: "/JoinAgent", label: "Join Agent" },
            { path: "/AccountSettingCandidate", label: "Account Setting Candidate", icon: "⚙️" },
            { path: "/CandidateHome", label: "Candidate Home" },
            { path: "/TourRequest", label: "Tour Request" },
            { path: "/Property-Offers", label: "Property Offers" },
            { path: "/Property-Bids", label: "Property Bids" },
            // { path: "/HVHApply", label: "HVH Apply" },
            // { path: "/AgentThanks", label: "Agent Thanks" },
            // { path: "/MultiStepForm", label: "Multi-Step Form" },
            // { path: "/SuccessfulApply", label: "Successful Apply" },
            // { path: "/JobAlert", label: "Job Alert" },
            { path: "/JoinTalentCommunity", label: "Join Talent Community" },
            // { path: "/SaveJob", label: "Save Job" },
        ],
        10: [
            { path: "/Agent", label: "Your Agent" },
            { path: "/AccountSettingCandidate", label: "Account Setting Candidate" },
        ],
        14: [
            { path: "/ManageServiceContractor", label: "Manage Service Contractor" },
            { path: "/ContractorProduct", label: "Contractor Product" },
            { path: "/TaskProgress", label: "Task Progress" },
            { path: "/ScheduleProject", label: "Schedule Project" },
            { path: "/ReviewManagement", label: "Review Management" },
            { path: "/ProjectInquiries", label: "Project Inquiries" },
            { path: "/ClientCommunication", label: "Client Communication" },
        ],
        15: [{ path: "/RealtorPanel", label: "Realtor Panel" }],
    };

    const getMenuItemsForRole = (userRole) => menuItems[userRole] || [];

    // Handle scroll effect for header
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Set user information
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
    }, [location]);

    // Click outside handler for mobile menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const isAuthenticated = !!userName;

    const handleLogout = () => {
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        setUserName(null);
        navigate("/login");
    };

    // Fetch categories
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
                setCategories(data.categories || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const fetchSubCategories = async (categoryId) => {
        try {
            setLoadingSubCategories((prevState) => ({
                ...prevState,
                [categoryId]: true,
            }));
            const response = await fetch(
                `https://apitourism.today.alayaarts.com/api/subcategories/${categoryId}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch subcategories");
            }
            const data = await response.json();
            setSubCategories((prevState) => ({
                ...prevState,
                [categoryId]: data.categories[0].sub_categories,
            }));
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        } finally {
            setLoadingSubCategories((prevState) => ({
                ...prevState,
                [categoryId]: false,
            }));
        }
    };

    // Fetch similar users
    useEffect(() => {
        if (userId) {
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
        }
    }, [userId]);

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

            <div className={`header-parent w-100 ${scrolled ? "scrolled" : ""}`} ref={headerRef}>
                <header>
                    <nav className={`navbar navbar-expand-lg p-md-3 p-0 ${scrolled ? "scrolled" : ""}`}>
                        <div className="container">
                            <div className="d-flex justify-content-between flex-row align-items-center small__div">
                                <div className="nav-item logo-nav">
                                    <Link className="navbar-brand" to="/">
                                        <img src={imgLogo} width="80" alt="UrbanCraft Logo" />
                                    </Link>
                                </div>

                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    aria-controls="navbarNav"
                                    aria-expanded={mobileMenuOpen}
                                    aria-label="Toggle navigation"
                                >
                                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                </button>
                            </div>

                            <div
                                className={`collapse navbar-collapse justify-content-md-end gap-3 ${mobileMenuOpen ? "show" : ""
                                    }`}
                                id="navbarNav"
                            >
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/About">About</Link>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link
                                            className="nav-link dropdown-toggle d-flex align-items-center"
                                            to="#"
                                            id="navbarDropdown1"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Browse Properties{" "}
                                            <ChevronDown size={16} className="ms-1" />
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                                            <div className="dropdown-column">
                                                <div className="dropdown-grid">
                                                    <li>
                                                        <Link className="dropdown-item" to="/Buy">
                                                            Buy
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/Sell">
                                                            Sell
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/Rent">
                                                            Rent
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/Sub2Deal">
                                                            Sub2 Deals
                                                        </Link>
                                                    </li>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link
                                            className="nav-link dropdown-toggle d-flex align-items-center"
                                            to="#"
                                            id="navbarDropdown2"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Services <ChevronDown size={16} className="ms-1" />
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                                            <div className="dropdown-column">
                                                <div className="dropdown-grid">
                                                    <li>
                                                        <Link className="dropdown-item" to="/Investors">
                                                            Investors
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/Realtors">
                                                            Realtors
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/Developers">
                                                            Developers
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/Flippers">
                                                            Flippers
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/Contractors">
                                                            Contractors
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            className="dropdown-item"
                                                            to="/TransactionCordinator"
                                                        >
                                                            Transaction Coordinators
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/Wholesaler">
                                                            Wholesalers
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/Lenders">
                                                            Lenders
                                                        </Link>
                                                    </li>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link
                                            className="nav-link dropdown-toggle d-flex align-items-center"
                                            to="#"
                                            id="navbarDropdown3"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Resources <ChevronDown size={16} className="ms-1" />
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown3">
                                            <div className="dropdown-column">
                                                <div className="dropdown-grid">
                                                    <li>
                                                        <Link className="dropdown-item" to="/Blog">
                                                            Blogs
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/FAQs">
                                                            FAQs
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/Guides">
                                                            Guides
                                                        </Link>
                                                    </li>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/HowtoWork">How It Works</Link>
                                    </li>
                                </ul>

                                <div className="d-flex Listing_Details align-items-center">
                                    {!isAuthenticated ? (
                                        <Link to="/Login">
                                            <button className="btn btn-primary">Login / SignUp</button>
                                        </Link>
                                    ) : (
                                        <li className="nav-item dropdown list-unstyled">
                                            <Link
                                                className="nav-link dropdown-toggle d-flex align-items-center"
                                                to="#"
                                                id="userDropdown"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <div className="user-avatar me-2 d-flex align-items-center justify-content-center">
                                                    <User size={18} />
                                                </div>
                                                {userName}
                                            </Link>
                                            <ul
                                                className="dropdown-menu two-column-dropdown p-2 mt-2"
                                                aria-labelledby="userDropdown"
                                            >
                                                <div className="dropdown-column">
                                                    <div className="dropdown-grid">
                                                        {userMenu.length > 0 ? (
                                                            userMenu.map((item, index) => (
                                                                <li key={index}>
                                                                    <Link to={item.path} className="dropdown-item d-flex align-items-center">
                                                                        <span className="me-2">{item.icon}</span>
                                                                        {item.label}
                                                                    </Link>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li className="dropdown-item text-muted">
                                                                No menu available
                                                            </li>
                                                        )}
                                                        <li>
                                                            <button
                                                                className="dropdown-item d-flex align-items-center"
                                                                onClick={handleLogout}
                                                            >
                                                                <LogOut size={16} className="me-2" />
                                                                Logout
                                                            </button>
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
                </header>
            </div>
        </>
    );
};

export default Header;
