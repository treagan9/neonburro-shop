// src/components/effects/MatrixRain.jsx
import { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';

const MatrixRain = ({ isActive = false, duration = 3000 }) => {
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      // Clear animation if not active
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create multiple rain streams with different properties
    const streams = [];
    const streamCount = Math.floor(canvas.width / 50); // Fewer streams for subtlety
    
    // Initialize streams
    for (let i = 0; i < streamCount; i++) {
      streams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height, // Start some off-screen
        speed: 0.1 + Math.random() * 0.3, // Very slow
        opacity: 0.02 + Math.random() * 0.03, // Extremely subtle
        length: Math.floor(Math.random() * 20) + 10, // Varying lengths
        chars: [],
        color: Math.random() > 0.7 ? 'cyan' : Math.random() > 0.5 ? 'purple' : 'green', // Mixed colors
        size: 8 + Math.floor(Math.random() * 4), // Varying sizes
        fadeSpeed: 0.98 + Math.random() * 0.02 // How fast characters fade
      });
      
      // Initialize characters for this stream
      for (let j = 0; j < streams[i].length; j++) {
        streams[i].chars.push({
          char: Math.random() > 0.5 ? '0' : '1',
          opacity: 0
        });
      }
    }

    // Color definitions
    const colors = {
      cyan: { r: 0, g: 255, b: 255 },
      purple: { r: 139, g: 92, b: 246 },
      green: { r: 0, g: 255, b: 65 }
    };

    // Track overall animation opacity for fade out
    let animationStartTime = Date.now();
    let globalOpacity = 1;

    function draw() {
      // Calculate fade out based on duration
      const elapsed = Date.now() - animationStartTime;
      if (elapsed > duration) {
        const fadeOutDuration = 1000; // 1 second fade out
        const fadeProgress = Math.min((elapsed - duration) / fadeOutDuration, 1);
        globalOpacity = 1 - fadeProgress;
        
        if (globalOpacity <= 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          // Clear the canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          return;
        }
      }

      // Very subtle fade effect for trails
      ctx.fillStyle = 'rgba(10, 10, 10, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      streams.forEach(stream => {
        const color = colors[stream.color];
        
        stream.chars.forEach((charObj, index) => {
          const y = stream.y - index * 15;
          
          // Only draw if on screen
          if (y > 0 && y < canvas.height) {
            // Calculate fade based on position in stream
            let fadeFactor = 1 - (index / stream.length);
            
            // Make the leading character brighter
            if (index === 0) {
              fadeFactor = 1;
              charObj.opacity = Math.min(charObj.opacity + 0.02, stream.opacity * 2);
            } else {
              charObj.opacity = Math.min(charObj.opacity + 0.01, stream.opacity * fadeFactor);
            }
            
            // Apply additional fade over time
            if (index > 0) {
              charObj.opacity *= stream.fadeSpeed;
            }
            
            // Apply global opacity for fade out
            const finalOpacity = charObj.opacity * globalOpacity;
            
            // Only draw if visible
            if (finalOpacity > 0.01) {
              ctx.font = `${stream.size}px monospace`;
              ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${finalOpacity})`;
              
              // Add subtle glow for leading characters
              if (index === 0 && charObj.opacity > stream.opacity) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.3 * globalOpacity})`;
              } else {
                ctx.shadowBlur = 0;
              }
              
              ctx.fillText(charObj.char, stream.x, y);
              
              // Occasionally change the character
              if (Math.random() > 0.98) {
                charObj.char = Math.random() > 0.5 ? '0' : '1';
              }
            }
          }
        });
        
        // Move stream down
        stream.y += stream.speed;
        
        // Reset stream when it goes off screen
        if (stream.y - stream.length * 15 > canvas.height) {
          stream.y = -stream.length * 15;
          stream.x = Math.random() * canvas.width;
          stream.speed = 0.1 + Math.random() * 0.3;
          stream.opacity = 0.02 + Math.random() * 0.03;
          
          // Reset character opacities
          stream.chars.forEach(charObj => {
            charObj.opacity = 0;
            charObj.char = Math.random() > 0.5 ? '0' : '1';
          });
          
          // Occasionally change color
          if (Math.random() > 0.8) {
            stream.color = Math.random() > 0.7 ? 'cyan' : Math.random() > 0.5 ? 'purple' : 'green';
          }
        }
      });
    }

    intervalRef.current = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive, duration]);

  // Don't render anything if not active
  if (!isActive) return null;

  return (
    <Box
      as="canvas"
      ref={canvasRef}
      id="matrix-canvas"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      pointerEvents="none"
      zIndex={-1} // Behind the modal
      opacity={0.6} // Slightly more visible for success celebration
      mixBlendMode="screen" // Blend mode for more ethereal effect
    />
  );
};

export default MatrixRain;