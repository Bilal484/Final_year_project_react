import React from "react";
import { Helmet } from "react-helmet";
import ImageWithText from "../../components/ImagewithText";
// import "./App.css";
import img1 from "../../assets/images/blog 04.jpg"
import img2 from "../../assets/images/blog 05.jpg"
import img3 from "../../assets/images/blog 27.jpg"
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const WhyZnet = () => {
    return (
        <>
        <Helmet>
                <title>Why Choose UrbanCraft REAL ESTATE | Your Trusted Real Estate Partner</title>
                <meta 
                    name="description" 
                    content="Discover why UrbanCraft REAL ESTATE is the best choice for buying or selling homes. With experienced agents, top-notch technology, and affordable fees, we help you achieve your real estate goals." 
                />
                <meta 
                    name="keywords" 
                    content="Znet, real estate, best agents, affordable listing fees, buy home, sell home, real estate technology" 
                />
                <meta property="og:title" content="Why Choose UrbanCraft REAL ESTATE | Your Trusted Real Estate Partner" />
                <meta 
                    property="og:description" 
                    content="Learn how UrbanCraft REAL ESTATE pairs local expertise with powerful technology to make your home buying and selling journey seamless and cost-effective." 
                />
                <meta 
                    property="og:url" 
                    content="https://apitourism.today.alayaarts.com/why-znet" 
                />
                <meta 
                    property="og:image" 
                    content="https://apitourism.today.alayaarts.com/uploads/why-znet-placeholder.jpg" 
                />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Why Choose UrbanCraft REAL ESTATE | Your Trusted Real Estate Partner" />
                <meta 
                    name="twitter:description" 
                    content="Discover how UrbanCraft REAL ESTATE simplifies real estate with expert agents, advanced technology, and cost savings for buyers and sellers." 
                />
                <meta 
                    name="twitter:image" 
                    content="https://apitourism.today.alayaarts.com/uploads/why-znet-placeholder.jpg" 
                />
            </Helmet>
            <Header />
            <div className="conatiner g-0" >
                <div className="row g-0">
                    <div className="g-0 mx-auto">
                        {/* Main Hero Section */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "2rem",
                                paddingTop:"0px",
                                backgroundColor: "#f8f8f8",
                            }}
                        >
                            <ImageWithText
                                content="We pair local agents with powerful technology to help you find the
                        right home, sell your current home for top dollar, and save
                        thousands on fees."
                                imgSrc={img1}
                                altText="WhyZnet"
                                title="The best agents powered by the best technology"


                            />
                        </div>

                        {/* Features Section */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "2rem",
                                padding: "2rem",
                            }}
                        >
                            <div>
                                <h2>Best-in-class agents</h2>
                                <p>
                                    Our agents are among the most experienced in the industry, so we
                                    know how to help you win in today’s market.
                                </p>
                            </div>
                            <div>
                                <h2>Reach more buyers</h2>
                                <p>
                                    UrbanCraft REAL ESTATE listings reach 70% more buyers with preferred placement on
                                    the #1 brokerage website.
                                </p>
                            </div>
                            <div>
                                <h2>Save thousands on fees</h2>
                                <p>
                                    When you buy and sell with UrbanCraft REAL ESTATE, you’ll pay a 1% listing fee—
                                    that’s half of what other brokerages often charge.
                                </p>
                            </div>
                            <div>
                                <h2>On-demand home tours</h2>
                                <p>
                                    Schedule a tour with a UrbanCraft REAL ESTATE agent in a few clicks—even for the
                                    same day.
                                </p>
                            </div>
                        </div>

                        {/* Call to Action Section */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "2rem",
                                backgroundColor: "#f8f8f8",
                            }}
                        >
                            <ImageWithText
                                content="We refresh our listings every two minutes, so you’ll get notified when the perfect home hits the market. And with on-demand tours, we can help you see homes as quickly as possible."
                                imgSrc={img2}
                                altText="WhyZnet"
                                title="Find homes first. Tour homes fast."
                                imagePosition="right"

                            />
                        </div>

                        {/* App Section */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "2rem",
                            }}
                        >
                            <ImageWithText
                                content="Our agents have the experience to price, market, and sell your home for the best price possible. Plus, UrbanCraft REAL ESTATE listings get seen by 70% more buyers. And you get it all for half the listing fee other brokerages often charge."
                                imgSrc={img3}
                                altText="WhyZnet"
                                title="Sell for top dollar and save thousands on fees
"

                            />
                        </div>

                        {/* Contact Section */}
                        <div
                            style={{
                                padding: "2rem",
                                textAlign: "center",
                                backgroundColor: "#f8f8f8",
                            }}
                        >
                            <h2>Talk to an agent</h2>
                            <p>
                                Take the first step by chatting with an expert local agent—there’s no
                                pressure or obligation.
                            </p>
                            <input
                                type="text"
                                placeholder="City, Address, ZIP"
                                style={{
                                    padding: "0.8rem",
                                    width: "50%",
                                    margin: "1rem 0",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                }}
                            />
                            <button
                                style={{
                                    padding: "0.8rem 2rem",
                                    backgroundColor: "#ff385c",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default WhyZnet;
