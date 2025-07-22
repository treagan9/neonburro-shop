import { Box, Container, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiHelpCircle, FiMessageSquare } from 'react-icons/fi';

const MotionBox = motion(Box);

const FAQHero = () => {
  // Theme colors
  const colors = {
    brand: {
      primary: '#00E5E5',
    },
    dark: {
      black: '#0A0A0A',
    }
  };

  return (
    <Box
      position="relative"
      pt={{ base: 24, md: 32 }}
      pb={{ base: 12, md: 16 }}
      bg={colors.dark.black}
      overflow="hidden"
    >
      {/* Background gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
        bgGradient={`radial(circle at 50% 20%, ${colors.brand.primary} 0%, transparent 40%)`}
      />

      <Container maxW="900px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={6} textAlign="center">
          {/* Icon */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              p={4}
              borderRadius="full"
              bg={`${colors.brand.primary}22`}
              color={colors.brand.primary}
            >
              <FiHelpCircle size={32} />
            </Box>
          </MotionBox>

          {/* Heading */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              fontFamily="'Geist Sans', 'Inter', sans-serif"
              color="white"
              lineHeight="1.1"
              letterSpacing="-0.02em"
            >
              Frequently Asked
              <Box
                as="span"
                display="block"
                bgGradient={`linear(to-r, ${colors.brand.primary}, #39FF14)`}
                bgClip="text"
                mt={2}
              >
                Questions
              </Box>
            </Heading>
          </MotionBox>

          {/* Description */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            maxW="600px"
          >
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.300"
              lineHeight="1.7"
            >
              Got questions? We've got answers. If you don't see what you're looking for, 
              drop us a line and we'll get back to you faster than you can say "digital transformation."
            </Text>
          </MotionBox>

          {/* Stats */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <HStack 
              spacing={8} 
              divider={<Box height="30px" width="1px" bg="whiteAlpha.200" />}
            >
              <VStack spacing={0}>
                <Text 
                  color={colors.brand.primary} 
                  fontSize="2xl" 
                  fontWeight="700" 
                  fontFamily="'Geist Mono', monospace"
                >
                  24hr
                </Text>
                <Text color="gray.500" fontSize="xs" textTransform="uppercase">
                  Response Time
                </Text>
              </VStack>
              <VStack spacing={0}>
                <Text 
                  color="#39FF14" 
                  fontSize="2xl" 
                  fontWeight="700" 
                  fontFamily="'Geist Mono', monospace"
                >
                  100%
                </Text>
                <Text color="gray.500" fontSize="xs" textTransform="uppercase">
                  Transparency
                </Text>
              </VStack>
              <VStack spacing={0}>
                <Text 
                  color="#FF6B00" 
                  fontSize="2xl" 
                  fontWeight="700" 
                  fontFamily="'Geist Mono', monospace"
                >
                  0
                </Text>
                <Text color="gray.500" fontSize="xs" textTransform="uppercase">
                  Stupid Questions
                </Text>
              </VStack>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default FAQHero;
