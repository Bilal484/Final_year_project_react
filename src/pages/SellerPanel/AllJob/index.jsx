import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet"; // Import Helmet for meta tags


import "./AllJob.css";
// import SellerHeader from "../../../components/SellerHeader";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";

const AllJob = () => {

    const [email, setEmail] = useState("");
    const [frequency, setFrequency] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [jobs, setJobs] = useState([]);
    const [fiveJobs, setFiveJobs] = useState([]);
    const [favoritedJobs, setFavoritedJobs] = useState([]);
    const navigate = useNavigate();
    const jobsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [userId, setUserId] = useState("");


    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);


    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("https://apitourism.today.alayaarts.com/api/get-all-approve-job");
                if (response.data.status === 200) {
                    setJobs(response.data.jobs);
                    setTotalPages(Math.ceil(response.data.jobs.length / jobsPerPage));
                    setFiveJobs(response.data.jobs.slice(0, jobsPerPage));
                }
            } catch (error) {
            }
        };

        fetchJobs();
    }, []);


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://apitourism.today.alayaarts.com/api/store-email-alerts", {
                email: email,
                get_emails: frequency,
            });

            if (response.data && response.data.status === 200) {
                toast.success("Job alert created successfully!");
                setEmail("");
                setFrequency(null);
            } else {
                toast.error("Failed to create job alert.");
            }
        } catch (error) {
            toast.error("An error occurred while creating the job alert.");
        }
    };


    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setFiveJobs(jobs.slice((page - 1) * jobsPerPage, page * jobsPerPage));
        }
    };


    const handleApplyNow = (jobid) => {
        navigate(`/hvhapply/${jobid}`);
    };


    const handleAddToFavorites = async (jobId) => {
        if (!userId) {
            toast.error("You need to be logged in to add a job to favorites.");
            return;
        }

        const isFavorited = favoritedJobs.includes(jobId);
        const endpoint = isFavorited
            ? `https://apitourism.today.alayaarts.com/api/removefvtjob/${jobId}`
            : "https://apitourism.today.alayaarts.com/api/store-fvt-job";

        try {
            let response;
            if (isFavorited) {
                // Use DELETE method for removing a job from favorites
                response = await axios.delete(endpoint, { data: { user_id: userId } });
            } else {
                // Use POST method for adding a job to favorites
                response = await axios.post(endpoint, {
                    user_id: userId,
                    job_id: jobId,
                });
            }

            if (response.status === 200 && response.data.status === 200) {
                const updatedFavorites = isFavorited
                    ? favoritedJobs.filter((id) => id !== jobId)
                    : [...favoritedJobs, jobId];

                setFavoritedJobs(updatedFavorites);
                localStorage.setItem('favoritedJobs', JSON.stringify(updatedFavorites));
                toast.success(
                    isFavorited ? "Job removed from favorites!" : "Job added to favorites!"
                );
            } else {
                toast.error(
                    isFavorited ? "Failed to remove job from favorites." : "Failed to add job to favorites."
                );
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("Job not found. It may have already been removed from favorites.");
            } else {
                toast.error("An error occurred while updating the job favorite status.");
            }
        }
    };

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favoritedJobs');
        if (storedFavorites) {
            setFavoritedJobs(JSON.parse(storedFavorites));
        }
    }, []);



    return (
        <>
        <Helmet>
                <title>All Jobs - Real Estate Opportunities</title>
                <meta
                    name="description"
                    content="Explore real estate job opportunities. Search for job titles, locations, and categories. Apply now or save jobs to your favorites."
                />
                <meta name="keywords" content="real estate jobs, job opportunities, apply now, job alerts" />
                <meta name="author" content="CodesInc Software Company" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="All Jobs - Real Estate Opportunities" />
                <meta
                    property="og:description"
                    content="Find your next job in real estate. Browse listings, apply, or save jobs to your favorites."
                />
                <meta property="og:url" content="https://yourwebsite.com/all-jobs" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <Header />
            {/* {/* <SellerHeader /> */} 
            <div className="parent-join-agent">
                <div className="full-screen-overlay-hero">
                    <h1 className="custom-title-display-heading">Real Estate All Jobs</h1>
                    <form className="unique-search-bar-wrapper input-group">
                        <input
                            type="text"
                            className="form-control unique-input-textbox"
                            placeholder="Search job title or location"
                        />
                        <button className="btn custom-btn-search-action" type="submit">
                            Search <i className="fas fa-search" />
                        </button>
                    </form>
                </div>
                {/* second container */}
                <section className="container mt-5">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="max-w-md mx-auto  bg-white  shadow-md">
                                {/* <h2 class="text-lg font-semibold mb-4 text-black">Refine your search</h2> */}
                                <div id="accordion " className="border p-2 ">
                                    <div className="border-bottom ">
                                        <button
                                            className="d-flex justify-content-between align-items-center w-100 py-2 text-start text-black bg-white p-2 border-0"
                                            onclick="toggleAccordion(event)"
                                        >
                                            <span className="text-muted text-refine-search">
                                                Refine Your Search
                                            </span>
                                            {/* <span class="fs-4">+</span> */}
                                        </button>
                                    </div>
                                    <div className="border-bottom ">
                                        <button
                                            className="d-flex justify-content-between align-items-center w-100 py-2 text-start text-black bg-white p-2 border-0"
                                            onclick="toggleAccordion(event)"
                                        >
                                            <span>Category</span>
                                            <span className="fs-4">+</span>
                                        </button>
                                        <div className="collapse pl-4">
                                            <div className="p-2  text-dark  shadow-md">
                                                <div className="mb-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Search in category"
                                                        className="form-control w-100"
                                                    />
                                                </div>
                                                <div className="form-check d-flex align-items-center justify-around mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="real-estate-agent"
                                                        className="form-check-input"
                                                        defaultChecked=""
                                                    />
                                                    <label
                                                        htmlFor="real-estate-agent"
                                                        className="form-check-label"
                                                    >
                                                        {" "}
                                                        Real Estate Agent (345)
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="associate-agent"
                                                        className="form-check-input"
                                                        defaultChecked=""
                                                    />
                                                    <label
                                                        htmlFor="associate-agent"
                                                        className="form-check-label"
                                                    >
                                                        Associate Agent - Independent Contractor (173)
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="rental-multifamily"
                                                        className="form-check-input"
                                                        defaultChecked=""
                                                    />
                                                    <label
                                                        htmlFor="rental-multifamily"
                                                        className="form-check-label"
                                                    >
                                                        Rental &amp; Multifamily (8)
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="title-settlement"
                                                        className="form-check-input"
                                                    />
                                                    <label
                                                        htmlFor="title-settlement"
                                                        className="form-check-label"
                                                    >
                                                        Title &amp; Settlement (8)
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="other"
                                                        className="form-check-input"
                                                    />
                                                    <label htmlFor="other" className="form-check-label">
                                                        Other (7)
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="data-science"
                                                        className="form-check-input"
                                                    />
                                                    <label
                                                        htmlFor="data-science"
                                                        className="form-check-label"
                                                    >
                                                        Data Science &amp; Analytics (4)
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="accounting"
                                                        className="form-check-input"
                                                    />
                                                    <label
                                                        htmlFor="accounting"
                                                        className="form-check-label"
                                                    >
                                                        Accounting &amp; Finance &amp; Legal (3)
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="brokerage-support"
                                                        className="form-check-input"
                                                    />
                                                    <label
                                                        htmlFor="brokerage-support"
                                                        className="form-check-label"
                                                    >
                                                        Real Estate Brokerage Support (3)
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-bottom">
                                        <button
                                            className="d-flex justify-content-between align-items-center w-100 py-2 text-start text-black bg-white p-2 border-0"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseCountry"
                                            aria-expanded="false"
                                            aria-controls="collapseCountry"
                                        >
                                            <span>Country</span>
                                            <span className="fs-4">+</span>
                                        </button>
                                        <div id="collapseCountry" className="collapse p-2">
                                            <div className="form-check mb-2">
                                                <input
                                                    type="checkbox"
                                                    id="brokerage-support"
                                                    className="form-check-input"
                                                />
                                                <label
                                                    htmlFor="brokerage-support"
                                                    className="form-check-label"
                                                >
                                                    Real Estate Brokerage Support (3)
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-bottom ">
                                        <button
                                            className="d-flex justify-content-between align-items-center w-100 py-2 text-start text-black bg-white p-2 border-0"
                                            onclick="toggleAccordion(event)"
                                        >
                                            <span>State / Province</span>
                                            <span className="fs-4">+</span>
                                        </button>
                                        <div className="collapse pl-4">
                                            <div className="p-2  text-dark  shadow-md">
                                                <div className="mb-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Search in category"
                                                        className="form-control w-100"
                                                    />
                                                </div>
                                                <div className="form-check d-flex align-items-center justify-around mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="real-estate-agent"
                                                        className="form-check-input"
                                                        defaultChecked=""
                                                    />
                                                    <label
                                                        htmlFor="real-estate-agent"
                                                        className="form-check-label"
                                                    >
                                                        California (76)
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="associate-agent"
                                                        className="form-check-input"
                                                        defaultChecked=""
                                                    />
                                                    <label
                                                        htmlFor="associate-agent"
                                                        className="form-check-label"
                                                    >
                                                        Washington (41)label&gt;
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="rental-multifamily"
                                                        className="form-check-input"
                                                        defaultChecked=""
                                                    />
                                                    <label
                                                        htmlFor="rental-multifamily"
                                                        className="form-check-label"
                                                    >
                                                        Illinois
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="title-settlement"
                                                        className="form-check-input"
                                                    />
                                                    <label
                                                        htmlFor="title-settlement"
                                                        className="form-check-label"
                                                    >
                                                        Florida
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="other"
                                                        className="form-check-input"
                                                    />
                                                    <label htmlFor="other" className="form-check-label">
                                                        Texas (20)
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="data-science"
                                                        className="form-check-input"
                                                    />
                                                    <label
                                                        htmlFor="data-science"
                                                        className="form-check-label"
                                                    >
                                                        Virginia (18)
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="accounting"
                                                        className="form-check-input"
                                                    />
                                                    <label
                                                        htmlFor="accounting"
                                                        className="form-check-label"
                                                    >
                                                        Maryland (13)
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="brokerage-support"
                                                        className="form-check-input"
                                                    />
                                                    <label
                                                        htmlFor="brokerage-support"
                                                        className="form-check-label"
                                                    >
                                                        Real Estate Brokerage Support (3)
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-bottom ">
                                        <button
                                            className="d-flex justify-content-between align-items-center w-100 py-2 text-start text-black bg-white p-2 border-0"
                                            onclick="toggleAccordion(event)"
                                        >
                                            <span>City</span>
                                            <span className="fs-4">+</span>
                                        </button>
                                        <div className="collapse pl-4">
                                            <div className="p-2  text-dark  shadow-md">
                                                <div className="mb-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Search in category"
                                                        className="form-control w-100"
                                                    />
                                                </div>
                                                <div className="form-check d-flex align-items-center justify-around mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="real-estate-agent"
                                                        className="form-check-input"
                                                        defaultChecked=""
                                                    />
                                                    <label
                                                        htmlFor="real-estate-agent"
                                                        className="form-check-label"
                                                    >
                                                        California (76)
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="associate-agent"
                                                        className="form-check-input"
                                                        defaultChecked=""
                                                    />
                                                    <label
                                                        htmlFor="associate-agent"
                                                        className="form-check-label"
                                                    >
                                                        Washington (41)label&gt;
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="rental-multifamily"
                                                        className="form-check-input"
                                                        defaultChecked=""
                                                    />
                                                    <label
                                                        htmlFor="rental-multifamily"
                                                        className="form-check-label"
                                                    >
                                                        Illinois
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="title-settlement"
                                                        className="form-check-input"
                                                    />
                                                    <label
                                                        htmlFor="title-settlement"
                                                        className="form-check-label"
                                                    >
                                                        Florida
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="other"
                                                        className="form-check-input"
                                                    />
                                                    <label htmlFor="other" className="form-check-label">
                                                        Texas (20)
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="data-science"
                                                        className="form-check-input"
                                                    />
                                                    <label
                                                        htmlFor="data-science"
                                                        className="form-check-label"
                                                    >
                                                        Virginia (18)
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="accounting"
                                                        className="form-check-input"
                                                    />
                                                    <label
                                                        htmlFor="accounting"
                                                        className="form-check-label"
                                                    >
                                                        Maryland (13)
                                                    </label>
                                                </div>
                                                <div className="form-check mb-2">
                                                    <input
                                                        type="checkbox"
                                                        id="brokerage-support"
                                                        className="form-check-input"
                                                    />
                                                    <label
                                                        htmlFor="brokerage-support"
                                                        className="form-check-label"
                                                    >
                                                        Real Estate Brokerage Support (3)
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-bottom">
                                        <button
                                            className="d-flex justify-content-between align-items-center w-100 py-2 text-start text-black bg-white p-2 border-0"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseCountry"
                                            aria-expanded="false"
                                            aria-controls="collapseCountry"
                                        >
                                            <span>Job Time</span>
                                            <span className="fs-4">+</span>
                                        </button>
                                        <div id="collapseCountry" className="collapse p-2">
                                            <div className="form-check mb-2">
                                                <input
                                                    type="checkbox"
                                                    id="brokerage-support"
                                                    className="form-check-input"
                                                />
                                                <label
                                                    htmlFor="brokerage-support"
                                                    className="form-check-label"
                                                >
                                                    Full Time
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-bottom">
                                        <button
                                            className="d-flex justify-content-between align-items-center w-100 py-2 text-start text-black bg-white p-2 border-0"
                                            onclick="toggleAccordion(event)"
                                        >
                                            <span>Keywords</span>
                                            <span className="fs-4">+</span>
                                        </button>
                                        <div className="collapse pl-4">
                                            <div className="mb-4 mt-2">
                                                <input
                                                    type="text"
                                                    placeholder="Search in category"
                                                    className="form-control w-100"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <style
                                dangerouslySetInnerHTML={{
                                    __html:
                                        "\n            .collapse.show {\n              display: block !important;\n\n            }\n\n            .collapse {\n              display: none;\n            }\n          ",
                                }}
                            />


                            <div className="card p-4 mt-5 card-alert border">
                                <div className="card-body">
                                    <h5 className="card-title text-start">
                                        <i className="bi bi-bell" /> Create Job Alert
                                    </h5>
                                    <p className="text-muted text-start small">
                                        NOTE: Use refine search filters above to get better job alerts
                                    </p>
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                placeholder="Enter email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="emailFrequency" className="form-label">
                                                You'll get emails
                                            </label>
                                            <select
                                                id="emailFrequency"
                                                className="form-select"
                                                value={frequency || ""}
                                                onChange={(e) => setFrequency(e.target.value)}
                                            >
                                                <option value="" disabled>
                                                    Select frequency
                                                </option>
                                                <option value="Weekly">Weekly</option>
                                                <option value="Daily">Daily</option>
                                                <option value="Monthly">Monthly</option>
                                            </select>
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100">
                                            Create Job Alert
                                        </button>
                                    </form>
                                    <ToastContainer />
                                    <a href="#" className="text-danger d-block text-center mt-3">
                                        Manage Alerts
                                    </a>
                                </div>
                            </div>


                        </div>
                        {/* second column */}
                        <div className="col-md-8 border p-2">
                            {/* Showing Results and Sort Options */}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>Showing {currentPage * jobsPerPage - jobsPerPage + 1}-{currentPage * jobsPerPage > jobs.length ? jobs.length : currentPage * jobsPerPage} of {jobs.length} results</div>
                                <div>
                                    <select className="form-select" aria-label="Sort by">
                                        <option selected="">Most Relevant</option>
                                        <option value={1}>Most Recent</option>
                                        <option value={2}>Oldest First</option>
                                    </select>
                                </div>
                            </div>


                            {/* Active Filters */}
                            <div className="d-flex align-items-center mb-3">
                                <span className="badge bg-light text-dark border me-2">
                                    Real Estate Agent
                                </span>
                                <a href="#" className="text-decoration-none text-danger">
                                    Clear all
                                </a>
                            </div>
                            {/* Job Listing */}

                            <div className="list-group">
                                {fiveJobs.length > 0 ? (
                                    fiveJobs.map((job) => (
                                        <div key={job.id} className="list-group-item border-0 border-bottom p-4">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h5 className="mb-1 fw-bold text-danger">{job.title}</h5>
                                                    <small>
                                                        <a href="#" className="text-decoration-none text-primary">
                                                            {job.job_location.length > 0 ? `Available in ${job.job_location.length} locations` : "Location not specified"}
                                                        </a>{" "}
                                                        • {job.job_type || "Job type not specified"}{job.end_date}
                                                    </small>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <button
                                                        className="btn btn-apply-now btn-sm"
                                                        onClick={() => handleApplyNow(job.id)}
                                                    >
                                                        Apply Now
                                                    </button>
                                                    <span
                                                        className="btn btn-sm ms-2"
                                                        title={favoritedJobs.includes(job.id) ? "Remove from Favorites" : "Add to Favorites"}
                                                        onClick={() => handleAddToFavorites(job.id)}
                                                        style={{
                                                            backgroundColor: favoritedJobs.includes(job.id) ? "red" : "transparent",
                                                            color: favoritedJobs.includes(job.id) ? "white" : "black",
                                                            border: "none",
                                                        }}
                                                    >
                                                        <i className="bi bi-heart" />
                                                    </span>

                                                </div>
                                            </div>
                                            <p className="text-muted mt-2">{job.description}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted p-4">No jobs available at the moment.</p>
                                )}
                            </div>
                            {/* Pagination */}
                            <nav aria-label="Page navigation" className="mt-4">
                                <ul className="pagination justify-content-center">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => handlePageChange(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        {/* Include Bootstrap Icons if not already loaded */}
                        <link
                            rel="stylesheet"
                            href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css"
                        />
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};
export default AllJob;
