import React, { useEffect, useState } from "react";
import Chat from "../../components/Chat";
import UsersList from "../../components/UsersList";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";
import "./ChatPage.css";

const ChatPage = () => {
    const [currentUser, setCurrentUser] = useState(null); // Current logged-in user
    const [selectedUser, setSelectedUser] = useState(null); // User selected from the list
    const [storedId, setStoredId] = useState(null); // ID of the selected user
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const storedUserName = localStorage.getItem("user_name");
    const storedUserId = localStorage.getItem("userId");
    const state = location?.state;

    useEffect(() => {
        if (storedUserId && storedUserName) {
            setCurrentUser({ id: parseInt(storedUserId, 10), name: storedUserName });
        }
        
        // Simulate loading time for smoother transitions
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        
        return () => clearTimeout(timer);
    }, [storedUserId, storedUserName]);

    useEffect(() => {
        if (state?.user_id) {
            setCurrentUser({ id: state.user_id, name: storedUserName });
            setSelectedUser({ id: state.receiver_id, name: state.name });
            setStoredId(state.receiver_id);
        }
    }, [state, storedUserName]);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setStoredId(user?.id || user?.user_id || null); // Handle different user object structures
    };

    const handleRefreshUsers = () => {
        setLoading(true);
        // This would typically trigger a refresh of user data
        setTimeout(() => {
            setLoading(false);
        }, 800);
    };

    return (
        <div className="chat-page-wrapper">
            <Header />
            
            <Container fluid className="chat-container-chat py-4">
                <Row className="chat-row">
                    {/* Sidebar for Users List */}
                    <Col xs={12} md={3} className="mb-3">
                        <Card className="users-card shadow">
                            <Card.Header className="users-header">
                                <h5>
                                    <i className="fas fa-users me-2 text-white"></i>
                                    <span className="text-white">Contacts</span>
                                </h5>
                                <Button
                                    variant="link"
                                    className="refresh-btn"
                                    onClick={handleRefreshUsers}
                                >
                                    <i className={`fas fa-sync-alt ${loading ? 'rotating' : ''} text-white`}></i>
                                </Button>
                            </Card.Header>
                            <Card.Body className="p-2">
                                {loading ? (
                                    <div className="loading-users">
                                        <div className="spinner"></div>
                                        <p>Loading users...</p>
                                    </div>
                                ) : (
                                    <UsersList onSelectUser={handleSelectUser} />
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Chat Window */}
                    <Col xs={12} md={9} className="mb-3">
                        <Card className="chat-window-card shadow">
                            <Card.Header className="chat-header">
                                {selectedUser ? (
                                    <div className="selected-user-info">
                                        <div className="user-avatar">
                                            {selectedUser.name?.[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <h5 className="text-white">{selectedUser.name}</h5>
                                            <small className="text-white-50">
                                                <span className="online-indicator"></span>
                                                Online
                                            </small>
                                        </div>
                                    </div>
                                ) : (
                                    <h5 className="text-white">
                                        <i className="fas fa-comment-dots me-2"></i>
                                        Please select a user to start chatting
                                    </h5>
                                )}
                            </Card.Header>
                            <Card.Body className="chat-body">
                                {currentUser && selectedUser ? (
                                    <Chat senderId={currentUser.id} receiverId={storedId} />
                                ) : (
                                    <div className="no-chat-selected">
                                        <div className="no-chat-icon">
                                            <i className="fas fa-comments"></i>
                                        </div>
                                        <h3>Welcome to UrbanCraft Chat</h3>
                                        <p>Select a user from the list to start a conversation</p>
                                        <Button
                                            variant="primary"
                                            className="start-chat-btn"
                                            onClick={handleRefreshUsers}
                                        >
                                            <i className="fas fa-sync-alt me-2"></i>
                                            Refresh Users
                                        </Button>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            
            <Footer />
        </div>
    );
};

export default ChatPage;

