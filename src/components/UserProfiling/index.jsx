import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Helmet } from 'react-helmet';

const UserProfiling = ({ userRole, showModal, setShowModal }) => {
    const [formData, setFormData] = useState({
        current_credit_score: "",
        empoyment_status: "",
        purchase_home_or_investing_property: "",
        buy_home_or_investing_property: "",
        opening_working_with_private_lender: "",
        fimilar_with_buy_or_investing_property: "",
        working_as_realtor: false,
        bought_house_before: false,
    });

    useEffect(() => {
        // Assuming the GET request has already been made elsewhere and the response data is passed into the component
        const userProfilingData = {
            current_credit_score: "601-649",
            empoyment_status: "full-time",
            purchase_home_or_investing_property: "within-3-months",
            buy_home_or_investing_property: "home-ownership",
            opening_working_with_private_lender: "yes",
            fimilar_with_buy_or_investing_property: "somewhat-familiar",
            working_as_realtor: false,
            bought_house_before: true,
        };

        // Populate form with user data if available
        if (userProfilingData) {
            setFormData({
                current_credit_score: userProfilingData.current_credit_score,
                empoyment_status: userProfilingData.empoyment_status,
                purchase_home_or_investing_property: userProfilingData.purchase_home_or_investing_property,
                buy_home_or_investing_property: userProfilingData.buy_home_or_investing_property,
                opening_working_with_private_lender: userProfilingData.opening_working_with_private_lender,
                fimilar_with_buy_or_investing_property: userProfilingData.fimilar_with_buy_or_investing_property,
                working_as_realtor: userProfilingData.working_as_realtor,
                bought_house_before: userProfilingData.bought_house_before,
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const submissionData = {
            ...formData,
            user_id: localStorage.getItem("user_id") || "guest",
        };

        try {
            const response = await fetch("https://api.biznetusa.com/api/store-userprofiling", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submissionData),
            });

            if (response.ok) {
                const result = await response.json();
                setShowModal(false);
                toast.success("Form submitted successfully!");
            } else {
                toast.error("Failed to submit the form.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>User Profiling | UrbanCraft REAL ESTATE</title>
                <meta name="description" content="Complete your user profiling to help us understand your home-buying or investment goals." />
                <meta property="og:title" content="User Profiling | UrbanCraft REAL ESTATE" />
                <meta property="og:description" content="Complete your user profiling to help us understand your home-buying or investment goals." />
                <meta property="og:image" content="https://yourwebsite.com/images/user-profiling.jpg" /> {/* Replace with actual image URL */}
                <meta property="og:url" content="https://yourwebsite.com/user-profiling" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="User Profiling | UrbanCraft REAL ESTATE" />
                <meta name="twitter:description" content="Complete your user profiling to help us understand your home-buying or investment goals." />
                <meta name="twitter:image" content="https://yourwebsite.com/images/user-profiling.jpg" /> {/* Replace with actual image URL */}
            </Helmet>
            {/* Modal for User Profile Form */}
            {
                userRole !== 2 && showModal && (
                    <>
                        <div className={`modal-backdrop fade backdrop-blur ${showModal ? "show" : ""}`}></div>
                        <div
                            className={`modal fade ${showModal ? "show" : ""}`}
                            id="userProfileModal"
                            tabIndex="-1"
                            aria-labelledby="userProfileModalLabel"
                            aria-hidden={!showModal}
                            style={{ display: showModal ? "block" : "none", }}
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header bg-white">
                                        <h5 className="modal-title text-black">User Profiling</h5>
                                    </div>
                                    <div className="modal-body bg-white text-black"
                                        style={{
                                            borderBottomLeftRadius: '.5rem', 
                                            borderBottomRightRadius: '.5rem'
                                        }}>
                                        <form className="text-black" onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="current_credit_score" className="form-label mt-3 text-black">
                                                    What is your current credit score?
                                                </label>
                                                <select
                                                    name="current_credit_score"
                                                    className="form-select"
                                                    id="current-credit-score"
                                                    value={formData.current_credit_score}
                                                    onChange={handleChange}
                                                >
                                                    <option value="under-600">Under 600</option>
                                                    <option value="601-649">601-649</option>
                                                    <option value="650-699">650-699</option>
                                                    <option value="700-749">700-749</option>
                                                    <option value="above-750">Above 750</option>
                                                </select>

                                                <label htmlFor="empoyment_status" className="form-label mt-3 text-black">
                                                    What is your employment status?
                                                </label>
                                                <select
                                                    name="empoyment_status"
                                                    className="form-select"
                                                    id="empoyment-status"
                                                    value={formData.empoyment_status}
                                                    onChange={handleChange}
                                                >
                                                    <option value="full-time">Full-Time</option>
                                                    <option value="part-time">Part-Time</option>
                                                    <option value="self-employed">Self-Employed</option>
                                                    <option value="unemployed">Unemployed</option>
                                                    <option value="retired">Retired</option>
                                                </select>

                                                <label htmlFor="purchase_home_or_investing_property" className="form-label mt-3 text-black">
                                                    How soon are you looking to buy a home or investment property?
                                                </label>
                                                <select
                                                    name="purchase_home_or_investing_property"
                                                    className="form-select"
                                                    id="buying-timeline"
                                                    value={formData.purchase_home_or_investing_property}
                                                    onChange={handleChange}
                                                >
                                                    <option value="within-3-months">Within 3 Months</option>
                                                    <option value="within-3-6-months">Within 3-6 Months</option>
                                                    <option value="6-months-plus">6+ Months</option>
                                                    <option value="no-specified-timeline">No Specified Timeline</option>
                                                </select>

                                                <label htmlFor="buy_home_or_investing_property" className="form-label mt-3 text-black">
                                                    What is your primary goal in purchasing a home or investment property?
                                                </label>
                                                <select
                                                    name="buy_home_or_investing_property"
                                                    className="form-select"
                                                    id="goal"
                                                    value={formData.buy_home_or_investing_property}
                                                    onChange={handleChange}
                                                >
                                                    <option value="home-ownership">Home Ownership</option>
                                                    <option value="investment">Investment</option>
                                                    <option value="both">Both</option>
                                                </select>

                                                <label htmlFor="opening_working_with_private_lender" className="form-label mt-3 text-black">
                                                    Are you open to working with private lenders?
                                                </label>
                                                <select
                                                    name="opening_working_with_private_lender"
                                                    className="form-select"
                                                    id="private-lenders"
                                                    value={formData.opening_working_with_private_lender}
                                                    onChange={handleChange}
                                                >
                                                    <option value="yes">Yes</option>
                                                    <option value="no">No</option>
                                                    <option value="both">Both</option>
                                                </select>

                                                <label htmlFor="fimilar_with_buy_or_investing_property" className="form-label mt-3 text-black">
                                                    How familiar are you with the process of buying a home or investment property?
                                                </label>
                                                <select
                                                    name="fimilar_with_buy_or_investing_property"
                                                    className="form-select"
                                                    id="familiarity"
                                                    value={formData.fimilar_with_buy_or_investing_property}
                                                    onChange={handleChange}
                                                >
                                                    <option value="very-familiar">Very Familiar</option>
                                                    <option value="somewhat-familiar">Somewhat Familiar</option>
                                                    <option value="not-familiar">Not Familiar at all</option>
                                                </select>

                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="working_as_realtor"
                                                        id="working-realtor"
                                                        checked={formData.working_as_realtor}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="working_as_realtor" className="form-label mt-3 text-black">
                                                        Are you currently working with a realtor to help you find a property?
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="bought_house_before"
                                                        id="bought_house_before"
                                                        checked={formData.bought_house_before}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="bought_house_before" className="form-label mt-3 text-black">
                                                        Have you bought a house before?
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="text-end">
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
};

export default UserProfiling;

