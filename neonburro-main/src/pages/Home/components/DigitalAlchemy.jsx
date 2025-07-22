import { Box, Container, Heading, Text, VStack, HStack, Grid, Button, Image, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { FiCode, FiShoppingCart, FiMapPin, FiSmartphone, FiDatabase, FiMail, FiTrendingUp, FiShield } from 'react-icons/fi';

const MotionBox = motion(Box);

// Optimized animations using CSS keyframes
const particleFlow = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
`;

const gentlePulse = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.2; }
`;

const coreGlow = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.3; }
`;

// Theme colors
const colors = {
  brand: {
    primary: '#00E5E5',
  },
  accent: {
    neon: '#39FF14',
    warm: '#FF6B00',
    purple: '#8B5CF6',
    banana: '#FFE500',
    cool: '#00D9FF',
  },
  dark: {
    black: '#0A0A0A',
  }
};

const DigitalAlchemy = () => {
  const [activeService, setActiveService] = useState(null);

  // Debounced hover handler for better performance
  const handleServiceHover = useCallback((serviceId) => {
    setActiveService(serviceId);
  }, []);

  const handleExploreServices = () => {
    window.location.href = '/services/';
  };

  const services = [
    {
      id: 'digital-experiences',
      icon: FiCode,
      title: 'Digital Experiences',
      description: 'Immersive web applications that captivate and convert',
      color: colors.brand.primary,
      stat: '3.2s → 0.8s'
    },
    {
      id: 'ecommerce-solutions',
      icon: FiShoppingCart,
      title: 'E-Commerce Solutions',
      description: 'Online stores engineered for maximum revenue',
      color: colors.accent.warm,
      stat: '+47% CVR'
    },
    {
      id: 'local-seo',
      icon: FiMapPin,
      title: 'Local SEO',
      description: 'Dominate your local market in search results',
      color: colors.accent.neon,
      stat: 'Top 3'
    },
    {
      id: 'mobile-excellence',
      icon: FiSmartphone,
      title: 'Mobile Excellence',
      description: 'Mobile-first experiences that users love',
      color: colors.accent.banana,
      stat: '95/100'
    },
    {
      id: 'data-architecture',
      icon: FiDatabase,
      title: 'Data Architecture',
      description: 'Scalable systems built for growth',
      color: colors.accent.cool,
      stat: '99.9%'
    },
    {
      id: 'marketing-automation',
      icon: FiMail,
      title: 'Marketing Automation',
      description: 'Smart campaigns that work around the clock',
      color: colors.accent.purple,
      stat: '5x ROI'
    },
    {
      id: 'performance-optimization',
      icon: FiTrendingUp,
      title: 'Performance Optimization',
      description: 'Transform slow sites into speed demons',
      color: colors.brand.primary,
      stat: '100/100'
    },
    {
      id: 'security-first',
      icon: FiShield,
      title: 'Security First',
      description: 'Enterprise-grade security for peace of mind',
      color: colors.accent.warm,
      stat: 'A+ SSL'
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg={colors.dark.black}
      overflow="hidden"
    >
      {/* Simplified background gradient */}
      <Box
        position="absolute"
        top="20%"
        left="50%"
        transform="translateX(-50%)"
        width="800px"
        height="800px"
        borderRadius="full"
        bg={`radial-gradient(circle at center, ${colors.brand.primary}11 0%, ${colors.accent.banana}08 30%, transparent 70%)`}
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <HStack spacing={2} justify="center">
                <Box width="40px" height="2px" bg={colors.accent.banana} />
                <Text 
                  color={colors.accent.banana}
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold" 
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Digital Transformation
                </Text>
                <Box width="40px" height="2px" bg={colors.accent.banana} />
              </HStack>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "26px", sm: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="extrabold"
                color="white"
                lineHeight={{ base: "1.3", md: "1.2" }}
                letterSpacing="tight"
              >
                Transform Your{' '}
                <Box
                  as="span"
                  bgGradient={`linear(to-r, ${colors.accent.banana}, ${colors.accent.warm})`}
                  bgClip="text"
                >
                  Digital Presence
                </Box>
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                color="gray.300"
                maxW="600px"
                mx="auto"
                lineHeight="relaxed"
              >
                From concept to conversion, we build digital experiences that drive results.
              </Text>
            </MotionBox>
          </VStack>

          {/* The Machine Container - Creative Flow Design */}
          <Box 
            position="relative" 
            width="100%" 
            minH={{ base: "180px", md: "220px" }}
            py={8}
          >
            {/* Flowing transformation visualization */}
            <Box
              position="relative"
              maxW="900px"
              mx="auto"
              height="100%"
            >
              {/* Background flow effect */}
              <Box
                position="absolute"
                top="50%"
                left="0"
                right="0"
                height="100px"
                transform="translateY(-50%)"
                bgGradient={`linear(to-r, transparent, ${colors.brand.primary}08, ${colors.accent.banana}08, transparent)`}
                filter="blur(40px)"
                pointerEvents="none"
              />

              {/* Main flow container */}
              <HStack
                position="relative"
                width="100%"
                height="100%"
                align="center"
                justify="space-between"
                spacing={0}
              >
                {/* Your Vision */}
                <VStack spacing={2} flex={1} align="center">
                  <Text
                    color={colors.brand.primary}
                    fontSize={{ base: "sm", md: "lg" }}
                    fontWeight="bold"
                    letterSpacing="wider"
                    textTransform="uppercase"
                  >
                    Your Vision
                  </Text>
                  <Box
                    width="60px"
                    height="2px"
                    bg={colors.brand.primary}
                    opacity={0.5}
                  />
                </VStack>

                {/* Transformation Flow */}
                <Box
                  flex={2}
                  position="relative"
                  height="120px"
                  overflow="visible"
                >
                  {/* Flow paths */}
                  <svg
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0,
                    }}
                    viewBox="0 0 400 120"
                    preserveAspectRatio="none"
                  >
                    {/* Upper flow path */}
                    <path
                      d="M 0,60 Q 100,20 200,60 T 400,60"
                      fill="none"
                      stroke={colors.brand.primary}
                      strokeWidth="2"
                      opacity="0.3"
                    />
                    {/* Lower flow path */}
                    <path
                      d="M 0,60 Q 100,100 200,60 T 400,60"
                      fill="none"
                      stroke={colors.accent.banana}
                      strokeWidth="2"
                      opacity="0.3"
                    />
                    
                    {/* Animated particles on paths */}
                    <circle r="4" fill={colors.brand.primary}>
                      <animateMotion
                        dur="4s"
                        repeatCount="indefinite"
                        path="M 0,60 Q 100,20 200,60 T 400,60"
                      />
                    </circle>
                    <circle r="4" fill={colors.accent.banana}>
                      <animateMotion
                        dur="4s"
                        repeatCount="indefinite"
                        begin="1s"
                        path="M 0,60 Q 100,100 200,60 T 400,60"
                      />
                    </circle>
                    <circle r="3" fill={colors.accent.neon}>
                      <animateMotion
                        dur="4s"
                        repeatCount="indefinite"
                        begin="2s"
                        path="M 0,60 Q 100,20 200,60 T 400,60"
                      />
                    </circle>
                  </svg>

                  {/* Central Burro - Integrated */}
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    zIndex={2}
                  >
                    {/* Soft glow backdrop */}
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      width="180px"
                      height="180px"
                      borderRadius="50%"
                      bg={`radial-gradient(circle, ${activeService ? colors.accent.banana : colors.brand.primary}22 0%, transparent 60%)`}
                      filter="blur(30px)"
                      pointerEvents="none"
                    />
                    
                    {/* Burro container with organic shape */}
                    <MotionBox
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Box
                        position="relative"
                        width={{ base: "100px", md: "120px" }}
                        height={{ base: "100px", md: "120px" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {/* Morphing background shape */}
                        <Box
                          position="absolute"
                          inset={0}
                          borderRadius="30% 70% 70% 30% / 30% 30% 70% 70%"
                          bg={`linear-gradient(135deg, ${colors.brand.primary}11, ${colors.accent.banana}11)`}
                          animation="morph 8s ease-in-out infinite"
                          sx={{
                            '@keyframes morph': {
                              '0%, 100%': { 
                                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                                transform: 'rotate(0deg)'
                              },
                              '33%': { 
                                borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
                                transform: 'rotate(120deg)'
                              },
                              '66%': { 
                                borderRadius: '30% 70% 70% 30% / 70% 30% 30% 70%',
                                transform: 'rotate(240deg)'
                              }
                            }
                          }}
                        />
                        
                        {/* Burro Image */}
                        <Image
                          src="/burro-head-neon-sign.png"
                          alt="Neon Burro"
                          width={{ base: "60px", md: "80px" }}
                          height={{ base: "60px", md: "80px" }}
                          objectFit="contain"
                          filter={`brightness(1.2) contrast(1.1) drop-shadow(0 0 20px ${activeService ? colors.accent.banana : colors.brand.primary})`}
                          transition="all 0.3s"
                          position="relative"
                          zIndex={1}
                        />
                      </Box>
                    </MotionBox>
                  </Box>

                  {/* Energy waves */}
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    width="200px"
                    height="200px"
                    pointerEvents="none"
                  >
                    <Box
                      position="absolute"
                      inset={0}
                      borderRadius="50%"
                      border="1px solid"
                      borderColor={colors.brand.primary}
                      opacity={0.2}
                      animation="ripple 3s linear infinite"
                      sx={{
                        '@keyframes ripple': {
                          '0%': { transform: 'scale(0.8)', opacity: 0.4 },
                          '100%': { transform: 'scale(1.5)', opacity: 0 }
                        }
                      }}
                    />
                    <Box
                      position="absolute"
                      inset={0}
                      borderRadius="50%"
                      border="1px solid"
                      borderColor={colors.accent.banana}
                      opacity={0.2}
                      animation="ripple 3s linear infinite 1.5s"
                    />
                  </Box>
                </Box>

                {/* Real Results */}
                <VStack spacing={2} flex={1} align="center">
                  <Text
                    color={colors.accent.banana}
                    fontSize={{ base: "sm", md: "lg" }}
                    fontWeight="bold"
                    letterSpacing="wider"
                    textTransform="uppercase"
                  >
                    Real Results
                  </Text>
                  <Box
                    width="60px"
                    height="2px"
                    bg={colors.accent.banana}
                    opacity={0.5}
                  />
                </VStack>
              </HStack>
            </Box>
          </Box>

          {/* Service Grid - Optimized */}
          <Grid
            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
            gap={{ base: 4, md: 5 }}
            width="100%"
          >
            {services.map((service, index) => (
              <MotionBox
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Box
                  p={{ base: 4, md: 5 }}
                  borderRadius="xl"
                  bg="rgba(255, 255, 255, 0.02)"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor="rgba(255, 255, 255, 0.08)"
                  cursor="pointer"
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  onMouseEnter={() => handleServiceHover(service.id)}
                  onMouseLeave={() => handleServiceHover(null)}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    borderColor: service.color,
                    bg: 'rgba(255, 255, 255, 0.04)',
                    boxShadow: `0 20px 40px ${service.color}22`,
                    '& .service-icon': {
                      color: service.color,
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  {/* Stat badge */}
                  <Box
                    position="absolute"
                    top={3}
                    right={3}
                    px={2}
                    py={0.5}
                    borderRadius="full"
                    bg={`${service.color}22`}
                    border="1px solid"
                    borderColor={`${service.color}44`}
                  >
                    <Text
                      fontSize="2xs"
                      fontWeight="bold"
                      color={service.color}
                      fontFamily="mono"
                    >
                      {service.stat}
                    </Text>
                  </Box>
                  
                  <VStack align="start" spacing={3} position="relative">
                    <Box
                      p={2}
                      borderRadius="lg"
                      bg={`${service.color}11`}
                      display="inline-flex"
                    >
                      <Box 
                        className="service-icon"
                        as={service.icon} 
                        w={{ base: 5, md: 6 }}
                        h={{ base: 5, md: 6 }}
                        color="gray.400"
                        transition="all 0.3s"
                      />
                    </Box>
                    
                    <VStack align="start" spacing={1}>
                      <Text 
                        color="white"
                        fontWeight="bold" 
                        fontSize={{ base: "sm", md: "md" }}
                        lineHeight="tight"
                      >
                        {service.title}
                      </Text>
                      <Text 
                        color="gray.300"
                        fontSize={{ base: "xs", md: "sm" }}
                        lineHeight="relaxed"
                      >
                        {service.description}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* CTA Button */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              px={{ base: 8, md: 10 }}
              py={{ base: 6, md: 7 }}
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="bold"
              bg="white"
              color={colors.dark.black}
              borderRadius="full"
              position="relative"
              overflow="hidden"
              onClick={() => handleExploreServices()}
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(45deg, ${colors.accent.banana}, ${colors.accent.warm})`,
                opacity: 0,
                transition: 'opacity 0.3s',
                zIndex: -1,
              }}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: `0 15px 35px ${colors.accent.banana}33`,
                color: 'white',
                _before: {
                  opacity: 1,
                }
              }}
              _active={{
                transform: 'translateY(0)'
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            >
              Explore Our Services
            </Button>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default DigitalAlchemy;