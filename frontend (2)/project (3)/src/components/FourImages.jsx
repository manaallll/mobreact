import React from 'react';
import './fourImages.css';

import body1 from '../assets/body1.jpg'; // Path: From src/, go into assets/
import body2 from '../assets/body2.jpg';
import body3 from '../assets/body3.jpg';
import body4 from '../assets/body4.jpg';


 

const FourImages = () => {
  return (
    <div className="images-container">

      {/* FIRST Image (realheart.jpg) with Text Overlay */}
      <div className="image-wrapper">
        <img src={body1} alt="Real Heart" className="full-width-image" />
        <div className="text-overlay left-align">
         
          
        </div>
         <div className="hover-caption">
             <p className="description">
            One-Of-A-<br/>
            Kinds<br/>
            Unique pieces you'll like!
          </p>

         </div>
      </div>

      
      <div className="image-wrapper">
        <img src={body2} alt="Product 14" className="full-width-image" />
        <div className="text-overlay left-align">
         
         
          
        </div>
         <div className="hover-caption">
             <p className="description">
            High Tide <br/>
            Looks<br/>
            Featuring unique and hand sourced<br/> gemstones from all over the world.
          </p>

         </div>
      </div>

      <div className="image-wrapper">
        <img src={body3} alt="Product 14" className="full-width-image" />
        <div className="text-overlay left-align">
          
         
          
        </div>
          <div className="hover-caption">
             <p className="description">
            New Organic <br/>Dom
            
            From solid gold to dimond jewelery,<br/> we've got you covered!
          </p>

         </div>
      </div>

      <div className="image-wrapper">
        <img src={body4} alt="Product 14" className="full-width-image" />
        <div className="text-overlay left-align">
         
          
        </div>
         <div className="hover-caption">
             <p className="description">
            The Tiffany<br />
            Icons<br />
            The flora necklace collection is<br/> inspired by nature's beauty.
          </p>

         </div>
      </div>

    </div>
  );
};

export default FourImages;