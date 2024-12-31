import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/check-auth', { withCredentials: true });
            setIsAuthenticated(response.data.authenticated);
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setLoading(false); // Set loading to false after check is complete
        }
    };

    // Automatically check authentication status on component mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Render loading screen or nothing while loading
    if (loading) {
        return <div className='pt-20 text-3xl flex justify-center items-center h-screen'>Loading...</div>; // You can customize this loading screen
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus ,setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};
