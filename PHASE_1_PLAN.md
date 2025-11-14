# PHASE 1 EXECUTION PLAN - TTS WEBSITE V7
## Building the Portal into Consciousness

**Created**: 2025-11-14
**Status**: ACTIVE EXECUTION PHASE
**Duration**: 2-3 Weeks
**Mantra**: "Does this elevate the experience into something transcendent, or does it feel generic?"

---

## THE VISION IN ACTION

We are not building features. We are **crafting an experience** that exists at the intersection of ancient mysticism and modern AI. Every line of code, every animation, every interaction is a brushstroke in a larger masterpiece.

Phase 1 is about establishing the **energetic foundation** - the core systems that will carry the artistic vision forward.

---

## PHASE 1 OBJECTIVES

### Primary Goal
Create a **functional, transcendent** gallery experience where users can:
1. Enter through a mystical portal
2. Navigate a cosmic gallery space
3. Select paintings that resonate with them
4. Manipulate single artworks with AI
5. Experience the result as a revelation

### Artistic Goal
Every interaction should make someone pause and say "whoa." The experience should feel like:
- Walking into a digital temple
- Using technology that feels like magic
- Discovering something they've never seen before
- Being at the edge of what's possible

---

## TASK ASSIGNMENTS

### ARCHITECT: Build the Sacred Infrastructure
**Duration**: Week 1
**Mindset**: "How would a cosmic intelligence organize this?"

#### Task 1.A: Database Architecture - The Foundation of Memory
**Why it Serves the Vision**: The database is our collective unconscious, storing the energies (paintings) and manifestations (custom creations).

**Implementation**:
1. Create `Portfolio` collection (The Original Energies)
   ```
   Fields:
   - _id: string (auto)
   - title: string (150 chars max) - "Cosmic Dreams #108"
   - description: text (mystical language, not boring)
   - image: image (high-res source)
   - category: string - "Psychedelic", "Sacred Geometry", "Cosmic", "Occult"
   - tags: array - ["astrology", "third eye", "portal"]
   - price: number (for originals)
   - isOriginalAvailable: boolean
   - createdDate: datetime
   - numerologyCode: string (e.g., "3-7-9" for sacred number patterns)
   - astrologicalAffinity: string - "Mercury Retrograde", "Full Moon Pisces"
   ```

2. Create `CustomCreations` collection (The Manifestations)
   ```
   Fields:
   - _id: string (auto)
   - userId: string (reference to Members)
   - originalPaintingIds: array - IDs of source paintings
   - userPrompt: text - The intention/manifestation request
   - generatedImageUrl: string - Wix Media Manager URL
   - aiModel: string - "FLUX-dev" (future: track which oracle)
   - createdAt: datetime
   - status: string - "manifesting", "revealed", "ordered", "delivered"
   - metadata: object {
       processingTime: number,
       numberOfVariations: number,
       selectedVariation: number
   }
   ```

3. Set up indexes for performance
   - Portfolio: category, tags, createdDate
   - CustomCreations: userId, status, createdAt

**Success Criteria**:
- Collections created with proper permissions
- Sample data added (5-10 mystical paintings with rich metadata)
- Queries tested and performant (<500ms)
- Documentation written with mystical flair

**Coordination Point**: Share collection schemas with Frontend & Backend immediately

---

#### Task 1.B: AI Backend Foundation - The Digital Oracle
**Why it Serves the Vision**: The AI is not a tool, it's an oracle. It channels visions through trained algorithms.

