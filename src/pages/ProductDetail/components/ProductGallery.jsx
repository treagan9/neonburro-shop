import { 
  Box, 
  HStack, 
  VStack, 
  Image, 
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';

const MotionBox = motion(Box);

const ProductGallery = ({ images, productName }) => {
  const [activeImage, setActiveImage] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Box width="100%">
      <VStack spacing={6}>
        {/* Main Image Display */}
        <MotionBox
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          width="100%"
          maxW="800px"
          position="relative"
        >
          <Box
            position="relative"
            borderRadius="2xl"
            overflow="hidden"
            bg="black"
            aspectRatio={4/3}
            cursor="pointer"
            onClick={onOpen}
            _hover={{
              '& .gallery-overlay': {
                opacity: 1
              }
            }}
          >
            {/* Image placeholder with enhanced styling */}
            <Box
              width="100%"
              height="100%"
              bg="linear-gradient(135deg, #00E5E5 08 0%, #00E5E5 03 50%, transparent 100%)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              <Box
                fontSize="12xl"
                opacity={0.08}
                color="#00E5E5"
                fontWeight="800"
                fontFamily="mono"
              >
                {productName.charAt(0)}
              </Box>
              
              {/* Grid pattern */}
              <Box
                position="absolute"
                inset={0}
                opacity={0.02}
                backgroundImage="repeating-linear-gradient(0deg, #00E5E5, #00E5E5 1px, transparent 1px, transparent 25px)"
              />
            </Box>

            {/* Hover overlay */}
            <Box
              className="gallery-overlay"
              position="absolute"
              inset={0}
              bg="blackAlpha.600"
              display="flex"
              alignItems="center"
              justifyContent="center"
              opacity={0}
              transition="opacity 0.3s"
            >
              <IconButton
                icon={<FiMaximize2 />}
                variant="ghost"
                color="white"
                size="lg"
                _hover={{ bg: 'whiteAlpha.200' }}
              />
            </Box>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <IconButton
                  icon={<FiChevronLeft />}
                  position="absolute"
                  left={4}
                  top="50%"
                  transform="translateY(-50%)"
                  variant="ghost"
                  color="white"
                  bg="blackAlpha.600"
                  _hover={{ bg: 'blackAlpha.800' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  size="lg"
                />
                <IconButton
                  icon={<FiChevronRight />}
                  position="absolute"
                  right={4}
                  top="50%"
                  transform="translateY(-50%)"
                  variant="ghost"
                  color="white"
                  bg="blackAlpha.600"
                  _hover={{ bg: 'blackAlpha.800' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  size="lg"
                />
              </>
            )}

            {/* Image counter */}
            {images.length > 1 && (
              <Box
                position="absolute"
                bottom={4}
                right={4}
                bg="blackAlpha.700"
                color="white"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
                fontWeight="600"
              >
                {activeImage + 1} / {images.length}
              </Box>
            )}
          </Box>
        </MotionBox>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            width="100%"
            maxW="800px"
          >
            <HStack spacing={3} justify="center" flexWrap="wrap">
              {images.map((image, index) => (
                <Box
                  key={index}
                  width="80px"
                  height="80px"
                  borderRadius="lg"
                  overflow="hidden"
                  cursor="pointer"
                  border="2px solid"
                  borderColor={activeImage === index ? "#00E5E5" : "transparent"}
                  transition="all 0.3s"
                  _hover={{
                    borderColor: "#00E5E5",
                    transform: 'scale(1.05)'
                  }}
                  onClick={() => setActiveImage(index)}
                >
                  {/* Thumbnail placeholder */}
                  <Box
                    width="100%"
                    height="100%"
                    bg="linear-gradient(135deg, #00E5E5 15 0%, transparent 100%)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    opacity={activeImage === index ? 1 : 0.6}
                    transition="opacity 0.3s"
                  >
                    <Box
                      fontSize="lg"
                      color="#00E5E5"
                      fontWeight="800"
                      opacity={0.5}
                    >
                      {index + 1}
                    </Box>
                  </Box>
                </Box>
              ))}
            </HStack>
          </MotionBox>
        )}
      </VStack>

      {/* Fullscreen Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent bg="transparent" overflow="hidden">
          <ModalCloseButton
            color="white"
            size="lg"
            top={4}
            right={4}
            zIndex={10}
          />
          <ModalBody p={0} display="flex" alignItems="center" justifyContent="center">
            <Box
              position="relative"
              maxW="90vw"
              maxH="90vh"
              width="100%"
              aspectRatio={4/3}
            >
              {/* Fullscreen image placeholder */}
              <Box
                width="100%"
                height="100%"
                bg="black"
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
              >
                <Box
                  fontSize="20xl"
                  opacity={0.1}
                  color="#00E5E5"
                  fontWeight="800"
                  fontFamily="mono"
                >
                  {productName.charAt(0)}
                </Box>
              </Box>

              {/* Fullscreen navigation */}
              {images.length > 1 && (
                <>
                  <IconButton
                    icon={<FiChevronLeft />}
                    position="absolute"
                    left={4}
                    top="50%"
                    transform="translateY(-50%)"
                    variant="ghost"
                    color="white"
                    bg="blackAlpha.600"
                    _hover={{ bg: 'blackAlpha.800' }}
                    onClick={prevImage}
                    size="lg"
                  />
                  <IconButton
                    icon={<FiChevronRight />}
                    position="absolute"
                    right={4}
                    top="50%"
                    transform="translateY(-50%)"
                    variant="ghost"
                    color="white"
                    bg="blackAlpha.600"
                    _hover={{ bg: 'blackAlpha.800' }}
                    onClick={nextImage}
                    size="lg"
                  />
                </>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductGallery;
