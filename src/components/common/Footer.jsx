// src/components/common/Footer.jsx
// SENTINEL: NB_SHOP_FOOTER_V2
//
// The shop's close. Same skeleton as neonburro.com's footer (wordmark spine,
// Ridgway and altitude, link columns edge to edge, lime hairline, the sign off
// row that says whose property this is) so a visitor crossing domains feels
// one house. Three things are the shop's own:
//
// ── the wordmark goes home ──────────────────────────────────────────────────
// On the studio the wordmark reloads the studio. Here it leaves for
// neonburro.com. The shop is a room in the yard, and the way out of a room is
// through the door you came in.
//
// ── the vending row ─────────────────────────────────────────────────────────
// Above the link columns, three slots labelled the way a machine labels its
// shelf: A1, A2, A3. The Map (which is the hunt this whole store hangs off),
// The Vending Network (the studio's row of machines that talk back) and
// NEONBURRO on Solana (the record). It is the yard dispensing what it is
// building, one line each, and it is the only place on the shop that says the
// studio makes more than shirts. On desktop the three sit side by side under
// one hairline shelf. On a phone they stack, hairlines between, no boxes.
//
// ── what is gone ────────────────────────────────────────────────────────────
// V1 said "© AetherLabs" in the sign off. Nobody here is AetherLabs. It also
// carried a gradient link for the lounge, cyan and Solana green link colours,
// and a "Powered by" lockup. All of that was the 2025 site. One accent, lime,
// spent on the dot and the hairline.
//
// The scroll to top button sits above the saddlebag pill, not on top of it.
// The pill owns the bottom right corner on every page that has a cart.
//
// No oxford commas, no em dashes.

import { Box, VStack, HStack, Text, Link, IconButton, SimpleGrid, Grid, GridItem } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiArrowUp, FiInstagram, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { RiTwitterXLine } from 'react-icons/ri';
import { useState, useEffect } from 'react';
import { colors } from '../../theme/colors';
import { RAIL, EASE } from '../../theme/layout';

const MotionBox = motion(Box);
const LIME = colors.accent.signal;
const MAIN = 'https://neonburro.com';

const Kicker = ({ children, color = colors.text.muted, mb = 4 }) => (
  <Text fontFamily="mono" fontSize="10px" fontWeight="500" letterSpacing="0.16em"
    textTransform="uppercase" color={color} mb={mb}>
    {children}
  </Text>
);

// One link component for both internal routes and the studio. Internal ones
// go through the router so the cart context survives, external ones are plain
// anchors in the same tab. The shop and the studio are one house, opening a
// new tab between rooms is odd.
const FooterLink = ({ href, to, onClick, children }) => {
  const style = {
    fontSize: 'sm', fontWeight: '500', color: colors.text.secondary, display: 'inline-block',
    transition: `color 220ms ${EASE}`, _hover: { color: colors.text.primary, textDecoration: 'none' },
  };
  if (onClick) return <Box as="button" type="button" textAlign="left" onClick={onClick} {...style}>{children}</Box>;
  if (to) return <Link as={RouterLink} to={to} {...style}>{children}</Link>;
  return <Link href={href} {...style}>{children}</Link>;
};

const SLOTS = [
  {
    slot: 'A1',
    title: 'The Map',
    line: 'One map, two views. The airship reads the country from above, the characters walk it from the ground. This store hangs off it.',
    to: '/the-blind-lead/',
    cta: 'the board',
  },
  {
    slot: 'A2',
    title: 'The Vending Network',
    line: 'A short row of machines that talk back. One or two ingredients per can, nothing that needs a paragraph to explain itself.',
    href: `${MAIN}/lab/`,
    cta: 'in the lab',
  },
  {
    slot: 'A3',
    title: 'NEONBURRO on Solana',
    line: 'One mint, one steward, one narrow promise. Value moves. History remains. The record is public and Epoch keeps it.',
    href: `${MAIN}/token/neonburro/`,
    cta: 'the record',
  },
];

