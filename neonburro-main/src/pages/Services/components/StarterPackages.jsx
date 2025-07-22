import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Grid, 
  Button, 
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
  Divider,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
  Tooltip,
  keyframes
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FiCheck, 
  FiZap, 
  FiTrendingUp, 
  FiStar, 
  FiClock,
  FiCalendar,
  FiCode,
  FiUsers,
  FiHeadphones,
  FiShield,
  FiGlobe,
  FiRefreshCw,
  FiAward,
  FiHeart
} from 'react-icons/fi';
import { RiSparklingLine, RiFireLine, RiStarLine, RiVipCrownLine } from 'react-icons/ri';

const MotionBox = motion(Box);

// Pulse animation for VIP
const pulse = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;

// Shimmer effect
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const StarterPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const packages = [
    {
      id: 'spark',
      name: 'Spark',
      icon: RiSparklingLine,
      color: '#00E5E5',
      glow: 'cyan',
      price: '$499',
      monthlyFee: '$49/mo',
      hours: '5 hours/week',
      timeline: '2-3 months',
      description: 'Perfect for getting your first professional website launched',
      shortFeatures: [
        '5 dedicated hours per week',
        'Custom design & development',
        'Mobile-responsive site',
        'Basic SEO setup',
        'Content management system',
        'Launch support'
      ],
      ideal: 'Startups & small businesses',
      cta: 'Start with Spark',
      detailedInfo: {
        overview: 'The Spark package is designed for businesses ready to establish their online presence with a professional, custom-built website. Perfect for startups and small businesses who need a solid foundation.',
        weeklyBreakdown: [
          'Week 1-2: Discovery & Design',
          'Week 3-6: Development & Iteration',
          'Week 7-8: Testing & Optimization',
          'Week 9-12: Launch & Support'
        ],
        deliverables: [
          'Fully custom website design',
          'Responsive development (mobile/tablet/desktop)',
          'Content Management System (CMS)',
          'Basic SEO optimization',
          'Google Analytics integration',
          'Contact forms & email setup',
          'Social media integration',
          'SSL certificate & security',
          'Basic performance optimization',
          'Launch training & documentation'
        ],
        support: [
          '30-day post-launch support',
          'Weekly progress updates',
          'Direct developer communication',
          'Bug fixes & minor adjustments',
          'Basic maintenance guidance'
        ],
        process: [
          { phase: 'Mind Meld', description: 'We dive into your brain (painlessly) to understand your vision' },
          { phase: 'Design Magic', description: 'Our designers work their sorcery to create something beautiful' },
          { phase: 'Code Wizardry', description: 'We speak to computers in their native tongue' },
          { phase: 'Launch Party', description: 'Your site goes live and we celebrate with virtual confetti' }
        ]
      }
    },
    {
      id: 'ignite',
      name: 'Ignite',
      icon: RiFireLine,
      color: '#FF6B00',
      glow: 'warm',
      price: '$999',
      monthlyFee: '$49/mo',
      hours: '10 hours/week',
      timeline: '2-3 months',
      description: 'Everything in Spark plus advanced features to accelerate growth',
      shortFeatures: [
        '10 dedicated hours per week',
        'Everything in Spark package',
        'Advanced animations & interactions',
        'E-commerce capabilities',
        'Multi-page architecture',
        'Performance optimization',
        'Advanced SEO & analytics'
      ],
      ideal: 'Growing businesses',
      popular: true,
      cta: 'Ignite Growth',
      detailedInfo: {
        overview: 'The Ignite package accelerates your digital presence with advanced features, e-commerce capabilities, and sophisticated design elements that set you apart from competitors.',
        weeklyBreakdown: [
          'Week 1-2: Strategic Planning & Architecture',
          'Week 3-4: Advanced Design Systems',
          'Week 5-8: Development & Features',
          'Week 9-10: Testing & Optimization',
          'Week 11-12: Launch & Training'
        ],
        deliverables: [
          'Everything from Spark package',
          'Advanced custom animations',
          'E-commerce integration (if needed)',
          'Multi-language support ready',
          'Advanced SEO with schema markup',
          'Custom API integrations',
          'Email marketing integration',
          'Advanced analytics & tracking',
          'A/B testing setup',
          'Progressive Web App features',
          'Advanced security measures',
          'Automated backup systems'
        ],
        support: [
          '60-day post-launch support',
          'Bi-weekly strategy calls',
          'Priority bug fixes',
          'Performance monitoring',
          'Monthly optimization reports',
          'Content update training'
        ],
        process: [
          { phase: 'Strategy Summit', description: 'We put on our thinking caps and plot world domination' },
          { phase: 'Design Alchemy', description: 'Turning your ideas into pixel-perfect gold' },
          { phase: 'Feature Factory', description: 'Building all the bells and whistles (and making them whistle)' },
          { phase: 'Performance Tuning', description: 'Making your site faster than a caffeinated cheetah' },
          { phase: 'Grand Opening', description: 'Red carpet rollout for your digital masterpiece' }
        ]
      }
    },
    {
      id: 'burro',
      name: 'Burro',
      icon: RiStarLine,
      color: '#FFE500',
      glow: 'banana',
      price: '$2,499',
      monthlyFee: '$49/mo',
      hours: '20 hours/week',
      timeline: '1-2 months',
      description: 'The complete digital transformation package with priority support',
      shortFeatures: [
        '20 dedicated hours per week',
        'Everything in Ignite package',
        'Custom web applications',
        'Enterprise integrations',
        'Dedicated project manager',
        'Weekly strategy sessions',
        'Priority development queue'
      ],
      ideal: 'Ambitious brands',
      cta: 'Go Full Burro',
      detailedInfo: {
        overview: 'The Burro package delivers a complete digital transformation with dedicated resources, custom functionality, and white-glove service for brands ready to dominate their market.',
        weeklyBreakdown: [
          'Week 1: Intensive Discovery & Planning',
          'Week 2-3: Rapid Prototyping',
          'Week 4-6: Full Development Sprint',
          'Week 7: Testing & Refinement',
          'Week 8: Launch & Optimization'
        ],
        deliverables: [
          'Everything from Ignite package',
          'Custom web application features',
          'Enterprise CRM integration',
          'Advanced database architecture',
          'Custom admin dashboards',
          'API development & documentation',
          'Automated workflow systems',
          'Advanced user authentication',
          'Real-time features (chat, notifications)',
          'Custom reporting systems',
          'Mobile app considerations',
          'Scalability planning'
        ],
        support: [
          '90-day premium support',
          'Weekly strategy sessions',
          'Dedicated project manager',
          'Same-day emergency fixes',
          'Quarterly business reviews',
          'Ongoing optimization',
          'Priority feature requests'
        ],
        process: [
          { phase: 'Deep Dive', description: 'We become temporary members of your team (bring snacks)' },
          { phase: 'Rapid Fire', description: 'Ideas fly, prototypes appear, magic happens' },
          { phase: 'Beast Mode', description: 'Full steam ahead with all burros on deck' },
          { phase: 'Polish & Shine', description: 'Making everything sparkle like a disco ball' }
        ]
      }
    },
    {
      id: 'vip',
      name: 'VIP',
      icon: RiVipCrownLine,
      color: '#D4AF37',
      glow: 'gold',
      price: '$9,999',
      monthlyFee: '$99/mo',
      hours: '40 hours/week',
      timeline: 'Ongoing',
      description: 'Exclusive partnership with dedicated team and unlimited possibilities',
      shortFeatures: [
        '40 dedicated hours per week',
        'Entire team at your disposal',
        'Unlimited revisions & features',
        'Direct founder access',
        'Weekly executive meetings',
        'White-label solutions',
        'First priority on everything'
      ],
      ideal: 'Enterprise & VIP clients',
      vip: true,
      cta: 'Join VIP Circle',
      detailedInfo: {
        overview: 'VIP is not just a package—it\'s a partnership. Your success becomes our obsession, with our entire team dedicated to transforming your digital presence into a market-dominating force.',
        weeklyBreakdown: [
          'Monday: Executive Strategy Session',
          'Tuesday-Thursday: Dedicated Development',
          'Friday: Progress Review & Planning',
          'On-Demand: Emergency Support 24/7'
        ],
        deliverables: [
          'Everything from all packages',
          'Dedicated development team',
          'Custom enterprise solutions',
          'White-label products',
          'Unlimited websites/applications',
          'Priority access to new technologies',
          'Custom AI/ML integrations',
          'Blockchain capabilities (if needed)',
          'Global CDN deployment',
          'Advanced security & compliance',
          'Custom mobile applications',
          'IoT integrations',
          'Anything else you can imagine'
        ],
        support: [
          'Lifetime VIP support status',
          'Direct founder hotline',
          'Daily check-ins available',
          '24/7 emergency support',
          'Dedicated Slack channel',
          'Monthly executive reviews',
          'Annual strategy retreats',
          'First access to innovations'
        ],
        perks: [
          'Annual team dinner with founders',
          'Exclusive Neon Burro VIP swag',
          'Priority at all company events',
          'Custom birthday/holiday gifts',
          'Access to partner network',
          'Speaking opportunities',
          'Co-marketing initiatives',
          'Equity discussion possibilities'
        ],
        process: [
          { phase: 'Royal Welcome', description: 'Red carpet treatment and champagne (virtually)' },
          { phase: 'Dream Team Assembly', description: 'Your personal digital avengers assemble' },
          { phase: 'Innovation Lab', description: 'Where impossible becomes "hold my coffee"' },
          { phase: 'Continuous Evolution', description: 'Your success is our never-ending mission' }
        ]
      }
    }
  ];

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    onOpen();
  };

  return (
    <Box 
      id="packages"
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg="#0A0A0A"
      overflow="hidden"
    >
      {/* Background gradients */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
        pointerEvents="none"
      >
        <Box
          position="absolute"
          top="10%"
          left="20%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="#00E5E5"
          filter="blur(150px)"
          opacity={0.5}
        />
        <Box
          position="absolute"
          bottom="10%"
          right="20%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="#FFE500"
          filter="blur(150px)"
          opacity={0.4}
        />
      </Box>

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 12, md: 16 }}>
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <HStack
                spacing={2}
                px={4}
                py={2}
                borderRadius="full"
                fontSize="xs"
                fontWeight="medium"
                letterSpacing="wider"
                color="#00E5E5"
              >
                <FiZap size={14} />
                <Text>ONE-TIME INVESTMENT</Text>
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
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="800"
                color="white"
                lineHeight="1.1"
                letterSpacing="-0.02em"
              >
                Choose Your{' '}
                <Box
                  as="span"
                  bgGradient="linear(to-r, #00E5E5, #FFE500)"
                  bgClip="text"
                >
                  Development Speed
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
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                color="gray.300"
                maxW="600px"
                mx="auto"
                lineHeight="1.7"
              >
                One-time project investment with dedicated weekly hours. All packages include mandatory monthly hosting & maintenance.
              </Text>
            </MotionBox>
          </VStack>

          {/* Packages Grid */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
          >
            {packages.map((pkg, index) => (
              <MotionBox
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                position="relative"
                whileHover={{ y: -8 }}
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <Box
                    position="absolute"
                    top="-12px"
                    left="50%"
                    transform="translateX(-50%)"
                    zIndex={2}
                  >
                    <HStack
                      spacing={1}
                      px={3}
                      py={1}
                      borderRadius="full"
                      bg="#FF6B00"
                      boxShadow="0 0 20px rgba(255, 107, 0, 0.4)"
                    >
                      <FiStar size={12} />
                      <Text
                        color="#0A0A0A"
                        fontSize="xs"
                        fontWeight="bold"
                        letterSpacing="wider"
                      >
                        MOST POPULAR
                      </Text>
                    </HStack>
                  </Box>
                )}

                {/* VIP Glow Effect */}
                {pkg.vip && (
                  <Box
                    position="absolute"
                    inset="-2px"
                    borderRadius="xl"
                    bg={`linear-gradient(45deg, ${pkg.color}, #B87333, ${pkg.color})`}
                    backgroundSize="300% 300%"
                    animation={`${shimmer} 3s linear infinite`}
                    opacity={0.5}
                    zIndex={0}
                  />
                )}
                
                <Box
                  p={{ base: 6, md: 8 }}
                  borderRadius="xl"
                  bg={pkg.vip ? 'rgba(212, 175, 55, 0.05)' : 'rgba(255, 255, 255, 0.02)'}
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor={pkg.popular ? pkg.color : pkg.vip ? pkg.color : 'rgba(255, 255, 255, 0.08)'}
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  cursor="pointer"
                  onClick={() => handlePackageClick(pkg)}
                  _hover={{
                    borderColor: pkg.color,
                    bg: pkg.vip ? 'rgba(212, 175, 55, 0.08)' : 'rgba(255, 255, 255, 0.04)',
                    boxShadow: `0 20px 40px ${pkg.color}22`
                  }}
                >
                  {/* VIP Pulse Background */}
                  {pkg.vip && (
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      width="300px"
                      height="300px"
                      borderRadius="full"
                      bg={`radial-gradient(circle, ${pkg.color}22 0%, transparent 70%)`}
                      animation={`${pulse} 3s ease-in-out infinite`}
                      pointerEvents="none"
                    />
                  )}

                  <VStack align="stretch" spacing={6} position="relative">
                    {/* Icon and Name */}
                    <VStack spacing={3} align="center" textAlign="center">
                      <Box
                        p={3}
                        borderRadius="lg"
                        bg={`${pkg.color}11`}
                        color={pkg.color}
                        transition="all 0.3s"
                        _groupHover={{
                          transform: 'scale(1.1) rotate(5deg)',
                          bg: `${pkg.color}22`
                        }}
                      >
                        <pkg.icon size={32} />
                      </Box>
                      <Box>
                        <Heading
                          as="h3"
                          fontSize={{ base: "2xl", md: "3xl" }}
                          color="white"
                          fontWeight="800"
                          mb={1}
                        >
                          {pkg.name}
                        </Heading>
                        <HStack spacing={2} justify="center">
                          <Badge
                            bg={`${pkg.color}22`}
                            color={pkg.color}
                            px={2}
                            py={0.5}
                            borderRadius="full"
                            fontSize="xs"
                            fontWeight="bold"
                          >
                            {pkg.hours}
                          </Badge>
                          <Text
                            fontSize="xs"
                            color="gray.500"
                            textTransform="uppercase"
                            letterSpacing="wider"
                          >
                            {pkg.timeline}
                          </Text>
                        </HStack>
                      </Box>
                    </VStack>

                    {/* Price */}
                    <Box textAlign="center">
                      <Text
                        fontSize={{ base: "3xl", md: "4xl" }}
                        fontWeight="800"
                        color={pkg.color}
                        lineHeight="1"
                      >
                        {pkg.price}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="gray.500"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        mt={1}
                      >
                        {pkg.ideal}
                      </Text>
                      {/* Monthly Hosting Badge */}
                      <Badge
                        mt={3}
                        bg={pkg.vip ? 'rgba(212, 175, 55, 0.15)' : 'rgba(57, 255, 20, 0.15)'}
                        color={pkg.vip ? '#D4AF37' : '#39FF14'}
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="bold"
                        border="1px solid"
                        borderColor={pkg.vip ? 'rgba(212, 175, 55, 0.3)' : 'rgba(57, 255, 20, 0.3)'}
                      >
                        {pkg.monthlyFee} hosting & updates
                      </Badge>
                    </Box>

                    {/* Description */}
                    <Text
                      color="gray.400"
                      fontSize={{ base: "sm", md: "md" }}
                      textAlign="center"
                      lineHeight="1.6"
                    >
                      {pkg.description}
                    </Text>

                    {/* Quick Features Preview */}
                    <VStack align="start" spacing={2} fontSize="sm">
                      {pkg.shortFeatures.slice(0, 3).map((feature, idx) => (
                        <HStack key={idx} spacing={2}>
                          <Box color={pkg.color} flexShrink={0}>
                            <FiCheck size={16} strokeWidth={3} />
                          </Box>
                          <Text color="gray.300" fontSize="xs">
                            {feature}
                          </Text>
                        </HStack>
                      ))}
                      <Text
                        color={pkg.color}
                        fontSize="xs"
                        fontWeight="600"
                        cursor="pointer"
                        _hover={{ textDecoration: 'underline' }}
                      >
                        + {pkg.shortFeatures.length - 3} more features →
                      </Text>
                    </VStack>

                    {/* CTA */}
                    <Button
                      size="lg"
                      width="100%"
                      bg={pkg.vip ? pkg.color : 'transparent'}
                      color={pkg.vip ? '#0A0A0A' : pkg.color}
                      border="2px solid"
                      borderColor={pkg.color}
                      borderRadius="full"
                      fontWeight="700"
                      fontSize="sm"
                      letterSpacing="wider"
                      _hover={{
                        bg: pkg.color,
                        color: '#0A0A0A',
                        transform: 'translateY(-2px)',
                        boxShadow: `0 10px 30px ${pkg.color}44`
                      }}
                      transition="all 0.3s"
                    >
                      View Details
                    </Button>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Note */}
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            textAlign="center"
          >
            <VStack spacing={3}>
              <HStack spacing={3} wrap="wrap" justify="center">
                <HStack>
                  <FiShield size={14} color="#39FF14" />
                  <Text color="gray.400" fontSize="sm">
                    Monthly hosting & updates required
                  </Text>
                </HStack>
                <Box w={1} h={1} borderRadius="full" bg="gray.600" />
                <HStack>
                  <FiRefreshCw size={14} color="#39FF14" />
                  <Text color="gray.400" fontSize="sm">
                    Bug fixes & security included
                  </Text>
                </HStack>
              </HStack>
              <Text color="gray.500" fontSize="xs" fontStyle="italic">
                Hosting keeps your site fast, secure, and always updated
              </Text>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>

      {/* Package Details Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size="4xl"
        scrollBehavior="inside"
      >
        <ModalOverlay bg="rgba(0,0,0,0.8)" backdropFilter="blur(10px)" />
        <ModalContent
          bg="#0A0A0A"
          border="1px solid"
          borderColor={selectedPackage?.color || 'whiteAlpha.200'}
          borderRadius="xl"
          overflow="hidden"
          my={{ base: 0, md: 10 }}
          maxH={{ base: "100vh", md: "90vh" }}
        >
          {selectedPackage && (
            <>
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                height="200px"
                bgGradient={`linear(to-b, ${selectedPackage.color}22, transparent)`}
                opacity={0.5}
                pointerEvents="none"
              />
              
              <ModalHeader pt={8} position="relative">
                <VStack align="center" spacing={4}>
                  <Box
                    p={4}
                    borderRadius="xl"
                    bg={`${selectedPackage.color}11`}
                    color={selectedPackage.color}
                  >
                    <selectedPackage.icon size={40} />
                  </Box>
                  <VStack spacing={2} textAlign="center">
                    <Heading size="xl" color="white">
                      {selectedPackage.name} Package
                    </Heading>
                    <HStack spacing={3}>
                      <Badge
                        bg={`${selectedPackage.color}22`}
                        color={selectedPackage.color}
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="sm"
                        fontWeight="bold"
                      >
                        {selectedPackage.hours}
                      </Badge>
                      <Text color="gray.400" fontSize="sm">
                        {selectedPackage.timeline}
                      </Text>
                      <Text
                        fontSize="2xl"
                        fontWeight="800"
                        color={selectedPackage.color}
                      >
                        {selectedPackage.price}
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>
              </ModalHeader>
              
              <ModalCloseButton color="white" />
              
              <ModalBody pb={8}>
                <VStack spacing={6} align="stretch">
                  {/* Overview */}
                  <Box
                    p={6}
                    bg="rgba(255,255,255,0.02)"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="whiteAlpha.100"
                  >
                    <Text color="gray.300" lineHeight="1.8">
                      {selectedPackage.detailedInfo.overview}
                    </Text>
                  </Box>

                  {/* Tabs for detailed information */}
                  <Tabs colorScheme="cyan" variant="soft-rounded">
                    <TabList flexWrap="wrap">
                      <Tab>Deliverables</Tab>
                      <Tab>Process</Tab>
                      <Tab>Support</Tab>
                      {selectedPackage.id === 'vip' && <Tab>VIP Perks</Tab>}
                    </TabList>

                    <TabPanels>
                      {/* Deliverables Tab */}
                      <TabPanel>
                        <VStack align="stretch" spacing={4}>
                          <Heading size="md" color="white" mb={2}>
                            What's Included
                          </Heading>
                          <List spacing={3}>
                            {selectedPackage.detailedInfo.deliverables.map((item, idx) => (
                              <ListItem key={idx} display="flex" alignItems="start">
                                <ListIcon 
                                  as={FiCheck} 
                                  color={selectedPackage.color}
                                  mt={1}
                                  flexShrink={0}
                                />
                                <Text color="gray.300" fontSize="sm">
                                  {item}
                                </Text>
                              </ListItem>
                            ))}
                          </List>
                        </VStack>
                      </TabPanel>

                      {/* Process Tab */}
                      <TabPanel>
                        <VStack align="stretch" spacing={4}>
                          <Heading size="md" color="white" mb={2}>
                            How We Roll
                          </Heading>
                          
                          {/* Simple Process Steps */}
                          <VStack align="stretch" spacing={4}>
                            {selectedPackage.detailedInfo.process.map((phase, idx) => (
                              <Box
                                key={idx}
                                p={4}
                                bg="rgba(255,255,255,0.02)"
                                borderRadius="lg"
                                border="1px solid"
                                borderColor="whiteAlpha.100"
                                position="relative"
                                overflow="hidden"
                              >
                                <Box
                                  position="absolute"
                                  top={0}
                                  left={0}
                                  width={`${((idx + 1) / selectedPackage.detailedInfo.process.length) * 100}%`}
                                  height="2px"
                                  bg={selectedPackage.color}
                                />
                                <VStack align="start" spacing={2}>
                                  <Text color={selectedPackage.color} fontWeight="700" fontSize="lg">
                                    {idx + 1}. {phase.phase}
                                  </Text>
                                  <Text color="gray.400" fontSize="sm">
                                    {phase.description}
                                  </Text>
                                </VStack>
                              </Box>
                            ))}
                          </VStack>
                        </VStack>
                      </TabPanel>

                      {/* Support Tab */}
                      <TabPanel>
                        <VStack align="stretch" spacing={4}>
                          <Heading size="md" color="white" mb={2}>
                            Support & Maintenance
                          </Heading>
                          <List spacing={3}>
                            {selectedPackage.detailedInfo.support.map((item, idx) => (
                              <ListItem key={idx} display="flex" alignItems="start">
                                <ListIcon 
                                  as={FiHeadphones} 
                                  color={selectedPackage.color}
                                  mt={1}
                                  flexShrink={0}
                                />
                                <Text color="gray.300" fontSize="sm">
                                  {item}
                                </Text>
                              </ListItem>
                            ))}
                          </List>
                        </VStack>
                      </TabPanel>

                      {/* VIP Perks Tab */}
                      {selectedPackage.id === 'vip' && (
                        <TabPanel>
                          <VStack align="stretch" spacing={4}>
                            <Heading size="md" color="white" mb={2}>
                              Exclusive VIP Benefits
                            </Heading>
                            <List spacing={3}>
                              {selectedPackage.detailedInfo.perks.map((perk, idx) => (
                                <ListItem key={idx} display="flex" alignItems="start">
                                  <ListIcon 
                                    as={RiVipCrownLine} 
                                    color={selectedPackage.color}
                                    mt={1}
                                    flexShrink={0}
                                  />
                                  <Text color="gray.300" fontSize="sm">
                                    {perk}
                                  </Text>
                                </ListItem>
                              ))}
                            </List>
                          </VStack>
                        </TabPanel>
                      )}
                    </TabPanels>
                  </Tabs>

                  {/* CTA Buttons */}
                  <HStack spacing={4} pt={4} flexDirection={{ base: "column", sm: "row" }}>
                    <Button
                      flex={1}
                      size={{ base: "md", sm: "lg" }}
                      bg={selectedPackage.color}
                      color="#0A0A0A"
                      borderRadius="full"
                      fontWeight="700"
                      fontSize={{ base: "sm", sm: "md" }}
                      px={{ base: 4, sm: 6 }}
                      onClick={() => window.location.href = '/contact/'}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: `0 10px 30px ${selectedPackage.color}66`
                      }}
                      width={{ base: "100%", sm: "auto" }}
                    >
                      {selectedPackage.cta}
                    </Button>
                    <Button
                      flex={1}
                      size={{ base: "md", sm: "lg" }}
                      variant="outline"
                      borderColor={selectedPackage.color}
                      color={selectedPackage.color}
                      borderRadius="full"
                      fontWeight="700"
                      fontSize={{ base: "sm", sm: "md" }}
                      px={{ base: 4, sm: 6 }}
                      onClick={() => window.location.href = '/contact/'}
                      _hover={{
                        bg: `${selectedPackage.color}11`,
                        transform: 'translateY(-2px)'
                      }}
                      width={{ base: "100%", sm: "auto" }}
                    >
                      Schedule Call
                    </Button>
                  </HStack>
                </VStack>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default StarterPackages;