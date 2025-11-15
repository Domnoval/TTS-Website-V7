# TTS Website V7 - Automation Scripts

This directory contains all automation scripts for deployment, testing, and environment management.

## 📁 Scripts Overview

| Script | Purpose | Usage |
|--------|---------|-------|
| `quickstart.sh` | One-command setup & launch | `./scripts/quickstart.sh` or `npm start` |
| `setup-env.sh` | Environment setup | `./scripts/setup-env.sh` or `npm run setup` |
| `deploy.sh` | Master deployment script | `./scripts/deploy.sh [env]` or `npm run deploy` |
| `test.sh` | Test automation | `./scripts/test.sh [type]` or `npm test` |
| `setup-database.js` | Database setup | `node scripts/setup-database.js` or `npm run db:setup` |

## 🚀 Quick Commands

### First Time Setup
```bash
npm start
# or
./scripts/quickstart.sh
```

### Environment Setup
```bash
npm run setup
# or
./scripts/setup-env.sh
```

### Deployment
```bash
# Development
npm run deploy:dev
./scripts/deploy.sh dev

# Staging
npm run deploy:staging
./scripts/deploy.sh staging

# Production
npm run deploy:prod
./scripts/deploy.sh production
```

### Testing
```bash
# All tests
npm test
./scripts/test.sh all

# Specific tests
npm run test:schema      # Schema validation
npm run test:lint        # ESLint
npm run test:structure   # File structure
npm run test:docs        # Documentation
npm run test:css         # CSS validation
```

### Database
```bash
# Setup database
npm run db:setup
node scripts/setup-database.js

# Validate schemas only
npm run db:validate
node scripts/setup-database.js --dry-run
```

## 📋 Script Details

### quickstart.sh
**Purpose**: Complete first-time setup and launch

**What it does**:
- Runs environment setup
- Creates .env file
- Validates project
- Guides through configuration
- Launches dev server

**Requirements**:
- Node.js 14+
- npm 6+

**Exit codes**:
- `0` - Success
- `1` - Error

---

### setup-env.sh
**Purpose**: Set up development environment

**What it does**:
- Checks Node.js installation
- Installs Wix CLI
- Installs dependencies
- Creates .env template
- Verifies Wix login
- Validates project structure
- Sets permissions

**Requirements**:
- Internet connection
- npm access

**Exit codes**:
- `0` - Success
- `1` - Error

---

### deploy.sh
**Purpose**: Deploy to Wix environments

**Usage**: `./scripts/deploy.sh [environment]`

**Environments**:
- `dev` - Local development (default)
- `staging` - Wix preview
- `production` - Live site

**What it does**:
- Pre-flight checks
- Install dependencies
- Validate schemas
- Setup database
- Configure secrets
- Deploy code
- Run tests (staging/prod)
- Verify deployment
- Print summary

**Requirements**:
- Wix CLI installed
- Logged in to Wix
- Connected to Wix site

**Exit codes**:
- `0` - Success
- `1` - Error

---

### test.sh
**Purpose**: Run automated tests

**Usage**: `./scripts/test.sh [type]`

**Types**:
- `all` - All tests (default)
- `schema` - Database schemas
- `lint` - ESLint
- `structure` - File structure
- `docs` - Documentation
- `css` - CSS validation

**What it does**:
- Validates schemas
- Runs ESLint
- Checks file structure
- Verifies documentation
- Validates CSS
- Checks git status
- Generates summary

**Requirements**:
- jq (for JSON validation)
- ESLint configured

**Exit codes**:
- `0` - All tests passed
- `1` - One or more tests failed

---

### setup-database.js
**Purpose**: Automate database setup

**Usage**: `node scripts/setup-database.js [--dry-run]`

**Flags**:
- `--dry-run` or `--validate` - Validate schemas only

**What it does**:
- Loads schema definitions
- Validates JSON syntax
- Checks for existing collections
- Provides setup instructions
- Verifies collections
- Seeds sample data (optional)

**Requirements**:
- Node.js 14+
- Schema files in `src/backend/schemas/`

**Exit codes**:
- `0` - Success
- `1` - Error

---

## 🔧 Permissions

All scripts need execute permissions:

```bash
chmod +x scripts/*.sh
```

This is done automatically by `setup-env.sh`.

---

## 🐛 Troubleshooting

### "Permission denied"
```bash
chmod +x scripts/*.sh
```

### "Wix CLI not found"
```bash
npm install -g @wix/cli
```

### "Not logged in to Wix"
```bash
wix login
```

### "Scripts don't work"
```bash
# Run environment setup first
./scripts/setup-env.sh
```

---

## 📚 Documentation

For detailed documentation, see:
- [AUTOMATION_GUIDE.md](../AUTOMATION_GUIDE.md) - Complete automation guide
- [DEVELOPMENT_GUIDE.md](../DEVELOPMENT_GUIDE.md) - Development guide
- [README.md](../README.md) - Project overview

---

## 🤖 NPM Scripts

All scripts are accessible via npm:

```json
{
  "start": "bash scripts/quickstart.sh",
  "setup": "bash scripts/setup-env.sh",
  "deploy": "bash scripts/deploy.sh",
  "deploy:dev": "bash scripts/deploy.sh dev",
  "deploy:staging": "bash scripts/deploy.sh staging",
  "deploy:prod": "bash scripts/deploy.sh production",
  "test": "bash scripts/test.sh all",
  "test:schema": "bash scripts/test.sh schema",
  "test:lint": "bash scripts/test.sh lint",
  "test:structure": "bash scripts/test.sh structure",
  "test:docs": "bash scripts/test.sh docs",
  "test:css": "bash scripts/test.sh css",
  "db:setup": "node scripts/setup-database.js",
  "db:validate": "node scripts/setup-database.js --dry-run"
}
```

---

## ✨ Tips

1. **Always run tests before deploying**
   ```bash
   npm test
   ```

2. **Use development mode for local testing**
   ```bash
   npm run deploy:dev
   ```

3. **Validate schemas before database setup**
   ```bash
   npm run db:validate
   ```

4. **Clean install dependencies if issues arise**
   ```bash
   npm run clean
   ```

---

**Last Updated**: 2025-11-15
**Maintainer**: TTS Team

🌀 **Automate everything. Focus on what matters.** ✨
