#!/bin/bash

# Replace these variables with actual values
PROMPT_ID=1
PHONE="3854509574"  # Example phone number, replace with a real number for actual testing
NAME="John Doe"

# Ensure the AIR_API_KEY environment variable is set before running this script
if [ -z "$AIR_API_KEY" ]; then
  echo "Error: AIR_API_KEY is not set."
  exit 1
fi

# The URL of your Flask application's initiate_call endpoint
URL="http://localhost:8050/initiate_call"

# Make the POST request
curl --request POST \
  --url $URL \
  --header "Accept: application/json" \
  --header "Authorization: Bearer $AIR_API_KEY" \
  --header "Content-Type: application/json" \
  --data "{
    \"promptId\": $PROMPT_ID,
    \"phone\": \"$PHONE\",
    \"name\": \"$NAME\",
    \"metadata\": {}
  }"