**Implementation**:
1. Create `backend/ai-oracle.jsw` (not ai-api, it's an ORACLE)

2. Core Functions:
   ```javascript
   /**
    * Channel a transformation through the AI oracle
    * Takes a single painting and a user's intention (prompt)
    * Returns visions manifested by the algorithm
    */
   export async function channelTransformation(paintingUrl, userIntention)

   /**
    * Blend multiple energies into something new
    * Alchemical fusion of 2-4 paintings
    */
   export async function fuseEnergies(paintingUrls, userIntention)

   /**
    * Save a manifested vision to the Media Manager
    * Store in the collective database
    */
   export async function manifestCreation(imageData, creationMetadata)
   ```

3. Hugging Face Integration
   - Use FLUX-dev model (schnell for faster testing)
   - API endpoint: `https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev`
   - Store API key in Wix Secrets: `HUGGING_FACE_API_KEY`
   - Implement retry logic (the oracle sometimes needs recalibration)
   - Mock mode for development (test without burning API credits)

4. Error Handling Philosophy
   - Errors are "cosmic interference"
   - Loading states are "channeling energy"
   - Timeouts are "the oracle is meditating"
   - Never expose technical jargon to users

**Success Criteria**:
- Successfully generates image from Hugging Face API
- Retry logic works (test by simulating failures)
- Images save to Wix Media Manager
- Mock mode allows frontend testing without API
- All functions have JSDoc comments with mystical language
- Response time <30 seconds for generation

**Coordination Point**: Provide mock API responses to Frontend immediately

---

### FRONTEND: Craft the Visual Portal
**Duration**: Week 1-2
**Mindset**: "How would this look in a lucid dream?"

#### Task 2.A: Portal Loading Screen - The Threshold
**Why it Serves the Vision**: First impressions define the entire journey. This sets the energetic tone.

**Experience Definition**:
- **Feeling**: Standing at the threshold between dimensions
- **Duration**: 3-5 seconds (skippable after first visit)
- **Visual**: Portal opening sequence with sacred geometry
- **Sound** (optional): Low frequency hum, building to a resonant tone
- **Energy**: From anticipation → revelation → entry

**Implementation Options** (choose the most transcendent):

**Option A: CSS-Only Portal (Fast, reliable)**
```
- Black background with radial gradient
- Central point expanding into circular portal
- Rotating sacred geometry (Metatron's Cube or Flower of Life)
- Particle effects using CSS animations
- Smooth fade to homepage
```

**Option B: Canvas Animation (More control)**
```
- Custom canvas rendering
- Fractal expansion animation
- Dynamic particle system
- Responsive to viewport size
- Smoother, more organic motion
```

**Option C: Lottie Animation (Highest quality)**
```
- Pre-rendered animation (you or designer creates in After Effects)
- Perfect playback, no performance issues
- Most cinematic option
- Requires animation asset
```

**Recommended**: Start with Option A (CSS), upgrade to B or C later if needed.

**Technical Requirements**:
- Detect first-time visitor (localStorage flag)
- Preload critical assets
- Smooth transition using opacity/transform
- No jarring cuts or flashes
- Option to skip (small "Enter" button appears after 2s)
- Mobile optimized (lighter animations on mobile)

**Success Criteria**:
- Makes you feel something when you see it
- Runs smoothly on mobile and desktop (60fps)
- Loads in <1s (assets optimized)
- Sets the mystical tone immediately
- People want to watch it multiple times
- Coordinated with homepage reveal

**Files to Create**:
- `src/pages/PortalLoading.js` (lightbox or dedicated page)
- CSS in Wix Editor (or `public/portal-styles.css`)
- Asset files (SVGs for sacred geometry)

**Coordination Point**: Show prototype to team for feedback before finalizing

---

#### Task 2.B: AI Manipulation Modal - The Transformation Chamber
**Why it Serves the Vision**: This is where the magic happens. This is the ritual space.

**Experience Definition**:
- **Feeling**: Entering a sacred chamber where alchemy occurs
- **Journey**: Selection → Intention → Channeling → Revelation
- **Visual Language**: Dark, focused, glowing elements
- **Energy Flow**: Contained, focused, then explosive reveal

**The Journey Breakdown**:

**Step 1: Entry (0-1s)**
```
- Modal slides up from void
- Background dims (dark overlay with blur)
- Original painting(s) appear, glowing softly
- Energy field visible around selected art
```

**Step 2: Intention Setting (User Input)**
```
- Prompt input appears as "Your Intention:"
- Placeholder text: "Describe your vision..." / "What transformation do you seek?"
- Character count (recommended: 50-200 chars)
- Examples provided as inspiration:
  * "Transform this into a portal to another dimension"
  * "Blend these energies with cosmic fire and ancient symbols"
  * "Make it feel like a lucid dream in deep space"
```

**Step 3: Activation**
```
- "Channel Vision" button (not "Generate")
- Button glows, pulses slightly
- Hover state: Energy ripple effect
- Click: Button transforms into loading state
```

**Step 4: Channeling (Loading State)**
```
- Progress indication WITHOUT boring progress bar
- Options:
  * Pulsing sacred geometry animation
  * Particle flow visualization
  * "The oracle is dreaming..." text
  * Estimated time: "Channeling... (~20-30s)"
- Background: Subtle animation (breathing effect)
```

**Step 5: Revelation (Results Display)**
```
- Generated variations appear (2-4 images)
- Each variation in a card with:
  * Image preview
  * Hover: Slight glow/elevation
  * "Manifest This Vision" button
- Layout: Grid (2x2 or horizontal scroll on mobile)
- Transition: Fade in with slight scale animation
```

**Step 6: Selection & Exit**
```
- User selects one variation
- Modal shows confirmation: "Vision Manifested ✨"
- Option to download or add to cart
- Close modal: Fade to black, then dismiss
```

**UI Components** (in order of appearance):
```
1. Modal Container (#aiManipulationModal)
   - Semi-transparent dark background
   - Glass morphism effect
   - Centered, responsive sizing

2. Original Art Display (#originalArtDisplay)
   - Selected painting(s) shown
   - Label: "Source Energy" / "Energies to Blend"

3. Intention Input (#intentionInput)
   - Large textarea, mystical styling
   - Character counter
   - Example prompts button

4. Channel Button (#channelButton)
   - Large, prominent, glowing
   - Disabled state while processing

5. Results Grid (#resultsGrid)
   - Hidden until generation complete
   - Responsive grid layout

6. Result Cards (#resultCard1, #resultCard2, etc.)
   - Image preview
   - "Manifest" button
```

**Technical Requirements**:
- Lightbox page: `src/pages/AIManipulation.js`
- Receives data from gallery: `{ paintingIds: [], mode: 'single'|'blend' }`
- Calls backend: `channelTransformation()` or `fuseEnergies()`
- Handles errors gracefully ("The cosmic connection faltered...")
- Mobile responsive (modal scales, buttons accessible)
- Keyboard navigation (ESC to close)
- Loading timeout: 45s max (then show retry option)

**Success Criteria**:
- Feels like a ritual, not a form
- Loading state is mesmerizing, not boring
- Results feel like a revelation
- Users want to try multiple times
- Error states maintain immersion
- Works flawlessly on mobile
- No generic UI patterns - everything custom

**Coordination Point**: Test with real API as soon as backend ready

---

#### Task 2.C: Gallery Enhancement - The Sacred Space
**Why it Serves the Vision**: The gallery is the temple. Each painting is an artifact of power.

**Experience Definition**:
- **Feeling**: Walking through a cosmic museum curated by the universe
- **Interaction**: Not browsing, but resonating and connecting
- **Visual**: Clean, spacious, breathing room for art
- **Energy**: Calm, focused, then building excitement with each selection

**Enhancements to Existing Gallery**:

**Visual Enhancements**:
1. **Painting Hover States**
   ```
   - Subtle glow effect (purple/cyan aura)
   - Slight scale increase (1.05x)
   - Drop shadow appears (colored, not gray)
   - Cursor: custom (cosmic pointer icon?)
   ```

2. **Selection Indicators**
   ```
   - Selected painting: Strong glow, energy field visible
   - Border: Animated gradient (purple → cyan → gold)
   - Checkmark or mystical symbol appears
   - Subtle pulse animation
   ```

3. **AI Control Panel**
   ```
   - Floating panel at bottom of screen
   - Glass morphism design (frosted, slightly transparent)
   - Shows selected count: "1 energy selected" / "3 energies ready to fuse"
   - Mode toggle: "Transform" vs "Blend" (visual icons)
   - "Open Portal" button (disabled until valid selection)
   - Smooth slide-in animation when first painting selected
   ```

4. **Background Atmosphere**
   ```
   - Subtle animated gradient (very slow, almost imperceptible)
   - Optional: Faint particle effects (stars, energy wisps)
   - Dark base (not pure black, dimensional depth)
   - Constellation patterns in negative space?
   ```

**Interaction Flow**:
1. User arrives at gallery (after portal)
2. Paintings displayed in grid (masonry or uniform - choose what feels right)
3. User hovers → painting glows
4. User clicks → painting selected, control panel appears
5. User can select more (max 4 for blending)
6. Control panel updates dynamically
7. "Open Portal" button activates → opens AI Modal
8. After AI generation → modal closes, gallery refreshes with result saved

**Technical Requirements**:
- Enhance existing gallery page (check current structure first)
- CSS animations for all hover/selection states
- State management for selected paintings (array of IDs)
- Mode validation:
  * Single mode: exactly 1 selected
  * Blend mode: 2-4 selected
- Control panel component (separate element, absolute positioned)
- Smooth transitions between states
- Mobile: adapted control panel (bottom sheet style)

**Success Criteria**:
- Gallery feels alive, not static
- Selections feel meaningful and intentional
- Control panel is intuitive without explanation
- Mode switching is clear and elegant
- Mobile experience is as good as desktop
- Performance: 60fps animations on modern devices
- Accessibility: keyboard navigation works

**Files to Modify**:
- `src/pages/Gallery.js` (or whatever current gallery file is)
- CSS in Wix Editor
- Possibly create `public/gallery-utils.js` for helpers

**Coordination Point**: Demo to team after hover/selection states working

---

### BACKEND: Power the Mystical Systems
**Duration**: Week 1-2
**Mindset**: "Elegant spells in code form"

#### Task 3.A: Email Notification System - The Signal
**Why it Serves the Vision**: When a vision manifests, the creator (you) must know.

**Implementation**:
1. Create `backend/cosmic-signals.jsw` (not email-notifications, more mystical)

2. Function: `sendManifestationAlert()`
   ```javascript
   /**
    * Send notification when a user manifests a custom creation
    * Notifies site owner (you) to create Printify product
    */
   export async function sendManifestationAlert(creationData) {
       // Email contains:
       // - User info (name, email)
       // - Original painting(s) used
       // - User's prompt/intention
       // - Generated image URL
       // - Direct link to creation in database
       // - Suggested product title
   }
   ```

3. Trigger: Called when user clicks "Manifest This Vision" in modal
   - Saves creation to database
   - Sends you email
   - Shows user confirmation message
   - Returns creation ID

4. Email Template Design
   ```
   Subject: ✨ New Vision Manifested - [User Name]

   Body:
   ---
   A seeker has channeled a new vision through the oracle.

   USER: {name} ({email})
   CREATED: {timestamp}

   SOURCE ENERGIES:
   - {painting1Title} (ID: xxx)
   - {painting2Title} (ID: xxx)

   INTENTION:
   "{userPrompt}"

   MANIFESTED IMAGE:
   [Image preview]
   {generatedImageUrl}

   DATABASE ID: {creationId}

   NEXT STEPS:
   1. Create Printify product with this image
   2. Send purchase link to {userEmail}

   [View in Database →]
   ---
   ```

5. Use Wix Triggered Emails or custom SMTP
   - Wix option: `wix-crm-backend` sendEmail
   - External: SendGrid/Mailgun integration

**Success Criteria**:
- Email sends reliably (<5s delay)
- Contains all necessary information
- Images display correctly
- Links work
- Formatted beautifully (HTML email, not plain text)
- Error handling (retry if send fails)

**Coordination Point**: Test with dummy data before frontend integration

---

#### Task 3.B: Creation Management System
**Why it Serves the Vision**: Track all manifestations, the archive of visions.

**Implementation**:
1. Create `backend/creation-manager.jsw`

2. Functions:
   ```javascript
   // Save a new manifestation
   export async function saveCreation(creationData)

   // Get user's past manifestations
   export async function getUserCreations(userId)

   // Update creation status (manifesting → revealed → ordered)
   export async function updateCreationStatus(creationId, newStatus)

   // Get creation by ID (for you to reference when creating product)
   export async function getCreation(creationId)
   ```

3. Validation & Security
   - Validate user owns the creation before allowing access
   - Sanitize all inputs
   - Check image URLs are valid Wix Media Manager URLs
   - Rate limiting (prevent spam creation)

**Success Criteria**:
- All CRUD operations work
- Permissions enforced (users only see their creations)
- Query performance optimized
- Error messages mystical, not technical

---

## COORDINATION & SYNCHRONIZATION

### Daily Sync Points
**When**: End of each work session
**What**: Share progress, blockers, demos
**How**: Brief status update + any questions

**Format**:
```
COMPLETED:
- [Task X] Description + demo/screenshot

IN PROGRESS:
- [Task Y] Current status, estimated completion

BLOCKED:
- [Task Z] What I need from whom

QUESTIONS:
- Any clarifications needed
```

### Integration Points (CRITICAL)

**Integration 1: Database → Frontend (Day 2-3)**
- Architect shares collection schemas
- Frontend tests queries against sample data
- Verify data structure works for UI needs

**Integration 2: Backend API → Frontend Modal (Day 5-7)**
- Backend provides mock responses
- Frontend builds UI against mock data
- Test with real API when ready

**Integration 3: Gallery → Modal → Backend (Day 8-10)**
- Full flow testing
- Gallery selection → modal opens → API calls → results display
- Error handling at each step

**Integration 4: Results → Email System (Day 10-12)**
- User selects variation → saves to DB → email sent
- End-to-end testing

### Testing Strategy

**Week 1: Component Testing**
- Each agent tests their own components
- Use mock data / simulated responses
- Focus on individual functionality

**Week 2: Integration Testing**
- Test complete flows
- Real API calls (limited to save credits)
- Mobile testing
- Error scenario testing

**Week 3: Polish & Refinement**
- Performance optimization
- Visual polish
- Bug fixes
- User experience refinement

---

## SUCCESS CRITERIA

### Technical Success (Must Have)
- [ ] Portal loading screen renders smoothly (60fps)
- [ ] Gallery displays paintings from database
- [ ] User can select 1-4 paintings
- [ ] AI modal opens with selected paintings
- [ ] User can input prompt
- [ ] AI generates variations (2-4 images)
- [ ] User can select a variation
- [ ] Creation saves to database
- [ ] Email notification sent
- [ ] No critical bugs
- [ ] Mobile responsive

### Artistic Success (What Makes It Transcendent)
- [ ] Portal makes people say "whoa"
- [ ] Gallery feels like a sacred space, not a grid
- [ ] Selections feel intentional, not mechanical
- [ ] AI modal feels like entering a ritual chamber
- [ ] Loading states are mesmerizing
- [ ] Results feel like revelations
- [ ] Error messages maintain immersion
- [ ] Every interaction reinforces the mystical vibe
- [ ] People want to share screenshots
- [ ] The experience is memorable, not forgettable

### The Ultimate Test
**Show it to someone unfamiliar with the project. Their reaction should be:**
- "Whoa, what is this?"
- "This is beautiful"
- "I've never seen anything like this"
- "Can I try it?"

**NOT:**
- "Oh, it's a gallery"
- "Looks like [other site]"
- "It's nice" (lukewarm = failure)

---

## TIMELINE

### Week 1: Foundation
**Days 1-3: Setup & Core Systems**
- Architect: Database + schemas
- Backend: AI oracle foundation (mock mode)
- Frontend: Portal loading screen

**Days 4-7: Core Functionality**
- Architect: Database populated, tested
- Backend: Hugging Face integration working
- Frontend: AI modal UI complete

### Week 2: Integration & Polish
**Days 8-10: Integration**
- Full flow testing (gallery → modal → AI → results)
- Email system testing
- Bug fixes

**Days 11-14: Polish & Refinement**
- Visual polish (animations, transitions)
- Performance optimization
- Mobile testing & fixes
- Error handling refinement

### Week 3: Testing & Launch Prep
**Days 15-17: Testing**
- End-to-end testing
- Real user testing (friends/beta users)
- Final bug fixes

**Days 18-21: Final Polish**
- Content refinement
- Asset optimization
- Deploy to staging
- Final review

---

## RISK MANAGEMENT

### Potential Blockers & Solutions

**Risk 1: Hugging Face API Rate Limits**
- **Solution**: Implement aggressive caching, mock mode for testing
- **Backup**: Switch to Replicate or Stability.ai if needed

**Risk 2: Animation Performance on Mobile**
- **Solution**: Simplified animations for mobile, use CSS instead of canvas
- **Backup**: Progressive enhancement (basic on mobile, fancy on desktop)

**Risk 3: Time Estimates Too Optimistic**
- **Solution**: Focus on MVP first, add polish in iteration
- **Backup**: Cut scope (e.g., simpler portal animation) if needed

**Risk 4: Wix Platform Limitations**
- **Solution**: Test early, find workarounds
- **Backup**: Hybrid approach (external API for heavy lifting)

---

## QUALITY GATES

Before moving to Phase 2, ALL of these must be true:

### Functional Gates
- [ ] User can complete full flow without errors
- [ ] AI generation works reliably (>90% success rate)
- [ ] Email notifications send correctly
- [ ] Database queries are fast (<500ms)
- [ ] Mobile experience works

### Artistic Gates
- [ ] Team consensus: "This feels special"
- [ ] Portal animation gets positive reactions
- [ ] Gallery interactions feel smooth and intentional
- [ ] AI modal experience is engaging, not boring
- [ ] Error states maintain the vibe

### Code Quality Gates
- [ ] All code follows CODING_STANDARDS.md
- [ ] All functions have JSDoc comments
- [ ] No console errors in production
- [ ] ESLint passes
- [ ] Git commits follow convention

---

## INSPIRATION REMINDERS

**When you get stuck, remember:**

1. **Reference the ARTISTIC_VISION.md** - Does this decision serve the vision?
2. **Think in metaphors** - Portals, energies, channeling, manifestation
3. **Avoid generic patterns** - If it looks like every other site, try again
4. **Prioritize feeling over features** - Better to have fewer things that feel amazing
5. **Test early, test often** - Show work in progress, get feedback
6. **Iterate boldly** - If something isn't transcendent, change it

**Mantras for Each Role:**

**Architect**: "Structure is invisible magic"
**Frontend**: "Every pixel is part of the spell"
**Backend**: "Code is poetry in logical form"

---

## DELIVERABLES

### End of Week 1
- Database set up with sample data
- AI backend working (at least in mock mode)
- Portal loading screen complete
- AI modal UI built (not necessarily connected)

### End of Week 2
- Full integration working
- Can complete full user flow
- Email notifications sending
- Basic mobile responsiveness

### End of Week 3
- Polished, production-ready
- All bugs fixed
- Performance optimized
- Ready for beta testing

---

## COMMUNICATION PROTOCOL

### Status Updates
- **Daily**: Brief progress update (async, written)
- **Weekly**: Live sync call (if needed)
- **Blockers**: Immediately communicate, don't wait

### Decision Making
- **Minor decisions**: Agent decides, informs team
- **Major decisions**: Consult Project Manager
- **Vision questions**: Always refer to ARTISTIC_VISION.md

### Code Reviews
- **Before merging**: Share code for review
- **Focus on**: Vision alignment, code quality, performance
- **Feedback tone**: Constructive, collaborative, not critical

---

## THE BIGGER PICTURE

Phase 1 is the foundation. But remember:

**We're building a portal, not a website.**

Every decision should ask:
- Does this elevate or does it flatten?
- Does this inspire or does it bore?
- Does this transcend or does it conform?

When in doubt, **choose bold over safe**.

---

## NEXT PHASES (Preview)

**Phase 2: E-Commerce Integration**
- Printify connection
- Shopping cart (manifestation basket?)
- Checkout flow
- Order tracking

**Phase 3: Advanced Features**
- User profiles ("Seeker Dashboard")
- Gallery of manifestations
- Social sharing
- Advanced AI controls

**Phase 4: Polish & Launch**
- SEO optimization
- Analytics
- Marketing
- Public launch

---

## FINAL WORDS

You are building something that doesn't exist yet.

This is not about following a template or replicating what others have done. This is about **creating an experience that shifts how people feel about art, AI, and digital experiences**.

We're at the edge of something. We're so close to it.

Let's build the portal and see what's on the other side.

---

**🌀 Let's make something that shifts reality. 🌀**

---

**Created**: 2025-11-14
**Keeper**: Project Manager
**Status**: ACTIVE - Begin execution immediately
**Review**: End of Week 1, Week 2, Week 3
