from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json
import importlib.util
import sys

app = Flask(__name__)

# Configure CORS
CORS(app, supports_credentials=True)

# Add CORS headers to all responses
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# Configure upload and output directories
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
OUTPUT_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'outputs')

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER

# Ensure directories exist
for folder in [UPLOAD_FOLDER, OUTPUT_FOLDER]:
    if not os.path.exists(folder):
        os.makedirs(folder)

def load_python_evaluator(filepath):
    spec = importlib.util.spec_from_file_location("evaluator", filepath)
    module = importlib.util.module_from_spec(spec)
    sys.modules["evaluator"] = module
    spec.loader.exec_module(module)
    return module.evaluate

def load_javascript_evaluator(filepath):
    # For JavaScript files, we'll need to use Node.js
    # This is a placeholder - you'll need to implement Node.js execution
    pass

def process_evaluation(evaluator_path, jsonl_path):
    try:
        # Load the appropriate evaluator based on file extension
        if evaluator_path.endswith('.py'):
            evaluate_func = load_python_evaluator(evaluator_path)
        elif evaluator_path.endswith('.js'):
            evaluate_func = load_javascript_evaluator(evaluator_path)
        else:
            raise ValueError("Unsupported evaluator file type")
        
        results = []
        # Process each line in the JSONL file
        with open(jsonl_path, 'r', encoding='utf-8') as f:
            for line in f:
                try:
                    json_data = json.loads(line.strip())
                    # Evaluate the data
                    if evaluator_path.endswith('.py'):
                        result = evaluate_func(json_data)
                    else:
                        # Handle JavaScript evaluation
                        result = {"error": "JavaScript evaluation not yet implemented"}
                    results.append(result)
                except json.JSONDecodeError:
                    results.append({"error": "Invalid JSON line"})
                except Exception as e:
                    results.append({"error": f"Evaluation error: {str(e)}"})
        
        # Save results to output file
        output_path = os.path.join(app.config['OUTPUT_FOLDER'], 'evaluation_results.json')
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2)
        
        return {
            "message": "Evaluation completed successfully",
            "results": results,
            "output_file": "evaluation_results.json"
        }
        
    except Exception as e:
        raise Exception(f"Error during evaluation: {str(e)}")

@app.route('/api/evaluator/upload', methods=['POST', 'OPTIONS'])
def upload_file():
    if request.method == "OPTIONS":
        return jsonify({"msg": "ok"}), 200
    
    # Check if both files are present
    if 'evaluator' not in request.files or 'jsonl_file' not in request.files:
        return jsonify({"error": "Both evaluator and JSONL files are required"}), 400
    
    evaluator_file = request.files['evaluator']
    jsonl_file = request.files['jsonl_file']
    
    # Check if files are selected
    if evaluator_file.filename == '' or jsonl_file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    
    # Validate file extensions
    if not (evaluator_file.filename.endswith('.py') or evaluator_file.filename.endswith('.js')):
        return jsonify({"error": "Evaluator must be a .py or .js file"}), 400
    
    if not jsonl_file.filename.endswith('.jsonl'):
        return jsonify({"error": "Data file must be a .jsonl file"}), 400
    
    try:
        # Save the evaluator file
        evaluator_path = os.path.join(app.config['UPLOAD_FOLDER'], 'evaluator' + os.path.splitext(evaluator_file.filename)[1])
        evaluator_file.save(evaluator_path)
        
        # Save the JSONL file
        jsonl_path = os.path.join(app.config['UPLOAD_FOLDER'], 'data.jsonl')
        jsonl_file.save(jsonl_path)
        
        # Process the files and get results
        results = process_evaluation(evaluator_path, jsonl_path)
        
        return jsonify(results), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=3001, debug=True)