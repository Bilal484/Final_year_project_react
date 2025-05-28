import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./CreateJob.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SellerHeader from "../../components/SellerHeader";
import { Helmet } from 'react-helmet';

const CreateJob = () => {
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        job_location: [""],
        end_date: "",
        status: "0", // Set status to 0 by default
        career_id: "",
        job_type: "",
        images: []
    });
    const [careerOptions, setCareerOptions] = useState([]); // Initialize as an array
    const [userId, setUserId] = useState(null);

    // Fetch user ID from localStorage
    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            toast.error("Please log in to create a job.");
        }
    }, []);

    useEffect(() => {
        // Fetch career options from the API
        const fetchCareers = async () => {
            try {
                const response = await axios.get("https://apitourism.today.alayaarts.com/api/get-careers");
                if (Array.isArray(response.data)) {
                    setCareerOptions(response.data);
                } else if (response.data && Array.isArray(response.data.careers)) {
                    setCareerOptions(response.data.careers);
                } else {
                    toast.error("Failed to fetch career options. Please check the API response.");
                }
            } catch (error) {
                toast.error("Failed to fetch career options. Please try again.");
            }
        };
        fetchCareers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            toast.error("User ID is missing. Please log in as a seller.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("desc", formData.desc);
        formData.job_location.forEach((location, index) => {
            formDataToSend.append(`job_location[${index}]`, location);
        });
        formDataToSend.append("end_date", formData.end_date);
        formDataToSend.append("post_by", userId); // Automatically pass user_id from localStorage
        formDataToSend.append("status", formData.status); // Status set to 0 by default
        formDataToSend.append("career_id", formData.career_id);
        formDataToSend.append("job_type", formData.job_type);

        Array.from(formData.images).forEach((image, index) => {
            formDataToSend.append(`images[${index}]`, image);
        });

        try {
            const response = await axios.post("https://apitourism.today.alayaarts.com/api/store-job", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Job posted successfully!");
        } catch (error) {
            toast.error("Failed to post job. Please try again.");
        }
    };

    return (
        <>
         <Helmet>
                <title>Create Job</title>
                <meta name="description" content="Create new job listings on the BizNetUSA platform." />
                <meta name="keywords" content="jobs, career, employment, recruitment, BizNetUSA" />
                <meta property="og:title" content="Create Job at BizNetUSA" />
                <meta property="og:description" content="Post new job opportunities and find qualified candidates." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="URL_to_an_image_for_social_media_sharing" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Create Job on BizNetUSA" />
                <meta name="twitter:description" content="Explore new career opportunities by posting jobs on BizNetUSA." />
            </Helmet>
            <Header />
            {/* <SellerHeader /> */},
            <div className="py-3">
                <div className="create-job-container">
                    <ToastContainer />
                    <h1 className="form-heading"><b>Create Job</b></h1>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="job-form">
                        <div className="form-group">
                            <label className="form-label">Title:</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-input" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description:</label>
                            <textarea name="desc" value={formData.desc} onChange={handleChange} className="form-input" required></textarea>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Job Location:</label>
                            <input
                                type="text"
                                name="job_location"
                                value={formData.job_location}
                                onChange={(e) => setFormData({ ...formData, job_location: e.target.value.split(",") })}
                                placeholder="Enter locations separated by commas"
                                className="form-input"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">End Date:</label>
                            <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} className="form-input" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Job Type:</label>
                            <input type="text" name="job_type" value={formData.job_type} onChange={handleChange} className="form-input" placeholder="e.g., Full-time, Part-time" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Career ID:</label>
                            <select
                                name="career_id"
                                value={formData.career_id}
                                onChange={handleChange}
                                className="form-input"
                                required
                            >
                                <option value="">Select a Career</option>
                                {Array.isArray(careerOptions) && careerOptions.map((career) => (
                                    <option key={career.id} value={career.id}>
                                        {career.name} {/* Adjust based on actual response properties */}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Images:</label>
                            <input type="file" name="images" multiple onChange={handleFileChange} className="form-input-file" />
                        </div>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>

            <Footer />
        </>

    );
};

export default CreateJob;
