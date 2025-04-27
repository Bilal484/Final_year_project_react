import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import MainCards from "../../components/MainCards";
import HomeBannerCard from "../../components/HomeBannerCard";
import img1 from "../../assets/images/real estate _1.jpg";
import img2 from "../../assets/images/real estate _10.jpg";
import img3 from "../../assets/images/real estate _11.jpg";
import logo from "../../assets/favicon/znet.jpg";
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
            "image": "https://via.placeholder.com/300x300?text=Bilal+Irshad"
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
        {
            "title": "Engr.Muhammad Fayyaz",
            "role": "Senior Developer of Codesinc",
            "description": "Eng. Muhammad Fayyaz is the CEO of Codesinc and a skilled web developer. Passionate about technology and innovation, he leads a team that creates cutting-edge websites and web solutions. Fayyaz specializes in full-stack development and custom web solutions, helping Codesinc push the limits of web development to deliver smooth, user-friendly experiences.",
            "image": "https://api.biznetusa.com/uploads/leaders/1734610403.jpg"
        }
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
            <TaglineHeader />
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
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header style={{ backgroundColor: "var(--background_color)" }} closeButton>
                        <Modal.Title>Similar Users</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-white">
                        {similarUsers.length > 0 ? (
                            <ListGroup>
                                {similarUsers.map((user) => (
                                    <ListGroup.Item
                                        key={user.user_id}
                                        className="d-flex justify-content-between align-items-center"
                                    >
                                        <span>{user.name}</span>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => handleUserSelect(user)}
                                        >
                                            Chat
                                        </Button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <p className="text-center text-muted">
                                No similar users found.
                            </p>
                        )}
                    </Modal.Body>
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

                    <h3 className="text-center mb-5 display-5 fw-bold">Executive Leadership</h3>

                    <Carousel>
                        <Carousel.Item>
                            <div className="d-flex flex-row justify-content-around">
                                {leaders.map((leader, idx) => (
                                    <div className="p-2 card-container" key={leader.id}>
                                        <CharacterCard
                                            name={leader.title}
                                            title={leader.role}
                                            description={leader.description}
                                            image={leader.image ? `${imagePath}${leader.image}` : "placeholder-image-url.jpg"}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </main>

            <div className="container py-4">
                <h3 className="m-3">Search for homes by city</h3>
                <CityRealEstateList />
                <hr className="my-5" />
                <h3 className="m-3">Search for apartments by city</h3>
                <AppartementsRealEstate />
                <hr className="my-5" />
                <h3 className="m-3">Search for houses for rent by city</h3>
                <RentByCityList />
            </div>


            <Footer />
        </>
    );
};

export default Home;
