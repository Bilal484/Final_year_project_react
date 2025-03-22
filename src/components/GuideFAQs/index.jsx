import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import img1 from "../../assets/images/guide 01.jpg"
import img2 from "../../assets/images/guide 02.jpg"
import img3 from "../../assets/images/guide 03.jpg"
import img4 from "../../assets/images/guide 04.jpg"
import img5 from "../../assets/images/guide 05.jpg"
import img6 from "../../assets/images/guide 01.jpg"
import img7 from "../../assets/images/guide 02.jpg"
import img8 from "../../assets/images/guide 03.jpg"
import img9 from "../../assets/images/guide 04.jpg"
import img10 from "../../assets/images/guide 05.jpg"
// import './Guides.css'

// FAQs Component
const GuideFAQs = () => {


    return (
        <>
         <Helmet>
                <title>Step-by-Step Real Estate Buying & Selling Guide</title>
                <meta
                    name="description"
                    content="Discover step-by-step guides for buying, selling, and renting real estate. Expert advice tailored for smooth real estate transactions."
                />
                <meta name="keywords" content="real estate guide, buying guide, selling guide, renting guide, real estate FAQs" />
                <meta name="author" content="Your Company Name" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>
        <div className="guide-page-main">
            <div className="Guides-page d-flex justify-content-center align-items-center text-light">
                <h1>Step-by-Step Real Estate Buying &amp; Selling Guide</h1>
            </div>
            <div className="container my-5  faq-page">
                <h2 className="text-center" />
                <ul
                    className="nav nav-tabs border-0 justify-content-center my-4"
                    id="faqTabs"
                    role="tablist"
                >
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link ms-4 active"
                            id="selling-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#selling"
                            type="button"
                            role="tab"
                            aria-controls="selling"
                            aria-selected="true"
                        >
                            Sell Guides
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link ms-4"
                            id="renting-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#renting"
                            type="button"
                            role="tab"
                            aria-controls="renting"
                            aria-selected="false"
                        >
                            Rent Guides
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link ms-4"
                            id="other-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#other"
                            type="button"
                            role="tab"
                            aria-controls="other"
                            aria-selected="false"
                        >
                            Other Guides
                        </button>
                    </li>
                </ul>
                <div className="tab-content" id="faqTabsContent">
                    <div
                        className="tab-pane fade show active"
                        id="selling"
                        role="tabpanel"
                        aria-labelledby="selling-tab"
                    >
                        <section className="sell-guides container mt-5">
                            {/* Bootstrap Accordion */}
                            <div className="accordion" id="sellGuidesAccordion">
                                {/* Guide 1 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            1. Preparing Your Home for Sale
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#sellGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Clean, declutter, and repair any visible issues to make your
                                            home appealing to potential buyers. Consider staging to show
                                            off the home’s full potential.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 2 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="collapseTwo"
                                        >
                                            2. Pricing Your Property Correctly
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseTwo"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingTwo"
                                        data-bs-parent="#sellGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Research market conditions, analyze local sale trends, and
                                            work with a real estate agent to set a competitive yet fair
                                            price for your property.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 3 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree"
                                            aria-expanded="false"
                                            aria-controls="collapseThree"
                                        >
                                            3. Marketing Your Property Effectively
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseThree"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingThree"
                                        data-bs-parent="#sellGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Use online listings, professional photography, social media,
                                            and traditional methods like open houses to reach a wide
                                            audience of potential buyers.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 4 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFour"
                                            aria-expanded="false"
                                            aria-controls="collapseFour"
                                        >
                                            4. Legal Considerations &amp; Documentation
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseFour"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingFour"
                                        data-bs-parent="#sellGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Understand the legal requirements involved in selling a
                                            property. Have necessary documents like the deed, title, and
                                            seller’s disclosures ready to ensure a smooth transaction.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 5 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFive">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFive"
                                            aria-expanded="false"
                                            aria-controls="collapseFive"
                                        >
                                            5. Working with a Real Estate Agent
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseFive"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingFive"
                                        data-bs-parent="#sellGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            A professional agent can help you price, market, and sell your
                                            home faster. Choose an agent with local expertise and a good
                                            track record of successful sales.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 6 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingSix">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSix"
                                            aria-expanded="false"
                                            aria-controls="collapseSix"
                                        >
                                            6. Negotiating Offers &amp; Closing the Sale
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseSix"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingSix"
                                        data-bs-parent="#sellGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Review offers carefully and negotiate the best deal for your
                                            property. After accepting an offer, work through the closing
                                            process, including final paperwork and transferring ownership.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 7 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingSeven">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSeven"
                                            aria-expanded="false"
                                            aria-controls="collapseSeven"
                                        >
                                            7. Handling Post-Sale Responsibilities
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseSeven"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingSeven"
                                        data-bs-parent="#sellGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Ensure that all final inspections, repairs, and outstanding
                                            bills are settled. Consider a post-sale inspection to assure
                                            the new owners and maintain a good relationship.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="sell-guides-highlight container mt-5">
                            <h1 className="section-title text-center my-4">
                                Selling Guides Highlights
                            </h1>
                            {/* Section 1 */}
                            <div className="row my-4">
                                <div className="col-md-6">
                                    <img
                                        src={img1}
                                        className="img-fluid"
                                        alt="Preparing Your Home for Sale"
                                    />
                                </div>
                                <div className="col-md-6 my-auto">
                                    <h3>Preparing Your Home for Sale</h3>
                                    <p>
                                        Clean, declutter, and stage your home to make it more appealing
                                        to potential buyers.
                                    </p>
                                </div>
                            </div>
                            {/* Section 2 */}
                            <div className="row my-4">
                                <div className="col-md-6 my-auto">
                                    <h3>Pricing Your Property Correctly</h3>
                                    <p>
                                        Research local market trends to set a competitive and fair price
                                        for your property.
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <img
                                        src={img2}
                                        className="img-fluid"
                                        alt="Pricing Your Property Correctly"
                                    />
                                </div>
                            </div>
                            {/* Section 3 */}
                            <div className="row my-4">
                                <div className="col-md-6">
                                    <img
                                        src={img3}
                                        className="img-fluid"
                                        alt="Marketing Your Property Effectively"
                                    />
                                </div>
                                <div className="col-md-6 my-auto">
                                    <h3>Marketing Your Property Effectively</h3>
                                    <p>
                                        Utilize online listings and social media to reach a broad
                                        audience of potential buyers.
                                    </p>
                                </div>
                            </div>
                            {/* Section 4 */}
                            <div className="row my-4">
                                <div className="col-md-6 my-auto">
                                    <h3>Legal Considerations &amp; Documentation</h3>
                                    <p>
                                        Be aware of legal requirements and prepare necessary documents
                                        for a smooth transaction.
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <img
                                        src={img4}
                                        className="img-fluid"
                                        alt="Legal Considerations & Documentation"
                                    />
                                </div>
                            </div>
                            {/* Section 5 */}
                            <div className="row my-4">
                                <div className="col-md-6">
                                    <img
                                        src={img5}
                                        className="img-fluid"
                                        alt="Working with a Real Estate Agent"
                                    />
                                </div>
                                <div className="col-md-6 my-auto">
                                    <h3>Working with a Real Estate Agent</h3>
                                    <p>
                                        A qualified agent can help you navigate the selling process more
                                        efficiently.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="renting"
                        role="tabpanel"
                        aria-labelledby="renting-tab"
                    >
                        <section className="rent-guides container mt-5">
                            {/* Bootstrap Accordion */}
                            <div className="accordion" id="rentGuidesAccordion">
                                {/* Guide 1 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOneRent"
                                            aria-expanded="true"
                                            aria-controls="collapseOneRent"
                                        >
                                            1. Preparing Your Property for Rent
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOneRent"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#rentGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Ensure the property is clean, safe, and meets local housing
                                            regulations. Consider making small upgrades or repairs to
                                            attract better tenants.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 2 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwoRent"
                                            aria-expanded="false"
                                            aria-controls="collapseTwoRent"
                                        >
                                            2. Setting the Right Rental Price
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseTwoRent"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingTwo"
                                        data-bs-parent="#rentGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Research local rental market trends and consider the
                                            property's location, size, and condition when determining the
                                            rental price.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 3 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThreeRent"
                                            aria-expanded="false"
                                            aria-controls="collapseThreeRent"
                                        >
                                            3. Advertising Your Rental Property
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseThreeRent"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingThree"
                                        data-bs-parent="#rentGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Use popular rental platforms, social media, and local listings
                                            to attract potential tenants. High-quality photos and detailed
                                            descriptions can make a big difference.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 4 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFourRent"
                                            aria-expanded="false"
                                            aria-controls="collapseFourRent"
                                        >
                                            4. Screening Potential Tenants
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseFourRent"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingFour"
                                        data-bs-parent="#rentGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Conduct thorough background checks, including credit and
                                            rental history, to ensure reliable tenants. Interviewing
                                            applicants helps assess their suitability.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 5 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFive">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFiveRent"
                                            aria-expanded="false"
                                            aria-controls="collapseFiveRent"
                                        >
                                            5. Understanding Lease Agreements
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseFiveRent"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingFive"
                                        data-bs-parent="#rentGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Draft a clear and comprehensive lease agreement outlining rent
                                            terms, property rules, and tenant responsibilities. Consult
                                            legal advice to ensure compliance with local laws.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 6 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingSix">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSixRent"
                                            aria-expanded="false"
                                            aria-controls="collapseSixRent"
                                        >
                                            6. Managing Tenant Relations
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseSixRent"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingSix"
                                        data-bs-parent="#rentGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Establish open communication with tenants and respond promptly
                                            to maintenance issues to foster a good landlord-tenant
                                            relationship.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 7 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingSeven">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSevenRent"
                                            aria-expanded="false"
                                            aria-controls="collapseSevenRent"
                                        >
                                            7. Handling Evictions &amp; Legal Issues
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseSevenRent"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingSeven"
                                        data-bs-parent="#rentGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Understand the legal process for evictions and dispute
                                            resolution. Follow legal guidelines and seek professional
                                            advice if needed to avoid legal complications.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="rent-guides-highlight container mt-5">
                            <h1 className="section-title text-center my-4">
                                Renting Guides Highlights
                            </h1>
                            {/* Section 1 */}
                            <div className="row my-4">
                                <div className="col-md-6">
                                    <img
                                        src={img6}
                                        className="img-fluid"
                                        alt="Preparing Your Property for Rent"
                                    />
                                </div>
                                <div className="col-md-6 my-auto">
                                    <h3>Preparing Your Property for Rent</h3>
                                    <p>
                                        Ensure the property is clean, safe, and meets local housing
                                        regulations to attract good tenants.
                                    </p>
                                </div>
                            </div>
                            {/* Section 2 */}
                            <div className="row my-4">
                                <div className="col-md-6 my-auto">
                                    <h3>Setting the Right Rental Price</h3>
                                    <p>
                                        Research local rental market trends to determine a competitive
                                        price for your property.
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <img
                                        src={img7}
                                        className="img-fluid"
                                        alt="Setting the Right Rental Price"
                                    />
                                </div>
                            </div>
                            {/* Section 3 */}
                            <div className="row my-4">
                                <div className="col-md-6">
                                    <img
                                        src={img8}
                                        className="img-fluid"
                                        alt="Advertising Your Rental Property"
                                    />
                                </div>
                                <div className="col-md-6 my-auto">
                                    <h3>Advertising Your Rental Property</h3>
                                    <p>
                                        Use popular rental platforms and social media to attract
                                        potential tenants with great photos and descriptions.
                                    </p>
                                </div>
                            </div>
                            {/* Section 4 */}
                            <div className="row my-4">
                                <div className="col-md-6 my-auto">
                                    <h3>Screening Potential Tenants</h3>
                                    <p>
                                        Conduct thorough background checks and interviews to ensure
                                        reliable tenants.
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <img
                                        src={img9}
                                        className="img-fluid"
                                        alt="Screening Potential Tenants"
                                    />
                                </div>
                            </div>
                            {/* Section 5 */}
                            <div className="row my-4">
                                <div className="col-md-6">
                                    <img
                                        src={img10}
                                        className="img-fluid"
                                        alt="Understanding Lease Agreements"
                                    />
                                </div>
                                <div className="col-md-6 my-auto">
                                    <h3>Understanding Lease Agreements</h3>
                                    <p>
                                        Draft a comprehensive lease agreement outlining terms, rules,
                                        and responsibilities to ensure clarity.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="other"
                        role="tabpanel"
                        aria-labelledby="other-tab"
                    >
                        <section className="other-guides container mt-5">
                            {/* Bootstrap Accordion */}
                            <div className="accordion" id="otherGuidesAccordion">
                                {/* Guide 1 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOneOther">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOneOther"
                                            aria-expanded="true"
                                            aria-controls="collapseOneOther"
                                        >
                                            1. Understanding Homeowner's Insurance
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOneOther"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="headingOneOther"
                                        data-bs-parent="#otherGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Learn about the different types of homeowner's insurance
                                            policies and what coverage you need to protect your property
                                            from various risks.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 2 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwoOther">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwoOther"
                                            aria-expanded="false"
                                            aria-controls="collapseTwoOther"
                                        >
                                            2. Moving Tips &amp; Checklist
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseTwoOther"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingTwoOther"
                                        data-bs-parent="#otherGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            From packing to coordinating movers, use this comprehensive
                                            checklist to make your moving process as smooth and
                                            stress-free as possible.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 3 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThreeOther">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThreeOther"
                                            aria-expanded="false"
                                            aria-controls="collapseThreeOther"
                                        >
                                            3. Financing Options for Home Renovations
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseThreeOther"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingThreeOther"
                                        data-bs-parent="#otherGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Explore various financing options, including home equity loans
                                            and lines of credit, to fund your home improvement projects.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 4 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFourOther">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFourOther"
                                            aria-expanded="false"
                                            aria-controls="collapseFourOther"
                                        >
                                            4. Understanding Property Taxes
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseFourOther"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingFourOther"
                                        data-bs-parent="#otherGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Learn how property taxes are calculated, when they are due,
                                            and how you can appeal property tax assessments if necessary.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 5 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFiveOther">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFiveOther"
                                            aria-expanded="false"
                                            aria-controls="collapseFiveOther"
                                        >
                                            5. Energy Efficiency Upgrades for Your Home
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseFiveOther"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingFiveOther"
                                        data-bs-parent="#otherGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Discover the most effective energy-saving upgrades for your
                                            home, from insulation to solar panels, and learn how these
                                            improvements can lower your utility bills.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 6 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingSixOther">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSixOther"
                                            aria-expanded="false"
                                            aria-controls="collapseSixOther"
                                        >
                                            6. Maintaining Your Home Year-Round
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseSixOther"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingSixOther"
                                        data-bs-parent="#otherGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Follow these seasonal home maintenance tips to keep your
                                            property in top condition and prevent costly repairs down the
                                            road.
                                        </div>
                                    </div>
                                </div>
                                {/* Guide 7 */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingSevenOther">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSevenOther"
                                            aria-expanded="false"
                                            aria-controls="collapseSevenOther"
                                        >
                                            7. Renovating for Resale: What Adds the Most Value
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseSevenOther"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingSevenOther"
                                        data-bs-parent="#otherGuidesAccordion"
                                    >
                                        <div className="accordion-body">
                                            Find out which home renovations provide the highest return on
                                            investment when it comes time to sell your property.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
               
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default GuideFAQs;
