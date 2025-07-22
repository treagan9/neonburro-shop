// src/pages/Invoice/components/InvoiceSuccess.jsx
import { 
  Box, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Button, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalBody, 
  Image,
  List,
  ListItem,
  ListIcon,
  Divider,
  Badge,
  useToast,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Fade,
  keyframes
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheck, 
  FiMail, 
  FiDownload, 
  FiX, 
  FiClock, 
  FiCalendar,
  FiUser,
  FiPackage,
  FiDollarSign,
  FiSend,
  FiPhone,
  FiFileText,
  FiCheckCircle,
  FiZap,
  FiCoffee
} from 'react-icons/fi';
import { useEffect, useState } from 'react';
import MatrixRain from '../../../components/effects/MatrixRain';
import jsPDF from 'jspdf';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// Animation for success elements
const pulseAnimation = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;

const neonGlowAnimation = keyframes`
  0%, 100% { opacity: 0.5; filter: drop-shadow(0 0 20px rgba(0, 229, 229, 0.5)); }
  50% { opacity: 1; filter: drop-shadow(0 0 40px rgba(0, 229, 229, 0.8)); }
`;

const InvoiceSuccess = ({ isOpen, onClose, formData, sessionId, onTrackEvent }) => {
  const [showMatrix, setShowMatrix] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [downloadProcessing, setDownloadProcessing] = useState(false);
  const [additionalEmail, setAdditionalEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [showNeonEffect, setShowNeonEffect] = useState(false);
  const toast = useToast();
  
  const colors = {
    primary: '#00E5E5',
    success: '#39FF14',
    warm: '#FF6B00',
    purple: '#8B5CF6',
    banana: '#FFE500',
    vip: '#D4AF37'
  };

  useEffect(() => {
    if (isOpen) {
      // Trigger effects after modal animation
      const timer = setTimeout(() => {
        setShowMatrix(true);
        setShowNeonEffect(true);
      }, 400);
      
      // Submit to Netlify Forms for tracking
      if (formData) {
        submitSuccessToNetlify();
      }
      
      return () => {
        clearTimeout(timer);
      };
    } else {
      setShowMatrix(false);
      setShowNeonEffect(false);
      setEmailSent(false);
      setDownloadComplete(false);
      setShowEmailInput(false);
      setAdditionalEmail('');
    }
  }, [isOpen, formData]);

  // Submit success data to Netlify with proper string formatting
  const submitSuccessToNetlify = async () => {
    try {
      const receiptNumber = generateReceiptNumber();
      
      // Main success submission with all fields as strings
      await submitToNetlifyForms('payment-success', {
        sessionId: String(sessionId || ''),
        receiptNumber: String(receiptNumber),
        firstName: String(formData?.firstName || ''),
        projectName: String(formData?.projectName || ''),
        email: String(formData?.email || ''),
        phone: String(formData?.phone || ''),
        total: String(formData?.total || 0),
        packageName: String(formData?.packageName || ''),
        hours: String(formData?.hours || ''),
        isServicePackage: String(formData?.isServicePackage || 'false'),
        isVip: String(formData?.isVip || 'false'),
        clientType: formData?.isServicePackage === 'true' ? 'new' : 'existing',
        paymentMethod: String(formData?.paymentMethod || ''),
        paymentIntentId: String(formData?.paymentIntentId || ''),
        timestamp: new Date().toISOString()
      });

      // VIP notification if applicable
      if (formData?.isVip === 'true' || formData?.packageName === 'VIP') {
        await submitToNetlifyForms('vip-purchase-alert', {
          sessionId: String(sessionId || ''),
          firstName: String(formData?.firstName || ''),
          email: String(formData?.email || ''),
          phone: String(formData?.phone || ''),
          total: String(formData?.total || 0),
          urgency: 'IMMEDIATE_VIP_ONBOARDING',
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error submitting to Netlify:', error);
    }
  };

  // Submit to Netlify Forms
  const submitToNetlifyForms = async (formName, data) => {
    try {
      const formBody = new URLSearchParams({
        'form-name': formName,
        ...data
      });

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString()
      });
    } catch (error) {
      console.error(`Error submitting ${formName}:`, error);
    }
  };

  // Generate receipt number
  const generateReceiptNumber = () => {
    return `NB-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
  };

  // Convert favicon to base64 for PDF
  const getFaviconBase64 = async () => {
    try {
      const response = await fetch('/favicon.svg');
      const text = await response.text();
      return `data:image/svg+xml;base64,${btoa(text)}`;
    } catch (error) {
      console.error('Error loading favicon:', error);
      return null;
    }
  };

  // Generate professional PDF receipt
  const generatePDFReceipt = async () => {
    const doc = new jsPDF();
    const receiptNumber = generateReceiptNumber();
    const currentDate = new Date();
    
    // Try to add logo
    try {
      const logoBase64 = await getFaviconBase64();
      if (logoBase64) {
        doc.addImage(logoBase64, 'SVG', 95, 10, 20, 20);
      }
    } catch (error) {
      console.error('Error adding logo:', error);
    }
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(0, 255, 255);
    doc.text('NEON BURRO', 105, 40, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('Digital Craftsmanship from Colorado', 105, 48, { align: 'center' });
    
    // Receipt title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('PAYMENT RECEIPT', 105, 65, { align: 'center' });
    
    // Receipt details box
    doc.setDrawColor(200, 200, 200);
    doc.roundedRect(20, 75, 170, 30, 3, 3);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Receipt Number:', 30, 85);
    doc.text('Date:', 30, 95);
    doc.text('Status:', 120, 85);
    
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text(receiptNumber, 65, 85);
    doc.text(currentDate.toLocaleDateString(), 45, 95);
    doc.setTextColor(57, 255, 20);
    doc.text('PAID', 140, 85);
    
    // Client Information
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text('Bill To:', 20, 120);
    
    doc.setFontSize(10);
    doc.text(formData.firstName || 'Client', 20, 130);
    doc.text(formData.email || '', 20, 137);
    if (formData.phone) {
      doc.text(formData.phone, 20, 144);
    }
    
    // Project Details
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 155, 190, 155);
    
    doc.setFontSize(12);
    doc.text('Project Details', 20, 165);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Project Name:', 20, 175);
    doc.text('Type:', 20, 182);
    doc.text('Timeline:', 20, 189);
    
    doc.setTextColor(0, 0, 0);
    doc.text(formData.projectName || 'Project', 55, 175);
    doc.text(formData.isServicePackage === 'true' ? `${formData.packageName} Package` : `${formData.hours} Development Hours`, 35, 182);
    doc.text(getTimeline(), 45, 189);
    
    // Payment Summary
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 200, 190, 200);
    
    // Items
    if (formData.isServicePackage === 'true') {
      doc.text(`${formData.packageName} Package - Complete Development`, 20, 215);
      doc.text(`$${parseInt(formData.total).toLocaleString()}.00`, 170, 215, { align: 'right' });
    } else {
      doc.text(`Development Hours (${formData.hours} hrs @ $44/hr)`, 20, 215);
      doc.text(`$${parseInt(formData.total).toLocaleString()}.00`, 170, 215, { align: 'right' });
    }
    
    // Total
    doc.setDrawColor(200, 200, 200);
    doc.line(120, 225, 190, 225);
    
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text('Total Paid:', 120, 235);
    doc.setTextColor(57, 255, 20);
    doc.text(`$${parseInt(formData.total).toLocaleString()}.00 USD`, 170, 235, { align: 'right' });
    
    // Footer
    doc.setFont(undefined, 'normal');
    doc.setTextColor(128, 128, 128);
    doc.setFontSize(8);
    doc.text('Thank you for choosing Neon Burro!', 105, 260, { align: 'center' });
    doc.text('Questions? Contact us at hello@neonburro.com', 105, 266, { align: 'center' });
    doc.text('neonburro.com', 105, 272, { align: 'center' });
    
    return doc;
  };

  // Enhanced download receipt
  const handleDownloadReceipt = async () => {
    setDownloadProcessing(true);
    
    try {
      // Generate PDF
      const doc = await generatePDFReceipt();
      const receiptNumber = generateReceiptNumber();
      
      // Save PDF
      doc.save(`neon-burro-receipt-${receiptNumber}.pdf`);
      
      // Track download
      await submitToNetlifyForms('receipt-download', {
        sessionId: sessionId || '',
        receiptNumber: receiptNumber,
        email: formData.email,
        format: 'pdf',
        timestamp: new Date().toISOString()
      });
      
      setDownloadComplete(true);
      
      toast({
        title: "Receipt Downloaded",
        description: "Your professional receipt has been saved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      // Reset after delay
      setTimeout(() => setDownloadComplete(false), 3000);
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Please try again or contact support.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDownloadProcessing(false);
    }
  };

  // Enhanced email receipt
  const handleEmailReceipt = async (recipientEmail = formData.email) => {
    setEmailSending(true);
    
    try {
      const receiptNumber = generateReceiptNumber();
      
      // Submit email request to Netlify
      await submitToNetlifyForms('email-receipt-request', {
        sessionId: sessionId || '',
        receiptNumber: receiptNumber,
        recipientEmail: recipientEmail,
        originalEmail: formData.email,
        firstName: formData.firstName,
        projectName: formData.projectName,
        total: formData.total,
        packageDetails: formData.isServicePackage === 'true' ? formData.packageName : `${formData.hours} hours`,
        isAdditionalEmail: recipientEmail !== formData.email ? 'true' : 'false',
        timestamp: new Date().toISOString()
      });
      
      setEmailSent(true);
      setShowEmailInput(false);
      setAdditionalEmail('');
      
      toast({
        title: "Email Sent",
        description: `Receipt sent to ${recipientEmail}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      
      // Reset after delay
      setTimeout(() => setEmailSent(false), 5000);
    } catch (error) {
      toast({
        title: "Email Failed",
        description: "Please try downloading the receipt instead.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setEmailSending(false);
    }
  };

  if (!formData) return null;

  const isVipPackage = formData.isVip === 'true' || formData.packageName === 'VIP';

  // Calculate timeline based on package
  const getTimeline = () => {
    if (formData.isServicePackage === 'true') {
      const timelines = {
        'Spark': '2-3 weeks',
        'Ignite': '3-4 weeks', 
        'Burro': '4-6 weeks',
        'VIP': 'Priority - Starting immediately'
      };
      return timelines[formData.packageName] || '2-4 weeks';
    }
    return 'Based on project scope';
  };

  // Get next steps
  const getNextSteps = () => {
    const isVip = formData?.isVip === 'true' || formData?.packageName === 'VIP';
    return [
      { 
        icon: FiMail,
        title: 'Check Your Inbox',
        description: 'Confirmation sent to hello@neonburro.com',
        color: colors.primary
      },
      { 
        icon: FiCoffee,
        title: 'We\'re On It',
        description: 'Reviewing your project details',
        color: colors.success
      },
      { 
        icon: FiZap,
        title: 'Lightning Fast Reply',
        description: isVip ? 'VIP response within 30 minutes' : 'Expect our response in 24hrs',
        color: colors.banana
      }
    ];
  };

  // Fun messages based on project type
  const getPersonalizedMessage = () => {
    const messages = {
      'Spark': "Your Spark is about to ignite something amazing!",
      'Ignite': "Time to set your digital presence on fire!",
      'Burro': "The Burro pack is loaded and ready to climb!",
      'VIP': "Welcome to the VIP experience - your dedicated team is already mobilizing!",
      'default': formData?.hours ? `${formData.hours} hours locked and loaded!` : "Your project is ready to launch!"
    };
    
    if (formData?.isServicePackage === 'true' && formData?.packageName) {
      return messages[formData.packageName] || messages.default;
    }
    return messages.default;
  };

  return (
    <>
      {/* Matrix Rain Background */}
      <MatrixRain isActive={showMatrix} duration={3000} />
      
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" closeOnOverlayClick={false}>
        <ModalOverlay bg="blackAlpha.950" backdropFilter="blur(10px)" />
        
        <ModalContent
          bg="transparent"
          border="none"
          boxShadow="none"
          overflow="visible"
          maxW="650px"
        >
          <ModalBody p={0}>
            <MotionBox
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 120 }}
            >
              <Box
                position="relative"
                p={{ base: 8, md: 12 }}
                bg="rgba(10, 10, 10, 0.9)"
                backdropFilter="blur(20px)"
                border="2px solid"
                borderColor={colors.success}
                borderRadius="3xl"
                overflow="hidden"
                boxShadow={`0 20px 60px rgba(57, 255, 20, 0.15)`}
              >
                {/* Close button */}
                <Button
                  position="absolute"
                  top={4}
                  right={4}
                  size="sm"
                  variant="ghost"
                  color="gray.400"
                  _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
                  onClick={onClose}
                  zIndex={10}
                  borderRadius="full"
                >
                  <FiX size={20} />
                </Button>

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
                        animation={showNeonEffect ? `${neonGlowAnimation} 3s ease-in-out infinite` : undefined}
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

                  {/* Success Message */}
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
                      {isVipPackage ? 'Welcome to VIP Status!' : 'Payment Successful!'}
                    </MotionHeading>
                    
                    <VStack spacing={2}>
                      <Text 
                        color="gray.300" 
                        fontSize={{ base: "md", md: "lg" }}
                        textAlign="center"
                        maxW="450px"
                        lineHeight="1.6"
                      >
                        Thank you, <Text as="span" color={colors.primary} fontWeight="700">{formData.firstName}</Text>!
                        We're thrilled to bring your vision to life.
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

                  {/* Next Steps */}
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
                      {getNextSteps().map((step, index) => {
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
                        {formData?.isServicePackage === 'true' 
                          ? formData?.packageName?.toUpperCase() 
                          : `${formData?.hours} HOURS`
                        }
                      </Badge>
                      <Box width="4px" height="4px" borderRadius="full" bg="whiteAlpha.400" />
                      <Text color="gray.300" fontSize="sm" fontWeight="600">
                        {formData?.projectName}
                      </Text>
                      <Box width="4px" height="4px" borderRadius="full" bg="whiteAlpha.400" />
                      <Text color="gray.300" fontSize="sm" fontWeight="600">
                        Total: ${formData?.total}
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
                      {/* Email Input (when shown) */}
                      <AnimatePresence>
                        {showEmailInput && (
                          <MotionBox
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            width="100%"
                          >
                            <InputGroup size="md">
                              <InputLeftElement pointerEvents="none">
                                <FiMail color="gray.300" />
                              </InputLeftElement>
                              <Input
                                placeholder="Enter additional email"
                                value={additionalEmail}
                                onChange={(e) => setAdditionalEmail(e.target.value)}
                                bg="rgba(255, 255, 255, 0.05)"
                                border="1px solid"
                                borderColor="whiteAlpha.200"
                                color="white"
                                _placeholder={{ color: 'gray.500' }}
                                _hover={{ borderColor: 'whiteAlpha.300' }}
                                _focus={{ borderColor: colors.primary }}
                                pr="4.5rem"
                              />
                              <Button
                                position="absolute"
                                right={1}
                                top={1}
                                bottom={1}
                                size="sm"
                                bg={colors.primary}
                                color="black"
                                _hover={{ bg: colors.primary }}
                                onClick={() => handleEmailReceipt(additionalEmail)}
                                isLoading={emailSending}
                                isDisabled={!additionalEmail || !additionalEmail.includes('@')}
                                borderRadius="md"
                              >
                                <FiSend />
                              </Button>
                            </InputGroup>
                          </MotionBox>
                        )}
                      </AnimatePresence>
                      
                      <HStack spacing={3} width="100%">
                        <Button
                          size="lg"
                          flex={1}
                          variant="outline"
                          borderColor={downloadComplete ? colors.success : "whiteAlpha.300"}
                          color={downloadComplete ? colors.success : "white"}
                          fontWeight="600"
                          fontSize="md"
                          leftIcon={downloadComplete ? <FiCheckCircle size={18} /> : <FiDownload size={18} />}
                          borderRadius="full"
                          onClick={handleDownloadReceipt}
                          isLoading={downloadProcessing}
                          loadingText="Creating PDF..."
                          _hover={{
                            bg: 'whiteAlpha.100',
                            borderColor: 'whiteAlpha.400'
                          }}
                        >
                          {downloadComplete ? 'Downloaded!' : 'Download Receipt'}
                        </Button>
                        <Button
                          size="lg"
                          flex={1}
                          variant="outline"
                          borderColor={emailSent && !showEmailInput ? colors.success : "whiteAlpha.300"}
                          color={emailSent && !showEmailInput ? colors.success : "white"}
                          fontWeight="600"
                          fontSize="md"
                          leftIcon={emailSent && !showEmailInput ? <FiCheckCircle size={18} /> : <FiMail size={18} />}
                          borderRadius="full"
                          onClick={() => {
                            if (showEmailInput) {
                              handleEmailReceipt(formData.email);
                            } else if (emailSent) {
                              setShowEmailInput(true);
                            } else {
                              handleEmailReceipt(formData.email);
                            }
                          }}
                          isLoading={emailSending && !showEmailInput}
                          loadingText="Sending..."
                          _hover={{
                            bg: 'whiteAlpha.100',
                            borderColor: 'whiteAlpha.400'
                          }}
                        >
                          {emailSent && !showEmailInput ? 'Sent!' : 'Email Receipt'}
                        </Button>
                      </HStack>
                      
                      <Button
                        size="lg"
                        width="100%"
                        bg="white"
                        color="black"
                        fontWeight="700"
                        fontSize={{ base: "md", md: "lg" }}
                        height={{ base: "52px", md: "56px" }}
                        onClick={onClose}
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
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      >
                        Continue
                      </Button>
                      
                      <HStack spacing={4} fontSize="xs" color="gray.500">
                        <Text>
                          Receipt: <Text as="span" color="gray.400" fontFamily="mono">#{generateReceiptNumber()}</Text>
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InvoiceSuccess;