#!/bin/bash

curl --request POST \
  --url https://api.air.ai/v1/calls \
  --header 'Accept: application/json' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6Im9yZ18yYXJGN3NYdFZ0YVZKd0tWNUNwYVJHRmx1WXEiLCJpYXQiOjE3MDc3ODE2MzF9.vcTlgOzFtjOsiDBX3L4VlDuKDM_poWwz4R4PKmZLyvY' \
  --header 'Content-Type: application/json' \
  --data '{
  "promptId": 23,
  "phone": "3854509574",
  "name": "Lucas Draney",
  "metadata": {}
}'
