import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Questionaire = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true); // Tracks loading state

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (userId) {
      // Check if the questionnaire is completed
      axios
        .get(`https://api.biznetusa.com/api/check-questionnaire-status/${userId}`)
        .then((response) => {
          if (response.data.status === true) {
            // If questionnaire is completed, redirect to "/"
            navigate("/");
          } else if (response.data.status === false) {
            // If not completed, fetch the questions
            return axios.get(`https://api.biznetusa.com/api/get-questions/${userId}`);
          }
        })
        .then((response) => {
          if (response?.data?.status === 200) {
            setQuestions(response.data.questions); // Load the questions
          }
        })
        .catch((error) => {
          console.error("Error checking questionnaire status or fetching questions", error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after all API calls
        });
    } else {
      console.error("No user ID found in localStorage");
      navigate("/login"); // Redirect to login if no user ID
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while waiting for API
  }

  return (
    <>
      <Helmet>
        <title>User Questionnaire - BizNetUSA</title>
        <meta
          name="description"
          content="Complete your user profiling questionnaire to help us tailor our services to your needs. Select answers that best describe you."
        />
        <meta
          name="keywords"
          content="user questionnaire, profiling, customization, BizNetUSA, user profiling form"
        />
      </Helmet>
      <div
        className="py-5"
        style={{ backgroundColor: "var(--background_color)" }}
      >
        <div className="card shadow-sm mx-auto" style={{ maxWidth: "800px" }}>
          <h1
            className="text-center fw-bold my-4"
            style={{ color: "var(--color)" }}
          >
            User Profiling
          </h1>
          <div className="card-body p-4">
            {questions.length > 0 ? (
              questions.map((question) => (
                <div key={question.id} className="mb-3">
                  <label
                    className="form-label"
                    style={{ color: "var(--color)" }}
                  >
                    {question.question}
                  </label>
                  {question.options.map((option) => (
                    <div key={option.id} className="form-check d-block">
                      <input
                        type="radio"
                        name={`question_${question.id}`}
                        value={option.option_value}
                        className="form-check-input"
                        id={`option_${option.id}`}
                        disabled // Disable input since no interaction is required
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`option_${option.id}`}
                      >
                        {option.option_value}
                      </label>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No questions available. Please try again later.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Questionaire;
