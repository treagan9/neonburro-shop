import { Box, Container, Heading, Text, VStack, HStack, Button, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiZap, FiPackage, FiTrendingUp } from 'react-icons/fi';

const MotionBox = motion(Box);

const ServicesHero = () => {
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { 
      green: '#39FF14',
      warm: '#FF6B00'
    }
  };

  const stats = [
    { value: '4', label: 'Packages', icon: FiPackage },
    { value: '13+', label: 'Features', icon: FiTrendingUp },
    { value: '∞', label: 'Possibilities', icon: FiZap }
  ];

  return (
    <Box
      position="relative"
      minH={{ base: '85vh', md: '90vh' }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg="#0A0A0A"
      pt={{ base: 20, md: 28, lg: 32 }}
      pb={{ base: 8, md: 12, lg: 16 }}
    >
      {/* Subtle gradient - desktop only */}
      <Box
        display={{ base: 'none', md: 'block' }}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.05}
      >
        <Box
          position="absolute"
          top="30%"
          left="20%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg={colors.brand.primary}
          filter="blur(120px)"
        />
        <Box
          position="absolute"
          bottom="20%"
          right="20%"
          width="300px"
          height="300px"
          borderRadius="full"
          bg={colors.accent.warm}
          filter="blur(120px)"
        />
      </Box>

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 6, md: 8 }} align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }}>
          {/* Badge - Transparent style */}
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
              color={colors.brand.primary}
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight="600"
              letterSpacing="0.05em"
            >
              <Box 
                width="6px" 
                height="6px" 
                borderRadius="full" 
                bg={colors.accent.green}
                boxShadow={`0 0 10px ${colors.accent.green}`}
              />
              <Text>SERVICES & SOLUTIONS</Text>
            </HStack>
          </MotionBox>

          {/* Main Heading - Bigger on mobile */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            maxW="900px"
          >
            <Heading
              as="h1"
              fontSize={{ base: "3xl", sm: "4xl", md: "4xl", lg: "5xl", xl: "6xl" }}
              fontFamily="'Inter', sans-serif"
              fontWeight="800"
              color="white"
              lineHeight={{ base: "1.2", md: "1.1" }}
              letterSpacing="-0.02em"
            >
              Digital Solutions That
              <Box
                as="span"
                display="block"
                bgGradient={`linear(to-r, ${colors.brand.primary}, ${colors.accent.green})`}
                bgClip="text"
                mt={1}
              >
                Elevate Your Business
              </Box>
            </Heading>
          </MotionBox>

          {/* Description - Bigger text */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            maxW={{ base: "100%", md: "700px" }}
          >
            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              color="gray.300"
              lineHeight={{ base: "1.7", md: "1.8" }}
              px={{ base: 2, md: 0 }}
            >
              From quick-start packages to enterprise solutions, we build digital experiences 
              that convert visitors into customers. No templates, no compromises.
            </Text>
          </MotionBox>

          {/* Stats Cards - Smaller on mobile, clean on desktop */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            width="100%"
            maxW={{ base: "100%", md: "600px" }}
          >
            <HStack
              spacing={{ base: 2, md: 12 }}
              justify="center"
              flexWrap={{ base: "wrap", md: "nowrap" }}
              gap={{ base: 2, md: 0 }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <MotionBox
                    key={index}
                    flex={{ base: "1 1 calc(33.333% - 8px)", md: "0 0 auto" }}
                    minW={{ base: "75px", md: "120px" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <VStack
                      p={{ base: 1.5, md: 3 }}
                      borderRadius={{ base: "xl", md: "lg" }}
                      bg={{ base: "whiteAlpha.50", md: "transparent" }}
                      backdropFilter={{ base: "blur(10px)", md: "none" }}
                      border={{ base: "1px solid", md: "none" }}
                      borderColor={{ base: "whiteAlpha.100", md: "transparent" }}
                      transition="all 0.3s ease"
                      cursor="pointer"
                      spacing={{ base: 0, md: 2 }}
                      position="relative"
                      overflow="hidden"
                      role="group"
                      align="center"
                      _hover={{
                        bg: { base: 'whiteAlpha.50', md: 'rgba(255, 255, 255, 0.02)' },
                        borderColor: { base: colors.brand.primary, md: 'transparent' },
                        transform: { base: 'translateY(-4px)', md: 'translateY(-4px)' },
                        boxShadow: { base: `0 10px 30px ${colors.brand.primary}22`, md: 'none' }
                      }}
                    >
                      {/* Mobile simple design */}
                      <HStack 
                        spacing={1} 
                        align="center"
                        display={{ base: "flex", md: "none" }}
                      >
                        <Text 
                          color="white" 
                          fontSize="lg"
                          fontWeight="800"
                          fontFamily="mono"
                          lineHeight="1"
                        >
                          {stat.value}
                        </Text>
                        <Text 
                          color="gray.400" 
                          fontSize="2xs"
                          fontWeight="600"
                          textTransform="uppercase"
                          letterSpacing="wider"
                        >
                          {stat.label}
                        </Text>
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
                          bg={`${colors.brand.primary}08`}
                          border="1px solid"
                          borderColor={`${colors.brand.primary}20`}
                          color={colors.brand.primary}
                          transition="all 0.3s"
                          _groupHover={{ 
                            bg: `${colors.brand.primary}15`,
                            borderColor: `${colors.brand.primary}40`,
                            transform: 'scale(1.1)'
                          }}
                        >
                          <Icon size={20} />
                        </Box>
                        
                        <VStack spacing={0.5} align="center">
                          <Text 
                            color="white" 
                            fontSize="xl"
                            fontWeight="800"
                            fontFamily="mono"
                            lineHeight="1"
                            position="relative"
                            transition="all 0.3s"
                            _groupHover={{
                              color: colors.brand.primary,
                              textShadow: `0 0 15px ${colors.brand.primary}55`
                            }}
                          >
                            {stat.value}
                          </Text>
                          <Text 
                            color="gray.400" 
                            fontSize="xs"
                            fontWeight="600"
                            textTransform="uppercase"
                            letterSpacing="wider"
                          >
                            {stat.label}
                          </Text>
                        </VStack>
                      </VStack>
                    </VStack>
                  </MotionBox>
                );
              })}
            </HStack>
          </MotionBox>

          {/* CTA Buttons - 75% width on mobile */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            width={{ base: "75%", sm: "auto" }}
          >
            <HStack 
              spacing={3} 
              flexDirection={{ base: "column", sm: "row" }} 
              width={{ base: "100%", sm: "auto" }}
            >
              <Button
                size={{ base: "md", md: "lg" }}
                bg={colors.brand.primary}
                color="black"
                fontWeight="700"
                fontSize={{ base: "sm", md: "md" }}
                height={{ base: "44px", md: "56px" }}
                px={{ base: 6, md: 10 }}
                width={{ base: "100%", sm: "auto" }}
                rightIcon={<FiArrowRight />}
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                _hover={{
                  bg: colors.brand.primary,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 30px ${colors.brand.primary}66`
                }}
                _active={{
                  transform: 'translateY(0)'
                }}
                borderRadius="full"
                transition="all 0.2s"
              >
                View Packages
              </Button>
              <Button
                size={{ base: "md", md: "lg" }}
                variant="ghost"
                color="white"
                fontWeight="600"
                fontSize={{ base: "sm", md: "md" }}
                height={{ base: "44px", md: "56px" }}
                px={{ base: 6, md: 10 }}
                width={{ base: "100%", sm: "auto" }}
                onClick={() => window.location.href = '/contact/'}
                position="relative"
                border="1px solid transparent"
                _hover={{
                  bg: 'transparent',
                  borderColor: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 25px rgba(255, 255, 255, 0.15)'
                }}
                _active={{
                  transform: 'translateY(0)'
                }}
                borderRadius="full"
                transition="all 0.2s"
              >
                Get Quote
              </Button>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default ServicesHero;