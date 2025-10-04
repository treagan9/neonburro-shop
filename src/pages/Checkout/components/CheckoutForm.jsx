import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Divider
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiLock, FiMail, FiUser, FiMapPin } from 'react-icons/fi';

const CheckoutForm = ({ onSubmit, isProcessing }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputStyles = {
    bg: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid',
    borderColor: 'whiteAlpha.200',
    color: 'white',
    _hover: { borderColor: 'whiteAlpha.300' },
    _focus: { 
      borderColor: '#00E5E5', 
      boxShadow: '0 0 0 1px #00E5E5' 
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={{ base: 6, md: 8 }}
      bg="rgba(255, 255, 255, 0.02)"
      borderRadius="2xl"
      border="1px solid"
      borderColor="whiteAlpha.100"
    >
      <VStack spacing={8} align="stretch">
        {/* Contact Information */}
        <VStack spacing={4} align="stretch">
          <HStack spacing={2} align="center">
            <FiUser color="#00E5E5" />
            <Heading size="md" color="white">Contact Information</Heading>
          </HStack>
          
          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel color="gray.400" fontSize="sm">First Name</FormLabel>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                {...inputStyles}
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel color="gray.400" fontSize="sm">Last Name</FormLabel>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                {...inputStyles}
              />
            </FormControl>
          </HStack>

          <FormControl isRequired>
            <FormLabel color="gray.400" fontSize="sm">Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              {...inputStyles}
            />
          </FormControl>

          <FormControl>
            <FormLabel color="gray.400" fontSize="sm">Phone</FormLabel>
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              {...inputStyles}
            />
          </FormControl>
        </VStack>

        <Divider borderColor="whiteAlpha.200" />

        {/* Shipping Address */}
        <VStack spacing={4} align="stretch">
          <HStack spacing={2} align="center">
            <FiMapPin color="#00E5E5" />
            <Heading size="md" color="white">Shipping Address</Heading>
          </HStack>

          <FormControl isRequired>
            <FormLabel color="gray.400" fontSize="sm">Street Address</FormLabel>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St"
              {...inputStyles}
            />
          </FormControl>

          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel color="gray.400" fontSize="sm">City</FormLabel>
              <Input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Ridgway"
                {...inputStyles}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.400" fontSize="sm">State</FormLabel>
              <Input
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="CO"
                {...inputStyles}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.400" fontSize="sm">ZIP</FormLabel>
              <Input
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="81432"
                {...inputStyles}
              />
            </FormControl>
          </HStack>

          <FormControl isRequired>
            <FormLabel color="gray.400" fontSize="sm">Country</FormLabel>
            <Select
              name="country"
              value={formData.country}
              onChange={handleChange}
              {...inputStyles}
            >
              <option value="United States" style={{ background: '#1A1A1A' }}>United States</option>
              <option value="Canada" style={{ background: '#1A1A1A' }}>Canada</option>
            </Select>
          </FormControl>
        </VStack>

        <Divider borderColor="whiteAlpha.200" />

        {/* Order Notes */}
        <VStack spacing={4} align="stretch">
          <Heading size="md" color="white">Order Notes (Optional)</Heading>
          <FormControl>
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Special instructions or gift message..."
              rows={4}
              {...inputStyles}
            />
          </FormControl>
        </VStack>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          height="56px"
          bg="#39FF14"
          color="black"
          fontWeight="700"
          fontSize="md"
          leftIcon={<FiLock />}
          isLoading={isProcessing}
          loadingText="Processing..."
          borderRadius="full"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 30px rgba(57, 255, 20, 0.4)'
          }}
          _active={{ transform: 'translateY(0)' }}
          transition="all 0.3s"
        >
          Place Order
        </Button>

        <Text color="gray.500" fontSize="sm" textAlign="center">
          By placing your order, you agree to our Terms & Conditions
        </Text>
      </VStack>
    </Box>
  );
};

export default CheckoutForm;
