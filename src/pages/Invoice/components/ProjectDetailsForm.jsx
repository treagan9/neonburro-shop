// src/pages/Invoice/components/ProjectDetailsForm.jsx
import { 
  Box, 
  VStack, 
  Input, 
  Button, 
  Text, 
  Heading, 
  HStack, 
  InputGroup, 
  InputLeftElement, 
  SimpleGrid,
  Badge,
  List,
  ListItem,
  ListIcon,
  Fade,
  ScaleFade,
  Checkbox,
  Divider,
  Icon,
  useToast
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  FiUser, 
  FiFolder, 
  FiZap, 
  FiTrendingUp, 
  FiAward, 
  FiStar,
  FiClock,
  FiArrowRight,
  FiCheck,
  FiPackage
} from 'react-icons/fi';
import { IoRocketOutline } from 'react-icons/io5';
import { RiSparklingLine, RiFireLine, RiStarLine, RiVipCrownLine } from 'react-icons/ri';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const ProjectDetailsForm = ({ onContinue, initialData, sessionId, onTrackEvent }) => {
  const toast = useToast();
  const [firstName, setFirstName] = useState(initialData?.firstName || '');
  const [projectName, setProjectName] = useState(initialData?.projectName || '');
  const [hours, setHours] = useState(initialData?.hours || '');
  const [isCustomHours, setIsCustomHours] = useState(false);
  const [clientType, setClientType] = useState(''); // 'existing' or 'new'
  const [selectedPackage, setSelectedPackage] = useState(initialData?.packageType || '');
  const [wantsHostingDetails, setWantsHostingDetails] = useState(false);
  
  const hourlyRate = 44;
  
  // Calculate total based on selection
  const getTotal = () => {
    if (selectedPackage) {
      const packagePrices = {
        'spark': 499,
        'ignite': 999,
        'burro': 2499,
        'vip': 9999
      };
      return packagePrices[selectedPackage] || 0;
    }
    return hours ? parseInt(hours) * hourlyRate : 0;
  };

  const total = getTotal();

  // Colors
  const colors = {
    brand: { primary: '#00FFFF' },
    accent: { green: '#39FF14' },
    copper: '#FF6B35',
    vip: { 
      primary: '#D4AF37', // Gold
      secondary: '#B87333', // Copper
      accent: '#FFD700' // Bright gold
    }
  };

  // Hour packages
  const hourPackages = [
    { 
      value: '10', 
      label: '10 hours', 
      price: 440, 
      subtitle: 'Quick wins',
      icon: FiZap,
      description: 'Perfect for small updates and fixes'
    },
    { 
      value: '25', 
      label: '25 hours', 
      price: 1100, 
      subtitle: 'Solid progress',
      icon: FiTrendingUp,
      description: 'Great for feature development'
    },
    { 
      value: '40', 
      label: '40 hours', 
      price: 1760, 
      subtitle: 'Major milestone',
      icon: FiAward,
      description: 'Complete module or section'
    },
    { 
      value: '80', 
      label: '80 hours', 
      price: 3520, 
      subtitle: 'Full transformation',
      icon: FiStar,
      description: 'Comprehensive project phase'
    }
  ];

  // Service packages
  const servicePackages = [
    {
      id: 'spark',
      name: 'Spark',
      tagline: 'STARTUPS & SMALL BUSINESSES',
      price: 499,
      description: 'Everything you need to shine online',
      icon: RiSparklingLine,
      color: '#00FFFF',
      features: [
        'Blazing fast, fully hosted website',
        'Custom design that captures your vision',
        'AI-powered search built in',
        'SEO optimized from day one',
        'Mobile-first responsive design',
        'Lifetime support & updates'
      ],
      vibe: 'Perfect scope to get you launched',
      timeline: '2-3 weeks'
    },
    {
      id: 'ignite',
      name: 'Ignite',
      tagline: 'GROWING BUSINESSES',
      price: 999,
      badge: 'MOST POPULAR',
      description: 'Your digital presence, supercharged',
      icon: RiFireLine,
      color: '#FF6B35',
      features: [
        'Everything in Spark, plus:',
        'Advanced integrations & analytics',
        'Content management system',
        'Social media connections',
        'Performance optimization',
        'Priority support queue'
      ],
      vibe: 'Extra fuel for ambitious growth',
      timeline: '3-4 weeks'
    },
    {
      id: 'burro',
      name: 'Burro',
      tagline: 'AMBITIOUS BRANDS',
      price: 2499,
      description: 'The complete digital transformation',
      icon: RiStarLine,
      color: '#FFD700',
      features: [
        'Everything in Ignite, plus:',
        'Custom functionality & features',
        'E-commerce capabilities',
        'Multi-language support',
        'Advanced automation',
        'White-glove service'
      ],
      vibe: 'Unlimited possibilities, zero limits',
      timeline: '4-6 weeks'
    },
    {
      id: 'vip',
      name: 'VIP',
      tagline: 'EXCLUSIVE PARTNERSHIP',
      price: 9999,
      badge: 'VIP EXCLUSIVE',
      description: 'Where dreams become digital reality',
      icon: RiVipCrownLine,
      color: colors.vip.primary,
      features: [
        'Everything in Burro, plus:',
        'Entire core team dedicated to your project',
        'Direct access to founders & leadership',
        'Weekly strategy sessions',
        'Instant priority status',
        'VIP member benefits & exclusive gifts',
        'Lifetime VIP support tier',
        'Custom everything - no limits'
      ],
      vibe: 'Your vision, our obsession',
      timeline: 'Priority delivery',
      special: true
    }
  ];

  // Simplified tracking for form interactions
  const trackEvent = (eventType, data) => {
    if (!onTrackEvent) return;
    
    // Ensure all data is properly formatted as strings
    const formattedData = {
      sessionId: sessionId || '',
      timestamp: new Date().toISOString(),
      action: eventType,
      firstName: String(data.firstName || firstName || ''),
      projectName: String(data.projectName || projectName || ''),
      ...data
    };
    
    // Convert any boolean values to strings
    Object.keys(formattedData).forEach(key => {
      if (typeof formattedData[key] === 'boolean') {
        formattedData[key] = formattedData[key] ? 'true' : 'false';
      } else if (typeof formattedData[key] === 'number') {
        formattedData[key] = String(formattedData[key]);
      }
    });
    
    onTrackEvent(eventType, formattedData);
  };

  const handleHourSelection = (pkg) => {
    setHours(pkg.value);
    setIsCustomHours(false);
    setSelectedPackage('');
    
    trackEvent('package-selection', {
      packageType: 'hourly',
      packageName: pkg.label,
      hours: pkg.value,
      total: pkg.price,
      action: 'hour-package-selected'
    });
  };

  const handleCustomHours = (value) => {
    const numValue = value.replace(/\D/g, ''); // Only allow numbers
    setHours(numValue);
    setIsCustomHours(true);
    setSelectedPackage('');
    
    if (numValue) {
      const customTotal = parseInt(numValue) * hourlyRate;
      trackEvent('package-selection', {
        packageType: 'hourly-custom',
        hours: numValue,
        total: customTotal,
        action: 'custom-hours-entered'
      });
    }
  };

  const handlePackageSelection = (pkgId) => {
    setSelectedPackage(pkgId);
    setHours('');
    setIsCustomHours(false);
    
    const pkg = servicePackages.find(p => p.id === pkgId);
    
    if (pkg) {
      trackEvent('package-selection', {
        packageType: pkgId,
        packageName: pkg.name,
        total: pkg.price,
        isVip: pkgId === 'vip',
        action: 'service-package-selected'
      });
      
      // Special VIP tracking
      if (pkgId === 'vip') {
        trackEvent('vip-interest', {
          action: 'vip-package-selected',
          referralSource: document.referrer || 'direct'
        });
        
        toast({
          title: "VIP Package Selected! 👑",
          description: "Get ready for the ultimate web development experience",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      }
    }
  };

  const handleSubmit = () => {
    if (!firstName || !projectName || (!hours && !selectedPackage)) return;
    
    const pkg = servicePackages.find(p => p.id === selectedPackage);
    
    // Prepare data with proper formatting
    const data = {
      firstName,
      projectName,
      total,
      clientType: selectedPackage ? 'new' : 'existing',
      ...(selectedPackage ? {
        packageType: selectedPackage,
        packageName: pkg?.name || '',
        isServicePackage: true,
        wantsHostingDetails,
        isVip: selectedPackage === 'vip'
      } : {
        hours,
        packageType: 'hourly',
        packageName: `${hours} hours`,
        isServicePackage: false,
        isVip: false,
        wantsHostingDetails: false
      })
    };

    // Track form completion
    trackEvent('project-inquiry', {
      clientType: data.clientType,
      packageInfo: selectedPackage || `${hours} hours`,
      total: total,
      action: 'form-completed'
    });

    onContinue(data);
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VStack spacing={{ base: 6, md: 8 }}>
        {/* Header */}
        <VStack spacing={3} textAlign="center">
          <Heading 
            size={{ base: "xl", md: "2xl" }}
            color="white"
            fontWeight="800"
            letterSpacing="-0.02em"
          >
            Let's Build Something Amazing
          </Heading>
          <Text color="gray.400" fontSize={{ base: "md", md: "lg" }}>
            Your journey to digital excellence starts here
          </Text>
        </VStack>

        {/* Main Form Card */}
        <Box
          width="100%"
          maxW={{ base: "100%", md: "600px", lg: "500px" }}
          mx="auto"
          p={{ base: 6, md: 8 }}
          bg="rgba(10, 10, 10, 0.8)"
          backdropFilter="blur(20px)"
          border="1.5px solid"
          borderColor="whiteAlpha.200"
          borderRadius="2xl"
          boxShadow="0 20px 40px rgba(0,0,0,0.4)"
          position="relative"
          overflow="hidden"
        >
          <MotionVStack
            spacing={6}
            position="relative"
            initial="hidden"
            animate="visible"
          >
            {/* First Name Input */}
            <MotionBox width="100%" custom={1} variants={inputVariants}>
              <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} mb={2} fontWeight="600">
                FIRST NAME
              </Text>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none" pl={1}>
                  <Box color={firstName ? colors.brand.primary : 'gray.500'} transition="color 0.2s">
                    <FiUser size={18} />
                  </Box>
                </InputLeftElement>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  bg="rgba(255, 255, 255, 0.03)"
                  border="1.5px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "48px", md: "52px" }}
                  _placeholder={{ color: 'gray.600' }}
                  _hover={{ 
                    borderColor: 'whiteAlpha.300',
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  _focus={{ 
                    borderColor: colors.brand.primary, 
                    boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  pl="3rem"
                  borderRadius="xl"
                  transition="all 0.2s"
                  required
                />
              </InputGroup>
            </MotionBox>

            {/* Project Name Input */}
            <MotionBox width="100%" custom={2} variants={inputVariants}>
              <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} mb={2} fontWeight="600">
                PROJECT NAME
              </Text>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none" pl={1}>
                  <Box color={projectName ? colors.brand.primary : 'gray.500'} transition="color 0.2s">
                    <FiFolder size={18} />
                  </Box>
                </InputLeftElement>
                <Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="My Amazing Website"
                  bg="rgba(255, 255, 255, 0.03)"
                  border="1.5px solid"
                  borderColor="whiteAlpha.200"
                  color="white"
                  fontSize={{ base: "sm", md: "md" }}
                  height={{ base: "48px", md: "52px" }}
                  _placeholder={{ color: 'gray.600' }}
                  _hover={{ 
                    borderColor: 'whiteAlpha.300',
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  _focus={{ 
                    borderColor: colors.brand.primary, 
                    boxShadow: `0 0 0 1px ${colors.brand.primary}`,
                    bg: 'rgba(255, 255, 255, 0.05)'
                  }}
                  pl="3rem"
                  borderRadius="xl"
                  transition="all 0.2s"
                  required
                />
              </InputGroup>
            </MotionBox>

            {/* Client Type Selection */}
            {firstName && projectName && !clientType && (
              <ScaleFade in={true} initialScale={0.9}>
                <MotionBox width="100%" custom={3} variants={inputVariants}>
                  <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} mb={4} fontWeight="600" textAlign="center">
                    CHOOSE YOUR PATH
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <Box
                      p={6}
                      borderRadius="xl"
                      border="2px solid"
                      borderColor="whiteAlpha.200"
                      bg="rgba(255, 255, 255, 0.03)"
                      cursor="pointer"
                      transition="all 0.3s"
                      onClick={() => {
                        setClientType('existing');
                        trackEvent('client-type-selected', { clientType: 'existing' });
                      }}
                      _hover={{ 
                        borderColor: colors.brand.primary,
                        bg: 'rgba(0, 255, 255, 0.05)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 30px rgba(0,255,255,0.2)'
                      }}
                    >
                      <VStack spacing={3}>
                        <Box color={colors.brand.primary}>
                          <FiClock size={32} />
                        </Box>
                        <Text color="white" fontSize="lg" fontWeight="700">
                          I'm extending my project
                        </Text>
                        <Text color="gray.400" fontSize="sm" textAlign="center">
                          Add development hours to continue our momentum
                        </Text>
                      </VStack>
                    </Box>

                    <Box
                      p={6}
                      borderRadius="xl"
                      border="2px solid"
                      borderColor="whiteAlpha.200"
                      bg="rgba(255, 255, 255, 0.03)"
                      cursor="pointer"
                      transition="all 0.3s"
                      onClick={() => {
                        setClientType('new');
                        trackEvent('client-type-selected', { clientType: 'new' });
                      }}
                      _hover={{ 
                        borderColor: colors.accent.green,
                        bg: 'rgba(57, 255, 20, 0.05)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 30px rgba(57,255,20,0.2)'
                      }}
                    >
                      <VStack spacing={3}>
                        <Box color={colors.accent.green}>
                          <IoRocketOutline size={32} />
                        </Box>
                        <Text color="white" fontSize="lg" fontWeight="700">
                          I'm ready to build
                        </Text>
                        <Text color="gray.400" fontSize="sm" textAlign="center">
                          Start fresh with a complete service package
                        </Text>
                      </VStack>
                    </Box>
                  </SimpleGrid>
                </MotionBox>
              </ScaleFade>
            )}

            {/* Hour Selection for Existing Clients */}
            <AnimatePresence>
              {clientType === 'existing' && (
                <Fade in={true}>
                  <MotionBox width="100%" custom={4} variants={inputVariants}>
                    <HStack justify="space-between" align="center" mb={4}>
                      <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} fontWeight="600">
                        SELECT DEVELOPMENT HOURS
                      </Text>
                      <Button
                        size="xs"
                        variant="ghost"
                        color="gray.500"
                        onClick={() => setClientType('')}
                        _hover={{ color: 'white' }}
                      >
                        Change
                      </Button>
                    </HStack>
                    
                    {/* Hour Packages */}
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={6}>
                      {hourPackages.map((pkg) => {
                        const Icon = pkg.icon;
                        return (
                          <Box
                            key={pkg.value}
                            p={5}
                            borderRadius="xl"
                            border="2px solid"
                            borderColor={hours === pkg.value && !isCustomHours ? colors.brand.primary : 'whiteAlpha.200'}
                            bg={hours === pkg.value && !isCustomHours ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)'}
                            cursor="pointer"
                            transition="all 0.3s"
                            onClick={() => handleHourSelection(pkg)}
                            _hover={{ 
                              borderColor: colors.brand.primary,
                              bg: 'rgba(0, 255, 255, 0.03)',
                              transform: 'translateY(-2px)'
                            }}
                            position="relative"
                          >
                            <HStack spacing={4} align="start">
                              <Box 
                                color={hours === pkg.value && !isCustomHours ? colors.brand.primary : 'gray.400'}
                                transition="color 0.2s"
                              >
                                <Icon size={24} />
                              </Box>
                              <VStack align="start" spacing={1} flex={1}>
                                <Text 
                                  color={hours === pkg.value && !isCustomHours ? 'white' : 'gray.300'}
                                  fontWeight="700"
                                  fontSize="lg"
                                >
                                  {pkg.label}
                                </Text>
                                <Text color="gray.500" fontSize="xs">
                                  {pkg.subtitle}
                                </Text>
                                <Text color="gray.400" fontSize="sm">
                                  {pkg.description}
                                </Text>
                                <Text 
                                  color={hours === pkg.value && !isCustomHours ? colors.brand.primary : 'gray.400'}
                                  fontSize="2xl"
                                  fontWeight="800"
                                  mt={2}
                                >
                                  ${pkg.price.toLocaleString()}
                                </Text>
                              </VStack>
                            </HStack>
                          </Box>
                        );
                      })}
                    </SimpleGrid>

                    {/* Custom Hours */}
                    <Box
                      p={5}
                      borderRadius="xl"
                      border="2px solid"
                      borderColor={isCustomHours ? colors.brand.primary : 'whiteAlpha.200'}
                      bg={isCustomHours ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)'}
                    >
                      <VStack spacing={3} align="stretch">
                        <HStack>
                          <Box color={isCustomHours ? colors.brand.primary : 'gray.400'}>
                            <FiPackage size={20} />
                          </Box>
                          <Text color="gray.300" fontSize="sm" fontWeight="600">
                            CUSTOM HOURS PACKAGE
                          </Text>
                        </HStack>
                        <HStack spacing={3}>
                          <Input
                            type="number"
                            placeholder="Enter hours"
                            value={isCustomHours ? hours : ''}
                            onChange={(e) => handleCustomHours(e.target.value)}
                            bg="rgba(255, 255, 255, 0.03)"
                            border="1.5px solid"
                            borderColor="whiteAlpha.200"
                            color="white"
                            textAlign="center"
                            fontSize="lg"
                            fontWeight="600"
                            _placeholder={{ color: 'gray.600' }}
                            _hover={{ borderColor: 'whiteAlpha.300' }}
                            _focus={{ 
                              borderColor: colors.brand.primary, 
                              boxShadow: `0 0 0 1px ${colors.brand.primary}`
                            }}
                            borderRadius="lg"
                            min={1}
                            max={200}
                          />
                          <Text color="gray.400" fontSize="sm" whiteSpace="nowrap">
                            × ${hourlyRate}/hour
                          </Text>
                        </HStack>
                        {isCustomHours && hours && (
                          <Text color={colors.brand.primary} fontSize="xl" fontWeight="700" textAlign="center">
                            ${(parseInt(hours) * hourlyRate).toLocaleString()}
                          </Text>
                        )}
                      </VStack>
                    </Box>
                  </MotionBox>
                </Fade>
              )}
            </AnimatePresence>

            {/* Service Packages for New Clients */}
            <AnimatePresence>
              {clientType === 'new' && (
                <Fade in={true}>
                  <MotionBox width="100%" custom={4} variants={inputVariants}>
                    <HStack justify="space-between" align="center" mb={4}>
                      <Text color="gray.300" fontSize={{ base: "xs", md: "sm" }} fontWeight="600">
                        SELECT YOUR SERVICE PACKAGE
                      </Text>
                      <Button
                        size="xs"
                        variant="ghost"
                        color="gray.500"
                        onClick={() => setClientType('')}
                        _hover={{ color: 'white' }}
                      >
                        Change
                      </Button>
                    </HStack>

                    <VStack spacing={6}>
                      {servicePackages.map((pkg) => {
                        const Icon = pkg.icon;
                        const isSelected = selectedPackage === pkg.id;
                        const isVip = pkg.id === 'vip';
                        
                        return (
                          <Box
                            key={pkg.id}
                            p={6}
                            borderRadius="xl"
                            border="3px solid"
                            borderColor={isSelected ? pkg.color : 'whiteAlpha.200'}
                            bg={isSelected ? 
                              (isVip ? 'rgba(212, 175, 55, 0.05)' : `${pkg.color}11`) : 
                              'rgba(255, 255, 255, 0.03)'
                            }
                            cursor="pointer"
                            transition="all 0.3s"
                            onClick={() => handlePackageSelection(pkg.id)}
                            position="relative"
                            overflow="hidden"
                            _hover={{ 
                              borderColor: pkg.color,
                              transform: 'translateY(-2px)',
                              boxShadow: `0 10px 30px ${pkg.color}44`
                            }}
                            width="100%"
                          >
                            {isVip && (
                              <Box
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                height="100px"
                                bgGradient={`linear(to-b, ${colors.vip.primary}22, transparent)`}
                                opacity={0.5}
                              />
                            )}

                            {pkg.badge && (
                              <Badge
                                position="absolute"
                                top={4}
                                right={4}
                                bg={pkg.color}
                                color={isVip ? 'black' : 'black'}
                                fontSize="xs"
                                fontWeight="800"
                                px={3}
                                py={1}
                                borderRadius="full"
                              >
                                {pkg.badge}
                              </Badge>
                            )}

                            <VStack align="stretch" spacing={4} position="relative">
                              <HStack>
                                <Box 
                                  p={3}
                                  borderRadius="lg"
                                  bg={isVip ? colors.vip.primary : pkg.color}
                                  color={isVip ? 'black' : 'white'}
                                >
                                  <Icon size={24} />
                                </Box>
                                <VStack align="start" spacing={0}>
                                  <Text color="white" fontSize="2xl" fontWeight="800">
                                    {pkg.name}
                                  </Text>
                                  <Text color="gray.400" fontSize="xs" fontWeight="600" letterSpacing="wider">
                                    {pkg.tagline}
                                  </Text>
                                </VStack>
                              </HStack>

                              <Text color="gray.300" fontSize="sm">
                                {pkg.description}
                              </Text>

                              <Box 
                                p={3} 
                                bg="rgba(255,255,255,0.05)" 
                                borderRadius="lg"
                                border="1px solid"
                                borderColor="whiteAlpha.100"
                              >
                                <VStack spacing={2}>
                                  <HStack justify="space-between" width="100%">
                                    <Text color="gray.400" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                                      Investment
                                    </Text>
                                    <Text 
                                      color={isSelected ? pkg.color : 'white'}
                                      fontSize="3xl"
                                      fontWeight="800"
                                    >
                                      ${pkg.price.toLocaleString()}
                                    </Text>
                                  </HStack>
                                  <Text 
                                    color={pkg.color} 
                                    fontSize="sm" 
                                    fontStyle="italic"
                                    textAlign="center"
                                    width="100%"
                                  >
                                    {pkg.vibe}
                                  </Text>
                                </VStack>
                              </Box>

                              <Box>
                                <Text color="gray.400" fontSize="xs" mb={2} fontWeight="600">
                                  WHAT'S INCLUDED:
                                </Text>
                                <List spacing={2}>
                                  {pkg.features.slice(0, 4).map((feature, idx) => (
                                    <ListItem key={idx} fontSize="sm" color="gray.300">
                                      <ListIcon as={FiCheck} color={pkg.color} />
                                      {feature}
                                    </ListItem>
                                  ))}
                                  {pkg.features.length > 4 && (
                                    <Text fontSize="xs" color="gray.500" ml={6}>
                                      + {pkg.features.length - 4} more features
                                    </Text>
                                  )}
                                </List>
                              </Box>
                            </VStack>
                          </Box>
                        );
                      })}
                    </VStack>

                    {/* Hosting & Support Checkbox */}
                    {selectedPackage && (
                      <Box
                        mt={6}
                        p={5}
                        bg="rgba(57, 255, 20, 0.05)"
                        borderRadius="xl"
                        border="2px solid"
                        borderColor={wantsHostingDetails ? colors.accent.green : 'whiteAlpha.200'}
                        transition="all 0.3s"
                      >
                        <VStack align="start" spacing={3}>
                          <Text color="gray.300" fontSize="xs" fontWeight="600" letterSpacing="wider">
                            INCLUDED WITH EVERY PACKAGE
                          </Text>
                          <List spacing={2}>
                            <ListItem fontSize="sm" color="gray.300">
                              <ListIcon as={FiCheck} color={colors.accent.green} />
                              Blazing-fast global CDN for instant page loads
                            </ListItem>
                            <ListItem fontSize="sm" color="gray.300">
                              <ListIcon as={FiCheck} color={colors.accent.green} />
                              Git-powered CI/CD: deploy on every push, zero ops
                            </ListItem>
                            <ListItem fontSize="sm" color="gray.300">
                              <ListIcon as={FiCheck} color={colors.accent.green} />
                              Lifetime, VIP-level expert support & updates
                            </ListItem>
                          </List>
                          <Checkbox
                            isChecked={wantsHostingDetails}
                            onChange={(e) => setWantsHostingDetails(e.target.checked)}
                            colorScheme="green"
                            size="md"
                            width="100%"
                            sx={{
                              '.chakra-checkbox__control': {
                                borderColor: 'rgba(57, 255, 20, 0.5)',
                                _checked: {
                                  bg: colors.accent.green,
                                  borderColor: colors.accent.green,
                                }
                              }
                            }}
                          >
                            <Text color={wantsHostingDetails ? 'white' : 'gray.400'} fontSize="sm" fontWeight="600">
                              Yes! Send me the details on hosting & lifetime support
                            </Text>
                          </Checkbox>
                        </VStack>
                      </Box>
                    )}
                  </MotionBox>
                </Fade>
              )}
            </AnimatePresence>

            {/* Total Display */}
            <AnimatePresence>
              {(hours || selectedPackage) && (
                <MotionBox
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  width="100%"
                >
                  <Box
                    p={5}
                    bg={selectedPackage === 'vip' ? 'rgba(212, 175, 55, 0.05)' : 'rgba(0, 255, 255, 0.05)'}
                    borderRadius="xl"
                    border="2px solid"
                    borderColor={selectedPackage === 'vip' ? `${colors.vip.primary}44` : `${colors.brand.primary}44`}
                  >
                    <HStack justify="space-between">
                      <VStack align="start" spacing={0}>
                        {selectedPackage ? (
                          <>
                            <Text color="gray.400" fontSize="sm">
                              {servicePackages.find(p => p.id === selectedPackage)?.name} Package
                            </Text>
                            <Text color="white" fontSize="lg" fontWeight="600">
                              Total Investment
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text color="gray.400" fontSize="sm">
                              {hours} hours × ${hourlyRate}/hour
                            </Text>
                            <Text color="white" fontSize="lg" fontWeight="600">
                              Total Investment
                            </Text>
                          </>
                        )}
                      </VStack>
                      <VStack align="end" spacing={0}>
                        <Text 
                          color={selectedPackage === 'vip' ? colors.vip.primary : colors.brand.primary}
                          fontSize="3xl"
                          fontWeight="800" 
                          filter={`drop-shadow(0 0 10px ${selectedPackage === 'vip' ? colors.vip.primary : colors.brand.primary}66)`}
                        >
                          ${total.toLocaleString()}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </MotionBox>
              )}
            </AnimatePresence>

            {/* Continue Button */}
            <Button
              onClick={handleSubmit}
              size="lg"
              bg={selectedPackage === 'vip' ? colors.vip.primary : colors.brand.primary}
              color={selectedPackage === 'vip' ? 'black' : 'black'}
              width="100%"
              fontWeight="700"
              fontSize="md"
              height="56px"
              isDisabled={!firstName || !projectName || (!hours && !selectedPackage)}
              borderRadius="full"
              rightIcon={<FiArrowRight />}
              _hover={{
                bg: selectedPackage === 'vip' ? colors.vip.secondary : colors.brand.primary,
                transform: 'translateY(-2px)',
                boxShadow: `0 10px 30px ${selectedPackage === 'vip' ? colors.vip.primary : colors.brand.primary}66`
              }}
              _active={{
                transform: 'translateY(0)'
              }}
              _disabled={{
                opacity: 0.5,
                cursor: 'not-allowed',
                transform: 'none',
                boxShadow: 'none'
              }}
              transition="all 0.2s"
            >
              Continue to Payment
            </Button>

            {/* Note about project details */}
            {(hours || selectedPackage) && (
              <Text color="gray.500" fontSize="xs" textAlign="center" fontStyle="italic">
                After payment, you'll receive a detailed project roadmap and timeline
              </Text>
            )}
          </MotionVStack>
        </Box>
      </VStack>
    </MotionBox>
  );
};

export default ProjectDetailsForm;