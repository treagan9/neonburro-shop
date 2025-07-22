import { Box, Container, Heading, Text, VStack, HStack, Badge, keyframes, Grid } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiLock, FiShield, FiEye, FiUsers, FiAward, FiKey } from 'react-icons/fi';
import { useRef, useState, useEffect } from 'react';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

// Glitch effect for confidential text
const glitch = keyframes`
  0%, 100% { 
    text-shadow: 0 0 2px rgba(0, 255, 255, 0.5);
    transform: translate(0);
  }
  20% { 
    text-shadow: -2px 0 2px rgba(255, 0, 255, 0.5), 2px 0 2px rgba(0, 255, 255, 0.5);
    transform: translate(2px, -2px);
  }
  40% { 
    text-shadow: 2px 0 2px rgba(255, 107, 0, 0.5), -2px 0 2px rgba(57, 255, 20, 0.5);
    transform: translate(-2px, 2px);
  }
`;

// Scan line effect
const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const WorkHero = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  const securityFeatures = [
    { 
      icon: FiLock, 
      label: 'NDA Protected', 
      color: '#00E5E5',
      description: 'Every project secured'
    },
    { 
      icon: FiShield, 
      label: 'Client Privacy', 
      color: '#39FF14',
      description: 'Identity safeguarded'
    },
    { 
      icon: FiKey, 
      label: 'Request Access', 
      color: '#FF6B00',
      description: 'Verified viewing only'
    }
  ];

  // Mouse parallax for background - desktop only
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth * 20;
      const y = (clientY - innerHeight / 2) / innerHeight * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Box 
      ref={containerRef}
      position="relative" 
      minH={{ base: '85vh', md: '90vh' }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg="#0A0A0A"
      pt={{ base: 20, md: 28, lg: 32 }}
      pb={{ base: 8, md: 12, lg: 16 }}
    >
      {/* Animated background with parallax */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.5}
        transform={`translate(${mousePosition.x}px, ${mousePosition.y}px)`}
        transition="transform 0.3s ease-out"
        pointerEvents="none"
      >
        {/* Multiple gradient orbs */}
        <Box
          position="absolute"
          top="30%"
          left="20%"
          width="600px"
          height="600px"
          borderRadius="full"
          bg="radial-gradient(circle, #00E5E5 0%, transparent 50%)"
          filter="blur(120px)"
          opacity={0.03}
          animation="pulse 8s ease-in-out infinite"
        />
        <Box
          position="absolute"
          bottom="30%"
          right="20%"
          width="500px"
          height="500px"
          borderRadius="full"
          bg="radial-gradient(circle, #FF6B00 0%, transparent 50%)"
          filter="blur(120px)"
          opacity={0.03}
          animation="pulse 10s ease-in-out infinite 2s"
        />
      </Box>

      {/* Scan line effect - desktop only */}
      <Box
        display={{ base: "none", md: "block" }}
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="200px"
        bgGradient="linear(to-b, transparent, rgba(0, 229, 229, 0.03), transparent)"
        animation={`${scanline} 8s linear infinite`}
        pointerEvents="none"
        opacity={0.5}
      />

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <motion.div style={{ opacity, scale }}>
          <VStack spacing={{ base: 8, md: 10 }} textAlign="center" align="center">
            {/* Enhanced Security Badge - Transparent style */}
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
                color="#FF6B00"
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="600"
                letterSpacing="0.05em"
                position="relative"
                overflow="hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                cursor="pointer"
                transition="all 0.3s"
                _hover={{
                  transform: 'scale(1.05)',
                }}
              >
                <Box 
                  as={FiLock} 
                  size={14}
                  animation={isHovered ? `${glitch} 0.3s ease-in-out infinite` : 'none'}
                />
                <Text>PORTFOLIO UNDER NDA</Text>
              </HStack>
            </MotionBox>

            {/* Enhanced Main Heading - Bigger on mobile */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
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
                position="relative"
              >
                Our Best Work
                <Box
                  as="span"
                  display="block"
                  position="relative"
                  mt={2}
                >
                  <Box
                    as="span"
                    bgGradient="linear(to-r, #00E5E5, #39FF14)"
                    bgClip="text"
                    position="relative"
                  >
                    Stays Confidential
                  </Box>
                </Box>
              </Heading>
            </MotionBox>

            {/* Enhanced Description - Bigger text */}
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
              >
                We protect our clients' competitive advantage with the same intensity we bring to their projects. 
                Each solution is proprietary, each innovation confidential.
              </Text>
            </MotionBox>

            {/* Enhanced Security Features Cards - Streamlined */}
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
                {securityFeatures.map((feature, index) => {
                  const Icon = feature.icon;
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
                        _hover={{
                          bg: { base: 'rgba(255, 255, 255, 0.05)', md: 'rgba(255, 255, 255, 0.02)' },
                          borderColor: { base: feature.color, md: 'transparent' },
                          transform: { base: 'translateY(-4px)', md: 'translateY(-4px)' },
                          boxShadow: { base: `0 10px 30px ${feature.color}22`, md: 'none' }
                        }}
                      >
                        {/* Mobile glow */}
                        <Box
                          display={{ base: "block", md: "none" }}
                          position="absolute"
                          inset={0}
                          bg={`radial-gradient(circle, ${feature.color}11 0%, transparent 70%)`}
                          opacity={0}
                          _groupHover={{ opacity: 1 }}
                          transition="opacity 0.3s"
                        />
                        
                        <HStack 
                          spacing={{ base: 0, md: 0 }} 
                          align="center"
                          position="relative"
                          display={{ base: "flex", md: "none" }}
                        >
                          <VStack spacing={0} align="center">
                            <Text 
                              color="white" 
                              fontSize="xs"
                              fontWeight="700"
                              position="relative"
                              transition="all 0.3s"
                              _groupHover={{
                                color: feature.color,
                                textShadow: `0 0 20px ${feature.color}`
                              }}
                            >
                              {feature.label}
                            </Text>
                          </VStack>
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
                            bg={`${feature.color}08`}
                            border="1px solid"
                            borderColor={`${feature.color}20`}
                            color={feature.color}
                            transition="all 0.3s"
                            _groupHover={{ 
                              bg: `${feature.color}15`,
                              borderColor: `${feature.color}40`,
                              transform: 'scale(1.1)'
                            }}
                          >
                            <Icon size={20} />
                          </Box>
                          
                          <VStack spacing={0.5} align="center">
                            <Text 
                              color="white" 
                              fontSize="md"
                              fontWeight="700"
                              position="relative"
                              transition="all 0.3s"
                              _groupHover={{
                                color: feature.color,
                                textShadow: `0 0 15px ${feature.color}55`
                              }}
                            >
                              {feature.label}
                            </Text>
                            <Text
                              color="gray.500"
                              fontSize="xs"
                              fontWeight="medium"
                            >
                              {feature.description}
                            </Text>
                          </VStack>
                        </VStack>
                      </VStack>
                    </MotionBox>
                  );
                })}
              </HStack>
            </MotionBox>

            {/* Enhanced Trust Badge - Streamlined */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              mt={{ base: 4, md: 6 }}
            >
              <HStack
                spacing={{ base: 3, md: 6 }}
                fontSize={{ base: "xs", md: "sm" }}
                color="gray.400"
              >
                <HStack spacing={2}>
                  <Box as={FiAward} size={16} color="#00E5E5" />
                  <Text>Trusted by</Text>
                  <Text 
                    color="#00E5E5" 
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="800"
                  >
                    50+
                  </Text>
                  <Text>companies</Text>
                </HStack>

                <Box 
                  width="1px" 
                  height="20px" 
                  bg="whiteAlpha.200" 
                  display={{ base: "none", md: "block" }}
                />

                <HStack spacing={2} display={{ base: "none", md: "flex" }}>
                  <Box 
                    width="6px" 
                    height="6px" 
                    borderRadius="full" 
                    bg="#39FF14"
                    boxShadow={`0 0 10px #39FF14`}
                  />
                  <Text color="#39FF14" fontWeight="600">
                    ZERO LEAKS
                  </Text>
                </HStack>
              </HStack>
            </MotionBox>
          </VStack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default WorkHero;