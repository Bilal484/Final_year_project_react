import React from 'react';
import { Helmet } from 'react-helmet';

const PropertyCard = ({ id, price, images, beds, baths, area, address, description, title }) => {
    const firstImage = images && images.length > 0 ? images[0] : 'https://via.placeholder.com/400x300?text=No+Image+Available';

    return (
        <>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content={description || "Property details and listing"} />
                <meta name="keywords" content="real estate, property listing, homes for sale, house for rent" />
                <meta property="og:title" content={title || "Property Listing"} />
                <meta property="og:description" content={description || "Explore this property listing."} />
                <meta property="og:image" content={firstImage} />
                <meta property="og:image:alt" content={`Image of property ${title || "Listing"}`} />
                <meta name="twitter:title" content={title || "Property Listing"} />
                <meta name="twitter:description" content={description || "Explore this property listing."} />
                <meta name="twitter:image" content={firstImage} />
                <title>{title || "Property Listing"}</title>
            </Helmet>

            <div className="col-sm-6 col-lg-4 mb-4 Main_portion">
            <a
  className="text-decoration-none text-dark"
  onClick={(e) => e.preventDefault()}
  style={{ cursor: 'pointer' }}
>                    <div className="card">
                        {/* Start of Carousel */}
                        <div id={`carouselProperty${id}`} className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {images.map((img, index) => (
                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                        <img src={img} alt={`Property ${id}`} className="d-block w-100" />
                                    </div>
                                ))}
                            </div>
                            {/* Carousel controls */}
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target={`#carouselProperty${id}`}
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target={`#carouselProperty${id}`}
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        {/* End of Carousel */}

                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h3 className="h5 fw-bold">${price}</h3>
                                <div>
                                    <i className="fa-solid fa-share"></i>
                                    <i className="fa-regular fa-heart ms-2"></i>
                                </div>
                            </div>
                            <p className="mb-1 small">{beds} beds | {baths} baths | {area} sq ft</p>
                            <p className="small">{address}</p>
                        </div>
                    </div>
                </a>
            </div>
        </>
    );
};

export default PropertyCard;
