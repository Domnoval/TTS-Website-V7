# TTS Website V7 - Project Roadmap

## 🎯 Mission
Build an AI-interactive art gallery where customers can manipulate and blend paintings, then purchase custom prints.

---

## 📋 PRIORITIZED TO-DO LIST

### 🔥 PRIORITY 1: CORE GALLERY FUNCTIONALITY (CRITICAL PATH)

#### 1.1 AI Manipulation Modal/Lightbox
- [ ] Create lightbox page for AI manipulation interface
- [ ] Design UI: prompt input, image preview, loading states
- [ ] Add "Generate" button with loading animation
- [ ] Display original painting(s) in modal
- [ ] Show generated results (2-4 variations)
- [ ] Add "Select & Purchase" button for each variation
- [ ] Handle modal close/cancel actions
- [ ] **Agent Recommendation**: UI/Frontend specialist

#### 1.2 Backend AI Integration
- [ ] Create `backend/ai-api.jsw` web module
- [ ] Implement Hugging Face API integration (FLUX-dev)
- [ ] Build `generateSingleImage(prompt, imageUrl)` function
- [ ] Build `blendMultipleImages(prompt, imageUrls[])` function
- [ ] Add error handling & retry logic
- [ ] Implement mock/test mode (for development without API calls)
- [ ] Add API key management (secrets)
- [ ] **Agent Recommendation**: Backend/API specialist

#### 1.3 Image Storage & Management
- [ ] Set up Wix Media Manager integration
- [ ] Create function to save AI-generated images
- [ ] Generate unique IDs for custom creations
- [ ] Create database collection for "CustomCreations"
- [ ] Store: originalPaintingIds, prompt, generatedImageUrl, userId, timestamp
- [ ] **Agent Recommendation**: Backend specialist

---

### 🎨 PRIORITY 2: USER EXPERIENCE ENHANCEMENTS

#### 2.1 Portal Loading Screen
- [ ] Design portal animation concept (CSS or Lottie)
- [ ] Implement portal opening animation
- [ ] Add particle effects or energy visualization
- [ ] Smooth transition from portal to homepage
- [ ] Add sound effects (optional)
- [ ] Make it skippable after first view
- [ ] **Agent Recommendation**: Animation/Frontend specialist

#### 2.2 Gallery UI Polish
- [ ] Design grid layout (masonry vs uniform)
- [ ] Add hover effects on paintings
- [ ] Implement smooth transitions for selection
- [ ] Add "floating" AI control panel design
- [ ] Create mode toggle buttons (single/multi)
- [ ] Add visual feedback for selections
- [ ] Implement scroll animations (fade-in, parallax)
- [ ] **Agent Recommendation**: UI/UX specialist

#### 2.3 Minimalist Site Design
- [ ] Define color palette (black/white + accent)
- [ ] Set up typography system
- [ ] Design navigation (minimal, clean)
- [ ] Create consistent button styles
- [ ] Design About page layout
- [ ] Design Contact page layout
- [ ] Add smooth page transitions
- [ ] **Agent Recommendation**: Design/Frontend specialist

---

### 💳 PRIORITY 3: E-COMMERCE INTEGRATION

#### 3.1 Custom Print Ordering System
- [ ] Create "Custom Print" product template in Wix Stores
- [ ] Build semi-manual workflow:
  - User creates AI art → saves to collection
  - Email notification sent to you
  - You create Printify product manually
  - Send purchase link to customer
- [ ] Create email template for notifications
- [ ] Set up `backend/email-notifications.jsw`
- [ ] Add "Save & Get Purchase Link" button in AI modal
- [ ] Create "My Creations" page for users to view saved art
- [ ] **Agent Recommendation**: E-commerce specialist

#### 3.2 Original Paintings Purchase Flow
- [ ] Ensure original paintings have "Buy Original" option
- [ ] Set prices for originals
- [ ] Add product variants (framed/unframed)
- [ ] Configure shipping options
- [ ] **Agent Recommendation**: E-commerce specialist

