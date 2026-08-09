// src/pages/Home/components/ProductGrid.jsx
// SENTINEL: NB_SHOP_GRID_V3
//
// Three rooms, not one grid. Worn, Carried, Sent. A room is entered rather than
// filtered, which is the difference between a boutique and a warehouse listing.
//
// WHAT WAS REMOVED IN V3 AND WHY, SO IT DOES NOT COME BACK
//   · The giant faded initial behind every image. It was there to fill space on
//     cards with no photograph and it read as a rendering bug, because a huge
//     grey "b" in the middle of a shirt is a huge grey "b". A piece with no
//     photograph now gets a deliberate empty frame that says so.
//   · The magenta and cyan animated hover border. That is the retired 2025
//     palette and it fights everything else on the page. Hover is a lime hairline.
//   · The scanline overlay on every tile. Texture for its own sake.
//   · The category badge, which sat in the same corner as the stock badge and
//     covered it. One badge per card. Stock wins, because it is the only one
//     carrying information a customer needs before clicking.
//
// ORDERING IS NOT ALPHABETICAL AND IS NOT INSERTION ORDER. Digital used to sort
// first because it is spread first in ALL_PRODUCTS, so the store opened on a
// gift card. Rooms run Worn, Carried, Sent, and inside a room heavy float sorts
// up. See taxonomy.js.
//
// No oxford commas, no em dashes.

