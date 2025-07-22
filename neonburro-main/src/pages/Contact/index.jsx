import { Box, Container } from '@chakra-ui/react';
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
    email: '', // Removed localStorage usage
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
  
  // Ref for form section
  const formSectionRef = useRef(null);

  // Scroll to form when step changes
  useEffect(() => {
    if (formSectionRef.current && currentStep > 1) {
      // Scroll to form with offset for navigation
      const yOffset = -20; // Adjust this value based on your needs
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
    
    try {
      // Submit to Netlify with proper encoding
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact-form',
          ...formData,
          contactMethod: formData.contactMethod.join(', '), // Convert array to string
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.error('Form submission failed');
        // You might want to add toast notification here
      }
    } catch (error) {
      console.error('Submission error:', error);
      // You might want to add toast notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigateHome = () => {
    window.location.href = '/';
  };

  return (
    <Box minH="100vh" bg="#0A0A0A">
      
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