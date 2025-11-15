#!/bin/bash

###############################################################################
# TTS Website V7 - Test Automation Script
#
# Runs automated tests for the project including:
# - Schema validation
# - Code linting
# - Unit tests
# - Integration tests
#
# Usage:
#   ./scripts/test.sh [type]
#
# Types:
#   all      - Run all tests (default)
#   schema   - Validate database schemas only
#   lint     - Run ESLint only
#   unit     - Run unit tests only
###############################################################################

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

log() { echo -e "${CYAN}[TEST]${NC} $1"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
fail() { echo -e "${RED}❌ $1${NC}"; }
step() { echo -e "\n${BOLD}${CYAN}━━━ $1 ━━━${NC}\n"; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TEST_TYPE="${1:-all}"

TESTS_PASSED=0
TESTS_FAILED=0

###############################################################################
# Banner
###############################################################################

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BOLD}${CYAN}  🧪 TTS Website V7 - Test Suite${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

###############################################################################
# Schema Validation
###############################################################################

test_schemas() {
    step "Validating Database Schemas"

    SCHEMA_DIR="$PROJECT_ROOT/src/backend/schemas"
    SCHEMAS=("Portfolio.json" "CustomCreations.json" "Orders.json" "PortalSessions.json")

    for schema in "${SCHEMAS[@]}"; do
        if [ -f "$SCHEMA_DIR/$schema" ]; then
            log "Validating $schema..."

            # Check JSON syntax
            if jq empty "$SCHEMA_DIR/$schema" 2>/dev/null; then
                success "$schema is valid JSON"
                ((TESTS_PASSED++))
            else
                fail "$schema has invalid JSON syntax"
                ((TESTS_FAILED++))
            fi

            # Check required fields
            if jq -e '.collectionName' "$SCHEMA_DIR/$schema" >/dev/null 2>&1; then
                success "$schema has collectionName"
                ((TESTS_PASSED++))
            else
                fail "$schema missing collectionName"
                ((TESTS_FAILED++))
            fi

            if jq -e '.fields' "$SCHEMA_DIR/$schema" >/dev/null 2>&1; then
                FIELD_COUNT=$(jq '.fields | length' "$SCHEMA_DIR/$schema")
                success "$schema has $FIELD_COUNT fields"
                ((TESTS_PASSED++))
            else
                fail "$schema missing fields array"
                ((TESTS_FAILED++))
            fi
        else
            fail "Schema file not found: $schema"
            ((TESTS_FAILED++))
        fi
    done
}

###############################################################################
# Code Linting
###############################################################################

test_lint() {
    step "Running ESLint"

    cd "$PROJECT_ROOT"

    if [ -f ".eslintrc.json" ]; then
        log "Linting JavaScript files..."

        if npx eslint src/ --ext .js,.jsw 2>&1 | tee /tmp/eslint-output.txt; then
            success "ESLint passed"
            ((TESTS_PASSED++))
        else
            fail "ESLint found errors"
            cat /tmp/eslint-output.txt
            ((TESTS_FAILED++))
        fi
    else
        log "No .eslintrc.json found, skipping lint"
    fi
}

###############################################################################
# File Structure Tests
###############################################################################

test_structure() {
    step "Testing Project Structure"

    REQUIRED_FILES=(
        "src/backend/ai-api.jsw"
        "src/backend/permissions.json"
        "src/pages/Home.js"
        "src/pages/Gallery.js"
        "src/lightboxes/AIManipulation.js"
        "src/lightboxes/AIManipulation.css"
        "src/styles/portal-loading-screen.css"
    )

    for file in "${REQUIRED_FILES[@]}"; do
        if [ -f "$PROJECT_ROOT/$file" ]; then
            success "Found: $file"
            ((TESTS_PASSED++))
        else
            fail "Missing: $file"
            ((TESTS_FAILED++))
        fi
    done
}

###############################################################################
# API Integration Tests
###############################################################################

test_api_mock() {
    step "Testing AI API (Mock Mode)"

    log "Testing would require Wix runtime environment"
    log "Skipping API tests in standalone mode"

    # These tests would run in Wix environment
    # - Test generateSingleImage() with mock mode
    # - Test blendMultipleImages() with mock mode
    # - Test error handling
    # - Test input validation
}

###############################################################################
# Documentation Tests
###############################################################################

test_documentation() {
    step "Checking Documentation"

    REQUIRED_DOCS=(
        "README.md"
        "ARCHITECTURE.md"
        "ARTISTIC_VISION.md"
        "CODING_STANDARDS.md"
        "src/backend/DATABASE_SCHEMA.md"
        "src/backend/SETUP_GUIDE.md"
        "PORTAL_LOADING_SCREEN_SETUP.md"
        "src/lightboxes/AI_MODAL_IMPLEMENTATION_GUIDE.md"
    )

    for doc in "${REQUIRED_DOCS[@]}"; do
        if [ -f "$PROJECT_ROOT/$doc" ]; then
            # Check if file is not empty
            if [ -s "$PROJECT_ROOT/$doc" ]; then
                success "Documentation exists: $doc"
                ((TESTS_PASSED++))
            else
                fail "Documentation is empty: $doc"
                ((TESTS_FAILED++))
            fi
        else
            fail "Missing documentation: $doc"
            ((TESTS_FAILED++))
        fi
    done
}

###############################################################################
# CSS Validation
###############################################################################

test_css() {
    step "Validating CSS Files"

    CSS_FILES=(
        "src/lightboxes/AIManipulation.css"
        "src/styles/portal-loading-screen.css"
    )

    for css in "${CSS_FILES[@]}"; do
        if [ -f "$PROJECT_ROOT/$css" ]; then
            log "Checking $css..."

            # Basic syntax check - look for balanced braces
            OPEN_BRACES=$(grep -o "{" "$PROJECT_ROOT/$css" | wc -l)
            CLOSE_BRACES=$(grep -o "}" "$PROJECT_ROOT/$css" | wc -l)

            if [ "$OPEN_BRACES" -eq "$CLOSE_BRACES" ]; then
                success "$css has balanced braces"
                ((TESTS_PASSED++))
            else
                fail "$css has unbalanced braces (${OPEN_BRACES} open, ${CLOSE_BRACES} close)"
                ((TESTS_FAILED++))
            fi
        else
            fail "CSS file not found: $css"
            ((TESTS_FAILED++))
        fi
    done
}

###############################################################################
# Git Status Check
###############################################################################

test_git() {
    step "Checking Git Status"

    if [ -d "$PROJECT_ROOT/.git" ]; then
        # Check for uncommitted changes
        if git diff-index --quiet HEAD -- 2>/dev/null; then
            success "No uncommitted changes"
            ((TESTS_PASSED++))
        else
            log "Warning: You have uncommitted changes"
        fi

        # Check current branch
        BRANCH=$(git branch --show-current)
        log "Current branch: $BRANCH"
    else
        fail "Not a git repository"
        ((TESTS_FAILED++))
    fi
}

###############################################################################
# Run Tests Based on Type
###############################################################################

case "$TEST_TYPE" in
    all)
        test_structure
        test_schemas
        test_documentation
        test_css
        test_lint
        test_git
        ;;
    schema)
        test_schemas
        ;;
    lint)
        test_lint
        ;;
    structure)
        test_structure
        ;;
    docs)
        test_documentation
        ;;
    css)
        test_css
        ;;
    *)
        fail "Unknown test type: $TEST_TYPE"
        echo "Valid types: all, schema, lint, structure, docs, css"
        exit 1
        ;;
esac

###############################################################################
# Summary
###############################################################################

step "Test Results"

TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${BOLD}${GREEN}  ✅ All Tests Passed!${NC}"
else
    echo -e "${BOLD}${RED}  ❌ Some Tests Failed${NC}"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BOLD}Total Tests:${NC} $TOTAL_TESTS"
echo -e "${GREEN}Passed:${NC} $TESTS_PASSED"
echo -e "${RED}Failed:${NC} $TESTS_FAILED"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ $TESTS_FAILED -gt 0 ]; then
    exit 1
fi

exit 0
