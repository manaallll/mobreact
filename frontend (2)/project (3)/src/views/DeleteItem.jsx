import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/store';
import './DeleteItem.css';

function DeleteItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to load product data.');
        navigate('/shopitem');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      
      dispatch(deleteProduct(parseInt(id)));
      alert('Product deleted successfully!');
      navigate('/shopitem');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="delete-item-page">
        <div className="delete-container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="delete-item-page">
        <div className="delete-container">
          <div className="error">Product not found.</div>
          <Link to="/shopitem" className="back-link">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="delete-item-page">
      <div className="delete-container">
        <div className="delete-header">
          <h1 className="delete-title">Delete Product</h1>
          <p className="delete-subtitle">Are you sure you want to delete this product?</p>
        </div>
        
        <div className="product-preview">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-price">${product.price}</p>
          <p className="product-category">{product.category}</p>
          <p className="product-description">{product.description}</p>
          <div className="product-meta">
            <span className="product-rating">
              Rating: {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
            </span>
          </div>
        </div>

        <div className="delete-warning">
          <div className="warning-icon">⚠️</div>
          <p>This action cannot be undone. The product will be permanently removed from the system.</p>
        </div>

        <div className="delete-actions">
          <Link to="/shopitem" className="btn-cancel">
            Cancel
          </Link>
          <button 
            onClick={handleDelete}
            disabled={deleting}
            className="btn-delete"
          >
            {deleting ? 'Deleting...' : 'Delete Product'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteItem;