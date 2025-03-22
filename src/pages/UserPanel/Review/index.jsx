import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import UserHeader from "../../../components/UserHeader";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Review = () => {
  const [comments, setComments] = useState([]);
  const [product, setProduct] = useState(null); // Product details linked to the comments
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user_id from localStorage
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchCommentsAndProduct = async () => {
      if (!user_id) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch comments for the user
        const commentsResponse = await axios.get(`https://api.biznetusa.com/api/get-productoverviewhomecomments/${user_id}`);
        const commentData = commentsResponse.data;

        if (commentData && commentData.overview_neighborhood_section_comments.length > 0) {
          const fetchedComments = commentData.overview_neighborhood_section_comments;
          setComments(fetchedComments);

          // Extract the p_id from the first comment
          const p_id = fetchedComments[0].p_id;

          // Fetch the product details using the p_id
          const productResponse = await axios.get(`https://api.biznetusa.com/api/get-product/${p_id}`);
          setProduct(productResponse.data.products);
        } else {
          setComments([]);
        }
      } catch (err) {
        setError("Failed to load comments or product.");
      } finally {
        setLoading(false);
      }
    };

    fetchCommentsAndProduct();
  }, [user_id]);

  return (
    <>
    <Helmet>
        <title>Product Review | Znet</title>
        <meta
          name="description"
          content="View your product details and buyer comments in Znet's Review section. Manage your property and buyer feedback efficiently."
        />
        <meta
          name="keywords"
          content="product review, buyer comments, product details, Znet real estate, product management"
        />
        <meta property="og:title" content="Product Review | Znet" />
        <meta
          property="og:description"
          content="Check buyer comments and product details in Znet's Review section for efficient property management."
        />
        <meta property="og:url" content="https://biznetusa.com/review" />
        <meta
          property="og:image"
          content="https://api.biznetusa.com/uploads/review-placeholder.jpg"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Product Review | Znet" />
        <meta
          name="twitter:description"
          content="Review your product and buyer comments seamlessly with Znet's efficient dashboard."
        />
        <meta
          name="twitter:image"
          content="https://api.biznetusa.com/uploads/review-placeholder.jpg"
        />
      </Helmet>
      <Header />
      <UserHeader />
      <div id="main-content" className="mt-5 py-5">
        <div className="container">
          {loading ? (
            <h2>Loading your comments and product details...</h2>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : product ? (
            <div className="col-lg-10 mx-auto">
              {/* Unified Product and Comments Card */}
              <div className="card mb-4 shadow-lg p-4">
                <div className="row">
                  {/* Left Side: Product Details */}
                  <div className="col-md-6">
                    <h3 className="card-title text-primary">{product.title}</h3>
                    <p className="card-text text-muted">{product.desc}</p>
                    <p><strong>Location:</strong> {product.location}</p>
                    <p><strong>Price:</strong> <span className="text-success">${product.price}</span></p>

                    {/* Image Carousel */}
                    <div id="product-images" className="carousel slide" data-bs-ride="carousel">
                      <div className="carousel-inner">
                        {product.images.length > 0 ? (
                          product.images.map((image, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={image.id}>
                              <img
                                className="d-block w-100 rounded"
                                src={`https://api.biznetusa.com/uploads/products/${image.image}`}
                                alt={product.title}
                              />
                            </div>
                          ))
                        ) : (
                          <p>No images available</p>
                        )}
                      </div>
                      <button className="carousel-control-prev" type="button" data-bs-target="#product-images" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button className="carousel-control-next" type="button" data-bs-target="#product-images" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Side: Comments Section */}
                  <div className="col-md-6">
                    <h4 className="text-secondary">Buyer Comments</h4>
                    {comments.length > 0 ? (
                      <div className="comments-list mt-3">
                        {comments.map((comment) => (
                          <div key={comment.id} className="border p-3 mb-2 rounded">
                            <p>{comment.comment}</p>
                            <small className="text-muted">
                              Posted on: {new Date(comment.created_at).toLocaleDateString()}
                            </small>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No comments available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <h2>No product or comments available</h2>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Review;
