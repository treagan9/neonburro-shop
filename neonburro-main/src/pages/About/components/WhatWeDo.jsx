import { Box, Container, Heading, Text, VStack, HStack, Grid, Tag, Flex, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiCode, FiTrendingUp, FiArrowRight, FiCheck } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const OurStory = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Box position="relative" overflow="hidden" py={32}>
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.03}
          bgImage="linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)"
          bgSize="50px 50px"
        />

        <Container maxW="1200px" position="relative" zIndex={1}>
          <VStack spacing={8} textAlign="center" maxW="800px" mx="auto">
            <MotionBox {...fadeInUp}>
              <Tag
                size="lg"
                bg="neon.cyan"
                color="dark.black"
                fontSize="sm"
                fontWeight="600"
                px={4}
                py={2}
              >
                EST. 2024 • RIDGWAY, COLORADO
              </Tag>
            </MotionBox>

            <MotionBox {...fadeInUp} transition={{ delay: 0.1 }}>
              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight="800"
                bgGradient="linear(to-r, neon.cyan, neon.blue)"
                bgClip="text"
                letterSpacing="-0.02em"
                lineHeight="1.1"
              >
                Building the Future
                <br />
                <Text as="span" color="white">
                  From 7,200 Feet
                </Text>
              </Heading>
            </MotionBox>

            <MotionBox {...fadeInUp} transition={{ delay: 0.2 }}>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.300"
                maxW="600px"
                lineHeight="1.8"
              >
                We're a collective of developers, designers, and digital craftspeople 
                creating exceptional web experiences from the heart of the Colorado Rockies.
              </Text>
            </MotionBox>

            <MotionFlex
              gap={8}
              flexWrap="wrap"
              justify="center"
              mt={12}
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              {[
                { number: "7", label: "Core Team Members", icon: FiUsers },
                { number: "50+", label: "Certified Burros", icon: FiAward },
                { number: "200+", label: "Projects Delivered", icon: FiCode },
                { number: "99.9%", label: "Client Satisfaction", icon: FiTrendingUp }
              ].map((stat, i) => (
                <MotionBox
                  key={i}
                  variants={fadeInUp}
                  p={6}
                  borderRadius="xl"
                  bg="whiteAlpha.50"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  textAlign="center"
                  minW="200px"
                  position="relative"
                  overflow="hidden"
                  _hover={{
                    borderColor: 'neon.cyan',
                    transform: 'translateY(-2px)'
                  }}
                  transition="all 0.3s"
                >
                  <stat.icon size={24} color="#00FFFF" style={{ margin: '0 auto 12px' }} />
                  <Text fontSize="3xl" fontWeight="700" color="white">
                    {stat.number}
                  </Text>
                  <Text fontSize="sm" color="gray.400" mt={1}>
                    {stat.label}
                  </Text>
                </MotionBox>
              ))}
            </MotionFlex>
          </VStack>
        </Container>
      </Box>

      {/* Story Section */}
      <Container maxW="1200px" py={20}>
        <MotionBox
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={12} alignItems="center">
            <VStack align="flex-start" spacing={6}>
              <Tag colorScheme="cyan" size="sm" fontWeight="600">
                OUR STORY
              </Tag>
              <Heading
                as="h2"
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="700"
                color="white"
                lineHeight="1.2"
              >
                From Silicon Valley
                <br />
                <Text as="span" color="neon.cyan">
                  To Silicon Peaks
                </Text>
              </Heading>
              <Text color="gray.300" fontSize="lg" lineHeight="1.8">
                In 2024, seven developers made a choice: trade the concrete jungle 
                for actual mountains. We believed great code doesn't require a 
                cubicle—it requires creativity, community, and killer views.
              </Text>
              <Text color="gray.300" fontSize="lg" lineHeight="1.8">
                What started as a remote work experiment became something bigger. 
                We built Neon Burro as a place where developers could level up their 
                skills, work on real projects, and experience what sustainable tech 
                careers actually look like.
              </Text>
              <Button
                size="lg"
                rightIcon={<FiArrowRight />}
                bg="neon.cyan"
                color="dark.black"
                _hover={{ bg: 'neon.blue' }}
                fontWeight="600"
              >
                Meet the Founders
              </Button>
            </VStack>

            <Box
              position="relative"
              p={8}
              borderRadius="2xl"
              bg="whiteAlpha.50"
              backdropFilter="blur(10px)"
              border="2px solid"
              borderColor="whiteAlpha.100"
            >
              <VStack spacing={4} align="stretch">
                <Text color="neon.cyan" fontWeight="600" fontSize="sm">
                  THE NEON BURRO DIFFERENCE
                </Text>
                {[
                  "Remote-first since day one",
                  "Real projects, real impact",
                  "Work-life integration, not balance",
                  "Open source everything",
                  "Community over competition"
                ].map((point, i) => (
                  <HStack key={i} spacing={3}>
                    <FiCheck color="#00FFFF" />
                    <Text color="gray.300">{point}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </Grid>
        </MotionBox>
      </Container>
    </>
  );
};

export default OurStory;
