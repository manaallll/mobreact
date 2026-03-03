import React, { useState, useEffect } from "react";
import rev2 from "../assets/revslider2.jpg";
import rev1 from "../assets/revslider1.jpg";
import rev3 from "../assets/revslider3.jpg";
import "./imageSlider.css";

const images = [rev2, rev1, rev3];

// Text content for each slide
const slideContent = [
  {
    title: "LUXURY NECKLACE",
    subtitle: "Graceful & Eye-Catching Necklaces",
    description: "Get lifted with the 21 Day Facial Gua Sha Challenge!",
    cta: "Shop now",
    link: "/ShopItem"
  },
  {
    title: "OUR EARRINGS",
    subtitle: "Find the Perfect Ring Make",
    description: "Get lifted with the 21 Day Facial Gua Sha Challenge!",
    cta: "Shop now"
  },
  {
    title: "PURELY HAND-CRAFTED",
    subtitle: "Charm For Your Everyday",
    description: "Get lifted with the 21 Day Facial Gua Sha Challenge!",
    cta: "Shop now"
  }
];

function ImageSlider() {
  const [index, setIndex] = useState(0);

  // Change image every 3 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const imageStyle = (i) => ({
    backgroundImage: `url(${images[i]})`,
    opacity: i === index ? 1 : 0,
  });

  // Hover effect for CTA
  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = "rgb(212, 175, 55)";
    e.target.style.color = "white";
    e.target.style.borderRadius = "8px";
    e.target.style.transform = "scale(1.1)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "transparent";
    e.target.style.color = "white";
    e.target.style.borderRadius = "8px";
    e.target.style.transform = "scale(1)";
  };

  return (
    <div className="image-slider-container">
      {images.map((_, i) => (
        <div key={i} className="image-slide" style={imageStyle(i)}>
          {i === index && (
            <div className="text-container">
              <h1 className="slide-title">{slideContent[i].title}</h1>
              <h2 className="slide-subtitle">{slideContent[i].subtitle}</h2>
              <p className="slide-description">{slideContent[i].description}</p>
              <a 
                href={slideContent[i].link || "/ShopItem"} 
                className="cta-button"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {slideContent[i].cta}
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ImageSlider;