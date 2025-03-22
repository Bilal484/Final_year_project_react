import { Helmet } from "react-helmet";

const WhyZnet = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>ZNet - Your All-in-One Real Estate Solution</title>
                <meta
                    name="description"
                    content="ZNet offers quick connections, expert strategies, and seamless transactions for all your real estate needs."
                />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="ZNet - Your All-in-One Real Estate Solution" />
                <meta
                    property="og:description"
                    content="ZNet offers quick connections, expert strategies, and seamless transactions for all your real estate needs."
                />
                <meta property="og:image" content="https://via.placeholder.com/1200x630" />
                <meta property="og:url" content="https://www.znet.com/why-znet" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="ZNet - Your All-in-One Real Estate Solution" />
                <meta
                    name="twitter:description"
                    content="ZNet offers quick connections, expert strategies, and seamless transactions for all your real estate needs."
                />
                <meta name="twitter:image" content="https://via.placeholder.com/1200x630" />
            </Helmet>

            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center fw-bold mb-4">
                        Your All-in-One Real Estate Solution
                    </h2>

                    <ul className="list-unstyled mb-5">
                        <li className="mb-3 d-flex align-items-start">
                            <i className="fa fa-check-circle text-success me-3 fs-4"></i>
                            <div>
                                <strong>Quick Matches:</strong> Get connected with the right people instantly.
                            </div>
                        </li>
                        <li className="mb-3 d-flex align-items-start">
                            <i className="fa fa-check-circle text-success me-3 fs-4"></i>
                            <div>
                                <strong>Expert Strategies:</strong> Receive personalized advice for your goals.
                            </div>
                        </li>
                        <li className="mb-3 d-flex align-items-start">
                            <i className="fa fa-check-circle text-success me-3 fs-4"></i>
                            <div>
                                <strong>Seamless Transactions:</strong> Communicate and collaborate in one platform.
                            </div>
                        </li>
                    </ul>

                    <div className="comparison-table mb-5">
                        <table className="table table-bordered table-striped text-center">
                            <thead className="table-primary">
                                <tr>
                                    <th className="fw-bold">Feature</th>
                                    <th className="fw-bold">ZNet</th>
                                    <th className="fw-bold">Traditional Networking</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Speed of Connections</td>
                                    <td>Instant</td>
                                    <td>Slow</td>
                                </tr>
                                <tr>
                                    <td>Expert Guidance</td>
                                    <td>Personalized</td>
                                    <td>Generic</td>
                                </tr>
                                <tr>
                                    <td>Communication</td>
                                    <td>Integrated Platform</td>
                                    <td>Scattered Tools</td>
                                </tr>
                                <tr>
                                    <td>Ease of Use</td>
                                    <td>Seamless</td>
                                    <td>Complicated</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WhyZnet;
