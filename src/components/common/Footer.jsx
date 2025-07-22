import { Box, Container, VStack, HStack, Text, Link, IconButton, Button, Divider, Image, Grid, GridItem, keyframes } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp, FiMail, FiMapPin, FiMessageCircle, FiPhone, FiInstagram } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);

// Theme colors
const colors = {
  brand: {
    primary: '#14F195', // Teal
    primaryDark: '#0DBF7D',
  },
  accent: {
    banana: '#FFE135', // Banana yellow
    warm: '#FF6B35', // Warm orange
  },
  dark: {
    black: '#0A0A0A',
    gray: '#1A1A1A',
  }
};

// Subtle glow animation
const glow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 15px rgba(255, 225, 53, 0.4)); }
  50% { filter: drop-shadow(0 0 25px rgba(255, 225, 53, 0.7)); }
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

  const resourceLinks = [
    { label: 'Start a Project', href: '/contact/', accent: colors.accent.banana },
    { label: 'Pulsewell', href: '/subscription/', accent: colors.brand.primary },
    { label: 'Fuel Up', href: '/invoice/' },
    { label: 'Base Camp', href: '/members/' },
    { label: 'Apply to Burro', href: '/apply-to-burro/', accent: colors.accent.warm }
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
      {/* Subtle gradient accents */}
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
        bg={`radial-gradient(circle, ${colors.accent.warm} 0%, transparent 70%)`}
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 4, md: 8 }} py={{ base: 12, md: 16 }} position="relative">
        
        {/* Main CTA Section */}
        <Box
          mb={16}
          textAlign="center"
          maxW="600px"
          mx="auto"
        >
          <VStack spacing={5}>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="800"
              color="white"
              letterSpacing="-0.02em"
            >
              Ready to Build Something
              <Box 
                as="span" 
                display="block"
                bgGradient={`linear(to-r, ${colors.brand.primary}, ${colors.accent.banana})`}
                bgClip="text"
                mt={2}
              >
                Extraordinary?
              </Box>
            </Text>
            <Text color="gray.400" fontSize={{ base: "md", md: "lg" }} maxW="400px">
              Let's transform your vision into digital reality.
            </Text>
            <HStack spacing={4}>
              <Button
                size="lg"
                bg={colors.brand.primary}
                color="black"
                fontSize="md"
                fontWeight="700"
                px={8}
                borderRadius="full"
                onClick={() => window.location.href = '/contact/'}
                _hover={{
                  bg: colors.brand.primaryDark,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 30px ${colors.brand.primary}44`
                }}
                _active={{
                  transform: 'translateY(0)'
                }}
                transition="all 0.3s"
              >
                Start Your Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor={colors.accent.warm}
                color={colors.accent.warm}
                fontSize="md"
                fontWeight="600"
                px={8}
                borderRadius="full"
                onClick={() => window.location.href = '/invoice/'}
                _hover={{
                  bg: `${colors.accent.warm}11`,
                  borderColor: colors.accent.warm,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 30px ${colors.accent.warm}33`
                }}
                transition="all 0.3s"
              >
                Add Hours
              </Button>
            </HStack>
          </VStack>
        </Box>

        {/* Footer Grid - Simplified */}
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' }}
          gap={{ base: 8, lg: 4 }}
          mb={12}
        >
          {/* Brand Column */}
          <GridItem colSpan={{ base: 1, md: 2, lg: 1 }}>
            <VStack align="flex-start" spacing={6}>
              <Box>
                <Image 
                  src="/logo.svg" 
                  alt="Neon Burro"
                  height="50px"
                  width="auto"
                  filter="brightness(1.1)"
                  cursor="pointer"
                  onClick={() => window.location.href = '/'}
                  _hover={{ 
                    filter: 'brightness(1.3)',
                    animation: `${glow} 2s ease-in-out infinite`
                  }}
                  transition="filter 0.3s"
                />
              </Box>
              
              <VStack align="flex-start" spacing={2}>
                <HStack spacing={2} color="gray.500" fontSize="sm">
                  <FiMapPin size={14} />
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
                  <FiMail size={14} />
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
                  <FiPhone size={14} />
                  (970) 973-8550
                </Link>
              </VStack>
            </VStack>
          </GridItem>

          {/* Navigation */}
          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Text 
                color="white"
                fontSize="xs" 
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="wider"
                opacity={0.7}
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
                      textDecoration: 'none'
                    }}
                    transition="color 0.2s"
                  >
                    {link.label}
                  </Link>
                ))}
              </VStack>
            </VStack>
          </GridItem>

          {/* Resources */}
          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Text 
                color="white"
                fontSize="xs" 
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="wider"
                opacity={0.7}
              >
                Resources
              </Text>
              <VStack align="flex-start" spacing={2}>
                {resourceLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    color={link.accent || "gray.400"}
                    fontSize="sm"
                    fontWeight={link.accent ? "600" : "normal"}
                    position="relative"
                    _hover={{ 
                      color: link.accent || colors.brand.primary,
                      textDecoration: 'none',
                      transform: 'translateX(4px)',
                      filter: link.accent ? `drop-shadow(0 0 8px ${link.accent}66)` : 'none'
                    }}
                    transition="all 0.2s"
                  >
                    {link.label}
                  </Link>
                ))}
              </VStack>
            </VStack>
          </GridItem>

          {/* Legal */}
          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Text 
                color="white"
                fontSize="xs" 
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="wider"
                opacity={0.7}
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
                      textDecoration: 'none'
                    }}
                    transition="color 0.2s"
                  >
                    {link.label}
                  </Link>
                ))}
              </VStack>
            </VStack>
          </GridItem>

          {/* Connect */}
          <GridItem>
            <VStack align="flex-start" spacing={4}>
              <Text 
                color="white"
                fontSize="xs" 
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="wider"
                opacity={0.7}
              >
                Connect
              </Text>
              
              {/* Social Links */}
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
              
              {/* Text Message Button */}
              <Button
                size="sm"
                width="full"
                variant="outline"
                borderColor={`${colors.accent.banana}44`}
                color={colors.accent.banana}
                borderRadius="full"
                fontWeight="600"
                fontSize="sm"
                leftIcon={<FiMessageCircle size={16} />}
                onClick={() => window.open('sms:+19709738550', '_self')}
                bg={`${colors.accent.banana}08`}
                _hover={{
                  borderColor: colors.accent.banana,
                  bg: `${colors.accent.banana}15`,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 5px 20px ${colors.accent.banana}33`
                }}
                transition="all 0.3s"
              >
                Text Us
              </Button>
            </VStack>
          </GridItem>
        </Grid>

        <Divider borderColor="whiteAlpha.100" opacity={0.3} />

        {/* Bottom Section - Simplified */}
        <Box pt={8}>
          <VStack spacing={3}>
            {/* Powered By Section with subtle banana glow on hover */}
            <HStack spacing={2} align="center">
              <Text color="gray.500" fontSize="sm">
                Powered by the
              </Text>
              <Box
                as="a"
                href="/"
                display="inline-flex"
                alignItems="center"
                _hover={{
                  animation: `${glow} 2s ease-in-out infinite`,
                  filter: 'drop-shadow(0 0 20px rgba(255, 225, 53, 0.6))'
                }}
                transition="all 0.3s"
              >
                <Image 
                  src="/favicon.svg" 
                  alt="Neon Burro"
                  height="28px"
                  width="28px"
                  filter="brightness(1.1)"
                />
              </Box>
              <Text color="gray.500" fontSize="sm">
                to drive growth
              </Text>
            </HStack>
            
            {/* Copyright */}
            <Text color="gray.600" fontSize="xs" textAlign="center">
              © {currentYear} Neon Burro, LLC. All rights reserved.
            </Text>
          </VStack>
        </Box>

        {/* Scroll to top button - Cleaner */}
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