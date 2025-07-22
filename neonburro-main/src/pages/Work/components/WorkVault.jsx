import { Box, Container, Grid, Text, VStack, HStack, keyframes, Heading } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FiGlobe, FiShoppingCart, FiSmartphone, FiCpu, FiZap, FiTrendingUp, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;

const glitch = keyframes`
  0%, 100% { 
    clip-path: inset(0 0 0 0);
    transform: translate(0);
  }
  20% { 
    clip-path: inset(0 100% 0 0);
    transform: translate(-2px);
  }
  40% { 
    clip-path: inset(0 0 100% 0);
    transform: translate(2px);
  }
  60% { 
    clip-path: inset(100% 0 0 0);
    transform: translate(0);
  }
  80% { 
    clip-path: inset(0 0 0 100%);
    transform: translate(1px);
  }
`;

const WorkVault = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [revealMode, setRevealMode] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  // Enhanced project data with more details
  const projects = [
    {
      icon: FiGlobe,
      category: 'Enterprise SaaS',
      metrics: '+312% Growth',
      tech: 'React • Node • AWS',
      impact: '10M+ API calls/day',
      duration: '8 months',
      color: 'brand.primary',
      gradient: 'linear(to-br, brand.primary, #0099CC)'
    },
    {
      icon: FiShoppingCart,
      category: 'E-Commerce Platform',
      metrics: '$2.4M Revenue',
      tech: 'Next.js • Stripe • PostgreSQL',
      impact: '47% conversion rate',
      duration: '6 months',
      color: 'accent.banana',
      gradient: 'linear(to-br, accent.banana, accent.neon)'
    },
    {
      icon: FiSmartphone,
      category: 'Mobile Experience',
      metrics: '50K+ Users',
      tech: 'React Native • Firebase',
      impact: '4.9★ App Store rating',
      duration: '4 months',
      color: 'accent.warm',
      gradient: 'linear(to-br, accent.warm, #FF4500)'
    },
    {
      icon: FiCpu,
      category: 'AI Integration',
      metrics: '10x Efficiency',
      tech: 'Python • GPT-4 • Vector DB',
      impact: '95% automation rate',
      duration: '3 months',
      color: 'accent.neon',
      gradient: 'linear(to-br, accent.neon, #2FB814)'
    },
    {
      icon: FiZap,
      category: 'Performance Rebuild',
      metrics: '0.6s Load Time',
      tech: 'Vite • Edge Functions',
      impact: '100/100 Lighthouse',
      duration: '2 months',
      color: 'accent.purple',
      gradient: 'linear(to-br, accent.purple, #7928CA)'
    },
    {
      icon: FiTrendingUp,
      category: 'Analytics Dashboard',
      metrics: 'Real-time Data',
      tech: 'D3.js • WebSockets',
      impact: '< 50ms latency',
      duration: '5 months',
      color: 'brand.primary',
      gradient: 'linear(to-br, brand.primary, accent.neon)'
    },
  ];

  // Mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth * 15;
      const y = (clientY - innerHeight / 2) / innerHeight * 15;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Box 
      ref={containerRef}
      position="relative" 
      py={{ base: 16, md: 24 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Enhanced animated background */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.4}
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        transition="transform 0.3s ease-out"
      >
        {/* Grid pattern with animation */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.03}
          backgroundImage={`
            linear-gradient(var(--chakra-colors-accent-banana) 1px, transparent 1px),
            linear-gradient(90deg, var(--chakra-colors-accent-banana) 1px, transparent 1px)
          `}
          backgroundSize="50px 50px"
          backgroundPosition="center center"
          animation="gridMove 20s linear infinite"
          sx={{
            '@keyframes gridMove': {
              '0%': { transform: 'translate(0, 0)' },
              '100%': { transform: 'translate(50px, 50px)' }
            }
          }}
        />
        
        {/* Multiple floating orbs */}
        <Box
          position="absolute"
          top="10%"
          left="5%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="accent.banana"
          filter="blur(180px)"
          opacity={0.03}
          animation={`${float} 15s ease-in-out infinite`}
        />
        <Box
          position="absolute"
          bottom="15%"
          right="10%"
          width="500px"
          height="500px"
          borderRadius="full"
          bg="brand.primary"
          filter="blur(180px)"
          opacity={0.03}
          animation={`${float} 20s ease-in-out infinite 5s`}
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="300px"
          height="300px"
          borderRadius="full"
          bg="accent.neon"
          filter="blur(150px)"
          opacity={0.02}
          animation={`${pulse} 10s ease-in-out infinite`}
        />
      </Box>

      {/* Scan lines effect */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.02}
        pointerEvents="none"
        background="repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(255, 255, 255, 0.03) 2px,
          rgba(255, 255, 255, 0.03) 4px
        )"
      />

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <motion.div style={{ opacity, scale }}>
          <VStack spacing={{ base: 12, md: 16 }}>
            {/* Enhanced Section Header */}
            <VStack spacing={6} textAlign="center" maxW="800px" mx="auto">
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <HStack 
                  spacing={3} 
                  justify="center"
                  cursor="pointer"
                  onClick={() => setRevealMode(!revealMode)}
                  transition="all 0.3s"
                  _hover={{ transform: 'scale(1.05)' }}
                >
                  <Box 
                    as={revealMode ? FiEye : FiEyeOff} 
                    color="accent.banana" 
                    fontSize={{ base: "md", lg: "lg" }}
                    animation={revealMode ? `${pulse} 2s ease-in-out infinite` : 'none'}
                  />
                  <Text 
                    color="accent.banana"
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="semibold" 
                    letterSpacing="wider"
                    textTransform="uppercase"
                  >
                    The Vault • {revealMode ? 'Revealing' : 'Classified'}
                  </Text>
                  <Box 
                    as={FiLock} 
                    color="accent.banana" 
                    fontSize={{ base: "md", lg: "lg" }}
                    opacity={revealMode ? 0.3 : 1}
                    transition="opacity 0.3s"
                  />
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
                  color="text.primary"
                  lineHeight={{ base: "1.3", md: "1.2" }}
                  letterSpacing="tight"
                  position="relative"
                >
                  Classified Success Stories
                  <Box
                    position="absolute"
                    inset={0}
                    opacity={revealMode ? 0 : 0.1}
                    pointerEvents="none"
                    animation={revealMode ? 'none' : `${glitch} 3s ease-in-out infinite`}
                    bg="text.primary"
                  />
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
                  color="text.secondary"
                  maxW="600px"
                >
                  Real results from real projects. Details classified, impact undeniable.
                </Text>
              </MotionBox>
            </VStack>

            {/* Enhanced Project Grid */}
            <MotionGrid
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              gap={{ base: 6, md: 8 }}
              width="100%"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {projects.map((project, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Box
                    p={{ base: 6, md: 8 }}
                    borderRadius="2xl"
                    bg="rgba(255, 255, 255, 0.02)"
                    backdropFilter="blur(20px)"
                    border="2px solid"
                    borderColor={hoveredIndex === index ? project.color : 'rgba(255, 255, 255, 0.08)'}
                    position="relative"
                    overflow="hidden"
                    cursor="pointer"
                    height="100%"
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    role="group"
                    boxShadow={hoveredIndex === index ? `0 30px 60px ${project.color}22` : 'none'}
                  >
                    {/* Enhanced glow effect */}
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      width="200%"
                      height="200%"
                      bgGradient={project.gradient}
                      opacity={hoveredIndex === index ? 0.1 : 0}
                      filter="blur(50px)"
                      transition="opacity 0.5s"
                      pointerEvents="none"
                    />

                    {/* Classification stamps */}
                    <Box
                      position="absolute"
                      top={4}
                      right={4}
                      transform="rotate(12deg)"
                      opacity={0.1}
                    >
                      <Text
                        color={project.color}
                        fontSize="xs"
                        fontWeight="bold"
                        letterSpacing="wider"
                        textTransform="uppercase"
                        border="2px solid"
                        borderColor={project.color}
                        px={2}
                        py={1}
                      >
                        CLASSIFIED
                      </Text>
                    </Box>

                    {/* Enhanced Redacted Pattern */}
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      opacity={hoveredIndex === index || revealMode ? 0 : 0.05}
                      transition="opacity 0.3s"
                      pointerEvents="none"
                    >
                      {[...Array(5)].map((_, i) => (
                        <Box
                          key={i}
                          position="absolute"
                          top={`${20 + i * 15}%`}
                          left={`${10 + i * 5}%`}
                          width={`${40 + i * 10}%`}
                          height="2px"
                          bg={`linear-gradient(90deg, transparent, ${project.color}22, transparent)`}
                          transform={`rotate(${-5 + i * 2}deg)`}
                        />
                      ))}
                    </Box>

                    <VStack align="start" spacing={5} position="relative">
                      {/* Enhanced Icon */}
                      <Box
                        p={3.5}
                        borderRadius="xl"
                        bgGradient={hoveredIndex === index ? project.gradient : 'none'}
                        bg={hoveredIndex === index ? 'transparent' : `${project.color}11`}
                        position="relative"
                        transition="all 0.3s"
                        _groupHover={{
                          transform: 'scale(1.15) rotate(10deg)',
                          boxShadow: `0 10px 30px ${project.color}44`
                        }}
                      >
                        <Box
                          as={project.icon}
                          w={7}
                          h={7}
                          color={hoveredIndex === index ? 'white' : project.color}
                          animation={hoveredIndex === index ? `${float} 2s ease-in-out infinite` : 'none'}
                        />
                      </Box>

                      {/* Category & Metrics */}
                      <Box width="100%">
                        <Text
                          color={project.color}
                          fontSize={{ base: "2xs", md: "xs" }}
                          fontWeight="bold"
                          letterSpacing="wider"
                          textTransform="uppercase"
                          mb={1}
                        >
                          {project.category}
                        </Text>
                        <Text
                          color="text.primary"
                          fontSize={{ base: "2xl", md: "3xl" }}
                          fontWeight="extrabold"
                          fontFamily="mono"
                          bgGradient={hoveredIndex === index ? project.gradient : 'none'}
                          bgClip={hoveredIndex === index ? "text" : "none"}
                          textShadow={hoveredIndex === index ? `0 0 30px ${project.color}` : 'none'}
                        >
                          {project.metrics}
                        </Text>
                        
                        {/* Additional metric */}
                        <Text
                          color="text.muted"
                          fontSize="xs"
                          mt={1}
                          opacity={hoveredIndex === index || revealMode ? 1 : 0}
                          transform={hoveredIndex === index || revealMode ? "translateY(0)" : "translateY(-10px)"}
                          transition="all 0.3s"
                        >
                          {project.impact}
                        </Text>
                      </Box>

                      {/* Tech Stack & Duration */}
                      <VStack width="100%" spacing={2} align="start">
                        <Box 
                          position="relative" 
                          width="100%"
                          height="20px"
                          overflow="hidden"
                        >
                          <Text
                            color="text.muted"
                            fontSize={{ base: "2xs", md: "xs" }}
                            fontFamily="mono"
                            position="absolute"
                            top={0}
                            left={0}
                            opacity={hoveredIndex === index || revealMode ? 1 : 0}
                            transform={hoveredIndex === index || revealMode ? "translateY(0)" : "translateY(10px)"}
                            transition="all 0.3s"
                          >
                            {project.tech}
                          </Text>
                          <Text
                            color="text.muted"
                            fontSize={{ base: "2xs", md: "xs" }}
                            fontFamily="mono"
                            position="absolute"
                            top={0}
                            left={0}
                            opacity={hoveredIndex === index || revealMode ? 0 : 0.7}
                            transform={hoveredIndex === index || revealMode ? "translateY(-10px)" : "translateY(0)"}
                            transition="all 0.3s"
                          >
                            ████ • ████ • ████
                          </Text>
                        </Box>
                        
                        <Text
                          color="text.muted"
                          fontSize="2xs"
                          opacity={hoveredIndex === index || revealMode ? 0.8 : 0}
                          transition="opacity 0.3s"
                        >
                          Duration: {project.duration}
                        </Text>
                      </VStack>

                      {/* Enhanced Client Section */}
                      <Box
                        width="100%"
                        pt={3}
                        borderTop="1px solid"
                        borderColor="whiteAlpha.100"
                      >
                        <HStack spacing={3} align="center">
                          <Text color="text.muted" fontSize="2xs" letterSpacing="wider">
                            CLIENT:
                          </Text>
                          <Box
                            flex={1}
                            height="14px"
                            bg="whiteAlpha.100"
                            borderRadius="sm"
                            position="relative"
                            overflow="hidden"
                          >
                            <Box
                              position="absolute"
                              inset={0}
                              bgGradient={project.gradient}
                              opacity={hoveredIndex === index ? 0.3 : 0}
                              transition="opacity 0.3s"
                            />
                            <Box
                              position="absolute"
                              top={0}
                              left={0}
                              right={0}
                              bottom={0}
                              bg={`repeating-linear-gradient(90deg, ${project.color}33 0px, ${project.color}33 4px, transparent 4px, transparent 8px)`}
                              animation={hoveredIndex === index ? "slideRight 2s linear infinite" : "none"}
                              sx={{
                                '@keyframes slideRight': {
                                  '0%': { transform: 'translateX(0)' },
                                  '100%': { transform: 'translateX(8px)' }
                                }
                              }}
                            />
                          </Box>
                        </HStack>
                      </Box>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </MotionGrid>

            {/* Enhanced Bottom Note */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              textAlign="center"
              position="relative"
              p={8}
            >
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                width="100%"
                maxW="600px"
                height="1px"
                bgGradient="linear(to-r, transparent, accent.banana, brand.primary, accent.banana, transparent)"
                opacity={0.3}
              />
              <Box
                position="relative"
                bg="dark.black"
                px={6}
                display="inline-block"
              >
                <Text
                  color="text.muted"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontStyle="italic"
                  mb={2}
                >
                  * Actual client names and project details protected by NDA
                </Text>
                <Text
                  color="accent.banana"
                  fontSize="2xs"
                  fontWeight="semibold"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  opacity={0.6}
                >
                  Security Level: Maximum • Access: Restricted
                </Text>
              </Box>
            </MotionBox>
          </VStack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default WorkVault;