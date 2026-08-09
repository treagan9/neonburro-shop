// src/pages/Home/index.jsx
// SENTINEL: NB_SHOP_HOME_V2
//
// The shop, reframed. Hunt first, goods second, and a quiet band between them
// that explains what float is so nobody arrives at a ninety nine dollar pair of
// chopsticks without a reason.
//
// The old hero sold the store. This one sells the reason the store exists, which
// is a real thing hidden on real ground in western Colorado. The product grid is
// unchanged and still four hundred pixels down. It has not lost its job. It has
// stopped being the argument.
//
// No oxford commas, no em dashes.

import { Box, Text, Heading, HStack, VStack, SimpleGrid } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import BlindLeadHero from './components/BlindLeadHero';
import ProductGrid from './components/ProductGrid';
import { HOW_IT_WORKS, HUNT } from '../../data/blindLead';
import { colors } from '../../theme/colors';
import { RAIL, SHEET } from '../../theme/layout';

const LIME = colors.accent.signal;

const Home = () => {
  const productsRef = useRef(null);

  const scrollToProducts = () => {
    if (!productsRef.current) return;
    window.scrollTo({ top: productsRef.current.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <Box bg={colors.dark.black} minH="100vh">
      <BlindLeadHero onScrollToProducts={scrollToProducts} />

      {/* ── what float is, before anybody sees a price ──────────────── */}
      <Box as="section" px={RAIL} py={{ base: 14, md: 20 }} maxW={SHEET}
        borderTop="1px solid" borderColor={colors.ui.border}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 8, md: 10 }}>
          {HOW_IT_WORKS.map((s, i) => (
            <VStack key={s.step} align="start" spacing={3}>
              <HStack spacing={3}>
                <Text fontFamily="mono" fontSize="11px" color={LIME}>
                  {String(i + 1).padStart(2, '0')}
                </Text>
                <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="600"
                  color={colors.text.primary} letterSpacing="-0.02em">
                  {s.step}
                </Text>
              </HStack>
              <Text fontSize="sm" color={colors.text.secondary} lineHeight="1.7">{s.body}</Text>
            </VStack>
          ))}
        </SimpleGrid>

        <HStack spacing={2} mt={{ base: 8, md: 10 }} as={RouterLink} to="/the-blind-lead/"
          role="group" textDecoration="none" color={colors.text.muted} w="fit-content"
          transition="color 0.25s ease" _hover={{ color: LIME, textDecoration: 'none' }}>
          <Text fontFamily="mono" fontSize="10px" fontWeight="500" letterSpacing="0.18em"
            textTransform="uppercase">
            the board, and the rules
          </Text>
          <Box as={FiArrowRight} boxSize={3} transition="transform 0.25s ease"
            _groupHover={{ transform: 'translateX(3px)' }} />
        </HStack>
      </Box>

      {/* ── the goods ───────────────────────────────────────────────── */}
      <Box as="section" px={RAIL} pt={{ base: 12, md: 18 }} maxW={SHEET}>
        <HStack justify="space-between" align="baseline" flexWrap="wrap" rowGap={3}
          pb={{ base: 6, md: 8 }} borderTop="1px solid" borderColor={colors.ui.border} pt={{ base: 12, md: 16 }}>
          <Heading as="h2" fontSize={{ base: '26px', md: '40px' }} fontWeight="600"
            letterSpacing="-0.03em" color={colors.text.primary} lineHeight="1.05">
            Everything here carries float.
          </Heading>
          <Text fontFamily="mono" fontSize="10px" letterSpacing="0.18em" textTransform="uppercase"
            color={colors.text.muted}>
            made to be kept
          </Text>
        </HStack>
      </Box>

      <ProductGrid ref={productsRef} />

      {/* ── the cheapest door ───────────────────────────────────────── */}
      <Box as="section" px={RAIL} pb={{ base: 20, md: 32 }} pt={{ base: 4, md: 8 }}
        maxW={SHEET}>
        <Box borderRadius="xl" p={{ base: 8, md: 14 }} border="1px solid"
          borderColor={colors.ui.border}
          background={`linear-gradient(120deg, ${colors.dark.gray} 0%, ${LIME}0E 60%, ${colors.dark.void} 100%)`}>
          <Text fontFamily="mono" fontSize="9px" fontWeight="500" letterSpacing="0.24em"
            textTransform="uppercase" color={LIME} mb={5}>
            No purchase necessary
          </Text>
          <Heading as="h2" fontSize={{ base: '24px', md: '40px' }} fontWeight="600"
            letterSpacing="-0.03em" lineHeight="1.1" color={colors.text.primary} maxW="760px" mb={5}>
            Buying a piece buys you a head start. It never buys access.
          </Heading>
          <Text fontSize={{ base: 'sm', md: 'md' }} color={colors.text.secondary} lineHeight="1.8"
            maxW="640px" mb={8}>
            Every float that ships on a product gets published free on the board after
            {' '}{HUNT.freeDelayDays} days. You can follow the whole hunt without spending a dollar,
            and you would be about a month behind. That is the entire difference.
          </Text>
          <HStack spacing={4} flexWrap="wrap" rowGap={3}>
            <Box as={RouterLink} to="/the-blind-lead/" display="inline-flex" alignItems="center"
              gap="8px" px={7} py={3.5} borderRadius="full" bg={LIME} color={colors.dark.black}
              fontWeight="700" fontSize="sm" textDecoration="none"
              transition="transform 0.25s ease, filter 0.25s ease"
              _hover={{ transform: 'translateY(-2px)', filter: 'brightness(1.08)', textDecoration: 'none' }}>
              The board <FiArrowRight />
            </Box>
            <Box as={RouterLink} to="/product/two-dollar-clue/" display="inline-flex"
              alignItems="center" gap="8px" px={7} py={3.5} borderRadius="full" border="1px solid"
              borderColor={colors.ui.border} color={colors.text.secondary} fontWeight="600"
              fontSize="sm" textDecoration="none"
              transition="border-color 0.25s ease, color 0.25s ease"
              _hover={{ borderColor: LIME, color: colors.text.primary, textDecoration: 'none' }}>
              Start with two dollars
            </Box>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
