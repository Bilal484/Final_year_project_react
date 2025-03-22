import React from "react";
import { Helmet } from "react-helmet";

const SellerSideDetailPortion = () => {
    return (
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Refine Your Search | Seller Portal</title>
                <meta
                    name="description"
                    content="Use the Seller Portal to refine your search with categories like real estate, data science, accounting, and more."
                />
                <meta
                    property="og:title"
                    content="Refine Your Search | Seller Portal"
                />
                <meta
                    property="og:description"
                    content="Use the Seller Portal to refine your search with categories like real estate, data science, accounting, and more."
                />
                <meta
                    property="og:image"
                    content="https://example.com/path/to/your-image.jpg"
                />
                <meta property="og:url" content="https://example.com" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Refine Your Search | Seller Portal"
                />
                <meta
                    name="twitter:description"
                    content="Use the Seller Portal to refine your search with categories like real estate, data science, accounting, and more."
                />
                <meta
                    name="twitter:image"
                    content="https://example.com/path/to/your-image.jpg"
                />
            </Helmet>
            <div className="col-md-4">
                <div className="max-w-md mx-auto  bg-white  shadow-md">
                    {/* <h2 class="text-lg font-semibold mb-4 text-black">Refine your search</h2> */}
                    <div id="accordion " className="border p-2 ">
                        <div className="border-bottom ">
                            <button
                                className="d-flex justify-content-between align-items-center w-100 py-2 text-start text-black bg-white p-2 border-0"
                                onclick="toggleAccordion(event)"
                            >
                                <span className="text-muted text-refine-search">
                                    Refine Your Search
                                </span>
                                {/* <span class="fs-4">+</span> */}
                            </button>
                        </div>
                        <div className="border-bottom ">
                            <button
                                className="d-flex justify-content-between align-items-center w-100 py-2 text-start text-black bg-white p-2 border-0"
                                onclick="toggleAccordion(event)"
                            >
                                <span>Category</span>
                                <span className="fs-4">+</span>
                            </button>
                            <div className="collapse pl-4">
                                <div className="p-2  text-dark  shadow-md">
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            placeholder="Search in category"
                                            className="form-control w-100"
                                        />
                                    </div>
                                    <div className="form-check d-flex align-items-center justify-around mb-2">
                                        <input
                                            type="checkbox"
                                            id="real-estate-agent"
                                            className="form-check-input"
                                            defaultChecked=""
                                        />
                                        <label
                                            htmlFor="real-estate-agent"
                                            className="form-check-label"
                                        >
                                            {" "}
                                            Real Estate Agent (345)
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="associate-agent"
                                            className="form-check-input"
                                            defaultChecked=""
                                        />
                                        <label
                                            htmlFor="associate-agent"
                                            className="form-check-label"
                                        >
                                            Associate Agent - Independent Contractor (173)
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="rental-multifamily"
                                            className="form-check-input"
                                            defaultChecked=""
                                        />
                                        <label
                                            htmlFor="rental-multifamily"
                                            className="form-check-label"
                                        >
                                            Rental &amp; Multifamily (8)
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="title-settlement"
                                            className="form-check-input"
                                        />
                                        <label
                                            htmlFor="title-settlement"
                                            className="form-check-label"
                                        >
                                            Title &amp; Settlement (8)
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="other"
                                            className="form-check-input"
                                        />
                                        <label htmlFor="other" className="form-check-label">
                                            Other (7)
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="data-science"
                                            className="form-check-input"
                                        />
                                        <label htmlFor="data-science" className="form-check-label">
                                            Data Science &amp; Analytics (4)
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="accounting"
                                            className="form-check-input"
                                        />
                                        <label htmlFor="accounting" className="form-check-label">
                                            Accounting &amp; Finance &amp; Legal (3)
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="brokerage-support"
                                            className="form-check-input"
                                        />
                                        <label
                                            htmlFor="brokerage-support"
                                            className="form-check-label"
                                        >
                                            Real Estate Brokerage Support (3)
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom">
                            <button
                                className="d-flex justify-content-between align-items-center w-100 py-2 text-start text-black bg-white p-2 border-0"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseCountry"
                                aria-expanded="false"
                                aria-controls="collapseCountry"
                            >
                                <span>Country</span>
                                <span className="fs-4">+</span>
                            </button>
                            <div id="collapseCountry" className="collapse p-2">
                                <div className="form-check mb-2">
                                    <input
                                        type="checkbox"
                                        id="brokerage-support"
                                        className="form-check-input"
                                    />
                                    <label
                                        htmlFor="brokerage-support"
                                        className="form-check-label"
                                    >
                                        Real Estate Brokerage Support (3)
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom ">
                            <button
                                className="d-flex justify-content-between align-items-center w-100 py-2 text-start text-black bg-white p-2 border-0"
                                onclick="toggleAccordion(event)"
                            >
                                <span>State / Province</span>
                                <span className="fs-4">+</span>
                            </button>
                            <div className="collapse pl-4">
                                <div className="p-2  text-dark  shadow-md">
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            placeholder="Search in category"
                                            className="form-control w-100"
                                        />
                                    </div>
                                    <div className="form-check d-flex align-items-center justify-around mb-2">
                                        <input
                                            type="checkbox"
                                            id="real-estate-agent"
                                            className="form-check-input"
                                            defaultChecked=""
                                        />
                                        <label
                                            htmlFor="real-estate-agent"
                                            className="form-check-label"
                                        >
                                            California (76)
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="associate-agent"
                                            className="form-check-input"
                                            defaultChecked=""
                                        />
                                        <label
                                            htmlFor="associate-agent"
                                            className="form-check-label"
                                        >
                                            Washington (41)label&gt;
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="rental-multifamily"
                                            className="form-check-input"
                                            defaultChecked=""
                                        />
                                        <label
                                            htmlFor="rental-multifamily"
                                            className="form-check-label"
                                        >
                                            Illinois
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="title-settlement"
                                            className="form-check-input"
                                        />
                                        <label
                                            htmlFor="title-settlement"
                                            className="form-check-label"
                                        >
                                            Florida
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="other"
                                            className="form-check-input"
                                        />
                                        <label htmlFor="other" className="form-check-label">
                                            Texas (20)
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="data-science"
                                            className="form-check-input"
                                        />
                                        <label htmlFor="data-science" className="form-check-label">
                                            Virginia (18)
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="accounting"
                                            className="form-check-input"
                                        />
                                        <label htmlFor="accounting" className="form-check-label">
                                            Maryland (13)
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="brokerage-support"
                                            className="form-check-input"
                                        />
                                        <label
                                            htmlFor="brokerage-support"
                                            className="form-check-label"
                                        >
                                            Real Estate Brokerage Support (3)
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom ">
                            <button
                                className="d-flex justify-content-between align-items-center w-100 py-2 text-start text-black bg-white p-2 border-0"
                                onclick="toggleAccordion(event)"
                            >
                                <span>City</span>
                                <span className="fs-4">+</span>
                            </button>
                            <div className="collapse pl-4">
                                <div className="p-2  text-dark  shadow-md">
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            placeholder="Search in category"
                                            className="form-control w-100"
                                        />
                                    </div>
                                    <div className="form-check d-flex align-items-center justify-around mb-2">
                                        <input
                                            type="checkbox"
                                            id="real-estate-agent"
                                            className="form-check-input"
                                            defaultChecked=""
                                        />
                                        <label
                                            htmlFor="real-estate-agent"
                                            className="form-check-label"
                                        >
                                            California (76)
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="associate-agent"
                                            className="form-check-input"
                                            defaultChecked=""
                                        />
                                        <label
                                            htmlFor="associate-agent"
                                            className="form-check-label"
                                        >
                                            Washington (41)label&gt;
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="rental-multifamily"
                                            className="form-check-input"
                                            defaultChecked=""
                                        />
                                        <label
                                            htmlFor="rental-multifamily"
                                            className="form-check-label"
                                        >
                                            Illinois
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="title-settlement"
                                            className="form-check-input"
                                        />
                                        <label
                                            htmlFor="title-settlement"
                                            className="form-check-label"
                                        >
                                            Florida
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="other"
                                            className="form-check-input"
                                        />
                                        <label htmlFor="other" className="form-check-label">
                                            Texas (20)
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="data-science"
                                            className="form-check-input"
                                        />
                                        <label htmlFor="data-science" className="form-check-label">
                                            Virginia (18)
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="accounting"
                                            className="form-check-input"
                                        />
                                        <label htmlFor="accounting" className="form-check-label">
                                            Maryland (13)
                                        </label>
                                    </div>
                                    <div className="form-check mb-2">
                                        <input
                                            type="checkbox"
                                            id="brokerage-support"
                                            className="form-check-input"
                                        />
                                        <label
                                            htmlFor="brokerage-support"
                                            className="form-check-label"
                                        >
                                            Real Estate Brokerage Support (3)
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom">
                            <button
                                className="d-flex justify-content-between align-items-center w-100 py-2 text-start text-black bg-white p-2 border-0"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseCountry"
                                aria-expanded="false"
                                aria-controls="collapseCountry"
                            >
                                <span>Job Time</span>
                                <span className="fs-4">+</span>
                            </button>
                            <div id="collapseCountry" className="collapse p-2">
                                <div className="form-check mb-2">
                                    <input
                                        type="checkbox"
                                        id="brokerage-support"
                                        className="form-check-input"
                                    />
                                    <label
                                        htmlFor="brokerage-support"
                                        className="form-check-label"
                                    >
                                        Full Time
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom">
                            <button
                                className="d-flex justify-content-between align-items-center w-100 py-2 text-start text-black bg-white p-2 border-0"
                                onclick="toggleAccordion(event)"
                            >
                                <span>Keywords</span>
                                <span className="fs-4">+</span>
                            </button>
                            <div className="collapse pl-4">
                                <div className="mb-4 mt-2">
                                    <input
                                        type="text"
                                        placeholder="Search in category"
                                        className="form-control w-100"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n            .collapse.show {\n              display: block !important;\n\n            }\n\n            .collapse {\n              display: none;\n            }\n          "
                    }}
                />
                <div className="card p-4 mt-5 card-alert border">
                    <div className="card-body">
                        <h5 className="card-title text-start">
                            <i className="bi bi-bell" /> Create Job Alert
                        </h5>
                        <p className="text-muted text-start small">
                            NOTE: Use refine search filters above to get better job alerts
                        </p>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter email address"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="emailFrequency" className="form-label">
                                    You'll get emails
                                </label>
                                <select id="emailFrequency" className="form-select">
                                    <option selected="">Weekly</option>
                                    <option>Daily</option>
                                    <option>Monthly</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn border=0 w-100">
                                Create Job Alert
                            </button>
                        </form>
                        <a href="#" className="text-danger d-block text-center mt-3">
                            Manage Alerts
                        </a>
                    </div>
                </div>
            </div>
        </>
    )

}
export default SellerSideDetailPortion;