import { Box, Container, VStack, HStack, Text, Link, IconButton, Button, Divider, Image, Grid, GridItem, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp, FiMail, FiMapPin, FiMessageCircle } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);

// Theme colors
const colors = {
  brand: {
    primary: '#00E5E5',
    primaryDark: '#00B8B8',
  },
  accent: {
    neon: '#39FF14',
    warm: '#FF6B00',
    banana: '#FFE500',
  },
  dark: {
    black: '#0A0A0A',
  }
};

// Subtle pulse animation
const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.95); }
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
    { label: 'Contact', href: '/contact/' }
  ];

  const resourceLinks = [
    { label: 'Start a Project', href: '/contact/', highlight: true },
    { label: 'Fuel Up', href: '/invoice/' },
    { label: 'Base Camp', href: '/members/' },
    { label: 'FAQ', href: '/faq/' }
  ];

  const socialLinks = [
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
      {/* Simplified gradient background */}
      <Box
        position="absolute"
        bottom="-50%"
        left="50%"
        transform="translateX(-50%)"
        width="800px"
        height="400px"
        opacity={0.03}
        bg={`radial-gradient(ellipse at center, ${colors.brand.primary} 0%, transparent 50%)`}
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 4, md: 8 }} py={{ base: 12, md: 16 }} position="relative">
        {/* Top CTA Section - New Addition */}
        <Box
          mb={12}
          p={{ base: 6, md: 8 }}
          borderRadius="2xl"
          bg="whiteAlpha.50"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="whiteAlpha.100"
          textAlign="center"
        >
          <VStack spacing={4}>
            <Heading
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              color="white"
              letterSpacing="tight"
            >
              Ready to Build Something Amazing?
            </Heading>
            <Text color="gray.400" fontSize={{ base: "sm", md: "md" }}>
              Let's transform your digital vision into reality.
            </Text>
            <Button
              size="lg"
              bg="white"
              color={colors.dark.black}
              fontSize="sm"
              fontWeight="semibold"
              px={8}
              borderRadius="full"
              onClick={() => window.location.href = '/contact/'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)'
              }}
              transition="all 0.3s"
            >
              Start Your Project
            </Button>
          </VStack>
        </Box>

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={{ base: 8, md: 10 }}
          mb={12}
        >
          {/* Brand Column */}
          <GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
            <VStack align="flex-start" spacing={4}>
              <Box mb={2}>
                <Image 
                  src="/logo.svg" 
                  alt="Neon Burro"
                  height="45px"
                  width="auto"
                  filter="brightness(1.2)"
                  cursor="pointer"
                  onClick={() => window.location.href = '/'}
                  _hover={{ 
                    filter: 'brightness(1.3) drop-shadow(0 0 20px rgba(0, 229, 229, 0.5))'
                  }}
                  transition="filter 0.3s"
                />
              </Box>
              <Text color="gray.400" fontSize="sm" lineHeight="relaxed" maxW="280px">
                Hand-crafted digital experiences from the Colorado mountains. 
                No templates. No compromises.
              </Text>
              {/* Social Links */}
              <HStack spacing={2} pt={2}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    icon={<social.icon size={16} />}
                    variant="ghost"
                    size="sm"
                    color="gray.500"
                    aria-label={social.label}
                    onClick={() => window.open(social.href, '_blank')}
                    borderRadius="md"
                    _hover={{
                      color: colors.brand.primary,
                      bg: 'whiteAlpha.100',
                      transform: 'translateY(-2px)'
                    }}
                    transition="all 0.2s"
                  />
                ))}
              </HStack>
            </VStack>
          </GridItem>

          {/* Navigation Column */}
          <GridItem>
            <VStack align="flex-start" spacing={3}>
              <Text 
                color="white" 
                fontSize="xs" 
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wider"
                mb={2}
              >
                Navigate
              </Text>
              {navigationLinks.map((link) => (
                <Link
                  key={link.label}
                  onClick={() => window.location.href = link.href}
                  color="gray.400"
                  fontSize="sm"
                  cursor="pointer"
                  position="relative"
                  _hover={{ 
                    color: 'white',
                    textDecoration: 'none',
                    transform: 'translateX(2px)'
                  }}
                  transition="all 0.2s"
                >
                  {link.label}
                </Link>
              ))}
            </VStack>
          </GridItem>

          {/* Resources Column */}
          <GridItem>
            <VStack align="flex-start" spacing={3}>
              <Text 
                color="white" 
                fontSize="xs" 
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wider"
                mb={2}
              >
                Resources
              </Text>
              {resourceLinks.map((link) => (
                <Link
                  key={link.label}
                  onClick={() => window.location.href = link.href}
                  color={link.highlight ? colors.accent.neon : "gray.400"}
                  fontSize="sm"
                  cursor="pointer"
                  position="relative"
                  fontWeight={link.highlight ? "medium" : "normal"}
                  _hover={{ 
                    color: link.highlight ? colors.accent.neon : 'white',
                    textDecoration: 'none',
                    transform: 'translateX(2px)'
                  }}
                  transition="all 0.2s"
                >
                  {link.label}
                </Link>
              ))}
            </VStack>
          </GridItem>

          {/* Contact Column */}
          <GridItem>
            <VStack align="flex-start" spacing={3}>
              <Text 
                color="white" 
                fontSize="xs" 
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wider"
                mb={2}
              >
                Connect
              </Text>
              <VStack align="flex-start" spacing={3}>
                <HStack spacing={2} color="gray.400" fontSize="sm">
                  <Box color={colors.brand.primary}>
                    <FiMapPin size={14} />
                  </Box>
                  <Text>Ridgway, CO 81432</Text>
                </HStack>
                <Link
                  href="mailto:hello@neonburro.com"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  color="gray.400"
                  fontSize="sm"
                  _hover={{ 
                    color: colors.brand.primary,
                    textDecoration: 'none'
                  }}
                  transition="color 0.2s"
                >
                  <FiMail size={14} />
                  hello@neonburro.com
                </Link>
              </VStack>
              
              {/* Quick Chat Button */}
              <Button
                size="sm"
                mt={4}
                variant="outline"
                borderColor="whiteAlpha.200"
                color="white"
                borderRadius="full"
                px={4}
                fontWeight="medium"
                fontSize="xs"
                leftIcon={<FiMessageCircle size={12} />}
                onClick={() => window.location.href = '/contact/'}
                _hover={{
                  borderColor: colors.brand.primary,
                  color: colors.brand.primary,
                  transform: 'translateY(-2px)'
                }}
                transition="all 0.3s"
              >
                Quick Chat
              </Button>
            </VStack>
          </GridItem>
        </Grid>

        <Divider borderColor="whiteAlpha.100" opacity={0.3} />

        {/* Bottom Section - Simplified */}
        <Box pt={8}>
          <Grid
            templateColumns={{ base: '1fr', md: '1fr 1fr' }}
            gap={4}
            alignItems="center"
          >
            <GridItem>
              <VStack align={{ base: 'center', md: 'flex-start' }} spacing={2}>
                <Text color="gray.500" fontSize="xs">
                  © {currentYear} Neon Burro, LLC. All rights reserved.
                </Text>
                <HStack spacing={1} fontSize="xs" color="gray.600">
                  <Text>Crafted with</Text>
                  <Box 
                    as="span" 
                    color={colors.accent.warm}
                    animation={`${pulse} 3s ease-in-out infinite`}
                  >
                    ♥
                  </Box>
                  <Text>at 7,200ft elevation</Text>
                </HStack>
              </VStack>
            </GridItem>

            <GridItem>
              <HStack 
                spacing={6}
                fontSize="xs"
                justify={{ base: 'center', md: 'flex-end' }}
                flexWrap="wrap"
              >
                <Link 
                  onClick={() => window.location.href = '/privacy/'}
                  color="gray.600"
                  _hover={{ 
                    color: 'gray.400'
                  }}
                  cursor="pointer"
                  transition="color 0.2s"
                >
                  Privacy
                </Link>
                <Link 
                  onClick={() => window.location.href = '/terms/'}
                  color="gray.600"
                  _hover={{ 
                    color: 'gray.400'
                  }}
                  cursor="pointer"
                  transition="color 0.2s"
                >
                  Terms
                </Link>
                <Link 
                  onClick={() => window.location.href = '/sitemap/'}
                  color="gray.600"
                  _hover={{ 
                    color: 'gray.400'
                  }}
                  cursor="pointer"
                  transition="color 0.2s"
                >
                  Sitemap
                </Link>
              </HStack>
            </GridItem>
          </Grid>
        </Box>

        {/* Scroll to top button - Fixed visibility */}
        <AnimatePresence>
          {showScrollTop && (
            <MotionBox
              position="fixed"
              bottom={6}
              right={6}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <IconButton
                icon={<FiArrowUp />}
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
                  bg: colors.brand.primary,
                  color: colors.dark.black,
                  transform: 'translateY(-4px)',
                  boxShadow: `0 10px 30px ${colors.brand.primary}44`
                }}
                transition="all 0.3s"
              />
            </MotionBox>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

// Add missing import
const { AnimatePresence } = motion;

// Add missing Heading component
const Heading = ({ children, ...props }) => (
  <Text as="h3" {...props}>{children}</Text>
);

export default Footer;