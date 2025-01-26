from flask import Flask, request, jsonify
from deep_translator import GoogleTranslator
from flask_cors import CORS

# Create Flask application
translateInterface = Flask(__name__)
CORS(translateInterface)  # Allow cross-origin requests


@translateInterface.route('/translate', methods=['POST'])
def translation():
    try:
        # Receive JSON data from the frontend
        data = request.get_json()
        print("Received data:", data)  # Add logging for debugging
        
        # Extract the sentence to be translated and the target language
        text = data.get('text')
        target_lang = data.get('target_lang', 'en')  # Default to translating into English

        if not text:
            return jsonify({"error": "No text provided for translation."}), 400

        # Perform translation using Google Translate
        translated_text = GoogleTranslator(source='auto', target=target_lang).translate(text)

        # Return the translation result
        return jsonify({
            "original_text": text,
            "translated_text": translated_text,
            "target_lang": target_lang
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    translateInterface.run(debug=True)
