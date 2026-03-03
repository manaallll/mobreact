import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import products from '../Products.jsx';
import './itemsPage.css';

function ItemsPage() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get('q') || '').trim().toLowerCase();

  const matchesQuery = (item) => {
    if (!q) return true;
    
    // Define category mappings for singular/plural variations
    const categoryMap = {
      'earring': 'earrings',
      'earrings': 'earrings',
      'necklace': 'necklace',
      'necklaces': 'necklace',
      'ring': 'ring',
      'rings': 'ring',
      'bracelet': 'bracelet',
      'bracelets': 'bracelet'
    };
    
    // Normalize the query
    const normalizedQuery = categoryMap[q] || q;
    
    // Check if item category matches the normalized query
    if (item.category && item.category.toLowerCase() === normalizedQuery) {
      return true;
    }
    
    return false;
  };

  const results = products.filter(matchesQuery);

  return (
    <div className="items-page">
      <div className="items-container">
        <h1 className="items-title">Search results{q ? ` for "${q}"` : ''}</h1>

        {results.length === 0 ? (
          <div className="items-empty">
            <p className="no-items-message">No items found. Try "necklace", "ring", "earrings" or "bracelets".</p>
          </div>
        ) : (
          <div>
            <p className="items-count">Found {results.length} item(s)</p>
            <div className="items-grid">
              {results.map((it) => (
                <div key={it.id} className="item-card">
                  <Link to={`/shopitem/${it.id}`} className="item-card-link">
                    <div className="item-image-container">
                      <img src={it.image} alt={it.name} className="item-image" />
                    </div>
                    <div className="item-info">
                      <h3 className="item-name">{it.name}</h3>
                      <p className="item-details">{it.category} • {it.price}</p>
                      <button className="view-item-btn">View Item</button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemsPage;