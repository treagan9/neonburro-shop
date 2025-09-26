import { Box, Container, Heading, Text, VStack, HStack, Button, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiStar, FiMapPin, FiPackage } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

// Neon Burro Color System
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
    space: '#0A0A0A',
    carbon: '#1A1A1A',
    graphite: '#2A2A2A'
  }
};

// Subtle glow animation
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

  const highlights = [
    {
      icon: FiStar,
      text: 'Hand-picked',
      color: colors.neon.amber
    },
    {
      icon: FiMapPin,
      text: 'Rare finds',
      color: colors.neon.lime
    },
    {
      icon: FiPackage,
      text: 'Premium quality',
      color: colors.neon.cyan
    }
  ];

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
      {/* Simple background gradient */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="1200px"
        height="600px"
        bg={`radial-gradient(ellipse at center, ${colors.neon.cyan}08 0%, transparent 50%)`}
        pointerEvents="none"
      />

      {/* Minimal floating elements */}
      {[...Array(4)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          width="2px"
          height="2px"
          bg={i % 2 === 0 ? colors.neon.cyan : colors.neon.amber}
          left={`${15 + i * 25}%`}
          top={`${20 + i * 20}%`}
          opacity={0.4}
          animation={`${float} ${8 + i * 2}s ease-in-out infinite ${i * 1}s`}
          borderRadius="full"
        />
      ))}

      <Container 
        maxW="1400px"
        px={{ base: 6, md: 8 }}
        position="relative"
      >
        <VStack 
          spacing={{ base: 12, md: 14 }} 
          align={{ base: "center", md: "flex-start" }} 
          textAlign={{ base: "center", md: "left" }} 
          maxW="1100px"
        >
          
          {/* Main Content */}
          <VStack spacing={{ base: 4, md: 6 }} maxW="800px">
            {/* Main Heading */}
            <MotionHeading
              as="h1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              fontSize={{ base: "4xl", sm: "5xl", md: "5xl", lg: "6xl", xl: "7xl" }}
              fontFamily="'Inter', system-ui, sans-serif"
              fontWeight="800"
              color="white"
              lineHeight={{ base: "1.2", md: "1.15" }}
              letterSpacing={{ base: "-0.025em", md: "-0.03em" }}
              position="relative"
              py={4}
            >
              <Box
                as="span"
                position="relative"
                display="inline-block"
                background={`linear-gradient(135deg, ${colors.neon.cyan} 0%, ${colors.neon.amber} 50%, ${colors.neon.lime} 100%)`}
                backgroundClip="text"
                sx={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
                backgroundSize="400% 400%"
                animation={`${neonGlow} 4s ease-in-out infinite`}
                filter="saturate(1.4)"
              >
                Digital Culture.
              </Box>
              <br />
              <Box
                as="span"
                color="white"
                position="relative"
                mt={2}
                _after={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '3px',
                  bg: colors.neon.violet,
                  borderRadius: 'full',
                  boxShadow: `0 0 20px ${colors.neon.violet}`,
                }}
              >
                Mountain Made.
              </Box>
            </MotionHeading>

            {/* Description */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              maxW="600px"
            >
              <Text
                fontSize={{ base: "lg", md: "xl", lg: "xl" }}
                color="gray.200"
                lineHeight="1.7"
              >
                Hand-picked drops. Rare finds. Crafted for creators who understand 
                that the best ideas emerge where digital culture meets mountain mindset.
              </Text>
            </MotionBox>
          </VStack>

          {/* Features */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            width="100%"
            maxW={{ base: "100%", md: "700px" }}
          >
            <HStack
              spacing={{ base: 2, md: 12 }}
              justify="center"
              flexWrap={{ base: "wrap", md: "nowrap" }}
              gap={{ base: 2, md: 0 }}
            >
              {highlights.map((highlight, index) => (
                <Box
                  key={index}
                  flex={{ base: "1 1 calc(33.333% - 8px)", md: "0 0 auto" }}
                  minW={{ base: "80px", md: "140px" }}
                >
                  <VStack
                    p={{ base: 3, md: 4 }}
                    borderRadius={{ base: "xl", md: "lg" }}
                    bg={{ base: "rgba(255, 255, 255, 0.03)", md: "transparent" }}
                    backdropFilter={{ base: "blur(20px)", md: "none" }}
                    border={{ base: "1px solid", md: "none" }}
                    borderColor={{ base: "rgba(255, 255, 255, 0.08)", md: "transparent" }}
                    transition="all 0.3s ease"
                    cursor="pointer"
                    spacing={{ base: 1, md: 2 }}
                    position="relative"
                    overflow="hidden"
                    role="group"
                    align="center"
                    opacity={0.8}
                    _hover={{
                      bg: { base: 'rgba(255, 255, 255, 0.05)', md: 'rgba(255, 255, 255, 0.02)' },
                      borderColor: { base: highlight.color, md: 'transparent' },
                      transform: { base: 'translateY(-4px)', md: 'translateY(-4px)' },
                      boxShadow: { base: `0 10px 30px ${highlight.color}22`, md: 'none' },
                      opacity: 1
                    }}
                  >
                    {/* Mobile glow */}
                    <Box
                      display={{ base: "block", md: "none" }}
                      position="absolute"
                      inset={0}
                      bg={`radial-gradient(circle at center, ${highlight.color}11 0%, transparent 70%)`}
                      opacity={0}
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.3s"
                    />
                    
                    {/* Mobile design */}
                    <HStack
                      spacing={1.5}
                      color="gray.400"
                      display={{ base: "flex", md: "none" }}
                      fontSize="xs"
                      transition="all 0.2s"
                      _groupHover={{
                        color: highlight.color
                      }}
                    >
                      <Box as={highlight.icon} size={14} />
                      <Text fontWeight="500">{highlight.text.split(' ')[0]}</Text>
                    </HStack>

                    {/* Desktop - icon above text */}
                    <VStack 
                      spacing={2} 
                      align="center"
                      display={{ base: "none", md: "flex" }}
                    >
                      <Box
                        p={2}
                        borderRadius="lg"
                        bg={`${highlight.color}08`}
                        border="1px solid"
                        borderColor={`${highlight.color}20`}
                        color={highlight.color}
                        transition="all 0.3s"
                        _groupHover={{ 
                          bg: `${highlight.color}15`,
                          borderColor: `${highlight.color}40`,
                          transform: 'scale(1.1)'
                        }}
                      >
                        <highlight.icon size={20} />
                      </Box>
                      
                      <Text
                        color="gray.400"
                        fontSize="sm"
                        fontWeight="500"
                        textAlign="center"
                        transition="all 0.3s"
                        _groupHover={{
                          color: "gray.300"
                        }}
                      >
                        {highlight.text}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              ))}
            </HStack>
          </MotionBox>

          {/* CTA Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            width={{ base: "75%", sm: "auto" }}
          >
            <VStack spacing={4}>
              <Button
                size={{ base: "md", md: "lg" }}
                height={{ base: "48px", md: "56px" }}
                px={{ base: 8, md: 10 }}
                bg="white"
                color={colors.dark.void}
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="bold"
                borderRadius="full"
                onClick={scrollToProducts}
                rightIcon={<FiArrowDown />}
                width={{ base: "100%", sm: "auto" }}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 35px rgba(255, 255, 255, 0.2)',
                }}
                _active={{
                  transform: 'translateY(0)',
                }}
                transition="all 0.2s"
              >
                Shop Collection
              </Button>

              <Text
                fontSize={{ base: "xs", md: "sm" }}
                color="gray.500"
              >
                Curated monthly • Hand-picked pieces • Rare culture finds
              </Text>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default ShopHero;