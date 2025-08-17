import React from 'react';
import { Link } from 'react-router-dom';
import './CallToAction.css';

const CallToAction = () => {
  return (
    <section className="cta-section">
      <div className="container cta-content">
        <h2 className="cta-title">Ready to Find Your Perfect Plant?</h2>
        <p className="cta-text">
          Browse our full collection of plants, furniture, and accessories to create your own green oasis.
        </p>
        <Link to="/products" className="cta-button">
          Explore Products
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
