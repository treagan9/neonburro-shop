import { Box, Container, Heading, Text, VStack, HStack, Grid, Image, Badge, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';

const MotionBox = motion(Box);

// Subtle hover animation
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
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
  }
};

const TheCrew = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  // Core team - the 6 from About page
  const coreTeam = [
    {
      id: 'tyler',
      name: 'Tyler',
      role: 'Founder & Creative Director',
      email: 'tyler@neonburro.com',
      image: '/images/profiles/tyler.png',
      bio: 'Started Neon Burro with a vision to merge mountain life with digital excellence.',
      expertise: 'Creative Strategy',
      years: '15+',
      builds: 'Brand experiences that convert',
      color: colors.brand.primary
    },
    {
      id: 'collin',
      name: 'Collin',
      role: 'Co-Founder & Technical Architect',
      email: 'collin@neonburro.com',
      image: '/images/profiles/collin.png',
      bio: 'Builds scalable systems that work as beautifully as our mountain views.',
      expertise: 'System Architecture',
      years: '12+',
      builds: 'Infrastructure that scales',
      color: colors.accent.neon
    },
    {
      id: 'jared',
      name: 'Jared',
      role: 'Head of Strategy',
      email: 'jared@neonburro.com',
      image: '/images/profiles/jared.png',
      bio: 'Transforms market insights into actionable strategies.',
      expertise: 'Growth Strategy',
      years: '10+',
      builds: 'Data-driven roadmaps',
      color: colors.accent.warm
    },
    {
      id: 'ted',
      name: 'Ted',
      role: 'Technical Product Manager',
      email: 'ted@neonburro.com',
      image: '/images/profiles/ted.png',
      bio: 'Bridges the gap between vision and execution.',
      expertise: 'Product Strategy',
      years: '8+',
      builds: 'Features users love',
      color: colors.accent.banana
    },
    {
      id: 'phil',
      name: 'Phil',
      role: 'Automation & Integration Lead',
      email: 'phil@neonburro.com',
      image: '/images/profiles/phil.png',
      bio: 'Creates elegant solutions to complex problems.',
      expertise: 'Process Automation',
      years: '10+',
      builds: 'Workflows that work',
      color: colors.accent.purple
    },
    {
      id: 'sarah',
      name: 'Sarah',
      role: 'Head of Design',
      email: 'sarah@neonburro.com',
      image: '/images/profiles/sarah.png',
      bio: 'Crafts experiences that delight users and drive results.',
      expertise: 'UI/UX Design',
      years: '9+',
      builds: 'Interfaces that inspire',
      color: colors.brand.primary
    }
  ];

  // Extended team - simplified presentation
  const extendedTeam = [
    { name: 'Marcus', role: 'Backend Developer', specialty: 'API Architecture' },
    { name: 'Nicole', role: 'DevOps Engineer', specialty: 'Cloud Infrastructure' },
    { name: 'Maria', role: 'SEO Strategist', specialty: 'Local Search' },
    { name: 'Jake', role: 'Content Strategist', specialty: 'Brand Voice' },
    { name: 'Alex', role: 'Motion Designer', specialty: 'Video & Animation' },
    { name: 'Ken', role: 'Senior Designer', specialty: 'Visual Systems' }
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
        bg={`radial-gradient(ellipse at center, ${colors.brand.primary}05 0%, transparent 60%)`}
        pointerEvents="none"
      />

      <Container maxW="1400px" px={{ base: 4, md: 8 }} position="relative">
        <VStack spacing={{ base: 16, md: 20 }}>
          
          {/* Header */}
          <VStack spacing={4} textAlign="center" maxW="800px" mx="auto">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <HStack spacing={2} justify="center">
                <Box width="40px" height="2px" bg={colors.brand.primary} />
                <Text 
                  color={colors.brand.primary}
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold"
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  The Team
                </Text>
                <Box width="40px" height="2px" bg={colors.brand.primary} />
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
                Meet the Minds Behind
                <Box
                  as="span"
                  display="block"
                  bgGradient={`linear(to-r, ${colors.brand.primary}, ${colors.accent.neon})`}
                  bgClip="text"
                  mt={1}
                >
                  The Magic
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
                lineHeight="relaxed"
                maxW="600px"
                mx="auto"
              >
                Direct access to the builders. No middlemen, no account managers, 
                just experienced professionals who love what they do.
              </Text>
            </MotionBox>
          </VStack>

          {/* Core Team Grid */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
          >
            {coreTeam.map((member, index) => (
              <MotionBox
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <Box
                  p={{ base: 5, md: 6 }}
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
                  {/* Subtle gradient accent */}
                  <Box
                    position="absolute"
                    top={0}
                    right={0}
                    width="150px"
                    height="150px"
                    bg={`radial-gradient(circle at top right, ${member.color}15 0%, transparent 60%)`}
                    opacity={hoveredMember === member.id ? 1 : 0}
                    transition="opacity 0.3s"
                    pointerEvents="none"
                  />

                  <VStack align="start" spacing={4} position="relative">
                    {/* Profile section */}
                    <HStack spacing={4} width="100%">
                      <Box
                        width="80px"
                        height="80px"
                        borderRadius="xl"
                        overflow="hidden"
                        bg="gray.800"
                        flexShrink={0}
                        border="2px solid"
                        borderColor={hoveredMember === member.id ? member.color : "transparent"}
                        transition="all 0.3s"
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                          objectPosition="center 20%"
                          loading="lazy"
                        />
                      </Box>
                      
                      <VStack align="start" spacing={1} flex={1}>
                        <Heading
                          fontSize={{ base: "lg", md: "xl" }}
                          color="white"
                          fontWeight="bold"
                        >
                          {member.name}
                        </Heading>
                        <Text
                          color={member.color}
                          fontSize={{ base: "xs", md: "sm" }}
                          fontWeight="medium"
                        >
                          {member.role}
                        </Text>
                        <HStack spacing={3} opacity={0.7}>
                          <Box
                            as="a"
                            href={`mailto:${member.email}`}
                            color="gray.400"
                            _hover={{ color: member.color }}
                            transition="color 0.2s"
                          >
                            <FiMail size={14} />
                          </Box>
                          <Box
                            as="a"
                            href="#"
                            color="gray.400"
                            _hover={{ color: member.color }}
                            transition="color 0.2s"
                          >
                            <FiLinkedin size={14} />
                          </Box>
                        </HStack>
                      </VStack>
                    </HStack>

                    {/* Bio */}
                    <Text
                      color="gray.300"
                      fontSize={{ base: "sm", md: "md" }}
                      lineHeight="relaxed"
                    >
                      {member.bio}
                    </Text>

                    {/* Stats */}
                    <HStack spacing={4} width="100%" pt={2}>
                      <VStack align="start" spacing={0} flex={1}>
                        <Text color="gray.500" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                          Experience
                        </Text>
                        <Text color="white" fontSize="lg" fontWeight="bold" fontFamily="mono">
                          {member.years}
                        </Text>
                      </VStack>
                      <Box width="1px" height="40px" bg="whiteAlpha.100" />
                      <VStack align="start" spacing={0} flex={2}>
                        <Text color="gray.500" fontSize="xs" textTransform="uppercase" letterSpacing="wider">
                          Builds
                        </Text>
                        <Text color={member.color} fontSize="sm" fontWeight="medium">
                          {member.builds}
                        </Text>
                      </VStack>
                    </HStack>

                    {/* Expertise badge */}
                    <Badge
                      px={3}
                      py={1}
                      borderRadius="full"
                      bg={`${member.color}22`}
                      color={member.color}
                      fontSize="xs"
                      fontWeight="medium"
                      border="1px solid"
                      borderColor={`${member.color}44`}
                    >
                      {member.expertise}
                    </Badge>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* Extended Team - Simplified */}
          <Box width="100%" maxW="1000px" mx="auto">
            <VStack spacing={6}>
              <Heading
                fontSize={{ base: "xl", md: "2xl" }}
                color="white"
                textAlign="center"
                opacity={0.9}
              >
                Plus Our Extended Network
              </Heading>
              
              <Grid
                templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
                gap={4}
                width="100%"
              >
                {extendedTeam.map((member, index) => (
                  <MotionBox
                    key={member.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Box
                      p={4}
                      borderRadius="lg"
                      bg="whiteAlpha.50"
                      backdropFilter="blur(10px)"
                      border="1px solid"
                      borderColor="whiteAlpha.100"
                      textAlign="center"
                      transition="all 0.2s"
                      _hover={{
                        bg: 'whiteAlpha.100',
                        borderColor: colors.brand.primary,
                        transform: 'translateY(-2px)'
                      }}
                    >
                      <Text color="white" fontSize="sm" fontWeight="bold">
                        {member.name}
                      </Text>
                      <Text color="gray.400" fontSize="xs" mt={1}>
                        {member.role}
                      </Text>
                      <Text color={colors.brand.primary} fontSize="xs" mt={2} fontWeight="medium">
                        {member.specialty}
                      </Text>
                    </Box>
                  </MotionBox>
                ))}
              </Grid>
            </VStack>
          </Box>

          {/* Team culture note */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            textAlign="center"
            maxW="700px"
            mx="auto"
          >
            <Box
              p={{ base: 6, md: 8 }}
              borderRadius="2xl"
              bg={`linear-gradient(135deg, ${colors.brand.primary}05 0%, ${colors.accent.neon}05 100%)`}
              border="1px solid"
              borderColor={`${colors.brand.primary}22`}
            >
              <Text
                color="white"
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="medium"
                lineHeight="relaxed"
              >
                We believe great work happens when talented people have the freedom 
                to do what they love. No egos, no politics, just builders building.
              </Text>
            </Box>
          </MotionBox>

        </VStack>
      </Container>
    </Box>
  );
};

export default TheCrew;