import React from 'react';
import './Loader.css';

/**
 * A simple CSS-based loading spinner.
 */
const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
    </div>
  );
};

export default Loader;
