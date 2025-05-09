import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MainCards from "../../components/MainCards";
import HomeBannerCard from "../../components/HomeBannerCard";
import img1 from "../../assets/images/real estate _1.jpg";
import img2 from "../../assets/images/real estate _10.jpg";
import img3 from "../../assets/images/real estate _11.jpg";
import logo from "../../assets/favicon/Logo.png";
import CityRealEstateList from "../../components/CityRealEstateList";
import RealEstateTabs from "../../components/RealEstateTabs";
import RentByCityList from "../../components/RentByCityList";
import Footer from "../../components/Footer";
import Header from "../../components/header";
import TaglineHeader from "../../components/TaglineHeader";
import Testimonial from "../../components/Testimonial";
import PurposeSection from "../../components/PurposeSection";
import ProcessSection from "../../components/ProcessSection";
import WhyZnet from "../../components/WhyZnet";
import AppartementsRealEstate from "../../components/AppartementsRealEstate";
import GetLocation from "../../components/ProductByLocation";
import { ToastContainer } from "react-toastify";
import Recommendations from "../../components/Recommandation";
import { Helmet } from "react-helmet";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SuccessStories from "../../components/SuccessStories";
import CharacterCard from "../../components/CharacterCard";
import { Carousel } from 'react-bootstrap';
import '../Home/Home.css';
import ExecutiveLeaders from "../../components/ExecutiveLeaders";
// import bilal from "../../assets/images/Bilal.jpg"


