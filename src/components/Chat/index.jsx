import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ListGroup, Form, Button, InputGroup } from "react-bootstrap";
import "./chats.css";
import { toast, ToastContainer } from "react-toastify";
import { useSocket } from "../../SocketContext";

const Chat = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const socket = useSocket();
    const textBox = useRef();

    useEffect(() => {
        axios
            .get(`https://api.biznetusa.com/api/get-chat/${senderId}/${receiverId}`)
            .then((response) => {
                setMessages(response.data);
            })
            .catch((error) => console.error("Failed to fetch messages:", error));

        const messageListener = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        if (socket) {
            socket.on("chat-channel:NewMessage", messageListener);
        }

        return () => {
            if (socket) {
                socket.off("chat-channel:NewMessage", messageListener);
            }
        };
    });

    const sendMessage = () => {
        if (newMessage.trim()) {
            const messageData = {
                senderId: senderId,
                receiverId: receiverId,
                message: newMessage,
            };
            axios
                .post("https://api.biznetusa.com/api/storechat", messageData)
                .then((response) => {

                    // socket.emit("chat-channel:NewMessage", response.data);
                    setNewMessage("");
                })
                .catch((error) => {
                    console.error("Failed to send message:", error);
                    toast.error("Failed to send message: " + error.message);
                });
        }
    };

    return (
        <div className="chat-window">
            <ToastContainer />
            <ListGroup className="message-list">
                {messages.map((msg) => {
                    console.log(senderId)
                    console.log(msg.sender_id)
                    return <ListGroup.Item
                        key={msg.id}
                        className={`message-bubble ${msg.sender_id === senderId ? "sender" : "receiver"
                            }`}
                    >
                        {msg.message}
                    </ListGroup.Item>
                })}
            </ListGroup>
            <InputGroup className="mb-3 chat-enter mx-3">
                <Form.Control
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                    ref={textBox}
                />
                <Button variant="outline-secondary" onClick={sendMessage}>
                    Send
                </Button>
            </InputGroup>
        </div>
    );
};

export default Chat;

