import { Box, Container, Grid, Heading, Text, VStack, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import { getAllProducts } from '../../../data/products';

const MotionBox = motion(Box);

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ProductGrid = () => {
  const navigate = useNavigate();
  const [clickedProduct, setClickedProduct] = useState(null);
  const products = getAllProducts();

  const handleProductClick = (productId) => {
    setClickedProduct(productId);
    setTimeout(() => {
      navigate(`/product/${productId}/`);
    }, 300);
  };

  return (
    <Box py={{ base: 12, md: 20 }} bg="#0A0A0A">
      <Container maxW="1400px" px={{ base: 4, md: 8 }}>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)"
          }}
          gap={{ base: 4, md: 6, lg: 8 }}
          width="100%"
        >
          {products.map((product, index) => (
            <MotionBox
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => handleProductClick(product.id)}
              position="relative"
            >
              <Box
                cursor="pointer"
                position="relative"
                bg="rgba(255, 255, 255, 0.03)"
                borderRadius={{ base: "2xl", md: "3xl" }}
                overflow="hidden"
                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  transform: { base: 'translateY(-8px)', md: 'translateY(-12px)' },
                  bg: 'rgba(255, 255, 255, 0.05)',
                  '&::before': {
                    opacity: 1,
                  }
                }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  inset: '-3px',
                  borderRadius: { base: '2xl', md: '3xl' },
                  padding: '3px',
                  background: `linear-gradient(135deg, ${product.color}, #FF00FF, ${product.color}, #00D9FF, ${product.color})`,
                  backgroundSize: '400% 400%',
                  animation: `${gradientFlow} 3s ease infinite`,
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  opacity: 0,
                  transition: 'opacity 0.4s',
                  zIndex: -1,
                }}
              >
                {/* Badges */}
                {(product.featured || product.limited) && (
                  <Box position="absolute" top={{ base: 3, md: 5 }} left={{ base: 3, md: 5 }} zIndex={2}>
                    {product.featured && (
                      <Badge
                        bg={product.color}
                        color="#0A0A0A"
                        px={{ base: 2, md: 4 }}
                        py={{ base: 1, md: 1.5 }}
                        borderRadius="full"
                        fontSize={{ base: "2xs", md: "xs" }}
                        fontWeight="800"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        boxShadow={`0 0 20px ${product.color}60`}
                      >
                        Featured
                      </Badge>
                    )}
                    {product.limited && (
                      <Badge
                        bg={product.color}
                        color="white"
                        px={{ base: 2, md: 4 }}
                        py={{ base: 1, md: 1.5 }}
                        borderRadius="full"
                        fontSize={{ base: "2xs", md: "xs" }}
                        fontWeight="800"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        boxShadow={`0 0 20px ${product.color}60`}
                      >
                        Limited
                      </Badge>
                    )}
                  </Box>
                )}

                <Box position="absolute" top={{ base: 3, md: 5 }} right={{ base: 3, md: 5 }} zIndex={2}>
                  <Badge
                    bg={`${product.color}25`}
                    color={product.color}
                    px={{ base: 2, md: 3 }}
                    py={{ base: 1, md: 1.5 }}
                    borderRadius="lg"
                    fontSize="2xs"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    border="2px solid"
                    borderColor={`${product.color}50`}
                    backdropFilter="blur(10px)"
                  >
                    {product.category}
                  </Badge>
                </Box>

                {clickedProduct === product.id && (
                  <Box
                    position="absolute"
                    inset={0}
                    bg={product.color}
                    opacity={0.6}
                    filter="blur(50px)"
                    animation="pulse 0.3s ease-out"
                    zIndex={10}
                  />
                )}

                {/* Product Image */}
                <Box
                  height={{ base: "200px", sm: "240px", md: "320px", lg: "340px" }}
                  bg={`radial-gradient(circle at center, ${product.color}12 0%, ${product.color}05 40%, transparent 70%)`}
                  position="relative"
                  overflow="hidden"
                  borderRadius={{ base: "2xl", md: "3xl" }}
                  borderBottomRadius={0}
                >
                  <Box
                    width="100%"
                    height="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                  >
                    <Box
                      as="img"
                      src={product.featuredImage}
                      alt={product.name}
                      maxW={{ base: "75%", md: "85%" }}
                      maxH={{ base: "75%", md: "85%" }}
                      objectFit="contain"
                      position="relative"
                      zIndex={2}
                      filter={`drop-shadow(0 10px 30px ${product.color}40)`}
                    />
                    
                    <Text 
                      fontSize={{ base: "6xl", md: "9xl" }}
                      opacity={0.15} 
                      color={product.color}
                      fontWeight="900"
                      fontFamily="mono"
                      filter={`drop-shadow(0 0 30px ${product.color}80)`}
                      position="absolute"
                      zIndex={1}
                    >
                      {product.name.charAt(0)}
                    </Text>
                    
                    <Box
                      position="absolute"
                      inset={0}
                      opacity={0.08}
                      backgroundImage={`repeating-linear-gradient(0deg, ${product.color}, ${product.color} 1px, transparent 1px, transparent 15px)`}
                      zIndex={0}
                    />
                  </Box>
                </Box>

                {/* Product Info */}
                <VStack align="stretch" p={{ base: 4, md: 6, lg: 7 }} spacing={{ base: 2, md: 4 }}>
                  <VStack align="start" spacing={1}>
                    <Heading
                      size={{ base: "xs", sm: "sm", md: "md" }}
                      color="white"
                      fontWeight="800"
                      lineHeight="1.2"
                      noOfLines={1}
                    >
                      {product.name}
                    </Heading>
                    <Text
                      fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                      color={product.color}
                      fontWeight="600"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      filter={`drop-shadow(0 0 10px ${product.color}40)`}
                      noOfLines={1}
                    >
                      {product.subtitle}
                    </Text>
                  </VStack>
                  
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    color="gray.300"
                    lineHeight="1.7"
                    noOfLines={2}
                    display={{ base: "none", sm: "block" }}
                  >
                    {product.description}
                  </Text>
                  
                  <Box pt={{ base: 1, md: 2 }}>
                    <Text
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="900"
                      color={product.color}
                      fontFamily="mono"
                      filter={`drop-shadow(0 0 15px ${product.color}50)`}
                    >
                      ${product.price}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </MotionBox>
          ))}
        </Grid>

        <VStack spacing={5} textAlign="center" pt={{ base: 16, md: 20 }}>
          <Text 
            color="gray.300" 
            fontSize={{ base: "md", md: "lg" }}
            maxW="600px"
            lineHeight="1.8"
            px={{ base: 4, md: 0 }}
          >
            Each piece is crafted with intention, designed to last, and made to be part of your story.
          </Text>
          <Box
            px={{ base: 5, md: 6 }}
            py={{ base: 2.5, md: 3 }}
            borderRadius="full"
            bg="rgba(255, 255, 255, 0.05)"
            border="2px solid"
            borderColor="rgba(255, 255, 255, 0.15)"
            backdropFilter="blur(10px)"
          >
            <Text 
              color="gray.400" 
              fontSize="sm"
              fontWeight="600"
              letterSpacing="wide"
            >
              More pieces arriving soon
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ProductGrid;
