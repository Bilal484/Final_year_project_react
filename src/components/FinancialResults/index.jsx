import React from "react";
import { Helmet } from "react-helmet";

const FinancialResults = () => {
    return (
        <>
        <Helmet>
                <title>Financial Results - Q2 2024</title>
                <meta
                    name="description"
                    content="Explore Znet's financial results for Q2 2024, including revenue, gross profit, and user statistics. Access detailed reports, earnings releases, and presentations."
                />
                <meta
                    name="keywords"
                    content="financial results, Q2 2024, earnings release, gross profit, revenue, user statistics, Znet financials"
                />
                <meta name="author" content="Znet" />
            </Helmet>
            <section className="mt-4 container">
                <h2 className="h4 font-weight-bold mb-4">Latest financial results</h2>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-4 language_icons">
                            <h2 className="h4 fw-bold">Q2 2024</h2>
                            <p className="text-muted">Quarter ended June 30, 2024</p>
                            <ul className="mt-4 list-unstyled">
                                <li className="d-flex justify-content-between align-items-center mb-2">
                                    <span>Earnings release</span>
                                    <div className="d-flex gap-4">
                                        <a href="#" className="text-dark text-decoration-none">
                                            <i className="fa-solid fa-file-code" /> HTML
                                        </a>
                                        <a href="#" className="text-dark text-decoration-none">
                                            <i className="fa-solid fa-file-pdf" /> PDF
                                        </a>
                                    </div>
                                </li>
                                <hr />
                                <li className="d-flex justify-content-between align-items-center mb-2">
                                    <span>Earnings webcast</span>
                                    <div className="d-flex gap-4">
                                        <a href="#" className="text-dark text-decoration-none">
                                            <i className="fa-solid fa-headphones" /> Audio
                                        </a>
                                        <a href="#" className="text-dark text-decoration-none">
                                            <i className="fa-solid fa-file-lines" /> Transcript
                                        </a>
                                    </div>
                                </li>
                                <hr />
                                <li className="d-flex justify-content-between align-items-center mb-2">
                                    <span>10-Q</span>
                                    <div className="d-flex gap-4">
                                        <a href="#" className="text-dark text-decoration-none">
                                            <i className="fa-solid fa-file-code" /> HTML
                                        </a>
                                        <a href="#" className="text-dark text-decoration-none">
                                            <i className="fa-solid fa-file-pdf" /> PDF
                                        </a>
                                    </div>
                                </li>
                                <hr />
                                <li className="d-flex justify-content-between align-items-center mb-2">
                                    <span>XBRL</span>
                                    <div className="d-flex gap-4">
                                        <a href="#" className="text-dark text-decoration-none">
                                            <i className="fa-solid fa-file-excel" /> XLS
                                        </a>
                                        <a href="#" className="text-dark text-decoration-none">
                                            <i className="fa-solid fa-file-archive" /> ZIP
                                        </a>
                                    </div>
                                </li>
                                <hr />
                                <li className="d-flex justify-content-between align-items-center mb-2">
                                    <span>Earnings Presentation</span>
                                    <div className="d-flex gap-4">
                                        <a href="#" className="text-dark text-decoration-none">
                                            <i className="fa-solid fa-file-pdf" /> PDF
                                        </a>
                                    </div>
                                </li>
                                <hr />
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="d-grid gap-4">
                            <div className="bg-light p-4 rounded shadow">
                                <h2 className="h1 fw-bold">$295M</h2>
                                <p className="text-muted">
                                    Revenue was $295 million, an increase of 7% year-over-year.*
                                </p>
                            </div>
                            <div className="bg-light p-4 rounded shadow">
                                <h2 className="h1 fw-bold">$110M</h2>
                                <p className="text-muted">
                                    Gross profit was $110 million, an increase of 9%
                                    year-over-year.*
                                </p>
                            </div>
                            <div className="bg-light p-4 rounded shadow">
                                <h2 className="h1 fw-bold">52M</h2>
                                <p className="text-muted">
                                    Znet's mobile apps and website reached 52 million average
                                    monthly users, a decrease of 1% year-over-year.
                                </p>
                            </div>
                            <div className="     text-muted">
                                <p className="mt-4">Q2 2024 Earnings Release</p>
                                <p>
                                    For complete information regarding our financials, see our
                                    periodic{" "}
                                    <a href="#" className="text-primary">
                                        filings
                                    </a>
                                    .
                                </p>
                                <p>
                                    *Revenue and gross profit figures reflect results from
                                    continuing operations (excluding discontinued properties
                                    business).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default FinancialResults;
