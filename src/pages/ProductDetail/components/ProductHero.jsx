import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Badge,
  Button,
  Grid,
  GridItem 
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShare2, FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const ProductHero = ({ product }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Box position="relative" width="100%" pt={{ base: 20, md: 24 }}>
      <Container maxW="1400px" px={{ base: 4, md: 8 }}>
        {/* Navigation */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          mb={8}
        >
          <HStack spacing={4} justify="space-between" align="center">
            <Button
              variant="ghost"
              leftIcon={<FiArrowLeft />}
              onClick={handleBack}
              color="gray.400"
              _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
              size="lg"
            >
              Back to Collection
            </Button>
            
            <HStack spacing={2}>
              <Button
                variant="ghost"
                size="lg"
                onClick={handleShare}
                color="gray.400"
                _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
              >
                <FiShare2 />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                color="gray.400"
                _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
              >
                <FiHeart />
              </Button>
            </HStack>
          </HStack>
        </MotionBox>

        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
          gap={{ base: 8, lg: 16 }}
          alignItems="start"
        >
          {/* Product Image */}
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                position="relative"
                borderRadius="2xl"
                overflow="hidden"
                bg="black"
                aspectRatio={1}
              >
                {/* Image placeholder with enhanced styling */}
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
                    fontSize="15xl" 
                    opacity={0.1} 
                    color={product.color}
                    fontWeight="800"
                    fontFamily="mono"
                  >
                    {product.name.charAt(0)}
                  </Text>
                  
                  {/* Subtle grid pattern */}
                  <Box
                    position="absolute"
                    inset={0}
                    opacity={0.03}
                    backgroundImage={`repeating-linear-gradient(0deg, ${product.color}, ${product.color} 1px, transparent 1px, transparent 30px)`}
                  />
                </Box>

                {/* Category badge */}
                <Box position="absolute" top={4} left={4}>
                  <Badge
                    bg={`${product.color}15`}
                    color={product.color}
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="600"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    border="1px solid"
                    borderColor={`${product.color}30`}
                  >
                    {product.category}
                  </Badge>
                </Box>

                {/* Featured/Special badges */}
                {(product.featured || product.limited || product.special) && (
                  <Box position="absolute" top={4} right={4}>
                    {product.featured && (
                      <Badge
                        bg="#FFE500"
                        color="#0A0A0A"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="sm"
                        fontWeight="bold"
                        textTransform="uppercase"
                        letterSpacing="wider"
                      >
                        Featured
                      </Badge>
                    )}
                  </Box>
                )}
              </Box>
            </MotionBox>
          </GridItem>

          {/* Product Details */}
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <VStack align="start" spacing={6} height="100%">
                {/* Product Title */}
                <VStack align="start" spacing={2}>
                  <Heading
                    as="h1"
                    fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                    fontWeight="800"
                    color="white"
                    lineHeight="1.1"
                    letterSpacing="-0.02em"
                  >
                    {product.name}
                  </Heading>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    color={product.color}
                    fontWeight="600"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    {product.subtitle}
                  </Text>
                </VStack>

                {/* Price */}
                <Box>
                  <Text
                    fontSize={{ base: "2xl", md: "3xl" }}
                    fontWeight="800"
                    color="white"
                    fontFamily="mono"
                  >
                    ${product.price}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    mt={1}
                  >
                    Free shipping worldwide
                  </Text>
                </Box>

                {/* Description */}
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  color="gray.300"
                  lineHeight="1.7"
                  maxW="500px"
                >
                  {product.longDescription || product.description}
                </Text>

                {/* Key Features */}
                <VStack align="start" spacing={3} width="100%">
                  <Text
                    fontSize="md"
                    color={product.color}
                    fontWeight="600"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Key Features
                  </Text>
                  <VStack align="start" spacing={2}>
                    {product.materials.slice(0, 3).map((material, idx) => (
                      <HStack key={idx} spacing={3}>
                        <Box
                          w={2}
                          h={2}
                          borderRadius="full"
                          bg={product.color}
                          flexShrink={0}
                          mt={2}
                        />
                        <Text color="gray.300" fontSize="md" lineHeight="1.6">
                          {material}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>

                {/* Stock Status */}
                <HStack spacing={2}>
                  <Box
                    w={3}
                    h={3}
                    borderRadius="full"
                    bg={product.inStock ? "#39FF14" : "#FF4444"}
                  />
                  <Text
                    color={product.inStock ? "#39FF14" : "#FF4444"}
                    fontSize="sm"
                    fontWeight="600"
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Text>
                </HStack>
              </VStack>
            </MotionBox>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductHero;
