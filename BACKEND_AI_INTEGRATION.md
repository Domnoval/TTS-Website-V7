# Backend AI Integration - Implementation Summary

**Project**: TTS Website V7
**Module**: `/src/backend/ai-api.jsw`
**Status**: ✅ Complete - Ready for Testing
**Date**: 2025-11-15

---

## 📋 Implementation Overview

This document summarizes the complete implementation of the AI Backend Integration and Image Storage system for TTS Website V7.

---

## ✅ What Was Implemented

### 1. Core AI Generation Functions

#### `channelSingleVision(prompt, imageUrl, options)`
- **Purpose**: Generate AI variations of a single painting
- **Features**:
  - Accepts user prompt and painting URL
  - Generates 1-4 variations (configurable)
  - Automatic image upload to Wix Media Manager
  - Returns permanent URLs for generated images
  - Full error handling with retry logic
  - Mock mode for development

**Example Usage**:
```javascript
import { channelSingleVision } from 'backend/ai-api';

const result = await channelSingleVision(
    "transform into cosmic nebula",
    "https://static.wixstatic.com/media/painting.jpg",
    { numVariations: 3 }
);

if (result.success) {
    console.log('Generated images:', result.data.images);
    // result.data.images = [
    //   { url: 'https://...', seed: 42, variation: 1 },
    //   { url: 'https://...', seed: 123, variation: 2 },
    //   { url: 'https://...', seed: 456, variation: 3 }
    // ]
}
```

#### `fuseMultipleVisions(prompt, imageUrls, options)`
- **Purpose**: Blend 2-4 paintings into a new creation
- **Features**:
  - Accepts array of 2-4 painting URLs
  - Generates blended variations
  - Automatic image upload to Wix Media Manager
  - Same robust error handling as single generation

**Example Usage**:
```javascript
import { fuseMultipleVisions } from 'backend/ai-api';

const result = await fuseMultipleVisions(
    "merge into surreal dreamscape",
    [
        "https://static.wixstatic.com/media/painting1.jpg",
        "https://static.wixstatic.com/media/painting2.jpg",
        "https://static.wixstatic.com/media/painting3.jpg"
    ],
    { numVariations: 2 }
);
```

---

### 2. Convenience Alias Functions

For simpler, more intuitive naming:

#### `generateSingleImage(prompt, imageUrl, options)`
- **Alias for**: `channelSingleVision()`
- **Purpose**: Same functionality with simplified naming
- **Why**: Provides more conventional function name while maintaining the mystical naming for artistic consistency

#### `blendMultipleImages(prompt, imageUrls, options)`
- **Alias for**: `fuseMultipleVisions()`
- **Purpose**: Same functionality with simplified naming

**Example Usage**:
```javascript
import { generateSingleImage, blendMultipleImages } from 'backend/ai-api';

// These work exactly the same as the mystical-named functions
const singleResult = await generateSingleImage("cosmic nebula", imageUrl);
const blendResult = await blendMultipleImages("fusion", [url1, url2]);
```

---

### 3. Image Storage Functions

#### `uploadToMediaManager(imageBlob, filename, options)` (Private)
- **Purpose**: Upload generated image blobs to Wix Media Manager
- **Features**:
  - Converts API blobs to Wix-compatible format
  - Generates unique filenames with timestamps
  - Organizes images in `/ai-generated` folder
  - Returns public URLs and image metadata
  - Full error handling

#### `uploadMultipleVariations(imageVariations)` (Private)
- **Purpose**: Batch upload multiple image variations
- **Features**:
  - Uploads variations in parallel for efficiency
  - Filters out failed uploads
  - Returns array of successful uploads with URLs

**Automatic Integration**:
These functions are automatically called by `channelSingleVision()` and `fuseMultipleVisions()` - you don't need to call them manually!

---

### 4. Database Functions

