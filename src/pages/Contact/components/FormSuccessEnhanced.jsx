import { Box, VStack, Heading, Text, Button, HStack, Badge, keyframes, Image, Divider } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiHome, FiCalendar, FiMail, FiClock, FiZap, FiCoffee } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const pulseAnimation = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;

const confettiAnimation = keyframes`
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(300px) rotate(720deg); opacity: 0; }
`;

const FormSuccessEnhanced = ({ formData, onNavigateHome }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  
  const colors = {
    primary: '#00E5E5',
    success: '#39FF14',
    warm: '#FF6B00',
    purple: '#8B5CF6',
    banana: '#FFE500'
  };

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const nextSteps = [
    { 
      icon: FiMail,
      title: 'Check Your Inbox',
      description: 'Confirmation sent to hello@neonburro.com',
      color: colors.primary
    },
    { 
      icon: FiCoffee,
      title: 'We\'re On It',
      description: 'Reviewing your vision',
      color: colors.success
    },
    { 
      icon: FiZap,
      title: 'Lightning Fast Reply',
      description: 'Expect our response in 24hrs',
      color: colors.banana
    }
  ];

  // Fun messages based on project type
  const getPersonalizedMessage = () => {
    const messages = {
      'new-website': "A fresh new website? We're already sketching ideas!",
      'redesign': "Time for a glow-up! We love a good transformation story.",
      'ecommerce': "E-commerce excellence coming right up! Let's boost those sales.",
      'web-app': "Web apps are our jam! Can't wait to build something amazing.",
      'seo-content': "SEO success story in the making! Let's climb those rankings.",
      'maintenance': "We'll keep your site running smoother than a fresh jar of skippy.",
      'consultation': "Ready to share our mountain wisdom! Let's chat strategy.",
      'other': "Mystery project? We love surprises! Can't wait to learn more."
    };
    return messages[formData.projectType] || "Your project sounds amazing! We're excited to learn more.";
  };

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      position="relative"
      width="100%"
    >
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <>
            {[...Array(8)].map((_, i) => (
              <Box
                key={i}
                position="absolute"
                top="10%"
                left={`${10 + i * 12}%`}
                width="10px"
                height="10px"
                bg={[colors.primary, colors.success, colors.warm, colors.banana][i % 4]}
                borderRadius="sm"
                animation={`${confettiAnimation} 3s ease-out forwards`}
                animationDelay={`${i * 0.1}s`}
                transform={`rotate(${i * 45}deg)`}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <VStack spacing={{ base: 6, md: 8 }} maxW="650px" w="100%" mx="auto">
        <MotionBox
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 120 }}
          width="100%"
        >
          <Box
            p={{ base: 8, md: 12 }}
            bg="rgba(10, 10, 10, 0.9)"
            backdropFilter="blur(20px)"
            border="2px solid"
            borderColor={colors.success}
            borderRadius="3xl"
            boxShadow={`0 20px 60px rgba(57, 255, 20, 0.15)`}
            position="relative"
            overflow="hidden"
          >
            {/* Animated background gradient */}
            <Box
              position="absolute"
              top="-50%"
              left="-50%"
              width="200%"
              height="200%"
              background={`radial-gradient(circle at center, ${colors.success}06 0%, transparent 40%)`}
              pointerEvents="none"
              animation={`${pulseAnimation} 4s ease-in-out infinite`}
            />

            <VStack spacing={{ base: 6, md: 8 }} position="relative">
              {/* Success Image Instead of Icon */}
              <MotionBox
                initial={{ scale: 0, rotate: -360 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.3, 
                  duration: 1, 
                  type: "spring",
                  stiffness: 150,
                  damping: 15
                }}
              >
                <Box position="relative">
                  <Image
                    src="/services-hero-sms.png"
                    alt="Success"
                    width="120px"
                    height="120px"
                    borderRadius="full"
                    objectFit="cover"
                    border="3px solid"
                    borderColor={colors.success}
                    boxShadow={`0 0 40px ${colors.success}60`}
                  />
                  {/* Multiple pulse rings */}
                  {[1, 2, 3].map((ring) => (
                    <Box
                      key={ring}
                      position="absolute"
                      inset={0}
                      borderRadius="full"
                      border="1px solid"
                      borderColor={colors.success}
                      opacity={0.3}
                      animation={`expand ${1.5 + ring * 0.3}s ease-out infinite`}
                      animationDelay={`${ring * 0.2}s`}
                      sx={{
                        '@keyframes expand': {
                          '0%': { transform: 'scale(1)', opacity: 0.6 },
                          '100%': { transform: 'scale(1.8)', opacity: 0 }
                        }
                      }}
                    />
                  ))}
                </Box>
              </MotionBox>

              {/* Success Message with Personality */}
              <MotionVStack
                spacing={4}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <MotionHeading 
                  size={{ base: "lg", md: "xl" }}
                  color="white"
                  fontWeight="800"
                  letterSpacing="-0.02em"
                  textAlign="center"
                >
                  Woohoo! Message Received
                </MotionHeading>
                
                <VStack spacing={2}>
                  <Text 
                    color="gray.300" 
                    fontSize={{ base: "md", md: "lg" }}
                    textAlign="center"
                    maxW="450px"
                    lineHeight="1.6"
                  >
                    Thank you, <Text as="span" color={colors.primary} fontWeight="700">{formData.name}</Text>!
                    We're thrilled to help bring your vision to life.
                  </Text>
                  
                  <MotionText
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    color={colors.banana}
                    fontSize={{ base: "sm", md: "md" }}
                    textAlign="center"
                    fontWeight="500"
                    maxW="400px"
                  >
                    {getPersonalizedMessage()}
                  </MotionText>
                </VStack>
              </MotionVStack>

              {/* Next Steps with Fun Icons */}
              <MotionVStack
                spacing={4}
                width="100%"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Divider borderColor="whiteAlpha.200" />
                
                <Text 
                  fontSize="xs"
                  color="gray.500"
                  fontWeight="600"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  Here's What Happens Next
                </Text>
                
                <VStack spacing={3} width="100%">
                  {nextSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <MotionBox
                        key={index}
                        width="100%"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                      >
                        <HStack
                          width="100%"
                          p={4}
                          bg="rgba(255, 255, 255, 0.02)"
                          borderRadius="xl"
                          border="1px solid"
                          borderColor="whiteAlpha.100"
                          spacing={4}
                          transition="all 0.3s"
                          _hover={{
                            bg: 'rgba(255, 255, 255, 0.04)',
                            borderColor: step.color,
                            transform: 'translateX(4px)'
                          }}
                        >
                          <Box
                            p={2.5}
                            borderRadius="lg"
                            bg={`${step.color}15`}
                            color={step.color}
                            border="1px solid"
                            borderColor={`${step.color}30`}
                          >
                            <Icon size={18} />
                          </Box>
                          <VStack align="start" spacing={0.5} flex={1}>
                            <Text 
                              color="white" 
                              fontSize="sm"
                              fontWeight="600"
                            >
                              {step.title}
                            </Text>
                            <Text 
                              color="gray.400" 
                              fontSize="xs"
                              noOfLines={1}
                            >
                              {step.description}
                            </Text>
                          </VStack>
                        </HStack>
                      </MotionBox>
                    );
                  })}
                </VStack>
              </MotionVStack>

              {/* Project Summary Badge */}
              <MotionBox
                width="100%"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <HStack
                  p={4}
                  bg={`linear-gradient(135deg, ${colors.purple}08, ${colors.primary}08)`}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  justify="center"
                  spacing={3}
                  flexWrap="wrap"
                >
                  <Badge
                    px={3}
                    py={1.5}
                    borderRadius="full"
                    bg={`${colors.purple}22`}
                    color={colors.purple}
                    fontSize="xs"
                    fontWeight="700"
                    border="1px solid"
                    borderColor={`${colors.purple}40`}
                  >
                    {formData.projectType?.replace(/-/g, ' ').toUpperCase()}
                  </Badge>
                  <Box width="4px" height="4px" borderRadius="full" bg="whiteAlpha.400" />
                  <Text color="gray.300" fontSize="sm" fontWeight="600">
                    {formData.timeline?.replace(/-/g, ' ')}
                  </Text>
                  <Box width="4px" height="4px" borderRadius="full" bg="whiteAlpha.400" />
                  <Text color="gray.300" fontSize="sm" fontWeight="600">
                    Budget: {formData.budget?.replace(/-/g, ' ')}
                  </Text>
                </HStack>
              </MotionBox>

              {/* Action Buttons */}
              <MotionBox
                width="100%"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <VStack spacing={4} width="100%">
                  <Button
                    size="lg"
                    width="100%"
                    bg="white"
                    color="black"
                    fontWeight="700"
                    fontSize={{ base: "md", md: "lg" }}
                    height={{ base: "52px", md: "56px" }}
                    onClick={onNavigateHome}
                    _hover={{
                      bg: colors.success,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 15px 40px ${colors.success}40`
                    }}
                    _active={{ 
                      transform: 'translateY(0)',
                      bg: colors.success
                    }}
                    borderRadius="full"
                    leftIcon={<FiHome size={18} />}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    Back to Home
                  </Button>
                  
                  <HStack spacing={4} fontSize="xs" color="gray.500">
                    <Text>
                      Ticket ID: <Text as="span" color="gray.400" fontFamily="mono">#{Date.now().toString().slice(-8)}</Text>
                    </Text>
                    <Box width="1px" height="12px" bg="whiteAlpha.200" />
                    <Text>
                      Saved to: <Text as="span" color="gray.400">hello@neonburro.com</Text>
                    </Text>
                  </HStack>
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