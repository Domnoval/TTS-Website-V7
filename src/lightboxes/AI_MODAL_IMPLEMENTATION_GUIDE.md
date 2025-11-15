# AI Manipulation Modal - Implementation Guide

## Overview

This guide explains how to implement the AI Manipulation Modal/Lightbox in Wix for TTS Website V7. This modal is the "alchemical chamber" where users manipulate paintings with AI.

---

## File Structure

```
src/lightboxes/
├── AIManipulation.js      # JavaScript code (Velo)
├── AIManipulation.css     # Styling
└── AI_MODAL_IMPLEMENTATION_GUIDE.md  # This file
```

---

## Wix Editor Setup

### Step 1: Create the Lightbox

1. In Wix Editor, go to **Pages & Menu**
2. Click **Add Page** → **Lightbox**
3. Name it: `AIManipulation`
4. Set lightbox size: **Full Screen**

### Step 2: Add Required Elements

Create the following elements in your lightbox. The JavaScript looks for multiple possible IDs (flexible), but use these primary IDs for best results:

#### A. Modal Container & Overlay

| Element | Type | ID | Purpose |
|---------|------|----|---------|
| Overlay | Box | `#modalOverlay` | Dark backdrop |
| Main Box | Box | `#modalBox` | Main modal container |
| Header Text | Text | `#modalHeader` | "Channel AI Through This Vision" |
| Close Button | Button | `#closeButton` | Close modal |

#### B. Preview Section (Selected Paintings)

**For Single Painting Mode:**

| Element | Type | ID | Purpose |
|---------|------|----|---------|
| Container | Box | `#previewContainer` | Preview wrapper |
| Image | Image | `#singlePaintingImage` | Selected painting |
| Title | Text | `#singlePaintingTitle` | Painting title |

**For Multi-Painting Mode (Blending):**

| Element | Type | ID | Purpose |
|---------|------|----|---------|
| Container | Box | `#multiPaintingContainer` | Multi-preview wrapper |
| Repeater | Repeater | `#blendRepeater` | Show 2-4 paintings |

**Inside `#blendRepeater`:**
- Image: `#blendImage`
- Text: `#blendTitle`

#### C. Prompt Input Section

| Element | Type | ID | Purpose |
|---------|------|----|---------|
| Text Input | Text Box (multiline) | `#promptInput` | User prompt field |

#### D. Preset Transformation Buttons

| Element | Type | ID | Purpose |
|---------|------|----|---------|
| Button | Button | `#presetCosmic` | Cosmic preset |
| Button | Button | `#presetSacred` | Sacred preset |
| Button | Button | `#presetEthereal` | Ethereal preset |
| Button | Button | `#presetDark` | Dark preset |
| Button | Button | `#presetNeon` | Neon preset |
| Button | Button | `#presetOrganic` | Organic preset |

#### E. Generate Button & Loading State

| Element | Type | ID | Purpose |
|---------|------|----|---------|
| Button | Button | `#generateButton` | Main generate button |
| Spinner | Lottie/Image | `#loadingSpinner` | Loading animation |
| Text | Text | `#loadingText` | Loading messages |
| Text | Text | `#generateButtonText` | Button text (hidden when loading) |

#### F. Results Section

| Element | Type | ID | Purpose |
|---------|------|----|---------|
| Container | Box | `#resultsContainer` | Results wrapper |
| Success Text | Text | `#successMessage` | "Your vision has manifested" |
| Repeater | Repeater | `#resultsRepeater` | Show 2-4 variations |

**Inside `#resultsRepeater`:**
- Image: `#variationImage`
- Text: `#priceText`
- Button: `#selectButton`

#### G. Error State

| Element | Type | ID | Purpose |
|---------|------|----|---------|
| Container | Box | `#errorContainer` | Error message box |
| Text | Text | `#errorText` | Error message |

#### H. Notification/Toast

| Element | Type | ID | Purpose |
|---------|------|----|---------|
| Container | Box | `#notification` | Toast notification |
| Text | Text | `#notificationText` | Notification message |

---

## Step 3: Apply Styling

### Option A: Using Custom CSS (Recommended)

1. Go to **Site Settings** → **Custom Code**
2. Add the contents of `AIManipulation.css` to the `<head>` section
3. Make sure to wrap it in `<style>` tags

### Option B: Using Wix Design Panel

