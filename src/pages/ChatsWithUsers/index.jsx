import React, { useEffect, useState } from "react";
import Chat from "../../components/Chat";
import UsersList from "../../components/UsersList";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";

const ChatPage = () => {
    const [currentUser, setCurrentUser] = useState(null); // Current logged-in user
    const [selectedUser, setSelectedUser] = useState(null); // User selected from the list
    const [storedId, setStoredId] = useState(null); // ID of the selected user
    const location = useLocation();
    const storedUserName = localStorage.getItem("user_name");
    const storedUserId = localStorage.getItem("userId");
    const state = location?.state;

    useEffect(() => {
        if (storedUserId && storedUserName) {
            setCurrentUser({ id: parseInt(storedUserId, 10), name: storedUserName });
        }
    }, [storedUserId, storedUserName]);

    useEffect(() => {
        if (state?.user_id) {
            setCurrentUser({ id: state.user_id, name: storedUserName });
            setSelectedUser({ id: state.receiver_id, name: state.name });
            setStoredId(state.receiver_id)
        }
    }, [state, storedUserName]);


    const handleSelectUser = (user) => {
        setSelectedUser(user);
        console.log(user)
        setStoredId(user?.id || user?.user_id || null); // Handle different user object structures
    };

    return (
        <>
            <Header />
            {/* No need for <connectSocket>, as it isn't a valid component */}
            <Container fluid className="py-4">
                <Row>
                    {/* Sidebar for Users List */}
                    <Col xs={12} md={3} className="mb-3">
                        <Card className="h-100 shadow">
                            <Card.Header
                                className="text-white text-center"
                                style={{ backgroundColor: "var(--background_color)" }}
                            >
                                <h5>Users</h5>
                            </Card.Header>
                            <Card.Body>
                                <UsersList onSelectUser={handleSelectUser} />
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Chat Window */}
                    <Col xs={12} md={9} className="mb-3">
                        <Card className="h-100 shadow">
                            <Card.Header
                                className="text-white"
                                style={{ backgroundColor: "var(--background_color)" }}
                            >
                                {selectedUser ? (
                                    <h5>Chatting with {selectedUser.name}</h5>
                                ) : (
                                    <h5>Please select a user</h5>
                                )}
                            </Card.Header>
                            <Card.Body className="d-flex flex-column justify-content-between bg-light">
                                {currentUser && selectedUser ? (
                                    <Chat senderId={currentUser.id} receiverId={storedId} />
                                ) : (
                                    <div className="text-center text-muted my-5">
                                        <p className="fs-4">No user selected. Select a user to start chatting.</p>
                                        <Button
                                            variant="primary"
                                            onClick={() => console.log("Refresh Users Clicked")}
                                        >
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
        </>
    );
};

export default ChatPage;

