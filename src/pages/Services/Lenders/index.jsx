import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";
import "../../../assets/css/Lenders.css";
import img01 from "../../../assets/images/sub2Deal 07.jpg";
import ContactCard from "../../../components/ContactCard";
import CoreValueCard from "../../../components/CoreValueCard";
import HousingSubscriptionForm from "../../../components/HousingSubscriptionForm";
import Testimonial from "../../../components/Testimonial";
import ImageWithText from "../../../components/ImagewithText";
import ContactSection from "../../../components/ContactSection";

const Lenders = () => {
  return (
    <>
      <Helmet>
        <title>Lenders | Supporting Real Estate Investments</title>
        <meta
          name="description"
          content="Learn about the role of lenders in real estate, supporting investors with funding for property acquisitions and renovations, and maximizing returns."
        />
        <meta
          name="keywords"
          content="Lenders, Real Estate Lending, Property Investment, Financing Properties, Renovations, Real Estate Strategies"
        />
        <meta name="author" content="UrbanCraft REAL ESTATE Corporation" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Lenders | Supporting Real Estate Investments"
        />
        <meta
          property="og:description"
          content="Discover how lenders play a crucial role in the real estate market by providing funding for property acquisitions and renovations."
        />
        <meta property="og:image" content={img01} />
        <meta property="og:url" content="https://znet.com/lenders" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <main className="flipper">
        {/* Header */}
        
        <section id="lenders" className="bg-light text-center p-5">
          <div className="container">
            <h1 className="text-center">
              Lenders are Helpful in Dificult Time.
            </h1>
            <p>
              Here's a paragraph about lenders: Lenders play a crucial role in
              the financial ecosystem by providing funds to individuals,
              businesse.
            </p>
          </div>
        </section>
        {/* Hero Section */}
        <section className="hero text-center py-5">
          <div className="container">
            <div className="row">
              <ImageWithText
                title="What are Lenders?"
                content=" Lenders in real estate provide the financing needed for buyers and investors to purchase properties. They assess borrowers’ financial situations and offer loans with specific terms, interest rates, and repayment schedules. There are two main types of lenders:

Traditional Lenders – These include banks, credit unions, and mortgage companies that offer conventional loans, FHA loans, VA loans, and other government-backed financing. They have strict credit and income requirements and typically offer lower interest rates and longer repayment terms.

Private Lenders – These are individuals or private institutions that offer short-term loans, often used for investment properties, fix-and-flip projects, or creative financing strategies. They have more flexible approval processes but may charge higher interest rates and fees in exchange for faster funding and fewer restrictions.

Both types of lenders serve different needs, with traditional lenders being ideal for long-term homeownership and private lenders catering to investors looking for quick, flexible financing."
                imgSrc={img01}
                altText="Realtor"
              />
            </div>
          </div>
        </section>
        {/* Flipping Steps Section */}
        <div className="container">
          <div className="row">
            <h2 className="section-title text-center mb-5">
              Basics Steps of Lending
            </h2>
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
          {/* Flipping Strategies Section */}

          <Testimonial />
        </div>
        <div className="container">
          <h2 className="section-title text-center mb-5">
            Lending Strategies for Lenders
          </h2>
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
        </div>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
};
export default Lenders;
