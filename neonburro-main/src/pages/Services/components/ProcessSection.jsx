// Services/components/ProcessSection.jsx
import { Box, Container, Heading, Text, VStack, HStack, Grid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiPenTool, FiCode, FiSend, FiRefreshCw } from 'react-icons/fi';

const MotionBox = motion(Box);

const ProcessSection = () => {
  const steps = [
    {
      number: '01',
      icon: FiMessageSquare,
      title: 'Discovery',
      description: 'We dive deep into your vision, goals, and challenges to understand exactly what you need.',
      color: 'brand.primary',
      glow: 'cyan'
    },
    {
      number: '02',
      icon: FiPenTool,
      title: 'Design',
      description: 'Our team crafts pixel-perfect designs that capture your brand and captivate your audience.',
      color: 'accent.warm',
      glow: 'warm'
    },
    {
      number: '03',
      icon: FiCode,
      title: 'Development',
      description: 'We build with clean code, modern frameworks, and a focus on performance and scalability.',
      color: 'accent.banana',
      glow: 'banana'
    },
    {
      number: '04',
      icon: FiSend,
      title: 'Launch',
      description: 'Your project goes live with thorough testing, optimization, and a smooth deployment process.',
      color: 'accent.neon',
      glow: 'neon'
    },
    {
      number: '05',
      icon: FiRefreshCw,
      title: 'Iterate',
      description: 'We monitor, optimize, and enhance based on real user data and your evolving needs.',
      color: 'accent.purple',
      glow: 'purple'
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Subtle background gradient */}
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
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="800px"
          height="400px"
          bg="radial-gradient(ellipse at center, var(--chakra-colors-accent-banana) 0%, transparent 40%, var(--chakra-colors-brand-primary) 80%, transparent 100%)"
          filter="blur(100px)"
        />
      </Box>

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
              <HStack
                spacing={2}
                px={4}
                py={2}
                borderRadius="full"
                bg="ui.glass.light"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="ui.border"
              >
                <Box
                  width="6px"
                  height="6px"
                  borderRadius="full"
                  bg="brand.primary"
                  boxShadow="0 0 10px var(--chakra-colors-brand-primary)"
                />
                <Text 
                  color="brand.primary"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold"
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Our Process
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
                color="text.primary"
                lineHeight={{ base: "1.3", md: "1.2" }}
                letterSpacing="tight"
              >
                From Idea to{' '}
                <Box
                  as="span"
                  bgGradient="linear(to-r, accent.banana, accent.neon)"
                  bgClip="text"
                >
                  Impact
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
                maxW="600px"
                mx="auto"
                lineHeight="relaxed"
              >
                Our battle-tested process ensures your project stays on track, 
                on budget, and exceeds expectations.
              </Text>
            </MotionBox>
          </VStack>

          {/* Process Steps */}
          <Box position="relative" width="100%">
            {/* Enhanced Connection Line - Desktop Only */}
            <Box
              display={{ base: 'none', lg: 'block' }}
              position="absolute"
              top="60px"
              left="8%"
              right="8%"
              height="3px"
              borderRadius="full"
              overflow="hidden"
              bg="ui.glass.light"
              zIndex={0}
            >
              <Box
                position="absolute"
                top={0}
                left="-100%"
                width="100%"
                height="100%"
                bgGradient="linear(to-r, transparent, accent.banana, accent.neon, brand.primary, transparent)"
                animation="flow 8s linear infinite"
                sx={{
                  '@keyframes flow': {
                    '0%': { left: '-100%' },
                    '100%': { left: '100%' }
                  }
                }}
              />
            </Box>

            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' }}
              gap={{ base: 8, md: 6 }}
              position="relative"
              zIndex={1}
            >
              {steps.map((step, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <VStack spacing={4} textAlign="center" role="group">
                    {/* Icon Circle */}
                    <Box position="relative">
                      <Box
                        w={{ base: 20, md: 24 }}
                        h={{ base: 20, md: 24 }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg={`${step.color}08`}
                        borderRadius="full"
                        border="2px solid"
                        borderColor={`${step.color}33`}
                        position="relative"
                        overflow="hidden"
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                        _groupHover={{
                          transform: 'scale(1.1) rotate(5deg)',
                          borderColor: step.color,
                          bg: `${step.color}15`,
                          boxShadow: `0 0 40px ${step.color}55`
                        }}
                      >
                        {/* Rotating background effect */}
                        <Box
                          position="absolute"
                          inset={0}
                          borderRadius="full"
                          opacity={0}
                          bgGradient={`conic-gradient(from 0deg, transparent, ${step.color}, transparent)`}
                          _groupHover={{
                            opacity: 0.2,
                            animation: 'spin 3s linear infinite'
                          }}
                          sx={{
                            '@keyframes spin': {
                              '0%': { transform: 'rotate(0deg)' },
                              '100%': { transform: 'rotate(360deg)' }
                            }
                          }}
                        />
                        
                        <Box
                          as={step.icon}
                          w={{ base: 7, md: 8 }}
                          h={{ base: 7, md: 8 }}
                          color={step.color}
                          position="relative"
                          zIndex={1}
                          transition="all 0.3s"
                          _groupHover={{
                            transform: 'scale(1.1)'
                          }}
                        />
                      </Box>
                      
                      {/* Step Number Badge */}
                      <Box
                        position="absolute"
                        top="-2"
                        right="-2"
                        fontSize="xs"
                        fontWeight="extrabold"
                        color={step.color}
                        bg="dark.black"
                        px={2.5}
                        py={1}
                        borderRadius="full"
                        border="2px solid"
                        borderColor={step.color}
                        transition="all 0.3s"
                        _groupHover={{
                          transform: 'scale(1.1)',
                          bg: step.color,
                          color: 'dark.black'
                        }}
                      >
                        {step.number}
                      </Box>
                    </Box>

                    {/* Content */}
                    <Box>
                      <Heading
                        as="h3"
                        fontSize={{ base: "lg", md: "xl" }}
                        color="text.primary"
                        fontWeight="bold"
                        mb={2}
                        transition="all 0.3s"
                        _groupHover={{
                          color: step.color
                        }}
                      >
                        {step.title}
                      </Heading>
                      <Text
                        color="text.secondary"
                        fontSize={{ base: "xs", md: "sm" }}
                        lineHeight="relaxed"
                      >
                        {step.description}
                      </Text>
                    </Box>
                  </VStack>
                </MotionBox>
              ))}
            </Grid>
          </Box>

          {/* Optional Timeline Note */}
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            textAlign="center"
          >
            <Text
              color="text.muted"
              fontSize={{ base: "xs", md: "sm" }}
              fontStyle="italic"
            >
              Most projects complete in 4-8 weeks, depending on scope
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default ProcessSection;