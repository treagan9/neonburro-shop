import { Box, VStack, Heading, Text, Button, HStack, Badge, keyframes, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheck, FiHome, FiCalendar, FiMail, FiClock } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const pulseAnimation = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;

const FormSuccessEnhanced = ({ formData, onNavigateHome }) => {
  const colors = {
    primary: '#00E5E5',
    success: '#39FF14',
    warm: '#FF6B00',
    purple: '#8B5CF6'
  };

  const nextSteps = [
    { 
      icon: FiMail,
      title: 'Check Your Email',
      description: 'Confirmation sent',
      color: colors.primary
    },
    { 
      icon: FiClock,
      title: 'Quick Review',
      description: 'Within 2 hours',
      color: colors.success
    },
    { 
      icon: FiCalendar,
      title: 'We\'ll Connect',
      description: 'Within 24 hours',
      color: colors.warm
    }
  ];

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      position="relative"
      width="100%"
    >
      <VStack spacing={{ base: 6, md: 8 }} maxW="600px" w="100%" mx="auto">
        <MotionBox
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          width="100%"
        >
          <Box
            p={{ base: 6, md: 10 }}
            bg="rgba(10, 10, 10, 0.8)"
            backdropFilter="blur(20px)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            borderRadius="2xl"
            boxShadow="0 20px 40px rgba(0,0,0,0.4)"
            position="relative"
            overflow="hidden"
          >
            {/* Subtle background glow */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="400px"
              height="400px"
              background={`radial-gradient(circle, ${colors.success}08 0%, transparent 60%)`}
              pointerEvents="none"
              animation={`${pulseAnimation} 4s ease-in-out infinite`}
            />

            <VStack spacing={{ base: 6, md: 8 }} position="relative">
              {/* Success Icon */}
              <MotionBox
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.3, 
                  duration: 0.8, 
                  type: "spring",
                  stiffness: 200
                }}
              >
                <Box
                  width="80px"
                  height="80px"
                  borderRadius="full"
                  bg={`${colors.success}22`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="2px solid"
                  borderColor={colors.success}
                  position="relative"
                >
                  <FiCheck size={36} color={colors.success} strokeWidth={3} />
                  {/* Pulse rings */}
                  <Box
                    position="absolute"
                    inset={0}
                    borderRadius="full"
                    border="1px solid"
                    borderColor={colors.success}
                    opacity={0.3}
                    animation="expand 1.5s ease-out"
                    sx={{
                      '@keyframes expand': {
                        '0%': { transform: 'scale(1)', opacity: 0.6 },
                        '100%': { transform: 'scale(1.5)', opacity: 0 }
                      }
                    }}
                  />
                </Box>
              </MotionBox>

              {/* Success Message */}
              <MotionVStack
                spacing={3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Heading 
                  size={{ base: "lg", md: "xl" }}
                  color="white"
                  fontWeight="800"
                  letterSpacing="-0.02em"
                  textAlign="center"
                >
                  Message Received
                </Heading>
                <Text 
                  color="gray.400" 
                  fontSize={{ base: "sm", md: "md" }}
                  textAlign="center"
                  maxW="400px"
                >
                  Thank you, <Text as="span" color="white" fontWeight="600">{formData.name}</Text>.
                  We've received your project inquiry and will be in touch soon.
                </Text>
              </MotionVStack>

              {/* Next Steps */}
              <MotionVStack
                spacing={3}
                width="100%"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Text 
                  fontSize="xs"
                  color="gray.500"
                  fontWeight="600"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  What happens next
                </Text>
                
                <VStack spacing={2} width="100%">
                  {nextSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <HStack
                        key={index}
                        width="100%"
                        p={3}
                        bg="rgba(255, 255, 255, 0.02)"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="whiteAlpha.100"
                        spacing={3}
                        transition="all 0.2s"
                        _hover={{
                          bg: 'rgba(255, 255, 255, 0.03)',
                          borderColor: 'whiteAlpha.200'
                        }}
                      >
                        <Box
                          p={2}
                          borderRadius="md"
                          bg={`${step.color}11`}
                          color={step.color}
                        >
                          <Icon size={16} />
                        </Box>
                        <VStack align="start" spacing={0} flex={1}>
                          <Text 
                            color="white" 
                            fontSize="sm"
                            fontWeight="600"
                          >
                            {step.title}
                          </Text>
                          <Text 
                            color="gray.500" 
                            fontSize="xs"
                          >
                            {step.description}
                          </Text>
                        </VStack>
                      </HStack>
                    );
                  })}
                </VStack>
              </MotionVStack>

              {/* Project Summary */}
              <MotionBox
                width="100%"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <HStack
                  p={3}
                  bg="whiteAlpha.50"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  justify="center"
                  spacing={3}
                  flexWrap="wrap"
                >
                  <Badge
                    px={2}
                    py={1}
                    borderRadius="md"
                    bg={`${colors.purple}22`}
                    color={colors.purple}
                    fontSize="xs"
                    fontWeight="600"
                  >
                    {formData.projectType?.replace(/-/g, ' ').toUpperCase()}
                  </Badge>
                  <Text color="gray.500" fontSize="xs">•</Text>
                  <Text color="gray.400" fontSize="xs" fontWeight="500">
                    {formData.timeline?.replace(/-/g, ' ')}
                  </Text>
                  <Text color="gray.500" fontSize="xs">•</Text>
                  <Text color="gray.400" fontSize="xs" fontWeight="500">
                    {formData.budget?.replace(/-/g, ' ')}
                  </Text>
                </HStack>
              </MotionBox>

              {/* Action Button */}
              <MotionBox
                width="100%"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <VStack spacing={3} width="100%">
                  <Button
                    size="lg"
                    width="100%"
                    bg={colors.primary}
                    color="black"
                    fontWeight="600"
                    fontSize={{ base: "sm", md: "md" }}
                    height={{ base: "48px", md: "52px" }}
                    onClick={onNavigateHome}
                    _hover={{
                      bg: colors.primary,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 10px 30px ${colors.primary}66`
                    }}
                    _active={{ transform: 'translateY(0)' }}
                    borderRadius="full"
                    leftIcon={<FiHome size={16} />}
                    transition="all 0.2s"
                  >
                    Back to Home
                  </Button>
                  
                  <Text 
                    color="gray.500" 
                    fontSize="xs"
                    textAlign="center"
                  >
                    Reference: #{Date.now().toString().slice(-8)}
                  </Text>
                </VStack>
              </MotionBox>
            </VStack>
          </Box>
        </MotionBox>
      </VStack>
    </MotionBox>
  );
};

export default FormSuccessEnhanced;