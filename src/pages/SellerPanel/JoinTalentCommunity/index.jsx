import React, { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./JoinTalentCommunity.css";
import SellerHeader from "../../../components/SellerHeader";
import Header from "../../../components/header";
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formPayload = new FormData();
        for (let key in formData) {
            formPayload.append(key, formData[key]);
        }

        try {
            const response = await axios.post(
                "https://api.biznetusa.com/api/store-community",
                formPayload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                toast.success("Your application has been successfully submitted!");
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
            }
        } catch (error) {
            toast.error("There was an error submitting your application. Please try again.");
        }
    };

    return (
        <>
        <Helmet>
                <title>Join Our Talent Community | Znet Careers</title>
                <meta
                    name="description"
                    content="Join Znet's Talent Community and upload your resume to be notified about relevant job openings. Take the first step towards an exciting career in real estate."
                />
                <meta
                    name="keywords"
                    content="talent community, job applications, Znet careers, real estate jobs, upload resume"
                />
                <meta name="author" content="Znet" />
            </Helmet>
            <Header />
            <SellerHeader />
            <div className="join-our-talent-community">
                <section className="join-talent-community-section bg-color-talent-community text-start">
                    <div className="join-talent-community mb-5">
                        <h1 className="join-talent-community-title fs-1 fw-bold">
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
                </section>
                <section className="upload-section container border text-center py-5">
                    <p>Upload your resume and get noticed by recruiters</p>
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="form-control-file"
                            accept=".pdf, .doc, .docx"
                        />
                    </div>
                </section>
                <section className="form-section container my-5">
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-12 col-lg-6">
                            <label htmlFor="firstname" className="form-label">First Name</label>
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
                        </div>
                        <div className="col-12 col-lg-6">
                            <label htmlFor="lastname" className="form-label">Last Name</label>
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
                        </div>
                        <div className="col-12 col-lg-6">
                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail4"
                                name="email"
                                placeholder="Enter your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-12 col-lg-6">
                            <label htmlFor="phonenumber" className="form-label">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phonenumber"
                                name="phone"
                                placeholder="Enter your Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-12 col-lg-6">
                            <label htmlFor="inputState" className="form-label">Area of Interest*</label>
                            <select
                                id="inputState"
                                className="form-select"
                                name="area_of_interest"
                                value={formData.area_of_interest}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Choose...</option>
                                <option value="Accounting & Finance & Legal">Accounting & Finance & Legal</option>
                                <option value="Communications & Public Relations">Communications & Public Relations</option>
                                <option value="Customer Service & Training">Customer Service & Training</option>
                                <option value="Data Science & Analytics">Data Science & Analytics</option>
                                <option value="Engineering & Product">Engineering & Product</option>
                                <option value="Executive">Executive</option>
                                <option value="Marketing & Business Development Executive">Marketing & Business Development Executive</option>
                                <option value="Office Administrative Support & Development">Office Administrative Support & Development</option>
                                <option value="People Team">People Team</option>
                                <option value="Real Estate Agent">Real Estate Agent</option>
                                <option value="Real Estate Brokerage Support">Real Estate Brokerage Support</option>
                                <option value="Title & Settlement">Title & Settlement</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-12 col-lg-6">
                            <label htmlFor="inputCity" className="form-label">Desired Work Location (City, State, Country)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                name="location"
                                placeholder="Enter your desired work location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-12">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="gridCheck"
                                    name="privacy_policy"
                                    checked={formData.privacy_policy}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="form-check-label" htmlFor="gridCheck">
                                    By checking this box, I consent to receive transactional and marketing text messages from Znet. I agree to Znet's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
                                </label>
                            </div>
                        </div>
                        <div className="col-12 text-end">
                            <button type="submit" className="btn btn-primary px-5 py-3">
                                Submit
                            </button>
                        </div>

                    </form>
                    <ToastContainer />
                </section>
                <section className="apply-now-section border-top py-5">
                    <div className="container text-center">
                        <h1>Apply Now</h1>
                        <p>Check out all our teams and open positions at Znet to see what interests you.</p>
                        <button className="btn apply-now-btn py-3 px-5 mt-4">See All Departments</button>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default JoinTalentCommunity;
