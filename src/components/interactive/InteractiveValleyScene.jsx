import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Text, 
  VStack, 
  HStack, 
  useToast, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Image,
  Heading,
  useBreakpointValue,
  IconButton
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Howl } from 'howler';
import { FiHome, FiMapPin } from 'react-icons/fi';
import { GiMountainRoad } from 'react-icons/gi';
import colors from '../../theme/colors';

const MotionBox = motion(Box);

const InteractiveValleyScene = () => {
  const [hoveredArea, setHoveredArea] = useState(null);
  const [currentScene, setCurrentScene] = useState('valley');
  const [mobileSelectedArea, setMobileSelectedArea] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState(null);
  
  // Responsive values
  const isMobile = useBreakpointValue({ base: true, md: false });
  const tooltipTop = useBreakpointValue({ base: '-100px', md: '-140px' });
  const neonSignSize = useBreakpointValue({ base: '60px', md: '120px' });
  const titleSize = useBreakpointValue({ base: '2xl', md: '4xl' });
  const taglineSize = useBreakpointValue({ base: 'sm', md: 'xl' });

  // Sound effects (we'll add these files later)
  const sounds = useRef({
    hover: new Howl({ 
      src: ['/sounds/hover.mp3'], 
      volume: 0.3,
      html5: true 
    }),
    click: new Howl({ 
      src: ['/sounds/click.mp3'], 
      volume: 0.5,
      html5: true 
    }),
    ambient: new Howl({ 
      src: ['/sounds/mountain-ambient.mp3'], 
      loop: true, 
      volume: 0.2,
      html5: true 
    })
  });

  // Define vibrant neon colors for titles
  const neonColors = {
    stackhouse: colors.brand.primary, // teal
    saloon: '#FF6B00', // fiery orange
    devzen: colors.accent.neon, // lime green
    river: colors.accent.banana, // banana yellow
    valley: '#00B8E6', // baby blue
    home: colors.accent.purple // bright purple
  };

  // Interactive hotspots for the scenes - FULL VERSION
  const interactiveAreas = {
    valley: [
      {
        id: 'stackhouse-tower',
        name: 'The Stackhouse',
        label: 'Enter The Stackhouse',
        description: 'Fueling Big Projects And Bigger Appetites',
        scene: 'stackhouse',
        position: { top: '45%', left: '50%' },
        size: { width: '150px', height: '200px' },
        mobilePosition: { top: '45%', left: '50%' },
        mobileSize: { width: '120px', height: '160px' },
        neonSign: '/images/neon-signs/stackhouse-sign.png',
        color: colors.brand.primary,
        glow: colors.effects.glow.cyan
      },
      {
        id: 'saloon-building',
        name: 'Digital Saloon',
        label: 'Enter the Saloon',
        description: 'Lounge Vibes. Launch Energy.',
        scene: 'saloon',
        position: { top: '50%', left: '20%' },
        size: { width: '140px', height: '120px' },
        mobilePosition: { top: '50%', left: '20%' },
        mobileSize: { width: '100px', height: '100px' },
        neonSign: '/images/neon-signs/digital-saloon-sign.png',
        color: colors.accent.warm,
        glow: colors.effects.glow.warm
      },
      {
        id: 'geodome-1',
        name: 'Dev Zen Spa',
        label: 'Enter Dev Zen',
        description: 'Where Warm Waters Spark Clear Thinking',
        scene: 'devzen',
        position: { top: '55%', left: '80%' },
        size: { width: '120px', height: '100px' },
        mobilePosition: { top: '55%', left: '80%' },
        mobileSize: { width: '90px', height: '80px' },
        neonSign: '/images/neon-signs/dev-zen-sign.png',
        color: colors.accent.neon,
        glow: colors.effects.glow.neon
      },
      {
        id: 'lazy-river',
        name: 'The Flow Loop',
        label: 'View the River',
        description: 'Where Clarity Circulates',
        scene: 'river',
        position: { top: '70%', left: '40%' },
        size: { width: '200px', height: '80px' },
        mobilePosition: { top: '70%', left: '40%' },
        mobileSize: { width: '150px', height: '60px' },
        neonSign: '/images/neon-signs/lazy-river-sign.png',
        color: colors.accent.banana,
        glow: colors.effects.glow.banana
      },
      {
        id: 'member-dome',
        name: 'The Neon Pod',
        label: 'Go Home',
        description: 'Status-Based Living In A Dome Built For Visionaries',
        scene: 'neonpod',
        position: { top: '65%', left: '85%' },
        size: { width: '90px', height: '80px' },
        mobilePosition: { top: '65%', left: '85%' },
        mobileSize: { width: '80px', height: '70px' },
        neonSign: '/images/neon-signs/neonburro-logo.png',
        color: colors.accent.purple,
        glow: colors.effects.glow.warm
      }
    ],
    stackhouse: [
      {
        id: 'qr-checkin',
        name: 'QR Check-In Booth',
        label: 'Check In',
        description: 'Secure entry with your unique digital ID',
        action: 'qrCheckIn',
        position: { top: '80%', left: '50%' },
        size: { width: '80px', height: '80px' },
        mobilePosition: { top: '80%', left: '50%' },
        mobileSize: { width: '60px', height: '60px' },
        neonSign: '/images/neon-signs/qr-checkin.png',
        color: colors.brand.primary,
        glow: colors.effects.glow.cyan
      },
      {
        id: 'workspace-reserve',
        name: 'Reserve a Workspace',
        label: 'Book Desk',
        description: 'Desks, pods, and private rooms, all bookable',
        path: '/services',
        position: { top: '40%', left: '30%' },
        size: { width: '100px', height: '80px' },
        mobilePosition: { top: '40%', left: '30%' },
        mobileSize: { width: '80px', height: '60px' },
        neonSign: '/images/neon-signs/workspace-reserve.png',
        color: colors.accent.neon,
        glow: colors.effects.glow.neon
      },
      {
        id: 'weekly-menu',
        name: 'Weekly Menu Portal',
        label: 'Order Food',
        description: 'Order food, tip your chef, or charge it to your tab',
        action: 'openMenu',
        position: { top: '55%', left: '45%' },
        size: { width: '120px', height: '100px' },
        mobilePosition: { top: '55%', left: '45%' },
        mobileSize: { width: '100px', height: '80px' },
        neonSign: '/images/neon-signs/weekly-menu.png',
        color: colors.accent.warm,
        glow: colors.effects.glow.warm
      },
      {
        id: 'project-board',
        name: 'Project Idea Board',
        label: 'View Projects',
        description: 'Discover, join, or post live dev projects',
        action: 'projectBoard',
        position: { top: '35%', left: '70%' },
        size: { width: '100px', height: '120px' },
        mobilePosition: { top: '35%', left: '70%' },
        mobileSize: { width: '80px', height: '100px' },
        neonSign: '/images/neon-signs/project-board.png',
        color: colors.accent.banana,
        glow: colors.effects.glow.banana
      },
      {
        id: 'meeting-lounge',
        name: 'Meeting Lounge Access',
        label: 'Book Room',
        description: 'Book spaces for syncs, pitches, or brainstorms',
        action: 'bookMeeting',
        position: { top: '60%', left: '70%' },
        size: { width: '90px', height: '90px' },
        mobilePosition: { top: '60%', left: '70%' },
        mobileSize: { width: '70px', height: '70px' },
        neonSign: '/images/neon-signs/meeting-lounge.png',
        color: colors.accent.purple,
        glow: colors.effects.glow.warm
      }
    ],
    saloon: [
      {
        id: 'burro-bartender',
        name: 'Burro Bartender Tab',
        label: 'Pay Tab',
        description: 'Click to pay your bill or buy a round',
        action: 'payTab',
        position: { top: '50%', left: '50%' },
        size: { width: '120px', height: '120px' },
        mobilePosition: { top: '50%', left: '50%' },
        mobileSize: { width: '100px', height: '100px' },
        neonSign: '/images/neon-signs/burro-bartender.png',
        color: colors.accent.warm,
        glow: colors.effects.glow.warm
      },
      {
        id: 'event-calendar',
        name: 'Event Calendar',
        label: 'Tonight\'s Events',
        description: 'Live music, night talks, and creative gatherings',
        action: 'viewEvents',
        position: { top: '30%', left: '70%' },
        size: { width: '100px', height: '100px' },
        mobilePosition: { top: '30%', left: '70%' },
        mobileSize: { width: '80px', height: '80px' },
        neonSign: '/images/neon-signs/event-calendar.png',
        color: colors.accent.neon,
        glow: colors.effects.glow.neon
      },
      {
        id: 'cocktail-services',
        name: 'Cocktail Menu = Services',
        label: 'Book Services',
        description: 'Book branding, dev sprints, or UX reviews via stylized drinks',
        path: '/services',
        position: { top: '45%', left: '25%' },
        size: { width: '110px', height: '90px' },
        mobilePosition: { top: '45%', left: '25%' },
        mobileSize: { width: '90px', height: '70px' },
        neonSign: '/images/neon-signs/cocktail-services.png',
        color: colors.accent.banana,
        glow: colors.effects.glow.banana
      },
      {
        id: 'neon-navigation',
        name: 'Neon Sign Navigation',
        label: 'Explore',
        description: 'Explore spaces via glowing visual cues',
        action: 'exploreNeon',
        position: { top: '25%', left: '40%' },
        size: { width: '80px', height: '80px' },
        mobilePosition: { top: '25%', left: '40%' },
        mobileSize: { width: '60px', height: '60px' },
        neonSign: '/images/neon-signs/neon-navigation.png',
        color: colors.brand.primary,
        glow: colors.effects.glow.cyan
      },
      {
        id: 'late-night-eats',
        name: 'Late Night Eats',
        label: 'Order Snacks',
        description: 'Order snacks straight to your dome, fire pit, or pod',
        action: 'orderFood',
        position: { top: '65%', left: '75%' },
        size: { width: '90px', height: '80px' },
        mobilePosition: { top: '65%', left: '75%' },
        mobileSize: { width: '70px', height: '60px' },
        neonSign: '/images/neon-signs/late-night-eats.png',
        color: colors.accent.purple,
        glow: colors.effects.glow.warm
      }
    ],
    devzen: [
      {
        id: 'sign-out-float',
        name: 'Sign Out a Float',
        label: 'Get Float',
        description: 'Choose your ride and enter the stream of ideas',
        action: 'rentFloat',
        position: { top: '60%', left: '30%' },
        size: { width: '100px', height: '100px' },
        mobilePosition: { top: '60%', left: '30%' },
        mobileSize: { width: '80px', height: '80px' },
        neonSign: '/images/neon-signs/sign-out-float.png',
        color: colors.accent.banana,
        glow: colors.effects.glow.banana
      },
      {
        id: 'towel-concierge',
        name: 'Towel & Robe Concierge',
        label: 'Request Service',
        description: 'Request delivery to your pod or spring edge',
        action: 'requestTowel',
        position: { top: '70%', left: '50%' },
        size: { width: '90px', height: '90px' },
        mobilePosition: { top: '70%', left: '50%' },
        mobileSize: { width: '70px', height: '70px' },
        neonSign: '/images/neon-signs/towel-concierge.png',
        color: colors.brand.primary,
        glow: colors.effects.glow.cyan
      },
      {
        id: 'glass-dome-reserve',
        name: 'Glass Dome Reservations',
        label: 'Book Dome',
        description: 'Book a serene, steamy brainstorm suite',
        action: 'reserveDome',
        position: { top: '25%', left: '40%' },
        size: { width: '120px', height: '120px' },
        mobilePosition: { top: '25%', left: '40%' },
        mobileSize: { width: '100px', height: '100px' },
        neonSign: '/images/neon-signs/glass-dome-reserve.png',
        color: colors.accent.neon,
        glow: colors.effects.glow.neon
      },
      {
        id: 'massage-scheduler',
        name: 'Massage Scheduler',
        label: 'Book Massage',
        description: 'Book human or AI-assisted bodywork',
        action: 'bookMassage',
        position: { top: '45%', left: '65%' },
        size: { width: '100px', height: '90px' },
        mobilePosition: { top: '45%', left: '65%' },
        mobileSize: { width: '80px', height: '70px' },
        neonSign: '/images/neon-signs/massage-scheduler.png',
        color: colors.accent.warm,
        glow: colors.effects.glow.warm
      },
      {
        id: 'tip-lifeguard',
        name: 'Tip the Lifeguard',
        label: 'Show Gratitude',
        description: 'Show gratitude with a glowing gesture',
        action: 'tipStaff',
        position: { top: '80%', left: '70%' },
        size: { width: '80px', height: '80px' },
        mobilePosition: { top: '80%', left: '70%' },
        mobileSize: { width: '60px', height: '60px' },
        neonSign: '/images/neon-signs/tip-lifeguard.png',
        color: colors.accent.purple,
        glow: colors.effects.glow.warm
      }
    ],
    river: [
      {
        id: 'brainstorm-loungers',
        name: 'Floating Brainstorm Loungers',
        label: 'Get Lounger',
        description: 'Recline, record voice notes, or sketch while you float',
        action: 'getLounger',
        position: { top: '40%', left: '30%' },
        size: { width: '120px', height: '100px' },
        mobilePosition: { top: '40%', left: '30%' },
        mobileSize: { width: '100px', height: '80px' },
        neonSign: '/images/neon-signs/brainstorm-loungers.png',
        color: colors.accent.banana,
        glow: colors.effects.glow.banana
      },
      {
        id: 'ambient-zones',
        name: 'Ambient Sound Zones',
        label: 'Adjust Vibe',
        description: 'Soft music, birdsong, binaural beats—adjust your section\'s vibe',
        action: 'changeAmbient',
        position: { top: '50%', left: '50%' },
        size: { width: '100px', height: '100px' },
        mobilePosition: { top: '50%', left: '50%' },
        mobileSize: { width: '80px', height: '80px' },
        neonSign: '/images/neon-signs/ambient-zones.png',
        color: colors.brand.primary,
        glow: colors.effects.glow.cyan
      },
      {
        id: 'checkpoint-springhouse',
        name: 'Checkpoint to Springhouse',
        label: 'Exit to Spa',
        description: 'Hop off the river to the Springhouse',
        action: 'changeScene',
        targetScene: 'devzen',
        position: { top: '30%', left: '70%' },
        size: { width: '90px', height: '90px' },
        mobilePosition: { top: '30%', left: '70%' },
        mobileSize: { width: '70px', height: '70px' },
        neonSign: '/images/neon-signs/checkpoint-springhouse.png',
        color: colors.accent.neon,
        glow: colors.effects.glow.neon
      },
      {
        id: 'group-pods',
        name: 'Towable Group Pods',
        label: 'Group Float',
        description: 'Collaborate in floating groups—host a brainstorm on water',
        action: 'getGroupPod',
        position: { top: '60%', left: '65%' },
        size: { width: '110px', height: '90px' },
        mobilePosition: { top: '60%', left: '65%' },
        mobileSize: { width: '90px', height: '70px' },
        neonSign: '/images/neon-signs/group-pods.png',
        color: colors.accent.warm,
        glow: colors.effects.glow.warm
      },
      {
        id: 'waterband-access',
        name: 'Smart Waterband Access',
        label: 'Get Waterband',
        description: 'Control music, order drinks, or signal lifeguards via wristband',
        action: 'getWaterband',
        position: { top: '70%', left: '40%' },
        size: { width: '100px', height: '80px' },
        mobilePosition: { top: '70%', left: '40%' },
        mobileSize: { width: '80px', height: '60px' },
        neonSign: '/images/neon-signs/waterband-access.png',
        color: colors.accent.purple,
        glow: colors.effects.glow.warm
      }
    ],
    neonpod: [
      {
        id: 'night-sky-window',
        name: 'Night Sky Window',
        label: 'View Galaxy',
        description: 'View your projects, stats, and digital galaxy',
        action: 'viewGalaxy',
        position: { top: '20%', left: '50%' },
        size: { width: '140px', height: '100px' },
        mobilePosition: { top: '20%', left: '50%' },
        mobileSize: { width: '120px', height: '80px' },
        neonSign: '/images/neon-signs/night-sky-window.png',
        color: colors.accent.purple,
        glow: colors.effects.glow.warm
      },
      {
        id: 'workspace-dock',
        name: 'Workspace Dock',
        label: 'Access Tools',
        description: 'Access your work and productivity AI tools',
        action: 'openWorkspace',
        position: { top: '40%', left: '70%' },
        size: { width: '100px', height: '100px' },
        mobilePosition: { top: '40%', left: '70%' },
        mobileSize: { width: '80px', height: '80px' },
        neonSign: '/images/neon-signs/workspace-dock.png',
        color: colors.brand.primary,
        glow: colors.effects.glow.cyan
      },
      {
        id: 'personal-calendar',
        name: 'Personal Calendar',
        label: 'Daily Flow',
        description: 'Manage your daily flow across the retreat',
        action: 'openCalendar',
        position: { top: '45%', left: '30%' },
        size: { width: '90px', height: '90px' },
        mobilePosition: { top: '45%', left: '30%' },
        mobileSize: { width: '70px', height: '70px' },
        neonSign: '/images/neon-signs/personal-calendar.png',
        color: colors.accent.neon,
        glow: colors.effects.glow.neon
      },
      {
        id: 'logout-bed',
        name: 'Log Out Bed',
        label: 'Sleep Mode',
        description: 'Activate sleep protocol for mental restoration',
        action: 'activateSleep',
        position: { top: '65%', left: '50%' },
        size: { width: '120px', height: '80px' },
        mobilePosition: { top: '65%', left: '50%' },
        mobileSize: { width: '100px', height: '60px' },
        neonSign: '/images/neon-signs/logout-bed.png',
        color: colors.accent.warm,
        glow: colors.effects.glow.warm
      },
      {
        id: 'vision-screen',
        name: 'Vision Screen',
        label: 'Watch Content',
        description: 'Watch tutorials, sessions, or your project highlights',
        action: 'openVisionScreen',
        position: { top: '35%', left: '50%' },
        size: { width: '130px', height: '90px' },
        mobilePosition: { top: '35%', left: '50%' },
        mobileSize: { width: '110px', height: '70px' },
        neonSign: '/images/neon-signs/vision-screen.png',
        color: colors.accent.banana,
        glow: colors.effects.glow.banana
      }
    ]
  };

  const handleAreaClick = (area) => {
    // On mobile, first tap shows info, second tap navigates
    if (isMobile) {
      if (mobileSelectedArea?.id === area.id) {
        // Second tap - navigate
        proceedWithAction(area);
        setMobileSelectedArea(null);
      } else {
        // First tap - show info and center the element
        setMobileSelectedArea(area);
        
        // Better centering for mobile
        setTimeout(() => {
          const element = document.getElementById(`hotspot-${area.id}`);
          if (element) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Calculate the element's center position
            const elementCenter = scrollTop + rect.top + (rect.height / 2);
            
            // We want to position the element about 1/3 from the top of the viewport
            // This leaves room for the tooltip below
            const targetPosition = elementCenter - (window.innerHeight * 0.33);
            
            window.scrollTo({
              top: Math.max(0, targetPosition),
              behavior: 'smooth'
            });
          }
        }, 50); // Small delay to ensure DOM is updated
        
        try {
          sounds.current.hover.play();
        } catch (e) {
          console.log('Sound not loaded yet');
        }
      }
    } else {
      // Desktop - immediate action
      proceedWithAction(area);
    }
  };

  const proceedWithAction = (area) => {
    // Play click sound
    try {
      sounds.current.click.play();
    } catch (e) {
      console.log('Sound not loaded yet');
    }

    if (area.path) {
      // Navigate to a route
      navigate(area.path);
    } else if (area.action === 'changeScene' && area.targetScene) {
      // Change to a different scene
      setCurrentScene(area.targetScene);
    } else if (area.action === 'openServicesMenu') {
      // Open modal with services menu
      setModalContent({
        title: 'Neon Burro Services Menu',
        content: 'services-menu'
      });
      onOpen();
    } else if (area.scene) {
      // Load a new scene
      setCurrentScene(area.scene);
    } else if (area.action) {
      // Handle other actions with toast notifications for now
      toast({
        title: area.label,
        description: `${area.description} - Coming soon!`,
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleAreaHover = (area) => {
    setHoveredArea(area?.id || null);
    if (area) {
      try {
        sounds.current.hover.play();
      } catch (e) {
        console.log('Sound not loaded yet');
      }
    }
  };

  const handleBackToValley = () => {
    // Navigate back to valley scene
    setCurrentScene('valley');
    try {
      sounds.current.click.play();
    } catch (e) {
      console.log('Sound not loaded yet');
    }
  };

  // Scene backgrounds using your actual images
  const sceneBackgrounds = {
    valley: '/images/scenes/valley-overview.jpg',
    stackhouse: '/images/scenes/stackhouse-interior.jpg',
    saloon: '/images/scenes/digital-saloon-interior.jpg',
    devzen: '/images/scenes/dev-zen-interior.jpg',
    river: '/images/scenes/lazy-river-night.jpg',
    neonpod: '/images/scenes/neon-pod-interior.jpg'
  };

  return (
    <Box 
      position="relative" 
      w="100%" 
      h="100vh" 
      overflow="hidden"
      bg={colors.dark.black}
    >
      {/* Simple Header with Home Icon and Back to Valley */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        height="60px"
        bg="rgba(10, 10, 10, 0.8)"
        backdropFilter="blur(10px)"
        borderBottom="2px solid"
        borderColor="whiteAlpha.200"
        zIndex={20}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={6}
      >
        <HStack spacing={3}>
          {/* Home Button - Teal Neon */}
          <IconButton
            icon={<FiHome />}
            onClick={() => navigate('/')}
            size="lg"
            bg="transparent"
            color={colors.brand.primary}
            fontSize="24px"
            _hover={{
              bg: colors.brand.primary,
              color: "black",
              transform: "scale(1.1)",
              boxShadow: `0 0 30px ${colors.brand.primary}`,
            }}
            _active={{
              transform: "scale(0.95)",
            }}
            aria-label="Go to Home Page"
            sx={{
              border: "2px solid",
              borderColor: colors.brand.primary,
              borderRadius: "full",
              transition: "all 0.3s",
            }}
          />
          
          {/* Back to Valley Button - Only show on inner pages */}
          {currentScene !== 'valley' && (
            <Button
              leftIcon={<GiMountainRoad size={20} />}
              onClick={handleBackToValley}
              size="lg"
              bg="transparent"
              border="2px solid"
              borderColor={colors.accent.banana}
              color={colors.accent.banana}
              fontSize="sm"
              fontWeight="bold"
              letterSpacing="wider"
              textTransform="uppercase"
              px={4}
              _hover={{
                bg: colors.accent.banana,
                color: "black",
                transform: "scale(1.05)",
                boxShadow: `0 0 30px ${colors.accent.banana}`,
              }}
              _active={{
                transform: "scale(0.95)",
              }}
              sx={{
                textShadow: `0 0 20px ${colors.accent.banana}`,
                transition: "all 0.3s",
              }}
            >
              Back to Valley
            </Button>
          )}
        </HStack>
      </Box>

      {/* Background Image */}
      <Box
        position="absolute"
        top="60px"
        left={0}
        w="100%"
        h="calc(100% - 60px)"
        bgImage={`url(${sceneBackgrounds[currentScene] || '/hero-neon-burro-birds-eye-view.jpg'})`}
        bgSize="cover"
        bgPosition="center"
        filter="brightness(0.8)"
      />

      {/* Gradient Overlay - Lightened */}
      <Box
        position="absolute"
        top="60px"
        left={0}
        w="100%"
        h="calc(100% - 60px)"
        bg="linear-gradient(to bottom, rgba(10,10,10,0.1), rgba(10,10,10,0.4))"
      />

      {/* Interactive Hotspots */}
      <AnimatePresence mode="wait">
        {interactiveAreas[currentScene]?.map((area) => (
          <MotionBox
            key={area.id}
            id={`hotspot-${area.id}`}
            position="absolute"
            top={`calc(${isMobile && area.mobilePosition ? area.mobilePosition.top : area.position.top} + 60px)`}
            left={isMobile && area.mobilePosition ? area.mobilePosition.left : area.position.left}
            width={isMobile && area.mobileSize ? area.mobileSize.width : area.size.width}
            height={isMobile && area.mobileSize ? area.mobileSize.height : area.size.height}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            cursor="pointer"
            onClick={() => handleAreaClick(area)}
            onMouseEnter={() => !isMobile && handleAreaHover(area)}
            onMouseLeave={() => !isMobile && handleAreaHover(null)}
            _hover={{
              transform: !isMobile ? 'scale(1.05)' : 'none',
            }}
          >
            {/* Larger invisible hover area */}
            <Box
              position="absolute"
              top="-30px"
              left="-30px"
              right="-30px"
              bottom="-30px"
              cursor="pointer"
            />
            
            {/* Subtle glowing dot indicator - larger and brighter for visibility */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width={isMobile ? "20px" : "24px"}
              height={isMobile ? "20px" : "24px"}
              bg={area.color}
              borderRadius="full"
              opacity={hoveredArea === area.id || mobileSelectedArea?.id === area.id ? 0.9 : 0.5}
              boxShadow={`0 0 ${hoveredArea === area.id ? '40px' : '30px'} ${area.color}, 0 0 60px ${area.color}`}
              transition="all 0.3s"
              animation="gentlePulse 3s ease-in-out infinite"
              _after={{
                content: '""',
                position: 'absolute',
                inset: '-4px',
                borderRadius: 'full',
                border: '2px solid',
                borderColor: area.color,
                opacity: 0.3,
                animation: 'ringExpand 3s ease-out infinite',
              }}
            />
            
            {/* Enhanced glow effect on hover/selection */}
            {(hoveredArea === area.id || mobileSelectedArea?.id === area.id) && (
              <Box
                position="absolute"
                inset={-4}
                bg={area.color}
                opacity={0.15}
                borderRadius="50%"
                filter="blur(40px)"
                animation="pulse 2s infinite"
              />
            )}

            {/* Hover/Mobile tooltip with enhanced edge detection */}
            <AnimatePresence>
              {(hoveredArea === area.id || mobileSelectedArea?.id === area.id) && (
                <MotionBox
                  position="absolute"
                  top={(() => {
                    // For mobile, always position below with fixed spacing
                    if (isMobile) {
                      return "40px";
                    }
                    // Desktop positioning
                    const areaTop = parseInt(area.position.top);
                    if (areaTop < 25) {
                      return "80px"; // Below the dot
                    } else if (areaTop > 75) {
                      return "-180px"; // Well above the dot
                    } else {
                      return tooltipTop; // Default above positioning
                    }
                  })()}
                  left={(() => {
                    const areaLeft = parseInt(area.position.left);
                    // For mobile, check if element is on right side
                    if (isMobile) {
                      if (areaLeft > 60) {
                        return "auto"; // Use right positioning instead
                      }
                      return "50%";
                    }
                    // Desktop logic - position tooltips to left of right-side elements
                    if (areaLeft > 70) {
                      return "auto"; // Will use right positioning
                    } else if (areaLeft < 25) {
                      return "100%"; // Position to the right of left-side elements
                    } else {
                      return "50%"; // Center for middle elements
                    }
                  })()}
                  right={(() => {
                    const areaLeft = parseInt(area.position.left);
                    // Mobile - position to left of right-side elements
                    if (isMobile && areaLeft > 60) {
                      return "100%"; // Full width to the left
                    }
                    // Desktop - position to left of right-side elements
                    if (areaLeft > 70) {
                      return "100%"; // Full width to the left
                    }
                    return "auto";
                  })()}
                  transform={(() => {
                    const areaLeft = parseInt(area.position.left);
                    // Mobile transform logic
                    if (isMobile) {
                      if (areaLeft > 60) {
                        return "none"; // No transform for right-side elements
                      }
                      return "translateX(-50%)"; // Center for others
                    }
                    // Desktop transform logic
                    if (areaLeft > 70 || areaLeft < 25) {
                      return "none"; // No transform for edge elements
                    }
                    return "translateX(-50%)"; // Center transform for middle elements
                  })()}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  zIndex={50}
                  pointerEvents="none"
                  minW={isMobile ? "220px" : "350px"}
                  maxW={isMobile ? "calc(90vw - 20px)" : "400px"}
                  mx={0}
                  px={isMobile ? 3 : 0}
                  // Add margin for right-side tooltips
                  mr={(() => {
                    const areaLeft = parseInt(area.position.left);
                    if ((isMobile && areaLeft > 60) || (!isMobile && areaLeft > 70)) {
                      return 2; // Small margin from the element
                    }
                    return 0;
                  })()}
                  // Add margin for left-side tooltips
                  ml={(() => {
                    const areaLeft = parseInt(area.position.left);
                    if (!isMobile && areaLeft < 25) {
                      return 2; // Small margin from the element
                    }
                    return 0;
                  })()}
                >
                  <VStack 
                    spacing={1} 
                    align="center"
                  >
                    {/* Neon sign - smaller on mobile */}
                    <Box h={neonSignSize} display="flex" alignItems="center" justifyContent="center">
                      {area.neonSign ? (
                        <Image 
                          src={area.neonSign} 
                          alt={area.name}
                          maxH={neonSignSize}
                          maxW="100%"
                          objectFit="contain"
                          filter={`drop-shadow(0 0 20px ${area.color}) drop-shadow(0 0 30px ${area.color}) drop-shadow(0 0 40px ${area.color})`}
                        />
                      ) : (
                        <Text 
                          fontWeight="900" 
                          color={area.color} 
                          fontSize={{ base: "3xl", md: "5xl" }}
                          textTransform="uppercase"
                          letterSpacing="wider"
                          textShadow={`0 0 20px ${area.color}, 0 0 30px ${area.color}, 0 0 40px ${area.color}`}
                          lineHeight="1"
                          textAlign="center"
                        >
                          {area.name}
                        </Text>
                      )}
                    </Box>
                    {/* Title - smaller on mobile */}
                    <Text 
                      fontWeight="900" 
                      color={area.color} 
                      fontSize={titleSize}
                      textTransform="uppercase"
                      letterSpacing="wider"
                      textShadow={`0 0 15px ${area.color}, 0 0 25px ${area.color}`}
                      lineHeight="0.9"
                      mt={1}
                      textAlign="center"
                      px={2}
                    >
                      {area.name}
                    </Text>
                    {/* Tagline - smaller on mobile */}
                    <Text 
                      fontSize={taglineSize}
                      fontWeight="600"
                      color="white" 
                      textAlign="center"
                      textShadow="0 0 20px rgba(0,0,0,0.9)"
                      maxW={isMobile ? "200px" : "350px"}
                      letterSpacing="wide"
                      textTransform="uppercase"
                      mt={1}
                      px={3}
                      lineHeight={isMobile ? "1.3" : "1.4"}
                    >
                      {area.description}
                    </Text>
                    {/* Mobile tap instruction - smaller */}
                    {isMobile && mobileSelectedArea?.id === area.id && (
                      <Text
                        fontSize="2xs"
                        color={area.color}
                        mt={2}
                        fontWeight="bold"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        animation="pulse 2s infinite"
                      >
                        Tap again to enter
                      </Text>
                    )}
                  </VStack>
                </MotionBox>
              )}
            </AnimatePresence>
          </MotionBox>
        ))}
      </AnimatePresence>

      {/* Services Menu Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay bg="rgba(0,0,0,0.8)" backdropFilter="blur(10px)" />
        <ModalContent 
          bg={colors.dark.gray} 
          border="2px solid"
          borderColor={colors.brand.primary}
        >
          <ModalHeader color={colors.brand.primary}>
            <HStack spacing={3}>
              <Image 
                src="/images/neon-signs/neonburro-logo.png" 
                alt="Neon Burro"
                h="40px"
                filter={`drop-shadow(0 0 10px ${colors.brand.primary})`}
              />
              <Text>Services Menu</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Text color="gray.400" fontStyle="italic">
                "What'll it be, partner?"
              </Text>
              
              <Button
                size="lg"
                variant="outline"
                borderColor={colors.accent.neon}
                color={colors.accent.neon}
                _hover={{
                  bg: colors.accent.neonAlpha[20],
                  transform: 'translateY(-2px)',
                  boxShadow: colors.effects.glow.neon
                }}
                onClick={() => {
                  onClose();
                  navigate('/services');
                }}
              >
                View Full Menu →
              </Button>
              
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Or ask the bartender about our specials
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
          100% { opacity: 0.15; transform: scale(1); }
        }
        
        @keyframes gentlePulse {
          0%, 100% { 
            opacity: 0.5;
            box-shadow: 0 0 30px currentColor, 0 0 60px currentColor;
          }
          50% { 
            opacity: 0.7;
            box-shadow: 0 0 40px currentColor, 0 0 80px currentColor;
          }
        }
        
        @keyframes ringExpand {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes neonFlicker {
          0%, 100% {
            opacity: 1;
            text-shadow: 
              0 0 20px currentColor,
              0 0 40px currentColor,
              0 0 60px currentColor;
          }
          50% {
            opacity: 0.95;
            text-shadow: 
              0 0 25px currentColor,
              0 0 50px currentColor,
              0 0 75px currentColor;
          }
        }
      `}</style>
    </Box>
  );
};

export default InteractiveValleyScene;