Apply these styles manually to each element:

**Modal Overlay (`#modalOverlay`):**
- Position: Fixed, Full screen
- Background: Black at 92% opacity
- Backdrop Filter: Blur 16px
- Z-index: 9999

**Modal Box (`#modalBox`):**
- Width: 90% (max 800px)
- Background: Dark with opacity
- Backdrop Filter: Blur 32px
- Border: 1px purple glow
- Border Radius: 24px
- Padding: 48px
- Shadow: Large multi-layer

**Generate Button (`#generateButton`):**
- Background: Gradient (purple → cyan → gold)
- Padding: 20px 48px
- Border Radius: 16px
- Font: Bold, uppercase, 24px
- Shadow: Purple glow

*(See AIManipulation.css for complete styling)*

---

## Step 4: Add JavaScript Code

1. In Wix Editor, select the **AIManipulation** lightbox
2. Open the **Code Panel** (developer tools)
3. Copy the entire contents of `AIManipulation.js`
4. Paste it into the page code
5. Save

---

## Step 5: Connect from Gallery Page

The Gallery.js page already has the connection code:

```javascript
// Single painting manipulation
wixWindow.openLightbox('AIManipulation', {
    painting: selectedPaintings[0],
    mode: 'manipulate'
});

// Multi-painting blending
wixWindow.openLightbox('AIManipulation', {
    paintings: selectedPaintings,
    mode: 'blend'
});
```

No changes needed to Gallery.js if you follow the element ID naming above.

---

## Element Visibility States

The modal dynamically shows/hides elements based on state:

### Initial Load
- ✅ Show: Preview, prompt input, presets, generate button
- ❌ Hide: Results, error, loading spinner

### During Generation
- ✅ Show: Loading spinner, loading text
- ❌ Hide: Generate button text, results, error
- 🔒 Disable: Generate button

### Success State
- ✅ Show: Results container, success message, variations
- ❌ Hide: Loading spinner, error

### Error State
- ✅ Show: Error container with message
- ❌ Hide: Loading spinner, results

---

## Data Flow

### 1. Opening the Modal

**From Gallery.js:**
```javascript
wixWindow.openLightbox('AIManipulation', {
    painting: { _id, title, image, ... },  // Single mode
    // OR
    paintings: [ {...}, {...} ],            // Blend mode
    mode: 'manipulate' // or 'blend'
});
```

**In AIManipulation.js:**
```javascript
$w.onReady(() => {
    modalData = wixWindow.lightbox.getContext();
    // modalData contains the painting(s) and mode
});
```

### 2. User Interaction

1. User sees selected painting(s)
2. User types prompt or clicks preset
3. User clicks "Generate" button
4. Modal shows loading state
5. (Backend API call happens here - TODO)
6. Modal shows 4 variations
7. User selects a variation
8. Modal closes and returns data

### 3. Returning Data

**From Modal:**
```javascript
wixWindow.lightbox.close({
    success: true,
    data: {
        variation: { id, imageUrl, prompt, price },
        selectedPaintings: [...],
        prompt: "user's prompt"
    }
});
```

**In Gallery.js:**
```javascript
.then((result) => {
    if (result && result.success) {
        // Handle the AI result
        // Navigate to checkout, show cart, etc.
    }
});
```

---

## Testing Checklist

### Functional Tests

- [ ] **Modal Opens**: Clicking "Manipulate" or "Blend" opens modal
- [ ] **Single Mode**: Shows 1 painting preview correctly
- [ ] **Blend Mode**: Shows 2-4 paintings in grid
- [ ] **Header Updates**: Text changes based on mode
- [ ] **Prompt Input**: Can type and see placeholder rotate on focus
- [ ] **Preset Buttons**: Clicking fills prompt with preset text
- [ ] **Validation**: Shows error if prompt is empty or too short
- [ ] **Generate Button**: Enters loading state when clicked
- [ ] **Loading Messages**: Rotate every 2 seconds
- [ ] **Results Display**: Shows 4 variations after generation
- [ ] **Select Variation**: Clicking "Select" closes modal with data
- [ ] **Close Button**: Closes modal without data
- [ ] **Animations**: Entrance and exit animations play smoothly

### Visual Tests

