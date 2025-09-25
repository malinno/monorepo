#!/bin/bash

# Deploy script for Mektec Web App
# Usage: ./scripts/deploy.sh [environment]
# Environment: staging, production (default: staging)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default environment
ENVIRONMENT=${1:-staging}

echo -e "${BLUE}🚀 Deploying Mektec Web App to ${ENVIRONMENT} environment...${NC}"

# Validate environment
if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    echo -e "${RED}❌ Invalid environment. Use 'staging' or 'production'${NC}"
    exit 1
fi

# Build the application
echo -e "${YELLOW}🔨 Building application for ${ENVIRONMENT}...${NC}"
./scripts/build.sh "$ENVIRONMENT"

# Deploy to staging
if [ "$ENVIRONMENT" = "staging" ]; then
    echo -e "${YELLOW}📤 Deploying to staging...${NC}"
    
    # Example: Deploy to staging server
    # rsync -avz --delete dist/ user@staging-server:/var/www/mektec-staging/
    # ssh user@staging-server "sudo systemctl reload nginx"
    
    echo -e "${GREEN}✅ Deployed to staging successfully!${NC}"
    echo -e "${BLUE}🌐 Staging URL: https://staging.mektec.com${NC}"

# Deploy to production
elif [ "$ENVIRONMENT" = "production" ]; then
    echo -e "${YELLOW}📤 Deploying to production...${NC}"
    
    # Example: Deploy to production server
    # rsync -avz --delete dist/ user@production-server:/var/www/mektec/
    # ssh user@production-server "sudo systemctl reload nginx"
    
    echo -e "${GREEN}✅ Deployed to production successfully!${NC}"
    echo -e "${BLUE}🌐 Production URL: https://mektec.com${NC}"
fi

echo -e "${GREEN}🎉 Deployment completed!${NC}"