const Slot = ({ s }) => {
  const Inner = (
    <VStack align="start" spacing={3} py={{ base: 6, md: 0 }} px={{ md: 0 }} h="100%" role="group">
      <HStack spacing={3} align="baseline">
        <Text fontFamily="mono" fontSize="10px" letterSpacing="0.2em" color={LIME}>{s.slot}</Text>
        <Text fontSize="md" fontWeight="600" letterSpacing="-0.02em" color={colors.text.primary}
          transition={`color 220ms ${EASE}`} _groupHover={{ color: LIME }}>
          {s.title}
        </Text>
      </HStack>
      <Text fontSize="sm" color={colors.text.secondary} lineHeight="1.7" maxW="360px">{s.line}</Text>
      <HStack spacing={2} color={colors.text.muted} transition={`color 220ms ${EASE}`} _groupHover={{ color: LIME }}>
        <Text fontFamily="mono" fontSize="10px" letterSpacing="0.16em" textTransform="uppercase">{s.cta}</Text>
        <Box as={s.href ? FiArrowUpRight : FiArrowRight} boxSize={3} transition={`transform 220ms ${EASE}`}
          _groupHover={{ transform: s.href ? 'translate(2px, -2px)' : 'translateX(3px)' }} />
      </HStack>
    </VStack>
  );
  const shared = { display: 'block', textDecoration: 'none', _hover: { textDecoration: 'none' } };
  return s.to
    ? <Box as={RouterLink} to={s.to} {...shared}>{Inner}</Box>
    : <Box as="a" href={s.href} {...shared}>{Inner}</Box>;
};

