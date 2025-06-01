import React from 'react';
import { Helmet } from 'react-helmet';
import ImagewithText from "../../../components/ImagewithText";
import img from "../../../assets/images/blog 02.jpg";
import PropertyCard from "../../../components/PropertyCard";
import Header from '../../../components/header';
import Footer from '../../../components/Footer';
import img1 from "../../../assets/images/blog 01.jpg";
import { Link } from 'react-router-dom';

const Buy = () => {
    // Sample data for the properties
    const properties = [
        {
            id: 1,
            price: 850000,
            images: [img], // Passing at least one image
            beds: 4,
            baths: 4.5,
            area: 2378,
            address: '36 Beach Side Dr Unit 36AP, Los Angeles, CA'
        },
        {
            id: 2,
            price: 950000,
            images: [img1], // Passing at least one image
            beds: 3,
            baths: 3.5,
            area: 2000,
            address: '123 Main St, Los Angeles, CA'
        },
        {
            id: 3,
            price: 950000,
            images: [img1], // Passing at least one image
            beds: 3,
            baths: 3.5,
            area: 2000,
            address: '123 Main St, Los Angeles, CA'
        },
        {
            id: 4,
            price: 950000,
            images: [img1], // Passing at least one image
            beds: 3,
            baths: 3.5,
            area: 2000,
            address: '123 Main St, Los Angeles, CA'
        },
        {
            id: 5,
            price: 950000,
            images: [img1], // Passing at least one image
            beds: 3,
            baths: 3.5,
            area: 2000,
            address: '123 Main St, Los Angeles, CA'
        },
        {
            id: 6,
            price: 950000,
            images: [img1], // Passing at least one image
            beds: 3,
            baths: 3.5,
            area: 2000,
            address: '123 Main St, Los Angeles, CA'
        }
    ];

    return (
        <>
            <Helmet>
                <title>Buy Real Estate | UrbanCraft REAL ESTATE</title>
                <meta name="description" content="Explore a wide range of properties for sale near you with URBANCRAFT REAL ESTATE. Find your dream home with us today!" />
                <meta name="keywords" content="buy real estate, properties for sale, UrbanCraft REAL ESTATE, Los Angeles homes, find homes" />
                <meta property="og:title" content="Buy Real Estate | UrbanCraft REAL ESTATE" />
                <meta property="og:description" content="Discover properties for sale near you with UrbanCraft REAL ESTATE. Find houses, apartments, and more in Los Angeles and beyond." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="/path/to/image.jpg" />  {/* Replace with an actual image URL */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Buy Real Estate | UrbanCraft REAL ESTATE" />
                <meta name="twitter:description" content="Explore properties for sale near you with UrbanCraft REAL ESTATE. Start your home buying journey today!" />
                <meta name="twitter:image" content="/path/to/image.jpg" />  {/* Replace with an actual image URL */}
            </Helmet>

            <Header />
            <main>
                <div className="container my-4">
                    <h3></h3>
                    <div className="row align-items-center">
                        <ImagewithText
                            title="Houses for sale near me"
                            content="Find houses for sale near you. View photos, open house information,
                                and property details for nearby real estate."
                            imgSrc={img}
                        />
                    </div>
                </div>
                <div className="container mt-5">
                    <form className="row g-2 align-items-center">
                        <div className="col-md-4">
                            <label htmlFor="location" className="form-label">
                                Location
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="location"
                                placeholder="Los Angeles"
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="priceRange" className="form-label">
                                Price range
                            </label>
                            <div className="d-flex">
                                <select className="form-select me-2" id="priceMin">
                                    <option selected="">No min</option>
                                    <option value={1}>RS 100</option>
                                    <option value={2}>RS 200</option>
                                    <option value={3}>RS 300</option>
                                </select>
                                <select className="form-select" id="priceMax">
                                    <option selected="">No max</option>
                                    <option value={1}>RS 500</option>
                                    <option value={2}>RS 1000</option>
                                    <option value={3}>RS 2000</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button type="submit" className="btn btn-danger w-100 mt-4">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                <div className="buy-portion">
                    <div className="cards-sections my-4">
                        {/* Los Angeles houses for sale */}
                        <div className="container los-angeles mb-5">
                            <h3>Los Angeles houses for sale</h3>
                            <div className="row mt-4 d-flex flex-row">
                                {properties.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        id={property.id}
                                        price={property.price}
                                        images={property.images}
                                        beds={property.beds}
                                        baths={property.baths}
                                        area={property.area}
                                        address={property.address}
                                    />
                                ))}
                            </div>
                            <Link
                                onClick={(e) => e.preventDefault()}
                                style={{ cursor: 'pointer', textDecoration: 'none' }}
                            >
                                See all 8440 Los Angeles houses for sale
                            </Link>

                        </div>
                        <hr />
                        {/* More property sections can be added similarly */}
                        <div className="container los-angeles mb-5">
                            <h3>Houses for sale</h3>
                            <div className="row mt-4 d-flex flex-row">
                                {properties.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        id={property.id}
                                        price={property.price}
                                        images={property.images}
                                        beds={property.beds}
                                        baths={property.baths}
                                        area={property.area}
                                        address={property.address}
                                    />
                                ))}
                            </div>
                            <Link
                                onClick={(e) => e.preventDefault()}
                                style={{ cursor: 'pointer', textDecoration: 'none' }}
                                className="text-primary"
                            >
                                See all 8440 Los Angeles houses for sale
                            </Link>

                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Buy;
