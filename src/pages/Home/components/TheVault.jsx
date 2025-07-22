import { Box, Container, Heading, Text, VStack, HStack, Grid, Button, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiCheck, FiX, FiTrendingUp, FiShield, FiClock, FiAward } from 'react-icons/fi';

const MotionBox = motion(Box);

// Minimal animations for performance
const subtle = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
`;

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

const TheVault = () => {
  const [activeApproach, setActiveApproach] = useState(0);

  // What makes us different - focused content
  const approaches = [
    {
      title: "No Committees",
      description: "Talk directly with your developer, that designs, codes and builds your vision.",
      icon: FiTrendingUp,
      color: colors.brand.primary,
      traditional: "6 people in meetings",
      us: "1 expert who builds"
    },
    {
      title: "Fixed Pricing",
      description: "Know your investment upfront. No surprise invoices, ever.",
      icon: FiShield,
      color: colors.accent.warm,
      traditional: "Hourly billing nightmares",
      us: "One price, all inclusive"
    },
    {
      title: "Speed Matters",
      description: "Launch in weeks, not months. We move at startup velocity.",
      icon: FiClock,
      color: colors.accent.neon,
      traditional: "6-month timelines",
      us: "4-week sprints"
    }
  ];

  // Real differentiators
  const guarantees = [
    {
      promise: "Page speed scores above 90",
      detail: "Or we optimize for free"
    },
    {
      promise: "Direct Slack access to your team",
      detail: "No tickets, no waiting"
    },
    {
      promise: "Code you actually own",
      detail: "No proprietary lock-ins"
    },
    {
      promise: "Launch on schedule",
      detail: "Or 20% off your invoice"
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 24 }} 
      bg={colors.dark.black}
      overflow="hidden"
    >
      {/* Simple background gradient */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="1000px"
        height="600px"
        bg={`radial-gradient(ellipse at center, ${colors.brand.primary}08 0%, transparent 60%)`}
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
                <Box width="40px" height="2px" bg={colors.accent.warm} />
                <Text 
                  color={colors.accent.warm}
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold" 
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  The Vault
                </Text>
                <Box width="40px" height="2px" bg={colors.accent.warm} />
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
                The Anti-Agency
                <Box 
                  as="span" 
                  display="block"
                  bgGradient={`linear(to-r, ${colors.accent.warm}, ${colors.accent.banana})`}
                  bgClip="text"
                  mt={1}
                >
                  Approach
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
                lineHeight="relaxed"
                maxW="600px"
              >
                We ditched the agency playbook. No account managers, no bureaucracy, 
                no BS. Just elite builders working directly with you.
              </Text>
            </MotionBox>
          </VStack>

          {/* Approach Comparison - Main Feature */}
          <Grid
            templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
            maxW="1200px"
            mx="auto"
          >
            {approaches.map((approach, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveApproach(index)}
                onMouseLeave={() => setActiveApproach(null)}
              >
                <Box
                  p={{ base: 6, md: 8 }}
                  borderRadius="2xl"
                  bg="rgba(255, 255, 255, 0.02)"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor={activeApproach === index ? approach.color : "rgba(255, 255, 255, 0.08)"}
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  transition="all 0.3s"
                  cursor="pointer"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 40px ${approach.color}22`
                  }}
                >
                  {/* Icon */}
                  <Box
                    mb={4}
                    p={3}
                    borderRadius="xl"
                    bg={`${approach.color}11`}
                    display="inline-block"
                    color={approach.color}
                    fontSize="xl"
                  >
                    <approach.icon />
                  </Box>

                  {/* Title */}
                  <Heading
                    fontSize={{ base: "lg", md: "xl" }}
                    color="white"
                    mb={3}
                    letterSpacing="tight"
                  >
                    {approach.title}
                  </Heading>

                  {/* Description */}
                  <Text
                    color="gray.300"
                    fontSize={{ base: "sm", md: "md" }}
                    mb={6}
                    lineHeight="relaxed"
                  >
                    {approach.description}
                  </Text>

                  {/* Comparison */}
                  <VStack spacing={3} align="stretch">
                    <HStack spacing={3}>
                      <Box color="red.400" fontSize="sm">
                        <FiX />
                      </Box>
                      <Text color="gray.500" fontSize="sm" textDecoration="line-through">
                        {approach.traditional}
                      </Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Box color={approach.color} fontSize="sm">
                        <FiCheck />
                      </Box>
                      <Text color="white" fontSize="sm" fontWeight="medium">
                        {approach.us}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Our Guarantees */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            width="100%"
            maxW="900px"
            mx="auto"
          >
            <Box
              p={{ base: 6, md: 8 }}
              borderRadius="2xl"
              bg={`linear-gradient(135deg, ${colors.accent.neon}05 0%, ${colors.brand.primary}05 100%)`}
              backdropFilter="blur(10px)"
              border="2px solid"
              borderColor={`${colors.accent.neon}22`}
            >
              <VStack spacing={6}>
                <Heading
                  fontSize={{ base: "xl", md: "2xl" }}
                  color="white"
                  textAlign="center"
                  letterSpacing="tight"
                >
                  The Neon Burro Guarantee
                </Heading>

                <Grid
                  templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                  gap={4}
                  width="100%"
                >
                  {guarantees.map((item, index) => (
                    <HStack
                      key={index}
                      spacing={3}
                      align="start"
                      p={3}
                      borderRadius="lg"
                      bg="whiteAlpha.50"
                      transition="all 0.2s"
                      _hover={{
                        bg: 'whiteAlpha.100',
                        transform: 'translateX(4px)'
                      }}
                    >
                      <Box
                        color={colors.accent.neon}
                        fontSize="lg"
                        flexShrink={0}
                        mt={0.5}
                      >
                        <FiCheck />
                      </Box>
                      <VStack align="start" spacing={0}>
                        <Text color="white" fontSize="sm" fontWeight="medium">
                          {item.promise}
                        </Text>
                        <Text color="gray.400" fontSize="xs">
                          {item.detail}
                        </Text>
                      </VStack>
                    </HStack>
                  ))}
                </Grid>
              </VStack>
            </Box>
          </MotionBox>

          {/* Community Impact - Simplified */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            width="100%"
            maxW="800px"
            mx="auto"
          >
            <Box
              p={{ base: 8, md: 10 }}
              borderRadius="2xl"
              bg="rgba(255, 229, 0, 0.03)"
              backdropFilter="blur(10px)"
              border="2px solid"
              borderColor="rgba(255, 229, 0, 0.15)"
              textAlign="center"
              position="relative"
              overflow="hidden"
            >
              <VStack spacing={6}>
                <Box 
                  p={3}
                  borderRadius="full"
                  bg="rgba(255, 229, 0, 0.1)"
                  color={colors.accent.banana}
                  fontSize="2xl"
                >
                  <FiAward />
                </Box>
                
                <VStack spacing={3}>
                  <Heading 
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="bold"
                    color="white"
                    letterSpacing="tight"
                  >
                    Ridgway Gives Back
                  </Heading>
                  <Text 
                    color="gray.300"
                    fontSize={{ base: "sm", md: "md" }}
                    maxW="500px" 
                    lineHeight="relaxed"
                  >
                    Every other quarter, we transform one local business's digital presence 
                    at no cost. It's our way of supporting the community that supports us.
                  </Text>
                </VStack>
                
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
                  onClick={() => window.location.href = '/contact/'}
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
                  transition="all 0.3s"
                >
                  Nominate a Local Business
                </Button>
              </VStack>
            </Box>
          </MotionBox>

        </VStack>
      </Container>
    </Box>
  );
};

export default TheVault;