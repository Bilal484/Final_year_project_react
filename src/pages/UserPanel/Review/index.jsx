import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
// import UserHeader from "../../../components/UserHeader";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Review.css';

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
        const commentsResponse = await axios.get(`https://apitourism.today.alayaarts.com/api/get-productoverviewhomecomments`);
        const commentData = commentsResponse.data;

        if (commentData && commentData.overview_neighborhood_section_comments) {
          const fetchedComments = commentData.overview_neighborhood_section_comments;
          setComments(fetchedComments);

          // Extract the p_id from the first comment
          const p_id = fetchedComments[0].p_id;

          // Fetch the product details using the p_id
          const productResponse = await axios.get(`https://apitourism.today.alayaarts.com/api/get-product/${p_id}`);
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
        <title>Product Review | UrbanCraft REAL ESTATE</title>
        <meta
          name="description"
          content="View your product details and buyer comments in UrbanCraft REAL ESTATE's Review section. Manage your property and buyer feedback efficiently."
        />
        <meta
          name="keywords"
          content="product review, buyer comments, product details, UrbanCraft REAL ESTATE, product management"
        />
        <meta property="og:title" content="Product Review | UrbanCraft REAL ESTATE" />
        <meta
          property="og:description"
          content="Check buyer comments and product details in UrbanCraft REAL ESTATE's Review section for efficient property management."
        />
        <meta property="og:url" content="https://apitourism.today.alayaarts.com/review" />
        <meta
          property="og:image"
          content="https://apitourism.today.alayaarts.com/uploads/review-placeholder.jpg"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Product Review | UrbanCraft REAL ESTATE" />
        <meta
          name="twitter:description"
          content="Review your product and buyer comments seamlessly with UrbanCraft REAL ESTATE's efficient dashboard."
        />
        <meta
          name="twitter:image"
          content="https://apitourism.today.alayaarts.com/uploads/review-placeholder.jpg"
        />
      </Helmet>
      <Header />
      {/* <UserHeader /> */}      <div id="main-content" className="mt-5 py-5">
        <div className="container">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
              <div className="text-center">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h4 className="text-muted">Loading your comments and product details...</h4>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <div>{error}</div>
            </div>
          ) : product ? (
            <div className="col-lg-11 mx-auto">
              <h2 className="mb-4 fw-bold border-bottom pb-3 text-primary">
                <i className="bi bi-buildings me-2"></i>
                Property Review Dashboard
              </h2>
              
              {/* Main Product Card */}
              <div className="card mb-4 shadow rounded-3 overflow-hidden">
                {/* Product Header */}
                <div className="card-header bg-light d-flex justify-content-between align-items-center p-3">
                  <h3 className="m-0 fw-bold text-primary">{product.title}</h3>
                  <span className="badge bg-success fs-5">Rs {Number(product.price).toLocaleString()}</span>
                </div>

                <div className="card-body p-0">
                  <div className="row g-0">
                    {/* Left Column: Image Carousel */}
                    <div className="col-md-6">
                      <div id="product-images" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                          {product.images && product.images.length > 0 && product.images.map((_, index) => (
                            <button 
                              key={`indicator-${index}`}
                              type="button" 
                              data-bs-target="#product-images" 
                              data-bs-slide-to={index} 
                              aria-label={`Slide ${index + 1}`}
                              className={index === 0 ? 'active' : ''}
                              aria-current={index === 0 ? 'true' : 'false'}
                            ></button>
                          ))}
                        </div>
                        
                        <div className="carousel-inner">
                          {product.images && product.images.length > 0 ? (
                            product.images.map((image, index) => (
                              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={image.id}>
                                <img
                                  className="d-block w-100"
                                  style={{height: '400px', objectFit: 'cover'}}
                                  src={`https://apitourism.today.alayaarts.com/uploads/products/${image.image}`}
                                  alt={`${product.title} - Image ${index + 1}`}
                                />
                                <div className="carousel-caption d-none d-md-block">
                                  <span className="badge bg-dark bg-opacity-75">Image {index + 1} of {product.images.length}</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="carousel-item active">
                              <div className="d-flex align-items-center justify-content-center bg-light" style={{height: '400px'}}>
                                <div className="text-center">
                                  <i className="bi bi-image text-muted" style={{fontSize: '3rem'}}></i>
                                  <p className="mt-3">No images available</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {product.images && product.images.length > 1 && (
                          <>
                            <button className="carousel-control-prev" type="button" data-bs-target="#product-images" data-bs-slide="prev">
                              <span className="carousel-control-prev-icon bg-dark bg-opacity-50 rounded-circle" aria-hidden="true"></span>
                              <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#product-images" data-bs-slide="next">
                              <span className="carousel-control-next-icon bg-dark bg-opacity-50 rounded-circle" aria-hidden="true"></span>
                              <span className="visually-hidden">Next</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Right Column: Product Details */}
                    <div className="col-md-6">
                      <div className="p-4">
                        <div className="mb-3">
                          <div className="d-flex align-items-center mb-2">
                            <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                            <h5 className="mb-0 fw-bold">Location</h5>
                          </div>
                          <p className="text-muted ms-4">{product.location || 'Location not specified'}</p>
                        </div>
                        
                        <div className="mb-3">
                          <div className="d-flex align-items-center mb-2">
                            <i className="bi bi-info-circle-fill text-primary me-2"></i>
                            <h5 className="mb-0 fw-bold">Description</h5>
                          </div>
                          <p className="text-muted ms-4" style={{maxHeight: '150px', overflowY: 'auto'}}>{product.desc || 'No description available'}</p>
                        </div>
                        
                        <div className="row row-cols-2 g-3 mt-2">
                          <div className="col">
                            <div className="d-flex align-items-center">
                              <div className="feature-icon bg-light rounded-circle p-2 me-3">
                                <i className="bi bi-building text-primary"></i>
                              </div>
                              <div>
                                <small className="text-muted d-block">Type</small>
                                <strong>{product.type || 'Not specified'}</strong>
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="d-flex align-items-center">
                              <div className="feature-icon bg-light rounded-circle p-2 me-3">
                                <i className="bi bi-rulers text-primary"></i>
                              </div>
                              <div>
                                <small className="text-muted d-block">Size</small>
                                <strong>{product.size ? `${product.size} sqft` : 'Not specified'}</strong>
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="d-flex align-items-center">
                              <div className="feature-icon bg-light rounded-circle p-2 me-3">
                                <i className="bi bi-door-open text-primary"></i>
                              </div>
                              <div>
                                <small className="text-muted d-block">Bedrooms</small>
                                <strong>{product.bedrooms || 'N/A'}</strong>
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="d-flex align-items-center">
                              <div className="feature-icon bg-light rounded-circle p-2 me-3">
                                <i className="bi bi-droplet text-primary"></i>
                              </div>
                              <div>
                                <small className="text-muted d-block">Bathrooms</small>
                                <strong>{product.bathrooms || 'N/A'}</strong>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <button className="btn btn-primary me-2">
                            <i className="bi bi-star me-1"></i> Save to Favorites
                          </button>
                          <button className="btn btn-outline-primary">
                            <i className="bi bi-share me-1"></i> Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Comments Section */}
              <div className="card shadow rounded-3 mb-4">
                <div className="card-header bg-light p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="m-0 fw-bold">
                      <i className="bi bi-chat-square-quote me-2"></i>
                      Buyer Comments
                    </h4>
                    <span className="badge bg-primary rounded-pill">{comments.length}</span>
                  </div>
                </div>
                
                <div className="card-body p-4">
                  {comments.length > 0 ? (
                    <div className="comments-container" style={{maxHeight: '400px', overflowY: 'auto'}}>
                      {comments.map((comment, index) => (
                        <div 
                          key={comment.id} 
                          className={`comment-item p-3 mb-3 rounded ${index % 2 === 0 ? 'bg-light' : 'border'}`}
                        >
                          <div className="d-flex">
                            <div className="avatar me-3">
                              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px'}}>
                                <i className="bi bi-person-fill"></i>
                              </div>
                            </div>
                            <div className="comment-content flex-grow-1">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="mb-0 fw-bold">User Comment #{index + 1}</h6>
                                <span className="badge bg-secondary">{new Date(comment.created_at).toLocaleDateString()}</span>
                              </div>
                              <p className="mb-1">{comment.comment}</p>
                              <div className="d-flex mt-2">
                                <button className="btn btn-sm btn-outline-primary me-2">
                                  <i className="bi bi-reply me-1"></i> Reply
                                </button>
                                <button className="btn btn-sm btn-outline-secondary">
                                  <i className="bi bi-hand-thumbs-up me-1"></i> Helpful
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-5 my-3">
                      <i className="bi bi-chat-square-text text-muted" style={{fontSize: '3rem'}}></i>
                      <p className="mt-3 text-muted">No comments available for this property</p>
                      <button className="btn btn-outline-primary mt-2">Be the first to comment</button>
                    </div>
                  )}
                </div>
                
                {comments.length > 0 && (
                  <div className="card-footer bg-white p-4 border-top">
                    <h5 className="mb-3">Add Your Comment</h5>
                    <div className="comment-form">
                      <textarea 
                        className="form-control mb-3" 
                        rows="3" 
                        placeholder="Write your comment here..."
                      ></textarea>
                      <button className="btn btn-primary">
                        <i className="bi bi-send me-2"></i>Submit Comment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-5 my-5">
              <div className="display-1 text-muted mb-4">
                <i className="bi bi-house-x"></i>
              </div>
              <h2 className="mb-3">No Product or Comments Available</h2>
              <p className="text-muted mb-4">We couldn't find any property reviews in your account.</p>
              <button className="btn btn-primary">
                <i className="bi bi-search me-2"></i>Browse Properties
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Review;
