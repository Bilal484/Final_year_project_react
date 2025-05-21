import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import './ExecutiveLeaders.css';

import UserProfiling from "../../assets/images/FYP_ Logo/FYP_ Logo/image_reashi.jpg";
import UserProfiling1 from "../../assets/images/FYP_ Logo/FYP_ Logo/bilal.png";
import UserProfiling2 from "../../assets/images/FYP_ Logo/FYP_ Logo/zain.jpg";

const ExecutiveLeaders = () => {
  const [animated, setAnimated] = useState({});
  const leadersRef = useRef(null);

  // Project development team data
  const leadershipTeam = [
    {
      id: 1,
      name: "M. Bilal",
      title: "Backend Developer",
      image: [UserProfiling1],
      description: " Developed robust APIs for this real estate platform and ensured seamless integration with the frontend. Passionate about building scalable and secure backend solutions.",
      badge: "Backend",
      expertise: ["Laravel", "API Development", "Database Design", "RESTful Services"],
      socials: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        twitter: "https://twitter.com"
      }
    },
    {
      id: 2,
      name: "Rashid Nazeer",
      title: "UI/UX & Frontend Developer",
      image: [UserProfiling],
      description: "Working on  UI/UX Design and frontend  who created the beautiful interface for this platform. Led the design process and implemented responsive layouts in React while integrating backend APIs.",
      badge: "UI/UX",
      expertise: ["React.js", "UI Design", "Responsive Design", "API Integration"],
      socials: {
        linkedin: "https://linkedin.com",
        dribbble: "https://dribbble.com",
        github: "https://github.com"
      }
    },
    {
      id: 3,
      name: "Zain Ali",
      title: "Frontend Developer",
      image: [UserProfiling2],
      description: "Working on  API integration and frontend implementation. Focused on creating interactive components and ensuring a smooth user experience across the platform.",
      badge: "Frontend",
      expertise: ["React.js", "State Management", "Component Design", "API Integration"],
      socials: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        instagram: "https://instagram.com"
      }
    }
  ];

  useEffect(() => {
    // Set up intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(prev => ({
              ...prev,
              [entry.target.dataset.id]: true
            }));
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    // Observe all leader cards
    if (leadersRef.current) {
      const cards = leadersRef.current.querySelectorAll('.leader-card');
      cards.forEach(card => {
        observer.observe(card);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>      <Helmet>
      <title>Our Development Team | UrbanCraft REAL ESTATE</title>
      <meta name="description" content="Meet the talented developers behind UrbanCraft REAL ESTATE platform. Our development team brings technical expertise to deliver an exceptional real estate experience." />
      <meta name="keywords" content="real estate developers, development team, software engineers, UrbanCraft development" />
    </Helmet>

      <section className="dev-team-section">
        <div className="container">
          <div className="section-header flex-column d-flex justify-content-center align-items-center">
            <span className="section-badge">Our Team</span>
            <h2 className="section-title">Meet The Developers</h2>
            <p className="section-subtitle">
              The talented professionals who built this real estate platform with expertise in frontend, backend, and UI/UX design
            </p>
          </div>

          <div className="container d-flex flex-row " ref={leadersRef}>
            <div className="row gap-4 d-flex w-100  justify-content-center align-items-stretch">
              {leadershipTeam.map((leader, index) => (
                <div
                  className={`leader-card ${animated[leader.id] ? 'animate' : ''}`}
                  key={leader.id}
                  data-id={leader.id}
                  style={{ "--animation-order": index }}
                >
                  <div className="card-inner">
                    <div className="leader-image-container">
                      <div className="leader-image-wrapper">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="leader-image"
                          loading="lazy"
                        />
                        <div className="leader-color-overlay"></div>
                      </div>

                      {leader.badge && (
                        <div className="leader-badge">{leader.badge}</div>
                      )}
                    </div>

                    <div className="leader-info">
                      <h3 className="leader-name">{leader.name}</h3>
                      <p className="leader-title">{leader.title}</p>
                      <div className="leader-divider"></div>
                      <p className="leader-description">{leader.description}</p>

                      {leader.expertise && (
                        <div className="leader-expertise">
                          {leader.expertise.map((skill, i) => (
                            <span key={i} className="expertise-tag">{skill}</span>
                          ))}
                        </div>
                      )}

                      <div className="leader-social">
                        {leader.socials?.linkedin && (
                          <a href={leader.socials.linkedin} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label={`${leader.name}'s LinkedIn`}>
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        )}
                        {leader.socials?.twitter && (
                          <a href={leader.socials.twitter} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label={`${leader.name}'s Twitter`}>
                            <i className="fab fa-twitter"></i>
                          </a>
                        )}
                        {leader.socials?.github && (
                          <a href={leader.socials.github} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label={`${leader.name}'s GitHub`}>
                            <i className="fab fa-github"></i>
                          </a>
                        )}
                        {leader.socials?.dribbble && (
                          <a href={leader.socials.dribbble} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label={`${leader.name}'s Dribbble`}>
                            <i className="fab fa-dribbble"></i>
                          </a>
                        )}
                        {leader.socials?.instagram && (
                          <a href={leader.socials.instagram} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label={`${leader.name}'s Instagram`}>
                            <i className="fab fa-instagram"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="team-cta">
            <p>Want to know more about how we built this platform?</p>
            <a href="/about" className="team-cta-button">
              Read About Our Process
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExecutiveLeaders;