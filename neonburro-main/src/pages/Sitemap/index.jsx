import { Box, Container, Heading, Text, VStack, Link, Grid, GridItem, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const Sitemap = () => {
  const navigate = useNavigate();

  const mainPages = [
    { title: 'Home', path: '/', description: 'Welcome to Neon Burro' },
    { title: 'Services', path: '/services', description: 'Our digital solutions' },
    { title: 'Work', path: '/work', description: 'Portfolio & case studies' },
    { title: 'About', path: '/about', description: 'Our story and team' },
    { title: 'Contact', path: '/contact', description: 'Start your project' }
  ];

  const resourcePages = [
    { title: 'Fuel Up', path: '/invoice', description: 'Purchase development hours' },
    { title: 'FAQ', path: '/faq', description: 'Frequently asked questions' },
    { title: 'Apply to Burro', path: '/apply-to-burro', description: 'Join our adventure' }
  ];

  const labPages = [
    { title: 'Lab', path: '/lab', description: 'Experimental projects (password protected)' },
    { title: 'Gnarly Tacos', path: '/lab/gnarly-tacos', description: 'Taco shop website' },
    { title: 'Trace Gallery', path: '/lab/trace-gallery', description: 'Art gallery showcase' },
    { title: 'Colorado Boy', path: '/lab/colorado-boy', description: 'Pizza restaurant site' }
  ];

  const legalPages = [
    { title: 'Privacy Policy', path: '/privacy', description: 'How we handle your data' },
    { title: 'Terms of Service', path: '/terms', description: 'Legal terms and conditions' }
  ];

  const PageLink = ({ page }) => (
    <Box
      onClick={() => navigate(page.path)}
      cursor="pointer"
      p={4}
      borderRadius="lg"
      bg="whiteAlpha.50"
      border="1px solid"
      borderColor="whiteAlpha.100"
      transition="all 0.3s"
      _hover={{
        bg: 'whiteAlpha.100',
        borderColor: 'brand.primary',
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 30px rgba(0, 229, 229, 0.1)'
      }}
    >
      <HStack justify="space-between" align="start">
        <VStack align="start" spacing={1}>
          <Text color="white" fontWeight="semibold" fontSize={{ base: "sm", md: "md" }}>
            {page.title}
          </Text>
          <Text color="text.muted" fontSize={{ base: "xs", md: "sm" }}>
            {page.description}
          </Text>
        </VStack>
        <FiArrowRight size={16} color="var(--chakra-colors-text-muted)" />
      </HStack>
    </Box>
  );

  return (
    <Box bg="dark.black" minH="100vh">
      <Box
        position="relative"
        pt={{ base: 20, md: 28, lg: 32 }}
        pb={{ base: 16, md: 20 }}
      >
        <Container maxW="1200px" px={{ base: 4, md: 8 }}>
          <VStack spacing={{ base: 8, md: 12 }} align="start">
            {/* Header */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              width="100%"
            >
              <VStack align="start" spacing={4}>
                <Heading
                  as="h1"
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight="800"
                  color="white"
                  lineHeight={{ base: "1.3", md: "1.2" }}
                  letterSpacing="tight"
                >
                  Sitemap
                </Heading>
                <Text color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                  Explore all pages and resources on Neon Burro
                </Text>
              </VStack>
            </MotionBox>

            {/* Main Pages */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              width="100%"
            >
              <VStack align="start" spacing={4} width="100%">
                <Heading as="h2" size="md" color="white">Main Pages</Heading>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4} width="100%">
                  {mainPages.map((page) => (
                    <GridItem key={page.path}>
                      <PageLink page={page} />
                    </GridItem>
                  ))}
                </Grid>
              </VStack>
            </MotionBox>

            {/* Resources */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              width="100%"
            >
              <VStack align="start" spacing={4} width="100%">
                <Heading as="h2" size="md" color="white">Resources</Heading>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4} width="100%">
                  {resourcePages.map((page) => (
                    <GridItem key={page.path}>
                      <PageLink page={page} />
                    </GridItem>
                  ))}
                </Grid>
              </VStack>
            </MotionBox>

            {/* Lab Projects */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              width="100%"
            >
              <VStack align="start" spacing={4} width="100%">
                <Heading as="h2" size="md" color="white">Lab Projects</Heading>
                <Text color="text.muted" fontSize="sm" mb={2}>
                  Note: Lab section requires password authentication
                </Text>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4} width="100%">
                  {labPages.map((page) => (
                    <GridItem key={page.path}>
                      <PageLink page={page} />
                    </GridItem>
                  ))}
                </Grid>
              </VStack>
            </MotionBox>

            {/* Legal */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              width="100%"
            >
              <VStack align="start" spacing={4} width="100%">
                <Heading as="h2" size="md" color="white">Legal</Heading>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4} width="100%">
                  {legalPages.map((page) => (
                    <GridItem key={page.path}>
                      <PageLink page={page} />
                    </GridItem>
                  ))}
                </Grid>
              </VStack>
            </MotionBox>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Sitemap;