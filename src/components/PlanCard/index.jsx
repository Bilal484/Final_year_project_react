import React from "react";
import { Helmet } from "react-helmet";

const PlanCard = ({
    title,
    iconUrl,
    price,
    subtitle,
    billingInfo,
    features,
    mostPopular,
    inquireNowText = "Inquire now",
    viewMoreText = "View More Details",
    popularBadgeText = "Most Popular",
}) => {
    return (
        <>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content={`Explore the ${title} plan with features such as ${features.join(", ")}, available at ${price}.`} />
                <meta name="keywords" content={`${title}, ${subtitle}, ${price}, plan, features`} />
                <meta property="og:title" content={`${title} Plan`} />
                <meta property="og:description" content={`Discover the benefits of the ${title} plan, including ${features.join(", ")}. Only for ${price}.`} />
                <meta property="og:image" content={iconUrl} /> {/* Assuming iconUrl is the image to share */}
                <meta property="og:url" content="https://www.example.com/plans" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${title} Plan`} />
                <meta name="twitter:description" content={`Explore the ${title} plan with features such as ${features.join(", ")}, priced at ${price}.`} />
                <meta name="twitter:image" content={iconUrl} />
                <title>{`${title} Plan`}</title>
            </Helmet>
            <div className="col-lg-3 h-100 col-md-4 col-sm-6 mb-4">
                <div className={`card-plan bg-white rounded-lg p-4 ${mostPopular ? "position-relative popular-plan-card" : ""}`}>
                    {mostPopular && (
                        <div className="most-popular-badge position-absolute top-0 end-0 bg-warning text-white small fw-bold px-2 py-1 rounded-start">
                            {popularBadgeText}
                        </div>
                    )}
                    <div className="plan-header d-flex align-items-center mb-3">
                        <img aria-hidden="true" alt={`${title}-icon`} src={iconUrl} className="plan-icon me-2" />
                        <h2 className="h5 plan-title mb-0">{title}</h2>
                    </div>
                    <p className="plan-subtitle text-muted">{subtitle}</p>
                    <p className="plan-price h4 font-weight-bold">{price}</p>
                    <p className="plan-billing text-muted">{billingInfo}</p>
                    <h3 className="plan-features-title mt-3">What's included</h3>
                    <ul className="plan-features list-unstyled">
                        {features.map((feature, index) => (
                            <li key={index}>
                                <i className="fa-solid fa-circle-check" /> {feature}
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-inquire w-100 mt-3">{inquireNowText}</button>
                    <button className="btn btn-inquire w-100 mt-3">{viewMoreText}</button>
                </div>
            </div>
        </>
    );
};

export default PlanCard;