#### `saveCustomCreation(creationData)`
- **Purpose**: Save AI-generated creations to database
- **Features**:
  - Stores creation metadata in `CustomCreations` collection
  - Associates with user/session ID
  - Tracks original paintings, prompts, and generated images
  - Sets 30-day expiration for cleanup
  - Full validation and error handling

**Example Usage**:
```javascript
import { saveCustomCreation } from 'backend/ai-api';

const result = await saveCustomCreation({
    userId: 'user123',
    userEmail: 'user@example.com',
    mode: 'manipulate',
    originalPaintingIds: ['painting1'],
    userPrompt: 'cosmic nebula',
    enhancedPrompt: 'cosmic nebula, high quality, detailed...',
    generatedImages: [
        { url: 'https://...', seed: 42, variation: 1 },
        { url: 'https://...', seed: 123, variation: 2 }
    ],
    metadata: {
        model: 'flux-dev',
        duration: 15420
    }
});

if (result.success) {
    console.log('Creation saved with ID:', result.data._id);
}
```

#### `getUserCreations(userId, options)`
- **Purpose**: Retrieve user's saved AI creations
- **Features**:
  - Query by user ID
  - Optional filtering by status or mode
  - Pagination support
  - Returns full creation records

**Example Usage**:
```javascript
import { getUserCreations } from 'backend/ai-api';

const result = await getUserCreations('user123', {
    limit: 20,
    status: 'generated'
});

if (result.success) {
    console.log(`Found ${result.data.totalCount} creations`);
    result.data.creations.forEach(creation => {
        console.log(creation.userPrompt);
        console.log(creation.generatedImages);
    });
}
```

#### `updateCreationStatus(creationId, updates)`
- **Purpose**: Update creation record (e.g., when user selects a variation)
- **Features**:
  - Update status, selected variation, order ID, etc.
  - Used in order workflow
  - Full validation

**Example Usage**:
```javascript
import { updateCreationStatus } from 'backend/ai-api';

await updateCreationStatus('creation123', {
    status: 'selected',
    selectedVariation: 2,
    selectedImageUrl: 'https://...'
});
```

---

### 5. Error Handling & Validation

#### Input Validation
- **Prompt validation**: Length checks, sanitization
- **Image URL validation**: Format checking, array size limits (2-4 for blending)
- **Type checking**: All parameters validated
- **Error messages**: User-friendly, maintains immersion

#### Retry Logic with Exponential Backoff
- **Max retries**: 3 attempts
- **Delays**: 2s, 4s, 8s (exponential)
- **Handles**: Network timeouts, API errors, model loading
- **Does NOT retry**: Rate limits (429), authentication errors (401)

#### Error Response Format
All functions return standardized error responses:

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

#### Error Codes
| Code | Meaning | User Message |
|------|---------|--------------|
| `RATE_LIMIT` | API rate limit hit | "The cosmic connection is overwhelmed..." |
| `MODEL_LOADING` | Model cold start | "The oracle is awakening..." |
| `API_ERROR` | Hugging Face API error | "The portal encountered turbulence..." |
| `INVALID_PROMPT` | Prompt validation failed | "Your intention needs clarity..." |
| `INVALID_IMAGE_URL` | Image URL invalid | "The painting could not be accessed..." |
| `API_KEY_ERROR` | Missing/invalid API key | "The oracle connection is not configured..." |
| `UPLOAD_FAILED` | Media upload failed | Technical error with upload |
| `DATABASE_ERROR` | Database operation failed | Technical error with database |

---

### 6. Mock Mode for Development

#### Purpose
Test the entire AI workflow without:
- Burning API credits
- Waiting for slow API responses
- Hitting rate limits

#### How to Enable
**Option 1**: Wix Secrets (Recommended)
```
Secret Name: AI_MOCK_MODE
Value: true
```

**Option 2**: Code override (temporary testing)
```javascript
// In ai-api.jsw
async function isMockModeEnabled() {
    return true; // Force mock mode
}
```