const Home = () => {
    const propertyImages = [img1, img2, img3];
    const [showModal, setShowModal] = useState(false);
    const [userRole, setUserRole] = useState("Guest");
    const [userId, setUserId] = useState(null);
    const [similarUsers, setSimilarUsers] = useState([]);
    const navigate = useNavigate();

    const [leaders, setLeaders] = useState([
        {
            "title": "M Bilal Irshad",
            "role": "Lead Developer, React Engineer, PHP Developer",
            "description": "M Bilal Irshad is a skilled Lead Developer with expertise in React and PHP. Passionate about building scalable web applications, Bilal combines deep technical knowledge with innovative problem-solving.",
            "image": "https://via.placeholder.com/300x300?text=bilal"
        },
        {
            "title": "Shayan Zulifqar",
            "role": "React Developer",
            "description": "Shayan Zulifqar is a dedicated React Developer, known for creating dynamic and responsive web applications. With a keen eye for UI/UX and strong coding skills, Shayan brings modern web experiences to life.",
            "image": "https://via.placeholder.com/300x300?text=Shayan+Zulifqar"
        },
        {
            "title": "Rashid",
            "role": "Web Designer",
            "description": "Rashid is a creative Web Designer who specializes in designing engaging and user-friendly websites. Focused on aesthetics and functionality, Rashid transforms ideas into stunning digital interfaces.",
            "image": "https://via.placeholder.com/300x300?text=Rashid"
        },
    ]);
    const [loading, setLoading] = useState(true);
    const [imagePath, setImagePath] = useState('');


    const fetchUserRole = () => {
        const storedUserRole = localStorage.getItem("roles");
        setUserRole(storedUserRole || "Guest");
    };

    const fetchUserId = () => {
        const storedUserId = localStorage.getItem("user_id");
        setUserId(storedUserId || null);
    };

    useEffect(() => {
        fetchUserRole();
        fetchUserId();

        const handleStorageChange = (event) => {
            if (event.key === "roles") {
                fetchUserRole();
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        setUserId(storedUserId || null);
    }, []);

    const fetchSimilarUsers = useCallback(async () => {
        if (!userId) return;
        try {
            const res = await axios.get(
                `https://api.biznetusa.com/api/getsimilarusers/${userId}`
            );
            setSimilarUsers(res.data.similar_users || []);
            setShowModal(true)
        } catch (err) {
            console.error("Failed to fetch similar users:", err);
            setSimilarUsers([]);
        }
    }, [userId]);

    useEffect(() => {
        fetchSimilarUsers();
    }, [userId]);

    const handleUserSelect = (user) => {
        navigate(`/Start-chat-with-znet`, {
            state: {
                user_id: userId,
                receiver_id: user.user_id,
                name: user.name,
            },
        });
    };

    return (
        <>
            <Helmet>
                <title>UrbanCraft REAL ESTATE Home</title>
                <meta
                    name="description"
                    content="Explore top properties in prime locations with UrbanCraft REAL ESTATE. Find your dream home or apartment in Chevy Chase and surrounding areas today."
                />
                <meta
                    name="keywords"
                    content="real estate, UrbanCraft REAL ESTATE, homes for sale, apartments for rent, Chevy Chase, luxury properties, real estate listings"
                />
                <meta property="og:title" content="UrbanCraft REAL ESTATE Home" />
                <meta
                    property="og:description"
                    content="Discover and explore top properties available in Chevy Chase and other prime locations with UrbanCraft REAL ESTATE. Begin your journey home with us."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content={logo} />
                <meta property="twitter:image" content={logo} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="UrbanCraft REAL ESTATE Home" />
                <meta
                    name="twitter:description"
                    content="Find your dream property in prime locations like Chevy Chase with UrbanCraft REAL ESTATE. Check out our premier listings and make an informed choice."
                />
                <meta name="twitter:image" content={logo} />
            </Helmet>
            {/* <UserProfiling */}
            {/*     userRole={userRole} */}
            {/*     showModal={showModal} */}
            {/*     setShowModal={setShowModal} */}
            {/* /> */}
            <ToastContainer />
            {/* <TaglineHeader /> */}
            <Header />
            <main className="Main_portion">
                {userId ? (
                    <div className="container-fluid px-4 pb-4 g-0 rounded bg-light">
                        <div id="anas__pava" className="d-flex">
                            <RealEstateTabs />
                            <HomeBannerCard
                                images={propertyImages}
                                location="Chevy Chase, MD"
                                price="$3,599,000"
                                title="UrbanCraft REAL ESTATE PREMIER LISTING"
                            />
                        </div>
                    </div>
                ) : (
                    <HomeBannerCard isLarge={true} />
                )}

                {/* Similar Users Modal */}
                <Modal 
                    show={showModal} 
                    onHide={() => setShowModal(false)} 
                    centered
                    className="similar-users-modal"
                    backdrop="static"
                >
                    <Modal.Header closeButton className="similar-users-header">
                        <Modal.Title className="d-flex align-items-center">
                            <i className="fas fa-users me-2"></i>
                            Similar Users
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="similar-users-body">
                        {similarUsers.length > 0 ? (
                            <ListGroup variant="flush" className="similar-users-list">
                                {similarUsers.map((user) => (
                                    <ListGroup.Item
                                        key={user.user_id}
                                        className="similar-user-item"
                                    >
                                        <div className="similar-user-content">
                                            <div className="similar-user-avatar">
                                                {user.name[0].toUpperCase()}
                                            </div>
                                            <div className="similar-user-info">
                                                <h6 className="similar-user-name">{user.name}</h6>
                                                <small className="similar-user-status">
                                                    <span className="status-dot online"></span>
                                                    Available to chat
                                                </small>
                                            </div>
                                            <Button
                                                variant="primary"
                                                className="chat-btn"
                                                onClick={() => handleUserSelect(user)}
                                            >
                                                <i className="fas fa-comment-dots me-2"></i>
                                                Chat Now
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <div className="no-users-found">
                                <div className="no-users-icon">
                                    <i className="fas fa-search"></i>
                                </div>
                                <h5>No similar users found</h5>
                                <p>We couldn't find any users matching your profile right now.</p>
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={() => setShowModal(false)}
                                    className="dismiss-btn"
                                >
                                    Dismiss
                                </Button>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer className="similar-users-footer">
                        <div className="users-count">
                            {similarUsers.length > 0 && (
                                <small>Found {similarUsers.length} user{similarUsers.length !== 1 ? 's' : ''} with similar interests</small>
                            )}
                        </div>
                        <Button 
                            variant="secondary" 
                            onClick={() => setShowModal(false)}
                            className="close-btn"
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                {userId ? (
                    <>
                        <MainCards />
                        <GetLocation />
                    </>
                ) : (
                    <Recommendations />
                )}
                {!userId && (
                    <>
                        <PurposeSection />
                        {/* <ProcessSection /> */}
                        {/* <WhyZnet /> */}
                        <Testimonial />
                        {/* <SuccessStories /> */}
                    </>
                )}

                <div className="container">

                  <ExecutiveLeaders/>
                </div>
            </main>

            <div className="container py-4">
                {/* <h3 className="m-3">Search for homes by city</h3> */}
                <CityRealEstateList />
                <hr className="my-5" />
                {/* <h3 className="m-3">Search for apartments by city</h3> */}
                <AppartementsRealEstate />
                {/* <hr className="my-5" />
                <h3 className="m-3">Search for houses for rent by city</h3>
                <RentByCityList /> */}
            </div>


            <Footer />
        </>
    );
};

export default Home;
