import React from 'react';
import { Helmet } from 'react-helmet';


const ServiceCards = ({ services }) => {
    return (
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>Our Services | Click Booster</title>
                <meta
                    name="description"
                    content="Explore the services offered by Click Booster to enhance your social media presence with followers, views, likes, and more."
                />
                <meta property="og:title" content="Our Services | Click Booster" />
                <meta
                    property="og:description"
                    content="Explore the services offered by Click Booster to enhance your social media presence with followers, views, likes, and more."
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
                    content="Explore the services offered by Click Booster to enhance your social media presence with followers, views, likes, and more."
                />
                <meta
                    name="twitter:image"
                    content="https://example.com/path/to/your-social-image.jpg"
                />
            </Helmet>
        <div className="row">
            {services.map((service, index) => (
                <div className="col-md-4" key={index}>
                    <div className="card shadow m-2">
                        <div className="card-body text-center">
                            <i className={`${service.icon} fs-1`} />
                            <h4 className="card-title mt-3">{service.title}</h4>
                            <p className="card-text">
                                {service.description}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};

export default ServiceCards;
