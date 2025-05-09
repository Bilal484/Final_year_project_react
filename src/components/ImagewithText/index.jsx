import React, { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './ImageWithText.css';

const ImageWithText = ({
  content,
  imgSrc,
  altText,
  title,
  imagePosition = 'left', 
}) => {
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('iwt-visible');
        }
      });
    }, { threshold: 0.2 });
    
    if (componentRef.current) {
      observer.observe(componentRef.current);
    }
    
    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  // Ensure content and imgSrc are strings to prevent React Helmet errors
  const safeContent = typeof content === 'string' ? content : '';
  const safeImgSrc = typeof imgSrc === 'string' ? imgSrc : '';

  return (
    <>
      {title && (
        <Helmet>
          <title>{`Learn More About ${title}`}</title>
          <meta name="description" content={`Explore details about ${title}. ${safeContent}`} />
          <meta name="keywords" content={`${title}, Informative Content, About Us`} />
          <meta property="og:title" content={`Learn More About ${title}`} />
          <meta property="og:description" content={safeContent} />
          {safeImgSrc && <meta property="og:image" content={safeImgSrc} />}
          <meta name="author" content="UrbanCraft REAL ESTATE" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="robots" content="index, follow" />
        </Helmet>
      )}
      
      <div 
        className="iwt-container row align-items-center my-5" 
        ref={componentRef}
      >
        {imagePosition === 'left' ? (
          <>
            <div className={`col-md-6 iwt-content ${imagePosition === 'left' ? 'iwt-content-right' : 'iwt-content-left'}`}>
              {title && <h2 className="iwt-title">{title}</h2>}
              <p className="iwt-text">{content}</p>
            </div>
            <div className="col-md-6 iwt-image-container">
              <div className="iwt-image-wrapper">
                <img 
                  src={imgSrc} 
                  alt={altText || 'Image'} 
                  className="iwt-image img-fluid" 
                  loading="lazy" 
                />
                <div className="iwt-image-overlay"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-md-6 iwt-image-container">
              <div className="iwt-image-wrapper">
                <img 
                  src={imgSrc} 
                  alt={altText || 'Image'} 
                  className="iwt-image img-fluid" 
                  loading="lazy" 
                />
                <div className="iwt-image-overlay"></div>
              </div>
            </div>
            <div className={`col-md-6 iwt-content ${imagePosition === 'left' ? 'iwt-content-right' : 'iwt-content-left'}`}>
              {title && <h2 className="iwt-title">{title}</h2>}
              <p className="iwt-text">{content}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ImageWithText;
