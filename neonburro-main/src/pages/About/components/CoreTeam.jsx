import { Box, Container, Heading, Text, VStack, Grid, HStack, Image, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiAward, FiTrendingUp } from 'react-icons/fi';
import { useState } from 'react';

const MotionBox = motion(Box);

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

const CoreTeam = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const coreMembers = [
    {
      name: 'Tyler',
      email: 'tyler@neonburro.com',
      role: 'Founder & Creative Director',
      image: '/images/profiles/tyler.png',
      imagePosition: 'center 20%',
      bio: 'Started Neon Burro to merge mountain life with digital excellence.',
      expertise: 'Creative Strategy',
      years: '15+',
      builds: 'Brand experiences that convert',
      achievement: 'Led 200+ successful launches',
      location: 'Ridgway, CO',
      color: colors.brand.primary
    },
    {
      name: 'Collin',
      email: 'collin@neonburro.com',
      role: 'Co-Founder & Technical Architect',
      image: '/images/profiles/collin.png',
      imagePosition: 'center 20%',
      bio: 'Builds scalable systems as beautiful as Colorado mountains.',
      expertise: 'System Architecture',
      years: '12+',
      builds: 'Infrastructure that scales',
      achievement: '99.9% uptime across all projects',
      location: 'Ridgway, CO',
      color: colors.accent.neon
    },
    {
      name: 'Jared',
      email: 'jared@neonburro.com',
      role: 'Head of Strategy',
      image: '/images/profiles/jared.png',
      imagePosition: 'center 20%',
      bio: 'Transforms market insights into winning strategies.',
      expertise: 'Growth Strategy',
      years: '10+',
      builds: 'Data-driven roadmaps',
      achievement: '3x average client growth',
      location: 'Dallas, TX',
      color: colors.accent.warm
    },
    {
      name: 'Ted',
      email: 'ted@neonburro.com',
      role: 'Technical Product Manager',
      image: '/images/profiles/ted.png',
      imagePosition: 'center 20%',
      bio: 'Bridges vision and execution with precision.',
      expertise: 'Product Strategy',
      years: '8+',
      builds: 'Features users love',
      achievement: '100% on-time delivery rate',
      location: 'Missoula, MT',
      color: colors.accent.banana
    },
    {
      name: 'Phil',
      email: 'phil@neonburro.com',
      role: 'Automation & Integration Lead',
      image: '/images/profiles/phil.png',
      imagePosition: 'center 20%',
      bio: 'Creates elegant solutions to complex problems.',
      expertise: 'Process Automation',
      years: '10+',
      builds: 'Workflows that work',
      achievement: 'Saved clients 1000+ hours monthly',
      location: 'Ridgway, CO',
      color: colors.accent.purple
    },
    {
      name: 'Sarah',
      email: 'sarah@neonburro.com',
      role: 'Head of Design',
      image: '/images/profiles/sarah.png',
      imagePosition: 'center 20%',
      bio: 'Crafts experiences that delight and convert.',
      expertise: 'UI/UX Design',
      years: '9+',
      builds: 'Interfaces that inspire',
      achievement: '98% user satisfaction scores',
      location: 'Ridgway, CO',
      color: colors.brand.primary
    }
  ];

  return (
    <Box py={{ base: 16, md: 20 }} bg={colors.dark.black} position="relative" overflow="hidden">
      {/* Simplified background gradient */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="1400px"
        height="800px"
        bg={`radial-gradient(ellipse at center, ${colors.accent.banana}05 0%, transparent 50%)`}
        pointerEvents="none"
      />

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
                <Box width="40px" height="2px" bg={colors.accent.banana} />
                <Text 
                  color={colors.accent.banana}
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold" 
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Leadership Team
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
                The Minds Behind
                <Box
                  as="span"
                  display="block"
                  bgGradient={`linear(to-r, ${colors.accent.banana}, ${colors.brand.primary})`}
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
                maxW="600px"
                lineHeight="relaxed"
              >
                Six visionaries united by a belief that great work happens when talented people 
                love what they do and where they do it.
              </Text>
            </MotionBox>
          </VStack>

          {/* Team Grid - Enhanced Cards */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
          >
            {coreMembers.map((member, index) => (
              <MotionBox
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <Box
                  borderRadius="2xl"
                  bg="rgba(255, 255, 255, 0.02)"
                  backdropFilter="blur(10px)"
                  border="2px solid"
                  borderColor={hoveredMember === index ? member.color : "rgba(255, 255, 255, 0.08)"}
                  height="100%"
                  position="relative"
                  overflow="hidden"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  cursor="pointer"
                  _hover={{
                    transform: 'translateY(-6px)',
                    boxShadow: `0 30px 60px ${member.color}22`,
                    bg: 'rgba(255, 255, 255, 0.03)'
                  }}
                >
                  {/* Top accent bar */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    height="3px"
                    bg={member.color}
                    opacity={hoveredMember === index ? 1 : 0}
                    transition="opacity 0.3s"
                  />

                  {/* Profile Section */}
                  <Box p={{ base: 5, md: 6 }}>
                    <HStack spacing={4} align="start" mb={4}>
                      <Box
                        width="90px"
                        height="90px"
                        borderRadius="2xl"
                        overflow="hidden"
                        bg={colors.dark.gray}
                        flexShrink={0}
                        position="relative"
                        border="3px solid"
                        borderColor={hoveredMember === index ? member.color : "transparent"}
                        transition="all 0.3s"
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                          objectPosition={member.imagePosition}
                          loading="lazy"
                        />
                        {/* Achievement badge */}
                        <Box
                          position="absolute"
                          bottom={-1}
                          right={-1}
                          p={1.5}
                          borderRadius="lg"
                          bg={member.color}
                          color="white"
                          opacity={hoveredMember === index ? 1 : 0}
                          transform={hoveredMember === index ? "scale(1)" : "scale(0.8)"}
                          transition="all 0.3s"
                        >
                          <FiAward size={14} />
                        </Box>
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
                        <HStack spacing={1} color="gray.500" fontSize="xs">
                          <FiMapPin size={10} />
                          <Text>{member.location}</Text>
                        </HStack>
                      </VStack>
                    </HStack>

                    {/* Bio */}
                    <Text
                      color="gray.300"
                      fontSize={{ base: "sm", md: "md" }}
                      lineHeight="relaxed"
                      mb={4}
                    >
                      {member.bio}
                    </Text>

                    {/* Key Stats Grid */}
                    <Grid templateColumns="repeat(2, 1fr)" gap={3} mb={4}>
                      <Box
                        p={3}
                        borderRadius="lg"
                        bg={`${member.color}08`}
                        border="1px solid"
                        borderColor={`${member.color}22`}
                      >
                        <Text color="gray.500" fontSize="2xs" textTransform="uppercase" letterSpacing="wider">
                          Experience
                        </Text>
                        <Text color="white" fontSize="lg" fontWeight="bold" fontFamily="mono">
                          {member.years}
                        </Text>
                      </Box>
                      <Box
                        p={3}
                        borderRadius="lg"
                        bg="whiteAlpha.50"
                        border="1px solid"
                        borderColor="whiteAlpha.100"
                      >
                        <Text color="gray.500" fontSize="2xs" textTransform="uppercase" letterSpacing="wider">
                          Focus
                        </Text>
                        <Text color={member.color} fontSize="xs" fontWeight="medium" noOfLines={1}>
                          {member.expertise}
                        </Text>
                      </Box>
                    </Grid>

                    {/* Achievement highlight */}
                    <Box
                      p={3}
                      borderRadius="lg"
                      bg="whiteAlpha.50"
                      border="1px solid"
                      borderColor={hoveredMember === index ? member.color : "whiteAlpha.100"}
                      mb={4}
                      transition="all 0.3s"
                    >
                      <HStack spacing={2}>
                        <Box color={member.color}>
                          <FiTrendingUp size={14} />
                        </Box>
                        <Text color="gray.300" fontSize="xs">
                          {member.achievement}
                        </Text>
                      </HStack>
                    </Box>

                    {/* What they build */}
                    <Text
                      color={member.color}
                      fontSize="sm"
                      fontWeight="medium"
                      fontStyle="italic"
                      mb={4}
                    >
                      "{member.builds}"
                    </Text>

                    {/* Contact - Always visible */}
                    <HStack
                      spacing={2}
                      pt={4}
                      borderTop="1px solid"
                      borderColor="whiteAlpha.100"
                    >
                      <Box
                        as="a"
                        href={`mailto:${member.email}`}
                        display="flex"
                        alignItems="center"
                        gap={2}
                        color="gray.400"
                        fontSize="sm"
                        _hover={{ 
                          color: member.color,
                          textDecoration: 'underline'
                        }}
                        transition="color 0.2s"
                      >
                        <FiMail size={14} />
                        <Text>{member.email}</Text>
                      </Box>
                    </HStack>
                  </Box>
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default CoreTeam;