const Footer = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Rooms live on the home page as id="room-{id}". From anywhere else, go
  // home first, then scroll once the grid has mounted.
  const goToRoom = (id) => () => {
    const scroll = () => document.getElementById(`room-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (pathname === '/') { scroll(); return; }
    navigate('/');
    setTimeout(scroll, 420);
  };

  const columns = [
    {
      heading: 'The shop',
      links: [
        { label: 'Worn', onClick: goToRoom('worn') },
        { label: 'Carried', onClick: goToRoom('carried') },
        { label: 'Sent', onClick: goToRoom('sent') },
        { label: 'The $2 Clue', to: '/product/two-dollar-clue/' },
        { label: 'The Pay Card', to: '/product/digital-gift-card/' },
        { label: 'Saddlebag', to: '/cart/' },
      ],
    },
    {
      heading: 'The hunt',
      links: [
        { label: 'How it works', to: '/the-blind-lead/' },
        { label: 'The board', to: '/the-blind-lead/' },
        { label: 'The rules', to: '/the-blind-lead/' },
        { label: 'Four floats, two dollars', to: '/product/two-dollar-clue/' },
      ],
    },
    {
      heading: 'The yard',
      links: [
        { label: 'neonburro.com', href: `${MAIN}/` },
        { label: 'The Lab', href: `${MAIN}/lab/` },
        { label: 'The Burros', href: `${MAIN}/burros/` },
        { label: 'Pulse', href: 'https://pulse.neonburro.com/' },
        { label: 'Order local food', href: 'https://order.neonburro.com/' },
        { label: 'Have one built', href: `${MAIN}/contact/` },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'FAQ', href: `${MAIN}/faq/` },
        { label: 'Privacy', href: `${MAIN}/privacy/` },
        { label: 'Terms', href: `${MAIN}/terms/` },
      ],
    },
  ];

  const socials = [
    { Icon: FiInstagram, href: 'https://www.instagram.com/neonburro', label: 'Instagram' },
    { Icon: RiTwitterXLine, href: 'https://x.com/neonburro', label: 'X' },
    { Icon: FiGithub, href: 'https://github.com/neonburro', label: 'GitHub' },
    { Icon: FiLinkedin, href: 'https://linkedin.com/company/neonburro', label: 'LinkedIn' },
  ];

  return (
    <Box as="footer" bg={colors.dark.void} borderTop="1px solid" borderColor={colors.ui.border} position="relative">
      <Box px={RAIL} py={{ base: 14, md: 20 }}>

        {/* ── brand and the vending row ─────────────────────────────────── */}
        <Grid templateColumns={{ base: '1fr', lg: '320px 1fr' }} gap={{ base: 12, lg: 20 }} mb={{ base: 12, md: 16 }}>
          <GridItem>
            <Box as="a" href={MAIN} aria-label="neonburro, back to the studio" display="block" mb={5}
              _hover={{ '& .nb-dot': { transform: 'scale(1.25)' }, textDecoration: 'none' }}>
              <Text fontFamily="heading" fontSize={{ base: '4xl', md: '5xl' }} fontWeight="600" letterSpacing="-0.04em"
                lineHeight="1" color={colors.text.primary} display="inline-flex" alignItems="flex-end">
                neonburro
                <Box as="span" className="nb-dot" display="inline-block" w="0.16em" h="0.16em" borderRadius="full"
                  bg={LIME} ml="0.03em" mb="0.08em" transition={`transform 300ms ${EASE}`} />
              </Text>
            </Box>
            <Kicker mb={1}>Ridgway, Colorado</Kicker>
            <Kicker color={LIME} mb={6}>Built at altitude · the shop</Kicker>

            <Text fontSize="sm" color={colors.text.secondary} lineHeight="1.7" maxW="300px" mb={6}>
              You are standing in a demo. Every part of this store was built by hand by the studio, the checkout,
              the inventory, the saddlebag, the hunt. It sells real things and it is also the pitch.
            </Text>

            <VStack align="flex-start" spacing={2}>
              <Link href="mailto:hello@neonburro.com" fontSize="sm" fontWeight="500" color={colors.text.secondary}
                _hover={{ color: colors.text.primary, textDecoration: 'none' }} transition={`color 220ms ${EASE}`}>
                hello@neonburro.com
              </Link>
              <Link href="tel:+19709738550" fontSize="sm" fontWeight="500" color={colors.text.secondary}
                _hover={{ color: colors.text.primary, textDecoration: 'none' }} transition={`color 220ms ${EASE}`}>
                (970) 973-8550
              </Link>
            </VStack>
          </GridItem>

          <GridItem>
            <Kicker>The yard, dispensing</Kicker>
            <Box borderTop="1px solid" borderColor={`${LIME}55`} pt={{ md: 6 }}>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 0, md: 10 }}
                sx={{ '& > *:not(:last-of-type)': { borderBottom: { base: '1px solid', md: 'none' }, borderColor: colors.ui.border } }}>
                {SLOTS.map((s) => <Slot key={s.slot} s={s} />)}
              </SimpleGrid>
            </Box>
          </GridItem>
        </Grid>

        {/* ── link columns ─────────────────────────────────────────────── */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacingX={{ base: 6, md: 8 }} spacingY={{ base: 10, md: 8 }}
          pt={{ base: 10, md: 12 }} borderTop="1px solid" borderColor={colors.ui.border}>
          {columns.map((col) => (
            <Box key={col.heading}>
              <Kicker>{col.heading}</Kicker>
              <VStack align="flex-start" spacing={2.5}>
                {col.links.map((l) => (
                  <FooterLink key={l.label} href={l.href} to={l.to} onClick={l.onClick}>{l.label}</FooterLink>
                ))}
              </VStack>
              {col.heading === 'Legal' && (
                <HStack spacing={4} mt={7}>
                  {socials.map(({ Icon, href, label }) => (
                    <Box key={label} as="a" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      color={colors.text.muted} lineHeight={0} transition={`color 220ms ${EASE}`} _hover={{ color: LIME }}>
                      <Icon size={16} />
                    </Box>
                  ))}
                </HStack>
              )}
            </Box>
          ))}
        </SimpleGrid>

        {/* ── lime hairline and the sign off ───────────────────────────── */}
        <Box h="1px" bg={LIME} opacity={0.35} mt={{ base: 12, md: 16 }} mb={6} />
        <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} justifyContent="space-between"
          alignItems={{ base: 'flex-start', md: 'center' }} gap={{ base: 3, md: 6 }}>
          <Text fontFamily="mono" fontSize="10px" fontWeight="500" letterSpacing="0.16em" color={colors.text.muted}>
            neonburro shop · v.{year}
          </Text>
          <HStack spacing={2} align="center">
            <Box w="4px" h="4px" borderRadius="full" bg={LIME} aria-hidden="true" />
            <Text fontFamily="mono" fontSize="10px" fontWeight="500" letterSpacing="0.16em" textTransform="uppercase"
              color={colors.text.muted}>
              A property of <Box as="span" color={colors.text.secondary}>The Burroship</Box>
            </Text>
          </HStack>
          <Text fontFamily="mono" fontSize="10px" fontWeight="500" letterSpacing="0.16em" textTransform="uppercase"
            color={colors.text.muted}>
            © {year} · All rights reserved
          </Text>
        </Box>
      </Box>

      <AnimatePresence>
        {showScrollTop && (
          <MotionBox position="fixed" bottom={{ base: '84px', md: '96px' }} right={{ base: 5, md: 10 }}
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2 }} zIndex={999}>
            <IconButton icon={<FiArrowUp size={16} />} aria-label="Scroll to top" size="md" w="40px" h="40px" minW="40px"
              borderRadius="full" bg={`${colors.dark.black}E6`} color={colors.text.muted} border="1px solid" borderColor={colors.ui.border}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              _hover={{ borderColor: LIME, color: LIME, bg: colors.dark.black }}
              transition={`border-color 220ms ${EASE}, color 220ms ${EASE}, background 220ms ${EASE}`}
              sx={{ backdropFilter: 'blur(8px)' }} />
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Footer;
