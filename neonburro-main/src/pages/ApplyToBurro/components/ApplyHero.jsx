import { Box, Container, Heading, Text, VStack, HStack, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiUsers, FiMapPin } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// Subtle floating animation
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const ApplyHero = () => {
  return (
    <Box
      position="relative"
      minH={{ base: '85vh', md: '90vh' }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg="dark.black"
      pt={{ base: 20, md: 28, lg: 32 }}
      pb={{ base: 8, md: 12, lg: 16 }}
    >
      {/* Subtle Background Effects */}
      <Box
        position="absolute"
        top="20%"
        left="-10%"
        width="400px"
        height="400px"
        borderRadius="full"
        bg="accent.banana"
        opacity={0.02}
        filter="blur(100px)"
        animation={`${float} 8s ease-in-out infinite`}
      />
      <Box
        position="absolute"
        bottom="10%"
        right="-10%"
        width="400px"
        height="400px"
        borderRadius="full"
        bg="accent.neon"
        opacity={0.02}
        filter="blur(100px)"
        animation={`${float} 8s ease-in-out infinite 4s`}
      />

      <Container 
        maxW="1400px"
        px={{ base: 4, md: 8 }}
        position="relative"
        zIndex={10}
      >
        <VStack spacing={{ base: 6, md: 8 }} align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }} maxW="900px">
          
          {/* Badge */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HStack 
              spacing={2} 
              px={{ base: 3, md: 4 }}
              py={{ base: 1.5, md: 2 }}
              borderRadius="full"
              bg="rgba(255, 229, 0, 0.1)"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="rgba(255, 229, 0, 0.2)"
              color="accent.banana"
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight="600"
              letterSpacing="0.05em"
              boxShadow="0 0 20px rgba(255, 229, 0, 0.2)"
            >
              <FiUsers size={14} />
              <Text>JOIN THE ADVENTURE</Text>
            </HStack>
          </MotionBox>

          {/* Main Heading */}
          <MotionHeading
            as="h1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl", xl: "6xl" }}
            fontWeight="800"
            color="white"
            lineHeight={{ base: "1.3", md: "1.2" }}
            letterSpacing="-0.02em"
          >
            Ready to Become a
            <Box
              as="span"
              display="block"
              bgGradient="linear(to-r, accent.banana, accent.neon)"
              bgClip="text"
              mt={1}
            >
              Visiting Burro?
            </Box>
          </MotionHeading>

          {/* Description */}
          <MotionText
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            color="gray.300"
            lineHeight={{ base: "1.6", md: "1.7" }}
            maxW={{ base: "100%", md: "700px" }}
          >
            Show us what makes you unique. We're looking for passionate developers who bring 
            fresh perspectives, creative solutions, and a hunger to learn. This isn't your typical 
            application – it's your chance to stand out.
          </MotionText>

          {/* Location Info */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <HStack 
              spacing={2}
              px={{ base: 4, md: 5 }}
              py={{ base: 2.5, md: 3 }}
              borderRadius="xl"
              bg="rgba(255, 255, 255, 0.02)"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.08)"
              transition="all 0.3s"
              _hover={{
                borderColor: 'brand.primary',
                boxShadow: '0 10px 30px rgba(0, 229, 229, 0.1)'
              }}
            >
              <FiMapPin size={16} color="var(--chakra-colors-brand-primary)" />
              <VStack align="start" spacing={0}>
                <Text 
                  color="text.primary" 
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="semibold"
                >
                  Ridgway, Colorado
                </Text>
                <Text 
                  color="text.muted" 
                  fontSize={{ base: "xs", md: "sm" }}
                >
                  Where code meets mountains
                </Text>
              </VStack>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default ApplyHero;