# Portal Loading Screen - Wix Setup Guide

**TTS Website V7**

This guide will walk you through setting up the epic portal loading screen in your Wix website. The portal animation creates a mystical, consciousness-expanding entry experience that aligns with our artistic vision.

---

## Overview

The portal loading screen consists of:
- Cosmic background with constellation effects
- Sacred geometry formation animation (point → circle → hexagon → flower of life)
- Rotating mystical loading messages
- Circular progress indicator
- Smooth fade transition to homepage content
- localStorage integration (only shows on first visit)

**Duration**: 3-4 seconds
**Mobile responsive**: Yes
**Performance**: Optimized with CSS animations

---

## Step 1: Add CSS to Your Wix Site

### Method A: Using Wix Custom Code (Recommended)

1. Open your Wix Editor
2. Go to **Settings** (gear icon in top-right)
3. Click **Custom Code** in the Advanced section
4. Click **+ Add Custom Code**
5. Configure:
   - **Code snippet name**: "Portal Loading Screen Styles"
   - **Add code to**: Head
   - **Code type**: CSS
   - **Load on**: All Pages
6. Copy the entire contents of `/src/styles/portal-loading-screen.css`
7. Wrap it in `<style>` tags:

```html
<style>
/* Paste the entire portal-loading-screen.css contents here */
</style>
```

8. Click **Apply**

### Method B: Using Wix Page Settings

1. Open the page you want to add the portal to (usually Home page)
2. Click the **Page menu** (three dots) → **Settings**
3. Go to **SEO (Google)** → **Advanced SEO**
4. Scroll to **Additional tags**
5. Click **+ Add Tag** → **Custom Tag**
6. Paste the `<style>` block as above
7. Click **Apply**

---

## Step 2: Create Portal Elements in Wix Editor

### 2.1 Create the Portal Container

1. **Add a Container Box**:
   - Click **Add** (+) → **Container & Layout** → **Box**
   - Stretch it to **full width and full height** of the page
   - Position: **Fixed** (important!)
   - Top: 0, Left: 0, Width: 100vw, Height: 100vh

