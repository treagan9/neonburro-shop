// src/pages/ProductDetail/components/ProductStory.jsx
// SENTINEL: NB_SHOP_PRODUCT_STORY_V2
//
// The part of a product page under the buy box: the story, the note about
// the colour when there is one, then materials, care and dimensions.
//
// ── V1 was boxes inside a centred box ───────────────────────────────────────
// A 1200px centred container (the only centred thing on either domain), a
// tinted plate for the story with a twenty rem letter ghosted behind it, three
// more plates for materials, care and dimensions, and a final italic plate
// that said "Built to last. Made to matter." On a phone that was five boxes
// stacked inside the screen, each one narrowing the text a little more.
//
// V2 is text on the page. Left aligned on the same rail as everything else,
// a mono kicker over each part, hairlines between them, and on desktop the
// facts (materials, care, dimensions) run in columns to the right of the
// story. No plates on any width. The italic sign off is gone, the footer says
// where things are made and says it once.
//
// No oxford commas, no em dashes.

import { Box, Container, Grid, GridItem, Text, VStack, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { colors } from '../../../theme/colors';
import { RAIL, SHEET } from '../../../theme/layout';

const MotionBox = motion(Box);
const LIME = colors.accent.signal;

const Kicker = ({ children, color = colors.text.muted }) => (
  <Text fontFamily="mono" fontSize="10px" fontWeight="500" letterSpacing="0.18em"
    textTransform="uppercase" color={color} mb={3}>
    {children}
  </Text>
);

const ProductStory = ({ product }) => {
  const tint = product.color || LIME;
  const facts = [
    product.materials && { key: 'materials', label: 'Materials', list: product.materials },
    product.care && { key: 'care', label: 'Care', body: product.care },
    product.dimensions && { key: 'dimensions', label: 'Dimensions', body: product.dimensions },
  ].filter(Boolean);

  return (
    <Box width="100%" py={{ base: 4, md: 8 }}>
      <Container maxW={SHEET} px={RAIL} mx={0}>
        <MotionBox initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          borderTop="1px solid" borderColor={colors.ui.border} pt={{ base: 10, md: 14 }}>

          <Grid templateColumns={{ base: '1fr', lg: '1.15fr 0.85fr' }} gap={{ base: 10, lg: 20 }} alignItems="start">
            <GridItem>
              <Kicker color={tint}>The story</Kicker>
              <Text color={colors.text.primary} fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.75" maxW="680px">
                {product.story}
              </Text>

              {/* The natural dye note. A promise about variance, and it sits
                  here on purpose. Somebody who reads it after opening the box
                  feels misled, somebody who reads it here feels let in. */}
              {product.dyeNote && (
                <Box mt={{ base: 8, md: 10 }} pl={4} borderLeft="2px solid" borderColor={tint}>
                  <Kicker color={tint}>About the colour</Kicker>
                  <Text color={colors.text.secondary} fontSize={{ base: 'sm', md: 'md' }} lineHeight="1.7" maxW="600px">
                    {product.dyeNote}
                  </Text>
                </Box>
              )}
            </GridItem>

            {facts.length > 0 && (
              <GridItem>
                <VStack align="stretch" spacing={{ base: 7, md: 8 }} pt={{ base: 2, lg: 0 }}
                  borderTop={{ base: '1px solid', lg: 'none' }} borderColor={colors.ui.border}
                  mt={{ base: 2, lg: 0 }} sx={{ '& > *:first-of-type': { pt: { base: 7, lg: 0 } } }}>
                  {facts.map((f) => (
                    <Box key={f.key}>
                      <Kicker>{f.label}</Kicker>
                      {f.list ? (
                        <VStack align="start" spacing={2}>
                          {f.list.map((item) => (
                            <HStack key={item} spacing={3} align="start">
                              <Box mt="8px" w="4px" h="4px" borderRadius="full" bg={tint} flexShrink={0} />
                              <Text color={colors.text.secondary} fontSize="sm" lineHeight="1.6">{item}</Text>
                            </HStack>
                          ))}
                        </VStack>
                      ) : (
                        <Text color={colors.text.secondary} fontSize="sm" lineHeight="1.7">{f.body}</Text>
                      )}
                    </Box>
                  ))}
                </VStack>
              </GridItem>
            )}
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ProductStory;
