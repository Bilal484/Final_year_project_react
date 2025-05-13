import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import img01 from "../../../assets/images/blog 06.jpg";
import ServicesCardImage from "../../../components/ServicesCardImage";
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
import ContactForm from "../../../components/ContactForm";
import ServiceCards from "../../../components/ServiceCards";

const Wholesaler = () => {
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
  const services = [
    {
      icon: "bi-house-fill",
      title: "Property Sourcing",
      description:
        "Identify and acquire discounted properties for investors efficiently.",
    },
    {
      icon: "bi-currency-dollar",
      title: "Deal Negotiation",
      description:
        "Negotiate profitable property deals for buyers and investors.",
    },
    {
      icon: "bi-bar-chart-line-fill",
      title: "Property Disposition",
      description:
        "Quickly sell off properties to investors for maximum returns.",
    },
  ];
  const services1 = [
    {
      icon: "bi bi-house-fill",
      title: "Contract Assignments",
      description:
        "Assign wholesale contracts to interested real estate buyers.",
    },
    {
      icon: "bi bi-currency-dollar",
      title: "Transaction Coordination",
      description:
        "Ensure smooth transactions between sellers, buyers, and investors.",
    },
    {
      icon: "bi bi-bar-chart-line-fill",
      title: "Market Analysis",
      description:
        "Analyze property markets to find lucrative investment opportunities.",
    },
  ];

  return (
    <>
    <Helmet>
        <title>Wholesaler | Real Estate Supply Chain Services</title>
        <meta
          name="description"
          content="Explore the role of wholesalers in the real estate supply chain. Learn about property sourcing, deal negotiation, and transaction coordination for maximum returns."
        />
        <meta
          name="keywords"
          content="Wholesaler, Real Estate Wholesaling, Property Sourcing, Deal Negotiation, Real Estate Services"
        />
        <meta name="author" content="UrbanCraft REAL ESTATE Corporation" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Wholesaler | Real Estate Supply Chain Services" />
        <meta
          property="og:description"
          content="Learn how real estate wholesalers streamline the supply chain by acquiring, negotiating, and disposing of properties for maximum investor returns."
        />
        <meta property="og:image" content="https://example.com/path-to-wholesaler-image.jpg" />
        <meta property="og:url" content="https://znet.com/wholesaler" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      <main className="Realtor_main_section">
        {/* Hero Section */}
        <section id="hero" className="bg-light text-center p-5">
          <div className="container">
            <h1 className="text-light ">
              Overview of the Wholesaler’s Role in the Supply Chain
            </h1>
            <p className="lead">
              Expert Real Estate Services for Buyers and Sellers
            </p>
            <a href="#featured" className="btn btn-primary">
              Explore Listings
            </a>
          </div>
        </section>
        {/* About Section */}
        <section id="about" className="py-5">
          <div className="container">
            <div className="row">
            <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
    <h2>What is a Wholesaler?</h2>
    <p>
      In the business ecosystem, a wholesaler plays a crucial role by acting as an intermediary between manufacturers and the retail market. Wholesalers purchase goods in large quantities from producers or manufacturers, leveraging economies of scale to secure better prices. They then distribute these goods to retailers, businesses, or institutions, but not directly to end consumers. This model enables manufacturers to concentrate on production without the complexities of individual retail distribution, while retailers benefit from access to a diverse inventory without the need for large capital outlays on stock.
    </p>
    <p>
      At UrbanCraft REAL ESTATE, we understand the importance of efficient supply chains. While UrbanCraft REAL ESTATE itself is not a wholesaler, we facilitate connections within the wholesale industry through our technological solutions, helping our clients manage and streamline their operations effectively. Our services ensure that wholesalers can maintain reliable supply chains and support their retail partners in meeting consumer demands.
    </p>
</div>

              <div className="col-md-6">
                <img
                  src={img01}
                  alt="Realtor"
                  height="300px"
                  width="600px"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Services Section */}
        <section id="services" className="bg-light py-5">
          <div className="container">
            <h2 className="text-center mb-5">Our Services</h2>
            <ServiceCards services={services} />
            {/* General Contractor Services Section */}
            <h1 className="text-center mt-5">General Developers Services:</h1>
            <ServiceCards services={services1} />
          </div>
        </section>
        {/* Featured Listings Section */}
        <section id="featured" className="py-5 px-md-5 px-3 blog">
          {/* home Sections */}
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
        </section>
        {/* Contact Section */}
        <section id="contact" className=" bg-light">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
};
export default Wholesaler;
