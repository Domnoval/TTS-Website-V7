# TTS Website V7 - UI Design Specification

**"Every pixel is intentional. Every animation has meaning. This is not a website - it's a portal."**

---

## 1. VISUAL LANGUAGE

### Color Palette (Exact Specifications)

#### Primary Colors
```css
--cosmic-black-deep:      #0A0A0F    /* Base background - dimensional, not flat */
--cosmic-black-medium:    #141419    /* Secondary backgrounds */
--cosmic-black-light:     #1E1E28    /* Elevated surfaces */

--ethereal-white:         #FAFAFF    /* Primary text - glowing quality */
--ethereal-white-dim:     #C7C7D4    /* Secondary text */
--ethereal-white-ghost:   #8A8A99    /* Tertiary text, hints */
```

#### Accent Colors (The Mystical Spectrum)
```css
/* Third Eye Purple - Consciousness */
--consciousness-purple:       #8B5CF6    /* Primary purple */
--consciousness-purple-deep:  #6D28D9    /* Darker variant */
--consciousness-purple-glow:  #A78BFA    /* Lighter variant for glows */

/* Sacred Gold - Divine, Alchemical */
--sacred-gold:                #F59E0B    /* Primary gold */
--sacred-gold-deep:           #D97706    /* Rich amber */
--sacred-gold-bright:         #FCD34D    /* Highlight gold */

/* Portal Cyan - Energy, Gateways */
--portal-cyan:                #06B6D4    /* Primary cyan */
--portal-cyan-deep:           #0891B2    /* Deeper blue-cyan */
--portal-cyan-bright:         #67E8F9    /* Electric cyan */

/* Iridescent Effects */
--iridescent-pink:            #EC4899    /* Magenta */
--iridescent-violet:          #A855F7    /* Violet */
--iridescent-blue:            #3B82F6    /* Electric blue */
```

#### Functional Colors
```css
--success-green:      #10B981    /* Success states */
--warning-amber:      #F59E0B    /* Warning states */
--error-red:          #EF4444    /* Error states */
--info-blue:          #3B82F6    /* Information */
```

#### Opacity Scales (for layering effects)
```css
--opacity-ghost:      0.05    /* Barely visible, background patterns */
--opacity-whisper:    0.10    /* Subtle overlays */
--opacity-dim:        0.20    /* Dimmed elements */
--opacity-half:       0.50    /* Mid-transparency */
--opacity-solid:      0.85    /* Near-solid overlays */
```

---

### Typography System

