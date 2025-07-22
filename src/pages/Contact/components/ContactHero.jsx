import { Box, Container, Heading, Text, VStack, HStack, Button, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiClock, FiUsers, FiZap } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

// Theme colors
const colors = {
  brand: {
    primary: '#00E5E5',
  },
  accent: {
    neon: '#39FF14',
    warm: '#FF6B00',
    banana: '#FFE500',
  },
  dark: {
    black: '#0A0A0A',
  }
};

// Subtle pulse for scroll indicator
const pulse = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0.7; }
  50% { transform: translateY(5px); opacity: 1; }
`;

const ContactHero = () => {
  const benefits = [
    {
      icon: FiClock,
      text: 'Response within 24 hours',
      color: colors.accent.neon
    },
    {
      icon: FiUsers,
      text: 'Direct access to founders',
      color: colors.brand.primary
    },
    {
      icon: FiZap,
      text: 'No lengthy contracts',
      color: colors.accent.warm
    }
  ];

  const scrollToForm = () => {
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  };

  return (
    <Box
      position="relative"
      minH={{ base: '85vh', md: '90vh' }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg={colors.dark.black}
      pt={{ base: 20, md: 28, lg: 32 }}
      pb={{ base: 8, md: 12, lg: 16 }}
    >
      {/* Simple background gradient - no animations */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="1200px"
        height="600px"
        bg={`radial-gradient(ellipse at center, ${colors.brand.primary}08 0%, transparent 50%)`}
        pointerEvents="none"
      />

      {/* Subtle grid pattern */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.02}
        backgroundImage="repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 70px)"
        pointerEvents="none"
      />

      <Container maxW="1200px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 8, md: 10 }} textAlign="center" align="center">
          
          {/* Main Content */}
          <VStack spacing={{ base: 4, md: 6 }} maxW="800px">
            {/* Badge - Transparent style */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <HStack
                spacing={2}
                px={4}
                py={1.5}
                borderRadius="full"
                fontSize="xs"
                fontWeight="medium"
                letterSpacing="wider"
                color="gray.400"
              >
                <Box 
                  width="6px" 
                  height="6px" 
                  borderRadius="full" 
                  bg={colors.accent.neon}
                  boxShadow={`0 0 10px ${colors.accent.neon}`}
                />
                <Text>READY TO START YOUR PROJECT?</Text>
              </HStack>
            </MotionBox>

            {/* Heading - Bigger on mobile */}
            <MotionHeading
              as="h1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              fontSize={{ base: "3xl", sm: "4xl", md: "4xl", lg: "5xl", xl: "6xl" }}
              fontWeight="800"
              color="white"
              lineHeight="1.1"
              letterSpacing="-0.02em"
            >
              Let's Build Something
              <Box
                as="span"
                display="block"
                bgGradient={`linear(to-r, ${colors.accent.warm}, ${colors.accent.banana})`}
                bgClip="text"
                mt={1}
              >
                Extraordinary Together
              </Box>
            </MotionHeading>

            {/* Description - Bigger text */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              maxW="600px"
            >
              <Text
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                color="gray.300"
                lineHeight="1.7"
              >
                Tell us about your vision. We'll respond with ideas, insights, 
                and a clear path forward. No jargon, no BS.
              </Text>
            </MotionBox>
          </VStack>

          {/* Benefits - Enhanced layout */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            width="100%"
            maxW={{ base: "100%", md: "700px" }}
          >
            <HStack
              spacing={{ base: 2, md: 12 }}
              justify="center"
              flexWrap={{ base: "wrap", md: "nowrap" }}
              gap={{ base: 2, md: 0 }}
            >
              {benefits.map((benefit, index) => (
                <Box
                  key={index}
                  flex={{ base: "1 1 calc(33.333% - 8px)", md: "0 0 auto" }}
                  minW={{ base: "80px", md: "140px" }}
                >
                  <VStack
                    p={{ base: 1.5, md: 3 }}
                    borderRadius={{ base: "xl", md: "lg" }}
                    bg={{ base: "rgba(255, 255, 255, 0.03)", md: "transparent" }}
                    backdropFilter={{ base: "blur(20px)", md: "none" }}
                    border={{ base: "1px solid", md: "none" }}
                    borderColor={{ base: "rgba(255, 255, 255, 0.08)", md: "transparent" }}
                    transition="all 0.3s ease"
                    cursor="pointer"
                    spacing={{ base: 0, md: 2 }}
                    position="relative"
                    overflow="hidden"
                    role="group"
                    align="center"
                    opacity={0.8}
                    _hover={{
                      bg: { base: 'rgba(255, 255, 255, 0.05)', md: 'rgba(255, 255, 255, 0.02)' },
                      borderColor: { base: benefit.color, md: 'transparent' },
                      transform: { base: 'translateY(-4px)', md: 'translateY(-4px)' },
                      boxShadow: { base: `0 10px 30px ${benefit.color}22`, md: 'none' },
                      opacity: 1
                    }}
                  >
                    {/* Mobile glow */}
                    <Box
                      display={{ base: "block", md: "none" }}
                      position="absolute"
                      inset={0}
                      bg={`radial-gradient(circle at center, ${benefit.color}11 0%, transparent 70%)`}
                      opacity={0}
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.3s"
                    />
                    
                    {/* Mobile design */}
                    <HStack
                      spacing={1.5}
                      color="gray.400"
                      display={{ base: "flex", md: "none" }}
                      fontSize="xs"
                      transition="all 0.2s"
                      _groupHover={{
                        color: benefit.color
                      }}
                    >
                      <Box as={benefit.icon} size={14} />
                      <Text>{benefit.text.split(' ')[0]}</Text>
                    </HStack>

                    {/* Desktop - icon above text */}
                    <VStack 
                      spacing={2} 
                      align="center"
                      display={{ base: "none", md: "flex" }}
                    >
                      <Box
                        p={2}
                        borderRadius="lg"
                        bg={`${benefit.color}08`}
                        border="1px solid"
                        borderColor={`${benefit.color}20`}
                        color={benefit.color}
                        transition="all 0.3s"
                        _groupHover={{ 
                          bg: `${benefit.color}15`,
                          borderColor: `${benefit.color}40`,
                          transform: 'scale(1.1)'
                        }}
                      >
                        <benefit.icon size={20} />
                      </Box>
                      
                      <Text
                        color="gray.400"
                        fontSize="sm"
                        fontWeight="500"
                        textAlign="center"
                        transition="all 0.3s"
                        _groupHover={{
                          color: "gray.300"
                        }}
                      >
                        {benefit.text}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              ))}
            </HStack>
          </MotionBox>

          {/* CTA Section - Optimized button */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            width={{ base: "75%", sm: "auto" }}
          >
            <VStack spacing={4}>
              <Button
                size={{ base: "md", md: "lg" }}
                height={{ base: "48px", md: "56px" }}
                px={{ base: 8, md: 10 }}
                bg="white"
                color={colors.dark.black}
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="bold"
                borderRadius="full"
                onClick={scrollToForm}
                rightIcon={<FiArrowDown />}
                width={{ base: "100%", sm: "auto" }}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 35px rgba(255, 255, 255, 0.2)',
                }}
                _active={{
                  transform: 'translateY(0)',
                }}
                transition="all 0.2s"
              >
                Start Your Project
              </Button>

              <Text
                fontSize={{ base: "xs", md: "sm" }}
                color="gray.500"
              >
                3-minute form • No spam • Real humans
              </Text>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactHero;