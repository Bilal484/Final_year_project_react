import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet'; // Import Helmet
import ContractorHeader from "../../components/ContractorHeader";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";

const ManageServiceContractor = () => {
  const [service, setService] = useState([]);
  const [message, setMessage] = useState("");

  const handleDeleteService = async (e) => {
    const id = e.target.closest("li").dataset.key;
    try {
      const response = await axios.delete(`https://api.biznetusa.com/api/deletemanageservice/${id}`);
      fetchData();
    } catch (err) {
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData();
    formData.append("service_name", e.target.serviceName.value);
    formData.append("description", e.target.serviceDescription.value);
    formData.append("category", e.target.serviceCategory.value);
    formData.append("price", e.target.servicePrice.value);
    formData.append("status", e.target.serviceStatus.value);

    try {
      const response = await axios.post("https://api.biznetusa.com/api/store-manageservice", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setMessage("Service added successfully!");
        toast.success("Service added successfully!");
        e.target.reset();
        fetchData();
      } else {
        setMessage(`Error: ${response.data.message || "Failed to add service"}`);
      }
    } catch (err) {
      setMessage(`Error: ${err.response?.data?.message || "An error occurred"}`);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.biznetusa.com/api/get-manage-services");
      setService(response.data.manage_services);
    } catch (err) {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <Helmet>
        <title>Manage Contractor Services - UrbanCraft REAL ESTATE</title>
        <meta name="description" content="Manage and control your contractor services easily from a single dashboard." />
        <meta name="keywords" content="manage services, contractor services, service management" />
      </Helmet>
      <Header />
      <ContractorHeader />
      <div className="container mt-4">
        {/* Service Listings */}
        <div id="serviceListings" className="mb-5">
          <h2 className="my-2">Manage Service Listings</h2>
          {message && <div className="alert alert-info">{message}</div>}
          <form id="serviceForm" className="mb-3" onSubmit={handleSubmission}>
            <div className="mb-3">
              <label htmlFor="serviceName" className="form-label">
                Service Name
              </label>
              <input
                type="text"
                className="form-control"
                id="serviceName"
                name="serviceName"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="serviceDescription" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="serviceDescription"
                name="serviceDescription"
                rows={3}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="serviceCategory" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                id="serviceCategory"
                name="serviceCategory"
                required
              >
                <option value="" disabled selected>
                  Select a category
                </option>
                <option value="cleaning">Cleaning</option>
                <option value="maintenance">Maintenance</option>
                <option value="renovation">Renovation</option>
                <option value="landscaping">Landscaping</option>
                <option value="painting">Painting</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="servicePrice" className="form-label">
                Price ($)
              </label>
              <input
                type="number"
                className="form-control"
                id="servicePrice"
                name="servicePrice"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="serviceStatus" className="form-label">
                Status
              </label>
              <select
                className="form-select"
                id="serviceStatus"
                name="serviceStatus"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Service
            </button>
          </form>
          <h3>Existing Services</h3>
          <ul id="serviceList" className="list-group">
            {service.length > 0 ? (
              service.map((item) => (
                <li
                  className="list-group-item"
                  key={item.id}
                  data-key={item.id}
                >
                  <strong>{item.service_name}</strong> - ${item.price}
                  <p>Description: {item.description}</p>
                  <small>
                    Category: {item.category} | Status: {item.status}
                  </small>
                  <button
                    className="btn btn-warning btn-sm float-end ms-2"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm float-end"
                    onClick={handleDeleteService}
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <li className="list-group-item">
                No services available.
              </li>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageServiceContractor;

