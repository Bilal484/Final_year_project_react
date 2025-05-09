// import img1 from "../../assets/images/PNG Logo Files/Transparent Logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import "./RequestShowing.css";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";

const RequestShowing = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // State to hold the selected date
  const [isNotSure, setIsNotSure] = useState(false); // State to hold the checkbox value
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const location = useLocation();
  const { p_id } = location.state || {}; // Access p_id from state
  useEffect(() => {
    // Get today's date and the next 4 days
    const today = dayjs();
    const nextFiveDays = [];
    for (let i = 0; i < 5; i++) {
      nextFiveDays.push(today.add(i, "day"));
    }
    setDates(nextFiveDays);
  }, []);

  const selectDate = (date) => {
    setSelectedDate(date); // Update selected date
  };

  const handleCheckboxChange = () => {
    setIsNotSure(!isNotSure); // Toggle checkbox state
  };

  const handleNextClick = () => {
    // Send checkbox state as 1 or 0
    const checkboxValue = isNotSure ? 1 : 0;

    // Navigate to the next page with the selected date and checkbox value
    navigate("/AboutYourSelf", {
      state: { date: selectedDate, notSure: checkboxValue, p_id: p_id },
    });
  };

  return (
    <>
    <Helmet>
        <title>Request Showing</title>
        <meta
          name="description"
          content="Schedule a tour with a partner agent or let us know if you're unsure about your schedule. Plan your next visit with ease."
        />
        <meta
          name="keywords"
          content="tour scheduling, partner agent, real estate tours, schedule flexibility"
        />
        <meta name="author" content="Real Estate Solutions" />
      </Helmet>
      <Header />
      <div className="container-fluid my-5">
        <div className="container">
          <div className="row ">
            <div className="col-lg-8 mx-auto dic_date_responsive_child">
              <h1 className="date-heading">Tour with a Partner Agent</h1>
              <p>
                Partner Agents work for other brokerages but share our
                commitment to customer service.
              </p>
              <a className="text-black" href="#">
                Learn More
              </a>
              {/* Date Picker */}
              <div className="row text-center mt-4">
                <div className="d-flex flex-row overflow-y-hidden overflow-x-auto justify-content-center align-items-center">
                  <div className="col-1 d-flex align-items-center justify-content-center date-nav">
                    <i className="fas fa-chevron-left"></i>
                  </div>

                  {dates.map((date, index) => (
                    <div
                      key={index}
                      className="col-md-2 day-card"
                      onClick={() => selectDate(date.format("YYYY-MM-DD"))}
                    >
                      {date.format("dddd").toUpperCase()}
                      <br />
                      <strong>{date.format("DD")}</strong>
                      <br />
                      {date.format("MMM").toUpperCase()}
                    </div>
                  ))}

                  <div className="col-1 d-flex align-items-center justify-content-center date-nav">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </div>
              </div>
              <div className="separator">
                <span>OR</span>
              </div>
              <div className="form-check not-sure-checkbox">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  checked={isNotSure} // Control the checkbox state
                  onChange={handleCheckboxChange} // Update state on change
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  I'm not sure about my schedule yet
                </label>
              </div>
              {/* Button to navigate with the selected date */}
              <button
                className="btn btn-outline-info"
                onClick={handleNextClick}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RequestShowing;
