import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleNavClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    const q = (searchQuery || '').trim();
    if (!q) return;
    setSearchOpen(false);
    setSearchQuery('');
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className={open ? 'open' : ''}>
      {/* Hamburger for mobile */}
      <button
        className={`menu-toggle ${open ? 'open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Logo */}
      <h1 className="title">OLIGHT</h1>

      {/* Navigation */}
      <nav className={`sidebar ${open ? 'show' : ''}`}>
        <div className="nav-links">
          <Link to="/" onClick={handleNavClick}>Home</Link>
          <Link to="/about" onClick={handleNavClick}>About Us</Link>
          <Link to="/contact" onClick={handleNavClick}>Contact Us</Link>
          <Link to="/shopitem" onClick={handleNavClick}>Shop Item</Link>
          <Link to="/additem" onClick={handleNavClick}>Add Item</Link>
        </div>

        {/* Icons (desktop on right, mobile below links) */}
        <div className="nav-icons">
          {/* Profile */}
          <Link to="/signup" className="icon-btn" aria-label="Account" onClick={handleNavClick}>
            <ion-icon name="person-outline"></ion-icon>
          </Link>

          {/* Search: desktop version */}
          <button
            className="icon-btn search-icon-desktop"
            aria-label="Search"
            onClick={() => { setSearchOpen((s) => !s); setOpen(false); }}
          >
            <ion-icon name="search-outline"></ion-icon>
          </button>

          <button className="icon-btn" aria-label="Cart">
            <ion-icon name="cart-outline"></ion-icon>
          </button>
        </div>
      </nav>

      {/* Search Icon - Mobile only */}
      <button
        className="search-icon-mobile"
        aria-label="Search"
        onClick={() => { setSearchOpen((s) => !s); setOpen(false); }}
      >
        <ion-icon name="search-outline"></ion-icon>
      </button>

      {/* Inline search overlay / dropdown */}
      {searchOpen && (
        <div className="header-search-overlay" role="dialog" aria-modal="true">
          <form className="header-search-form" onSubmit={handleSearchSubmit}>
            <input
              ref={inputRef}
              type="search"
              placeholder="Search for jewelry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchOpen(false);
                if (e.key === 'Enter') handleSearchSubmit(e);
              }}
            />
            <button type="submit" aria-label="Search submit">Search</button>
            <button
              type="button"
              className="search-close"
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
            >
              ✕
            </button>
          </form>
        </div>
      )}
    </header>
  );
}

export default Header;