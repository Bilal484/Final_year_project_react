import React from "react";
import { Helmet } from "react-helmet";

const SellerDetailPortion = () => {
    return (
        <>
          <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta
                    name="description"
                    content="Browse real estate agent job listings including positions in various locations like San Francisco, Syracuse, and more. Apply now for the latest opportunities."
                />
                <meta
                    name="keywords"
                    content="real estate agent, job listings, apply now, real estate jobs, job opportunities, full-time real estate jobs"
                />
                <meta
                    property="og:title"
                    content="Real Estate Agent Job Listings - Apply Now for Opportunities"
                />
                <meta
                    property="og:description"
                    content="Explore and apply for real estate agent positions across various locations. Full-time, part-time, and future opportunities available."
                />
                <meta
                    property="og:image"
                    content="https://example.com/assets/images/job-listing-image.jpg" // Replace with the actual image URL you want to use
                />
                <meta property="og:image:alt" content="Real Estate Agent Job Listings" />
                <meta name="twitter:title" content="Real Estate Agent Job Listings - Apply Now for Opportunities" />
                <meta
                    name="twitter:description"
                    content="Browse and apply for real estate agent jobs in multiple locations. Full-time, part-time, and future opportunities."
                />
                <meta
                    name="twitter:image"
                    content="https://example.com/assets/images/job-listing-image.jpg" // Replace with the actual image URL you want to use
                />
                <title>Real Estate Agent Job Listings - Apply Now for Opportunities</title>
            </Helmet>

            <div className="col-md-8 border p-2">
                {/* Showing Results and Sort Options */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>Showing 1-10 of 345 results</div>
                    <div>
                        <select className="form-select" aria-label="Sort by">
                            <option selected="">Most Relevant</option>
                            <option value={1}>Most Recent</option>
                            <option value={2}>Oldest First</option>
                        </select>
                    </div>
                </div>
                {/* Active Filters */}
                <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-light text-dark border me-2">
                        Real Estate Agent
                    </span>
                    <a href="#" className="text-decoration-none text-danger">
                        Clear all
                    </a>
                </div>
                {/* Job Listing */}
                <div className="list-group">
                    {/* Job Item 1 */}
                    <div className="list-group-item border-0 border-bottom p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1 fw-bold text-danger">
                                    Real Estate Agent - San Francisco (City)
                                </h5>
                                <small>
                                    <a href="#" className="text-decoration-none text-primary">
                                        Available in 6 locations
                                    </a>{" "}
                                    • Real Estate Agent • Full time • July 1st 2024
                                </small>
                            </div>
                            <div className="d-flex align-items-center">
                                <button className="btn btn btn-apply-now btn-sm">
                                    Apply Now
                                </button>
                                <button
                                    className="btn btn-light btn-sm border ms-2"
                                    title="Add to Favorites"
                                    style={{
                                        backgroundColor: "transparent !important",
                                        border: "none !important"
                                    }}
                                >
                                    <i className="bi bi-heart text-danger" />
                                </button>
                            </div>
                        </div>
                        <p className="text-muted mt-2">
                            Support: You’ll get support from a dedicated transaction
                            coordinator, listing coordinator, and a team of showing agents.
                            Minimum of 1 year residential real estate sales experience,
                            ideally with closed...
                        </p>
                    </div>
                    {/* Job Item 2 */}
                    <div className="list-group-item border-0 border-bottom p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1 fw-bold text-danger">
                                    Real Estate Agent - Syracuse
                                </h5>
                                <small>
                                    Buffalo, New York, United States of America • Real Estate
                                    Agent • Full time • August 19th 2024
                                </small>
                            </div>
                            <div className="d-flex align-items-center">
                                <button className="btn btn btn-apply-now btn-sm">
                                    Apply Now
                                </button>
                                <button
                                    className="btn btn-light btn-sm border ms-2"
                                    title="Add to Favorites"
                                    style={{
                                        backgroundColor: "transparent !important",
                                        border: "none !important"
                                    }}
                                >
                                    <i className="bi bi-heart text-danger" />
                                </button>
                            </div>
                        </div>
                        <p className="text-muted mt-2">
                            Support: You’ll get support from a dedicated transaction
                            coordinator, listing coordinator, and a team of showing agents.
                            Minimum of 1 year residential real estate sales experience,
                            ideally with closed...
                        </p>
                    </div>
                    {/* Job Item 3 */}
                    <div className="list-group-item border-0 border-bottom p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1 fw-bold text-danger">
                                    Real Estate Agent - San Francisco (San Jose)
                                </h5>
                                <small>
                                    San Jose, California, United States of America • Real Estate
                                    Agent • Full time • May 30th 2024
                                </small>
                            </div>
                            <div className="d-flex align-items-center">
                                <button className="btn btn btn-apply-now btn-sm">
                                    Apply Now
                                </button>
                                <button
                                    className="btn btn-light btn-sm border ms-2"
                                    title="Add to Favorites"
                                    style={{
                                        backgroundColor: "transparent !important",
                                        border: "none !important"
                                    }}
                                >
                                    <i className="bi bi-heart text-danger" />
                                </button>
                            </div>
                        </div>
                        <p className="text-muted mt-2">
                            Support: You’ll get support from a dedicated transaction
                            coordinator, listing coordinator, and a team of showing agents.
                            Minimum of 1 year residential real estate sales experience,
                            ideally with closed...
                        </p>
                    </div>
                    {/* Job Item 4 */}
                    <div className="list-group-item border-0 border-bottom p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1 fw-bold text-danger">
                                    Real Estate Agent - San Francisco (Peninsula)
                                </h5>
                                <small>
                                    San Francisco, California, United States of America • Real
                                    Estate Agent • Full time • July 5th 2024
                                </small>
                            </div>
                            <div className="d-flex align-items-center">
                                <button className="btn btn btn-apply-now  btn-sm">
                                    Apply Now
                                </button>
                                <button
                                    className="btn btn-light btn-sm border ms-2"
                                    title="Add to Favorites"
                                    style={{
                                        backgroundColor: "transparent !important",
                                        border: "none !important"
                                    }}
                                >
                                    <i className="bi bi-heart text-danger" />
                                </button>
                            </div>
                        </div>
                        <p className="text-muted mt-2">
                            Support: You’ll get support from a dedicated transaction
                            coordinator, listing coordinator, and a team of showing agents.
                            Minimum of 1 year residential real estate sales experience,
                            ideally with closed...
                        </p>
                    </div>
                    {/* Job Item 5 */}
                    <div className="list-group-item border-0 border-bottom p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1 fw-bold text-danger">
                                    Real Estate Agent - Gold Coast
                                </h5>
                                <small>
                                    Gold Coast, Australia • Real Estate Agent • Full time • July
                                    10th 2024
                                </small>
                            </div>
                            <div className="d-flex align-items-center">
                                <button className="btn btn btn-apply-now btn-sm">
                                    Apply Now
                                </button>
                                <button
                                    className="btn btn-light btn-sm border ms-2"
                                    title="Add to Favorites"
                                    style={{
                                        backgroundColor: "transparent !important",
                                        border: "none !important"
                                    }}
                                >
                                    <i className="bi bi-heart text-danger" />
                                </button>
                            </div>
                        </div>
                        <p className="text-muted mt-2">
                            Support: You’ll get support from a dedicated transaction
                            coordinator, listing coordinator, and a team of showing agents.
                            Minimum of 1 year residential real estate sales experience,
                            ideally with closed...
                        </p>
                    </div>
                    {/* Job Item 6 */}
                    <div className="list-group-item border-0 border-bottom p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-1 fw-bold text-danger">
                                    Real Estate Agent - Michigan (Future Opportunities)
                                </h5>
                                <small>
                                    Michigan, United States of America • Real Estate Agent • Full
                                    time
                                </small>
                            </div>
                            <div className="d-flex align-items-center">
                                <button className="btn btn btn-apply-now btn-sm">
                                    Apply Now
                                </button>
                                <button
                                    className="btn btn-light btn-sm border ms-2"
                                    title="Add to Favorites"
                                    style={{
                                        backgroundColor: "transparent !important",
                                        border: "none !important"
                                    }}
                                >
                                    <i className="bi bi-heart text-danger" />
                                </button>
                            </div>
                        </div>
                        <p className="text-muted mt-2">
                            Support: You’ll get support from a dedicated transaction
                            coordinator, listing coordinator, and a team of showing agents.
                            Minimum of 1 year residential real estate sales experience,
                            ideally with closed...
                        </p>
                    </div>
                </div>
                {/* Pagination */}
                <nav aria-label="Page navigation" className="mt-4">
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <a
                                className="page-link"
                                href="#"
                                tabIndex={-1}
                                aria-disabled="true"
                            >
                                Previous
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                1
                            </a>
                        </li>
                        <li className="page-item active">
                            <a className="page-link" href="#">
                                2
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                3
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                4
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                5
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )

}
export default SellerDetailPortion;