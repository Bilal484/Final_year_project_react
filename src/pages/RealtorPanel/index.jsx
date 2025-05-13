import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const RealtorPanel = () => {
  // State for listings
  const [listings, setListings] = useState([
    { id: 1, address: "123 Elm Street", price: "$500,000" },
    { id: 2, address: "456 Maple Avenue", price: "$750,000" },
  ]);

  // State for new listing form inputs
  const [newListing, setNewListing] = useState({
    id: "",
    address: "",
    price: "",
  });

  // State for coordination message
  const [coordinationMessage, setCoordinationMessage] = useState("");

  // State for coordination entries
  const [coordinationEntries, setCoordinationEntries] = useState([]);

  // Handle input change for adding new listings
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewListing((prevListing) => ({
      ...prevListing,
      [name]: value,
    }));
  };

  // Save new listing
  const saveListing = () => {
    if (newListing.id && newListing.address && newListing.price) {
      setListings([...listings, newListing]);
      setNewListing({ id: "", address: "", price: "" });
    } else {
      alert("Please fill out all fields.");
    }
  };

  // Edit existing listing
  const editListing = (id) => {
    const listing = listings.find((l) => l.id === id);
    if (listing) {
      const newPrice = prompt(
        `Enter new price for ${listing.address}`,
        listing.price
      );
      if (newPrice) {
        setListings(
          listings.map((l) => (l.id === id ? { ...l, price: newPrice } : l))
        );
      }
    }
  };

  // Delete existing listing
  const deleteListing = (id) => {
    setListings(listings.filter((listing) => listing.id !== id));
  };

  // Handle coordination form submission
  const coordinate = (e) => {
    e.preventDefault();
    const agentName = e.target.agentName.value;
    const buyerName = e.target.buyerName.value;
    const propertyId = e.target.propertyId.value;
    const newCoordination = { agentName, buyerName, propertyId };

    setCoordinationEntries([...coordinationEntries, newCoordination]);
    setCoordinationMessage(
      `Coordinating agent ${agentName} with buyer ${buyerName} for property ID ${propertyId}.`
    );

    // Clear form inputs
    e.target.reset();
  };

  return (
    <>
      <Helmet>
        <title>Realtor Panel</title>
        <meta
          name="description"
          content="Manage real estate listings, coordinate with agents and buyers, and streamline property management in the Realtor Panel."
        />
        <meta
          name="keywords"
          content="realtor panel, real estate management, property listings, agent coordination, buyer coordination"
        />
        <meta name="author" content="Real Estate Solutions" />
      </Helmet>
      <Header />
      <div>
        <header className="text-start py-3">
          <div className="container">
            <h1>Realtor Panel</h1>
          </div>
        </header>

        <div className="container my-5">
          {/* Manage Listings Section */}
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Manage Multiple Listings</h2>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Property ID</th>
                      <th scope="col">Address</th>
                      <th scope="col">Price</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map((listing) => (
                      <tr key={listing.id}>
                        <td>{listing.id}</td>
                        <td>{listing.address}</td>
                        <td>{listing.price}</td>
                        <td>
                          <button
                            className="btn btn-warning me-2 mt-2 btn-sm"
                            onClick={() => editListing(listing.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger me-2 mt-2 btn-sm"
                            onClick={() => deleteListing(listing.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                className="btn btn-success mt-2"
                data-bs-toggle="modal"
                data-bs-target="#addListingModal"
              >
                Add New Listing
              </button>
            </div>
          </div>

          {/* Coordinate with Agents and Buyers Section */}
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Coordinate with Agents and Buyers</h2>
              <form onSubmit={coordinate}>
                <div className="mb-3">
                  <label htmlFor="agentName" className="form-label">
                    Agent Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="agentName"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="buyerName" className="form-label">
                    Buyer Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="buyerName"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="propertyId" className="form-label">
                    Property ID:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyId"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Submit Coordination
                </button>
              </form>
              <p className="mt-3">{coordinationMessage}</p>
            </div>
          </div>

          {/* Coordination Entries Table */}
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Coordinated Entries</h2>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Agent Name</th>
                      <th scope="col">Buyer Name</th>
                      <th scope="col">Property ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coordinationEntries.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.agentName}</td>
                        <td>{entry.buyerName}</td>
                        <td>{entry.propertyId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Add Listing Modal */}
        <div
          className="modal fade"
          id="addListingModal"
          tabIndex="-1"
          aria-labelledby="addListingModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addListingModalLabel">
                  Add New Listing
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              {/* // In the modal form, use name instead of id for inputs */}
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="newPropertyId" className="form-label">
                      Property ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="newPropertyId"
                      name="id"
                      value={newListing.id}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newAddress" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="newAddress"
                      name="address"
                      value={newListing.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPrice" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="newPrice"
                      name="price"
                      value={newListing.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={saveListing}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RealtorPanel;
