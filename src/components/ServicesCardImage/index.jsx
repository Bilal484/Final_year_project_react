import React from 'react';
import { Helmet } from 'react-helmet';


const ServicesCardImage = ({ cards }) => {
    return (
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Our Services | Click Booster</title>
                <meta
                    name="description"
                    content="Browse through our services at Click Booster including social media followers, likes, views, and more."
                />
                <meta property="og:title" content="Our Services | Click Booster" />
                <meta
                    property="og:description"
                    content="Browse through our services at Click Booster including social media followers, likes, views, and more."
                />
                <meta
                    property="og:image"
                    content="https://example.com/path/to/your-social-image.jpg"
                />
                <meta property="og:url" content="https://example.com" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Our Services | Click Booster" />
                <meta
                    name="twitter:description"
                    content="Browse through our services at Click Booster including social media followers, likes, views, and more."
                />
                <meta
                    name="twitter:image"
                    content="https://example.com/path/to/your-social-image.jpg"
                />
            </Helmet>

        <div className="container mt-5">
            {/* Card wrapper that keeps all cards in a single row */}
            <div className="row d-flex flex-row">
                {cards.map((card) => (
                    <div className="col-md-3 col-sm-6 mb-4" key={card.id}>
                        <div className="card h-100">
                            <img src={card.image} className="card-img-top" alt={`Card Image ${card.id}`} />
                            <div className="card-body">
                                <p className="card-text">{card.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default ServicesCardImage;
