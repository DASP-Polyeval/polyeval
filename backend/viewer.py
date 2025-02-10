from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS
import json
from deep_translator import (GoogleTranslator,single_detection)
import re

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

# Database configuration
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(BASE_DIR, 'outputs.db')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# Database models
class Output(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    task_type= db.Column(db.String(50), nullable=False)
    benchmark = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    language = db.Column(db.String(20), nullable=False)
    path = db.Column(db.String(200), nullable=False)
    file_id = db.Column(db.String(50), unique=True, nullable=False)

    def __repr__(self):
        return f"<Output {self.benchmark} - {self.model} - {self.language}>"

TASK_BENCHMARK_MAP = {
    "classification": ["SIB-200"],
    "translation": ["Flores-200"],
    "summarization": ["XLSum"],
    "generation": ["Aya"]
}

# Initialize the database
def init_db():
        with app.app_context():
            db.create_all()

# Function to scan directory and update database
def generate_index_json(root_dir):
    """Sync the database with the directory structure."""
    with app.app_context():
        index = {}
        for task_type, benchmarks in TASK_BENCHMARK_MAP.items():
            index[task_type] = {}  # initialize task_type
            
            for benchmark in benchmarks:
                benchmark_path = os.path.join(root_dir, benchmark)
                index[task_type][benchmark] = {}  # initialize benchmark

                if not os.path.exists(benchmark_path):
                    continue

                # handle the translation task differently
                if task_type == "translation":
                    for lang_type_folder in os.listdir(benchmark_path):
                        lang_path = os.path.join(benchmark_path, lang_type_folder)
                        if not os.path.isdir(lang_path):
                            continue

                        for model in os.listdir(lang_path):
                            model_path = os.path.join(lang_path, model)
                            if not os.path.isdir(model_path):
                                continue

                            index[task_type][benchmark][model] = []
                            for file in os.listdir(model_path):
                                if file.endswith(".jsonl"):
                                    language = file.replace(".jsonl", "")
                                    index[task_type][benchmark][model].append(language)

                                    file_path = os.path.join(model_path, file)
                                    record = Output.query.filter_by(path=file_path).first()
                                    if not record:
                                        new_entry = Output(
                                            task_type=task_type,
                                            benchmark=benchmark,
                                            model=model,
                                            language=language,
                                            path=file_path,
                                            file_id=f"{task_type}-{benchmark}-{model}-{language}"
                                        )
                                        db.session.add(new_entry)

                else:
                    # handle other task type
                    for model in os.listdir(benchmark_path):
                        model_path = os.path.join(benchmark_path, model)
                        if not os.path.isdir(model_path):
                            continue

                        index[task_type][benchmark][model] = []
                        for file in os.listdir(model_path):
                            if file.endswith(".jsonl"):
                                language = file.replace(".jsonl", "")
                                index[task_type][benchmark][model].append(language)

                                file_path = os.path.join(model_path, file)
                                record = Output.query.filter_by(path=file_path).first()
                                if not record:
                                    new_entry = Output(
                                        task_type=task_type,
                                        benchmark=benchmark,
                                        model=model,
                                        language=language,
                                        path=file_path,
                                        file_id= f"{task_type}-{benchmark}-{model}-{language}"
                                    )
                                    db.session.add(new_entry)

        db.session.commit()
    with open("path_structure.json", "w") as f:
        json.dump(index, f, indent=4)

# Get the options for the dropdowns 
@app.route("/api/options", methods=["POST"])
def get_options():
    data = request.json
    selected_benchmark = data.get("benchmark")  # selected benchmark
    selected_model = data.get("model")  # selected model
    selected_language = data.get("language")  # Selected language
    selected_task_type = data.get("task_type") # Selected task type
    # dynamically query task_type
    task_types_query = Output.query
    if selected_benchmark:
        task_types_query = task_types_query.filter_by(benchmark=selected_benchmark)
    if selected_model:
        task_types_query = task_types_query.filter_by(model=selected_model)
    if selected_language:
        task_types_query = task_types_query.filter_by(language=selected_language)
    task_types = [row.task_type for row in task_types_query.distinct()]

    # dynamically query benchmark
    benchmarks_query = Output.query
    if selected_task_type:
        benchmarks_query = benchmarks_query.filter_by(task_type=selected_task_type)
    if selected_model:
        benchmarks_query = benchmarks_query.filter_by(model=selected_model)
    if selected_language:
        benchmarks_query = benchmarks_query.filter_by(language=selected_language)
    benchmarks = [row.benchmark for row in benchmarks_query.distinct()]

    # dynamically query model
    models_query = Output.query
    if selected_task_type:
        models_query = models_query.filter_by(task_type=selected_task_type)
    if selected_benchmark:
        models_query = models_query.filter_by(benchmark=selected_benchmark)
    if selected_language:
        models_query = models_query.filter_by(language=selected_language)
    models = [row.model for row in models_query.distinct()]

    # dynamically query language
    languages_query = Output.query
    if selected_task_type:
        languages_query = languages_query.filter_by(task_type=selected_task_type)
    if selected_benchmark:
        languages_query = languages_query.filter_by(benchmark=selected_benchmark)
    if selected_model:
        languages_query = languages_query.filter_by(model=selected_model)
    languages = [row.language for row in languages_query.distinct()]

    return jsonify({
        "task_types": task_types,
        "benchmarks": benchmarks,
        "models": models,
        "languages": languages
    })

@app.route("/api/get-json", methods=["POST"])
def get_json():
    try:
        data = request.json
        task_type, benchmark, model, language = data.get("task_type"), data.get("benchmark"), data.get("model"), data.get("language")
        
        # Query the database for the matching record
        record = Output.query.filter_by(benchmark=benchmark, model=model, language=language).first()
        if record:
            if os.path.exists(record.path):
                with open(record.path, "r", encoding="utf-8") as file:
                    json_array = [json.loads(line) for line in file.readlines()]
                    table_data = [
                        {**row, "task_type": record.task_type, "unique_id": f"{record.file_id}-{i + 1}"}
                        for i, row in enumerate(json_array)
                    ]
                    
                              
                # according to the task_type, we need to process the data differently
                # for classification task
                if task_type == "classification":
                    
                    headers = ["ID","Prompt", "Predicted_Category","Correct_Category" ] 
                    processed_data = [
                        {"ID": row.get("unique_id"),
                         "task_type": row.get("task_type"),
                        "Prompt": row.get("prompt"),
                         "Predicted_Category":row.get("predicted_category"),
                         "Correct_Category": row.get("correct_category"), 
                        # "Confidence": row.get("confidence"), 
                         }
                         for row in table_data
                        if row.get("predicted_category") != row.get("correct_category") 
                    ]
                # for generation task  
                if task_type == "generation":
                    
                    headers = ["ID","Prompt", "Generated_Text", "Target_Text"] 
                    processed_data = [
                        {"ID": row.get("unique_id"),
                         "task_type": row.get("task_type"),
                        "Prompt": row.get("input"), 
                        "Generated_Text": row.get("output"), 
                        "Target_Text": row.get("target")}
                        for row in table_data
                    ]
                
                # for translation task
                if task_type == "translation":

                    headers = ["ID","Prompt", "Source_Text", "Translated_Text", "Reference_Text"]
                    processed_data = [
                        {"ID": row.get("unique_id"),
                         "task_type": row.get("task_type"),
                        "Prompt": row.get("prompt"),
                        "Source_Text": row.get("src_text"), 
                        "Translated_Text": row.get("hyp_text"), 
                        "Reference_Text": row.get("ref_text")}
                        for row in table_data
                    ]

                # for summarization task
                if task_type == "summarization":
                    headers = ["ID","Document", "Summary", "Target"]
                    processed_data = [
                        {"ID": row.get("unique_id"),
                         "task_type": row.get("task_type"),
                        "Document": row.get("input"), 
                        "Summary": row.get("output"), 
                        "Target": row.get("target")}
                        for row in table_data
                    ]
                
                return jsonify({
                    "task_type": record.task_type,
                    "json_data": processed_data,
                    "headers": headers
                    })
            
            return jsonify({"error": "File not found","path":os.path.abspath(record.path)}), 404
            
        return jsonify({"error": "No matching record"}), 404

    except UnicodeDecodeError as e:
        error_message = f"Unicode decoding error: {str(e)}"
        print(error_message)  
        return jsonify({"error": error_message}), 500

    except Exception as e:
        error_message = f"Unexpected error: {str(e)}"
        print(error_message)  
        return jsonify({"error": error_message}), 500

def detect_non_english_sentences(text):
    #detect the non-english sentences
    sentences = re.split(r'(?<=[.!?])\s+', text) 
    non_english_sentences = []

    for sentence in sentences:
        if len(sentence.strip()) < 5:  # ignore short sentences
            continue
        try:
            detected_lang = single_detection(sentence, api_key='29427c1051d48bff41807e59335cd649')
            if detected_lang != "en":  
                non_english_sentences.append((sentence, detected_lang))
        except Exception as e:
            print(f"failed to detect language for sentence: {sentence} - error: {e}")
    
    return non_english_sentences

LANGS_DICT = GoogleTranslator().get_supported_languages(as_dict=True)
SUPPORTED_LANGUAGES = list(LANGS_DICT.values())
@app.route('/api/translate', methods=['POST'])
def translation():
    try:
        # Receive JSON data from the frontend
        data = request.get_json()
        print("Received data:", data)  # Add logging for debugging
        
        # Extract the sentence to be translated and the target language
        text = data.get('text')
        target_lang = data.get('target_lang', 'en')  # Default to translating into English
        
        if not text:
            print("No text provided for translation.")
            return jsonify({"error": "No text provided for translation."}), 400
        non_english = detect_non_english_sentences(text)
        
        # get the detected language
        detected_lang = non_english[0][1] if non_english else "en"
        print(f"non-en text: {non_english}")

        if detected_lang not in SUPPORTED_LANGUAGES:
            print(f"GoogleTranslate does not support the language {SUPPORTED_LANGUAGES}")
            return jsonify({"error": "GoogleTranslate does not support the language"}), 400

        # Perform translation using Google Translate
        translated_text = []
        for sentence, _ in non_english:
            translated = GoogleTranslator(source='auto', target="en").translate(sentence)
            translated_text.append((sentence, translated))

        # translated_text = GoogleTranslator(source='auto', target=target_lang).translate(text)
        

        # Return the translation result
        return jsonify({
            "detected_lang": detected_lang,
            "original_text": [item[0] for item in translated_text],
            "translated_text": [item[1] for item in translated_text],
            "target_lang": target_lang           
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Entry point for the script
if __name__ == "__main__":
    with app.app_context(): 
        init_db()  # Initialize database with sample data
        output_folder = "outputs"
        current_dir = os.path.dirname(__file__)
        path=os.path.join(current_dir,output_folder)
        generate_index_json(path)
    app.run(debug=True,port=5001)