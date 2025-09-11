#!/bin/bash

# Robust Build Script for PRAGATHI-UI
# This script ensures the build process runs from the correct directory

set -e  # Exit on any error

# Get the absolute path of the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1"
    exit 1
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1"
}

# Verify we're in the correct directory
verify_directory() {
    log "Verifying build directory..."
    log "Current directory: $(pwd)"
    
    if [ ! -f "package.json" ]; then
        error "package.json not found. Are you in the correct directory?"
    fi
    
    if [ ! -f "tsconfig.json" ]; then
        error "tsconfig.json not found. Are you in the correct directory?"
    fi
    
    if [ ! -f "vite.config.ts" ]; then
        error "vite.config.ts not found. Are you in the correct directory?"
    fi
    
    log "Directory verification passed"
}

# Clean previous build
clean_build() {
    log "Cleaning previous build..."
    if [ -d "dist" ]; then
        rm -rf dist
        log "Previous build cleaned"
    fi
}

# Install dependencies
install_deps() {
    log "Installing dependencies..."
    if npm ci; then
        log "Dependencies installed successfully"
    else
        error "Failed to install dependencies"
    fi
}

# Run TypeScript compilation
run_typescript() {
    log "Running TypeScript compilation..."
    if npx tsc -b --verbose; then
        log "TypeScript compilation successful"
    else
        error "TypeScript compilation failed"
    fi
}

# Run Vite build
run_vite_build() {
    log "Running Vite build..."
    if npx vite build --mode production; then
        log "Vite build successful"
    else
        error "Vite build failed"
    fi
}

# Verify build output
verify_build() {
    log "Verifying build output..."
    if [ ! -d "dist" ]; then
        error "Build output directory 'dist' not found"
    fi
    
    if [ ! -f "dist/index.html" ]; then
        error "Build output file 'dist/index.html' not found"
    fi
    
    log "Build output verification passed"
    log "Build completed successfully!"
}

# Main function
main() {
    log "Starting robust build process..."
    
    verify_directory
    clean_build
    install_deps
    run_typescript
    run_vite_build
    verify_build
    
    log "All build steps completed successfully!"
}

# Run main function
main "$@"
