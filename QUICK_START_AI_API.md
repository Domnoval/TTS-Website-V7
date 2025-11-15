# AI Backend API - Quick Start Guide

**File**: `/src/backend/ai-api.jsw`
**Status**: Ready to use

---

## 🚀 Quick Setup

### 1. Enable Mock Mode (Development)
```javascript
// In Wix Secrets Manager:
AI_MOCK_MODE = "true"
```

### 2. Add API Key (Production)
```javascript
// In Wix Secrets Manager:
HUGGING_FACE_API_KEY = "hf_your_token_here"
AI_MOCK_MODE = "false"
```

---

## 📖 Basic Usage Examples

### Generate AI Variations (Single Painting)

```javascript
import { generateSingleImage } from 'backend/ai-api';

// Simple usage
const result = await generateSingleImage(
    "transform into cosmic nebula",
    "https://static.wixstatic.com/media/painting.jpg"
);

// With options
const result = await generateSingleImage(
    "surreal dreamscape",
    paintingUrl,
    {
        numVariations: 4,        // 1-4 variations
        guidanceScale: 8.0,      // 1-20, higher = follow prompt more
        negativePrompt: 'blurry, dark, ugly'
    }
);

// Check result
if (result.success) {
    console.log('Generated images:', result.data.images);
    // images = [
    //   { url: 'https://...', seed: 42, variation: 1 },
    //   { url: 'https://...', seed: 123, variation: 2 },
    //   ...
    // ]
} else {
    console.error('Error:', result.error.message);
}
```

### Blend Multiple Paintings

```javascript
import { blendMultipleImages } from 'backend/ai-api';

const result = await blendMultipleImages(
    "merge into cosmic fusion",
    [
        "https://painting1.jpg",
        "https://painting2.jpg",
        "https://painting3.jpg"
    ],
    { numVariations: 3 }
);
```

### Save Creation to Database

```javascript
import { saveCustomCreation } from 'backend/ai-api';

const saveResult = await saveCustomCreation({
    userId: currentUser.id,
    userEmail: currentUser.email,
    mode: 'manipulate',  // or 'blend'
    originalPaintingIds: [painting._id],
    userPrompt: userPrompt,
    enhancedPrompt: result.data.metadata.prompt,
    generatedImages: result.data.images,
    metadata: result.data.metadata
});

const creationId = saveResult.data._id;
```

### Get User's Creations

```javascript
import { getUserCreations } from 'backend/ai-api';

const creations = await getUserCreations(userId, {
    limit: 20,
    status: 'generated'  // optional filter
});

if (creations.success) {
    creations.data.creations.forEach(c => {
        console.log(c.userPrompt);
        console.log(c.generatedImages);
    });
}
```

### Update Creation Status

```javascript
import { updateCreationStatus } from 'backend/ai-api';

await updateCreationStatus(creationId, {
    status: 'selected',
    selectedVariation: 2,
    selectedImageUrl: selectedImageUrl
});
```

---

## 🎯 Complete Workflow Example

```javascript
import {
    generateSingleImage,
    saveCustomCreation,
    updateCreationStatus
} from 'backend/ai-api';

// 1. Generate AI variations
const genResult = await generateSingleImage(
    userPrompt,
    paintingUrl,
    { numVariations: 3 }
);

if (!genResult.success) {
    // Show error to user
    showError(genResult.error.message);
    return;
}

// 2. Save to database
const saveResult = await saveCustomCreation({
    userId: currentUser.id,
    userEmail: currentUser.email,
    mode: 'manipulate',
    originalPaintingIds: [paintingId],
    userPrompt: userPrompt,
    enhancedPrompt: genResult.data.metadata.prompt,
    generatedImages: genResult.data.images,
    metadata: genResult.data.metadata
});

// 3. Display to user
const creationId = saveResult.data._id;
displayImages(genResult.data.images);

// 4. User selects favorite
const userSelection = 2; // variation 2

// 5. Update with selection
await updateCreationStatus(creationId, {
    status: 'selected',
    selectedVariation: userSelection,
    selectedImageUrl: genResult.data.images[userSelection - 1].url
});

// 6. Proceed to order...
```

---

## 🔍 Response Format

