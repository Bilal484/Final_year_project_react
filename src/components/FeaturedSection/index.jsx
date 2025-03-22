import React, { useEffect, useState } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { TranslateText, useTranslation } from "../../translation";

const FeaturedSection = () => {
    const [featuredBlogs, setFeaturedBlogs] = useState([]);
    const [imagePath, setImagePath] = useState("");
    const navigate = useNavigate();

    const { translateBatch } = useTranslation()

    useEffect(() => {
        fetchFeaturedBlogs();
    }, []);

    const fetchFeaturedBlogs = async () => {
        try {
            const response = await fetch(
                "https://api.biznetusa.com/api/get-featurrblog"
            );
            const data = await response.json();
            if (data.status === 200) {
                const titlesArray = data.blogs.map(item => item.title)
                const translatedTitle = await translateBatch(titlesArray)

                const translatedBlogs = data.blogs.map((el, index) => ({
                    ...el,
                    title: translatedTitle[index]

                }));


                setFeaturedBlogs(translatedBlogs);
                setImagePath(data.imagePath);
            }
        } catch (error) {
        }
    };

    const handleReadMore = (id) => {
        navigate(`/blog/${id}`);
    };
    return (
        <>

            <Helmet>
                <title>Featured Blogs</title>
                <meta name="description" content="Explore our featured blogs section, showcasing top stories and highlights from various categories." />
                <meta name="keywords" content="blogs, featured blogs, stories, articles, highlights, blog section" />
                <meta name="author" content="Your Company or Team Name" />
            </Helmet>

            <Container>
                <h4 className="mb-4"><TranslateText>Featured</TranslateText></h4>
                <hr className="mb-4" />
                <Row className="gy-4">
                    {featuredBlogs.map((blog) => (
                        <Col lg={6} md={12} key={blog.id}>
                            <Card
                                className="border-0 h-100"

                            >
                                {blog.images && blog.images.length > 0 && (
                                    <Card.Img
                                        variant="top"
                                        src={`${imagePath}/${blog.images[0].image}`}
                                        alt={blog.title}
                                        className="rounded"
                                        onClick={() => handleReadMore(blog.id)}
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title>{blog.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default FeaturedSection;
