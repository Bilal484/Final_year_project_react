import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ContractorHeader from "../../components/ContractorHeader";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";

const ReviewManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: "",
  });
  const [review, setReview] = useState([])
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleDelete = async (e) => {
    const reviewId = e.currentTarget.closest("li").dataset.key;

    try {
      await axios.delete(`https://api.biznetusa.com/api/deletereview/${reviewId}`);
      toast.success("Project deleted successfully!");
      fetchData();
    } catch (err) {
      toast.error("Failed to delete project. Please try again.");
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.biznetusa.com/api/get-reviews');
      setReview(response.data.review_management);
      toast.success("Reviews Fetched Successfully");
    } catch (err) {
      toast.error("The Reviews could not be fetched properly");
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const response = await fetch("https://api.biznetusa.com/api/store-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Review submitted successfully!");
        setFormData({ name: "", review: "", rating: "" }); // Reset form
        fetchData();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Failed to submit review"}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
    <Helmet>
        <title>Review Management | Biznet</title>
        <meta
          name="description"
          content="Manage customer reviews, submit new reviews, and view existing feedback on our platform. A user-friendly interface for efficient review handling."
        />
        <meta
          name="keywords"
          content="review management, customer reviews, feedback platform, delete review, submit review, review system"
        />
        <meta name="author" content="Biznet Team" />
        <meta property="og:title" content="Review Management | Biznet" />
        <meta
          property="og:description"
          content="Easily manage and handle customer reviews for your services. View existing reviews, submit new feedback, and delete unwanted entries."
        />
        <meta property="og:url" content="https://www.biznetusa.com/review-management" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Review Management | Biznet" />
        <meta
          name="twitter:description"
          content="Efficiently manage customer feedback and reviews with our easy-to-use review management system."
        />
      </Helmet>
      <Header />
      <ContractorHeader />
      <div className="container my-3">
        {/* Review Management */}
        <div id="reviewManagement" className="mb-5">
          <h2 className="my-2">Review Management</h2>
          <div className="mb-4 my-4">
            <h3>Add a Review</h3>
            {message && <div className="alert alert-info">{message}</div>}
            <form id="reviewForm" className="mb-3" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="review" className="form-label">
                  Your Review
                </label>
                <textarea
                  className="form-control"
                  id="review"
                  rows={3}
                  value={formData.review}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">
                  Rating
                </label>
                <select
                  id="rating"
                  name="rating"
                  className="form-select"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Rating
                  </option>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
              <button type="submit" className="btn btn-success">
                Submit Review
              </button>
            </form>
          </div>
          <h3>Existing Reviews</h3>
          <ul id="reviewList" className="list-group">
            {review.length > 0 ? review.map((review, index) =>
              <li className="list-group-item d-flex justify-content-between align-items-center" key={review.id} data-key={review.id}>
                <div className="review-text">
                  <strong>{review.name}</strong> ({review.rating} Stars)
                  <p>{review.review}</p>
                </div>
                <div className="two-buttons">
                  <button className="btn btn-primary btn-sm edit-btn">
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm delete-btn" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </li>) :
              (<li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="review-text">
                  <strong>Emily Johnson</strong> (3 Stars)
                  <p>Average service, but they were polite.</p>
                </div>
                <div className="two-buttons">
                  <button className="btn btn-primary btn-sm edit-btn">
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm delete-btn" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </li>
              )}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReviewManagement;

