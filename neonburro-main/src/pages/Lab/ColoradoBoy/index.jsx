import React from 'react';
import { Box, Container, Heading, Text, VStack, HStack, Grid, Badge, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const ColoradoBoyLab = () => {
  const [brewProgress] = React.useState(12);
  const [currentStage, setCurrentStage] = React.useState(0);
  const [bubbles, setBubbles] = React.useState([]);
  
  const brewingStages = [
    'Mashing ideas...',
    'Boiling concepts...',
    'Adding feature hops...',
    'Fermenting functionality...',
    'Conditioning the experience...'
  ];

  const brewLog = [
    { time: '09:00', text: 'Started brewing digital taproom', type: 'info' },
    { time: '09:45', text: 'Added live tap list integration', type: 'success' },
    { time: '10:30', text: 'Testing pizza ordering flow', type: 'info' },
    { time: '11:15', text: 'Hop levels looking good', type: 'success' },
    { time: '12:00', text: 'Event calendar fermentation begun', type: 'warning' }
  ];

  React.useEffect(() => {
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % brewingStages.length);
    }, 3000);

    const bubbleInterval = setInterval(() => {
      setBubbles(prev => [
        ...prev.filter(b => b.created > Date.now() - 5000),
        {
          id: Date.now(),
          created: Date.now(),
          x: Math.random() * 100,
          size: Math.random() * 15 + 5
        }
      ].slice(-20));
    }, 300);

    return () => {
      clearInterval(stageInterval);
      clearInterval(bubbleInterval);
    };
  }, [brewingStages.length]);

  return (
    <Box minH="100vh" bg="dark.black" position="relative" overflow="hidden">
      {/* Beer Bubbles Background */}
      <Box position="absolute" width="100%" height="100%" overflow="hidden">
        {bubbles.map((bubble) => (
          <Box
            key={bubble.id}
            position="absolute"
            left={`${bubble.x}%`}
            bottom="-20px"
            width={`${bubble.size}px`}
            height={`${bubble.size}px`}
            borderRadius="full"
            bg="#FFC107"
            opacity={0.1}
            animation={`bubbleRise ${5 + Math.random() * 3}s linear`}
            sx={{
              '@keyframes bubbleRise': {
                '0%': { transform: 'translateY(0)', opacity: 0.1 },
                '100%': { transform: 'translateY(-100vh)', opacity: 0 }
              }
            }}
          />
        ))}
      </Box>

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
              <Text color="#FFC107" fontSize="sm" fontWeight="600" letterSpacing="wider">
                FERMENTING IN THE IDEA BREWERY
              </Text>
              <Heading
                fontSize={{ base: "4xl", md: "6xl" }}
                color="white"
                fontWeight="800"
              >
                Colorado Boy <Box as="span" color="#FFC107">Digital Taproom</Box>
              </Heading>
              <Text color="gray.400" fontSize="xl">
                {brewingStages[currentStage]}
              </Text>
            </VStack>
          </MotionBox>

          {/* Neon Sign with Beer Glass */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Box
              height="350px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              {/* Beer Glass */}
              <Box
                position="absolute"
                width="200px"
                height="280px"
                bottom="20px"
                opacity={0.15}
              >
                <Box
                  position="absolute"
                  bottom={0}
                  width="100%"
                  height="100%"
                  border="4px solid"
                  borderColor="#FFC107"
                  borderRadius="0 0 30px 30px"
                  overflow="hidden"
                >
                  <Box
                    position="absolute"
                    bottom={0}
                    width="100%"
                    height={`${brewProgress}%`}
                    bg="#FFC107"
                    opacity={0.8}
                    animation="fill 20s ease-in-out infinite"
                    sx={{
                      '@keyframes fill': {
                        '0%': { height: '12%' },
                        '50%': { height: '40%' },
                        '100%': { height: '12%' }
                      }
                    }}
                  >
                    <Box
                      position="absolute"
                      top={0}
                      width="100%"
                      height="30px"
                      bg="white"
                      opacity={0.6}
                      filter="blur(5px)"
                    />
                  </Box>
                </Box>
              </Box>

              {/* Glow */}
              <Box
                position="absolute"
                width="300px"
                height="300px"
                bg="#FFC107"
                filter="blur(120px)"
                opacity={0.3}
                animation="glow 4s ease-in-out infinite"
                sx={{
                  '@keyframes glow': {
                    '0%, 100%': { opacity: 0.2 },
                    '50%': { opacity: 0.4 }
                  }
                }}
              />
              
              {/* Neon Sign */}
              <MotionImage
                src="/images/neon-signs/colorado-boy-neon-sign-logo.png"
                alt="Colorado Boy Neon Sign"
                width="220px"
                height="220px"
                objectFit="contain"
                filter="drop-shadow(0 0 40px rgba(255, 193, 7, 0.8))"
                position="relative"
                zIndex={2}
                animate={{
                  filter: [
                    'drop-shadow(0 0 40px rgba(255, 193, 7, 0.8)) brightness(1)',
                    'drop-shadow(0 0 50px rgba(124, 179, 66, 0.8)) brightness(1.1)',
                    'drop-shadow(0 0 40px rgba(255, 193, 7, 0.8)) brightness(1)'
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Hop Animation */}
              <Box
                position="absolute"
                fontSize="2xl"
                animation="hopFloat 8s ease-in-out infinite"
                sx={{
                  '@keyframes hopFloat': {
                    '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
                    '25%': { transform: 'translate(50px, -30px) rotate(90deg)' },
                    '50%': { transform: 'translate(-30px, -50px) rotate(180deg)' },
                    '75%': { transform: 'translate(-50px, -20px) rotate(270deg)' }
                  }
                }}
              >
                🌿
              </Box>
            </Box>
          </MotionBox>

          {/* Brewing Dashboard */}
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
            {/* Main Tank */}
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Box
                p={8}
                bg="whiteAlpha.50"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="whiteAlpha.100"
                borderRadius="xl"
              >
                <Text color="white" fontWeight="600" mb={6}>Digital Brew Status</Text>
                
                {/* Progress Display */}
                <Box textAlign="center" mb={8}>
                  <Text fontSize="6xl" fontWeight="700" color="#FFC107" fontFamily="mono">
                    {brewProgress}%
                  </Text>
                  <Text color="gray.400" fontSize="sm">Fermentation Progress</Text>
                </Box>

                {/* Features Grid */}
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  {[
                    { name: 'Tap List API', color: '#FFC107', desc: 'Real-time beer availability' },
                    { name: 'Pizza Builder', color: '#7CB342', desc: 'Custom order system' },
                    { name: 'Live Music', color: '#00D9FF', desc: 'Event calendar integration' },
                    { name: 'Reservations', color: '#FF6B35', desc: 'Table booking system' }
                  ].map((item, i) => (
                    <Box
                      key={i}
                      p={4}
                      bg="whiteAlpha.100"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor={item.color}
                      transition="all 0.3s"
                      _hover={{ bg: 'whiteAlpha.200', transform: 'translateY(-2px)' }}
                    >
                      <HStack spacing={2} mb={2}>
                        <Box w={4} h={4} bg={item.color} borderRadius="sm" />
                        <Text color="white" fontSize="sm" fontWeight="600">{item.name}</Text>
                      </HStack>
                      <Text color="gray.400" fontSize="xs">{item.desc}</Text>
                    </Box>
                  ))}
                </Grid>
              </Box>
            </MotionBox>

            {/* Side Panel */}
            <VStack spacing={6} align="stretch">
              {/* Brew Log */}
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Box
                  p={6}
                  bg="black"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  borderRadius="xl"
                >
                  <HStack justify="space-between" mb={4}>
                    <Text color="white" fontWeight="600">Brew Log</Text>
                    <Badge colorScheme="green" variant="subtle">LIVE</Badge>
                  </HStack>
                  
                  <VStack align="stretch" spacing={2} fontSize="xs" fontFamily="mono">
                    {brewLog.map((log, i) => (
                      <HStack key={i} spacing={2}>
                        <Text color="gray.600">{log.time}</Text>
                        <Text color={
                          log.type === 'success' ? 'green.400' : 
                          log.type === 'warning' ? 'yellow.400' : 
                          'gray.400'
                        }>
                          {log.text}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </MotionBox>

              {/* Recipe */}
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Box
                  p={6}
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="#FFC107"
                  borderRadius="xl"
                >
                  <Text color="white" fontWeight="600" mb={3}>Digital Recipe</Text>
                  <VStack align="start" spacing={2} fontSize="sm">
                    {[
                      { percent: 60, label: 'User Experience', color: '#FFC107' },
                      { percent: 25, label: 'Local Flavor', color: '#7CB342' },
                      { percent: 10, label: 'Social Features', color: '#00D9FF' },
                      { percent: 5, label: 'Secret Sauce', color: '#FF6B35' }
                    ].map((item, i) => (
                      <Text key={i} color="gray.400">
                        <Box as="span" color={item.color} fontWeight="600">{item.percent}%</Box> {item.label}
                      </Text>
                    ))}
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
              borderColor="#FFC107"
              borderRadius="xl"
              textAlign="center"
            >
              <Heading size="md" color="white" mb={6}>
                What's On Tap? 🍺
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
                {[
                  { emoji: '🍻', title: 'Live Tap List', desc: 'Know what\'s pouring now' },
                  { emoji: '🍕', title: 'Order Ahead', desc: 'Pizza ready when you arrive' },
                  { emoji: '🎸', title: 'Event Calendar', desc: 'Never miss live music' }
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
              Fermentation Stage: <Box as="span" color="#FFC107" fontWeight="600">Early Brewing</Box>
            </Text>
            <Text color="gray.600" fontSize="xs" mt={2}>
              (Good things come to those who wait... and drink good beer)
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ColoradoBoyLab;