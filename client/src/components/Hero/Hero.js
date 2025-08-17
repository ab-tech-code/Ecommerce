import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        {/* The background image is applied via CSS for better control */}
      </div>
      <div className="container hero-content">
        <h1 className="hero-title">Bring Nature Into Your Home</h1>
        <p className="hero-subtitle">
          Discover our collection of beautiful and healthy plants, stylish planters, and unique garden furniture.
        </p>
        <Link to="/products" className="hero-cta-button">
          Shop All Products
        </Link>
      </div>
    </section>
  );
};

export default Hero;
