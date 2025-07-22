import { Box, Container, Heading, Text, VStack, HStack, Grid, GridItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiZap, FiCode, FiTarget, FiCpu, FiLayers, FiGlobe } from 'react-icons/fi';
import { useState } from 'react';

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);

// Theme colors
const colors = {
  brand: {
    primary: '#00E5E5',
  },
  accent: {
    neon: '#39FF14',
    warm: '#FF6B00',
    purple: '#8B5CF6',
    banana: '#FFE500',
  },
  dark: {
    black: '#0A0A0A',
  }
};

const Features = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: FiZap,
      title: "Lightning Fast",
      description: "Sub-second load times with cutting-edge optimization",
      color: colors.brand.primary,
      stat: "< 0.8s"
    },
    {
      icon: FiCode,
      title: "Clean Code",
      description: "Maintainable, scalable architecture built to last",
      color: colors.accent.warm,
      stat: "100/100"
    },
    {
      icon: FiTarget,
      title: "Conversion Focused",
      description: "Every pixel designed to drive real business results",
      color: colors.accent.banana,
      stat: "+47%"
    },
    {
      icon: FiCpu,
      title: "AI Enhanced",
      description: "Smart integrations that adapt to your users",
      color: colors.accent.neon,
      stat: "GPT-4"
    },
    {
      icon: FiLayers,
      title: "Modular Design",
      description: "Flexible systems that grow with your business",
      color: colors.accent.purple,
      stat: "∞"
    },
    {
      icon: FiGlobe,
      title: "SEO Optimized",
      description: "Built for visibility and organic growth",
      color: colors.brand.primary,
      stat: "Top 3"
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 24 }} 
      bg={colors.dark.black}
      overflow="hidden"
    >
      {/* Single static background gradient - no animations */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="120%"
        height="120%"
        bg={`radial-gradient(ellipse at center, ${colors.brand.primary}08 0%, ${colors.accent.banana}05 40%, transparent 70%)`}
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 12, lg: 20 }} alignItems="center">
          
          {/* Left side - Content */}
          <GridItem>
            <VStack align="flex-start" spacing={{ base: 6, md: 8 }}>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <HStack spacing={2}>
                  <Box width="40px" height="2px" bg={colors.accent.neon} />
                  <Text 
                    color={colors.accent.neon}
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="semibold" 
                    letterSpacing="wider"
                    textTransform="uppercase"
                  >
                    The Neon Difference
                  </Text>
                  <Box width="40px" height="2px" bg={colors.accent.neon} />
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
                  Performance Meets
                  <Box 
                    as="span" 
                    display="block"
                    bgGradient={`linear(to-r, ${colors.accent.warm}, #FF8C00, ${colors.accent.banana})`}
                    bgClip="text"
                    mt={1}
                  >
                    Artistry
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
                  maxW="500px"
                >
                  We don't just build websites. We craft digital experiences that load in milliseconds, 
                  convert visitors into customers, and scale with your ambitions.
                </Text>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                mt={{ base: 2, md: 4 }}
                width="100%"
              >
                <Box
                  px={{ base: 6, md: 8 }}
                  py={{ base: 4, md: 5 }}
                  borderRadius="2xl"
                  bg={`${colors.accent.neon}08`}
                  border="2px solid"
                  borderColor={`${colors.accent.neon}22`}
                  position="relative"
                  transition="all 0.3s"
                  _hover={{
                    borderColor: colors.accent.neon,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 20px 40px ${colors.accent.neon}22`
                  }}
                >
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    color="white"
                    fontWeight="bold"
                    fontStyle="italic"
                    textAlign="center"
                    letterSpacing="wide"
                    textTransform="uppercase"
                  >
                    No templates • No compromises • No limits
                  </Text>
                </Box>
              </MotionBox>
            </VStack>
          </GridItem>

          {/* Right side - Feature Grid */}
          <GridItem>
            <MotionGrid 
              templateColumns="repeat(2, 1fr)" 
              gap={{ base: 4, md: 5 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Box
                    p={{ base: 4, md: 5 }}
                    borderRadius="xl"
                    bg="rgba(255, 255, 255, 0.02)"
                    backdropFilter="blur(10px)"
                    border="2px solid"
                    borderColor={hoveredCard === index ? feature.color : "rgba(255, 255, 255, 0.08)"}
                    position="relative"
                    overflow="hidden"
                    cursor="pointer"
                    height="100%"
                    transition="all 0.2s"
                    _hover={{
                      transform: 'translateY(-4px)',
                      boxShadow: `0 20px 40px ${feature.color}22`,
                    }}
                  >
                    {/* Stat badge - simplified */}
                    <Box
                      position="absolute"
                      top={2}
                      right={2}
                      px={2}
                      py={0.5}
                      borderRadius="full"
                      bg={`${feature.color}22`}
                      border="1px solid"
                      borderColor={`${feature.color}44`}
                    >
                      <Text
                        fontSize="2xs"
                        fontFamily="mono"
                        fontWeight="bold"
                        color={feature.color}
                      >
                        {feature.stat}
                      </Text>
                    </Box>

                    <VStack align="start" spacing={3} position="relative">
                      <Box
                        p={2.5}
                        borderRadius="lg"
                        bg={`${feature.color}11`}
                      >
                        <Box
                          as={feature.icon}
                          w={5}
                          h={5}
                          color={hoveredCard === index ? feature.color : "gray.400"}
                          transition="color 0.2s"
                        />
                      </Box>
                      
                      <VStack align="start" spacing={1}>
                        <Text
                          fontSize={{ base: "md", md: "lg" }}
                          fontWeight="bold"
                          color="white"
                          letterSpacing="tight"
                          lineHeight="tight"
                        >
                          {feature.title}
                        </Text>
                        <Text
                          fontSize={{ base: "xs", md: "sm" }}
                          color="gray.300"
                          lineHeight="relaxed"
                        >
                          {feature.description}
                        </Text>
                      </VStack>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </MotionGrid>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;