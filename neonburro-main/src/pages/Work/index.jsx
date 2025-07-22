import { Box } from '@chakra-ui/react';
import WorkHero from './components/WorkHero';
import WorkVault from './components/WorkVault';
import WorkForm from './components/WorkForm';

const Work = () => {
  return (
    <Box bg="dark.black" minH="100vh">
      <WorkHero />
      <WorkVault />
      <WorkForm />
    </Box>
  );
};

export default Work;