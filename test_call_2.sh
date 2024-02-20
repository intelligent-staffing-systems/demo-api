#!/bin/bash

# API endpoint URL
API_URL="https://api.air.ai/v1/calls"

# API Token (Replace '123' with your actual API token)
API_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6Im9yZ18yYXJGN3NYdFZ0YVZKd0tWNUNwYVJHRmx1WXEiLCJpYXQiOjE3MDc3ODE2MzF9.vcTlgOzFtjOsiDBX3L4VlDuKDM_poWwz4R4PKmZLyvY"

# Request parameters
PROMPT_ID=1
PHONE="3854509574" # Replace with the actual phone number you wish to use
NAME="Lucas Draney" # Replace with the actual name

# Metadata object (adjust as necessary)
METADATA_JSON='{}' # Example empty JSON object

# Prepare and send the POST request
curl --request POST \
  --url $API_URL \
  --header "Accept: application/json" \
  --header "Authorization: Bearer $API_TOKEN" \
  --header "Content-Type: application/json" \
  --data "{
    \"promptId\": $PROMPT_ID,
    \"phone\": \"$PHONE\",
    \"name\": \"$NAME\",
    \"metadata\": $METADATA_JSON
  }"

