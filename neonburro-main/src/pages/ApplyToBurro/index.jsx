import { Box } from '@chakra-ui/react';
import ApplyHero from './components/ApplyHero';
import ApplyForm from './components/ApplyForm';

const ApplyToBurro = () => {
  return (
    <Box bg="dark.black" minH="100vh">
      <ApplyHero />
      <ApplyForm />
    </Box>
  );
};

export default ApplyToBurro;