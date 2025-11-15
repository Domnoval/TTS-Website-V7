# Database Quick Reference - TTS Website V7

## Collections at a Glance

### Portfolio
**Purpose**: Original paintings for gallery
**Fields**: 17 | **Indexes**: 4
**Key Fields**: title*, image*, category, tags, status, styleKeywords
**Access**: Public read, Admin write

### CustomCreations
**Purpose**: AI-generated user artwork
**Fields**: 16 | **Indexes**: 4
**Key Fields**: userId*, originalPaintingIds*, userPrompt*, status, expiresAt
**Access**: Owner read/write, Admin full

### Orders
**Purpose**: Print orders (Printify workflow)
**Fields**: 22 | **Indexes**: 4
**Key Fields**: userId*, customerEmail*, customCreationId*, status, printifyOrderId
**Access**: Owner read, Admin write

### PortalSessions
**Purpose**: Session tracking
**Fields**: 7 | **Indexes**: 2
**Key Fields**: sessionId*, hasSeenPortal, visitCount
**Access**: Public read/write, Admin delete

*Required fields

---

## File Locations

```
src/backend/
├── schemas/
│   ├── Portfolio.json
│   ├── CustomCreations.json
│   ├── Orders.json
│   ├── PortalSessions.json
│   ├── index.json
│   └── README.md
├── permissions.json
├── DATABASE_SCHEMA.md
├── SETUP_GUIDE.md
└── ai-api.jsw
```

---

## Quick Setup

1. **Open Wix Editor** → CMS
2. **Add Collection** for each schema
3. **Add Fields** from schema files
4. **Create Indexes** as specified
5. **Set Permissions** per schema
6. **Verify** with test script

**Time**: 30-45 minutes

---

## Common Queries

### Get Published Paintings
```javascript
wixData.query('Portfolio')
  .eq('status', 'published')
  .ascending('sortOrder')
  .find()
```

### Get User Creations
```javascript
wixData.query('CustomCreations')
  .eq('userId', currentUserId)
  .descending('_createdDate')
  .find()
```

### Get Pending Orders
```javascript
wixData.query('Orders')
  .eq('status', 'pending')
  .find()
```

---

## Status Values

**Portfolio**: draft, published, archived
**CustomCreations**: generated, selected, order_pending, ordered
**Orders**: pending, printify_created, shipped, delivered

---

## Data Flow

```
Portfolio → CustomCreations → Orders
   ↓             ↓
  User        Session
 Browses    Generates AI
```

---

## Permissions Matrix

| Collection | Anonymous | Member | Admin |
|------------|-----------|--------|-------|
| Portfolio | Read | Read | Full |
| CustomCreations | - | Owner | Full |
| Orders | - | Read Own | Full |
| PortalSessions | R/W | R/W | Full |

---

## Maintenance

**Weekly**: Process orders, review creations
**Monthly**: Clean expired items, backup data

---

## Documentation

- **Full Details**: `/src/backend/DATABASE_SCHEMA.md`
- **Setup Guide**: `/src/backend/SETUP_GUIDE.md`
- **Schema Files**: `/src/backend/schemas/`
- **Architecture**: `/ARCHITECTURE.md`

---

**Version**: 1.0.0 | **Updated**: 2025-11-15
