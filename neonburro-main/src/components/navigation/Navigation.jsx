import { Box, HStack, Text, Button, Container, Image, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, VStack, useDisclosure } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';

const MotionBox = motion(Box);

// Theme colors
const colors = {
  brand: {
    primary: '#00E5E5',
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

const Navigation = ({ isAuthenticated, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate location for demo
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const navItems = [
    { label: 'Services', href: '/services/' },
    { label: 'Work', href: '/work/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' }
  ];

  const handleNavClick = (href) => {
    window.location.href = href;
  };

  const handleMembersClick = () => {
    if (isAuthenticated) {
      window.location.href = '/members/';
    } else {
      window.location.href = '/members/login/';
    }
  };

  const handleLogout = () => {
    onLogout();
    window.location.href = '/';
  };

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
      >
        <Box
          bg={isScrolled ? "rgba(10, 10, 10, 0.9)" : "transparent"}
          backdropFilter={isScrolled ? "blur(8px)" : "none"}
          borderBottom="1px solid"
          borderColor={isScrolled ? "whiteAlpha.100" : "transparent"}
          boxShadow={isScrolled ? "0 2px 20px rgba(0,0,0,0.1)" : "none"}
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          <Container maxW="1400px" px={{ base: 4, md: 8 }}>
            <HStack 
              justify="space-between" 
              align="center"
              height={{ base: "64px", md: "72px" }}
            >
              {/* Logo - Enhanced with subtle animation */}
              <Box 
                cursor="pointer" 
                onClick={() => window.location.href = '/'}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{ 
                  transform: 'translateY(-1px)',
                  filter: 'brightness(1.2) drop-shadow(0 0 20px rgba(0, 229, 229, 0.3))'
                }}
              >
                <Image 
                  src="/logo.svg" 
                  alt="Neon Burro"
                  height={{ base: "45px", md: "50px" }}
                  width="auto"
                  filter={isScrolled ? "brightness(1.2)" : "brightness(1.1)"}
                  transition="filter 0.3s ease"
                />
              </Box>
              
              {/* Desktop Navigation - Slimmer */}
              <HStack spacing={0} display={{ base: 'none', lg: 'flex' }}>
                {navItems.map((item, index) => (
                  <MotionBox
                    key={item.label}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => handleNavClick(item.href)}
                      fontSize="sm"
                      fontWeight="medium"
                      color={currentPath === item.href ? 'white' : 'whiteAlpha.700'}
                      position="relative"
                      px={4}
                      height="32px"
                      borderRadius="md"
                      _hover={{ 
                        color: 'white',
                        bg: 'whiteAlpha.50',
                        _after: {
                          width: '60%'
                        }
                      }}
                      _after={{
                        content: '""',
                        position: 'absolute',
                        bottom: '0px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: currentPath === item.href ? '24px' : '0',
                        height: '1.5px',
                        bg: colors.brand.primary,
                        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        borderRadius: 'full'
                      }}
                    >
                      {item.label}
                    </Button>
                  </MotionBox>
                ))}
              </HStack>

              {/* Desktop CTA - Simplified & Slimmer */}
              <HStack spacing={3} display={{ base: 'none', md: 'flex' }}>
                {/* Base Camp - Subtle utility link */}
                <Button
                  variant="ghost"
                  color="whiteAlpha.600"
                  fontSize="xs"
                  fontWeight="medium"
                  height="32px"
                  px={3}
                  onClick={handleMembersClick}
                  position="relative"
                  _hover={{ 
                    color: colors.accent.neon,
                    bg: 'transparent'
                  }}
                  transition="all 0.2s"
                >
                  <HStack spacing={1}>
                    <Text>Base Camp</Text>
                    {isAuthenticated && (
                      <Box
                        width="5px"
                        height="5px"
                        borderRadius="full"
                        bg={colors.accent.neon}
                        animation="pulse 2s infinite"
                      />
                    )}
                  </HStack>
                </Button>

                {isAuthenticated && (
                  <>
                    <Box width="1px" height="16px" bg="whiteAlpha.200" />
                    <Button
                      variant="ghost"
                      color="whiteAlpha.600"
                      fontSize="xs"
                      onClick={handleLogout}
                      height="32px"
                      px={3}
                      _hover={{
                        color: colors.accent.warm,
                        bg: 'transparent'
                      }}
                    >
                      Logout
                    </Button>
                  </>
                )}
                
                {/* Primary CTA - Fuel Up */}
                <Button
                  bg="white"
                  color={colors.dark.black}
                  fontSize="sm"
                  fontWeight="semibold"
                  height="36px"
                  px={5}
                  borderRadius="full"
                  onClick={() => window.location.href = '/invoice/'}
                  rightIcon={<FiArrowRight size={14} />}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(255, 255, 255, 0.25)'
                  }}
                  _active={{
                    transform: 'translateY(0)'
                  }}
                >
                  Fuel Up
                </Button>
              </HStack>

              {/* Mobile Menu Button - Enhanced */}
              <IconButton
                icon={
                  <Box
                    as={isOpen ? FiX : FiMenu}
                    size={20}
                    transition="transform 0.2s"
                    transform={isOpen ? 'rotate(90deg)' : 'rotate(0)'}
                  />
                }
                variant="ghost"
                color="white"
                onClick={isOpen ? onClose : onOpen}
                display={{ base: 'flex', lg: 'none' }}
                _hover={{ bg: 'whiteAlpha.100' }}
                aria-label="Menu"
                size="sm"
                borderRadius="md"
              />
            </HStack>
          </Container>
        </Box>
      </Box>

      {/* Mobile Drawer - Enhanced */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="xs">
        <DrawerOverlay bg="blackAlpha.900" backdropFilter="blur(8px)" />
        <DrawerContent bg={colors.dark.black}>
          <DrawerCloseButton 
            color="white" 
            size="md"
            top={5}
            right={5}
            borderRadius="md"
            _hover={{ bg: 'whiteAlpha.100' }}
          />
          
          <DrawerBody px={6}>
            <VStack 
              spacing={0}
              align="stretch" 
              height="100%"
              justify="space-between"
              py={8}
            >
              {/* Mobile Navigation Section */}
              <VStack spacing={6}>
                {/* Section Label */}
                <Text
                  color="whiteAlpha.500"
                  fontSize="xs"
                  fontWeight="semibold"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  alignSelf="flex-start"
                >
                  Menu
                </Text>

                {/* Mobile Nav Items - More compact */}
                <VStack spacing={1} width="100%">
                  {navItems.map((item, index) => (
                    <MotionBox
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      width="100%"
                    >
                      <Button
                        variant="ghost"
                        size="md"
                        width="100%"
                        height="48px"
                        fontSize="lg"
                        fontWeight="medium"
                        color={currentPath === item.href ? colors.brand.primary : 'whiteAlpha.800'}
                        onClick={() => handleNavClick(item.href)}
                        justifyContent="space-between"
                        px={4}
                        borderRadius="lg"
                        position="relative"
                        _hover={{ 
                          bg: 'whiteAlpha.50',
                          color: 'white'
                        }}
                        transition="all 0.2s"
                      >
                        <Text>{item.label}</Text>
                        {currentPath === item.href && (
                          <Box
                            width="6px"
                            height="6px"
                            borderRadius="full"
                            bg={colors.brand.primary}
                            boxShadow={`0 0 10px ${colors.brand.primary}`}
                          />
                        )}
                      </Button>
                    </MotionBox>
                  ))}
                </VStack>

                {/* Divider */}
                <Box width="100%" height="1px" bg="whiteAlpha.100" my={4} />

                {/* Account Section */}
                <VStack spacing={1} width="100%" align="stretch">
                  <Text
                    color="whiteAlpha.500"
                    fontSize="xs"
                    fontWeight="semibold"
                    letterSpacing="wider"
                    textTransform="uppercase"
                    mb={2}
                  >
                    Account
                  </Text>
                  
                  <Button
                    variant="ghost"
                    size="md"
                    width="100%"
                    height="48px"
                    fontSize="lg"
                    fontWeight="medium"
                    color={colors.accent.neon}
                    onClick={handleMembersClick}
                    justifyContent="space-between"
                    px={4}
                    borderRadius="lg"
                    _hover={{ 
                      bg: 'whiteAlpha.50'
                    }}
                  >
                    <Text>Base Camp</Text>
                    {isAuthenticated && (
                      <Box
                        width="6px"
                        height="6px"
                        borderRadius="full"
                        bg={colors.accent.neon}
                        animation="pulse 2s infinite"
                      />
                    )}
                  </Button>

                  {isAuthenticated && (
                    <Button
                      variant="ghost"
                      size="md"
                      width="100%"
                      height="48px"
                      fontSize="lg"
                      fontWeight="medium"
                      color={colors.accent.warm}
                      onClick={handleLogout}
                      justifyContent="flex-start"
                      px={4}
                      borderRadius="lg"
                      _hover={{ 
                        bg: 'whiteAlpha.50'
                      }}
                    >
                      Logout
                    </Button>
                  )}
                </VStack>
              </VStack>

              {/* Mobile CTA & Footer */}
              <VStack spacing={6} width="100%">
                {/* Primary CTA */}
                <Button
                  size="lg"
                  width="100%"
                  height="52px"
                  bg="white"
                  color={colors.dark.black}
                  fontSize="md"
                  fontWeight="semibold"
                  borderRadius="full"
                  onClick={() => {
                    window.location.href = '/invoice/';
                    onClose();
                  }}
                  rightIcon={<FiArrowRight />}
                  _hover={{
                    transform: 'scale(1.02)',
                    boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)'
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  Fuel Up
                </Button>

                {/* Footer Info */}
                <VStack 
                  spacing={2}
                  width="100%"
                  pt={4}
                  borderTop="1px solid"
                  borderColor="whiteAlpha.100"
                >
                  <HStack spacing={1} color="whiteAlpha.500" fontSize="xs">
                    <Text>Ridgway, CO</Text>
                    <Text>•</Text>
                    <Text>7,200ft</Text>
                  </HStack>
                  <Text color="whiteAlpha.400" fontSize="xs">
                    hello@neonburro.com
                  </Text>
                </VStack>
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navigation;