#### Mock Mode Behavior
- Returns sample Unsplash images
- Simulates realistic delays (1.5-2 seconds)
- Generates unique IDs and metadata
- **Never** calls Hugging Face API
- Metadata includes `mode: 'mock'` flag

**Example Mock Response**:
```javascript
{
    success: true,
    data: {
        generationId: 'mock_1731590400000_xyz789',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
                seed: 456789,
                variation: 1
            },
            // ... more variations
        ],
        metadata: {
            model: 'flux-dev (mock)',
            prompt: 'cosmic nebula, high quality...',
            timestamp: '2025-11-15T12:00:00.000Z',
            mode: 'mock'
        }
    }
}
```

---

### 7. API Key Management

#### Secure Storage
- **Uses**: Wix Secrets Manager
- **Never**: Hardcoded in code
- **Access**: Backend only (never exposed to frontend)

#### Required Secrets
| Secret Name | Value | Purpose |
|-------------|-------|---------|
| `HUGGING_FACE_API_KEY` | `hf_xxxxxxxxxxxx` | Your Hugging Face API token |
| `AI_MOCK_MODE` | `true` or `false` | Enable/disable mock mode |

#### How to Set Up
1. Go to Wix Dashboard → Settings → Secrets Manager
2. Add `HUGGING_FACE_API_KEY` with your token
3. Add `AI_MOCK_MODE` set to `true` for development

#### API Key Usage
```javascript
// Automatically retrieved securely
const apiKey = await getSecret('HUGGING_FACE_API_KEY');

// Used in API calls (backend only)
fetch(API_URL, {
    headers: {
        'Authorization': `Bearer ${apiKey}`
    }
});
```

---

## 📦 Complete Function Reference

### Exported Functions

| Function | Parameters | Returns | Purpose |
|----------|-----------|---------|---------|
| `channelSingleVision` | `(prompt, imageUrl, options)` | `Promise<Object>` | Generate AI variations |
| `fuseMultipleVisions` | `(prompt, imageUrls, options)` | `Promise<Object>` | Blend paintings |
| `generateSingleImage` | `(prompt, imageUrl, options)` | `Promise<Object>` | Alias for channelSingleVision |
| `blendMultipleImages` | `(prompt, imageUrls, options)` | `Promise<Object>` | Alias for fuseMultipleVisions |
| `checkVisionStatus` | `(generationId)` | `Promise<Object>` | Check generation status (placeholder) |
| `saveCustomCreation` | `(creationData)` | `Promise<Object>` | Save to database |
| `getUserCreations` | `(userId, options)` | `Promise<Object>` | Retrieve user's creations |
| `updateCreationStatus` | `(creationId, updates)` | `Promise<Object>` | Update creation record |

### Common Options

```javascript
{
    numVariations: 3,           // Number of variations (1-4)
    guidanceScale: 7.5,         // Prompt adherence (1-20)
    negativePrompt: 'blurry, low quality...',  // What to avoid
    seed: null                  // Random seed (null for random)
}
```

---

## 🎯 Integration Workflow

### Complete User Journey

```javascript
// 1. User selects painting and enters prompt (frontend)
const selectedPainting = {
    _id: 'painting1',
    imageUrl: 'https://...'
};
const userPrompt = "transform into cosmic nebula";

// 2. Generate AI variations (backend)
import { generateSingleImage, saveCustomCreation } from 'backend/ai-api';

const result = await generateSingleImage(
    userPrompt,
    selectedPainting.imageUrl,
    { numVariations: 3 }
);

if (!result.success) {
    // Show error to user
    console.error(result.error.message);
    return;
}

// 3. Save to database
const saveResult = await saveCustomCreation({
    userId: currentUser.id,
    userEmail: currentUser.email,
    mode: 'manipulate',
    originalPaintingIds: [selectedPainting._id],
    userPrompt: userPrompt,
    enhancedPrompt: result.data.metadata.prompt,
    generatedImages: result.data.images,
    metadata: result.data.metadata
});

// 4. Display results to user (frontend)
const creationId = saveResult.data._id;
displayGeneratedImages(result.data.images);

// 5. User selects favorite variation
const selectedVariation = 2; // User picked variation 2

// 6. Update creation with selection
await updateCreationStatus(creationId, {
    status: 'selected',
    selectedVariation: selectedVariation,
    selectedImageUrl: result.data.images[selectedVariation - 1].url
});

// 7. Proceed to order flow...
```

