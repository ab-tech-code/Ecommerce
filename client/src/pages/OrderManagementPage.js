import React, { useState, useEffect } from 'react';
import { getOrders } from '../services/api';

const OrderManagementPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Manage Orders</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {orders.map(order => (
                    <li key={order._id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
                        <h4>Order ID: {order._id}</h4>
                        <p>Customer: {order.user ? order.user.name : 'Guest'}</p>
                        <p>Total: ₦{order.totals.total}</p>
                        <p>Status: {order.status}</p>
                        <p>Payment Method: {order.paymentMethod}</p>
                        <h5>Items:</h5>
                        <ul>
                            {order.items.map(item => (
                                <li key={item.product}>{item.name} (x{item.quantity})</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderManagementPage;
