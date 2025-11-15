#!/bin/bash

###############################################################################
# TTS Website V7 - Environment Setup Script
#
# This script sets up your local development environment with everything
# needed to run the TTS Website V7 project.
#
# Usage:
#   ./scripts/setup-env.sh
###############################################################################

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m'

log() { echo -e "${CYAN}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }
step() { echo -e "\n${BOLD}${CYAN}━━━ $1 ━━━${NC}\n"; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

###############################################################################
# Banner
###############################################################################

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BOLD}${CYAN}  🌀 TTS Website V7 - Environment Setup${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

###############################################################################
# Check Node.js
###############################################################################

step "Checking Node.js Installation"

if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    success "Node.js is installed: $NODE_VERSION"

    # Check version (need 14+)
    NODE_MAJOR=$(node --version | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -lt 14 ]; then
        warning "Node.js version is too old (need 14+). Please upgrade."
        exit 1
    fi
else
    error "Node.js is not installed"
    log "Install from: https://nodejs.org/"
    exit 1
fi

###############################################################################
# Check npm
###############################################################################

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    success "npm is installed: $NPM_VERSION"
else
    error "npm is not installed"
    exit 1
fi

###############################################################################
# Install Wix CLI
###############################################################################

step "Checking Wix CLI"

if command -v wix &> /dev/null; then
    WIX_VERSION=$(wix --version)
    success "Wix CLI is installed: $WIX_VERSION"
else
    warning "Wix CLI not found. Installing..."
    npm install -g @wix/cli
    success "Wix CLI installed"
fi

###############################################################################
# Install Project Dependencies
###############################################################################

step "Installing Project Dependencies"

cd "$PROJECT_ROOT"

if [ -f "package-lock.json" ]; then
    log "Running npm ci..."
    npm ci
else
    log "Running npm install..."
    npm install
fi

success "Dependencies installed"

###############################################################################
# Create .env File
###############################################################################

step "Setting Up Environment Variables"

if [ -f "$PROJECT_ROOT/.env" ]; then
    warning ".env file already exists. Skipping creation."
else
    log "Creating .env file..."
    cat > "$PROJECT_ROOT/.env" << 'EOF'
# TTS Website V7 - Environment Variables
# Copy this file and fill in your actual values

# Hugging Face API (required for AI generation)
# Get your key from: https://huggingface.co/settings/tokens
HUGGING_FACE_API_KEY=your_hugging_face_api_key_here

# AI Mock Mode (set to 'true' for development without API calls)
AI_MOCK_MODE=true

# Printify API (optional, for print-on-demand integration)
PRINTIFY_API_KEY=your_printify_api_key_here

# Environment
NODE_ENV=development

# Wix (these are usually auto-configured by Wix CLI)
# WIX_SITE_ID=
# WIX_API_KEY=
EOF
    success ".env file created"
    warning "Don't forget to add your API keys to .env"
fi

###############################################################################
# Login to Wix
###############################################################################

step "Checking Wix Login Status"

if wix whoami &> /dev/null; then
    WIX_USER=$(wix whoami)
    success "Already logged in to Wix as: $WIX_USER"
else
    warning "Not logged in to Wix"
    log "Opening browser for Wix login..."
    wix login
    success "Logged in to Wix"
fi

###############################################################################
# Initialize Wix Project (if needed)
###############################################################################

step "Checking Wix Project Connection"

if [ -d "$PROJECT_ROOT/.wix" ]; then
    success "Project is connected to Wix"
else
    warning "Project not connected to Wix"
    log "You'll need to run: wix init"
    log "This will connect your local project to your Wix site"
fi

###############################################################################
# Create Scripts Directory
###############################################################################

step "Setting Up Script Permissions"

chmod +x "$SCRIPT_DIR/deploy.sh" 2>/dev/null || true
chmod +x "$SCRIPT_DIR/test.sh" 2>/dev/null || true
chmod +x "$SCRIPT_DIR/setup-env.sh" 2>/dev/null || true

success "Script permissions set"

###############################################################################
# Verify File Structure
###############################################################################

step "Verifying Project Structure"

REQUIRED_DIRS=("src" "src/pages" "src/backend" "src/lightboxes" "src/styles")
REQUIRED_FILES=("package.json" "wix.config.json" "README.md")

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$PROJECT_ROOT/$dir" ]; then
        success "Found: $dir/"
    else
        warning "Missing directory: $dir/"
    fi
done

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$PROJECT_ROOT/$file" ]; then
        success "Found: $file"
    else
        warning "Missing file: $file"
    fi
done

###############################################################################
# Check Git
###############################################################################

step "Checking Git Configuration"

if command -v git &> /dev/null; then
    success "Git is installed"

    if [ -d "$PROJECT_ROOT/.git" ]; then
        success "Git repository initialized"

        CURRENT_BRANCH=$(git branch --show-current)
        success "Current branch: $CURRENT_BRANCH"
    else
        warning "Not a git repository"
    fi
else
    warning "Git is not installed"
fi

###############################################################################
# Summary
###############################################################################

step "Setup Summary"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BOLD}${GREEN}  ✅ Environment Setup Complete!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BOLD}Next Steps:${NC}"
echo ""
echo "  1. Configure .env file with your API keys"
echo "     ${CYAN}nano .env${NC}"
echo ""
echo "  2. Connect to your Wix site (if not already done)"
echo "     ${CYAN}wix init${NC}"
echo ""
echo "  3. Start development server"
echo "     ${CYAN}npm run dev${NC}  OR  ${CYAN}./scripts/deploy.sh dev${NC}"
echo ""
echo "  4. Set up database collections"
echo "     ${CYAN}node scripts/setup-database.js${NC}"
echo ""
echo -e "${BOLD}Quick Commands:${NC}"
echo ""
echo "  ${CYAN}npm run dev${NC}         - Start Wix dev server"
echo "  ${CYAN}./scripts/deploy.sh${NC} - Run full deployment"
echo "  ${CYAN}wix dev${NC}             - Start Wix preview"
echo "  ${CYAN}wix publish${NC}         - Publish to production"
echo ""
echo -e "${BOLD}Documentation:${NC}"
echo ""
echo "  - README.md"
echo "  - DEVELOPMENT_GUIDE.md"
echo "  - src/backend/SETUP_GUIDE.md"
echo "  - PORTAL_LOADING_SCREEN_SETUP.md"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

success "Environment is ready! 🚀"
echo ""