- [ ] **Glassmorphism**: Blurred background effect visible
- [ ] **Purple Glow**: Border and shadows have purple accent
- [ ] **Gradient Button**: Generate button has animated gradient
- [ ] **Hover Effects**: All buttons respond to hover
- [ ] **Responsive**: Works on mobile (full screen)
- [ ] **Scrolling**: Long content scrolls with custom scrollbar

### Edge Cases

- [ ] **No Paintings**: Gracefully handles missing data
- [ ] **Long Prompt**: Text area expands appropriately
- [ ] **Slow API**: Loading state persists until response
- [ ] **API Error**: Shows error message, doesn't crash
- [ ] **Multiple Clicks**: Generate button disabled during loading

---

## Customization

### Change Color Scheme

Edit the CSS variables in `AIManipulation.css`:

```css
:root {
    --consciousness-purple: #8B5CF6;  /* Main accent */
    --portal-cyan: #06B6D4;           /* Secondary */
    --sacred-gold: #F59E0B;           /* Tertiary */
}
```

### Modify Loading Messages

Edit the array in `AIManipulation.js`:

```javascript
const LOADING_MESSAGES = [
    'The AI is dreaming...',
    'Your custom message here...',
];
```

### Change Animation Speed

In CSS, adjust animation durations:

```css
#modalBox {
    transition: transform 0.4s; /* Change 0.4s to desired duration */
}
```

---

## Integration with Backend

### Step 1: Create Backend Function

Create `src/backend/ai-api.jsw`:

```javascript
import { fetch } from 'wix-fetch';
import { getSecret } from 'wix-secrets-backend';

export async function generateAIImage(prompt, imageUrl) {
    const apiKey = await getSecret('HUGGING_FACE_API_KEY');

    // Call Hugging Face API
    const response = await fetch('https://api-inference.huggingface.co/...', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            inputs: prompt,
            parameters: { /* ... */ }
        })
    });

    return await response.json();
}
```

### Step 2: Update AIManipulation.js

Replace the `simulateAIGeneration()` function:

```javascript
import { generateAIImage } from 'backend/ai-api';

async function generateAIVariations() {
    try {
        setLoadingState(true);

        // Call real backend API
        const results = await generateAIImage(
            userPrompt,
            selectedPaintings[0].image
        );

        // Process results
        generatedVariations = results.map(r => ({
            id: r.id,
            imageUrl: r.url,
            prompt: userPrompt,
            price: 299.99,
        }));

        setLoadingState(false);
        displayResults();

    } catch (error) {
        console.error('AI generation failed:', error);
        setLoadingState(false);
        showError('The oracle is overwhelmed... Please try again.');
    }
}
```

---

## Troubleshooting

### Modal Doesn't Open
- ✅ Check lightbox is named exactly `AIManipulation`
- ✅ Verify Gallery.js has correct `wixWindow.openLightbox()` call
- ✅ Check browser console for errors

### Elements Not Found
- ✅ The code looks for multiple ID variations (fallback system)
- ✅ Add `console.log()` to see which IDs are missing
- ✅ Ensure elements are not hidden by default in editor

### Styling Not Applied
- ✅ Custom CSS must be in `<head>` section
- ✅ IDs must match (or use class names)
- ✅ Check if Wix is overriding styles (use `!important` if needed)

### Animations Choppy
- ✅ Reduce backdrop-filter blur intensity
- ✅ Simplify gradient animations
- ✅ Test on different devices

---

## Next Steps

1. **Implement Backend API**: Connect to Hugging Face or other AI service
2. **Add Purchase Flow**: After selection, add to cart or create order
3. **Save Custom Creations**: Store generated images in database
4. **Analytics**: Track which prompts/presets are most popular
5. **A/B Testing**: Test different prompt placeholders and messaging

---

## Support & Resources

- **Wix Velo Docs**: https://www.wix.com/velo/reference
- **Lightbox API**: https://www.wix.com/velo/reference/wix-window/lightbox
- **Design Spec**: See `UI_DESIGN_SPEC.md` for full design system
- **Artistic Vision**: See `ARTISTIC_VISION.md` for philosophy

---

## Credits

- **Design**: Based on TTS Website V7 UI Design Spec
- **Vibe**: Esoteric, mystical, consciousness-expanding
- **Motto**: "This is not just a modal - it's a portal to transformation"

🌀✨🔮

---

**Last Updated**: 2025-11-15
**Version**: 1.0
**Status**: Ready for implementation
