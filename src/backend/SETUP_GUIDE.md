# Database Setup Guide - TTS Website V7

## Step-by-Step Instructions for Creating Database Collections in Wix

This guide walks you through the exact steps to set up all database collections in the Wix Editor.

**Time Required**: 30-45 minutes
**Difficulty**: Beginner-friendly

---

## Prerequisites

- Wix site created
- Access to Wix Editor
- Schema files in `/src/backend/schemas/` (already created)

---

## Table of Contents

1. [Collection 1: Portfolio](#collection-1-portfolio)
2. [Collection 2: CustomCreations](#collection-2-customcreations)
3. [Collection 3: Orders](#collection-3-orders)
4. [Collection 4: PortalSessions](#collection-4-portalsessions)
5. [Setting Permissions](#setting-permissions)
6. [Verification](#verification)
7. [Adding Sample Data](#adding-sample-data)

---

## Collection 1: Portfolio

### Step 1.1: Create Collection

1. Open **Wix Editor**
2. Click **CMS** in left sidebar (database icon)
3. Click **Add Collection**
4. Name: `Portfolio`
5. Click **Create**

### Step 1.2: Add Fields

Add each field by clicking **Add Field** button:

#### Field 1: title
- **Type**: Text
- **Field Key**: `title`
- **Field Name**: Title
- **Required**: ✓ Yes
- **Unique**: ☐ No
- Click **Save**

#### Field 2: description
- **Type**: Rich Text
- **Field Key**: `description`
- **Field Name**: Description
- **Required**: ☐ No
- Click **Save**

#### Field 3: image
- **Type**: Image
- **Field Key**: `image`
- **Field Name**: Image
- **Required**: ✓ Yes
- Click **Save**

#### Field 4: thumbnail
- **Type**: Text
- **Field Key**: `thumbnail`
- **Field Name**: Thumbnail
- **Required**: ☐ No
- Click **Save**

#### Field 5: category
- **Type**: Text
- **Field Key**: `category`
- **Field Name**: Category
- **Required**: ☐ No
- Click **Save**

#### Field 6: tags
- **Type**: Tags
- **Field Key**: `tags`
- **Field Name**: Tags
- **Required**: ☐ No
- Click **Save**

#### Field 7: year
- **Type**: Number
- **Field Key**: `year`
- **Field Name**: Year
- **Required**: ☐ No
- Click **Save**

#### Field 8: price
- **Type**: Number
- **Field Key**: `price`
- **Field Name**: Price
- **Required**: ☐ No
- Click **Save**

#### Field 9: isOriginalAvailable
- **Type**: Boolean
- **Field Key**: `isOriginalAvailable`
- **Field Name**: Is Original Available
- **Required**: ☐ No
- **Default**: false
- Click **Save**

#### Field 10: isPrintAvailable
- **Type**: Boolean
- **Field Key**: `isPrintAvailable`
- **Field Name**: Is Print Available
- **Required**: ☐ No
- **Default**: true
- Click **Save**

#### Field 11: dimensions
- **Type**: Text
- **Field Key**: `dimensions`
- **Field Name**: Dimensions
- **Required**: ☐ No
- Click **Save**

#### Field 12: medium
- **Type**: Text
- **Field Key**: `medium`
- **Field Name**: Medium
- **Required**: ☐ No
- Click **Save**

#### Field 13: status
- **Type**: Text
- **Field Key**: `status`
- **Field Name**: Status
- **Required**: ☐ No
- **Default**: draft
- Click **Save**

#### Field 14: dominantColors
- **Type**: Array
- **Array Type**: Text
- **Field Key**: `dominantColors`
- **Field Name**: Dominant Colors
- **Required**: ☐ No
- Click **Save**

#### Field 15: styleKeywords
- **Type**: Array
- **Array Type**: Text
- **Field Key**: `styleKeywords`
- **Field Name**: Style Keywords
- **Required**: ☐ No
- Click **Save**

#### Field 16: sortOrder
- **Type**: Number
- **Field Key**: `sortOrder`
- **Field Name**: Sort Order
- **Required**: ☐ No
- **Default**: 0
- Click **Save**

#### Field 17: isFeatured
- **Type**: Boolean
- **Field Key**: `isFeatured`
- **Field Name**: Is Featured
- **Required**: ☐ No
- **Default**: false
- Click **Save**

### Step 1.3: Create Indexes

1. Click **More Actions** (three dots)
2. Select **Manage Indexes**
3. Click **New Index**

**Index 1: status_idx**
- Fields: `status`
- Click **Save**

**Index 2: category_idx**
- Fields: `category`
- Click **Save**

**Index 3: sortOrder_idx**
- Fields: `sortOrder`
- Click **Save**

**Index 4: isFeatured_idx**
- Fields: `isFeatured`
- Click **Save**

4. Click **Done**

### Step 1.4: Set Permissions

1. Click **More Actions** > **Permissions & Privacy**
2. Set **Who can read content**: **Anyone**
3. Set **Who can create content**: **Admin**
4. Set **Who can update content**: **Admin**
5. Set **Who can delete content**: **Admin**
6. Click **Save**

---

## Collection 2: CustomCreations

### Step 2.1: Create Collection

1. Click **Add Collection**
2. Name: `CustomCreations`
3. Click **Create**

### Step 2.2: Add Fields

#### Field 1: userId
- **Type**: Text
- **Field Key**: `userId`
- **Field Name**: User ID
- **Required**: ✓ Yes
- Click **Save**

#### Field 2: userEmail
- **Type**: Text
- **Field Key**: `userEmail`
- **Field Name**: User Email
- **Required**: ☐ No
- Click **Save**

#### Field 3: mode
- **Type**: Text
- **Field Key**: `mode`
- **Field Name**: Mode
- **Required**: ☐ No
- **Default**: manipulate
- Click **Save**

#### Field 4: originalPaintingIds
- **Type**: Array
- **Array Type**: Text
- **Field Key**: `originalPaintingIds`
- **Field Name**: Original Painting IDs
- **Required**: ✓ Yes
- Click **Save**

#### Field 5: userPrompt
- **Type**: Rich Text
- **Field Key**: `userPrompt`
- **Field Name**: User Prompt
- **Required**: ✓ Yes
- Click **Save**

#### Field 6: enhancedPrompt
- **Type**: Rich Text
- **Field Key**: `enhancedPrompt`
- **Field Name**: Enhanced Prompt
- **Required**: ☐ No
- Click **Save**

#### Field 7: generatedImages
- **Type**: Array
- **Array Type**: Object (or JSON)
- **Field Key**: `generatedImages`
- **Field Name**: Generated Images
- **Required**: ☐ No
- Click **Save**

#### Field 8: selectedVariation
- **Type**: Number
- **Field Key**: `selectedVariation`
- **Field Name**: Selected Variation
- **Required**: ☐ No
- Click **Save**

#### Field 9: selectedImageUrl
- **Type**: Text
- **Field Key**: `selectedImageUrl`
- **Field Name**: Selected Image URL
- **Required**: ☐ No
- Click **Save**

#### Field 10: status
- **Type**: Text
- **Field Key**: `status`
- **Field Name**: Status
- **Required**: ☐ No
- **Default**: generated
- Click **Save**

#### Field 11: orderId
- **Type**: Text
- **Field Key**: `orderId`
- **Field Name**: Order ID
- **Required**: ☐ No
- Click **Save**

#### Field 12: generationTime
- **Type**: Number
- **Field Key**: `generationTime`
- **Field Name**: Generation Time
- **Required**: ☐ No
- Click **Save**

#### Field 13: modelVersion
- **Type**: Text
- **Field Key**: `modelVersion`
- **Field Name**: Model Version
- **Required**: ☐ No
- Click **Save**

#### Field 14: cost
- **Type**: Number
- **Field Key**: `cost`
- **Field Name**: Cost
- **Required**: ☐ No
- Click **Save**

#### Field 15: sessionId
- **Type**: Text
- **Field Key**: `sessionId`
- **Field Name**: Session ID
- **Required**: ☐ No
- Click **Save**

#### Field 16: expiresAt
- **Type**: Date & Time
- **Field Key**: `expiresAt`
- **Field Name**: Expires At
- **Required**: ☐ No
- Click **Save**

### Step 2.3: Create Indexes

**Index 1: userId_idx**
- Fields: `userId`

**Index 2: status_idx**
- Fields: `status`

**Index 3: createdDate_idx**
- Fields: `_createdDate`

**Index 4: expiresAt_idx**
- Fields: `expiresAt`

### Step 2.4: Set Permissions

1. Click **More Actions** > **Permissions & Privacy**
2. Set **Who can read content**: **Site members (owner)**
3. Set **Who can create content**: **Site members**
4. Set **Who can update content**: **Content owner**
5. Set **Who can delete content**: **Content owner**
6. Click **Save**

---

## Collection 3: Orders

### Step 3.1: Create Collection

1. Click **Add Collection**
2. Name: `Orders`
3. Click **Create**

### Step 3.2: Add Fields

#### Field 1: userId
- **Type**: Text
- **Field Key**: `userId`
- **Required**: ✓ Yes

#### Field 2: customerName
- **Type**: Text
- **Field Key**: `customerName`
- **Required**: ☐ No

#### Field 3: customerEmail
- **Type**: Text
- **Field Key**: `customerEmail`
- **Required**: ✓ Yes

#### Field 4: customerPhone
- **Type**: Text
- **Field Key**: `customerPhone`
- **Required**: ☐ No

#### Field 5: customCreationId
- **Type**: Text
- **Field Key**: `customCreationId`
- **Required**: ✓ Yes

#### Field 6: orderType
- **Type**: Text
- **Field Key**: `orderType`
- **Required**: ☐ No
- **Default**: custom_print

#### Field 7: printSize
- **Type**: Text
- **Field Key**: `printSize`
- **Required**: ☐ No

#### Field 8: printMaterial
- **Type**: Text
- **Field Key**: `printMaterial`
- **Required**: ☐ No

#### Field 9: isFramed
- **Type**: Boolean
- **Field Key**: `isFramed`
- **Required**: ☐ No
- **Default**: false

#### Field 10: quantity
- **Type**: Number
- **Field Key**: `quantity`
- **Required**: ☐ No
- **Default**: 1

#### Field 11: basePrice
- **Type**: Number
- **Field Key**: `basePrice`
- **Required**: ☐ No

#### Field 12: shippingCost
- **Type**: Number
- **Field Key**: `shippingCost`
- **Required**: ☐ No

#### Field 13: totalPrice
- **Type**: Number
- **Field Key**: `totalPrice`
- **Required**: ☐ No

#### Field 14: status
- **Type**: Text
- **Field Key**: `status`
- **Required**: ☐ No
- **Default**: pending

#### Field 15: printifyProductUrl
- **Type**: Text
- **Field Key**: `printifyProductUrl`
- **Required**: ☐ No

#### Field 16: printifyOrderId
- **Type**: Text
- **Field Key**: `printifyOrderId`
- **Required**: ☐ No

#### Field 17: trackingNumber
- **Type**: Text
- **Field Key**: `trackingNumber`
- **Required**: ☐ No

#### Field 18: notificationSent
- **Type**: Boolean
- **Field Key**: `notificationSent`
- **Required**: ☐ No
- **Default**: false

#### Field 19: purchaseLinkSent
- **Type**: Boolean
- **Field Key**: `purchaseLinkSent`
- **Required**: ☐ No
- **Default**: false

#### Field 20: purchaseLink
- **Type**: Text
- **Field Key**: `purchaseLink`
- **Required**: ☐ No

#### Field 21: internalNotes
- **Type**: Rich Text
- **Field Key**: `internalNotes`
- **Required**: ☐ No

#### Field 22: customerNotes
- **Type**: Rich Text
- **Field Key**: `customerNotes`
- **Required**: ☐ No

### Step 3.3: Create Indexes

**Index 1: userId_idx**
- Fields: `userId`

**Index 2: status_idx**
- Fields: `status`

**Index 3: customCreationId_idx**
- Fields: `customCreationId`

**Index 4: createdDate_idx**
- Fields: `_createdDate`

### Step 3.4: Set Permissions

1. Set **Who can read content**: **Site members (owner)**
2. Set **Who can create content**: **Admin**
3. Set **Who can update content**: **Admin**
4. Set **Who can delete content**: **Admin**

---

## Collection 4: PortalSessions

### Step 4.1: Create Collection

1. Click **Add Collection**
2. Name: `PortalSessions`
3. Click **Create**

### Step 4.2: Add Fields

#### Field 1: sessionId
- **Type**: Text
- **Field Key**: `sessionId`
- **Required**: ✓ Yes

#### Field 2: hasSeenPortal
- **Type**: Boolean
- **Field Key**: `hasSeenPortal`
- **Required**: ☐ No
- **Default**: false

#### Field 3: firstVisit
- **Type**: Date & Time
- **Field Key**: `firstVisit`
- **Required**: ☐ No

#### Field 4: lastVisit
- **Type**: Date & Time
- **Field Key**: `lastVisit`
- **Required**: ☐ No

#### Field 5: visitCount
- **Type**: Number
- **Field Key**: `visitCount`
- **Required**: ☐ No
- **Default**: 0

#### Field 6: pagesVisited
- **Type**: Array
- **Array Type**: Text
- **Field Key**: `pagesVisited`
- **Required**: ☐ No

#### Field 7: aiGenerationsCount
- **Type**: Number
- **Field Key**: `aiGenerationsCount`
- **Required**: ☐ No
- **Default**: 0

### Step 4.3: Create Indexes

**Index 1: sessionId_idx**
- Fields: `sessionId`

**Index 2: lastVisit_idx**
- Fields: `lastVisit`

### Step 4.4: Set Permissions

1. Set **Who can read content**: **Anyone**
2. Set **Who can create content**: **Anyone**
3. Set **Who can update content**: **Anyone**
4. Set **Who can delete content**: **Admin**

---

## Setting Permissions

### Global Permissions

1. Go to **Settings** in Wix Editor
2. Click **Permissions**
3. Review collection permissions match the setup above

---

## Verification

### Test Script

Add this to a page's code section to verify all collections:

```javascript
import wixData from 'wix-data';

$w.onReady(async function () {
    console.log('Testing database collections...');

    try {
        // Test Portfolio
        const portfolio = await wixData.query('Portfolio').limit(1).find();
        console.log('✓ Portfolio:', portfolio.totalCount, 'items');

        // Test CustomCreations
        const creations = await wixData.query('CustomCreations').limit(1).find();
        console.log('✓ CustomCreations:', creations.totalCount, 'items');

        // Test Orders
        const orders = await wixData.query('Orders').limit(1).find();
        console.log('✓ Orders:', orders.totalCount, 'items');

        // Test PortalSessions
        const sessions = await wixData.query('PortalSessions').limit(1).find();
        console.log('✓ PortalSessions:', sessions.totalCount, 'items');

        console.log('✅ All collections verified successfully!');
    } catch (error) {
        console.error('❌ Verification failed:', error);
    }
});
```

---

## Adding Sample Data

### Sample Portfolio Item

Add via CMS interface:

1. Go to **CMS** > **Portfolio**
2. Click **+ Add Item**
3. Fill in:
   - **Title**: "Cosmic Dreams"
   - **Description**: "A journey through the cosmos"
   - **Image**: Upload an image
   - **Category**: "Cosmic"
   - **Tags**: "psychedelic", "space"
   - **Status**: "published"
   - **isPrintAvailable**: true
   - **sortOrder**: 1
4. Click **Save**

### Sample via Code

```javascript
import wixData from 'wix-data';

export async function addSamplePainting() {
    const painting = {
        title: "Cosmic Dreams",
        description: "<p>A journey through the cosmos</p>",
        image: "wix:image://v1/abc123.jpg",
        category: "Cosmic",
        tags: ["psychedelic", "space", "vibrant"],
        status: "published",
        isPrintAvailable: true,
        isOriginalAvailable: false,
        sortOrder: 1,
        styleKeywords: ["surreal", "cosmic", "vibrant"]
    };

    const result = await wixData.insert('Portfolio', painting);
    console.log('Sample painting added:', result._id);
    return result;
}
```

---

## Troubleshooting

### Issue: Field type not available

**Solution**: Some Wix plans may have limited field types. Use Text instead of Rich Text if needed.

### Issue: Can't create indexes

**Solution**: Ensure fields exist first. Indexes can only be created on existing fields.

### Issue: Permission errors when testing

**Solution**: Make sure you're logged in as site owner when testing owner-only permissions.

---

## Next Steps

After completing setup:

1. ✓ Verify all collections exist
2. ✓ Test with sample data
3. ✓ Configure backend web modules
4. ✓ Set up scheduled cleanup jobs
5. ✓ Begin frontend integration

---

**Completion Checklist**:

- [ ] Portfolio collection created with all fields
- [ ] CustomCreations collection created with all fields
- [ ] Orders collection created with all fields
- [ ] PortalSessions collection created with all fields
- [ ] All indexes created
- [ ] All permissions configured
- [ ] Test script runs successfully
- [ ] Sample data added
- [ ] Documentation reviewed

---

**Estimated Total Time**: 30-45 minutes

**Questions?** Refer to `/src/backend/DATABASE_SCHEMA.md` for detailed documentation.
