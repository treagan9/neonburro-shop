import React from 'react';
import { Box, Container, Heading, Text, VStack, HStack, Progress, Image, Grid, Badge, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionImage = motion(Image);

// Define the blink animation using Chakra's keyframes
const blinkAnimation = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const GnarlyTacosLab = () => {
  const [progress] = React.useState(67);
  const [messageIndex, setMessageIndex] = React.useState(0);
  const [terminalLines, setTerminalLines] = React.useState([
    { text: '> Installing @neonburro/taco-engine v2.1.0', color: 'gray.400' },
    { text: '> ✓ Menu system initialized', color: 'green.400' },
    { text: '> ✓ Order queue configured', color: 'green.400' }
  ]);

  const messages = [
    'Initializing taco protocols...',
    'Loading spice algorithms...',
    'Configuring salsa matrix...',
    'Optimizing guacamole distribution...',
    'Calibrating tortilla parameters...'
  ];

  React.useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    const terminalInterval = setInterval(() => {
      const newLines = [
        { text: '> Building mobile interface...', color: 'gray.400' },
        { text: '> Warning: Extra hot sauce detected', color: 'yellow.400' },
        { text: '> Compiling order components...', color: 'gray.400' },
        { text: '> ✓ Payment gateway secured', color: 'green.400' },
        { text: '> Optimizing for hungry users...', color: 'gray.400' }
      ];
      
      setTerminalLines(prev => {
        if (prev.length >= 8) return prev.slice(-5);
        const randomLine = newLines[Math.floor(Math.random() * newLines.length)];
        return [...prev, randomLine];
      });
    }, 2000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(terminalInterval);
    };
  }, [messages.length]);

  return (
    <Box minH="100vh" bg="dark.black" position="relative" overflow="hidden">
      {/* Taco Rain Background */}
      <Box position="absolute" width="100%" height="100%" overflow="hidden" opacity={0.03}>
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            position="absolute"
            left={`${i * 20}%`}
            fontSize="2xl"
            animation={`tacoFall ${10 + i * 2}s linear infinite`}
            sx={{
              '@keyframes tacoFall': {
                '0%': { transform: 'translateY(-100px)' },
                '100%': { transform: 'translateY(calc(100vh + 100px))' }
              }
            }}
          >
            🌮
          </Box>
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
              <Text color="#FF6B35" fontSize="sm" fontWeight="600" letterSpacing="wider">
                CURRENTLY COOKING IN THE STACKHOUSE
              </Text>
              <Heading
                fontSize={{ base: "4xl", md: "6xl" }}
                color="white"
                fontWeight="800"
              >
                Gnarly Tacos <Box as="span" color="#FF6B35">2.0</Box>
              </Heading>
              <Text color="gray.400" fontSize="xl">
                {messages[messageIndex]}
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
              {/* Glow Background */}
              <Box
                position="absolute"
                width="300px"
                height="300px"
                bg="#FF6B35"
                filter="blur(120px)"
                opacity={0.3}
                animation="pulse 4s ease-in-out infinite"
                sx={{
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 0.2 },
                    '50%': { opacity: 0.4 }
                  }
                }}
              />
              
              {/* Neon Sign */}
              <MotionImage
                src="/images/neon-signs/gnar-tacos-neon-sign-logo.png"
                alt="Gnarly Tacos Neon Sign"
                width="220px"
                height="220px"
                objectFit="contain"
                filter="drop-shadow(0 0 40px rgba(255, 107, 53, 0.8))"
                animate={{
                  filter: [
                    'drop-shadow(0 0 40px rgba(255, 107, 53, 0.8)) brightness(1)',
                    'drop-shadow(0 0 30px rgba(255, 107, 53, 0.6)) brightness(0.9)',
                    'drop-shadow(0 0 50px rgba(255, 107, 53, 1)) brightness(1.1)',
                    'drop-shadow(0 0 40px rgba(255, 107, 53, 0.8)) brightness(1)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </Box>
          </MotionBox>

          {/* Progress Dashboard */}
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8}>
            {/* Progress Section */}
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Box
                p={6}
                bg="whiteAlpha.50"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="whiteAlpha.100"
                borderRadius="xl"
              >
                <VStack align="stretch" spacing={6}>
                  <HStack justify="space-between">
                    <Text color="white" fontWeight="600">Overall Progress</Text>
                    <Text color="#FF6B35" fontFamily="mono" fontSize="xl">{progress}%</Text>
                  </HStack>
                  
                  <VStack align="stretch" spacing={4}>
                    {[
                      { name: 'Mobile Interface', value: 85, color: 'orange' },
                      { name: 'Menu Database', value: 92, color: 'cyan' },
                      { name: 'Order System', value: 61, color: 'orange' },
                      { name: 'AI Recommendations', value: 34, color: 'cyan' }
                    ].map((item, i) => (
                      <Box key={i}>
                        <HStack justify="space-between" mb={2}>
                          <HStack spacing={2}>
                            <Box w={4} h={4} bg={item.color === 'orange' ? '#FF6B35' : '#00D9FF'} borderRadius="sm" />
                            <Text color="gray.400" fontSize="sm">{item.name}</Text>
                          </HStack>
                          <Text color="gray.500" fontSize="xs">{item.value}%</Text>
                        </HStack>
                        <Progress 
                          value={item.value} 
                          size="xs" 
                          colorScheme={item.color} 
                          bg="whiteAlpha.200" 
                          borderRadius="full"
                        />
                      </Box>
                    ))}
                  </VStack>
                </VStack>
              </Box>
            </MotionBox>

            {/* Terminal */}
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
                fontFamily="mono"
                fontSize="sm"
                height="100%"
              >
                <HStack spacing={2} mb={4}>
                  <Box w={3} h={3} borderRadius="full" bg="red.500" />
                  <Box w={3} h={3} borderRadius="full" bg="yellow.500" />
                  <Box w={3} h={3} borderRadius="full" bg="green.500" />
                  <Text color="gray.600" fontSize="xs" ml={2}>build.log</Text>
                </HStack>
                
                <VStack align="stretch" spacing={1}>
                  {terminalLines.map((line, i) => (
                    <Text key={i} color={line.color}>{line.text}</Text>
                  ))}
                  <Text color="gray.600">
                    <Box as="span" animation={`${blinkAnimation} 1s infinite`}>_</Box>
                  </Text>
                </VStack>
              </Box>
            </MotionBox>
          </Grid>

          {/* Features */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Box
              p={8}
              bg="whiteAlpha.50"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="#FF6B35"
              borderRadius="xl"
              textAlign="center"
            >
              <Heading size="md" color="white" mb={6}>
                What's Cooking? 👨‍🍳
              </Heading>
              <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
                {[
                  { emoji: '📱', title: 'Mobile-First Ordering', desc: 'Skip the line, order ahead' },
                  { emoji: '🎯', title: 'Local Rewards', desc: 'Ridgway residents get perks' },
                  { emoji: '🌶️', title: 'Spice Intelligence', desc: 'AI learns your heat tolerance' }
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
              Estimated Launch: <Box as="span" color="#FF6B35" fontWeight="600">Q2 2025</Box>
            </Text>
            <Text color="gray.600" fontSize="xs" mt={2}>
              (Or whenever the perfect salsa algorithm is achieved)
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default GnarlyTacosLab;