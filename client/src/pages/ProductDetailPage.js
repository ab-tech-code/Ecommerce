import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchProductBySlug } from '../services/api';
import { CartContext } from '../context/CartContext';
import Loader from '../components/common/Loader/Loader';
import Button from '../components/common/Button/Button';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const { slug } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductBySlug(slug);
        setProduct(data.data.product);
      } catch (err) {
        setError(err.message || `Failed to fetch product: ${slug}`);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [slug]);

  const handleQuantityChange = (amount) => {
    setQuantity(prev => {
      const newQuantity = prev + amount;
      if (newQuantity < 1) return 1;
      if (newQuantity > product.stock) return product.stock;
      return newQuantity;
    });
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    alert(`${quantity} x ${product.name} added to cart!`);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="container error-message">Error: {error}</div>;
  }

  if (!product) {
    return (
        <div className="container">
            <Helmet>
                <title>Product Not Found | Albustan</title>
            </Helmet>
            <p>Product not found.</p>
        </div>
    );
  }

  const displayPrice = product.salePrice || product.price;
  const isOnSale = !!product.salePrice;

  return (
    <div className="container product-detail-page">
      <Helmet>
        <title>{`${product.name} | Albustan`}</title>
        <meta name="description" content={product.description.substring(0, 160)} />
      </Helmet>
      <div className="product-detail-layout">
        <div className="product-gallery">
          <img src={product.images[0]} alt={product.name} />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price">
            {isOnSale && <span className="original-price">₦{product.price.toFixed(2)}</span>}
            <span className="display-price">₦{displayPrice.toFixed(2)}</span>
          </div>
          <p className="product-description">{product.description}</p>

          <div className="product-actions">
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock}>+</button>
            </div>
            <Button onClick={handleAddToCart} disabled={product.stock === 0}>
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
          <p className="stock-info">
            {product.stock > 0 ? `${product.stock} in stock` : 'Currently unavailable'}
          </p>

          <div className="product-extra-info">
            {product.specs && (
              <div className="specs-section">
                <h3>Specifications</h3>
                <ul>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                  ))}
                </ul>
              </div>
            )}
            {product.careInfo && (
               <div className="care-info-section">
                <h3>Care Instructions</h3>
                <p>{product.careInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
