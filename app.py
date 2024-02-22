from flask import Flask, request, jsonify
import os
import requests

app = Flask(__name__)

@app.route('/initiate_call', methods=['POST'])
def initiate_call():
    # Extract data from incoming request
    data = request.json
    prompt_id = data.get('promptId')
    phone = data.get('phone')
    name = data.get('name')
    
    # Ensure AIR_API_KEY is set
    air_api_key = os.environ.get('AIR_API_KEY')
    if not air_api_key:
        return jsonify({"error": "AIR_API_KEY is not set."}), 400
    
    # AIR API URL
    url = "https://api.air.ai/v1/calls"
    
    # Prepare the headers and payload for the AIR API request
    headers = {
        "Accept": "application/json",
        "Authorization": f"Bearer {air_api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "promptId": prompt_id,
        "phone": phone,
        "name": name,
        "metadata": {}
    }
    
    # Make the POST request to the AIR API
    response = requests.post(url, json=payload, headers=headers)
    
    # Check for successful request
    if response.status_code == 200:
        return jsonify({"message": "Call initiated successfully"}), 200
    else:
        return jsonify({"error": "Failed to initiate call", "details": response.text}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)

