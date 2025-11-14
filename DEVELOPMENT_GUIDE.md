# Development Guide - TTS Website V7

## 🚀 Live Preview Setup

### The Wix Development Workflow

Wix provides a **live preview environment** where you can:
- See your site in real-time as you code
- Click on elements and test interactions
- See changes instantly when you save files
- Test on different screen sizes
- Debug with browser dev tools

---

## Setting Up Live Preview

### Step 1: Connect to Wix Site

First, you need to connect this local project to a Wix site.

**Option A: Create New Wix Site**
1. Go to https://www.wix.com/
2. Create a new site (choose blank template)
3. Enable Velo (Dev Mode) in the site
4. Copy the site ID

**Option B: Use Existing Site**
If you already have a Wix site with the same siteId in `wix.config.json`

### Step 2: Update wix.config.json

Edit `wix.config.json`:
```json
{
  "siteId": "YOUR-ACTUAL-SITE-ID-HERE",
  "uiVersion": "1"
}
```

Replace `YOUR-ACTUAL-SITE-ID-HERE` with your real Wix site ID.

### Step 3: Install Dependencies

```bash
cd D:\TTS_WEBSITE_V7
npm install
```

This installs:
- `@wix/cli` - Wix command line tools
- `eslint` - Code linting
- `react` - For Wix components

### Step 4: Login to Wix CLI

```bash
wix login
```

This opens a browser to authenticate with your Wix account.

### Step 5: Start Live Preview

```bash
npm run dev
```

Or directly:
```bash
wix dev
```

This will:
1. ✅ Start local development server
2. ✅ Open browser with Wix Editor
3. ✅ Enable live reload (changes show instantly)
4. ✅ Connect to your Wix site

---

## What You Get with `wix dev`

### Live Preview Features:

**Real-Time Editing:**
- Edit `.js` files → See changes immediately
- Modify page code → Refreshes automatically
- Change backend → Reloads seamlessly

**Interactive Testing:**
- Click buttons and test flows
- Test gallery selection system
- Try AI modal interactions
- Test on mobile viewport

**Browser DevTools:**
- Inspect elements
- Debug JavaScript
- View console logs
- Test responsive design

**Wix Editor Access:**
- Design pages visually
- Add elements (buttons, images, etc.)
- Configure element IDs
- Set up repeaters and datasets

---

## Development Workflow

### Typical Session:

1. **Start Dev Server**
   ```bash
   npm run dev
   ```

2. **Open Two Windows:**
   - **Left**: Code editor (VS Code, Cursor, etc.)
   - **Right**: Browser with live preview

3. **Make Changes:**
   - Edit `src/pages/Gallery.js`
   - Save file (Ctrl+S)
   - Browser auto-refreshes
   - See changes instantly!

4. **Test Interactions:**
   - Click paintings in gallery
   - Test selection modes
   - Try AI modal (with mock data)
   - Check responsive design

5. **Commit When Ready:**
   ```bash
   git add .
   git commit -m "feat: added epic portal animation"
   git push
   ```

---

## Alternative: Wix Editor (Cloud-Based)

If local dev doesn't work or you want to work from phone/tablet:

### Wix Online Editor:

1. Go to https://manage.wix.com/
2. Select your site
3. Click "Edit Site"
4. Enable Dev Mode / Velo
5. Edit code in browser

**Pros:**
- Works on any device (even phone!)
- No local setup needed
- Can design + code in one place
- Auto-saves to cloud

**Cons:**
- Slower than local dev
- Less powerful than local IDE
- Need internet connection

---

## For This Project Specifically

### What We Need to Preview:

1. **Portal Loading Screen** (`Home.js`)
   - See the animation
   - Test skip functionality
   - Check timing (3-5 seconds)

2. **Gallery** (`Gallery.js`)
   - Click paintings to select
   - Test single/multi modes
   - See hover effects
   - Try AI buttons

3. **AI Modal** (will be a lightbox)
   - Enter prompts
   - Click "Generate" button
   - See loading states
   - View results

4. **Store** (`Store.js`)
   - Browse products
   - Test cart interactions

### Elements We Need to Add in Wix Editor:

Before code works fully, you'll need to:

**In Gallery Page:**
- Add `#portfolioRepeater` (repeater element)
- Add `#aiControlPanel` (container)
- Add `#manipulateButton` (button)
- Add `#blendButton` (button)
- Add `#clearSelectionButton` (button)

**In Home Page:**
- Add `#portalLoadingScreen` (container)
- Add `#mainContent` (container)
- Add `#heroCTA` (button)

**Lightbox for AI Modal:**
- Create lightbox named "AIManipulation"
- Add prompt input, generate button, results area

---

## Mobile Development (From Phone)

### GitHub Codespaces (Recommended for Mobile):

1. Go to repo: https://github.com/Domnoval/TTS-Website-V7
2. Click green "Code" button
3. "Codespaces" tab → "Create codespace"
4. **Full VS Code in browser!**
5. Edit code on phone
6. Use Wix Editor online for preview

### GitHub Mobile App:
- View code
- Read docs
- Make small edits
- Can't run `wix dev` but can edit files

---

## Troubleshooting

### "wix: command not found"
```bash
npm install -g @wix/cli
wix login
```

### "No site connected"
Update `wix.config.json` with your actual site ID.

### "Permission denied"
Run:
```bash
wix logout
wix login
```

### Changes not showing?
1. Hard refresh (Ctrl+Shift+R)
2. Restart `wix dev`
3. Clear browser cache

### Can't click elements?
Elements need to be added in Wix Editor first, then controlled by code.

---

## Tips for Best Experience

### Performance:
- Close unnecessary browser tabs
- Use Chrome/Edge (best Wix support)
- Disable browser extensions if buggy

### Code Changes:
- Save file → Auto-refresh
- No need to manually reload
- Watch terminal for errors

### Testing:
- Test on actual Wix preview URL
- Use browser DevTools (F12)
- Check console for errors
- Test mobile with DevTools device emulation

---

## Next Steps

1. **Create/Connect Wix Site**
   - Get site ID
   - Update `wix.config.json`

2. **Install & Login**
   ```bash
   npm install
   wix login
   ```

3. **Start Dev Server**
   ```bash
   npm run dev
   ```

4. **Start Building!**
   - Add elements in Editor
   - Write code in IDE
   - See magic happen live!

---

🌀 **With live preview, the portal comes alive before your eyes!** 🌀
