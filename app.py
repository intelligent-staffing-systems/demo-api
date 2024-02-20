from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/initiate_call', methods=['POST'])
def initiate_call():
    # Extract data from incoming request
    data = request.json
    # Validation of incoming data goes here

    # External API request setup
    headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer 123',  # Replace with actual token
        'Content-Type': 'application/json',
    }
    payload = {
        "promptId": data.get('promptId'),
        "phone": data.get('phone'),
        "name": data.get('name'),
        "metadata": data.get('metadata', {}),
    }
    
    # Make POST request to external API
    response = requests.post('https://api.air.ai/v1/calls', json=payload, headers=headers)
    
    # Handle external API response
    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return jsonify({"error": "Failed to initiate call"}), response.status_code

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8050)

