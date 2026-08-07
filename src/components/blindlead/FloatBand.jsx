// src/components/blindlead/FloatBand.jsx
// SENTINEL: NB_FLOAT_BAND_V1
//
// The line on a product page that says this piece carries float. It never says
// which float, or where, or what it means. It says that there is one, and it
// says it quietly, the way a maker's mark is quiet.
//
// That restraint is the whole design. A clue announced in a yellow box is not a
// clue, it is a promotion. A clue is something you notice on the third wearing.
//
// Renders nothing for a product with no float, so the component can sit in the
// template unconditionally.
//
// No oxford commas, no em dashes.

import { Box, Text, HStack, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { floatFor, HUNT } from '../../data/blindLead';
import { colors } from '../../theme/colors';

const LIME = colors.accent.signal;

const FloatBand = ({ productId, compact = false }) => {
  const float = floatFor(productId);
  if (!float) return null;

  if (compact) {
    return (
      <HStack spacing={2} align="center">
        <Box w="5px" h="5px" borderRadius="full" bg={LIME} flexShrink={0}
          sx={{ boxShadow: `0 0 8px ${LIME}` }} />
        <Text fontFamily="mono" fontSize="9px" fontWeight="500" letterSpacing="0.2em"
          textTransform="uppercase" color={colors.text.muted}>
          carries float
        </Text>
      </HStack>
    );
  }

  return (
    <Box as={RouterLink} to="/the-blind-lead/" display="block" role="group" textDecoration="none"
      borderTop="1px solid" borderBottom="1px solid" borderColor={colors.ui.border}
      py={{ base: 6, md: 8 }} my={{ base: 8, md: 12 }}
      transition="border-color 0.35s ease"
      _hover={{ borderColor: `${LIME}55`, textDecoration: 'none' }}>
      <HStack spacing={{ base: 4, md: 8 }} align="start" justify="space-between" flexWrap="wrap" rowGap={4}>
        <VStack align="start" spacing={3} maxW="620px">
          <HStack spacing={2.5}>
            <Box w="6px" h="6px" borderRadius="full" bg={LIME} flexShrink={0}
              sx={{ boxShadow: `0 0 10px ${LIME}` }} />
            <Text fontFamily="mono" fontSize="9px" fontWeight="500" letterSpacing="0.24em"
              textTransform="uppercase" color={LIME}>
              this piece carries float
            </Text>
          </HStack>
          <Text fontSize={{ base: 'md', md: 'lg' }} color={colors.text.primary} lineHeight="1.5"
            fontWeight="500">
            One clue, worked into the object. We are not going to tell you where.
          </Text>
          <Text fontSize="sm" color={colors.text.secondary} lineHeight="1.7">
            Float is the loose ore you find downstream that proves a vein exists uphill. Every piece
            we make carries a piece of it, and enough float together points at {HUNT.name}, which is
            real, buried nowhere and sitting on public land in western Colorado.
          </Text>
        </VStack>

        <HStack spacing={2} color={colors.text.muted} flexShrink={0} pt={{ md: 8 }}
          transition="color 0.25s ease" _groupHover={{ color: LIME }}>
          <Text fontFamily="mono" fontSize="10px" fontWeight="500" letterSpacing="0.18em"
            textTransform="uppercase">
            read the rules
          </Text>
          <Box as={FiArrowRight} boxSize={3} transition="transform 0.25s ease"
            _groupHover={{ transform: 'translateX(3px)' }} />
        </HStack>
      </HStack>
    </Box>
  );
};

export default FloatBand;
