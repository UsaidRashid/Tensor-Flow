from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai


app = Flask(__name__)
CORS(app)  

@app.route('/api/process-speech', methods=['POST'])
def process_speech():

    apiKey = "AIzaSyDLzDcz_h9JAOFmJmOufB0YGVLYCQW27ZM"
    genai.configure(api_key=apiKey)
    model = genai.GenerativeModel('gemini-1.5-flash')

    data = request.get_json()
    user_text = data.get('text', '')
    print(f"Received text: {user_text}")  

    prompt = "Provide a concise and informative response to the following query, using only plain text and avoiding any special characters, symbols, or punctuation (only full stops & commas are allowed) :\n"+user_text


    response = model.generate_content(prompt)
    print(response.text)

    return jsonify({"message": "Text received successfully!","response":response.text})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