#### 3.3 Printify/Printful Store Setup
- [ ] Connect Printify account to Wix
- [ ] Create merch products (t-shirts, hoodies, etc.)
- [ ] Add TTS branding to products
- [ ] Configure product catalog in Store page
- [ ] Test checkout flow
- [ ] **Agent Recommendation**: E-commerce specialist

---

### 🔧 PRIORITY 4: TECHNICAL INFRASTRUCTURE

#### 4.1 Database Setup
- [ ] Create "Portfolio" collection (paintings)
  - Fields: title, image, description, price, category, tags
- [ ] Create "CustomCreations" collection
  - Fields: userId, originalPaintingIds[], prompt, generatedImageUrl, createdAt, status
- [ ] Set up proper permissions
- [ ] Add indexes for performance
- [ ] **Agent Recommendation**: Backend specialist

#### 4.2 Testing & Quality Assurance
- [ ] Test gallery selection (single/multi modes)
- [ ] Test AI generation with mock data
- [ ] Test AI generation with real Hugging Face API
- [ ] Test email notifications
- [ ] Test on mobile devices
- [ ] Test checkout flows
- [ ] Performance testing (page load times)
- [ ] **Agent Recommendation**: QA specialist

#### 4.3 Deployment & DevOps
- [ ] Connect to GitHub repository
- [ ] Set up environment variables (.env)
- [ ] Configure Wix secrets for API keys
- [ ] Test on Wix preview site
- [ ] Publish to production
- [ ] Set up monitoring/analytics
- [ ] **Agent Recommendation**: DevOps specialist

---

### 📚 PRIORITY 5: CONTENT & POLISH

#### 5.1 Content Creation
- [ ] Write About page copy
- [ ] Write Contact page copy
- [ ] Create gallery descriptions
- [ ] Add SEO meta tags
- [ ] Write product descriptions
- [ ] **Agent Recommendation**: Content specialist

#### 5.2 Asset Creation
- [ ] Source/create placeholder paintings for testing
- [ ] Design logo/branding
- [ ] Create favicon
- [ ] Design social media preview images
- [ ] **Agent Recommendation**: Design specialist

---

## 🚀 PARALLEL EXECUTION PLAN

### Phase 1 (Can Run in Parallel)
**Agent 1**: AI Backend Integration (1.2) + Image Storage (1.3)
**Agent 2**: AI Modal UI (1.1)
**Agent 3**: Portal Loading Screen (2.1)
**Agent 4**: Database Setup (4.1)

### Phase 2 (Can Run in Parallel - After Phase 1)
**Agent 1**: Gallery UI Polish (2.2)
**Agent 2**: Custom Print Ordering (3.1)
**Agent 3**: Minimalist Site Design (2.3)
**Agent 4**: Testing (4.2)

### Phase 3 (Sequential)
**Agent 1**: E-commerce Integration (3.2 + 3.3)
**Agent 2**: Content & Polish (5.1 + 5.2)
**Agent 3**: Deployment (4.3)

---

## 📊 PROGRESS TRACKING

- **Priority 1**: 0/13 tasks complete (0%)
- **Priority 2**: 0/17 tasks complete (0%)
- **Priority 3**: 0/12 tasks complete (0%)
- **Priority 4**: 0/10 tasks complete (0%)
- **Priority 5**: 0/9 tasks complete (0%)

**Overall Progress**: 0/61 tasks complete (0%)

---

## 🎯 SUCCESS CRITERIA

### MVP (Minimum Viable Product)
- [ ] Gallery displays paintings
- [ ] Users can select paintings
- [ ] AI manipulation works (single painting + prompt)
- [ ] AI blending works (multiple paintings)
- [ ] Users can save/order custom prints
- [ ] Store shows merch products
- [ ] Checkout works

### V1.0 Launch
- [ ] All MVP features
- [ ] Portal loading screen
- [ ] Polished UI/UX
- [ ] Mobile responsive
- [ ] SEO optimized
- [ ] Analytics tracking

---

**Last Updated**: 2025-11-14
**Status**: Planning Phase Complete, Ready for Parallel Execution
