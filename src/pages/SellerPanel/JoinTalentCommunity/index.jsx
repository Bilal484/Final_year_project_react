import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./JoinTalentCommunity.css";
// import SellerHeader from "../../../components/SellerHeader";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

const JoinTalentCommunity = () => {
    const [formData, setFormData] = useState({
        f_name: "",
        l_name: "",
        email: "",
        phone: "",
        area_of_interest: "",
        location: "",
        privacy_policy: false,
        upload_documents: null,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            upload_documents: e.target.files[0],
        });
    };    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Add animation class to submit button
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i> Processing...';
        submitBtn.disabled = true;
        
        const formPayload = new FormData();
        for (let key in formData) {
            formPayload.append(key, formData[key]);
        }

        try {
            const response = await axios.post(
                "https://apitourism.today.alayaarts.com/api/store-community",
                formPayload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                // Success animation
                submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> Success!';
                submitBtn.classList.add('btn-success');
                
                setTimeout(() => {
                    toast.success("Your application has been successfully submitted!");
                    
                    // Reset form
                    setFormData({
                        f_name: "",
                        l_name: "",
                        email: "",
                        phone: "",
                        area_of_interest: "",
                        location: "",
                        privacy_policy: false,
                        upload_documents: null,
                    });
                    
                    // Reset button
                    submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i> Submit Application';
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-success');
                }, 1500);
            }
        } catch (error) {
            // Error animation
            submitBtn.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i> Error';
            submitBtn.classList.add('btn-danger');
            
            setTimeout(() => {
                toast.error("There was an error submitting your application. Please try again.");
                
                // Reset button
                submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i> Submit Application';
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-danger');
            }, 1500);
        }
    };

    return (
        <>        <Helmet>
                <title>Join Our Talent Community | UrbanCraft REAL ESTATE Careers</title>
                <meta
                    name="description"
                    content="Join UrbanCraft REAL ESTATE's Talent Community and upload your resume to be notified about relevant job openings. Take the first step towards an exciting career in real estate."
                />
                <meta
                    name="keywords"
                    content="talent community, job applications, UrbanCraft REAL ESTATE careers, real estate jobs, upload resume"
                />
                <meta name="author" content="Znet" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
            </Helmet>
            <Header />
            {/* <SellerHeader /> */}
            <div className="join-our-talent-community">
                <section className="join-talent-community-section bg-color-talent-community text-start">
                    <div className="join-talent-community mb-5">
                        <h1 className="join-talent-community-title text-white fs-1 fw-bold">
                            Join our talent community <br />
                            and get the right job for you.
                        </h1>
                        <button className="btn join-us-btn px-4 py-2">Join us</button>
                    </div>
                </section>
                <section className="text-center my-5">
                    <div className="container">
                        <h1 className="section-title">Join our Talent Community</h1>
                        <p className="section-description">
                            Are you ready to use your expertise to redefine real estate in the consumer's favor, but don't see a job opening that's a fit? Submit your resume to our talent community and a recruiter will connect with you when an opportunity opens that matches your skill set.
                        </p>
                    </div>
                </section>                <section className="upload-section container text-center py-5">
                    <p>Upload your resume and get noticed by recruiters</p>
                    <div className="d-flex flex-column justify-content-center align-items-center mb-3">
                        <label className="custom-file-upload">
                            <i className="bi bi-cloud-arrow-up me-2"></i>
                            Upload Resume
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="d-none"
                                accept=".pdf, .doc, .docx"
                            />
                        </label>
                        {formData.upload_documents && (
                            <div className="file-name-display mt-3">
                                <i className="bi bi-file-earmark-text me-2"></i>
                                {formData.upload_documents.name}
                            </div>
                        )}
                    </div>
                </section>                <section className="form-section container my-5 py-4">
                    <div className="text-center mb-4">
                        <h2 className="section-title">Personal Information</h2>
                        <p className="section-description">Please fill out the form below to join our talent community</p>
                    </div>
                    <form className="row g-4" onSubmit={handleSubmit}>
                        <div className="col-12 col-lg-6">
                            <label htmlFor="firstname" className="form-label">
                                <i className="bi bi-person me-2"></i>First Name
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <i className="bi bi-person-fill text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstname"
                                    name="f_name"
                                    placeholder="First name"
                                    value={formData.f_name}
                                    onChange={handleChange}
                                    required
                                />
                                {formData.f_name && (
                                    <span className="input-group-text bg-white text-success">
                                        <i className="bi bi-check-circle-fill"></i>
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <label htmlFor="lastname" className="form-label">
                                <i className="bi bi-person me-2"></i>Last Name
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <i className="bi bi-person-fill text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastname"
                                    name="l_name"
                                    placeholder="Last name"
                                    value={formData.l_name}
                                    onChange={handleChange}
                                    required
                                />
                                {formData.l_name && (
                                    <span className="input-group-text bg-white text-success">
                                        <i className="bi bi-check-circle-fill"></i>
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <label htmlFor="inputEmail4" className="form-label">
                                <i className="bi bi-envelope me-2"></i>Email Address
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <i className="bi bi-envelope-fill text-muted"></i>
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail4"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                {formData.email && (
                                    <span className="input-group-text bg-white text-success">
                                        <i className="bi bi-check-circle-fill"></i>
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <label htmlFor="phonenumber" className="form-label">
                                <i className="bi bi-telephone me-2"></i>Phone Number
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <i className="bi bi-telephone-fill text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phonenumber"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                                {formData.phone && (
                                    <span className="input-group-text bg-white text-success">
                                        <i className="bi bi-check-circle-fill"></i>
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        <div className="col-12">
                            <hr className="my-4" />
                            <h3 className="mb-4 fw-semibold">Career Preferences</h3>
                        </div>
                        
                        <div className="col-12 col-lg-6">
                            <label htmlFor="inputState" className="form-label">
                                <i className="bi bi-briefcase me-2"></i>Area of Interest
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <i className="bi bi-briefcase-fill text-muted"></i>
                                </span>
                                <select
                                    id="inputState"
                                    className="form-select"
                                    name="area_of_interest"
                                    value={formData.area_of_interest}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Choose an area of interest...</option>
                                    <option value="Accounting & Finance & Legal">Accounting & Finance & Legal</option>
                                    <option value="Communications & Public Relations">Communications & Public Relations</option>
                                    <option value="Customer Service & Training">Customer Service & Training</option>
                                    <option value="Data Science & Analytics">Data Science & Analytics</option>
                                    <option value="Engineering & Product">Engineering & Product</option>
                                    <option value="Executive">Executive</option>
                                    <option value="Marketing & Business Development Executive">Marketing & Business Development</option>
                                    <option value="Office Administrative Support & Development">Office Administrative Support</option>
                                    <option value="People Team">People Team</option>
                                    <option value="Real Estate Agent">Real Estate Agent</option>
                                    <option value="Real Estate Brokerage Support">Real Estate Brokerage Support</option>
                                    <option value="Title & Settlement">Title & Settlement</option>
                                    <option value="Other">Other</option>
                                </select>
                                {formData.area_of_interest && (
                                    <span className="input-group-text bg-white text-success">
                                        <i className="bi bi-check-circle-fill"></i>
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <label htmlFor="inputCity" className="form-label">
                                <i className="bi bi-geo-alt me-2"></i>Desired Work Location
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <i className="bi bi-geo-alt-fill text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputCity"
                                    name="location"
                                    placeholder="City, State, Country"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                />
                                {formData.location && (
                                    <span className="input-group-text bg-white text-success">
                                        <i className="bi bi-check-circle-fill"></i>
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        <div className="col-12 mt-4">
                            <hr className="mb-4" />
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="gridCheck"
                                    name="privacy_policy"
                                    checked={formData.privacy_policy}
                                    onChange={handleChange}
                                    required
                                />                                <label className="form-check-label" htmlFor="gridCheck">
                                    <i className="bi bi-shield-check me-2 text-success"></i>
                                    By checking this box, I consent to receive transactional and marketing text messages from UrbanCraft REAL ESTATE. I agree to UrbanCraft REAL ESTATE's <a href="/terms">Terms of Use</a> and <a href="/privacy">Privacy Policy</a>.
                                </label>
                            </div>
                        </div>
                        
                        <div className="col-12 text-center mt-4">
                            <button type="submit" className="btn btn-primary px-5 py-3">
                                <i className="bi bi-send-fill me-2"></i>
                                Submit Application
                            </button>
                        </div>
                    </form>
                    <ToastContainer />
                </section>                <section className="apply-now-section border-top py-5">
                    <div className="container text-center py-4">
                        <h1>Ready to Join Our Team?</h1>
                        <p className="mb-4">Check out all our teams and open positions at UrbanCraft REAL ESTATE to see what interests you.</p>
                        <button className="btn apply-now-btn py-3 px-5 mt-3">
                            <i className="bi bi-search me-2"></i>
                            See All Departments
                        </button>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default JoinTalentCommunity;
