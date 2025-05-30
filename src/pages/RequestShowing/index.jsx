import { Link, useLocation, useNavigate } from "react-router-dom";
import "./RequestShowing.css";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";

const RequestShowing = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); 
  const [isNotSure, setIsNotSure] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { p_id, seller_id } = location.state || {};

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
    setSelectedDate(date); 
    // If a date is selected, uncheck the "not sure" checkbox
    if (isNotSure) {
      setIsNotSure(false);
    }
  };

  const handleCheckboxChange = () => {
    setIsNotSure(!isNotSure);
    // If "not sure" is checked, clear any selected date
    if (!isNotSure) {
      setSelectedDate("");
    }
  };
  const handleNextClick = () => {
    const checkboxValue = isNotSure ? 1 : 0;
    navigate("/AboutYourSelf", {
      state: { date: selectedDate, notSure: checkboxValue, p_id: p_id, seller_id: seller_id },
    });
  };

  // Function to handle the arrow navigation for dates
  const handleDateNav = (direction) => {
    const today = dayjs();
    let newDates = [];
    
    if (direction === 'next') {
      const lastDate = dayjs(dates[dates.length - 1]);
      for (let i = 1; i <= 5; i++) {
        newDates.push(lastDate.add(i, "day"));
      }
      setDates(newDates);
    } else if (direction === 'prev') {
      const firstDate = dayjs(dates[0]);
      // Don't go before today
      if (firstDate.diff(today, 'day') > 0) {
        for (let i = 5; i >= 1; i--) {
          const newDate = firstDate.subtract(i, "day");
          if (newDate.isSame(today) || newDate.isAfter(today)) {
            newDates.push(newDate);
          }
        }
        if (newDates.length > 0) {
          setDates(newDates);
        }
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Request Showing | UrbanCraft Real Estate</title>
        <meta
          name="description"
          content="Schedule a tour with a partner agent or let us know if you're unsure about your schedule. Plan your next visit with ease."
        />
        <meta
          name="keywords"
          content="tour scheduling, partner agent, real estate tours, schedule flexibility"
        />
        <meta name="author" content="UrbanCraft Real Estate" />
      </Helmet>
      <Header />
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="request-showing-container">
              <h1 className="date-heading">Tour with a Partner Agent</h1>
              <p className="request-showing-subtext">
                Partner Agents work for other brokerages but share our
                commitment to exceptional customer service and property expertise.
              </p>
              <a className="learn-more-link" href="#">
                Learn More <i className="fas fa-arrow-right ml-1"></i>
              </a>
              
              {/* Date Picker */}
              <div className="date-picker-row">
                <div className="d-flex flex-row overflow-y-hidden overflow-x-auto justify-content-center align-items-center">
                  <div 
                    className="date-nav" 
                    onClick={() => handleDateNav('prev')}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </div>

                  {dates.map((date, index) => (
                    <div
                      key={index}
                      className={`day-card ${selectedDate === date.format("YYYY-MM-DD") ? "selected" : ""}`}
                      onClick={() => selectDate(date.format("YYYY-MM-DD"))}
                    >
                      <div className="day-name">{date.format("dddd").toUpperCase()}</div>
                      <div className="day-number">{date.format("DD")}</div>
                      <div className="month-name">{date.format("MMM").toUpperCase()}</div>
                    </div>
                  ))}

                  <div 
                    className="date-nav" 
                    onClick={() => handleDateNav('next')}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </div>
              </div>
              
              <div className="separator">
                <span>OR</span>
              </div>
              
              <div className="not-sure-checkbox">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  checked={isNotSure}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  I'm not sure about my schedule yet
                </label>
              </div>
              
              <button
                className="next-button"
                onClick={handleNextClick}
                disabled={!selectedDate && !isNotSure}
              >
                Next <i className="fas fa-arrow-right ml-2"></i>
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


