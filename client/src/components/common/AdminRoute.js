import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/admin/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role !== 'admin') {
            return <Navigate to="/admin/login" />;
        }
    } catch (error) {
        console.error("Invalid token:", error);
        return <Navigate to="/admin/login" />;
    }

    return <Outlet />;
};

export default AdminRoute;
