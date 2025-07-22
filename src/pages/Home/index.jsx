import { Box } from '@chakra-ui/react';
import ShopHero from './components/ShopHero';
import ProductGrid from './components/ProductGrid';

const Home = () => {
  return (
    <Box bg="dark.black" minH="100vh">
      <ShopHero />
      <ProductGrid />
    </Box>
  );
};

export default Home;
