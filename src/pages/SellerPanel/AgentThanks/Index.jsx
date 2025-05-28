import React from "react";
import { Helmet } from "react-helmet"; // Import Helmet for meta tags
import { useParams, Link } from "react-router-dom"; // Import useParams and Link
import img1 from "../../..//assets/images/agent-sold.jpg";
import SellerHeader from "../../../components/SellerHeader";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const AgentThanks = () => {
    const { id } = useParams(); // Get the jobId from the route parameter

    return (
        <>
            <Helmet>
                <title>Thank You - Agent Application</title>

                <meta
                    name="description"
                    content="Thank you for your interest in joining our team. Complete your full application to continue."
                />
                <meta name="keywords" content="Agent Application, Thank You, Real Estate, Apply Now" />
                <meta name="author" content="CodesInc Software Company" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="Thank You - Agent Application" />
                <meta
                    property="og:description"
                    content="Thank you for your interest in joining our team. Click Apply Now to complete your full application."
                />
                <meta property="og:image" content="path/to/agent-sold.jpg" />
                <meta property="og:url" content="https://yourwebsite.com/MultiStepForm/${id}" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <Header />
            {/* <SellerHeader /> */}
            <main>
                <div className="container main-thanku">
                    <div className="bg-light p-4 rounded shadow-sm mx-auto text-center">
                        <h1 className="fs-2 fw-bold mb-3">Thank you, Muhammad!</h1>
                        <img
                            aria-hidden="true"
                            alt="Person holding a sold sign in front of a house"
                            src={img1}
                            className="mb-3 img-fluid rounded"
                            height={200}
                            width={200}
                        />
                        <p className="text-muted mb-3">
                            Thanks for your interest and sharing your experience with us!
                            We've shared your information with our recruiting team. The next
                            step is to complete your full application so we can learn a bit
                            more about your qualifications. Please click "Apply" to continue.
                        </p>
                        <Link to={`/MultiStepForm/${id}`}>
                            <button className="btn btn-primary">Apply Now</button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AgentThanks;
