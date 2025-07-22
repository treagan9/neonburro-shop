import { Box, HStack, Text, Button, Container, Image, IconButton, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMenu, FiArrowRight } from 'react-icons/fi';
import MobileDrawer from './MobileDrawer';

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
          bg={isScrolled ? "rgba(10, 10, 10, 0.95)" : "transparent"}
          backdropFilter={isScrolled ? "blur(10px)" : "none"}
          borderBottom="1px solid"
          borderColor={isScrolled ? "whiteAlpha.100" : "transparent"}
          boxShadow={isScrolled ? "0 4px 30px rgba(0,0,0,0.1)" : "none"}
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          <Container maxW="1400px" px={{ base: 4, md: 8 }}>
            <HStack 
              justify="space-between" 
              align="center"
              height={{ base: "68px", md: "76px" }}
            >
              {/* Left side - Logo and Navigation */}
              <HStack spacing={{ base: 4, lg: 8 }} flex={1}>
                {/* Logo - Enhanced for mobile */}
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
                    height={{ base: "40px", md: "52px" }}
                    width="auto"
                    filter={isScrolled ? "brightness(1.15) contrast(1.1)" : "brightness(1.1)"}
                    transition="filter 0.3s ease"
                    sx={{
                      imageRendering: '-webkit-optimize-contrast',
                      WebkitFontSmoothing: 'antialiased',
                    }}
                  />
                </Box>
                
                {/* Desktop Navigation - Next to Logo */}
                <HStack spacing={2} display={{ base: 'none', lg: 'flex' }}>
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
                        fontSize="md"
                        fontWeight="500"
                        color={currentPath === item.href ? 'white' : 'whiteAlpha.800'}
                        position="relative"
                        px={5}
                        height="40px"
                        borderRadius="lg"
                        _hover={{ 
                          color: 'white',
                          bg: 'whiteAlpha.50',
                          _after: {
                            width: '80%'
                          }
                        }}
                        _after={{
                          content: '""',
                          position: 'absolute',
                          bottom: '4px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: currentPath === item.href ? '32px' : '0',
                          height: '2px',
                          bg: colors.brand.primary,
                          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          borderRadius: 'full',
                          boxShadow: currentPath === item.href ? `0 0 10px ${colors.brand.primary}` : 'none'
                        }}
                      >
                        {item.label}
                      </Button>
                    </MotionBox>
                  ))}
                </HStack>
              </HStack>

              {/* Right side - Desktop CTA */}
              <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
                {/* Favicon/Burro Icon */}
                <Box
                  position="relative"
                  cursor="pointer"
                  onClick={handleMembersClick}
                  transition="all 0.3s"
                >
                  {/* Banana yellow outline */}
                  <Box
                    position="absolute"
                    inset="-2px"
                    borderRadius="full"
                    border="2px solid"
                    borderColor={colors.accent.banana}
                    opacity={0.6}
                    transition="all 0.3s"
                    _groupHover={{
                      opacity: 1,
                      boxShadow: `0 0 20px ${colors.accent.banana}60`
                    }}
                  />
                  <Box
                    role="group"
                    position="relative"
                    _hover={{
                      '& > div:first-of-type': {
                        opacity: 1,
                        boxShadow: `0 0 20px ${colors.accent.banana}60`
                      }
                    }}
                  >
                    <Image 
                      src="/favicon.svg" 
                      alt="Neon Burro"
                      width="36px"
                      height="36px"
                      position="relative"
                      filter="brightness(1.1)"
                    />
                  </Box>
                </Box>

                {/* Base Camp */}
                <Button
                  variant="ghost"
                  color="whiteAlpha.800"
                  fontSize="md"
                  fontWeight="500"
                  height="40px"
                  px={5}
                  onClick={handleMembersClick}
                  position="relative"
                  borderRadius="lg"
                  _hover={{ 
                    color: colors.accent.neon,
                    bg: 'whiteAlpha.50'
                  }}
                  transition="all 0.2s"
                >
                  <HStack spacing={2}>
                    <Text>Base Camp</Text>
                    {isAuthenticated && (
                      <Box
                        width="6px"
                        height="6px"
                        borderRadius="full"
                        bg={colors.accent.neon}
                        boxShadow={`0 0 8px ${colors.accent.neon}`}
                        animation="pulse 2s infinite"
                      />
                    )}
                  </HStack>
                </Button>

                {isAuthenticated && (
                  <>
                    <Box width="1px" height="24px" bg="whiteAlpha.200" />
                    <Button
                      variant="ghost"
                      color="whiteAlpha.800"
                      fontSize="md"
                      fontWeight="500"
                      onClick={handleLogout}
                      height="40px"
                      px={5}
                      borderRadius="lg"
                      _hover={{
                        color: colors.accent.warm,
                        bg: 'whiteAlpha.50'
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
                  fontSize="md"
                  fontWeight="600"
                  height="44px"
                  px={7}
                  borderRadius="full"
                  onClick={() => window.location.href = '/invoice/'}
                  rightIcon={<FiArrowRight size={18} />}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  position="relative"
                  overflow="hidden"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 30px rgba(255, 255, 255, 0.25)'
                  }}
                  _active={{
                    transform: 'translateY(0)',
                    bg: colors.accent.neon,
                    color: colors.dark.black,
                    boxShadow: `0 8px 20px ${colors.accent.neon}40`
                  }}
                >
                  Fuel Up
                </Button>
              </HStack>

              {/* Mobile Menu Button - Bigger and cleaner */}
              <IconButton
                icon={
                  <Box
                    position="relative"
                    width="24px"
                    height="24px"
                    cursor="pointer"
                  >
                    <Box
                      position="absolute"
                      width="100%"
                      height="2.5px"
                      bg="white"
                      borderRadius="full"
                      top={isOpen ? "50%" : "25%"}
                      transform={isOpen ? "translateY(-50%) rotate(45deg)" : "translateY(-50%)"}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    />
                    <Box
                      position="absolute"
                      width="100%"
                      height="2.5px"
                      bg="white"
                      borderRadius="full"
                      top="50%"
                      transform="translateY(-50%)"
                      opacity={isOpen ? 0 : 1}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    />
                    <Box
                      position="absolute"
                      width="100%"
                      height="2.5px"
                      bg="white"
                      borderRadius="full"
                      top={isOpen ? "50%" : "75%"}
                      transform={isOpen ? "translateY(-50%) rotate(-45deg)" : "translateY(-50%)"}
                      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    />
                  </Box>
                }
                variant="ghost"
                onClick={isOpen ? onClose : onOpen}
                display={{ base: 'flex', lg: 'none' }}
                _hover={{ bg: 'whiteAlpha.100' }}
                aria-label="Menu"
                size="md"
                borderRadius="lg"
                height="44px"
                width="44px"
              />
            </HStack>
          </Container>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <MobileDrawer 
        isOpen={isOpen}
        onClose={onClose}
        navItems={navItems}
        currentPath={currentPath}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        handleNavClick={handleNavClick}
        handleMembersClick={handleMembersClick}
      />
    </>
  );
};

export default Navigation;