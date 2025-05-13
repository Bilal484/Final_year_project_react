import React from "react";
import "./Contractors.css";
import Img01 from "../../../assets/images/blog 05.jpg";
import Img02 from "../../../assets/images/bolg cara 10.jpg";
import blog06 from "../../../assets/images/blog 06.jpg";
import blog07 from "../../../assets/images/blog 07.jpg";
import blog08 from "../../../assets/images/blog 08.jpg";
import blog09 from "../../../assets/images/blog 09.jpg";
import blog10 from "../../../assets/images/blog 10.jpg";
import blog11 from "../../../assets/images/blog 11.jpg";
import blog12 from "../../../assets/images/blog 12.jpg";
import blog13 from "../../../assets/images/blog 13.jpg";
import blog14 from "../../../assets/images/blog 14.jpg";
import blog15 from "../../../assets/images/blog 15.jpg";
import blog16 from "../../../assets/images/blog 16.jpg";
import blog17 from "../../../assets/images/blog 17.jpg";
import blog18 from "../../../assets/images/blog 18.jpg";
import blog19 from "../../../assets/images/blog 19.jpg";
import blog20 from "../../../assets/images/blog 20.jpg";
import blog21 from "../../../assets/images/blog 21.jpg";
import blog22 from "../../../assets/images/blog 22.jpg";
import blog23 from "../../../assets/images/blog 23.jpg";
import blog24 from "../../../assets/images/blog 24.jpg";
import blog25 from "../../../assets/images/blog 25.jpg";
import blog26 from "../../../assets/images/blog 26.jpg";
import blog27 from "../../../assets/images/blog 27.jpg";
import blog28 from "../../../assets/images/blog 28.jpg";
import blog29 from "../../../assets/images/blog 29.jpg";
import blog30 from "../../../assets/images/blog 30.jpg";
import blog31 from "../../../assets/images/blog 31.jpg";
import blog32 from "../../../assets/images/blog 32.jpg";
import blog33 from "../../../assets/images/blog 33.jpg";

import ImageWithText from "../../../components/ImagewithText";
import CoreValueCard from "../../../components/CoreValueCard";
import Header from "../../../components/Header";
import ContactForm from "../../../components/ContactForm";
import ServicesCardImage from "../../../components/ServicesCardImage";
import Footer from "../../../components/Footer";
import { Helmet } from "react-helmet"; // Import Helmet for meta tags

