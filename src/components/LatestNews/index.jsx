import React from 'react';
import { Helmet } from 'react-helmet';

const LatestNews = () => {
    return (
       <> 
        <Helmet>
                <title>Latest News - Znet Real Estate Insights</title>
                <meta name="description" content="Stay updated with the latest real estate news, market trends, and updates from Znet, including falling mortgage rates, rent analysis, and new regulations." />
                <meta name="keywords" content="Latest News, Real Estate News, Znet Updates, Market Trends, Housing Market" />
                <meta property="og:title" content="Latest News - Znet Real Estate Insights" />
                <meta property="og:description" content="Discover the latest insights on the housing market, mortgage rates, and new real estate regulations with Znet." />
                <meta name="author" content="Znet Team" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
            </Helmet>
        <div className="container shadow">
            <h2 className="h4 font-weight-bold mb-4 pt-4">Latest News</h2>
            <div className="bg-second-section p-3">
                <p>Transaction Coordinator</p>
                <h1 className="w-50 fs-1">Redefining real estate in the consumer’s favor</h1>
                <p className="w-100">
                    Znet helps people buy and sell homes in over 100 markets across the U.S. and Canada.
                    As a residential real estate brokerage, we combine our agents and technology to create a faster,
                    better, and more affordable service.
                </p>
                <div className="btn">
                    <button className="btn-investor">Learn more</button>
                </div>
            </div>
            <div className="row g-4">
                <div className="card col-lg-4 h-100 p-4">
                    <h2 className="h5 mb-3">September 12, 2024 • 8:00 am EDT</h2>
                    <h6>Znet Reports Falling Mortgage Rates Mean Housing Payments Are Now More Affordable Than a Year Ago Despite Higher Prices</h6>
                    <a href="#">Learn more</a>
                </div>
                <div className="card col-lg-4 h-100 p-4">
                    <h2 className="h5 mb-3">September 10, 2024 • 8:01 am EDT</h2>
                    <h6>Znet Reports Asking Rents Rose the Most in Over a Year in August, But Remain Below Record Highs Hit Two Years Earlier</h6>
                    <a href="#">Learn more</a>
                </div>
                <div className="card col-lg-4 h-100 p-4">
                    <h2 className="h5 mb-3">September 9, 2024 • 8:30 am EDT</h2>
                    <h6>New NAR Rules Are a Bargaining Chip, Putting Pressure on Commissions in Competitive Markets, Are Willing to Cover Some Fees</h6>
                    <a href="#">Learn more</a>
                </div>
            </div>
        </div>
        </>
    );
};

export default LatestNews;
