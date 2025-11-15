# Database Setup Summary - TTS Website V7

## Overview

The database collection schemas for TTS Website V7 have been successfully created and are ready for implementation in Wix.

**Date**: 2025-11-15
**Status**: ✅ Complete - Ready for Wix CMS Setup
**Collections**: 4 (Portfolio, CustomCreations, Orders, PortalSessions)

---

## What Was Created

### 1. Collection Schema Files

Located in `/src/backend/schemas/`:

- **Portfolio.json** - Original paintings collection
  - 17 fields (title, image, description, category, tags, etc.)
  - 4 indexes (status, category, sortOrder, isFeatured)
  - Public read, admin write permissions

- **CustomCreations.json** - AI-generated artwork collection
  - 16 fields (userId, prompt, generatedImages, status, etc.)
  - 4 indexes (userId, status, createdDate, expiresAt)
  - Owner read/write, admin full access

- **Orders.json** - Print orders collection
  - 22 fields (customer info, order details, Printify integration)
  - 4 indexes (userId, status, customCreationId, createdDate)
  - Owner read, admin write permissions

- **PortalSessions.json** - Session tracking collection
  - 7 fields (sessionId, hasSeenPortal, visitCount, etc.)
  - 2 indexes (sessionId, lastVisit)
  - Public read/write, admin delete

### 2. Permission Configuration

File: `/src/backend/permissions.json`

Updated with proper collection permissions:
- Web methods: All users can invoke backend functions
- Collections: Role-based access control configured
- Owner-based permissions for user content

### 3. Documentation

Created comprehensive documentation:

- **DATABASE_SCHEMA.md** - Full schema documentation
  - Collection overviews
  - Field definitions
  - Sample data
  - Usage examples
  - Maintenance procedures

- **SETUP_GUIDE.md** - Step-by-step setup instructions
  - Detailed Wix CMS setup walkthrough
  - Field-by-field creation guide
  - Index creation steps
  - Verification procedures

- **schemas/README.md** - Schema directory guide
  - Schema file format explanation
  - Validation scripts
  - Migration procedures

- **schemas/index.json** - Schema metadata
  - Collection summary
  - Relationships diagram
  - Implementation status

---

## Database Architecture

```
TTS Website V7 - Database Collections
┌─────────────────────────────────────────────────┐
│                                                  │
│  Portfolio (Paintings)                          │
│  - 17 fields, 4 indexes                         │
│  - Public read, Admin write                     │
│  └── Referenced by CustomCreations              │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  CustomCreations (AI Generated)                 │
│  - 16 fields, 4 indexes                         │
│  - Owner read/write, Admin full access          │
│  └── Links to Portfolio & Orders                │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  Orders (Print Orders)                          │
│  - 22 fields, 4 indexes                         │
│  - Owner read, Admin write                      │
│  └── Links to CustomCreations                   │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  PortalSessions (Session Tracking)              │
│  - 7 fields, 2 indexes                          │
│  - Public read/write, Admin delete              │
│  └── Independent session tracking               │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

## File Structure

```
/home/user/TTS-Website-V7/
│
├── src/backend/
│   ├── schemas/
│   │   ├── Portfolio.json              # Portfolio collection schema
│   │   ├── CustomCreations.json        # CustomCreations collection schema
│   │   ├── Orders.json                 # Orders collection schema
│   │   ├── PortalSessions.json         # PortalSessions collection schema
│   │   ├── index.json                  # Schema metadata & summary
│   │   └── README.md                   # Schema directory guide
│   │
│   ├── permissions.json                # Updated with collection permissions
│   ├── DATABASE_SCHEMA.md              # Complete schema documentation
│   ├── SETUP_GUIDE.md                  # Step-by-step setup walkthrough
│   └── README.md                       # Backend implementation guide
│
└── DATABASE_SETUP_SUMMARY.md           # This file
```

---

## Key Features

### Portfolio Collection
- Store original paintings with rich metadata
- AI-ready with style keywords and dominant colors
- Category and tag filtering
- Featured items support
- Sort ordering for gallery display

### CustomCreations Collection
- Track AI-generated artwork
- Link to source paintings
- Store multiple image variations
- User ownership model
- Auto-expiration after 30 days (if not ordered)

### Orders Collection
- Semi-manual Printify workflow
- Comprehensive order tracking
- Customer and admin notes
- Status progression tracking
- Print specifications and pricing

### PortalSessions Collection
- Track portal animation views
- Session-based persistence
- Page visit tracking
- AI generation usage analytics

---

## Permissions Summary

### Portfolio
- **Public**: Read only
- **Members**: Read only
- **Admin**: Full access

### CustomCreations
- **Public**: No access
- **Members**: Read/write own items only
- **Admin**: Full access to all items

### Orders
- **Public**: No access
- **Members**: Read own orders only
- **Admin**: Full access

### PortalSessions
- **Public**: Read/write (session-based)
- **Members**: Read/write (session-based)
- **Admin**: Full access including delete

---

## Next Steps

### 1. Create Collections in Wix (30-45 minutes)

Follow the step-by-step guide in `/src/backend/SETUP_GUIDE.md`:

1. Open Wix Editor → CMS
2. Create each collection
3. Add fields as specified
4. Create indexes
5. Set permissions
6. Verify with test script

### 2. Add Sample Data

- Add 2-3 sample paintings to Portfolio
- Test AI generation flow
- Create sample order

### 3. Verify Setup

Run verification script from SETUP_GUIDE.md to confirm:
- All collections exist
- Fields are correct
- Indexes are created
- Permissions are set

### 4. Backend Integration

- Connect backend web modules (ai-api.jsw, etc.)
- Test database queries
- Implement data validation

### 5. Frontend Integration

- Build gallery page
- Create AI manipulation modal
- Implement order flow

---

## Database Statistics

| Collection | Fields | Indexes | Required Fields | Auto-Expiring |
|------------|--------|---------|-----------------|---------------|
| Portfolio | 17 | 4 | 2 (title, image) | No |
| CustomCreations | 16 | 4 | 3 (userId, originalPaintingIds, userPrompt) | Yes (30 days) |
| Orders | 22 | 4 | 3 (userId, customerEmail, customCreationId) | No |
| PortalSessions | 7 | 2 | 1 (sessionId) | Recommended |

**Total Fields**: 62
**Total Indexes**: 14
**Total Collections**: 4

---

## Best Practices

### Data Validation

All schemas include:
- Required field validation
- Type checking
- Default values where appropriate
- Proper indexing for performance

### Security

- Role-based permissions
- Owner-only access for user content
- Admin-only write access for sensitive data
- Session-based tracking for anonymous users

### Performance

- Strategic indexing on frequently queried fields
- Pagination support
- Lazy loading ready
- Efficient relationship queries

### Maintenance

- Auto-expiration for unused creations
- Cleanup jobs for old sessions
- Archive strategy for old orders
- Regular backup procedures

---

## Sample Queries

### Get Published Paintings

```javascript
const paintings = await wixData.query('Portfolio')
    .eq('status', 'published')
    .ascending('sortOrder')
    .find();
