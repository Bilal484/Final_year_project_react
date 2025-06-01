import React from "react";
import { Helmet } from "react-helmet";
// import SellerHeader from "../../components/InvestorHeader";
import Header from "../../components/header";
import Footer from "../../components/Footer";

const TrackRIO = () => {
  return (
    <>
     <Helmet>
        <title>Track ROI | Monitor Your Investment Performance</title>
        <meta
          name="description"
          content="Track your return on investment (ROI) across multiple sectors including tech startups, real estate, and energy funds. Gain insights to optimize your financial growth."
        />
        <meta
          name="keywords"
          content="Track ROI, Return on Investment, Investment Performance, Financial Growth, Investment Monitoring"
        />
        <meta name="author" content="UrbanCraft REAL ESTATE" />
        <meta property="og:title" content="Track ROI | Monitor Your Investment Performance" />
        <meta
          property="og:description"
          content="Monitor the ROI of your investments and make data-driven decisions. Analyze performance across tech startups, real estate, and energy funds."
        />
        <meta
          property="og:image"
          content="https://apitourism.today.alayaarts.com/uploads/investment-roi-dashboard.jpg"
        />
        <meta property="og:url" content="https://apitourism.today.alayaarts.com/track-roi" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      {/* <InvestorHeader /> */}
      {/* Track ROI Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Track Return on Investment (ROI)</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="investmentSelect" className="form-label">
                Select Investment
              </label>
              <select className="form-select" id="investmentSelect">
                <option>Investment 1</option>
                <option>Investment 2</option>
                <option>Investment 3</option>
                <option>Investment 4</option>
                <option>Investment 5</option>
                <option>Investment 6</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="roiValue" className="form-label">
                ROI (%)
              </label>
              <input
                type="text"
                className="form-control"
                id="roiValue"
                placeholder="20%"
              />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <button className="btn btn-success">Calculate ROI</button>
          </div>
        </div>
        <div className="">
          <h3>Track ROI</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Investment</th>
                <th>Amount</th>
                <th>ROI (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tech Startup</td>
                <td>Rs 10,000</td>
                <td>
                  <span className="roi-positive">+12%</span>
                </td>
              </tr>
              <tr>
                <td>Real Estate</td>
                <td>Rs 25,000</td>
                <td>
                  <span className="roi-negative">-4%</span>
                </td>
              </tr>
              <tr>
                <td>Energy Fund</td>
                <td>Rs 15,000</td>
                <td>
                  <span className="roi-positive">+8%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default TrackRIO;
