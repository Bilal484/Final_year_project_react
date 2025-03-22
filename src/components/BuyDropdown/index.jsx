import React from 'react'
import { Helmet } from 'react-helmet';

 const BuyDropdown = () => {
  return (
    <>
    <Helmet>
        <title>Search for Properties - Buy Apartments, Houses, and More</title>
        <meta
          name="description"
          content="Search for properties based on location and price range. Find the best real estate options in your desired location."
        />
        <meta
          name="keywords"
          content="buy apartments, search properties, real estate, location search, price range, buy house"
        />
        <meta property="og:title" content="Search for Properties - Real Estate Search" />
        <meta
          property="og:description"
          content="Search for properties based on location and price range. Find apartments, houses, and more for sale in top locations."
        />
        <meta
          property="og:image"
          content="https://via.placeholder.com/1200x630?text=Property+Search" // Placeholder image URL
        />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Search for Properties - Real Estate Search" />
        <meta
          name="twitter:description"
          content="Find the best properties for sale based on your location and price range. Start searching today."
        />
        <meta
          name="twitter:image"
          content="https://via.placeholder.com/1200x630?text=Property+Search" // Placeholder image URL
        />
      </Helmet>
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
                                    <option value={1}>$100</option>
                                    <option value={2}>$200</option>
                                    <option value={3}>$300</option>
                                </select>
                                <select className="form-select" id="priceMax">
                                    <option selected="">No max</option>
                                    <option value={1}>$500</option>
                                    <option value={2}>$1000</option>
                                    <option value={3}>$2000</option>
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
    </>
  )
}
export default BuyDropdown;