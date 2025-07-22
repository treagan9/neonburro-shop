import { Box, Container, Heading, Text, VStack, Image, Button, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const ShopHero = () => {
  const scrollToProducts = () => {
    window.scrollTo({ 
      top: window.innerHeight * 0.9, 
      behavior: 'smooth' 
    });
  };

  return (
    <Box
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      bg="dark.black"
      pt="70px" // Account for fixed nav
    >
      {/* Sharp geometric background */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.03}
      >
        <Box
          position="absolute"
          top="-50%"
          right="-20%"
          width="800px"
          height="800px"
          transform="rotate(45deg)"
          border="2px solid"
          borderColor="#00D9FF"
        />
        <Box
          position="absolute"
          bottom="-50%"
          left="-20%"
          width="600px"
          height="600px"
          transform="rotate(45deg)"
          border="2px solid"
          borderColor="#39FF14"
        />
      </Box>

      <Container maxW="900px" position="relative">
        <VStack spacing={8} align="center" textAlign="center">
          {/* Hero Image */}
          <MotionImage
            src="/shopping-burro-head.png"
            alt="Neon Burro Shop"
            maxW={{ base: "200px", md: "300px" }}
            height="auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            mb={4}
          />

          {/* Main Content */}
          <VStack spacing={6} maxW="700px">
            {/* Heading */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Heading
                fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                fontWeight="900"
                color="white"
                lineHeight="0.9"
                letterSpacing="-0.03em"
              >
                DIGITAL
                <Box as="span" display="block" mt={2}>
                  <Box
                    as="span"
                    bgGradient="linear(to-r, #00D9FF, #39FF14)"
                    bgClip="text"
                  >
                    CULTURE
                  </Box>
                </Box>
              </Heading>
            </MotionBox>

            {/* Subtitle */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.300"
                fontWeight="300"
                letterSpacing="0.02em"
              >
                Premium merch for the modern mountain dweller
              </Text>
            </MotionBox>

            {/* Stats/Features */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              width="100%"
            >
              <HStack
                spacing={{ base: 8, md: 16 }}
                justify="center"
                py={6}
                flexWrap="wrap"
              >
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="800" color="#00D9FF">
                    100%
                  </Text>
                  <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wider">
                    Sustainable
                  </Text>
                </VStack>
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="800" color="#39FF14">
                    10
                  </Text>
                  <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wider">
                    Limited Items
                  </Text>
                </VStack>
                <VStack spacing={1}>
                  <Text fontSize="2xl" fontWeight="800" color="#FF6B35">
                    CO
                  </Text>
                  <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wider">
                    Made Local
                  </Text>
                </VStack>
              </HStack>
            </MotionBox>

            {/* CTA */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button
                size="lg"
                height="56px"
                px={10}
                bg="white"
                color="black"
                fontWeight="800"
                fontSize="sm"
                letterSpacing="0.05em"
                textTransform="uppercase"
                borderRadius="none"
                rightIcon={<FiArrowDown />}
                onClick={scrollToProducts}
                position="relative"
                overflow="hidden"
                _hover={{
                  bg: 'white',
                  transform: 'translateY(-2px)',
                  '&::after': {
                    transform: 'translateX(0)'
                  }
                }}
                _active={{
                  transform: 'translateY(0)'
                }}
                transition="all 0.2s"
                _after={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bg: '#00D9FF',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.3s',
                  zIndex: -1
                }}
              >
                Shop Collection
              </Button>
            </MotionBox>
          </VStack>
        </VStack>
      </Container>

      {/* Bottom gradient line */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        height="1px"
        bgGradient="linear(to-r, transparent, #00D9FF, #39FF14, transparent)"
      />
    </Box>
  );
};

export default ShopHero;
