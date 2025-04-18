import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HVHApply.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import SellerHeader from "../../../components/SellerHeader";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Notification, {useNotification} from "../../../components/Notification";
const HVHApply = () => {
      const [notification, showNotification] = useNotification(); // Destructure the returned values
    
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        userId: '',
        jobId: jobId || '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        receiveSms: '',
        receiveEmail: '',
        is18YearsOld: '',
        authorizedToWork: '',
    });
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            navigate('/login');
            return;
        } else {
            setFormData((prevData) => ({ ...prevData, userId }));
        }

        axios.get('https://api.biznetusa.com/api/get-jobs')
            .then((response) => {
                if (response.status === 200) {
                    setJobs(response.data.jobs);
                }
            })
            .catch((error) => {
            });
    }, [navigate]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleRadioChange = (e, fieldName) => {
        setFormData({ ...formData, [fieldName]: e.target.value });
    };

    const handleJobSelection = (e) => {
        setFormData({ ...formData, jobId: e.target.value });
    };

    const validateStep1 = () => {
        const { jobId, firstName, lastName, email, phone } = formData;
        if (!jobId || !firstName || !lastName || !email || !phone) {
            toast.error('Please fill out all required fields in Step 1 before proceeding.', {
                position: "top-right",
                autoClose: 3000,
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.jobId) {
            toast.error('Please select a job before applying.', {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            const response = await axios.post('https://api.biznetusa.com/api/store-apply-for-job', {
                user_id: formData.userId,
                job_id: formData.jobId,
                f_name: formData.firstName,
                l_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                receive_job_related_sms: formData.receiveSms,
                opt_receive_job_related_email: formData.receiveEmail,
                are_you_18_years_old: formData.is18YearsOld,
                legal_authorized_to_work_united_state: formData.authorizedToWork,
            });

            if (response.status === 200) {
                toast.success('Form submitted successfully!', {
                    position: "top-right",

                });

                // Navigate to the "Thank You" page after success
                navigate(`/AgentThanks/${formData.jobId}`);
            } else {
                toast.error('Failed to submit the form.', {
                    position: "top-right",
                });
            }
        } catch (error) {
            showNotification('Error during form submission:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = Object.entries(error.response.data.errors)
                    .map(([key, value]) => `${key}: ${value.join(', ')}`)
                    .join('\n');
                toast.error(`Error(s):\n${errorMessages}`, {
                    position: "top-right",
                    autoClose: 5000,
                });
            } else {
                toast.error('An error occurred: ' + (error.message || 'Unknown error'), {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        }
    };

    const nextStep = (step) => {
        if (step === 2 && validateStep1()) {
            setCurrentStep(step);
        }
    };

    const prevStep = (step) => {
        setCurrentStep(step);
    };

    return (
        <>
                  {notification.message && <Notification {...notification} />}

         <Helmet>
                <title>Apply for Jobs | UrbanCraft REAL ESTATE</title>
                <meta name="description" content="Apply for jobs at UrbanCraft REAL ESTATE. Follow easy steps to submit your application for various opportunities." />
                <meta name="keywords" content="job application, apply jobs online, UrbanCraft REAL ESTATE jobs, job opportunities" />
                <meta name="author" content="UrbanCraft REAL ESTATE" />
            </Helmet>
            <Header />
            <SellerHeader />
            <main className="parent-hvh-apply mt-5">
                <div className="container-fluid w-100 mt-5">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="sidebar bg-background rounded-lg shadow-md">
                                <ul className="space-y-2 list-unstyled">
                                    <li className="d-flex align-items-center  px-4 ">
                                        <input
                                            type="radio"
                                            id="contact-info"
                                            name="options"
                                            className="me-3 ms-3"
                                            checked={currentStep === 1}
                                            onChange={() => setCurrentStep(1)}
                                        />
                                        <label htmlFor="contact-info">
                                            Contact info
                                        </label>
                                    </li>
                                    <li className="d-flex align-items-center  px-4 ">
                                        <input
                                            type="radio"
                                            id="details"
                                            name="options"
                                            className="me-3 ms-3"
                                            checked={currentStep === 2}
                                            onChange={() => setCurrentStep(2)}
                                        />
                                        <label htmlFor="details">
                                            Details
                                        </label>
                                    </li>
                                    <li className="d-flex align-items-center  px-4 ">
                                        <input
                                            type="radio"
                                            id="next-steps"
                                            name="options"
                                        />
                                        <label htmlFor="next-steps">
                                            Next steps
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 step-container">
                            {currentStep === 1 && (
                                <div className="step" id="step1">
                                    <div className="card card-mx-steps p-4">
                                        <h2 className="h5 mb-3 text-center">
                                            Great! Let's get started right away.
                                        </h2>
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="jobId" className="form-label">
                                                    Select Job to Apply
                                                </label>
                                                <select
                                                    className="form-control"
                                                    id="jobId"
                                                    value={formData.jobId}
                                                    onChange={handleJobSelection}
                                                    required
                                                >
                                                    <option value="">Select a job</option>
                                                    {jobs.map((job) => (
                                                        <option key={job.id} value={job.id}>
                                                            {job.title}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="firstName" className="form-label">
                                                    What is your first name?
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="firstName"
                                                    placeholder="First Name"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="lastName" className="form-label">
                                                    What is your last name?
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="lastName"
                                                    placeholder="Last Name"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">
                                                    What is your email address?
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="Email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="phone" className="form-label">
                                                    What is your phone number?
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    id="phone"
                                                    placeholder="Phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <p>Would you like to receive job-related updates by SMS?</p>
                                                <div className="form-check">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        id="sms-yes"
                                                        name="receiveSms"
                                                        value="1"
                                                        onChange={(e) => handleRadioChange(e, 'receiveSms')}
                                                    />
                                                    <label className="form-check-label" htmlFor="sms-yes">Yes</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        id="sms-no"
                                                        name="receiveSms"
                                                        value="0"
                                                        onChange={(e) => handleRadioChange(e, 'receiveSms')}
                                                    />
                                                    <label className="form-check-label" htmlFor="sms-no">No</label>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <p>Would you like to receive job-related emails?</p>
                                                <div className="form-check">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        id="email-yes"
                                                        name="receiveEmail"
                                                        value="1"
                                                        onChange={(e) => handleRadioChange(e, 'receiveEmail')}
                                                    />
                                                    <label className="form-check-label" htmlFor="email-yes">Yes</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        id="email-no"
                                                        name="receiveEmail"
                                                        value="0"
                                                        onChange={(e) => handleRadioChange(e, 'receiveEmail')}
                                                    />
                                                    <label className="form-check-label" htmlFor="email-no">No</label>
                                                </div>
                                            </div>
                                        </form>
                                        <button
                                            className="btn btn-agent-apply-next mt-3"
                                            onClick={() => nextStep(2)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                            {currentStep === 2 && (
                                <div className="step" id="step2">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="p-4">
                                            <form>
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Are you at least 18 years of age?
                                                    </label>
                                                    <div className="form-check">
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            id="age-yes"
                                                            name="is18YearsOld"
                                                            value="yes"
                                                            onChange={(e) => handleRadioChange(e, 'is18YearsOld')}
                                                        />
                                                        <label className="form-check-label" htmlFor="age-yes">Yes</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            id="age-no"
                                                            name="is18YearsOld"
                                                            value="no"
                                                            onChange={(e) => handleRadioChange(e, 'is18YearsOld')}
                                                        />
                                                        <label className="form-check-label" htmlFor="age-no">No</label>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">
                                                        Are you legally authorized to work in the United States?
                                                    </label>
                                                    <div className="form-check">
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            id="auth-yes"
                                                            name="authorizedToWork"
                                                            value="1"
                                                            onChange={(e) => handleRadioChange(e, 'authorizedToWork')}
                                                        />
                                                        <label className="form-check-label" htmlFor="auth-yes">Yes</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            id="auth-no"
                                                            name="authorizedToWork"
                                                            value="0"
                                                            onChange={(e) => handleRadioChange(e, 'authorizedToWork')}
                                                        />
                                                        <label className="form-check-label" htmlFor="auth-no">No</label>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            className="btn btn-agent-apply-next mb-3"
                                            onClick={() => prevStep(1)}
                                        >
                                            Previous
                                        </button>
                                        <ToastContainer />
                                        <button
                                            className="btn btn-agent-apply-next mb-3"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default HVHApply;
