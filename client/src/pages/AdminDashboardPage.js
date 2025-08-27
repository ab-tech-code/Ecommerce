import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h2>Admin Dashboard</h2>
            <p>Welcome to the admin dashboard. Here you can manage products, orders, and blog posts.</p>
            <nav>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '1rem' }}>
                        <Link to="/admin/products" style={{ textDecoration: 'none', fontSize: '1.2rem' }}>Manage Products</Link>
                    </li>
                    <li style={{ marginBottom: '1rem' }}>
                        <Link to="/admin/orders" style={{ textDecoration: 'none', fontSize: '1.2rem' }}>Manage Orders</Link>
                    </li>
                    <li style={{ marginBottom: '1rem' }}>
                        <Link to="/admin/blog" style={{ textDecoration: 'none', fontSize: '1.2rem' }}>Manage Blog</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminDashboardPage;
