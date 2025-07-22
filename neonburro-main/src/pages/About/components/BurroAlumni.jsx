import { Box, Container, Heading, Text, VStack, Grid, HStack, Badge, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiGlobe, FiClock, FiZap, FiWifi, FiCoffee } from 'react-icons/fi';
import { useState } from 'react';

const MotionBox = motion(Box);

// Subtle pulse for active status
const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

// Wave animation for connection lines
const wave = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
`;

// Theme colors
const colors = {
  brand: {
    primary: '#00E5E5',
  },
  accent: {
    neon: '#39FF14',
    warm: '#FF6B00',
    purple: '#8B5CF6',
    banana: '#FFE500',
  },
  dark: {
    black: '#0A0A0A',
    gray: '#1A1A1A',
  }
};

const BurroAlumni = () => {
  const [activeTimezone, setActiveTimezone] = useState('all');
  const [hoveredMember, setHoveredMember] = useState(null);

  // Remote team members with creative profiles
  const remoteTeam = [
    {
      id: 'alex',
      name: 'Alex Chen',
      image: '/images/profiles/alex-chen.png',
      role: 'Full Stack Developer',
      specialty: 'React & Node.js',
      timezone: 'PST',
      availability: 'Available',
      currentProject: 'E-commerce Platform',
      superpower: 'Can debug in their sleep',
      coffeeIntake: '3-4 cups',
      preferredHours: 'Night Owl',
      color: colors.brand.primary
    },
    {
      id: 'maria',
      name: 'Maria Rodriguez',
      image: '/images/profiles/jamie-rodriguez.png',
      role: 'UI/UX Designer',
      specialty: 'Design Systems',
      timezone: 'CST',
      availability: 'In Project',
      currentProject: 'Mobile App Redesign',
      superpower: 'Pixel perfect at 3am',
      coffeeIntake: 'Matcha convert',
      preferredHours: 'Early Bird',
      color: colors.accent.neon
    },
    {
      id: 'marcus',
      name: 'Marcus Thompson',
      image: '/images/profiles/sam-thompson.png',
      role: 'Backend Engineer',
      specialty: 'API Architecture',
      timezone: 'EST',
      availability: 'Available',
      currentProject: 'Open for next sprint',
      superpower: 'Makes databases sing',
      coffeeIntake: 'Espresso only',
      preferredHours: 'Flexible',
      color: colors.accent.warm
    },
    {
      id: 'riley',
      name: 'Riley Park',
      image: '/images/profiles/Riley-park.png',
      role: 'Frontend Developer',
      specialty: 'Animation & Motion',
      timezone: 'MST',
      availability: 'Available',
      currentProject: 'Landing Page Magic',
      superpower: 'CSS wizardry',
      coffeeIntake: 'Cold brew fanatic',
      preferredHours: 'Night Owl',
      color: colors.accent.banana
    },
    {
      id: 'morgan',
      name: 'Morgan Lee',
      image: '/images/profiles/morgan-lee.png',
      role: 'DevOps Engineer',
      specialty: 'Cloud Architecture',
      timezone: 'PST',
      availability: 'In Project',
      currentProject: 'Infrastructure Scale',
      superpower: '99.99% uptime guarantee',
      coffeeIntake: 'Tea enthusiast',
      preferredHours: 'Always On-Call',
      color: colors.accent.purple
    },
    {
      id: 'casey',
      name: 'Casey Martinez',
      image: '/images/profiles/Casey-marrtinez.png',
      role: 'Mobile Developer',
      specialty: 'React Native',
      timezone: 'CST',
      availability: 'Available Soon',
      currentProject: 'Wrapping iOS app',
      superpower: 'Cross-platform ninja',
      coffeeIntake: 'Energy drinks',
      preferredHours: 'Afternoon Peak',
      color: colors.brand.primary
    }
  ];

  // Filter by timezone
  const filteredTeam = activeTimezone === 'all' 
    ? remoteTeam 
    : remoteTeam.filter(member => member.timezone === activeTimezone);

  // Get unique timezones
  const timezones = ['all', ...new Set(remoteTeam.map(m => m.timezone))];

  return (
    <Box py={{ base: 16, md: 24 }} bg={colors.dark.black} position="relative" overflow="hidden">
      {/* Network connection visualization */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
        pointerEvents="none"
      >
        {/* Connection lines */}
        <svg
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.brand.primary} stopOpacity="0" />
              <stop offset="50%" stopColor={colors.brand.primary} stopOpacity="0.5" />
              <stop offset="100%" stopColor={colors.brand.primary} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={`${20 + i * 20}%`}
              x2="100%"
              y2={`${30 + i * 15}%`}
              stroke="url(#connectionGradient)"
              strokeWidth="1"
              opacity="0.3"
            />
          ))}
        </svg>
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
              <HStack spacing={2} justify="center">
                <Box as={FiGlobe} color={colors.accent.neon} size={16} />
                <Text 
                  color={colors.accent.neon}
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold" 
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Remote Network
                </Text>
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
                Our Digital
                <Box
                  as="span"
                  display="block"
                  bgGradient={`linear(to-r, ${colors.accent.neon}, ${colors.brand.primary})`}
                  bgClip="text"
                  mt={1}
                >
                  Nomad Network
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
                lineHeight="relaxed"
              >
                Talented specialists across time zones, ready to jump in when you need 
                that extra magic. No overhead, just outcomes.
              </Text>
            </MotionBox>
          </VStack>

          {/* Timezone Filter */}
          <HStack spacing={2} flexWrap="wrap" justify="center">
            {timezones.map((tz) => (
              <Badge
                key={tz}
                px={4}
                py={2}
                borderRadius="full"
                bg={activeTimezone === tz ? colors.accent.neon : 'whiteAlpha.100'}
                color={activeTimezone === tz ? colors.dark.black : 'white'}
                cursor="pointer"
                fontWeight="medium"
                fontSize="xs"
                textTransform="uppercase"
                onClick={() => setActiveTimezone(tz)}
                transition="all 0.2s"
                _hover={{
                  bg: activeTimezone === tz ? colors.accent.neon : 'whiteAlpha.200',
                  transform: 'translateY(-2px)'
                }}
              >
                <HStack spacing={1}>
                  <FiClock size={12} />
                  <Text>{tz === 'all' ? 'All Timezones' : tz}</Text>
                </HStack>
              </Badge>
            ))}
          </HStack>

          {/* Team Grid - Card Style */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
          >
            {filteredTeam.map((member, index) => (
              <MotionBox
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <Box
                  borderRadius="2xl"
                  bg="rgba(255, 255, 255, 0.02)"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor={hoveredMember === member.id ? member.color : "rgba(255, 255, 255, 0.08)"}
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  cursor="pointer"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 40px ${member.color}22`,
                    bg: 'rgba(255, 255, 255, 0.03)'
                  }}
                >
                  {/* Status indicator */}
                  <Box
                    position="absolute"
                    top={4}
                    right={4}
                    width="12px"
                    height="12px"
                    borderRadius="full"
                    bg={member.availability === 'Available' ? colors.accent.neon : 
                       member.availability === 'In Project' ? colors.accent.warm : 
                       colors.accent.banana}
                    animation={member.availability === 'Available' ? `${pulse} 2s infinite` : 'none'}
                    zIndex={2}
                  />

                  {/* Card Content */}
                  <Box p={{ base: 5, md: 6 }}>
                    {/* Header Section */}
                    <VStack spacing={4} align="start">
                      <HStack spacing={4} width="100%">
                        <Box
                          width="60px"
                          height="60px"
                          borderRadius="xl"
                          overflow="hidden"
                          bg={colors.dark.gray}
                          position="relative"
                          flexShrink={0}
                        >
                          <Box
                            as="img"
                            src={member.image}
                            alt={member.name}
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            objectPosition="center 20%"
                          />
                          {/* Online indicator */}
                          <Box
                            position="absolute"
                            bottom={1}
                            right={1}
                            width="14px"
                            height="14px"
                            borderRadius="full"
                            bg={colors.accent.neon}
                            border="2px solid"
                            borderColor={colors.dark.black}
                          />
                        </Box>
                        
                        <VStack align="start" spacing={0} flex={1}>
                          <Heading fontSize="lg" color="white">
                            {member.name}
                          </Heading>
                          <Text color="gray.400" fontSize="xs">
                            {member.role}
                          </Text>
                        </VStack>
                      </HStack>

                      {/* Specialty Badge */}
                      <Badge
                        colorScheme="gray"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="xs"
                        bg={`${member.color}22`}
                        color={member.color}
                        border="1px solid"
                        borderColor={`${member.color}44`}
                      >
                        <HStack spacing={1}>
                          <FiZap size={10} />
                          <Text>{member.specialty}</Text>
                        </HStack>
                      </Badge>

                      {/* Current Status */}
                      <Box
                        width="100%"
                        p={3}
                        borderRadius="lg"
                        bg="whiteAlpha.50"
                        border="1px solid"
                        borderColor="whiteAlpha.100"
                      >
                        <Text color="gray.400" fontSize="xs" mb={1}>
                          Current Project
                        </Text>
                        <Text color="white" fontSize="sm" fontWeight="medium">
                          {member.currentProject}
                        </Text>
                      </Box>

                      {/* Fun Stats */}
                      <VStack spacing={2} width="100%" pt={2}>
                        <HStack width="100%" justify="space-between">
                          <HStack spacing={1}>
                            <FiCoffee size={12} color={colors.accent.warm} />
                            <Text fontSize="xs" color="gray.400">Coffee</Text>
                          </HStack>
                          <Text fontSize="xs" color="white">{member.coffeeIntake}</Text>
                        </HStack>
                        <HStack width="100%" justify="space-between">
                          <HStack spacing={1}>
                            <FiWifi size={12} color={colors.brand.primary} />
                            <Text fontSize="xs" color="gray.400">Superpower</Text>
                          </HStack>
                          <Text fontSize="xs" color="white" textAlign="right">{member.superpower}</Text>
                        </HStack>
                        <HStack width="100%" justify="space-between">
                          <HStack spacing={1}>
                            <FiClock size={12} color={colors.accent.banana} />
                            <Text fontSize="xs" color="gray.400">Peak Hours</Text>
                          </HStack>
                          <Text fontSize="xs" color="white">{member.preferredHours}</Text>
                        </HStack>
                      </VStack>

                      {/* Availability Badge */}
                      <Box width="100%">
                        <Badge
                          width="100%"
                          textAlign="center"
                          py={2}
                          borderRadius="lg"
                          bg={member.availability === 'Available' ? `${colors.accent.neon}22` : 
                             member.availability === 'In Project' ? `${colors.accent.warm}22` : 
                             `${colors.accent.banana}22`}
                          color={member.availability === 'Available' ? colors.accent.neon : 
                                member.availability === 'In Project' ? colors.accent.warm : 
                                colors.accent.banana}
                          fontSize="xs"
                          fontWeight="bold"
                          textTransform="uppercase"
                          letterSpacing="wider"
                        >
                          {member.availability}
                        </Badge>
                      </Box>
                    </VStack>
                  </Box>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Network Stats */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            width="100%"
            maxW="800px"
            mx="auto"
          >
            <HStack
              spacing={0}
              borderRadius="2xl"
              overflow="hidden"
              bg="whiteAlpha.50"
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="whiteAlpha.100"
            >
              {[
                { label: 'Timezones', value: '4', color: colors.brand.primary },
                { label: 'Availability', value: '67%', color: colors.accent.neon },
                { label: 'Response Time', value: '<2hrs', color: colors.accent.warm },
                { label: 'Satisfaction', value: '100%', color: colors.accent.banana }
              ].map((stat, index) => (
                <VStack
                  key={stat.label}
                  flex={1}
                  p={4}
                  spacing={1}
                  borderRight={index < 3 ? '1px solid' : 'none'}
                  borderColor="whiteAlpha.100"
                >
                  <Text color={stat.color} fontSize="xl" fontWeight="bold" fontFamily="mono">
                    {stat.value}
                  </Text>
                  <Text color="gray.400" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                    {stat.label}
                  </Text>
                </VStack>
              ))}
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default BurroAlumni;