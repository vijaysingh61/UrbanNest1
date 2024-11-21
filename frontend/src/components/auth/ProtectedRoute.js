import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, checkAuthStatus } = useContext(AuthContext);

    useEffect(() => {
        const verifyAuth = async () => {
            await checkAuthStatus();
        };
        verifyAuth();
    }, [checkAuthStatus]);

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
