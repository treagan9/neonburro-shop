import { Box, Container, Grid, Heading, Text, VStack, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';

const MotionBox = motion(Box);

// Gradient flow animation for hover
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
      id: 'prod_organic_tee',
      name: 'Organic Cotton Tee',
      price: 45,
      featuredImage: '/images/products/tee-organic-main.jpg',
      color: '#00D9FF',
    },
    {
      id: 'prod_bamboo_shirt',
      name: 'Bamboo Blend Shirt',
      price: 55,
      featuredImage: '/images/products/tee-bamboo-main.jpg',
      color: '#39FF14',
    },
    {
      id: 'prod_hemp_tee',
      name: 'Hemp Heritage Tee',
      price: 50,
      featuredImage: '/images/products/tee-hemp-main.jpg',
      color: '#FF6B35',
    },
    {
      id: 'prod_neon_bidet',
      name: 'Neon Bidet 3000',
      price: 299,
      featuredImage: '/images/products/bidet-neon-main.jpg',
      color: '#E2FF00',
    },
    {
      id: 'prod_nomad_cap',
      name: 'Digital Nomad Cap',
      price: 35,
      featuredImage: '/images/products/cap-main.jpg',
      color: '#00D9FF',
    },
    {
      id: 'prod_mountain_beanie',
      name: 'Mountain Beanie',
      price: 30,
      featuredImage: '/images/products/beanie-main.jpg',
      color: '#FF00FF',
    },
    {
      id: 'prod_magic_socks',
      name: 'Mismatched Magic Socks',
      price: 25,
      featuredImage: '/images/products/socks-main.jpg',
      color: '#39FF14',
    },
    {
      id: 'prod_wisdom_booklet',
      name: 'Digital Wisdom Booklet',
      price: 20,
      featuredImage: '/images/products/booklet-main.jpg',
      color: '#FF6B35',
    },
    {
      id: 'prod_sacred_bundle',
      name: 'Sacred Bundle',
      price: 40,
      featuredImage: '/images/products/sacred-bundle-main.jpg',
      color: '#8B5CF6',
    },
    {
      id: 'prod_tenugui',
      name: 'Tenugui Towel',
      price: 28,
      featuredImage: '/images/products/tenugui-main.jpg',
      color: '#00D9FF',
    }
  ];

  const handleProductClick = (productId) => {
    setClickedProduct(productId);
    
    // Create explosion effect
    setTimeout(() => {
      navigate(`/product/${productId}`);
    }, 300);
  };

  return (
    <Box py={{ base: 16, md: 24 }} bg="dark.black">
      <Container maxW="1200px">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Section Header */}
          <VStack spacing={4} textAlign="center">
            <Heading
              fontSize={{ base: "2xl", md: "4xl" }}
              color="white"
              fontWeight="800"
            >
              The Collection
            </Heading>
            <Text color="gray.400" fontSize={{ base: "sm", md: "md" }}>
              Each piece tells a story of digital innovation meets mountain tradition
            </Text>
          </VStack>

          {/* Product Grid */}
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleProductClick(product.id)}
                position="relative"
              >
                <Box
                  cursor="pointer"
                  position="relative"
                  bg="rgba(255, 255, 255, 0.02)"
                  borderRadius="lg"
                  overflow="hidden"
                  transition="all 0.3s"
                  _hover={{
                    transform: 'translateY(-4px)',
                    '&::before': {
                      opacity: 1,
                    }
                  }}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    inset: '-2px',
                    borderRadius: 'lg',
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
                  {/* Glow effect on click */}
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

                  {/* Product Image */}
                  <Box
                    height={{ base: "300px", md: "350px" }}
                    bg="black"
                    position="relative"
                    overflow="hidden"
                  >
                    {/* Placeholder - replace with actual images */}
                    <Box
                      width="100%"
                      height="100%"
                      bg={`linear-gradient(135deg, ${product.color}11 0%, transparent 100%)`}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="8xl" opacity={0.1} color={product.color}>
                        {product.name.charAt(0)}
                      </Text>
                    </Box>
                  </Box>

                  {/* Product Info */}
                  <VStack align="stretch" p={6} spacing={3}>
                    <Heading
                      size="md"
                      color="white"
                      fontWeight="700"
                      noOfLines={1}
                    >
                      {product.name}
                    </Heading>
                    
                    <Text
                      fontSize="xl"
                      fontWeight="700"
                      color="gray.300"
                    >
                      ${product.price}
                    </Text>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default ProductGrid;
