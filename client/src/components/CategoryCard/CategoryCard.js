import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

/**
 * A component to display a link to a product category.
 * @param {{category: {name: string, image: string, link: string}}} props
 */
const CategoryCard = ({ category }) => {
  const { name, image, link } = category;

  return (
    <Link to={link} className="category-card">
      <div
        className="category-card-background"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="category-card-content">
        <h3 className="category-card-title">{name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
