import { 
  Box, 
  HStack, 
  VStack, 
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from 'react-icons/fi';

const MotionBox = motion(Box);

const ProductGallery = ({ images, productName }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const constraintsRef = useRef(null);

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevImage();
    } else if (info.offset.x < -threshold) {
      nextImage();
    }
    setIsDragging(false);
  };

  // Touch/swipe handling for mobile
  const handleTouchStart = useRef(null);
  const handleTouchMove = useRef(null);

  const onTouchStart = (e) => {
    handleTouchStart.current = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    if (!handleTouchStart.current) return;
    handleTouchMove.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!handleTouchStart.current || !handleTouchMove.current) return;
    
    const diff = handleTouchStart.current - handleTouchMove.current;
    const threshold = 50;

    if (diff > threshold) {
      nextImage();
    } else if (diff < -threshold) {
      prevImage();
    }

    handleTouchStart.current = null;
    handleTouchMove.current = null;
  };

  return (
    <Box width="100%">
      <VStack spacing={4}>
        {/* Single Image Frame with Navigation */}
        <Box
          ref={constraintsRef}
          width="100%"
          maxW="800px"
          position="relative"
          borderRadius="2xl"
          overflow="hidden"
          bg="black"
          aspectRatio={4/3}
          cursor="pointer"
          onClick={onOpen}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          _hover={{
            '& .gallery-overlay': {
              opacity: 1
            },
            '& .nav-buttons': {
              opacity: 1
            }
          }}
        >
          {/* Image Container */}
          <AnimatePresence mode="wait">
            <MotionBox
              key={activeImage}
              width="100%"
              height="100%"
              position="relative"
              drag="x"
              dragConstraints={constraintsRef}
              dragElastic={0.2}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image placeholder with enhanced styling */}
              <Box
                width="100%"
                height="100%"
                bg={`linear-gradient(135deg, #00E5E5 08 0%, #00E5E5 03 50%, transparent 100%)`}
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
              >
                <Text 
                  fontSize="12xl" 
                  opacity={0.08} 
                  color="#00E5E5"
                  fontWeight="800"
                  fontFamily="mono"
                  userSelect="none"
                >
                  {productName.charAt(0)}
                </Text>
                
                {/* Grid pattern */}
                <Box
                  position="absolute"
                  inset={0}
                  opacity={0.02}
                  backgroundImage="repeating-linear-gradient(0deg, #00E5E5, #00E5E5 1px, transparent 1px, transparent 25px)"
                />
              </Box>
            </MotionBox>
          </AnimatePresence>

          {/* Hover overlay */}
          <Box
            className="gallery-overlay"
            position="absolute"
            inset={0}
            bg="blackAlpha.400"
            display="flex"
            alignItems="center"
            justifyContent="center"
            opacity={0}
            transition="opacity 0.3s"
            pointerEvents="none"
          >
            <Box
              bg="blackAlpha.700"
              p={3}
              borderRadius="full"
              border="1px solid"
              borderColor="whiteAlpha.300"
            >
              <FiMaximize2 size={20} color="white" />
            </Box>
          </Box>

          {/* Navigation arrows - only show if multiple images */}
          {images.length > 1 && (
            <HStack
              className="nav-buttons"
              position="absolute"
              inset={0}
              justify="space-between"
              align="center"
              px={4}
              opacity={0}
              transition="opacity 0.3s"
              pointerEvents="none"
            >
              <IconButton
                icon={<FiChevronLeft />}
                variant="ghost"
                color="white"
                bg="blackAlpha.700"
                _hover={{ bg: 'blackAlpha.800', transform: 'scale(1.1)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                size="lg"
                borderRadius="full"
                pointerEvents="auto"
                border="1px solid"
                borderColor="whiteAlpha.300"
              />
              <IconButton
                icon={<FiChevronRight />}
                variant="ghost"
                color="white"
                bg="blackAlpha.700"
                _hover={{ bg: 'blackAlpha.800', transform: 'scale(1.1)' }}
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                size="lg"
                borderRadius="full"
                pointerEvents="auto"
                border="1px solid"
                borderColor="whiteAlpha.300"
              />
            </HStack>
          )}

          {/* Image counter and dots */}
          {images.length > 1 && (
            <VStack
              position="absolute"
              bottom={4}
              left="50%"
              transform="translateX(-50%)"
              spacing={2}
            >
              {/* Dots indicator */}
              <HStack spacing={1}>
                {images.map((_, index) => (
                  <Box
                    key={index}
                    w={activeImage === index ? "8px" : "6px"}
                    h={activeImage === index ? "8px" : "6px"}
                    borderRadius="full"
                    bg={activeImage === index ? "#00E5E5" : "whiteAlpha.500"}
                    transition="all 0.3s"
                    cursor="pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage(index);
                    }}
                  />
                ))}
              </HStack>
              
              {/* Counter */}
              <Box
                bg="blackAlpha.700"
                color="white"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
                fontWeight="600"
                border="1px solid"
                borderColor="whiteAlpha.300"
              >
                {activeImage + 1} / {images.length}
              </Box>
            </VStack>
          )}
        </Box>

        {/* Swipe hint for mobile */}
        {images.length > 1 && (
          <Text
            color="gray.500"
            fontSize="sm"
            textAlign="center"
            display={{ base: 'block', md: 'none' }}
          >
            Swipe to see more images
          </Text>
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
            bg="blackAlpha.700"
            _hover={{ bg: 'blackAlpha.800' }}
          />
          <ModalBody p={0} display="flex" alignItems="center" justifyContent="center">
            <Box
              position="relative"
              maxW="90vw"
              maxH="90vh"
              width="100%"
              aspectRatio={4/3}
            >
              {/* Fullscreen image */}
              <AnimatePresence mode="wait">
                <MotionBox
                  key={`fullscreen-${activeImage}`}
                  width="100%"
                  height="100%"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
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
                    <Text 
                      fontSize="20xl" 
                      opacity={0.1} 
                      color="#00E5E5"
                      fontWeight="800"
                      fontFamily="mono"
                    >
                      {productName.charAt(0)}
                    </Text>
                  </Box>
                </MotionBox>
              </AnimatePresence>

              {/* Fullscreen navigation */}
              {images.length > 1 && (
                <HStack
                  position="absolute"
                  inset={0}
                  justify="space-between"
                  align="center"
                  px={4}
                >
                  <IconButton
                    icon={<FiChevronLeft />}
                    variant="ghost"
                    color="white"
                    bg="blackAlpha.700"
                    _hover={{ bg: 'blackAlpha.800' }}
                    onClick={prevImage}
                    size="lg"
                    borderRadius="full"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                  />
                  <IconButton
                    icon={<FiChevronRight />}
                    variant="ghost"
                    color="white"
                    bg="blackAlpha.700"
                    _hover={{ bg: 'blackAlpha.800' }}
                    onClick={nextImage}
                    size="lg"
                    borderRadius="full"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
                  />
                </HStack>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductGallery;
