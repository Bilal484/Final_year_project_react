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
import Header from "../../components/Header";
// import SellerHeader from "../../components/TaglineHeader";
import Testimonial from "../../components/Testimonial";
import PurposeSection from "../../components/PurposeSection";
import ProcessSection from "../../components/ProcessSection";
import WhyZnet from "../../components/WhyZnet";
import AppartementsRealEstate from "../../components/AppartementsRealEstate";
import GetLocation from "../../components/ProductByLocation";
import UserProfiling from "../../components/UserProfiling";
import { ToastContainer } from "react-toastify";
import Recommendations from "../../components/Recommandation";
import { Helmet } from "react-helmet";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UpcomingEvents from "../../components/UpcomingEvents";
import ExecutiveLeaders from "../../components/ExecutiveLeaders";
import SuccessStories from "../../components/SuccessStories";
import CharacterCard from "../../components/CharacterCard";
import CEO from "../../assets/images/ceo.jpg";
import COO from "../../assets/images/DJ jr Eschbach.jpg";
import Nalley from "../../assets/images/Jash Nalley.jpg";
import Sir from "../../assets/images/sir.jpg";
import { Carousel } from 'react-bootstrap';
import '../Home/Home.css';


const Home = () => {
    const propertyImages = [img1, img2, img3];
    const [showModal, setShowModal] = useState(false);
    const [userRole, setUserRole] = useState("Guest");
    const [userId, setUserId] = useState(null);
    const [similarUsers, setSimilarUsers] = useState([]);
    const navigate = useNavigate();

    const [leaders, setLeaders] = useState([]);
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
        fetchLeaders();

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
                `https://apitourism.today.alayaarts.com/api/getsimilarusers/${userId}`
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
        navigate(`/chat`, {
            state: {
                user_id: userId,
                receiver_id: user.user_id,
                name: user.name,
            },
        });
    };

    const fetchLeaders = async () => {
        try {
            const response = await axios.get("https://apitourism.today.alayaarts.com/api/all-executiveleaders");
            setLeaders(response.data.leaders);
            console.log(response.data.leaders)
            setImagePath(response.data.imagePath);

            setLoading(false);
        } catch (error) {
            console.error("Error fetching leaders:", error);
            setLoading(false);
        }
    };

    const chunk = (array, size) => {
        const chunked_arr = [];
        for (let i = 0; i < array.length; i += size) {
            chunked_arr.push(array.slice(i, i + size));
        }
        return chunked_arr;
    };

    const leaderGroups = chunk(leaders, 4);

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
                    <div className="container-fluid pb-4 g-0 rounded bg-light">
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
                        <ProcessSection />
                        <WhyZnet />
                        <Testimonial />
                        <SuccessStories />
                    </>
                )}
                <UpcomingEvents />
                {/* <ExecutiveLeaders /> */}
                {/* <div className="container">
                    <h3 className="text-center mb-5 display-5 fw-bold">
                        Executive Leadership
                    </h3>
                    <div className="row">
                        {characters.map((character, index) => (
                            <div
                                key={index}
                                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 g-0 p-0"
                            >
                                <CharacterCard
                                    name={character.name}
                                    title={character.title}
                                    description={character.description}
                                    image={character.image}
                                />
                            </div>
                        ))}
                    </div>
                </div> */}

                {loading ? (
                    <p></p>
                ) : (
                    <div className="container">

                        <h3 className="text-center mb-5 display-5 fw-bold">Executive Leadership</h3>

                        <Carousel>
                            {leaderGroups.map((group, idx) => (
                                <Carousel.Item key={idx}>
                                    <div className="d-flex flex-row justify-content-around">
                                        {group.map(leader => (
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
                            ))}
                        </Carousel>
                    </div>
                )}


            </main>

            <div className="container">
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
