#!/usr/bin/env bash
# ============================================
# Tools That Work — SCP Deploy Script
# ============================================
# Usage: ./deploy.sh
#
# Fill in your server details below before running.
# This script uploads the static site to your VPS via SCP.
# ============================================

set -euo pipefail

# --- Configuration (fill these in) ---
REMOTE_USER="your_username"
REMOTE_HOST="your_server_ip_or_domain"
REMOTE_PORT="22"
REMOTE_PATH="/var/www/toolsthatwork.dev/html"
SSH_KEY="~/.ssh/id_rsa"

# --- Colors ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Tools That Work — Deploying to ${REMOTE_HOST}...${NC}"
echo ""

# Verify we are in the right directory
if [ ! -f "index.html" ]; then
  echo "Error: index.html not found. Run this script from the Tools That Work root directory."
  exit 1
fi

# Upload files via SCP
echo -e "Uploading files..."
scp -r -P "${REMOTE_PORT}" -i "${SSH_KEY}" \
  index.html \
  clipcraft.html \
  autotube.html \
  meshready.html \
  pricing.html \
  docs.html \
  about.html \
  contact.html \
  css/ \
  js/ \
  "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"

echo ""
echo -e "${GREEN}Deploy complete.${NC}"
echo -e "Site is live at: https://${REMOTE_HOST}"
