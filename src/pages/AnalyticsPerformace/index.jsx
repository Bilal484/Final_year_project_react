import React from "react";
import { Helmet } from 'react-helmet';
import MonthlyPerformanceChart from "../../components/MonthlyPerformanceChart";
import YearlyPerformanceChart from "../../components/YearlyPerformanceChart";
import InvestorHeader from "../../components/InvestorHeader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AnalyticsPerformace = () => {
    return (
        <>
        <Helmet>
                <title>Analytics Performance - UrbanCraft REAL ESTATE</title>
                <meta name="description" content="View detailed analytics of monthly and yearly performance to make informed investment decisions in real estate." />
                <meta name="keywords" content="real estate, analytics, performance charts, monthly performance, yearly performance, investment tracking" />
                <meta property="og:title" content="Analytics Performance - UrbanCraft REAL ESTATE" />
                <meta property="og:description" content="Access comprehensive analytics to track and analyze real estate investment performance over monthly and yearly intervals." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="/path/to/image.jpg" />  {/* Ensure you replace this with an actual image path */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Analytics Performance - UrbanCraft REAL ESTATE" />
                <meta name="twitter:description" content="Monitor your real estate investments with our detailed performance analytics for strategic decision-making." />
                <meta name="twitter:image" content="/path/to/image.jpg" />  {/* Ensure you replace this with an actual image path */}
            </Helmet>
            <Header />
            <InvestorHeader />
            <div className="container my-4">
                <div className="row">
                    <div className="col-lg-6">
                        <h3 className="text-center my-3">Monthly Performance Chart</h3>
                        <MonthlyPerformanceChart />
                    </div>
                    <div className="col-lg-6">
                        <h3 className="text-center my-3">Yearly Performance Chart</h3>
                        <YearlyPerformanceChart />
                    </div>
                </div>
            </div>
            <Footer/>

        </>
    )
}

export default AnalyticsPerformace;
