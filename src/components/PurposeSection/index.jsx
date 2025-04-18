import { FaHardHat, FaMoneyBillWave, FaUser } from "react-icons/fa";
import { MdHandyman, MdOutlineSupportAgent } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

function PurposeSection() {
    const navigate = useNavigate();

    return (
        <>
         <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="UrbanCraft REAL ESTATE connects real estate professionals by matching you with the right people based on your goals. Whether you're buying, selling, or investing, collaborate and succeed." />
                <meta name="keywords" content="real estate, networking, contractors, resellers, investors, agents, UrbanCraft REAL ESTATE" />
                <meta property="og:title" content="Connecting Real Estate Professionals Like Never Before" />
                <meta property="og:description" content="UrbanCraft REAL ESTATE simplifies real estate networking by instantly matching you with the right people based on your goals. Join now!" />
                <meta property="og:image" content="https://example.com/path-to-your-image.jpg" />
                <meta property="og:image:alt" content="Real Estate Networking" />
                <meta name="twitter:title" content="Connecting Real Estate Professionals Like Never Before" />
                <meta name="twitter:description" content="UrbanCraft REAL ESTATE simplifies real estate networking by instantly matching you with the right people based on your goals." />
                <meta name="twitter:image" content="https://example.com/path-to-your-image.jpg" />
                <title>Real Estate Networking | UrbanCraft REAL ESTATE</title>
            </Helmet>
        <section className="container py-5">
            <h3 className="text-center fw-bold mb-3" style={{ fontSize: "2.5rem" }}>
                Connecting Real Estate Professionals Like Never Before
            </h3>
            <p className="text-center fs-5 text-muted mb-5">
                UrbanCraft REAL ESTATE simplifies real estate networking by instantly matching you with the right people based on your goals.
                Whether you’re buying, selling, or investing, UrbanCraft REAL ESTATE makes it easy to connect, collaborate, and succeed.
            </p>

            <div className="btn-grp d-flex justify-content-center mb-5 gap-3">
                <button
                    className="btn btn-primary "
                    style={{ width: "150px" }}
                    onClick={() => navigate('/SignUp')}
                >
                    Sign Up
                </button>
                <button
                    className="btn btn-secondary "
                    style={{ width: "150px" }}
                    onClick={() => navigate('/About')}
                >
                    Learn More
                </button>
            </div>
            <div className="d-flex justify-content-center gap-5 align-items-center flex-wrap">
                <div className="text-center">
                    <div
                        className="icon-container bg-primary text-white rounded-circle d-flex justify-content-center align-items-center mx-auto"
                        style={{ width: "80px", height: "80px" }}>
                        <FaUser size={35} />
                    </div>
                    <p className="mt-3 fw-semibold">Seller</p>
                </div>
                <div className="text-center">
                    <div
                        className="icon-container bg-warning text-white rounded-circle d-flex justify-content-center align-items-center mx-auto"
                        style={{ width: "80px", height: "80px" }}>
                        <FaHardHat size={35} />
                    </div>
                    <p className="mt-3 fw-semibold">Contractors</p>
                </div>
                <div className="text-center">
                    <div
                        className="icon-container bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center mx-auto"
                        style={{ width: "80px", height: "80px" }}>
                        <MdHandyman size={35} />
                    </div>
                    <p className="mt-3 fw-semibold">Resellers</p>
                </div>
                <div className="text-center">
                    <div
                        className="icon-container bg-success text-white rounded-circle d-flex justify-content-center align-items-center mx-auto"
                        style={{ width: "80px", height: "80px" }}>
                        <FaMoneyBillWave size={35} />
                    </div>
                    <p className="mt-3 fw-semibold">Investors</p>
                </div>
                <div className="text-center">
                    <div
                        className="icon-container bg-danger text-white rounded-circle d-flex justify-content-center align-items-center mx-auto"
                        style={{ width: "80px", height: "80px" }}>
                        <MdOutlineSupportAgent size={35} />
                    </div>
                    <p className="mt-3 fw-semibold">Agents</p>
                </div>
            </div>
        </section>
        </>
    );
}

export default PurposeSection;

