// src/pages/BlindLead/index.jsx
// SENTINEL: NB_BLIND_LEAD_PAGE_V1
//
// The board. Cue keeps it, so this page is written in his register: patient,
// curious, never selling. It is the one page on the shop that is not trying to
// move a product, which is exactly why it will be the page people send to each
// other.
//
// Order is deliberate. What it is, how it works, the board itself, then the
// rules. The rules go last because nobody reads rules before they want
// something, and they are long because they are the actual product. Real
// treasure in real mountains needs a page like this before it needs a hero.
//
// Everything renders from blindLead.js so the board and the product pages can
// never disagree about what is out there.
//
// No oxford commas, no em dashes.

import { Box, Text, Heading, VStack, HStack, SimpleGrid } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { HUNT, HOW_IT_WORKS, RULES, FLOATS, floatCounts } from '../../data/blindLead';
import { getProduct } from '../../data/products';
import { colors } from '../../theme/colors';
import { RAIL, SHEET } from '../../theme/layout';

const MotionBox = motion(Box);
const LIME = colors.accent.signal;

const Kicker = ({ children, color = LIME, ...rest }) => (
  <Text fontFamily="mono" fontSize={{ base: '9px', md: '10px' }} fontWeight="500"
    letterSpacing="0.24em" textTransform="uppercase" color={color} {...rest}>
    {children}
  </Text>
);

const STATE_COPY = {
  queued: { label: 'not yet shipped', color: colors.text.muted },
  out: { label: 'in the world', color: LIME },
  found: { label: 'read', color: colors.accent.warm },
};

const FloatRow = ({ float }) => {
  const product = float.carrier ? getProduct(float.carrier) : null;
  const state = STATE_COPY[float.state] || STATE_COPY.queued;
  const clickable = Boolean(product);

  const inner = (
    <Box display="grid" gridTemplateColumns={{ base: '54px 1fr', md: '68px 1fr 160px' }}
      gap={{ base: 4, md: 8 }} alignItems="center" py={5}
      borderBottom="1px solid" borderColor={colors.ui.border}>
      <Text fontFamily="mono" fontSize={{ base: '12px', md: '14px' }} fontWeight="500"
        color={float.state === 'queued' ? colors.text.muted : LIME} letterSpacing="0.08em">
        {float.id}
      </Text>
      <Box minW={0}>
        <Text fontSize={{ base: 'sm', md: 'md' }} color={colors.text.primary} fontWeight="500"
          transition="color 0.25s ease" _groupHover={clickable ? { color: LIME } : {}}>
          {product ? product.name : 'Published on the board'}
        </Text>
        <Text fontSize="xs" color={colors.text.secondary} lineHeight="1.6" mt={1.5}>
          {float.note}
        </Text>
      </Box>
      <HStack justify={{ md: 'flex-end' }} gridColumn={{ base: '2', md: 'auto' }}>
        <Text fontFamily="mono" fontSize="9px" fontWeight="500" letterSpacing="0.18em"
          textTransform="uppercase" color={state.color}>
          {state.label}
        </Text>
      </HStack>
    </Box>
  );

  if (!clickable) return inner;
  return (
    <Box as={RouterLink} to={`/product/${float.carrier}/`} display="block" role="group"
      textDecoration="none" _hover={{ textDecoration: 'none' }}>
      {inner}
    </Box>
  );
};

