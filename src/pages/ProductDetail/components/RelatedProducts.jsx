// src/pages/ProductDetail/components/RelatedProducts.jsx
// SENTINEL: NB_SHOP_RELATED_V2
//
// The row under a product. Three other pieces, drawn with the same ProductCard
// the home grid uses, so a shopper who came from the grid sees the same tile
// here and a shopper who landed on the product page from a link learns what
// the grid looks like before they get there.
//
// V1 had its own card with a yellow "Featured" badge, a category badge, a
// centred heading in 800 weight and a line of prose about "the same spirit of
// craft and innovation". All of that was the 2025 site. This is a left aligned
// room heading in the house voice and three cards.
//
// Which three: same room first, then the rest, never the product you are on.
// Same room because somebody on a shirt is more likely to want a shirt than a
// titanium cup, and a related row that ignores that is a random row.
//
// No oxford commas, no em dashes.

import { Box, Container, Grid, Heading, Text, HStack } from '@chakra-ui/react';
import { getAllProducts } from '../../../data/products';
import { colors } from '../../../theme/colors';
import { RAIL, SHEET } from '../../../theme/layout';
import ProductCard from '../../../components/shop/ProductCard';

const RelatedProducts = ({ currentProductId }) => {
  const all = getAllProducts();
  const current = all.find((p) => p.id === currentProductId);
  const others = all.filter((p) => p.id !== currentProductId);
  const sameRoom = current ? others.filter((p) => p.room === current.room) : [];
  const rest = others.filter((p) => !sameRoom.includes(p));
  const related = [...sameRoom, ...rest].slice(0, 3);

  if (!related.length) return null;

  return (
    <Box width="100%" py={{ base: 8, md: 12 }}>
      <Container maxW={SHEET} px={RAIL} mx={0}>
        <HStack justify="space-between" align="baseline" flexWrap="wrap" rowGap={2} pb={{ base: 5, md: 8 }}
          borderTop="1px solid" borderColor={colors.ui.border} pt={{ base: 10, md: 14 }}>
          <HStack spacing={4} align="baseline">
            <Heading as="h3" fontSize={{ base: 'xl', md: '2xl' }} fontWeight="600" letterSpacing="-0.03em"
              color={colors.text.primary}>
              Also carries float
            </Heading>
            <Text fontSize={{ base: 'xs', md: 'sm' }} color={colors.text.muted}>
              Three more from the yard.
            </Text>
          </HStack>
        </HStack>

        <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
          gap={{ base: 4, md: 6, lg: 8 }} rowGap={{ base: 8, md: 6, lg: 8 }}>
          {related.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default RelatedProducts;
