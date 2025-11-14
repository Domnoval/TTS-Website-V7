# TTS Website V7 - System Architecture

**The Sacred Geometry of Code**

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Database Schema](#database-schema)
4. [API Design](#api-design)
5. [State Management](#state-management)
6. [Performance Strategy](#performance-strategy)
7. [Portal Architecture](#portal-architecture)
8. [Data Flow](#data-flow)
9. [Security Architecture](#security-architecture)
10. [Scalability Considerations](#scalability-considerations)

---

## System Overview

### The Philosophy
This architecture embodies the principle of **elegant modularity** - each component is a sacred geometric shape that fits perfectly with others, creating a coherent whole that transcends the sum of its parts.

### Core Principles
- **Separation of Concerns**: Frontend (experience) / Backend (logic) / External (services)
- **Progressive Enhancement**: Works fundamentally, then adds cosmic layers
- **Graceful Degradation**: Never breaks, always has fallbacks
- **Intentional Design**: Every function name hints at magic

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│                    (The Portal Experience)                       │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Portal     │  │   Gallery    │  │  Lightbox    │          │
│  │  (Loading)   │  │   (Main)     │  │  (AI Modal)  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │    About     │  │   Contact    │  │    Store     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      STATE MANAGEMENT                            │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  GalleryState  │  AIGenerationState  │  UserCreations  │     │
│  └────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       BACKEND LAYER                              │
│                    (Web Modules - .jsw)                          │
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐                     │
│  │   ai-api.jsw     │  │ image-storage.jsw│                     │
│  │  (AI Channeler)  │  │ (Media Manager)  │                     │
│  └──────────────────┘  └──────────────────┘                     │
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐                     │
│  │order-mgmt.jsw    │  │email-notif.jsw   │                     │
│  │(Manifestation)   │  │(Communication)   │                     │
│  └──────────────────┘  └──────────────────┘                     │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA PERSISTENCE                            │
│                     (Wix Data CMS)                               │
│                                                                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│  │ Portfolio  │  │  Custom    │  │   Orders   │                │
│  │(Originals) │  │ Creations  │  │  (Prints)  │                │
│  └────────────┘  └────────────┘  └────────────┘                │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     EXTERNAL SERVICES                            │
│                                                                   │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ Hugging Face│  │  Wix Media   │  │   Printify   │           │
│  │ (FLUX-dev)  │  │   Manager    │  │ (POD Service)│           │
│  └─────────────┘  └──────────────┘  └──────────────┘           │
│                                                                   │
│  ┌─────────────┐  ┌──────────────┐                              │
│  │ Wix Stores  │  │  Email API   │                              │
│  │ (Commerce)  │  │  (SendGrid)  │                              │
│  └─────────────┘  └──────────────┘                              │
└─────────────────────────────────────────────────────────────────┘
```

### Component Relationships

**One-Way Data Flow** (like energy through chakras):
1. User interacts with **Gallery**
2. Selection updates **State**
3. State triggers **Backend API calls**
4. Backend communicates with **External Services**
5. Results flow back through **State** to **UI**

---

## Database Schema

### Collection: `Portfolio`
**Purpose**: Store original paintings available in the gallery

```javascript
{
    _id: String,              // Auto-generated
    _createdDate: Date,       // Auto-generated
    _updatedDate: Date,       // Auto-generated

    // Core Fields
    title: String,            // REQUIRED - "Cosmic Dreams"
    description: Text,        // Rich description for SEO and display
    image: String,            // Wix Media URL (main high-res image)
    thumbnail: String,        // Optimized thumbnail URL (400x600)

    // Categorization
    category: String,         // "Abstract", "Cosmic", "Nature", etc.
    tags: Array<String>,      // ["psychedelic", "geometric", "colorful"]
    year: Number,             // Year created

    // Pricing & Availability
    price: Number,            // Price for original (if available)
    isOriginalAvailable: Boolean,  // Can they buy the physical original?
    isPrintAvailable: Boolean,     // Can they order prints?

    // Metadata
    dimensions: String,       // "24x36 inches"
    medium: String,           // "Acrylic on canvas"
    status: String,           // "published" | "draft" | "archived"

    // AI Metadata (for better blending)
    dominantColors: Array<String>,  // ["#FF5733", "#3366FF"]
    styleKeywords: Array<String>,   // ["surreal", "vibrant", "fluid"]

    // Display Order
    sortOrder: Number,        // Manual ordering (lower = first)
    isFeatured: Boolean       // Show in featured section
}
```

**Indexes**:
- `status` (for querying published items)
- `category` (for filtering)
- `sortOrder` (for display order)
- `isFeatured` (for homepage)

**Permissions**:
- Read: Anyone
- Write: Admin only

---

### Collection: `CustomCreations`
**Purpose**: Store AI-generated artwork created by users

```javascript
{
    _id: String,              // Auto-generated UUID
    _createdDate: Date,       // Timestamp of creation

    // User Association
    userId: String,           // Wix user ID (or session ID for guests)
    userEmail: String,        // For notifications and order tracking

    // Source Information
    mode: String,             // "manipulate" | "blend"
    originalPaintingIds: Array<String>,  // References to Portfolio items

    // Generation Details
    userPrompt: Text,         // The prompt entered by user
    enhancedPrompt: Text,     // AI-optimized prompt used for generation

    // AI Results
    generatedImages: Array<{
        imageUrl: String,     // Wix Media URL
        variation: Number,    // 1-4 (which variation)
        huggingFaceId: String // HF generation ID (for debugging)
    }>,

    // Selected Variation (for purchase)
    selectedVariation: Number,  // Which one they want to buy
    selectedImageUrl: String,   // Direct URL to chosen image

    // Order Status
    status: String,           // "generated" | "selected" | "order_pending" | "ordered"
    orderId: String,          // Link to Orders collection (after purchase)

    // Metadata
    generationTime: Number,   // Time taken (ms)
    modelVersion: String,     // "FLUX-dev-v1.0"
    cost: Number,             // API cost (for tracking)

    // Session Tracking
    sessionId: String,        // For guest users
    expiresAt: Date          // Auto-delete after 30 days if not ordered
}
```

**Indexes**:
- `userId` (find user's creations)
- `status` (query by status)
- `_createdDate` (chronological order)
- `expiresAt` (for cleanup jobs)

**Permissions**:
- Read: Owner or Admin
- Write: Owner or Admin

---

### Collection: `Orders`
**Purpose**: Track custom print orders (semi-manual workflow)

```javascript
{
    _id: String,
    _createdDate: Date,

    // Customer Info
    userId: String,
    customerName: String,
    customerEmail: String,
    customerPhone: String,

    // Order Details
    customCreationId: String,  // Link to CustomCreations
    orderType: String,         // "custom_print" | "original" | "merch"

    // Print Specifications
    printSize: String,         // "12x18", "24x36", etc.
    printMaterial: String,     // "canvas", "poster", "metal", etc.
    isFramed: Boolean,
    quantity: Number,

    // Pricing
    basePrice: Number,
    shippingCost: Number,
    totalPrice: Number,

    // Fulfillment Status
    status: String,           // "pending" | "printify_created" | "shipped" | "delivered"
    printifyProductUrl: String,  // Manual Printify product link
    printifyOrderId: String,     // After you create it on Printify
    trackingNumber: String,

    // Communication
    notificationSent: Boolean,
    purchaseLinkSent: Boolean,
    purchaseLink: String,      // Link to Printify checkout

    // Notes
    internalNotes: Text,       // Your notes for fulfillment
    customerNotes: Text        // Special requests from customer
}
```

**Indexes**:
- `userId` (customer order history)
- `status` (filter by fulfillment stage)
- `customCreationId` (link back to creation)

**Permissions**:
- Read: Owner or Admin
- Write: Admin only

---

### Collection: `PortalSessions`
**Purpose**: Track portal animation state (show once per session)

```javascript
{
    _id: String,
    sessionId: String,        // Browser session ID
    hasSeenPortal: Boolean,   // True after first view
    firstVisit: Date,
    lastVisit: Date,
    visitCount: Number,

    // Optional: Track user journey
    pagesVisited: Array<String>,
    aiGenerationsCount: Number
}
```

**Indexes**:
- `sessionId` (lookup)

**Permissions**:
- Read/Write: Anyone (session-based)

---

## API Design

### Backend Module: `ai-api.jsw`
**Purpose**: Interface with Hugging Face AI for image generation

```javascript
// TTS WEBSITE V7 - AI API Web Module
// Channels cosmic energy through Hugging Face FLUX-dev model

import { fetch } from 'wix-fetch';
import { getSecret } from 'wix-secrets-backend';

const HUGGING_FACE_API = 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev';
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

/**
 * Channel AI energy through a single painting
 * @param {Object} params - Generation parameters
 * @param {string} params.paintingUrl - URL of the original painting
 * @param {string} params.userPrompt - User's creative prompt
 * @param {Array<string>} params.styleKeywords - Style hints from painting metadata
 * @returns {Promise<Object>} Generated image variations
 */
export async function channelSingleVision(params) {
    const { paintingUrl, userPrompt, styleKeywords = [] } = params;

    try {
        // Validate inputs
        if (!paintingUrl || !userPrompt) {
            throw new Error('Painting URL and prompt are required');
        }

        // Enhance the prompt with style context
        const enhancedPrompt = enhancePromptWithStyle(userPrompt, styleKeywords);

        console.log('🔮 Channeling AI vision...', { userPrompt, enhancedPrompt });

        // Generate variations (2-4 images)
        const variations = await generateVariations(enhancedPrompt, paintingUrl);

        return {
            success: true,
            data: {
                variations,
                enhancedPrompt,
                generationTime: Date.now()
            }
        };

    } catch (error) {
        console.error('❌ AI channeling failed:', error);
        return {
            success: false,
            error: {
                message: error.message,
                code: 'GENERATION_FAILED'
            }
        };
    }
}

/**
 * Blend multiple paintings into new cosmic creation
 * @param {Object} params - Blending parameters
 * @param {Array<string>} params.paintingUrls - Array of 2-4 painting URLs
 * @param {string} params.userPrompt - User's blending intention
 * @param {Array<Object>} params.paintings - Full painting objects (for metadata)
 * @returns {Promise<Object>} Blended image variations
 */
export async function blendMultipleDimensions(params) {
    const { paintingUrls, userPrompt, paintings = [] } = params;

    try {
        // Validate inputs
        if (!paintingUrls || paintingUrls.length < 2 || paintingUrls.length > 4) {
            throw new Error('Must blend between 2-4 paintings');
        }

        if (!userPrompt) {
            throw new Error('Prompt is required for blending');
        }

        // Extract combined style context
        const combinedStyles = extractCombinedStyles(paintings);

        // Create blending prompt
        const blendingPrompt = createBlendingPrompt(userPrompt, combinedStyles, paintingUrls.length);

        console.log('🌀 Blending dimensions...', {
            count: paintingUrls.length,
            userPrompt,
            blendingPrompt
        });

        // Generate blended variations
        const variations = await generateBlendedVariations(blendingPrompt, paintingUrls);

        return {
            success: true,
            data: {
                variations,
                blendingPrompt,
                sourcePaintingCount: paintingUrls.length,
                generationTime: Date.now()
            }
        };

    } catch (error) {
        console.error('❌ Blending failed:', error);
        return {
            success: false,
            error: {
                message: error.message,
                code: 'BLENDING_FAILED'
            }
        };
    }
}

/**
 * Generate multiple variations using Hugging Face API
 * @private
 */
async function generateVariations(prompt, referenceImageUrl) {
    const apiKey = await getSecret('HUGGING_FACE_API_KEY');
    const variations = [];

    // Generate 4 variations
    for (let i = 1; i <= 4; i++) {
        try {
            const result = await callHuggingFaceAPI(prompt, referenceImageUrl, apiKey, i);
            variations.push({
                variation: i,
                imageData: result.imageData,
                prompt: result.actualPrompt
            });
        } catch (error) {
            console.error(`Failed to generate variation ${i}:`, error);
            // Continue with other variations
        }
    }

    if (variations.length === 0) {
        throw new Error('Failed to generate any variations');
    }

    return variations;
}

/**
 * Generate blended variations from multiple paintings
 * @private
 */
async function generateBlendedVariations(prompt, paintingUrls) {
    const apiKey = await getSecret('HUGGING_FACE_API_KEY');
    const variations = [];

    // Create composite image reference (or use multi-image conditioning)
    // Note: This depends on FLUX-dev capabilities

    for (let i = 1; i <= 3; i++) {  // Fewer variations for blending
        try {
            const result = await callHuggingFaceAPIMultiImage(prompt, paintingUrls, apiKey, i);
            variations.push({
                variation: i,
                imageData: result.imageData,
                prompt: result.actualPrompt
            });
        } catch (error) {
            console.error(`Failed to generate blended variation ${i}:`, error);
        }
    }

    return variations;
}

/**
 * Call Hugging Face API with retry logic
 * @private
 */
async function callHuggingFaceAPI(prompt, imageUrl, apiKey, seed) {
    let attempts = 0;

    while (attempts < MAX_RETRIES) {
        try {
            const response = await fetch(HUGGING_FACE_API, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        seed: seed * 1000,  // Different seed for each variation
                        num_inference_steps: 50,
                        guidance_scale: 7.5
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API returned ${response.status}: ${response.statusText}`);
            }

            const imageData = await response.arrayBuffer();

            return {
                imageData,
                actualPrompt: prompt
            };

        } catch (error) {
            attempts++;
            if (attempts >= MAX_RETRIES) {
                throw error;
            }

            console.log(`Retry ${attempts}/${MAX_RETRIES} after error:`, error.message);
            await sleep(RETRY_DELAY * attempts); // Exponential backoff
        }
    }
}

/**
 * Multi-image conditioning for blending
 * @private
 */
async function callHuggingFaceAPIMultiImage(prompt, imageUrls, apiKey, seed) {
    // Implementation depends on FLUX-dev's multi-image capabilities
    // May need to composite images first or use IP-Adapter

    // For now, use weighted prompt approach
    const weightedPrompt = `${prompt}, blending elements from ${imageUrls.length} different artistic styles`;

    return callHuggingFaceAPI(weightedPrompt, imageUrls[0], apiKey, seed);
}

/**
 * Enhance user prompt with painting style context
 * @private
 */
function enhancePromptWithStyle(userPrompt, styleKeywords) {
    if (!styleKeywords || styleKeywords.length === 0) {
        return userPrompt;
    }

    const styleContext = styleKeywords.slice(0, 3).join(', ');
    return `${userPrompt}, in the style of ${styleContext}`;
}

/**
 * Extract combined style keywords from multiple paintings
 * @private
 */
function extractCombinedStyles(paintings) {
    const allStyles = paintings
        .flatMap(p => p.styleKeywords || [])
        .filter((style, index, self) => self.indexOf(style) === index); // Unique

    return allStyles.slice(0, 5); // Top 5 combined styles
}

/**
 * Create blending-specific prompt
 * @private
 */
function createBlendingPrompt(userPrompt, combinedStyles, paintingCount) {
    const styleContext = combinedStyles.join(', ');
    return `${userPrompt}, harmoniously blending ${paintingCount} distinct artistic styles: ${styleContext}`;
}

/**
 * Utility: Sleep function for retry delays
 * @private
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * DEVELOPMENT MODE: Mock AI generation for testing
 * @param {Object} params - Same as channelSingleVision
 * @returns {Promise<Object>} Mock generated images
 */
export async function mockChannelVision(params) {
    console.log('🧪 MOCK MODE: Simulating AI generation');

    await sleep(2000); // Simulate API delay

    const mockVariations = [
        {
            variation: 1,
            imageData: null,
            imageUrl: 'https://picsum.photos/800/1200?random=100'
        },
        {
            variation: 2,
            imageData: null,
            imageUrl: 'https://picsum.photos/800/1200?random=101'
        },
        {
            variation: 3,
            imageData: null,
            imageUrl: 'https://picsum.photos/800/1200?random=102'
        },
        {
            variation: 4,
            imageData: null,
            imageUrl: 'https://picsum.photos/800/1200?random=103'
        }
    ];

    return {
        success: true,
        data: {
            variations: mockVariations,
            enhancedPrompt: `${params.userPrompt} (MOCK)`,
            generationTime: Date.now()
        }
    };
}
```

---

### Backend Module: `image-storage.jsw`
**Purpose**: Save generated images to Wix Media Manager

```javascript
// TTS WEBSITE V7 - Image Storage Web Module
// Manifests AI visions into persistent digital form

import { mediaManager } from 'wix-media-backend';
import wixData from 'wix-data';

/**
 * Manifest AI creation into permanent storage
 * @param {Object} params - Storage parameters
 * @param {ArrayBuffer} params.imageData - Image binary data
 * @param {string} params.filename - Desired filename
 * @param {string} params.mimeType - Image MIME type (default: image/png)
 * @returns {Promise<Object>} Uploaded image details
 */
export async function manifestImage(params) {
    const { imageData, filename, mimeType = 'image/png' } = params;

    try {
        if (!imageData || !filename) {
            throw new Error('Image data and filename are required');
        }

        console.log('💾 Manifesting image to storage...', { filename });

        // Upload to Wix Media Manager
        const uploadResult = await mediaManager.upload(
            '/ai-generated',  // Folder path
            imageData,
            filename,
            {
                mediaOptions: {
                    mimeType,
                    mediaType: 'image'
                }
            }
        );

        console.log('✅ Image manifested:', uploadResult.fileUrl);

        return {
            success: true,
            data: {
                fileUrl: uploadResult.fileUrl,
                fileName: uploadResult.fileName,
                width: uploadResult.width,
                height: uploadResult.height
            }
        };

    } catch (error) {
        console.error('❌ Image manifestation failed:', error);
        return {
            success: false,
            error: {
                message: error.message,
                code: 'UPLOAD_FAILED'
            }
        };
    }
}

/**
 * Save custom creation to database
 * @param {Object} creationData - Full creation details
 * @returns {Promise<Object>} Saved creation record
 */
export async function saveCustomCreation(creationData) {
    try {
        // Validate required fields
        const requiredFields = ['userId', 'mode', 'originalPaintingIds', 'userPrompt'];
        for (const field of requiredFields) {
            if (!creationData[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        // Set expiration (30 days from now)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        // Prepare data for insertion
        const recordToInsert = {
            ...creationData,
            status: 'generated',
            expiresAt,
            _createdDate: new Date()
        };

        console.log('💫 Saving custom creation to database...');

        // Insert into CustomCreations collection
        const result = await wixData.insert('CustomCreations', recordToInsert);

        console.log('✅ Custom creation saved:', result._id);

        return {
            success: true,
            data: result
        };

    } catch (error) {
        console.error('❌ Failed to save custom creation:', error);
        return {
            success: false,
            error: {
                message: error.message,
                code: 'DATABASE_ERROR'
            }
        };
    }
}

/**
 * Retrieve user's custom creations
 * @param {string} userId - Wix user ID
 * @param {Object} options - Query options
 * @returns {Promise<Object>} User's creations
 */
export async function getUserCreations(userId, options = {}) {
    try {
        const { limit = 50, status = null } = options;

        let query = wixData.query('CustomCreations')
            .eq('userId', userId)
            .descending('_createdDate')
            .limit(limit);

        if (status) {
            query = query.eq('status', status);
        }

        const result = await query.find();

        return {
            success: true,
            data: {
                creations: result.items,
                totalCount: result.totalCount
            }
        };

    } catch (error) {
        console.error('❌ Failed to retrieve creations:', error);
        return {
            success: false,
            error: {
                message: error.message,
                code: 'QUERY_FAILED'
            }
        };
    }
}

/**
 * Update creation status (e.g., when user selects a variation)
 * @param {string} creationId - Creation ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated creation
 */
export async function updateCreationStatus(creationId, updates) {
    try {
        const result = await wixData.update('CustomCreations', {
            _id: creationId,
            ...updates
        });

        return {
            success: true,
            data: result
        };

    } catch (error) {
        console.error('❌ Failed to update creation:', error);
        return {
            success: false,
            error: {
                message: error.message,
                code: 'UPDATE_FAILED'
            }
        };
    }
}
```

---

### Backend Module: `order-management.jsw`
**Purpose**: Handle custom print orders (semi-manual workflow)

```javascript
// TTS WEBSITE V7 - Order Management Web Module
// Manifests visions into physical reality

import wixData from 'wix-data';
import { sendOrderNotification } from 'backend/email-notifications';

/**
 * Initiate manifestation of custom creation into physical form
 * @param {Object} orderDetails - Order information
 * @returns {Promise<Object>} Created order record
 */
export async function initiateManifestationOrder(orderDetails) {
    const {
        customCreationId,
        userId,
        customerEmail,
        printSize,
        printMaterial,
        isFramed,
        quantity = 1
    } = orderDetails;

    try {
        // Validate inputs
        if (!customCreationId || !userId || !customerEmail) {
            throw new Error('Missing required order information');
        }

        // Retrieve the custom creation
        const creation = await wixData.get('CustomCreations', customCreationId);
        if (!creation) {
            throw new Error('Custom creation not found');
        }

        // Calculate pricing (basic logic)
        const pricing = calculateManifestationCost(printSize, printMaterial, isFramed, quantity);

        // Create order record
        const orderRecord = {
            customCreationId,
            userId,
            customerEmail,
            orderType: 'custom_print',
            printSize,
            printMaterial,
            isFramed,
            quantity,
            ...pricing,
            status: 'pending',
            notificationSent: false
        };

        console.log('🛒 Creating manifestation order...', orderRecord);

        // Save to Orders collection
        const savedOrder = await wixData.insert('Orders', orderRecord);

        // Update creation status
        await wixData.update('CustomCreations', {
            _id: customCreationId,
            status: 'order_pending',
            orderId: savedOrder._id
        });

        // Send email notification to admin
        await sendOrderNotification({
            orderId: savedOrder._id,
            customerEmail,
            creationImageUrl: creation.selectedImageUrl,
            orderDetails: orderRecord
        });

        console.log('✅ Manifestation order created:', savedOrder._id);

        return {
            success: true,
            data: {
                orderId: savedOrder._id,
                orderDetails: savedOrder
            }
        };

    } catch (error) {
        console.error('❌ Order creation failed:', error);
        return {
            success: false,
            error: {
                message: error.message,
                code: 'ORDER_FAILED'
            }
        };
    }
}

/**
 * Calculate manifestation cost based on specifications
 * @private
 */
function calculateManifestationCost(size, material, framed, quantity) {
    // Base pricing matrix
    const basePrices = {
        '12x18': 29.99,
        '18x24': 49.99,
        '24x36': 79.99,
        '36x48': 129.99
    };

    const materialMultipliers = {
        'poster': 1.0,
        'canvas': 1.5,
        'metal': 2.0,
        'acrylic': 2.5
    };

    const basePrice = (basePrices[size] || 49.99) * (materialMultipliers[material] || 1.0);
    const frameCost = framed ? 50.00 : 0;
    const subtotal = (basePrice + frameCost) * quantity;
    const shippingCost = calculateShipping(size, quantity);

    return {
        basePrice,
        shippingCost,
        totalPrice: subtotal + shippingCost
    };
}

/**
 * Calculate shipping cost
 * @private
 */
function calculateShipping(size, quantity) {
    // Simple shipping calculation
    const baseShipping = 15.00;
    const additionalItemCost = 5.00;

    return baseShipping + (additionalItemCost * (quantity - 1));
}

/**
 * Update order with Printify details (manual workflow)
 * @param {string} orderId - Order ID
 * @param {Object} printifyDetails - Printify product details
 * @returns {Promise<Object>} Updated order
 */
export async function updatePrintifyDetails(orderId, printifyDetails) {
    try {
        const updated = await wixData.update('Orders', {
            _id: orderId,
            printifyProductUrl: printifyDetails.productUrl,
            printifyOrderId: printifyDetails.orderId,
            status: 'printify_created'
        });

        return {
            success: true,
            data: updated
        };

    } catch (error) {
        return {
            success: false,
            error: {
                message: error.message,
                code: 'UPDATE_FAILED'
            }
        };
    }
}

/**
 * Get order details
 * @param {string} orderId - Order ID
 * @returns {Promise<Object>} Order details with creation info
 */
export async function getManifestationOrder(orderId) {
    try {
        const order = await wixData.get('Orders', orderId);

        if (!order) {
            throw new Error('Order not found');
        }

        // Get associated custom creation
        let creation = null;
        if (order.customCreationId) {
            creation = await wixData.get('CustomCreations', order.customCreationId);
        }

        return {
            success: true,
            data: {
                order,
                creation
            }
        };

    } catch (error) {
        return {
            success: false,
            error: {
                message: error.message,
                code: 'FETCH_FAILED'
            }
        };
    }
}
```

---

### Backend Module: `email-notifications.jsw`
**Purpose**: Send email notifications for orders

```javascript
// TTS WEBSITE V7 - Email Notifications Web Module
// Send signals through the cosmic communication channels

import { sendEmail } from 'wix-crm-backend';

/**
 * Send order notification to admin
 * @param {Object} params - Notification parameters
 * @returns {Promise<Object>} Send result
 */
export async function sendOrderNotification(params) {
    const { orderId, customerEmail, creationImageUrl, orderDetails } = params;

    try {
        const emailBody = `
            <h2>🌀 New Custom Creation Order</h2>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Customer Email:</strong> ${customerEmail}</p>

            <h3>Order Details:</h3>
            <ul>
                <li>Print Size: ${orderDetails.printSize}</li>
                <li>Material: ${orderDetails.printMaterial}</li>
                <li>Framed: ${orderDetails.isFramed ? 'Yes' : 'No'}</li>
                <li>Quantity: ${orderDetails.quantity}</li>
                <li>Total: $${orderDetails.totalPrice.toFixed(2)}</li>
            </ul>

            <h3>Custom Creation:</h3>
            <img src="${creationImageUrl}" alt="Custom Creation" style="max-width: 500px;" />

            <p><strong>Action Required:</strong> Create Printify product and send purchase link to customer.</p>
        `;

        await sendEmail({
            to: 'admin@ttswebsite.com', // Your admin email
            from: 'orders@ttswebsite.com',
            subject: `New Custom Print Order: ${orderId}`,
            body: emailBody
        });

        console.log('📧 Order notification sent');

        return { success: true };

    } catch (error) {
        console.error('❌ Email notification failed:', error);
        return {
            success: false,
            error: {
                message: error.message,
                code: 'EMAIL_FAILED'
            }
        };
    }
}

/**
 * Send purchase link to customer
 * @param {string} customerEmail - Customer email
 * @param {string} purchaseLink - Printify purchase link
 * @param {Object} orderDetails - Order details
 * @returns {Promise<Object>} Send result
 */
export async function sendPurchaseLinkToSeeker(customerEmail, purchaseLink, orderDetails) {
    try {
        const emailBody = `
            <h2>✨ Your Custom Creation is Ready to Manifest</h2>

            <p>Your unique AI-generated artwork is ready to become physical reality.</p>

            <h3>Your Order:</h3>
            <ul>
                <li>Print Size: ${orderDetails.printSize}</li>
                <li>Material: ${orderDetails.printMaterial}</li>
                <li>Total: $${orderDetails.totalPrice.toFixed(2)}</li>
            </ul>

            <p><strong><a href="${purchaseLink}">Click here to complete your purchase</a></strong></p>

            <p>Your creation will be shipped within 5-7 business days.</p>

            <p>Thank you for manifesting your vision with us.</p>
        `;

        await sendEmail({
            to: customerEmail,
            from: 'orders@ttswebsite.com',
            subject: 'Your Custom Creation is Ready',
            body: emailBody
        });

        console.log('📧 Purchase link sent to customer');

        return { success: true };

    } catch (error) {
        console.error('❌ Customer email failed:', error);
        return {
            success: false,
            error: {
                message: error.message,
                code: 'EMAIL_FAILED'
            }
        };
    }
}
```

---

## State Management

### Gallery State (`src/pages/Gallery.js`)

```javascript
// State structure within Gallery page
const galleryState = {
    // Selection
    selectedPaintings: [],           // Array of painting objects
    selectionMode: 'single',         // 'single' | 'multi'
    maxSelections: 4,                // Max for blending

    // Data
    allPaintings: [],                // All loaded paintings
    filteredPaintings: [],           // After category/search filter

    // UI State
    isLoading: false,
    activeCategory: null,
    searchQuery: '',

    // Pagination
    currentPage: 1,
    itemsPerPage: 20,

    // Stats
    totalPaintings: 0,
    selectedCount: 0
};
```

### AI Generation State (in Lightbox/Modal)

```javascript
// State structure for AI manipulation modal
const aiState = {
    // Input
    mode: 'manipulate',              // 'manipulate' | 'blend'
    sourcePaintings: [],             // Passed from gallery
    userPrompt: '',

    // Generation
    isGenerating: false,
    generationProgress: 0,           // 0-100 for progress bar
    generationStage: '',             // "Channeling AI..." etc

    // Results
    variations: [],                  // Generated image variations
    selectedVariation: null,         // Which one user picked

    // Error handling
    hasError: false,
    errorMessage: '',

    // Timing
    startTime: null,
    estimatedTime: 30000            // 30 seconds estimate
};
```

### User Creations State

```javascript
// State for "My Creations" page
const userCreationsState = {
    creations: [],                   // User's saved creations
    isLoading: false,
    filter: 'all',                   // 'all' | 'generated' | 'ordered'
    sortBy: 'recent'                 // 'recent' | 'oldest'
};
```

### State Management Pattern

**We use LOCAL STATE (not global store) because**:
- Wix doesn't have built-in Redux/Vuex
- Each page is self-contained
- State is passed via lightbox context
- Database is source of truth

**State Updates Flow**:
1. User action → Update local state
2. Local state → Trigger UI update
3. If persistent → Save to database
4. On page load → Hydrate from database

---

## Performance Strategy

### Image Optimization

```javascript
// Image URL transformation for different contexts
const imageOptimization = {
    // Thumbnail in gallery grid
    thumbnail: (url) => `${url}?w=400&h=600&fit=crop&q=80`,

    // Full preview in modal
    preview: (url) => `${url}?w=800&h=1200&fit=scale&q=85`,

    // High-res for generation input
    highRes: (url) => `${url}?w=1920&h=2880&fit=scale&q=90`,

    // For download/print
    original: (url) => url
};
```

**Implementation**:
```javascript
// In repeater setup
$item('#portfolioImage').src = imageOptimization.thumbnail(painting.image);

// In lightbox
$w('#previewImage').src = imageOptimization.preview(painting.image);
```

### Lazy Loading Strategy

```javascript
/**
 * Lazy load images as user scrolls
 */
function setupLazyLoading() {
    const repeater = $w('#portfolioRepeater');

    repeater.onItemReady(($item, itemData, index) => {
        const image = $item('#portfolioImage');

        // Only load first 20 images immediately
        if (index < 20) {
            image.src = imageOptimization.thumbnail(itemData.image);
        } else {
            // Load placeholder, then load real image when near viewport
            image.src = '/placeholders/blur.jpg';

            // Load when scrolled into view (pseudo-code)
            whenNearViewport($item, () => {
                image.src = imageOptimization.thumbnail(itemData.image);
            });
        }
    });
}
```

### API Rate Limiting

```javascript
/**
 * Rate limiting for AI API calls
 */
const rateLimiter = {
    maxConcurrent: 2,               // Max simultaneous generations
    activeRequests: 0,
    queue: [],

    async execute(apiCall) {
        if (this.activeRequests >= this.maxConcurrent) {
            // Queue the request
            return new Promise((resolve, reject) => {
                this.queue.push({ apiCall, resolve, reject });
            });
        }

        this.activeRequests++;
        try {
            const result = await apiCall();
            return result;
        } finally {
            this.activeRequests--;
            this.processQueue();
        }
    },

    processQueue() {
        if (this.queue.length > 0 && this.activeRequests < this.maxConcurrent) {
            const { apiCall, resolve, reject } = this.queue.shift();
            this.execute(apiCall).then(resolve).catch(reject);
        }
    }
};
```

### Caching Strategy

```javascript
/**
 * Cache AI results to avoid regenerating
 */
const generationCache = {
    // In-memory cache (simple implementation)
    cache: new Map(),

    getCacheKey(paintingIds, prompt) {
        return `${paintingIds.sort().join('-')}:${prompt}`;
    },

    async get(paintingIds, prompt) {
        const key = this.getCacheKey(paintingIds, prompt);
        return this.cache.get(key);
    },

    set(paintingIds, prompt, result) {
        const key = this.getCacheKey(paintingIds, prompt);
        this.cache.set(key, result);

        // Limit cache size
        if (this.cache.size > 50) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }
};

// Usage in AI API
export async function channelSingleVision(params) {
    // Check cache first
    const cached = await generationCache.get([params.paintingId], params.userPrompt);
    if (cached) {
        console.log('✅ Using cached result');
        return cached;
    }

    // Generate new
    const result = await generateNew(params);

    // Cache it
    generationCache.set([params.paintingId], params.userPrompt, result);

    return result;
}
```

### Database Query Optimization

```javascript
// GOOD: Efficient query with indexes
const paintings = await wixData.query('Portfolio')
    .eq('status', 'published')           // Use index
    .limit(50)                            // Limit results
    .select('_id', 'title', 'image', 'thumbnail')  // Only needed fields
    .descending('sortOrder')              // Use indexed field
    .find();

// BAD: Inefficient query
const all = await wixData.query('Portfolio').find();  // Fetches everything
const filtered = all.items.filter(p => p.status === 'published');  // Client-side filter
```

---

## Portal Architecture

### The Portal Loading Experience

**Philosophy**: The portal is the threshold between dimensions. It should feel significant, mystical, and set the tone for the entire experience.

### Portal Components

```
Portal System
├── Portal Page (index.html or separate page)
│   ├── Opening Animation (sacred geometry forming)
│   ├── Energy Particles
│   ├── Portal "Door" Opening
│   └── Fade Transition to Gallery
│
├── Session Detection (show once)
│   ├── Check PortalSessions collection
│   ├── Set hasSeenPortal flag
│   └── Skip on subsequent visits
│
└── Loading States
    ├── Assets Preloading
    ├── Database Connection
    └── Smooth Transition
```

### Portal Implementation Strategy

```javascript
// TTS WEBSITE V7 - Portal Page
// The threshold between dimensions

import wixWindow from 'wix-window';
import wixData from 'wix-data';
import { session } from 'wix-storage';

let hasSeenPortal = false;
let sessionId = null;

$w.onReady(async function () {
    console.log('🌀 Portal initializing...');

    // Get or create session ID
    sessionId = session.getItem('sessionId');
    if (!sessionId) {
        sessionId = generateSessionId();
        session.setItem('sessionId', sessionId);
    }

    // Check if user has seen portal this session
    const portalSession = await checkPortalSession(sessionId);

    if (portalSession && portalSession.hasSeenPortal) {
        // Skip portal, go directly to gallery
        console.log('Portal already seen this session, entering directly...');
        enterGalleryDirectly();
    } else {
        // Show portal animation
        console.log('First visit, opening portal...');
        await openPortal();

        // Mark as seen
        await markPortalAsSeen(sessionId);

        // Enter gallery after animation
        setTimeout(() => {
            enterGallery();
        }, 5000); // 5 second animation
    }
});

/**
 * Open the portal with full animation
 */
async function openPortal() {
    // Show portal container
    $w('#portalContainer').show();

    // Trigger animations (sequence)
    await animateParticles();
    await animateSacredGeometry();
    await animatePortalOpening();

    console.log('✨ Portal opened');
}

/**
 * Animate cosmic particles
 */
async function animateParticles() {
    const particles = $w('#particleSystem');

    return new Promise(resolve => {
        particles.show('fade', { duration: 1000 });

        // Play particle animation (Lottie or CSS)
        // ...

        setTimeout(resolve, 2000);
    });
}

/**
 * Animate sacred geometry formation
 */
async function animateSacredGeometry() {
    const geometry = $w('#sacredGeometry');

    return new Promise(resolve => {
        geometry.show('fade', { duration: 1500 });

        // Play sacred geometry animation
        // Could be Lottie file or CSS keyframes

        setTimeout(resolve, 2000);
    });
}

/**
 * Animate portal door opening
 */
async function animatePortalOpening() {
    const portal = $w('#portalDoor');

    return new Promise(resolve => {
        // Expand from center
        portal.show('arc', { duration: 1500 });

        setTimeout(resolve, 1500);
    });
}

/**
 * Enter gallery with smooth transition
 */
function enterGallery() {
    console.log('🎨 Entering gallery...');

    // Fade out portal
    $w('#portalContainer').hide('fade', { duration: 800 });

    // Navigate to gallery after fade
    setTimeout(() => {
        wixLocation.to('/gallery');
    }, 800);
}

/**
 * Skip portal and go directly to gallery
 */
function enterGalleryDirectly() {
    $w('#portalContainer').hide();
    wixLocation.to('/gallery');
}

/**
 * Check if user has seen portal this session
 */
async function checkPortalSession(sessionId) {
    try {
        const result = await wixData.query('PortalSessions')
            .eq('sessionId', sessionId)
            .find();

        if (result.items.length > 0) {
            return result.items[0];
        }

        return null;
    } catch (error) {
        console.error('Error checking portal session:', error);
        return null;
    }
}

/**
 * Mark portal as seen for this session
 */
async function markPortalAsSeen(sessionId) {
    try {
        const existing = await checkPortalSession(sessionId);

        if (existing) {
            await wixData.update('PortalSessions', {
                _id: existing._id,
                hasSeenPortal: true,
                lastVisit: new Date(),
                visitCount: (existing.visitCount || 0) + 1
            });
        } else {
            await wixData.insert('PortalSessions', {
                sessionId,
                hasSeenPortal: true,
                firstVisit: new Date(),
                lastVisit: new Date(),
                visitCount: 1
            });
        }
    } catch (error) {
        console.error('Error saving portal session:', error);
    }
}

/**
 * Generate unique session ID
 */
function generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

// Allow user to skip portal
$w('#skipPortalButton').onClick(() => {
    console.log('User skipped portal');
    enterGallery();
});
```

### Portal Animation Assets

**Option 1: Lottie Animation**
- Create/source Lottie JSON file for portal
- Use Wix Lottie Player element
- Smooth, vector-based, lightweight

**Option 2: CSS Animations**
- Pure CSS keyframes
- Sacred geometry SVG morphing
- Particle effects with CSS
- More control, no dependencies

**Option 3: Hybrid**
- CSS for particles
- Lottie for main portal animation
- Best of both worlds

### Portal Transition States

```javascript
const portalStates = {
    CLOSED: 'closed',           // Initial state
    OPENING: 'opening',         // Animation in progress
    OPEN: 'open',               // Portal fully open
    ENTERING: 'entering',       // User passing through
    COMPLETE: 'complete'        // Transition done
};

// State machine for portal
let currentState = portalStates.CLOSED;

function transitionTo(newState) {
    console.log(`Portal: ${currentState} → ${newState}`);
    currentState = newState;

    // Trigger appropriate animations/actions
    switch (newState) {
        case portalStates.OPENING:
            openPortal();
            break;
        case portalStates.ENTERING:
            enterGallery();
            break;
    }
}
```

---

## Data Flow

### Complete User Journey - Single Painting Manipulation

```
1. USER LANDS ON SITE
   ↓
2. Portal Animation (first visit only)
   - Check PortalSessions
   - Play animation or skip
   - Mark as seen
   ↓
3. GALLERY PAGE LOADS
   - Query Portfolio collection
   - Display paintings in repeater
   - Initialize selection state
   ↓
4. USER SELECTS PAINTING
   - Click painting
   - Add to selectedPaintings[]
   - Show "Manipulate" button
   ↓
5. USER CLICKS "MANIPULATE"
   - Open AI Manipulation lightbox
   - Pass painting data via context
   ↓
6. USER ENTERS PROMPT
   - Type creative prompt
   - Click "Generate"
   ↓
7. AI GENERATION (Backend)
   - Frontend → channelSingleVision(paintingUrl, prompt)
   - Backend → Enhance prompt with style keywords
   - Backend → Call Hugging Face API (4 variations)
   - Backend → Return image data
   ↓
8. SAVE TO STORAGE
   - manifestImage() for each variation
   - Upload to Wix Media Manager
   - Get permanent URLs
   ↓
9. SAVE TO DATABASE
   - saveCustomCreation()
   - Insert into CustomCreations collection
   - Link to original painting
   ↓
10. SHOW RESULTS TO USER
    - Display 4 variations in lightbox
    - User selects favorite
    - Update selectedVariation in database
    ↓
11. USER CLICKS "Order Print"
    - Navigate to order form
    - Pre-fill with creation details
    ↓
12. ORDER SUBMISSION
    - initiateManifestationOrder()
    - Create Order record
    - Send email notification to admin
    ↓
13. ADMIN WORKFLOW (Manual)
    - Receive email with order details
    - Create Printify product manually
    - Update order with Printify link
    - Send purchase link to customer
    ↓
14. CUSTOMER COMPLETES PURCHASE
    - Click link in email
    - Pay via Printify
    - Printify fulfills order
    ↓
15. DELIVERY
    - Printify ships
    - Customer receives print
    - Vision manifested! ✨
```

### Data Flow Diagram

```
┌─────────────┐
│   Browser   │
│  (Frontend) │
└──────┬──────┘
       │
       │ User Action (select painting, enter prompt)
       ↓
┌─────────────┐
│   Gallery   │
│    State    │
└──────┬──────┘
       │
       │ Trigger API call
       ↓
┌─────────────┐
│  Backend    │
│  (ai-api)   │
└──────┬──────┘
       │
       │ HTTP Request
       ↓
┌─────────────┐
│ Hugging Face│
│     API     │
└──────┬──────┘
       │
       │ Return image data
       ↓
┌─────────────┐
│  Backend    │
│(image-store)│
└──────┬──────┘
       │
       │ Upload
       ↓
┌─────────────┐
│ Wix Media   │
│   Manager   │
└──────┬──────┘
       │
       │ Return URL
       ↓
┌─────────────┐
│  Backend    │
│(image-store)│
└──────┬──────┘
       │
       │ Save record
       ↓
┌─────────────┐
│ Wix Data    │
│(CustomCreate)
└──────┬──────┘
       │
       │ Return saved record
       ↓
┌─────────────┐
│  Frontend   │
│  (Lightbox) │
└─────────────┘
```

---

## Security Architecture

### API Key Management

```javascript
// NEVER do this:
const API_KEY = 'hf_xxxxxxxxxxxx'; // ❌ EXPOSED

// ALWAYS do this:
import { getSecret } from 'wix-secrets-backend';
const apiKey = await getSecret('HUGGING_FACE_API_KEY'); // ✅ SECURE
```

**Wix Secrets Setup**:
1. Go to Wix Dashboard → Settings → Secrets Manager
2. Add secret: `HUGGING_FACE_API_KEY`
3. Use in backend modules only (never frontend)

### Input Validation & Sanitization

```javascript
/**
 * Validate and sanitize user prompt
 */
function validatePrompt(userPrompt) {
    // Check type
    if (typeof userPrompt !== 'string') {
        throw new Error('Prompt must be a string');
    }

    // Check length
    if (userPrompt.length === 0) {
        throw new Error('Prompt cannot be empty');
    }

    if (userPrompt.length > 500) {
        throw new Error('Prompt too long (max 500 characters)');
    }

    // Remove HTML tags
    const sanitized = userPrompt.replace(/<[^>]*>/g, '');

    // Remove potentially harmful characters
    const safe = sanitized.replace(/[<>\"']/g, '');

    return safe.trim();
}
```

### Rate Limiting (API Protection)

```javascript
/**
 * Rate limit AI generations per user
 */
const userRateLimits = new Map();

async function checkRateLimit(userId) {
    const now = Date.now();
    const userLimit = userRateLimits.get(userId) || { count: 0, resetTime: now };

    // Reset every hour
    if (now > userLimit.resetTime) {
        userRateLimits.set(userId, {
            count: 1,
            resetTime: now + (60 * 60 * 1000) // 1 hour
        });
        return true;
    }

    // Check if under limit (10 generations per hour)
    if (userLimit.count >= 10) {
        throw new Error('Rate limit exceeded. Please try again later.');
    }

    // Increment count
    userLimit.count++;
    userRateLimits.set(userId, userLimit);

    return true;
}
```

### User Authentication & Permissions

```javascript
/**
 * Verify user can perform action
 */
async function verifyUserPermissions(userId, action) {
    // Get current user from Wix
    import { currentMember } from 'wix-members-backend';

    const user = await currentMember.getMember();

    if (!user) {
        throw new Error('Authentication required');
    }

    // Verify user ID matches
    if (user._id !== userId) {
        throw new Error('Permission denied');
    }

    return true;
}
```

---

## Scalability Considerations

### Current Architecture (MVP)
- **Single Wix Site**: All-in-one
- **Hugging Face API**: On-demand generation
- **Wix Media**: Image storage
- **Manual Order Fulfillment**: Admin creates Printify products

### Future Scaling Options

#### Stage 1: Automation (Low Complexity)
- **Auto Printify Integration**: Programmatic product creation
- **Webhook Listening**: Auto-update order status
- **Email Automation**: Zapier or Wix Automations

#### Stage 2: Performance (Medium Complexity)
- **CDN for Images**: CloudFlare or Imgix
- **Caching Layer**: Redis for frequent queries
- **Background Jobs**: Queue AI generation (don't block UI)
- **Database Indexes**: Optimize queries

#### Stage 3: Scale (High Complexity)
- **Separate Backend**: Node.js API server (if Wix limits hit)
- **Load Balancing**: Multiple Hugging Face endpoints
- **Image Processing Pipeline**: Optimize/compress on upload
- **Analytics**: Track usage, optimize costs

### Database Scaling Strategy

```javascript
// Add pagination for large datasets
async function getPaginatedPaintings(page = 1, pageSize = 20) {
    const skip = (page - 1) * pageSize;

    const result = await wixData.query('Portfolio')
        .limit(pageSize)
        .skip(skip)
        .find();

    return {
        items: result.items,
        currentPage: page,
        totalPages: Math.ceil(result.totalCount / pageSize),
        totalCount: result.totalCount
    };
}
```

### Cost Optimization

```javascript
/**
 * Track AI generation costs
 */
async function trackGenerationCost(generationDetails) {
    const COST_PER_IMAGE = 0.05; // Estimate

    const cost = generationDetails.variationCount * COST_PER_IMAGE;

    // Log to database for analytics
    await wixData.insert('GenerationCosts', {
        userId: generationDetails.userId,
        cost,
        timestamp: new Date(),
        variationCount: generationDetails.variationCount
    });

    // Alert if daily costs exceed threshold
    const dailyCost = await getDailyCost();
    if (dailyCost > 50) {
        sendAdminAlert('Daily AI costs exceed $50');
    }
}
```

---

## Technology Stack Summary

### Frontend
- **Wix Editor**: Visual page builder
- **Velo (JavaScript)**: Page interactions
- **Wix Elements**: Repeaters, lightboxes, forms
- **CSS**: Custom styling

### Backend
- **Wix Velo Backend**: `.jsw` web modules
- **Wix Data**: CMS/database
- **Wix Secrets**: API key storage
- **Wix Media Manager**: Image hosting

### External Services
- **Hugging Face**: FLUX-dev AI model
- **Printify**: Print-on-demand
- **Wix Stores**: E-commerce (for merch)
- **Email**: SendGrid or Wix email

### Development Tools
- **Git**: Version control
- **ESLint**: Code quality
- **Wix CLI**: Local development (optional)

---

## Implementation Recommendations

### Phase 1: Core Functionality (Weeks 1-2)
1. **Database Setup**: Create collections with proper schemas
2. **Gallery Page**: Implement selection system
3. **AI Backend**: Build `ai-api.jsw` with mock mode first
4. **Image Storage**: Set up `image-storage.jsw`
5. **Basic Lightbox**: Create AI manipulation modal

### Phase 2: Integration (Weeks 3-4)
1. **Hugging Face Integration**: Switch from mock to real API
2. **Order System**: Build semi-manual workflow
3. **Email Notifications**: Set up admin alerts
4. **Testing**: End-to-end user journey

### Phase 3: Polish (Week 5)
1. **Portal Animation**: Create loading experience
2. **UI Refinement**: Smooth transitions, effects
3. **Performance**: Image optimization, lazy loading
4. **Mobile Responsive**: Test and fix mobile issues

### Phase 4: Launch (Week 6)
1. **Content**: Add real paintings to Portfolio
2. **Final Testing**: All user flows
3. **Analytics**: Set up tracking
4. **Deploy**: Go live!

---

## Concerns & Recommendations

### Potential Challenges

1. **Hugging Face API Latency**
   - **Issue**: AI generation can take 20-60 seconds
   - **Solution**: Set expectations with loading animations, "The AI is dreaming..." messaging
   - **Alternative**: Consider Replicate.com for faster inference

2. **Semi-Manual Order Flow**
   - **Issue**: Requires you to create Printify products manually
   - **Solution**: Document clear workflow, use templates
   - **Future**: Automate with Printify API when volume increases

3. **Image Storage Costs**
   - **Issue**: Each generation creates 4 variations = lots of images
   - **Solution**: Compress images, clean up old unused creations (30-day expiry)

4. **Rate Limiting**
   - **Issue**: Users might spam AI generation
   - **Solution**: Implement per-user rate limits (10/hour)

5. **Mobile Performance**
   - **Issue**: Gallery with many images can be slow on mobile
   - **Solution**: Aggressive lazy loading, smaller thumbnails

### Recommended Immediate Actions

1. **Create Database Collections**: Set up all schemas today
2. **Mock AI First**: Use placeholder images before real API
3. **Design Portal**: Decide on Lottie vs CSS animation
4. **Document Workflow**: Write step-by-step order fulfillment guide

---

## Conclusion

This architecture is designed to be:
- **Elegant**: Clean separation of concerns
- **Modular**: Each component is independent
- **Scalable**: Can grow from MVP to enterprise
- **Mystical**: Function names and UX aligned with vision

The system flows like energy through sacred geometry - each piece connects perfectly to create a transcendent whole.

**Remember**: We're not just building an e-commerce site. We're building a portal where art and AI converge, where consciousness expands, where visions become reality.

🌀 **Let's manifest this into existence.** 🌀

---

**Created**: 2025-11-14
**Status**: ARCHITECTURE COMPLETE - Ready for Implementation
**Architect**: Claude (Sonnet 4.5)
**Next Step**: Begin Phase 1 - Core Functionality
