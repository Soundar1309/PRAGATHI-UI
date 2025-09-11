#!/bin/bash

# Deploy Frontend from Web Directory
# This script can be run from /var/www/html/ to deploy the PRAGATHI-UI frontend

set -e  # Exit on any error

# Configuration
PROJECT_DIR="/home/sasikalavijayakumar/pragathi_server/PRAGATHI-UI"
WEB_DIR="/var/www/html"
DIST_DIR="/home/sasikalavijayakumar/pragathi_server/frontend-dist"
NGINX_DIR="/var/www/pragathi-frontend"

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

# Check if project directory exists
check_project_directory() {
    log "Checking project directory..."
    if [ ! -d "$PROJECT_DIR" ]; then
        error "Project directory not found: $PROJECT_DIR"
    fi
    
    if [ ! -f "$PROJECT_DIR/package.json" ]; then
        error "package.json not found in project directory"
    fi
    
    if [ ! -f "$PROJECT_DIR/tsconfig.json" ]; then
        error "tsconfig.json not found in project directory"
    fi
    
    log "Project directory verified: $PROJECT_DIR"
}

# Navigate to project directory and run deployment
deploy_from_project() {
    log "Navigating to project directory and running deployment..."
    
    # Change to project directory
    cd "$PROJECT_DIR"
    
    # Verify we're in the right place
    if [ ! -f "package.json" ] || [ ! -f "tsconfig.json" ]; then
        error "Failed to navigate to project directory"
    fi
    
    log "Current directory: $(pwd)"
    
    # Run the deployment script
    if [ -f "./deploy.sh" ]; then
        log "Running deployment script..."
        ./deploy.sh
    else
        error "deploy.sh not found in project directory"
    fi
}

# Copy files to web directory (optional)
copy_to_web() {
    log "Copying built files to web directory..."
    
    # Check if dist directory exists
    if [ ! -d "$DIST_DIR" ] || [ ! "$(ls -A "$DIST_DIR")" ]; then
        error "Build output not found. Please run deployment first."
    fi
    
    # Create web directory if it doesn't exist
    mkdir -p "$WEB_DIR"
    
    # Copy files to web directory
    cp -r "$DIST_DIR"/* "$WEB_DIR/"
    
    # Set proper permissions
    chown -R www-data:www-data "$WEB_DIR"
    chmod -R 755 "$WEB_DIR"
    
    log "Files copied to web directory: $WEB_DIR"
}

# Deploy to nginx directory
deploy_to_nginx() {
    log "Deploying to nginx directory..."
    
    # Check if dist directory exists
    if [ ! -d "$DIST_DIR" ] || [ ! "$(ls -A "$DIST_DIR")" ]; then
        error "Build output not found. Please run deployment first."
    fi
    
    # Create nginx directory if it doesn't exist
    mkdir -p "$NGINX_DIR"
    
    # Clear nginx directory
    rm -rf "$NGINX_DIR"/*
    
    # Copy files to nginx directory
    cp -r "$DIST_DIR"/* "$NGINX_DIR/"
    
    # Set proper permissions
    chown -R www-data:www-data "$NGINX_DIR"
    chmod -R 755 "$NGINX_DIR"
    
    log "Files deployed to nginx directory: $NGINX_DIR"
}

# Test nginx configuration
test_nginx() {
    log "Testing nginx configuration..."
    if nginx -t; then
        log "Nginx configuration is valid"
    else
        warn "Nginx configuration test failed"
    fi
}

# Reload nginx
reload_nginx() {
    log "Reloading nginx..."
    if systemctl reload nginx; then
        log "Nginx reloaded successfully"
    else
        warn "Failed to reload nginx"
    fi
}

# Health check
health_check() {
    log "Performing health check..."
    sleep 2  # Wait for nginx to reload
    
    # Check if nginx is serving the files
    if curl -f -s http://localhost/ > /dev/null; then
        log "Health check passed - Frontend is accessible"
    else
        warn "Health check failed - Frontend might not be accessible"
    fi
}

# Main function
main() {
    log "Starting frontend deployment from web directory..."
    
    # Parse command line arguments
    DEPLOY_TO_WEB=false
    DEPLOY_TO_NGINX=false
    RELOAD_NGINX=false
    
    for arg in "$@"; do
        case $arg in
            --web)
                DEPLOY_TO_WEB=true
                shift
                ;;
            --nginx)
                DEPLOY_TO_NGINX=true
                shift
                ;;
            --reload)
                RELOAD_NGINX=true
                shift
                ;;
            *)
                # Unknown option
                ;;
        esac
    done
    
    check_project_directory
    deploy_from_project
    
    if [ "$DEPLOY_TO_WEB" = true ]; then
        copy_to_web
    fi
    
    if [ "$DEPLOY_TO_NGINX" = true ]; then
        deploy_to_nginx
    fi
    
    if [ "$RELOAD_NGINX" = true ]; then
        test_nginx
        reload_nginx
        health_check
    fi
    
    log "Deployment completed successfully!"
}

# Show usage if no arguments
if [ $# -eq 0 ]; then
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  --web      Copy built files to web directory (/var/www/html/)"
    echo "  --nginx    Deploy to nginx directory (/var/www/pragathi-frontend/)"
    echo "  --reload   Reload nginx after deployment"
    echo ""
    echo "Examples:"
    echo "  $0                    # Build only"
    echo "  $0 --web              # Build and copy to web directory"
    echo "  $0 --nginx --reload   # Build, deploy to nginx, and reload"
    echo ""
    exit 0
fi

# Run main function
main "$@"
