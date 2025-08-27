import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CartContext } from '../context/CartContext';
import Button from '../components/common/Button/Button';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="container cart-empty">
        <Helmet>
            <title>Your Shopping Cart is Empty | GardenVerde</title>
        </Helmet>
        <h1>Your Cart is Empty</h1>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Button>
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <Helmet>
        <title>Shopping Cart | GardenVerde</title>
      </Helmet>
      <h1>Your Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.images[0]} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <Link to={`/products/${item.slug}`} className="item-name">{item.name}</Link>
                <p className="item-price">₦{(item.salePrice || item.price).toFixed(2)}</p>
                <div className="item-actions">
                  <div className="quantity-selector">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item._id)} className="remove-btn">Remove</button>
                </div>
              </div>
              <div className="cart-item-subtotal">
                ₦{((item.salePrice || item.price) * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₦{cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{cartTotal > 100 ? 'Free' : '₦10.00'}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₦{(cartTotal > 100 ? cartTotal : cartTotal + 10).toFixed(2)}</span>
          </div>
          <Link to="/checkout">
            <Button className="checkout-btn">Proceed to Checkout</Button>
          </Link>
          <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
