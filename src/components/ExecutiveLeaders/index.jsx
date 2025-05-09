import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import './ExecutiveLeaders.css';

const ExecutiveLeaders = () => {
  const [animated, setAnimated] = useState({});
  const leadersRef = useRef(null);

  // Static leadership team data
  const leadershipTeam = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
      description: "With over 15 years of experience in the real estate industry, Sarah leads the company with vision and dedication.",
      badge: "Founder",
      expertise: ["Strategic Planning", "Market Analysis", "Team Leadership"],
      socials: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        facebook: "https://facebook.com"
      }
    },
    {
      id: 2,
      name: "Michael Thompson",
      title: "Chief Operating Officer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      description: "Michael oversees all operational aspects of the company, ensuring exceptional service delivery.",
      badge: "Operations",
      expertise: ["Process Optimization", "Team Management", "Client Relations"],
      socials: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      }
    },
    {
      id: 3,
      name: "Jessica Williams",
      title: "Chief Marketing Officer",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      description: "Jessica drives our marketing strategies with creativity and data-driven insights.",
      badge: "Marketing",
      expertise: ["Digital Marketing", "Brand Development", "Market Research"],
      socials: {
        linkedin: "https://linkedin.com",
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
    <>
      <Helmet>
        <title>Our Leadership Team | UrbanCraft REAL ESTATE</title>
        <meta name="description" content="Meet the experienced professionals leading UrbanCraft REAL ESTATE. Our executive team brings decades of industry expertise to deliver exceptional real estate services." />
        <meta name="keywords" content="real estate leadership, executive team, real estate professionals, UrbanCraft management" />
      </Helmet>

      <section className="leaders-section">
        <div className="container">
          <div className="section-header d-flex flex-column align-items-center">
            <span className="section-badge">Our Team</span>
            <h2 className="section-title">Meet Our Leadership</h2>
            <p className="section-subtitle">
              The experienced professionals guiding UrbanCraft REAL ESTATE to new heights of excellence in the real estate industry
            </p>
          </div>

          <div className="leaders-container" ref={leadersRef}>
            {leadershipTeam.map((leader, index) => (
              <div
                className={`leader-card ${animated[leader.id] ? 'animate' : ''}`}
                key={leader.id}
                data-id={leader.id}
                style={{"--animation-order": index}}
              >
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
                    {leader.socials?.facebook && (
                      <a href={leader.socials.facebook} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label={`${leader.name}'s Facebook`}>
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    )}
                    {leader.socials?.instagram && (
                      <a href={leader.socials.instagram} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label={`${leader.name}'s Instagram`}>
                        <i className="fab fa-instagram"></i>
                      </a>
                    )}
                    {leader.socials?.github && (
                      <a href={leader.socials.github} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label={`${leader.name}'s GitHub`}>
                        <i className="fab fa-github"></i>
                      </a>
                    )}
                  </div>
                </div>
                <div className="leader-status"></div>
              </div>
            ))}
          </div>

          <div className="team-cta">
            <p>Interested in joining our team?</p>
            <a href="/careers" className="team-cta-button">
              View Career Opportunities
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExecutiveLeaders;