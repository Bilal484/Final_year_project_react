import React from "react";
import "./Developers.css";
import ImagewithText from "../../../components/ImagewithText";
import Developerimg from "../../../assets/images/Developer.jpg";
import img1 from "../../../assets/images/bolg cara 10.jpg";
import "../../../assets/css/Developers.css";
import ServiceCards from "../../../components/ServiceCards";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ServicesCardImage from "../../../components/ServicesCardImage";
import img2 from "../../../assets/images/blog 06.jpg";
import img3 from "../../../assets/images/blog 07.jpg";
import img4 from "../../../assets/images/blog 08.jpg";
import img5 from "../../../assets/images/blog 09.jpg";
import ContactForm from "../../../components/ContactForm";
import { Helmet } from "react-helmet";

const Developers = () => {
  const services = [
    {
      icon: "bi-house-fill",
      title: "Residential Real Estate Development",
      description:
        "We develop high-quality residential properties, including single-family homes, condominiums, and multi-unit apartments.",
    },
    {
      icon: "bi-building",
      title: "Commercial Real Estate Development",
      description:
        "Our portfolio includes the development of office buildings, retail centers, and industrial properties.",
    },
    {
      icon: "bi-cash-coin",
      title: "Real Estate Investment Services",
      description:
        "We offer investment opportunities in the real estate market, ensuring profitable returns for our investors.",
    },
  ];

  const cardsData = [
    {
      id: 1,
      image: img2,
      text: "Exploring the Benefits of Investing in Residential Real Estate",
    },
    {
      id: 2,
      image: img3,
      text: "Understanding Commercial Real Estate Market Trends",
    },
    {
      id: 3,
      image: img4,
      text: "How to Maximize Returns on Real Estate Investments",
    },
    {
      id: 4,
      image: img5,
      text: "Strategies for Successful Commercial Property Development",
    },
  ];

  return (
    <>
      <Helmet>
        <title>UrbanCraft REAL ESTATE - Leading Real Estate Development</title>
        <meta
          name="description"
          content="UrbanCraft REAL ESTATE specializes in residential and commercial real estate development, offering expert investment services to maximize your returns."
        />
        <meta
          name="keywords"
          content="UrbanCraft REAL ESTATE, Real Estate Development, Investment Services, Residential Properties, Commercial Properties"
        />
        <meta name="author" content="UrbanCraft REAL ESTATE" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="UrbanCraft REAL ESTATE - Leading Real Estate Development"
        />
        <meta
          property="og:description"
          content="Explore UrbanCraft REAL ESTATE’s expert real estate development services for both residential and commercial projects."
        />
        <meta property="og:image" content={Developerimg} />
        <meta property="og:url" content="https://urbancraft real estate.com" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <main className="Realtor_main_section">
        <section id="developer" className="bg-light text-center p-5">
          <div className="container">
            <h1 className="text-white display-4 fw-bold mb-4">
              Leading Real Estate Development and Investment Services
            </h1>
          

            <div className="row text-center">
              <div className="col-md-4">
                <i className="bi bi-house-fill fa-3x text-primary mb-3"></i>
                <h3 className="h5 fw-bold">Residential Development</h3>
                <p>
                  Creating communities with sustainable and innovative
                  residential solutions.
                </p>
              </div>
              <div className="col-md-4">
                <i className="bi bi-building fa-3x text-success mb-3"></i>
                <h3 className="h5 fw-bold">Commercial Projects</h3>
                <p>
                  Developing commercial spaces that stand out in the market and
                  attract premier tenants.
                </p>
              </div>
              <div className="col-md-4">
                <i className="bi bi-cash-coin fa-3x text-danger mb-3"></i>
                <h3 className="h5 fw-bold">Investment Opportunities</h3>
                <p>
                  Offering strategic investment solutions that generate superior
                  returns.
                </p>
              </div>
            </div>
            <a href="#featured" className="btn btn-primary mt-4">
              Explore Our Projects
            </a>
          </div>
        </section>
        <section id="about" className="py-5">
          <div className="container">
            <div className="row">
              <ImagewithText
                title="What Are Developers?"
                content=" Developers in real estate are professionals or companies that
              transform land into valuable properties by planning, designing,
              and constructing residential, commercial, or mixed-use projects.
              They handle everything from acquiring land and securing permits to
              overseeing construction and selling or leasing the finished
              properties. Developers play a key role in shaping communities by
              creating homes, offices, shopping centers, and other essential
              spaces, balancing market demand with innovative and
              sustainable designs."
                imgSrc={Developerimg}
              />
            </div>
          </div>
        </section>
        <section id="services" className="bg-light py-5">
          <div className="container">
            <h2 className="text-center mb-5">Our Services</h2>
            <ServiceCards services={services} />
          </div>
        </section>
        <section id="featured" className="py-5 blog">
          <div className="container mt-5">
            <ServicesCardImage cards={cardsData} />
          </div>
        </section>
        <section id="contact" className="bg-light">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Developers;