import { Box, Container, Grid, Heading, Text, VStack, HStack, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../../data/products';
import { ROOMS, productsInRoom, floatWeight, isHeavyFloat } from '../../../data/taxonomy';
import { primeInventory, subscribeInventory, stockState } from '../../../data/inventory';
import { colors } from '../../../theme/colors';
import { RAIL, SHEET } from '../../../theme/layout';

const MotionBox = motion(Box);
const LIME = colors.accent.signal;

const STOCK_LABEL = { out: 'Out of stock', low: 'Almost gone', soon: 'Not made yet' };

const ProductGrid = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [, setStockTick] = useState(0);
  const products = getAllProducts();

  // Live stock from Pulse. Until it answers, every card falls back to the
  // static inStock flag, which is closed. See data/inventory.js.
  useEffect(() => {
    const off = subscribeInventory(() => setStockTick((n) => n + 1));
    primeInventory();
    return off;
  }, []);

  const go = (id) => navigate(`/product/${id}/`);

  const Card = ({ product, index }) => {
    const state = stockState(product);
    const dimmed = state === 'out' || state === 'soon';
    const heavy = isHeavyFloat(product);

    return (
      <MotionBox
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.06 }}
        onClick={() => go(product.id)}
        cursor="pointer"
        role="group"
        borderRadius="xl"
        overflow="hidden"
        bg={colors.dark.gray}
        border="1px solid"
        borderColor={colors.ui.border}
        sx={{ transition: 'border-color 0.35s ease, transform 0.35s ease' }}
        _hover={{ borderColor: LIME, transform: 'translateY(-3px)' }}
      >
        {/* image well */}
        <Box
          position="relative"
          height={{ base: '210px', md: '300px', lg: '330px' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          background={`radial-gradient(circle at 50% 45%, ${product.color}10 0%, transparent 68%)`}
        >

          {(state === 'out' || state === 'soon' || state === 'low') && (
            <Badge
              position="absolute"
              top={{ base: 3, md: 4 }}
              right={{ base: 3, md: 4 }}
              zIndex={3}
              px={2.5}
              py={1}
              borderRadius="full"
              bg="rgba(11, 11, 12, 0.8)"
              border="1px solid"
              borderColor={state === 'low' ? LIME : colors.ui.border}
              color={state === 'low' ? LIME : colors.text.muted}
              fontFamily="mono"
              fontSize="9px"
              fontWeight="500"
              letterSpacing="0.14em"
              textTransform="uppercase"
            >
              {STOCK_LABEL[state]}
            </Badge>
          )}

          {heavy && (
            <HStack
              position="absolute"
              top={{ base: 3, md: 4 }}
              left={{ base: 3, md: 4 }}
              zIndex={3}
              spacing={1.5}
            >
              <Box w="5px" h="5px" borderRadius="full" bg={LIME} />
              <Text fontFamily="mono" fontSize="9px" letterSpacing="0.14em"
                textTransform="uppercase" color={LIME}>
                Heavy float
              </Text>
            </HStack>
          )}

          {product.featuredImage ? (
            <Box
              as="img"
              src={product.featuredImage}
              alt={product.name}
              loading="lazy"
              maxW={{ base: '76%', md: '84%' }}
              maxH={{ base: '76%', md: '84%' }}
              objectFit="contain"
              opacity={dimmed ? 0.6 : 1}
              sx={{ transition: 'opacity 0.35s ease, transform 0.6s ease' }}
              _groupHover={{ transform: 'scale(1.03)' }}
            />
          ) : (
            // Deliberate, not a fallback. A piece we have not photographed says
            // so in one quiet line rather than pretending with a placeholder.
            <VStack spacing={2} px={6} textAlign="center">
              <Box w="46px" h="46px" borderRadius="sm" border="1px solid"
                borderColor={colors.ui.border} opacity={0.7} />
              <Text fontFamily="mono" fontSize="9px" letterSpacing="0.16em"
                textTransform="uppercase" color={colors.text.muted}>
                Not photographed yet
              </Text>
            </VStack>
          )}
        </Box>

        {/* label */}
        <VStack align="stretch" spacing={2} p={{ base: 4, md: 6 }}
          borderTop="1px solid" borderColor={colors.ui.border}>
          <Heading as="h3" fontSize={{ base: 'sm', md: 'lg' }} fontWeight="600"
            letterSpacing="-0.02em" color={colors.text.primary} noOfLines={1}
            sx={{ transition: 'color 0.3s ease' }} _groupHover={{ color: LIME }}>
            {product.name}
          </Heading>

          <Text fontFamily="mono" fontSize="9px" letterSpacing="0.16em"
            textTransform="uppercase" color={colors.text.muted} noOfLines={1}>
            {product.subtitle}
          </Text>

          <Text fontSize={{ base: 'xs', md: 'sm' }} color={colors.text.secondary}
            lineHeight="1.7" noOfLines={2} display={{ base: 'none', sm: '-webkit-box' }}>
            {product.description}
          </Text>

          <Text fontFamily="mono" fontSize={{ base: 'sm', md: 'md' }} fontWeight="500"
            color={colors.text.primary} pt={1}>
            ${product.price}
          </Text>
        </VStack>
      </MotionBox>
    );
  };

  return (
    <Box ref={ref} bg={colors.dark.black} scrollMarginTop="80px"
      pb={{ base: 12, md: 20 }}>
      <Container maxW={SHEET} px={RAIL} mx={0}>
        {ROOMS.map((room) => {
          const inRoom = productsInRoom(products, room.id)
            .sort((a, b) => floatWeight(b) - floatWeight(a));
          if (!inRoom.length) return null;

          return (
            <Box key={room.id} pt={{ base: 12, md: 16 }}>
              <HStack justify="space-between" align="baseline" flexWrap="wrap" rowGap={2}
                pb={{ base: 6, md: 8 }}>
                <HStack spacing={4} align="baseline">
                  <Heading as="h3" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="600"
                    letterSpacing="-0.03em" color={colors.text.primary}>
                    {room.name}
                  </Heading>
                  <Text fontSize={{ base: 'xs', md: 'sm' }} color={colors.text.muted}>
                    {room.line}
                  </Text>
                </HStack>
                <Text fontFamily="mono" fontSize="9px" letterSpacing="0.16em"
                  textTransform="uppercase" color={colors.text.muted}
                  display={{ base: 'none', md: 'block' }}>
                  {room.note}
                </Text>
              </HStack>

              <Grid
                templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                gap={{ base: 4, md: 6, lg: 8 }}
              >
                {inRoom.map((product, i) => (
                  <Card key={product.id} product={product} index={i} />
                ))}
              </Grid>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;
