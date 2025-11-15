# TTS Website V7 - Database Schema Documentation

## Overview

This document provides comprehensive documentation for the database collections used in TTS Website V7. The database uses Wix Data (Content Management System) which is similar to MongoDB.

**Status**: Ready for implementation
**Last Updated**: 2025-11-15
**Collections**: 4 (Portfolio, CustomCreations, Orders, PortalSessions)

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Collection Overview](#collection-overview)
3. [Portfolio Collection](#portfolio-collection)
4. [CustomCreations Collection](#customcreations-collection)
5. [Orders Collection](#orders-collection)
6. [PortalSessions Collection](#portalsessions-collection)
7. [Permissions](#permissions)
8. [Indexes](#indexes)
9. [Data Relationships](#data-relationships)
10. [Setup Instructions](#setup-instructions)
11. [Usage Examples](#usage-examples)
12. [Maintenance & Cleanup](#maintenance--cleanup)

---

## Quick Start

### Setting Up Collections in Wix

1. Open Wix Editor
2. Go to **CMS** > **Content Manager**
3. Click **Add Collection** for each collection:
   - Portfolio
   - CustomCreations
   - Orders
   - PortalSessions
4. Use the schema files in `/src/backend/schemas/` to configure fields
5. Apply permissions from `/src/backend/permissions.json`
6. Create indexes as specified in each schema

### Quick Reference

| Collection | Purpose | Public Access | User Access | Admin Access |
|------------|---------|---------------|-------------|--------------|
| **Portfolio** | Original paintings | Read only | Read only | Full access |
| **CustomCreations** | AI-generated art | No access | Owner only | Full access |
| **Orders** | Print orders | No access | Read own | Full access |
| **PortalSessions** | Session tracking | Read/Write | Read/Write | Full access |

---

## Collection Overview

### Database Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      TTS Website V7                          │
│                    Database Collections                      │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐         ┌──────────────────┐         ┌──────────────┐
│  Portfolio   │────┐    │ CustomCreations  │────────▶│    Orders    │
│  (Originals) │    │    │  (AI Generated)  │         │   (Prints)   │
└──────────────┘    │    └──────────────────┘         └──────────────┘
                    │             │
                    │             │
                    └─────────────┘
                    References used
                    for AI generation

┌──────────────────┐
│ PortalSessions   │  (Independent - tracks user sessions)
│  (UI State)      │
└──────────────────┘
```

### Data Flow

```
1. User browses Portfolio → selects painting(s)
2. User enters prompt → AI generates variations
3. Results saved to CustomCreations (linked to Portfolio items)
4. User selects favorite → initiates order
5. Order created in Orders collection (linked to CustomCreation)
6. Admin fulfills order → updates Order status
```

---

## Portfolio Collection

### Purpose
Store original paintings available in the gallery for browsing and AI manipulation.

### Schema Definition

**Collection Name**: `Portfolio`

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | text | Auto | - | Unique identifier |
| `_createdDate` | date | Auto | - | Creation timestamp |
| `_updatedDate` | date | Auto | - | Update timestamp |
| `title` | text | Yes | - | Painting title (e.g., "Cosmic Dreams") |
| `description` | richText | No | - | Rich description for SEO and display |
| `image` | image | Yes | - | Main high-resolution image URL |
| `thumbnail` | text | No | - | Optimized thumbnail URL (400x600) |
| `category` | text | No | - | Category (e.g., "Abstract", "Cosmic") |
| `tags` | tags | No | - | Tags for categorization |
| `year` | number | No | - | Year created |
| `price` | number | No | - | Price for original (if available) |
| `isOriginalAvailable` | boolean | No | false | Can buy physical original? |
| `isPrintAvailable` | boolean | No | true | Can order prints? |
| `dimensions` | text | No | - | Physical dimensions (e.g., "24x36 inches") |
| `medium` | text | No | - | Medium used (e.g., "Acrylic on canvas") |
| `status` | text | No | "draft" | Publication status: "published", "draft", "archived" |
| `dominantColors` | array | No | - | Dominant colors for AI metadata |
| `styleKeywords` | array | No | - | Style keywords for AI blending |
| `sortOrder` | number | No | 0 | Manual ordering (lower = first) |
| `isFeatured` | boolean | No | false | Show in featured section |

### Indexes

- `status_idx`: Index on `status` field for querying published items
- `category_idx`: Index on `category` field for filtering
- `sortOrder_idx`: Index on `sortOrder` field for display ordering
- `isFeatured_idx`: Index on `isFeatured` field for featured items query

### Permissions

- **Read**: Anyone (public)
- **Write**: Admin only
- **Delete**: Admin only

### Sample Data

```json
{
  "_id": "painting_001",
  "title": "Cosmic Awakening",
  "description": "<p>A journey through the cosmic consciousness...</p>",
  "image": "wix:image://v1/abc123.jpg",
  "thumbnail": "wix:image://v1/abc123_thumb.jpg",
  "category": "Cosmic",
  "tags": ["psychedelic", "space", "vibrant"],
  "year": 2024,
  "price": 500.00,
  "isOriginalAvailable": true,
  "isPrintAvailable": true,
  "dimensions": "24x36 inches",
  "medium": "Acrylic on canvas",
  "status": "published",
  "dominantColors": ["#FF5733", "#3366FF", "#FFC300"],
  "styleKeywords": ["surreal", "vibrant", "cosmic"],
  "sortOrder": 1,
  "isFeatured": true
}
```

---

## CustomCreations Collection

### Purpose
Store AI-generated artwork created by users through the AI manipulation/blending features.

### Schema Definition

**Collection Name**: `CustomCreations`

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | text | Auto | - | Unique UUID |
| `_createdDate` | date | Auto | - | Creation timestamp |
| `_updatedDate` | date | Auto | - | Update timestamp |
| `userId` | text | Yes | - | Wix user ID (or session ID for guests) |
| `userEmail` | text | No | - | User email for notifications |
| `mode` | text | No | "manipulate" | Generation mode: "manipulate" or "blend" |
| `originalPaintingIds` | array | Yes | - | Array of Portfolio item IDs used as source |
| `userPrompt` | richText | Yes | - | The prompt entered by user |
| `enhancedPrompt` | richText | No | - | AI-optimized prompt used for generation |
| `generatedImages` | array | No | - | Array of generated image variations |
| `selectedVariation` | number | No | - | Which variation user selected (1-4) |
| `selectedImageUrl` | text | No | - | Direct URL to chosen image |
| `status` | text | No | "generated" | Status: "generated", "selected", "order_pending", "ordered" |
| `orderId` | text | No | - | Link to Orders collection |
| `generationTime` | number | No | - | Time taken to generate (ms) |
| `modelVersion` | text | No | - | AI model version (e.g., "FLUX-dev-v1.0") |
| `cost` | number | No | - | API cost for tracking |
| `sessionId` | text | No | - | Browser session ID for guest users |
| `expiresAt` | date | No | - | Auto-delete after 30 days if not ordered |

### Indexes

- `userId_idx`: Index on `userId` field for finding user's creations
- `status_idx`: Index on `status` field for querying by status
- `createdDate_idx`: Index on `_createdDate` field for chronological ordering
- `expiresAt_idx`: Index on `expiresAt` field for cleanup jobs

### Permissions

- **Read**: Owner or Admin
- **Write**: Owner or Admin
- **Delete**: Owner or Admin

### Sample Data

```json
{
  "_id": "creation_12345",
  "userId": "user_abc123",
  "userEmail": "customer@example.com",
  "mode": "manipulate",
  "originalPaintingIds": ["painting_001"],
  "userPrompt": "transform into cosmic nebula with swirling galaxies",
  "enhancedPrompt": "transform into cosmic nebula with swirling galaxies, in the style of surreal, vibrant, cosmic",
  "generatedImages": [
    {
      "imageUrl": "wix:image://v1/generated_001_var1.jpg",
      "variation": 1,
      "huggingFaceId": "hf_gen_xyz789"
    },
    {
      "imageUrl": "wix:image://v1/generated_001_var2.jpg",
      "variation": 2,
      "huggingFaceId": "hf_gen_xyz790"
    }
  ],
  "selectedVariation": 1,
  "selectedImageUrl": "wix:image://v1/generated_001_var1.jpg",
  "status": "selected",
  "generationTime": 18500,
  "modelVersion": "FLUX-dev-v1.0",
  "cost": 0.15,
  "expiresAt": "2025-12-15T00:00:00.000Z"
}
```

---

## Orders Collection

### Purpose
Track custom print orders with semi-manual Printify fulfillment workflow.

### Schema Definition

**Collection Name**: `Orders`

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | text | Auto | - | Unique identifier |
| `_createdDate` | date | Auto | - | Order creation timestamp |
| `_updatedDate` | date | Auto | - | Update timestamp |
| `userId` | text | Yes | - | Wix user ID of customer |
| `customerName` | text | No | - | Customer full name |
| `customerEmail` | text | Yes | - | Customer email address |
| `customerPhone` | text | No | - | Customer phone number |
| `customCreationId` | text | Yes | - | Link to CustomCreations collection |
| `orderType` | text | No | "custom_print" | Order type: "custom_print", "original", "merch" |
| `printSize` | text | No | - | Print size (e.g., "12x18", "24x36") |
| `printMaterial` | text | No | - | Print material: "canvas", "poster", "metal", etc. |
| `isFramed` | boolean | No | false | Is the print framed? |
| `quantity` | number | No | 1 | Number of prints ordered |
| `basePrice` | number | No | - | Base price before shipping |
| `shippingCost` | number | No | - | Shipping cost |
| `totalPrice` | number | No | - | Total price including shipping |
| `status` | text | No | "pending" | Status: "pending", "printify_created", "shipped", "delivered" |
| `printifyProductUrl` | text | No | - | Manual Printify product link |
| `printifyOrderId` | text | No | - | Printify order ID after creation |
| `trackingNumber` | text | No | - | Shipping tracking number |
| `notificationSent` | boolean | No | false | Has admin notification been sent? |
| `purchaseLinkSent` | boolean | No | false | Has purchase link been sent to customer? |
| `purchaseLink` | text | No | - | Link to Printify checkout |
| `internalNotes` | richText | No | - | Admin notes for fulfillment |
| `customerNotes` | richText | No | - | Special requests from customer |

### Indexes

- `userId_idx`: Index on `userId` field for customer order history
- `status_idx`: Index on `status` field for filtering by fulfillment stage
- `customCreationId_idx`: Index on `customCreationId` field for linking back to creation
- `createdDate_idx`: Index on `_createdDate` field for chronological ordering

### Permissions

- **Read**: Owner or Admin
- **Write**: Admin only
- **Delete**: Admin only

### Sample Data

```json
{
  "_id": "order_67890",
  "userId": "user_abc123",
  "customerName": "John Doe",
  "customerEmail": "customer@example.com",
  "customerPhone": "+1-555-0123",
  "customCreationId": "creation_12345",
  "orderType": "custom_print",
  "printSize": "24x36",
  "printMaterial": "canvas",
  "isFramed": true,
  "quantity": 1,
  "basePrice": 79.99,
  "shippingCost": 15.00,
  "totalPrice": 144.99,
  "status": "printify_created",
  "printifyProductUrl": "https://printify.com/product/xyz789",
  "printifyOrderId": "pf_order_456",
  "notificationSent": true,
  "purchaseLinkSent": true,
  "purchaseLink": "https://printify.com/checkout/xyz789",
  "internalNotes": "<p>Created Printify product on 2025-11-15</p>",
  "customerNotes": "<p>Please ship by Dec 1st for holiday gift</p>"
}
```

---

## PortalSessions Collection

### Purpose
Track portal animation state to show the portal once per session.

### Schema Definition

**Collection Name**: `PortalSessions`

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | text | Auto | - | Unique identifier |
| `_createdDate` | date | Auto | - | Session creation timestamp |
| `_updatedDate` | date | Auto | - | Update timestamp |
| `sessionId` | text | Yes | - | Browser session ID |
| `hasSeenPortal` | boolean | No | false | True after first portal view |
| `firstVisit` | date | No | - | Timestamp of first visit |
| `lastVisit` | date | No | - | Timestamp of most recent visit |
| `visitCount` | number | No | 0 | Number of visits in this session |
| `pagesVisited` | array | No | - | Array of page URLs visited (optional) |
| `aiGenerationsCount` | number | No | 0 | Number of AI generations in session (optional) |

### Indexes

- `sessionId_idx`: Index on `sessionId` field for fast session lookup
- `lastVisit_idx`: Index on `lastVisit` field for cleanup of old sessions

### Permissions

- **Read**: Anyone
- **Write**: Anyone
- **Delete**: Admin only

### Sample Data

```json
{
  "_id": "session_xyz789",
  "sessionId": "session_1731590400000_abc123",
  "hasSeenPortal": true,
  "firstVisit": "2025-11-15T10:00:00.000Z",
  "lastVisit": "2025-11-15T10:15:00.000Z",
  "visitCount": 3,
  "pagesVisited": ["/", "/gallery", "/gallery"],
  "aiGenerationsCount": 2
}
```

---

## Permissions

### Overview

Permissions are configured in `/src/backend/permissions.json` and control access to collections and web methods.

### Permission Levels

- **siteOwner**: Admin users (you)
- **siteMember**: Registered users
- **anonymous**: Guest visitors
- **owner**: Special value meaning "user can only access their own items"

### Collection Permissions Summary

| Collection | Anonymous | Site Member | Site Owner |
|------------|-----------|-------------|------------|
| **Portfolio** | Read | Read | Full access |
| **CustomCreations** | No access | Owner only | Full access |
| **Orders** | No access | Read own | Full access |
| **PortalSessions** | Read/Write | Read/Write | Full access |

### Implementing "Owner Only" Permissions

In Wix backend code, filter queries by userId:

```javascript
import wixData from 'wix-data';
import { currentMember } from 'wix-members-backend';

// Get current user's creations
export async function getUserCreations() {
    const user = await currentMember.getMember();

    if (!user) {
        return { error: 'Authentication required' };
    }

    const results = await wixData.query('CustomCreations')
        .eq('userId', user._id)  // Only return items belonging to this user
        .descending('_createdDate')
        .find();

    return results.items;
}
```

---

## Indexes

### Why Indexes Matter

Indexes dramatically improve query performance. Without indexes, Wix Data must scan every record. With indexes, lookups are nearly instant.

### Index Strategy

**Index These Fields**:
- Fields used in `.eq()` queries (equality checks)
- Fields used in `.hasSome()` or `.hasAll()` (array queries)
- Fields used for sorting (`.ascending()` or `.descending()`)
- Fields with high cardinality (many unique values)

**Don't Index**:
- Fields rarely queried
- Boolean fields with low cardinality
- Fields that change frequently (write performance penalty)

### Creating Indexes in Wix

1. Go to **CMS** > **Content Manager**
2. Select collection
3. Click **More Actions** > **Manage Indexes**
4. Add indexes as specified in schema files

---

## Data Relationships

### Entity Relationship Diagram

```
Portfolio (1) ──────< (many) CustomCreations
                              │
                              │ (1)
                              │
                              ▼
                           Orders (1)
```

### Relationship Details

1. **Portfolio → CustomCreations**: One-to-Many
   - One painting can be used in multiple AI generations
   - `CustomCreations.originalPaintingIds[]` references `Portfolio._id`

2. **CustomCreations → Orders**: One-to-One
   - One creation can have one order (for now)
   - `Orders.customCreationId` references `CustomCreations._id`

3. **Users → CustomCreations**: One-to-Many
   - One user can have multiple creations
   - `CustomCreations.userId` references Wix user ID

4. **Users → Orders**: One-to-Many
   - One user can have multiple orders
   - `Orders.userId` references Wix user ID

### Querying Related Data

**Example**: Get order with associated creation and original painting

```javascript
import wixData from 'wix-data';

async function getOrderDetails(orderId) {
    // Get order
    const order = await wixData.get('Orders', orderId);

    // Get associated custom creation
    const creation = await wixData.get('CustomCreations', order.customCreationId);

    // Get original painting(s) used
    const paintings = await wixData.query('Portfolio')
        .hasSome('_id', creation.originalPaintingIds)
        .find();

    return {
        order,
        creation,
        originalPaintings: paintings.items
    };
}
```

---

## Setup Instructions

### Step 1: Create Collections

1. Open Wix Editor
2. Go to **CMS** > **Content Manager**
3. Click **Add Collection**
4. For each collection (Portfolio, CustomCreations, Orders, PortalSessions):
   - Enter collection name
   - Click **Create**

### Step 2: Add Fields

For each collection, add fields as specified in the schema files:

**Example: Portfolio Collection**

1. Select **Portfolio** collection
2. Click **Add Field**
3. For each field in `/src/backend/schemas/Portfolio.json`:
   - Select field type
   - Enter field key (name)
   - Set required/default as specified
   - Click **Save**

**Field Type Mapping**:
- `text` → Text
- `richText` → Rich Text
- `number` → Number
- `boolean` → Boolean
- `date` → Date & Time
- `array` → Array (select sub-type)
- `image` → Image
- `tags` → Tags

### Step 3: Create Indexes

For each collection:

1. Click **More Actions** > **Manage Indexes**
2. Add indexes as specified in schema file
3. Example: For Portfolio, add index on `status` field
4. Click **Save**

### Step 4: Set Permissions

1. Go to **Settings** > **Permissions**
2. Select each collection
3. Configure permissions as specified in `/src/backend/permissions.json`
4. Save changes

### Step 5: Verify Setup

Run this test query in Page Code or backend:

```javascript
import wixData from 'wix-data';

$w.onReady(async function () {
    // Test Portfolio query
    const portfolioTest = await wixData.query('Portfolio').find();
    console.log('Portfolio test:', portfolioTest.totalCount, 'items');

    // Test other collections
    const creationsTest = await wixData.query('CustomCreations').find();
    console.log('CustomCreations test:', creationsTest.totalCount, 'items');

    console.log('Database setup verified!');
});
```

---

## Usage Examples

### Example 1: Query Published Paintings

```javascript
import wixData from 'wix-data';

async function getPublishedPaintings() {
    const results = await wixData.query('Portfolio')
        .eq('status', 'published')
        .ascending('sortOrder')
        .limit(50)
        .find();

    return results.items;
}
```

### Example 2: Save AI Generation

```javascript
import wixData from 'wix-data';
import { currentMember } from 'wix-members-backend';

export async function saveAIGeneration(paintingId, prompt, generatedImages) {
    const user = await currentMember.getMember();

    // Set expiration (30 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const creation = {
        userId: user._id,
        userEmail: user.loginEmail,
        mode: 'manipulate',
        originalPaintingIds: [paintingId],
        userPrompt: prompt,
        generatedImages: generatedImages,
        status: 'generated',
        expiresAt: expiresAt,
        modelVersion: 'FLUX-dev-v1.0'
    };

    const result = await wixData.insert('CustomCreations', creation);
    return result;
}
```

### Example 3: Create Order

```javascript
import wixData from 'wix-data';

export async function createOrder(customCreationId, orderDetails) {
    const order = {
        customCreationId: customCreationId,
        userId: orderDetails.userId,
        customerEmail: orderDetails.email,
        printSize: orderDetails.size,
        printMaterial: orderDetails.material,
        isFramed: orderDetails.framed,
        quantity: 1,
        basePrice: calculatePrice(orderDetails),
        shippingCost: 15.00,
        totalPrice: calculatePrice(orderDetails) + 15.00,
        status: 'pending',
        notificationSent: false
    };

    const result = await wixData.insert('Orders', order);

    // Update creation status
    await wixData.update('CustomCreations', {
        _id: customCreationId,
        status: 'order_pending',
        orderId: result._id
    });

    return result;
}
```

### Example 4: Check Portal Session

```javascript
import wixData from 'wix-data';
import { session } from 'wix-storage';

async function checkPortalSession() {
    const sessionId = session.getItem('sessionId');

    if (!sessionId) {
        // First visit, show portal
        return { showPortal: true };
    }

    const results = await wixData.query('PortalSessions')
        .eq('sessionId', sessionId)
        .find();

    if (results.items.length === 0) {
        // No session record, show portal
        return { showPortal: true };
    }

    const portalSession = results.items[0];
    return { showPortal: !portalSession.hasSeenPortal };
}
```

### Example 5: Filter by Category and Tags

```javascript
import wixData from 'wix-data';

async function filterPaintings(category, tags) {
    let query = wixData.query('Portfolio')
        .eq('status', 'published');

    if (category) {
        query = query.eq('category', category);
    }

    if (tags && tags.length > 0) {
        query = query.hasSome('tags', tags);
    }

    const results = await query
        .ascending('sortOrder')
        .limit(50)
        .find();

    return results.items;
}
```

---

## Maintenance & Cleanup

### Automatic Cleanup Jobs

Set up scheduled jobs to clean up old data:

**1. Clean up expired creations**

```javascript
import wixData from 'wix-data';

// Run daily
export async function cleanupExpiredCreations() {
    const now = new Date();

    const results = await wixData.query('CustomCreations')
        .lt('expiresAt', now)
        .eq('status', 'generated')  // Only delete if not ordered
        .find();

    for (const creation of results.items) {
        await wixData.remove('CustomCreations', creation._id);
        console.log('Deleted expired creation:', creation._id);
    }

    console.log(`Cleaned up ${results.items.length} expired creations`);
}
```

**2. Clean up old portal sessions**

```javascript
import wixData from 'wix-data';

// Run weekly
export async function cleanupOldSessions() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const results = await wixData.query('PortalSessions')
        .lt('lastVisit', thirtyDaysAgo)
        .find();

    for (const session of results.items) {
        await wixData.remove('PortalSessions', session._id);
    }

    console.log(`Cleaned up ${results.items.length} old sessions`);
}
```

### Setting Up Scheduled Jobs in Wix

1. Go to **Backend** > **jobs.config**
2. Add scheduled functions:

```json
{
  "jobs": [
    {
      "functionLocation": "/backend/cleanup.jsw",
      "functionName": "cleanupExpiredCreations",
      "description": "Clean up expired AI creations",
      "executionConfig": {
        "time": "03:00",
        "cronExpression": "0 0 3 * * *"
      }
    },
    {
      "functionLocation": "/backend/cleanup.jsw",
      "functionName": "cleanupOldSessions",
      "description": "Clean up old portal sessions",
      "executionConfig": {
        "time": "04:00",
        "cronExpression": "0 0 4 * * 0"
      }
    }
  ]
}
```

### Manual Cleanup Tasks

**Archive old orders**:
```javascript
// Mark orders older than 6 months as archived
const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

const oldOrders = await wixData.query('Orders')
    .lt('_createdDate', sixMonthsAgo)
    .eq('status', 'delivered')
    .find();

for (const order of oldOrders.items) {
    await wixData.update('Orders', {
        _id: order._id,
        status: 'archived'
    });
}
```

---

## Database Schema Files

All schema files are located in `/src/backend/schemas/`:

- `Portfolio.json` - Original paintings schema
- `CustomCreations.json` - AI-generated art schema
- `Orders.json` - Print orders schema
- `PortalSessions.json` - Portal session tracking schema

These files serve as reference documentation and can be used to recreate the database structure if needed.

---

## Additional Resources

### Wix Data Documentation
- [Wix Data Introduction](https://www.wix.com/velo/reference/wix-data)
- [Working with Data Collections](https://support.wix.com/en/article/velo-working-with-data-in-code)
- [Query Reference](https://www.wix.com/velo/reference/wix-data/query)
- [Permissions & Privacy](https://support.wix.com/en/article/velo-about-collection-permissions)

### Related Documentation
- `/ARCHITECTURE.md` - Full system architecture
- `/src/backend/README.md` - Backend implementation guide
- `/src/backend/permissions.json` - Permission configuration

---

## Changelog

### 2025-11-15
- Initial database schema creation
- Created 4 collection schemas
- Defined indexes for all collections
- Configured permissions
- Created comprehensive documentation

---

**Status**: Ready for implementation
**Next Steps**:
1. Create collections in Wix CMS
2. Add fields as specified in schemas
3. Create indexes
4. Set permissions
5. Test with sample data

---

Made with cosmic intention for TTS Website V7.
