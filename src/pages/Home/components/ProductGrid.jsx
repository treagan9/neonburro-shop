// src/pages/Home/components/ProductGrid.jsx
// SENTINEL: NB_SHOP_GRID_V4
//
// Three rooms, not one grid. Worn, Carried, Sent. A room is entered rather than
// filtered, which is the difference between a boutique and a warehouse listing.
//
// V4 hands the tile itself to components/shop/ProductCard.jsx so the home grid
// and the related row on a product page are the same object. The card is now
// picture, name, one mono line. Stock, heavy float and the description moved
// to the product page where they have room to be said properly. Read the
// header of ProductCard.jsx for the reasoning.
//
// Each room section carries id="room-{id}" so the footer (and anything else)
// can land on it. The footer scrolls to these after navigating home.
//
// ORDERING IS NOT ALPHABETICAL AND IS NOT INSERTION ORDER. Digital used to sort
// first because it is spread first in ALL_PRODUCTS, so the store opened on a
// gift card. Rooms run Worn, Carried, Sent, and inside a room heavy float sorts
// up. See taxonomy.js.
//
// No oxford commas, no em dashes.

import { Box, Container, Grid, Heading, Text, HStack } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { getAllProducts } from '../../../data/products';
import { ROOMS, productsInRoom, floatWeight } from '../../../data/taxonomy';
import { colors } from '../../../theme/colors';
import { RAIL, SHEET } from '../../../theme/layout';
import ProductCard from '../../../components/shop/ProductCard';

const ProductGrid = forwardRef((props, ref) => {
  const products = getAllProducts();

  return (
    <Box ref={ref} bg={colors.dark.black} scrollMarginTop="80px" pb={{ base: 12, md: 20 }}>
      <Container maxW={SHEET} px={RAIL} mx={0}>
        {ROOMS.map((room) => {
          const inRoom = productsInRoom(products, room.id)
            .sort((a, b) => floatWeight(b) - floatWeight(a));
          if (!inRoom.length) return null;

          return (
            <Box key={room.id} id={`room-${room.id}`} pt={{ base: 12, md: 16 }} scrollMarginTop="96px">
              <HStack justify="space-between" align="baseline" flexWrap="wrap" rowGap={2}
                pb={{ base: 5, md: 8 }}>
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
                rowGap={{ base: 8, md: 6, lg: 8 }}
              >
                {inRoom.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
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
