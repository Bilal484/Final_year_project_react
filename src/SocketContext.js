import React, { createContext, useContext, useEffect, useState } from 'react';
import Echo from 'laravel-echo';
import { io } from 'socket.io-client';

// Make Socket.IO client globally available
window.io = io;

// Create the WebSocket context
const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [echo, setEcho] = useState(null);

    useEffect(() => {
        // Configure Laravel Echo
        const echoInstance = new Echo({
            broadcaster: 'socket.io',
            host: 'https://api.biznetusa.com:6001', // WebSocket server's URL
            transports: ['websocket'], // Use WebSocket transport only
            forceTLS: true, // Ensure secure connection
            timeout: 10000, // Set a higher timeout (10 seconds)
            auth: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`, // Include token if required
                },
            },
        });

        // Set Echo instance
        setEcho(echoInstance);

        // Debugging: Add listeners for connection events
        const socket = echoInstance.connector.socket;

        socket.on('connect', () => {
        });

        socket.on('disconnect', () => {
        });

        socket.on('connect_error', (error) => {
        });

        socket.on('reconnect_attempt', () => {
        });

        socket.on('error', (error) => {
        });

        // Cleanup on unmount
        return () => {
            echoInstance.disconnect();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={echo}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Hook to use WebSocket
export const useSocket = () => useContext(WebSocketContext);
