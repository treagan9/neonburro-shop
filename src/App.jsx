import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import theme from './theme';
import ShopNavigation from './components/navigation/ShopNavigation';
import CartDrawer from './components/cart/CartDrawer';
import Footer from './components/common/Footer';
import Home from './pages/Home';
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
      <Routes>
        <Route path="/" element={<Home />} />
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
