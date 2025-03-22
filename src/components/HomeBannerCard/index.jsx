import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomeBannerCard.css';
import { Helmet } from 'react-helmet';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';

const HomeBannerCard = ({ isLarge = false }) => {
    const [banners, setBanners] = useState([]);
    const imagePath = 'https://api.biznetusa.com/uploads/banners/';

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get('https://api.biznetusa.com/api/get-banners');
                setBanners(response.data.banners);
            } catch (error) {
                console.error("Error fetching banners", error);
            }
        };
        fetchBanners();
    }, []);

    return (
        <>
            <Helmet>
                <title>Home Banner Carousel - BizNet USA</title>
                <meta
                    name="description"
                    content="Explore BizNet USA's banner carousel showcasing top properties with detailed descriptions and prices. Dynamic and user-friendly design."
                />
                <meta
                    name="keywords"
                    content="BizNet USA, Banner Carousel, Property Listings, Dynamic Banners"
                />
                <meta property="og:title" content="Home Banner Carousel - BizNet USA" />
                <meta
                    property="og:description"
                    content="Discover featured properties through our Home Banner Carousel. Seamless navigation with high-quality images and property details."
                />
                <meta
                    property="og:image"
                    content={banners.length > 0 && `${imagePath}${banners[0]?.image}`}
                />
                <meta name="author" content="BizNet USA Team" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <Container fluid className="py-4 position-relative" style={{ overflow: 'hidden' }}>
                <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={12} style={{ height: isLarge ? 600 : 300 }}>
                        <Carousel indicators={true} controls={true} interval={3000}>
                            {banners.length > 0 ? (
                                banners.map((banner) => (
                                    <Carousel.Item key={banner.id}>
                                        <img
                                            src={banner.image ? `${imagePath}${banner.image}` : 'default-image.jpg'}
                                            alt={banner.title}
                                            className="img-fluid w-100"
                                            style={{
                                                height: isLarge ? '600px' : '300px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </Carousel.Item>
                                ))
                            ) : (
                                <p>No banners available</p>
                            )}
                        </Carousel>
                    </Col>
                </Row>
                {!isLarge && banners.length > 0 && (
                    <Row className="justify-content-center mt-3 position-absolute bottom-0 end-0" style={{ translate: "-5% -20%" }}>
                        <Col xs={12} md={8} lg={6} style={{ width: "350px" }}>
                            <div id="hamza__pava" className="bg-white p-3 rounded shadow">
                                <h5 className="fw-semibold text-dark">{banners[0].title}</h5>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="text-muted mb-0">{banners[0].desc}</p>
                                    <p className="h5 fw-bold text-dark mb-0">{banners[0].price}</p>
                                </div>
                                <Button variant="primary" className="w-100 mt-3">
                                    View Home
                                </Button>
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    );
};

export default HomeBannerCard;
