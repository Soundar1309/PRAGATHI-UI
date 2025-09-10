#!/bin/bash

# Local Frontend Deployment Script
# This script builds and prepares the frontend for deployment

set -e  # Exit on any error

# Configuration
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIST_DIR="$PROJECT_DIR/dist"
TARGET_DIR="/home/sasikalavijayakumar/pragathi_server/frontend-dist"

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

# Check if Node.js is installed
check_node() {
  # Load nvm if available
  if [ -s "$HOME/.nvm/nvm.sh" ]; then
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  fi
  
  # Use Node.js version from .nvmrc if available
  if [ -f ".nvmrc" ]; then
    log "Using Node.js version from .nvmrc"
    nvm use
  fi
  
  if ! command -v node &> /dev/null; then
    error "Node.js is not installed. Please install Node.js first."
  fi
  
  if ! command -v npm &> /dev/null; then
    error "npm is not installed. Please install npm first."
  fi
  
  # Check Node.js version
  NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
  if [ "$NODE_VERSION" -lt 20 ]; then
    error "Node.js version 20 or higher is required. Current version: $(node --version)"
  fi
  
  log "Node.js $(node --version) and npm $(npm --version) are available"
}

# Install dependencies
install_dependencies() {
    log "Installing dependencies..."
    npm ci
    log "Dependencies installed successfully"
}

# Run linting
run_lint() {
    log "Running ESLint..."
    if npm run lint; then
        log "Linting passed"
    else
        warn "Linting failed, but continuing with build"
    fi
}

# Build the application
build_app() {
    log "Building application for production..."
    
    # Clean previous build
    if [ -d "$DIST_DIR" ]; then
        rm -rf "$DIST_DIR"
    fi
    
    # Build with production settings
    if npm run build:prod; then
        log "Application built successfully"
    else
        error "Build failed"
    fi
}

# Copy to deployment directory
deploy_files() {
    log "Copying files to deployment directory..."
    
    # Create target directory if it doesn't exist
    mkdir -p "$TARGET_DIR"
    
    # Copy built files
    cp -r "$DIST_DIR"/* "$TARGET_DIR/"
    
    log "Files copied to $TARGET_DIR"
}

# Main function
main() {
    log "Starting local frontend deployment..."
    
    # Parse command line arguments
    BUILD_ONLY=false
    for arg in "$@"; do
        case $arg in
            --build-only)
                BUILD_ONLY=true
                shift
                ;;
            *)
                # Unknown option
                ;;
        esac
    done
    
    check_node
    install_dependencies
    run_lint
    build_app
    
    if [ "$BUILD_ONLY" = false ]; then
        deploy_files
        log "Local deployment completed successfully!"
        log "Run './deploy-frontend.sh' on the server to complete the deployment."
    else
        log "Build completed successfully!"
    fi
}

# Run main function
main "$@"
