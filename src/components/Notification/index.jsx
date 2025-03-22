import React, { useState } from "react";
import "./Notification.css";
import { Helmet } from "react-helmet";
const Notification = ({ message, type }) => {
    if (!message) return null;

    return (
        <>
        <Helmet>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Real-time notifications for status updates and messages, with visual alerts for different message types." />
                <meta name="keywords" content="notification, alert, message, success, error, notification system" />
                <meta property="og:title" content="Notification System" />
                <meta property="og:description" content="Stay informed with real-time notifications for status updates and alerts." />
                <meta property="og:image" content="https://via.placeholder.com/1200x630?text=Notification+System" />
                <meta property="og:url" content="https://www.example.com/notification" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Notification System" />
                <meta name="twitter:description" content="Stay informed with real-time notifications for status updates and alerts." />
                <meta name="twitter:image" content="https://via.placeholder.com/1200x630?text=Notification+System" />
                <title>Notification System</title>
            </Helmet>

        <div className={`notification ${type}`}>
            <p>{message}</p>
        </div>
        </>
    );
};

export const useNotification = () => {
    const [notification, setNotification] = useState({ message: "", type: "" });

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification({ message: "", type: "" });
        }, 3000); // Auto-dismiss after 3 seconds
    };

    return [notification, showNotification];
};

export default Notification;
