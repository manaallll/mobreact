import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setLoading, setError } from '../redux/store';
import './shopItem.css';

// Import all product images for fallback
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

function ShopItem() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true));
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        dispatch(setProducts(data));
      } catch (err) {
        dispatch(setError('Failed to fetch products'));
        console.error('Error fetching products:', err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch]);

  const getProductImage = (product) => {
    if (product.image) {
      return `http://localhost:5000${product.image}`;
    }
    return productImages[product.id] || product1;
  };

  if (loading) {
    return (
      <div className="shop-page">
        <h1 className="shop-title">Our Jewelry Collection</h1>
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-page">
        <h1 className="shop-title">Our Jewelry Collection</h1>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <h1 className="shop-title">Our Jewelry Collection</h1>
      
      <div className="shop-grid">
        {products.map((item) => (
          <div key={item.id} className="shop-card">
            <Link to={`/shopitem/${item.id}`} className="shop-card-link">
              <div className="shop-card-image-wrapper">
                <img 
                  src={getProductImage(item)} 
                  alt={item.name} 
                  className="shop-card-image" 
                  onError={(e) => {
                    e.target.src = productImages[item.id] || product1;
                  }}
                />
              </div>
              <div className="shop-card-content">
                <h3 className="shop-item-name">{item.name}</h3>
                <p className="shop-item-price">${item.price}</p>
                <div className="shop-item-rating">
                  {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                </div>
                <div className="card-actions">
                  <button className="view-item-btn">View Item</button>
                  <div className="action-buttons">
                    <Link to={`/shopitem/${item.id}/edit`} className="edit-btn">Edit</Link>
                    <Link to={`/shopitem/${item.id}/delete`} className="delete-btn">Delete</Link>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopItem;