import { Box, Container, Heading, Text, VStack, Link, List, ListItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Terms = () => {
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
                  Terms of Service
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
                    Welcome to Neon Burro. By using our services, you agree to these Terms of Service. 
                    Please read them carefully.
                  </Text>

                  <VStack spacing={4} align="start" width="100%">
                    <Heading as="h2" size="md" color="white">1. Services</Heading>
                    <Text color="text.secondary" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed">
                      Neon Burro provides web development, design, and digital marketing services. Our services 
                      are tailored to each client's specific needs and are detailed in individual project agreements.
                    </Text>
                  </VStack>

                  <VStack spacing={4} align="start" width="100%">
                    <Heading as="h2" size="md" color="white">2. Project Agreements</Heading>
                    <Text color="text.secondary" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed">
                      Each project is governed by a separate agreement that outlines:
                    </Text>
                    <List spacing={2} pl={4}>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Project scope and deliverables
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Timeline and milestones
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Payment terms and schedule
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Intellectual property rights
                      </ListItem>
                    </List>
                  </VStack>

                  <VStack spacing={4} align="start" width="100%">
                    <Heading as="h2" size="md" color="white">3. Payment Terms</Heading>
                    <Text color="text.secondary" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed">
                      Payment terms are specified in each project agreement. Generally:
                    </Text>
                    <List spacing={2} pl={4}>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • 50% deposit required to begin work
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Remaining balance due upon project completion
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Late payments subject to 1.5% monthly interest
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Additional work requires separate agreement
                      </ListItem>
                    </List>
                  </VStack>

                  <VStack spacing={4} align="start" width="100%">
                    <Heading as="h2" size="md" color="white">4. Intellectual Property</Heading>
                    <Text color="text.secondary" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed">
                      Upon full payment, clients receive ownership of custom work created specifically for their 
                      project. Neon Burro retains rights to:
                    </Text>
                    <List spacing={2} pl={4}>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Pre-existing materials and methodologies
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Open-source components
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Portfolio usage rights (unless otherwise agreed)
                      </ListItem>
                    </List>
                  </VStack>

                  <VStack spacing={4} align="start" width="100%">
                    <Heading as="h2" size="md" color="white">5. Warranties and Limitations</Heading>
                    <Text color="text.secondary" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed">
                      We strive for excellence but provide services "as is." Our liability is limited to the 
                      amount paid for services. We are not liable for indirect, incidental, or consequential damages.
                    </Text>
                  </VStack>

                  <VStack spacing={4} align="start" width="100%">
                    <Heading as="h2" size="md" color="white">6. Termination</Heading>
                    <Text color="text.secondary" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed">
                      Either party may terminate a project agreement with written notice. Upon termination:
                    </Text>
                    <List spacing={2} pl={4}>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Client pays for work completed to date
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Neon Burro delivers completed work
                      </ListItem>
                      <ListItem color="text.secondary" fontSize={{ base: "sm", md: "md" }}>
                        • Confidentiality obligations continue
                      </ListItem>
                    </List>
                  </VStack>

                  <VStack spacing={4} align="start" width="100%">
                    <Heading as="h2" size="md" color="white">7. Governing Law</Heading>
                    <Text color="text.secondary" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed">
                      These terms are governed by Colorado law. Any disputes will be resolved in Ouray County, Colorado.
                    </Text>
                  </VStack>

                  <VStack spacing={4} align="start" width="100%">
                    <Heading as="h2" size="md" color="white">Contact</Heading>
                    <Text color="text.secondary" fontSize={{ base: "sm", md: "md" }} lineHeight="relaxed">
                      Questions about these terms? Contact us at:
                    </Text>
                    <Link href="mailto:legal@neonburro.com" color="brand.primary" fontSize={{ base: "sm", md: "md" }}>
                      legal@neonburro.com
                    </Link>
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

export default Terms;
