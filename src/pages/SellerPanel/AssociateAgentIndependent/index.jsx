import React from "react";
import { Helmet } from "react-helmet"; // Import Helmet for meta tags
import "./AssociateAgentIndependent.css";
import img1 from "../../../assets/images/img_agent_career/put_customers_first_icon-1708720081218.jpg";
import img2 from "../../../assets/images/img_agent_career/associate_agents_herobanner_mobile-1708718392489.jpg";
import img3 from "../../../assets/images/img_agent_career/diversity-customers-img-2-1704936668410.jpg";
import img4 from "../../../assets/images/img_agent_career/diversity-employees-img-2-1704936787921.jpg";
import img5 from "../../../assets/images/img_agent_career/diversity-society-img-2-1704937126815.jpg";
import img6 from "../../../assets/images/img_agent_career/get_your_license_icon-1708721395271.jpg";
import img7 from "../../../assets/images/img_agent_career/greg-rivers-rChFUMwAe7E-unsplash.jpg";
import img8 from "../../../assets/images/img_agent_career/salman-saqib-pGPAinRjNVk-unsplash.jpg";
import img9 from "../../../assets/images/img_agent_career/H1-img-1.jpg";
import img10 from "../../../assets/images/img_agent_career/H1-img-3.jpg";
import img11 from "../../../assets/images/img_agent_career/kitchen-1543486_1920.jpg";
import SellerHeader from "../../../components/SellerHeader";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const AssociateAgentIndependent = () => {
    return (
        <>
            <Helmet>
                <title>Associate Agent Role - Join UrbanCraft REAL ESTATE</title>
                <meta
                    name="description"
                    content="Earn up to Rs 120 per home tour as an Associate Agent with UrbanCraft REAL ESTATE. Work on your schedule and build your real estate career."
                />
                <meta name="keywords" content="UrbanCraft REAL ESTATE Associate Agent, real estate jobs, home tours, flexible schedule" />
                <meta name="author" content="UrbanCraft REAL ESTATE Team" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="Associate Agent Role - Join UrbanCraft REAL ESTATE" />
                <meta
                    property="og:description"
                    content="Explore the role of an Associate Agent at UrbanCraft REAL ESTATE. Flexible hours, competitive pay, and opportunities to grow your real estate career."
                />
                <meta property="og:url" content="https://yourwebsite.com/associate-agent" />
                <meta property="og:image" content="https://yourwebsite.com/path-to-image.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <Header />
            <SellerHeader />
            <div className="associate-agent">
                <section className="associate-agent-section bg-color-talent-community text-start">
                    <div className="associate-agent mb-5 ">
                        <h1 className="associate-agent-title ">
                            Earn Up to Rs 120 Per <br /> Home Tour You Host
                        </h1>
                        <h5 className="w-50 ">
                            Show homes, attend inspections, and more as an Associate Agent
                            contractor, earning competitive pay for every event. A real estate
                            license is required, and{" "}
                            <a className="text-danger" href="#">
                                we can help you get one
                            </a>
                            .
                        </h5>
                        <button className="btn  px-5 py-3 mt-5">Apply Now</button>
                    </div>
                </section>
                <section>
                    <div className="container ">
                        <h2 className="text-center pb-5">
                            Work directly with customers, on your schedule
                        </h2>
                        <div className="row pb-5">
                            <div className="col-12 col-md-3 col-lg-3 text-center">
                                <img className="w-25" src={img1} alt="img" />
                                <h4 className="pt-4">Put Customers First</h4>
                                <p>No sales pressure, only honest, local advice</p>
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 text-center">
                                <img className="w-25" src={img2} alt="img" />
                                <h4 className="pt-4">Just Be Friendly</h4>
                                <p>Others handle contracts &amp; closings</p>
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 text-center">
                                <img className="w-25" src={img3} alt="img" />
                                <h4 className="pt-4">Set Your Own Hours</h4>
                                <p>Host tours at a moment's notice, or plan a week ahead</p>
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 text-center">
                                <img className="w-25" src={img4} alt="img" />
                                <h4 className="pt-4">Keep Busy</h4>
                                <p>Plenty of customers, especially on weekends</p>
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 text-center">
                                <img className="w-25" src={img5} alt="img" />
                                <h4 className="pt-4">Grow Your Career</h4>
                                <p>Build skills, especially if you're a new agent</p>
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 text-center">
                                <img className="w-25" src={img6} alt="img" />
                                <h4 className="pt-4">Hang Your License With UrbanCraft REAL ESTATE</h4>
                                <p>
                                    Find out{" "}
                                    <a className="text-danger" href="#">
                                        how to get a license
                                    </a>
                                </p>
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 text-center">
                                <img className="w-25" src={img7} alt="img" />
                                <h4 className="pt-4">Stay Safe</h4>
                                <p>No handshakes or big groups; everyone wears masks</p>
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 text-center">
                                <img className="w-25" src={img8} alt="img" />
                                <h4 className="pt-4">Give It A Shot</h4>
                                <p>Start making money in 14 days</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-color-oap">
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6">
                                <h2 className="mb-4">Our Application Process</h2>
                                <div className="ps-3 border-dotted position-relative ms-3">
                                    {/* Step 1 */}
                                    <div className="progress-step ps-2">
                                        <span className="custome-nav-progress">1</span>
                                        <h4>Submit an Application</h4>
                                        <p>
                                            Answer a few quick questions to apply. You'll need a real
                                            estate license to work with us—
                                            <a href="#">find out how to get one here.</a>
                                        </p>
                                    </div>
                                    {/* Step 2 */}
                                    <div className="progress-step ps-2">
                                        <span className="custome-nav-progress">2</span>
                                        <h4>Interview (3–5 Business Days)</h4>
                                        <p>
                                            We'll invite you to interview if we have an opening in
                                            your area. You'll answer a few questions by video about
                                            your customer service experience and interest in real
                                            estate.
                                        </p>
                                    </div>
                                    {/* Step 3 */}
                                    <div className="progress-step ps-2">
                                        <span className="custome-nav-progress">3</span>
                                        <h4>Onboarding (1–2 Weeks)</h4>
                                        <p>
                                            We'll help you hit the ground running with an intro to
                                            UrbanCraft REAL ESTATE, home tours, and more.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 aline-item-center">
                                <img className="w-100 mt-5" src={img11} alt="" />
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container">
                        <h1 className="text-center py-5">
                            Find out more about the Associate Agent role
                        </h1>
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12 text-center">
                                {/* <div class="pb-5 ">
                          <iframe class="w-100 "Height="300"; src="https://www.youtube.com/embed/eroWCJodVa8?si=c6TWAZIx2zLD1uJN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                      </div> */}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-color-oap pb-5">
                    <div className="container">
                        <div className="row">
                            <h2 className="pt-5 text-center fw-bold">
                                More ways to work with UrbanCraft REAL ESTATE
                            </h2>
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="card">
                                    <img className="m-4" src={img9} alt="img" />
                                    <div className="card-body m-2">
                                        <h5 className="card-title">Become a UrbanCraft REAL ESTATE Lead Agent</h5>
                                        <p className="card-text">
                                            Lead Agents are UrbanCraft REAL ESTATE employees who help customers buy
                                            and sell homes. They can earn Rs 100K after their first year
                                            and get the tools and training to become top producers.
                                        </p>
                                        <a href="#" className="fw-bold">
                                            Learn More &gt;
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="card">
                                    <img className="m-4" src={img10} alt="img" />
                                    <div className="card-body m-2">
                                        <h5 className="card-title">
                                            Become a UrbanCraft REAL ESTATE Partner Agent
                                        </h5>
                                        <p className="card-text">
                                            Our partners hang their license at another brokerage but
                                            share our commitment to put customers first. There's no
                                            up-front fee to join, and they pay UrbanCraft REAL ESTATE a 30% referral
                                            fee at close.
                                        </p>
                                        <a href="#" className="fw-bold">
                                            Learn More &gt;
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-5">
                    <div className="container py-5">
                        <div className="row pb-5">
                            <div className="col-12 col-md-4 col-lg-4 px-0">
                                <div className="card px-3 bg-color-oap">
                                    <div className="card-body">
                                        <h2 className="card-title pt-4">Lead Agents</h2>
                                        <p className="card-text">
                                            Get serious customers and great support to grow your
                                            business. Earn a salary plus bonuses, with zero expenses.
                                        </p>
                                        <div>
                                            <h6 className="pt-1 fw-bold">License required?</h6>
                                            <p>Yes</p>
                                        </div>
                                    </div>
                                    <ul className="list-group list-group-flush ">
                                        <li className="list-group-item bg-transparent">
                                            <p className="fw-bold">Employment</p>
                                            <p>A UrbanCraft REAL ESTATE employee</p>
                                        </li>
                                        <li className="list-group-item bg-transparent">
                                            <h6 className="fw-bold">Responsibilities</h6>
                                            <div className="d-inline-flex">
                                                <span>
                                                    <i className="fa-solid fa-check" />
                                                </span>
                                                <p className="ps-3">
                                                    Build relationships with customers asking for tours,
                                                    listing consultations.
                                                </p>
                                            </div>
                                            <div className="d-inline-flex">
                                                <span>
                                                    <i className="fa-solid fa-check" />
                                                </span>
                                                <p className="ps-3">
                                                    Guide customers through their whole move: pricing,
                                                    negotiations, contracts, closing.
                                                </p>
                                            </div>
                                        </li>
                                        <li className="list-group-item bg-transparent">
                                            <h6 className="fw-bold">Hours</h6>
                                            <p>
                                                Whenever customers need service: days, nights, weekends.
                                            </p>
                                        </li>
                                        <li className="list-group-item bg-transparent">
                                            <h6 className="fw-bold">Experience required?</h6>
                                            <p>Sales experience preferred.</p>
                                        </li>
                                        <li className="list-group-item bg-transparent ">
                                            <h6 className="fw-bold">Pay</h6>
                                            <p>~Rs 100,000+ by second year*</p>
                                        </li>
                                    </ul>
                                    <div className="card-body text-center">
                                        <a
                                            href="#"
                                            className="card-link btn  w-100 bg-white border-0 px-5"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 px-0">
                                <div className="card px-3  mid-transform-card">
                                    <div className="card-body">
                                        <img className="w-100" src={img2} alt="img" />
                                        <h2 className="card-title pt-4">Associate Agents</h2>
                                        <p className="card-text">
                                            Show homes, attend inspections, and more as an Associate
                                            Agent contractor, earning competitive pay for every event.
                                        </p>
                                        <div>
                                            <h6 className="pt-1 fw-bold">License required?</h6>
                                            <p>Yes</p>
                                        </div>
                                    </div>
                                    <ul className="list-group list-group-flush ">
                                        <li className="list-group-item bg-transparent">
                                            <p className="fw-bold">Employment</p>
                                            <p>A UrbanCraft REAL ESTATE contractor</p>
                                        </li>
                                        <li className="list-group-item bg-transparent">
                                            <h6 className="fw-bold">Responsibilities</h6>
                                            <div className="d-inline-flex">
                                                <span>
                                                    <i className="fa-solid fa-check" />
                                                </span>
                                                <p className="ps-3">
                                                    Host home tours, open houses, inspections.
                                                </p>
                                            </div>
                                            <div className="d-inline-flex">
                                                <span>
                                                    <i className="fa-solid fa-check" />
                                                </span>
                                                <p className="ps-3">
                                                    Explain UrbanCraft REAL ESTATE, forwarding service requests to a lead
                                                    agent.
                                                </p>
                                            </div>
                                        </li>
                                        <li className="list-group-item bg-transparent">
                                            <h6 className="fw-bold">Hours</h6>
                                            <p>
                                                Totally up to you. Many tours are on evenings or
                                                weekends.
                                            </p>
                                        </li>
                                        <li className="list-group-item bg-transparent">
                                            <h6 className="fw-bold">Experience required?</h6>
                                            <p>None.</p>
                                        </li>
                                        <li className="list-group-item bg-transparent ">
                                            <h6 className="fw-bold">Pay</h6>
                                            <p>Up to Rs 120 per tour</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 px-0 ">
                                <div className="card px-3 bg-color-oap">
                                    <div className="card-body">
                                        <h2 className="card-title pt-4">Partner Agents</h2>
                                        <p className="card-text">
                                            Partner with UrbanCraft REAL ESTATE, get high-quality referrals.
                                        </p>
                                        <div>
                                            <h6 className="pt-1 fw-bold">License required?</h6>
                                            <p>Yes</p>
                                        </div>
                                    </div>
                                    <ul className="list-group list-group-flush ">
                                        <li className="list-group-item bg-transparent">
                                            <p className="fw-bold">Employment</p>
                                            <p>Licensed at another brokerage</p>
                                        </li>
                                        <li className="list-group-item bg-transparent">
                                            <h6 className="fw-bold">Responsibilities</h6>
                                            <div className="d-inline-flex">
                                                <span>
                                                    <i className="fa-solid fa-check" />
                                                </span>
                                                <p className="ps-3">
                                                    Respond to customers within five minutes of getting a
                                                    service request.
                                                </p>
                                            </div>
                                            <div className="d-inline-flex">
                                                <span>
                                                    <i className="fa-solid fa-check" />
                                                </span>
                                                <p className="ps-3">
                                                    Take full responsibility for each customer's success,
                                                    with no further UrbanCraft REAL ESTATE guidance.
                                                </p>
                                            </div>
                                        </li>
                                        <li className="list-group-item bg-transparent">
                                            <h6 className="fw-bold">Hours</h6>
                                            <p>
                                                Whenever customers need service: days, nights, weekends.
                                            </p>
                                        </li>
                                        <li className="list-group-item bg-transparent">
                                            <h6 className="fw-bold">Experience required?</h6>
                                            <p>
                                                5+ home sales in the last 12 months. UrbanCraft REAL ESTATE will ask
                                                those customers for reviews.
                                            </p>
                                        </li>
                                        <li className="list-group-item bg-transparent ">
                                            <h6 className="fw-bold">Pay</h6>
                                            <p>30% referral fee paid to UrbanCraft REAL ESTATE</p>
                                        </li>
                                    </ul>
                                    <div className="card-body text-center">
                                        <a href="#" className="card-link btn w-100 bg-white px-5">
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center pt-5">
                            *Average based on all UrbanCraft REAL ESTATE lead agents who worked 12 months in
                            2019. Individual results may vary based on location and other
                            factors.
                        </p>
                    </div>
                </section>
                <section className="discover-ba-section ">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-8 col-lg- py-5">
                                <h3 className="text-white">
                                    Discover UrbanCraft REAL ESTATE's Agent Resource Center to find articles for
                                    aspiring agents and real estate professionals.
                                </h3>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 text-end ">
                                <a
                                    className="btn px-5 py-3 bg-danger text-white text-end mt-5"
                                    href="#"
                                >
                                    Go to Resource Center
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container py-5">
                        <div className="row text-center">
                            <h1>Our commitment to diversity</h1>
                            <h5>
                                A diverse, inclusive culture is vital to our mission of making
                                real estate better for regular people from all walks of life.*
                            </h5>
                            <p>*UrbanCraft REAL ESTATE is an equal opportunity employer</p>
                            <div className="col-12 col-md-4 col-lg-4">
                                <img className="text-center w-25" src={img2} alt="img" />
                                <h5>To customers</h5>
                                <p>
                                    We have a special commitment to empower first-time homebuyers
                                </p>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4">
                                <img
                                    className="text-center w-25"
                                    src="assets/images/img_agent_career/diversity-employees-img-2-1704936787921.jpg"
                                    alt="img"
                                />
                                <h5>To employees</h5>
                                <p>
                                    Social justice starts at work, with pay transparency and
                                    inclusive management
                                </p>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4">
                                <img className="text-center w-25" src={img2} alt="img" />
                                <h5>To society</h5>
                                <p>
                                    <a className="text-danger" href="#">
                                        Year after year
                                    </a>
                                    , we speak out for integrated neighborhoods and eager service
                                    to all
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-color-oap py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12 text-center py-5 ">
                                <h1>Let's get started</h1>
                                <p>
                                    Ready to learn more about contracting with us? Fill out our
                                    quick application, <br /> and we'll contact you about next
                                    steps and availability in your area.
                                </p>
                                <a
                                    className="btn px-4 py-3 bg-white text-danger border  border-danger"
                                    href="#"
                                >
                                    Apply Now
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};
export default AssociateAgentIndependent;
