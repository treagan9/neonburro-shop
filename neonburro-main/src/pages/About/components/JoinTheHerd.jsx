import { Box, Container, Heading, Text, VStack, HStack, Button, Grid, useBreakpointValue } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiUsers, FiMapPin, FiHeart, FiCode, FiGlobe, FiAward } from 'react-icons/fi';
import { useState, useRef } from 'react';

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);

const JoinTheHerd = () => {
  const sectionRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  const opportunities = [
    {
      type: 'Full-Time Explorer',
      title: 'Join Our Core Team',
      description: 'Work from our mountain HQ or remotely. Build cutting-edge digital experiences with a team that values creativity over conformity.',
      icon: FiUsers,
      color: 'brand.primary',
      gradient: 'linear(to-br, brand.primary, brand.primaryDark)',
      features: ['Competitive equity', 'Flexible hours', 'Mountain retreats'],
      cta: 'Explore Careers',
      link: '/careers'
    },
    {
      type: 'Visiting Developer',
      title: 'Level Up Your Skills',
      description: 'Spend 2-4 weeks at our Ridgway campus. Learn our methods, work on real projects, and see if mountain life is for you.',
      icon: FiCode,
      color: 'accent.neon',
      gradient: 'linear(to-br, accent.neon, #2FB814)',
      features: ['Paid program', 'Hands-on projects', 'Mentorship'],
      cta: 'Apply to Visit',
      link: '/apply-to-burro'
    },
    {
      type: 'Project Partner',
      title: 'Build With Us',
      description: 'Have an idea that needs world-class execution? We partner with visionaries to create digital experiences that matter.',
      icon: FiGlobe,
      color: 'accent.warm',
      gradient: 'linear(to-br, accent.warm, #FF4500)',
      features: ['Direct collaboration', 'Agile process', 'Long-term support'],
      cta: 'Start a Project',
      link: '/contact'
    }
  ];

  const stats = [
    { number: '12+', label: 'Team Members', color: 'brand.primary' },
    { number: '47', label: 'Projects Shipped', color: 'accent.neon' },
    { number: '7,200ft', label: 'Office Elevation', color: 'accent.warm' },
    { number: '∞', label: 'Coffee Consumed', color: 'accent.banana' }
  ];

  return (
    <Box 
      ref={sectionRef}
      py={{ base: 16, md: 24 }} 
      bg="dark.black" 
      position="relative"
      overflow="hidden"
    >
      {/* Animated Background Elements */}
      <motion.div style={{ opacity, scale }}>
        <Box
          position="absolute"
          top="20%"
          left="-10%"
          width="600px"
          height="600px"
          borderRadius="full"
          bg="brand.primary"
          filter="blur(200px)"
          opacity={0.03}
          transform={`translateX(${hoveredCard * 50}px)`}
          transition="transform 0.5s ease-out"
        />
        <Box
          position="absolute"
          bottom="20%"
          right="-10%"
          width="500px"
          height="500px"
          borderRadius="full"
          bg="accent.warm"
          filter="blur(200px)"
          opacity={0.03}
          transform={`translateX(-${hoveredCard * 50}px)`}
          transition="transform 0.5s ease-out"
        />
      </motion.div>

      {/* Floating particles */}
      {!isMobile && [...Array(8)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          width="3px"
          height="3px"
          borderRadius="full"
          bg={i % 2 === 0 ? 'brand.primary' : 'accent.banana'}
          left={`${Math.random() * 100}%`}
          top={`${Math.random() * 100}%`}
          opacity={0.4}
          animation={`float ${15 + i * 3}s ${i * 0.5}s infinite ease-in-out`}
          sx={{
            '@keyframes float': {
              '0%, 100%': { 
                transform: 'translate(0, 0)',
                opacity: 0.4
              },
              '50%': { 
                transform: `translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px)`,
                opacity: 0.6
              }
            }
          }}
        />
      ))}

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 20 }}>
          {/* Enhanced Header */}
          <VStack spacing={6} textAlign="center" maxW="900px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <HStack spacing={2} justify="center">
                <Box width="40px" height="2px" bg="accent.banana" />
                <Text 
                  color="accent.banana"
                  fontSize="sm" 
                  fontWeight="semibold" 
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Join The Movement
                </Text>
                <Box width="40px" height="2px" bg="accent.banana" />
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
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl", xl: "6xl" }}
                fontWeight="800"
                color="white"
                lineHeight="1.1"
                letterSpacing="-0.03em"
              >
                Ready to Join
                <Box
                  as="span"
                  display="block"
                  bgGradient="linear(to-r, brand.primary, accent.neon, accent.warm)"
                  bgClip="text"
                  mt={2}
                >
                  The Herd?
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
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                color="text.secondary"
                maxW="700px"
                lineHeight="relaxed"
              >
                Whether you're seeking a career change, want to level up your skills, 
                or have a project that needs elite execution, there's a place for you 
                in our mountain collective.
              </Text>
            </MotionBox>
          </VStack>

          {/* Opportunities Grid */}
          <MotionGrid
            templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {opportunities.map((opp, index) => (
              <MotionBox
                key={opp.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -10 }}
              >
                <Box
                  p={{ base: 6, md: 8 }}
                  borderRadius="2xl"
                  bg="rgba(255,255,255,0.02)"
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor="rgba(255,255,255,0.08)"
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  position="relative"
                  overflow="hidden"
                  role="group"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    borderColor: opp.color,
                    bg: 'rgba(255,255,255,0.04)',
                    boxShadow: `0 30px 60px ${opp.color}22`
                  }}
                >
                  {/* Gradient overlay on hover */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    height="150px"
                    bgGradient={opp.gradient}
                    opacity={0}
                    _groupHover={{ opacity: 0.1 }}
                    transition="opacity 0.3s"
                    pointerEvents="none"
                  />

                  {/* Number badge */}
                  <Box
                    position="absolute"
                    top={4}
                    right={4}
                    w="40px"
                    h="40px"
                    borderRadius="full"
                    bg={`${opp.color}22`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xl"
                    fontWeight="bold"
                    color={opp.color}
                    opacity={0.5}
                    _groupHover={{ opacity: 1 }}
                    transition="opacity 0.3s"
                  >
                    {index + 1}
                  </Box>

                  <VStack spacing={6} align="start" flex={1} position="relative">
                    {/* Icon */}
                    <Box
                      p={4}
                      borderRadius="xl"
                      bgGradient={opp.gradient}
                      color="white"
                      alignSelf="start"
                      transition="all 0.3s"
                      _groupHover={{
                        transform: 'scale(1.1) rotate(5deg)',
                        boxShadow: `0 10px 30px ${opp.color}44`
                      }}
                    >
                      <Box as={opp.icon} size={28} />
                    </Box>
                    
                    {/* Content */}
                    <VStack spacing={3} align="start">
                      <Box>
                        <Text
                          color={opp.color}
                          fontSize="xs"
                          fontWeight="bold"
                          letterSpacing="wider"
                          textTransform="uppercase"
                          mb={1}
                        >
                          {opp.type}
                        </Text>
                        <Heading
                          as="h3"
                          fontSize={{ base: "xl", md: "2xl" }}
                          color="white"
                          fontWeight="700"
                          lineHeight="tight"
                        >
                          {opp.title}
                        </Heading>
                      </Box>
                      <Text
                        color="text.secondary"
                        fontSize={{ base: "sm", md: "md" }}
                        lineHeight="relaxed"
                      >
                        {opp.description}
                      </Text>
                    </VStack>

                    {/* Features */}
                    <VStack align="start" spacing={2} width="100%">
                      {opp.features.map((feature, i) => (
                        <HStack key={i} spacing={2}>
                          <Box
                            w="5px"
                            h="5px"
                            borderRadius="full"
                            bg={opp.color}
                            opacity={0.6}
                          />
                          <Text color="text.muted" fontSize="sm">
                            {feature}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>

                    {/* CTA Button */}
                    <Button
                      size="lg"
                      width="100%"
                      bg="transparent"
                      color={opp.color}
                      border="2px solid"
                      borderColor={opp.color}
                      borderRadius="full"
                      fontWeight="600"
                      rightIcon={<FiArrowRight />}
                      onClick={() => window.location.href = opp.link}
                      position="relative"
                      overflow="hidden"
                      mt="auto"
                      _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        bgGradient: opp.gradient,
                        transition: 'left 0.3s'
                      }}
                      _hover={{
                        color: 'white',
                        transform: 'scale(1.02)',
                        _before: {
                          left: 0
                        }
                      }}
                      _active={{
                        transform: 'scale(0.98)'
                      }}
                      transition="all 0.3s"
                    >
                      {opp.cta}
                    </Button>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </MotionGrid>

          {/* Stats Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            width="100%"
          >
            <Box
              p={{ base: 6, md: 8 }}
              borderRadius="2xl"
              bg="rgba(255, 229, 0, 0.03)"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="rgba(255, 229, 0, 0.15)"
            >
              <Grid
                templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
                gap={{ base: 6, md: 8 }}
              >
                {stats.map((stat, index) => (
                  <VStack key={index} spacing={1}>
                    <Text
                      fontSize={{ base: "3xl", md: "4xl" }}
                      fontWeight="800"
                      fontFamily="mono"
                      color={stat.color}
                      textShadow={`0 0 30px ${stat.color}`}
                    >
                      {stat.number}
                    </Text>
                    <Text
                      color="text.muted"
                      fontSize="sm"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      fontWeight="medium"
                    >
                      {stat.label}
                    </Text>
                  </VStack>
                ))}
              </Grid>
            </Box>
          </MotionBox>

          {/* Final CTA */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            textAlign="center"
            maxW="800px"
            mx="auto"
          >
            <Heading
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              color="white"
              fontWeight="700"
              mb={4}
              lineHeight="tight"
            >
              The future of web development is being written at{' '}
              <Box as="span" color="accent.banana">
                7,200 feet
              </Box>
            </Heading>
            <Text
              color="text.secondary"
              fontSize={{ base: "md", md: "lg" }}
              mb={8}
            >
              Join a team that values creativity, craftsmanship, and mountain air over corporate politics.
            </Text>
            <Button
              size="lg"
              px={10}
              py={7}
              fontSize="md"
              fontWeight="bold"
              bgGradient="linear(to-r, accent.banana, accent.neon)"
              color="dark.black"
              borderRadius="full"
              leftIcon={<FiHeart />}
              onClick={() => window.location.href = '/contact'}
              position="relative"
              overflow="hidden"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                bgGradient: 'linear(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                transition: 'left 0.5s'
              }}
              _hover={{
                transform: 'translateY(-2px) scale(1.05)',
                boxShadow: '0 20px 40px rgba(255, 229, 0, 0.4)',
                _before: {
                  left: '100%'
                }
              }}
              _active={{
                transform: 'translateY(0) scale(0.98)'
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            >
              Let's Talk About Your Future
            </Button>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default JoinTheHerd;