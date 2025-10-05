import { 
  Box, 
  Container,
  Heading, 
  Text, 
  VStack, 
  HStack,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiStar, FiLayers, FiZap } from 'react-icons/fi';

const MotionBox = motion(Box);

const ProductStory = ({ product }) => {
  return (
    <Box width="100%" py={{ base: 12, md: 16 }}>
      <Container maxW="1200px" px={{ base: 4, md: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <VStack spacing={{ base: 8, md: 12 }} align="stretch">
            {/* Header */}
            <VStack spacing={3} align="start" maxW="800px">
              <Heading
                fontSize={{ base: "2xl", md: "4xl" }}
                color="white"
                fontWeight="800"
                letterSpacing="-0.02em"
              >
                The Story
              </Heading>
              <Text color="gray.400" fontSize={{ base: "md", md: "lg" }}>
                Where this piece came from
              </Text>
            </VStack>

            {/* Main Story */}
            <Box
              p={{ base: 6, md: 10 }}
              bg={`linear-gradient(135deg, ${product.color}05 0%, transparent 100%)`}
              borderRadius="2xl"
              border="2px solid"
              borderColor={`${product.color}20`}
              position="relative"
              overflow="hidden"
            >
              <Box
                position="absolute"
                top={0}
                right={0}
                fontSize="15rem"
                opacity={0.03}
                color={product.color}
                fontWeight="900"
                lineHeight="1"
                pointerEvents="none"
              >
                "
              </Box>
              
              <Text 
                color="gray.200" 
                fontSize={{ base: "lg", md: "2xl" }} 
                lineHeight="1.8"
                position="relative"
                zIndex={1}
              >
                {product.story}
              </Text>
            </Box>

            {/* Three Pillars */}
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
              <Box
                p={6}
                bg="rgba(255, 255, 255, 0.02)"
                borderRadius="xl"
                border="1px solid"
                borderColor="whiteAlpha.100"
                transition="all 0.3s"
                _hover={{
                  bg: `${product.color}05`,
                  borderColor: `${product.color}30`,
                  transform: 'translateY(-4px)'
                }}
              >
                <VStack spacing={4} align="start">
                  <Box
                    p={3}
                    borderRadius="lg"
                    bg={`${product.color}15`}
                    color={product.color}
                  >
                    <FiStar size={24} />
                  </Box>
                  <VStack align="start" spacing={2}>
                    <Text color="white" fontWeight="700" fontSize="lg">
                      Intention
                    </Text>
                    <Text color="gray.400" fontSize="sm" lineHeight="1.7">
                      Every detail serves a purpose. Nothing here is arbitrary or rushed.
                    </Text>
                  </VStack>
                </VStack>
              </Box>

              <Box
                p={6}
                bg="rgba(255, 255, 255, 0.02)"
                borderRadius="xl"
                border="1px solid"
                borderColor="whiteAlpha.100"
                transition="all 0.3s"
                _hover={{
                  bg: `${product.color}05`,
                  borderColor: `${product.color}30`,
                  transform: 'translateY(-4px)'
                }}
              >
                <VStack spacing={4} align="start">
                  <Box
                    p={3}
                    borderRadius="lg"
                    bg={`${product.color}15`}
                    color={product.color}
                  >
                    <FiLayers size={24} />
                  </Box>
                  <VStack align="start" spacing={2}>
                    <Text color="white" fontWeight="700" fontSize="lg">
                      Craft
                    </Text>
                    <Text color="gray.400" fontSize="sm" lineHeight="1.7">
                      Made with care by people who understand materials and time.
                    </Text>
                  </VStack>
                </VStack>
              </Box>

              <Box
                p={6}
                bg="rgba(255, 255, 255, 0.02)"
                borderRadius="xl"
                border="1px solid"
                borderColor="whiteAlpha.100"
                transition="all 0.3s"
                _hover={{
                  bg: `${product.color}05`,
                  borderColor: `${product.color}30`,
                  transform: 'translateY(-4px)'
                }}
              >
                <VStack spacing={4} align="start">
                  <Box
                    p={3}
                    borderRadius="lg"
                    bg={`${product.color}15`}
                    color={product.color}
                  >
                    <FiZap size={24} />
                  </Box>
                  <VStack align="start" spacing={2}>
                    <Text color="white" fontWeight="700" fontSize="lg">
                      Energy
                    </Text>
                    <Text color="gray.400" fontSize="sm" lineHeight="1.7">
                      Objects carry the energy they're made with. This one was made right.
                    </Text>
                  </VStack>
                </VStack>
              </Box>
            </Grid>

            {/* Philosophy */}
            <Box
              p={{ base: 8, md: 10 }}
              bg="rgba(0, 0, 0, 0.4)"
              borderRadius="2xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
              backdropFilter="blur(20px)"
            >
              <VStack spacing={6} align="start">
                <Text 
                  color={product.color} 
                  fontSize="sm" 
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Our Philosophy
                </Text>
                <Text 
                  color="gray.200" 
                  fontSize={{ base: "lg", md: "xl" }} 
                  lineHeight="1.8"
                  fontStyle="italic"
                >
                  We create objects that enhance daily life while honoring tradition. Each piece is designed to be used, loved, and eventually passed down. Quality over quantity. Intention over impulse. Longevity over trends.
                </Text>
                <HStack spacing={3} pt={2}>
                  <Box
                    width="60px"
                    height="2px"
                    bg={product.color}
                  />
                  <Text 
                    color={product.color} 
                    fontSize="sm" 
                    fontWeight="600"
                  >
                    The Neon Burro Collective
                  </Text>
                </HStack>
              </VStack>
            </Box>

            {/* Sustainability & Location */}
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
              <Box
                p={6}
                bg={`${product.color}08`}
                borderRadius="xl"
                border="1px solid"
                borderColor={`${product.color}20`}
              >
                <VStack spacing={3} align="start">
                  <Text color={product.color} fontWeight="700" fontSize="sm" textTransform="uppercase" letterSpacing="wider">
                    Built to Last
                  </Text>
                  <Text color="gray.300" fontSize="md" lineHeight="1.7">
                    We design for longevity, creating pieces that reduce waste by lasting generations. Every material is chosen for durability and meaning.
                  </Text>
                </VStack>
              </Box>

              <Box
                p={6}
                bg={`${product.color}08`}
                borderRadius="xl"
                border="1px solid"
                borderColor={`${product.color}20`}
              >
                <VStack spacing={3} align="start">
                  <Text color={product.color} fontWeight="700" fontSize="sm" textTransform="uppercase" letterSpacing="wider">
                    From the Mountains
                  </Text>
                  <Text color="gray.300" fontSize="md" lineHeight="1.7">
                    Crafted in Ridgway, Colorado, where digital innovation meets mountain tradition and the air is clear enough to think.
                  </Text>
                </VStack>
              </Box>
            </Grid>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ProductStory;
