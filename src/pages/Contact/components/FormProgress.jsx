import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiUser, FiBriefcase, FiMessageSquare, FiCheck } from 'react-icons/fi';

const MotionBox = motion(Box);

const FormProgress = ({ currentStep }) => {
  const colors = {
    primary: '#00E5E5',
    neon: '#39FF14',
    gray: '#666666',
    white: '#FFFFFF'
  };

  const steps = [
    { 
      number: 1, 
      title: 'About You', 
      icon: FiUser,
      description: 'Basic info'
    },
    { 
      number: 2, 
      title: 'Your Project', 
      icon: FiBriefcase,
      description: 'Project details'
    },
    { 
      number: 3, 
      title: 'Connect', 
      icon: FiMessageSquare,
      description: 'Contact preferences'
    }
  ];

  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <VStack spacing={8} mb={12}>
      <HStack spacing={0} position="relative" width="100%" maxW="600px">
        {/* Background Line */}
        <Box
          position="absolute"
          top="24px"
          left="40px"
          right="40px"
          height="3px"
          bg="whiteAlpha.100"
          borderRadius="full"
          zIndex={0}
        />
        
        {/* Progress Line with Glow */}
        <MotionBox
          position="absolute"
          top="24px"
          left="40px"
          height="3px"
          bg={colors.primary}
          borderRadius="full"
          zIndex={1}
          initial={{ width: '0%' }}
          animate={{ 
            width: `calc(${progressPercent}% * (100% - 80px) / 100%)`,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          boxShadow={`0 0 20px ${colors.primary}60`}
        />

        {/* Step Indicators */}
        <HStack spacing={0} width="100%" justify="space-between" position="relative" zIndex={2}>
          {steps.map((step, index) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            const Icon = step.icon;

            return (
              <VStack key={step.number} spacing={3} flex={1} align="center">
                <MotionBox
                  position="relative"
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    y: isActive ? -2 : 0
                  }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                >
                  {/* Pulse effect for active step */}
                  {isActive && (
                    <Box
                      position="absolute"
                      inset={-2}
                      borderRadius="full"
                      bg={colors.primary}
                      opacity={0.3}
                      animation="pulse 2s infinite"
                    />
                  )}
                  
                  {/* Main Circle */}
                  <Box
                    w="48px"
                    h="48px"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg={isCompleted ? colors.neon : isActive ? colors.primary : 'transparent'}
                    color={isCompleted || isActive ? 'black' : colors.gray}
                    fontWeight="700"
                    border="3px solid"
                    borderColor={isCompleted ? colors.neon : isActive ? colors.primary : 'whiteAlpha.200'}
                    position="relative"
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    boxShadow={
                      isCompleted ? `0 0 20px ${colors.neon}60` : 
                      isActive ? `0 0 20px ${colors.primary}60` : 
                      'none'
                    }
                  >
                    {isCompleted ? (
                      <FiCheck size={20} strokeWidth={3} />
                    ) : (
                      <Icon size={18} />
                    )}
                  </Box>
                </MotionBox>

                {/* Step Label - Desktop */}
                <VStack spacing={0.5} display={{ base: 'none', md: 'flex' }}>
                  <Text
                    fontSize="sm"
                    fontWeight={isActive ? '700' : '500'}
                    color={isActive ? colors.white : isCompleted ? colors.neon : colors.gray}
                    transition="all 0.3s"
                    letterSpacing="tight"
                  >
                    {step.title}
                  </Text>
                  <Text
                    fontSize="xs"
                    color={isActive ? 'gray.400' : 'gray.600'}
                    transition="all 0.3s"
                  >
                    {step.description}
                  </Text>
                </VStack>

                {/* Step Label - Mobile */}
                <Text
                  display={{ base: 'block', md: 'none' }}
                  fontSize="xs"
                  fontWeight={isActive ? '600' : '400'}
                  color={isActive ? colors.white : colors.gray}
                  transition="all 0.3s"
                >
                  Step {step.number}
                </Text>
              </VStack>
            );
          })}
        </HStack>
      </HStack>

      {/* Progress Info */}
      <HStack spacing={4} display={{ base: 'none', sm: 'flex' }}>
        <Text 
          fontSize="sm" 
          color="gray.400"
          fontWeight="600"
        >
          {Math.round((currentStep / steps.length) * 100)}% Complete
        </Text>
        <Box width="1px" height="16px" bg="whiteAlpha.200" />
        <Text 
          fontSize="sm" 
          color="gray.500"
        >
          {3 - currentStep} {currentStep === 3 ? 'step' : 'steps'} remaining
        </Text>
      </HStack>
    </VStack>
  );
};

export default FormProgress;