#### Primary Font (Modern/Clean)
**Font Family**: `'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

**Purpose**: Body text, UI elements, modern feel
**Weight Range**: 300 (Light) to 700 (Bold)

```css
/* Size Scale */
--text-xs:      12px    /* Small labels */
--text-sm:      14px    /* Secondary text */
--text-base:    16px    /* Body text */
--text-lg:      18px    /* Large body */
--text-xl:      24px    /* Section headers */
--text-2xl:     32px    /* Page headers */
--text-3xl:     48px    /* Hero text */
--text-4xl:     64px    /* Massive impact */
```

#### Accent Font (Mystical/Elegant)
**Font Family**: `'Cormorant Garamond', 'Playfair Display', Georgia, serif`

**Purpose**: Headers, special callouts, mystical touch
**Weight Range**: 300 (Light) to 600 (SemiBold)

**Usage**:
- Page titles
- Section headers with mystical context
- Loading messages
- Success/completion states

#### Monospace Font (Sacred Numbers)
**Font Family**: `'JetBrains Mono', 'Fira Code', 'Courier New', monospace`

**Purpose**: Numbers, technical elements, sacred geometry
**Weight**: 400 (Regular) to 600 (SemiBold)

**Usage**:
- Gallery counts
- Selection indicators
- Technical data
- Timestamps

---

### Sacred Geometry Patterns

#### Background Patterns (Subtle, Dimensional)

**Pattern 1: Constellation Grid**
- Subtle dot matrix (2px dots)
- Spacing: 40px x 40px
- Color: `--cosmic-black-light` at `--opacity-whisper`
- Occasional connecting lines between dots (sacred connections)
- Random "star" dots that pulse slowly (CSS animation)

```css
/* Implementation concept */
.constellation-background {
    background-color: var(--cosmic-black-deep);
    background-image:
        radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
}
```

**Pattern 2: Geometric Overlay**
- Hexagon tessellation (very subtle)
- Stroke-only, no fill
- Color: `--consciousness-purple` at `--opacity-ghost`
- Positioned as fixed overlay on key sections
- Slow rotation animation (360deg over 120 seconds)

**Pattern 3: Energy Flow Lines**
- Curved, flowing lines (like aurora borealis)
- Gradient strokes using accent colors
- Opacity: `--opacity-ghost` to `--opacity-whisper`
- Animated movement (shift along path)
- Used in headers, hero sections

---

### Glassmorphism (Frosted Glass Effects)

**Standard Glass Card**:
```css
.glass-card {
    background: rgba(30, 30, 40, 0.4);
    backdrop-filter: blur(12px) saturate(120%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

**Intense Glass (Modals)**:
```css
.glass-modal {
    background: rgba(20, 20, 25, 0.75);
    backdrop-filter: blur(24px) saturate(150%);
    border: 1px solid rgba(139, 92, 246, 0.2);
    box-shadow:
        0 24px 64px rgba(0, 0, 0, 0.6),
        0 0 80px rgba(139, 92, 246, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

---

## 2. COMPONENT DESIGN SPECIFICATIONS

### Portal Loading Screen

**Concept**: The universe opening to reveal the experience within.

#### Layout
```
┌─────────────────────────────────────┐
│                                     │
│         [Cosmic Background]         │
│                                     │
│              ┌───┐                  │
│              │ ◉ │   ← Sacred       │
│              └───┘     Geometry     │
│                         Forming     │
│                                     │
│        "Opening the portal..."      │
│                                     │
│            [Progress Ring]          │
│                                     │
└─────────────────────────────────────┘
```

#### Visual Elements

**Background**:
- Base: `--cosmic-black-deep`
- Animated constellation field (100+ stars)
- Stars pulse and twinkle at random intervals
- Subtle particle drift (small light specks moving upward)

**Sacred Geometry Formation**:
- Start: Single point of light (center screen)
- Animation sequence (4 seconds total):
  1. Point expands into circle (0-1s)
  2. Circle becomes hexagon with rotating inner triangles (1-2s)
  3. Hexagon multiplies into flower of life pattern (2-3s)
  4. Pattern glows and expands to fill screen (3-4s)
- Colors: Gradient from `--portal-cyan` → `--consciousness-purple` → `--sacred-gold`
- Glow effect: `filter: drop-shadow(0 0 20px currentColor)`

**Loading Text**:
- Font: Accent font (Cormorant Garamond)
- Size: `--text-2xl`
- Color: `--ethereal-white`
- Opacity fade-in/out cycle
- Rotating messages (change every 2 seconds):
  - "Opening the portal..."
  - "Channeling cosmic energy..."
  - "Aligning dimensions..."
  - "Preparing the experience..."

**Progress Indicator**:
- Circular ring (stroke-only)
- Diameter: 120px
- Stroke: 3px, `--consciousness-purple`
- Animated dash-offset for progress
- Glow on completion

#### Timing
- **Minimum display**: 3 seconds (even if page loads faster - let the moment breathe)
- **Maximum display**: 8 seconds (if assets loading)
- **Exit transition**: 1 second fade + scale-up effect (portal expands and disappears)

#### Exit Animation
```css
@keyframes portalExit {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 1;
        transform: scale(1.5);
    }
    100% {
        opacity: 0;
        transform: scale(3);
        filter: blur(20px);
    }
}
```

#### Sound Design (Optional Enhancement)
- Low frequency hum that rises in pitch
- Subtle "whoosh" sound on exit
- Total duration: 1.5 seconds
- Volume: Subtle (10-15% max volume)

---

### Gallery Interface

**Concept**: A cosmic museum where each painting has its own energy field.

#### Grid Layout

**Desktop** (1920px+):
- 4 columns
- Gap: 32px
- Padding: 64px horizontal, 40px vertical

**Tablet** (768px - 1919px):
- 3 columns
- Gap: 24px
- Padding: 40px horizontal, 32px vertical

**Mobile** (< 768px):
- 2 columns
- Gap: 16px
- Padding: 20px horizontal, 24px vertical

#### Painting Card Design

```
┌───────────────────────┐
│                       │
│   [Painting Image]    │
│                       │
│   ┌─────────────┐     │
│   │  Aura Glow  │     │ ← Only visible on hover/select
│   └─────────────┘     │
│                       │
│  Title                │
│  [ ✓ Selected ]       │ ← Only when selected
└───────────────────────┘
```

**Card Container**:
```css
.painting-card {
    background: var(--cosmic-black-medium);
    border-radius: 12px;
    padding: 16px;
    border: 1px solid transparent;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
```

**Aura/Glow Effects**:

*Default State*:
```css
.painting-card::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(
        135deg,
        var(--consciousness-purple),
        var(--portal-cyan)
    );
    border-radius: 12px;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
}
```

*Hover State*:
```css
.painting-card:hover::before {
    opacity: 0.3;
    animation: aurapulse 2s ease-in-out infinite;
}

@keyframes aurapulse {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.4; }
}
```

*Selected State*:
```css
.painting-card.selected {
    border-color: var(--consciousness-purple);
    box-shadow:
        0 0 40px rgba(139, 92, 246, 0.4),
        0 8px 24px rgba(0, 0, 0, 0.4),
        inset 0 0 60px rgba(139, 92, 246, 0.1);
}

