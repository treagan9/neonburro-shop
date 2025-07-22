import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, GridItem, Heading, Text, VStack, HStack, Button, Image, useToast } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const MotionBox = motion(Box);

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { addToCart } = useCart();
  const [showHeHaw, setShowHeHaw] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Product data - in real app, fetch based on productId
  const productData = {
    'prod_organic_tee': {
      id: 'prod_organic_tee',
      name: 'Organic Cotton Tee',
      subtitle: 'Mountain Comfort',
      price: 45,
      stripeProductId: 'prod_PxxxxxxxxxOrganic', // Replace with actual Stripe product ID
      stripePriceId: 'price_1xxxxxxxxxOrganic', // Replace with actual Stripe price ID
      color: '#00D9FF',
      material: 'GOTS Certified Organic Cotton',
      description: 'Like wearing a cloud that got its MBA in sustainability. This tee is so soft, sheep are jealous. Made from cotton that lived its best life - no pesticides, no drama, just pure mountain vibes.',
      features: [
        'Softer than your favorite playlist',
        'Breathes better than a yoga instructor',
        'Makes other shirts feel inadequate'
      ],
      images: [
        '/images/products/tee-organic-main.jpg',
        '/images/products/tee-organic-2.jpg',
        '/images/products/tee-organic-3.jpg',
        '/images/products/tee-organic-4.jpg'
      ]
    },
    'prod_bamboo_shirt': {
      id: 'prod_bamboo_shirt',
      name: 'Bamboo Blend Shirt',
      subtitle: 'Eco Warrior',
      price: 55,
      stripeProductId: 'prod_PxxxxxxxxxBamboo',
      stripePriceId: 'price_1xxxxxxxxxBamboo',
      color: '#39FF14',
      material: 'Bamboo Viscose Blend',
      description: 'Pandas hate us for this one weird trick - we turned their lunch into luxury. This shirt is naturally antimicrobial, which is fancy talk for "you can skip laundry day and nobody will know."',
      features: [
        'Naturally fights odor like a tiny invisible army',
        'Temperature regulating (basically magic)',
        'Panda-approved sustainability'
      ],
      images: [
        '/images/products/tee-bamboo-main.jpg',
        '/images/products/tee-bamboo-2.jpg',
        '/images/products/tee-bamboo-3.jpg',
        '/images/products/tee-bamboo-4.jpg'
      ]
    },
    'prod_hemp_tee': {
      id: 'prod_hemp_tee',
      name: 'Hemp Heritage Tee',
      subtitle: 'Earth\'s Favorite',
      price: 50,
      stripeProductId: 'prod_PxxxxxxxxxHemp',
      stripePriceId: 'price_1xxxxxxxxxHemp',
      color: '#FF6B35',
      material: 'Hemp & Organic Cotton',
      description: 'The founding fathers would be proud (they grew hemp too). This shirt gets softer with every wash, like it\'s aging backwards. Benjamin Button wishes he was this tee.',
      features: [
        'Gets better with age (unlike your jokes)',
        'Stronger than your WiFi connection',
        'UV resistant (vampires hate this)'
      ],
      images: [
        '/images/products/tee-hemp-main.jpg',
        '/images/products/tee-hemp-2.jpg',
        '/images/products/tee-hemp-3.jpg',
        '/images/products/tee-hemp-4.jpg'
      ]
    },
    'prod_neon_bidet': {
      id: 'prod_neon_bidet',
      name: 'Neon Bidet 3000',
      subtitle: 'Japanese Tech Marvel',
      price: 299,
      stripeProductId: 'prod_PxxxxxxxxxBidet',
      stripePriceId: 'price_1xxxxxxxxxBidet',
      color: '#E2FF00',
      material: 'ABS Plastic with LED',
      description: 'Your throne deserves a glow-up. This bidet doesn\'t just clean - it transforms your bathroom into a cyberpunk spa. Features inline neon lighting because why should your bottom have a boring experience?',
      features: [
        'Heated seat (winter is coming)',
        'RGB lighting for mood-based cleansing',
        'More buttons than a DJ console'
      ],
      images: [
        '/images/products/bidet-neon-main.jpg',
        '/images/products/bidet-neon-2.jpg',
        '/images/products/bidet-neon-3.jpg',
        '/images/products/bidet-neon-4.jpg'
      ]
    },
    'prod_nomad_cap': {
      id: 'prod_nomad_cap',
      name: 'Digital Nomad Cap',
      subtitle: 'UV Protection',
      price: 35,
      stripeProductId: 'prod_PxxxxxxxxxCap',
      stripePriceId: 'price_1xxxxxxxxxCap',
      color: '#00D9FF',
      material: 'Recycled Polyester',
      description: 'For those who code in cafes and debug on mountaintops. This cap shields your brilliant ideas from UV rays and unsolicited advice. The perfect disguise for bad hair days and great code days.',
      features: [
        'UPF 50+ (blocks haters and UV rays)',
        'Moisture-wicking sweatband',
        'Makes you look 73% more mysterious'
      ],
      images: [
        '/images/products/cap-main.jpg',
        '/images/products/cap-2.jpg',
        '/images/products/cap-3.jpg',
        '/images/products/cap-4.jpg'
      ]
    },
    'prod_mountain_beanie': {
      id: 'prod_mountain_beanie',
      name: 'Mountain Beanie',
      subtitle: 'Cozy Companion',
      price: 30,
      stripeProductId: 'prod_PxxxxxxxxxBeanie',
      stripePriceId: 'price_1xxxxxxxxxBeanie',
      color: '#FF00FF',
      material: 'Merino Wool Blend',
      description: 'Keep your genius warm at altitude. This beanie is knitted by mountain goats (not really, but they supervised). Perfect for those "eureka!" moments at 14,000 feet.',
      features: [
        'Merino wool from happy sheep',
        'Doesn\'t itch (unlike your code)',
        'Altitude-tested, developer-approved'
      ],
      images: [
        '/images/products/beanie-main.jpg',
        '/images/products/beanie-2.jpg',
        '/images/products/beanie-3.jpg',
        '/images/products/beanie-4.jpg'
      ]
    },
    'prod_magic_socks': {
      id: 'prod_magic_socks',
      name: 'Mismatched Magic Socks',
      subtitle: 'Intentionally Different',
      price: 25,
      stripeProductId: 'prod_PxxxxxxxxxSocks',
      stripePriceId: 'price_1xxxxxxxxxSocks',
      color: '#39FF14',
      material: 'Bamboo & Cotton Blend',
      description: 'Life\'s too short for matching socks. Each pair comes intentionally mismatched because creativity doesn\'t follow rules. Your feet will thank you for embracing chaos.',
      features: [
        'Never worry about losing one sock again',
        'Conversation starter at yoga class',
        'Left sock and right sock have different superpowers'
      ],
      images: [
        '/images/products/socks-main.jpg',
        '/images/products/socks-2.jpg',
        '/images/products/socks-3.jpg',
        '/images/products/socks-4.jpg'
      ]
    },
    'prod_wisdom_booklet': {
      id: 'prod_wisdom_booklet',
      name: 'Digital Wisdom Booklet',
      subtitle: 'Pocket Philosophy',
      price: 20,
      stripeProductId: 'prod_PxxxxxxxxxBooklet',
      stripePriceId: 'price_1xxxxxxxxxBooklet',
      color: '#FF6B35',
      material: 'Recycled Paper',
      description: '48 pages of mountain wisdom meets Silicon Valley insights. Half programming jokes, half existential crisis solutions. 100% recycled paper because trees have feelings too.',
      features: [
        'Fits in your back pocket',
        'Water-resistant (coffee-proof tested)',
        'Contains at least 3 life-changing revelations'
      ],
      images: [
        '/images/products/booklet-main.jpg',
        '/images/products/booklet-2.jpg',
        '/images/products/booklet-3.jpg',
        '/images/products/booklet-4.jpg'
      ]
    },
    'prod_sacred_bundle': {
      id: 'prod_sacred_bundle',
      name: 'Sacred Bundle',
      subtitle: 'Sage & Palo Santo',
      price: 40,
      stripeProductId: 'prod_PxxxxxxxxxBundle',
      stripePriceId: 'price_1xxxxxxxxxBundle',
      color: '#8B5CF6',
      material: 'Ethically Sourced',
      description: 'Clear your cache and your chakras. This bundle includes sage for debugging your space and palo santo for that post-deployment zen. Ethically sourced from shamans who also code.',
      features: [
        'Removes bad vibes and runtime errors',
        'Ethically harvested with good karma included',
        'Smells better than your standup meetings'
      ],
      images: [
        '/images/products/sacred-bundle-main.jpg',
        '/images/products/sacred-bundle-2.jpg',
        '/images/products/sacred-bundle-3.jpg',
        '/images/products/sacred-bundle-4.jpg'
      ]
    },
    'prod_tenugui': {
      id: 'prod_tenugui',
      name: 'Tenugui Towel',
      subtitle: 'Japanese Tradition',
      price: 28,
      stripeProductId: 'prod_PxxxxxxxxxTenugui',
      stripePriceId: 'price_1xxxxxxxxxTenugui',
      color: '#00D9FF',
      material: '100% Cotton',
      description: 'The Swiss Army knife of towels. Use it as a headband, dishcloth, gift wrap, or emergency cape. This traditional Japanese towel is more versatile than your favorite framework.',
      features: [
        'Dries faster than your npm install',
        '37 different documented uses',
        'Gets softer with each wash (unlike code reviews)'
      ],
      images: [
        '/images/products/tenugui-main.jpg',
        '/images/products/tenugui-2.jpg',
        '/images/products/tenugui-3.jpg',
        '/images/products/tenugui-4.jpg'
      ]
    }
  };

  const product = productData[productId] || productData['prod_organic_tee'];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      color: product.color,
      material: product.material,
      stripeProductId: product.stripeProductId,
      stripePriceId: product.stripePriceId
    });
    
    // Show HE HAW animation
    setShowHeHaw(true);
    setTimeout(() => setShowHeHaw(false), 2000);
    
    // Toast notification
    toast({
      title: "Added to cart!",
      description: `${product.name} is ready to roll`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Box minH="100vh" bg="dark.black" pt="100px" pb={20}>
      <Container maxW="1200px">
        {/* Back Button */}
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          mb={8}
        >
          <HStack
            as="button"
            onClick={() => navigate('/')}
            spacing={2}
            color="gray.400"
            _hover={{ color: 'white' }}
            transition="color 0.2s"
          >
            <FiArrowLeft />
            <Text>Back to Collection</Text>
          </HStack>
        </MotionBox>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={12}>
          {/* Images Section */}
          <GridItem>
            <VStack spacing={4}>
              {/* Main Image */}
              <Box
                height={{ base: "400px", md: "500px" }}
                width="100%"
                bg="black"
                borderRadius="lg"
                overflow="hidden"
                position="relative"
              >
                {/* Placeholder - replace with actual image */}
                <Box
                  width="100%"
                  height="100%"
                  bg={`linear-gradient(135deg, ${product.color}22 0%, transparent 100%)`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="9xl" opacity={0.1} color={product.color}>
                    {product.name.charAt(0)}
                  </Text>
                </Box>
              </Box>

              {/* Thumbnail Images */}
              <HStack spacing={4} width="100%" overflowX="auto">
                {[1, 2, 3, 4].map((index) => (
                  <Box
                    key={index}
                    height="80px"
                    width="80px"
                    bg="black"
                    borderRadius="md"
                    overflow="hidden"
                    cursor="pointer"
                    border="2px solid"
                    borderColor={selectedImage === index - 1 ? product.color : "transparent"}
                    onClick={() => setSelectedImage(index - 1)}
                    flexShrink={0}
                  >
                    <Box
                      width="100%"
                      height="100%"
                      bg={`linear-gradient(135deg, ${product.color}11 0%, transparent 100%)`}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontSize="2xl" opacity={0.2} color={product.color}>
                        {index}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </HStack>
            </VStack>
          </GridItem>

          {/* Product Info */}
          <GridItem>
            <VStack align="stretch" spacing={6}>
              {/* Title Section */}
              <VStack align="start" spacing={2}>
                <Text
                  color={product.color}
                  fontSize="sm"
                  fontWeight="600"
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  {product.subtitle}
                </Text>
                <Heading
                  fontSize={{ base: "2xl", md: "4xl" }}
                  color="white"
                  fontWeight="800"
                >
                  {product.name}
                </Heading>
                <Text color="gray.500" fontSize="sm">
                  {product.material}
                </Text>
              </VStack>

              {/* Price */}
              <Text fontSize="3xl" fontWeight="700" color="white">
                ${product.price}
              </Text>

              {/* Description */}
              <Text color="gray.300" fontSize="md" lineHeight="1.8">
                {product.description}
              </Text>

              {/* Features */}
              <VStack align="start" spacing={3}>
                {product.features.map((feature, index) => (
                  <HStack key={index} spacing={3}>
                    <Box
                      width="6px"
                      height="6px"
                      bg={product.color}
                      borderRadius="full"
                    />
                    <Text color="gray.400" fontSize="sm">
                      {feature}
                    </Text>
                  </HStack>
                ))}
              </VStack>

              {/* Add to Cart Button */}
              <Button
                size="lg"
                height="60px"
                bg={product.color}
                color="black"
                fontWeight="800"
                fontSize="md"
                leftIcon={<FiShoppingBag />}
                onClick={handleAddToCart}
                position="relative"
                overflow="hidden"
                _hover={{
                  transform: 'scale(1.02)',
                  boxShadow: `0 20px 40px ${product.color}44`
                }}
                _active={{
                  transform: 'scale(0.98)'
                }}
                transition="all 0.2s"
              >
                ADD TO CART
              </Button>
            </VStack>
          </GridItem>
        </Grid>
      </Container>

      {/* HE HAW Popup */}
      <AnimatePresence>
        {showHeHaw && (
          <MotionBox
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            zIndex={9999}
          >
            <Box
              bg={product.color}
              color="black"
              px={12}
              py={8}
              borderRadius="2xl"
              fontSize="4xl"
              fontWeight="900"
              boxShadow={`0 0 100px ${product.color}`}
              position="relative"
            >
              <Text
                style={{
                  textShadow: '3px 3px 0px rgba(0,0,0,0.2)'
                }}
              >
                HE HAW!
              </Text>
              <Text fontSize="lg" fontWeight="600" mt={2}>
                ADDED!
              </Text>
              
              {/* Comic burst effect */}
              <Box
                position="absolute"
                inset="-20px"
                border="4px solid"
                borderColor={product.color}
                borderRadius="2xl"
                transform="rotate(5deg)"
                opacity={0.5}
              />
              <Box
                position="absolute"
                inset="-30px"
                border="4px solid"
                borderColor={product.color}
                borderRadius="2xl"
                transform="rotate(-5deg)"
                opacity={0.3}
              />
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default ProductDetail;
