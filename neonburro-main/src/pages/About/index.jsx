import { Box } from '@chakra-ui/react';
import AboutHero from './components/AboutHero';
import OurStory from './components/OurStory';
import CoreTeam from './components/CoreTeam';
import CertificationProgram from './components/CertificationProgram';
import BurroAlumni from './components/BurroAlumni';
import LifeAtTheBurro from './components/LifeAtTheBurro';
import Philosophy from './components/Philosophy';
import JoinTheHerd from './components/JoinTheHerd';

const About = () => {
  return (
    <Box bg="#0A0A0A" minH="100vh">
      <AboutHero />
      <OurStory />
      <CoreTeam />
      <CertificationProgram />
      <LifeAtTheBurro />
      <BurroAlumni />
      <Philosophy />
      <JoinTheHerd />
    </Box>
  );
};

export default About;