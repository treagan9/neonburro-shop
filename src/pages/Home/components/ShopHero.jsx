import { Box, Container, Heading, Text, VStack, HStack, Button, keyframes } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiArrowDown } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const colors = {
  neon: {
    cyan: '#00E5E5',
    lime: '#39FF14', 
    amber: '#FFE500',
    violet: '#8B5CF6',
    coral: '#FF6B35'
  },
  dark: {
    void: '#000000',
    space: '#0A0A0A'
  }
};

const neonGlow = keyframes`
  0%, 100% { 
    filter: brightness(1);
    text-shadow: 0 0 10px currentColor;
  }
  50% { 
    filter: brightness(1.2);
    text-shadow: 0 0 20px currentColor;
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
`;

const ShopHero = ({ onScrollToProducts }) => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  
  const taglines = [
    'Merino Wool',
    'Titanium Craft',
    'Digital Mysteries',
    'Limited Pieces'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      position="relative"
      minH={{ base: "100dvh", md: "100vh" }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg={colors.dark.void}
      pt={{ base: 24, md: 32 }}
      pb={{ base: 8, md: 12 }}
    >
      {/* Ambient glow - primary */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="1200px"
        height="600px"
        bg={`radial-gradient(ellipse at center, ${colors.neon.violet}08 0%, transparent 50%)`}
        pointerEvents="none"
      />

      {/* Secondary glow - adds depth */}
      <Box
        position="absolute"
        top="30%"
        right="10%"
        width="400px"
        height="400px"
        bg={`radial-gradient(circle, ${colors.neon.coral}06 0%, transparent 60%)`}
        pointerEvents="none"
        animation={`${pulse} 6s ease-in-out infinite`}
      />

      {/* Subtle grid overlay */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.015}
        backgroundImage={`
          linear-gradient(${colors.neon.violet}40 1px, transparent 1px),
          linear-gradient(90deg, ${colors.neon.violet}40 1px, transparent 1px)
        `}
        backgroundSize="60px 60px"
        pointerEvents="none"
      />

      {/* Floating dots */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          width={i % 2 === 0 ? "3px" : "2px"}
          height={i % 2 === 0 ? "3px" : "2px"}
          bg={[colors.neon.violet, colors.neon.coral, colors.neon.amber][i % 3]}
          left={`${10 + i * 15}%`}
          top={`${15 + (i * 12) % 60}%`}
          opacity={0.5}
          animation={`${float} ${7 + i * 1.5}s ease-in-out infinite ${i * 0.8}s`}
          borderRadius="full"
          boxShadow={`0 0 10px ${[colors.neon.violet, colors.neon.coral, colors.neon.amber][i % 3]}50`}
        />
      ))}

      <Container 
        maxW="1200px"
        px={{ base: 6, md: 8 }}
        position="relative"
      >
        <VStack 
          spacing={{ base: 6, md: 8 }} 
          align="center" 
          textAlign="center"
          mx="auto"
        >
          {/* Drop badge */}
          <MotionBox
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HStack
              spacing={2}
              px={4}
              py={2}
              borderRadius="full"
              bg="whiteAlpha.50"
              border="1px solid"
              borderColor="whiteAlpha.100"
              backdropFilter="blur(10px)"
            >
              <Box
                width="6px"
                height="6px"
                borderRadius="full"
                bg={colors.neon.lime}
                boxShadow={`0 0 10px ${colors.neon.lime}`}
              />
              <Text
                fontSize="xs"
                fontWeight="700"
                color="gray.300"
                letterSpacing="wider"
                textTransform="uppercase"
              >
                New Collection Live
              </Text>
            </HStack>
          </MotionBox>

          {/* Heading */}
          <MotionHeading
            as="h1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            fontSize={{ base: "5xl", sm: "6xl", md: "7xl", lg: "8xl" }}
            fontWeight="800"
            color="white"
            lineHeight="1.1"
            letterSpacing="-0.03em"
            position="relative"
            py={4}
          >
            <Box
              as="span"
              position="relative"
              display="inline-block"
              background={`linear-gradient(135deg, ${colors.neon.violet} 0%, ${colors.neon.coral} 50%, ${colors.neon.amber} 100%)`}
              backgroundClip="text"
              sx={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
              backgroundSize="400% 400%"
              animation={`${neonGlow} 4s ease-in-out infinite`}
              filter="saturate(1.4)"
            >
              The Neon Drop
            </Box>
          </MotionHeading>

          {/* Subhead */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            maxW="700px"
          >
            <Text
              fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
              color="gray.200"
              lineHeight="1.5"
              fontWeight="500"
            >
              Built to last. Made to matter.
            </Text>
          </MotionBox>

          {/* Rotating tagline */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            height="24px"
            overflow="hidden"
          >
            <AnimatePresence mode="wait">
              <MotionText
                key={taglineIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                fontSize="sm"
                fontWeight="600"
                color={colors.neon.violet}
                letterSpacing="widest"
                textTransform="uppercase"
              >
                {taglines[taglineIndex]}
              </MotionText>
            </AnimatePresence>
          </MotionBox>

          {/* CTA */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            pt={4}
          >
            <Button
              size="lg"
              height="56px"
              px={10}
              bg="white"
              color={colors.dark.void}
              fontSize="md"
              fontWeight="bold"
              borderRadius="full"
              onClick={onScrollToProducts}
              rightIcon={<FiArrowDown />}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 15px 35px rgba(255, 255, 255, 0.2)',
              }}
              _active={{
                transform: 'translateY(0)',
              }}
              transition="all 0.2s"
            >
              Explore the Drop
            </Button>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default ShopHero;