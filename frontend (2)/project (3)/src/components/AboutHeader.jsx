import React from 'react';
import './aboutHeader.css';

function AboutHeader() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>OLIGHT JEWELRY</h1>
        
        <div className="hero-text">
          <p>Discover Exquisite Handcrafted Pieces</p>
        </div>
        
        <a href="#collections" className="hero-cta">
          Explore Collection
        </a>
      </div>
    </section>
  );
}

export default AboutHeader;