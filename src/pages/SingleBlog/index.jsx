import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Container, Card, Row, Col, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import Notification, { useNotification } from "../../components/Notification";
import { TranslateText, LanguageSelector } from "../../translation";

export function LanguageSwitcher() {
    return (
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-md">
            <label className="text-gray-700 dark:text-gray-300 font-medium">
                <TranslateText>Select Language:</TranslateText>
            </label>
            <LanguageSelector className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
    );
}

const SingleBlog = () => {
    const [notification, showNotification] = useNotification();
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [imagePath, setImagePath] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`https://apitourism.today.alayaarts.com/api/get-blog/${id}`);
                const data = await response.json();
                if (data.status === 200) {
                    setBlog(data.blogs);
                    setImagePath(data.imagePath);
                } else {
                    showNotification("Error fetching blog: Invalid response");
                }
            } catch (error) {
                showNotification("Error fetching blog: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading blog...</p>
            </Container>
        );
    }

    if (!blog) {
        return (
            <Container className="text-center mt-5">
                <p>Blog not found.</p>
                <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
            </Container>
        );
    }

    return (
        <>
            {notification.message && <Notification {...notification} />}

            <Helmet>
                <title>{blog.title || "Blog"} | Biznet</title>
                <meta name="description" content={blog.desc ? blog.desc.replace(/<[^>]+>/g, "").substring(0, 160) : "Read the latest blog from Biznet."} />
                <meta name="keywords" content="Biznet, Blog, Real Estate, News, Updates, Articles" />
                <meta name="author" content="UrbanCraft REAL ESTATE" />
                <meta property="og:title" content={blog.title || "Blog"} />
                <meta property="og:description" content={blog.desc ? blog.desc.replace(/<[^>]+>/g, "").substring(0, 200) : "Explore the latest updates and insights on Biznet."} />
                <meta property="og:image" content={blog.images?.length > 0 ? `${imagePath}/${blog.images[0].image}` : "https://example.com/default-blog-image.jpg"} />
                <meta property="og:url" content={`https://apitourism.today.alayaarts.com/blog/${id}`} />
                <meta property="og:type" content="article" />
            </Helmet>

            <Header />

            <Container className="mt-5">
                <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">Back</Button>
                <Card className="border-0">
                    {blog.images?.length > 0 && (
                        <Card.Img variant="top" src={`${imagePath}/${blog.images[0].image}`} alt={blog.title} className="rounded mb-4" />
                    )}
                    <Card.Body>
                        <Card.Title className="mb-3"><TranslateText>{blog.title}</TranslateText></Card.Title>
                        <Card.Text dangerouslySetInnerHTML={{ __html: blog.desc }}></Card.Text>
                        <Row className="mt-4">
                            {blog.images?.map((image, index) => (
                                <Col xs={6} md={4} key={index} className="mb-3">
                                    <img src={`${imagePath}/${image.image}`} alt={`Blog Image ${index + 1}`} className="img-fluid rounded" />
                                </Col>
                            ))}
                        </Row>
                    </Card.Body>
                </Card>
            </Container>

            <Footer />
        </>
    );
};

export default SingleBlog;
