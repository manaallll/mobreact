import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/store';
import './AddItem.css';

function AddItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    rating: 5,
    category: 'earrings',
    image: null,
    imagePreview: null
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, WebP)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size too large. Please select an image smaller than 5MB.');
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: previewUrl
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const submissionData = new FormData();
      submissionData.append('name', formData.name);
      submissionData.append('price', parseFloat(formData.price));
      submissionData.append('description', formData.description);
      submissionData.append('rating', formData.rating);
      submissionData.append('category', formData.category);
      
      if (formData.image) {
        submissionData.append('image', formData.image);
      }
      
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: submissionData,
      });
      
      const newProduct = await response.json();
      dispatch(addProduct(newProduct));
      alert('Product added successfully!');
      navigate('/shopitem');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const clearForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      rating: 5,
      category: 'earrings',
      image: null,
      imagePreview: null
    });
  };

  return (
    <div className="add-item-page">
      <div className="add-item-container">
        <div className="form-header">
          <h1 className="add-item-title">Add New Product</h1>
          <p className="form-subtitle">Fill in the details to add a new item to your jewelry collection</p>
        </div>
        
        <form onSubmit={handleSubmit} className="add-item-form">
          <div className="form-layout">
            <div className="form-column image-section">
              <div className="image-upload-container">
                <div className="image-preview">
                  {formData.imagePreview ? (
                    <img 
                      src={formData.imagePreview} 
                      alt="Product preview" 
                      className="preview-image" 
                    />
                  ) : (
                    <div className="image-placeholder">
                      <span className="placeholder-icon">📷</span>
                      <p>Product Image Preview</p>
                      <p className="image-requirements">Max size: 5MB<br />Formats: JPG, PNG, GIF, WebP</p>
                    </div>
                  )}
                </div>
                
                <div className="file-input-group">
                  <label htmlFor="image" className="file-input-label">
                    <span className="upload-icon">↑</span>
                    Choose Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    className="form-file"
                    accept="image/jpeg, image/jpg, image/png, image/gif, image/webp"
                  />
                  {formData.image && (
                    <p className="file-name">{formData.image.name}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="form-column fields-section">
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
                  className="form-input"
                  placeholder="e.g., Everyday Forever Bracelet"
                  required
                />
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
                      className="form-input price-input"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
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
                    className="form-select"
                    required
                  >
                    <option value="earrings">Earrings</option>
                    <option value="necklace">Necklace</option>
                    <option value="ring">Ring</option>
                    <option value="bracelet">Bracelet</option>
                  </select>
                </div>
              </div>

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

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="4"
                  placeholder="Describe the product features, materials, and unique qualities..."
                  required
                />
                <div className="character-count">
                  {formData.description.length}/500 characters
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={clearForm}
              disabled={submitting}
            >
              Clear Form
            </button>
            <div className="action-buttons">
              <button type="submit" className="btn-primary" disabled={submitting}>
                <span className="btn-icon">+</span>
                {submitting ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;