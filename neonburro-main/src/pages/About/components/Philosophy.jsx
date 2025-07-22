import { Box, Container, Heading, Text, VStack, Grid, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiZap, FiHeart, FiTrendingUp, FiUsers, FiCompass, FiTarget } from 'react-icons/fi';
import { useState } from 'react';

const MotionBox = motion(Box);

const Philosophy = () => {
  const [hoveredValue, setHoveredValue] = useState(null);

  const values = [
    {
      icon: FiZap,
      title: 'Speed with Purpose',
      description: 'We move fast but never recklessly. Every sprint has intention, every feature has meaning.',
      color: 'brand.primary',
      details: 'Ship weekly, iterate daily, learn constantly'
    },
    {
      icon: FiHeart,
      title: 'Craft Over Code',
      description: 'We\'re not just developers, we\'re digital craftspeople. Every project is a chance to create something meaningful.',
      color: 'accent.warm',
      details: 'Quality is non-negotiable, pride is in the details'
    },
    {
      icon: FiCompass,
      title: 'Remote by Design',
      description: 'Great work happens when talented people have the freedom to work where they thrive.',
      color: 'accent.neon',
      details: 'Trust over surveillance, results over hours'
    },
    {
      icon: FiUsers,
      title: 'Client Partnership',
      description: 'Your success is our success. We\'re not vendors, we\'re invested partners in your growth.',
      color: 'accent.banana',
      details: 'Direct communication, shared victories'
    },
    {
      icon: FiTrendingUp,
      title: 'Continuous Growth',
      description: 'The tech world moves fast. We stay ahead by constantly learning and adapting.',
      color: 'accent.purple',
      details: 'Weekly learning sessions, conference support'
    },
    {
      icon: FiTarget,
      title: 'Impact Focused',
      description: 'We measure success by the real-world impact our work creates, not just lines of code.',
      color: 'brand.primary',
      details: 'ROI driven, user obsessed, data informed'
    }
  ];

  const principles = [
    { number: '01', text: 'No ego, only excellence' },
    { number: '02', text: 'Done is better than perfect' },
    { number: '03', text: 'Communicate like adults' },
    { number: '04', text: 'Own your mistakes, share your wins' }
  ];

  return (
    <Box py={{ base: 16, md: 20 }} bg="dark.black" position="relative" overflow="hidden">
      {/* Dynamic background that responds to hover */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
      >
        <Box
          position="absolute"
          top="20%"
          left={hoveredValue !== null ? `${10 + hoveredValue * 15}%` : "20%"}
          width="400px"
          height="400px"
          borderRadius="full"
          bg="brand.primary"
          filter="blur(120px)"
          transition="all 0.5s ease-out"
        />
        <Box
          position="absolute"
          bottom="20%"
          right={hoveredValue !== null ? `${10 + hoveredValue * 15}%` : "20%"}
          width="350px"
          height="350px"
          borderRadius="full"
          bg="accent.banana"
          filter="blur(120px)"
          transition="all 0.5s ease-out"
        />
      </Box>

      {/* Grid pattern overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.02}
        backgroundImage="linear-gradient(var(--chakra-colors-brand-primary) 1px, transparent 1px),
                         linear-gradient(90deg, var(--chakra-colors-brand-primary) 1px, transparent 1px)"
        backgroundSize="50px 50px"
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
              <HStack spacing={2} justify="center">
                <Box width="40px" height="2px" bg="brand.primary" />
                <Text 
                  color="brand.primary"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold" 
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Our Philosophy
                </Text>
                <Box width="40px" height="2px" bg="brand.primary" />
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
                Built Different,
                <Box
                  as="span"
                  display="block"
                  bgGradient="linear(to-r, brand.primary, accent.banana)"
                  bgClip="text"
                  mt={1}
                >
                  Built Right
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
                We believe great digital products come from teams who care deeply about 
                their craft, their clients, and their culture. Here's how we think differently.
              </Text>
            </MotionBox>
          </VStack>

          {/* Values Grid */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
          >
            {values.map((value, index) => (
              <MotionBox
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                <Box
                  p={{ base: 5, md: 6 }}
                  borderRadius="xl"
                  bg="rgba(255,255,255,0.02)"
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor="rgba(255,255,255,0.08)"
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  cursor="pointer"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    borderColor: value.color,
                    bg: 'rgba(255,255,255,0.04)',
                    transform: 'translateY(-6px)',
                    boxShadow: `0 20px 40px ${value.color}22`
                  }}
                >
                  {/* Gradient accent */}
                  <Box
                    position="absolute"
                    top={0}
                    right={0}
                    width="100px"
                    height="100px"
                    opacity={0}
                    _groupHover={{ opacity: 1 }}
                    transition="all 0.3s"
                  >
                    <Box
                      position="absolute"
                      top={0}
                      right={0}
                      width="100%"
                      height="100%"
                      bg={`linear-gradient(135deg, ${value.color}22 0%, transparent 50%)`}
                      transform={hoveredValue === index ? "scale(1)" : "scale(0)"}
                      transformOrigin="top right"
                      transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    />
                  </Box>

                  <VStack align="start" spacing={4} position="relative">
                    <Box
                      p={3}
                      borderRadius="xl"
                      bg={`${value.color}11`}
                      color={value.color}
                      transition="all 0.3s"
                      _groupHover={{
                        transform: 'scale(1.1) rotate(5deg)',
                        bg: `${value.color}22`
                      }}
                    >
                      <Box as={value.icon} size={24} />
                    </Box>
                    
                    <VStack align="start" spacing={2}>
                      <Heading
                        as="h3"
                        fontSize={{ base: "lg", md: "xl" }}
                        color="white"
                        fontWeight="bold"
                      >
                        {value.title}
                      </Heading>
                      <Text
                        color="text.secondary"
                        fontSize={{ base: "sm", md: "md" }}
                        lineHeight="relaxed"
                      >
                        {value.description}
                      </Text>
                    </VStack>

                    {/* Details on hover */}
                    <Text
                      color={value.color}
                      fontSize="xs"
                      fontWeight="medium"
                      fontStyle="italic"
                      opacity={0}
                      transform="translateY(10px)"
                      transition="all 0.3s 0.1s"
                      _groupHover={{
                        opacity: 1,
                        transform: "translateY(0)"
                      }}
                    >
                      {value.details}
                    </Text>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Core Principles */}
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
              bg="rgba(0, 229, 229, 0.03)"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="rgba(0, 229, 229, 0.15)"
              maxW="900px"
              mx="auto"
            >
              <Heading
                fontSize={{ base: "lg", md: "xl" }}
                color="text.primary"
                mb={6}
                textAlign="center"
              >
                Our Core Principles
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                {principles.map((principle, index) => (
                  <HStack key={index} spacing={3} align="start">
                    <Text
                      color="brand.primary"
                      fontSize="lg"
                      fontWeight="bold"
                      fontFamily="mono"
                    >
                      {principle.number}
                    </Text>
                    <Text color="text.primary" fontSize="md">
                      {principle.text}
                    </Text>
                  </HStack>
                ))}
              </Grid>
            </Box>
          </MotionBox>

          {/* Quote Section */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            width="100%"
            textAlign="center"
          >
            <Box
              p={{ base: 8, md: 10 }}
              borderRadius="2xl"
              bg="rgba(255,229,0,0.03)"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="accent.bananaAlpha.20"
              maxW="800px"
              mx="auto"
              position="relative"
              overflow="hidden"
            >
              {/* Quote marks */}
              <Box
                position="absolute"
                top="-20px"
                left="20px"
                fontSize="120px"
                color="accent.banana"
                opacity={0.1}
                fontFamily="serif"
                lineHeight={1}
              >
                "
              </Box>
              
              <VStack spacing={4}>
                <Text
                  fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  color="white"
                  fontWeight="medium"
                  fontStyle="italic"
                  position="relative"
                  lineHeight="relaxed"
                >
                  We're not just building websites. We're building partnerships 
                  that transform businesses and the lives they touch.
                </Text>
                <HStack spacing={2}>
                  <Box width="40px" height="2px" bg="accent.banana" />
                  <Text
                    color="accent.banana"
                    fontSize="sm"
                    fontWeight="semibold"
                    letterSpacing="wide"
                  >
                    Tyler & Collin, Founders
                  </Text>
                  <Box width="40px" height="2px" bg="accent.banana" />
                </HStack>
              </VStack>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default Philosophy;