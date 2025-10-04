import { Box, Container, Grid, Heading, Text, VStack, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';

const MotionBox = motion(Box);

const gradientFlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const ProductGrid = () => {
  const navigate = useNavigate();
  const [clickedProduct, setClickedProduct] = useState(null);

  const products = [
    {
      id: 'digital-gift-card',
      name: 'Neon Burro Digital Gift Card',
      subtitle: 'Give Creativity & Momentum',
      price: 50,
      description: 'More than a balance, an introduction to a team that listens, designs with care and brings ideas to life.',
      featuredImage: '/images/products/the-burro-gift-card.png',
      color: '#39FF14',
      category: 'Digital',
      featured: true
    },
    {
      id: 'lost-burro-tee',
      name: 'The Lost Burro · Mystery Luxe T',
      subtitle: '100% Merino Wool',
      price: 149,
      description: 'Mid-heavy weight merino, simple in form yet rich in presence. Designed to be worn, lived in and remembered.',
      featuredImage: '/images/products/teal-mystery-t-shirt-front.png',
      color: '#8B5CF6',
      category: 'Apparel',
      limited: true
    },
    {
      id: 'nibble-wands',
      name: 'Nibble Wands',
      subtitle: 'Titanium Copper Wood',
      price: 89,
      description: 'Grounded in copper and wood, lifted by titanium. Every meal becomes a mindful ritual.',
      featuredImage: '/images/products/chop-sticks-main.png',
      color: '#00E5E5',
      category: 'Craft'
    },
    {
      id: 'titanium-cup',
      name: 'Titanium Burro Cup',
      subtitle: '500ml Pure Titanium',
      price: 125,
      description: 'Ultralight, unbreakable, made to last a lifetime. A cup for life, a vessel for the journey.',
      featuredImage: '/images/products/titanium-burro-cup.png',
      color: '#C0C0C0',
      category: 'Craft'
    },
    {
      id: 'copper-cup',
      name: 'Copper Burro Cup',
      subtitle: '500ml Pure Copper',
      price: 98,
      description: 'A natural conductor carrying warmth and energy. Grounded yet vibrant, alive in your hand.',
      featuredImage: '/images/products/copper-burro-cup.png',
      color: '#FF6B35',
      category: 'Craft'
    },
    {
      id: 'burro-sweater',
      name: 'The Burro Sweater',
      subtitle: 'Open Knit 3D Pattern',
      price: 199,
      description: 'A pattern that moves like hidden rivers, a weight that feels both grounding and alive.',
      featuredImage: '/images/products/the-burro-sweater-front.png',
      color: '#FFE500',
      category: 'Apparel',
      featured: true
    }
  ];

  const handleProductClick = (productId) => {
    setClickedProduct(productId);
    setTimeout(() => {
      navigate(`/product/${productId}/`);
    }, 300);
  };

  return (
    <Box py={{ base: 16, md: 20 }} bg="#0A0A0A">
      <Container maxW="1400px">
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)"
          }}
          gap={{ base: 6, md: 8 }}
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
                borderRadius="3xl"
                overflow="hidden"
                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  transform: 'translateY(-12px)',
                  bg: 'rgba(255, 255, 255, 0.05)',
                  '&::before': {
                    opacity: 1,
                  }
                }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  inset: '-3px',
                  borderRadius: '3xl',
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
                {(product.featured || product.limited) && (
                  <Box position="absolute" top={5} left={5} zIndex={2}>
                    {product.featured && (
                      <Badge
                        bg={product.color}
                        color="#0A0A0A"
                        px={4}
                        py={1.5}
                        borderRadius="full"
                        fontSize="xs"
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
                        px={4}
                        py={1.5}
                        borderRadius="full"
                        fontSize="xs"
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

                <Box position="absolute" top={5} right={5} zIndex={2}>
                  <Badge
                    bg={`${product.color}25`}
                    color={product.color}
                    px={3}
                    py={1.5}
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

                <Box
                  height={{ base: "300px", md: "340px" }}
                  bg={`radial-gradient(circle at center, ${product.color}12 0%, ${product.color}05 40%, transparent 70%)`}
                  position="relative"
                  overflow="hidden"
                  borderRadius="3xl"
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
                    {/* Actual Product Image */}
                    <Box
                      as="img"
                      src={product.featuredImage}
                      alt={product.name}
                      maxW="85%"
                      maxH="85%"
                      objectFit="contain"
                      position="relative"
                      zIndex={2}
                      filter={`drop-shadow(0 10px 30px ${product.color}40)`}
                    />
                    
                    {/* Fallback Letter (hidden when image loads) */}
                    <Text 
                      fontSize="9xl" 
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

                <VStack align="stretch" p={7} spacing={4}>
                  <VStack align="start" spacing={2}>
                    <Heading
                      size="md"
                      color="white"
                      fontWeight="800"
                      lineHeight="1.2"
                      noOfLines={1}
                    >
                      {product.name}
                    </Heading>
                    <Text
                      fontSize="sm"
                      color={product.color}
                      fontWeight="600"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      filter={`drop-shadow(0 0 10px ${product.color}40)`}
                    >
                      {product.subtitle}
                    </Text>
                  </VStack>
                  
                  <Text
                    fontSize="sm"
                    color="gray.300"
                    lineHeight="1.7"
                    noOfLines={2}
                  >
                    {product.description}
                  </Text>
                  
                  <Box pt={2}>
                    <Text
                      fontSize="2xl"
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

        <VStack spacing={5} textAlign="center" pt={20}>
          <Text 
            color="gray.300" 
            fontSize="lg"
            maxW="600px"
            lineHeight="1.8"
          >
            Each piece is crafted with intention, designed to last, and made to be part of your story.
          </Text>
          <Box
            px={6}
            py={3}
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