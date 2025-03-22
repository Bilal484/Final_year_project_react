import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import {
    Form,
    Button,
    InputGroup,
    ListGroup,
    Row,
    Col,
    Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatComponent.css"; // Custom CSS for the component
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data"; // Emoji-mart data

const ChatComponent = ({ userName, userId }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const [users, setUsers] = useState([]);
    const [editingMessage, setEditingMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const socketRef = useRef(null);

    const defaultUser = { id: 1, name: "John Doe" };
    const [currentChatUser, setCurrentChatUser] = useState(defaultUser);

    useEffect(() => {
        const mockUsers = [
            { id: 1, name: "John Doe" },
            { id: 2, name: "Jane Smith" },
            { id: 3, name: "Michael Brown" },
        ];
        setUsers(mockUsers);

        const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
        setMessages(storedMessages);

        if (userId) {
            socketRef.current = new WebSocket("ws://127.0.0.1:8080");

            socketRef.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.typing !== undefined) {
                    setTyping(data.typing ? "Someone is typing..." : false);
                } else {
                    setMessages((prevMessages) => {
                        const updatedMessages = [...prevMessages, data];
                        localStorage.setItem("messages", JSON.stringify(updatedMessages));
                        return updatedMessages;
                    });
                }
            };

            return () => {
                socketRef.current.close();
            };
        }
    }, [userId]);

    const sendMessage = (e) => {
        e.preventDefault();
        const trimmedMessage = message.trim();
        if (trimmedMessage === "" || !userId || !currentChatUser) return;

        const data = {
            userId: userId,
            recipientId: currentChatUser.id,
            userName: userName,
            message: trimmedMessage,
        };

        if (editingMessage !== null) {
            const updatedMessages = messages.map((msg) =>
                msg.id === editingMessage.id ? { ...msg, message: trimmedMessage } : msg
            );
            setMessages(updatedMessages);
            setEditingMessage(null);
            setMessage("");
            localStorage.setItem("messages", JSON.stringify(updatedMessages));
        } else {
            if (
                socketRef.current &&
                socketRef.current.readyState === WebSocket.OPEN
            ) {
                socketRef.current.send(JSON.stringify({ ...data, id: Date.now() }));
                setMessage("");
            }
        }
    };

    const handleCloseChat = () => {
        setIsOpen(false); // This will close the chat
    };

    return (
        <>
            <Helmet>
                <title>Chat - Real-time Messaging</title>
                <meta
                    name="description"
                    content="A real-time chat application where you can send and receive messages instantly."
                />
                <meta
                    name="keywords"
                    content="real-time chat, messaging, live chat, WebSocket, chat app, instant messaging"
                />
                <meta property="og:title" content="Real-time Chat Messaging" />
                <meta
                    property="og:description"
                    content="Join the conversation! Real-time messaging with WebSocket integration for instant communication."
                />
                <meta
                    property="og:image"
                    content="https://via.placeholder.com/1200x630?text=Real-time+Chat+App" // Placeholder image URL
                />
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Real-time Chat Messaging" />
                <meta
                    name="twitter:description"
                    content="Join the conversation! Real-time messaging with WebSocket integration for instant communication."
                />
                <meta
                    name="twitter:image"
                    content="https://via.placeholder.com/1200x630?text=Real-time+Chat+App" // Placeholder image URL
                />
            </Helmet>
            <div className={`chat-container ${isOpen ? "open" : "closed"}`}>
                <Row className="h-100">
                    <Col md={4} className="chat-sidebar bg-dark text-light p-3">
                        <h5 className="text-center">Chats</h5>
                        <ListGroup variant="flush">
                            {users.map((user) => (
                                <ListGroup.Item
                                    key={user.id}
                                    className={`text-light ${currentChatUser && currentChatUser.id === user.id
                                        ? "active-chat"
                                        : ""
                                        }`}
                                    onClick={() => setCurrentChatUser(user)}
                                >
                                    {user.name}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>

                    {/* Chat Section */}
                    <Col
                        md={8}
                        className="d-flex flex-column chat-section bg-dark text-light"
                    >
                        <div className="d-flex justify-content-between p-3 chat-header text-white">
                            <h5>
                                {currentChatUser ? currentChatUser.name : "Select a user to chat"}
                            </h5>
                            <Button
                                variant="link"
                                onClick={handleCloseChat}
                                style={{ padding: 0, border: "none", background: "transparent" }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    style={{ width: "24px", height: "24px" }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </Button>
                        </div>

                        <div className="flex-grow-1 overflow-auto p-3 chat-messages">
                            {currentChatUser ? (
                                messages
                                    .filter(
                                        (msg) =>
                                            msg.recipientId === currentChatUser?.id ||
                                            msg.userId === currentChatUser?.id
                                    )
                                    .map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`message-container ${msg.userId === userId ? "text-end" : "text-start"
                                                }`}
                                        >
                                            <div
                                                className={`message-bubble p-2 rounded shadow-sm ${msg.userId === userId
                                                    ? "bg-primary text-white"
                                                    : "bg-light text-dark"
                                                    }`}
                                                style={{ maxWidth: "75%" }}
                                            >
                                                <p className="mb-1">{msg.message}</p>
                                                <small className="d-block text-muted">{msg.time}</small>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <div className="text-center">No chat selected</div>
                            )}
                        </div>

                        {currentChatUser && (
                            <Form onSubmit={sendMessage} className="p-3">
                                <InputGroup className="d-flex gap-1">
                                    <Form.Control
                                        type="text"
                                        className="py-3"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder={`Message ${currentChatUser.name}`}
                                    />
                                    <Button variant="primary" type="submit">
                                        Send
                                    </Button>
                                </InputGroup>
                            </Form>
                        )}
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default ChatComponent;