2. **Configure the Container**:
   - Click the box → **Properties Panel**
   - Set **Element ID**: `portalLoadingScreen`
   - Background: `#0A0A0F` (cosmic black)
   - Z-index: 99999 (so it's on top of everything)
   - Initially set to **Visible** (we'll hide it via code)

3. **Add Layout Settings**:
   - Click **Layout** → **Alignment**
   - Center both horizontally and vertically
   - Direction: Column (vertical stack)

### 2.2 Create Sacred Geometry Element

1. **Add a Shape**:
   - Click **Add** (+) → **Shape** → **Circle** (or use a decorative SVG)
   - Size: 300px x 300px
   - Position it in the **center** of the container

2. **Configure the Shape**:
   - Set **Element ID**: `sacredGeometry`
   - Fill: Set to gradient (purple to cyan)
   - Opacity: Start at 100%
   - Add **Design** → **Effects** → **Glow** (purple color)

3. **Alternative - Use a Vector Art Element**:
   - For more complex sacred geometry, upload an SVG
   - Search for "sacred geometry SVG" or "flower of life SVG"
   - Upload via **Add** (+) → **Image** → **Upload Media**
   - Set Element ID: `sacredGeometry`

### 2.3 Create Loading Text

1. **Add Text Element**:
   - Click **Add** (+) → **Text** → **Add Text**
   - Position it **below** the sacred geometry (60px margin-top)

2. **Configure the Text**:
   - Set **Element ID**: `portalLoadingText`
   - Text: "Opening the portal..."
   - Font: **Cormorant Garamond** (or similar elegant serif)
   - Size: 32px
   - Color: `#FAFAFF` (ethereal white)
   - Alignment: Center
   - Add **Text Effects** → **Shadow** → Soft glow

3. **Typography Settings**:
   - Font weight: 300 (Light)
   - Letter spacing: 2px
   - Line height: 1.5

### 2.4 Create Progress Ring

1. **Add a Shape**:
   - Click **Add** (+) → **Shape** → **Circle**
   - Size: 120px x 120px
   - Position it **below** the loading text (40px margin-top)

2. **Configure the Ring**:
   - Set **Element ID**: `portalProgressRing`
   - Fill: None (transparent)
   - Border: 3px solid, color `#8B5CF6` (consciousness purple)
   - Add **Effects** → **Glow** → Purple
   - Opacity: Start at 0% (will animate to 100%)

3. **Alternative - Use Lottie Animation**:
   - For a more advanced spinner, use a Lottie file
   - Upload a sacred geometry spinner animation
   - Set ID: `portalProgressRing`

### 2.5 Create Main Content Container

1. **Select your homepage content**:
   - This is everything that's NOT the portal loading screen
   - All your hero sections, galleries, etc.

2. **Wrap in a Container** (if not already):
   - Select all content elements
   - Right-click → **Organize** → **Group**
   - Or add a Box and move content inside

3. **Configure the Container**:
   - Set **Element ID**: `mainContent`
   - Initial state: Hidden (will be shown via code)
   - Opacity: 0% initially (we'll animate it in)

---

## Step 3: Add the JavaScript Code (Velo)

### 3.1 Enable Velo Dev Mode

1. In Wix Editor, click **Dev Mode** (< > icon in top-left)
2. If prompted, click **Turn on Developer Tools**
3. The Velo sidebar will appear

### 3.2 Add Code to Home Page

1. In the Velo sidebar, find **Site Structure** → **Pages**
2. Click on your **Home page** (usually named "Home")
3. This will open/create a file like `Home.js` or `Home Page.js`

4. **Replace the content** with the enhanced code from `/src/pages/Home.js`

5. Make sure the imports are at the top:
```javascript
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import { local } from 'wix-storage';
```

6. **Save** the file (Ctrl/Cmd + S)

### 3.3 Test in Preview Mode

1. Click **Preview** in the top-right
2. You should see the portal animation play
3. Check that:
   - Background is cosmic black
   - Sacred geometry animates
   - Loading messages rotate
   - Progress ring appears
   - Portal fades out after 3-4 seconds
   - Main content fades in smoothly

---

## Step 4: Optional Enhancements

### 4.1 Add Background Particles

1. **Add Image Elements** (2-3px dots):
   - Create 6-8 small circle shapes (2px x 2px)
   - Add class: `particle`
   - Distribute them across the portal container
   - They will animate upward with the CSS

2. **Alternative - Use a Lottie Animation**:
   - Create a particle effect in Lottie
   - Add to portal background layer
   - Loop continuously

### 4.2 Add Constellation Stars

1. **Add Shape Elements**:
   - Create 8-10 small circles (3px x 3px)
   - Add class: `constellation-star`
   - Randomly position across the portal
   - CSS will make them pulse

### 4.3 Add Skip Button (Optional)

1. **Add a Button**:
   - Click **Add** (+) → **Button**
   - Position: Bottom-right (40px from edges)
   - Text: "Skip" or "Enter Now"

2. **Configure**:
   - Set **Element ID**: `skipPortalButton`
   - Style: Minimal (outlined, ghost style)
   - Color: Purple with low opacity

3. **Add Click Handler** in your Home.js:
```javascript
$w('#skipPortalButton').onClick(() => {
    exitPortalAnimation(portalContainer, loadingText, progressRing, sacredGeometry);
});
```

### 4.4 Add Sound (Advanced)

1. Upload a subtle "whoosh" or cosmic sound effect
2. Add to Wix media library
3. In Home.js, import and play:
```javascript
import { sound } from 'wix-site';

// In showPortalLoadingScreen():
sound.play('portal-whoosh.mp3', { volume: 15 });
```

---

## Step 5: Mobile Optimization

### 5.1 Responsive Settings

1. **Switch to Mobile View** in Wix Editor
2. Adjust portal elements:
   - Sacred Geometry: Reduce to 200px x 200px
   - Loading Text: 24px font size
   - Progress Ring: 80px x 80px
   - Spacing: Reduce margins by 30%

3. **Hide particles on mobile**:
   - Select particle elements
   - In mobile view → **Hide Element**

### 5.2 Test on Actual Devices

1. **Preview on mobile**:
   - Click Preview → Mobile
   - Test on actual phone if possible

2. **Check performance**:
   - Should still be smooth (60fps)
   - Animations should play without lag
   - If laggy, reduce particle count

---

## Step 6: Configure localStorage Behavior

The portal only shows once per user (stored in localStorage).

### Reset Portal for Testing

While developing, you may want to reset the portal:

**Option 1 - Browser Console**:
```javascript
// Open browser console (F12)
localStorage.removeItem('portalShown');
// Refresh page to see portal again
```

**Option 2 - Add a Reset Button** (development only):
```javascript
// In Home.js:
$w('#resetPortalButton').onClick(() => {
    local.removeItem('portalShown');
    wixLocation.to('/'); // Reload page
});
```

**Option 3 - Incognito/Private Mode**:
- Open site in incognito window
- Portal will always show (no localStorage)

---

## Troubleshooting

### Issue: Portal doesn't appear

**Solutions**:
1. Check Element IDs match exactly:
   - `portalLoadingScreen`
   - `portalLoadingText`
   - `portalProgressRing`
   - `sacredGeometry`
   - `mainContent`

2. Check Velo is enabled (Dev Mode on)

3. Check browser console for errors (F12)

4. Make sure CSS was added correctly

### Issue: Animations are choppy

**Solutions**:
1. Reduce number of particles (remove some)
2. Simplify sacred geometry animation
3. Test on desktop first, then mobile
4. Check browser performance (close other tabs)

### Issue: Portal stays on screen

**Solutions**:
1. Check that `exitPortalAnimation()` is being called
2. Verify timeout durations in code
3. Check for JavaScript errors in console
4. Ensure localStorage is working (not blocked)

### Issue: Content doesn't fade in

**Solutions**:
1. Check `#mainContent` element ID is set
2. Verify `initializeHomePage()` function is called
3. Check CSS animation is applied
4. Make sure content is not hidden in Wix editor

### Issue: Different behavior on mobile

**Solutions**:
1. Check mobile-specific CSS rules
2. Test in actual mobile browser (not just desktop resize)
3. Reduce animation complexity for mobile
4. Check touch interactions work

---

## Performance Checklist

- [ ] CSS file is minified (remove comments for production)
- [ ] Lottie files are optimized (< 100kb each)
- [ ] Images/SVGs are compressed
- [ ] Particle count is reasonable (6-8 max)
- [ ] Animations use `transform` and `opacity` (GPU accelerated)
- [ ] `will-change` is used sparingly
- [ ] Reduced motion preferences respected
- [ ] Tested on low-end mobile devices
- [ ] Page load time is acceptable (< 3 seconds)

---

## Accessibility Checklist

- [ ] Reduced motion CSS is implemented
- [ ] Portal can be skipped (optional skip button)
- [ ] Loading messages are announced (ARIA live regions)
- [ ] Color contrast is sufficient (text vs background)
- [ ] Keyboard navigation works (can tab through)
- [ ] Screen readers can access content after portal

---

## Final Testing Checklist

### Desktop
- [ ] Portal appears on first visit
- [ ] Sacred geometry animates smoothly
- [ ] Loading messages rotate every 2 seconds
- [ ] Progress ring spins
- [ ] Portal exits after 3-4 seconds
- [ ] Main content fades in smoothly
- [ ] Portal doesn't show on subsequent visits
- [ ] All animations are smooth (60fps)

### Mobile
- [ ] Portal is responsive (scaled properly)
- [ ] Animations are smooth (no lag)
- [ ] Text is readable
- [ ] Touch interactions work
- [ ] Performance is acceptable

### Cross-Browser
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (Mac/iOS)
- [ ] Mobile browsers (Chrome, Safari)

---

## Advanced Customization

### Change Animation Duration

In `Home.js`, modify:
```javascript
const minDisplayTime = 3000; // Change to 5000 for 5 seconds
```

In CSS, modify:
```css
#sacredGeometry {
    animation: geometryFormation 6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    /* Change from 4s to 6s */
}
```

### Change Color Scheme

Edit CSS custom properties at the top of the CSS file:
```css
:root {
    --consciousness-purple: #8B5CF6; /* Change to your color */
    --portal-cyan: #06B6D4; /* Change to your color */
    --sacred-gold: #F59E0B; /* Change to your color */
}
```

### Add Your Own Loading Messages

In `Home.js`, modify the array:
```javascript
const LOADING_MESSAGES = [
    "Opening the portal...",
    "Your custom message here...",
    "Another mystical message...",
    // Add as many as you want
];
```

### Force Portal to Always Show

In `Home.js`, change:
```javascript
// From:
if (!hasVisited || hasVisited !== 'true') {

// To:
if (true) { // Always show
```

Or remove localStorage entirely:
```javascript
// Comment out:
// local.setItem('portalShown', 'true');
```

---

## Next Steps

After the portal is working:

1. **Add more pages** (Gallery, Store, About, Contact)
2. **Implement page transitions** (portal close → portal open between pages)
3. **Add scroll animations** for homepage content
4. **Implement the Gallery system** with AI integration
5. **Set up e-commerce** for the store

---

## Resources

### Fonts
- **Inter**: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- **Cormorant Garamond**: [Google Fonts - Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)

### Inspiration
- Sacred geometry patterns: [Sacred Geometry Web](https://www.sacredgeometryweb.com/)
- Cosmic animations: [CodePen - Space animations](https://codepen.io/search/pens?q=space+animation)
- Lottie animations: [LottieFiles](https://lottiefiles.com/)

### Documentation
- Wix Velo: [dev.wix.com](https://dev.wix.com/)
- CSS Animations: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- localStorage API: [MDN - localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## Support

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Review the **browser console** for errors (F12)
3. Test in **incognito mode** to rule out cache issues
4. Verify all **Element IDs** match exactly
5. Ensure **Velo is enabled** and code is saved

---

**Created**: 2025-11-15
**Version**: 1.0
**Status**: Ready for Implementation
**Project**: TTS Website V7 - Portal Loading Screen

🌀 **Let's create a portal, not a website.** ✨
