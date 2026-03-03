import React from 'react';
import './Nextimages2.css';
import { Link } from 'react-router-dom';
// Ensure these paths are correct for your project structure
import realheart from '../assets/next1.jpg'; // Path: From src/, go into assets/
import product14 from '../assets/next2.jpg'; // Path: From src/, go into assets/

const NextImages2 = () => {
  return (
    <div className="images-container">

      {/* FIRST Image (realheart.jpg) with Text Overlay */}
      <div className="image-wrapper">
        <img src={realheart} alt="Real Heart" className="full-width-image" />
        <div className="text-overlay left-align">
          <p className="overlay-heading">LUXURY NECKLACES</p>
          <p className="overlay-subheading">
            Best Friend<br/>
            Jewelry<br/>
          </p>
          <p className="overlay-description">
            A wide range of exquisite<br />
           earrings<br />
           
          </p>
          <Link to="/ShopItem" className="overlay-button">Shop now</Link>
        </div>
      </div>

      {/* SECOND Image (product14.jpg) with Text Overlay */}
      <div className="image-wrapper">
        <img src={product14} alt="Product 14" className="full-width-image" />
        <div className="text-overlay left-align">
          <p className="overlay-heading">OUR EARRINGS</p>
          <p className="overlay-subheading">
            Diamond Stud<br />
            Earrings<br />
            
          </p>
          <p className="overlay-description">
            A wide range of exquisite<br />
           earrings<br />
           
          </p>
          <Link to="/ShopItem" className="overlay-button">Shop now</Link>
        </div>
      </div>

    </div>
  );
};

export default NextImages2;