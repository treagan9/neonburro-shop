import { 
  Box, 
  HStack, 
  Text, 
  Button, 
  VStack, 
  Drawer, 
  DrawerOverlay, 
  DrawerContent, 
  DrawerCloseButton, 
  DrawerBody,
  Image,
  Divider
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiMail, FiPhone, FiMessageCircle } from 'react-icons/fi';

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
    gray: '#1A1A1A',
  }
};

const MobileDrawer = ({ 
  isOpen, 
  onClose, 
  navItems, 
  currentPath, 
  isAuthenticated, 
  onLogout, 
  handleNavClick,
  handleMembersClick 
}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="full">
      <DrawerOverlay bg="blackAlpha.950" backdropFilter="blur(10px)" />
      <DrawerContent bg={colors.dark.black} maxW="320px">
        <DrawerCloseButton 
          color="white" 
          size="lg"
          top={6}
          right={6}
          borderRadius="lg"
          _hover={{ bg: 'whiteAlpha.100' }}
          zIndex={10}
        />
        
        <DrawerBody px={6} py={8}>
          <VStack 
            spacing={8}
            align="stretch" 
            height="100%"
          >
            {/* Header with Favicon */}
            <VStack spacing={4} align="center" pb={6}>
              <Box
                position="relative"
                cursor="pointer"
                onClick={() => window.location.href = '/'}
              >
                {/* Banana yellow outline glow */}
                <Box
                  position="absolute"
                  inset="-3px"
                  borderRadius="full"
                  border="3px solid"
                  borderColor={colors.accent.banana}
                  boxShadow={`0 0 25px ${colors.accent.banana}60`}
                />
                <Image 
                  src="/favicon.svg" 
                  alt="Neon Burro Icon"
                  width="56px"
                  height="56px"
                  filter="brightness(1.2)"
                  position="relative"
                />
              </Box>
            </VStack>

            {/* Navigation Section */}
            <VStack spacing={2} flex={1}>
              {/* Main Navigation */}
              <VStack spacing={1} width="100%" align="stretch">
                {navItems.map((item, index) => (
                  <MotionBox
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Button
                      variant="ghost"
                      size="lg"
                      width="100%"
                      height="56px"
                      fontSize="xl"
                      fontWeight="500"
                      color={currentPath === item.href ? 'white' : 'whiteAlpha.800'}
                      onClick={() => {
                        handleNavClick(item.href);
                        onClose();
                      }}
                      justifyContent="space-between"
                      px={4}
                      borderRadius="xl"
                      position="relative"
                      bg={currentPath === item.href ? 'whiteAlpha.50' : 'transparent'}
                      _hover={{ 
                        bg: 'whiteAlpha.100',
                        color: 'white',
                        transform: 'translateX(4px)'
                      }}
                      transition="all 0.2s"
                    >
                      <Text>{item.label}</Text>
                      {currentPath === item.href && (
                        <Box
                          width="8px"
                          height="8px"
                          borderRadius="full"
                          bg={colors.brand.primary}
                          boxShadow={`0 0 12px ${colors.brand.primary}`}
                        />
                      )}
                    </Button>
                  </MotionBox>
                ))}
              </VStack>

              {/* Divider */}
              <Divider borderColor="whiteAlpha.100" my={4} />

              {/* Account Section */}
              <VStack spacing={1} width="100%" align="stretch">
                <Button
                  variant="ghost"
                  size="lg"
                  width="100%"
                  height="56px"
                  fontSize="xl"
                  fontWeight="500"
                  color={colors.brand.primary}
                  onClick={() => {
                    handleMembersClick();
                    onClose();
                  }}
                  justifyContent="space-between"
                  px={4}
                  borderRadius="xl"
                  bg="transparent"
                  border="1px solid"
                  borderColor={`${colors.brand.primary}30`}
                  _hover={{ 
                    bg: `${colors.brand.primary}10`,
                    borderColor: `${colors.brand.primary}50`,
                    transform: 'translateX(4px)'
                  }}
                  transition="all 0.2s"
                >
                  <Text>Base Camp</Text>
                  {isAuthenticated && (
                    <Box
                      width="8px"
                      height="8px"
                      borderRadius="full"
                      bg={colors.brand.primary}
                      boxShadow={`0 0 12px ${colors.brand.primary}`}
                      animation="pulse 2s infinite"
                    />
                  )}
                </Button>

                {isAuthenticated && (
                  <Button
                    variant="ghost"
                    size="lg"
                    width="100%"
                    height="56px"
                    fontSize="xl"
                    fontWeight="500"
                    color={colors.accent.warm}
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    justifyContent="flex-start"
                    px={4}
                    borderRadius="xl"
                    _hover={{ 
                      bg: 'rgba(255, 107, 0, 0.1)',
                      transform: 'translateX(4px)'
                    }}
                    transition="all 0.2s"
                  >
                    Logout
                  </Button>
                )}
              </VStack>
            </VStack>

            {/* Footer Section */}
            <VStack spacing={6} width="100%" mt="auto">
              {/* Quick Contact Buttons */}
              <VStack spacing={3} width="100%">
                <HStack spacing={3} width="100%">
                  <Button
                    as="a"
                    href="tel:9709738550"
                    flex={1}
                    size="lg"
                    height="56px"
                    variant="outline"
                    borderColor={colors.brand.primary}
                    color={colors.brand.primary}
                    fontSize="md"
                    fontWeight="600"
                    borderRadius="full"
                    leftIcon={<FiPhone size={18} />}
                    _hover={{
                      bg: `${colors.brand.primary}10`,
                      borderColor: colors.brand.primary,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 10px 25px ${colors.brand.primary}30`
                    }}
                    _active={{
                      transform: 'translateY(0)'
                    }}
                    transition="all 0.3s"
                  >
                    Call
                  </Button>
                  
                  <Button
                    as="a"
                    href="sms:9709738550"
                    flex={1}
                    size="lg"
                    height="56px"
                    variant="outline"
                    borderColor={colors.brand.primary}
                    color={colors.brand.primary}
                    fontSize="md"
                    fontWeight="600"
                    borderRadius="full"
                    leftIcon={<FiMessageCircle size={18} />}
                    _hover={{
                      bg: `${colors.brand.primary}10`,
                      borderColor: colors.brand.primary,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 10px 25px ${colors.brand.primary}30`
                    }}
                    _active={{
                      transform: 'translateY(0)'
                    }}
                    transition="all 0.3s"
                  >
                    Text
                  </Button>
                </HStack>
              </VStack>

              {/* Primary CTA */}
              <Button
                size="lg"
                width="100%"
                height="60px"
                bg="white"
                color={colors.dark.black}
                fontSize="lg"
                fontWeight="600"
                borderRadius="full"
                onClick={() => {
                  window.location.href = '/invoice/';
                  onClose();
                }}
                rightIcon={<FiArrowRight size={18} />}
                position="relative"
                overflow="hidden"
                _hover={{
                  transform: 'scale(1.02)',
                  boxShadow: '0 15px 35px rgba(255, 255, 255, 0.25)'
                }}
                _active={{
                  transform: 'scale(0.98)',
                  bg: colors.accent.neon,
                  color: colors.dark.black
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                Fuel Up
              </Button>

              {/* Footer Info */}
              <VStack 
                spacing={3}
                width="100%"
                pt={4}
                borderTop="1px solid"
                borderColor="whiteAlpha.100"
              >
                <HStack spacing={3} color="whiteAlpha.600" fontSize="sm">
                  <HStack spacing={1}>
                    <Box as={FiMapPin} size={14} />
                    <Text>Ridgway, CO</Text>
                  </HStack>
                  <Text color="whiteAlpha.300">•</Text>
                  <Text>7,200ft</Text>
                </HStack>
                <HStack spacing={1} color="whiteAlpha.500" fontSize="sm">
                  <Box as={FiMail} size={14} />
                  <Text>hello@neonburro.com</Text>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;