import React from 'react';
import { Link } from 'react-router-dom';
import './TrendCard.css';

const TrendCard = ({ imageSrc, brand, reviews, price, productId }) => {
  // Simple star display
  const renderStars = (num) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < num ? 'star-filled' : 'star-empty'}>
          ★
        </span>
      );
    }
    return <div className="stars">{stars}</div>;
  };

  return (
    <div className="product-card">
      <Link to={`/shop/${productId}`} className="product-card-link">
        <img src={imageSrc} alt={brand} className="product-image" />
        <p className="product-brand">{brand}</p>
        {renderStars(reviews)}
        <p className="product-price">{price}</p>
        <button className="product-shop-button">Shop now</button>
      </Link>
    </div>
  );
};

export default TrendCard;