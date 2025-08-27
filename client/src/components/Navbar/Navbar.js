import React, { useState, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useContext(CartContext);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMobileMenu}>Albustan</Link>
        </div>

        <nav className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><NavLink to="/" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active-link" : ""}>Home</NavLink></li>
            <li><NavLink to="/products" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active-link" : ""}>Products</NavLink></li>
            <li><NavLink to="/about" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active-link" : ""}>About</NavLink></li>
            <li><NavLink to="/services" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active-link" : ""}>Services</NavLink></li>
            <li><NavLink to="/blog" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active-link" : ""}>Blog</NavLink></li>
            <li><NavLink to="/contact" onClick={closeMobileMenu} className={({isActive}) => isActive ? "active-link" : ""}>Contact</NavLink></li>
          </ul>
        </nav>

        <div className="navbar-actions">
          <button className="icon-button">
            {/* Search Icon */}
            <span role="img" aria-label="Search">🔍</span>
          </button>
          <NavLink to="/cart" className="icon-button">
            {/* Cart Icon */}
            <span role="img" aria-label="Shopping Cart">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>
          <button className="icon-button">
            {/* User Icon */}
            <span role="img" aria-label="User Account">👤</span>
          </button>
        </div>

        <div className="hamburger" onClick={toggleMobileMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
