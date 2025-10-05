import { Box } from '@chakra-ui/react';
import { useRef } from 'react';
import ShopHero from './components/ShopHero';
import ProductGrid from './components/ProductGrid';

const Home = () => {
  const productsRef = useRef(null);

  const scrollToProducts = () => {
    if (productsRef.current) {
      const navHeight = 80;
      const offset = productsRef.current.offsetTop - navHeight;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box bg="dark.black" minH="100vh">
      <ShopHero onScrollToProducts={scrollToProducts} />
      <ProductGrid ref={productsRef} />
    </Box>
  );
};

export default Home;