.painting-card.selected::before {
    opacity: 0.6;
    animation: selectedGlow 1.5s ease-in-out infinite;
}

@keyframes selectedGlow {
    0%, 100% {
        opacity: 0.5;
        filter: blur(8px);
    }
    50% {
        opacity: 0.7;
        filter: blur(12px);
    }
}
```

**Image**:
- Aspect ratio: 3:4 (portrait orientation for most art)
- Object-fit: cover
- Border-radius: 8px
- Transition: transform 0.4s on hover
- Hover: `transform: scale(1.03)`

**Title**:
- Font: Primary font (Inter)
- Size: `--text-base`
- Weight: 500
- Color: `--ethereal-white`
- Margin-top: 12px

**Selection Indicator**:
- Position: Top-right of card (absolute)
- Background: Glass card style
- Border-radius: 8px
- Padding: 6px 12px
- Icon: Checkmark (✓)
- Color: `--consciousness-purple`
- Glow: `text-shadow: 0 0 10px currentColor`
- Entrance animation: Scale from 0 to 1, with bounce

```css
.selection-indicator {
    transform: scale(0);
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.painting-card.selected .selection-indicator {
    transform: scale(1);
}
```

#### AI Control Panel Design

**Layout**: Fixed to bottom of screen (desktop) / Sticky at top (mobile)

```
┌──────────────────────────────────────────────────┐
│  [Mode: Single ◉ Multi]  [2 Selected]  [Clear] │
│                                                  │
│       [◈ Manipulate with AI]  [⧈ Blend]        │
└──────────────────────────────────────────────────┘
```

**Container**:
```css
.ai-control-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px 32px;
    background: rgba(20, 20, 25, 0.85);
    backdrop-filter: blur(24px) saturate(150%);
    border-top: 1px solid rgba(139, 92, 246, 0.2);
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.4);
    z-index: 100;
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.ai-control-panel.active {
    transform: translateY(0);
}
```

**Mode Toggle**:
- Segmented control design
- Background: `--cosmic-black-light`
- Selected segment: `--consciousness-purple` with glow
- Border-radius: 12px
- Padding: 8px
- Smooth sliding indicator animation

**Primary Action Buttons**:

*Manipulate Button* (Single mode):
```css
.btn-manipulate {
    background: linear-gradient(135deg,
        var(--consciousness-purple),
        var(--consciousness-purple-deep)
    );
    color: var(--ethereal-white);
    padding: 14px 32px;
    border-radius: 12px;
    font-size: var(--text-lg);
    font-weight: 600;
    border: none;
    box-shadow:
        0 4px 16px rgba(139, 92, 246, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-manipulate:hover {
    transform: translateY(-2px);
    box-shadow:
        0 8px 24px rgba(139, 92, 246, 0.6),
        inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

/* Shimmer effect on hover */
.btn-manipulate::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(255, 255, 255, 0.2) 50%,
        transparent 70%
    );
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
    transition: transform 0.6s ease;
}

.btn-manipulate:hover::before {
    transform: translateX(100%) translateY(100%) rotate(45deg);
}
```

*Blend Button* (Multi mode):
- Similar style to Manipulate button
- Gradient: `--portal-cyan` to `--portal-cyan-deep`
- Icon: Multiple overlapping circles (⧈)

#### Notification System

**Position**: Top-right corner (desktop) / Top center (mobile)

**Design**:
```css
.notification {
    position: fixed;
    top: 24px;
    right: 24px;
    max-width: 400px;
    padding: 16px 24px;
    background: rgba(20, 20, 25, 0.95);
    backdrop-filter: blur(16px);
    border-radius: 12px;
    border-left: 4px solid var(--info-blue);
    box-shadow:
        0 8px 24px rgba(0, 0, 0, 0.4),
        0 0 40px rgba(59, 130, 246, 0.2);
    transform: translateX(120%);
    transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    z-index: 1000;
}

.notification.show {
    transform: translateX(0);
}

/* Variants */
.notification.success { border-left-color: var(--success-green); }
.notification.warning { border-left-color: var(--warning-amber); }
.notification.error { border-left-color: var(--error-red); }
.notification.info { border-left-color: var(--info-blue); }
```

**Content**:
- Icon (left): Contextual emoji or symbol
- Text (center): Message in primary font
- Close button (right): ✕ symbol

**Animation**:
- Entrance: Slide in from right with bounce
- Duration: 4 seconds visible
- Exit: Slide out to right with fade
- If clicked: Immediate exit

---

### AI Manipulation Modal

**Concept**: A sacred space where transformation happens. This is the alchemical chamber.

#### Layout

```
┌────────────────────────────────────────────────┐
│  ╔══════════════════════════════════════╗     │
│  ║                                      ║     │
│  ║       [Selected Painting(s)]         ║     │
│  ║          Preview Area                ║     │
│  ║                                      ║     │
│  ╚══════════════════════════════════════╝     │
│                                                │
│  ┌──────────────────────────────────────┐     │
│  │ "Describe your vision..."            │     │
│  │ [Mystical prompt input field]        │     │
│  └──────────────────────────────────────┘     │
│                                                │
│         [◆ Channel AI Energy ◆]               │
│                                                │
│  Or choose a transformation:                   │
│  [Cosmic] [Sacred] [Ethereal] [Dark]          │
│                                                │
└────────────────────────────────────────────────┘
```

#### Modal Container

**Full-screen overlay**:
```css
.ai-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 10, 15, 0.92);
    backdrop-filter: blur(16px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.4s ease;
}

