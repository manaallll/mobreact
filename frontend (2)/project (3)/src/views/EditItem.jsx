import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../redux/store';
import './AddItem.css';


function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setFormData(data);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const updatedProduct = await response.json();
      dispatch(updateProduct(updatedProduct));
      alert('Product updated successfully!');
      navigate('/shopitem');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="add-item-page">Loading...</div>;
  }

  if (!formData) {
    return <div className="add-item-page">Product not found.</div>;
  }

  return (
    <div className="add-item-page">
      <div className="add-item-container">
        <div className="form-header">
          <h1 className="add-item-title">Edit Product</h1>
          <p className="form-subtitle">Update the details of your jewelry item</p>
        </div>
        
        <form onSubmit={handleSubmit} className="add-item-form">
          <div className="form-layout">
            <div className="form-column fields-section full-width">
              <div className="form-group full-width">
                <label htmlFor="name" className="form-label">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="e.g., Everyday Forever Bracelet"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price" className="form-label">
                    Price *
                  </label>
                  <div className="price-input-container">
                    <span className="currency-symbol">$</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className={`form-input price-input ${errors.price ? 'error' : ''}`}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  {errors.price && <span className="error-message">{errors.price}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="category" className="form-label">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`form-select ${errors.category ? 'error' : ''}`}
                  >
                    <option value="earrings">Earrings</option>
                    <option value="necklace">Necklace</option>
                    <option value="ring">Ring</option>
                    <option value="bracelet">Bracelet</option>
                  </select>
                  {errors.category && <span className="error-message">{errors.category}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="rating" className="form-label">
                    Rating
                  </label>
                  <div className="rating-selector">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`rating-star ${star <= formData.rating ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      >
                        ★
                      </button>
                    ))}
                    <span className="rating-text">
                      {formData.rating} {formData.rating === 1 ? 'star' : 'stars'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`form-textarea ${errors.description ? 'error' : ''}`}
                  rows="4"
                  placeholder="Describe the product features, materials, and unique qualities..."
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
                <div className="character-count">
                  {formData.description.length}/500 characters
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => navigate('/shopitem')}
              disabled={submitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={submitting}
            >
              <span className="btn-icon">✓</span>
              {submitting ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItem;