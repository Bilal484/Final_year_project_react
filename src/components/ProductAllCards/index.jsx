import { useNavigate } from "react-router-dom";
import { Card, Carousel, Button, Container, Spinner } from "react-bootstrap";
import "./ProductAllCards.css";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";

const ProductAllCards = ({ products }) => {
    const navigate = useNavigate();
    const [prod, setProd] = useState(null)
    const handleRequestTourClick = () => {
        navigate("/RequestShowing");
    };

    useEffect(() => {
        setProd(products);
    }, [products])

    if (!prod || prod == []) {
        return (
            <Container fluid className="py-4 product-cards-container">
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" style={{ color: "var(--background_color)" }} />
                </div>
            </Container>
        );
    }

    return (
        <>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta
                    name="description"
                    content={`Browse a variety of properties, including homes and rentals. Discover listings like ${prod[0]?.title || "various properties"} and more!`}
                />
                <meta
                    name="keywords"
                    content={`real estate, properties, apartments, homes, rentals, property listings, ${prod[0]?.title || ""}`}
                />
                <meta
                    property="og:image"
                    content={`https://api.biznetusa.com/uploads/products/${prod[0]?.images[0]?.image || ""}`}
                />
                <meta property="og:title" content={prod[0]?.title || "Browse Properties"} />
                <meta property="og:description" content={prod[0]?.desc || "Explore the latest property listings."} />
            </Helmet>
            <Container fluid className="py-4 product-cards-container">
                <div className="cards-wrapper">
                    {prod.map((product, index) => (
                        <div className="custom-card-wrapper" key={product.id}>
                            <Card className="custom-card">
                                <Carousel>
                                    {product.images && product.images.length > 0 ? (
                                        product.images.map((image, imgIndex) => (
                                            <Carousel.Item key={imgIndex}>
                                                <img
                                                    onClick={() => navigate(`/ProductDetail/${product.id}`)}
                                                    src={`https://api.biznetusa.com/uploads/products/${image.image}`}
                                                    alt={`Property ${product.title} - Image ${imgIndex + 1}`}
                                                    className="custom-card-img"
                                                />
                                            </Carousel.Item>
                                        ))
                                    ) : (
                                        <Carousel.Item>
                                            <img
                                                src="https://via.placeholder.com/400x300?text=No+Image+Available"
                                                alt="No Image Available"
                                                className="custom-card-img"
                                            />
                                        </Carousel.Item>
                                    )}
                                </Carousel>
                                <Card.Body>
                                    <h5 className="fw-bold text-primary">${product.price}</h5>
                                    <p className="text-muted">{product.location || "Location not available"}</p>
                                    <p className="text-truncate">{product.desc || "No description available"}</p>
                                    <Button
                                        variant="primary"
                                        className="custom-btn"
                                        onClick={handleRequestTourClick}
                                    >
                                        Request a Tour
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </Container>
        </>
    );
};

export default ProductAllCards;

