import { 
  Box, 
  Container,
  Heading, 
  Text, 
  VStack, 
  HStack,
  Grid,
  GridItem,
  Button,
  Badge
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const MotionBox = motion(Box);

const RelatedProducts = ({ currentProduct, allProducts }) => {
  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Filter out current product and get related items
  const relatedProducts = Object.values(allProducts)
    .filter(product => product.id !== currentProduct.id)
    .slice(0, 3); // Show max 3 related products

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAll = () => {
    navigate('/');
  };

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <Box width="100%" py={{ base: 8, md: 12 }}>
      <Container maxW="1400px" px={{ base: 4, md: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <VStack spacing={8}>
            {/* Section Header */}
            <VStack spacing={4} textAlign="center">
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                color="white"
                fontWeight="800"
                letterSpacing="-0.02em"
              >
                You Might Also Like
              </Heading>
              <Text color="gray.400" fontSize="md" maxW="500px">
                Other pieces from our collection that share the same spirit of craft and innovation
              </Text>
            </VStack>

            {/* Related Products Grid */}
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
              gap={{ base: 6, md: 8 }}
              width="100%"
            >
              {relatedProducts.map((product, index) => (
                <MotionBox
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <Box
                    cursor="pointer"
                    position="relative"
                    bg="rgba(255, 255, 255, 0.02)"
                    borderRadius="xl"
                    overflow="hidden"
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    onClick={() => handleProductClick(product.id)}
                    _hover={{
                      transform: 'translateY(-8px)',
                      bg: 'rgba(255, 255, 255, 0.04)',
                      boxShadow: `0 20px 40px ${product.color}22`
                    }}
                  >
                    {/* Category Badge */}
                    <Box position="absolute" top={4} right={4} zIndex={2}>
                      <Badge
                        bg={`${product.color}15`}
                        color={product.color}
                        px={2}
                        py={1}
                        borderRadius="md"
                        fontSize="2xs"
                        fontWeight="600"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        border="1px solid"
                        borderColor={`${product.color}30`}
                      >
                        {product.category}
                      </Badge>
                    </Box>

                    {/* Special Badges */}
                    {(product.featured || product.limited || product.special) && (
                      <Box position="absolute" top={4} left={4} zIndex={2}>
                        {product.featured && (
                          <Badge
                            bg="#FFE500"
                            color="#0A0A0A"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="bold"
                            textTransform="uppercase"
                            letterSpacing="wider"
                          >
                            Featured
                          </Badge>
                        )}
                        {product.limited && (
                          <Badge
                            bg="#FF6B35"
                            color="white"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="bold"
                            textTransform="uppercase"
                            letterSpacing="wider"
                          >
                            Limited
                          </Badge>
                        )}
                        {product.special && (
                          <Badge
                            bg="#FF00FF"
                            color="white"
                            px={3}
                            py={1}
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="bold"
                            textTransform="uppercase"
                            letterSpacing="wider"
                          >
                            Special
                          </Badge>
                        )}
                      </Box>
                    )}

                    {/* Product Image */}
                    <Box
                      height="250px"
                      bg="black"
                      position="relative"
                      overflow="hidden"
                    >
                      <Box
                        width="100%"
                        height="100%"
                        bg={`linear-gradient(135deg, ${product.color}08 0%, ${product.color}03 50%, transparent 100%)`}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                        transition="all 0.3s"
                        transform={hoveredProduct === product.id ? 'scale(1.05)' : 'scale(1)'}
                      >
                        <Text 
                          fontSize="7xl" 
                          opacity={0.12} 
                          color={product.color}
                          fontWeight="800"
                          fontFamily="mono"
                          transition="all 0.3s"
                          transform={hoveredProduct === product.id ? 'rotate(5deg)' : 'rotate(0deg)'}
                        >
                          {product.name.charAt(0)}
                        </Text>
                        
                        {/* Grid pattern */}
                        <Box
                          position="absolute"
                          inset={0}
                          opacity={hoveredProduct === product.id ? 0.05 : 0.02}
                          transition="opacity 0.3s"
                          backgroundImage={`repeating-linear-gradient(0deg, ${product.color}, ${product.color} 1px, transparent 1px, transparent 20px)`}
                        />
                      </Box>
                    </Box>

                    {/* Product Info */}
                    <VStack align="stretch" p={6} spacing={3}>
                      <VStack align="start" spacing={1}>
                        <Heading
                          size="md"
                          color="white"
                          fontWeight="700"
                          lineHeight="1.2"
                          noOfLines={1}
                        >
                          {product.name}
                        </Heading>
                        <Text
                          fontSize="sm"
                          color={product.color}
                          fontWeight="500"
                          textTransform="uppercase"
                          letterSpacing="wider"
                        >
                          {product.subtitle}
                        </Text>
                      </VStack>
                      
                      <Text
                        fontSize="sm"
                        color="gray.400"
                        lineHeight="1.6"
                        noOfLines={2}
                      >
                        {product.description}
                      </Text>
                      
                      <HStack justify="space-between" align="center">
                        <Text
                          fontSize="xl"
                          fontWeight="800"
                          color="white"
                          fontFamily="mono"
                        >
                          ${product.price}
                        </Text>
                        <Text
                          fontSize="sm"
                          color={product.color}
                          fontWeight="600"
                          opacity={hoveredProduct === product.id ? 1 : 0}
                          transition="opacity 0.3s"
                        >
                          View Details →
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </Grid>

            {/* View All CTA */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <VStack spacing={4} textAlign="center">
                <Text color="gray.400" fontSize="md">
                  Discover more pieces in our complete collection
                </Text>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor={currentProduct.color}
                  color={currentProduct.color}
                  fontWeight="600"
                  fontSize="md"
                  px={8}
                  rightIcon={<FiArrowRight />}
                  onClick={handleViewAll}
                  _hover={{
                    bg: `${currentProduct.color}11`,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 10px 30px ${currentProduct.color}33`
                  }}
                  _active={{ transform: 'translateY(0)' }}
                  borderRadius="full"
                  transition="all 0.3s"
                >
                  View Full Collection
                </Button>
              </VStack>
            </MotionBox>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default RelatedProducts;
