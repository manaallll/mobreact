import React from 'react';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Remove .js extension
import Header from './components/Header.jsx';
import ImageSlider from './components/ImageSlider.jsx';
import NextImages1 from './components/NextImages1.jsx';
import TextSlider from './components/TextSlider.jsx';
import TextImage from './components/TextImage.jsx';
import FourImages from './components/FourImages.jsx';
import Footer from './components/Footer.jsx';
import BestSellersSection from './components/BestSellersSection.jsx';
import NextImages2 from './components/NextImages2.jsx';
import TrendProducts from './components/TrendProducts.jsx';
import AboutHeader from './components/AboutHeader.jsx';    
import ShopItem from './views/ShopItem.jsx';   
import AboutStory from './components/AboutStory.jsx';
import AboutImages from './components/AboutImages.jsx';
import SignUp from './views/SignUp.jsx';
import LogIn from './views/LogIn.jsx';
import ItemsPage from './views/ItemsPage.jsx';   
import ContactUs from './views/ContactUs.jsx';
import ProductDetail from './views/ProductDetail.jsx';
import AddItem from './views/AddItem.jsx';
import EditItem from './views/EditItem.jsx';
import DeleteItem from './views/DeleteItem.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';


function HomePage() {
  return (
    <>
      <ImageSlider />
      <NextImages2 />
      <TextSlider />
      <TextImage />
      <BestSellersSection />
      <FourImages />  
      <TrendProducts />
      <NextImages1 />
    </>
  );
}

function AboutUs() {
  return (
    <>
      <AboutHeader />
      <AboutStory />
      <AboutImages  />
    </>
  );
}

function Search() {
  return (
    <>
    <ItemsPage />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/*" element={
            <div>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/shopitem" element={<ShopItem />} />
                <Route path="/shopitem/:id" element={<ProductDetail />} />
                <Route path="/shopitem/:id/edit" element={<EditItem />} />
                <Route path="/shopitem/:id/delete" element={<DeleteItem />} />
                <Route path="/search" element={<Search />} />
                <Route path="/additem" element={<AddItem />} />
                
              </Routes>
              <Footer />
            </div>
          } />
          
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;