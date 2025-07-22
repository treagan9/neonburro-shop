import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Text, 
  Input, 
  Textarea, 
  Button, 
  FormControl, 
  FormLabel,
  Grid,
  GridItem,
  Select,
  Icon,
  useToast,
  Progress,
  Badge,
  Heading
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiGithub, 
  FiLinkedin, 
  FiGlobe,
  FiSend,
  FiCode,
  FiHeart,
  FiCoffee,
  FiCalendar,
  FiZap,
  FiArrowRight,
  FiArrowLeft,
  FiCheck
} from 'react-icons/fi';
const MotionBox = motion(Box);

const ApplyForm = () => {
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    portfolio: '',
    experience: '',
    
    // Step 2
    skills: '',
    whyBurro: '',
    funFact: '',
    availability: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const experienceLevels = [
    'Junior (0-2 years)',
    'Mid-level (2-5 years)',
    'Senior (5+ years)',
    'Principal/Staff (10+ years)'
  ];

  const availabilityOptions = [
    'Immediately',
    'Within 2 weeks',
    'Within a month',
    '2-3 months',
    'Just exploring'
  ];

  // Check if step 1 is complete
  const isStep1Complete = () => {
    return formData.name && 
           formData.email && 
           formData.phone && 
           formData.experience &&
           (formData.github || formData.linkedin || formData.portfolio);
  };

  // Check if step 2 is complete
  const isStep2Complete = () => {
    return formData.skills && 
           formData.whyBurro && 
           formData.availability;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (isStep1Complete()) {
      setCurrentStep(2);
      window.scrollTo(0, 0);
    } else {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields and at least one online presence link.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    window.scrollTo(0, 0);
  };

  // Netlify Forms compatible submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isStep2Complete()) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Encode form data for Netlify
    const encode = (data) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    };

    // Prepare form data - all fields must match hidden form
    const submissionData = {
      "form-name": "burro-application",
      ...formData
    };

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(submissionData)
      });

      if (response.ok) {
        toast({
          title: "Application Received!",
          description: "We'll review your application and get back to you soon.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        
        // Clear form
        setFormData({
          name: '',
          email: '',
          phone: '',
          github: '',
          linkedin: '',
          portfolio: '',
          experience: '',
          skills: '',
          whyBurro: '',
          funFact: '',
          availability: ''
        });
        setCurrentStep(1);
        
        // Redirect after delay
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your application. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box py={{ base: 16, md: 20 }} bg="dark.black" position="relative" overflow="hidden" minH="100vh">
      {/* Subtle background effects */}
      <Box
        position="absolute"
        top="10%"
        right="10%"
        width="400px"
        height="400px"
        borderRadius="full"
        bg="radial-gradient(circle, #00E5E5 0%, transparent 50%)"
        filter="blur(120px)"
        opacity={0.03}
      />
      <Box
        position="absolute"
        bottom="20%"
        left="5%"
        width="500px"
        height="500px"
        borderRadius="full"
        bg="radial-gradient(circle, #FFE500 0%, transparent 50%)"
        filter="blur(150px)"
        opacity={0.02}
      />

      <Container maxW="800px" px={{ base: 4, md: 8 }}>
        <VStack spacing={{ base: 8, md: 10 }}>
          {/* Form Header */}
          <VStack spacing={4} textAlign="center">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <HStack
                spacing={2}
                px={4}
                py={2}
                borderRadius="full"
                bg="rgba(255, 229, 0, 0.05)"
                border="1px solid"
                borderColor="rgba(255, 229, 0, 0.1)"
                mb={4}
                display="inline-flex"
              >
                <Box as={FiZap} size={14} color="accent.banana" />
                <Text 
                  color="accent.banana"
                  fontSize="xs"
                  fontWeight="semibold"
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Join The Herd
                </Text>
              </HStack>

              <Heading
                as="h1"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="bold"
                color="text.primary"
                letterSpacing="tight"
              >
                Become a Visiting Burro
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
                maxW="500px"
              >
                Tell us your story in two simple steps
              </Text>
            </MotionBox>

            {/* Progress Steps */}
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <HStack spacing={8}>
                {[1, 2].map((step) => (
                  <HStack key={step} spacing={3}>
                    <Box
                      width="40px"
                      height="40px"
                      borderRadius="full"
                      bg={currentStep >= step ? 'brand.primary' : 'rgba(255, 255, 255, 0.1)'}
                      color={currentStep >= step ? 'dark.black' : 'text.muted'}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontWeight="bold"
                      fontSize="sm"
                      transition="all 0.3s"
                      border="2px solid"
                      borderColor={currentStep >= step ? 'brand.primary' : 'rgba(255, 255, 255, 0.1)'}
                    >
                      {currentStep > step ? <FiCheck /> : step}
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text 
                        color={currentStep >= step ? 'text.primary' : 'text.muted'}
                        fontSize="sm"
                        fontWeight="semibold"
                      >
                        Step {step}
                      </Text>
                      <Text 
                        color="text.muted" 
                        fontSize="xs"
                      >
                        {step === 1 ? 'About You' : 'Your Skills'}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </HStack>
            </MotionBox>
          </VStack>

          {/* Main Form */}
          <Box
            as="form"
            onSubmit={handleSubmit}
            width="100%"
            position="relative"
          >
            {/* Hidden inputs for Netlify Forms detection */}
            <input type="hidden" name="form-name" value="burro-application" />
            
            {/* Hidden fields for all form data to ensure Netlify detects them */}
            <div style={{ display: 'none' }}>
              <input name="name" />
              <input name="email" />
              <input name="phone" />
              <input name="github" />
              <input name="linkedin" />
              <input name="portfolio" />
              <input name="experience" />
              <input name="skills" />
              <textarea name="whyBurro" />
              <textarea name="funFact" />
              <input name="availability" />
            </div>

            <AnimatePresence mode="wait">
              {currentStep === 1 ? (
                <MotionBox
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    p={{ base: 6, md: 8 }}
                    borderRadius="2xl"
                    bg="rgba(255, 255, 255, 0.02)"
                    backdropFilter="blur(20px)"
                    border="2px solid"
                    borderColor="rgba(255, 255, 255, 0.06)"
                  >
                    <VStack spacing={6}>
                      {/* Personal Info Section */}
                      <VStack spacing={4} width="100%" align="start">
                        <HStack spacing={2}>
                          <FiUser size={18} color="var(--chakra-colors-brand-primary)" />
                          <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                            Personal Information
                          </Text>
                        </HStack>
                        
                        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} width="100%">
                          <GridItem>
                            <FormControl isRequired>
                              <FormLabel color="text.secondary" fontSize="sm">Full Name</FormLabel>
                              <Input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                size="lg"
                                bg="rgba(255, 255, 255, 0.01)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.08)"
                                borderRadius="lg"
                                _hover={{ 
                                  borderColor: 'rgba(0, 229, 229, 0.15)',
                                  bg: 'rgba(0, 229, 229, 0.01)'
                                }}
                                _focus={{ 
                                  borderColor: 'brand.primary',
                                  boxShadow: '0 0 0 1px rgba(0, 229, 229, 0.2)',
                                  bg: 'rgba(0, 229, 229, 0.02)'
                                }}
                              />
                            </FormControl>
                          </GridItem>
                          
                          <GridItem>
                            <FormControl isRequired>
                              <FormLabel color="text.secondary" fontSize="sm">Email</FormLabel>
                              <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="john@example.com"
                                size="lg"
                                bg="rgba(255, 255, 255, 0.01)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.08)"
                                borderRadius="lg"
                                _hover={{ 
                                  borderColor: 'rgba(0, 229, 229, 0.15)',
                                  bg: 'rgba(0, 229, 229, 0.01)'
                                }}
                                _focus={{ 
                                  borderColor: 'brand.primary',
                                  boxShadow: '0 0 0 1px rgba(0, 229, 229, 0.2)',
                                  bg: 'rgba(0, 229, 229, 0.02)'
                                }}
                              />
                            </FormControl>
                          </GridItem>
                          
                          <GridItem>
                            <FormControl isRequired>
                              <FormLabel color="text.secondary" fontSize="sm">Phone</FormLabel>
                              <Input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+1 (555) 123-4567"
                                size="lg"
                                bg="rgba(255, 255, 255, 0.01)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.08)"
                                borderRadius="lg"
                                _hover={{ 
                                  borderColor: 'rgba(0, 229, 229, 0.15)',
                                  bg: 'rgba(0, 229, 229, 0.01)'
                                }}
                                _focus={{ 
                                  borderColor: 'brand.primary',
                                  boxShadow: '0 0 0 1px rgba(0, 229, 229, 0.2)',
                                  bg: 'rgba(0, 229, 229, 0.02)'
                                }}
                              />
                            </FormControl>
                          </GridItem>
                          
                          <GridItem>
                            <FormControl isRequired>
                              <FormLabel color="text.secondary" fontSize="sm">Experience Level</FormLabel>
                              <Select
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                placeholder="Select your level"
                                size="lg"
                                bg="rgba(255, 255, 255, 0.01)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.08)"
                                borderRadius="lg"
                                _hover={{ 
                                  borderColor: 'rgba(0, 229, 229, 0.15)',
                                  bg: 'rgba(0, 229, 229, 0.01)'
                                }}
                                _focus={{ 
                                  borderColor: 'brand.primary',
                                  boxShadow: '0 0 0 1px rgba(0, 229, 229, 0.2)',
                                  bg: 'rgba(0, 229, 229, 0.02)'
                                }}
                              >
                                {experienceLevels.map(level => (
                                  <option key={level} value={level} style={{ background: '#0A0A0A' }}>
                                    {level}
                                  </option>
                                ))}
                              </Select>
                            </FormControl>
                          </GridItem>
                        </Grid>
                      </VStack>

                      {/* Online Presence */}
                      <VStack spacing={4} width="100%" align="start">
                        <HStack spacing={2}>
                          <FiGlobe size={18} color="var(--chakra-colors-accent-banana)" />
                          <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                            Online Presence
                          </Text>
                          <Badge colorScheme="yellow" fontSize="2xs">At least one required</Badge>
                        </HStack>
                        
                        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4} width="100%">
                          <GridItem>
                            <FormControl>
                              <FormLabel color="text.secondary" fontSize="sm">
                                <HStack spacing={1}>
                                  <FiGithub size={14} />
                                  <Text>GitHub</Text>
                                </HStack>
                              </FormLabel>
                              <Input
                                name="github"
                                value={formData.github}
                                onChange={handleInputChange}
                                placeholder="github.com/username"
                                size="lg"
                                bg="rgba(255, 255, 255, 0.01)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.08)"
                                borderRadius="lg"
                                _hover={{ 
                                  borderColor: 'rgba(255, 229, 0, 0.15)',
                                  bg: 'rgba(255, 229, 0, 0.01)'
                                }}
                                _focus={{ 
                                  borderColor: 'accent.banana',
                                  boxShadow: '0 0 0 1px rgba(255, 229, 0, 0.2)',
                                  bg: 'rgba(255, 229, 0, 0.02)'
                                }}
                              />
                            </FormControl>
                          </GridItem>
                          
                          <GridItem>
                            <FormControl>
                              <FormLabel color="text.secondary" fontSize="sm">
                                <HStack spacing={1}>
                                  <FiLinkedin size={14} />
                                  <Text>LinkedIn</Text>
                                </HStack>
                              </FormLabel>
                              <Input
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleInputChange}
                                placeholder="linkedin.com/in/username"
                                size="lg"
                                bg="rgba(255, 255, 255, 0.01)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.08)"
                                borderRadius="lg"
                                _hover={{ 
                                  borderColor: 'rgba(255, 229, 0, 0.15)',
                                  bg: 'rgba(255, 229, 0, 0.01)'
                                }}
                                _focus={{ 
                                  borderColor: 'accent.banana',
                                  boxShadow: '0 0 0 1px rgba(255, 229, 0, 0.2)',
                                  bg: 'rgba(255, 229, 0, 0.02)'
                                }}
                              />
                            </FormControl>
                          </GridItem>
                          
                          <GridItem>
                            <FormControl>
                              <FormLabel color="text.secondary" fontSize="sm">
                                <HStack spacing={1}>
                                  <FiGlobe size={14} />
                                  <Text>Portfolio</Text>
                                </HStack>
                              </FormLabel>
                              <Input
                                name="portfolio"
                                value={formData.portfolio}
                                onChange={handleInputChange}
                                placeholder="yourwebsite.com"
                                size="lg"
                                bg="rgba(255, 255, 255, 0.01)"
                                border="1px solid"
                                borderColor="rgba(255, 255, 255, 0.08)"
                                borderRadius="lg"
                                _hover={{ 
                                  borderColor: 'rgba(255, 229, 0, 0.15)',
                                  bg: 'rgba(255, 229, 0, 0.01)'
                                }}
                                _focus={{ 
                                  borderColor: 'accent.banana',
                                  boxShadow: '0 0 0 1px rgba(255, 229, 0, 0.2)',
                                  bg: 'rgba(255, 229, 0, 0.02)'
                                }}
                              />
                            </FormControl>
                          </GridItem>
                        </Grid>
                      </VStack>

                      {/* Next Button */}
                      <Button
                        type="button"
                        size="lg"
                        width={{ base: "100%", md: "auto" }}
                        px={8}
                        bg="brand.primary"
                        color="dark.black"
                        fontSize="md"
                        fontWeight="semibold"
                        borderRadius="lg"
                        rightIcon={<FiArrowRight />}
                        onClick={handleNext}
                        isDisabled={!isStep1Complete()}
                        opacity={!isStep1Complete() ? 0.6 : 1}
                        _hover={{
                          bg: isStep1Complete() ? 'brand.primaryDark' : 'brand.primary',
                          transform: isStep1Complete() ? 'translateY(-1px)' : 'none',
                          boxShadow: isStep1Complete() ? '0 10px 30px rgba(0, 229, 229, 0.3)' : 'none'
                        }}
                        _active={{
                          transform: 'translateY(0)'
                        }}
                        transition="all 0.2s"
                      >
                        Continue
                      </Button>
                    </VStack>
                  </Box>
                </MotionBox>
              ) : (
                <MotionBox
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    p={{ base: 6, md: 8 }}
                    borderRadius="2xl"
                    bg="rgba(255, 255, 255, 0.02)"
                    backdropFilter="blur(20px)"
                    border="2px solid"
                    borderColor="rgba(255, 255, 255, 0.06)"
                  >
                    <VStack spacing={6}>
                      {/* Skills Section */}
                      <VStack spacing={4} width="100%" align="start">
                        <HStack spacing={2}>
                          <FiCode size={18} color="var(--chakra-colors-accent-neon)" />
                          <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                            Your Skills
                          </Text>
                        </HStack>
                        
                        <FormControl isRequired>
                          <FormLabel color="text.secondary" fontSize="sm">
                            List your technical skills, tools, and expertise
                          </FormLabel>
                          <Textarea
                            name="skills"
                            value={formData.skills}
                            onChange={handleInputChange}
                            placeholder="E.g., React, Node.js, Python, AWS, Docker, UI/UX Design, SEO, etc."
                            rows={4}
                            resize="vertical"
                            size="lg"
                            bg="rgba(255, 255, 255, 0.01)"
                            border="1px solid"
                            borderColor="rgba(255, 255, 255, 0.08)"
                            borderRadius="lg"
                            _hover={{ 
                              borderColor: 'rgba(57, 255, 20, 0.15)',
                              bg: 'rgba(57, 255, 20, 0.01)'
                            }}
                            _focus={{ 
                              borderColor: 'accent.neon',
                              boxShadow: '0 0 0 1px rgba(57, 255, 20, 0.2)',
                              bg: 'rgba(57, 255, 20, 0.02)'
                            }}
                          />
                        </FormControl>
                      </VStack>

                      {/* Story Section */}
                      <VStack spacing={4} width="100%" align="start">
                        <HStack spacing={2}>
                          <FiHeart size={18} color="var(--chakra-colors-accent-warm)" />
                          <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                            Your Story
                          </Text>
                        </HStack>
                        
                        <FormControl isRequired>
                          <FormLabel color="text.secondary" fontSize="sm">
                            Why do you want to become a Visiting Burro?
                          </FormLabel>
                          <Textarea
                            name="whyBurro"
                            value={formData.whyBurro}
                            onChange={handleInputChange}
                            placeholder="Tell us what excites you about this opportunity..."
                            rows={4}
                            resize="vertical"
                            size="lg"
                            bg="rgba(255, 255, 255, 0.01)"
                            border="1px solid"
                            borderColor="rgba(255, 255, 255, 0.08)"
                            borderRadius="lg"
                            _hover={{ 
                              borderColor: 'rgba(255, 107, 0, 0.15)',
                              bg: 'rgba(255, 107, 0, 0.01)'
                            }}
                            _focus={{ 
                              borderColor: 'accent.warm',
                              boxShadow: '0 0 0 1px rgba(255, 107, 0, 0.2)',
                              bg: 'rgba(255, 107, 0, 0.02)'
                            }}
                          />
                        </FormControl>
                        
                        <FormControl>
                          <FormLabel color="text.secondary" fontSize="sm">
                            <HStack spacing={2}>
                              <FiCoffee size={14} />
                              <Text>Share something fun about yourself!</Text>
                              <Badge 
                                bg="accent.purpleAlpha.20" 
                                color="accent.purple"
                                fontSize="2xs"
                                px={2}
                                py={0.5}
                                borderRadius="full"
                              >
                                Optional
                              </Badge>
                            </HStack>
                          </FormLabel>
                          <Textarea
                            name="funFact"
                            value={formData.funFact}
                            onChange={handleInputChange}
                            placeholder="Hobbies, fun facts, or your favorite coding snack..."
                            rows={3}
                            resize="vertical"
                            size="lg"
                            bg="rgba(255, 255, 255, 0.01)"
                            border="1px solid"
                            borderColor="rgba(255, 255, 255, 0.08)"
                            borderRadius="lg"
                            _hover={{ 
                              borderColor: 'rgba(139, 92, 246, 0.15)',
                              bg: 'rgba(139, 92, 246, 0.01)'
                            }}
                            _focus={{ 
                              borderColor: 'accent.purple',
                              boxShadow: '0 0 0 1px rgba(139, 92, 246, 0.2)',
                              bg: 'rgba(139, 92, 246, 0.02)'
                            }}
                          />
                        </FormControl>
                      </VStack>

                      {/* Availability */}
                      <VStack spacing={4} width="100%" align="start">
                        <HStack spacing={2}>
                          <FiCalendar size={18} color="var(--chakra-colors-brand-primary)" />
                          <Text color="text.primary" fontSize="lg" fontWeight="semibold">
                            Availability
                          </Text>
                        </HStack>
                        
                        <FormControl isRequired>
                          <FormLabel color="text.secondary" fontSize="sm">When could you start?</FormLabel>
                          <Select
                            name="availability"
                            value={formData.availability}
                            onChange={handleInputChange}
                            placeholder="Select availability"
                            size="lg"
                            bg="rgba(255, 255, 255, 0.01)"
                            border="1px solid"
                            borderColor="rgba(255, 255, 255, 0.08)"
                            borderRadius="lg"
                            _hover={{ 
                              borderColor: 'rgba(0, 229, 229, 0.15)',
                              bg: 'rgba(0, 229, 229, 0.01)'
                            }}
                            _focus={{ 
                              borderColor: 'brand.primary',
                              boxShadow: '0 0 0 1px rgba(0, 229, 229, 0.2)',
                              bg: 'rgba(0, 229, 229, 0.02)'
                            }}
                          >
                            {availabilityOptions.map(option => (
                              <option key={option} value={option} style={{ background: '#0A0A0A' }}>
                                {option}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </VStack>

                      {/* Action Buttons */}
                      <HStack width="100%" justify="space-between" pt={4}>
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          px={6}
                          borderColor="rgba(255, 255, 255, 0.2)"
                          color="text.primary"
                          leftIcon={<FiArrowLeft />}
                          onClick={handleBack}
                          _hover={{
                            borderColor: 'brand.primary',
                            bg: 'rgba(0, 229, 229, 0.05)'
                          }}
                        >
                          Back
                        </Button>
                        
                        <Button
                          type="submit"
                          size="lg"
                          px={8}
                          bgGradient="linear(to-r, accent.banana, accent.neon)"
                          color="dark.black"
                          fontSize="md"
                          fontWeight="bold"
                          borderRadius="lg"
                          rightIcon={<FiSend />}
                          isLoading={isSubmitting}
                          loadingText="Sending..."
                          isDisabled={!isStep2Complete()}
                          opacity={!isStep2Complete() ? 0.6 : 1}
                          _hover={{
                            transform: isStep2Complete() ? 'translateY(-1px)' : 'none',
                            boxShadow: isStep2Complete() ? '0 20px 40px rgba(255, 229, 0, 0.3)' : 'none'
                          }}
                          _active={{
                            transform: 'translateY(0)'
                          }}
                          transition="all 0.2s"
                        >
                          Submit Application
                        </Button>
                      </HStack>
                    </VStack>
                  </Box>
                </MotionBox>
              )}
            </AnimatePresence>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ApplyForm;