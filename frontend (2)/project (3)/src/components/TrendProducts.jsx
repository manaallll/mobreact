import React, { useRef, useEffect } from 'react';
import ProductCard from './TrendCard';
import './TrendProducts.css';

// Import all product images
import best1 from '../assets/best1.jpg';
import best2 from '../assets/best2.jpg';
import best3 from '../assets/best3.jpg';
import best4 from '../assets/best4.jpg';
import best5 from '../assets/best5.jpg';
import best6 from '../assets/product11.jpg';
import best7 from '../assets/product7.jpg';
import best8 from '../assets/product8.jpg';
import best9 from '../assets/product1.jpg';
import best10 from '../assets/product10.jpg';

const TrendProducts = () => {
  const carouselRef = useRef(null);
  const scrollInterval = 700;
  const cardWidthWithMargin = 230;

  // Define products with proper IDs that match your ProductDetail.jsx
  const originalProducts = [
    { id: 1, image: best1, brand: 'Everyday Forever Brand', reviews: 4, price: '$120.00' },
    { id: 2, image: best2, brand: 'Elegant Gems Collection', reviews: 5, price: '$250.00' },
    { id: 3, image: best3, brand: 'Classic Timepiece Co.', reviews: 3, price: '$180.00' },
    { id: 4, image: best4, brand: 'Luxe Wearables Inc.', reviews: 4, price: '$99.99' },
    { id: 5, image: best5, brand: 'Shimmer & Shine', reviews: 5, price: '$300.00' },
    { id: 6, image: best6, brand: 'Timeless Treasure', reviews: 4, price: '$210.00' },
    { id: 7, image: best7, brand: 'Bold Aura Designs', reviews: 5, price: '$275.00' },
    { id: 8, image: best8, brand: 'Gleam & Grace', reviews: 4, price: '$160.00' },
    { id: 9, image: best9, brand: 'Golden Era Co.', reviews: 5, price: '$240.00' },
    { id: 10, image: best10, brand: 'Opulent Touch', reviews: 4, price: '$130.00' },
  ];

  const numDuplicates = 2;
  const duplicatedProducts = [
    ...originalProducts.slice(-numDuplicates),
    ...originalProducts,
    ...originalProducts.slice(0, numDuplicates),
  ];

  const initialScrollLeft = numDuplicates * cardWidthWithMargin;
  const originalContentWidth = originalProducts.length * cardWidthWithMargin;

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (!carouselElement) return;

    carouselElement.scrollLeft = initialScrollLeft;

    let intervalId = null;
    let userScrollingTimeout;

    const autoScroll = () => {
      carouselElement.scrollBy({
        left: cardWidthWithMargin,
        behavior: 'smooth',
      });
    };

    const startAutoScroll = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(() => {
        const currentScroll = carouselElement.scrollLeft;
        if (currentScroll + carouselElement.clientWidth >= originalContentWidth + initialScrollLeft - 10) {
          carouselElement.scrollLeft = initialScrollLeft;
          setTimeout(() => {
            carouselElement.scrollBy({ left: cardWidthWithMargin, behavior: 'smooth' });
          }, 50);
        } else {
          autoScroll();
        }
      }, scrollInterval);
    };

    const stopAutoScroll = () => {
      if (intervalId) clearInterval(intervalId);
    };

    startAutoScroll();

    const handleScroll = () => {
      stopAutoScroll();
      clearTimeout(userScrollingTimeout);

      if (carouselElement.scrollLeft >= originalContentWidth + initialScrollLeft) {
        carouselElement.scrollLeft = initialScrollLeft + (carouselElement.scrollLeft - (originalContentWidth + initialScrollLeft));
      } else if (carouselElement.scrollLeft <= 0) {
        carouselElement.scrollLeft = originalContentWidth;
      }

      userScrollingTimeout = setTimeout(startAutoScroll, scrollInterval * 2);
    };

    carouselElement.addEventListener('scroll', handleScroll);

    return () => {
      stopAutoScroll();
      clearTimeout(userScrollingTimeout);
      carouselElement.removeEventListener('scroll', handleScroll);
    };
  }, [cardWidthWithMargin, scrollInterval, numDuplicates, originalProducts.length, initialScrollLeft, originalContentWidth]);

  const handleMouseEnter = () => {
    // Stop auto-scroll logic would go here
  };
  
  const handleMouseLeave = () => {
    // Start auto-scroll logic would go here
  };

  return (
    <section className="best-sellers-section">
      <h2 className="section-title">Trend Products</h2>
      <p className="section-description">
        Our jewelry is made by the finest artists and carefully selected to reflect your style and personality.
      </p>

      <div
        className="product-carousel"
        ref={carouselRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {duplicatedProducts.map((product, index) => (
          <ProductCard
            key={`${product.id}-${index}`}
            imageSrc={product.image}
            brand={product.brand}
            reviews={product.reviews}
            price={product.price}
            productId={product.id} // Pass the product ID
          />
        ))}
      </div>
    </section>
  );
};

export default TrendProducts;