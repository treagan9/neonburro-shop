// src/pages/Home/components/BlindLeadHero.jsx
// SENTINEL: NB_SHOP_HERO_V2
//
// The shop leads with the hunt, not the merchandise. That is the whole revamp in
// one decision.
//
// A store that opens with a product grid is asking to be compared on price. A
// store that opens with a reason is asking to be understood, and a stranger who
// understands the reason will pay ninety nine dollars for chopsticks without
// blinking. The grid is still four hundred pixels down. It has not gone
// anywhere. It just is not the argument any more.
//
// Nothing here animates for the sake of it. The one moving element is the float
// dot, because that is the thing we want a stranger to learn to look for.
//
// THE STAT ROW IS GONE ON PURPOSE. It read "00 in the world" and "0 purchase
// necessary" side by side, which a stranger parses as a store with nothing in
// it. Counters that can legitimately sit at zero do not belong above the fold
// of a shop that has not shipped its first run. The numbers still live on the
// board, where zero means "not started" instead of "empty".
//
// No oxford commas, no em dashes.

import { Box, Text, Heading, HStack, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { HUNT } from '../../../data/blindLead';
import { colors } from '../../../theme/colors';
import { RAIL, SHEET } from '../../../theme/layout';

const MotionBox = motion(Box);
const LIME = colors.accent.signal;

const BlindLeadHero = ({ onScrollToProducts }) => {

  return (
    <Box as="section" position="relative" overflow="hidden"
      minH={{ base: 'auto', md: '92vh' }} display="flex" alignItems="center"
      pt={{ base: 28, md: 0 }} pb={{ base: 16, md: 0 }}
      sx={{ background: `linear-gradient(118deg, ${colors.dark.void} 0%, ${LIME}0C 44%, ${colors.dark.black} 100%)` }}>

      <Box position="absolute" aria-hidden="true" top={{ base: '-8%', md: '6%' }}
        right={{ base: '-24%', md: '2%' }} w={{ base: '380px', md: '720px' }}
        h={{ base: '380px', md: '720px' }}
        sx={{ background: `radial-gradient(circle, ${LIME}1E 0%, ${LIME}08 46%, transparent 72%)`,
              filter: 'blur(18px)' }} />

      <Box px={RAIL} maxW={SHEET} w="100%" position="relative" zIndex={1}>
        <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>

          <HStack spacing={3} mb={{ base: 5, md: 7 }}>
            <Box w="7px" h="7px" borderRadius="full" bg={LIME} flexShrink={0}
              sx={{ boxShadow: `0 0 12px ${LIME}`,
                    animation: 'nbFloat 3.4s ease-in-out infinite',
                    '@keyframes nbFloat': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.35 } } }} />
            <Text fontFamily="mono" fontSize={{ base: '9px', md: '10px' }} fontWeight="500"
              letterSpacing="0.24em" textTransform="uppercase" color={LIME}>
              {HUNT.region}
            </Text>
          </HStack>

          <Heading as="h1" fontWeight="600" letterSpacing="-0.045em" lineHeight="0.9"
            color={colors.text.primary} fontSize={{ base: '42px', md: '76px', lg: '96px' }}
            maxW="1100px" mb={{ base: 6, md: 8 }}>
            Every piece we make
            <Box as="span" display="block" color={LIME}>carries a clue.</Box>
          </Heading>

          <Text fontSize={{ base: 'md', md: 'xl' }} color={colors.text.primary} lineHeight="1.55"
            maxW="640px" mb={5}>
            There is real treasure on public land in western Colorado. The cups, the shirts, the
            two dollar envelope. Each one carries a fragment pointing at it.
          </Text>

          <Text fontSize={{ base: 'sm', md: 'md' }} color={colors.text.secondary} lineHeight="1.8"
            maxW="580px" mb={{ base: 9, md: 11 }}>
            Prospectors call that float. Loose ore you find downstream that proves a vein exists
            somewhere above you. Follow enough of it and you are standing on {HUNT.name}.
          </Text>

          <HStack spacing={4} flexWrap="wrap" rowGap={3} mb={{ base: 10, md: 14 }}>
            <Box as={RouterLink} to="/the-blind-lead/" display="inline-flex" alignItems="center"
              gap="9px" px={7} py={4} borderRadius="full" bg={LIME} color={colors.dark.black}
              fontWeight="700" fontSize={{ base: 'sm', md: 'md' }} textDecoration="none"
              transition="transform 0.25s ease, filter 0.25s ease"
              _hover={{ transform: 'translateY(-2px)', filter: 'brightness(1.08)', textDecoration: 'none' }}>
              How the hunt works <FiArrowRight />
            </Box>
            <Box as="button" onClick={onScrollToProducts} display="inline-flex" alignItems="center"
              gap="9px" px={7} py={4} borderRadius="full" border="1px solid"
              borderColor={colors.ui.border} color={colors.text.secondary} fontWeight="600"
              fontSize={{ base: 'sm', md: 'md' }}
              transition="border-color 0.25s ease, color 0.25s ease"
              _hover={{ borderColor: LIME, color: colors.text.primary }}>
              See what carries it <FiArrowDown />
            </Box>
          </HStack>

        </MotionBox>
      </Box>
    </Box>
  );
};

export default BlindLeadHero;
