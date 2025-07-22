import { Box } from '@chakra-ui/react';
import FAQHero from './components/FAQHero';
import FAQSection from './components/FAQSection';

const FAQ = () => {
  return (
    <Box minH="100vh" bg="#0A0A0A">
      <FAQHero />
      <FAQSection />
    </Box>
  );
};

export default FAQ;