---

## 🔒 Security Features

### Input Validation
- ✅ Prompt length limits (max 1000 characters)
- ✅ HTML tag removal
- ✅ Special character sanitization
- ✅ URL format validation
- ✅ Array size validation (2-4 images for blending)

### API Key Protection
- ✅ Stored in Wix Secrets (never in code)
- ✅ Only accessible from backend
- ✅ Never exposed to frontend

### Rate Limiting
- ✅ Exponential backoff on retries
- ✅ Immediate failure on rate limit (429)
- ✅ User-friendly error messages

### Error Handling
- ✅ Never expose technical errors to users
- ✅ All errors logged with context
- ✅ Graceful degradation (mock mode fallback)

---

## 📊 Testing Checklist

### Development Testing (Mock Mode)

```javascript
// Enable mock mode
// Wix Secret: AI_MOCK_MODE = true

// Test 1: Single image generation
const test1 = await generateSingleImage(
    "cosmic nebula",
    "https://example.com/test.jpg"
);
console.assert(test1.success === true);
console.assert(test1.data.images.length === 3);
console.assert(test1.data.metadata.mode === 'mock');

// Test 2: Multiple image blending
const test2 = await blendMultipleImages(
    "fusion",
    ["url1", "url2", "url3"]
);
console.assert(test2.success === true);

// Test 3: Error handling
const test3 = await generateSingleImage("", "invalid");
console.assert(test3.success === false);
console.assert(test3.error.code === 'INVALID_PROMPT');

// Test 4: Database operations
const saveTest = await saveCustomCreation({
    userId: 'test-user',
    mode: 'manipulate',
    originalPaintingIds: ['test'],
    userPrompt: 'test prompt',
    generatedImages: []
});
console.assert(saveTest.success === true);

// Test 5: Retrieve creations
const getTest = await getUserCreations('test-user');
console.assert(getTest.success === true);
console.assert(getTest.data.creations.length > 0);
```

### Production Testing (Real API)

```javascript
// Disable mock mode
// Wix Secret: AI_MOCK_MODE = false

// Test with real Hugging Face API
const realTest = await generateSingleImage(
    "transform into abstract art",
    "https://static.wixstatic.com/media/real-painting.jpg",
    { numVariations: 2 }
);

// Verify:
// ✅ Response time < 60 seconds
// ✅ Images uploaded to Wix Media Manager
// ✅ URLs are permanent Wix Media URLs
// ✅ Images are high quality
// ✅ Metadata is correct
```

---

## 🚀 Deployment Checklist

### Before Going Live

- [ ] Set up Hugging Face account
- [ ] Generate Hugging Face API token
- [ ] Add `HUGGING_FACE_API_KEY` to Wix Secrets
- [ ] Set `AI_MOCK_MODE` to `false`
- [ ] Test with real API in staging environment
- [ ] Verify image uploads to Wix Media Manager
- [ ] Test error handling scenarios
- [ ] Test database operations
- [ ] Verify rate limiting behavior
- [ ] Test on mobile devices
- [ ] Review console logs for errors
- [ ] Set up error monitoring/alerts

### Production Configuration

```javascript
// Wix Secrets Manager
HUGGING_FACE_API_KEY = "hf_your_actual_token_here"
AI_MOCK_MODE = "false"
```

---

## 📚 Dependencies

### Wix Modules Used
- `wix-fetch` - HTTP requests to Hugging Face API
- `wix-secrets-backend` - Secure API key storage
- `wix-media-backend` - Image uploads to Media Manager
- `wix-data` - Database operations (dynamic import)

