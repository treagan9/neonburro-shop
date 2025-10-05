import { 
  Box, 
  Container,
  Heading, 
  Text, 
  VStack,
  HStack,
  Grid,
  SimpleGrid
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const ProductStory = ({ product }) => {
  return (
    <Box width="100%" py={{ base: 12, md: 16 }} bg="#0A0A0A">
      <Container maxW="1200px" px={{ base: 4, md: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <VStack spacing={{ base: 8, md: 12 }} align="stretch">
            {/* Story Section */}
            <Box
              p={{ base: 8, md: 12 }}
              bg={`radial-gradient(circle at top left, ${product.color}08 0%, transparent 60%)`}
              borderRadius="2xl"
              border="1px solid"
              borderColor={`${product.color}15`}
              position="relative"
              overflow="hidden"
            >
              {/* Background letter decoration */}
              <Box
                position="absolute"
                top="-20px"
                right="-20px"
                fontSize="20rem"
                opacity={0.03}
                color={product.color}
                fontWeight="900"
                lineHeight="1"
                pointerEvents="none"
                fontFamily="mono"
              >
                {product.name.charAt(0)}
              </Box>
              
              <VStack spacing={6} align="start" position="relative" zIndex={1}>
                <Text
                  color={product.color}
                  fontSize="sm"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  The Story
                </Text>
                <Text 
                  color="gray.200" 
                  fontSize={{ base: "lg", md: "xl" }} 
                  lineHeight="1.8"
                >
                  {product.story}
                </Text>
              </VStack>
            </Box>

            {/* Materials & Care Grid */}
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
              {/* Materials */}
              {product.materials && (
                <Box
                  p={6}
                  bg="rgba(255, 255, 255, 0.02)"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  transition="all 0.3s"
                  _hover={{
                    bg: `${product.color}05`,
                    borderColor: `${product.color}20`
                  }}
                >
                  <VStack spacing={4} align="start">
                    <Text 
                      color={product.color} 
                      fontWeight="700" 
                      fontSize="sm" 
                      textTransform="uppercase" 
                      letterSpacing="wider"
                    >
                      Materials
                    </Text>
                    <VStack spacing={2} align="start">
                      {product.materials.map((material, index) => (
                        <HStack key={index} spacing={2}>
                          <Box
                            width="4px"
                            height="4px"
                            bg={product.color}
                            borderRadius="full"
                          />
                          <Text color="gray.300" fontSize="sm">
                            {material}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                </Box>
              )}

              {/* Care */}
              {product.care && (
                <Box
                  p={6}
                  bg="rgba(255, 255, 255, 0.02)"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  transition="all 0.3s"
                  _hover={{
                    bg: `${product.color}05`,
                    borderColor: `${product.color}20`
                  }}
                >
                  <VStack spacing={4} align="start">
                    <Text 
                      color={product.color} 
                      fontWeight="700" 
                      fontSize="sm" 
                      textTransform="uppercase" 
                      letterSpacing="wider"
                    >
                      Care Instructions
                    </Text>
                    <Text color="gray.300" fontSize="sm" lineHeight="1.7">
                      {product.care}
                    </Text>
                  </VStack>
                </Box>
              )}

              {/* Dimensions (if exists) */}
              {product.dimensions && (
                <Box
                  p={6}
                  bg="rgba(255, 255, 255, 0.02)"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  transition="all 0.3s"
                  _hover={{
                    bg: `${product.color}05`,
                    borderColor: `${product.color}20`
                  }}
                >
                  <VStack spacing={4} align="start">
                    <Text 
                      color={product.color} 
                      fontWeight="700" 
                      fontSize="sm" 
                      textTransform="uppercase" 
                      letterSpacing="wider"
                    >
                      Dimensions
                    </Text>
                    <Text color="gray.300" fontSize="sm" lineHeight="1.7">
                      {product.dimensions}
                    </Text>
                  </VStack>
                </Box>
              )}
            </Grid>

            {/* Philosophy Footer - Simple and understated */}
            <Box
              p={{ base: 6, md: 8 }}
              bg="rgba(0, 0, 0, 0.3)"
              borderRadius="xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
              textAlign="center"
            >
              <Text 
                color="gray.400" 
                fontSize={{ base: "sm", md: "md" }} 
                lineHeight="1.8"
                fontStyle="italic"
              >
                Built to last. Made to matter. Crafted in Ridgway, Colorado.
              </Text>
            </Box>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ProductStory;
