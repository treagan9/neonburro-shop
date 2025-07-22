// Services/components/ServicesCTA.jsx
import { Box, Container, Heading, Text, VStack, Button, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMessageCircle, FiZap } from 'react-icons/fi';

const MotionBox = motion(Box);

const ServicesCTA = () => {
  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Enhanced background effects */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="1000px"
        height="1000px"
        opacity={0.03}
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="accent.banana"
          filter="blur(150px)"
          opacity={0.8}
        />
        <Box
          position="absolute"
          bottom="0"
          right="0"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="brand.primary"
          filter="blur(150px)"
          opacity={0.8}
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="300px"
          height="300px"
          borderRadius="full"
          bg="accent.neon"
          filter="blur(120px)"
          opacity={0.6}
        />
      </Box>

      <Container maxW="900px" px={{ base: 4, md: 8 }} position="relative">
        <MotionBox
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box
            p={{ base: 8, md: 12 }}
            borderRadius="2xl"
            bg="rgba(255, 255, 255, 0.02)"
            backdropFilter="blur(20px)"
            border="2px solid"
            borderColor="rgba(255, 229, 0, 0.2)"
            position="relative"
            overflow="hidden"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
              borderColor: 'accent.bananaAlpha.30',
              boxShadow: '0 30px 60px rgba(255, 229, 0, 0.1)'
            }}
          >
            {/* Animated gradient overlay */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient="linear(135deg, accent.bananaAlpha.10, brand.primaryAlpha.10, accent.neonAlpha.10)"
              opacity={0.5}
              pointerEvents="none"
            />
            
            {/* Floating particles effect */}
            <Box
              position="absolute"
              top="-50%"
              left="-50%"
              width="200%"
              height="200%"
              pointerEvents="none"
            >
              {[...Array(3)].map((_, i) => (
                <Box
                  key={i}
                  position="absolute"
                  width="4px"
                  height="4px"
                  borderRadius="full"
                  bg="accent.banana"
                  opacity={0.3}
                  top={`${20 + i * 30}%`}
                  left={`${10 + i * 40}%`}
                  animation={`float ${3 + i}s ease-in-out infinite ${i * 0.5}s`}
                  sx={{
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translate(0, 0)' },
                      '50%': { transform: `translate(${20 + i * 10}px, ${-20 - i * 10}px)` }
                    }
                  }}
                />
              ))}
            </Box>

            <VStack spacing={8} textAlign="center" position="relative">
              {/* Enhanced Badge */}
              <MotionBox
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <HStack
                  spacing={2}
                  px={4}
                  py={2}
                  borderRadius="full"
                  bg="accent.bananaAlpha.20"
                  border="1px solid"
                  borderColor="accent.banana"
                  display="inline-flex"
                  boxShadow="0 0 20px rgba(255, 229, 0, 0.3)"
                >
                  <Box as={FiZap} color="accent.banana" size={14} />
                  <Text
                    color="accent.banana"
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="semibold"
                    letterSpacing="wider"
                    textTransform="uppercase"
                  >
                    Ready to elevate?
                  </Text>
                </HStack>
              </MotionBox>

              {/* Heading with better line height */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Heading
                  as="h2"
                  fontSize={{ base: "26px", sm: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight="extrabold"
                  color="text.primary"
                  lineHeight={{ base: "1.3", md: "1.2" }}
                  letterSpacing="tight"
                >
                  Let's Build Something
                  <Box 
                    as="span" 
                    display="block"
                    bgGradient="linear(to-r, accent.banana, brand.primary, accent.neon)"
                    bgClip="text"
                    mt={1}
                  >
                    Extraordinary Together
                  </Box>
                </Heading>
              </MotionBox>

              {/* Description */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Text
                  fontSize={{ base: "sm", md: "md", lg: "lg" }}
                  color="text.secondary"
                  maxW="600px"
                  mx="auto"
                  lineHeight="relaxed"
                >
                  Whether you're starting from scratch or ready to scale, 
                  we have the perfect solution for your digital needs.
                </Text>
              </MotionBox>

              {/* Enhanced CTA Buttons */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                width={{ base: "100%", sm: "auto" }}
              >
                <HStack 
                  spacing={4} 
                  flexDirection={{ base: "column", sm: "row" }}
                  width={{ base: "100%", sm: "auto" }}
                >
                  <Button
                    size="lg"
                    px={{ base: 8, md: 10 }}
                    py={{ base: 6, md: 7 }}
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="bold"
                    bg="accent.banana"
                    color="dark.black"
                    borderRadius="full"
                    rightIcon={<FiArrowRight />}
                    onClick={() => window.location.href = '/contact/'}
                    width={{ base: "100%", sm: "auto" }}
                    position="relative"
                    overflow="hidden"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      transition: 'left 0.5s',
                    }}
                    _hover={{
                      bg: 'accent.bananaDark',
                      transform: 'translateY(-2px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(255, 229, 0, 0.4)',
                      _before: {
                        left: '100%',
                      }
                    }}
                    _active={{
                      transform: 'scale(0.98)'
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    Start Your Project
                  </Button>
                  
                  <Button
                    size="lg"
                    px={{ base: 8, md: 10 }}
                    py={{ base: 6, md: 7 }}
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="semibold"
                    bg="transparent"
                    color="text.primary"
                    border="2px solid"
                    borderColor="rgba(255, 255, 255, 0.2)"
                    borderRadius="full"
                    leftIcon={<FiMessageCircle />}
                    onClick={() => window.location.href = '/contact/'}
                    width={{ base: "100%", sm: "auto" }}
                    _hover={{
                      borderColor: 'brand.primary',
                      color: 'brand.primary',
                      bg: 'brand.primaryAlpha.10',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 30px rgba(0, 229, 229, 0.3)'
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    Schedule Consultation
                  </Button>
                </HStack>
              </MotionBox>

              {/* Enhanced trust indicators */}
              <MotionBox
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <HStack
                  spacing={{ base: 3, md: 6 }}
                  justify="center"
                  flexWrap="wrap"
                  color="text.muted"
                  fontSize={{ base: "xs", md: "sm" }}
                  divider={
                    <Box 
                      width="4px" 
                      height="4px" 
                      borderRadius="full" 
                      bg="accent.banana"
                      opacity={0.5}
                    />
                  }
                >
                  <Text>Free consultation</Text>
                  <Text>No commitment</Text>
                  <Text color="accent.banana" fontWeight="semibold">
                    Response within 24 hours
                  </Text>
                </HStack>
              </MotionBox>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ServicesCTA;