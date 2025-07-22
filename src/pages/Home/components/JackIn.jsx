import { Box, Container, Heading, Text, VStack, Button, HStack, Grid, Input, Textarea, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiCalendar, FiClock, FiSend, FiCheck } from 'react-icons/fi';

const MotionBox = motion(Box);

// Theme colors
const colors = {
  brand: {
    primary: '#00E5E5',
  },
  accent: {
    neon: '#39FF14',
    warm: '#FF6B00',
    banana: '#FFE500',
  },
  dark: {
    black: '#0A0A0A',
  }
};

const JackIn = () => {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  // Check if it's business hours (MT timezone)
  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date();
      const mtTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Denver"}));
      const hours = mtTime.getHours();
      const day = mtTime.getDay();
      setIsOnline(day >= 1 && day <= 5 && hours >= 9 && hours < 18);
    };

    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    
    try {
      // Netlify Forms submission
      const formElement = e.target;
      const formData = new FormData(formElement);
      
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      
      setIsSubmitted(true);
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ email: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: FiMail,
      title: 'Email Us',
      value: 'hello@neonburro.com',
      description: 'For project inquiries',
      action: 'mailto:hello@neonburro.com',
      color: colors.brand.primary,
      availability: 'Responds within 24 hours'
    },
    {
      icon: FiPhone,
      title: 'Call Direct',
      value: '(970) 973-8550',
      description: 'Mountain Time (MT)',
      action: 'tel:+19709738550',
      color: colors.accent.banana,
      availability: "Anytime works, we're up"
    },
    {
      icon: FiCalendar,
      title: 'Book a Meeting',
      value: '30-min consultation',
      description: 'Free strategy session',
      action: 'https://calendly.com/neonburro',
      color: colors.accent.neon,
      availability: 'Next slot: Tomorrow'
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 24 }} 
      bg={colors.dark.black}
      overflow="hidden"
    >
      {/* Simple background gradient */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="1200px"
        height="800px"
        bg={`radial-gradient(ellipse at center, ${colors.accent.banana}06 0%, transparent 60%)`}
        pointerEvents="none"
      />

      <Container maxW="1200px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <HStack spacing={2} justify="center">
                <Box width="40px" height="2px" bg={colors.accent.banana} />
                <Text 
                  color={colors.accent.banana}
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold"
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Let's Connect
                </Text>
                <Box width="40px" height="2px" bg={colors.accent.banana} />
              </HStack>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "26px", sm: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="extrabold"
                color="white"
                lineHeight={{ base: "1.3", md: "1.2" }}
                letterSpacing="tight"
              >
                Ready to Build Something
                <Box 
                  as="span" 
                  display="block"
                  bgGradient={`linear(to-r, ${colors.accent.banana}, ${colors.accent.warm})`}
                  bgClip="text"
                  mt={1}
                >
                  Amazing Together?
                </Box>
              </Heading>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Text
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                color="gray.300"
                maxW="600px"
                mx="auto"
                lineHeight="relaxed"
              >
                Drop us a quick message or schedule a call. We're here to turn your 
                vision into reality, no corporate nonsense, just real conversation.
              </Text>
            </MotionBox>

            {/* Availability Status */}
            <Badge
              px={4}
              py={2}
              borderRadius="full"
              bg={isOnline ? `${colors.accent.neon}22` : 'whiteAlpha.100'}
              color={isOnline ? colors.accent.neon : 'gray.400'}
              fontSize="xs"
              fontWeight="medium"
              border="1px solid"
              borderColor={isOnline ? `${colors.accent.neon}44` : 'whiteAlpha.200'}
            >
              <HStack spacing={2}>
                <Box
                  width="8px"
                  height="8px"
                  borderRadius="full"
                  bg={isOnline ? colors.accent.neon : 'gray.500'}
                  animation={isOnline ? 'pulse 2s infinite' : 'none'}
                  sx={{
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                      '50%': { opacity: 0.6, transform: 'scale(0.9)' }
                    }
                  }}
                />
                <Text>
                  {isOnline ? "We're Online Now" : "We'll respond within 24 hours"}
                </Text>
              </HStack>
            </Badge>
          </VStack>

          {/* Main Content Grid */}
          <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            gap={{ base: 8, lg: 12 }}
            width="100%"
            alignItems="start"
          >
            {/* Left: Quick Message Form */}
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box
                p={{ base: 6, md: 8 }}
                borderRadius="2xl"
                bg="rgba(255, 255, 255, 0.02)"
                backdropFilter="blur(10px)"
                border="2px solid"
                borderColor="rgba(255, 255, 255, 0.08)"
                position="relative"
                overflow="hidden"
              >
                <VStack spacing={6} align="stretch">
                  <VStack align="start" spacing={2}>
                    <Heading fontSize="2xl" color="white">
                      Send a Quick Message
                    </Heading>
                    <Text color="gray.400" fontSize="sm">
                      We'll get back to you within 24 hours
                    </Text>
                  </VStack>

                  <Box
                    as="form"
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <Box display="none">
                      <label>
                        Don't fill this out if you're human: <input name="bot-field" />
                      </label>
                    </Box>
                    
                    <VStack spacing={4}>
                      <Input
                        name="email"
                        placeholder="Your email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        size="lg"
                        bg="whiteAlpha.50"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        color="white"
                        _placeholder={{ color: 'gray.500' }}
                        _hover={{ borderColor: 'whiteAlpha.300' }}
                        _focus={{ 
                          borderColor: colors.brand.primary,
                          boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                          bg: 'whiteAlpha.100'
                        }}
                        disabled={isSubmitting || isSubmitted}
                      />
                      
                      <Textarea
                        name="message"
                        placeholder="Tell us about your project..."
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        size="lg"
                        rows={4}
                        bg="whiteAlpha.50"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        color="white"
                        _placeholder={{ color: 'gray.500' }}
                        _hover={{ borderColor: 'whiteAlpha.300' }}
                        _focus={{ 
                          borderColor: colors.brand.primary,
                          boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                          bg: 'whiteAlpha.100'
                        }}
                        disabled={isSubmitting || isSubmitted}
                      />
                      
                      <Button
                        type="submit"
                        size="lg"
                        width="100%"
                        bg={isSubmitted ? colors.accent.neon : 'white'}
                        color={colors.dark.black}
                        fontWeight="bold"
                        isLoading={isSubmitting}
                        loadingText="Sending..."
                        leftIcon={isSubmitted ? <FiCheck /> : <FiSend />}
                        _hover={{
                          bg: isSubmitted ? colors.accent.neon : 'gray.100',
                          transform: isSubmitted ? 'none' : 'translateY(-2px)',
                          boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)'
                        }}
                        transition="all 0.2s"
                        disabled={isSubmitted || !formData.email || !formData.message}
                      >
                        {isSubmitted ? 'Message Sent!' : 'Send Message'}
                      </Button>
                    </VStack>
                  </Box>
                </VStack>
              </Box>
            </MotionBox>

            {/* Right: Contact Methods */}
            <VStack spacing={4} align="stretch">
              {contactMethods.map((method, index) => (
                <MotionBox
                  key={method.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box
                    as="a"
                    href={method.action}
                    target={method.title === 'Book a Meeting' ? '_blank' : undefined}
                    rel={method.title === 'Book a Meeting' ? 'noopener noreferrer' : undefined}
                    display="block"
                    p={{ base: 5, md: 6 }}
                    borderRadius="xl"
                    bg="rgba(255, 255, 255, 0.02)"
                    backdropFilter="blur(10px)"
                    border="2px solid"
                    borderColor="rgba(255, 255, 255, 0.08)"
                    position="relative"
                    overflow="hidden"
                    transition="all 0.2s"
                    _hover={{
                      borderColor: method.color,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 10px 30px ${method.color}22`,
                      textDecoration: 'none'
                    }}
                  >
                    <HStack spacing={4} align="start">
                      <Box
                        p={3}
                        borderRadius="lg"
                        bg={`${method.color}11`}
                        color={method.color}
                        flexShrink={0}
                      >
                        <method.icon size={24} />
                      </Box>
                      
                      <VStack align="start" spacing={1} flex={1}>
                        <Heading fontSize="lg" color="white">
                          {method.title}
                        </Heading>
                        <Text color={method.color} fontSize="md" fontWeight="medium">
                          {method.value}
                        </Text>
                        <Text color="gray.400" fontSize="sm">
                          {method.description}
                        </Text>
                        <HStack spacing={2} mt={2}>
                          <FiClock size={12} color="gray" />
                          <Text color="gray.500" fontSize="xs">
                            {method.availability}
                          </Text>
                        </HStack>
                      </VStack>
                    </HStack>
                  </Box>
                </MotionBox>
              ))}

              {/* Response Guarantee */}
              <Box
                mt={4}
                p={4}
                borderRadius="lg"
                bg={`${colors.accent.warm}08`}
                border="1px solid"
                borderColor={`${colors.accent.warm}22`}
                textAlign="center"
              >
                <Text color={colors.accent.warm} fontSize="sm" fontWeight="medium">
                  🔥 Response Guarantee: We reply to all inquiries within 24 hours
                </Text>
              </Box>
            </VStack>
          </Grid>

        </VStack>
      </Container>
    </Box>
  );
};

export default JackIn;