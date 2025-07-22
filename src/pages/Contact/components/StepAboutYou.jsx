import { Box, VStack, Input, Select, Text, Button, FormControl, FormLabel, InputGroup, InputLeftElement, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiBriefcase, FiGlobe } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const StepAboutYou = ({ formData, handleChange, onNext, isFieldValid, touched }) => {
  const colors = {
    primary: '#00E5E5',
    success: '#39FF14',
    error: '#FF4444'
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <MotionBox
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <VStack spacing={{ base: 5, md: 6 }} align="stretch">
        {/* Header */}
        <VStack align="start" spacing={2}>
          <Text 
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="800" 
            color="white"
            letterSpacing="-0.02em"
          >
            Let's get started
          </Text>
          <Text 
            color="gray.400" 
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="400"
          >
            Tell us a bit about yourself
          </Text>
        </VStack>

        {/* Form Fields */}
        <MotionVStack
          spacing={4}
          align="stretch"
          initial="hidden"
          animate="visible"
        >
          {/* Name Field */}
          <MotionBox
            custom={1}
            variants={inputVariants}
          >
            <FormControl isRequired isInvalid={touched.name && !isFieldValid('name')}>
              <FormLabel 
                color="gray.300" 
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="500"
                mb={2}
              >
                Your Name
              </FormLabel>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <Box color={formData.name ? colors.primary : 'gray.500'} transition="color 0.2s">
                    <FiUser size={16} />
                  </Box>
                </InputLeftElement>
                <Input
                  name="name"
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="John Doe"
                  bg="rgba(255, 255, 255, 0.02)"
                  border="1px solid"
                  borderColor={touched.name && !isFieldValid('name') ? colors.error : 'whiteAlpha.200'}
                  color="white"
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "44px", md: "48px" }}
                  _placeholder={{ color: 'gray.600' }}
                  _hover={{ 
                    borderColor: 'whiteAlpha.300', 
                    bg: 'rgba(255, 255, 255, 0.03)' 
                  }}
                  _focus={{ 
                    borderColor: colors.primary, 
                    boxShadow: `0 0 0 1px ${colors.primary}`,
                    bg: 'rgba(255, 255, 255, 0.03)'
                  }}
                  pl="2.5rem"
                  borderRadius="lg"
                  autoComplete="name"
                  transition="all 0.2s"
                />
              </InputGroup>
              {touched.name && !isFieldValid('name') && (
                <Text fontSize="xs" color={colors.error} mt={1} ml={1}>
                  Please enter at least 2 characters
                </Text>
              )}
            </FormControl>
          </MotionBox>

          {/* Email Field */}
          <MotionBox
            custom={2}
            variants={inputVariants}
          >
            <FormControl isRequired isInvalid={touched.email && !isFieldValid('email')}>
              <FormLabel 
                color="gray.300" 
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="500"
                mb={2}
              >
                Email Address
              </FormLabel>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <Box color={formData.email && isFieldValid('email') ? colors.primary : 'gray.500'} transition="color 0.2s">
                    <FiMail size={16} />
                  </Box>
                </InputLeftElement>
                <Input
                  name="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="john@example.com"
                  bg="rgba(255, 255, 255, 0.02)"
                  border="1px solid"
                  borderColor={touched.email && !isFieldValid('email') ? colors.error : 'whiteAlpha.200'}
                  color="white"
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "44px", md: "48px" }}
                  _placeholder={{ color: 'gray.600' }}
                  _hover={{ 
                    borderColor: 'whiteAlpha.300', 
                    bg: 'rgba(255, 255, 255, 0.03)' 
                  }}
                  _focus={{ 
                    borderColor: colors.primary, 
                    boxShadow: `0 0 0 1px ${colors.primary}`,
                    bg: 'rgba(255, 255, 255, 0.03)'
                  }}
                  pl="2.5rem"
                  borderRadius="lg"
                  autoComplete="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  transition="all 0.2s"
                />
              </InputGroup>
              {touched.email && !isFieldValid('email') && formData.email && (
                <Text fontSize="xs" color={colors.error} mt={1} ml={1}>
                  Please enter a valid email address
                </Text>
              )}
            </FormControl>
          </MotionBox>

          {/* Company Field */}
          <MotionBox
            custom={3}
            variants={inputVariants}
          >
            <FormControl>
              <FormLabel 
                color="gray.300" 
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="500"
                mb={2}
              >
                Company{' '}
                <Text as="span" color="gray.600" fontWeight="400">
                  (Optional)
                </Text>
              </FormLabel>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <Box color={formData.company ? colors.primary : 'gray.500'} transition="color 0.2s">
                    <FiBriefcase size={16} />
                  </Box>
                </InputLeftElement>
                <Input
                  name="company"
                  value={formData.company || ''}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Awesome Inc."
                  bg="rgba(255, 255, 255, 0.02)"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "44px", md: "48px" }}
                  _placeholder={{ color: 'gray.600' }}
                  _hover={{ 
                    borderColor: 'whiteAlpha.300', 
                    bg: 'rgba(255, 255, 255, 0.03)' 
                  }}
                  _focus={{ 
                    borderColor: colors.primary, 
                    boxShadow: `0 0 0 1px ${colors.primary}`,
                    bg: 'rgba(255, 255, 255, 0.03)'
                  }}
                  pl="2.5rem"
                  borderRadius="lg"
                  autoComplete="organization"
                  transition="all 0.2s"
                />
              </InputGroup>
            </FormControl>
          </MotionBox>

          {/* Source Field */}
          <MotionBox
            custom={4}
            variants={inputVariants}
          >
            <FormControl>
              <FormLabel 
                color="gray.300" 
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="500"
                mb={2}
              >
                How did you find us?
              </FormLabel>
              <Box position="relative">
                <Box
                  position="absolute"
                  left={3}
                  top="50%"
                  transform="translateY(-50%)"
                  color={formData.source ? colors.primary : 'gray.500'}
                  zIndex={2}
                  pointerEvents="none"
                  transition="color 0.2s"
                >
                  <FiGlobe size={16} />
                </Box>
                <Select
                  name="source"
                  value={formData.source || ''}
                  onChange={(e) => handleChange('source', e.target.value)}
                  placeholder="Select one..."
                  size="lg"
                  bg="rgba(255, 255, 255, 0.02)"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  color={formData.source ? 'white' : 'gray.500'}
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "44px", md: "48px" }}
                  pl="2.5rem"
                  _hover={{ 
                    borderColor: 'whiteAlpha.300', 
                    bg: 'rgba(255, 255, 255, 0.03)' 
                  }}
                  _focus={{ 
                    borderColor: colors.primary, 
                    boxShadow: `0 0 0 1px ${colors.primary}`,
                    bg: 'rgba(255, 255, 255, 0.03)'
                  }}
                  borderRadius="lg"
                  transition="all 0.2s"
                  sx={{
                    option: {
                      bg: '#1A1A1A',
                      color: 'white',
                      _hover: { bg: '#2A2A2A' },
                      fontSize: { base: "sm", md: "md" }
                    }
                  }}
                >
                  <option value="google">Google Search</option>
                  <option value="referral">Friend or Referral</option>
                  <option value="social">Social Media</option>
                  <option value="local">Local Community</option>
                  <option value="other">Other</option>
                </Select>
              </Box>
            </FormControl>
          </MotionBox>
        </MotionVStack>

        {/* Privacy Notice */}
        <Text fontSize="xs" color="gray.500" textAlign="center" mt={2}>
          Your information is secure and never shared
        </Text>

        {/* Submit Button */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            size="lg"
            bg={colors.primary}
            color="black"
            onClick={onNext}
            isDisabled={!isFieldValid('name') || !isFieldValid('email')}
            fontWeight="600"
            fontSize={{ base: "sm", md: "md" }}
            height={{ base: "48px", md: "52px" }}
            width="100%"
            _hover={{
              bg: colors.primary,
              transform: 'translateY(-2px)',
              boxShadow: `0 10px 30px ${colors.primary}66`
            }}
            _active={{ transform: 'translateY(0)' }}
            _disabled={{
              opacity: 0.5,
              cursor: 'not-allowed',
              transform: 'none',
              boxShadow: 'none'
            }}
            borderRadius="full"
            transition="all 0.2s"
          >
            Continue
          </Button>
        </MotionBox>
      </VStack>
    </MotionBox>
  );
};

export default StepAboutYou;