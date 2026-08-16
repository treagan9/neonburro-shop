// src/App.jsx
// SENTINEL: NB_SHOP_APP_V2
//
// Providers, routes and the three surfaces that live outside the routes: the
// nav, the saddlebag drawer, and the two homes of the saddlebag itself (the
// floating pill below DOCK_MIN, the docked column above it, see
// theme/layout.js). Both are mounted always and decide for themselves whether
// to render, so a route never has to know about the cart.
//
// Routes carry a trailing slash. /the-blind-lead is kept without one because
// it was linked that way in the wild before the rule.
//
// No oxford commas, no em dashes.

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import theme from './theme';
import ShopNavigation from './components/navigation/ShopNavigation';
import CartDrawer from './components/cart/CartDrawer';
import SaddlebagPill from './components/cart/SaddlebagPill';
import SaddlebagDock from './components/cart/SaddlebagDock';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import BlindLead from './pages/BlindLead';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import './styles/global.css';
import { CartProvider } from './context/CartContext';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <ShopNavigation />
      <CartDrawer />
      <SaddlebagPill />
      <SaddlebagDock />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/the-blind-lead/" element={<BlindLead />} />
        <Route path="/the-blind-lead" element={<BlindLead />} />
        <Route path="/product/:productId/" element={<ProductDetail />} />
        <Route path="/cart/" element={<Cart />} />
        <Route path="/checkout/" element={<Checkout />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </ChakraProvider>
  );
}

export default App;
