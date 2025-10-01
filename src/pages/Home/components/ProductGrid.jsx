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
      id: 'titanium-chopsticks',
      name: 'Titanium, Copper & Wood Chopsticks',
      subtitle: 'with Travel Sleeve',
      price: 89,
      description: 'Metal meets wood in everyday art. Built to travel, made to last.',
      featuredImage: '/images/products/chopsticks-main.jpg',
      color: '#00E5E5',
      category: 'Craft'
    },
    {
      id: 'neon-burro-sweater',
      name: 'The Neon Burro Sweater',
      subtitle: 'Unisex Open Knit 3D',
      price: 199,
      description: 'Pure Merino wool where mountain air meets digital craft.',
      featuredImage: '/images/products/sweater-main.jpg',
      color: '#FFE500',
      category: 'Apparel',
      featured: true
    },
    {
      id: 'gift-card',
      name: 'The Gift Card',
      subtitle: 'Digital Services Access',
      price: 50,
      description: 'A portal to digital services and creative possibilities.',
      featuredImage: '/images/products/giftcard-main.jpg',
      color: '#39FF14',
      category: 'Digital'
    },
    {
      id: 'neon-abstract-tees',
      name: 'Neon Abstract T-Shirts',
      subtitle: 'Bold Lines Collection',
      price: 45,
      description: 'Glowing shapes and bold lines. Everyday wear with neon pulse.',
      featuredImage: '/images/products/abstract-tee-main.jpg',
      color: '#FF6B35',
      category: 'Apparel'
    },
    {
      id: 'burro-thoughts-tees',
      name: 'Burro Thoughts T-Shirts',
      subtitle: 'Conversation Starters',
      price: 42,
      description: 'Soft fabric carrying phrases that spark curiosity and conversation.',
      featuredImage: '/images/products/thoughts-tee-main.jpg',
      color: '#8B5CF6',
      category: 'Apparel'
    },
    {
      id: 'burro-coin-gold',
      name: 'Burro Coin · 24k Gold',
      subtitle: 'Limited Edition',
      price: 299,
      description: 'Pure gold pressed into symbol. Made to keep, collect, and pass on.',
      featuredImage: '/images/products/coin-gold-main.jpg',
      color: '#FFE500',
      category: 'Collectible',
      limited: true
    },
    {
      id: 'paper-boy-cap',
      name: 'Burro Paper Boy Winter Cap',
      subtitle: '100% Wool Classic',
      price: 65,
      description: 'Classic style rebuilt in pure wool. Warmth with subtle Burro mark.',
      featuredImage: '/images/products/paperboy-cap-main.jpg',
      color: '#00E5E5',
      category: 'Apparel'
    },
    {
      id: 'burro-socks-pack',
      name: 'Burro Socks · Two Pack',
      subtitle: 'Merino & Alpaca',
      price: 38,
      description: 'Premium fibers in durable comfort. Never boring, always soft.',
      featuredImage: '/images/products/socks-pack-main.jpg',
      color: '#39FF14',
      category: 'Apparel'
    },
    {
      id: 'burro-raffle',
      name: 'The $9 Burro Raffle',
      subtitle: 'Ticket to Possibility',
      price: 9,
      description: 'Enter for the chance to claim a rare piece, chosen by fate.',
      featuredImage: '/images/products/raffle-ticket-main.jpg',
      color: '#FF00FF',
      category: 'Experience',
      special: true
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
                bg="rgba(255, 255, 255, 0.02)"
                borderRadius="xl"
                overflow="hidden"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  transform: 'translateY(-8px)',
                  '&::before': {
                    opacity: 1,
                  }
                }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  inset: '-2px',
                  borderRadius: 'xl',
                  padding: '2px',
                  background: `linear-gradient(135deg, ${product.color}, #FF00FF, ${product.color}, #00D9FF, ${product.color})`,
                  backgroundSize: '400% 400%',
                  animation: `${gradientFlow} 3s ease infinite`,
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  zIndex: -1,
                }}
              >
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

                {clickedProduct === product.id && (
                  <Box
                    position="absolute"
                    inset={0}
                    bg={product.color}
                    opacity={0.5}
                    filter="blur(40px)"
                    animation="pulse 0.3s ease-out"
                    zIndex={10}
                  />
                )}

                <Box
                  height={{ base: "280px", md: "320px" }}
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
                  >
                    <Text 
                      fontSize="9xl" 
                      opacity={0.15} 
                      color={product.color}
                      fontWeight="800"
                      fontFamily="mono"
                    >
                      {product.name.charAt(0)}
                    </Text>
                    
                    <Box
                      position="absolute"
                      inset={0}
                      opacity={0.03}
                      backgroundImage={`repeating-linear-gradient(0deg, ${product.color}, ${product.color} 1px, transparent 1px, transparent 20px)`}
                    />
                  </Box>
                </Box>

                <VStack align="stretch" p={6} spacing={4}>
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
                  
                  <Box>
                    <Text
                      fontSize="xl"
                      fontWeight="800"
                      color="white"
                      fontFamily="mono"
                    >
                      ${product.price}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </MotionBox>
          ))}
        </Grid>

        <VStack spacing={4} textAlign="center" pt={16}>
          <Text 
            color="gray.400" 
            fontSize="md"
            maxW="500px"
          >
            Each piece is crafted with intention, designed to last, and made to be part of your story.
          </Text>
          <Box
            px={4}
            py={2}
            borderRadius="full"
            bg="rgba(255, 255, 255, 0.05)"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.1)"
          >
            <Text 
              color="gray.500" 
              fontSize="sm"
              fontWeight="500"
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