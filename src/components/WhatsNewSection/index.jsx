import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { TranslateText, useTranslation } from "../../translation";

const WhatsNewSection = () => {
    const { translateBatch, t } = useTranslation()
    const [newsItems, setNewsItems] = useState([]);
    const [imagePath, setImagePath] = useState("");
    const navigate = useNavigate();

    const handleReadMore = (id) => {
        navigate(`/blog/${id}`);
    };

    useEffect(() => {
        const fetchLatestBlogs = async () => {
            try {
                const response = await fetch("https://api.biznetusa.com/api/get-latestblog");
                const data = await response.json();

                if (data.status === 200) {
                    const titleArray = data.blogs.map(blog => blog.title);

                    const translatedTitles = await translateBatch(titleArray);

                    const translatedBlogs = data.blogs.map((blog, index) => ({
                        ...blog,
                        title: translatedTitles[index]
                    }));

                    setNewsItems(translatedBlogs);
                    setImagePath(data.imagePath);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchLatestBlogs();
    }, [translateBatch]);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>What's New | UrbanCraft REAL ESTATE</title>
                <meta name="description" content="Stay updated with the latest blogs and news from UrbanCraft REAL ESTATE." />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="What's New | UrbanCraft REAL ESTATE" />
                <meta property="og:description" content="Stay updated with the latest blogs and news from UrbanCraft REAL ESTATE." />
                <meta property="og:image" content="https://via.placeholder.com/150" />
                <meta property="og:url" content="https://www.biznetusa.com/whats-new" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="What's New | UrbanCraft REAL ESTATE" />
                <meta name="twitter:description" content="Stay updated with the latest blogs and news from UrbanCraft REAL ESTATE." />
                <meta name="twitter:image" content="https://via.placeholder.com/150" />
            </Helmet>
            <Container>
                <h4 className="mb-4"><TranslateText>What's New</TranslateText></h4>
                <hr className="mb-4" />
                <Row className="gy-4">
                    {newsItems.map((newsItem, index) => (
                        <Col md={12} key={index}>
                            <Card className="border-0 h-100">
                                <Row className="g-0 align-items-center">
                                    <Col xs={4}>
                                        <Card.Img
                                            src={
                                                newsItem.images && newsItem.images.length > 0
                                                    ? `${imagePath}/${newsItem.images[0].image}`
                                                    : "https://via.placeholder.com/150"
                                            }
                                            alt={newsItem.title}
                                            className="rounded"
                                            onClick={() => handleReadMore(newsItem.id)}
                                        />
                                    </Col>
                                    <Col xs={8}>
                                        <Card.Body>
                                            <Card.Title className="fs-6">
                                                {newsItem.title}
                                            </Card.Title>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default WhatsNewSection;
