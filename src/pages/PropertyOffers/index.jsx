import React, { useState, useEffect } from "react";
import "./OffersPage.css";
// import SellerHeader from "../../components/SellerAgentHeader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Card, Button, Form, Modal, Spinner } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import axios from "axios";


const OffersPage = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [offerForm, setOfferForm] = useState({
        phone: "",
        how_much_you_offer: "",
        plan_on_buying: "1",
        tour_this_home_in_person: "1",
        comments: "",
        p_id: selectedProductId,
    });
    const [selectedOffer, setSelectedOffer] = useState(null);    const userId = localStorage.getItem("user_id");
      // Helper function to get product name by ID
    const getProductNameById = (productId) => {
        if (!productId || productId === 'N/A') {
            return "Unknown Product";
        }
        const product = products.find(p => String(p.id) === String(productId));
        return product ? product.title : "Unknown Product";
    };    // Fetch offers data for the logged-in user
    const fetchOffers = async () => {
        try {
            const response = await fetch(`https://apitourism.today.alayaarts.com/api/get-start-offer-user/${userId}`);
            const data = await response.json();
            if (data.status === 200 && data.start_an_offer) {
                // Ensure we have a valid array and filter out any null/undefined items
                const validOffers = Array.isArray(data.start_an_offer) 
                    ? data.start_an_offer.filter(offer => offer && typeof offer === 'object')
                    : [];
                setOffers(validOffers);
            } else {
                setOffers([]);
            }
        } catch (error) {
            console.error("Error fetching offers:", error);
            setOffers([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, [userId]);    useEffect(() => {
        const fetchProducts = () => {
            axios
                .get("https://apitourism.today.alayaarts.com/api/get-products")
                .then((response) => {
                    // Get all products since offers might reference products from any user
                    const allProducts = response.data.products || [];
                    console.log("All Products for offer matching:", allProducts);
                    
                    setProducts(allProducts);
                })
                .catch((error) => console.error("Error fetching products:", error));
        };

        // Fetch products data
        fetchProducts();
    }, []);

    // Create an offer
    const createOffer = async () => {
        try {
            const response = await fetch("https://apitourism.today.alayaarts.com/api/store-start-offer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...offerForm,
                    user_id: userId,
                }),
            });
            const data = await response.json();
            if (data.status === 200) {
                setOffers([...offers, data.start_an_offer]);
                setShowModal(false);
                fetchOffers();
            }
        } catch (error) {
            console.error("Error creating offer:", error);
        }
    };

    // Update an existing offer
    const updateOffer = async () => {
        try {
            const response = await fetch(`https://apitourism.today.alayaarts.com/api/update-start-offer/${selectedOffer.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...offerForm,
                }),
            });
            const data = await response.json();
            if (data.status === 200) {
                setOffers(
                    offers.map((offer) =>
                        offer.id === selectedOffer.id ? { ...offer, ...offerForm } : offer
                    )
                );
                setShowModal(false);
            }
        } catch (error) {
            console.error("Error updating offer:", error);
        }
    };

    // Delete an offer
    const deleteOffer = async (offerId) => {
        try {
            const response = await fetch(`https://apitourism.today.alayaarts.com/api/deletestartoffer/${offerId}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (data.status === 200) {
                setOffers(offers.filter((offer) => offer.id !== offerId));
            }
        } catch (error) {
            console.error("Error deleting offer:", error);
        }
    };

    // Handle form change
    const handleInputChange = (e) => {
        setOfferForm({
            ...offerForm,
            [e.target.name]: e.target.value,
        });
    };

    // Open the modal for creating or editing an offer
    const openModal = (offer = null) => {
        if (offer) {
            setSelectedOffer(offer);
            setOfferForm({
                phone: offer.phone,
                how_much_you_offer: offer.how_much_you_offer,
                plan_on_buying: offer.plan_on_buying,
                tour_this_home_in_person: offer.tour_this_home_in_person,
                comments: offer.comments,
            });
        } else {
            setOfferForm({
                phone: "",
                how_much_you_offer: "",
                plan_on_buying: "1",
                tour_this_home_in_person: "1",
                comments: "",
            });
            setSelectedOffer(null);
        }
        setShowModal(true);
    };

    // Loading state
    if (loading) {
        return (
            <>
                <Header />
                {/* <SellerAgentHeader /> */}
                <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                    <Spinner animation="border" role="status" variant="primary">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>Manage Offers - View, Create, Update and Delete Offers</title>
                <meta name="description" content="Manage your offers. Create, update, or delete offers for a property." />
                <meta name="keywords" content="real estate offers, manage offers, create offers" />
                <meta name="author" content="UrbanCraft REAL ESTATE Team" />
            </Helmet>

            <Header />
            {/* <SellerAgentHeader /> */}

            <div className="offers-page-hero">
                <Container>
                    <Row>
                        <Col md={8} lg={6}>
                            <div className="hero-content">
                                <h1 className="greeting-text text-dark">Manage Your Offers</h1>
                                <p className="hero-subtitle">View, create, update, or delete offers.</p>
                                <Button variant="primary" onClick={() => openModal()}><FaPlus /> Add New Offer</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>            <Container className="offers-page-container">
                <Row>
                    {offers && offers.length > 0 ? offers
                        .filter(offer => offer && offer.id) // Filter out null/undefined offers
                        .map((offer) => (
                        <Col md={4} key={offer.id} className="mb-4">
                            <Card className="offer-card">
                                <Card.Body>
                                    <h4 className="offer-property-name text-primary mb-2">
                                        Property: {getProductNameById(offer.p_id || 'N/A')}
                                    </h4>
                                    {/* <p className="text-muted mb-2">Product Price: {offer.pri || 'N/A'}</p> */}
                                    <h5 className="offer-phone">{offer.phone ? offer.phone : "N/A"}</h5>
                                    <p className="offer-price">Offer: Rs {offer.how_much_you_offer || '0'}</p>
                                    <p className="offer-comments">Comments: {offer.comments || 'No comments'}</p>
                                    <p className="text-muted">
                                        <small>
                                            Plan to buy: {offer.plan_on_buying === "1" ? "Yes" : "No"}   <br />
                                            Tour home: {offer.tour_this_home_in_person === "1" ? "Yes" : "No"}
                                        </small>
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <Button variant="outline-secondary" size="sm" onClick={() => openModal(offer)}>
                                            <FaEdit /> Edit
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => deleteOffer(offer.id)}>
                                            <FaTrashAlt /> Delete
                                        </Button>
                                    </div>
                                 
                                </Card.Body>
                            </Card>
                        </Col>
                    )) : (
                        <Col md={12}>
                            <div className="text-center">
                                <p>No offers found.</p>
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>

            {/* Modal for Creating/Editing an Offer */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedOffer ? "Edit Offer" : "Create New Offer"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formProduct">
                            <Form.Label className="text-white">Product</Form.Label>
                            <Form.Control
                                as="select"
                                name="p_id"
                                value={offerForm.p_id}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Product</option>
                                {products.map(product => {
                                    return (
                                        <option key={product.id} value={product.id}>
                                            {product.title}, Price : ${product.price}
                                        </option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label className="text-white">Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={offerForm.phone}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formHowMuch">
                            <Form.Label className="text-white">Offer Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="how_much_you_offer"
                                value={offerForm.how_much_you_offer}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPlanBuying">
                            <Form.Label className="text-white">Plan on Buying</Form.Label>
                            <Form.Control
                                as="select"
                                name="plan_on_buying"
                                value={offerForm.plan_on_buying}
                                onChange={handleInputChange}
                            >
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formTour">
                            <Form.Label className="text-white">Tour This Home</Form.Label>
                            <Form.Control
                                as="select"
                                name="tour_this_home_in_person"
                                value={offerForm.tour_this_home_in_person}
                                onChange={handleInputChange}
                            >
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formComments">
                            <Form.Label className="text-white">Comments</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="comments"
                                value={offerForm.comments}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button
                        variant="primary"
                        onClick={selectedOffer ? updateOffer : createOffer}
                    >
                        {selectedOffer ? "Update Offer" : "Create Offer"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </>
    );
};

export default OffersPage;