### External Services
- **Hugging Face Inference API** - FLUX.1-dev model
  - Endpoint: `https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev`
  - Free tier: ~50 requests/hour
  - Paid tier: PRO plan $9/month

---

## 🎨 Code Quality

### Standards Followed
- ✅ JSDoc comments for all functions
- ✅ Consistent error handling patterns
- ✅ User-friendly error messages
- ✅ Immersive language (maintains artistic theme)
- ✅ Comprehensive input validation
- ✅ Follows CODING_STANDARDS.md
- ✅ 4-space indentation
- ✅ Descriptive function names
- ✅ Structured console logging with emojis

### File Structure
```
ai-api.jsw (1,257 lines)
├── Header & Dependencies
├── Constants & Configuration
├── Mock Data
├── Utility Functions
├── Validation Functions
├── API Helper Functions
├── Main Exported Functions
│   ├── channelSingleVision()
│   ├── fuseMultipleVisions()
│   └── checkVisionStatus()
├── Convenience Aliases
│   ├── generateSingleImage()
│   └── blendMultipleImages()
├── Image Storage Functions
│   ├── uploadToMediaManager()
│   └── uploadMultipleVariations()
├── Database Functions
│   ├── saveCustomCreation()
│   ├── getUserCreations()
│   └── updateCreationStatus()
├── Error Handling Utilities
└── Future Enhancements
```

---

## 🔮 Future Enhancements

### Priority 1: Image Upscaling
```javascript
async function upscaleImageForPrint(imageUrl, scaleFactor = 4) {
    // Use Real-ESRGAN or similar upscaling model
    // Enhance resolution for print quality
}
```

### Priority 2: Async Generation Queue
```javascript
// Background processing for long operations
const queueId = await queueGeneration(params);
// User polls or receives webhook
const status = await checkVisionStatus(queueId);
```

### Priority 3: Caching Layer
```javascript
// Cache results by prompt hash
// Avoid regenerating identical requests
// Reduce API costs
```

### Priority 4: Style Transfer
```javascript
// Apply artistic style from one image to another
async function applyStyleTransfer(contentImageUrl, styleImageUrl) {
    // Neural style transfer implementation
}
```

---

## 📞 Support & Documentation

### Related Documentation
- `/BACKEND_IMPLEMENTATION.md` - Detailed API documentation
- `/ARCHITECTURE.md` - System architecture overview
- `/CODING_STANDARDS.md` - Code quality standards

### Hugging Face Resources
- [Hugging Face API Docs](https://huggingface.co/docs/api-inference/index)
- [FLUX.1-dev Model Card](https://huggingface.co/black-forest-labs/FLUX.1-dev)

### Wix Resources
- [Wix Secrets Manager](https://support.wix.com/en/article/velo-working-with-the-secrets-manager)
- [Wix Media Manager Backend API](https://www.wix.com/velo/reference/wix-media-backend)
- [Wix Data API](https://www.wix.com/velo/reference/wix-data)

---

## ✅ Summary

### What's Complete
✅ AI image generation with FLUX-dev model
✅ Automatic image upload to Wix Media Manager
✅ Database persistence for custom creations
✅ Mock mode for development/testing
✅ Error handling with retry logic
✅ Input validation and sanitization
✅ Secure API key management
✅ User-friendly error messages
✅ Comprehensive JSDoc documentation
✅ Convenience alias functions
✅ Database CRUD operations

### Ready For
✅ Frontend integration
✅ Testing in staging environment
✅ Production deployment (after API key setup)
✅ User acceptance testing

### Next Steps
1. Set up Hugging Face account and API key
2. Test with mock mode in development
3. Test with real API in staging
4. Integrate with frontend gallery/lightbox
5. Test complete user workflow
6. Deploy to production

---

**Implementation Date**: 2025-11-15
**Status**: ✅ Complete
**Version**: 1.0
**Developer**: Claude (Sonnet 4.5)

🔮 **The oracle is ready to channel visions into reality.** 🔮