```

### Get User's Creations

```javascript
const creations = await wixData.query('CustomCreations')
    .eq('userId', currentUserId)
    .descending('_createdDate')
    .find();
```

### Get Pending Orders

```javascript
const orders = await wixData.query('Orders')
    .eq('status', 'pending')
    .ascending('_createdDate')
    .find();
```

### Check Portal Session

```javascript
const session = await wixData.query('PortalSessions')
    .eq('sessionId', sessionId)
    .find();
```

---

## Maintenance Schedule

### Daily
- No daily tasks required

### Weekly
- Review new AI creations
- Process pending orders
- Check for expired sessions

### Monthly
- Clean up expired creations (30+ days old)
- Archive old orders (6+ months)
- Review usage analytics
- Backup database

---

## Documentation Reference

| Document | Purpose | Location |
|----------|---------|----------|
| DATABASE_SCHEMA.md | Complete schema reference | `/src/backend/` |
| SETUP_GUIDE.md | Step-by-step setup instructions | `/src/backend/` |
| schemas/README.md | Schema file documentation | `/src/backend/schemas/` |
| permissions.json | Permission configuration | `/src/backend/` |
| ARCHITECTURE.md | System architecture | `/` |
| BACKEND_IMPLEMENTATION.md | Backend guide | `/` |

---

## Testing Checklist

Before going live, verify:

- [ ] All 4 collections created in Wix CMS
- [ ] All fields added with correct types
- [ ] All indexes created
- [ ] Permissions configured correctly
- [ ] Test script runs successfully
- [ ] Sample data added to Portfolio
- [ ] Can create CustomCreation records
- [ ] Can create Order records
- [ ] Portal session tracking works
- [ ] Owner-based permissions work correctly
- [ ] Backend web modules can query collections
- [ ] Frontend can display Portfolio items

---

## Support & Resources

### Internal Documentation
- All schema files in `/src/backend/schemas/`
- Complete setup guide in `/src/backend/SETUP_GUIDE.md`
- Full documentation in `/src/backend/DATABASE_SCHEMA.md`

### Wix Documentation
- [Wix Data Introduction](https://www.wix.com/velo/reference/wix-data)
- [Content Collections](https://support.wix.com/en/article/velo-working-with-data-in-code)
- [Permissions](https://support.wix.com/en/article/velo-about-collection-permissions)

### Architecture
- System architecture: `/ARCHITECTURE.md`
- Backend implementation: `/BACKEND_IMPLEMENTATION.md`

---

## Success Criteria

Database setup is complete when:

✅ All 4 collections created in Wix CMS
✅ All 62 fields configured correctly
✅ All 14 indexes created
✅ Permissions set per specifications
✅ Test queries run successfully
✅ Sample data can be added
✅ Backend modules can access collections
✅ Frontend can display data

---

## Notes

### Wix Limitations
- Some field types may vary by plan
- Index limits may apply
- Query performance depends on plan tier

### Recommendations
- Start with free tier, upgrade as needed
- Use mock mode for AI during development
- Implement caching for frequently accessed data
- Monitor API usage and costs

### Future Enhancements
- Add full-text search
- Implement advanced filtering
- Add user favorites/collections
- Create analytics dashboard
- Implement recommendation engine

---

**Status**: ✅ COMPLETE - Ready for Wix CMS Implementation

**Created**: 2025-11-15
**Last Updated**: 2025-11-15
**Version**: 1.0.0

---

Made with cosmic intention for TTS Website V7.
