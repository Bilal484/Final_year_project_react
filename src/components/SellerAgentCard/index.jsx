import React from "react";
import { Helmet } from "react-helmet";
import img1 from "../..//assets/images/card1-img.webp"
import img2 from "../..//assets/images/card-2.webp"
import img3 from "../..//assets/images/card-3.webp"
import img4 from "../..//assets/images/card-4.webp"

const SellerAgentCard = () => {
    return (
        <>
         <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta
                    name="description"
                    content="Explore opportunities with our real estate team. Empower real estate agents, join our support team, or become an associate agent to thrive in the real estate industry."
                />
                <meta
                    name="keywords"
                    content="real estate agents, real estate support roles, real estate career, associate agents, UrbanCraft REAL ESTATE Next, real estate jobs"
                />
                <meta
                    property="og:title"
                    content="Real Estate Career Opportunities - Join Our Team"
                />
                <meta
                    property="og:description"
                    content="Explore various career paths in real estate. Whether you're an agent, support staff, or looking to become an associate, we have opportunities for you."
                />
                <meta
                    property="og:image"
                    content="https://example.com/assets/images/card1-img.webp"
                />
                <meta property="og:image:alt" content="Real Estate Career Opportunities" />
                <meta name="twitter:title" content="Real Estate Career Opportunities - Join Our Team" />
                <meta
                    name="twitter:description"
                    content="Explore various career paths in real estate. Whether you're an agent, support staff, or looking to become an associate, we have opportunities for you."
                />
                <meta
                    name="twitter:image"
                    content="https://example.com/assets/images/card1-img.webp" 
                />
                <title>Real Estate Career Opportunities - Join Our Team</title>
            </Helmet>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                <div className="col">
                    <div className="card shadow-sm h-100">
                        <img
                            src={img1}
                            className="card-img-top"
                            alt="Real Estate Agents"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Empower Real Estate Agents</h5>
                            <p className="card-text text-muted">
                                Join a team where agents thrive, earning competitive salaries
                                and enjoying unmatched support. Experience a culture that
                                prioritizes your success.
                            </p>
                            <a href="#" className="btn btn">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-sm h-100">
                        <img
                            src={img4}
                            className="card-img-top"
                            alt="UrbanCraft REAL ESTATE Next"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Introducing UrbanCraft REAL ESTATE Next</h5>
                            <p className="card-text text-muted">
                                Unlock significant earnings without the burden of hidden costs.
                                Experience a revolutionary new way to succeed in real estate
                                with UrbanCraft REAL ESTATE Next.
                            </p>
                            <a href="#" className="btn btn">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-sm h-100">
                        <img
                            src={img2}
                            className="card-img-top"
                            alt="Real Estate Support Roles"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Join Our Support Team</h5>
                            <p className="card-text text-muted">
                                Be part of a dedicated team that ensures clients receive the
                                best experience in real estate. Your support is crucial in
                                driving our success.
                            </p>
                            <a href="#" className="btn btn">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-sm h-100">
                        <img
                            src={img3}
                            className="card-img-top"
                            alt="Associate Agents"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Become an Associate Agent</h5>
                            <p className="card-text text-muted">
                                Showcase properties, conduct open houses, and operate as an
                                independent contractor. Discover a fulfilling career in real
                                estate.
                            </p>
                            <a href="#" className="btn btn">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SellerAgentCard;
