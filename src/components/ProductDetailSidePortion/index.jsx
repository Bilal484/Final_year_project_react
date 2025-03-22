import React from "react";
import { Link } from "react-router-dom";
import "./productDetailSidePortion.css";
import { Helmet } from "react-helmet";

const ProductDetailSidePortion = ({ p_id }) => {
  // Generate dates dynamically
  const getUpcomingDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 3; i++) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + i); // Add i days to the current date
      dates.push(newDate);
    }
    return dates;
  };

  const dates = getUpcomingDates();

  return (
    <>
     <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="real estate, property details, buy property, house tours, listing" />
      </Helmet>
      <div className="col-lg-4 sec_scroll_section">
        <div className="card p-4 mb-4">
          <h5 className="fs-4">Thinking of buying?</h5>
          <div className="my-3 date_button">
            {dates.map((date, index) => (
              <button key={index} className="btn mx-1 fs-15">
                {date.toLocaleString("en-US", { weekday: "short" })} {/* Day of the week */}
                <br />
                <span className="fs-3 fw-bold">{date.getDate()}</span> {/* Day of the month */}
                <br />
                {date.toLocaleString("en-US", { month: "short" })} {/* Month */}
              </button>
            ))}
          </div>
          <div className="btn-group tour_btn my-3 w-100">
            <button className="btn">
              <i className="fa fa-home fs-6"></i> <span>Tour in person</span>
            </button>
            <button className="btn">
              <i className="fa fa-mobile fs-6 me-1"></i>Tour via video chat
            </button>
          </div>
          <Link to="/RequestShowing" state={{ p_id }}> {/* Pass p_id through state */}
            <button className="btn req_btn w-100">Request showing</button>
          </Link>
          <p className="mt-1 fs-13 mb-1">It's free, cancel anytime</p>
          <hr />
          <button className="btn offer_btn w-100">Start an offer</button>
          <hr className="my-2" />
          <p className="text-center">
            Ask a question: <strong>(410) 695-3196</strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductDetailSidePortion;
