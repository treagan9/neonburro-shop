import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import theme from './theme';
import Navigation from './components/navigation/Navigation';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import About from './pages/About';
import Contact from './pages/Contact';
import Invoice from './pages/Invoice';
import Lab from './pages/Lab';
import FAQ from './pages/FAQ';
import ApplyToBurro from './pages/ApplyToBurro';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Sitemap from './pages/Sitemap';
import GnarlyTacos from './pages/Lab/GnarlyTacos';
import TraceGallery from './pages/Lab/TraceGallery';
import ColoradoBoy from './pages/Lab/ColoradoBoy';

// Members area imports
import MembersDashboard from './pages/Members/MembersDashboard';
import BurroGateKeeper from './pages/Members/BurroGateKeeper';
import ProtectedRoute from './components/auth/ProtectedRoute';

import './styles/global.css';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// App content wrapper that has access to useLocation
function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Check for existing session
  useEffect(() => {
    const authStatus = sessionStorage.getItem('burro_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('burro_authenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('burro_authenticated');
  };

  // Define routes that should NOT show the Navigation
  const noNavRoutes = [
    '/interactive-valley',
    '/members', // Hide navigation for all members pages
    // Add any other routes that should have custom navigation
  ];

  // Check if current route should hide navigation
  const shouldShowNavigation = !noNavRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  return (
    <>
      <ScrollToTop />
      {shouldShowNavigation && (
        <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      )}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/apply-to-burro" element={<ApplyToBurro />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/sitemap" element={<Sitemap />} />
        
        {/* Lab Routes */}
        <Route path="/lab" element={<Lab />} />
        <Route path="/lab/gnarly-tacos" element={<GnarlyTacos />} />
        <Route path="/lab/trace-gallery" element={<TraceGallery />} />
        <Route path="/lab/colorado-boy" element={<ColoradoBoy />} />
        
        {/* Members Area Routes */}
        <Route 
          path="/members/login" 
          element={
            <BurroGateKeeper 
              onAuthenticated={handleAuthentication} 
              isAuthenticated={isAuthenticated}
            />
          } 
        />
        <Route 
          path="/members" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MembersDashboard onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/members/*" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MembersDashboard onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ChakraProvider>
  );
}

export default App;