### Success Response
```javascript
{
    success: true,
    data: {
        generationId: "gen_1234567890_abc123",
        images: [
            {
                url: "https://static.wixstatic.com/media/...",
                seed: 42,
                variation: 1
            },
            // ... more variations
        ],
        metadata: {
            model: "flux-dev",
            prompt: "enhanced prompt text...",
            originalPrompt: "user prompt",
            timestamp: "2025-11-15T12:00:00.000Z",
            duration: 15420
        }
    }
}
```

### Error Response
```javascript
{
    success: false,
    error: {
        message: "User-friendly error message",
        code: "ERROR_CODE",
        timestamp: "2025-11-15T12:00:00.000Z"
    }
}
```

---

## ⚡ Common Error Codes

| Code | User Message | What to Do |
|------|--------------|------------|
| `RATE_LIMIT` | "The cosmic connection is overwhelmed..." | Wait 10-60 minutes |
| `MODEL_LOADING` | "The oracle is awakening. Wait 20-30 seconds..." | Retry after 30 seconds |
| `API_ERROR` | "The portal encountered turbulence..." | Check API status, retry |
| `INVALID_PROMPT` | "Your intention needs clarity..." | Fix prompt input |
| `INVALID_IMAGE_URL` | "The painting could not be accessed..." | Check image URL |
| `API_KEY_ERROR` | "The oracle connection is not configured..." | Set up API key in Secrets |

---

## 🧪 Testing

### Test with Mock Mode
```javascript
// 1. Set AI_MOCK_MODE = "true" in Wix Secrets

// 2. Test generation
const test = await generateSingleImage(
    "test prompt",
    "https://example.com/test.jpg"
);

// 3. Verify mock mode
console.assert(test.data.metadata.mode === 'mock');

// 4. Mock returns Unsplash images instantly
console.assert(test.success === true);
console.assert(test.data.images.length === 3);
```

### Test with Real API
```javascript
// 1. Set AI_MOCK_MODE = "false" in Wix Secrets
// 2. Add HUGGING_FACE_API_KEY

// 3. Test real generation (takes 20-60 seconds)
const test = await generateSingleImage(
    "transform into abstract art",
    realPaintingUrl,
    { numVariations: 1 }
);

// 4. Verify real image uploaded to Wix Media
console.assert(test.data.images[0].url.includes('static.wixstatic.com'));
```

---

## 📋 Available Functions

| Function | Purpose | Parameters |
|----------|---------|------------|
| `channelSingleVision()` | Generate AI variations | `(prompt, imageUrl, options)` |
| `fuseMultipleVisions()` | Blend paintings | `(prompt, imageUrls, options)` |
| `generateSingleImage()` | Alias for channelSingleVision | `(prompt, imageUrl, options)` |
| `blendMultipleImages()` | Alias for fuseMultipleVisions | `(prompt, imageUrls, options)` |
| `saveCustomCreation()` | Save to database | `(creationData)` |
| `getUserCreations()` | Get user's creations | `(userId, options)` |
| `updateCreationStatus()` | Update creation | `(creationId, updates)` |
| `checkVisionStatus()` | Check status (future) | `(generationId)` |

---

## 🎨 Generation Options

```javascript
{
    numVariations: 3,           // Number of variations (1-4)
                                // Default: 3

    guidanceScale: 7.5,         // How closely to follow prompt (1-20)
                                // Lower = more creative, Higher = more literal
                                // Default: 7.5

    negativePrompt: 'blurry, low quality, distorted, ugly',
                                // What to avoid in generation
                                // Default: 'blurry, low quality, distorted, ugly'

    seed: null                  // Seed for reproducibility
                                // null = random seed each time
                                // Default: null
}
```

---

## 🔐 Security

### API Keys
- ✅ Stored in Wix Secrets Manager
- ✅ Never hardcoded in code
- ✅ Only accessible from backend

### Input Validation
- ✅ Prompt length limits (max 1000 chars)
- ✅ HTML/script tag removal
- ✅ URL format validation
- ✅ Array size validation

### Error Handling
- ✅ User-friendly messages
- ✅ Technical errors logged, not exposed
- ✅ Retry logic with backoff

---

## 📞 Need Help?

- **Full Documentation**: `/BACKEND_AI_INTEGRATION.md`
- **API Details**: `/BACKEND_IMPLEMENTATION.md`
- **Architecture**: `/ARCHITECTURE.md`
- **Coding Standards**: `/CODING_STANDARDS.md`

---

**Last Updated**: 2025-11-15
**Status**: ✅ Ready for Integration
