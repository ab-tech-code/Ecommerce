import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CartContext } from '../context/CartContext';
import { createOrder, initializePaystack } from '../services/api';
import Input from '../components/common/Input/Input';
import Button from '../components/common/Button/Button';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Nigeria',
    phoneNumber: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.fullName || !formData.email || !formData.addressLine1 || !formData.city || !formData.postalCode) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    const orderPayload = {
      guestInfo: { email: formData.email, name: formData.fullName },
      items: cartItems.map(item => ({ productId: item._id, quantity: item.quantity })),
      shippingAddress: formData,
      paymentMethod: paymentMethod,
    };

    try {
      const orderResponse = await createOrder(orderPayload);
      const newOrder = orderResponse.data.order;

      if (paymentMethod === 'cod') {
        alert('Order placed successfully! You will pay upon delivery.');
        clearCart();
        navigate(`/order-confirmation/${newOrder._id}`);
      } else if (paymentMethod === 'paystack') {
        const paystackResponse = await initializePaystack(newOrder._id);
        window.location.href = paystackResponse.data.authorization_url;
      }
    } catch (err) {
      setError(err.message || 'An error occurred while placing the order.');
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container checkout-empty">
        <Helmet>
            <title>Checkout | GardenVerde</title>
        </Helmet>
        <h1>Your Cart is Empty</h1>
        <p>You must have items in your cart to proceed to checkout.</p>
        <Button onClick={() => navigate('/products')}>Go Shopping</Button>
      </div>
    );
  }

  const shippingCost = cartTotal > 100 ? 0 : 10;
  const totalAmount = cartTotal + shippingCost;

  return (
    <div className="container checkout-page">
      <Helmet>
        <title>Checkout | GardenVerde</title>
        <meta name="description" content="Complete your purchase securely. Enter your shipping and payment details to place your order with GardenVerde." />
      </Helmet>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-layout">
        <div className="shipping-details">
          <h2>Shipping Information</h2>
          <Input name="fullName" label="Full Name" value={formData.fullName} onChange={handleInputChange} required />
          <Input name="email" label="Email Address" type="email" value={formData.email} onChange={handleInputChange} required />
          <Input name="addressLine1" label="Address Line 1" value={formData.addressLine1} onChange={handleInputChange} required />
          <Input name="addressLine2" label="Address Line 2 (Optional)" value={formData.addressLine2} onChange={handleInputChange} />
          <Input name="city" label="City" value={formData.city} onChange={handleInputChange} required />
          <Input name="state" label="State / Province" value={formData.state} onChange={handleInputChange} required />
          <Input name="postalCode" label="Postal Code" value={formData.postalCode} onChange={handleInputChange} required />
          <Input name="country" label="Country" value={formData.country} onChange={handleInputChange} required />
          <Input name="phoneNumber" label="Phone Number (Optional)" value={formData.phoneNumber} onChange={handleInputChange} />
        </div>

        <div className="checkout-summary">
          <h2>Your Order</h2>
          <div className="order-items-summary">
            {cartItems.map(item => (
              <div key={item._id} className="summary-item">
                <span>{item.name} &times; {item.quantity}</span>
                <span>₦{((item.salePrice || item.price) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-row"><span>Subtotal</span><span>₦{cartTotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>₦{shippingCost.toFixed(2)}</span></div>
          <div className="summary-row total"><span>Total</span><span>₦{totalAmount.toFixed(2)}</span></div>

          <div className="payment-method">
            <h3>Payment Method</h3>
            <label><input type="radio" name="paymentMethod" value="paystack" checked={paymentMethod === 'paystack'} onChange={(e) => setPaymentMethod(e.target.value)} /> Pay with Paystack</label>
            <label><input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} /> Cash on Delivery</label>
          </div>

          {error && <p className="error-message">{error}</p>}

          <Button type="submit" className="place-order-btn" disabled={loading}>
            {loading ? 'Processing...' : `Place Order`}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
