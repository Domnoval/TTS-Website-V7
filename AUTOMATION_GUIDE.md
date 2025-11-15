# TTS Website V7 - Automation Guide

Complete guide to all automation scripts, workflows, and deployment processes for TTS Website V7.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Automation Scripts](#automation-scripts)
3. [CI/CD Pipeline](#cicd-pipeline)
4. [Deployment Workflows](#deployment-workflows)
5. [Testing Automation](#testing-automation)
6. [Database Automation](#database-automation)
7. [Environment Management](#environment-management)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### One-Command Setup

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Run quick start (recommended for first time)
./scripts/quickstart.sh
```

This will:
- ✅ Set up your environment
- ✅ Install dependencies
- ✅ Validate project structure
- ✅ Guide you through configuration
- ✅ Launch development server

---

## 🤖 Automation Scripts

All automation scripts are located in the `/scripts` directory.

### 1. Quick Start Script

**File**: `scripts/quickstart.sh`

**Purpose**: One-command setup and launch for local development

**Usage**:
```bash
./scripts/quickstart.sh
```

**What it does**:
- Runs environment setup
- Creates `.env` file if missing
- Validates project structure
- Provides step-by-step instructions
- Launches Wix dev server

---

### 2. Environment Setup Script

**File**: `scripts/setup-env.sh`

**Purpose**: Automated environment setup with all prerequisites

**Usage**:
```bash
./scripts/setup-env.sh
```

**What it does**:
- ✅ Checks Node.js installation (14+)
- ✅ Checks npm installation
- ✅ Installs Wix CLI globally
- ✅ Installs project dependencies
- ✅ Creates `.env` template
- ✅ Verifies Wix login status
- ✅ Checks project structure
- ✅ Sets script permissions
- ✅ Validates git configuration

**Output**: Colored terminal output with success/warning/error messages

**Exit codes**:
- `0` - Success
- `1` - Error occurred

---

### 3. Database Setup Script

**File**: `scripts/setup-database.js`

**Purpose**: Automated database collection creation and validation

**Usage**:
```bash
# Validate schemas only (dry run)
node scripts/setup-database.js --dry-run

# Create collections (requires Wix runtime)
node scripts/setup-database.js
```

**What it does**:
- 📂 Loads schema definitions from `src/backend/schemas/`
- ✅ Validates JSON syntax
- 🗄️ Creates collections (provides instructions for manual setup)
- 📑 Creates indexes
- ✓ Verifies collection accessibility
- 🌱 Seeds sample data (optional)

**Schemas processed**:
- `Portfolio.json` - Paintings catalog
- `CustomCreations.json` - AI-generated artwork
- `Orders.json` - Print orders
- `PortalSessions.json` - Session tracking

**Note**: Wix doesn't provide programmatic collection creation via API, so this script validates schemas and provides manual setup instructions.

---

### 4. Master Deployment Script

**File**: `scripts/deploy.sh`

**Purpose**: Complete deployment automation for all environments

**Usage**:
```bash
# Development
./scripts/deploy.sh dev

# Staging
./scripts/deploy.sh staging

# Production
./scripts/deploy.sh production
```

**What it does**:

#### Pre-flight Checks:
- ✅ Wix CLI installed
- ✅ Logged in to Wix
- ✅ Node.js installed (14+)
- ✅ In correct directory
- ✅ Environment validated

#### Deployment Steps:
1. **Install Dependencies** - `npm ci` or `npm install`
2. **Validate Schemas** - JSON syntax and required fields
3. **Setup Database** - Run database setup script
4. **Configure Secrets** - Guide for Wix Secrets Manager
5. **Deploy Code** - Deploy to specified environment
6. **Run Tests** - Execute test suite (staging/production only)
7. **Verify Deployment** - Check deployed components
8. **Print Summary** - Show deployment results

#### Environment Behavior:

**Development (`dev`)**:
- Starts local dev server
- Opens browser automatically
- Hot reload enabled
- No tests required

**Staging (`staging`)**:
- Deploys to Wix preview
- Runs test suite
- Verifies deployment

**Production (`production`)**:
- Requires confirmation
- Publishes to live site
- Runs full test suite
- Creates deployment summary

---

### 5. Test Automation Script

**File**: `scripts/test.sh`

**Purpose**: Automated testing suite for validation and quality assurance

**Usage**:
```bash
# Run all tests
./scripts/test.sh all

# Run specific test type
./scripts/test.sh schema
./scripts/test.sh lint
./scripts/test.sh structure
./scripts/test.sh docs
./scripts/test.sh css
```

**Test Types**:

#### Schema Validation:
- ✅ JSON syntax validation
- ✅ Required field verification
- ✅ Field count validation
- ✅ Collection name checks

#### Code Linting:
- ✅ ESLint validation
- ✅ Code style compliance
- ✅ Error detection

#### Structure Testing:
- ✅ Required files present
- ✅ Directory structure valid
- ✅ No missing components

#### Documentation Testing:
- ✅ All docs exist
- ✅ No empty files
- ✅ Complete documentation

#### CSS Validation:
- ✅ Balanced braces
- ✅ No syntax errors
- ✅ File accessibility

#### Git Status:
- ✅ No uncommitted changes (warning only)
- ✅ Current branch info

**Output**: Test pass/fail counts with colored terminal output

**Exit codes**:
- `0` - All tests passed
- `1` - One or more tests failed

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

**File**: `.github/workflows/deploy.yml`

**Trigger Events**:
- Push to `main` branch
- Push to `claude/**` branches
- Pull requests to `main`
- Manual workflow dispatch

### Jobs

#### 1. Test & Validate
**Runs on**: All triggers

**Steps**:
- Checkout code
- Setup Node.js 18.x
- Install dependencies
- Validate database schemas
- Lint code with ESLint
- Run test suite
- Generate test summary

#### 2. Deploy to Staging
**Runs on**: Push to `main` or `claude/**` branches

**Steps**:
- Checkout code
- Setup Node.js
- Install dependencies
- Install Wix CLI
- Deploy to Wix preview
- Generate deployment summary

**Environment**: `staging`

#### 3. Deploy to Production
**Runs on**: Manual workflow dispatch with `production` input

**Steps**:
- Checkout code
- Setup Node.js
- Install dependencies
- Install Wix CLI
- Deploy to Wix production
- Create GitHub release
- Generate deployment summary

**Environment**: `production`

#### 4. Code Quality
**Runs on**: All triggers

**Steps**:
- Check for large files
- Verify documentation exists
- Security check (no hardcoded secrets)
- Generate code statistics

### Required Secrets

Configure these in GitHub Settings → Secrets:

- `WIX_API_KEY` - Your Wix API key
- `WIX_SITE_ID` - Your Wix site ID

---

## 📦 Deployment Workflows

### Local Development Workflow

```bash
# 1. Initial setup
./scripts/quickstart.sh

# 2. Start dev server
wix dev

# 3. Make changes (hot reload active)

# 4. Run tests before commit
./scripts/test.sh all

# 5. Commit and push
git add .
git commit -m "feat: description"
git push
```

### Staging Deployment Workflow

```bash
# 1. Run tests locally
./scripts/test.sh all

# 2. Deploy to staging
./scripts/deploy.sh staging

# 3. Verify in preview
# Check Wix preview site

# 4. Merge to main if good
git checkout main
git merge feature-branch
git push
```

### Production Deployment Workflow

```bash
# Option 1: Script
./scripts/deploy.sh production

# Option 2: GitHub Actions
# Go to Actions → Deploy to Wix → Run workflow
# Select environment: production

# Option 3: Wix CLI
wix publish
```

---

## 🧪 Testing Automation

### Manual Testing

```bash
# Run all tests
./scripts/test.sh all

# Run specific tests
./scripts/test.sh schema    # Database schemas only
./scripts/test.sh lint      # Code linting only
./scripts/test.sh structure # File structure only
./scripts/test.sh docs      # Documentation only
./scripts/test.sh css       # CSS validation only
```

### Automated Testing (CI/CD)

Tests run automatically on:
- ✅ Every push to `main`
- ✅ Every push to `claude/**` branches
- ✅ Every pull request
- ✅ Before staging deployment
- ✅ Before production deployment

### Test Coverage

Current tests cover:
- ✅ Database schema validation
- ✅ Code linting (ESLint)
- ✅ File structure verification
- ✅ Documentation completeness
- ✅ CSS syntax validation
- ✅ Git status

**Future enhancements**:
- Unit tests for backend functions
- Integration tests for API endpoints
- E2E tests with Playwright
- Visual regression tests

---

## 🗄️ Database Automation

### Schema-Driven Automation

All database collections are defined in JSON schema files:

```
src/backend/schemas/
├── Portfolio.json          # Paintings catalog
├── CustomCreations.json    # AI generations
├── Orders.json             # Print orders
├── PortalSessions.json     # Session tracking
├── index.json              # Schema metadata
└── README.md               # Schema documentation
```

### Schema Validation

```bash
# Validate all schemas
node scripts/setup-database.js --dry-run
```

### Collection Creation

While Wix doesn't support programmatic collection creation, the script:
1. Validates your schemas
2. Provides step-by-step instructions
3. Verifies existing collections
4. Can seed initial data

### Manual Setup with Script Guidance

```bash
# Run database setup
node scripts/setup-database.js

# Follow the on-screen instructions for each collection
# The script will verify as you create them
```

---

## 🌍 Environment Management

### Environment Files

**`.env`** - Local environment variables (gitignored)

```bash
HUGGING_FACE_API_KEY=your_key_here
AI_MOCK_MODE=true
NODE_ENV=development
```

**`.env.example`** - Template (committed to repo)

```bash
HUGGING_FACE_API_KEY=your_hugging_face_api_key_here
AI_MOCK_MODE=true
NODE_ENV=development
```

### Wix Secrets

Configure in Wix Editor → Settings → Secrets Manager:

- `HUGGING_FACE_API_KEY` - Hugging Face API token
- `AI_MOCK_MODE` - Set to "true" for development

### Environment-Specific Configuration

**Development**:
- Mock mode enabled
- Local Wix dev server
- Hot reload
- Detailed error messages

**Staging**:
- Mock mode optional
- Wix preview site
- Real data (test mode)
- Logging enabled

**Production**:
- Real API calls
- Live Wix site
- Real data
- Error tracking
- Analytics enabled

---

## 🛠️ Troubleshooting

### Common Issues

#### "Wix CLI not found"

```bash
# Install Wix CLI globally
npm install -g @wix/cli

# Verify installation
wix --version
```

#### "Not logged in to Wix"

```bash
# Login to Wix
wix login

# Verify login
wix whoami
```

#### "Collections don't exist"

```bash
# Run database setup with instructions
node scripts/setup-database.js

# Follow manual setup in Wix Editor
# See: src/backend/SETUP_GUIDE.md
```

#### "Tests failing"

```bash
# Run tests with verbose output
./scripts/test.sh all

# Fix issues and rerun
./scripts/test.sh all
```

#### "Deployment failed"

```bash
# Check pre-flight
./scripts/deploy.sh dev

# Verify Wix connection
wix whoami

# Check logs
tail -f logs/*.log
```

### Script Errors

#### Permission denied

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Run again
./scripts/quickstart.sh
```

#### Node.js version too old

```bash
# Update Node.js (using nvm)
nvm install 18
nvm use 18

# Verify
node --version
```

#### Missing dependencies

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Or use setup script
./scripts/setup-env.sh
```

---

## 📚 Additional Resources

### Documentation

- **Setup Guide**: `src/backend/SETUP_GUIDE.md`
- **Database Schema**: `src/backend/DATABASE_SCHEMA.md`
- **Portal Setup**: `PORTAL_LOADING_SCREEN_SETUP.md`
- **AI Modal Setup**: `src/lightboxes/AI_MODAL_IMPLEMENTATION_GUIDE.md`
- **Development Guide**: `DEVELOPMENT_GUIDE.md`
- **Quick Reference**: `QUICK_REFERENCE.md`

### External Links

- [Wix CLI Documentation](https://dev.wix.com/docs/develop-websites/wix-cli)
- [Wix Velo Documentation](https://www.wix.com/velo/reference)
- [Hugging Face API](https://huggingface.co/docs/api-inference)
- [GitHub Actions](https://docs.github.com/en/actions)

---

## 🎯 Best Practices

### Before Deployment

1. ✅ Run tests locally: `./scripts/test.sh all`
2. ✅ Validate schemas: `node scripts/setup-database.js --dry-run`
3. ✅ Check git status: `git status`
4. ✅ Review changes: `git diff`
5. ✅ Update documentation if needed
6. ✅ Test in development: `wix dev`

### During Development

1. ✅ Use mock mode: `AI_MOCK_MODE=true`
2. ✅ Commit frequently with clear messages
3. ✅ Test changes before pushing
4. ✅ Keep dependencies updated
5. ✅ Follow coding standards
6. ✅ Document new features

### After Deployment

1. ✅ Verify deployment in browser
2. ✅ Test critical functionality
3. ✅ Check error logs
4. ✅ Monitor analytics
5. ✅ Create release notes
6. ✅ Tag version in git

---

## 🤖 Automation Summary

| Task | Script | Automated? | Manual Steps |
|------|--------|------------|--------------|
| Environment setup | `setup-env.sh` | ✅ Fully | None |
| Dependencies | All scripts | ✅ Fully | None |
| Schema validation | `setup-database.js` | ✅ Fully | None |
| Collection creation | `setup-database.js` | ⚠️ Partial | Create in Wix Editor |
| Code deployment | `deploy.sh` | ✅ Fully | None |
| Testing | `test.sh` | ✅ Fully | None |
| CI/CD | GitHub Actions | ✅ Fully | Configure secrets |
| Secret management | Manual | ❌ Manual | Add in Wix Editor |
| Production deploy | `deploy.sh` | ✅ Fully | Confirmation required |

**Automation Level**: ~80% automated, ~20% requires manual Wix Editor steps

---

**Last Updated**: 2025-11-15
**Version**: 1.0.0
**Status**: Production Ready

🌀 **Let automation handle the boring stuff. Focus on creating amazing experiences.** ✨
