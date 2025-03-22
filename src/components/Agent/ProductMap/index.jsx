import React from "react";
import { Helmet } from "react-helmet";

const ProductMap = () => {
  return (
    <>
     <Helmet>
        <title>Location Map - View Our Property Location</title>
        <meta
          name="description"
          content="View the location of our property on the map. Explore the surroundings and find directions easily."
        />
        <meta
          name="keywords"
          content="property location, real estate map, property directions, view map"
        />
        <meta property="og:title" content="Location Map - View Our Property Location" />
        <meta
          property="og:description"
          content="Explore the location of our property through this interactive map. Get directions and see nearby amenities."
        />
        <meta
          property="og:image"
          content="https://via.placeholder.com/1200x630?text=Property+Location+Map"
        />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Location Map - View Our Property Location" />
        <meta
          name="twitter:description"
          content="Check out our property location and nearby areas on the map. Find the best route to our property."
        />
        <meta
          name="twitter:image"
          content="https://via.placeholder.com/1200x630?text=Property+Location+Map"
        />
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <iframe
              className="map_imtegrate"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14042.045651016564!2d70.41938789999999!3d28.3736176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1727085737551!5m2!1sen!2s"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductMap;
