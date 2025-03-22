import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import "./PaymentCalculator.css";
import { Helmet } from "react-helmet";

const PaymentCalculator = ({ price }) => {
  const initialHomePrice = price ? price : 195600; // Ensure price has a fallback value
  const [editField, setEditField] = useState(null);
  const [downPayment, setDownPayment] = useState(5868); // Assume an initial down payment
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(3);
  const [homePrice, setHomePrice] = useState(initialHomePrice); // Use fallback price if null/undefined
  const [loanDetails, setLoanDetails] = useState("15-yr fixed, 5.69%");

  const principalAndInterest = 2091;
  const hoaDues = 1052;
  const propertyTaxes = 841;
  const homeownersInsurance = 178;

  // Calculate total monthly payment
  const totalPayment =
    principalAndInterest + hoaDues + propertyTaxes + homeownersInsurance;

  // Handle save or cancel button clicks
  const saveEdit = () => {
    // Logic to save the edited field can go here, if required
    setEditField(null); // Close the modal after saving
  };

  const cancelEdit = () => {
    setEditField(null); // Close the modal without saving changes
  };

  // Calculate down payment based on percentage
  const handlePercentageChange = (e) => {
    const percentage = parseFloat(e.target.value);
    setDownPaymentPercentage(percentage);
    setDownPayment((percentage / 100) * homePrice);
  };

  const handleSliderChange = (e) => {
    const percentage = parseFloat(e.target.value);
    setDownPaymentPercentage(percentage);
    setDownPayment((percentage / 100) * homePrice);
  };

  return (
    <>
     <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Calculate your monthly mortgage payments with an interactive calculator including down payments, loan details, and other key components." />
        <meta name="keywords" content="payment calculator, mortgage, home price, loan details, down payment, principal and interest" />
        <meta property="og:title" content="Mortgage Payment Calculator" />
        <meta property="og:description" content="Use our interactive mortgage payment calculator to get a detailed breakdown of your monthly payments, including principal, interest, taxes, and insurance." />
        <meta property="og:image" content="https://via.placeholder.com/1200x630?text=Payment+Calculator" />
        <meta property="og:url" content="https://www.example.com/payment-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mortgage Payment Calculator" />
        <meta name="twitter:description" content="Calculate your monthly mortgage payments with an interactive calculator including down payments, loan details, and other key components." />
        <meta name="twitter:image" content="https://via.placeholder.com/1200x630?text=Payment+Calculator" />
        <title>Mortgage Payment Calculator</title>
      </Helmet>

    <div className="card mt-4">
      <div className="p-5 bg-light rounded-lg">
        <h2 className="fs-4 text-dark fw-bold mb-3">Payment calculator</h2>
        <p className="fs-3 text-dark fw-bold d-flex align-items-center">
          ${totalPayment.toFixed(2)} per month{" "}
          <span
            style={{
              fontSize: "10px",
              padding: "0px 6px",
              backgroundColor: "gray",
            }}
            className="ms-1 rounded-circle d-inline-block text-white"
          >
            i
          </span>{" "}
          <a href="#" className="text-dark fs-6 ms-3 me-4 text-decoration-none">
            Reset
          </a>
          <button className="mt-4 btn ms-auto getapprove">Get pre-approved</button>
        </p>

        <div className="progress mb-2" style={{ height: 11 }}>
          <div
            className="progress-bar bg-priciple"
            role="progressbar"
            style={{ width: `${(principalAndInterest / totalPayment) * 100}%` }}
          ></div>
          <div
            className="progress-bar bg-property"
            role="progressbar"
            style={{ width: `${(propertyTaxes / totalPayment) * 100}%` }}
          ></div>
          <div
            className="progress-bar bg-hoa"
            role="progressbar"
            style={{ width: `${(hoaDues / totalPayment) * 100}%` }}
          ></div>
          <div
            className="progress-bar bg-home"
            role="progressbar"
            style={{
              width: `${(homeownersInsurance / totalPayment) * 100}%`,
            }}
          ></div>
        </div>

        {/* Payment breakdown */}
        <div className="row payment_break">
          <div className="col-sm-6 px-1 py-3">
            <div className="d-flex align-items-center gap-3">
              <span className="circle bg-priciple"></span>
              <div className="d-flex justify-content-between w-100">
                <span className="text">Principal and interest</span>
                <span className="">${principalAndInterest}</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3 py-3">
              <span className="circle bg-hoa"></span>
              <div className="d-flex justify-content-between w-100">
                <span className="text">HOA dues</span>
                <span className="">${hoaDues}</span>
              </div>
            </div>
          </div>
          <div className="col-sm-6 px-1 py-3">
            <div className="d-flex align-items-center gap-3">
              <span className="circle bg-property"></span>
              <div className="d-flex justify-content-between w-100">
                <span className="text">Property taxes</span>
                <span className="">${propertyTaxes}</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3 py-3 ">
              <span className="circle bg-home"></span>
              <div className="d-flex justify-content-between w-100">
                <span className="text">Homeowners insurance</span>
                <span className="">${homeownersInsurance}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Down payment, Home price, Loan details */}
        <div className="mt-1 payment_cal_buttons row text-center row-cols-1 row-cols-md-3 g-4">
          <div className="col text-center">
            <button
              className="btn w-100"
              onClick={() => setEditField(editField === "downPayment" ? null : "downPayment")}
            >
              <h6 className="pt-3">Down payment</h6>
              <p className="">
                {downPaymentPercentage}% (${downPayment.toFixed(2)})
                <FontAwesomeIcon icon={faPencilAlt} className="ms-2" />
              </p>
            </button>
            {editField === "downPayment" && (
              <div className="downpayment-card shadow p-4">
                <div className="d-flex justify-content-between">
                  <h2 className="h5 fw-semibold mb-4">Down payment</h2>
                  {/* FontAwesome X icon with onClick to close the modal */}
                  <span className="svg-close" onClick={cancelEdit} style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                  </span>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <label className="w-100 mb-1">Cash</label>
                  <div className="input-group mb-2">
                    <input
                      className="form-control"
                      type="text"
                      value={`$${downPayment.toLocaleString()}`}
                      readOnly
                    />
                    <input
                      className="form-control"
                      type="text"
                      value={`${downPaymentPercentage}%`}
                      readOnly
                    />
                  </div>
                </div>

                {/* Slider for adjusting percentage */}
                <div className="d-flex align-items-center mb-4">
                  <input
                    className="form-range w-100"
                    type="range"
                    min="0"
                    max="100"
                    value={downPaymentPercentage}
                    onChange={handleSliderChange}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <label className="fw-semibold">Have a home to sell?</label>
                  <button className="btn btn-outline-secondary">Add my home equity</button>
                </div>

                {/* Breakdown */}
                <div className="breakdown-section mb-4">
                  <div className="d-flex justify-content-between">
                    <span>Cash</span>
                    <span>${downPayment.toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span>Home Equity</span>
                    <span>$0</span> {/* You can update this with dynamic equity data */}
                  </div>
                </div>

                <hr />

                <div className="d-flex justify-content-between">
                  <span>Total Down:</span>
                  <span className="fw-bold">${downPayment.toLocaleString()} ({downPaymentPercentage}%)</span>
                </div>

                {/* Save/Cancel buttons */}
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button className="btn btn-secondary" onClick={cancelEdit}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={saveEdit}>
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Home Price */}
          <div className="col text-center">
            <button
              className="btn w-100"
              onClick={() => setEditField(editField === "homePrice" ? null : "homePrice")}
            >
              <h6 className="pt-3">Home Price</h6>
              <p className="">
                ${homePrice.toLocaleString()}
                <FontAwesomeIcon icon={faPencilAlt} className="ms-2" />
              </p>
            </button>
            {editField === "homePrice" && (
              <div className="downpayment-card shadow p-4">
                <h2 className="h5 fw-semibold mb-4">Home Price</h2>
                <Form>
                  <Form.Group controlId="homePriceInput" className="mb-4">
                    <Form.Label>Home Price</Form.Label>
                    <Form.Control
                      type="number"
                      value={homePrice}
                      onChange={(e) => setHomePrice(parseFloat(e.target.value))}
                    />
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-secondary" onClick={cancelEdit}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={saveEdit}>
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Loan Details */}
          <div className="col text-center">
            <button
              className="btn w-100"
              onClick={() => setEditField(editField === "loanDetails" ? null : "loanDetails")}
            >
              <h6 className="pt-3">Loan Details</h6>
              <p className="">
                {loanDetails}
                <FontAwesomeIcon icon={faPencilAlt} className="ms-2" />
              </p>
            </button>
            {editField === "loanDetails" && (
              <div className="downpayment-card shadow p-4">
                <h2 className="h5 fw-semibold mb-4">Loan Details</h2>
                <Form>
                  <Form.Group controlId="loanDetailsInput" className="mb-4">
                    <Form.Label>Loan Details</Form.Label>
                    <Form.Control
                      type="text"
                      value={loanDetails}
                      onChange={(e) => setLoanDetails(e.target.value)}
                    />
                  </Form.Group>
                </Form>
                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-secondary" onClick={cancelEdit}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={saveEdit}>
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PaymentCalculator;
