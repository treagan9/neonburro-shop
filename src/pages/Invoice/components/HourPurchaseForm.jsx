// src/pages/Invoice/components/HourPurchaseForm.jsx
import { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Text, 
  Progress,
  useBreakpointValue,
  Fade,
  ScaleFade
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiCreditCard, FiCheck } from 'react-icons/fi';
import ProjectDetailsForm from './ProjectDetailsForm';
import PaymentForm from './PaymentForm';

const MotionBox = motion(Box);

const HourPurchaseForm = ({ onSuccess, sessionId, onTrackEvent }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [stepStartTime, setStepStartTime] = useState(Date.now());
  const formStartTime = useRef(Date.now());

  const isMobile = useBreakpointValue({ base: true, md: false });

  // Colors
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { green: '#39FF14' },
    vip: { primary: '#D4AF37' }
  };

  // Step configuration
  const steps = [
    {
      number: 1,
      title: 'Project Details',
      subtitle: 'Tell us about your project',
      icon: FiUser,
      color: colors.brand.primary
    },
    {
      number: 2,
      title: 'Payment',
      subtitle: 'Secure checkout',
      icon: FiCreditCard,
      color: colors.accent.green
    }
  ];

  // Track form initialization
  useEffect(() => {
    if (onTrackEvent) {
      onTrackEvent('form-started', {
        sessionId: sessionId || '',
        step: 'project-details',
        timestamp: new Date().toISOString()
      });
    }
  }, [sessionId, onTrackEvent]);

  // Smooth scroll to top when step changes
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleContinueToPayment = (data) => {
    console.log('Project details completed:', data);
    setIsTransitioning(true);
    
    // Calculate time spent on step 1
    const stepDuration = Math.round((Date.now() - stepStartTime) / 1000);
    
    // Ensure ALL data is properly formatted as strings for Netlify Forms
    const completeData = {
      firstName: String(data.firstName || ''),
      projectName: String(data.projectName || ''),
      hours: String(data.hours || ''),
      total: String(data.total || 0),
      packageType: String(data.packageType || ''),
      packageName: String(data.packageName || ''),
      isServicePackage: data.isServicePackage ? 'true' : 'false',
      isVip: data.isVip ? 'true' : 'false',
      wantsHostingDetails: data.wantsHostingDetails ? 'true' : 'false',
      clientType: data.isServicePackage ? 'new' : 'existing'
    };
    
    // Track project details completion
    if (onTrackEvent) {
      // Track completed project details with properly formatted data
      onTrackEvent('project-details-completed', {
        sessionId: sessionId || '',
        timestamp: new Date().toISOString(),
        ...completeData
      });
      
      // Generate a human-readable summary
      const summary = completeData.isServicePackage === 'true' 
        ? `${completeData.firstName} selected ${completeData.packageName} Package ($${completeData.total}) for project: ${completeData.projectName}`
        : `${completeData.firstName} selected ${completeData.hours} hours ($${completeData.total}) for project: ${completeData.projectName}`;

      // Track moving to payment step
      onTrackEvent('payment-initiated', {
        sessionId: sessionId || '',
        timestamp: new Date().toISOString(),
        action: 'payment-form-shown',
        paymentStatus: 'initiated',
        currentStep: 'payment',
        summary: summary,
        ...completeData
      });
    }
    
    setTimeout(() => {
      // Store the formatted data for next step
      setProjectData(completeData);
      setCurrentStep(2);
      setStepStartTime(Date.now());
    }, 300);
  };

  const handleBackToDetails = () => {
    setIsTransitioning(true);
    
    // Track going back
    if (onTrackEvent) {
      onTrackEvent('navigation', {
        sessionId: sessionId || '',
        action: 'back-to-project-details',
        timestamp: new Date().toISOString()
      });
    }
    
    setTimeout(() => {
      setCurrentStep(1);
      setStepStartTime(Date.now());
    }, 300);
  };

  const handlePaymentSuccess = (data) => {
    console.log('Payment success with data:', data);
    
    // Calculate total journey time
    const totalTimeSpent = Math.round((Date.now() - formStartTime.current) / 1000);
    const paymentStepDuration = Math.round((Date.now() - stepStartTime) / 1000);
    
    // Ensure complete data is properly formatted for success handler
    const completeSuccessData = {
      // Project data from step 1 (already formatted as strings)
      ...projectData,
      // Payment data from step 2 (ensure strings)
      email: String(data.email || ''),
      phone: String(data.phone || ''),
      paymentMethod: String(data.paymentMethod || ''),
      paymentIntentId: String(data.paymentIntentId || ''),
      cardholderName: String(data.cardholderName || ''),
      address: String(data.address || ''),
      city: String(data.city || ''),
      state: String(data.state || ''),
      zip: String(data.zip || ''),
      // Session and tracking data
      sessionId: sessionId || '',
      totalTimeSpent: String(totalTimeSpent),
      completedAt: new Date().toISOString()
    };
    
    // Track the completed payment
    if (onTrackEvent) {
      onTrackEvent('payment-completed', completeSuccessData);
    }
    
    onSuccess(completeSuccessData);
  };

  const StepIndicator = () => (
    <Box
      position="relative"
      width="100%"
      maxW="600px"
      mx="auto"
      mb={8}
    >
      {/* Progress Bar Background */}
      <Box
        position="absolute"
        top="20px"
        left="0"
        right="0"
        height="2px"
        bg="whiteAlpha.200"
        zIndex={0}
      />
      
      {/* Active Progress Bar */}
      <Box
        position="absolute"
        top="20px"
        left="0"
        height="2px"
        bg={currentStep === 2 ? colors.accent.green : colors.brand.primary}
        width={currentStep === 1 ? "50%" : "100%"}
        transition="all 0.5s ease"
        zIndex={1}
      />

      {/* Steps */}
      <HStack justify="space-between" position="relative" zIndex={2}>
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          
          return (
            <VStack key={step.number} spacing={2} flex={1}>
              <MotionBox
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  transition: { duration: 0.3 }
                }}
              >
                <Box
                  position="relative"
                  w="40px"
                  h="40px"
                  borderRadius="full"
                  bg={isActive || isCompleted ? step.color : 'rgba(255, 255, 255, 0.1)'}
                  border="2px solid"
                  borderColor={isActive || isCompleted ? step.color : 'whiteAlpha.300'}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transition="all 0.3s"
                  boxShadow={isActive ? `0 0 20px ${step.color}66` : 'none'}
                >
                  {isCompleted ? (
                    <FiCheck size={20} color="black" strokeWidth={3} />
                  ) : (
                    <Icon 
                      size={20} 
                      color={isActive ? 'black' : 'gray'} 
                    />
                  )}
                </Box>
              </MotionBox>
              
              {!isMobile && (
                <VStack spacing={0} align="center">
                  <Text
                    fontSize="sm"
                    fontWeight={isActive ? "700" : "600"}
                    color={isActive ? 'white' : 'gray.400'}
                    transition="all 0.3s"
                  >
                    {step.title}
                  </Text>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    display={isActive ? 'block' : 'none'}
                  >
                    {step.subtitle}
                  </Text>
                </VStack>
              )}
            </VStack>
          );
        })}
      </HStack>
    </Box>
  );

  return (
    <Container maxW="1200px" mx="auto" py={8}>
      <VStack spacing={8} width="100%">
        {/* Step Indicator */}
        <StepIndicator />
        
        {/* Form Content with Transitions */}
        <Box width="100%" position="relative" minH="500px">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <MotionBox
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                width="100%"
              >
                <ProjectDetailsForm 
                  onContinue={handleContinueToPayment}
                  initialData={projectData}
                  sessionId={sessionId}
                  onTrackEvent={onTrackEvent}
                />
              </MotionBox>
            )}
            
            {currentStep === 2 && projectData && (
              <MotionBox
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                width="100%"
              >
                <PaymentForm 
                  projectData={projectData}
                  onSuccess={handlePaymentSuccess}
                  onBack={handleBackToDetails}
                  sessionId={sessionId}
                  onTrackEvent={onTrackEvent}
                />
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>
      </VStack>
    </Container>
  );
};

export default HourPurchaseForm;