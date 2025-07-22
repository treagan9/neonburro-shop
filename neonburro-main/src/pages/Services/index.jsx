// Services/index.jsx
import { Box } from '@chakra-ui/react';
import ServicesHero from './components/ServicesHero';
import StarterPackages from './components/StarterPackages';
import EnhancementMenu from './components/EnhancementMenu';
import PowerUpHours from './components/PowerUpHours';
import ProcessSection from './components/ProcessSection';
import ServicesCTA from './components/ServicesCTA';

const Services = () => {
  return (
    <Box minH="100vh" bg="#0A0A0A">
      {/* Removed Navigation component - it's already rendered globally in App.jsx */}
      
      {/* Hero Section */}
      <ServicesHero />
      
      {/* Starter Packages - The 3 tiers */}
      <StarterPackages />
      
      {/* Enhancement Menu - Add-on features */}
      <EnhancementMenu />
      
      {/* Power Up Hours - Hour packages */}
      <PowerUpHours />
      
      {/* Process Section - How we work */}
      <ProcessSection />
      
      {/* CTA Section - Final call to action */}
      <ServicesCTA />
    </Box>
  );
};

export default Services;