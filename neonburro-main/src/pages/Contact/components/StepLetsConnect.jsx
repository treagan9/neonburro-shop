import { Box, VStack, Input, Select, Textarea, Button, HStack, FormControl, FormLabel, Text, InputGroup, InputLeftElement, SimpleGrid } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiVideo, FiMessageSquare, FiClock, FiArrowLeft, FiSend } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const StepLetsConnect = ({ formData, handleChange, onBack, onSubmit, isSubmitting }) => {
  const [showPhoneField, setShowPhoneField] = useState(false);
  const [showBestTime, setShowBestTime] = useState(false);
  
  const colors = {
    primary: '#00E5E5',
    purple: '#8B5CF6'
  };

  const contactMethods = [
    { value: 'email', label: 'Email', icon: FiMail },
    { value: 'phone', label: 'Phone', icon: FiPhone },
    { value: 'video', label: 'Video Call', icon: FiVideo },
    { value: 'text', label: 'Text/SMS', icon: FiMessageSquare }
  ];

  const timeSlots = [
    { value: 'morning', label: 'Morning', time: '9AM-12PM MT' },
    { value: 'afternoon', label: 'Afternoon', time: '12PM-5PM MT' },
    { value: 'evening', label: 'Evening', time: '5PM-8PM MT' },
    { value: 'flexible', label: 'Flexible', time: 'Any time' }
  ];

  const handleContactMethodChange = (method) => {
    const currentMethods = formData.contactMethod || [];
    let newMethods;
    
    if (currentMethods.includes(method)) {
      newMethods = currentMethods.filter(m => m !== method);
    } else {
      newMethods = [...currentMethods, method];
    }
    
    handleChange('contactMethod', newMethods);
    setShowPhoneField(newMethods.includes('phone') || newMethods.includes('video') || newMethods.includes('text'));
    setShowBestTime(newMethods.includes('phone') || newMethods.includes('video'));
  };

  const isStepValid = () => {
    const hasContactMethod = formData.contactMethod && formData.contactMethod.length > 0;
    const hasPhoneIfNeeded = !showPhoneField || (formData.phone && formData.phone.length >= 10);
    const hasTimeIfNeeded = !showBestTime || formData.bestTime;
    return hasContactMethod && hasPhoneIfNeeded && hasTimeIfNeeded;
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
            Contact Preferences
          </Text>
          <Text 
            color="gray.400" 
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="400"
          >
            How should we reach out?
          </Text>
        </VStack>

        {/* Form Fields */}
        <MotionVStack
          spacing={5}
          align="stretch"
          initial="hidden"
          animate="visible"
        >
          {/* Contact Methods */}
          <MotionBox
            custom={1}
            variants={inputVariants}
          >
            <FormControl isRequired>
              <FormLabel 
                color="gray.300" 
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="500"
                mb={3}
              >
                Preferred contact method(s)
              </FormLabel>
              <SimpleGrid columns={2} spacing={3}>
                {contactMethods.map(method => {
                  const Icon = method.icon;
                  const isSelected = (formData.contactMethod || []).includes(method.value);
                  
                  return (
                    <Box
                      key={method.value}
                      p={4}
                      borderRadius="lg"
                      border="1px solid"
                      borderColor={isSelected ? colors.purple : 'whiteAlpha.200'}
                      bg={isSelected ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255, 255, 255, 0.02)'}
                      cursor="pointer"
                      transition="all 0.2s"
                      onClick={() => handleContactMethodChange(method.value)}
                      _hover={{ 
                        borderColor: colors.purple,
                        bg: isSelected ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                        transform: 'translateY(-2px)'
                      }}
                      _active={{
                        transform: 'translateY(0)'
                      }}
                    >
                      <VStack spacing={2}>
                        <Box
                          p={2}
                          borderRadius="md"
                          bg={isSelected ? colors.purple : 'whiteAlpha.100'}
                          color={isSelected ? 'white' : 'gray.400'}
                          transition="all 0.2s"
                        >
                          <Icon size={18} />
                        </Box>
                        <Text 
                          color={isSelected ? 'white' : 'gray.300'}
                          fontSize="sm"
                          fontWeight="500"
                        >
                          {method.label}
                        </Text>
                      </VStack>
                    </Box>
                  );
                })}
              </SimpleGrid>
            </FormControl>
          </MotionBox>

          {/* Phone Field - Conditional */}
          <AnimatePresence>
            {showPhoneField && (
              <MotionBox
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FormControl isRequired>
                  <FormLabel 
                    color="gray.300" 
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="500"
                    mb={2}
                  >
                    Phone Number
                  </FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <Box color={formData.phone ? colors.purple : 'gray.500'} transition="color 0.2s">
                        <FiPhone size={16} />
                      </Box>
                    </InputLeftElement>
                    <Input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="(555) 123-4567"
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
                        borderColor: colors.purple, 
                        boxShadow: `0 0 0 1px ${colors.purple}`,
                        bg: 'rgba(255, 255, 255, 0.03)'
                      }}
                      pl="2.5rem"
                      borderRadius="lg"
                      autoComplete="tel"
                      transition="all 0.2s"
                    />
                  </InputGroup>
                </FormControl>
              </MotionBox>
            )}
          </AnimatePresence>

          {/* Best Time - Conditional */}
          <AnimatePresence>
            {showBestTime && (
              <MotionBox
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FormControl isRequired>
                  <FormLabel 
                    color="gray.300" 
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="500"
                    mb={3}
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <FiClock size={14} />
                    Best time to reach you
                  </FormLabel>
                  <SimpleGrid columns={2} spacing={3}>
                    {timeSlots.map(slot => {
                      const isSelected = formData.bestTime === slot.value;
                      
                      return (
                        <Box
                          key={slot.value}
                          p={3}
                          borderRadius="lg"
                          border="1px solid"
                          borderColor={isSelected ? colors.purple : 'whiteAlpha.200'}
                          bg={isSelected ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255, 255, 255, 0.02)'}
                          cursor="pointer"
                          transition="all 0.2s"
                          onClick={() => handleChange('bestTime', slot.value)}
                          _hover={{ 
                            borderColor: colors.purple,
                            bg: isSelected ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255, 255, 255, 0.03)'
                          }}
                        >
                          <VStack spacing={0.5} align="center">
                            <Text 
                              color={isSelected ? 'white' : 'gray.300'}
                              fontSize="sm"
                              fontWeight="600"
                            >
                              {slot.label}
                            </Text>
                            <Text 
                              color={isSelected ? 'gray.300' : 'gray.500'}
                              fontSize="xs"
                            >
                              {slot.time}
                            </Text>
                          </VStack>
                        </Box>
                      );
                    })}
                  </SimpleGrid>
                </FormControl>
              </MotionBox>
            )}
          </AnimatePresence>

          {/* Additional Information */}
          <MotionBox
            custom={2}
            variants={inputVariants}
          >
            <FormControl>
              <FormLabel 
                color="gray.300" 
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="500"
                mb={2}
              >
                Additional information{' '}
                <Text as="span" color="gray.600" fontWeight="400">
                  (Optional)
                </Text>
              </FormLabel>
              <Textarea
                value={formData.additionalInfo || ''}
                onChange={(e) => handleChange('additionalInfo', e.target.value)}
                placeholder="Any specific questions or requirements?"
                size="lg"
                rows={3}
                bg="rgba(255, 255, 255, 0.02)"
                border="1px solid"
                borderColor="whiteAlpha.200"
                color="white"
                fontSize={{ base: "sm", md: "md" }}
                _placeholder={{ color: 'gray.600' }}
                _hover={{ 
                  borderColor: 'whiteAlpha.300', 
                  bg: 'rgba(255, 255, 255, 0.03)' 
                }}
                _focus={{ 
                  borderColor: colors.purple, 
                  boxShadow: `0 0 0 1px ${colors.purple}`,
                  bg: 'rgba(255, 255, 255, 0.03)'
                }}
                borderRadius="lg"
                resize="none"
                transition="all 0.2s"
              />
            </FormControl>
          </MotionBox>
        </MotionVStack>

        {/* Privacy Notice */}
        <Text fontSize="xs" color="gray.500" textAlign="center">
          No spam, ever. We'll respond within 24 hours.
        </Text>

        {/* Navigation Buttons */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <HStack spacing={3}>
            <Button
              size="lg"
              variant="outline"
              borderColor="whiteAlpha.300"
              color="white"
              onClick={onBack}
              fontWeight="500"
              fontSize={{ base: "sm", md: "md" }}
              height={{ base: "48px", md: "52px" }}
              px={6}
              _hover={{ 
                bg: 'whiteAlpha.100',
                borderColor: 'whiteAlpha.400'
              }}
              borderRadius="full"
              leftIcon={<FiArrowLeft size={16} />}
              transition="all 0.2s"
            >
              Back
            </Button>
            <Button
              size="lg"
              bg={colors.purple}
              color="white"
              onClick={onSubmit}
              isLoading={isSubmitting}
              loadingText="Sending..."
              isDisabled={!isStepValid() || isSubmitting}
              fontWeight="600"
              fontSize={{ base: "sm", md: "md" }}
              height={{ base: "48px", md: "52px" }}
              _hover={{
                bg: colors.purple,
                transform: 'translateY(-2px)',
                boxShadow: `0 10px 30px ${colors.purple}66`
              }}
              _active={{ transform: 'translateY(0)' }}
              _disabled={{
                opacity: 0.5,
                cursor: 'not-allowed',
                transform: 'none',
                boxShadow: 'none'
              }}
              flex={1}
              borderRadius="full"
              rightIcon={!isSubmitting && <FiSend size={16} />}
              transition="all 0.2s"
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </Button>
          </HStack>
        </MotionBox>
      </VStack>
    </MotionBox>
  );
};

export default StepLetsConnect;