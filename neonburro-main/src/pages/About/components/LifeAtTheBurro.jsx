import { Box, Container, Heading, Text, VStack, Grid, Image, HStack, SimpleGrid, Button } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCoffee, FiMonitor, FiSun, FiWifi, FiUsers, FiMoon, FiHome, FiHeart } from 'react-icons/fi';
import { useState, useRef } from 'react';

const MotionBox = motion(Box);

const LifeAtTheBurro = () => {
  const [hoveredSpace, setHoveredSpace] = useState(null);
  const [activeDay, setActiveDay] = useState('weekday');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const spaces = [
    {
      name: 'The Command Center',
      icon: FiMonitor,
      description: 'Our main workspace where magic happens. Dual monitors, standing desks, and panoramic mountain views fuel creativity.',
      features: ['1GB Fiber Internet', 'Dual 4K Displays', 'Herman Miller Chairs', 'Climate Controlled'],
      color: 'brand.primary',
      image: '/images/scenes/digital-saloon-interior.jpg',
      capacity: '12 Developers',
      highlight: 'Best Views'
    },
    {
      name: 'The Fuel Station',
      icon: FiCoffee,
      description: 'Professional kitchen meets collaboration hub. Where code reviews happen over fresh coffee and breakthrough ideas emerge.',
      features: ['Espresso Machine', 'Full Kitchen', 'Whiteboard Walls', 'Snack Library'],
      color: 'accent.neon',
      image: '/images/scenes/stackhouse-interior.jpg',
      capacity: '8 People',
      highlight: 'Always Stocked'
    },
    {
      name: 'The Decompression Zone',
      icon: FiSun,
      description: 'Coming 2025. Hot springs, lazy river, and meditation spaces. Because your best code comes when you\'re refreshed.',
      features: ['Natural Hot Springs', 'Lazy River Office', 'Meditation Deck', 'Sunset Views'],
      color: 'accent.warm',
      image: '/images/scenes/lazy-river-night.jpg',
      capacity: 'Unlimited Zen',
      highlight: 'Opening 2025',
      comingSoon: true
    }
  ];

  const dayInLife = {
    weekday: [
      { time: '7:00 AM', activity: 'Sunrise coffee on the deck', icon: FiSun },
      { time: '8:30 AM', activity: 'Morning standup (optional hot tub)', icon: FiUsers },
      { time: '9:00 AM', activity: 'Deep work session begins', icon: FiMonitor },
      { time: '12:30 PM', activity: 'Lunch break with mountain views', icon: FiCoffee },
      { time: '2:00 PM', activity: 'Collaborative coding time', icon: FiUsers },
      { time: '5:00 PM', activity: 'Wrap up or keep going (your choice)', icon: FiMoon },
      { time: '6:30 PM', activity: 'Sunset beers and code reviews', icon: FiHeart }
    ],
    weekend: [
      { time: '9:00 AM', activity: 'Lazy morning, optional yoga', icon: FiSun },
      { time: '10:30 AM', activity: 'Farmers market run', icon: FiHome },
      { time: '12:00 PM', activity: 'BBQ and brainstorming', icon: FiCoffee },
      { time: '2:00 PM', activity: 'Hiking or hot springs', icon: FiSun },
      { time: '4:00 PM', activity: 'Personal projects time', icon: FiMonitor },
      { time: '7:00 PM', activity: 'Community dinner', icon: FiUsers },
      { time: '9:00 PM', activity: 'Fire pit and stargazing', icon: FiMoon }
    ]
  };

  const perks = [
    { title: 'Unlimited PTO', desc: 'Work hard, rest harder' },
    { title: 'Equipment Budget', desc: 'Top-tier gear provided' },
    { title: 'Wellness Stipend', desc: 'Stay healthy, stay creative' },
    { title: 'Remote Friendly', desc: 'Visit or stay permanently' },
    { title: 'Learning Budget', desc: 'Conferences and courses' },
    { title: 'Equity Options', desc: 'Own part of the dream' }
  ];

  return (
    <Box 
      ref={containerRef}
      id="life-at-burro" 
      py={{ base: 16, md: 20 }} 
      bg="dark.black" 
      position="relative"
      overflow="hidden"
    >
      {/* Parallax background elements */}
      <MotionBox
        style={{ y }}
        position="absolute"
        top="20%"
        left="10%"
        width="300px"
        height="300px"
        borderRadius="full"
        bg="brand.primary"
        filter="blur(100px)"
        opacity={0.03}
      />
      <MotionBox
        style={{ y: useTransform(y, v => v * -0.5) }}
        position="absolute"
        bottom="20%"
        right="10%"
        width="400px"
        height="400px"
        borderRadius="full"
        bg="accent.banana"
        filter="blur(120px)"
        opacity={0.03}
      />

      <Container maxW="1400px" px={{ base: 6, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 20 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="900px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <HStack spacing={2} justify="center" mb={4}>
                <Box as={FiHome} color="accent.banana" size={16} />
                <Text 
                  color="accent.banana"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold" 
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Life at Neon Burro
                </Text>
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
                lineHeight="1.2"
                letterSpacing="tight"
              >
                Where Code Meets
                <Box
                  as="span"
                  display="block"
                  bgGradient="linear(to-r, brand.primary, accent.banana)"
                  bgClip="text"
                  mt={1}
                >
                  Colorado Living
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
                color="text.secondary"
                maxW="700px"
                lineHeight="relaxed"
              >
                Our workspace isn't just about writing code. It's about creating an environment 
                where innovation thrives, creativity flows, and work-life balance isn't just a buzzword.
              </Text>
            </MotionBox>
          </VStack>

          {/* Spaces Grid - Enhanced */}
          <Grid
            templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
          >
            {spaces.map((space, index) => (
              <MotionBox
                key={space.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredSpace(index)}
                onMouseLeave={() => setHoveredSpace(null)}
              >
                <Box
                  borderRadius="2xl"
                  overflow="hidden"
                  bg="rgba(255,255,255,0.02)"
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor={hoveredSpace === index ? space.color : "whiteAlpha.100"}
                  height="100%"
                  position="relative"
                  transform={hoveredSpace === index ? 'translateY(-8px)' : 'translateY(0)'}
                  boxShadow={hoveredSpace === index ? `0 30px 60px ${space.color}22` : 'none'}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  {/* Image/Visual Section */}
                  <Box
                    height="240px"
                    position="relative"
                    overflow="hidden"
                    bg={`linear-gradient(135deg, ${space.color}22 0%, ${space.color}11 100%)`}
                  >
                    {/* Animated background pattern */}
                    <Box
                      position="absolute"
                      inset={0}
                      opacity={0.1}
                      backgroundImage={`radial-gradient(circle at 20% 50%, ${space.color} 0%, transparent 50%),
                                        radial-gradient(circle at 80% 80%, ${space.color} 0%, transparent 50%)`}
                      transform={hoveredSpace === index ? 'scale(1.1)' : 'scale(1)'}
                      transition="transform 0.6s ease-out"
                    />
                    
                    {/* Central icon */}
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      p={4}
                      borderRadius="full"
                      bg={`${space.color}22`}
                      backdropFilter="blur(10px)"
                    >
                      <Box
                        as={space.icon}
                        size={48}
                        color={space.color}
                        filter={hoveredSpace === index ? 'drop-shadow(0 0 20px currentColor)' : 'none'}
                        transform={hoveredSpace === index ? 'rotate(10deg)' : 'rotate(0deg)'}
                        transition="all 0.3s"
                      />
                    </Box>

                    {/* Status badges */}
                    <HStack position="absolute" top={4} right={4} spacing={2}>
                      {space.comingSoon ? (
                        <Box
                          bg="accent.warm"
                          color="dark.black"
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="bold"
                          animation="pulse 2s infinite"
                          sx={{
                            '@keyframes pulse': {
                              '0%, 100%': { opacity: 1 },
                              '50%': { opacity: 0.7 }
                            }
                          }}
                        >
                          {space.highlight}
                        </Box>
                      ) : (
                        <Box
                          bg={`${space.color}22`}
                          color={space.color}
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="bold"
                          backdropFilter="blur(10px)"
                        >
                          {space.highlight}
                        </Box>
                      )}
                    </HStack>

                    {/* Capacity indicator */}
                    <Box
                      position="absolute"
                      bottom={4}
                      left={4}
                      px={3}
                      py={1}
                      borderRadius="lg"
                      bg="blackAlpha.700"
                      backdropFilter="blur(10px)"
                    >
                      <Text color="white" fontSize="xs" fontWeight="medium">
                        <Box as={FiUsers} display="inline" mr={1} />
                        {space.capacity}
                      </Text>
                    </Box>
                  </Box>

                  {/* Content */}
                  <VStack p={6} spacing={4} align="start">
                    <Heading
                      as="h3"
                      fontSize={{ base: "lg", md: "xl" }}
                      color="white"
                      fontWeight="bold"
                    >
                      {space.name}
                    </Heading>
                    
                    <Text
                      color="text.secondary"
                      fontSize={{ base: "sm", md: "md" }}
                      lineHeight="relaxed"
                    >
                      {space.description}
                    </Text>

                    {/* Features with better styling */}
                    <VStack align="start" spacing={2} pt={2} width="100%">
                      {space.features.map((feature, idx) => (
                        <HStack key={idx} spacing={2}>
                          <Box
                            width="6px"
                            height="6px"
                            borderRadius="full"
                            bg={space.color}
                            flexShrink={0}
                            opacity={hoveredSpace === index ? 1 : 0.5}
                            transition="all 0.3s"
                          />
                          <Text
                            color="text.muted"
                            fontSize="sm"
                            opacity={hoveredSpace === index ? 1 : 0.7}
                            transition="all 0.3s"
                          >
                            {feature}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Day in the Life Section */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            width="100%"
            maxW="1200px"
            mx="auto"
          >
            <VStack spacing={6}>
              <Heading
                fontSize={{ base: "xl", md: "2xl" }}
                color="text.primary"
                textAlign="center"
              >
                A Day in the Life
              </Heading>
              
              {/* Day selector */}
              <HStack spacing={0} p={1} bg="whiteAlpha.100" borderRadius="full">
                <Button
                  size="sm"
                  px={6}
                  py={2}
                  borderRadius="full"
                  bg={activeDay === 'weekday' ? 'white' : 'transparent'}
                  color={activeDay === 'weekday' ? 'dark.black' : 'white'}
                  fontWeight="medium"
                  onClick={() => setActiveDay('weekday')}
                  transition="all 0.3s"
                  _hover={{ bg: activeDay === 'weekday' ? 'white' : 'whiteAlpha.200' }}
                >
                  Weekday
                </Button>
                <Button
                  size="sm"
                  px={6}
                  py={2}
                  borderRadius="full"
                  bg={activeDay === 'weekend' ? 'white' : 'transparent'}
                  color={activeDay === 'weekend' ? 'dark.black' : 'white'}
                  fontWeight="medium"
                  onClick={() => setActiveDay('weekend')}
                  transition="all 0.3s"
                  _hover={{ bg: activeDay === 'weekend' ? 'white' : 'whiteAlpha.200' }}
                >
                  Weekend
                </Button>
              </HStack>

              {/* Timeline */}
              <Box width="100%" position="relative">
                <Box
                  position="absolute"
                  left={{ base: "20px", md: "50%" }}
                  top={0}
                  bottom={0}
                  width="2px"
                  bg="whiteAlpha.200"
                  transform={{ base: "none", md: "translateX(-50%)" }}
                />
                
                <VStack spacing={0} align="stretch">
                  {dayInLife[activeDay].map((item, index) => (
                    <MotionBox
                      key={`${activeDay}-${index}`}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <HStack
                        spacing={4}
                        py={4}
                        position="relative"
                        justify={{ base: "flex-start", md: index % 2 === 0 ? "flex-end" : "flex-start" }}
                        textAlign={{ base: "left", md: index % 2 === 0 ? "right" : "left" }}
                      >
                        {/* Timeline dot */}
                        <Box
                          position="absolute"
                          left={{ base: "20px", md: "50%" }}
                          transform={{ base: "translateX(-50%)", md: "translate(-50%, -50%)" }}
                          top="50%"
                          width="40px"
                          height="40px"
                          borderRadius="full"
                          bg="dark.black"
                          border="2px solid"
                          borderColor="brand.primary"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          zIndex={1}
                        >
                          <Box as={item.icon} size={16} color="brand.primary" />
                        </Box>
                        
                        {/* Content */}
                        <Box
                          ml={{ base: "60px", md: index % 2 === 1 ? "calc(50% + 30px)" : 0 }}
                          mr={{ base: 0, md: index % 2 === 0 ? "calc(50% + 30px)" : 0 }}
                          maxW={{ base: "100%", md: "45%" }}
                        >
                          <Text color="brand.primary" fontSize="sm" fontWeight="bold" fontFamily="mono">
                            {item.time}
                          </Text>
                          <Text color="text.primary" fontSize={{ base: "sm", md: "md" }}>
                            {item.activity}
                          </Text>
                        </Box>
                      </HStack>
                    </MotionBox>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </MotionBox>

          {/* Perks Grid */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            width="100%"
          >
            <VStack spacing={6}>
              <Heading
                fontSize={{ base: "xl", md: "2xl" }}
                color="text.primary"
                textAlign="center"
              >
                The Perks of Being a Burro
              </Heading>
              
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} width="100%">
                {perks.map((perk, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Box
                      p={4}
                      borderRadius="lg"
                      bg="whiteAlpha.50"
                      backdropFilter="blur(10px)"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      textAlign="center"
                      transition="all 0.3s"
                      _hover={{
                        borderColor: 'brand.primary',
                        bg: 'brand.primaryAlpha.10',
                        transform: 'translateY(-4px)'
                      }}
                    >
                      <Text color="text.primary" fontSize="sm" fontWeight="bold" mb={1}>
                        {perk.title}
                      </Text>
                      <Text color="text.muted" fontSize="xs">
                        {perk.desc}
                      </Text>
                    </Box>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default LifeAtTheBurro;