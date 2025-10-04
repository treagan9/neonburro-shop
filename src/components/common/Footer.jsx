import { Box, Container, VStack, HStack, Text, Link, IconButton, Button, Divider, Image, Grid, GridItem, keyframes } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp, FiMail, FiMapPin, FiMessageCircle, FiPhone, FiInstagram, FiShoppingBag } from 'react-icons/fi';
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

  const navigationLinks = [
    { label: 'Services', href: '/services/' },
    { label: 'Work', href: '/work/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Lab', href: '/lab/' }
  ];

  const legalLinks = [
    { label: 'FAQ', href: '/faq/' },
    { label: 'Privacy', href: '/privacy/' },
    { label: 'Terms', href: '/terms/' },
    { label: 'Sitemap', href: '/sitemap/' }
  ];

  const socialLinks = [
    { icon: FiInstagram, href: 'https://www.instagram.com/neonburro', label: 'Instagram' },
    { icon: FiGithub, href: 'https://github.com/neonburro', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com/company/neonburro', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com/neonburro', label: 'Twitter' }
  ];

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

      <Container maxW="1400px" px={{ base: 4, md: 8 }} py={{ base: 12, md: 16 }} position="relative">
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' }}
          gap={{ base: 8, lg: 4 }}
          mb={12}
          width={{ base: "98%", md: "100%" }}
          mx="auto"
        >
          <GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
            <VStack align="flex-start" spacing={6}>
              <Box>
                <Image 
                  src="/logo-text-only.svg" 
                  alt="Neon Burro"
                  height="40px"
                  width="auto"
                  filter="brightness(1.1)"
                  cursor="pointer"
                  onClick={() => window.location.href = '/'}
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
          </GridItem>

          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Text 
                color="white"
                fontSize="xs" 
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Explore
              </Text>
              <VStack align="flex-start" spacing={2}>
                {navigationLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    color="gray.400"
                    fontSize="sm"
                    _hover={{ 
                      color: 'white',
                      textDecoration: 'none',
                      transform: 'translateX(4px)'
                    }}
                    transition="all 0.2s"
                  >
                    {link.label}
                  </Link>
                ))}
              </VStack>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Text 
                color="white"
                fontSize="xs" 
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Resources
              </Text>
              <VStack align="flex-start" spacing={2}>
                <Link
                  href="/contact/"
                  color={colors.accent.neon}
                  fontSize="sm"
                  fontWeight="700"
                  _hover={{ 
                    color: '#4DFF2E',
                    textDecoration: 'none',
                    transform: 'translateX(4px)'
                  }}
                  transition="all 0.2s"
                >
                  Start a Project
                </Link>
                
                <Link
                  href="/invoice/"
                  color="white"
                  fontSize="sm"
                  fontWeight="700"
                  _hover={{ 
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    transform: 'translateX(4px)',
                    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))'
                  }}
                  transition="all 0.2s"
                >
                  Fuel Up Hours
                </Link>
                
                <Link
                  href="/subscription/"
                  color={colors.accent.warm}
                  fontSize="sm"
                  fontWeight="700"
                  _hover={{ 
                    color: '#FF8533',
                    textDecoration: 'none',
                    transform: 'translateX(4px)'
                  }}
                  transition="all 0.2s"
                >
                  Build Subscriptions
                </Link>
                
                <Link
                  href="/hosting/"
                  color={colors.accent.banana}
                  fontSize="sm"
                  fontWeight="700"
                  _hover={{ 
                    color: '#FFEE33',
                    textDecoration: 'none',
                    transform: 'translateX(4px)'
                  }}
                  transition="all 0.2s"
                >
                  Hosting
                </Link>

                <Link
                  href="https://shop.neonburro.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  fontSize="sm"
                  fontWeight="600"
                  color={colors.accent.pink}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  _hover={{ 
                    color: '#FF33FF',
                    textDecoration: 'none',
                    transform: 'translateX(4px)'
                  }}
                  transition="all 0.2s"
                >
                  <FiShoppingBag size={14} />
                  Neon Drop
                </Link>

                <Link
                  href="/collective/"
                  fontSize="sm"
                  fontWeight="700"
                  bgGradient="linear(to-r, #6366F1, #8B5CF6, #FFE500)"
                  bgClip="text"
                  _hover={{ 
                    textDecoration: 'none',
                    transform: 'translateX(4px)',
                    filter: 'drop-shadow(0 0 12px rgba(99, 102, 241, 0.6))'
                  }}
                  transition="all 0.2s"
                >
                  The Burros
                </Link>

                <Link
                  href="https://lounge.neonburro.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  fontSize="sm"
                  fontWeight="600"
                  bgGradient="linear(to-r, #14F195, #8B5CF6)"
                  bgClip="text"
                  _hover={{ 
                    textDecoration: 'none',
                    transform: 'translateX(4px)',
                    filter: 'drop-shadow(0 0 12px rgba(20, 241, 149, 0.6))'
                  }}
                  transition="all 0.2s"
                >
                  Lounge Access
                </Link>
                
                <Link
                  href="/apply-to-burro/"
                  fontSize="sm"
                  fontWeight="600"
                  color={colors.accent.cyan}
                  _hover={{ 
                    color: '#33FFFF',
                    textDecoration: 'none',
                    transform: 'translateX(4px)'
                  }}
                  transition="all 0.2s"
                >
                  Join Our Team
                </Link>
              </VStack>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Text 
                color="white"
                fontSize="xs" 
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Legal
              </Text>
              <VStack align="flex-start" spacing={2}>
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    color="gray.400"
                    fontSize="sm"
                    _hover={{ 
                      color: 'white',
                      textDecoration: 'none',
                      transform: 'translateX(4px)'
                    }}
                    transition="all 0.2s"
                  >
                    {link.label}
                  </Link>
                ))}
              </VStack>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Text 
                color="white"
                fontSize="xs" 
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Connect
              </Text>
              
              <HStack spacing={1}>
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
            </VStack>
          </GridItem>
        </Grid>

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
                href="/"
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