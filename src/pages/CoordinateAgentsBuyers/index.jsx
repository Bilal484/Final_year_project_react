import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import RealtorHeader from "../../components/RealtorHeader";

const CoordinateAgentsBuyers = () => {

    // State for coordination message
    const [coordinationMessage, setCoordinationMessage] = useState("");

    // State for coordination entries
    const [coordinationEntries, setCoordinationEntries] = useState([]);
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
                <title>Coordinate Agents and Buyers</title>
                <meta name="description" content="Facilitate communication between real estate agents and buyers to streamline property transactions." />
                <meta name="keywords" content="real estate, agents, buyers, property, transactions" />
                <meta property="og:title" content="Coordinate Agents and Buyers" />
                <meta property="og:description" content="Enhance coordination between agents and buyers for efficient property transactions." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="URL_to_an_image_for_social_media_sharing" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Coordinate Agents and Buyers" />
                <meta name="twitter:description" content="Streamline communication between real estate agents and buyers with our platform." />
            </Helmet>
        <RealtorHeader/>
            <div className="container my-4">
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
        </>
    );
};

export default CoordinateAgentsBuyers;
