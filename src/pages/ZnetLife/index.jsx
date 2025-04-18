import React from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/header/";
import Footer from "../../components/Footer";
import Testimonial from "../../components/Testimonial";
import StepCard from "../../components/StepCard";
import AmericanFlag from "../../assets/images/american_flag.jpg"
import { FaRegHandshake, FaUsers, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { GiPerson } from "react-icons/gi";

const CultureSection = () => {
    const cultureData = [
        {
            image: AmericanFlag,
            title: "Mission & Values",
            description: "The behaviors that will help us achieve our mission and unite our culture.",
            link: "#",
        },
        {
            image: AmericanFlag,
            title: "Diversity",
            description: "Where diverse perspectives feel at home.",
            link: "#",
        },
        {
            image: AmericanFlag,
            title: "Community Impact",
            description: "Believing in the power of people to help drive social impact.",
            link: "#",
        },
    ];

    return (
        <section className="py-5 bg-secondary-subtle">
            <div className="container">
                <h2 className="text-center mb-4">Our Culture</h2>
                <div className="row">
                    {cultureData.map((item, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card h-100">
                                <img src={item.image} className="card-img-top" alt={item.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <a href={item.link} className="text-danger fw-bold">
                                        Learn more &gt;
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ZnetLife = () => {

    const steps = [
        {
            icon: <FaUsers size={24} />,
            title: "Consultation",
            description: "Discuss your goals and needs with our experts to understand the best investment options available.",
        },
        {
            icon: <MdVerified size={24} />,
            title: "Verification",
            description: "Ensure all steps are authenticated for seamless service.",
        },
        {
            icon: <FaEnvelope size={24} />,
            title: "Connection",
            description: "Stay connected with our seamless communication channels.",
        },
    ];

    const missionSteps = [
        {
            icon: <GiPerson size={24} />,
            title: "Everyone Can Be a Leader",
            description: "At UrbanCraft REAL ESTATE, employees at all levels have a voice in the direction of the company. Our executive team lives this value at regular company meetings, where they ask for and respond to employee questions and suggestions. We bring this value to life in our day to day work when our agents and support staff influence how we build software. The Book it Now button on the UrbanCraft REAL ESTATE website? Our engineers built it alongside UrbanCraft REAL ESTATE Tour Coordinators who schedule thousands of tours each week.",
        },
        {
            icon: <FaEnvelope size={24} />,
            title: "Employee Care is Customer Care",
            description: "At UrbanCraft REAL ESTATE, we believe that taking care of our employees is the best way to take care of our customers. We offer generous paid time off for all employees, as well as stock grants, an Employee Stock Purchase plan and multiple health plan options including our new voluntary legal program, employee assistance, and wellness programs such as web-based fitness and meditation sessions.",
        },
        {
            icon: <FaMapMarkerAlt size={24} />,
            title: "The Modern Way to Work",
            description: "UrbanCraft REAL ESTATE has always taken pride in our energy-filled and collaborative office environments, and when the world changed overnight due to COVID-19, our people and technology were ready to support a remote workforce. We provide our employees the tools and support they need to work collaboratively from an office, home office or anywhere they need to be to serve a UrbanCraft REAL ESTATE customer.",
        },
    ];

    return (
        <>
            <Helmet>
                <title>UrbanCraft REAL ESTATE Life | Love Where You Work</title>
                <meta
                    name="description"
                    content="Discover the vibrant culture at UrbanCraft REAL ESTATE, our mission, values, and why employees love working here. See how we create an inclusive and innovative work environment."
                />
                <meta
                    name="keywords"
                    content="UrbanCraft REAL ESTATE Life, UrbanCraft REAL ESTATE Culture, UrbanCraft REAL ESTATE Careers, Diversity, Mission, Values, Community Impact"
                />
                <meta property="og:title" content="UrbanCraft REAL ESTATE Life | Love Where You Work" />
                <meta
                    property="og:description"
                    content="Get a glimpse of UrbanCraft REAL ESTATE's culture and what makes it a great place to work. Explore our mission, values, and community impact initiatives."
                />
                <meta
                    property="og:image"
                    content="https://api.biznetusa.com/uploads/znet-life-placeholder.jpg"
                />
                <meta property="og:url" content="https://biznetusa.com/znet-life" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="UrbanCraft REAL ESTATE Life | Love Where You Work" />
                <meta
                    name="twitter:description"
                    content="Explore why UrbanCraft REAL ESTATE is a great place to work. Learn about our mission, values, and the innovative environment we offer."
                />
                <meta
                    name="twitter:image"
                    content="https://api.biznetusa.com/uploads/znet-life-placeholder.jpg"
                />
            </Helmet>
            <Header />
            <main>
                <section className="blog-hero-section text-center text-white position-relative">
                    <div className="container py-5">
                        <h1 className="display-3 fw-bold mb-4">Love where you work</h1>
                        <p className="lead mb-4">Get a glimpse of what it's really like working at UrbanCraft REAL ESTATE</p>
                    </div>
                </section>
            </main>
            <section className="my-5 container mx-auto row text-center g-4">
                {steps.map((step, index) => (
                    <StepCard
                        key={index}
                        icon={step.icon}
                        cardsCount={3}
                        pos="start"
                        title={step.title}
                        description={step.description}
                    />
                ))}
            </section>
            <Testimonial />
            <section className="my-5 container mx-auto">
                <h2 className="text-center h2 fw-bold mb-3 text-capitalize">The mission that drives us</h2>
                <div className="row text-center g-4">
                    {missionSteps.map((step, index) => (
                        <StepCard
                            key={index}
                            icon={step.icon}
                            cardsCount={3}
                            pos="start"
                            title={step.title}
                            description={step.description}
                        />
                    ))}
                </div>
            </section>
            <section>
                <CultureSection />
            </section>
            <Footer />
        </>
    );
};

export default ZnetLife;

