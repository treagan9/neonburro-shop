import { Box, Container, Heading, Text, VStack, SimpleGrid, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiSunrise, FiUsers, FiHome, FiZap } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';

const MotionBox = motion(Box);

const OurStory = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  const storyPoints = [
    {
      year: '2023',
      title: 'Trail Talk to Tech Dreams',
      description: 'What started as a chance meeting on the Bear Creek Trail turned into a shared vision. Two tech professionals, burned out from corporate life, discovered they both dreamed of building something meaningful in the mountains. Over coffee in Ridgway, we sketched our first plans on a napkin.',
      color: 'brand.primary',
      icon: FiSunrise
    },
    {
      year: '2024',
      title: 'Remote First, Quality Always',
      description: 'Assembled a core team of talented developers and designers who share our values. Every project gets personal attention, every client gets direct communication. No account managers, no middlemen, just makers talking to makers.',
      color: 'accent.warm',
      icon: FiUsers
    },
    {
      year: '2025',
      title: 'The GeoShip Vision',
      description: 'Expanding with bioceramic geodesic homes that slash living costs and reconnect us with nature. Opening our doors to team members who want to experience the Ridgway magic firsthand. Building more than websites, we\'re building a new way to work.',
      color: 'accent.neon',
      icon: FiHome
    },
    {
      year: '2026',
      title: 'Community & Creation',
      description: 'Three co-working domes, sustainable living spaces, and yes, we\'re still planning that lazy river. Creating a space where innovation meets nature, where the best ideas flow as freely as the mountain streams.',
      color: 'accent.banana',
      icon: FiZap
    }
  ];

  const ridgwayLove = [
    {
      title: 'Mountain Inspiration',
      description: 'Where every view sparks creativity',
      color: 'brand.primary'
    },
    {
      title: 'Local Community',
      description: 'Small town warmth, global reach',
      color: 'accent.banana'
    },
    {
      title: 'Sustainable Growth',
      description: 'Building with intention, not just ambition',
      color: 'accent.neon'
    }
  ];

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Counter component for animated numbers
  const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!isVisible) return;
      
      const startTime = Date.now();
      const endValue = parseInt(end);
      
      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOut * endValue);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };
      
      requestAnimationFrame(updateCount);
    }, [isVisible, end, duration]);
    
    return <>{count}{suffix}</>;
  };

  return (
    <Box
      id="our-story"
      position="relative"
      py={{ base: 16, md: 24 }}
      bg="dark.black"
      overflow="hidden"
    >
      {/* Subtle animated background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
        backgroundImage={`
          radial-gradient(circle at 25% 25%, var(--chakra-colors-brand-primary) 0%, transparent 40%),
          radial-gradient(circle at 75% 75%, var(--chakra-colors-accent-banana) 0%, transparent 40%)
        `}
      />

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Section Header */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            textAlign="center"
            maxW="800px"
            mx="auto"
          >
            <HStack spacing={2} justify="center" mb={4}>
              <Box 
                width="40px" 
                height="2px" 
                bg="accent.banana"
                animation="expandWidth 1s ease-out"
                sx={{
                  '@keyframes expandWidth': {
                    '0%': { width: 0 },
                    '100%': { width: '40px' }
                  }
                }}
              />
              <Text 
                color="accent.banana"
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="semibold" 
                letterSpacing="wider"
                textTransform="uppercase"
              >
                Our Story
              </Text>
              <Box 
                width="40px" 
                height="2px" 
                bg="accent.banana"
                animation="expandWidth 1s ease-out"
                sx={{
                  '@keyframes expandWidth': {
                    '0%': { width: 0 },
                    '100%': { width: '40px' }
                  }
                }}
              />
            </HStack>
            
            <Heading
              as="h2"
              fontSize={{ base: "26px", sm: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="extrabold"
              color="text.primary"
              mb={4}
              letterSpacing="tight"
              lineHeight={{ base: "1.3", md: "1.2" }}
            >
              Where Mountain Trails Meet
              <Box
                as="span"
                display="block"
                bgGradient="linear(to-r, accent.banana, brand.primary, accent.neon)"
                bgClip="text"
                mt={1}
              >
                Digital Paths
              </Box>
            </Heading>
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              color="text.secondary"
              maxW="600px"
              mx="auto"
              lineHeight="relaxed"
            >
              A chance encounter in the Colorado mountains sparked a partnership that's redefining how digital work gets done.
            </Text>
          </MotionBox>

          {/* Story Content */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 12 }} width="100%">
            {/* Story Text */}
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              order={{ base: 2, lg: 1 }}
            >
              <VStack spacing={6} align="start">
                <Text
                  fontSize={{ base: "sm", md: "md", lg: "lg" }}
                  color="text.secondary"
                  lineHeight="relaxed"
                >
                  Sometimes the best partnerships begin in the most unexpected places. Ours started at 9,000 feet 
                  on the Bear Creek Trail, where two strangers discovered they shared more than just a love for 
                  Colorado's peaks. Both of us had spent years in the corporate tech world, building products for 
                  companies that felt increasingly disconnected from real people and real problems.
                </Text>
                <Text
                  fontSize={{ base: "sm", md: "md", lg: "lg" }}
                  color="text.secondary"
                  lineHeight="relaxed"
                >
                  That hike led to coffee in Ridgway, where we explored the charming downtown and fell in love with 
                  the community's authentic spirit. Here was a town that valued craft, quality, and connection. 
                  It was everything the corporate world wasn't. We knew we'd found our home and our purpose.
                </Text>
                <Text
                  fontSize={{ base: "sm", md: "md", lg: "lg" }}
                  color="text.secondary"
                  lineHeight="relaxed"
                >
                  We purchased land just outside town, ordered our first geodesic dome and a Starlink kit, and 
                  Neon Burro was born. What started as two developers with a dream has grown into a thriving 
                  remote team of craftspeople who believe great work happens when you love where you live.
                </Text>
                <Text
                  fontSize={{ base: "sm", md: "md", lg: "lg" }}
                  color="text.secondary"
                  lineHeight="relaxed"
                >
                  Today, we're building more than websites. We're creating a new model for sustainable remote work, 
                  where team members can experience the Ridgway lifestyle while delivering exceptional digital products. 
                  Our GeoShip expansion isn't just about office space, it's about proving that the future of work 
                  looks nothing like the past.
                </Text>

                {/* Why Ridgway */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  mt={6}
                  p={6}
                  borderRadius="xl"
                  bg="rgba(255, 229, 0, 0.03)"
                  border="2px solid"
                  borderColor="rgba(255, 229, 0, 0.15)"
                  width="100%"
                >
                  <Text
                    color="accent.banana"
                    fontSize="sm"
                    fontWeight="semibold"
                    letterSpacing="wider"
                    textTransform="uppercase"
                    mb={4}
                  >
                    Why Ridgway Works
                  </Text>
                  <VStack spacing={3} align="start">
                    {ridgwayLove.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <HStack spacing={3}>
                          <Box
                            width="6px"
                            height="6px"
                            borderRadius="full"
                            bg={feature.color}
                            flexShrink={0}
                            boxShadow={`0 0 10px ${feature.color}`}
                          />
                          <Box>
                            <Text color="text.primary" fontSize="sm" fontWeight="semibold">
                              {feature.title}
                            </Text>
                            <Text color="text.muted" fontSize="xs">
                              {feature.description}
                            </Text>
                          </Box>
                        </HStack>
                      </motion.div>
                    ))}
                  </VStack>
                </MotionBox>
              </VStack>
            </MotionBox>

            {/* Timeline */}
            <Box order={{ base: 1, lg: 2 }}>
              <VStack spacing={4} align="stretch">
                {storyPoints.map((point, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.2,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                  >
                    <Box
                      p={5}
                      borderLeft="3px solid"
                      borderColor={point.color}
                      bg="rgba(255, 255, 255, 0.02)"
                      backdropFilter="blur(10px)"
                      borderRadius="lg"
                      position="relative"
                      role="group"
                      cursor="pointer"
                      _hover={{
                        bg: 'rgba(255, 255, 255, 0.04)',
                        transform: 'translateX(6px)',
                        boxShadow: `0 10px 30px ${point.color}22`
                      }}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                      {/* Icon */}
                      <Box
                        position="absolute"
                        top={5}
                        right={5}
                        p={2}
                        borderRadius="lg"
                        bg={`${point.color}11`}
                        opacity={0.5}
                        _groupHover={{ opacity: 1 }}
                        transition="all 0.3s"
                      >
                        <Box as={point.icon} size={16} color={point.color} />
                      </Box>

                      <Text
                        color={point.color}
                        fontSize={{ base: "xl", md: "2xl" }}
                        fontWeight="extrabold"
                        fontFamily="mono"
                        mb={1}
                      >
                        {point.year}
                      </Text>
                      <Text
                        color="text.primary"
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="bold"
                        mb={2}
                      >
                        {point.title}
                      </Text>
                      <Text
                        color="text.secondary"
                        fontSize={{ base: "xs", md: "sm" }}
                        lineHeight="relaxed"
                      >
                        {point.description}
                      </Text>
                    </Box>
                  </MotionBox>
                ))}
              </VStack>
            </Box>
          </SimpleGrid>

          {/* Impact Stats */}
          <MotionBox
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            width="100%"
          >
            <Box
              p={{ base: 6, md: 8 }}
              borderRadius="2xl"
              bg="rgba(0, 229, 229, 0.03)"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="rgba(0, 229, 229, 0.15)"
            >
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 6, md: 8 }}>
                {[
                  { number: '12', label: 'Team Members', color: 'brand.primary', suffix: '' },
                  { number: '47', label: 'Projects Delivered', color: 'accent.neon', suffix: '' },
                  { number: '100', label: 'Client Satisfaction', color: 'accent.banana', suffix: '%' },
                  { number: '3', label: 'Domes Planned', color: 'accent.warm', suffix: '' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                  >
                    <VStack spacing={1}>
                      <HStack spacing={0}>
                        <Text
                          fontSize={{ base: "2xl", md: "3xl" }}
                          fontWeight="extrabold"
                          fontFamily="mono"
                          color={stat.color}
                          textShadow={`0 0 20px ${stat.color}`}
                        >
                          {isVisible ? <AnimatedCounter end={stat.number} suffix={stat.suffix} /> : '0'}
                        </Text>
                      </HStack>
                      <Text
                        color="text.muted"
                        fontSize="xs"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        fontWeight="semibold"
                      >
                        {stat.label}
                      </Text>
                    </VStack>
                  </motion.div>
                ))}
              </SimpleGrid>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default OurStory;