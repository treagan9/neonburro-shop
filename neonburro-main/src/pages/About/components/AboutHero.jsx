import { Box, Container, Heading, Text, VStack, HStack, Button, keyframes } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiUsers, FiAward } from 'react-icons/fi';
import { useRef, useState, useEffect } from 'react';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// Subtle floating animation
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
`;

// Gentle pulse animation
const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.05); }
`;

const AboutHero = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Mouse parallax - desktop only
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
      {/* Enhanced Background Effects */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.4}
        transform={`translate(${mousePosition.x}px, ${mousePosition.y}px)`}
        transition="transform 0.3s ease-out"
        pointerEvents="none"
      >
        <Box
          position="absolute"
          top="15%"
          left="-5%"
          width="500px"
          height="500px"
          borderRadius="full"
          bg="#00E5E5"
          opacity={0.03}
          filter="blur(120px)"
          animation={`${float} 12s ease-in-out infinite`}
        />
        <Box
          position="absolute"
          bottom="20%"
          right="-5%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="#39FF14"
          opacity={0.03}
          filter="blur(120px)"
          animation={`${float} 15s ease-in-out infinite 2s`}
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="300px"
          height="300px"
          borderRadius="full"
          bg="#FF6B00"
          opacity={0.02}
          filter="blur(100px)"
          animation={`${pulse} 10s ease-in-out infinite`}
        />
      </Box>

      {/* Subtle grid pattern */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.02}
        backgroundImage="radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%), repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 70px)"
        pointerEvents="none"
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          width="2px"
          height="2px"
          borderRadius="full"
          bg={i % 2 === 0 ? '#00E5E5' : '#39FF14'}
          left={`${20 + i * 15}%`}
          top={`${20 + i * 10}%`}
          opacity={0.5}
          animation={`${float} ${10 + i * 2}s ease-in-out infinite ${i * 0.5}s`}
        />
      ))}

      <Container 
        maxW="1400px"
        px={{ base: 4, md: 8 }}
        position="relative"
        zIndex={10}
      >
        <MotionBox
          style={{ y, opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <VStack spacing={{ base: 6, md: 8 }} align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }} maxW="900px">
            
            {/* Enhanced Location Badge - Transparent like main hero */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <HStack 
                spacing={1.5} 
                px={{ base: 2.5, md: 3 }}
                py={{ base: 1, md: 1.5 }}
                borderRadius="full"
                color="#00E5E5"
                fontSize={{ base: "2xs", md: "xs" }}
                fontWeight="600"
                letterSpacing="0.05em"
                position="relative"
                overflow="hidden"
                role="group"
                cursor="pointer"
                transition="all 0.3s"
                _hover={{
                  transform: 'scale(1.02)'
                }}
              >
                <Box as={FiMapPin} size={12} />
                <Text position="relative" fontSize="xs">RIDGWAY, COLORADO • 7,200FT</Text>
              </HStack>
            </MotionBox>

            {/* Main Heading - Bigger on mobile */}
            <MotionHeading
              as="h1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
              fontSize={{ base: "3xl", sm: "4xl", md: "4xl", lg: "5xl", xl: "6xl" }}
              fontFamily="'Inter', sans-serif"
              fontWeight="800"
              color="white"
              lineHeight={{ base: "1.2", md: "1.1" }}
              letterSpacing="-0.02em"
              position="relative"
            >
              We're Not Your Average
              <Box
                as="span"
                display="block"
                position="relative"
                mt={1}
              >
                <Box
                  as="span"
                  bgGradient="linear(to-r, #00E5E5, #39FF14)"
                  bgClip="text"
                  position="relative"
                  _after={{
                    content: '""',
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    width: '100%',
                    height: '2px',
                    bgGradient: 'linear(to-r, #00E5E5, #39FF14)',
                    opacity: 0,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'all 0.3s ease-out'
                  }}
                  _hover={{
                    _after: {
                      opacity: 1,
                      transform: 'scaleX(1)'
                    }
                  }}
                >
                  Digital Agency
                </Box>
              </Box>
            </MotionHeading>

            {/* Enhanced Tagline - Bigger text */}
            <MotionText
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              color="gray.300"
              lineHeight={{ base: "1.7", md: "1.8" }}
              maxW={{ base: "100%", md: "700px" }}
              position="relative"
            >
              Born in the Colorado mountains, we're digital outlaws building 
              extraordinary experiences with creativity in our veins and mountain air in our lungs.
            </MotionText>

            {/* Enhanced Stats Section - Smaller on mobile */}
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
                {[
                  { value: '12+', label: 'Core Team', color: '#00E5E5', delay: 0.4, icon: FiUsers },
                  { value: '100%', label: 'Client Success', color: '#39FF14', delay: 0.5, icon: FiAward },
                  { value: '2023', label: 'Est. in Mountains', color: '#FF6B00', delay: 0.6, icon: FiMapPin }
                ].map((stat, index) => (
                  <MotionBox
                    key={index}
                    flex={{ base: "1 1 calc(33.333% - 8px)", md: "0 0 auto" }}
                    minW={{ base: "75px", md: "120px" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: stat.delay }}
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
                        borderColor: { base: stat.color, md: 'transparent' },
                        transform: { base: 'translateY(-4px)', md: 'translateY(-4px)' },
                        boxShadow: { base: `0 10px 30px ${stat.color}22`, md: 'none' }
                      }}
                    >
                      {/* Mobile glow */}
                      <Box
                        display={{ base: "block", md: "none" }}
                        position="absolute"
                        inset={0}
                        bg={`radial-gradient(circle at center, ${stat.color}11 0%, transparent 70%)`}
                        opacity={0}
                        _groupHover={{ opacity: 1 }}
                        transition="opacity 0.3s"
                      />
                      
                      {/* Mobile design */}
                      <HStack 
                        spacing={0.5} 
                        align="baseline"
                        display={{ base: "flex", md: "none" }}
                      >
                        <Text 
                          color="white" 
                          fontSize="lg"
                          fontWeight="800"
                          lineHeight="1"
                          position="relative"
                          transition="all 0.3s"
                          _groupHover={{
                            color: stat.color,
                            textShadow: `0 0 20px ${stat.color}`
                          }}
                        >
                          {stat.value}
                        </Text>
                        <Text 
                          color="gray.500" 
                          fontSize="2xs"
                          fontWeight="600"
                          textTransform="uppercase"
                          letterSpacing="wider"
                          whiteSpace="nowrap"
                          position="relative"
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
                          bg={`${stat.color}08`}
                          border="1px solid"
                          borderColor={`${stat.color}20`}
                          color={stat.color}
                          transition="all 0.3s"
                          _groupHover={{ 
                            bg: `${stat.color}15`,
                            borderColor: `${stat.color}40`,
                            transform: 'scale(1.1)'
                          }}
                        >
                          <stat.icon size={20} />
                        </Box>
                        
                        <VStack spacing={0.5} align="center">
                          <Text 
                            color="white" 
                            fontSize="xl"
                            fontWeight="800"
                            lineHeight="1"
                            position="relative"
                            transition="all 0.3s"
                            _groupHover={{
                              color: stat.color,
                              textShadow: `0 0 15px ${stat.color}55`
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
                            whiteSpace="nowrap"
                          >
                            {stat.label}
                          </Text>
                        </VStack>
                      </VStack>
                    </VStack>
                  </MotionBox>
                ))}
              </HStack>
            </MotionBox>

            {/* Enhanced CTA Buttons - 75% width on mobile */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              width={{ base: "75%", sm: "auto" }}
            >
              <HStack 
                spacing={3}
                flexDirection={{ base: "column", sm: "row" }}
                width="100%"
              >
                <Button
                  size={{ base: "md", md: "lg" }}
                  bg="white"
                  color="black"
                  fontWeight="700"
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "44px", md: "56px" }}
                  px={{ base: 6, md: 10 }}
                  width={{ base: "100%", sm: "auto" }}
                  rightIcon={<FiArrowRight />}
                  onClick={() => window.location.href = '/contact/'}
                  position="relative"
                  overflow="hidden"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, #00E5E5, #39FF14)',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    zIndex: -1,
                  }}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 35px rgba(0, 229, 229, 0.3)',
                    color: 'white',
                    _before: {
                      opacity: 1,
                    }
                  }}
                  _active={{
                    transform: 'translateY(0)'
                  }}
                  borderRadius="full"
                  transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  Start a Project
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
                  onClick={() => document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth' })}
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
                  Learn Our Story
                </Button>
              </HStack>
            </MotionBox>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default AboutHero;