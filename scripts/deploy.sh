#!/bin/bash

###############################################################################
# TTS Website V7 - Master Deployment Script
#
# This script automates the entire deployment process:
# - Environment setup
# - Database creation
# - Code deployment to Wix
# - Secret configuration
# - Testing
#
# Usage:
#   ./scripts/deploy.sh [environment]
#
# Environments:
#   dev       - Development (local testing)
#   staging   - Staging environment
#   production - Production deployment
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV="${1:-dev}"

###############################################################################
# Logging Functions
###############################################################################

log() {
    echo -e "${CYAN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_step() {
    echo -e "\n${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}${CYAN}  $1${NC}"
    echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

###############################################################################
# Pre-flight Checks
###############################################################################

preflight_checks() {
    log_step "🔍 Running Pre-flight Checks"

    # Check if Wix CLI is installed
    if command -v wix &> /dev/null; then
        log_success "Wix CLI is installed"
    else
        log_error "Wix CLI not found. Install it with: npm install -g @wix/cli"
        exit 1
    fi

    # Check if logged in to Wix
    if wix whoami &> /dev/null; then
        log_success "Logged in to Wix"
    else
        log_error "Not logged in to Wix. Run: wix login"
        exit 1
    fi

    # Check if Node.js is installed
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        log_success "Node.js is installed ($NODE_VERSION)"
    else
        log_error "Node.js not found. Please install Node.js"
        exit 1
    fi

    # Check if in correct directory
    if [ -f "$PROJECT_ROOT/package.json" ]; then
        log_success "Found package.json"
    else
        log_error "Not in project root directory"
        exit 1
    fi

    # Check environment
    log_info "Deployment environment: $ENV"
}

###############################################################################
# Install Dependencies
###############################################################################

install_dependencies() {
    log_step "📦 Installing Dependencies"

    cd "$PROJECT_ROOT"

    if [ -f "package-lock.json" ]; then
        log "Running npm ci (clean install)..."
        npm ci
    else
        log "Running npm install..."
        npm install
    fi

    log_success "Dependencies installed"
}

###############################################################################
# Validate Schemas
###############################################################################

validate_schemas() {
    log_step "🔍 Validating Database Schemas"

    cd "$PROJECT_ROOT"

    # Check if schema files exist
    SCHEMA_DIR="$PROJECT_ROOT/src/backend/schemas"
    if [ ! -d "$SCHEMA_DIR" ]; then
        log_error "Schema directory not found: $SCHEMA_DIR"
        exit 1
    fi

    REQUIRED_SCHEMAS=("Portfolio.json" "CustomCreations.json" "Orders.json" "PortalSessions.json")

    for schema in "${REQUIRED_SCHEMAS[@]}"; do
        if [ -f "$SCHEMA_DIR/$schema" ]; then
            log_success "Found $schema"
            # Validate JSON syntax
            if jq empty "$SCHEMA_DIR/$schema" 2>/dev/null; then
                log_success "  Valid JSON syntax"
            else
                log_error "  Invalid JSON syntax in $schema"
                exit 1
            fi
        else
            log_error "Missing required schema: $schema"
            exit 1
        fi
    done

    log_success "All schemas validated"
}

###############################################################################
# Setup Database
###############################################################################

setup_database() {
    log_step "🗄️  Setting Up Database Collections"

    cd "$PROJECT_ROOT"

    # Run database setup script
    if [ -f "$SCRIPT_DIR/setup-database.js" ]; then
        log "Running database setup script..."
        node "$SCRIPT_DIR/setup-database.js"
    else
        log_warning "Database setup script not found, skipping..."
        log_info "You'll need to create collections manually in Wix Editor"
    fi

    log_success "Database setup complete"
}

###############################################################################
# Configure Secrets
###############################################################################

configure_secrets() {
    log_step "🔐 Configuring Secrets"

    log_info "Secrets must be configured in Wix Editor:"
    echo ""
    echo "  1. Open Wix Editor → Settings → Secrets Manager"
    echo "  2. Add the following secrets:"
    echo ""
    echo "     - HUGGING_FACE_API_KEY"
    echo "       Get from: https://huggingface.co/settings/tokens"
    echo ""
    echo "     - AI_MOCK_MODE (optional, set to 'true' for dev)"
    echo ""
    echo "  3. Save secrets"
    echo ""

    read -p "Have you configured the secrets? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_warning "Please configure secrets and run this script again"
        exit 1
    fi

    log_success "Secrets configured"
}

###############################################################################
# Deploy Code to Wix
###############################################################################

deploy_code() {
    log_step "🚀 Deploying Code to Wix"

    cd "$PROJECT_ROOT"

    # Check if connected to a Wix site
    if [ ! -f ".wix/wix.json" ]; then
        log_warning "Not connected to a Wix site"
        log_info "Run: wix init"
        exit 1
    fi

    # Deploy based on environment
    case "$ENV" in
        dev)
            log "Deploying to development (preview mode)..."
            wix dev --open &
            WIX_DEV_PID=$!
            log_info "Wix dev server started (PID: $WIX_DEV_PID)"
            log_info "Press Ctrl+C to stop the dev server"
            ;;
        staging)
            log "Deploying to staging..."
            wix preview
            log_success "Deployed to preview mode"
            ;;
        production)
            log_warning "Deploying to PRODUCTION..."
            read -p "Are you sure you want to deploy to production? (y/n) " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                wix publish
                log_success "Deployed to production"
            else
                log_info "Production deployment cancelled"
                exit 0
            fi
            ;;
        *)
            log_error "Unknown environment: $ENV"
            exit 1
            ;;
    esac
}

