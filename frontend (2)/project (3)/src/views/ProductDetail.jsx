import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './productDetail.css';

// Import all product images at the top
import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';
import product3 from '../assets/product3.jpg';
import product4 from '../assets/product4.jpg';
import product5 from '../assets/product5.jpg';
import product6 from '../assets/product6.jpg';
import product7 from '../assets/product7.jpg';
import product8 from '../assets/product8.jpg';
import product9 from '../assets/product9.jpg';
import product10 from '../assets/product10.jpg';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Image mapping object
  const productImages = {
    1: product1,
    2: product2,
    3: product3,
    4: product4,
    5: product5,
    6: product6,
    7: product7,
    8: product8,
    9: product9,
    10: product10
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const productData = await response.json();
        setProduct(productData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const getProductImage = (product) => {
    if (product.image) {
      return `http://localhost:5000${product.image}`;
    }
    return productImages[product.id] || product1;
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="loading">Loading product details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-page">
        <h2 className="product-not-found">{error}</h2>
        <Link to="/shopitem" className="back-to-shop-link">← Back to Shop</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <h2 className="product-not-found">Product not found</h2>
        <Link to="/shopitem" className="back-to-shop-link">← Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        <div className="product-image-wrapper">
          <img 
            src={getProductImage(product)} 
            alt={product.name} 
            className="product-detail-image" 
            onError={(e) => {
              // Fallback if image fails to load
              e.target.src = product1;
            }}
          />
        </div>
        <div className="product-info-section">
          <h1 className="product-name">{product.name}</h1>
          <div className="product-rating">
            {'★'.repeat(product.rating)}
            {'☆'.repeat(5 - product.rating)}
          </div>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
          <button className="add-to-cart-btn">Add to Cart</button>
          <Link to="/shopitem" className="back-to-shop-link">← Back to Shop</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;