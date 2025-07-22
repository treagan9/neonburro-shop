// Services/components/EnhancementMenu.jsx
import { Box, Container, Heading, Text, VStack, HStack, Grid, Button, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiSearch, FiMail, FiBarChart, FiShield, FiGlobe, FiSmartphone, FiZap, FiPlus } from 'react-icons/fi';

const MotionBox = motion(Box);

const EnhancementMenu = () => {
  const enhancements = [
    {
      icon: FiShoppingCart,
      title: 'E-commerce Integration',
      description: 'Full shopping cart, payment processing, inventory management',
      features: ['Stripe/PayPal integration', 'Inventory tracking', 'Order management'],
      color: 'brand.primary',
      glow: 'cyan',
      popular: true
    },
    {
      icon: FiSearch,
      title: 'Advanced SEO',
      description: 'Technical SEO, schema markup, local SEO optimization',
      features: ['Schema markup', 'Local listings', 'Performance optimization'],
      color: 'accent.neon',
      glow: 'neon'
    },
    {
      icon: FiMail,
      title: 'Email Marketing',
      description: 'Newsletter setup, automation, campaign templates',
      features: ['Mailchimp/Klaviyo', 'Automation flows', 'Custom templates'],
      color: 'accent.banana',
      glow: 'banana'
    },
    {
      icon: FiBarChart,
      title: 'Analytics Dashboard',
      description: 'Custom analytics, conversion tracking, reporting',
      features: ['Google Analytics 4', 'Custom dashboards', 'Monthly reports'],
      color: 'accent.purple',
      glow: 'purple'
    },
    {
      icon: FiShield,
      title: 'Enhanced Security',
      description: 'SSL, firewall, malware protection, security audits',
      features: ['SSL certificate', 'Web firewall', 'Daily backups'],
      color: 'accent.warm',
      glow: 'warm'
    },
    {
      icon: FiGlobe,
      title: 'Multi-language',
      description: 'Full site translation, language switcher, SEO per language',
      features: ['Professional translation', 'Language switcher', 'Localized SEO'],
      color: 'brand.primary',
      glow: 'cyan'
    },
    {
      icon: FiSmartphone,
      title: 'Progressive Web App',
      description: 'Offline functionality, push notifications, app-like experience',
      features: ['Offline mode', 'Push notifications', 'App install prompt'],
      color: 'accent.banana',
      glow: 'banana'
    },
    {
      icon: FiZap,
      title: 'Performance Boost',
      description: 'Speed optimization, CDN setup, image optimization',
      features: ['CDN setup', 'Image optimization', 'Core Web Vitals'],
      color: 'accent.neon',
      glow: 'neon'
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg="dark.black"
      overflow="hidden"
    >
      {/* Enhanced background gradient */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.04}
      >
        <Box
          position="absolute"
          top="20%"
          right="10%"
          width="500px"
          height="500px"
          borderRadius="full"
          bg="accent.banana"
          filter="blur(150px)"
          opacity={0.3}
        />
        <Box
          position="absolute"
          bottom="20%"
          left="10%"
          width="400px"
          height="400px"
          borderRadius="full"
          bg="accent.purple"
          filter="blur(150px)"
          opacity={0.3}
        />
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
              <HStack
                spacing={2}
                px={4}
                py={2}
                borderRadius="full"
                bg="accent.bananaAlpha.10"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="accent.bananaAlpha.20"
              >
                <FiPlus size={14} color="var(--chakra-colors-accent-banana)" />
                <Text 
                  color="accent.banana"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight="semibold"
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  Enhancement Menu
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
                color="text.primary"
                lineHeight={{ base: "1.3", md: "1.2" }}
                letterSpacing="tight"
              >
                Power-Ups for Your{' '}
                <Box
                  as="span"
                  bgGradient="linear(to-r, accent.banana, accent.neon)"
                  bgClip="text"
                >
                  Project
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
                color="text.secondary"
                maxW="600px"
                mx="auto"
                lineHeight="relaxed"
              >
                Add these features to any package. Mix and match to build your perfect solution.
              </Text>
            </MotionBox>
          </VStack>

          {/* Enhancement Grid */}
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={{ base: 4, md: 5 }}
            width="100%"
          >
            {enhancements.map((enhancement, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                position="relative"
              >
                {enhancement.popular && (
                  <Badge
                    position="absolute"
                    top="-10px"
                    left="50%"
                    transform="translateX(-50%)"
                    bg="accent.banana"
                    color="dark.black"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="2xs"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    zIndex={1}
                  >
                    Most Popular
                  </Badge>
                )}
                
                <Box
                  p={{ base: 5, md: 6 }}
                  borderRadius="xl"
                  bg="ui.glass.light"
                  backdropFilter="blur(20px)"
                  border="2px solid"
                  borderColor="ui.border"
                  height="100%"
                  cursor="pointer"
                  position="relative"
                  overflow="hidden"
                  role="group"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    borderColor: enhancement.color,
                    bg: 'ui.glass.medium',
                    boxShadow: `effects.glow.${enhancement.glow}`,
                    '& .enhancement-icon': {
                      transform: 'scale(1.15) rotate(5deg)',
                      color: enhancement.color
                    },
                    '& .plus-icon': {
                      opacity: 1,
                      transform: 'scale(1) rotate(90deg)'
                    }
                  }}
                >
                  {/* Dynamic glow effect */}
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    width="150%"
                    height="150%"
                    bg={`radial-gradient(circle, ${enhancement.color}15 0%, transparent 60%)`}
                    opacity={0}
                    _groupHover={{ opacity: 1 }}
                    transition="opacity 0.5s"
                    pointerEvents="none"
                  />
                  
                  <VStack align="start" spacing={4} position="relative">
                    {/* Icon with background */}
                    <Box
                      p={2.5}
                      borderRadius="lg"
                      bg={`${enhancement.color}11`}
                      position="relative"
                    >
                      <Box
                        className="enhancement-icon"
                        as={enhancement.icon}
                        w={{ base: 5, md: 6 }}
                        h={{ base: 5, md: 6 }}
                        color="text.muted"
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                      />
                    </Box>

                    {/* Title */}
                    <Heading
                      as="h3"
                      fontSize={{ base: "md", md: "lg" }}
                      color="text.primary"
                      fontWeight="bold"
                      lineHeight="tight"
                    >
                      {enhancement.title}
                    </Heading>

                    {/* Description */}
                    <Text
                      color="text.secondary"
                      fontSize={{ base: "xs", md: "sm" }}
                      lineHeight="snug"
                    >
                      {enhancement.description}
                    </Text>

                    {/* Features with better styling */}
                    <VStack align="start" spacing={1.5} mt="auto" width="100%">
                      {enhancement.features.map((feature, idx) => (
                        <HStack key={idx} spacing={2} align="start">
                          <Box
                            w={1}
                            h={1}
                            borderRadius="full"
                            bg={enhancement.color}
                            mt={1.5}
                            flexShrink={0}
                          />
                          <Text
                            color="text.muted"
                            fontSize="xs"
                            lineHeight="snug"
                          >
                            {feature}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>

                  {/* Plus icon in corner */}
                  <Box
                    className="plus-icon"
                    position="absolute"
                    top={3}
                    right={3}
                    p={1.5}
                    borderRadius="full"
                    bg={`${enhancement.color}22`}
                    color={enhancement.color}
                    opacity={0}
                    transform="scale(0) rotate(0deg)"
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    <FiPlus size={14} />
                  </Box>
                </Box>
              </MotionBox>
            ))}
          </Grid>

          {/* CTA Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            textAlign="center"
          >
            <VStack spacing={6}>
              <Text 
                color="text.secondary" 
                fontSize={{ base: "sm", md: "md" }}
              >
                Need something specific? We build custom features too.
              </Text>
              
              <Button
                size="lg"
                px={{ base: 8, md: 10 }}
                py={{ base: 6, md: 7 }}
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="bold"
                bgGradient="linear(to-r, accent.banana, accent.neon)"
                color="dark.black"
                borderRadius="full"
                position="relative"
                overflow="hidden"
                onClick={() => window.location.href = '/contact/'}
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  bgGradient: 'linear(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                  transition: 'left 0.5s'
                }}
                _hover={{
                  transform: 'translateY(-2px) scale(1.05)',
                  boxShadow: '0 20px 40px rgba(255, 229, 0, 0.4)',
                  _before: {
                    left: '100%'
                  }
                }}
                _active={{
                  transform: 'translateY(0) scale(0.98)'
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                Discuss Your Needs
              </Button>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default EnhancementMenu;