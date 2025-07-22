import { Box, Container, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Heading, Text, HStack, Button, Grid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiClock, FiTool, FiUsers, FiCode, FiTrendingUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const FAQSection = () => {
  const navigate = useNavigate();
  
  // Theme colors
  const colors = {
    brand: {
      primary: '#00E5E5',
    },
    accent: {
      neon: '#39FF14',
      warm: '#FF6B00',
    },
    dark: {
      black: '#0A0A0A',
    }
  };

  const faqCategories = [
    {
      title: 'Pricing & Payment',
      icon: FiDollarSign,
      color: colors.brand.primary,
      questions: [
        {
          q: 'How much does a typical website cost?',
          a: 'Our starter packages begin at $199 for initial consultation and strategy. Full website projects typically range from $2,500 to $15,000+ depending on complexity, features, and scale. We also offer hourly packages starting at $44/hour for ongoing work or you may find a promo hidden in a digital pocket somewhere.'
        },
        {
          q: 'Do you offer payment plans?',
          a: 'Absolutely! We typically work with a 50% deposit to start, with the remainder due at launch. For larger projects, we can arrange monthly payment plans. We want to make great web design accessible to businesses of all sizes.'
        },
        {
          q: 'What\'s included in the hourly packages?',
          a: 'Our "Fuel Up" hours can be used for anything: updates, new features, content changes, maintenance, consultations, or ongoing development. Buy hours in bulk and use them as needed - they never expire!'
        },
        {
          q: 'Are there any hidden fees?',
          a: 'Never. We believe in complete transparency. Our quotes include everything discussed in the project scope. Third-party costs (hosting, domains, premium plugins) are clearly outlined upfront.'
        }
      ]
    },
    {
      title: 'Process & Timeline',
      icon: FiClock,
      color: colors.accent.neon,
      questions: [
        {
          q: 'How long does a typical project take?',
          a: 'Most websites launch within 4-8 weeks from kickoff. Simple sites can be done in 2-3 weeks, while complex e-commerce or custom applications may take 3-4 months. We\'ll give you a realistic timeline during consultation.'
        },
        {
          q: 'What\'s your design process?',
          a: 'We follow a proven 5-step process: Discovery (understanding your needs), Design (creating the visual direction), Development (building the site), Launch (going live), and Iterate (ongoing improvements based on real data).'
        },
        {
          q: 'How involved do I need to be?',
          a: 'As much or as little as you want! At minimum, we need your input during discovery and feedback on designs. Some clients love weekly check-ins, others prefer to let us run with it. You set the pace.'
        },
        {
          q: 'Can you work with our existing brand guidelines?',
          a: 'Absolutely! We love working within established brand systems. If you don\'t have guidelines yet, we can help create them as part of the project.'
        }
      ]
    },
    {
      title: 'Technical Stuff',
      icon: FiCode,
      color: colors.accent.warm,
      questions: [
        {
          q: 'What technologies do you use?',
          a: 'We\'re platform agnostic but specialize in modern frameworks like React, Next.js, and Vue. For simpler sites, we might use WordPress or Webflow. We always choose the best tool for your specific needs and budget.'
        },
        {
          q: 'Will my site be mobile-friendly?',
          a: 'Every single site we build is mobile-first responsive. With over 60% of web traffic on mobile devices, it\'s not optional - it\'s essential. Your site will look amazing on everything from phones to ultrawide monitors.'
        },
        {
          q: 'Do you handle hosting and maintenance?',
          a: 'We can! We offer managed hosting starting at $29/month, which includes updates, backups, and basic maintenance. Or we can deploy to your preferred hosting provider and hand over the keys.'
        },
        {
          q: 'Is SEO included?',
          a: 'Basic on-page SEO is included in every project: meta tags, schema markup, sitemap, and performance optimization. For ongoing SEO strategy and content marketing, we offer additional packages.'
        }
      ]
    },
    {
      title: 'Working Together',
      icon: FiUsers,
      color: colors.brand.primary,
      questions: [
        {
          q: 'Do you work with clients outside Colorado?',
          a: 'Yes! While we love our Ridgway neighbors, we work with clients globally. Most of our communication happens via video calls, Slack, and email anyway. Distance is no barrier to great design.'
        },
        {
          q: 'What if I don\'t like the design?',
          a: 'That\'s what revisions are for! Our process includes multiple feedback rounds. We won\'t move forward until you\'re thrilled with the direction. If we\'re really not clicking, we\'ll part ways amicably with a fair kill fee.'
        },
        {
          q: 'Can you help with content creation?',
          a: 'Definitely! We have talented copywriters and content strategists on the team. Whether you need punchy headlines, compelling product descriptions, or an entire content strategy, we\'ve got you covered.'
        },
        {
          q: 'Do you sign NDAs?',
          a: 'Of course. We\'re happy to sign your NDA or provide our standard confidentiality agreement. Your ideas and business information are always safe with us.'
        }
      ]
    }
  ];

  return (
    <Box 
      position="relative" 
      py={{ base: 16, md: 20 }} 
      bg={colors.dark.black}
    >
      <Container maxW="1200px" px={{ base: 6, md: 8 }}>
        <VStack spacing={16}>
          {/* Categories */}
          {faqCategories.map((category, categoryIndex) => (
            <MotionBox
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              width="100%"
            >
              <VStack spacing={8} align="start">
                {/* Category Header */}
                <HStack spacing={3}>
                  <Box
                    p={2}
                    borderRadius="lg"
                    bg={`${category.color}22`}
                    color={category.color}
                  >
                    <category.icon size={24} />
                  </Box>
                  <Heading
                    as="h2"
                    fontSize="2xl"
                    color="white"
                    fontWeight="600"
                  >
                    {category.title}
                  </Heading>
                </HStack>

                {/* Questions */}
                <Accordion allowToggle width="100%">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      border="none"
                      mb={4}
                    >
                      <AccordionButton
                        p={6}
                        bg="rgba(255,255,255,0.02)"
                        borderRadius="xl"
                        border="2px solid"
                        borderColor="whiteAlpha.100"
                        _hover={{
                          bg: 'rgba(255,255,255,0.05)',
                          borderColor: category.color + '44'
                        }}
                        _expanded={{
                          bg: 'rgba(255,255,255,0.05)',
                          borderColor: category.color,
                          borderBottomRadius: 0
                        }}
                        transition="all 0.3s"
                      >
                        <Box flex="1" textAlign="left">
                          <Text
                            color="white"
                            fontSize="lg"
                            fontWeight="600"
                          >
                            {faq.q}
                          </Text>
                        </Box>
                        <AccordionIcon color={category.color} />
                      </AccordionButton>
                      <AccordionPanel
                        p={6}
                        bg="rgba(255,255,255,0.02)"
                        borderRadius="0 0 xl xl"
                        border="2px solid"
                        borderTop="none"
                        borderColor={category.color}
                        color="gray.300"
                        fontSize="md"
                        lineHeight="1.7"
                      >
                        {faq.a}
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </VStack>
            </MotionBox>
          ))}

          {/* CTA Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            width="100%"
            textAlign="center"
            pt={8}
          >
            <VStack spacing={6}>
              <Heading
                fontSize="2xl"
                color="white"
              >
                Still have questions?
              </Heading>
              <Text
                color="gray.300"
                fontSize="lg"
                maxW="600px"
              >
                We're here to help. Reach out anytime and we'll happily answer your 
                questions or jump on a quick call.
              </Text>
              <HStack spacing={4}>
                <Button
                  size="lg"
                  bg={colors.brand.primary}
                  color={colors.dark.black}
                  borderRadius="full"
                  px={8}
                  fontWeight="600"
                  onClick={() => navigate('/contact')}
                  _hover={{
                    bg: colors.brand.primary,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 10px 30px ${colors.brand.primary}66`
                  }}
                  transition="all 0.3s"
                >
                  Get in Touch
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="whiteAlpha.300"
                  color="white"
                  borderRadius="full"
                  px={8}
                  fontWeight="600"
                  onClick={() => navigate('/services')}
                  _hover={{
                    borderColor: colors.brand.primary,
                    color: colors.brand.primary,
                    bg: 'whiteAlpha.50'
                  }}
                  transition="all 0.3s"
                >
                  View Services
                </Button>
              </HStack>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default FAQSection;
