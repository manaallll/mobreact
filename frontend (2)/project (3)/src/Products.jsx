// central product catalog used by search/results
import p1 from './assets/product1.jpg';
import p2 from './assets/product2.jpg';
import p3 from './assets/product3.jpg';
import p4 from './assets/product4.jpg';
import p5 from './assets/product5.jpg';
import p6 from './assets/product6.jpg';
import p7 from './assets/product7.jpg';
import p8 from './assets/product8.jpg';
import p9 from './assets/product9.jpg';
import p10 from './assets/product10.jpg';
import p11 from './assets/product11.jpg';
import best1 from './assets/best1.jpg';
import best2 from './assets/best2.jpg';
import best3 from './assets/best3.jpg';
import best4 from './assets/best4.jpg';
import best5 from './assets/best5.jpg';

const products = [
  // BestSellersSection items (mapped categories) - FIXED CATEGORIES
  { id: 1, name: 'Luminous earrings', category: 'earrings', image: p1, price: '$120.00' },
  { id: 2, name: 'Classic earrings', category: 'earrings', image: p2, price: '$250.00' },
  { id: 3, name: 'Pearl Earrings', category: 'earrings', image: p3, price: '$180.00' },
  { id: 4, name: 'Gold necklace', category: 'necklace', image: p4, price: '$99.99' },
  { id: 5, name: 'Shimmer ring', category: 'ring', image: p5, price: '$300.00' },
  { id: 6, name: 'Timeless necklace', category: 'necklace', image: p6, price: '$210.00' },
  { id: 7, name: 'Bold Ring', category: 'ring', image: p7, price: '$275.00' },
  { id: 8, name: 'Gleam Ring', category: 'ring', image: p8, price: '$160.00' },
  { id: 9, name: 'Golden Ring', category: 'ring', image: p9, price: '$240.00' },
  { id: 10, name: 'Opulent Ring', category: 'ring', image: p10, price: '$130.00' },

  // TrendProducts items (example categories) - FIXED CATEGORIES
  { id: 11, name: 'Everyday rings', category: 'rings', image: best1, price: '$120.00' },
  { id: 12, name: 'Elegant Gem Necklace', category: 'necklace', image: best2, price: '$250.00' },
  { id: 13, name: 'Classic Drop Necklace', category: 'necklace', image: best3, price: '$180.00' },
  { id: 14, name: 'Luxe Cuff necklace', category: 'necklace', image: best4, price: '$99.99' },
  { id: 15, name: 'Shimmer & Shine Necklace', category: 'necklace', image: best5, price: '$300.00' },

  // extra / fallback items - FIXED CATEGORIES
  { id: 16, name: 'Minimalist Earrings', category: 'earring', image: p11, price: '$85.00' },
];

export default products;