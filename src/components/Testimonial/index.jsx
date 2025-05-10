import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./testimonial.css";

const testimonials = [
  {
    title: "Outstanding Service",
    text: "UrbanCraft REAL ESTATE helped us find our dream home with exceptional service.",
    author: "Sarah L.",
    role: "Home Buyer",
    initial: "S",
  },
  {
    title: "Fantastic Support",
    text: "The team always provided quick and effective support.",
    author: "Fiona G.",
    role: "First-Time Buyer",
    initial: "F",
  },
  {
    title: "Exceeded Expectations",
    text: "UrbanCraft exceeded our expectations in every aspect.",
    author: "Emily W.",
    role: "Investor",
    initial: "E",
  },
  {
    title: "Highly Responsive",
    text: "ZNet's responsiveness made the entire process smooth.",
    author: "Henry K.",
    role: "Investor",
    initial: "H",
  },
  {
    title: "Smooth & Stress-Free",
    text: "We sold our property in no time, thanks to their expertise.",
    author: "Mark D.",
    role: "Property Seller",
    initial: "M",
  },
  {
    title: "Impressive Results",
    text: "Fantastic results with unmatched dedication!",
    author: "Irene T.",
    role: "Property Seller",
    initial: "I",
  },
  {
    title: "Outstanding Service",
    text: "UrbanCraft REAL ESTATE helped us find our dream home with exceptional service.",
    author: "Sarah L.",
    role: "Home Buyer",
    initial: "S",
  },
  {
    title: "Fantastic Support",
    text: "The team always provided quick and effective support.",
    author: "Fiona G.",
    role: "First-Time Buyer",
    initial: "F",
  },
  {
    title: "Exceeded Expectations",
    text: "UrbanCraft exceeded our expectations in every aspect.",
    author: "Emily W.",
    role: "Investor",
    initial: "E",
  },
  {
    title: "Highly Responsive",
    text: "ZNet's responsiveness made the entire process smooth.",
    author: "Henry K.",
    role: "Investor",
    initial: "H",
  },
  {
    title: "Smooth & Stress-Free",
    text: "We sold our property in no time, thanks to their expertise.",
    author: "Mark D.",
    role: "Property Seller",
    initial: "M",
  },
  {
    title: "Impressive Results",
    text: "Fantastic results with unmatched dedication!",
    author: "Irene T.",
    role: "Property Seller",
    initial: "I",
  },
];

const groupTestimonials = (data, groupSize) => {
  let result = [];
  for (let i = 0; i < data.length; i += groupSize) {
    result.push(data.slice(i, i + groupSize));
  }
  return result;
};

const TestimonialCard = ({ title, text, author, role, initial }) => (
  <div className="col-12 col-md-4 d-flex align-items-stretch">
    <div className="card card-test  p-4 shadow w-100 h-100 d-flex flex-column">
      <h5 className="fw-bold text-dark mb-3">{title}</h5>
      <p className="testimonial mb-4 flex-grow-1">“{text}”</p>
      <div className="d-flex align-items-center">
        <div
          className="author-image rounded-circle d-flex justify-content-center align-items-center text-white me-3"
          style={{ width: "50px", height: "50px", backgroundColor: "var(--color)" }}
        >
          {initial}
        </div>
        <div>
          <h6 className="fw-bold mb-0">{author}</h6>
          <small className="text-muted">{role}</small>
        </div>
      </div>
    </div>
  </div>
);

const Testimonial = () => {
  const [grouped, setGrouped] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const groupSize = isMobile ? 1 : 3;
      setGrouped(groupTestimonials(testimonials, groupSize));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="testimonial-section">
      <Helmet>
        <title>What Our Clients Say | UrbanCraft REAL ESTATE</title>
        <meta name="description" content="Client testimonials for UrbanCraft REAL ESTATE." />
      </Helmet>

      <div className="container">
        <h2 className="section-title text-center text-light mb-3">What Our Clients Say</h2>
        <p className="testimonial-description text-center mb-5">
          Hear from our clients about their experience with UrbanCraft REAL ESTATE.
        </p>

        <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {grouped.map((group, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <div className="row g-3">
                  {group.map((testimonial, idx) => (
                    <TestimonialCard key={idx} {...testimonial} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" />
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
