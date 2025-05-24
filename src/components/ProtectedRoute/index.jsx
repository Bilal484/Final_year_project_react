import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check if user is logged in by looking for token or user_id
    const isAuthenticated = !!localStorage.getItem('token') || !!localStorage.getItem('user_id');
    
    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/Login" replace />;
    }
    
    // Return the children (the component that needs protection)
    return children;
};

export default ProtectedRoute;
