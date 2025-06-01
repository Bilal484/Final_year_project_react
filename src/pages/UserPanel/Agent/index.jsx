import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Agent.css";
import img01 from "../../../../src/assets/images/Agent.png";
// import UserHeader from "../../../components/UserHeader";
import Header from "../../../components/header";
import Footer from "../../../components/Footer";

const Agent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchSuggestions = async (query) => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(
                `https://apitourism.today.alayaarts.com/api/getuseragent/${query}`
            );
            if (response.data && response.data.users.length > 0) {
                setSuggestions(response.data.users);
            } else {
                setSuggestions([]);
            }
        } catch (err) {
            setError("Failed to fetch agent suggestions. Please try again.");
        }
        setLoading(false);
    };

    const handleSearchInput = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 2) {
            fetchSuggestions(query);
        } else {
            setSuggestions([]);
        }
    };

    // Function to handle redirection to AgentProfile page with agentName
    const handleAgentSelect = (agent) => {
        // Redirect to the route `/real-estate-agents/:agentName`
        navigate(`/real-estate-agents/${agent.name}`);
    };

    return (
        <>
        <Helmet>
                <title>Find a Real Estate Agent | UrbanCraft REAL ESTATE</title>
                <meta
                    name="description"
                    content="Search and connect with local UrbanCraft REAL ESTATE agents to find your dream home or sell your property at the best price."
                />
                <meta
                    name="keywords"
                    content="real estate agents, UrbanCraft REAL ESTATE agents, local real estate experts, find agents, real estate services"
                />
                <meta name="author" content="Znet" />
                <meta property="og:title" content="Find a Real Estate Agent | UrbanCraft REAL ESTATE" />
                <meta
                    property="og:description"
                    content="Connect with expert UrbanCraft REAL ESTATE agents in your area to get the best deals for buying or selling properties."
                />
                <meta
                    property="og:image"
                    content="https://apitourism.today.alayaarts.com/uploads/agent-search-banner.jpg"
                />
                <meta property="og:url" content="https://apitourism.today.alayaarts.com/agents" />
                <meta property="og:type" content="website" />
            </Helmet>
            <Header />
            {/* <UserHeader /> */}
            <div className="Agent-parent">
                <div id="main-content">
                    <div className="container mt-5 text-center container-agent">
                        <img src={img01} alt="Agent" />
                        <h3 className="agent-heading">
                            Find a local UrbanCraft REAL ESTATE agent
                        </h3>
                        <p>UrbanCraft REAL ESTATE Agents are local experts who can get you better results for lower fees.</p>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="input-group search-container">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Find UrbanCraft REAL ESTATE agents in your area"
                                        aria-label="Search"
                                        value={searchQuery}
                                        onChange={handleSearchInput}
                                    />
                                    <button type="button" className="btn btn-danger">
                                        <i className="fa-solid fa-magnifying-glass" />
                                    </button>
                                </div>

                                {/* Display dropdown suggestions */}
                                {suggestions.length > 0 && (
                                    <ul className="dropdown-suggestions">
                                        {suggestions.map((agent) => (
                                            <li
                                                key={agent.id}
                                                className="dropdown-item"
                                                onClick={() => handleAgentSelect(agent)}
                                            >
                                                <div className="agent-info">
                                                    <i className="fa-solid fa-user"></i>
                                                    <div className="agent-details">
                                                        <p>{agent.name}</p>
                                                        <span>{agent.email || "No email available"}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {loading && <p>Loading...</p>}
                                {error && <p className="text-danger">{error}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Agent;
