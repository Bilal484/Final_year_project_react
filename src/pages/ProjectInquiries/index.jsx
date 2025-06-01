import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
// import SellerHeader from "../../components/ContractorHeader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";

const ProjectInquiries = () => {
  const [inquiry, setInquiry] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://apitourism.today.alayaarts.com/api/get-inquires");
      setInquiry(response.data.project_inquires);
      toast.success("Inquiries fetched successfully");
    } catch (err) {
      toast.error("Failed to fetch project inquiries.");
    }
  };

  const handleDelete = async (e) => {
    const inquiryId = e.currentTarget.closest("li").dataset.key;
    try {
      await axios.delete(`https://apitourism.today.alayaarts.com/api/deleteinquire/${inquiryId}`);
      toast.success("Inquiry deleted successfully");
      fetchData();
    } catch (err) {
      toast.error("Failed to delete inquiry.");
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    toast.dismiss(); // Clear any existing toasts

    const payload = {
      client_name: e.target.clientName.value,
      client_email: e.target.clientEmail.value,
      description: e.target.projectDescription.value,
      priority_level: e.target.priority.value,
    };

    try {
      const response = await axios.post("https://apitourism.today.alayaarts.com/api/store-inquire", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Inquiry added successfully!");
        e.target.reset(); // Reset the form
        fetchData(); // Refresh the inquiries list
      } else {
        toast.error(`Error: ${response.data.message || "Failed to add inquiry"}`);
      }
    } catch (err) {
      toast.error(`Error: ${err.response?.data?.message || "An error occurred"}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
     <Helmet>
        <title>Project Inquiries - BizNetUSA</title>
        <meta name="description" content="Manage and track project inquiries from potential clients. Add, delete, and edit inquiries to keep your project management efficient and organized." />
        <meta name="keywords" content="project management, client inquiries, business projects, contractor services, project tracking, BizNetUSA" />
      </Helmet>
      <Header />
      {/* <ContractorHeader /> */}
      <div className="container my-3">
        {/* Project Inquiries */}
        <div id="projectInquiries" className="mb-5">
          <h2 className="my-2">Project Inquiries</h2>
          <form id="inquiryForm" className="mb-3" onSubmit={handleSubmission}>
            <div className="mb-3">
              <label htmlFor="clientName" className="form-label">
                Client Name
              </label>
              <input
                type="text"
                className="form-control"
                id="clientName"
                name="clientName"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="clientEmail" className="form-label">
                Client Email
              </label>
              <input
                type="email"
                className="form-control"
                id="clientEmail"
                name="clientEmail"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="projectDescription" className="form-label">
                Project Description
              </label>
              <textarea
                className="form-control"
                id="projectDescription"
                name="projectDescription"
                rows={3}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="priority" className="form-label">
                Priority Level
              </label>
              <select className="form-select" id="priority" name="priority" required>
                <option value="" disabled selected>
                  Select Priority
                </option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Inquiry
            </button>
          </form>

          <h3>Current Inquiries</h3>
          <ul id="inquiryList" className="list-group">
            {inquiry.length > 0 ? (
              inquiry.map((item) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={item.id} data-key={item.id}
                >
                  <div className="review-text">
                    <strong>{item.client_name}</strong>{" "}
                    <small className="text-muted fs-6">({item.client_email})</small>
                    <p className="fs-6">{item.description}</p>
                  </div>
                  <div className="two-buttons">
                    <button className="btn btn-primary btn-sm edit-btn">
                      Edit
                    </button>
                    <button className="ms-2 btn btn-danger btn-sm delete-btn" onClick={handleDelete}>
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item">
                <p className="text-center">No Inquiries Found</p>
              </li>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectInquiries;

