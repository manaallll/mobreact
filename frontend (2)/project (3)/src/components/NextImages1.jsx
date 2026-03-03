import React from 'react';
import './Nextimages1.css';
import { Link } from 'react-router-dom';
// Ensure these paths are correct for your project structure
import realheart from '../assets/realheart.jpg'; // Path: From src/, go into assets/
import product14 from '../assets/product14.jpg'; // Path: From src/, go into assets/

const Nextimages1 = () => {
  return (
    <div className="images-container">

      {/* FIRST Image (realheart.jpg) with Text Overlay */}
      <div className="image-wrapper">
        <img src={realheart} alt="Real Heart" className="full-width-image" />
        <div className="text-overlay left-align">
          <p className="overlay-heading">favorite items</p>
          <p className="overlay-subheading">
            Unique<br />
            Engagement<br />
            Rings
          </p>
          <p className="overlay-description">
            From special antique diamonds<br />
            to one of-a-kind colored<br />
            gemstones.
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
            Add These<br />
            To Your Style<br />
            Roster
          </p>
          <p className="overlay-description">
            Grab the deal right now! You<br />
            can get an extra 15% off this<br />
            season.
          </p>
          <Link to="/ShopItem" className="overlay-button">Shop now</Link>
        </div>
      </div>

    </div>
  );
};

export default Nextimages1;