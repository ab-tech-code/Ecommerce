import React from 'react';
import './ValueProps.css';

const valuePropsData = [
  {
    icon: '🚚',
    title: 'Free Delivery',
    description: 'On all orders over $100. We deliver to your doorstep, hassle-free.'
  },
  {
    icon: '🔄',
    title: 'Easy Returns',
    description: 'Not happy with your purchase? We offer a 30-day return policy.'
  },
  {
    icon: '🔒',
    title: 'Secure Checkout',
    description: 'Your payments are processed securely with our trusted partners.'
  },
  {
    icon: '🌱',
    title: 'Expert Quality',
    description: 'All our plants are sourced and cared for by horticultural experts.'
  }
];

const ValueProps = () => {
  return (
    <div className="props-grid">
      {valuePropsData.map((prop) => (
        <div key={prop.title} className="prop-item">
          <div className="prop-icon">{prop.icon}</div>
          <h3 className="prop-title">{prop.title}</h3>
          <p className="prop-description">{prop.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ValueProps;
