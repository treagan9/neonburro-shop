import { Box, Container, Heading, Text, VStack, Grid, HStack, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);

const LabIndex = () => {
  const [activeExperiment, setActiveExperiment] = useState(null);
  const [particles, setParticles] = useState([]);

  const neonColors = {
    orange: '#FF6B35',
    cyan: '#00D9FF',
    purple: '#8B5CF6',
    amber: '#FFC107'
  };

  const experiments = [
    {
      id: 'gnarly-tacos',
      name: 'Gnarly Tacos',
      status: 'Active Development',
      location: 'The StackHouse',
      progress: 67,
      color: neonColors.orange,
      description: 'Custom ordering system replacing generic platforms',
      link: '/lab/gnarly-tacos',
      icon: '🌮'
    },
    {
      id: 'trace-gallery',
      name: 'TRACE Gallery',
      status: 'Design Phase',
      location: 'The Digital Saloon',
      progress: 34,
      color: neonColors.purple,
      description: 'Virtual gallery experience for local art space',
      link: '/lab/trace-gallery',
      icon: '🎨'
    },
    {
      id: 'colorado-boy',
      name: 'Colorado Boy Brewery',
      status: 'Early Concepts',
      location: 'The Idea Brewery',
      progress: 12,
      color: neonColors.amber,
      description: 'Digital taproom and ordering platform',
      link: '/lab/colorado-boy',
      icon: '🍺'
    }
  ];

  // Particle effect
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.filter(p => Date.now() - p.created < 3000),
        {
          id: Date.now(),
          created: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: Object.values(neonColors)[Math.floor(Math.random() * 4)]
        }
      ].slice(-10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box minH="100vh" bg="dark.black" position="relative" overflow="hidden">
      {/* Animated particles */}
      {particles.map((particle) => (
        <Box
          key={particle.id}
          position="absolute"
          left={`${particle.x}%`}
          top={`${particle.y}%`}
          width="4px"
          height="4px"
          bg={particle.color}
          borderRadius="full"
          opacity={1 - ((Date.now() - particle.created) / 3000)}
          filter={`blur(${(Date.now() - particle.created) / 1000}px)`}
          pointerEvents="none"
        />
      ))}

      {/* Grid background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.02}
        bgImage="repeating-linear-gradient(
          0deg,
          transparent,
          transparent 100px,
          rgba(255, 255, 255, 0.05) 100px,
          rgba(255, 255, 255, 0.05) 101px
        ),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 100px,
          rgba(255, 255, 255, 0.05) 100px,
          rgba(255, 255, 255, 0.05) 101px
        )"
        pointerEvents="none"
      />

      <Container maxW="1200px" pt={20} pb={10} position="relative">
        {/* Back link */}
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          mb={8}
        >
          <HStack
            as="a"
            href="/"
            spacing={2}
            color="gray.500"
            _hover={{ color: neonColors.cyan }}
            transition="color 0.3s"
          >
            <Box fontSize="sm">←</Box>
            <Text fontSize="sm">Back to Home</Text>
          </HStack>
        </MotionBox>

        <VStack spacing={12} align="stretch">
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VStack spacing={6} textAlign="center">
              <HStack spacing={3} justify="center">
                <Text fontSize="xl">🧪</Text>
                <Text 
                  color={neonColors.cyan}
                  fontSize="sm" 
                  fontWeight="600" 
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                >
                  The Neon Burro Lab
                </Text>
                <Text fontSize="xl">🧪</Text>
              </HStack>
              
              <Heading
                fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                color="white"
                fontWeight="800"
                letterSpacing="-0.03em"
                lineHeight="1"
              >
                Where Ideas
                <Box 
                  as="span" 
                  display="block"
                  bgGradient={`linear(to-r, ${neonColors.cyan}, ${neonColors.purple}, ${neonColors.orange})`}
                  bgClip="text"
                  mt={2}
                >
                  Come Alive
                </Box>
              </Heading>
              
              <Text color="gray.400" fontSize="xl" maxW="600px" mx="auto">
                Welcome to our digital laboratory. Watch real projects evolve from concept to completion.
              </Text>
            </VStack>
          </MotionBox>

          {/* Active Experiments */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <VStack spacing={8} align="stretch">
              <HStack justify="space-between" align="center">
                <Text color="white" fontSize="xl" fontWeight="600">
                  Active Experiments
                </Text>
                <HStack spacing={2}>
                  <Box w={4} h={4} bg={neonColors.cyan} borderRadius="sm" />
                  <Text color={neonColors.cyan} fontSize="sm" fontWeight="600">
                    {experiments.length} Projects Brewing
                  </Text>
                </HStack>
              </HStack>

              <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={6}>
                {experiments.map((experiment, index) => (
                  <MotionBox
                    key={experiment.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Box
                      as="a"
                      href={experiment.link}
                      display="block"
                      p={6}
                      bg="rgba(0,0,0,0.6)"
                      backdropFilter="blur(20px)"
                      border="2px solid"
                      borderColor={activeExperiment === experiment.id ? experiment.color : 'whiteAlpha.100'}
                      borderRadius="xl"
                      position="relative"
                      overflow="hidden"
                      role="group"
                      cursor="pointer"
                      onMouseEnter={() => setActiveExperiment(experiment.id)}
                      onMouseLeave={() => setActiveExperiment(null)}
                      _hover={{
                        borderColor: experiment.color,
                        boxShadow: `0 20px 40px ${experiment.color}22`
                      }}
                      transition="all 0.3s"
                      height="100%"
                    >
                      {/* Progress bar */}
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        height="3px"
                        bg="whiteAlpha.100"
                      >
                        <Box
                          height="100%"
                          bg={experiment.color}
                          width={`${experiment.progress}%`}
                          transition="width 0.5s"
                        />
                      </Box>

                      <VStack align="start" spacing={4}>
                        {/* Icon and Status */}
                        <HStack justify="space-between" width="100%">
                          <Text fontSize="3xl">{experiment.icon}</Text>
                          <Badge
                            px={2}
                            py={1}
                            borderRadius="md"
                            bg={`${experiment.color}22`}
                            color={experiment.color}
                            fontSize="xs"
                            fontWeight="600"
                          >
                            {experiment.progress}%
                          </Badge>
                        </HStack>

                        {/* Title and Location */}
                        <Box>
                          <Heading size="md" color="white" mb={1}>
                            {experiment.name}
                          </Heading>
                          <Text color="gray.500" fontSize="xs" fontWeight="600" letterSpacing="wider">
                            {experiment.location}
                          </Text>
                        </Box>

                        {/* Description */}
                        <Text color="gray.400" fontSize="sm" lineHeight="1.6">
                          {experiment.description}
                        </Text>

                        {/* Status */}
                        <HStack spacing={2} mt="auto">
                          <Box w={3} h={3} bg={experiment.color} borderRadius="full" />
                          <Text color={experiment.color} fontSize="xs" fontWeight="600">
                            {experiment.status}
                          </Text>
                        </HStack>

                        {/* Hover Arrow */}
                        <HStack
                          position="absolute"
                          bottom={6}
                          right={6}
                          spacing={1}
                          opacity={0}
                          transform="translateX(-10px)"
                          _groupHover={{
                            opacity: 1,
                            transform: 'translateX(0)'
                          }}
                          transition="all 0.3s"
                          color={experiment.color}
                        >
                          <Text fontSize="sm" fontWeight="600">Enter Lab</Text>
                          <Box fontSize="sm">→</Box>
                        </HStack>
                      </VStack>
                    </Box>
                  </MotionBox>
                ))}
              </Grid>
            </VStack>
          </MotionBox>

          {/* Lab Info */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Box
              p={8}
              bg="whiteAlpha.50"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.100"
              borderRadius="xl"
              textAlign="center"
            >
              <Heading size="md" color="white" mb={4}>
                What Happens in The Lab?
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6} mb={6}>
                <VStack>
                  <Box
                    w={12}
                    h={12}
                    borderRadius="lg"
                    bg={`${neonColors.cyan}22`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb={2}
                  >
                    <Text fontSize="xl">🧪</Text>
                  </Box>
                  <Text color="white" fontWeight="600">Real Experiments</Text>
                  <Text color="gray.400" fontSize="sm">
                    Watch actual client projects come to life
                  </Text>
                </VStack>
                <VStack>
                  <Box
                    w={12}
                    h={12}
                    borderRadius="lg"
                    bg={`${neonColors.purple}22`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb={2}
                  >
                    <Text fontSize="xl">🔬</Text>
                  </Box>
                  <Text color="white" fontWeight="600">Transparent Process</Text>
                  <Text color="gray.400" fontSize="sm">
                    See how we think, design, and build
                  </Text>
                </VStack>
                <VStack>
                  <Box
                    w={12}
                    h={12}
                    borderRadius="lg"
                    bg={`${neonColors.orange}22`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb={2}
                  >
                    <Text fontSize="xl">🚀</Text>
                  </Box>
                  <Text color="white" fontWeight="600">Community First</Text>
                  <Text color="gray.400" fontSize="sm">
                    Building for Ridgway, one site at a time
                  </Text>
                </VStack>
              </Grid>
              
              <Text color="gray.500" fontSize="sm" fontStyle="italic">
                "Every great website starts as an experiment in The Lab"
              </Text>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default LabIndex;