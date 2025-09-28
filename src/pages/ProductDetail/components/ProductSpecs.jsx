import { 
  Box, 
  Container,
  Heading, 
  Text, 
  VStack, 
  HStack,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCheck, FiPackage, FiTool, FiInfo } from 'react-icons/fi';

const MotionBox = motion(Box);

const ProductSpecs = ({ product }) => {
  return (
    <Box width="100%" py={{ base: 8, md: 12 }}>
      <Container maxW="1400px" px={{ base: 4, md: 8 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <VStack spacing={8}>
            {/* Section Header */}
            <VStack spacing={2} textAlign="center">
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                color="white"
                fontWeight="800"
                letterSpacing="-0.02em"
              >
                Product Details
              </Heading>
              <Text color="gray.400" fontSize="md">
                Everything you need to know about this piece
              </Text>
            </VStack>

            {/* Desktop Tabs Layout */}
            <Box width="100%" display={{ base: 'none', md: 'block' }}>
              <Tabs variant="soft-rounded" colorScheme="cyan">
                <TabList justify="center" mb={8}>
                  <Tab color="gray.400" _selected={{ color: 'white', bg: product.color }}>
                    Materials & Construction
                  </Tab>
                  <Tab color="gray.400" _selected={{ color: 'white', bg: product.color }}>
                    Specifications
                  </Tab>
                  <Tab color="gray.400" _selected={{ color: 'white', bg: product.color }}>
                    Care Instructions
                  </Tab>
                </TabList>

                <TabPanels>
                  {/* Materials Tab */}
                  <TabPanel>
                    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={8}>
                      <GridItem>
                        <VStack align="start" spacing={4}>
                          <HStack spacing={3}>
                            <Box
                              p={2}
                              borderRadius="lg"
                              bg={`${product.color}15`}
                              color={product.color}
                            >
                              <FiPackage size={20} />
                            </Box>
                            <Heading size="md" color="white">
                              Materials Used
                            </Heading>
                          </HStack>
                          <List spacing={3}>
                            {product.materials.map((material, idx) => (
                              <ListItem key={idx} display="flex" alignItems="start">
                                <ListIcon 
                                  as={FiCheck} 
                                  color={product.color}
                                  mt={1}
                                  flexShrink={0}
                                />
                                <Text color="gray.300" fontSize="md" lineHeight="1.6">
                                  {material}
                                </Text>
                              </ListItem>
                            ))}
                          </List>
                        </VStack>
                      </GridItem>
                      
                      <GridItem>
                        <VStack align="start" spacing={4}>
                          <HStack spacing={3}>
                            <Box
                              p={2}
                              borderRadius="lg"
                              bg={`${product.color}15`}
                              color={product.color}
                            >
                              <FiTool size={20} />
                            </Box>
                            <Heading size="md" color="white">
                              Craftsmanship
                            </Heading>
                          </HStack>
                          <Text color="gray.300" fontSize="md" lineHeight="1.7">
                            Each piece is individually crafted by skilled artisans using traditional 
                            techniques combined with modern precision. Quality control ensures every 
                            item meets our exacting standards.
                          </Text>
                        </VStack>
                      </GridItem>
                    </Grid>
                  </TabPanel>

                  {/* Specifications Tab */}
                  <TabPanel>
                    <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={8}>
                      {product.dimensions && (
                        <GridItem>
                          <Box
                            p={6}
                            bg="rgba(255, 255, 255, 0.02)"
                            borderRadius="xl"
                            border="1px solid"
                            borderColor="whiteAlpha.100"
                          >
                            <VStack align="start" spacing={3}>
                              <Text color={product.color} fontWeight="600" fontSize="sm" textTransform="uppercase">
                                Dimensions & Weight
                              </Text>
                              <Text color="white" fontSize="lg" fontWeight="600">
                                {product.dimensions}
                              </Text>
                            </VStack>
                          </Box>
                        </GridItem>
                      )}
                      
                      {product.sizes && (
                        <GridItem>
                          <Box
                            p={6}
                            bg="rgba(255, 255, 255, 0.02)"
                            borderRadius="xl"
                            border="1px solid"
                            borderColor="whiteAlpha.100"
                          >
                            <VStack align="start" spacing={3}>
                              <Text color={product.color} fontWeight="600" fontSize="sm" textTransform="uppercase">
                                Available Sizes
                              </Text>
                              <HStack spacing={2} flexWrap="wrap">
                                {product.sizes.map((size, idx) => (
                                  <Box
                                    key={idx}
                                    px={3}
                                    py={1}
                                    bg={`${product.color}15`}
                                    color={product.color}
                                    borderRadius="md"
                                    fontSize="sm"
                                    fontWeight="600"
                                  >
                                    {size}
                                  </Box>
                                ))}
                              </HStack>
                            </VStack>
                          </Box>
                        </GridItem>
                      )}
                      
                      <GridItem>
                        <Box
                          p={6}
                          bg="rgba(255, 255, 255, 0.02)"
                          borderRadius="xl"
                          border="1px solid"
                          borderColor="whiteAlpha.100"
                        >
                          <VStack align="start" spacing={3}>
                            <Text color={product.color} fontWeight="600" fontSize="sm" textTransform="uppercase">
                              Category
                            </Text>
                            <Text color="white" fontSize="lg" fontWeight="600">
                              {product.category}
                            </Text>
                          </VStack>
                        </Box>
                      </GridItem>
                    </Grid>
                  </TabPanel>

                  {/* Care Instructions Tab */}
                  <TabPanel>
                    <VStack spacing={6} maxW="600px" mx="auto">
                      <HStack spacing={3}>
                        <Box
                          p={2}
                          borderRadius="lg"
                          bg={`${product.color}15`}
                          color={product.color}
                        >
                          <FiInfo size={20} />
                        </Box>
                        <Heading size="md" color="white">
                          Care & Maintenance
                        </Heading>
                      </HStack>
                      
                      <Text color="gray.300" fontSize="lg" lineHeight="1.7" textAlign="center">
                        {product.care}
                      </Text>
                      
                      <Box
                        p={4}
                        bg={`${product.color}08`}
                        borderRadius="lg"
                        border="1px solid"
                        borderColor={`${product.color}20`}
                      >
                        <Text color="gray.300" fontSize="sm" textAlign="center" fontStyle="italic">
                          Proper care ensures your piece will last for years to come and develop 
                          a beautiful patina with use.
                        </Text>
                      </Box>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>

            {/* Mobile Accordion Layout */}
            <Box width="100%" display={{ base: 'block', md: 'none' }}>
              <Accordion allowToggle>
                <AccordionItem border="none">
                  <AccordionButton
                    bg="rgba(255, 255, 255, 0.02)"
                    _hover={{ bg: 'rgba(255, 255, 255, 0.04)' }}
                    borderRadius="lg"
                    mb={2}
                  >
                    <Box flex="1" textAlign="left">
                      <Text color="white" fontWeight="600">Materials & Construction</Text>
                    </Box>
                    <AccordionIcon color={product.color} />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <VStack align="start" spacing={4}>
                      <List spacing={2}>
                        {product.materials.map((material, idx) => (
                          <ListItem key={idx} display="flex" alignItems="start">
                            <ListIcon 
                              as={FiCheck} 
                              color={product.color}
                              mt={1}
                              flexShrink={0}
                            />
                            <Text color="gray.300" fontSize="sm">
                              {material}
                            </Text>
                          </ListItem>
                        ))}
                      </List>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none">
                  <AccordionButton
                    bg="rgba(255, 255, 255, 0.02)"
                    _hover={{ bg: 'rgba(255, 255, 255, 0.04)' }}
                    borderRadius="lg"
                    mb={2}
                  >
                    <Box flex="1" textAlign="left">
                      <Text color="white" fontWeight="600">Specifications</Text>
                    </Box>
                    <AccordionIcon color={product.color} />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <VStack align="start" spacing={3}>
                      {product.dimensions && (
                        <Box>
                          <Text color={product.color} fontSize="sm" fontWeight="600" mb={1}>
                            Dimensions & Weight
                          </Text>
                          <Text color="gray.300" fontSize="sm">
                            {product.dimensions}
                          </Text>
                        </Box>
                      )}
                      {product.sizes && (
                        <Box>
                          <Text color={product.color} fontSize="sm" fontWeight="600" mb={2}>
                            Available Sizes
                          </Text>
                          <HStack spacing={2} flexWrap="wrap">
                            {product.sizes.map((size, idx) => (
                              <Box
                                key={idx}
                                px={2}
                                py={1}
                                bg={`${product.color}15`}
                                color={product.color}
                                borderRadius="md"
                                fontSize="xs"
                                fontWeight="600"
                              >
                                {size}
                              </Box>
                            ))}
                          </HStack>
                        </Box>
                      )}
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="none">
                  <AccordionButton
                    bg="rgba(255, 255, 255, 0.02)"
                    _hover={{ bg: 'rgba(255, 255, 255, 0.04)' }}
                    borderRadius="lg"
                  >
                    <Box flex="1" textAlign="left">
                      <Text color="white" fontWeight="600">Care Instructions</Text>
                    </Box>
                    <AccordionIcon color={product.color} />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Text color="gray.300" fontSize="sm" lineHeight="1.6">
                      {product.care}
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ProductSpecs;
