# NeonBurro Sound Assets

## Directory Structure

### `/ambient/`
Background atmosphere sounds (loop these)
- `mountain-night.mp3` - Base mountain ambiance with wind
- `hot-springs-bubbling.mp3` - Gentle water bubbling
- `digital-saloon-ambiance.mp3` - Bar chatter, glasses, pool balls
- `stackhouse-ambiance.mp3` - Keyboards, coffee, productivity sounds
- `dev-zen-ambiance.mp3` - Water, meditation bowls, peaceful
- `lazy-river-flow.mp3` - Gentle water movement

### `/ui/`
Interface interaction sounds
- `hover-soft.mp3` - Gentle hover sound for navigation
- `click-confirm.mp3` - Satisfying click for selections
- `neon-flicker.mp3` - Neon sign activation
- `transition-whoosh.mp3` - Scene transition sound
- `modal-open.mp3` - Modal/popup appearance
- `modal-close.mp3` - Modal/popup dismissal
- `success-chime.mp3` - Action completion
- `error-buzz.mp3` - Error/denied access

### `/locations/`
Location-specific signature sounds
- `stackhouse-door.mp3` - Automatic sliding door
- `saloon-doors.mp3` - Western swinging doors
- `zen-gong.mp3` - Entry to meditation space
- `hot-spring-splash.mp3` - Entering water
- `elevator-ding.mp3` - Level changes

### `/characters/`
Character voice lines and effects
- `burro-greeting-1.mp3` - "Welcome to the valley"
- `burro-greeting-2.mp3` - "What'll it be, partner?"
- `burro-greeting-3.mp3` - "Code's compiling, how about a drink?"
- `burro-laugh.mp3` - Friendly chuckle
- `burro-pour.mp3` - Pouring a drink

## Sound Design Guidelines

### Technical Specs
- Format: MP3 or OGG for web
- Bitrate: 128kbps for effects, 192kbps for ambient
- Sample Rate: 44.1kHz
- Normalize to -3dB peak
- Keep UI sounds under 1 second
- Ambient loops: 30-60 seconds minimum

### Volume Levels
- Ambient: 20-30% volume (0.2-0.3)
- UI sounds: 30-50% volume (0.3-0.5)
- Character voices: 60-70% volume (0.6-0.7)
- Emergency/Alert: 80% volume (0.8)

### Aesthetic Direction
- Blend natural mountain sounds with subtle tech
- UI sounds: Clean, satisfying, not harsh
- Avoid generic "computer beeps"
- Lean into the luxury spa meets tech vibe
- Western elements should feel premium, not campy

## Implementation Notes
```javascript
// Preload critical sounds
const sounds = {
  hover: new Howl({ 
    src: ['/sounds/ui/hover-soft.mp3'], 
    volume: 0.3,
    preload: true 
  }),
  ambientMountain: new Howl({ 
    src: ['/sounds/ambient/mountain-night.mp3'], 
    loop: true,
    volume: 0.2,
    preload: true 
  })
};
```

## Free Sound Resources
- Freesound.org (CC licensed)
- Zapsplat.com (free with account)
- BBC Sound Effects Archive
- NASA Audio Collection (space/tech sounds)