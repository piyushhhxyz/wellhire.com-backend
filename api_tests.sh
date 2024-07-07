#!/bin/bash

# File: api_tests.sh

BASE_URL="http://localhost:4000/api"
TOKEN=""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to make API calls
call_api() {
    local method=$1
    local endpoint=$2
    local data=$3
    local auth_header=""

    if [ ! -z "$TOKEN" ]; then
        auth_header="-H \"Authorization: Bearer $TOKEN\""
    fi

    local command="curl -s -X $method \"$BASE_URL$endpoint\" \
        -H \"Content-Type: application/json\" \
        $auth_header \
        -d '$data'"

    local response=$(eval $command)
    echo $response
}

# Test user registration
echo -e "${GREEN}Testing user registration${NC}"
REGISTER_RESPONSE=$(call_api POST "/auth/register" '{"name":"Test User","email":"test@example.com","password":"password123"}')
echo $REGISTER_RESPONSE

# Test user login
echo -e "\n${GREEN}Testing user login${NC}"
LOGIN_RESPONSE=$(call_api POST "/auth/login" '{"email":"test@example.com","password":"password123"}')
echo $LOGIN_RESPONSE

# Extract token from login response
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | grep -o '[^"]*$')

if [ -z "$TOKEN" ]; then
    echo -e "${RED}Failed to obtain token. Exiting.${NC}"
    exit 1
fi

echo "Token obtained: $TOKEN"

# Test creating a company
echo -e "\n${GREEN}Testing company creation${NC}"
COMPANY_RESPONSE=$(call_api POST "/companies" '{"name":"Test Company","logo":"https://example.com/logo.png"}')
echo $COMPANY_RESPONSE

# Extract company ID
COMPANY_ID=$(echo $COMPANY_RESPONSE | grep -o '"id":[0-9]*' | grep -o '[0-9]*')

# Test getting all companies
echo -e "\n${GREEN}Testing get all companies${NC}"
call_api GET "/companies" ""

# Test getting a specific company
echo -e "\n${GREEN}Testing get specific company${NC}"
call_api GET "/companies/$COMPANY_ID" ""

# Test creating a college
echo -e "\n${GREEN}Testing college creation${NC}"
COLLEGE_RESPONSE=$(call_api POST "/colleges" '{"name":"Test College","logo":"https://example.com/college_logo.png"}')
echo $COLLEGE_RESPONSE

# Extract college ID
COLLEGE_ID=$(echo $COLLEGE_RESPONSE | grep -o '"id":[0-9]*' | grep -o '[0-9]*')

# Test getting all colleges
echo -e "\n${GREEN}Testing get all colleges${NC}"
call_api GET "/colleges" ""

# Test getting a specific college
echo -e "\n${GREEN}Testing get specific college${NC}"
call_api GET "/colleges/$COLLEGE_ID" ""

# Test creating an online assessment
echo -e "\n${GREEN}Testing online assessment creation${NC}"
OA_RESPONSE=$(call_api POST "/online-assessments" '{"companyName":"Test Company","collegeName":"Test College","year":2023,"pdfUrl":"https://example.com/test.pdf"}')
echo $OA_RESPONSE

# Extract online assessment ID
OA_ID=$(echo $OA_RESPONSE | grep -o '"id":[0-9]*' | grep -o '[0-9]*')

# Test getting all online assessments
echo -e "\n${GREEN}Testing get all online assessments${NC}"
call_api GET "/online-assessments" ""

# Test getting a specific online assessment
echo -e "\n${GREEN}Testing get specific online assessment${NC}"
call_api GET "/online-assessments/$OA_ID" ""

echo -e "\n${GREEN}All tests completed${NC}"