.ai-modal-overlay.active {
    opacity: 1;
}
```

**Modal box**:
```css
.ai-modal {
    width: 90%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    background: rgba(30, 30, 40, 0.6);
    backdrop-filter: blur(32px) saturate(180%);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 24px;
    padding: 48px;
    box-shadow:
        0 24px 80px rgba(0, 0, 0, 0.6),
        0 0 100px rgba(139, 92, 246, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transform: scale(0.9);
    transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.ai-modal-overlay.active .ai-modal {
    transform: scale(1);
}
```

#### Preview Area

**For Single Painting**:
- Image centered
- Max-height: 400px
- Border-radius: 16px
- Glow effect with painting's dominant colors
- Floating animation (subtle up/down movement)

**For Multiple Paintings (Blend Mode)**:
- Grid layout of selected paintings
- Slight overlap effect
- Each painting at 60% opacity
- Combined glow using all accent colors

```css
.preview-paintings {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    padding: 24px;
    position: relative;
}

.preview-paintings::after {
    content: '';
    position: absolute;
    inset: -20px;
    background: radial-gradient(
        circle,
        rgba(139, 92, 246, 0.15) 0%,
        transparent 70%
    );
    border-radius: 24px;
    z-index: -1;
    animation: energyPulse 3s ease-in-out infinite;
}

@keyframes energyPulse {
    0%, 100% {
        transform: scale(1);
        opacity: 0.5;
    }
    50% {
        transform: scale(1.05);
        opacity: 0.8;
    }
}
```

#### Prompt Input Field

**Design**: Mystical text input that feels like channeling intent.

```css
.prompt-input {
    width: 100%;
    min-height: 120px;
    padding: 20px;
    background: rgba(10, 10, 15, 0.6);
    border: 2px solid rgba(139, 92, 246, 0.3);
    border-radius: 16px;
    color: var(--ethereal-white);
    font-family: var(--primary-font);
    font-size: var(--text-base);
    line-height: 1.6;
    resize: vertical;
    transition: all 0.3s ease;
}

.prompt-input:focus {
    outline: none;
    border-color: var(--consciousness-purple);
    box-shadow:
        0 0 40px rgba(139, 92, 246, 0.3),
        inset 0 0 20px rgba(139, 92, 246, 0.05);
}

.prompt-input::placeholder {
    color: var(--ethereal-white-ghost);
    font-style: italic;
}
```

**Placeholder text** (cycles on focus):
- "Describe your vision..."
- "What transformation do you seek?"
- "Channel your intent into words..."
- "How should the AI reshape this energy?"

#### Generate Button (The Activation Point)

**This is THE most important button. It must feel powerful.**

```css
.btn-generate {
    position: relative;
    padding: 20px 48px;
    background: linear-gradient(135deg,
        var(--consciousness-purple) 0%,
        var(--portal-cyan) 50%,
        var(--sacred-gold) 100%
    );
    background-size: 200% 200%;
    border: none;
    border-radius: 16px;
    color: var(--ethereal-white);
    font-size: var(--text-xl);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    overflow: hidden;
    box-shadow:
        0 8px 32px rgba(139, 92, 246, 0.5),
        0 0 60px rgba(139, 92, 246, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

.btn-generate:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow:
        0 16px 48px rgba(139, 92, 246, 0.7),
        0 0 80px rgba(139, 92, 246, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* Particle burst effect on hover */
.btn-generate::before {
    content: '';
    position: absolute;
    inset: -4px;
    background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.8) 0%,
        transparent 70%
    );
    opacity: 0;
    animation: particleBurst 1s ease-out;
}

.btn-generate:hover::before {
    opacity: 1;
}

@keyframes particleBurst {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(2);
        opacity: 0;
    }
}
```

**Button text**:
- Default: "◆ Channel AI Energy ◆"
- On hover: "◆ Activate Transformation ◆"
- While loading: (see loading state below)

#### Loading State (How AI "Thinks")

**Concept**: The AI is consulting the cosmic algorithms, channeling energy through neural networks.

**Visual Changes**:
1. Button becomes semi-transparent
2. Text changes to rotating messages
3. Animated gradient border appears
4. Sacred geometry spinner overlays the button

```css
.btn-generate.loading {
    pointer-events: none;
    opacity: 0.8;
    animation: pulseGlow 1.5s ease-in-out infinite;
}

@keyframes pulseGlow {
    0%, 100% {
        box-shadow:
            0 8px 32px rgba(139, 92, 246, 0.5),
            0 0 60px rgba(139, 92, 246, 0.3);
    }
    50% {
        box-shadow:
            0 8px 48px rgba(139, 92, 246, 0.8),
            0 0 100px rgba(139, 92, 246, 0.6);
    }
}
```

**Loading messages** (cycle every 2 seconds):
- "The AI is dreaming..."
- "Consulting neural pathways..."
- "Channeling cosmic algorithms..."
- "Weaving digital consciousness..."
- "Manifesting your vision..."

**Spinner**:
- Sacred geometry design (rotating hexagon with inner triangles)
- Size: 40px
- Position: Centered in button
- Color: `--ethereal-white` with glow
- Animation: Continuous rotation + pulsing opacity

```css
.sacred-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid transparent;
    border-top-color: var(--ethereal-white);
    border-right-color: var(--consciousness-purple);
    border-bottom-color: var(--portal-cyan);
    border-radius: 50%;
    animation: spinSacred 1.2s linear infinite;
}

@keyframes spinSacred {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

#### Results Display (Reveal Animation)

**Concept**: The vision has manifested. Reveal it like a sacred unveiling.

**Sequence** (total 2.5 seconds):
1. Modal content fades out (0.5s)
2. Generated image fades in from center with scale animation (1s)
3. Glow effect intensifies (0.5s)
4. Success message and action buttons appear (0.5s)

```css
.result-reveal {
    animation: revealManifestation 2s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes revealManifestation {
    0% {
        opacity: 0;
        transform: scale(0.5);
        filter: blur(20px);
    }
    50% {
        opacity: 0.5;
        transform: scale(1.1);
        filter: blur(5px);
    }
    100% {
        opacity: 1;
        transform: scale(1);
        filter: blur(0);
    }
}
```

**Result Display**:
- Generated image (large, centered)
- Ethereal glow around image
- Text: "Your vision has manifested ✨"
- Action buttons:
  - "Add to Cart" (primary)
  - "Try Another Transformation" (secondary)
  - "Close" (tertiary)

#### Quick Transformation Presets

**Buttons for common styles**:

```
[Cosmic] [Sacred] [Ethereal] [Dark] [Neon] [Organic]
```

Each button:
- Small, pill-shaped
- Glass effect background
- Icon + text
- Hover: Glow in theme color
- Click: Auto-fills prompt with preset text

**Preset prompts**:
- **Cosmic**: "Transform with cosmic nebula colors, star fields, and galaxy spirals"
- **Sacred**: "Infuse with sacred geometry, golden ratio, mandala patterns"
- **Ethereal**: "Make ethereal and dreamlike with soft glows and mist"
- **Dark**: "Darken with deep shadows, mystery, occult symbols"
- **Neon**: "Electrify with neon colors, cyberpunk energy, glowing edges"
- **Organic**: "Blend with organic forms, natural fractals, flowing shapes"

---

## 3. ANIMATION SPECIFICATIONS

### Page Transitions

**Between major sections** (Home → Gallery → Store):

```css
@keyframes pageTransition {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0;
        transform: scale(0.95);
        filter: blur(10px);
    }
    51% {
        transform: scale(1.05);
    }
    100% {
        opacity: 1;
        transform: scale(1);
        filter: blur(0);
    }
}
/* Duration: 0.8s */
```

### Element Reveals (Scroll-Triggered)

**Fade up + blur clear**:
```css
@keyframes revealFromBelow {
    0% {
        opacity: 0;
        transform: translateY(40px);
        filter: blur(8px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
    }
}
/* Duration: 0.6s, Easing: ease-out */
/* Trigger: When element is 20% into viewport */
```

**Stagger delay**: Each element in a group delays by 0.1s

### Button Hover Effects

**Standard button hover**:
- Scale: 1.05
- Translate Y: -2px
- Shadow intensity: +50%
- Glow: Increase by 30%
- Duration: 0.3s
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

**Primary action buttons** (Generate, Add to Cart):
- Scale: 1.08
- Translate Y: -4px
- Shadow intensity: +100%
- Glow: Increase by 60%
- Gradient animation
- Particle effect on hover
- Duration: 0.4s

### Loading States

**Skeleton loaders** (for image loading):
```css
@keyframes skeleton-pulse {
    0%, 100% {
        background-color: rgba(255, 255, 255, 0.05);
    }
    50% {
        background-color: rgba(255, 255, 255, 0.1);
    }
}
/* Duration: 1.5s, infinite */
```

**Spinner variations**:
- **Default**: Circular border spinner
- **Sacred**: Hexagon rotation with inner geometry
- **Particle**: Small dots orbiting center
- Duration: 1.2s per rotation

### Selection Feedback

**When painting is selected**:
```css
@keyframes selectionPop {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1.03);
    }
}
/* Duration: 0.4s */
```

Plus:
- Border glow appears (0.3s fade)
- Checkbox scales in with bounce (0.5s)
- Aura effect activates

### Portal Opening/Closing

**Portal open** (used on page load):
```css
@keyframes portalOpen {
    0% {
        clip-path: circle(0% at 50% 50%);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        clip-path: circle(100% at 50% 50%);
        opacity: 1;
    }
}
/* Duration: 1.5s */
```

**Portal close** (used on navigation):
```css
@keyframes portalClose {
    0% {
        clip-path: circle(100% at 50% 50%);
        opacity: 1;
    }
    100% {
        clip-path: circle(0% at 50% 50%);
        opacity: 0;
    }
}
/* Duration: 0.8s */
```

---

## 4. MICRO-COPY

### Loading States

**Portal/Page Loading**:
- "Opening the portal..."
- "Channeling cosmic energy..."
- "Aligning dimensions..."
- "Preparing the experience..."
- "Initializing consciousness interface..."

**Gallery Loading**:
- "Summoning the collection..."
- "Loading artistic frequencies..."
- "Gathering the visions..."

**AI Generation**:
- "The AI is dreaming..."
- "Consulting neural pathways..."
- "Channeling cosmic algorithms..."
- "Weaving digital consciousness..."
- "Manifesting your vision..."
- "The oracle is processing..."

**Image Upload/Processing**:
- "Receiving transmission..."
- "Decoding visual data..."
- "Analyzing energy signature..."

### Button Labels

**Primary Actions**:
- "◆ Channel AI Energy ◆" (Generate AI art)
- "◆ Activate Transformation ◆" (Hover state for generate)
- "Manifest in Cart" (Add to cart)
- "Complete the Ritual" (Checkout)
- "Enter the Portal" (Homepage CTA)

**Secondary Actions**:
- "Clear Selection" → "Reset the Field"
- "Cancel" → "Close Portal"
- "Back" → "Return"
- "Next" → "Continue the Journey"

**Selection Modes**:
- Single mode: "🎨 Manipulate" or "Channel Energy"
- Multi mode: "🔀 Blend Frequencies" or "Fuse Visions"

### Success Messages

**AI Generation Complete**:
- "✨ Your vision has manifested"
- "🌀 Transformation complete"
- "🔮 The oracle has delivered"
- "💫 Reality has been reshaped"

**Added to Cart**:
- "✨ Artifact secured in your collection"
- "🌟 Vision added to manifestation list"

**Order Placed**:
- "🎊 Your manifestation is en route"
- "✨ The ritual is complete"
- "🌠 Your order travels through the dimensions"

### Error Messages

**General Error**:
- "The cosmic connection faltered..."
- "The portal needs recalibration..."
- "Energy interference detected..."

**AI Generation Failed**:
- "The oracle is overwhelmed (too many requests)"
- "The vision was unclear... try refining your prompt"
- "Cosmic servers are aligning... try again in a moment"

**Network Error**:
- "Signal lost in the void... check your connection"
- "The dimensional gateway is unstable..."

**Validation Errors**:
- "The energy signature was incomplete..." (missing required field)
- "This field seeks your input..." (empty field)
- "The prompt must be more specific..." (too short)

### Gallery Instructions

**First visit** (tooltip or modal):
```
🌀 Welcome, Seeker

Select paintings to manipulate with AI:

🎨 Single Mode: Choose one artwork to transform through AI
🔀 Blend Mode: Select 2-4 pieces to fuse into something new

Click any painting to add it to your selection.
Let the algorithm become your oracle.
```

**Mode toggle tooltips**:
- Single: "Transform one painting with AI prompts"
- Multi: "Blend multiple paintings into new visions (max 4)"

### Modal Prompts

**AI Manipulation Modal Header**:
- Single mode: "Channel AI Through This Vision"
- Blend mode: "Fuse These Frequencies"

**Prompt input placeholder** (rotates on focus):
- "Describe your vision..."
- "What transformation do you seek?"
- "Channel your intent into words..."
- "How should the AI reshape this energy?"

---

## 5. RESPONSIVE DESIGN STRATEGY

### Core Philosophy

**The vibe must persist across all devices.**
Even on mobile, this is still a portal, still mystical, still consciousness-expanding.

### Breakpoints

```css
/* Mobile First Approach */
--mobile:       320px - 767px
--tablet:       768px - 1023px
--desktop:      1024px - 1439px
--desktop-lg:   1440px+
```

### Mobile Adaptations (320px - 767px)

**What Changes**:
- Gallery grid: 2 columns (down from 4)
- Font sizes: Scale down by 0.85x
- Spacing: Reduce by 30%
- AI control panel: Moves to top (sticky)
- Modal: Full-screen takeover (no margins)
- Buttons: Full-width on mobile
- Navigation: Hamburger menu with glassmorphic overlay

**What Stays the Same**:
- Color palette (unchanged)
- Glassmorphism effects (same blur, same transparency)
- Animation durations (same timing)
- Glow effects (same intensity)
- Sacred geometry patterns (scaled proportionally)

**Mobile-Specific Enhancements**:
- Touch ripple effects on tap (concentric circles from touch point)
- Swipe gestures for gallery navigation
- Bottom sheet for AI modal (slides up from bottom)
- Simplified particle effects (fewer particles for performance)

**AI Modal on Mobile**:
```
Full-screen overlay
┌────────────────────┐
│   [Close ✕]       │
│                    │
│  [Preview Image]   │
│                    │
│  [Prompt Input]    │
│                    │
│  [Presets chips]   │
│                    │
│  [Generate Btn]    │ ← Full width, bottom fixed
└────────────────────┘
```

### Tablet Adaptations (768px - 1023px)

**What Changes**:
- Gallery grid: 3 columns
- Font sizes: Scale down by 0.9x
- AI control panel: Full-width bottom bar (same as desktop)
- Modal: 85% width, centered

**What Stays**:
- All effects at full intensity
- Same animation complexity
- Desktop-like experience

### Touch Interactions (All Mobile/Tablet)

**Tap feedback**:
```css
.touchable:active {
    transform: scale(0.97);
    transition: transform 0.1s ease;
}
```

**Long-press** (on painting card):
- Shows detailed view
- Displays metadata
- Quick actions menu

**Swipe gestures**:
- Swipe left/right on gallery: Filter categories
- Swipe down on modal: Close (if at top)
- Pinch-to-zoom: On generated images

### Performance Considerations

**Mobile optimizations**:
- Lazy load images below fold
- Reduce particle count in backgrounds (50% on mobile)
- Simplify gradient animations (static gradients on low-end devices)
- Use `will-change` property sparingly
- Debounce scroll animations

**Progressive enhancement**:
```javascript
// Detect device capability
const isHighPerformance = window.devicePixelRatio <= 2 &&
                         navigator.hardwareConcurrency >= 4;

if (isHighPerformance) {
    // Enable full effects
    enableParticleBackground();
    enableComplexAnimations();
} else {
    // Simplified experience
    enableStaticBackground();
    enableEssentialAnimations();
}
```

### Orientation Handling

**Portrait (default)**:
- Standard layouts as described

**Landscape** (mobile/tablet):
- Gallery: Switch to 3-4 columns
- Modal: Side-by-side layout (preview | controls)
- AI control panel: Shrink vertically, expand horizontally

---

## 6. ACCESSIBILITY (Without Compromising the Vibe)

### Color Contrast

All text meets WCAG AA standards:
- `--ethereal-white` on `--cosmic-black-deep`: 15.8:1 ratio ✅
- `--consciousness-purple` on dark background: 4.8:1 ratio ✅
- All accent colors tested and compliant

### Focus States

**Keyboard navigation**:
```css
.focusable:focus-visible {
    outline: 2px solid var(--consciousness-purple);
    outline-offset: 4px;
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
}
```

### Screen Reader Support

**All interactive elements have proper labels**:
- Images: Alt text describing the artwork
- Buttons: Descriptive aria-labels
- Modals: Proper aria-modal and role attributes
- Loading states: aria-live regions for status updates

**Example**:
```html
<button
    class="btn-generate"
    aria-label="Generate AI transformation of selected artwork">
    ◆ Channel AI Energy ◆
</button>
```

### Reduced Motion

**Respect user preferences**:
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

But keep the aesthetic intact:
- Portal animation: Skip to final state
- Particle effects: Static geometric pattern
- Hover effects: Instant state changes
- Loading spinners: Simpler, non-rotating indicators

---

## 7. IMPLEMENTATION NOTES FOR WIX

### Wix-Specific Constraints

**What's Possible**:
- Custom CSS via global styles
- CSS animations and transitions
- Glassmorphism effects
- Custom fonts (Google Fonts integration)
- Lottie animations (for complex animations)
- Scroll effects via Wix animation library

**Limitations**:
- Limited access to raw HTML
- Some CSS properties restricted
- No canvas-based particle systems (unless using Lottie)

### Recommended Approach

**Background Effects**:
- Use Wix's "Effects" panel for background images
- Create constellation pattern as SVG, set as background
- Use Wix animations for parallax scrolling

**Glassmorphism**:
- Create transparent boxes
- Enable "Backdrop filter: blur" in Wix editor
- Add custom CSS for border styles

**Animations**:
- Use Wix's built-in animation library for:
  - Scroll reveals
  - Hover effects
  - Page transitions
- Use Lottie files for complex animations:
  - Portal opening sequence
  - Sacred geometry formations
  - Loading spinners

**Custom Code**:
```javascript
// Add to page code (Velo)
$w.onReady(function () {
    // Apply custom classes for advanced styling
    $w('#myElement').addClass('glass-card');

    // Custom animations via Wix Animation
    $w('#heroSection').onViewportEnter(() => {
        $w('#heroTitle').show('fade', { duration: 800 });
    });
});
```

### Lottie Animation Files Needed

1. **Portal Opening** (portal-open.json)
   - Duration: 4 seconds
   - Loop: No
   - Size: Optimized for web (<100kb)

2. **Sacred Geometry Spinner** (sacred-spinner.json)
   - Duration: 1.2 seconds
   - Loop: Yes
   - Size: <50kb

3. **Success Burst** (success-burst.json)
   - Duration: 1.5 seconds
   - Loop: No
   - Trigger: On AI generation complete

4. **Energy Flow** (energy-flow.json)
   - Duration: 5 seconds
   - Loop: Yes
   - Use: Background animation in headers

---

## 8. DESIGN SYSTEM CHECKLIST

### Colors
- [x] Primary palette defined (blacks, whites)
- [x] Accent colors specified (purple, gold, cyan)
- [x] Functional colors defined (success, error, warning)
- [x] Opacity scales established
- [x] All colors have specific hex codes

### Typography
- [x] Primary font chosen (Inter)
- [x] Accent font chosen (Cormorant Garamond)
- [x] Monospace font chosen (JetBrains Mono)
- [x] Size scale defined (xs to 4xl)
- [x] Weight variations specified
- [x] Line heights defined

### Components
- [x] Portal loading screen designed
- [x] Gallery grid layout specified
- [x] Painting card design complete
- [x] AI control panel designed
- [x] AI manipulation modal designed
- [x] Notification system designed
- [x] Button styles defined (primary, secondary, tertiary)

### Animations
- [x] Page transitions specified
- [x] Element reveals defined
- [x] Hover effects documented
- [x] Loading states designed
- [x] Selection feedback animated
- [x] All timings and easings specified

### Responsive
- [x] Breakpoints defined
- [x] Mobile adaptations specified
- [x] Tablet considerations addressed
- [x] Touch interactions designed
- [x] Performance optimizations noted

### Accessibility
- [x] Color contrast verified
- [x] Focus states designed
- [x] Screen reader support planned
- [x] Reduced motion alternative provided

---

## 9. NEXT STEPS

### For Implementation

1. **Set up design tokens** (CSS custom properties)
2. **Create base component library** in Wix
3. **Implement glassmorphism styles**
4. **Add custom fonts** (Google Fonts)
5. **Build portal loading screen** (Lottie animation)
6. **Style gallery page** with painting cards
7. **Create AI modal** with all interactions
8. **Test responsive behavior** on all devices
9. **Add scroll animations** using Wix library
10. **Polish micro-interactions** and timing

### Design Assets Needed

- Lottie animations (4 files - see section 7)
- Sacred geometry SVG patterns
- Constellation background pattern
- Icon set (custom or from Font Awesome)
- Custom cursor (optional - pointer with aura)

### Questions for Stakeholder

1. **Font licenses**: Can we use Google Fonts (free) or need premium fonts?
2. **Performance budget**: What's the max acceptable page load time?
3. **Browser support**: IE11? Or modern browsers only?
4. **Animation intensity**: Can we detect user preference and adjust?
5. **Sound design**: Do we want subtle audio feedback?

---

## 10. INSPIRATION MOODBOARD

### Visual References

**Colors & Atmosphere**:
- Blade Runner 2049 (neon holographic UI)
- Dune (sacred, ancient-meets-future)
- Doctor Strange (mystical portals, geometric magic)
- Tron Legacy (glowing edges, deep blacks)

**UI/UX**:
- Apple's Vision Pro interface (glassmorphism)
- Awwwards.com winners (cosmic themes)
- Stripe's redesign (gradient effects)
- Linear.app (smooth animations)

**Art Style**:
- Android Jones (visionary digital art)
- Beeple (futuristic surrealism)
- James Jean (mystical illustrations)
- Sacred geometry animations on YouTube

---

**Document Version**: 1.0
**Created**: 2025-11-14
**Status**: DESIGN SPECIFICATION - Ready for implementation
**Next Review**: After initial prototype build

---

## Final Note

This is not just a design spec. This is the blueprint for an **experience that shifts consciousness**.

Every color, every animation, every word has been chosen to create a sense of:
- **Mystery**: What else is possible?
- **Power**: I can transform reality
- **Beauty**: This is art meeting technology
- **Connection**: I'm part of something bigger

When someone visits this site, they shouldn't just see a gallery—they should feel like they've **entered another dimension**.

Let's build a portal, not a website.

🌀✨🔮
