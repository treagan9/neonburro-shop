import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiUser, FiBriefcase, FiMessageSquare } from 'react-icons/fi';

const MotionBox = motion(Box);

const FormProgress = ({ currentStep }) => {
  const colors = {
    primary: '#00E5E5',
    gray: '#666666',
    white: '#FFFFFF'
  };

  const steps = [
    { 
      number: 1, 
      title: 'Contact Info', 
      icon: FiUser,
    },
    { 
      number: 2, 
      title: 'Project Details', 
      icon: FiBriefcase,
    },
    { 
      number: 3, 
      title: 'Preferences', 
      icon: FiMessageSquare,
    }
  ];

  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <VStack spacing={6} mb={10}>
      <HStack spacing={0} position="relative" width="100%" maxW="500px">
        {/* Background Line */}
        <Box
          position="absolute"
          top="20px"
          left="30px"
          right="30px"
          height="2px"
          bg="whiteAlpha.100"
          borderRadius="full"
          zIndex={0}
        />
        
        {/* Progress Line */}
        <MotionBox
          position="absolute"
          top="20px"
          left="30px"
          height="2px"
          bg={colors.primary}
          borderRadius="full"
          zIndex={1}
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* Step Indicators */}
        <HStack spacing={0} width="100%" justify="space-between" position="relative" zIndex={2}>
          {steps.map((step) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            const Icon = step.icon;

            return (
              <VStack key={step.number} spacing={2} flex={1}>
                <MotionBox
                  position="relative"
                  animate={{
                    scale: isActive ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Main Circle */}
                  <Box
                    w="40px"
                    h="40px"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg={isCompleted || isActive ? colors.primary : 'whiteAlpha.200'}
                    color={isCompleted || isActive ? colors.white : colors.gray}
                    fontWeight="600"
                    border="2px solid"
                    borderColor={isCompleted || isActive ? colors.primary : 'whiteAlpha.200'}
                    position="relative"
                    transition="all 0.3s"
                  >
                    {isCompleted ? (
                      <Text fontSize="sm" fontWeight="bold">✓</Text>
                    ) : (
                      <Icon size={16} />
                    )}
                  </Box>
                </MotionBox>

                {/* Step Label */}
                <Text
                  fontSize="xs"
                  fontWeight={isActive ? '600' : '400'}
                  color={isActive ? colors.white : colors.gray}
                  transition="all 0.3s"
                >
                  {step.title}
                </Text>
              </VStack>
            );
          })}
        </HStack>
      </HStack>

      {/* Progress Percentage */}
      <Text 
        fontSize="sm" 
        color="gray.400"
        fontWeight="500"
      >
        {Math.round((currentStep / steps.length) * 100)}% Complete
      </Text>
    </VStack>
  );
};

export default FormProgress;