import { Box, Container, useToast } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import ContactHero from './components/ContactHero';
import FormProgress from './components/FormProgress';
import StepAboutYou from './components/StepAboutYou';
import StepYourProject from './components/StepYourProject';
import StepLetsConnect from './components/StepLetsConnect';
import FormSuccessEnhanced from './components/FormSuccessEnhanced';

const Contact = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    email: '',
    company: '',
    source: '',
    // Step 2
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    // Step 3
    contactMethod: [],
    phone: '',
    bestTime: '',
    additionalInfo: ''
  });
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formSectionRef = useRef(null);
  const toast = useToast();

  // Scroll to form when step changes
  useEffect(() => {
    if (formSectionRef.current && currentStep > 1) {
      const yOffset = -20;
      const element = formSectionRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [currentStep]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setTouched({ ...touched, [field]: true });
  };

  const isFieldValid = (field) => {
    switch (field) {
      case 'email':
        return formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 'name':
        return formData.name && formData.name.length >= 2;
      case 'phone':
        return formData.phone && formData.phone.length >= 10;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Proper encoding function for form data
  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Check if we're in development/local environment
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    try {
      // Format the data for submission
      const submissionData = {
        'form-name': 'contact-form',
        'name': formData.name,
        'email': formData.email,
        'company': formData.company || 'Not provided',
        'source': formData.source || 'Not specified',
        'projectType': formData.projectType,
        'budget': formData.budget,
        'timeline': formData.timeline,
        'description': formData.description || 'No additional details',
        'contactMethod': Array.isArray(formData.contactMethod) ? formData.contactMethod.join(', ') : '',
        'phone': formData.phone || 'Not provided',
        'bestTime': formData.bestTime || 'Any time',
        'additionalInfo': formData.additionalInfo || 'None'
      };

      if (isLocal) {
        // Simulate successful submission in local development
        console.log('Form submission (local):', submissionData);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        toast({
          title: "Success! (Local Test)",
          description: "Form submission simulated. In production, this will be sent to Netlify.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        // Production submission to Netlify
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode(submissionData)
        });

        if (response.ok) {
          setIsSubmitted(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          
          toast({
            title: "Success! 🎉",
            description: "Your message has been received. We'll be in touch within 24 hours!",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else {
          throw new Error('Submission failed');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Oops! Something went wrong",
        description: isLocal ? "This is expected in local development. Deploy to Netlify to test real submissions." : "Please try again or email us directly at hello@neonburro.com",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigateHome = () => {
    window.location.href = '/';
  };

  return (
    <Box minH="100vh" bg="#0A0A0A">
      {/* Hidden form for Netlify - CRITICAL for detection */}
      <form 
        name="contact-form" 
        data-netlify="true" 
        netlify-honeypot="bot-field"
        hidden
      >
        <input type="hidden" name="form-name" value="contact-form" />
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="company" />
        <input type="text" name="source" />
        <input type="text" name="projectType" />
        <input type="text" name="budget" />
        <input type="text" name="timeline" />
        <textarea name="description"></textarea>
        <input type="text" name="contactMethod" />
        <input type="tel" name="phone" />
        <input type="text" name="bestTime" />
        <textarea name="additionalInfo"></textarea>
        <input type="text" name="bot-field" />
      </form>
      
      {/* Hero Section */}
      <ContactHero />
      
      <Container maxW="800px" pb={20} px={{ base: 6, md: 8 }}>
        {!isSubmitted ? (
          <>
            {/* Form Progress with ref for scroll target */}
            <Box ref={formSectionRef}>
              <FormProgress currentStep={currentStep} />
            </Box>
            
            <Box
              bg="rgba(0,0,0,0.6)"
              backdropFilter="blur(20px)"
              border="2px solid"
              borderColor="whiteAlpha.100"
              borderRadius="2xl"
              p={{ base: 6, md: 10 }}
              boxShadow="0 20px 40px rgba(0,0,0,0.4)"
              position="relative"
              overflow="hidden"
            >
              {/* Subtle gradient background */}
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgGradient="radial(at top left, rgba(0, 229, 229, 0.05) 0%, transparent 50%)"
                pointerEvents="none"
              />
              
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <StepAboutYou
                    key="step1"
                    formData={formData}
                    handleChange={handleChange}
                    onNext={handleNext}
                    isFieldValid={isFieldValid}
                    touched={touched}
                  />
                )}
                
                {currentStep === 2 && (
                  <StepYourProject
                    key="step2"
                    formData={formData}
                    handleChange={handleChange}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                
                {currentStep === 3 && (
                  <StepLetsConnect
                    key="step3"
                    formData={formData}
                    handleChange={handleChange}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}
              </AnimatePresence>
            </Box>
          </>
        ) : (
          <FormSuccessEnhanced 
            formData={formData}
            onNavigateHome={handleNavigateHome}
          />
        )}
      </Container>
    </Box>
  );
};

export default Contact;