const BlindLead = () => {
  const counts = floatCounts();

  return (
    <Box bg={colors.dark.black} minH="100vh">

      {/* ── what it is ──────────────────────────────────────────────── */}
      <Box as="section" px={RAIL} pt={{ base: 28, md: 40 }} pb={{ base: 16, md: 24 }}
        maxW={SHEET}>
        <MotionBox initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}>
          <Kicker mb={{ base: 4, md: 6 }}>{HUNT.region}</Kicker>
          <Heading as="h1" fontWeight="600" letterSpacing="-0.045em" lineHeight="0.92"
            color={colors.text.primary} fontSize={{ base: '46px', md: '84px', lg: '108px' }}
            mb={{ base: 6, md: 8 }}>
            The Blind
            <Box as="span" display="block">Lead</Box>
          </Heading>
          <Text fontSize={{ base: 'lg', md: '2xl' }} color={colors.text.primary} lineHeight="1.45"
            maxW="720px" mb={6}>
            A blind lead is an ore vein with no outcrop. Nothing on the surface tells you it is
            there. You do not find it by looking. You find it by knowing where to dig.
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md' }} color={colors.text.secondary} lineHeight="1.8"
            maxW="680px">
            There is real treasure out there, on public land, in western Colorado. Every piece we
            make carries one clue toward it. Kept by {HUNT.keeperName}, {HUNT.keeperEpithet}, who
            has never once given anybody a straight answer and is not about to start.
          </Text>
        </MotionBox>
      </Box>

      {/* ── how it works ────────────────────────────────────────────── */}
      <Box as="section" px={RAIL} py={{ base: 14, md: 20 }} maxW={SHEET}
        borderTop="1px solid" borderColor={colors.ui.border}>
        <Kicker mb={{ base: 8, md: 12 }} color={colors.text.muted}>How it works</Kicker>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 8, md: 10 }}>
          {HOW_IT_WORKS.map((s, i) => (
            <VStack key={s.step} align="start" spacing={4}>
              <HStack spacing={3}>
                <Text fontFamily="mono" fontSize="11px" color={LIME}>
                  {String(i + 1).padStart(2, '0')}
                </Text>
                <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="600" color={colors.text.primary}
                  letterSpacing="-0.02em">
                  {s.step}
                </Text>
              </HStack>
              <Text fontSize="sm" color={colors.text.secondary} lineHeight="1.75">{s.body}</Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Box>

      {/* ── the board ───────────────────────────────────────────────── */}
      <Box as="section" px={RAIL} py={{ base: 14, md: 20 }} maxW={SHEET}
        borderTop="1px solid" borderColor={colors.ui.border}>
        <HStack justify="space-between" align="baseline" flexWrap="wrap" rowGap={3}
          mb={{ base: 8, md: 10 }}>
          <Kicker color={colors.text.muted}>The board</Kicker>
          <HStack spacing={6} fontFamily="mono" fontSize="10px" letterSpacing="0.16em"
            textTransform="uppercase">
            <Text color={LIME}>{counts.out} in the world</Text>
            <Text color={colors.accent.warm}>{counts.found} read</Text>
            <Text color={colors.text.muted}>{counts.total} total</Text>
          </HStack>
        </HStack>

        <Box borderTop="1px solid" borderColor={colors.ui.border}>
          {FLOATS.map((f) => <FloatRow key={f.id} float={f} />)}
        </Box>

        <Text fontSize="sm" color={colors.text.muted} lineHeight="1.8" mt={8} maxW="680px">
          {HUNT.opensNote} Every float released on a piece is published free here after
          {' '}{HUNT.freeDelayDays} days. Buying something buys you a head start. It never buys access.
        </Text>
      </Box>

      {/* ── the rules ───────────────────────────────────────────────── */}
      <Box as="section" px={RAIL} py={{ base: 16, md: 24 }} maxW={SHEET}
        borderTop="1px solid" borderColor={colors.ui.border}>
        <Box display="grid" gridTemplateColumns={{ base: '1fr', lg: '300px 1fr' }}
          gap={{ base: 8, lg: 16 }}>
          <Box>
            <Kicker mb={5}>The rules</Kicker>
            <Text fontSize={{ base: 'md', md: 'lg' }} color={colors.text.primary} lineHeight="1.5"
              fontWeight="500" mb={4}>
              Read these before you go anywhere.
            </Text>
            <Text fontSize="sm" color={colors.text.secondary} lineHeight="1.8">
              Other treasure hunts have gotten people killed. That is not a hypothetical and it is
              not a liability line. These rules exist so this one cannot, they are dated, and they
              live in the public record where we cannot quietly edit them after the fact.
            </Text>
          </Box>

          <VStack align="stretch" spacing={0} borderTop="1px solid" borderColor={colors.ui.border}>
            {RULES.map((r, i) => (
              <Box key={r.id} py={6} borderBottom="1px solid" borderColor={colors.ui.border}>
                <HStack spacing={4} align="start">
                  <Text fontFamily="mono" fontSize="11px" color={LIME} pt={1} flexShrink={0}>
                    {String(i + 1).padStart(2, '0')}
                  </Text>
                  <Box>
                    <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="600"
                      color={colors.text.primary} letterSpacing="-0.01em" mb={2}>
                      {r.rule}
                    </Text>
                    <Text fontSize="sm" color={colors.text.secondary} lineHeight="1.75">
                      {r.detail}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>

      {/* ── the cheapest door ───────────────────────────────────────── */}
      <Box as="section" px={RAIL} pb={{ base: 20, md: 32 }} maxW={SHEET}>
        {/* A plate on desktop, a plain section on a phone. Same rule as the
            home page band, no containers around content on mobile. */}
        <Box borderRadius={{ base: 0, md: 'xl' }} overflow="hidden" p={{ base: 0, md: 14 }} pt={{ base: 10, md: 14 }}
          border={{ base: 'none', md: '1px solid' }} borderTop="1px solid" borderColor={colors.ui.border}
          background={{ base: 'none', md: `linear-gradient(120deg, ${colors.dark.gray} 0%, ${LIME}0E 60%, ${colors.dark.void} 100%)` }}>
          <Kicker mb={5}>Two dollars</Kicker>
          <Heading as="h2" fontSize={{ base: '26px', md: '44px' }} fontWeight="600"
            letterSpacing="-0.03em" lineHeight="1.08" color={colors.text.primary} maxW="720px" mb={5}>
            The cheapest way in is a two dollar envelope.
          </Heading>
          <Text fontSize={{ base: 'sm', md: 'md' }} color={colors.text.secondary} lineHeight="1.8"
            maxW="620px" mb={8}>
            It carries the first float and it explains the vocabulary. You do not need it. Everything
            in it reaches the board eventually. It just reaches you first.
          </Text>
          <HStack spacing={4} flexWrap="wrap" rowGap={3}>
            <Box as={RouterLink} to="/product/two-dollar-clue/" display="inline-flex"
              alignItems="center" gap="8px" px={7} py={3.5} borderRadius="full" bg={LIME}
              color={colors.dark.black} fontWeight="700" fontSize="sm" textDecoration="none"
              transition="transform 0.25s ease, filter 0.25s ease"
              _hover={{ transform: 'translateY(-2px)', filter: 'brightness(1.08)', textDecoration: 'none' }}>
              The $2 Clue <FiArrowRight />
            </Box>
            <Box as={RouterLink} to="/" display="inline-flex" alignItems="center" gap="8px"
              px={7} py={3.5} borderRadius="full" border="1px solid" borderColor={colors.ui.border}
              color={colors.text.secondary} fontWeight="600" fontSize="sm" textDecoration="none"
              transition="border-color 0.25s ease, color 0.25s ease"
              _hover={{ borderColor: LIME, color: colors.text.primary, textDecoration: 'none' }}>
              Everything that carries float
            </Box>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default BlindLead;
