import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button, Image, Carousel, Card } from 'react-bootstrap';
import './OfferPage.css'; // Ensure this file includes styles for responsiveness and layout
import Header from '../../components/header';
import Footer from '../../components/Footer';
import axios from 'axios';
import { Helmet } from 'react-helmet'; // Import Helmet

const OfferPage = () => {
    const location = useLocation();
    const { p_id } = location.state || {}; // Get the p_id from state
    const [productData, setProductData] = useState(null); // State for product data
    const [images, setImages] = useState([]); // State for images
    const imagePath = "https://api.biznetusa.com/uploads/products/";

    const [formData, setFormData] = useState({
        phone: '',
        offer: '',
        buyingOption: '',
        toured: '',
        comments: ''
    });

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`https://api.biznetusa.com/api/get-product/${p_id}`);
                setProductData(response.data.products);
                setImages(response.data.products.images); // Set images from API response
            } catch (error) {
            }
        };

        if (p_id) {
            fetchProductData(); // Call the API if p_id is available
        }
    }, [p_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const offerData = {
                p_id,
                phone: formData.phone,
                plan_on_buying: formData.buyingOption,
                tour_this_home_in_person: formData.toured,
                comments: formData.comments,
                how_much_you_offer: formData.offer
            };
            await axios.post('https://api.biznetusa.com/api/store-start-offer', offerData);
            alert('Offer submitted successfully!');
        } catch (error) {
            alert('There was an error submitting your offer. Please try again.');
        }
    };

    return (
        <>
         <Helmet>
                <title>Make an Offer on {productData ? productData.title : 'this Property'}</title>
                <meta name="description" content={`Make an offer on ${productData ? productData.title : 'this property'} using our easy online form.`} />
                <meta name="keywords" content="real estate, offer, buy property, property listing" />
            </Helmet>
            <Header />
            <Container className="offer-container my-5">
                {/* Card with Carousel and Product Details */}
                {productData ? (
                    <Card className="custom-card">
                        {/* Carousel inside the card */}
                        {images && images.length > 0 ? (
                            <Carousel className="custom-carousel">
                                {images.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <Card.Img 
                                            variant="top" 
                                            src={`${imagePath}${image.image}`} 
                                            alt={`Slide ${index + 1}`} 
                                            className="custom-card-image" 
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        ) : (
                            <p>No images available for this property.</p>
                        )}

                        {/* Product Details */}
                        <Card.Body>
                            <Card.Title className="custom-title">{productData.title}</Card.Title>
                            <Card.Text className="custom-desc">{productData.desc}</Card.Text>
                            <Card.Text className="custom-location">
                                <strong>Location:</strong> {productData.location}
                            </Card.Text>
                            <Card.Text className="custom-price">
                                <strong>Price:</strong> ${productData.price}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ) : (
                    <p>Loading product details...</p>
                )}

                {/* Form Section */}
                <Form className="form-section mt-4" onSubmit={handleSubmit}>
                    <h5 className="mb-4">Tell Us About Yourself</h5>

                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Phone *</Form.Label>
                        <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(123) 456-7890"
                            required
                            className="phone-input"
                        />
                    </Form.Group>

                    <h5 className="mt-4 mb-4">More Details (Optional)</h5>

                    <Form.Group className="mb-3" controlId="offer">
                        <Form.Label>How much would you like to offer?</Form.Label>
                        <Form.Control
                            type="text"
                            name="offer"
                            value={formData.offer}
                            onChange={handleChange}
                            className="offer-input"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>How do you plan on buying?</Form.Label>
                        <div>
                            <Form.Check
                                inline
                                type="radio"
                                label="Loan"
                                name="buyingOption"
                                value="Loan"
                                checked={formData.buyingOption === 'Loan'}
                                onChange={handleChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="All Cash"
                                name="buyingOption"
                                value="All Cash"
                                checked={formData.buyingOption === 'All Cash'}
                                onChange={handleChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="I'll decide later"
                                name="buyingOption"
                                value="Later"
                                checked={formData.buyingOption === 'Later'}
                                onChange={handleChange}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Have you toured this home in person?</Form.Label>
                        <div>
                            <Form.Check
                                inline
                                type="radio"
                                label="Yes"
                                name="toured"
                                value="Yes"
                                checked={formData.toured === 'Yes'}
                                onChange={handleChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="No"
                                name="toured"
                                value="No"
                                checked={formData.toured === 'No'}
                                onChange={handleChange}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="comments">
                        <Form.Label>Comments</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            rows={3}
                        />
                    </Form.Group>

                    <Button className="submit-btn w-100" variant="danger" type="submit">
                        Start An Offer
                    </Button>
                </Form>
            </Container>
            <Footer />
        </>
    );
};

export default OfferPage;
