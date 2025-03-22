import React from 'react';
import './CoreValueCard.css'
import { Helmet } from 'react-helmet';

const CoreValueCard = ({ title, text }) => {
  return (
    <>
    <Helmet>
        <title>Core Value - {title}</title>
        <meta
          name="description"
          content={`Learn more about our core value: ${title}. ${text}`}
        />
        <meta
          name="keywords"
          content="core values, company values, business principles, values in business"
        />
        <meta property="og:title" content={`Core Value - ${title}`} />
        <meta
          property="og:description"
          content={`Explore our core value: ${title} - ${text}`}
        />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content="URL_TO_IMAGE" /> {/* Placeholder for image */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Core Value - ${title}`} />
        <meta
          name="twitter:description"
          content={`Explore our core value: ${title} - ${text}`}
        />
        <meta name="twitter:image" content="URL_TO_IMAGE" /> {/* Placeholder for image */}
      </Helmet>
    <div className="col-md-4  my-4">
      <div className="card card-CoreValueCard p-3 h-100">
        <div className="card-body card-CoreValueCard-body">
          <h5 className="card-title text-light ">{title}</h5>
          <p className="card-text text-light">{text}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default CoreValueCard;
