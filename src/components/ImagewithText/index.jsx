import React from 'react';
import { Helmet } from 'react-helmet';

const ImageWithText = ({
  content,
  imgSrc,
  altText,
  title,
  imagePosition = 'left', 
}) => {
  return (
    <>
      <Helmet>
        <title>{`Learn More About ${title}`}</title>
        <meta name="description" content={`Explore details about ${title}. ${content}`} />
        <meta name="keywords" content={`${title}, Informative Content, About Us`} />
        <meta property="og:title" content={`Learn More About ${title}`} />
        <meta property="og:description" content={`${content}`} />
        <meta property="og:image" content={imgSrc} />
        <meta name="author" content="Your Website Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
      </Helmet>
    <div className="row align-items-center my-5">
      {imagePosition === 'left' ? (
        <>
          <div className="col-md-6 text-dark">
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
          <div className="col-md-6">
            <img src={imgSrc} alt={altText} className="about-img rounded-3 img-fluid" />
          </div>
        </>
      ) : (
        <>
          <div className="col-md-6">
            <img src={imgSrc} alt={altText} className="about-img rounded-3 img-fluid" />
          </div>
          <div className="col-md-6 text-dark">
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default ImageWithText;
