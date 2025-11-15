#!/bin/bash

###############################################################################
# TTS Website V7 - Quick Start Script
#
# One-command setup and launch for local development
#
# Usage:
#   ./scripts/quickstart.sh
###############################################################################

set -e

# Colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m'

clear

cat << "EOF"

 ████████╗████████╗███████╗    ██╗    ██╗███████╗██████╗ ███████╗██╗████████╗███████╗
 ╚══██╔══╝╚══██╔══╝██╔════╝    ██║    ██║██╔════╝██╔══██╗██╔════╝██║╚══██╔══╝██╔════╝
    ██║      ██║   ███████╗    ██║ █╗ ██║█████╗  ██████╔╝███████╗██║   ██║   █████╗
    ██║      ██║   ╚════██║    ██║███╗██║██╔══╝  ██╔══██╗╚════██║██║   ██║   ██╔══╝
    ██║      ██║   ███████║    ╚███╔███╔╝███████╗██████╔╝███████║██║   ██║   ███████╗
    ╚═╝      ╚═╝   ╚══════╝     ╚══╝╚══╝ ╚══════╝╚═════╝ ╚══════╝╚═╝   ╚═╝   ╚══════╝

                        🌀 AI Interactive Art Gallery 🌀
                              Quick Start Setup
EOF

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

log() { echo -e "${CYAN}▶${NC} $1"; }
success() { echo -e "${GREEN}✅${NC} $1"; }
warning() { echo -e "${YELLOW}⚠️ ${NC} $1"; }

cd "$PROJECT_ROOT"

###############################################################################
# Step 1: Environment Setup
###############################################################################

echo -e "${BOLD}Step 1/5: Environment Setup${NC}"
echo ""

if [ -f "$SCRIPT_DIR/setup-env.sh" ]; then
    log "Running environment setup..."
    bash "$SCRIPT_DIR/setup-env.sh"
else
    warning "setup-env.sh not found, installing dependencies manually..."
    npm install
fi

success "Environment ready"
echo ""

###############################################################################
# Step 2: Check .env
###############################################################################

echo -e "${BOLD}Step 2/5: Configuration${NC}"
echo ""

if [ ! -f ".env" ]; then
    warning ".env file not found, creating template..."
    cat > .env << 'ENVFILE'
HUGGING_FACE_API_KEY=your_key_here
AI_MOCK_MODE=true
NODE_ENV=development
ENVFILE
    success "Created .env template"
    warning "Please edit .env and add your Hugging Face API key"
    warning "Or keep AI_MOCK_MODE=true to use mock data"
else
    success ".env file exists"
fi

echo ""

###############################################################################
# Step 3: Validate Project
###############################################################################

echo -e "${BOLD}Step 3/5: Validation${NC}"
echo ""

log "Validating project structure..."

# Check critical files
CRITICAL_FILES=(
    "src/backend/ai-api.jsw"
    "src/pages/Home.js"
    "src/lightboxes/AIManipulation.js"
    "package.json"
)

ALL_VALID=true
for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        success "$file"
    else
        warning "Missing: $file"
        ALL_VALID=false
    fi
done

if [ "$ALL_VALID" = true ]; then
    success "All critical files present"
else
    warning "Some files are missing, but continuing..."
fi

echo ""

###############################################################################
# Step 4: Show Instructions
###############################################################################

echo -e "${BOLD}Step 4/5: Next Steps${NC}"
echo ""

cat << 'INSTRUCTIONS'
Before starting the dev server, you need to:

1. 🔐 Get a Hugging Face API key:
   → Visit: https://huggingface.co/settings/tokens
   → Create a token (read permission is enough)
   → Add to .env file: HUGGING_FACE_API_KEY=hf_your_key_here

   OR use mock mode (already enabled in .env)

2. 🌐 Connect to Wix (if not already done):
   → Run: wix login
   → Run: wix init
   → Select your Wix site

3. 🗄️ Set up database (in Wix Editor):
   → Follow guide: src/backend/SETUP_GUIDE.md
   → Create 4 collections: Portfolio, CustomCreations, Orders, PortalSessions

   OR use the automated script:
   → node scripts/setup-database.js

INSTRUCTIONS

echo ""
read -p "$(echo -e ${CYAN}Have you completed these steps? [y/N]${NC} )" -n 1 -r
echo ""

###############################################################################
# Step 5: Start Development Server
###############################################################################

echo ""
echo -e "${BOLD}Step 5/5: Launch${NC}"
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    log "Starting Wix development server..."
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}${GREEN}  🚀 Launching TTS Website V7${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "  The browser will open automatically"
    echo "  Press Ctrl+C to stop the server"
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    # Start Wix dev server
    wix dev --open
else
    echo ""
    warning "Skipping dev server launch"
    echo ""
    echo -e "${BOLD}Manual Commands:${NC}"
    echo ""
    echo "  Start dev server:    ${CYAN}wix dev${NC}"
    echo "  Deploy to preview:   ${CYAN}wix preview${NC}"
    echo "  Publish to prod:     ${CYAN}wix publish${NC}"
    echo "  Run tests:           ${CYAN}./scripts/test.sh${NC}"
    echo "  Full deployment:     ${CYAN}./scripts/deploy.sh${NC}"
    echo ""
    echo -e "${BOLD}Documentation:${NC}"
    echo ""
    echo "  README.md"
    echo "  DEVELOPMENT_GUIDE.md"
    echo "  src/backend/SETUP_GUIDE.md"
    echo ""
fi

echo ""
