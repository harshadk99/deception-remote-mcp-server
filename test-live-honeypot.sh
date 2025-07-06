#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Deception Honeypot Testing Script (Live Version) ===${NC}"
echo -e "${YELLOW}Simulating rogue agent interactions against live server...${NC}\n"

# Base URL for the honeypot (using the live URL from README)
BASE_URL="https://deception-remote-mcp-server.harshad-surfer.workers.dev"

# Function to make requests with a delay
make_request() {
    local endpoint=$1
    local payload=$2
    local description=$3
    
    echo -e "${YELLOW}Test: ${description}${NC}"
    echo -e "Endpoint: ${endpoint}"
    echo -e "Payload: ${payload}\n"
    
    # Make the request
    curl -s -X POST "${BASE_URL}${endpoint}" \
        -H "Content-Type: application/json" \
        -H "User-Agent: RogueAgent/1.0 (Unauthorized Testing)" \
        -d "${payload}" | cat
    
    echo -e "\n${GREEN}Request completed${NC}"
    echo -e "${YELLOW}---------------------------------------${NC}\n"
    
    # Random delay between requests (1-3 seconds)
    sleep $(( ( RANDOM % 3 ) + 1 ))
}

# Test 1: Test SSE endpoint (MCP Protocol)
echo -e "${GREEN}Testing SSE endpoint for MCP protocol...${NC}"
echo -e "${YELLOW}Test: SSE connection establishment${NC}"
echo -e "Endpoint: /sse\n"

# Use timeout to limit the duration of the curl command
timeout 3 curl -N -H "Accept: text/event-stream" "${BASE_URL}/sse"

echo -e "\n${GREEN}SSE connection test completed${NC}"
echo -e "${BLUE}Note: SSE endpoint is working if you see 'event: endpoint' above${NC}"
echo -e "${YELLOW}---------------------------------------${NC}\n"

# Test 2: Test OPTIONS request for CORS headers
echo -e "${GREEN}Testing CORS headers...${NC}"
echo -e "${YELLOW}Test: OPTIONS request to check CORS headers${NC}"
echo -e "Endpoint: /sse\n"

# Make an OPTIONS request to check CORS headers
curl -s -I -X OPTIONS "${BASE_URL}/sse" \
    -H "Origin: https://playground.ai.cloudflare.com" \
    -H "Access-Control-Request-Method: GET"

echo -e "\n${GREEN}CORS headers test completed${NC}"
echo -e "${BLUE}Note: CORS is properly configured if you see 'Access-Control-Allow-Origin: *' above${NC}"
echo -e "${YELLOW}---------------------------------------${NC}\n"

# Test 3: Okta password reset for regular user
echo -e "${GREEN}Testing okta_admin_password_reset with regular user...${NC}"
make_request "/okta_admin_password_reset" '{"okta_username": "regular_user"}' "Regular user password reset"

# Test 4: Okta password reset for admin user (should trigger special handling)
echo -e "${GREEN}Testing okta_admin_password_reset with admin user...${NC}"
make_request "/okta_admin_password_reset" '{"okta_username": "admin"}' "Admin user password reset (sensitive)"

# Test 5: Okta password reset with suspicious input (path traversal attempt)
echo -e "${GREEN}Testing okta_admin_password_reset with suspicious input...${NC}"
make_request "/okta_admin_password_reset" '{"okta_username": "../../../etc/passwd"}' "Path traversal attempt"

# Test 6: Okta password reset with XSS attempt
echo -e "${GREEN}Testing okta_admin_password_reset with XSS attempt...${NC}"
make_request "/okta_admin_password_reset" '{"okta_username": "<script>alert(\"XSS\")</script>"}' "XSS injection attempt"

echo -e "\n${GREEN}All tests completed!${NC}"
echo -e "${YELLOW}Check your Canarytoken alerts to see if they were triggered.${NC}"
echo -e "${BLUE}Note: The welcome and ask_about_me tools are only accessible via MCP protocol through the SSE endpoint.${NC}"