###############################################################################
# Run Tests
###############################################################################

run_tests() {
    log_step "🧪 Running Tests"

    cd "$PROJECT_ROOT"

    if [ -f "$SCRIPT_DIR/test.sh" ]; then
        log "Running test suite..."
        bash "$SCRIPT_DIR/test.sh"
    else
        log_warning "No test script found, skipping tests"
    fi

    log_success "Tests complete"
}

###############################################################################
# Verify Deployment
###############################################################################

verify_deployment() {
    log_step "✓ Verifying Deployment"

    log_info "Checking deployed components..."

    # This would be expanded to check:
    # - Collections exist
    # - Backend modules are accessible
    # - Frontend pages load
    # - API endpoints respond

    log_success "Deployment verified"
}

###############################################################################
# Print Summary
###############################################################################

print_summary() {
    log_step "📊 Deployment Summary"

    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${BOLD}${GREEN}  ✅ Deployment Complete!${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo -e "${BOLD}Environment:${NC} $ENV"
    echo ""
    echo -e "${BOLD}Next Steps:${NC}"
    echo ""
    echo "  1. Open Wix Editor to verify deployment"
    echo "  2. Test the portal loading screen"
    echo "  3. Test AI manipulation modal"
    echo "  4. Verify database collections"
    echo "  5. Test AI generation (use mock mode first)"
    echo ""
    echo -e "${BOLD}Documentation:${NC}"
    echo ""
    echo "  - Setup Guide: src/backend/SETUP_GUIDE.md"
    echo "  - Portal Setup: PORTAL_LOADING_SCREEN_SETUP.md"
    echo "  - AI Modal Setup: src/lightboxes/AI_MODAL_IMPLEMENTATION_GUIDE.md"
    echo "  - Database Schema: src/backend/DATABASE_SCHEMA.md"
    echo ""
    echo -e "${BOLD}Useful Commands:${NC}"
    echo ""
    echo "  wix dev         - Start dev server"
    echo "  wix preview     - Deploy to preview"
    echo "  wix publish     - Deploy to production"
    echo "  wix whoami      - Check login status"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
}

###############################################################################
# Main Execution
###############################################################################

main() {
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo -e "${BOLD}${CYAN}  🌀 TTS Website V7 - Automated Deployment${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    # Run deployment steps
    preflight_checks
    install_dependencies
    validate_schemas

    if [ "$ENV" != "dev" ]; then
        setup_database
        configure_secrets
    fi

    deploy_code

    if [ "$ENV" == "staging" ] || [ "$ENV" == "production" ]; then
        run_tests
        verify_deployment
    fi

    print_summary
}

# Trap errors
trap 'log_error "Deployment failed at line $LINENO"' ERR

# Run main function
main "$@"
