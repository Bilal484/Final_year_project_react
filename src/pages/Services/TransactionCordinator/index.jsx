import React from "react";
import "./TransactionCordinator.css";
import LatestNews from "../../../components/LatestNews";
import FinancialResults from "../../../components/FinancialResults";
import Header from "../../../components/header";
import ImagewithText from "../../../components/ImagewithText";

import Footer from "../../../components/Footer";
import ZnetCorporation from "../../../components/ZnetCorporation";
import ComprehensiveRealEstateSolutions from "../../../components/ComprehensiveRealEstateSolutions";
import ContactForm from "../../../components/ContactForm";
import img3 from "../../../assets/images/blog 04.jpg";

import { Helmet } from "react-helmet";

const TransactionCordinator = () => {
  return (
    <>
      <Helmet>
        <title>
          Transaction Coordinator | Streamlined Real Estate Transactions
        </title>
        <meta
          name="description"
          content="Streamline your real estate transactions with Znet's Transaction Coordinator service. Prioritize the consumer experience with faster and affordable solutions."
        />
        <meta
          name="keywords"
          content="Transaction Coordinator, Real Estate Transactions, Streamlined Transactions, Znet Corporation, Real Estate Services"
        />
        <meta name="author" content="Znet Corporation" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Transaction Coordinator | Streamlined Real Estate Transactions"
        />
        <meta
          property="og:description"
          content="Znet's Transaction Coordinator service helps streamline real estate transactions for a better consumer experience."
        />
        <meta
          property="og:image"
          content="https://example.com/path-to-image.jpg"
        />
        <meta
          property="og:url"
          content="https://znet.com/transaction-coordinator"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <div className="investor-page">
        <div className="investor-main d-flex justify-content-center align-items-center">
          <div className="container">
            <p>Tansaction Cordinator</p>
            <h1 className="">
              Transactions to prioritize the consumer's experience
            </h1>
            
            <div className="btn">
              <button className=" btn-investor">View presentation</button>
            </div>
          </div>
        </div>
        <section id="about-realtors" className="py-5">
                    <div className="container">
                        <ImagewithText
                            title="Who Are Tansaction Cordinator"
                            content=" Transaction coordinators (TCs) in real estate manage the paperwork
              and communication needed to ensure a smooth closing process. They
              handle deadlines, contracts, and compliance, acting as a bridge
              between buyers, sellers, agents, lenders, and title companies.
              There are two main types of transaction coordinators: Traditional
              Real Estate TCs – These coordinators work on standard real estate
              deals, ensuring contracts, disclosures, inspections, and financing
              are completed on time. They typically assist agents handling
              conventional home sales, financed deals, and cash purchases.
              Creative Real Estate TCs – These specialize in unconventional
              transactions like Subject-To (Sub2) deals, lease options, seller
              financing, and wholesaling. They navigate unique legal and
              financial structures, ensuring that all agreements are correctly
              documented and compliant while coordinating with attorneys, escrow
              officers, and sellers. Both types of TCs play a crucial role in
              keeping transactions organized, reducing stress for investors and
              agents while ensuring deals close efficiently."
                            reverse={true}
                            imgSrc={img3}
                        />
                    </div>
                </section>
        <div className="second-section d-flex justify-content-between container flex-md-row flex-column my-5">
          <h1 className="h3 font-weight-bold mb-4">
            Streamlining transactions for a better consumer experience.
          </h1>
          <button className="btn-investor ">Get Started</button>
        </div>

        <LatestNews />
        <FinancialResults />
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-between align-items-center flex-md-row flex-column p-4 bg-light  rounded">
              <div className="flex-md-row flex-column d-flex">
                <h2 className="h5 fw-semibold">Latest annual filing</h2>
                <p className="text-muted">
                  For fiscal year ending December 31, 2023
                </p>
              </div>
              <button className="btn btn-investor  px-4 py-2">View 10-K</button>
            </div>
          </div>
        </div>
        <ZnetCorporation />
        <ComprehensiveRealEstateSolutions />
        <ContactForm />
      </div>
      <Footer />
    </>
  );
};

export default TransactionCordinator;
