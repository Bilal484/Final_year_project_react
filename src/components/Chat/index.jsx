import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ListGroup, Form, Button, InputGroup } from "react-bootstrap";
import "./chats.css";
import { toast, ToastContainer } from "react-toastify";
import { useSocket } from "../../SocketContext";

const Chat = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const socket = useSocket();
    const textBox = useRef();
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Fetch messages
        axios
            .get(`https://api.biznetusa.com/api/get-chat/${senderId}/${receiverId}`)
            .then((response) => {
                setMessages(response.data);
                // Scroll to bottom after messages load
                setTimeout(scrollToBottom, 100);
            })
            .catch((error) => console.error("Failed to fetch messages:", error));

        // Listen for new messages
        const messageListener = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);

            // Show notification for new messages if they're not from the current user
            if (message.sender_id !== senderId) {
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000);
            }

            // Scroll to bottom when new message arrives
            setTimeout(scrollToBottom, 100);
        };

        // Listen for typing indicators
        const typingListener = (data) => {
            if (data.senderId === receiverId) {
                setIsTyping(true);
                setTimeout(() => setIsTyping(false), 3000);
            }
        };

        if (socket) {
            socket.on("chat-channel:NewMessage", messageListener);
            socket.on("chat-channel:typing", typingListener);
        }

        return () => {
            if (socket) {
                socket.off("chat-channel:NewMessage", messageListener);
                socket.off("chat-channel:typing", typingListener);
            }
        };
    }, [senderId, receiverId, socket]);

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Handle typing indicator
    const handleTyping = () => {
        if (socket) {
            socket.emit("chat-channel:typing", { senderId, receiverId });
        }

        // Clear previous timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
    };

    const sendMessage = () => {
        if (newMessage.trim()) {
            const messageData = {
                senderId: senderId,
                receiverId: receiverId,
                message: newMessage,
            };

            // Optimistically add message to UI
            const tempMessage = {
                id: "temp-" + Date.now(),
                sender_id: senderId,
                receiver_id: receiverId,
                message: newMessage,
                created_at: new Date().toISOString(),
                is_sending: true,
            };

            setMessages((prev) => [...prev, tempMessage]);
            setNewMessage("");

            // Send to server
            axios
                .post("https://api.biznetusa.com/api/storechat", messageData)
                .then((response) => {
                    // Replace temp message with actual message from server
                    setMessages((prev) =>
                        prev.map((msg) =>
                            msg.id === tempMessage.id
                                ? { ...response.data, is_sending: false }
                                : msg
                        )
                    );
                })
                .catch((error) => {
                    console.error("Failed to send message:", error);
                    toast.error("Failed to send message. Please try again.");

                    // Mark message as failed
                    setMessages((prev) =>
                        prev.map((msg) =>
                            msg.id === tempMessage.id
                                ? { ...msg, is_sending: false, is_failed: true }
                                : msg
                        )
                    );
                });
        }
    };

    // Format timestamp
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="chat-window">
            <ToastContainer position="top-right" autoClose={3000} />

            <ListGroup className="message-list">
                {messages.map((msg) => (
                    <ListGroup.Item
                        key={msg.id}
                        className={`message-bubble ${
                            msg.sender_id === senderId ? "sender" : "receiver"
                        } ${msg.is_sending ? "sending" : ""} ${
                            msg.is_failed ? "failed" : ""
                        }`}
                    >
                        {msg.message}
                        <span className="message-time">
                            {formatTime(msg.created_at)}
                            {msg.is_sending && " • Sending..."}
                            {msg.is_failed && " • Failed to send"}
                        </span>
                    </ListGroup.Item>
                ))}

                {isTyping && (
                    <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}

                {/* This empty div helps us scroll to bottom */}
                <div ref={messagesEndRef} />
            </ListGroup>

            {showNotification && (
                <div className="new-message-notification">
                    New message received
                </div>
            )}

            <InputGroup className="mb-3 chat-enter">
                <Form.Control
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessage();
                        handleTyping();
                    }}
                    onInput={handleTyping}
                    ref={textBox}
                />
                <Button
                    variant="outline-secondary"
                    onClick={sendMessage}
                    aria-label="Send message"
                >
                    <i className="fas fa-paper-plane"></i>
                </Button>
            </InputGroup>
        </div>
    );
};

export default Chat;

