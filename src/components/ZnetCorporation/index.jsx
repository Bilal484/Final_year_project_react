import React from 'react';
import { Helmet } from 'react-helmet'; 

const ZnetCorporation = () => {
    return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Znet Corporation - Real Estate Success at a Glance</title>
                <meta name="description" content="Explore the success of Znet Corporation in real estate, with impressive statistics on homes sold, customer satisfaction, and website traffic in 2023." />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Znet Corporation - Real Estate Success at a Glance" />
                <meta property="og:description" content="Explore the success of Znet Corporation in real estate, with impressive statistics on homes sold, customer satisfaction, and website traffic in 2023." />
                <meta property="og:image" content="https://via.placeholder.com/1200x630" />
                <meta property="og:url" content="https://www.znetcorporation.com" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Znet Corporation - Real Estate Success at a Glance" />
                <meta name="twitter:description" content="Explore the success of Znet Corporation in real estate, with impressive statistics on homes sold, customer satisfaction, and website traffic in 2023." />
                <meta name="twitter:image" content="https://via.placeholder.com/1200x630" />
            </Helmet>
        <div className="container">
            <div className="row">
                <div className="p-4">
                    <h2 className="text-center mb-4 h3 fw-bold">Znet Corporation at a Glance</h2>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        <div className="col">
                            <div className="bg-white p-4 rounded shadow-sm">
                                <h3 className="h2 fw-semibold">559,000</h3>
                                <hr className="border-2 border-success my-2" />
                                <p className="text-muted">Customers bought or sold homes with us through 2023</p>
                            </div>
                            {/* Hello */}
                        </div>
                        <div className="col">
                            <div className="bg-white p-4 rounded shadow-sm">
                                <h3 className="h2 fw-semibold">$281B</h3>
                                <hr className="border-2 border-success my-2" />
                                <p className="text-muted">Worth of homes bought or sold by our customers through 2023</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="bg-white p-4 rounded shadow-sm">
                                <h3 className="h2 fw-semibold">50 million</h3>
                                <hr className="border-2 border-success my-2" />
                                <p className="text-muted">Average monthly visitors to our website and mobile app in 2023</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="bg-white p-4 rounded shadow-sm">
                                <h3 className="h2 fw-semibold">4,693</h3>
                                <hr className="border-2 border-success my-2" />
                                <p className="text-muted">Employees</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="bg-white p-4 rounded shadow-sm">
                                <h3 className="h2 fw-semibold">1,776</h3>
                                <hr className="border-2 border-success my-2" />
                                <p className="text-muted">Average number of lead agents for 2023</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="bg-white p-4 rounded shadow-sm">
                                <h3 className="h2 fw-semibold">100 +</h3>
                                <hr className="border-2 border-success my-2" />
                                <p className="text-muted">Markets</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ZnetCorporation;
