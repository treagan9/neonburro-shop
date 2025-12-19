import { Box, Container, HStack, Image, Icon, Badge, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const MotionBox = motion(Box);

const colors = {
  brand: {
    primary: '#00E5E5',
  },
  accent: {
    neon: '#39FF14',
    violet: '#8B5CF6',
  },
  dark: {
    black: '#0A0A0A',
  }
};

const MAIN_DOMAIN = 'https://neonburro.com';

const ShopNavigation = () => {
  const { getCartItemsCount, setIsOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const itemCount = getCartItemsCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
    >
      <Box
        bg={isScrolled ? "rgba(10, 10, 10, 0.95)" : "transparent"}
        backdropFilter={isScrolled ? "blur(12px)" : "none"}
        borderBottom="1px solid"
        borderColor={isScrolled ? "whiteAlpha.100" : "transparent"}
        boxShadow={isScrolled ? "0 4px 30px rgba(0,0,0,0.15)" : "none"}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      >
        <Container maxW="1400px" px={{ base: 4, md: 8 }}>
          <HStack 
            justify="space-between" 
            align="center"
            height={{ base: "72px", md: "80px" }}
          >
            {/* Logo - links to main domain */}
            <HStack spacing={3}>
              <Box 
                cursor="pointer" 
                onClick={() => window.location.href = MAIN_DOMAIN}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{ 
                  transform: 'translateY(-2px)',
                  filter: 'brightness(1.3) drop-shadow(0 0 20px rgba(0, 229, 229, 0.4))'
                }}
              >
                <Image 
                  src="/logo-shop.svg" 
                  alt="Neon Burro Shop"
                  height={{ base: "44px", md: "56px" }}
                  width="auto"
                  filter="brightness(1.2)"
                />
              </Box>
              
              {/* Shop indicator */}
              <Box
                display={{ base: 'none', md: 'block' }}
                px={2.5}
                py={1}
                borderRadius="md"
                bg={`${colors.accent.violet}15`}
                border="1px solid"
                borderColor={`${colors.accent.violet}30`}
              >
                <Text
                  fontSize="xs"
                  fontWeight="700"
                  color={colors.accent.violet}
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Shop
                </Text>
              </Box>
            </HStack>

            {/* Cart Button */}
            <MotionBox
              position="relative"
              cursor="pointer"
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              p={3}
              borderRadius="xl"
              border="1px solid"
              borderColor={isScrolled ? "whiteAlpha.100" : "transparent"}
              bg={isScrolled ? "whiteAlpha.50" : "transparent"}
              transition="all 0.2s"
              _hover={{ 
                bg: 'whiteAlpha.100',
                borderColor: 'whiteAlpha.200'
              }}
            >
              <Icon
                as={FiShoppingBag}
                boxSize={{ base: 6, md: 7 }}
                color="white"
                transition="color 0.2s"
              />
              {itemCount > 0 && (
                <Badge
                  position="absolute"
                  top="2px"
                  right="2px"
                  bg={colors.accent.neon}
                  color={colors.dark.black}
                  borderRadius="full"
                  minW="20px"
                  height="20px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="xs"
                  fontWeight="800"
                  boxShadow={`0 0 15px ${colors.accent.neon}60`}
                  animation="pulse 2s ease-in-out infinite"
                  sx={{
                    '@keyframes pulse': {
                      '0%, 100%': {
                        boxShadow: `0 0 15px ${colors.accent.neon}60`,
                      },
                      '50%': {
                        boxShadow: `0 0 25px ${colors.accent.neon}90`,
                      },
                    },
                  }}
                >
                  {itemCount}
                </Badge>
              )}
            </MotionBox>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default ShopNavigation;