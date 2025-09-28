import { 
  Box, 
  Container,
  Heading, 
  Text, 
  VStack, 
  HStack,
  Image,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMapPin, FiUsers, FiClock } from 'react-icons/fi';

const MotionBox = motion(Box);

const ProductStory = ({ product }) => {
  return (
    <Box width="100%" py={{ base: 8, md: 12 }}>
      <Container maxW="1400px" px={{ base: 4, md: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12} alignItems="center">
            {/* Story Content */}
            <GridItem>
              <VStack spacing={6} align="start">
                <VStack spacing={2} align="start">
                  <Heading
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="white"
                    fontWeight="800"
                    letterSpacing="-0.02em"
                  >
                    The Story Behind{' '}
                    <Box
                      as="span"
                      color={product.color}
                    >
                      This Piece
                    </Box>
                  </Heading>
                  <Text color="gray.400" fontSize="md">
                    Every item in our collection has a story to tell
                  </Text>
                </VStack>

                {/* Main Story */}
                <Text 
                  color="gray.300" 
                  fontSize={{ base: "lg", md: "xl" }} 
                  lineHeight="1.7"
                >
                  {product.story}
                </Text>

                {/* Story Details */}
                <VStack spacing={4} align="stretch" width="100%">
                  <HStack spacing={4} align="start">
                    <Box
                      p={2}
                      borderRadius="lg"
                      bg={`${product.color}15`}
                      color={product.color}
                      flexShrink={0}
                    >
                      <FiMapPin size={18} />
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Text color="white" fontWeight="600" fontSize="md">
                        Crafted in Ridgway, Colorado
                      </Text>
                      <Text color="gray.400" fontSize="sm" lineHeight="1.5">
                        High in the San Juan Mountains, where digital innovation meets mountain tradition.
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack spacing={4} align="start">
                    <Box
                      p={2}
                      borderRadius="lg"
                      bg={`${product.color}15`}
                      color={product.color}
                      flexShrink={0}
                    >
                      <FiUsers size={18} />
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Text color="white" fontWeight="600" fontSize="md">
                        Artisan Collective
                      </Text>
                      <Text color="gray.400" fontSize="sm" lineHeight="1.5">
                        Made by skilled craftspeople who share our vision of thoughtful, enduring design.
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack spacing={4} align="start">
                    <Box
                      p={2}
                      borderRadius="lg"
                      bg={`${product.color}15`}
                      color={product.color}
                      flexShrink={0}
                    >
                      <FiClock size={18} />
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Text color="white" fontWeight="600" fontSize="md">
                        Time & Care
                      </Text>
                      <Text color="gray.400" fontSize="sm" lineHeight="1.5">
                        Each piece takes hours to complete, with attention to every detail.
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>

                {/* Philosophy Quote */}
                <Box
                  p={6}
                  bg={`${product.color}08`}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={`${product.color}20`}
                  borderLeft="4px solid"
                  borderLeftColor={product.color}
                >
                  <Text 
                    color="gray.200" 
                    fontSize="md" 
                    lineHeight="1.7"
                    fontStyle="italic"
                  >
                    "We believe in creating objects that enhance daily life while honoring the craft traditions that came before us. Each piece is designed to be used, loved, and passed down."
                  </Text>
                  <Text 
                    color={product.color} 
                    fontSize="sm" 
                    fontWeight="600"
                    mt={3}
                  >
                    — The Neon Burro Collective
                  </Text>
                </Box>
              </VStack>
            </GridItem>

            {/* Visual Story Element */}
            <GridItem>
              <VStack spacing={6}>
                {/* Main Craft Image */}
                <Box
                  width="100%"
                  aspectRatio={4/3}
                  borderRadius="2xl"
                  overflow="hidden"
                  bg="black"
                  position="relative"
                >
                  {/* Craft process placeholder */}
                  <Box
                    width="100%"
                    height="100%"
                    bg={`linear-gradient(135deg, ${product.color}12 0%, ${product.color}06 50%, transparent 100%)`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                  >
                    <VStack spacing={4}>
                      <Text 
                        fontSize="4xl" 
                        opacity={0.2} 
                        color={product.color}
                        fontWeight="800"
                        textAlign="center"
                      >
                        CRAFT
                      </Text>
                      <Text 
                        fontSize="lg" 
                        opacity={0.6} 
                        color="white"
                        textAlign="center"
                      >
                        Behind the Scenes
                      </Text>
                    </VStack>
                    
                    {/* Subtle pattern overlay */}
                    <Box
                      position="absolute"
                      inset={0}
                      opacity={0.05}
                      backgroundImage={`repeating-linear-gradient(45deg, ${product.color}, ${product.color} 1px, transparent 1px, transparent 20px)`}
                    />
                  </Box>
                </Box>

                {/* Mini Gallery */}
                <Grid templateColumns="repeat(2, 1fr)" gap={4} width="100%">
                  <Box
                    aspectRatio={1}
                    borderRadius="lg"
                    overflow="hidden"
                    bg="black"
                    position="relative"
                  >
                    <Box
                      width="100%"
                      height="100%"
                      bg={`linear-gradient(135deg, ${product.color}08 0%, transparent 100%)`}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="xl" opacity={0.3} color={product.color} fontWeight="800">
                        1
                      </Text>
                    </Box>
                  </Box>
                  <Box
                    aspectRatio={1}
                    borderRadius="lg"
                    overflow="hidden"
                    bg="black"
                    position="relative"
                  >
                    <Box
                      width="100%"
                      height="100%"
                      bg={`linear-gradient(135deg, ${product.color}08 0%, transparent 100%)`}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="xl" opacity={0.3} color={product.color} fontWeight="800">
                        2
                      </Text>
                    </Box>
                  </Box>
                </Grid>

                {/* Sustainability Note */}
                <Box
                  p={4}
                  bg="rgba(255, 255, 255, 0.02)"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  width="100%"
                >
                  <VStack spacing={2} align="start">
                    <Text color={product.color} fontWeight="600" fontSize="sm" textTransform="uppercase">
                      Sustainable Practice
                    </Text>
                    <Text color="gray.300" fontSize="sm" lineHeight="1.6">
                      We source materials responsibly and design for longevity, creating pieces 
                      that reduce waste by lasting generations.
                    </Text>
                  </VStack>
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ProductStory;
