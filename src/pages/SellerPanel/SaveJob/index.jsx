import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import SellerHeader from "../../../components/SellerHeader";
import img1 from "../../../assets/images/img_agent_career/save-job-2.png";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SaveJob = () => {
    const [favouriteJob, setFavouriteJob] = useState([]);
    const [firstTen, setFirstTen] = useState([]);
    const [userId, setUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)

    const jobsPerPage = 5;

    const navigate = useNavigate();

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPage) {
            setCurrentPage(page);
            const startIndex = (page - 1) * jobsPerPage;
            const endIndex = page * jobsPerPage;
            setFirstTen(favouriteJob.slice(startIndex, endIndex));
        }
    };


    const handleApplyNow = (jobid) => {
        navigate(`/hvhapply/${jobid}`);
    };

    const handleAddToFavorites = async (jobId) => {
        const normalizedJobId = parseInt(jobId); // Ensure jobId is consistent
        const isFavorited = favouriteJob.some((job) => job.id === normalizedJobId);

        const endpoint = isFavorited
            ? `https://apitourism.today.alayaarts.com/api/removefvtjob/${normalizedJobId}`
            : 'https://apitourism.today.alayaarts.com/api/store-fvt-job';

        try {
            let response;
            if (isFavorited) {
                response = await axios.delete(endpoint);
            } else {
                response = await axios.post(endpoint, {
                    user_id: userId,
                    job_id: normalizedJobId,
                });
            }

            if (response.status === 200 && response.data.status === 200) {
                const updatedFavorites = isFavorited
                    ? favouriteJob.filter((job) => job.job_id !== normalizedJobId)
                    : [...favouriteJob, { job_id: normalizedJobId }];
                setFavouriteJob(updatedFavorites);
                toast.success(
                    isFavorited ? "Job removed from favorites!" : "Job added to favorites!"
                );
            } else {
                throw new Error("Unexpected API response");
            }
        } catch (error) {
            toast.error(
                isFavorited
                    ? "Failed to remove job from favorites."
                    : "Failed to add job to favorites."
            );
        }
    };



    const fetchFavouriteJobs = async () => {
        if (userId) {
            try {
                const response = await axios.get(`https://apitourism.today.alayaarts.com/api/get-fvt-job/${userId}`);
                setFavouriteJob(response.data.fvt_jobs);
                setFirstTen(response.data.fvt_jobs.slice(0, jobsPerPage));
                setTotalPage(Math.ceil(response.data.fvt_jobs.length / jobsPerPage));
                localStorage.setItem('totalFavJobs', JSON.stringify(response.data.fvt_jobs.length));
                toast.success("Successfully Recieved Jobs");
            } catch (err) {
                toast.error("Failed to fetch jobs");
            }
        }
    }

    useEffect(() => {
        const storedUserId = localStorage.getItem('user_id');
        if (storedUserId) {
            setUserId(parseInt(storedUserId));
        } else {
            toast.error('User ID not found in localStorage.');
        }
    }, [])

    useEffect(() => {
        if (userId) {
            fetchFavouriteJobs();
        }
    }, [userId])


    return (
        <>
        <Helmet>
                <title>Saved Jobs | Manage Your Favorites</title>
                <meta
                    name="description"
                    content="View and manage your favorite job postings. Apply to jobs or save them for later with our easy-to-use platform."
                />
                <meta
                    name="keywords"
                    content="saved jobs, favorite jobs, job management, apply to jobs, job opportunities"
                />
                <meta name="author" content="UrbanCraft REAL ESTATE" />
            </Helmet>
            <Header />
            {/* <SellerHeader /> */}
            <ToastContainer />
            <div className="save-job">
                <section className="save-job-section bg-color-talent-community text-start">
                </section>
                <section>
                    <div className="container">
                        <div className="save-job mb-5 ">
                            <h1 className="save-job-title ">Saved Jobs</h1>
                        </div>
                        <div className="row">
                            {
                                <div className="list-group">
                                    {firstTen.length > 0 ? (
                                        firstTen.map((job) => (
                                            <div key={job.id} className="list-group-item border-0 border-bottom p-4">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h5 className="mb-1 fw-bold text-danger">{job.jobs.title}</h5>
                                                        <small>
                                                            • {job.jobs.job_type || "Job type not specified"}{job.jobs.end_date}
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
                                                            title={
                                                                favouriteJob.some(fav => fav.id === job.id)
                                                                    ? "Remove from Favorites"
                                                                    : "Add to Favorites"
                                                            }
                                                            onClick={() => handleAddToFavorites(job.id)}
                                                            style={{
                                                                backgroundColor: favouriteJob.some(fav => fav.id === job.id) ? "red" : "transparent",
                                                                color: favouriteJob.some(fav => fav.id === job.id) ? "white" : "black",
                                                                border: "none",
                                                            }}
                                                        >
                                                            <FaHeart />
                                                        </span>


                                                    </div>
                                                </div>
                                                <p className="text-muted mt-2">{job.jobs.description}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-12 col-md-12 col-lg-12 text-center py-5">
                                            <img src={img1} alt="" />
                                            <p>Your cart is empty! Why don't you add some jobs?</p>
                                            <Link className="text-danger btn" to="/AllJob">
                                                Find your opportunity here{" "}
                                            </Link>
                                        </div>
                                    )}
                                </div>}
                        </div>
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
                                {Array.from({ length: totalPage }, (_, index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPage ? 'disabled' : ''}`}>
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
                </section>
            </div>
            <Footer />
        </>
    );
};
export default SaveJob;
