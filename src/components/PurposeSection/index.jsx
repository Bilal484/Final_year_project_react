import { FaHardHat, FaMoneyBillWave, FaUser } from "react-icons/fa";
import { MdHandyman, MdOutlineSupportAgent } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import './PurposeSection.css'; // Link the CSS

function PurposeSection() {
  const navigate = useNavigate();

  const roles = [
    { label: "Seller", icon: <FaUser />, color: "var(--color)" },
    { label: "Contractors", icon: <FaHardHat />, color: "#ffc107" },
    { label: "Resellers", icon: <MdHandyman />, color: "#6c757d" },
    { label: "Investors", icon: <FaMoneyBillWave />, color: "#198754" },
    { label: "Agents", icon: <MdOutlineSupportAgent />, color: "#dc3545" },
  ];

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="UrbanCraft REAL ESTATE connects real estate professionals by matching you with the right people based on your goals." />
        <meta name="keywords" content="real estate, networking, contractors, resellers, investors, agents, UrbanCraft REAL ESTATE" />
        <meta property="og:title" content="Connecting Real Estate Professionals Like Never Before" />
        <meta property="og:description" content="UrbanCraft REAL ESTATE simplifies real estate networking by instantly matching you with the right people based on your goals. Join now!" />
        <meta property="og:image" content="https://example.com/path-to-your-image.jpg" />
        <meta name="twitter:title" content="Connecting Real Estate Professionals Like Never Before" />
        <meta name="twitter:description" content="UrbanCraft REAL ESTATE simplifies real estate networking by instantly matching you with the right people based on your goals." />
        <meta name="twitter:image" content="https://example.com/path-to-your-image.jpg" />
        <title>Real Estate Networking | UrbanCraft REAL ESTATE</title>
      </Helmet>

      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4" style={{ color: "var(--background_color)" }}>
          Connect Based on Your Purpose
        </h2>
        <p className="text-center text-muted mb-5">
          Instantly find and connect with professionals tailored to your real estate goals.
        </p>
        <div className="d-flex justify-content-center gap-4 flex-wrap">
          {roles.map((role, index) => (
            <div className="text-center" key={index}>
              <div
                className="purpose-icon rounded-circle d-flex justify-content-center align-items-center mx-auto"
                style={{ backgroundColor: role.color, color: "white" }}
              >
                {role.icon}
              </div>
              <p className="purpose-label">{role.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default PurposeSection;
