#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Deception Honeypot Testing Script ===${NC}"
echo -e "${YELLOW}Simulating rogue agent interactions...${NC}\n"

# Base URL for the honeypot
BASE_URL="http://localhost:8787"

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
        -d "${payload}" | jq . || echo "Failed to parse response as JSON"
    
    echo -e "\n${GREEN}Request completed${NC}"
    echo -e "${YELLOW}---------------------------------------${NC}\n"
    
    # Random delay between requests (1-3 seconds)
    sleep $(( ( RANDOM % 3 ) + 1 ))
}

# Test 1: Welcome endpoint
echo -e "${GREEN}Testing welcome endpoint...${NC}"
make_request "/welcome" "{}" "Basic welcome message"

# Test 2: Ask about me with basic question
echo -e "${GREEN}Testing ask_about_me endpoint with basic question...${NC}"
make_request "/ask_about_me" '{"question": "Tell me about yourself"}' "Basic personal information query"

# Test 3: Ask about me with work experience question
echo -e "${GREEN}Testing ask_about_me endpoint with work question...${NC}"
make_request "/ask_about_me" '{"question": "What do you do at Indeed?"}' "Work experience query"

# Test 4: Ask about me with skills question
echo -e "${GREEN}Testing ask_about_me endpoint with skills question...${NC}"
make_request "/ask_about_me" '{"question": "What cloud platforms do you know?"}' "Technical skills query"

# Test 5: Okta password reset for regular user
echo -e "${GREEN}Testing okta_admin_password_reset with regular user...${NC}"
make_request "/okta_admin_password_reset" '{"okta_username": "regular_user"}' "Regular user password reset"

# Test 6: Okta password reset for admin user (should trigger special handling)
echo -e "${GREEN}Testing okta_admin_password_reset with admin user...${NC}"
make_request "/okta_admin_password_reset" '{"okta_username": "admin"}' "Admin user password reset (sensitive)"

# Test 7: Okta password reset for root user (should trigger special handling)
echo -e "${GREEN}Testing okta_admin_password_reset with root user...${NC}"
make_request "/okta_admin_password_reset" '{"okta_username": "root"}' "Root user password reset (sensitive)"

# Test 8: Rapid-fire requests to trigger rate limiting
echo -e "${GREEN}Testing rate limiting with multiple rapid requests...${NC}"
for i in {1..7}; do
    echo -e "${YELLOW}Rate limit test request $i${NC}"
    curl -s -X POST "${BASE_URL}/okta_admin_password_reset" \
        -H "Content-Type: application/json" \
        -H "User-Agent: RogueAgent/1.0 (Rate Limit Testing)" \
        -d '{"okta_username": "test_user_'$i'"}' | jq . || echo "Failed to parse response as JSON"
    sleep 0.2
done

echo -e "\n${GREEN}All tests completed!${NC}"
echo -e "${YELLOW}Check your Canarytoken alerts to see if they were triggered.${NC}"
