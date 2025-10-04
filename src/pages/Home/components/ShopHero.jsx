import { Box, Container, Heading, Text, VStack, Button, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

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

const ShopHero = () => {
  const scrollToProducts = () => {
    window.scrollTo({ 
      top: window.innerHeight * 0.8, 
      behavior: 'smooth' 
    });
  };

  return (
    <Box
      position="relative"
      minH={{ base: "100dvh", md: "100vh" }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg={colors.dark.void}
      pt={{ base: 24, md: 32 }}
      pb={{ base: 16, md: 20 }}
    >
      {/* Ambient glow */}
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

      {/* Floating dots */}
      {[...Array(4)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          width="2px"
          height="2px"
          bg={i % 2 === 0 ? colors.neon.violet : colors.neon.coral}
          left={`${15 + i * 25}%`}
          top={`${20 + i * 20}%`}
          opacity={0.4}
          animation={`${float} ${8 + i * 2}s ease-in-out infinite ${i * 1}s`}
          borderRadius="full"
        />
      ))}

      <Container 
        maxW="1200px"
        px={{ base: 6, md: 8 }}
        position="relative"
      >
        <VStack 
          spacing={{ base: 8, md: 10 }} 
          align="center" 
          textAlign="center"
          mx="auto"
        >
          {/* Heading */}
          <MotionHeading
            as="h1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
            transition={{ duration: 0.6, delay: 0.15 }}
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

          {/* CTA */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
              onClick={scrollToProducts}
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
