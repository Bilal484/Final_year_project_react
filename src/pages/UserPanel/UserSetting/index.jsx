import React from "react";
import { Helmet } from "react-helmet";
import "./UserSetting.css";
import UserHeader from "../../../components/UserHeader";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const UserSetting = () => {
    return (
        <>
        <Helmet>
                <title>User Settings | UrbanCraft REAL ESTATE</title>
                <meta 
                    name="description" 
                    content="Manage your notification preferences, saved searches, and email subscriptions with ease on UrbanCraft REAL ESTATE's User Settings page."
                />
                <meta 
                    name="keywords" 
                    content="user settings, notification preferences, saved searches, email subscriptions, UrbanCraft REAL ESTATE" 
                />
                <meta property="og:title" content="User Settings | UrbanCraft REAL ESTATE" />
                <meta 
                    property="og:description" 
                    content="Customize your preferences for notifications, email updates, and saved searches on UrbanCraft REAL ESTATE's User Settings page." 
                />
                <meta 
                    property="og:url" 
                    content="https://apitourism.today.alayaarts.com/user-settings" 
                />
                <meta 
                    property="og:image" 
                    content="https://apitourism.today.alayaarts.com/uploads/user-settings-placeholder.jpg" 
                />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="User Settings | UrbanCraft REAL ESTATE" />
                <meta 
                    name="twitter:description" 
                    content="Manage your preferences and stay updated with UrbanCraft REAL ESTATE. Configure notifications and emails tailored to your needs." 
                />
                <meta 
                    name="twitter:image" 
                    content="https://apitourism.today.alayaarts.com/uploads/user-settings-placeholder.jpg" 
                />
            </Helmet>
            <Header />
            {/* <UserHeader /> */}
            <div className="parent-user-setting">
                <div id="main-content">
                    <section className="container mt-5 container-user-setting">
                        <div className="row">
                            <h1>Notification Settings</h1>
                            <h4 className="mt-1">Recommendations</h4>
                            <p>
                                Discover homes we think you'll like based on your browsing—even
                                ones your Saved Searches may miss.
                            </p>
                            <div className="col-md-6">
                                <div className="card p-4 shadow-sm rounded">
                                    <div className="d-flex align-items-center mb-3">
                                        <img
                                            aria-hidden="true"
                                            alt="for-sale-icon"
                                            src="https://openui.fly.dev/openui/24x24.svg?text=📦"
                                            className="me-2"
                                        />
                                        <h5 className="mb-0">FOR SALE</h5>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span>Email</span>
                                        <label className="custom-switch">
                                            <input
                                                type="checkbox"
                                                id="emailToggle"
                                                defaultChecked=""
                                                onclick="toggleEmailSection('toggleSection', 'emailToggle')"
                                            />
                                            <span className="custom-slider">
                                                <span className="slider-label on-label">ON</span>
                                                <span className="slider-label off-label">OFF</span>
                                            </span>
                                        </label>
                                    </div>
                                    <hr />
                                    {/* Section that will be toggled */}
                                    <div id="toggleSection">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="d-flex flex-column">
                                                <span>Maximum List Price</span>
                                                <span className="text-muted">No max</span>
                                            </div>
                                            <div>
                                                <a href="#" className="ms-2 edit-section">
                                                    Edit
                                                </a>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex flex-column">
                                                <span>Locations</span>
                                                <span className="text-muted">Seattle</span>
                                            </div>
                                            <div>
                                                <a href="#" className="edit-section ms-2">
                                                    Edit
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* favourite */}
                                <div className="card p-4 shadow-sm rounded mt-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span>Email</span>
                                        <label className="custom-switch">
                                            <input
                                                type="checkbox"
                                                id="emailToggle2"
                                                onclick="toggleEmailSection('toggleSection2', 'emailToggle2')"
                                            />
                                            <span className="custom-slider">
                                                <span className="slider-label on-label">ON</span>
                                                <span className="slider-label off-label">OFF</span>
                                            </span>
                                        </label>
                                    </div>
                                    <hr />
                                    {/* Section that will be toggled */}
                                    <div id="toggleSection2" style={{ display: "none" }}>
                                        {/* Initially hidden */}
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="d-flex">
                                                <div className="radio-styling">
                                                    <input
                                                        className="radio-class"
                                                        type="radio"
                                                        name="rentOption"
                                                        id="instantOption"
                                                    />
                                                </div>
                                                <label htmlFor="instantOption">Instant</label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex">
                                                <div className="radio-styling">
                                                    <input
                                                        className="radio-class"
                                                        type="radio"
                                                        name="rentOption"
                                                        id="notInstantOption"
                                                    />
                                                </div>
                                                <label htmlFor="notInstantOption">Not Instant</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* For rent */}
                            <div className="col-md-6">
                                <div className="card p-4 shadow-sm rounded">
                                    <div className="d-flex align-items-center mb-3">
                                        <img
                                            aria-hidden="true"
                                            alt="for-rent-icon"
                                            src="https://openui.fly.dev/openui/24x24.svg?text=🏠"
                                            className="me-2"
                                        />
                                        <h5 className="mb-0">FOR RENT</h5>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span>Email</span>
                                        <label className="custom-switch">
                                            <input
                                                type="checkbox"
                                                id="emailToggle3"
                                                onclick="toggleEmailSection('toggleSection3', 'emailToggle3')"
                                            />
                                            <span className="custom-slider">
                                                <span className="slider-label on-label">ON</span>
                                                <span className="slider-label off-label">OFF</span>
                                            </span>
                                        </label>
                                    </div>
                                    <hr />
                                    {/* Section that will be toggled */}
                                    <div id="toggleSection3" style={{ display: "none" }}>
                                        {/* Initially hidden */}
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="d-flex">
                                                <div className="radio-styling">
                                                    <input
                                                        className="radio-class"
                                                        type="radio"
                                                        name="rentOption3"
                                                        id="instantOption3"
                                                    />
                                                </div>
                                                <label htmlFor="instantOption3">Instant</label>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex">
                                                <div className="radio-styling">
                                                    <input
                                                        className="radio-class"
                                                        type="radio"
                                                        name="rentOption3"
                                                        id="notInstantOption3"
                                                    />
                                                </div>
                                                <label htmlFor="notInstantOption3">Not Instant</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="custom-alert" id="alertMessage">
                            Changes Saved!
                        </div>
                    </section>
                    {/* hoes */}
                    <div className="container mt-5">
                        <h3 className="section-title">Saved Searches</h3>
                        <p className="section-subtitle">
                            Receive timely notifications based on your preferred search
                            filters.
                        </p>
                        <div className="card saved-search-card d-flex flex-row align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center">
                                <div className="icon-container">
                                    <i className="bi bi-house-door" /> {/* Bootstrap Icon */}
                                </div>
                                <div>
                                    <h5 className="mb-1">FOR SALE</h5>
                                    <p className="text-muted mb-0">
                                        You can create Saved Searches while searching for homes.
                                    </p>
                                </div>
                            </div>
                            <div className="card-image">
                                <img src="/assets/images/homesale.png" alt="For Sale" />
                            </div>
                        </div>
                        <div className="card saved-search-card d-flex flex-row align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center">
                                <div className="icon-container">
                                    <i className="bi bi-building" /> {/* Bootstrap Icon */}
                                </div>
                                <div>
                                    <h5 className="mb-1">FOR RENT</h5>
                                    <p className="text-muted mb-0">
                                        You can create Saved Searches while searching for rentals.
                                    </p>
                                </div>
                            </div>
                            <div className="card-image">
                                <img src="/assets/images/homerent.png" alt="For Rent" />
                            </div>
                        </div>
                    </div>
                    <div className="container mt-5">
                        <h3 className="preference-section-title">Other emails</h3>
                        <p className="fw-bold">UrbanCraft REAL ESTATE updates</p>
                        <div className="email-preference-card d-flex align-items-center justify-content-between">
                            <div>
                                <h5 className="preference-title mb-1">UrbanCraft REAL ESTATE news</h5>
                                <p className="text-muted mb-0">
                                    Stay up to date on UrbanCraft REAL ESTATE's tools and features, how to buy or
                                    sell a home, and connect with an agent.
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <label className="custom-switch">
                                    <input
                                        type="checkbox"
                                        id="emailToggle"
                                        defaultChecked=""
                                        onclick="toggleEmailSection('toggleSection', 'emailToggle')"
                                    />
                                    <span className="custom-slider">
                                        <span className="slider-label on-label">ON</span>
                                        <span className="slider-label off-label">OFF</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="email-preference-card d-flex align-items-center justify-content-between">
                            <div>
                                <h5 className="preference-title mb-1">Lifestyle &amp; tips</h5>
                                <p className="text-muted mb-0">
                                    Get local insights, home improvement tips, style and design
                                    resources.
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <label className="custom-switch">
                                    <input
                                        type="checkbox"
                                        id="emailToggle"
                                        defaultChecked=""
                                        onclick="toggleEmailSection('toggleSection', 'emailToggle')"
                                    />
                                    <span className="custom-slider">
                                        <span className="slider-label on-label">ON</span>
                                        <span className="slider-label off-label">OFF</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="email-preference-card d-flex align-items-center justify-content-between">
                            <div>
                                <h5 className="preference-title mb-1">
                                    Newsletter from my agent
                                </h5>
                                <p className="text-muted mb-0">
                                    Get notified about the latest trends in the real estate market
                                    from your local UrbanCraft REAL ESTATE agent.
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <label className="custom-switch">
                                    <input
                                        type="checkbox"
                                        id="emailToggle"
                                        defaultChecked=""
                                        onclick="toggleEmailSection('toggleSection', 'emailToggle')"
                                    />
                                    <span className="custom-slider">
                                        <span className="slider-label on-label">ON</span>
                                        <span className="slider-label off-label">OFF</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* home search */}
                    <div className="container mt-5">
                        <h3 className="preference-section-title">Other emails</h3>
                        <p className="fw-bold">UrbanCraft REAL ESTATE updates</p>
                        <div className="email-preference-card d-flex align-items-center justify-content-between">
                            <div>
                                <h5 className="preference-title mb-1">UrbanCraft REAL ESTATE news</h5>
                                <p className="text-muted mb-0">
                                    Stay up to date on UrbanCraft REAL ESTATE's tools and features, how to buy or
                                    sell a home, and connect with an agent.
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <label className="custom-switch">
                                    <input
                                        type="checkbox"
                                        id="emailToggle"
                                        defaultChecked=""
                                        onclick="toggleEmailSection('toggleSection', 'emailToggle')"
                                    />
                                    <span className="custom-slider">
                                        <span className="slider-label on-label">ON</span>
                                        <span className="slider-label off-label">OFF</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="email-preference-card d-flex align-items-center justify-content-between">
                            <div>
                                <h5 className="preference-title mb-1">Lifestyle &amp; tips</h5>
                                <p className="text-muted mb-0">
                                    Get local insights, home improvement tips, style and design
                                    resources.
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <label className="custom-switch">
                                    <input
                                        type="checkbox"
                                        id="emailToggle"
                                        defaultChecked=""
                                        onclick="toggleEmailSection('toggleSection', 'emailToggle')"
                                    />
                                    <span className="custom-slider">
                                        <span className="slider-label on-label">ON</span>
                                        <span className="slider-label off-label">OFF</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="email-preference-card d-flex align-items-center justify-content-between">
                            <div>
                                <h5 className="preference-title mb-1">
                                    Newsletter from my agent
                                </h5>
                                <p className="text-muted mb-0">
                                    Get notified about the latest trends in the real estate market
                                    from your local UrbanCraft REAL ESTATE agent.
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <label className="custom-switch">
                                    <input
                                        type="checkbox"
                                        id="emailToggle"
                                        defaultChecked=""
                                        onclick="toggleEmailSection('toggleSection', 'emailToggle')"
                                    />
                                    <span className="custom-slider">
                                        <span className="slider-label on-label">ON</span>
                                        <span className="slider-label off-label">OFF</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default UserSetting;
