import { Box, Container, Heading, Text, VStack, Link, List, ListItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Privacy = () => {
  const lastUpdated = "January 1, 2025";

  return (
    <Box bg="dark.black" minH="100vh">
      <Box
        position="relative"
        pt={{ base: 20, md: 28, lg: 32 }}
        pb={{ base: 16, md: 20 }}
      >
        <Container maxW="800px" px={{ base: 4, md: 8 }}>
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
                  Privacy Policy
                </Heading>
                <Text color="text.muted" fontSize="sm">
                  Last updated: {lastUpdated}
                </Text>
              </VStack>
            </MotionBox>

            {/* Content */}
            <VStack spacing={8} align="start" width="100%">
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                width="100%"
              >
                <VStack spacing={6} align="start">
                  <Text color="text.secondary" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed">
                    At Neon Burro, we take your privacy seriously. This Privacy Policy explains how we collect, 
                    use, and protect your information when you use our website and services.
                  </Text>

                  <VStack spacing={4} align="start" width="100%">
                    <Heading as="h2" size="md" color="white">Information We Collect</Heading>
                    <Text color="text.secondary" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed">
                      We collect information you provide directly to us, such as:
                    </Text>
                    <List spacing={2} pl={4}>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Contact information (name, email, phone number)
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Project details and requirements
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Payment information (processed securely through third-party providers)
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Communications with our team
                      </ListItem>
                    </List>
                  </VStack>

                  <VStack spacing={4} align="start" width="100%">
                    <Heading as="h2" size="md" color="white">How We Use Your Information</Heading>
                    <Text color="text.secondary" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed">
                      We use the information we collect to:
                    </Text>
                    <List spacing={2} pl={4}>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Provide and improve our services
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Communicate with you about projects and updates
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Process payments and maintain records
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Comply with legal obligations
                      </ListItem>
                    </List>
                  </VStack>

                  <VStack spacing={4} align="start" width="100%">
                    <Heading as="h2" size="md" color="white">Data Security</Heading>
                    <Text color="text.secondary" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed">
                      We implement appropriate technical and organizational measures to protect your personal 
                      information against unauthorized access, alteration, disclosure, or destruction. However, 
                      no method of transmission over the internet is 100% secure.
                    </Text>
                  </VStack>

                  <VStack spacing={4} align="start" width="100%">
                    <Heading as="h2" size="md" color="white">Your Rights</Heading>
                    <Text color="text.secondary" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed">
                      You have the right to:
                    </Text>
                    <List spacing={2} pl={4}>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Access your personal information
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Correct inaccurate information
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Request deletion of your information
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Opt-out of marketing communications
                      </ListItem>
                    </List>
                  </VStack>

                  <VStack spacing={4} align="start" width="100%">
                    <Heading as="h2" size="md" color="white">Contact Us</Heading>
                    <Text color="text.secondary" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed">
                      If you have questions about this Privacy Policy or our data practices, please contact us at:
                    </Text>
                    <VStack align="start" spacing={1}>
                      <Link href="mailto:privacy@neonburro.com" color="brand.primary" fontSize={{ base: "sm", md: "md" }}>
                        privacy@neonburro.com
                      </Link>
                      <Text color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        Neon Burro, LLC<br />
                        Ridgway, Colorado 81432
                      </Text>
                    </VStack>
                  </VStack>
                </VStack>
              </MotionBox>
            </VStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Privacy;
