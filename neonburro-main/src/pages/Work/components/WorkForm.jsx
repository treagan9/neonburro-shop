import { Box, Container, Heading, Text, VStack, HStack, Input, Textarea, Button, Checkbox, useToast, keyframes } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FiUser, FiMail, FiShield, FiBriefcase, FiSend, FiFileText, FiLock, FiKey } from 'react-icons/fi';

const MotionBox = motion(Box);

// Subtle scan line effect
const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const WorkForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    reason: '',
    hasNDA: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const toast = useToast();
  
  // Scroll parallax
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0.95]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.99]);
  
  // Mouse parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / innerWidth * 10;
      const y = (clientY - innerHeight / 2) / innerHeight * 10;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "work-access-form",
          ...formData,
          hasNDA: formData.hasNDA ? "yes" : "no"
        })
      });

      if (response.ok) {
        toast({
          title: "Request Submitted",
          description: "We'll review your application within 24 hours.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        
        setFormData({
          name: '',
          email: '',
          company: '',
          reason: '',
          hasNDA: false,
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Error",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Box 
      ref={containerRef}
      position="relative" 
      py={{ base: 16, md: 24 }} 
      bg="dark.black"
      minH="100vh"
      display="flex"
      alignItems="center"
      overflow="hidden"
    >
      {/* Animated parallax background with teal and banana */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.5}
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        transition="transform 0.3s ease-out"
      >
        <Box
          position="absolute"
          top="20%"
          left="10%"
          width="500px"
          height="500px"
          borderRadius="full"
          bg="radial-gradient(circle, #00E5E5 0%, transparent 50%)"
          filter="blur(120px)"
          opacity={0.04}
          animation="pulse 10s ease-in-out infinite"
        />
        <Box
          position="absolute"
          bottom="20%"
          right="15%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="radial-gradient(circle, #FFE500 0%, transparent 50%)"
          filter="blur(100px)"
          opacity={0.03}
          animation="pulse 12s ease-in-out infinite 2s"
        />
        <Box
          position="absolute"
          top="60%"
          left="50%"
          width="300px"
          height="300px"
          borderRadius="full"
          bg="radial-gradient(circle, #00E5E5 0%, transparent 50%)"
          filter="blur(100px)"
          opacity={0.02}
          animation="pulse 14s ease-in-out infinite 4s"
        />
      </Box>

      {/* Subtle scan line */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="100px"
        bgGradient="linear(to-b, transparent, rgba(0, 229, 229, 0.02), transparent)"
        animation={`${scanline} 10s linear infinite`}
        pointerEvents="none"
        opacity={0.3}
      />

      {/* Digital rain effect - very subtle */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          left={`${i * 20 + 10}%`}
          top="-50px"
          width="1px"
          height="30px"
          bg="linear-gradient(to-b, transparent, #00E5E5, transparent)"
          opacity={0.05}
          animation={`fall ${8 + i * 0.5}s ${i * 0.3}s linear infinite`}
          sx={{
            '@keyframes fall': {
              '0%': { transform: 'translateY(-50px)' },
              '100%': { transform: 'translateY(calc(100vh + 50px))' }
            }
          }}
        />
      ))}

      <Container maxW="600px" px={{ base: 4, md: 8 }} position="relative">
        <motion.div style={{ opacity, scale }}>
          <VStack spacing={{ base: 8, md: 10 }}>
            {/* Header */}
            <VStack spacing={4} textAlign="center">
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Security badge with teal/banana accents */}
                <HStack
                  spacing={2}
                  px={4}
                  py={2}
                  borderRadius="full"
                  bg="rgba(0, 229, 229, 0.04)"
                  backdropFilter="blur(20px)"
                  border="1px solid"
                  borderColor="rgba(0, 229, 229, 0.08)"
                  mb={4}
                  display="inline-flex"
                  position="relative"
                  overflow="hidden"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  cursor="pointer"
                  transition="all 0.3s"
                  _hover={{
                    borderColor: 'rgba(0, 229, 229, 0.15)',
                    transform: 'scale(1.02)',
                    boxShadow: '0 0 20px rgba(0, 229, 229, 0.15)'
                  }}
                >
                  <Box
                    position="absolute"
                    inset={0}
                    bg="linear-gradient(90deg, transparent, rgba(255, 229, 0, 0.05), transparent)"
                    transform={isHovered ? "translateX(100%)" : "translateX(-100%)"}
                    transition="transform 0.8s"
                  />
                  <Box as={FiLock} size={14} color="brand.primary" />
                  <Text 
                    color="brand.primary"
                    fontSize="xs"
                    fontWeight="semibold"
                    letterSpacing="wider"
                    textTransform="uppercase"
                  >
                    Portfolio Under NDA
                  </Text>
                </HStack>

                <Heading
                  as="h1"
                  fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                  fontWeight="bold"
                  color="text.primary"
                  letterSpacing="tight"
                  position="relative"
                >
                  Request Portfolio
                  <Box
                    as="span"
                    display="block"
                    mt={1}
                    bgGradient="linear(to-r, #00E5E5, #FFE500)"
                    bgClip="text"
                    position="relative"
                    sx={{
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'inherit',
                        filter: 'blur(20px)',
                        opacity: 0.2,
                        zIndex: -1
                      }
                    }}
                  >
                    Access
                  </Box>
                </Heading>
              </MotionBox>

              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  color="text.secondary"
                  maxW="400px"
                >
                  View our confidential work with verified credentials
                </Text>
              </MotionBox>
            </VStack>

            {/* Form with enhanced styling */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              width="100%"
            >
              <Box
                as="form"
                name="work-access-form"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                p={{ base: 6, md: 8 }}
                borderRadius="2xl"
                bg="rgba(255, 255, 255, 0.02)"
                backdropFilter="blur(20px)"
                border="2px solid"
                borderColor="rgba(255, 255, 255, 0.06)"
                position="relative"
                overflow="hidden"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  borderColor: 'rgba(0, 229, 229, 0.1)',
                  bg: 'rgba(255, 255, 255, 0.025)',
                  boxShadow: '0 20px 40px rgba(0, 229, 229, 0.05)'
                }}
              >
                {/* Gradient glow effect */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  width="200%"
                  height="200%"
                  bg="radial-gradient(circle, rgba(0, 229, 229, 0.03) 0%, transparent 40%)"
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                  transition="opacity 0.5s"
                  pointerEvents="none"
                />

                <input type="hidden" name="form-name" value="work-access-form" />
                
                <VStack spacing={5}>
                  {/* Name Input */}
                  <Box width="100%">
                    <HStack mb={2} spacing={2}>
                      <Box as={FiUser} size={14} color="brand.primary" opacity={0.6} />
                      <Text 
                        color="text.primary" 
                        fontSize="sm" 
                        fontWeight="medium"
                      >
                        Full Name
                      </Text>
                    </HStack>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      size="lg"
                      bg="rgba(255, 255, 255, 0.01)"
                      border="1px solid"
                      borderColor="rgba(255, 255, 255, 0.08)"
                      borderRadius="lg"
                      color="text.primary"
                      fontSize="md"
                      _placeholder={{ color: 'text.muted', fontSize: 'sm' }}
                      _hover={{ 
                        borderColor: 'rgba(0, 229, 229, 0.15)',
                        bg: 'rgba(0, 229, 229, 0.01)'
                      }}
                      _focus={{ 
                        borderColor: 'rgba(0, 229, 229, 0.3)',
                        boxShadow: '0 0 0 1px rgba(0, 229, 229, 0.15)',
                        bg: 'rgba(0, 229, 229, 0.015)'
                      }}
                      _focusVisible={{
                        borderColor: 'rgba(0, 229, 229, 0.3)',
                        boxShadow: '0 0 0 1px rgba(0, 229, 229, 0.15)'
                      }}
                      transition="all 0.2s"
                      required
                    />
                  </Box>

                  {/* Email Input */}
                  <Box width="100%">
                    <HStack mb={2} spacing={2}>
                      <Box as={FiMail} size={14} color="accent.banana" opacity={0.6} />
                      <Text 
                        color="text.primary" 
                        fontSize="sm" 
                        fontWeight="medium"
                      >
                        Email Address
                      </Text>
                    </HStack>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      size="lg"
                      bg="rgba(255, 255, 255, 0.01)"
                      border="1px solid"
                      borderColor="rgba(255, 255, 255, 0.08)"
                      borderRadius="lg"
                      color="text.primary"
                      fontSize="md"
                      _placeholder={{ color: 'text.muted', fontSize: 'sm' }}
                      _hover={{ 
                        borderColor: 'rgba(255, 229, 0, 0.15)',
                        bg: 'rgba(255, 229, 0, 0.01)'
                      }}
                      _focus={{ 
                        borderColor: 'rgba(255, 229, 0, 0.3)',
                        boxShadow: '0 0 0 1px rgba(255, 229, 0, 0.15)',
                        bg: 'rgba(255, 229, 0, 0.015)'
                      }}
                      _focusVisible={{
                        borderColor: 'rgba(255, 229, 0, 0.3)',
                        boxShadow: '0 0 0 1px rgba(255, 229, 0, 0.15)'
                      }}
                      transition="all 0.2s"
                      required
                    />
                  </Box>

                  {/* Company Input */}
                  <Box width="100%">
                    <HStack mb={2} spacing={2}>
                      <Box as={FiBriefcase} size={14} color="brand.primary" opacity={0.6} />
                      <Text 
                        color="text.primary" 
                        fontSize="sm" 
                        fontWeight="medium"
                      >
                        Company
                      </Text>
                    </HStack>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                      size="lg"
                      bg="rgba(255, 255, 255, 0.01)"
                      border="1px solid"
                      borderColor="rgba(255, 255, 255, 0.08)"
                      borderRadius="lg"
                      color="text.primary"
                      fontSize="md"
                      _placeholder={{ color: 'text.muted', fontSize: 'sm' }}
                      _hover={{ 
                        borderColor: 'rgba(0, 229, 229, 0.15)',
                        bg: 'rgba(0, 229, 229, 0.01)'
                      }}
                      _focus={{ 
                        borderColor: 'rgba(0, 229, 229, 0.3)',
                        boxShadow: '0 0 0 1px rgba(0, 229, 229, 0.15)',
                        bg: 'rgba(0, 229, 229, 0.015)'
                      }}
                      _focusVisible={{
                        borderColor: 'rgba(0, 229, 229, 0.3)',
                        boxShadow: '0 0 0 1px rgba(0, 229, 229, 0.15)'
                      }}
                      transition="all 0.2s"
                      required
                    />
                  </Box>

                  {/* Reason Textarea */}
                  <Box width="100%">
                    <HStack mb={2} spacing={2}>
                      <Box as={FiFileText} size={14} color="accent.banana" opacity={0.6} />
                      <Text 
                        color="text.primary" 
                        fontSize="sm" 
                        fontWeight="medium"
                      >
                        Project Details
                      </Text>
                    </HStack>
                    <Textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      placeholder="Brief description of your project and what you're looking for..."
                      size="lg"
                      rows={4}
                      bg="rgba(255, 255, 255, 0.01)"
                      border="1px solid"
                      borderColor="rgba(255, 255, 255, 0.08)"
                      borderRadius="lg"
                      color="text.primary"
                      fontSize="md"
                      _placeholder={{ color: 'text.muted', fontSize: 'sm' }}
                      _hover={{ 
                        borderColor: 'rgba(255, 229, 0, 0.15)',
                        bg: 'rgba(255, 229, 0, 0.01)'
                      }}
                      _focus={{ 
                        borderColor: 'rgba(255, 229, 0, 0.3)',
                        boxShadow: '0 0 0 1px rgba(255, 229, 0, 0.15)',
                        bg: 'rgba(255, 229, 0, 0.015)'
                      }}
                      _focusVisible={{
                        borderColor: 'rgba(255, 229, 0, 0.3)',
                        boxShadow: '0 0 0 1px rgba(255, 229, 0, 0.15)'
                      }}
                      transition="all 0.2s"
                      resize="none"
                      required
                    />
                  </Box>

                  {/* NDA Checkbox with gradient background */}
                  <Box 
                    width="100%" 
                    p={4}
                    borderRadius="lg"
                    bgGradient="linear(135deg, rgba(0, 229, 229, 0.02), rgba(255, 229, 0, 0.01))"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.05)"
                    transition="all 0.2s"
                    _hover={{
                      borderColor: 'rgba(0, 229, 229, 0.1)',
                      bg: 'rgba(0, 229, 229, 0.025)'
                    }}
                  >
                    <Checkbox
                      name="hasNDA"
                      isChecked={formData.hasNDA}
                      onChange={handleChange}
                      colorScheme="teal"
                      borderColor="rgba(0, 229, 229, 0.3)"
                      iconColor="dark.black"
                    >
                      <Text color="text.secondary" fontSize="sm">
                        I can sign an NDA if required
                      </Text>
                    </Checkbox>
                  </Box>

                  {/* Submit Button with gradient */}
                  <Button
                    type="submit"
                    size="lg"
                    width="100%"
                    bgGradient="linear(to-r, #00E5E5, #00D9D9)"
                    color="dark.black"
                    fontWeight="semibold"
                    fontSize="md"
                    borderRadius="lg"
                    height="52px"
                    position="relative"
                    overflow="hidden"
                    isLoading={isSubmitting}
                    loadingText="Submitting..."
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 229, 0, 0.2), transparent)',
                      transition: 'left 0.6s',
                    }}
                    _hover={{
                      transform: 'translateY(-1px)',
                      boxShadow: '0 10px 30px rgba(0, 229, 229, 0.25)',
                      _before: {
                        left: '100%',
                      }
                    }}
                    _active={{
                      transform: 'translateY(0)',
                    }}
                    transition="all 0.2s"
                  >
                    Request Access
                  </Button>
                </VStack>
              </Box>
            </MotionBox>

            {/* Trust indicators */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Box
                position="relative"
                borderRadius="xl"
                overflow="hidden"
                bg="rgba(255, 255, 255, 0.01)"
                backdropFilter="blur(20px)"
                p={0.5}
              >
                {/* Animated border */}
                <Box
                  position="absolute"
                  inset="-1px"
                  borderRadius="xl"
                  background="linear-gradient(90deg, #00E5E5, #FFE500, #00E5E5)"
                  backgroundSize="200% 100%"
                  animation="borderMove 3s linear infinite"
                  opacity={0.1}
                  sx={{
                    '@keyframes borderMove': {
                      '0%': { backgroundPosition: '200% 0%' },
                      '100%': { backgroundPosition: '-200% 0%' }
                    }
                  }}
                />
                
                <HStack
                  spacing={3}
                  px={4}
                  py={3}
                  borderRadius="lg"
                  bg="dark.black"
                  color="text.muted"
                  fontSize="xs"
                  justify="center"
                  position="relative"
                >
                  <HStack spacing={2}>
                    <Box 
                      as={FiShield} 
                      color="brand.primary" 
                      opacity={0.8}
                      filter="drop-shadow(0 0 3px rgba(0, 229, 229, 0.5))"
                    />
                    <Text>256-bit SSL</Text>
                  </HStack>
                  <Box w="1px" h="16px" bg="rgba(255, 255, 255, 0.1)" />
                  <HStack spacing={2}>
                    <Box 
                      as={FiKey} 
                      color="accent.banana" 
                      opacity={0.8}
                      filter="drop-shadow(0 0 3px rgba(255, 229, 0, 0.5))"
                    />
                    <Text>Encrypted Storage</Text>
                  </HStack>
                  <Box w="1px" h="16px" bg="rgba(255, 255, 255, 0.1)" />
                  <HStack spacing={2}>
                    <Box 
                      width="6px" 
                      height="6px" 
                      borderRadius="full" 
                      bg="#39FF14"
                      boxShadow="0 0 10px #39FF14"
                      animation="pulse 2s ease-in-out infinite"
                    />
                    <Text>100% Secure</Text>
                  </HStack>
                </HStack>
              </Box>
            </MotionBox>
          </VStack>
        </motion.div>
      </Container>
    </Box>
  );
};

export default WorkForm;