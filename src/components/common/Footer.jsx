import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Link,
  IconButton,
  Button,
  Divider,
  Image,
  SimpleGrid,
  keyframes
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGithub,
  FiLinkedin,
  FiArrowUp,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiInstagram
} from 'react-icons/fi';
import { RiTwitterXLine } from 'react-icons/ri';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);

const colors = {
  brand: {
    primary: '#00E5E5',
    teal: '#14F195',
  },
  accent: {
    neon: '#39FF14',
    banana: '#FFE500',
    warm: '#FF6B00',
    purple: '#8B5CF6',
    indigo: '#6366F1',
    pink: '#FF00FF',
    cyan: '#00FFFF'
  },
  dark: {
    black: '#0A0A0A',
    space: '#1A1A1A',
  }
};

const glow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 20px rgba(0, 229, 229, 0.6)) brightness(1.2);
  }
  50% {
    filter: drop-shadow(0 0 35px rgba(0, 229, 229, 0.9)) brightness(1.4);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 15px rgba(57, 255, 20, 0.5));
    transform: scale(1);
  }
  50% {
    filter: drop-shadow(0 0 30px rgba(57, 255, 20, 0.8));
    transform: scale(1.05);
  }
`;

const MAIN_DOMAIN = 'https://neonburro.com';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainLinks = [
    { label: 'Home', href: `${MAIN_DOMAIN}/` },
    { label: 'Services', href: `${MAIN_DOMAIN}/services/` },
    { label: 'Work', href: `${MAIN_DOMAIN}/work/` },
    { label: 'Lab', href: `${MAIN_DOMAIN}/lab/` },
    { label: 'About', href: `${MAIN_DOMAIN}/about/` },
    { label: 'Blog', href: `${MAIN_DOMAIN}/blog/` },
    { label: 'Contact', href: `${MAIN_DOMAIN}/contact/` }
  ];

  const serviceLinks = [
    {
      label: 'Fuel Up Hours',
      href: `${MAIN_DOMAIN}/invoice/`,
      color: 'white',
      hoverColor: '#FFFFFF'
    },
    {
      label: 'Build Subscriptions',
      href: `${MAIN_DOMAIN}/subscription/`,
      color: colors.accent.warm,
      hoverColor: '#FF8533'
    },
    {
      label: 'Hosting Services',
      href: `${MAIN_DOMAIN}/hosting/`,
      color: colors.accent.banana,
      hoverColor: '#FFEE33'
    }
  ];

  const networkLinks = [
    {
      label: 'Neon Merch',
      href: 'https://shop.neonburro.com',
      color: colors.accent.pink,
      hoverColor: '#FF33FF',
      external: true
    },
    {
      label: 'Order Local Food',
      href: 'https://order.neonburro.com',
      color: colors.accent.warm,
      hoverColor: '#FF8533',
      external: true
    },
    {
      label: 'Lounge Access',
      href: 'https://lounge.neonburro.com',
      gradient: 'linear(to-r, #14F195, #8B5CF6)',
      external: true
    }
  ];

  const communityLinks = [
    {
      label: 'The Burros',
      href: `${MAIN_DOMAIN}/collective/`,
      gradient: 'linear(to-r, #6366F1, #8B5CF6, #FFE500)'
    },
    {
      label: 'How NBR Works',
      href: `${MAIN_DOMAIN}/how-it-works/`,
      color: colors.accent.cyan,
      hoverColor: '#33FFFF'
    },
    {
      label: 'NBR Token',
      href: `${MAIN_DOMAIN}/nbr/`,
      color: colors.brand.teal,
      hoverColor: '#2AFFAA'
    },
    {
      label: 'Join the Herd',
      href: `${MAIN_DOMAIN}/apply-to-burro/`,
      color: colors.accent.neon,
      hoverColor: '#4DFF2E'
    }
  ];

  const legalLinks = [
    { label: 'FAQ', href: `${MAIN_DOMAIN}/faq/` },
    { label: 'Privacy', href: `${MAIN_DOMAIN}/privacy/` },
    { label: 'Terms', href: `${MAIN_DOMAIN}/terms/` },
    { label: 'Sitemap', href: `${MAIN_DOMAIN}/sitemap/` }
  ];

  const socialLinks = [
    { icon: FiInstagram, href: 'https://www.instagram.com/neonburro', label: 'Instagram' },
    { icon: RiTwitterXLine, href: 'https://x.com/neonburro', label: 'X' },
    { icon: FiGithub, href: 'https://github.com/tylerburrowbridge', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com/company/neonburro', label: 'LinkedIn' }
  ];

  const SectionHeading = ({ children }) => (
    <Text
      color="white"
      fontSize="xs"
      fontWeight="700"
      textTransform="uppercase"
      letterSpacing="wider"
      mb={4}
    >
      {children}
    </Text>
  );

  const FooterLink = ({ href, children, color, hoverColor, gradient, external = false }) => {
    const linkProps = {
      href,
      fontSize: "sm",
      fontWeight: gradient ? "700" : "600",
      color: gradient ? undefined : (color || "gray.400"),
      bgGradient: gradient,
      bgClip: gradient ? "text" : undefined,
      _hover: {
        color: !gradient ? (hoverColor || 'white') : undefined,
        textDecoration: 'none',
        transform: 'translateX(4px)',
        filter: gradient ? 'drop-shadow(0 0 12px rgba(99, 102, 241, 0.6))' : undefined
      },
      transition: "all 0.2s"
    };

    if (external) {
      linkProps.target = "_blank";
      linkProps.rel = "noopener noreferrer";
    }

    return <Link {...linkProps}>{children}</Link>;
  };

  return (
    <Box
      as="footer"
      bg={colors.dark.black}
      borderTop="1px solid"
      borderColor="whiteAlpha.100"
      position="relative"
      overflow="hidden"
      mt={20}
    >
      {/* Background gradients */}
      <Box
        position="absolute"
        bottom="-200px"
        left="-100px"
        width="400px"
        height="400px"
        opacity={0.03}
        bg={`radial-gradient(circle, ${colors.accent.banana} 0%, transparent 70%)`}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="-100px"
        right="-100px"
        width="300px"
        height="300px"
        opacity={0.03}
        bg={`radial-gradient(circle, ${colors.accent.purple} 0%, transparent 70%)`}
        pointerEvents="none"
      />

      <Container
        maxW="1400px"
        px={{ base: 4, md: 8 }}
        py={{ base: 12, md: 16 }}
        position="relative"
      >
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 6 }}
          spacing={{ base: 8, md: 6, lg: 8 }}
          mb={12}
        >
          {/* Brand Column */}
          <Box gridColumn={{ base: "1", sm: "1 / -1", lg: "1" }}>
            <VStack align="flex-start" spacing={6}>
              <Box>
                <Image
                  src="/logo-text-only.svg"
                  alt="Neon Burro"
                  height="40px"
                  width="auto"
                  filter="brightness(1.1)"
                  cursor="pointer"
                  onClick={() => window.location.href = MAIN_DOMAIN}
                  _hover={{
                    filter: 'brightness(1.3)',
                    animation: `${pulseGlow} 2s ease-in-out infinite`
                  }}
                  transition="filter 0.3s"
                />
              </Box>
              
              <VStack align="flex-start" spacing={2}>
                <HStack spacing={2} color="gray.500" fontSize="sm">
                  <FiMapPin size={16} />
                  <Text>Ridgway, Colorado</Text>
                </HStack>
                
                <Link
                  href="mailto:hello@neonburro.com"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  color="gray.500"
                  fontSize="sm"
                  _hover={{
                    color: colors.brand.primary,
                    textDecoration: 'none'
                  }}
                  transition="color 0.2s"
                >
                  <FiMail size={16} />
                  hello@neonburro.com
                </Link>
                
                <Link
                  href="tel:+19709738550"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  color="gray.500"
                  fontSize="sm"
                  _hover={{
                    color: colors.brand.primary,
                    textDecoration: 'none'
                  }}
                  transition="color 0.2s"
                >
                  <FiPhone size={16} />
                  (970) 973-8550
                </Link>
              </VStack>
            </VStack>
          </Box>

          {/* Navigation Column */}
          <Box>
            <VStack align="flex-start" spacing={3}>
              <SectionHeading>Navigate</SectionHeading>
              {mainLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </VStack>
          </Box>

          {/* Services Column */}
          <Box>
            <VStack align="flex-start" spacing={3}>
              <SectionHeading>Services</SectionHeading>
              <FooterLink
                href={`${MAIN_DOMAIN}/contact/`}
                color={colors.accent.neon}
                hoverColor="#4DFF2E"
              >
                Start a Project
              </FooterLink>
              {serviceLinks.map((link) => (
                <FooterLink
                  key={link.label}
                  href={link.href}
                  color={link.color}
                  hoverColor={link.hoverColor}
                >
                  {link.label}
                </FooterLink>
              ))}
            </VStack>
          </Box>

          {/* Network Column */}
          <Box>
            <VStack align="flex-start" spacing={3}>
              <SectionHeading>Network</SectionHeading>
              {networkLinks.map((link) => (
                <FooterLink
                  key={link.label}
                  href={link.href}
                  color={link.color}
                  hoverColor={link.hoverColor}
                  gradient={link.gradient}
                  external={link.external}
                >
                  {link.label}
                </FooterLink>
              ))}
            </VStack>
          </Box>

          {/* Community Column */}
          <Box>
            <VStack align="flex-start" spacing={3}>
              <SectionHeading>Community</SectionHeading>
              {communityLinks.map((link) => (
                <FooterLink
                  key={link.label}
                  href={link.href}
                  color={link.color}
                  hoverColor={link.hoverColor}
                  gradient={link.gradient}
                >
                  {link.label}
                </FooterLink>
              ))}
            </VStack>
          </Box>

          {/* Connect Column */}
          <Box>
            <VStack align="flex-start" spacing={4}>
              <SectionHeading>Connect</SectionHeading>
              
              <HStack spacing={1} flexWrap="wrap">
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    icon={<social.icon size={18} />}
                    variant="ghost"
                    size="sm"
                    color="gray.400"
                    aria-label={social.label}
                    onClick={() => window.open(social.href, '_blank')}
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                    _hover={{
                      color: colors.brand.primary,
                      bg: `${colors.brand.primary}11`,
                      borderColor: `${colors.brand.primary}44`,
                      transform: 'translateY(-2px)'
                    }}
                    transition="all 0.2s"
                  />
                ))}
              </HStack>
              
              <Button
                size="sm"
                width="full"
                variant="outline"
                borderColor={`${colors.accent.neon}44`}
                color={colors.accent.neon}
                borderRadius="full"
                fontWeight="700"
                fontSize="sm"
                leftIcon={<FiMessageCircle size={16} />}
                onClick={() => window.open('sms:+19709738550', '_self')}
                bg={`${colors.accent.neon}08`}
                _hover={{
                  borderColor: colors.accent.neon,
                  bg: `${colors.accent.neon}15`,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 5px 20px ${colors.accent.neon}33`
                }}
                transition="all 0.3s"
              >
                Text Us
              </Button>

              <VStack align="flex-start" spacing={2} pt={2}>
                <Text fontSize="xs" color="gray.600" fontWeight="600">Legal</Text>
                {legalLinks.map((link) => (
                  <FooterLink
                    key={link.label}
                    href={link.href}
                  >
                    {link.label}
                  </FooterLink>
                ))}
              </VStack>
            </VStack>
          </Box>
        </SimpleGrid>

        <Divider borderColor="whiteAlpha.100" opacity={0.3} />

        <Box pt={8}>
          <VStack spacing={4}>
            <HStack spacing={3} align="center" flexWrap="wrap" justify="center">
              <Text
                color="gray.400"
                fontSize="sm"
                fontWeight="700"
                letterSpacing="wide"
              >
                Powered by
              </Text>
              <Box
                as="a"
                href={MAIN_DOMAIN}
                display="inline-flex"
                alignItems="center"
                position="relative"
                _hover={{
                  '& > img': {
                    animation: `${glow} 2s ease-in-out infinite`,
                  }
                }}
              >
                <Image
                  src="/logo-main.svg"
                  alt="Neon Burro"
                  height="32px"
                  width="auto"
                  filter="brightness(1.3) drop-shadow(0 0 15px rgba(0, 229, 229, 0.4))"
                  transition="all 0.3s"
                />
              </Box>
              <Text
                color="gray.400"
                fontSize="sm"
                fontWeight="700"
                letterSpacing="wide"
              >
                to drive growth
              </Text>
            </HStack>
            
            <Text color="gray.600" fontSize="xs" textAlign="center" letterSpacing="wide">
              © {currentYear} AetherLabs. All rights reserved.
            </Text>
          </VStack>
        </Box>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <MotionBox
              position="fixed"
              bottom={6}
              right={6}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              zIndex={1000}
            >
              <IconButton
                icon={<FiArrowUp size={18} />}
                aria-label="Scroll to top"
                size="md"
                borderRadius="full"
                bg="whiteAlpha.100"
                backdropFilter="blur(10px)"
                color="white"
                border="1px solid"
                borderColor="whiteAlpha.200"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                _hover={{
                  bg: 'whiteAlpha.200',
                  transform: 'translateY(-2px)',
                  borderColor: colors.brand.primary
                }}
                transition="all 0.2s"
              />
            </MotionBox>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default Footer;