
// AgentSearch.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import axios from 'axios';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import './AgentSearch.css';
import defaultAgentImage from '../../assets/images/real estate _12.jpg';
import UserHeader from '../../components/UserHeader';

const AgentSearch = () => {
    const [agents, setAgents] = useState([]);
    const [filteredAgents, setFilteredAgents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchRef = useRef(null);

    // Fetch all agents on component mount
    useEffect(() => {
        const fetchAgents = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://apitourism.today.alayaarts.com/api/all-agents');

                if (response.data && response.data.allusers) {
                    // Filter out entries that don't have user_role === "10" (Agent)
                    const agentData = response.data.allusers.filter(agent => agent.user_role === "10");
                    console.log("Filtered agent data:", agentData);
                    setAgents(agentData);
                    setFilteredAgents(agentData);
                } else {
                    setError('No agent data received');
                }
                setLoading(false);
            } catch (err) {
                setError(`Error fetching agents: ${err.message}`);
                setLoading(false);
            }
        };

        fetchAgents();

        // Click outside to close suggestions
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            setFilteredAgents(agents);
        } else {
            const filtered = agents.filter(agent =>
                agent.name && agent.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredAgents(filtered);
        }

        setShowSuggestions(true);
    };

    // Format phone number for display
    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return 'N/A';

        // If number already has formatting, return as is
        if (phoneNumber.includes('(') || phoneNumber.includes('-')) {
            return phoneNumber;
        }

        // Remove any non-digit characters
        const cleaned = phoneNumber.replace(/\D/g, '');

        // Check if it's a valid US/Canadian number (10 digits)
        if (cleaned.length === 10) {
            return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
        } else if (cleaned.length === 11 && cleaned[0] === '1') {
            // Handle numbers with country code 1
            return `(${cleaned.substring(1, 4)}) ${cleaned.substring(4, 7)}-${cleaned.substring(7, 11)}`;
        } else {
            return phoneNumber; // Return original if format is unknown
        }
    };

    return (
        <>
            <Helmet>
                <title>Find Real Estate Agents | UrbanCraft Premier</title>
                <meta
                    name="description"
                    content="Find top-rated real estate agents in your area. Browse agent profiles, read reviews, and connect with experienced professionals to help with your property needs."
                />
                <meta
                    name="keywords"
                    content="real estate agents, property agents, find an agent, top realtors, best agents, real estate professionals"
                />
                <meta name="author" content="UrbanCraft Premier" />
            </Helmet>

            <Header />
            <UserHeader />

            <div className="agent-search-hero">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} className="text-center">
                            <h1 className="agent-search-title">Find Your Perfect Real Estate Agent</h1>
                            <p className="agent-search-subtitle">
                                Connect with experienced professionals who can guide you through your property journey
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="agent-search-container py-5">
                <Row className="mb-5">
                    <Col md={8} className="mx-auto">
                        <div className="search-container" ref={searchRef}>
                            <Form.Control
                                type="text"
                                placeholder="Search for agents by name..."
                                className="agent-search-input"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onFocus={() => setShowSuggestions(true)}
                            />
                            <Button className="agent-search-button">
                                <i className="bi bi-search"></i> Search
                            </Button>

                            {showSuggestions && searchTerm.length > 0 && (
                                <ul className="dropdown-suggestions">
                                    {filteredAgents.slice(0, 5).map((agent) => (
                                        <li
                                            key={agent.id}
                                            className="dropdown-item"
                                            onClick={() => {
                                                setSearchTerm(agent.name || '');
                                                setShowSuggestions(false);
                                            }}
                                        >
                                            <div className="agent-info">
                                                {agent.image ? (
                                                    <img
                                                        src={`https://apitourism.today.alayaarts.com/uploads/${agent.image}`}
                                                        alt={agent.name}
                                                        className="agent-suggestion-img"
                                                    />
                                                ) : (
                                                    <i className="bi bi-person-circle"></i>
                                                )}
                                                <div className="agent-details">
                                                    <p>{agent.name || 'Unknown Agent'}</p>
                                                    <span>{formatPhoneNumber(agent.phone_number)}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    {filteredAgents.length === 0 && (
                                        <li className="dropdown-item">No agents found</li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </Col>
                </Row>

                <div className="agent-results-section">
                    <h2 className="section-title mb-4">
                        {searchTerm ? `Search Results for "${searchTerm}"` : "Our Real Estate Agents"}
                    </h2>

                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="primary" />
                            <p className="mt-3">Loading agent profiles...</p>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    ) : (
                        <Row>
                            {filteredAgents.length > 0 ? (
                                filteredAgents.map((agent) => (
                                    <Col key={agent.id} lg={4} md={6} className="mb-4">
                                        <Link
                                            to={`/agents/${agent.id}`}
                                            className="text-decoration-none"
                                        >
                                            <Card className="agent-card">
                                                <div className="agent-card-img-container">
                                                    <Card.Img
                                                        variant="top"
                                                        src={agent.image ? `https://apitourism.today.alayaarts.com/uploads/${agent.image}` : defaultAgentImage}
                                                        className="agent-card-img"
                                                        alt={agent.name}
                                                    />
                                                    <div className="agent-card-overlay">
                                                        <span className="agent-role-badge">
                                                            {agent.roles?.role_name || "Agent"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Card.Body className="agent-card-body">
                                                    <Card.Title className="agent-card-name">{agent.name || 'Unknown Agent'}</Card.Title>
                                                    <div className="agent-card-contact">
                                                        <p><i className="bi bi-telephone-fill"></i> {formatPhoneNumber(agent.phone_number)}</p>
                                                        <p><i className="bi bi-envelope-fill"></i> {agent.email}</p>
                                                    </div>
                                                    <Button className="agent-contact-btn">
                                                        View Profile
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Col>
                                ))
                            ) : (
                                <Col xs={12} className="text-center py-5">
                                    <div className="no-results">
                                        <i className="bi bi-search fs-1 text-muted"></i>
                                        <h3 className="mt-3">No agents found</h3>
                                        <p>Try adjusting your search criteria</p>
                                    </div>
                                </Col>
                            )}
                        </Row>
                    )}
                </div>
            </Container>

            <section className="contact-agents-section">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h2>Can't Find What You're Looking For?</h2>
                            <p>Our team of experienced agents is ready to help you with your real estate needs. Contact us directly for personalized assistance.</p>
                            <Button variant="primary" className="cta-button">
                                Contact Us
                            </Button>
                        </Col>
                        <Col md={6}>
                            <div className="contact-stats">
                                <div className="stat-item">
                                    <h3>{agents.length}+</h3>
                                    <p>Active Agents</p>
                                </div>
                                <div className="stat-item">
                                    <h3>1000+</h3>
                                    <p>Properties Sold</p>
                                </div>
                                <div className="stat-item">
                                    <h3>500+</h3>
                                    <p>Happy Clients</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Footer />
        </>
    );
};

export default AgentSearch;
