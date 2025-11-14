# TTS Website V7 - Backend AI Implementation Guide

## 🔮 Overview

This document explains the backend AI integration for TTS Website V7. The backend acts as an **oracle** - a mystical bridge between human intention (prompts) and AI consciousness (models).

**File**: `/src/backend/ai-api.jsw`
**Primary Model**: Hugging Face FLUX.1-dev (free tier compatible)
**Status**: ✅ Core implementation complete, ready for API integration

---

## 📋 Table of Contents

1. [Hugging Face Setup](#hugging-face-setup)
2. [Environment Variables & Secrets](#environment-variables--secrets)
3. [API Functions](#api-functions)
4. [Mock Mode (Testing)](#mock-mode-testing)
5. [Error Handling](#error-handling)
6. [Response Format](#response-format)
7. [Testing Strategy](#testing-strategy)
8. [Known Limitations](#known-limitations)
9. [Future Enhancements](#future-enhancements)
10. [Troubleshooting](#troubleshooting)

---

## 1. Hugging Face Setup

### Step 1: Create Hugging Face Account

1. Go to https://huggingface.co/
2. Sign up for a free account
3. Verify your email

### Step 2: Generate API Token

1. Go to https://huggingface.co/settings/tokens
2. Click "New token"
3. Name: `TTS-Website-V7`
4. Type: **Read** (sufficient for inference)
5. Click "Generate"
6. **COPY THE TOKEN** (you won't see it again!)

### Step 3: Understand the Model

**Model**: `black-forest-labs/FLUX.1-dev`

- **Free Tier**: Yes (rate-limited)
- **Rate Limits**: ~50 requests/hour (subject to change)
- **Response Time**: 10-30 seconds per image
- **Quality**: High-quality, state-of-the-art text-to-image generation

**Model Card**: https://huggingface.co/black-forest-labs/FLUX.1-dev

### Pricing & Limits

| Plan | Cost | Requests/Hour | Notes |
|------|------|---------------|-------|
| Free | $0 | ~50 | Rate-limited, model may need warm-up |
| PRO | $9/month | ~1000 | Faster, priority access |
| Enterprise | Custom | Unlimited | Dedicated resources |

**Recommendation for MVP**: Start with free tier, upgrade to PRO when traffic increases.

---

## 2. Environment Variables & Secrets

### Required Secrets in Wix

The backend uses Wix Secrets Manager to store sensitive API keys securely.

#### Setting Up Secrets in Wix

1. Open Wix Editor
2. Go to **Settings** > **Secrets Manager**
3. Add these secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `HUGGING_FACE_API_KEY` | `hf_xxxxxxxxxxxx` | Your Hugging Face API token |
| `AI_MOCK_MODE` | `true` or `false` | Enable/disable mock mode for testing |

#### How to Add Secrets

```javascript
// In Wix Secrets Manager UI:
// Name: HUGGING_FACE_API_KEY
// Value: hf_YourActualTokenHere

// Name: AI_MOCK_MODE
// Value: true  (for development/testing)
// Value: false (for production with real API)
```

**CRITICAL**: Never commit API keys to Git. Always use Wix Secrets.

### Development vs Production

| Environment | `AI_MOCK_MODE` | `HUGGING_FACE_API_KEY` |
|-------------|----------------|------------------------|
| **Development** | `true` | Not required (mock data used) |
| **Staging** | `false` | Required (test with real API) |
| **Production** | `false` | Required (live API calls) |

---

## 3. API Functions

### 3.1 `channelSingleVision()`

Transform a single painting with AI based on a prompt.

**Usage:**

```javascript
import { channelSingleVision } from 'backend/ai-api';

// In your frontend page code
async function handleManipulateSingle() {
    const result = await channelSingleVision(
        "transform into cosmic nebula with swirling galaxies",
        "https://static.wixstatic.com/media/abc123.jpg",
        {
            numVariations: 3,
            guidanceScale: 7.5,
        }
    );

    if (result.success) {
        console.log('Generated images:', result.data.images);
        // Display images to user
    } else {
        console.error('Generation failed:', result.error.message);
        // Show error to user
    }
}
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `prompt` | string | Yes | - | User's transformation intention |
| `imageUrl` | string | Yes | - | URL of painting to transform |
| `options.numVariations` | number | No | 3 | Number of variations (1-4) |
| `options.guidanceScale` | number | No | 7.5 | Prompt adherence (1-20) |
| `options.negativePrompt` | string | No | See code | What to avoid |
| `options.seed` | number | No | random | For reproducibility |

**Returns:**

```javascript
{
    success: true,
    data: {
        generationId: 'gen_1234567890_abc123',
        images: [
            {
                url: 'https://...generated-image-1.jpg',
                seed: 42,
                variation: 1
            },
            {
                url: 'https://...generated-image-2.jpg',
                seed: 123,
                variation: 2
            },
            // ... more variations
        ],
        metadata: {
            model: 'flux-dev',
            prompt: 'enhanced prompt text...',
            originalPrompt: 'user prompt',
            timestamp: '2025-11-14T12:00:00.000Z',
            duration: 15420
        }
    }
}
```

### 3.2 `fuseMultipleVisions()`

Blend 2-4 paintings into a new creation.

**Usage:**

```javascript
import { fuseMultipleVisions } from 'backend/ai-api';

async function handleBlendMultiple() {
    const result = await fuseMultipleVisions(
        "merge into a surreal dreamscape",
        [
            "https://static.wixstatic.com/media/painting1.jpg",
            "https://static.wixstatic.com/media/painting2.jpg",
            "https://static.wixstatic.com/media/painting3.jpg",
        ],
        {
            numVariations: 2,
        }
    );

    if (result.success) {
        // Handle blended results
    }
}
```

**Parameters:**

Same as `channelSingleVision()`, except:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `imageUrls` | Array<string> | Yes | 2-4 painting URLs to blend |

**Returns:** Same format as `channelSingleVision()`

### 3.3 `checkVisionStatus()`

Check status of async generation (future feature).

**Status**: Not yet implemented (all operations are currently synchronous)

---

## 4. Mock Mode (Testing)

### Why Mock Mode?

- **No API costs** during development
- **No rate limits** when testing UI
- **Instant responses** (no 20-second waits)
- **Consistent results** for testing edge cases

### How to Enable Mock Mode

**Option 1: Wix Secrets (Recommended)**

```
Secret Name: AI_MOCK_MODE
Value: true
```

**Option 2: Code Override (for quick testing)**

```javascript
// In ai-api.jsw, modify:
async function isMockModeEnabled() {
    return true; // Force mock mode
}
```

### Mock Mode Behavior

When enabled, the API functions:
- Return sample images from Unsplash
- Simulate realistic API delays (1.5-2 seconds)
- Generate unique IDs and metadata
- Never call Hugging Face API

**Mock Response Example:**

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
            // ... 2-3 more variations
        ],
        metadata: {
            model: 'flux-dev (mock)',
            prompt: 'user prompt, high quality, detailed...',
            timestamp: '2025-11-14T12:00:00.000Z',
            mode: 'mock'
        }
    }
}
```

### Testing Checklist with Mock Mode

- [ ] Single painting manipulation works
- [ ] Multiple painting blending works
- [ ] Error messages display correctly
- [ ] Loading states appear appropriately
- [ ] Results display in gallery/modal
- [ ] "Save & Order" flow works
- [ ] UI handles 2-4 variations correctly

---

## 5. Error Handling

### Error Philosophy

All errors are caught and returned as **user-friendly messages** that maintain immersion. Technical details are logged to console but never shown to users.

### Error Response Format

```javascript
{
    success: false,
    error: {
        message: 'The cosmic connection is overwhelmed. Please try again...',
        code: 'RATE_LIMIT',
        generationId: 'gen_1234567890_abc123',
        timestamp: '2025-11-14T12:00:00.000Z'
    }
}
```

### Error Codes & User Messages

| Error Code | User Message | Cause | Solution |
|------------|--------------|-------|----------|
| `RATE_LIMIT` | "The cosmic connection is overwhelmed..." | API rate limit hit | Wait 5-10 minutes, retry |
| `MODEL_LOADING` | "The oracle is awakening. Wait 20-30 seconds..." | Model cold start | Wait, retry |
| `API_ERROR` | "The portal encountered turbulence..." | API returned error | Check API status, retry |
| `INVALID_PROMPT` | "Your intention needs clarity. Please refine..." | Prompt validation failed | Fix prompt input |
| `INVALID_IMAGE_URL` | "The painting could not be accessed..." | Image URL invalid | Check URL format |
| `API_KEY_ERROR` | "The oracle connection is not configured..." | Missing/invalid API key | Configure secret |
| `UNKNOWN_ERROR` | "The cosmic energy faltered. Contact support..." | Unexpected error | Check logs, contact dev |

### Retry Logic

The backend automatically retries failed requests with **exponential backoff**:

- **Attempt 1**: Immediate
- **Attempt 2**: After 2 seconds
- **Attempt 3**: After 4 seconds
- **Max Attempts**: 3

Retries are triggered for:
- Network timeouts
- Model loading errors (503)
- Temporary API issues

Retries are NOT triggered for:
- Rate limits (429) - fails immediately
- Invalid requests (400) - fails immediately
- Authentication errors (401) - fails immediately

---

## 6. Response Format

### Success Response Structure

```javascript
{
    success: true,         // Always true for success
    data: {
        generationId: string,      // Unique ID for tracking
        images: [                  // Array of generated variations
            {
                url: string,       // Image URL (Wix Media or base64)
                seed: number,      // Seed used (for reproducibility)
                variation: number  // Variation number (1-4)
            }
        ],
        metadata: {               // Generation metadata
            model: string,        // Model used (e.g., 'flux-dev')
            prompt: string,       // Enhanced prompt sent to API
            originalPrompt: string, // User's original prompt
            timestamp: string,    // ISO-8601 timestamp
            duration: number,     // Generation time in ms
            blendedImages?: number // (For blending) Number of images blended
        }
    }
}
```

### Error Response Structure

```javascript
{
    success: false,        // Always false for errors
    error: {
        message: string,   // User-friendly message (immersive)
        code: string,      // Error code for debugging
        generationId?: string, // (Optional) ID if generation started
        timestamp: string  // ISO-8601 timestamp
    }
}
```

---

## 7. Testing Strategy

### Phase 1: Mock Mode Testing

**Goal**: Verify UI and flow without API costs

1. **Enable mock mode**: Set `AI_MOCK_MODE` secret to `true`
2. **Test single manipulation**:
   - Select a painting
   - Enter prompt: "cosmic nebula"
   - Click "Generate"
   - Verify: Loading state appears
   - Verify: 3 variations display
   - Verify: Can select and save result
3. **Test multi-blend**:
   - Select 2-4 paintings
   - Enter prompt: "surreal fusion"
   - Click "Blend"
   - Verify: Results appear
4. **Test error scenarios**:
   - Empty prompt → error message
   - Invalid image URL → error message
   - Try edge cases

**Success Criteria**:
- [ ] UI works smoothly with mock data
- [ ] Loading states display correctly
- [ ] Error messages are user-friendly
- [ ] Results can be saved/ordered

### Phase 2: Real API Testing (Staging)

**Goal**: Verify actual Hugging Face integration

1. **Setup**:
   - Get Hugging Face API token
   - Add `HUGGING_FACE_API_KEY` secret
   - Set `AI_MOCK_MODE` to `false`
2. **Test single image**:
   - Use a real painting URL
   - Prompt: "transform into abstract art"
   - **Wait 20-30 seconds** (first request may be slow)
   - Verify: Real generated image appears
3. **Test variations**:
   - Generate 2-4 variations
   - Verify: Different seeds produce different results
4. **Test error handling**:
   - Trigger rate limit (make 50+ requests quickly)
   - Verify: Error message appears
   - Wait 10 minutes, retry
5. **Performance testing**:
   - Measure response times
   - Check console logs for errors

**Success Criteria**:
- [ ] Real images generate successfully
- [ ] Response time < 30 seconds
- [ ] Rate limiting handled gracefully
- [ ] Errors logged with context
- [ ] Generated images are high quality

### Phase 3: Production Testing

**Goal**: Validate under real-world conditions

1. **Soft launch**: Test with small user group
2. **Monitor**:
   - Console logs for errors
   - Response times
   - User feedback
3. **Iterate**: Fix issues, optimize

### Sample Test Prompts

**Good Prompts** (should work well):
- "transform into cosmic nebula with swirling galaxies"
- "make it surreal and dreamlike"
- "blend into an abstract expressionist masterpiece"
- "fuse with vibrant psychedelic colors"
- "merge into a mystical portal"

**Edge Case Prompts** (test handling):
- "" (empty prompt - should fail)
- "a" (too short - should work but may give poor results)
- "Lorem ipsum dolor sit amet..." (very long - should truncate)

---

## 8. Known Limitations

### Current Implementation

1. **Image Format**:
   - Generated images are currently placeholders (`data:image/png;base64,PLACEHOLDER`)
   - Need to implement Wix Media Manager upload
   - **TODO**: Create `uploadToMediaManager()` function

2. **Multi-Image Blending**:
   - FLUX model doesn't natively support multiple input images
   - Current approach: Describe blending in prompt
   - **Limitation**: Results may not perfectly blend multiple images
   - **Future**: Consider using a different model for true multi-image blending

3. **Synchronous Only**:
   - All operations are synchronous (block until complete)
   - **Future**: Implement async queue for better UX

4. **No Upscaling**:
   - Generated images are default resolution
   - **Future**: Add upscaling for print quality

5. **No Style Transfer**:
   - Can't directly extract style from one image and apply to another
   - **Future**: Add dedicated style transfer model

### Hugging Face Free Tier Constraints

- **Rate Limits**: ~50 requests/hour
- **Cold Starts**: First request may take 30+ seconds (model loading)
- **No Guarantees**: API may be slow or unavailable during peak times
- **Image Size**: Limited to model defaults (usually 1024x1024 or similar)

**Mitigation**:
- Use mock mode for development
- Upgrade to PRO plan for production ($9/month)
- Implement caching for repeated prompts

---

## 9. Future Enhancements

### Priority 1: Media Upload Integration

**Status**: Not implemented
**Effort**: Medium
**Impact**: High (critical for production)

Implement `uploadToMediaManager()` to convert generated image blobs to Wix Media URLs:

```javascript
import { mediaManager } from 'wix-media-backend';

async function uploadToMediaManager(imageBlob, filename) {
    const buffer = await imageBlob.arrayBuffer();
    const uploadResult = await mediaManager.upload(
        filename,
        buffer,
        {
            mediaType: 'image',
            mimeType: 'image/png',
        }
    );
    return uploadResult.fileUrl;
}
```

### Priority 2: Async Generation Queue

**Status**: Planned
**Effort**: High
**Impact**: Medium (better UX)

Implement background processing:
1. User submits request → returns immediately with `generationId`
2. Backend queues generation job
3. User polls `checkVisionStatus()` or receives webhook
4. Results stored in database, retrieved when ready

**Benefits**:
- Non-blocking UI
- Handle long-running generations
- Better error recovery

### Priority 3: Image Upscaling

**Status**: Planned
**Effort**: Medium
**Impact**: Medium (print quality)

Use Real-ESRGAN or similar model to upscale generated images for printing:

```javascript
async function upscaleImageForPrint(imageUrl, scaleFactor = 4) {
    // Call upscaling API
    // Return high-res image URL
}
```

### Priority 4: Style Transfer

**Status**: Planned
**Effort**: High
**Impact**: Low (nice-to-have)

Implement neural style transfer to apply artistic style from one image to another.

### Priority 5: Caching & Optimization

**Status**: Planned
**Effort**: Medium
**Impact**: Medium (cost savings)

- Cache generated images by prompt hash
- Reuse results for identical prompts
- Reduce API calls and costs

---

## 10. Troubleshooting

### Problem: "API key not configured" error

**Symptoms**: Error message about oracle connection
**Cause**: Hugging Face API key not set or invalid

**Solution**:
1. Go to Wix Editor → Settings → Secrets Manager
2. Verify `HUGGING_FACE_API_KEY` exists
3. Check token is valid on https://huggingface.co/settings/tokens
4. Ensure token has **Read** permission
5. Save and re-test

---

### Problem: "Model is loading" error

**Symptoms**: 503 error, message about oracle awakening
**Cause**: Model cold start (Hugging Face spins down models after inactivity)

**Solution**:
1. Wait 20-30 seconds
2. Retry request
3. Model will stay "warm" for ~15 minutes after first request

**Prevention**: Implement periodic "ping" to keep model warm

---

### Problem: "Rate limit exceeded" error

**Symptoms**: 429 error, message about overwhelmed connection
**Cause**: Exceeded free tier rate limit (~50 requests/hour)

**Solution**:
1. Wait 10-60 minutes for limit to reset
2. Use mock mode for testing
3. Consider upgrading to PRO plan

**Prevention**:
- Use mock mode during development
- Implement request throttling on frontend
- Cache results where possible

---

### Problem: Generated images are placeholders

**Symptoms**: Images show `data:image/png;base64,PLACEHOLDER`
**Cause**: Media upload not yet implemented

**Solution**:
1. **Short-term**: Accept this limitation, focus on testing flow
2. **Long-term**: Implement `uploadToMediaManager()` function

**Workaround**: Use mock mode which provides real Unsplash image URLs

---

### Problem: Blending doesn't truly merge images

**Symptoms**: Blended result doesn't reflect all input paintings
**Cause**: FLUX model doesn't support multi-image input

**Solution**:
1. **Current**: Describe blending in prompt (best effort)
2. **Future**: Use dedicated multi-image model or ControlNet

**Mitigation**: Set user expectations - explain it's "inspired by" multiple images

---

### Problem: Slow response times (>30 seconds)

**Symptoms**: API takes very long to respond
**Cause**: Model cold start, API overload, or network issues

**Solution**:
1. Verify it's not a cold start (first request after inactivity)
2. Check Hugging Face status: https://status.huggingface.co/
3. Implement longer timeout (already set to 60 seconds)
4. Consider upgrading to PRO for faster processing

**Mitigation**: Show progress indicators, keep user informed

---

### Problem: Console errors about CORS or fetch

**Symptoms**: Network errors in browser console
**Cause**: Frontend trying to call API directly (not allowed)

**Solution**:
- **Always** call backend functions from frontend
- **Never** call Hugging Face API directly from frontend (CORS blocked)
- Use Wix backend module pattern (`.jsw` files)

---

## 📚 Additional Resources

### Documentation
- [Hugging Face Inference API Docs](https://huggingface.co/docs/api-inference/index)
- [FLUX.1-dev Model Card](https://huggingface.co/black-forest-labs/FLUX.1-dev)
- [Wix Secrets Manager](https://support.wix.com/en/article/velo-working-with-the-secrets-manager)
- [Wix Media Manager Backend API](https://www.wix.com/velo/reference/wix-media-backend)

### Support
- **Hugging Face**: https://huggingface.co/support
- **Wix Developer Forum**: https://www.wix.com/velo/forum

---

## ✅ Implementation Checklist

### Backend Complete
- [x] Create `ai-api.jsw` with all functions
- [x] Implement `channelSingleVision()`
- [x] Implement `fuseMultipleVisions()`
- [x] Implement `checkVisionStatus()` (placeholder)
- [x] Add mock mode for testing
- [x] Add comprehensive error handling
- [x] Add retry logic with exponential backoff
- [x] Add JSDoc comments for all functions
- [x] Add user-friendly error messages
- [x] Add input validation

### Ready for Integration
- [x] Mock mode working
- [x] Response format defined
- [x] Error codes documented
- [ ] Media upload implemented (TODO)
- [ ] Real API key configured (pending)

### Documentation Complete
- [x] Hugging Face setup guide
- [x] Environment variables documented
- [x] API functions explained
- [x] Mock mode instructions
- [x] Error handling guide
- [x] Testing strategy defined
- [x] Known limitations listed
- [x] Future enhancements planned
- [x] Troubleshooting guide

---

## 🎯 Next Steps

### For You (Site Owner)
1. Create Hugging Face account
2. Generate API token
3. Add `HUGGING_FACE_API_KEY` to Wix Secrets
4. Test with mock mode first
5. Test with real API in staging

### For Frontend Developer
1. Import backend functions in page code
2. Build AI modal/lightbox UI
3. Call `channelSingleVision()` or `fuseMultipleVisions()`
4. Display results in gallery
5. Handle errors with user-friendly messages
6. Test with mock mode

### For Future Development
1. Implement media upload
2. Add async generation queue
3. Implement image upscaling
4. Add caching layer
5. Monitor usage and optimize

---

**Last Updated**: 2025-11-14
**Author**: Backend Developer Agent
**Status**: ✅ Core implementation complete, ready for testing and API integration

🔮 The oracle awaits your intentions. Channel wisely. 🔮
