import { Helmet } from "react-helmet";
const ContactCard = ({ title, content, linkText }) => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Your Company Name</title>
        <meta
          name="description"
          content="Contact us for more information on our real estate services. We provide expert advice and support for buying, selling, and renting properties."
        />
        <meta
          name="keywords"
          content="contact us, real estate, customer support, buying a home, selling a home, renting a home"
        />
        <meta property="og:title" content="Contact Us | Your Company Name" />
        <meta
          property="og:description"
          content="Get in touch with us for personalized real estate support. Our team is here to assist you with all your property needs."
        />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Your Company Name" />
        <meta
          name="twitter:description"
          content="Reach out to us for assistance with your real estate transactions. We're here to help with buying, selling, and renting properties."
        />
      </Helmet>
      <div className="col-12 col-md-4">
        <div className="p-3 card h-100 rounded shadow-sm">
          <h3 className="h5 fw-bold">{title}</h3>
          {content.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
          {linkText && (
            <a
              onClick={(e) => e.preventDefault()}
              className="text-primary"
              style={{ cursor: "pointer" }}
            >
              {linkText}
            </a>
          )}{" "}
        </div>
      </div>
    </>
  );
};

export default ContactCard;
