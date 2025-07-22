import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  HStack,
  InputGroup,
  InputRightElement,
  IconButton,
  Image,
  keyframes,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiUnlock, FiEye, FiEyeOff, FiArrowLeft, FiUserPlus } from 'react-icons/fi';

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
    gray: '#1A1A1A',
  }
};

// Animations
const glow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 20px rgba(0, 229, 229, 0.5)); }
  50% { filter: drop-shadow(0 0 40px rgba(0, 229, 229, 0.8)); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// Simplified Matrix Rain for performance
const MatrixRain = () => {
  return (
    <Box
      position="absolute"
      inset={0}
      opacity={0.1}
      pointerEvents="none"
      overflow="hidden"
    >
      {[...Array(5)].map((_, i) => (
        <Text
          key={i}
          position="absolute"
          left={`${i * 25}%`}
          top="-50px"
          fontSize="sm"
          fontFamily="mono"
          color={colors.brand.primary}
          animation={`fall ${10 + i * 2}s linear infinite ${i}s`}
          sx={{
            '@keyframes fall': {
              '0%': { transform: 'translateY(-50px)' },
              '100%': { transform: 'translateY(100vh)' }
            }
          }}
        >
          {['01', '10', '11', '00'][i % 4]}
        </Text>
      ))}
    </Box>
  );
};

const BurroGateKeeper = ({ onAuthenticated }) => {
  const [accessCode, setAccessCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsUnlocking(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (accessCode === 'BURRO2049' || accessCode === 'DEMO') {
        toast({
          title: "Access Granted",
          description: "Welcome to Base Camp",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        
        onAuthenticated(true);
        window.location.href = '/members/';
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid access code. Try 'DEMO' for preview access.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        setIsUnlocking(false);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Box
      minH="100vh"
      bg={colors.dark.black}
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <MatrixRain />

      {/* Subtle background gradients */}
      <Box
        position="absolute"
        top="20%"
        left="10%"
        width="600px"
        height="600px"
        borderRadius="full"
        bg={colors.brand.primary}
        opacity={0.05}
        filter="blur(150px)"
        animation={`${float} 15s ease-in-out infinite`}
      />
      <Box
        position="absolute"
        bottom="10%"
        right="10%"
        width="400px"
        height="400px"
        borderRadius="full"
        bg={colors.accent.neon}
        opacity={0.05}
        filter="blur(120px)"
        animation={`${float} 12s ease-in-out infinite 2s`}
      />

      <Container maxW="md" position="relative" zIndex={1}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Card */}
          <Box
            bg="rgba(255, 255, 255, 0.02)"
            backdropFilter="blur(20px)"
            border="2px solid"
            borderColor={isUnlocking ? colors.accent.neon : "rgba(255, 255, 255, 0.08)"}
            borderRadius="2xl"
            p={{ base: 6, md: 10 }}
            position="relative"
            overflow="hidden"
            transition="all 0.5s"
            boxShadow={isUnlocking ? `0 0 60px ${colors.accent.neon}44` : 'none'}
          >
            {/* Corner accents */}
            <Box
              position="absolute"
              top={0}
              left={0}
              width="60px"
              height="60px"
              borderTop="2px solid"
              borderLeft="2px solid"
              borderColor={colors.brand.primary}
              borderTopLeftRadius="2xl"
              opacity={isUnlocking ? 1 : 0.3}
              transition="all 0.5s"
            />
            <Box
              position="absolute"
              bottom={0}
              right={0}
              width="60px"
              height="60px"
              borderBottom="2px solid"
              borderRight="2px solid"
              borderColor={colors.accent.neon}
              borderBottomRightRadius="2xl"
              opacity={isUnlocking ? 1 : 0.3}
              transition="all 0.5s"
            />

            <VStack spacing={8} as="form" onSubmit={handleSubmit}>
              {/* Logo/Favicon */}
              <Box
                position="relative"
                animation={isUnlocking ? `${glow} 1s ease-in-out infinite` : 'none'}
              >
                <Image
                  src="/favicon.svg"
                  alt="Neon Burro"
                  width="80px"
                  height="80px"
                  transition="all 0.3s"
                  transform={isUnlocking ? 'rotate(180deg)' : 'rotate(0deg)'}
                  filter="brightness(1.2)"
                />
                {/* Rotating ring when unlocking */}
                {isUnlocking && (
                  <Box
                    position="absolute"
                    inset="-10px"
                    borderRadius="full"
                    border="2px solid"
                    borderColor={colors.accent.neon}
                    borderTopColor="transparent"
                    animation="spin 1s linear infinite"
                    sx={{
                      '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' }
                      }
                    }}
                  />
                )}
              </Box>

              <VStack spacing={2} textAlign="center">
                <Heading
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="bold"
                  color="white"
                  letterSpacing="tight"
                >
                  Base Camp Access
                </Heading>
                <Text color="gray.400" fontSize={{ base: "sm", md: "md" }}>
                  Enter your access code to continue
                </Text>
              </VStack>

              <FormControl isRequired>
                <FormLabel 
                  color="gray.300" 
                  fontSize="sm"
                  fontWeight="medium"
                  mb={2}
                >
                  Access Code
                </FormLabel>
                <InputGroup size="lg">
                  <Input
                    type={showCode ? "text" : "password"}
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                    placeholder="Enter your code"
                    bg="rgba(255, 255, 255, 0.03)"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.1)"
                    borderRadius="xl"
                    fontSize="md"
                    fontFamily="mono"
                    letterSpacing="wider"
                    _hover={{
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      bg: 'rgba(255, 255, 255, 0.05)'
                    }}
                    _focus={{
                      borderColor: colors.brand.primary,
                      boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                      bg: 'rgba(0, 229, 229, 0.05)'
                    }}
                    color="white"
                    _placeholder={{ color: 'gray.500' }}
                    autoComplete="off"
                  />
                  <InputRightElement>
                    <IconButton
                      size="sm"
                      variant="ghost"
                      icon={showCode ? <FiEyeOff /> : <FiEye />}
                      onClick={() => setShowCode(!showCode)}
                      color="gray.400"
                      _hover={{ 
                        color: 'white',
                        bg: 'whiteAlpha.100'
                      }}
                      borderRadius="lg"
                      aria-label="Toggle password visibility"
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <VStack spacing={4} width="100%">
                <Button
                  type="submit"
                  size="lg"
                  width="full"
                  bg="white"
                  color={colors.dark.black}
                  fontSize="md"
                  fontWeight="bold"
                  borderRadius="full"
                  height="56px"
                  isLoading={isLoading}
                  loadingText="Authenticating..."
                  rightIcon={<FiUnlock />}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 35px rgba(255, 255, 255, 0.2)',
                  }}
                  _active={{
                    transform: 'translateY(0)',
                  }}
                  transition="all 0.3s"
                >
                  Enter Base Camp
                </Button>

                {/* Demo hint */}
                <HStack 
                  spacing={2} 
                  px={4} 
                  py={2} 
                  borderRadius="lg"
                  bg="whiteAlpha.50"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                >
                  <Text fontSize="xs" color="gray.400">
                    Demo access:
                  </Text>
                  <Text 
                    fontSize="xs" 
                    color={colors.accent.neon}
                    fontFamily="mono"
                    fontWeight="bold"
                  >
                    DEMO
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          </Box>

          {/* Footer Links */}
          <HStack
            justify="center"
            mt={8}
            spacing={6}
            color="gray.500"
            fontSize="sm"
          >
            <Button
              variant="ghost"
              size="sm"
              color="gray.500"
              leftIcon={<FiArrowLeft />}
              _hover={{ 
                color: 'white',
                bg: 'whiteAlpha.100'
              }}
              onClick={() => window.location.href = '/'}
              borderRadius="lg"
            >
              Back to Home
            </Button>
            <Box width="1px" height="20px" bg="whiteAlpha.200" />
            <Button
              variant="ghost"
              size="sm"
              color="gray.500"
              rightIcon={<FiUserPlus />}
              _hover={{ 
                color: colors.brand.primary,
                bg: 'whiteAlpha.100'
              }}
              onClick={() => window.location.href = '/contact/'}
              borderRadius="lg"
            >
              Request Access
            </Button>
          </HStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default BurroGateKeeper;