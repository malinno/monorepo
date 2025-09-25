#!/bin/bash

# Build script for Mektec Web App
# Usage: ./scripts/build.sh [environment]
# Environment: development, staging, production (default: production)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default environment
ENVIRONMENT=${1:-production}

echo -e "${BLUE}🚀 Building Mektec Web App for ${ENVIRONMENT} environment...${NC}"

# Check if environment file exists
ENV_FILE="env.${ENVIRONMENT}"
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}❌ Environment file ${ENV_FILE} not found!${NC}"
    exit 1
fi

# Copy environment file
echo -e "${YELLOW}📋 Copying environment configuration...${NC}"
cp "$ENV_FILE" .env

# Clean previous build
echo -e "${YELLOW}🧹 Cleaning previous build...${NC}"
rm -rf dist

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
pnpm install

# Type checking
echo -e "${YELLOW}🔍 Running type checking...${NC}"
pnpm run type-check

# Linting
echo -e "${YELLOW}🔍 Running linter...${NC}"
pnpm run lint

# Build
echo -e "${YELLOW}🔨 Building application...${NC}"
pnpm run build

# Verify build
if [ -d "dist" ]; then
    echo -e "${GREEN}✅ Build completed successfully!${NC}"
    echo -e "${BLUE}📁 Output directory: dist/${NC}"
    echo -e "${BLUE}🌐 Environment: ${ENVIRONMENT}${NC}"
    
    # Show build size
    echo -e "${YELLOW}📊 Build size:${NC}"
    du -sh dist/*
else
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Build process completed!${NC}"
