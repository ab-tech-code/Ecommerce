import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './ProductCard.css';

/**
 * A reusable component to display a single product in a card format.
 * @param {{product: object}} props - The product data to display.
 */
const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  if (!product) {
    return null; // Or a placeholder/loading state
  }

  const { name, slug, category, price, salePrice, images } = product;
  const displayPrice = salePrice ? salePrice : price;
  const isOnSale = !!salePrice;

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent link navigation when clicking the button
    addToCart(product, 1);
    alert(`${name} added to cart!`); // Placeholder for toast notification
  };

  return (
    <Link to={`/products/${slug}`} className="product-card">
      <div className="product-card-image">
        <img src={images[0]} alt={name} loading="lazy" />
        {isOnSale && <span className="sale-badge">Sale</span>}
      </div>
      <div className="product-card-info">
        <p className="product-category">{category}</p>
        <h3 className="product-name">{name}</h3>
        <div className="product-price">
          {isOnSale && <span className="original-price">${price.toFixed(2)}</span>}
          <span className="display-price">${displayPrice.toFixed(2)}</span>
        </div>
      </div>
      <button onClick={handleAddToCart} className="add-to-cart-btn">
        Add to Cart
      </button>
    </Link>
  );
};

export default ProductCard;
