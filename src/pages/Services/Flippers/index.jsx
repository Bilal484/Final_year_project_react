import React from 'react'
import './Flippers.css'
import CoreValueCard from "../../../components/CoreValueCard"
import ContactCard from "../../../components/ContactCard"
import ImagewithText from '../../../components/ImagewithText'
import Img01 from '../../../assets/images/sub2Deal 07.jpg'
import Testimonial from '../../../components/Testimonial'
import HousingSubscriptionForm from '../../../components/HousingSubscriptionForm'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import { Helmet } from 'react-helmet';


const Flippers = () => {
    return (
        <>
         <Helmet>
                <title>Flipping Real Estate Guide - Learn Property Flipping</title>
                <meta
                    name="description"
                    content="Discover the ultimate guide to flipping real estate. Learn how to find the right property, renovate smartly, and sell for profit."
                />
                <meta
                    name="keywords"
                    content="Flipping, Real Estate, Property Flipping, Renovations, Selling Properties, Real Estate Investment, Profit Margins, Budgeting Tips"
                />
                <meta name="author" content="UrbanCraft REAL ESTATE Corporation" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Flipping Real Estate Guide - Learn Property Flipping" />
                <meta
                    property="og:description"
                    content="Flipping real estate is the process of buying, renovating, and selling properties for profit. Learn the essential tips for success in the real estate market."
                />
                <meta property="og:image" content={Img01} />
                <meta property="og:url" content="https://znet.com/flippers" />
                <meta property="og:type" content="website" />
            </Helmet>
            <Header />
            <section id="flipper" className="bg-light text-center p-5">
                <div className="container">
                    <h1 className="text-center">Flipping Real Estate Guide</h1>
                </div>
            </section>

            <div className="container">
                <div className="row">
                    <ImagewithText
                        title="What is Flipping?"
                        content="Flipping in real estate is when an investor buys a property, renovates or improves it, and then sells it quickly for a profit. There are two main types: fix-and-flip, where investors buy homes that need repairs, upgrade them, and sell at a higher price, and wholesale flipping, where investors secure a property at a low price and sell it to another buyer without making repairs. Successful flipping requires market knowledge, budgeting skills, and a good network of contractors to maximize profits while minimizing costs."
                        imgSrc={Img01}
                        altText="Realtor"
                    />
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <CoreValueCard
                        title="1. Research the Right Property"
                        text="Choose a property with high flipping potential by analyzing the neighborhood and market trends."
                    />
                    <CoreValueCard
                        title="2. Renovation and Improvement"
                        text="Invest wisely in renovations that increase property value while keeping the budget in check."
                    />
                    <CoreValueCard
                        title="3. Selling for Profit"
                        text="Use smart marketing and sales strategies to maximize your return on investment."
                    />

                </div>
                <Testimonial />

                <h2 className="section-title text-center mb-5">Investment and Budgeting Tips</h2>
                <div className="row">
                    <CoreValueCard
                        title="1. Calculate Profit Margins"
                        text="Before purchasing a property, use tools to calculate the potential profit after renovations."
                        colClass="col-md-4"
                    />
                    <CoreValueCard
                        title="2. Budget for Renovations"
                        text="Plan and budget your renovation carefully to avoid overspending and cutting into your profits."
                        colClass="col-md-4"
                    />
                    <CoreValueCard
                        title="3. Mitigate Risks"
                        text="Be aware of potential risks like market downturns or unexpected costs, and have a backup plan."
                        colClass="col-md-4"
                    />
                </div>
                <HousingSubscriptionForm />


                <div className="p-4 bg-light rounded shadow-sm">
                    <h2 className="section-title text-center mb-5">Contacts</h2>
                    <div className="row g-4">
                        <ContactCard
                            title="Company"
                            content={["UrbanCraft REAL ESTATE Corporation", "1099 Stewart Street", "Suite 600", "Seattle, WA 98101"]}
                        />
                        <ContactCard
                            title="Investor relations"
                            content={["Meg Nunnally", "Head of Investor Relations"]}
                            linkText="ir@Znet.com"
                        />
                        <ContactCard
                            title="Press"
                            content={["Mariam Sughayer", "Head of Communications"]}
                            linkText="press@Znet.com"
                        />
                    </div>
                </div>


            </div>

            <Footer />


        </>
    )
}

export default Flippers;
