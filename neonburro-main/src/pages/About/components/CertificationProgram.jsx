import { Box, Container, Heading, Text, VStack, HStack, Grid, Button, Badge, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiAward, FiCode, FiUsers, FiTrendingUp, FiArrowRight, FiZap, FiCalendar, FiMapPin, FiDollarSign } from 'react-icons/fi';
import { useState } from 'react';

const MotionBox = motion(Box);

const CertificationProgram = () => {
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  
  // Navigation handler
  const handleNavigate = (path) => {
    window.location.href = path;
  };

  const benefits = [
    {
      icon: FiCode,
      title: 'Real Project Experience',
      description: 'Work on live client projects with real deadlines and real impact. No busy work, just meaningful contributions.',
      color: 'brand.primary',
      stat: '15+',
      statLabel: 'Live Projects'
    },
    {
      icon: FiUsers,
      title: 'Direct Mentorship',
      description: 'Pair program with our senior developers. Get code reviews, career guidance, and industry insights.',
      color: 'accent.neon',
      stat: '1:1',
      statLabel: 'Mentoring'
    },
    {
      icon: FiTrendingUp,
      title: 'Skill Acceleration',
      description: 'Master React, Node.js, cloud deployment, and modern development practices in a production environment.',
      color: 'accent.banana',
      stat: '10x',
      statLabel: 'Growth Rate'
    },
    {
      icon: FiAward,
      title: 'Burro Certification',
      description: 'Graduate with a portfolio, professional references, and potential full-time opportunities.',
      color: 'accent.purple',
      stat: '95%',
      statLabel: 'Hire Rate'
    }
  ];

  const programDetails = [
    { icon: FiCalendar, label: 'Duration', value: '3-6 Months', color: 'brand.primary' },
    { icon: FiMapPin, label: 'Location', value: 'Ridgway, CO', color: 'accent.neon' },
    { icon: FiDollarSign, label: 'Cost', value: 'Paid Program', color: 'accent.banana' },
    { icon: FiZap, label: 'Commitment', value: '20-40 hrs/week', color: 'accent.warm' }
  ];

  const requirements = [
    '2+ years of development experience',
    'Strong JavaScript/React fundamentals',
    'Portfolio of personal projects',
    'Passion for continuous learning',
    'Remote work experience preferred',
    'Love for mountains is a plus'
  ];

  return (
    <Box py={{ base: 16, md: 20 }} bg="dark.black" position="relative" overflow="hidden">
      {/* Animated background particles */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        pointerEvents="none"
      >
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            position="absolute"
            width="3px"
            height="3px"
            borderRadius="full"
            bg={i % 2 === 0 ? 'accent.neon' : 'accent.banana'}
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
                  opacity: 0.7
                }
              }
            }}
          />
        ))}
      </Box>

      {/* Dynamic gradient background */}
      <Box
        position="absolute"
        top="30%"
        left="10%"
        width="400px"
        height="400px"
        borderRadius="full"
        bg="accent.neon"
        filter="blur(150px)"
        opacity={0.03}
        transform={hoveredBenefit !== null ? `translateX(${hoveredBenefit * 50}px)` : 'translateX(0)'}
        transition="transform 0.5s ease-out"
      />

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="900px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <HStack
                spacing={2}
                px={{ base: 3, md: 4 }}
                py={{ base: 1.5, md: 2 }}
                borderRadius="full"
                bg="accent.neonAlpha.20"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="accent.neonAlpha.30"
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="600"
                letterSpacing="0.05em"
                boxShadow="0 0 20px var(--chakra-colors-accent-neon)22"
                cursor="pointer"
                transition="all 0.3s"
                _hover={{
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 30px var(--chakra-colors-accent-neon)44'
                }}
              >
                <Box
                  as={FiZap}
                  size={14}
                  color="var(--chakra-colors-accent-neon)"
                  animation="pulse 2s infinite"
                  sx={{
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.5 }
                    }
                  }}
                />
                <Text color="accent.neon">APPLICATIONS OPEN FOR 2025</Text>
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
                Join the Herd as a
                <Box
                  as="span"
                  display="block"
                  bgGradient="linear(to-r, accent.neon, accent.banana)"
                  bgClip="text"
                  mt={1}
                >
                  Visiting Burro
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
                An immersive developer residency program where you'll work on real projects, 
                learn from industry veterans, and experience the perfect balance of intense coding 
                and Colorado mountain life.
              </Text>
            </MotionBox>

            {/* Program Quick Stats */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              width="100%"
              mt={6}
            >
              <HStack
                spacing={{ base: 4, md: 8 }}
                justify="center"
                flexWrap="wrap"
                gap={3}
              >
                {programDetails.map((detail, index) => (
                  <HStack
                    key={index}
                    spacing={2}
                    px={4}
                    py={2}
                    borderRadius="lg"
                    bg="whiteAlpha.50"
                    backdropFilter="blur(10px)"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    transition="all 0.3s"
                    _hover={{
                      borderColor: detail.color,
                      bg: `${detail.color}11`,
                      transform: 'translateY(-2px)'
                    }}
                  >
                    <Box as={detail.icon} size={16} color={detail.color} />
                    <VStack spacing={0} align="start">
                      <Text fontSize="xs" color="text.muted" fontWeight="medium">
                        {detail.label}
                      </Text>
                      <Text fontSize="sm" color="text.primary" fontWeight="bold">
                        {detail.value}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </HStack>
            </MotionBox>
          </VStack>

          {/* Benefits Grid */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
            maxW="1100px"
            mx="auto"
          >
            {benefits.map((benefit, index) => (
              <MotionBox
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                <Box
                  p={{ base: 6, md: 8 }}
                  borderRadius="xl"
                  bg="rgba(255,255,255,0.02)"
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor="rgba(255,255,255,0.08)"
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  role="group"
                  cursor="pointer"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    borderColor: benefit.color,
                    bg: 'rgba(255,255,255,0.04)',
                    boxShadow: `0 20px 40px ${benefit.color}22`,
                  }}
                >
                  {/* Animated stat badge */}
                  <Box
                    position="absolute"
                    top={4}
                    right={4}
                    px={3}
                    py={1}
                    borderRadius="full"
                    bg={`${benefit.color}22`}
                    border="1px solid"
                    borderColor={`${benefit.color}44`}
                    opacity={0}
                    transform="scale(0.8)"
                    _groupHover={{
                      opacity: 1,
                      transform: "scale(1)"
                    }}
                    transition="all 0.3s"
                  >
                    <VStack spacing={0}>
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color={benefit.color}
                        fontFamily="mono"
                      >
                        {benefit.stat}
                      </Text>
                      <Text
                        fontSize="2xs"
                        color="text.muted"
                        textTransform="uppercase"
                        letterSpacing="wider"
                      >
                        {benefit.statLabel}
                      </Text>
                    </VStack>
                  </Box>

                  <VStack align="start" spacing={4} position="relative">
                    <Box
                      p={3}
                      borderRadius="xl"
                      bg={`${benefit.color}11`}
                      color={benefit.color}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      _groupHover={{
                        transform: 'scale(1.1) rotate(5deg)',
                        bg: `${benefit.color}22`
                      }}
                    >
                      <benefit.icon size={24} />
                    </Box>
                    
                    <VStack align="start" spacing={2}>
                      <Heading
                        as="h3"
                        fontSize="xl"
                        color="white"
                        fontWeight="semibold"
                      >
                        {benefit.title}
                      </Heading>
                      <Text
                        color="text.secondary"
                        fontSize={{ base: "sm", md: "md" }}
                        lineHeight="relaxed"
                      >
                        {benefit.description}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Requirements Section */}
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
              bg="rgba(139, 92, 246, 0.03)"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="rgba(139, 92, 246, 0.15)"
            >
              <VStack spacing={4} align="start">
                <Heading
                  as="h3"
                  fontSize={{ base: "xl", md: "2xl" }}
                  color="text.primary"
                  fontWeight="bold"
                >
                  What We're Looking For
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3} width="100%">
                  {requirements.map((req, index) => (
                    <HStack key={index} spacing={3} align="start">
                      <Box
                        width="6px"
                        height="6px"
                        borderRadius="full"
                        bg="accent.purple"
                        flexShrink={0}
                        mt={2}
                        boxShadow="0 0 10px var(--chakra-colors-accent-purple)"
                      />
                      <Text color="text.secondary" fontSize="sm">
                        {req}
                      </Text>
                    </HStack>
                  ))}
                </SimpleGrid>
              </VStack>
            </Box>
          </MotionBox>

          {/* CTA Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            textAlign="center"
          >
            <VStack spacing={6}>
              <Box
                px={{ base: 6, md: 8 }}
                py={{ base: 4, md: 5 }}
                borderRadius="xl"
                bg="rgba(255, 229, 0, 0.03)"
                backdropFilter="blur(20px)"
                border="2px solid"
                borderColor="rgba(255, 229, 0, 0.2)"
                transition="all 0.3s"
                _hover={{
                  borderColor: 'accent.banana',
                  boxShadow: '0 10px 30px rgba(255, 229, 0, 0.15)'
                }}
              >
                <VStack spacing={2}>
                  <Text 
                    color="text.primary" 
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="bold"
                  >
                    Ready to accelerate your career in the Colorado mountains?
                  </Text>
                  <Text
                    color="text.secondary"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Limited spots available. Applications reviewed on a rolling basis.
                  </Text>
                </VStack>
              </Box>
              
              <HStack spacing={4}>
                <Button
                  size="lg"
                  px={{ base: 8, md: 10 }}
                  py={7}
                  bg="accent.banana"
                  color="dark.black"
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="bold"
                  borderRadius="full"
                  rightIcon={<FiArrowRight />}
                  onClick={() => handleNavigate('/apply-to-burro/')}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    bg: 'accent.bananaLight',
                    transform: 'translateY(-2px) scale(1.02)',
                    boxShadow: '0 20px 40px rgba(255, 229, 0, 0.3)'
                  }}
                  _active={{
                    transform: 'translateY(0) scale(0.98)'
                  }}
                >
                  Apply Now
                </Button>
                
                <Button
                  size="lg"
                  px={{ base: 6, md: 8 }}
                  py={7}
                  variant="outline"
                  borderColor="whiteAlpha.300"
                  borderWidth="2px"
                  color="white"
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="600"
                  borderRadius="full"
                  onClick={() => handleNavigate('/faq/')}
                  _hover={{
                    bg: 'whiteAlpha.100',
                    borderColor: 'brand.primary',
                    color: 'brand.primary'
                  }}
                  transition="all 0.3s"
                >
                  Learn More
                </Button>
              </HStack>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default CertificationProgram;