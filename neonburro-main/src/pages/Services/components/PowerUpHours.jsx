// Services/components/PowerUpHours.jsx
import { Box, Container, Heading, Text, VStack, HStack, Grid, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiClock, FiBattery, FiBatteryCharging, FiZap, FiArrowRight } from 'react-icons/fi';

const MotionBox = motion(Box);

const PowerUpHours = () => {
  const hourPackages = [
    {
      id: 'starter',
      icon: FiBattery,
      hours: '4-8',
      title: 'Quick Boost',
      description: 'Perfect for small updates, content changes, or minor features',
      ideal: [
        'Landing page updates',
        'Content refresh',
        'Basic integrations',
        'Performance tweaks'
      ],
      color: 'brand.primary',
      glow: 'cyan',
      price: '$399'
    },
    {
      id: 'power',
      icon: FiBatteryCharging,
      hours: '12-20',
      title: 'Power Pack',
      description: 'Ideal for new features, integrations, or significant improvements',
      ideal: [
        'New page sections',
        'API integrations',
        'E-commerce features',
        'Custom functionality'
      ],
      color: 'accent.banana',
      glow: 'banana',
      price: '$999',
      popular: true
    },
    {
      id: 'turbo',
      icon: FiZap,
      hours: '24-40',
      title: 'Turbo Charge',
      description: 'For major projects, redesigns, or complex development',
      ideal: [
        'Full page redesigns',
        'Complex features',
        'Database work',
        'Complete overhauls'
      ],
      color: 'accent.neon',
      glow: 'neon',
      price: '$1,999'
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Enhanced animated background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.04}
      >
        <Box
          position="absolute"
          top="30%"
          left="10%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="accent.banana"
          filter="blur(150px)"
          opacity={0.3}
        />
        <Box
          position="absolute"
          bottom="30%"
          right="10%"
          width="350px"
          height="350px"
          borderRadius="full"
          bg="brand.primary"
          filter="blur(150px)"
          opacity={0.4}
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
        animation="drift 20s linear infinite"
        sx={{
          '@keyframes drift': {
            '0%': { transform: 'translate(0, 0)' },
            '100%': { transform: 'translate(50px, 50px)' }
          }
        }}
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
              <HStack
                spacing={2}
                px={4}
                py={2}
                borderRadius="full"
                bg="brand.primaryAlpha.10"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="brand.primaryAlpha.20"
              >
                <FiClock size={16} color="var(--chakra-colors-brand-primary)" />
                <Text 
                  color="brand.primary"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold"
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Power Up Your Project
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
                Fuel Your Vision with{' '}
                <Box
                  as="span"
                  bgGradient="linear(to-r, brand.primary, accent.banana)"
                  bgClip="text"
                >
                  Hour Packages
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
                Already have a website? Purchase development hours for updates, enhancements, 
                and ongoing improvements. Simple, transparent, and flexible.
              </Text>
            </MotionBox>
          </VStack>

          {/* Hour Packages */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
          >
            {hourPackages.map((pkg, index) => (
              <MotionBox
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                position="relative"
              >
                {pkg.popular && (
                  <Box
                    position="absolute"
                    top="-12px"
                    left="50%"
                    transform="translateX(-50%)"
                    px={4}
                    py={1}
                    borderRadius="full"
                    bg="accent.banana"
                    color="dark.black"
                    fontSize="xs"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    zIndex={1}
                  >
                    Most Popular
                  </Box>
                )}
                
                <Box
                  p={{ base: 6, md: 8 }}
                  borderRadius="xl"
                  bg="ui.glass.light"
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor={pkg.popular ? 'accent.bananaAlpha.30' : 'ui.border'}
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  cursor="pointer"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    borderColor: pkg.color,
                    bg: 'ui.glass.medium',
                    boxShadow: `0 20px 40px ${pkg.color}22`,
                    '& .hour-icon': {
                      transform: 'rotate(360deg) scale(1.1)',
                      color: pkg.color
                    },
                    '& .hour-arrow': {
                      transform: 'translateX(4px)',
                      color: pkg.color
                    }
                  }}
                >
                  {/* Gradient overlay */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    height="150px"
                    bgGradient={`linear(to-b, ${pkg.color}08, transparent)`}
                    opacity={0.5}
                    pointerEvents="none"
                  />
                  
                  <VStack align="center" spacing={6} textAlign="center" position="relative">
                    {/* Icon with background */}
                    <Box
                      p={4}
                      borderRadius="full"
                      bg={`${pkg.color}11`}
                      position="relative"
                    >
                      <Box
                        className="hour-icon"
                        as={pkg.icon}
                        w={10}
                        h={10}
                        color="text.muted"
                        transition="all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                      />
                    </Box>

                    {/* Hours & Price */}
                    <Box>
                      <Text
                        fontSize={{ base: "3xl", md: "4xl" }}
                        fontWeight="extrabold"
                        color={pkg.color}
                        fontFamily="mono"
                        textShadow={`0 0 30px ${pkg.color}66`}
                        mb={1}
                      >
                        {pkg.hours}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="text.muted"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        fontWeight="semibold"
                      >
                        Development Hours
                      </Text>
                      <Text
                        fontSize={{ base: "xl", md: "2xl" }}
                        color="text.primary"
                        fontWeight="bold"
                        mt={2}
                      >
                        {pkg.price}
                      </Text>
                    </Box>

                    {/* Title & Description */}
                    <Box>
                      <Heading
                        as="h3"
                        fontSize={{ base: "lg", md: "xl" }}
                        color="text.primary"
                        fontWeight="bold"
                        mb={2}
                      >
                        {pkg.title}
                      </Heading>
                      <Text
                        color="text.secondary"
                        fontSize={{ base: "xs", md: "sm" }}
                        lineHeight="relaxed"
                      >
                        {pkg.description}
                      </Text>
                    </Box>

                    {/* Ideal For */}
                    <VStack align="start" spacing={2} width="100%" mt="auto">
                      <Text
                        color={pkg.color}
                        fontSize="xs"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        fontWeight="bold"
                      >
                        Ideal for:
                      </Text>
                      {pkg.ideal.map((item, idx) => (
                        <HStack key={idx} spacing={2} align="start">
                          <Box
                            className="hour-arrow"
                            color="text.muted"
                            transition="all 0.3s"
                            mt={0.5}
                          >
                            <FiArrowRight size={12} />
                          </Box>
                          <Text
                            color="text.secondary"
                            fontSize={{ base: "xs", md: "sm" }}
                            textAlign="left"
                          >
                            {item}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* CTA Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            width="100%"
            maxW="700px"
            mx="auto"
          >
            <Box
              p={{ base: 8, md: 10 }}
              borderRadius="2xl"
              bg="accent.bananaAlpha.10"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="accent.bananaAlpha.30"
              textAlign="center"
              position="relative"
              overflow="hidden"
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{
                borderColor: 'accent.banana',
                boxShadow: '0 20px 40px rgba(255, 229, 0, 0.15)'
              }}
            >
              {/* Gradient overlay */}
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                height="100px"
                bgGradient="linear(to-b, accent.bananaAlpha.20, transparent)"
                pointerEvents="none"
              />
              
              <VStack spacing={6} position="relative">
                <Heading
                  fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                  color="text.primary"
                  fontWeight="bold"
                >
                  Ready to Power Up?
                </Heading>
                <Text
                  color="text.secondary"
                  fontSize={{ base: "sm", md: "md" }}
                  maxW="500px"
                >
                  Purchase hours online and start using them immediately. 
                  No contracts, no commitments, just pure productivity.
                </Text>
                <Button
                  size="lg"
                  px={{ base: 8, md: 10 }}
                  py={{ base: 6, md: 7 }}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="bold"
                  bgGradient="linear(to-r, accent.banana, accent.neon)"
                  color="dark.black"
                  borderRadius="full"
                  rightIcon={<FiArrowRight />}
                  position="relative"
                  overflow="hidden"
                  onClick={() => window.location.href = '/invoice/'}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    bgGradient: 'linear(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    transition: 'left 0.5s'
                  }}
                  _hover={{
                    transform: 'translateY(-2px) scale(1.05)',
                    boxShadow: '0 20px 40px rgba(255, 229, 0, 0.4)',
                    _before: {
                      left: '100%'
                    }
                  }}
                  _active={{
                    transform: 'translateY(0) scale(0.98)'
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  Purchase Hours
                </Button>
              </VStack>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default PowerUpHours;