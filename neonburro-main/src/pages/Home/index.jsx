import { Box } from '@chakra-ui/react';
// Removed the MatrixRain import since Hero has its own
import Hero from './components/Hero';
import Features from './components/Features';
import DigitalAlchemy from './components/DigitalAlchemy';
import TheVault from './components/TheVault';
import TheCrew from './components/TheCrew';
import JackIn from './components/JackIn';

const Home = () => {
  return (
    <Box position="relative" minH="100vh">
      {/* Removed MatrixRain here since Hero component already has it */}
      <Hero />
      <Features />
      <DigitalAlchemy />
      <TheVault />
      <TheCrew />
      <JackIn />
      <Box className="scanlines" />
    </Box>
  );
};

export default Home;