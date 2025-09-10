#!/bin/bash

# Node.js Setup Script for PRAGATHI Frontend
# This script ensures the correct Node.js version is installed and used

set -e  # Exit on any error

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

# Check if nvm is installed
check_nvm() {
    if [ ! -d "$HOME/.nvm" ]; then
        log "Installing nvm (Node Version Manager)..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
        
        # Load nvm
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
        
        log "nvm installed successfully"
    else
        log "nvm is already installed"
        # Load nvm
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    fi
}

# Install and use the correct Node.js version
setup_node() {
    log "Setting up Node.js..."
    
    # Read version from .nvmrc
    if [ -f ".nvmrc" ]; then
        NODE_VERSION=$(cat .nvmrc)
        log "Using Node.js version from .nvmrc: $NODE_VERSION"
    else
        NODE_VERSION="20.19.5"
        log "Using default Node.js version: $NODE_VERSION"
    fi
    
    # Install Node.js version
    if nvm list | grep -q "v$NODE_VERSION"; then
        log "Node.js v$NODE_VERSION is already installed"
    else
        log "Installing Node.js v$NODE_VERSION..."
        nvm install "$NODE_VERSION"
    fi
    
    # Use the Node.js version
    nvm use "$NODE_VERSION"
    
    # Verify installation
    CURRENT_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)
    
    log "Node.js version: $CURRENT_VERSION"
    log "npm version: $NPM_VERSION"
    
    # Check if version meets requirements
    MAJOR_VERSION=$(echo "$CURRENT_VERSION" | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$MAJOR_VERSION" -lt 20 ]; then
        error "Node.js version 20 or higher is required. Current version: $CURRENT_VERSION"
    fi
    
    log "Node.js setup completed successfully!"
}

# Install project dependencies
install_dependencies() {
    log "Installing project dependencies..."
    
    # Clear npm cache to avoid issues
    npm cache clean --force
    
    # Install dependencies
    npm ci
    
    log "Dependencies installed successfully!"
}

# Main setup function
main() {
    log "Starting Node.js setup for PRAGATHI Frontend..."
    
    check_nvm
    setup_node
    install_dependencies
    
    log "Setup completed successfully!"
    log "You can now run: npm run dev"
}

# Run main function
main "$@"
