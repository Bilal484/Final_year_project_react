import React from 'react';
import { Helmet } from 'react-helmet';

const Sub2DealCard = ({ imgSrc, altText, title, description }) => {
    return (
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Our Deals | Company Name</title>
                <meta name="description" content="Discover the latest deals on our products and services." />
                <meta property="og:title" content="Our Deals | Company Name" />
                <meta property="og:description" content="Discover the latest deals on our products and services." />
                <meta property="og:image" content="https://example.com/deal-image.jpg" /> {/* Image for social media sharing */}
                <meta property="og:url" content="https://yourcompany.com/deals" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Our Deals | Company Name" />
                <meta name="twitter:description" content="Discover the latest deals on our products and services." />
                <meta name="twitter:image" content="https://example.com/deal-image.jpg" />
            </Helmet>
        <div className="col-md-4 mt-3">
            <div className="card h-100">
                <img src={imgSrc} alt={altText} className="card-img-top" />
                <div className="card-body">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default Sub2DealCard;
