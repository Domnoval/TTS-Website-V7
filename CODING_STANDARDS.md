# TTS Website V7 - Coding Standards & Best Practices

**All developers and agents MUST follow these standards.**

---

## 📜 Table of Contents
1. [Code Style](#code-style)
2. [Error Handling](#error-handling)
3. [Naming Conventions](#naming-conventions)
4. [File Structure](#file-structure)
5. [Documentation](#documentation)
6. [Testing](#testing)
7. [Security](#security)
8. [Performance](#performance)
9. [Git Workflow](#git-workflow)
10. [Wix-Specific Guidelines](#wix-specific-guidelines)

---

## 1. Code Style

### JavaScript/Velo Standards

#### General Rules
- **Indentation**: 4 spaces (no tabs)
- **Line Length**: Max 120 characters
- **Semicolons**: Always use semicolons
- **Quotes**: Single quotes for strings (except JSON)
- **Trailing Commas**: Use in multi-line objects/arrays
- **Arrow Functions**: Prefer arrow functions for callbacks

```javascript
// ✅ GOOD
const fetchData = async () => {
    const result = await wixData.query('Collection')
        .limit(100)
        .find();
    return result.items;
};

// ❌ BAD
const fetchData = async function() {
  const result = await wixData.query("Collection").limit(100).find()
  return result.items
}
```

#### Formatting

```javascript
// ✅ GOOD - Clean, readable spacing
function processOrder(orderId, userId, options = {}) {
    const {
        priority = 'normal',
        notify = true,
    } = options;

    if (!orderId || !userId) {
        throw new Error('Missing required parameters');
    }

    return {
        orderId,
        userId,
        priority,
        notify,
    };
}

// ❌ BAD - Cramped, hard to read
function processOrder(orderId,userId,options={}){
const {priority='normal',notify=true}=options;
if(!orderId||!userId){throw new Error('Missing required parameters');}
return {orderId,userId,priority,notify};}
```

### ESLint Configuration
All code must pass ESLint with the Wix plugin:

```json
{
  "extends": "@wix/eslint-plugin-cli",
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "prefer-const": "error",
    "no-var": "error",
    "eqeqeq": ["error", "always"],
    "curly": ["error", "all"],
    "brace-style": ["error", "1tbs"]
  }
}
```

---

## 2. Error Handling

### Always Use Try-Catch for Async Operations

```javascript
// ✅ GOOD - Comprehensive error handling
async function loadPaintings() {
    try {
        console.log('Loading paintings...');

        const result = await wixData.query('Portfolio')
            .limit(100)
            .find();

        if (!result || !result.items) {
            throw new Error('Invalid response from database');
        }

        console.log(`✅ Loaded ${result.items.length} paintings`);
        return result.items;

    } catch (error) {
        console.error('❌ Error loading paintings:', error);

        // Log additional context
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
        });

        // Show user-friendly message
        showNotification('Unable to load gallery. Please refresh the page.', 'error');

        // Return fallback data
        return showSamplePaintings();
    }
}

// ❌ BAD - No error handling
async function loadPaintings() {
    const result = await wixData.query('Portfolio').find();
    return result.items;
}
```

### Error Handling Hierarchy

1. **Catch & Log**: Always catch errors and log with context
2. **User Feedback**: Show user-friendly messages (never expose technical errors)
3. **Graceful Degradation**: Provide fallback behavior
4. **Report Critical Errors**: For backend, consider error tracking service

### Standard Error Response Format

```javascript
// For backend web modules
export function standardErrorResponse(error, context = {}) {
    return {
        success: false,
        error: {
            message: error.message || 'An error occurred',
            code: error.code || 'UNKNOWN_ERROR',
            timestamp: new Date().toISOString(),
            context,
        },
    };
}

// Usage
try {
    // ... operation
} catch (error) {
    return standardErrorResponse(error, { operation: 'generateAIImage', userId });
}
```

---

## 3. Naming Conventions

### Variables & Functions

```javascript
// ✅ GOOD
const userPaintings = [];
const selectedPaintingIds = new Set();
let isLoadingGallery = false;

function loadUserPaintings(userId) { }
function handlePaintingSelection(paintingId) { }
async function generateAIImage(prompt, imageUrl) { }

// ❌ BAD
const arr = [];
const ids = new Set();
let loading = false;

function load(id) { }
function handle(id) { }
async function gen(p, i) { }
```

### Naming Rules

| Type | Convention | Example |
|------|-----------|---------|
| Variables | camelCase | `selectedPaintings` |
| Functions | camelCase (verb-first) | `loadPaintings()` |
| Constants | UPPER_SNAKE_CASE | `MAX_SELECTIONS` |
| Classes | PascalCase | `PaintingGallery` |
| Files (pages) | PascalCase.js | `Gallery.js` |
| Files (backend) | kebab-case.jsw | `ai-api.jsw` |
| Database Collections | PascalCase | `Portfolio` |
| Wix Elements | camelCase with # | `#portfolioRepeater` |

### Boolean Naming

```javascript
// ✅ GOOD - Clear intent
const isLoading = false;
const hasSelection = true;
const canGenerate = false;
const shouldNotify = true;

// ❌ BAD - Ambiguous
const loading = false;
const selection = true;
const generate = false;
```

---

## 4. File Structure

### Page Files (`src/pages/*.js`)

```javascript
// TEMPLATE: Page structure

// 1. IMPORTS
import wixLocation from 'wix-location';
import wixData from 'wix-data';
import { helperFunction } from 'public/utils';

// 2. STATE (if needed)
let pageState = {
    isLoading: false,
    data: [],
};

// 3. ONREADY
$w.onReady(function () {
    console.log('📄 [PageName] Loading...');

    initializePage();
    setupEventHandlers();
    loadData();
});

// 4. INITIALIZATION
function initializePage() {
    // Setup UI, hide/show elements, etc.
}

// 5. EVENT HANDLERS
function setupEventHandlers() {
    // Bind click handlers, form submissions, etc.
}

// 6. DATA OPERATIONS
async function loadData() {
    // Load from database, API, etc.
}

// 7. UI UPDATES
function updateUI(data) {
    // Update page elements
}

// 8. UTILITY FUNCTIONS
function helperFunction() {
    // Helper logic
}

// 9. EXPORTS (if needed)
export function publicFunction() {
    // Exported functions
}
```

### Backend Files (`src/backend/*.jsw`)

```javascript
// TEMPLATE: Backend web module

import { fetch } from 'wix-fetch';
import { getSecret } from 'wix-secrets-backend';

/**
 * @description Brief description of what this function does
 * @param {string} param1 - Description of param1
 * @param {Object} param2 - Description of param2
 * @returns {Promise<Object>} Description of return value
 */
export async function functionName(param1, param2) {
    try {
        // 1. Validate input
        if (!param1) {
            throw new Error('param1 is required');
        }

        // 2. Perform operation
        const result = await performOperation(param1, param2);

        // 3. Return success response
        return {
            success: true,
            data: result,
        };

    } catch (error) {
        console.error('Error in functionName:', error);

        return {
            success: false,
            error: {
                message: error.message,
                code: 'OPERATION_FAILED',
            },
        };
    }
}
```

---

## 5. Documentation

### JSDoc Comments

**REQUIRED for all functions**

```javascript
/**
 * Load paintings from the Portfolio collection
 * @async
 * @param {Object} options - Query options
 * @param {number} [options.limit=100] - Maximum number of items to load
 * @param {string} [options.category] - Filter by category
 * @returns {Promise<Array>} Array of painting objects
 * @throws {Error} If database query fails
 * @example
 * const paintings = await loadPaintings({ limit: 50, category: 'Abstract' });
 */
async function loadPaintings(options = {}) {
    // Implementation
}
```

### Inline Comments

```javascript
// ✅ GOOD - Explain WHY, not WHAT
// Clear selections before switching modes to avoid confusion
clearAllSelections();

// Hugging Face API has rate limits, so we retry with exponential backoff
await retryWithBackoff(() => callAPI());

// ❌ BAD - States the obvious
// Set loading to true
isLoading = true;

// Call the API
const result = await callAPI();
```

### File Headers

```javascript
// TTS WEBSITE V7 - [Component Name]
// [Brief description of what this file does]
//
// Dependencies: [List any critical dependencies]
// Related: [Link to related files]
```

---

## 6. Testing

### Manual Testing Checklist

Every feature MUST be tested for:

- ✅ **Happy Path**: Normal expected usage
- ✅ **Error Cases**: What happens when things fail
- ✅ **Edge Cases**: Empty data, max limits, etc.
- ✅ **Mobile**: Responsive design
- ✅ **Performance**: Page load times

### Console Logging for Testing

```javascript
// ✅ GOOD - Structured, useful logs
console.log('🎨 Gallery initialized');
console.log('📸 Loaded paintings:', {
    count: paintings.length,
    categories: uniqueCategories,
});
console.error('❌ Failed to generate AI image:', {
    error: error.message,
    prompt: prompt,
    attemptNumber: attemptCount,
});

// ❌ BAD - Useless logs
console.log('here');
console.log('test');
console.log(data);
```

### Test Data

Always provide sample/mock data for testing:

```javascript
function showSamplePaintings() {
    console.log('📝 Loading sample data for testing...');

    const sampleData = [
        {
            _id: 'sample-1',
            title: 'Cosmic Dreams',
            image: 'https://picsum.photos/400/600?random=1',
            price: 299.99,
        },
        // ... more samples
    ];

    return sampleData;
}
```

---

## 7. Security

### Input Validation

```javascript
// ✅ GOOD - Validate all inputs
function validatePaintingData(data) {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid data format');
    }

    if (!data.title || data.title.trim().length === 0) {
        throw new Error('Title is required');
    }

    if (data.title.length > 200) {
        throw new Error('Title too long (max 200 characters)');
    }

    // Sanitize HTML
    const sanitizedTitle = data.title.replace(/<[^>]*>/g, '');

    return {
        ...data,
        title: sanitizedTitle,
    };
}

// ❌ BAD - No validation
function savePainting(data) {
    return wixData.insert('Portfolio', data);
}
```

### API Keys & Secrets

```javascript
// ✅ GOOD - Use Wix Secrets
import { getSecret } from 'wix-secrets-backend';

async function callHuggingFaceAPI() {
    const apiKey = await getSecret('HUGGING_FACE_API_KEY');
    // Use apiKey
}

// ❌ BAD - Hardcoded secrets
const apiKey = 'hf_xxxxxxxxxxxx'; // NEVER DO THIS
```

### Never Trust Client Input

```javascript
// Backend: ALWAYS validate on server side
export async function saveCustomCreation(creationData) {
    // Validate user is logged in
    if (!currentUser) {
        throw new Error('Authentication required');
    }

    // Validate and sanitize data
    const validated = validateCreationData(creationData);

    // Check permissions
    if (!canUserCreateArt(currentUser)) {
        throw new Error('Permission denied');
    }

    // NOW save to database
    return wixData.insert('CustomCreations', validated);
}
```

---

## 8. Performance

### Database Queries

```javascript
// ✅ GOOD - Efficient queries
const paintings = await wixData.query('Portfolio')
    .limit(50)                           // Limit results
    .select('_id', 'title', 'image')     // Only fetch needed fields
    .eq('status', 'published')           // Filter server-side
    .descending('_createdDate')          // Sort server-side
    .find();

// ❌ BAD - Fetch everything, filter in JS
const allData = await wixData.query('Portfolio').find();
const paintings = allData.items
    .filter(p => p.status === 'published')
    .sort((a, b) => b._createdDate - a._createdDate)
    .slice(0, 50);
```

### Image Optimization

```javascript
// ✅ GOOD - Request appropriate size
const thumbnailUrl = `${painting.image}?w=400&h=600&fit=crop`;

// ❌ BAD - Load full-resolution images
const url = painting.image; // Could be 4000x6000px
```

### Lazy Loading

```javascript
// For repeaters with many items
$w('#portfolioRepeater').onItemReady(($item, itemData, index) => {
    // Only load images when visible
    if (index < 20) {
        $item('#image').src = itemData.image;
    } else {
        // Lazy load later
        $item('#image').src = 'placeholder.jpg';
    }
});
```

---

## 9. Git Workflow

### Commit Messages

Follow conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**

```
feat(gallery): add multi-select mode for painting blending

- Users can now select 2-4 paintings
- Blend button appears when multiple selected
- Max 4 paintings enforced

Closes #12

---

fix(ai-api): handle timeout errors from Hugging Face

Added retry logic with exponential backoff when API times out.
Falls back to cached results if all retries fail.

Fixes #45
```

### Branch Strategy

```
main              - Production-ready code
├── develop       - Integration branch
    ├── feature/ai-modal
    ├── feature/portal-animation
    └── fix/gallery-selection-bug
```

### Before Committing

```bash
# 1. Check status
git status

# 2. Run linter
npm run lint

# 3. Test your changes
# (manual testing checklist)

# 4. Stage changes
git add .

# 5. Commit with meaningful message
git commit -m "feat(gallery): add selection system"

# 6. Push
git push origin feature/gallery-selection
```

---

## 10. Wix-Specific Guidelines

### Element ID Conventions

```javascript
// Page elements
#portfolioRepeater
#paintingImage
#aiControlPanel
#manipulateButton

// Follow pattern: #descriptiveName (camelCase)
```

### Finding Elements Safely

```javascript
// ✅ GOOD - Handle missing elements gracefully
function findElement(context, ids) {
    for (const id of ids) {
        try {
            const element = context(id);
            if (element) {
                return element;
            }
        } catch (e) {
            continue;
        }
    }
    return null;
}

const button = findElement($w, ['#submitButton', '#submit', '#saveButton']);
if (button) {
    button.onClick(handleClick);
}

// ❌ BAD - Will crash if element doesn't exist
$w('#submitButton').onClick(handleClick);
```

### Wix Data Operations

```javascript
// ✅ GOOD - Check for null/undefined
const result = await wixData.query('Collection').find();
if (result && result.items && result.items.length > 0) {
    processItems(result.items);
} else {
    showEmptyState();
}

// ❌ BAD - Assumes data exists
const items = await wixData.query('Collection').find().items;
processItems(items);
```

### Lightbox Communication

```javascript
// Opening lightbox FROM page
wixWindow.openLightbox('AIManipulation', {
    painting: selectedPainting,
    mode: 'manipulate',
}).then((result) => {
    if (result && result.success) {
        handleSuccess(result.data);
    }
});

// IN lightbox - receiving data
$w.onReady(function () {
    const data = wixWindow.lightbox.getContext();
    console.log('Received data:', data);
});

// IN lightbox - returning data
function closeWithResult(result) {
    wixWindow.lightbox.close({
        success: true,
        data: result,
    });
}
```

---

## 🎯 QUALITY CHECKLIST

Before marking ANY task complete, verify:

- [ ] Code follows all style guidelines
- [ ] All functions have JSDoc comments
- [ ] Error handling implemented (try-catch)
- [ ] Input validation performed
- [ ] Console logs use emojis & structure
- [ ] No hardcoded values (use constants)
- [ ] No exposed secrets or API keys
- [ ] Tested happy path
- [ ] Tested error cases
- [ ] Mobile responsive (if UI)
- [ ] ESLint passes with no errors
- [ ] Git commit message follows convention
- [ ] Related documentation updated

---

## 📚 Quick Reference

### Common Patterns

```javascript
// Pattern: Async operation with loading state
async function loadData() {
    try {
        setLoadingState(true);
        const data = await fetchData();
        updateUI(data);
    } catch (error) {
        handleError(error);
    } finally {
        setLoadingState(false);
    }
}

// Pattern: Element finder with fallback
const element = findElement($w, [
    '#primaryId',
    '#secondaryId',
    '#fallbackId',
]);

// Pattern: Database query with validation
const items = await wixData.query('Collection')
    .limit(100)
    .find()
    .then(result => result?.items || [])
    .catch(error => {
        console.error('Query failed:', error);
        return [];
    });
```

---

**Last Updated**: 2025-11-14
**Version**: 1.0
**Status**: ACTIVE - All agents must follow these standards
