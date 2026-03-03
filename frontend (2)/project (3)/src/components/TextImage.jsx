import React from "react";
import backg2 from "../assets/bg2.jpg";
import { Link } from 'react-router-dom';  
import './textImage.css';
// ...existing code...

const content = [
  {
    title: "OLIGHT COLLECTION",
    subtitle: "Shop The Latest Trends",
    description: "Exeptional Handcrafted Design To Enhance The Magnificent Glow!",
    cta: "Shop now",
    link: "/ShopItem"
  },
];

function TextImage() {
  return (
    <div className="text-image-container">
      <div
        className="text-image-image"
        style={{ backgroundImage: `url(${backg2})` }}
        role="img"
        aria-label={content[0].title}
      >
        <div className="text-image-overlay">
          <h1 className="text-image-title">{content[0].title}</h1>
          <h2 className="text-image-subtitle">{content[0].subtitle}</h2>
          <p className="text-image-description">{content[0].description}</p>
          <a href="/ShopItem" className="text-image-cta-button">{content[0].cta}</a>
        </div>
      </div>
    </div>
  );
}

export default TextImage;
// ...existing code...