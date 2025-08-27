import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Will create this file next

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* --- Newsletter Signup --- */}
        <div className="footer-newsletter">
          <h3>Join Our Newsletter</h3>
          <p>Get the latest updates on new products and upcoming sales.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        <div className="footer-main">
          {/* --- About Section --- */}
          <div className="footer-section about">
            <h4 className="footer-logo">Albustan</h4>
            <p>Bringing nature closer to you, one plant at a time. High-quality plants, furniture, and garden accessories.</p>
          </div>

          {/* --- Quick Links --- */}
          <div className="footer-section links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/products">Shop All</Link></li>
            </ul>
          </div>

          {/* --- Customer Service --- */}
          <div className="footer-section links">
            <h4>Support</h4>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping & Returns</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/admin">Admin</Link></li>
            </ul>
          </div>

          {/* --- Social Media --- */}
          <div className="footer-section social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">PI</a>
            </div>
          </div>
        </div>

        {/* --- Copyright --- */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Albustan. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
