import React from 'react';
import rentImage from '../../assets/images/rent_main_1.png'; 
import { Helmet } from 'react-helmet';

const RentalInfo = () => {
    return (
        <>
        <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta
                    name="description"
                    content="Find your perfect rental property with our search tools. Filter by budget, location, pet policy, and more. Compare your favorites and take the next step in renting."
                />
                <meta
                    name="keywords"
                    content="rental properties, apartments for rent, condos, homes for rent, rental search, apartment search"
                />
                <meta
                    property="og:title"
                    content="Find Your Perfect Rental Property"
                />
                <meta
                    property="og:description"
                    content="Use our tools to search smarter and find the rental property you’ll love. Compare favorites and take the next step in securing your new home."
                />
                <meta
                    property="og:image"
                    content={rentImage} // Replace with the path to your actual image
                />
                <meta property="og:image:alt" content="Rental property image" />
                <meta name="twitter:title" content="Find Your Perfect Rental Property" />
                <meta
                    name="twitter:description"
                    content="Search and find the rental you’ll love. Filter, compare, and take the next step in securing your new home."
                />
                <meta
                    name="twitter:image"
                    content={rentImage} // Replace with the path to your actual image
                />
                <title>Find Your Perfect Rental Property</title>
            </Helmet>

        <div className="row g-0 bg-light">
            <div className="col-lg-6">
                <div className="p-4 text-dark">
                    <div className="container">
                        <h2 className="fw-bold mb-4">
                            Everything you need to find the rental you’ll love
                        </h2>
                        <p className="mb-5">
                            Your perfect home, apartment, or condo is out there. We’ll help you find it.
                        </p>
                        <h3 className="fw-semibold mt-4">Search smarter</h3>
                        <p className="mb-4">
                            Filter by budget, location, pet policy, and more to find exactly what you’re looking for.
                        </p>
                        <h2 className="h3 fw-semibold mt-4">Compare your favorites</h2>
                        <p className="mb-4">
                            Check out photos, review floor plans, or take a 3D tour to narrow down your top choices.
                        </p>
                        <h2 className="h3 fw-semibold mt-4">Take the next step</h2>
                        <p>
                            Connect with property managers to schedule a tour, ask questions, or request an application.
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <img src={rentImage} className="img-fluid" alt="Rental" />
            </div>
        </div>
        </>
    );
};

export default RentalInfo;
