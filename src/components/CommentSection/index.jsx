import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown } from 'react-bootstrap';
import { Helmet } from "react-helmet"; 

const CommentSection = ({ p_id }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null); // To track which comment menu is open

  // Fetch comments from the API
  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://apitourism.today.alayaarts.com/api/get-productoverviewhomecomments?p_id=${p_id}`);
      if (response.status === 200) {
        setComments(response.data.overview_neighborhood_section_comments);
      } else {
        toast.error("Failed to fetch comments.");
      }
    } catch (error) {
      toast.error("Error fetching comments: " + error.message);
    }
  };

  // Post a new comment
  const handleSave = async () => {
    const user_id = localStorage.getItem('user_id'); // Get the user ID from localStorage
    if (!user_id) {
      toast.error("User not logged in.");
      return;
    }

    if (comment.trim()) {
      try {
        const response = await axios.post('https://apitourism.today.alayaarts.com/api/store-productoverviewhomecomment', {
          p_id: p_id,
          user_id: user_id,
          comment: comment.trim(),
        });

        if (response.status === 200) {
          toast.success("Comment posted successfully");
          setComment('');
          fetchComments(); // Refresh comments after posting
        } else {
          toast.error("Failed to post comment.");
        }
      } catch (error) {
        toast.error("Error posting comment: " + error.message);
      }
    } else {
      toast.warn('Please add a comment before saving.');
    }
  };

  // Delete a comment
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://apitourism.today.alayaarts.com/api/deleteproductoverviewhomecomment/${id}`);
      if (response.status === 200) {
        toast.success("Comment deleted successfully.");
        fetchComments(); // Refresh comments after deletion
      } else {
        toast.error("Failed to delete comment.");
      }
    } catch (error) {
      toast.error("Error deleting comment: " + error.message);
    }
  };

  useEffect(() => {
    fetchComments(); // Fetch comments when component loads
  }, [p_id]);

  return (
    <>
    <Helmet>
        <title>Comment Section for Product</title>
        <meta
          name="description"
          content="Leave and view comments on products. Share your feedback and thoughts about the product."
        />
        <meta
          name="keywords"
          content="comments, product reviews, user feedback, product overview"
        />
        <meta property="og:title" content="Comment Section for Product" />
        <meta
          property="og:description"
          content="Join the conversation and leave your comments on the product. Share your experience and see what others think."
        />
        <meta
          property="og:image"
          content="https://via.placeholder.com/1200x630?text=Product+Comment+Section" // Placeholder image URL
        />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Comment Section for Product" />
        <meta
          name="twitter:description"
          content="Share your thoughts on this product and read what others have to say."
        />
        <meta
          name="twitter:image"
          content="https://via.placeholder.com/1200x630?text=Product+Comment+Section" // Placeholder image URL
        />
      </Helmet>
    <div className="card mt-4 px-3 py-4">
      <div className="p-4">
        <h3>Your comments</h3>
        <div className="container mx-auto p-4 bg-light rounded-lg">
          {comments.length > 0 ? (
            comments.map((item) => (
              <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <strong>Engr.Muhammad</strong> {/* Replace with dynamic user name if available */}
                  <span className="text-muted ms-2">Just now</span>
                  <p>{item.comment}</p>
                </div>
                <div>
                  <Dropdown show={menuOpen === item.id} onToggle={() => setMenuOpen(menuOpen === item.id ? null : item.id)}>
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                      <i className="bi bi-three-dots"></i> {/* Three-dot menu */}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleDelete(item.id)}>
                        <i className="bi bi-trash"></i> Delete Comment
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}

          <textarea
            className="form-control mb-4"
            placeholder="Write a message..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <div className="d-flex justify-content-between">
            <button className="btn btn-danger w-50 mt-2" onClick={handleSave}>
              Post comment
            </button>
            <p className="text-center text-muted mt-2">
              Text or call <span className="fw-bold">(410) 695-3196</span>
            </p>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
    </>
  );
};

export default CommentSection;
