import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios'; // Using axios here for simplicity to call our own API
import Loader from '../components/common/Loader/Loader';
import './OrderConfirmationPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const location = useLocation();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('pending');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
        setOrder(res.data.data.order);
      } catch (err) {
        setError('Could not find your order details.');
      }
    };

    const verifyPayment = async (reference) => {
        try {
            setVerificationStatus('verifying');
            await axios.post(`${API_BASE_URL}/payments/paystack/verify`, { reference });
            setVerificationStatus('success');
        } catch (err) {
            setVerificationStatus('failed');
            console.error("Payment verification failed", err);
        }
    };

    const searchParams = new URLSearchParams(location.search);
    const reference = searchParams.get('reference');

    const run = async () => {
        await fetchOrder();
        if (reference) {
            await verifyPayment(reference);
        }
        setLoading(false);
    };

    run();

  }, [orderId, location.search]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="container error-message">{error}</div>;
  }

  if (!order) {
      return <div className="container">No order found.</div>
  }

  return (
    <div className="container confirmation-page">
      <div className="confirmation-box">
        <h1>Thank You For Your Order!</h1>
        <p>Your order has been placed successfully.</p>
        <p><strong>Order ID:</strong> {order._id}</p>
        {verificationStatus === 'success' && <p className="payment-success">Your online payment was successful.</p>}
        {verificationStatus === 'failed' && <p className="payment-failed">There was an issue with your payment. Please contact us.</p>}

        <div className="order-summary-confirm">
            <h2>Order Summary</h2>
            {order.items.map(item => (
                <div key={item._id} className="summary-item">
                    <span>{item.name} &times; {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            ))}
            <div className="summary-row total">
                <span>Total</span>
                <span>${order.totals.total.toFixed(2)}</span>
            </div>
        </div>

        <p>You will receive an email confirmation shortly at <strong>{order.guestInfo.email}</strong>.</p>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
