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
  GridItem,
  Image,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  RadioGroup,
  Radio,
  Stack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiShoppingCart, FiTruck, FiTool, FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MotionBox = motion(Box);

const ProductHero = ({ product, onAddToCart, onBuyNow }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : '');
  const [selectedTier, setSelectedTier] = useState(product.priceOptions ? product.priceOptions[0] : null);
  const [selectedDesign, setSelectedDesign] = useState(product.designs ? product.designs[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const getCurrentPrice = () => {
    if (product.hasVariants && selectedTier) {
      return selectedTier.price;
    }
    return product.price;
  };

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast({
        title: 'Please select a size',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (product.hasVariants && product.variantType === 'design' && !selectedDesign) {
      toast({
        title: 'Please select a design',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (product.hasVariants && product.variantType === 'tier' && !selectedTier) {
      toast({
        title: 'Please select an option',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setIsAdding(true);
    
    setTimeout(() => {
      const productData = {
        ...product,
        price: getCurrentPrice(),
        selectedSize,
        selectedTier: selectedTier?.label,
        selectedDesign: selectedDesign?.name,
        stripePriceId: selectedTier?.stripePriceId || product.stripePriceId,
        quantity
      };
      
      onAddToCart(productData);
      setIsAdding(false);
    }, 300);
  };

  const handleBuyNow = () => {
    if (product.sizes && !selectedSize) {
      toast({
        title: 'Please select a size',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (product.hasVariants && product.variantType === 'design' && !selectedDesign) {
      toast({
        title: 'Please select a design',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (product.hasVariants && product.variantType === 'tier' && !selectedTier) {
      toast({
        title: 'Please select an option',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const productData = {
      ...product,
      price: getCurrentPrice(),
      selectedSize,
      selectedTier: selectedTier?.label,
      selectedDesign: selectedDesign?.name,
      stripePriceId: selectedTier?.stripePriceId || product.stripePriceId,
      quantity
    };

    onBuyNow(productData);
  };

  return (
    <Box position="relative" width="100%" pt={{ base: 20, md: 24 }}>
      <Container maxW="1400px" px={{ base: 4, md: 8 }}>
        {/* Back Button */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          mb={8}
        >
          <Button
            variant="ghost"
            leftIcon={<FiArrowLeft />}
            onClick={() => navigate('/')}
            color="gray.400"
            _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
            size="lg"
          >
            Back to Collection
          </Button>
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
                <Box
                  width="100%"
                  height="100%"
                  bg={`linear-gradient(135deg, ${product.color}08 0%, ${product.color}03 50%, transparent 100%)`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  {product.featuredImage ? (
                    <Image
                      src={selectedDesign?.image || product.featuredImage}
                      alt={product.name}
                      maxW="80%"
                      maxH="80%"
                      objectFit="contain"
                      filter={`drop-shadow(0 20px 40px ${product.color}40)`}
                    />
                  ) : (
                    <Text 
                      fontSize="15xl" 
                      opacity={0.1} 
                      color={product.color}
                      fontWeight="800"
                    >
                      {product.name.charAt(0)}
                    </Text>
                  )}
                </Box>

                {/* Badges */}
                <Box position="absolute" top={4} left={4}>
                  <Badge
                    bg={`${product.color}15`}
                    color={product.color}
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight="600"
                  >
                    {product.category}
                  </Badge>
                </Box>

                {(product.featured || product.limited) && (
                  <Box position="absolute" top={4} right={4}>
                    <Badge
                      bg={product.featured ? "#FFE500" : product.color}
                      color={product.featured ? "#0A0A0A" : "white"}
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="bold"
                    >
                      {product.featured ? "Featured" : "Limited"}
                    </Badge>
                  </Box>
                )}
              </Box>
            </MotionBox>
          </GridItem>

          {/* Product Details & Purchase */}
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <VStack align="start" spacing={6}>
                {/* Title & Price */}
                <VStack align="start" spacing={3} width="100%">
                  <Heading
                    fontSize={{ base: "2xl", md: "4xl" }}
                    fontWeight="800"
                    color="white"
                    lineHeight="1.1"
                  >
                    {product.name}
                  </Heading>
                  <Text
                    fontSize="lg"
                    color={product.color}
                    fontWeight="600"
                    textTransform="uppercase"
                  >
                    {product.subtitle}
                  </Text>
                  
                  <Text
                    fontSize="3xl"
                    fontWeight="800"
                    color="white"
                    fontFamily="mono"
                  >
                    ${getCurrentPrice()}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Free shipping in the US
                  </Text>
                </VStack>

                {/* Description */}
                <Text
                  fontSize="md"
                  color="gray.300"
                  lineHeight="1.7"
                >
                  {product.description}
                </Text>

                {/* Design Selection for Mystery T */}
                {product.hasVariants && product.variantType === 'design' && product.designs && (
                  <VStack align="start" spacing={3} width="100%">
                    <Text color={product.color} fontWeight="600" fontSize="sm" textTransform="uppercase">
                      Select Design
                    </Text>
                    <RadioGroup
                      value={selectedDesign?.id}
                      onChange={(value) => {
                        const design = product.designs.find(d => d.id === value);
                        setSelectedDesign(design);
                      }}
                    >
                      <Stack spacing={3}>
                        {product.designs.map((design) => (
                          <Box
                            key={design.id}
                            p={4}
                            borderRadius="lg"
                            border="2px solid"
                            borderColor={selectedDesign?.id === design.id ? product.color : 'whiteAlpha.200'}
                            bg={selectedDesign?.id === design.id ? `${product.color}10` : 'rgba(255, 255, 255, 0.02)'}
                            cursor="pointer"
                            onClick={() => setSelectedDesign(design)}
                            transition="all 0.2s"
                          >
                            <HStack justify="space-between" align="start">
                              <Radio value={design.id} colorScheme="cyan" />
                              <VStack align="start" flex={1} spacing={1} ml={3}>
                                <Text color="white" fontWeight="700" fontSize="md">
                                  {design.name}
                                </Text>
                                <Text color="gray.400" fontSize="sm">
                                  {design.description}
                                </Text>
                              </VStack>
                            </HStack>
                          </Box>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </VStack>
                )}

                {/* Tier Selection for Digital Gift Card */}
                {product.hasVariants && product.variantType === 'tier' && product.priceOptions && (
                  <VStack align="start" spacing={3} width="100%">
                    <Text color={product.color} fontWeight="600" fontSize="sm" textTransform="uppercase">
                      Select Package
                    </Text>
                    <RadioGroup
                      value={selectedTier?.id}
                      onChange={(value) => {
                        const tier = product.priceOptions.find(opt => opt.id === value);
                        setSelectedTier(tier);
                      }}
                    >
                      <Stack spacing={3}>
                        {product.priceOptions.map((option) => (
                          <Box
                            key={option.id}
                            p={4}
                            borderRadius="lg"
                            border="2px solid"
                            borderColor={selectedTier?.id === option.id ? product.color : 'whiteAlpha.200'}
                            bg={selectedTier?.id === option.id ? `${product.color}10` : 'rgba(255, 255, 255, 0.02)'}
                            cursor="pointer"
                            onClick={() => setSelectedTier(option)}
                            transition="all 0.2s"
                          >
                            <HStack justify="space-between" align="start">
                              <Radio value={option.id} colorScheme="cyan" />
                              <VStack align="start" flex={1} spacing={1} ml={3}>
                                <HStack>
                                  <Text color="white" fontWeight="700" fontSize="md">
                                    {option.label}
                                  </Text>
                                  {option.featured && (
                                    <Badge bg="#FF6B35" color="white" fontSize="xs">
                                      Popular
                                    </Badge>
                                  )}
                                </HStack>
                                <Text color="gray.400" fontSize="xs">
                                  {option.subtitle}
                                </Text>
                                <Text color="gray.300" fontSize="sm">
                                  {option.description}
                                </Text>
                              </VStack>
                              <Text color={product.color} fontWeight="800" fontSize="xl" fontFamily="mono">
                                ${option.price}
                              </Text>
                            </HStack>
                          </Box>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </VStack>
                )}

                {/* Size Selection */}
                {product.sizes && (
                  <VStack align="start" spacing={3} width="100%">
                    <Text color={product.color} fontWeight="600" fontSize="sm" textTransform="uppercase">
                      Size
                    </Text>
                    <Select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      size="lg"
                      bg="rgba(255, 255, 255, 0.02)"
                      border="2px solid"
                      borderColor="whiteAlpha.200"
                      color="white"
                      _hover={{ borderColor: product.color }}
                      _focus={{ borderColor: product.color, boxShadow: `0 0 0 1px ${product.color}` }}
                    >
                      {product.sizes.map((size) => (
                        <option key={size} value={size} style={{ background: '#1A1A1A' }}>
                          {size}
                        </option>
                      ))}
                    </Select>
                  </VStack>
                )}

                {/* Quantity */}
                {!product.hasVariants && (
                  <VStack align="start" spacing={3}>
                    <Text color={product.color} fontWeight="600" fontSize="sm" textTransform="uppercase">
                      Quantity
                    </Text>
                    <NumberInput
                      value={quantity}
                      onChange={(valueString) => setQuantity(parseInt(valueString) || 1)}
                      min={1}
                      max={10}
                      size="lg"
                      maxW="120px"
                    >
                      <NumberInputField
                        bg="rgba(255, 255, 255, 0.02)"
                        border="2px solid"
                        borderColor="whiteAlpha.200"
                        color="white"
                        _hover={{ borderColor: product.color }}
                        _focus={{ borderColor: product.color }}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper color="gray.400" _hover={{ color: product.color }} />
                        <NumberDecrementStepper color="gray.400" _hover={{ color: product.color }} />
                      </NumberInputStepper>
                    </NumberInput>
                  </VStack>
                )}

                {/* Action Buttons */}
                <VStack spacing={3} width="100%">
                  <Button
                    size="lg"
                    width="100%"
                    bg={product.color}
                    color="#0A0A0A"
                    fontWeight="700"
                    height="56px"
                    leftIcon={<FiShoppingCart />}
                    onClick={handleAddToCart}
                    isLoading={isAdding}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: `0 10px 30px ${product.color}44`
                    }}
                    borderRadius="full"
                  >
                    Add to Cart
                  </Button>

                  <Button
                    size="lg"
                    width="100%"
                    variant="outline"
                    borderColor={product.color}
                    color={product.color}
                    fontWeight="600"
                    height="56px"
                    onClick={handleBuyNow}
                    _hover={{ bg: `${product.color}11` }}
                    borderRadius="full"
                  >
                    Buy Now
                  </Button>
                </VStack>

                {/* Trust Signals */}
                <VStack spacing={3} width="100%" pt={4}>
                  <HStack spacing={3} align="start" width="100%">
                    <Box color={product.color} mt={1}>
                      <FiTruck size={18} />
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text color="white" fontWeight="600" fontSize="sm">
                        Free US Shipping
                      </Text>
                      <Text color="gray.400" fontSize="xs">
                        Fast, reliable delivery
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack spacing={3} align="start" width="100%">
                    <Box color={product.color} mt={1}>
                      <FiTool size={18} />
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text color="white" fontWeight="600" fontSize="sm">
                        Repair Services
                      </Text>
                      <Text color="gray.400" fontSize="xs">
                        We'll fix what we made
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack spacing={3} align="start" width="100%">
                    <Box color={product.color} mt={1}>
                      <FiAlertCircle size={18} />
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text color="white" fontWeight="600" fontSize="sm">
                        No Returns
                      </Text>
                      <Text color="gray.400" fontSize="xs">
                        May include hidden assets
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </VStack>
            </MotionBox>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductHero;
