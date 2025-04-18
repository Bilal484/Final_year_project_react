import React from 'react';
import { Helmet } from 'react-helmet';
import { MdOutlineGroups, MdOutlineSavings, MdPersonOutline } from "react-icons/md"; // Import relevant icons

const SellersCard = ({ title }) => {
    const cards = [
        {
            icon: <MdPersonOutline />, // Icon for best agents
            altText: 'Best agents in your market',
            heading: 'We have the best agents in your market',
            description: 'UrbanCraft REAL ESTATE agents provide exceptional service in real estate, ensuring clients achieve their goals with outstanding results every single time.'
        },
        {
            icon: <MdOutlineGroups />, // Icon for connecting with more users
            altText: 'Connect with more users',
            heading: 'Connect with more users',
            description: 'UrbanCraft REAL ESTATE is a leading networking platform, connecting users with five times more traffic than the next closest competitor.'
        },
        {
            icon: <MdOutlineSavings />, // Icon for saving with low listing fees
            altText: 'Save with a low listing fee',
            heading: 'Save with a listing fee as low as 1%',
            description: 'We help you save more money with competitive listing fees while delivering exceptional service, exceeding your expectations in every transaction.'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Sellers - UrbanCraft REAL ESTATE | Top Agents and Lowest Fees</title>
                <meta name="description" content="Explore top agents, low listing fees, and reach more buyers with UrbanCraft REAL ESTATE." />
                <meta name="keywords" content="real estate, UrbanCraft REAL ESTATE, top agents, low listing fees, real estate agents" />
                <meta name="author" content="Znet" />
                <meta property="og:title" content="Sellers - UrbanCraft REAL ESTATE | Top Agents and Lowest Fees" />
                <meta property="og:description" content="Find the best agents and save on listing fees with UrbanCraft REAL ESTATE. Get in touch with top professionals today!" />
                <meta property="og:image" content="/assets/images/sell_6.png" />
                <meta name="twitter:title" content="Sellers - UrbanCraft REAL ESTATE | Top Agents and Lowest Fees" />
                <meta name="twitter:description" content="Reach more buyers and save with low listing fees at UrbanCraft REAL ESTATE." />
                <meta name="twitter:image" content="/assets/images/sell_6.png" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <div className="row g-0 py-md-4 py-2 set_card_hover">
                <div>
                    <h2 className="h2 fw-bold mb-4">{title}</h2>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {cards.map((card, index) => (
                            <div className="col" key={index}>
                                <div className="card h-100 shadow-sm">
                                    <div className="icon-wrapper mb-1 text-center" style={{ fontSize: '5rem' }}>
                                        {card.icon}
                                    </div>
                                    <div className="card-body">
                                        <h3 className="h6  fw-semibold">{card.heading}</h3>
                                        <p >{card.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SellersCard;
