#!/bin/bash

PROMPT_ID=64808
PHONE="3854509574"
NAME="Lucas"

if [ -z "$AIR_API_KEY" ]; then
  echo "Error: AIR_API_KEY is not set."
  exit 1
fi

# The URL of Flask application's initiate_call endpoint
# URL="http://localhost:8050/initiate_call"
URL="https://api.air.ai/v1/calls"

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