const Contractors = () => {
  const cardsData = [
    {
      id: 1,
      image: blog06,
      text: "Can You Negotiate Real Estate Commissions? Yes, and Here's How",
    },

    {
      id: 1,
      image: blog07,
      text: "Should I Buy a House Now or Wait? Key Questions to Consider",
    },

    {
      id: 1,
      image: blog08,
      text: "Do You Have to Pay A Real Estate Agent if You Decide Not to Buy or Sell A House?",
    },

    {
      id: 1,
      image: blog09,
      text: "Should I Buy a House Now or Wait? Key Questions to Consider",
    },
  ];
  const cardsData01 = [
    {
      id: 1,
      image: blog10, // Updated image path
      alt: "House Image 1",
      text: "Can You Negotiate Real Estate Commissions? Yes, and Here's How",
    },
    {
      id: 2,
      image: blog11, // Updated image path
      alt: "House Image 2",
      text: "What is a Buyer Agency Agreement, and Is It Required?",
    },
    {
      id: 3,
      image: blog12, // Updated image path
      alt: "House Image 3",
      text: "Do You Have to Pay A Real Estate Agent if You Decide Not to Buy or Sell A House?",
    },
    {
      id: 4,
      image: blog13, // Updated image path
      alt: "House Image 4",
      text: "Should I Buy a House Now or Wait? Key Questions to Consider",
    },
  ];
  const cardsData02 = [
    {
      id: 1,
      image: blog13, // Updated image path
      alt: "House Image 1",
      text: "Can You Negotiate Real Estate Commissions? Yes, and Here's How",
    },
    {
      id: 2,
      image: blog14, // Updated image path
      alt: "House Image 2",
      text: "What is a Buyer Agency Agreement, and Is It Required?",
    },
    {
      id: 3,
      image: blog15, // Updated image path
      alt: "House Image 3",
      text: "Do You Have to Pay A Real Estate Agent if You Decide Not to Buy or Sell A House?",
    },
    {
      id: 4,
      image: blog16, // Updated image path
      alt: "House Image 4",
      text: "Should I Buy a House Now or Wait? Key Questions to Consider",
    },
  ];
  const cardsData03 = [
    {
      id: 1,
      image: blog18, // Updated image path
      alt: "House Image 1",
      text: "Can You Negotiate Real Estate Commissions? Yes, and Here's How",
    },
    {
      id: 2,
      image: blog19, // Updated image path
      alt: "House Image 2",
      text: "What is a Buyer Agency Agreement, and Is It Required?",
    },
    {
      id: 3,
      image: blog20, // Updated image path
      alt: "House Image 3",
      text: "Do You Have to Pay A Real Estate Agent if You Decide Not to Buy or Sell A House?",
    },
    {
      id: 4,
      image: blog21, // Updated image path
      alt: "House Image 4",
      text: "Should I Buy a House Now or Wait? Key Questions to Consider",
    },
  ];
  const cardsData04 = [
    {
      id: 1,
      image: blog22, // Updated image path
      alt: "House Image 1",
      text: "Can You Negotiate Real Estate Commissions? Yes, and Here's How",
    },
    {
      id: 2,
      image: blog23, // Updated image path
      alt: "House Image 2",
      text: "What is a Buyer Agency Agreement, and Is It Required?",
    },
    {
      id: 3,
      image: blog24, // Updated image path
      alt: "House Image 3",
      text: "Do You Have to Pay A Real Estate Agent if You Decide Not to Buy or Sell A House?",
    },
    {
      id: 4,
      image: blog25, // Updated image path
      alt: "House Image 4",
      text: "Should I Buy a House Now or Wait? Key Questions to Consider",
    },
  ];

  const cardsData05 = [
    {
      id: 1,
      image: blog26, // Updated image path
      alt: "House Image 1",
      text: "Can You Negotiate Real Estate Commissions? Yes, and Here's How",
    },
    {
      id: 2,
      image: blog27, // Updated image path
      alt: "House Image 2",
      text: "What is a Buyer Agency Agreement, and Is It Required?",
    },
    {
      id: 3,
      image: blog28, // Updated image path
      alt: "House Image 3",
      text: "Do You Have to Pay A Real Estate Agent if You Decide Not to Buy or Sell A House?",
    },
    {
      id: 4,
      image: blog29, // Updated image path
      alt: "House Image 4",
      text: "Should I Buy a House Now or Wait? Key Questions to Consider",
    },
  ];
  const cardsData06 = [
    {
      id: 1,
      image: blog30, // Updated image path
      alt: "House Image 1",
      text: "Can You Negotiate Real Estate Commissions? Yes, and Here's How",
    },
    {
      id: 2,
      image: blog31, // Updated image path
      alt: "House Image 2",
      text: "What is a Buyer Agency Agreement, and Is It Required?",
    },
    {
      id: 3,
      image: blog32, // Updated image path
      alt: "House Image 3",
      text: "Do You Have to Pay A Real Estate Agent if You Decide Not to Buy or Sell A House?",
    },
    {
      id: 4,
      image: blog33, // Updated image path
      alt: "House Image 4",
      text: "Should I Buy a House Now or Wait? Key Questions to Consider",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contractors - Professional Real Estate Services</title>
        <meta
          name="description"
          content="Explore services offered by our contractors including residential construction, remodeling, and electrical work. Discover insights and tips from industry experts."
        />
        <meta
          name="keywords"
          content="Contractors, Residential Construction, Remodeling, Electrical Work, Real Estate, Home Improvement, Real Estate Blog, Finance, Local Insights"
        />
        <meta name="author" content="UrbanCraft REAL ESTATE" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Contractors - Professional Real Estate Services"
        />
        <meta
          property="og:description"
          content="Explore professional services offered by contractors including residential and commercial construction, remodeling, and electrical work."
        />
        <meta property="og:image" content={Img01} />
        <meta property="og:url" content="https://apitourism.today.alayaarts.com/contractors" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <section id="contracter" className="bg-light text-center p-5">
        <div className="container">
          <h1 className="text-light ">About Our Contractors</h1>
          <p className="lead">
            Our contractors are highly skilled professionals with years of
            experience in their respective fields.
          </p>
          <a href="#featured" className="btn ">
            Explore Dealings
          </a>
        </div>
      </section>

      <div className="container">
        <ImageWithText
          title="What are contractors?"
          content={
            "Contractors in real estate are professionals or companies responsible for building, renovating, or maintaining properties. They manage construction projects, coordinate labor and materials, and ensure that work meets safety codes and regulations. There are different types of contractors, including general contractors, who oversee entire projects, and specialized contractors, such as electricians, plumbers, and roofers, who focus on specific tasks. Whether for new developments, home renovations, or commercial construction, contractors play a vital role in turning real estate plans into reality."
          }
          imgSrc={Img01}
          altText="About Us Image"
          imagePosition="left"
        />

        <ImageWithText
          title="Our Journey Starts"
          content={
            <>
              <p>
                Our journey started from a small business in the city, and then
                our team worked hard together, often late into the night.
              </p>
              <ul>
                <li>Collaboration and Partnership</li>
                <li>Commitment to Excellence</li>
                <li>Clear Communication</li>
                <li>Trust and Reliability</li>
                <li>Satisfaction and Long-term Success</li>
                <li>Continuous Improvement</li>
                <li>Quality Assurance</li>
                <li>On-time and On-budget Delivery</li>
                <li>Attention to Safety</li>
                <li>Accountability and Ownership</li>
              </ul>
            </>
          }
          imgSrc={Img02} // Make sure to import JourneyImage at the top
          altText="Our Journey Image"
          imagePosition="right"
        />
        <div className="row">
          <CoreValueCard
            title="Painting and Drywall"
            text={["We help you find the perfect property at the right price."]}
            colClass="col-md-4"
            iconClass="bi bi-house-fill fs-1"
          />
          <CoreValueCard
            title="Electrical Work"
            text={[
              "Electrical work involves a variety of tasks related to the installation, maintenance.",
            ]}
            colClass="col-md-4"
            iconClass="bi bi-currency-dollar fs-1"
          />
          <CoreValueCard
            title="Remodeling and Renovation"
            text={[
              "Get an accurate property valuation based on current market trends.",
            ]}
            colClass="col-md-4"
            iconClass="bi bi-bar-chart-line-fill fs-1"
          />
        </div>

        <h1 className="text-center mt-5">General Contractor Services:</h1>
        <div className="row mt-5">
          <CoreValueCard
            title="Residential Construction"
            text={["New home builds, renovations, and extensions anywhere."]}
            colClass="col-md-4"
            iconClass="bi bi-house-fill fs-1"
          />
          <CoreValueCard
            title="Commercial Construction"
            text={[
              "Office buildings, retail spaces, and industrial facilities.",
            ]}
            colClass="col-md-4"
            iconClass="bi bi-currency-dollar fs-1"
          />
          <CoreValueCard
            title="Project Management"
            text={[
              "Overseeing all aspects of construction from planning to completion.",
            ]}
            colClass="col-md-4"
            iconClass="bi bi-bar-chart-line-fill fs-1"
          />
        </div>

        <div class="section-header d-flex align-items-center">
          <span className="fw-bold fs-5">Painting and Drywall</span>
          <div className="divider" />
          <a href="#">
            <button className="btn">see more</button>
          </a>
        </div>
        <ServicesCardImage cards={cardsData} />

        <div className="section-header">
          <span className="fw-bold fs-5"> Electrical Work </span>
          <div className="divider" />

          <a href="#">
            <button className="btn">see more</button>
          </a>
        </div>
        <ServicesCardImage cards={cardsData01} />

        <div className="section-header">
          <span className="fw-bold fs-5"> Remodeling and Renovation</span>
          <div className="divider" />

          <a href="#">
            <button className="btn">see more</button>
          </a>
        </div>
        <ServicesCardImage cards={cardsData02} />

        <div className="section-header">
          <span className="fw-bold fs-5"> Home​ Improvement​</span>
          <div className="divider" />

          <a href="#">
            <button className="btn">see more</button>
          </a>
        </div>
        <ServicesCardImage cards={cardsData03} />

        <div className="section-header">
          <span className="fw-bold fs-5">Life & Style​</span>
          <div className="divider" />

          <a href="#">
            <button className="btn">see more</button>
          </a>
        </div>
        <ServicesCardImage cards={cardsData04} />
        <div className="section-header">
          <span className="fw-bold fs-5">Finance​</span>
          <div className="divider" />

          <a href="#">
            <button className="btn">see more</button>
          </a>
        </div>
        <ServicesCardImage cards={cardsData05} />
        <div className="section-header">
          <span className="fw-bold fs-5">Local Insights​</span>
          <div className="divider" />

          <a href="#">
            <button className="btn">see more</button>
          </a>
        </div>
        <ServicesCardImage cards={cardsData06} />
      </div>

      <ContactForm />
      <Footer />
    </>
  );
};
export default Contractors;
