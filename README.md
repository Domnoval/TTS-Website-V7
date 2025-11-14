# TTS Website V7 - AI Interactive Art Gallery

An innovative e-commerce platform where art meets AI. Customers can manipulate paintings with AI prompts or blend multiple artworks together to create unique custom prints.

## 🎨 Features

### Interactive AI Gallery
- **Single Painting Manipulation**: Select a painting and transform it with AI prompts
- **Multi-Painting Blending**: Combine 2-4 paintings into a unique masterpiece
- **Custom Print Ordering**: Purchase AI-generated custom prints
- **Original Art Sales**: Buy the original paintings

### E-commerce Store
- Printify/Printful integration for merch (shirts, hoodies, etc.)
- Custom print fulfillment system
- Seamless checkout experience

### Design
- Portal-style loading screen
- Minimalistic, clean aesthetic
- Epic gallery presentation inspired by cutting-edge interactive experiences
- Smooth animations and transitions

## 🛠️ Tech Stack

- **Platform**: Wix + Velo
- **AI**: Hugging Face Inference API (FLUX-dev)
- **Print-on-Demand**: Printify/Printful
- **Version Control**: Git

## 📁 Project Structure

```
TTS_WEBSITE_V7/
├── src/
│   ├── pages/           # Page code files
│   │   ├── Gallery.js   # Main interactive gallery
│   │   ├── Home.js      # Homepage with portal loading
│   │   ├── Store.js     # E-commerce store
│   │   └── ...
│   ├── backend/         # Backend web modules
│   │   └── ai-api.js    # AI generation API
│   └── public/          # Public shared code
│       └── utils.js     # Utility functions
├── package.json
├── wix.config.json
└── README.md
```

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development**
   ```bash
   npm run dev
   ```

3. **Connect to Wix**
   - Make sure you're logged in: `wix login`
   - Connect to your Wix site

## 🎯 Development Roadmap

### Phase 1: Interactive Gallery ✅ (In Progress)
- [x] Gallery page structure
- [x] Selection system (single/multi mode)
- [ ] AI manipulation modal
- [ ] AI blending interface
- [ ] Backend AI API integration
- [ ] Custom order workflow

### Phase 2: Site Polish
- [ ] Portal loading screen
- [ ] Minimalist page designs
- [ ] Navigation system
- [ ] About/Contact pages

### Phase 3: Store Integration
- [ ] Printify/Printful connection
- [ ] Original painting sales
- [ ] Checkout flow
- [ ] Order management

## 🔑 Environment Variables

Create a `.env` file with:
```
HUGGING_FACE_API_KEY=your_key_here
PRINTIFY_API_KEY=your_key_here
```

## 📝 Notes

- Using Hugging Face free tier (1000 API calls/month) for development
- Will upgrade to paid tier when live with customers
- Semi-manual print ordering workflow initially
- Full automation coming in future updates

## 💡 Vision

Transform the traditional art gallery experience into an interactive, engaging journey where customers become co-creators. Every piece can be personalized, every vision can be realized.

---

**Built with 🔥 by TTS**
