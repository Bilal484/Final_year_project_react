import React, { useState, useEffect, useRef, useCallback } from "react";
import { ListGroup, Form, Button, InputGroup } from "react-bootstrap";
import "./chats.css";
import { toast, ToastContainer } from "react-toastify";
import { useSocket } from "../../SocketContext";
import { 
    sendMessage as sendChatMessage, 
    getMessages, 
    markMessagesAsRead, 
    getRoleDisplayName,
    USER_ROLES
} from "../../services/chatAPI";

const Chat = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [senderRole, setSenderRole] = useState(null);  // Track sender's role
    const [receiverRole, setReceiverRole] = useState(null);  // Track receiver's role
    const [receiverName, setReceiverName] = useState(""); // For displaying in header
    const [refreshing, setRefreshing] = useState(false); // For refresh animation
    const socket = useSocket();
    const textBox = useRef();
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    // Debug log to check IDs
    // console.log("Chat component rendered with senderId:", senderId, "receiverId:", receiverId);    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };    // Fetch messages function - extracted for reuse with refresh button
    const fetchMessages = useCallback(async () => {
        if (!senderId || !receiverId) {
            console.log("Missing senderId or receiverId, cannot fetch messages");
            return;
        }

        try {
            // Convert to integers to ensure consistency
            const sId = parseInt(senderId);
            const rId = parseInt(receiverId);
            
            if (refreshing) {
                toast.info("Refreshing messages...");
            }
            
            const result = await getMessages(sId, rId);
            
            if (result.success) {
                setMessages(result.data || []);
                // Scroll to bottom after messages load
                setTimeout(scrollToBottom, 100);
                
                // Mark messages as read when conversation is opened
                try {
                    await markMessagesAsRead(sId, rId);
                } catch (readError) {
                    console.error("Error marking messages as read:", readError);
                    // Continue even if marking as read fails
                }
                
                if (refreshing) {
                    toast.success("Messages refreshed");
                    setRefreshing(false);
                }
            } else {
                console.error("Failed to load messages:", result.error);
                toast.error("Failed to load messages. Please try again.");
                // Initialize with empty messages rather than showing an error
                setMessages([]);
                setRefreshing(false);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error("Network error. Please check your connection.");
            setMessages([]);
            setRefreshing(false);
        }
    }, [senderId, receiverId, refreshing]);

    useEffect(() => {
        // Only fetch messages if we have valid IDs
        if (!senderId || !receiverId) {
            console.log("Missing senderId or receiverId, cannot fetch messages");
            return;
        }        fetchMessages();
        
        // Fetch receiver name for the header
        const fetchReceiverInfo = () => {
            // In a real app, you would fetch this from API
            // For now, we'll just set a placeholder
            setReceiverName(`User #${receiverId}`);
        };
        
        fetchReceiverInfo();
        
        // Listen for new messages
        const messageListener = (message) => {
            // Only add messages relevant to the current conversation
            if ((message.sender_id === parseInt(receiverId) && message.receiver_id === parseInt(senderId)) ||
                (message.sender_id === parseInt(senderId) && message.receiver_id === parseInt(receiverId))) {
                
                setMessages((prevMessages) => [...prevMessages, message]);

                // Show notification for new messages if they're not from the current user
                if (message.sender_id !== parseInt(senderId)) {
                    setShowNotification(true);
                    setTimeout(() => setShowNotification(false), 3000);
                    
                    // Mark the newly received message as read
                    markMessagesAsRead(senderId, receiverId);
                }

                // Scroll to bottom when new message arrives
                setTimeout(scrollToBottom, 100);
            }
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
        }        return () => {
            if (socket) {
                socket.off("chat-channel:NewMessage", messageListener);
                socket.off("chat-channel:typing", typingListener);
            }
        };
    }, [senderId, receiverId, socket, fetchMessages]);

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Fetch and set user roles when component mounts or IDs change
    useEffect(() => {
        // Determine sender and receiver roles from localStorage or backend API
        const fetchUserRoles = () => {
            // First, check if current user's role is in localStorage
            const currentUserRole = localStorage.getItem('roles')?.replace(/"/g, '');
            if (currentUserRole) {
                setSenderRole(parseInt(currentUserRole));
            }
            
            // For the receiver, we would ideally get it from the backend
            // For now, we can make an educated guess based on the sender's role
            if (currentUserRole) {
                const senderRoleInt = parseInt(currentUserRole);
                // Logic to guess receiver role - in a real app, you would fetch this
                if (senderRoleInt === USER_ROLES.AGENT) {
                    // If sender is agent, receiver is likely buyer or seller
                    setReceiverRole(USER_ROLES.BUYER); // Default assumption
                } else if (senderRoleInt === USER_ROLES.BUYER || senderRoleInt === USER_ROLES.SELLER) {
                    // If sender is buyer or seller, receiver is likely agent
                    setReceiverRole(USER_ROLES.AGENT);
                }
            }
        };
        
        fetchUserRoles();
    }, [senderId, receiverId]);

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
            // Ensure IDs are integers
            const sId = parseInt(senderId);
            const rId = parseInt(receiverId);
            
            const messageData = {
                senderId: sId,
                receiverId: rId,
                message: newMessage,
            };

            // Optimistically add message to UI
            const tempMessage = {
                id: "temp-" + Date.now(),
                sender_id: sId,
                receiver_id: rId,
                message: newMessage,
                created_at: new Date().toISOString(),
                is_sending: true,
            };

            setMessages((prev) => [...prev, tempMessage]);
            setNewMessage("");

            // Send to server using chatAPI service
            sendChatMessage(sId, rId, newMessage)
                .then((response) => {
                    if (response.success) {
                        // Replace temp message with actual message from server
                        setMessages((prev) =>
                            prev.map((msg) =>
                                msg.id === tempMessage.id
                                    ? { ...response.data, is_sending: false }
                                    : msg
                            )
                        );
                    } else {
                        throw new Error(response.error || "Failed to send message");
                    }
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

    // Handle refresh button click
    const handleRefresh = (e) => {
        e.preventDefault();
        setRefreshing(true);
        fetchMessages();
    };

    return (
        <div className="chat-window">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Chat header with receiver's name and refresh button */}
            <div className="chat-header">
                <div className="receiver-name">{receiverName || "Loading..."}</div>
                <Button 
                    variant="link" 
                    className={`refresh-button ${refreshing ? "loading" : ""}`}
                    onClick={handleRefresh}
                    disabled={refreshing}
                    title="Refresh messages"
                >
                    {refreshing ? (
                        <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                        <i className="fas fa-sync-alt"></i>
                    )}
                </Button>
            </div>

            <ListGroup className="message-list">
                {messages.map((msg) => {
                    // Determine message role class based on sender's role
                    let roleClass = '';
                    if (msg.sender_id === parseInt(senderId)) {
                        // Message from current user, use their role
                        roleClass = senderRole === USER_ROLES.BUYER ? 'buyer' : 
                                   senderRole === USER_ROLES.SELLER ? 'seller' : 
                                   senderRole === USER_ROLES.AGENT ? 'agent' : '';
                    } else {
                        // Message from other user, use their role
                        roleClass = receiverRole === USER_ROLES.BUYER ? 'buyer' : 
                                   receiverRole === USER_ROLES.SELLER ? 'seller' : 
                                   receiverRole === USER_ROLES.AGENT ? 'agent' : '';
                    }
                    
                    return (
                        <ListGroup.Item
                            key={msg.id}
                            className={`message-bubble ${msg.sender_id === parseInt(senderId) ? "sender" : "receiver"} 
                                ${roleClass} ${msg.is_sending ? "sending" : ""} ${msg.is_failed ? "failed" : ""}`}
                        >
                            {msg.message}
                            <span className="message-time">
                                {formatTime(msg.created_at)}
                                {msg.is_sending && " • Sending..."}
                                {msg.is_failed && " • Failed to send"}
                            </span>
                        </ListGroup.Item>
                    );
                })}

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
            )}            <form onSubmit={(e) => {
                e.preventDefault(); // Prevent form submission/page reload
                sendMessage();
            }}>
                <InputGroup className="chat-enter">
                    <Form.Control
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault(); // Prevent form submission/page reload
                                sendMessage();
                            }
                            handleTyping();
                        }}
                        onInput={handleTyping}
                        ref={textBox}
                        autoFocus
                    />
                    <Button
                        variant="outline-secondary"
                        type="submit"
                        aria-label="Send message"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </Button>
                </InputGroup>
            </form>
        </div>
    );
};

export default Chat;

