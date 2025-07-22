import { Box, Container, HStack, Link, Text, Icon, Badge } from '@chakra-ui/react';
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const MotionBox = motion(Box);

const ShopNavigation = () => {
  const { getCartItemsCount, setIsOpen } = useCart();
  const itemCount = getCartItemsCount();

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bg="rgba(10, 10, 10, 0.8)"
      backdropFilter="blur(20px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
      zIndex={1000}
      height="70px"
    >
      <Container maxW="1200px" height="100%">
        <HStack justify="space-between" align="center" height="100%">
          {/* Back to Main Site */}
          <MotionBox
            whileHover={{ x: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="https://neonburro.com"
              display="flex"
              alignItems="center"
              gap={2}
              color="gray.400"
              _hover={{ color: 'white', textDecoration: 'none' }}
              fontWeight="500"
              fontSize="sm"
            >
              <Icon as={FiArrowLeft} />
              <Text>Back to NEONBURRO</Text>
            </Link>
          </MotionBox>

          {/* Cart Icon */}
          <MotionBox
            position="relative"
            cursor="pointer"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon
              as={FiShoppingBag}
              boxSize={6}
              color="white"
              _hover={{ color: '#00D9FF' }}
              transition="color 0.2s"
            />
            {itemCount > 0 && (
              <Badge
                position="absolute"
                top="-8px"
                right="-8px"
                bg="#00D9FF"
                color="black"
                borderRadius="full"
                minW="20px"
                height="20px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xs"
                fontWeight="700"
              >
                {itemCount}
              </Badge>
            )}
          </MotionBox>
        </HStack>
      </Container>
    </Box>
  );
};

export default ShopNavigation;
