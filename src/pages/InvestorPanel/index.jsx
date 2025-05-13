import React from "react";
import { Helmet } from 'react-helmet'; // Import Helmet
import InvestorHeader from "../../components/InvestorHeader";
import "./InvestorPanel.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const InvestorPanel = () => {
  // Functions for handling button actions
  const removeInvestment = (event) => {
    // Get the card element and remove it
    event.target.closest(".card").remove();
  };

  const investInOpportunity = () => {
    alert("Investment opportunity responded to!");
  };

  return (
    <>
     <Helmet>
        <title>Investor Dashboard - Manage Your Investments</title>
        <meta name="description" content="Access and manage your investment portfolio, communicate with sellers and contractors, and maximize your returns with our comprehensive tools." />
        <meta name="keywords" content="investor, investment dashboard, real estate, financial investments, portfolio management" />
      </Helmet>
      <Header />
      <InvestorHeader />
      <div className="container my-4">
        <div className="row">
          {/* Manage Investment Listings */}
          <div className="">
            <h3>Manage Investment Listings</h3>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Investment 1: Tech Startup</h5>
                <p className="card-text">Amount: $10,000</p>
                <p className="card-text">Date: 01/01/2023</p>
                <button className="btn btn-danger" onClick={removeInvestment}>
                  Remove Investment
                </button>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Investment 2: Real Estate</h5>
                <p className="card-text">Amount: $25,000</p>
                <p className="card-text">Date: 05/15/2023</p>
                <button className="btn btn-danger" onClick={removeInvestment}>
                  Remove Investment
                </button>
              </div>
            </div>
          </div>

          {/* Track ROI */}
        </div>
      </div>

      {/* Manage Investment Listings Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Manage Investment Listings</h2>
        {/* Table for Managing Investments */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Investment</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr>
                <td>1</td>
                <td>Investment 1</td>
                <td>Description of Investment 1</td>
                <td>
                  <img
                    src="investment1.jpg"
                    alt="Investment 1"
                    className="img-thumbnail"
                    style={{ width: 100 }}
                  />
                </td>
                <td>
                  <button className="btn btn-info btn-sm">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr>
                <td>2</td>
                <td>Investment 2</td>
                <td>Description of Investment 2</td>
                <td>
                  <img
                    src="investment2.jpg"
                    alt="Investment 2"
                    className="img-thumbnail"
                    style={{ width: 100 }}
                  />
                </td>
                <td>
                  <button className="btn btn-info btn-sm">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr>
                <td>3</td>
                <td>Investment 3</td>
                <td>Description of Investment 3</td>
                <td>
                  <img
                    src="investment3.jpg"
                    alt="Investment 3"
                    className="img-thumbnail"
                    style={{ width: 100 }}
                  />
                </td>
                <td>
                  <button className="btn btn-info btn-sm">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
              {/* Row 4 */}
              <tr>
                <td>4</td>
                <td>Investment 4</td>
                <td>Description of Investment 4</td>
                <td>
                  <img
                    src="investment4.jpg"
                    alt="Investment 4"
                    className="img-thumbnail"
                    style={{ width: 100 }}
                  />
                </td>
                <td>
                  <button className="btn btn-info btn-sm">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
              {/* Row 5 */}
              <tr>
                <td>5</td>
                <td>Investment 5</td>
                <td>Description of Investment 5</td>
                <td>
                  <img
                    src="investment5.jpg"
                    alt="Investment 5"
                    className="img-thumbnail"
                    style={{ width: 100 }}
                  />
                </td>
                <td>
                  <button className="btn btn-info btn-sm">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
              {/* Row 6 */}
              <tr>
                <td>6</td>
                <td>Investment 6</td>
                <td>Description of Investment 6</td>
                <td>
                  <img
                    src="investment6.jpg"
                    alt="Investment 6"
                    className="img-thumbnail"
                    style={{ width: 100 }}
                  />
                </td>
                <td>
                  <button className="btn btn-info btn-sm">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Communication Tools Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">
          Communicate with Sellers and Contractors
        </h2>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card">
              <div className="card-header">Message Board</div>
              <div className="card-body">
                <div className="message-list">
                  <p>
                    <strong>Seller:</strong> Project update on investment 1.
                  </p>
                  <p>
                    <strong>Contractor:</strong> We will finish by next week.
                  </p>
                  <p>
                    <strong>Seller:</strong> Update on budget for Investment 3.
                  </p>
                  <p>
                    <strong>Contractor:</strong> Materials will arrive by the
                    end of the month.
                  </p>
                </div>
                <div className="input-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message"
                  />
                  <button className="btn btn-primary">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default InvestorPanel;
