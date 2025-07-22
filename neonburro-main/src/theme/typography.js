// theme/typography.js
export const typography = {
    fonts: {
      heading: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace"
    },
    fontSizes: {
      // Exact pixel values for precision
      '2xs': '10px',
      'xs': '12px',
      'sm': '14px',
      'md': '16px',
      'lg': '18px',
      'xl': '20px',
      '2xl': '24px',
      '26px': '26px', // Custom size for better mobile headings
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
      '7xl': '72px',
      '8xl': '96px',
      
      // Semantic sizes for different contexts
      hero: {
        h1: { base: "3xl", sm: "4xl", md: "5xl", lg: "6xl", xl: "7xl" }
      },
      section: {
        h2: { base: "26px", sm: "3xl", md: "4xl", lg: "5xl" }
      },
      subsection: {
        h3: { base: "xl", md: "2xl", lg: "3xl" }
      },
      body: {
        lg: { base: "md", md: "lg" },
        md: { base: "sm", md: "md" },
        sm: { base: "xs", md: "sm" }
      },
      label: {
        uppercase: { base: "2xs", md: "xs" }
      }
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    lineHeights: {
      none: 1,
      tight: 1.1,
      snug: 1.2,
      normal: 1.3,
      base: 1.5,
      relaxed: 1.7,
      loose: 2
    },
    letterSpacings: {
      tighter: "-0.05em",
      tight: "-0.02em",
      normal: "0",
      wide: "0.05em",
      wider: "0.1em",
      widest: "0.2em"
    }
  };
  
  export default typography;