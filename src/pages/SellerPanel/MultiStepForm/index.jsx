import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./MultiStepForm.css";
// import SellerHeader from "../../../components/SellerHeader";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import Notification, {useNotification} from "../../../components/Notification";

const MultiStepForm = () => {
  const [notification, showNotification] = useNotification(); // Destructure the returned values
  const { id } = useParams(); // Get jobId from URL parameters
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    appyForJobId: id || "", // Set jobId from URL parameter
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    state: "",
    zip: "",
    preferredName: "",
    addressLine1: "",
    addressLine2: "",
    phoneDeviceType: "",
    countryPhone: "",
    referral: "",
    jobTitle: "",
    company: "",
    ageVerification: "",
    legalRight: "",
    visaSupport: "",
    preferredPronouns: "",
  });

  useEffect(() => {
    if (id) {
      setFormData((prevData) => ({
        ...prevData,
        appyForJobId: id,
      }));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmitInfo = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.country ||
      !formData.city ||
      !formData.state ||
      !formData.zip ||
      !formData.addressLine1 ||
      !formData.phoneDeviceType ||
      !formData.countryPhone ||
      !formData.referral
    ) {
      showNotification("Please fill out all required fields.", "error");
      return;
    }

    try {
      const response = await axios.post('https://apitourism.today.alayaarts.com/api/store-job-my-info', {
        appy_for_job_id: formData.appyForJobId,
        f_name: formData.firstName,
        l_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zip,
        preferred_name: formData.preferredName,
        address_line_1: formData.addressLine1,
        address_line_2: formData.addressLine2,
        phone_device_type: formData.phoneDeviceType,
        country_phone_code: formData.countryPhone,
        how_you_hear_about_us: formData.referral,
      });

      if (response.status === 200) {
        toast.success('Information submitted successfully!', {
          position: "top-right",
          autoClose: 3000,
        });
        nextStep();
      } else {
        toast.error('Failed to submit information.', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([key, value]) => `${key}: ${value.join(', ')}`)
          .join('\n');
        toast.error(`Error(s):\n${errorMessages}`, {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        toast.error('An error occurred: ' + error.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

  const handleSubmitExperience = async () => {
    if (!formData.jobTitle || !formData.company || !formData.addressLine1) {
      toast.error('Please fill out all required fields.', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const payload = {
        appy_for_job_id: formData.appyForJobId,
        'job_title': [formData.jobTitle],
        'company': [formData.company],
        address_line_1: formData.addressLine1,
      };

      const response = await axios.post('https://apitourism.today.alayaarts.com/api/store-job-my-experience', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 && response.data && response.data.success) {
        toast.success('Experience details submitted successfully!', {
          position: "top-right",
          autoClose: 3000,
        });
        nextStep();
      } else {
        const errorMessage = response.data.message || 'Failed to submit experience details.';
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([key, value]) => `${key}: ${value.join(', ')}`)
          .join('\n');
        toast.error(`Error(s):\n${errorMessages}`, {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        toast.error('An error occurred: ' + error.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

  const handleSubmitQuestions = async () => {
    try {
      const payload = {
        appy_for_job_id: formData.appyForJobId,
        at_least_18_year_old: formData.ageVerification,
        legal_rights_to_work_in_country: formData.legalRight,
        need_visa_support: formData.visaSupport,
        preferred_pronouns: formData.preferredPronouns,
        address_line_1: formData.addressLine1,
      };

      const response = await axios.post('https://apitourism.today.alayaarts.com/api/store-apply-job-application-questions', payload);

      if (response.status === 200) {
        toast.success('Application questions submitted successfully!', {
          position: "top-right",
          autoClose: 3000,
        });
        nextStep();
      } else {
        toast.error('Failed to submit application questions.', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([key, value]) => `${key}: ${value.join(', ')}`)
          .join('\n');
        toast.error(`Error(s):\n${errorMessages}`, {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        toast.error('An error occurred: ' + error.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
          <Helmet>
        <title>Job Application Form | Step-by-Step Process</title>
        <meta
          name="description"
          content="Complete your job application using our multi-step form. Provide your personal details, experience, and answer questions to apply for your desired job."
        />
        <meta
          name="keywords"
          content="job application, multi-step form, personal information, job experience, application questions"
        />
        <meta name="author" content="UrbanCraft REAL ESTATE" />
      </Helmet>
            {/* <SellerHeader /> */}
            <div className="step-content" id="step-1-content">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                My Information
              </h2>
              <div className="p-6 bg-card rounded-lg shadow-md">
                <form>
                  <div className="mb-4">
                    <label htmlFor="country" className="form-label text-muted-foreground">
                      Country*
                    </label>
                    <select
                      id="country"
                      className="form-select"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Country</option>
                      <option>United States of America</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="firstName" className="form-label text-muted-foreground">
                      First Name*
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="lastName" className="form-label text-muted-foreground">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label text-muted-foreground">
                      I have a preferred name
                    </label>
                    <input
                      type="text"
                      id="preferredName"
                      className="form-control"
                      value={formData.preferredName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="addressLine1" className="form-label text-muted-foreground">
                      Address Line 1*
                    </label>
                    <input
                      type="text"
                      id="addressLine1"
                      className="form-control"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="addressLine2" className="form-label text-muted-foreground">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      id="addressLine2"
                      className="form-control"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="city" className="form-label text-muted-foreground">
                      City*
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="form-control"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="state" className="form-label text-muted-foreground">
                      State*
                    </label>
                    <input
                      type="text"
                      id="state"
                      className="form-control"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="zip" className="form-label text-muted-foreground">
                      Zip/Postal Code*
                    </label>
                    <input
                      type="text"
                      id="zip"
                      className="form-control"
                      value={formData.zip}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label text-muted-foreground">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phoneDeviceType" className="form-label text-muted-foreground">
                      Phone Device Type*
                    </label>
                    <input
                      type="text"
                      id="phoneDeviceType"
                      className="form-control"
                      value={formData.phoneDeviceType}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="countryPhone" className="form-label text-muted-foreground">
                      Country's Phone Code*
                    </label>
                    <input
                      type="text"
                      id="countryPhone"
                      className="form-control"
                      value={formData.countryPhone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="form-label text-muted-foreground">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="referral" className="form-label text-muted-foreground">
                      How did you hear about us?*
                    </label>
                    <input
                      type="text"
                      id="referral"
                      className="form-control"
                      value={formData.referral}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary mt-4"
                    onClick={handleSubmitInfo}
                  >
                    Submit and Next
                  </button>
                </form>
              </div>
            </div>
            <Footer />
            <ToastContainer />
          </>
        );
      case 2:
        return (
          <>
            {/* <SellerHeader /> */}
            <div className="step-content" id="step-2-content">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                My Experience
              </h2>
              <div className="p-4 bg-card rounded-lg shadow-md">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-4">
                    <label htmlFor="jobTitle" className="form-label text-muted-foreground">
                      Job Title*
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      className="form-control"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="company" className="form-label text-muted-foreground">
                      Company*
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="form-control"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="addressLine1" className="form-label text-muted-foreground">
                      Address Line 1*
                    </label>
                    <input
                      type="text"
                      id="addressLine1"
                      className="form-control"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={previousStep}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSubmitExperience}
                    >
                      Submit and Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <ToastContainer />
          </>
        );
      case 3:
        return (
          <>
            {/* <SellerHeader /> */}
            <div className="step-content" id="step-3-content">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Application Questions
              </h2>
              <div className="p-4 bg-card rounded-lg shadow-md">
                <form>
                  <div className="mb-4">
                    <label htmlFor="ageVerification" className="form-label">
                      Are you at least 18 years of age?*
                    </label>
                    <select
                      id="ageVerification"
                      className="form-select"
                      value={formData.ageVerification}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Please Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="legalRight" className="form-label">
                      Do you have the legal right to work in the country?*
                    </label>
                    <select
                      id="legalRight"
                      className="form-select"
                      value={formData.legalRight}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Please Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="visaSupport" className="form-label">
                      Will you need visa support?*
                    </label>
                    <select
                      id="visaSupport"
                      className="form-select"
                      value={formData.visaSupport}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Please Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="preferredPronouns" className="form-label">
                      (Optional) Please share your preferred pronouns:
                    </label>
                    <select
                      id="preferredPronouns"
                      className="form-select"
                      value={formData.preferredPronouns}
                      onChange={handleInputChange}
                    >
                      <option value="">Please Select</option>
                      <option value="He/Him">He/Him</option>
                      <option value="She/Her">She/Her</option>
                      <option value="They/Them">They/Them</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="addressLine1" className="form-label text-muted-foreground">
                      Address Line 1*
                    </label>
                    <input
                      type="text"
                      id="addressLine1"
                      className="form-control"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={previousStep}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSubmitQuestions}
                    >
                      Submit and Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <ToastContainer />
          </>
        );
      case 4:
        return (
          <>
            {/* <SellerHeader /> */}
            <div className="step-content" id="step-4-content">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Review
              </h2>
              <div className="p-4 bg-card rounded-lg shadow-md">
                <p className="text-muted mb-4">
                  Please review your information before submitting.
                </p>
                <ul className="list-unstyled">
                  <li>
                    <strong>Country:</strong> {formData.country || "N/A"}
                  </li>
                  <li>
                    <strong>First Name:</strong> {formData.firstName || "N/A"}
                  </li>
                  <li>
                    <strong>Last Name:</strong> {formData.lastName || "N/A"}
                  </li>
                  <li>
                    <strong>City:</strong> {formData.city || "N/A"}
                  </li>
                  <li>
                    <strong>Email:</strong> {formData.email || "N/A"}
                  </li>
                  <li>
                    <strong>Phone:</strong> {formData.phone || "N/A"}
                  </li>
                  <li>
                    <strong>Job Title:</strong> {formData.jobTitle || "N/A"}
                  </li>
                  <li>
                    <strong>Company:</strong> {formData.company || "N/A"}
                  </li>
                  <li>
                    <strong>Age Verification:</strong> {formData.ageVerification || "N/A"}
                  </li>
                  <li>
                    <strong>Legal Right to Work:</strong> {formData.legalRight || "N/A"}
                  </li>
                  <li>
                    <strong>Visa Support Needed:</strong> {formData.visaSupport || "N/A"}
                  </li>
                  <li>
                    <strong>Preferred Pronouns:</strong> {formData.preferredPronouns || "N/A"}
                  </li>
                </ul>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={previousStep}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      toast.success("Form submitted successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                      });
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <ToastContainer />
          </>
        );
      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <>
    <Header/>
          {notification.message && <Notification {...notification} />}
    <div className="steps-agent-job-parent mt-5">
      <div className="container mt-4 p-5">
        {/* Step indicators */}
        <div className="step-indicator mb-4">
          <h4>Step {currentStep} of 3</h4>
        </div>
        <div className="form-content mt-5">{renderStepContent()}</div>
      </div>

      <ToastContainer />
    </div>
    <Footer/>
    </>
  );
};

export default MultiStepForm;
