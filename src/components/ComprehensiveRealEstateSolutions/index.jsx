import React from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Img01 from '../../assets/images/business-8788632_1280.jpg'

const ComprehensiveRealEstateSolutions = () => {
    return (
        <>
            <Helmet>
                <title>Comprehensive Real Estate Solutions</title>
                <meta
                    name="description"
                    content="UrbanCraft REAL ESTATE provides comprehensive real estate solutions to ensure smooth and efficient transactions for buying, selling, or renting properties."
                />
                <meta
                    name="keywords"
                    content="real estate, transaction coordinator, real estate services, buying a home, selling a home, renting a home"
                />
                <meta property="og:title" content="Comprehensive Real Estate Solutions" />
                <meta
                    property="og:description"
                    content="UrbanCraft REAL ESTATE offers expert real estate services as a transaction coordinator, ensuring that every step in the real estate transaction process is handled efficiently."
                />
                <meta
                    property="og:image"
                    content={Img01} // The image used on the page
                />
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Comprehensive Real Estate Solutions" />
                <meta
                    name="twitter:description"
                    content="Get expert real estate transaction management with UrbanCraft REAL ESTATE, handling all the details for a smooth buying, selling, or renting experience."
                />
                <meta name="twitter:image" content={Img01} />
            </Helmet>
            <section className="mt-4 container">
                <div className="row p-4 bg-light rounded-lg shadow-lg">
                    <div className="col-md-6 pe-md-4">
                        <h2 className="h4 fw-bold mb-3">Providing customers with comprehensive real estate solutions</h2>
                        <p className="text-muted mb-3">
                            At UrbanCraft REAL ESTATE, we specialize in facilitating real estate transactions from beginning to end. As a
                            full-service Transaction Coordinator, our role is to streamline every aspect of the transaction
                            process. We collaborate closely with all stakeholders—including agents, clients, lenders, title
                            companies, and inspectors—to ensure that every phase from listing to closing is executed
                            flawlessly. Our expertise in handling documentation, maintaining compliance, and managing
                            communications allows our clients to navigate their real estate journeys without hassle. Whether
                            you are buying, selling, or renting, trust UrbanCraft REAL ESTATE to manage the details and keep your transaction
                            on track.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <img src={Img01} alt="Real estate scene"
                            className="img-fluid rounded-lg shadow-md" />
                    </div>
                    <div className="d-flex align-items-center justify-content-between flex-md-row flex-column p-4 bg-light border-bottom">
                        <div className="d-flex flex-md-row flex-column gap-md-5 gap-2">
                            <h2 className="h4 fw-bold text-primary">Stay up to date</h2>
                            <p className="text-muted">Get the latest news and reports delivered right to your inbox.</p>
                        </div>
                        <button className="btn btn-primary text-light px-4 py-2 rounded">Sign up</button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ComprehensiveRealEstateSolutions;
