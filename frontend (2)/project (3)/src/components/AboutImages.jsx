import React, { useEffect, useRef } from 'react';
import './aboutImages.css';
import braceletImg from '../assets/last1.jpg';
import necklaceImg from '../assets/last2.jpg';
import earringsImg from '../assets/last3.jpg';

function AboutImages() {
  const storyRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = storyRefs.current.indexOf(entry.target);
          
          if (entry.isIntersecting) {
            const animationClass = index % 2 === 0 ? 'animate-left' : 'animate-right';
            entry.target.classList.add(animationClass);
          } else {
            entry.target.classList.remove('animate-left', 'animate-right');
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    storyRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      storyRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el, index) => {
    if (el && !storyRefs.current.includes(el)) {
      storyRefs.current[index] = el;
    }
  };

  return (
    <section className="brand-story">
      <div className="story-container">

        {/* Bracelets Section */}
        <div 
          className="story-row" 
          ref={(el) => addToRefs(el, 0)}
        >
          <div className="story-image">
            <img 
              src={braceletImg} 
              alt="Elegant bracelets" 
              style={{ 
                width: '320px', 
                height: '320px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                border: '3px solid white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }} 
            />
          </div>
          <div className="story-content">
            <h3>Bracelets</h3>
            <p>
              Our <strong>bracelets</strong> embody balance and refinement — where modern design meets artisanal craftsmanship. 
              Each curve and clasp is shaped to embrace your wrist with light and sophistication. Whether worn solo or layered, 
              these radiant creations capture subtle glimmers that mirror your individuality.
            </p>
          </div>
        </div>

        {/* Necklaces Section */}
        <div 
          className="story-row reverse" 
          ref={(el) => addToRefs(el, 1)}
        >
          <div className="story-image">
            <img 
              src={necklaceImg} 
              alt="Beautiful necklaces" 
              style={{ 
                width: '320px', 
                height: '320px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                border: '3px solid white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }} 
            />
          </div>
          <div className="story-content">
            <h3>Necklaces</h3>
            <p>
              The <strong>necklace</strong> collection celebrates timeless grace with a touch of modern artistry. 
              From luminous pendants to layered chains, each piece is designed to draw attention softly, 
              illuminating the neckline with effortless charm. Crafted from the finest materials, 
              these necklaces bring light closer to the heart — where elegance begins.
            </p>
          </div>
        </div>

        {/* Earrings Section */}
        <div 
          className="story-row" 
          ref={(el) => addToRefs(el, 2)}
        >
          <div className="story-image">
            <img 
              src={earringsImg} 
              alt="Exquisite earrings" 
              style={{ 
                width: '320px', 
                height: '320px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                border: '3px solid white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }} 
            />
          </div>
          <div className="story-content">
            <h3>Earrings</h3>
            <p>
              Designed to frame your face with radiance, our <strong>earrings</strong> bring light and movement to every expression. 
              Each design — from delicate studs to bold statement drops — is masterfully balanced in weight and form. 
              Elegant, versatile, and timeless, they are a reflection of confidence and luminous beauty.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutImages;
