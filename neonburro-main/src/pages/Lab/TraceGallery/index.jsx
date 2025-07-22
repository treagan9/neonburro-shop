import React from 'react';
import { Box, Container, Heading, Text, VStack, HStack, Grid, SimpleGrid, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const TraceGalleryLab = () => {
  const [activeFrame, setActiveFrame] = React.useState(null);
  const [designPhase, setDesignPhase] = React.useState(0);
  const [progress] = React.useState(34);

  const designMessages = [
    'Sketching gallery layouts...',
    'Designing artist showcases...',
    'Crafting immersive experiences...',
    'Perfecting the digital canvas...'
  ];

  const wireframes = [
    { id: 'nav', label: 'Navigation', color: '#00D9FF' },
    { id: 'hero', label: 'Gallery Hero', color: '#FF6B35' },
    { id: 'exhibition', label: 'Current Exhibition', color: '#8B5CF6' },
    { id: 'artists', label: 'Artist Profiles', color: '#EC4899' },
    { id: 'events', label: 'Events Calendar', color: '#00D9FF' },
    { id: 'visit', label: 'Visit Info', color: '#FF6B35' }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDesignPhase((prev) => (prev + 1) % designMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [designMessages.length]);

  return (
    <Box minH="100vh" bg="dark.black" position="relative" overflow="hidden">
      {/* Artistic Background Pattern */}
      <Box
        position="absolute"
        width="100%"
        height="100%"
        opacity={0.02}
        backgroundImage="radial-gradient(circle at 20% 50%, #8B5CF6 0%, transparent 50%),
                         radial-gradient(circle at 80% 80%, #EC4899 0%, transparent 50%)"
      />

      <Container maxW="1200px" pt={20} pb={10} position="relative">
        {/* Back Link */}
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
            _hover={{ color: '#00D9FF' }}
            cursor="pointer"
          >
            <Text>← Back to The Vault</Text>
          </HStack>
        </MotionBox>

        <VStack spacing={12} align="stretch">
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VStack spacing={4} textAlign="center">
              <Text color="#8B5CF6" fontSize="sm" fontWeight="600" letterSpacing="wider">
                SKETCHING IN THE DIGITAL SALOON
              </Text>
              <Heading
                fontSize={{ base: "4xl", md: "6xl" }}
                color="white"
                fontWeight="800"
              >
                TRACE Gallery <Box as="span" color="#8B5CF6">Reimagined</Box>
              </Heading>
              <Text color="gray.400" fontSize="xl">
                {designMessages[designPhase]}
              </Text>
            </VStack>
          </MotionBox>

          {/* Neon Sign Display */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Box
              height="300px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              {/* Rotating Gradient Background */}
              <Box
                position="absolute"
                width="400px"
                height="400px"
                background="conic-gradient(from 0deg, #8B5CF6, #EC4899, #00D9FF, #8B5CF6)"
                filter="blur(100px)"
                opacity={0.2}
                animation="rotate 20s linear infinite"
                sx={{
                  '@keyframes rotate': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                  }
                }}
              />
              
              {/* Neon Sign */}
              <MotionImage
                src="/images/neon-signs/trace-gallery-neon-sign-logo.png"
                alt="TRACE Gallery Neon Sign"
                width="240px"
                height="240px"
                objectFit="contain"
                filter="drop-shadow(0 0 40px rgba(139, 92, 246, 0.8))"
                animate={{
                  filter: [
                    'drop-shadow(0 0 40px rgba(139, 92, 246, 0.8))',
                    'drop-shadow(0 0 50px rgba(236, 72, 153, 0.8))',
                    'drop-shadow(0 0 40px rgba(0, 217, 255, 0.8))',
                    'drop-shadow(0 0 40px rgba(139, 92, 246, 0.8))'
                  ],
                  scale: [1, 1.02, 1.01, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </Box>
          </MotionBox>

          {/* Design Process */}
          <Grid templateColumns={{ base: '1fr', lg: '3fr 2fr' }} gap={8}>
            {/* Wireframe Canvas */}
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Box
                p={8}
                bg="white"
                borderRadius="xl"
                height="500px"
                position="relative"
                boxShadow="0 20px 40px rgba(0,0,0,0.2)"
              >
                <Text 
                  position="absolute" 
                  top={4} 
                  left={4} 
                  color="gray.400" 
                  fontSize="xs"
                  fontFamily="mono"
                >
                  wireframe_v2.3.sketch
                </Text>

                <SimpleGrid columns={2} spacing={4} height="100%" p={4}>
                  {wireframes.map((frame) => (
                    <MotionBox
                      key={frame.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Box
                        height="100%"
                        bg={activeFrame === frame.id ? `${frame.color}11` : 'gray.100'}
                        border="2px dashed"
                        borderColor={activeFrame === frame.id ? frame.color : 'gray.300'}
                        borderRadius="lg"
                        p={4}
                        cursor="pointer"
                        transition="all 0.3s"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        onMouseEnter={() => setActiveFrame(frame.id)}
                        onMouseLeave={() => setActiveFrame(null)}
                      >
                        <VStack spacing={2}>
                          <Box
                            w={10}
                            h={10}
                            borderRadius="md"
                            bg={activeFrame === frame.id ? frame.color : 'gray.400'}
                            opacity={0.7}
                          />
                          <Text 
                            color={activeFrame === frame.id ? 'gray.700' : 'gray.400'} 
                            fontSize="sm"
                            fontWeight="500"
                            textAlign="center"
                          >
                            {frame.label}
                          </Text>
                        </VStack>
                      </Box>
                    </MotionBox>
                  ))}
                </SimpleGrid>
              </Box>
            </MotionBox>

            {/* Design Details */}
            <VStack spacing={6} align="stretch">
              {/* Progress Stats */}
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Box
                  p={6}
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  borderRadius="xl"
                >
                  <Text color="white" fontWeight="600" mb={4}>Design Progress - {progress}%</Text>
                  <VStack align="stretch" spacing={3}>
                    {[
                      { name: 'Layout Architecture', value: 45, color: '#8B5CF6' },
                      { name: 'Gallery Systems', value: 28, color: '#EC4899' },
                      { name: 'Artist Profiles', value: 37, color: '#00D9FF' },
                      { name: 'Event System', value: 22, color: '#FF6B35' }
                    ].map((item, i) => (
                      <HStack key={i} justify="space-between">
                        <HStack spacing={2}>
                          <Box w={4} h={4} bg={item.color} borderRadius="sm" />
                          <Text color="gray.400" fontSize="sm">{item.name}</Text>
                        </HStack>
                        <Text color={item.color} fontSize="sm" fontWeight="600">{item.value}%</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </MotionBox>

              {/* Design Notes */}
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Box
                  p={6}
                  bg="black"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  borderRadius="xl"
                >
                  <Text color="white" fontWeight="600" mb={3}>Design Notes</Text>
                  <VStack align="stretch" spacing={2} fontSize="sm" fontFamily="mono">
                    <Text color="gray.400">// Embrace white space</Text>
                    <Text color="#8B5CF6">// Let the art breathe</Text>
                    <Text color="gray.400">// Mobile-first gallery viewing</Text>
                    <Text color="#EC4899">// Artist stories {'>'} just images</Text>
                    <Text color="gray.400">// Real-time "open now" status</Text>
                    <Text color="#00D9FF">// Virtual tour capability</Text>
                  </VStack>
                </Box>
              </MotionBox>
            </VStack>
          </Grid>

          {/* Features */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Box
              p={8}
              bg="whiteAlpha.50"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="#8B5CF6"
              borderRadius="xl"
              textAlign="center"
            >
              <Heading size="md" color="white" mb={6}>
                The Vision Taking Shape 🎨
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
                {[
                  { emoji: '🖼️', title: 'Virtual Exhibitions', desc: '360° gallery tours from anywhere' },
                  { emoji: '👩‍🎨', title: 'Artist Spotlights', desc: 'Stories behind the art' },
                  { emoji: '📅', title: 'Smart Scheduling', desc: 'Never miss an opening' }
                ].map((feature, i) => (
                  <VStack key={i}>
                    <Text fontSize="3xl">{feature.emoji}</Text>
                    <Text color="white" fontWeight="600">{feature.title}</Text>
                    <Text color="gray.400" fontSize="sm">{feature.desc}</Text>
                  </VStack>
                ))}
              </Grid>
            </Box>
          </MotionBox>

          {/* Status */}
          <Box textAlign="center">
            <Text color="gray.500" fontSize="sm">
              Current Status: <Box as="span" color="#8B5CF6" fontWeight="600">Wireframing Wonder</Box>
            </Text>
            <Text color="gray.600" fontSize="xs" mt={2}>
              (The muse is speaking, and we're taking notes)
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default TraceGalleryLab;