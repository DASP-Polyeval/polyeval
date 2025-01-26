from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS
import json

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

    def __repr__(self):
        return f"<Output {self.benchmark} - {self.model} - {self.language}>"

# Initialize the database
def init_db():
        with app.app_context():
            db.create_all()

        # Example data (only insert if database is empty)
        if not Output.query.first():
            output_folder = "outputs"
            current_dir = os.path.dirname(__file__)

            example_data = [
                Output(task_type = "classification", benchmark="SIB-200", model="bloom-7b1", language="ace_Arab",
                       path=os.path.join(current_dir,output_folder, "SIB-200", "bloom-7b1", "ace_Arab.jsonl")),
                Output(task_type = "translation", benchmark="Flores-200", model="gemma-7b", language="eng_Latn-to-ace_Arab",
                       path=os.path.join(current_dir,output_folder, "Flores-200", "en-X","gemma-7b", "eng_Latn-to-ace_Arab.jsonl")),
                Output(task_type = "summarization", benchmark="XLSum", model="mGPT", language="amh_Ethi",
                       path=os.path.join(current_dir,output_folder, "XLSum", "mGPT", "amh_Ethi.jsonl")),
                Output(task_type = "generation", benchmark="Aya", model="bloomz-7b1", language="ace_Arab",
                       path=os.path.join(current_dir,output_folder, "Aya", "bloomz-7b1", "ace_Arab.jsonl")),
               
            ]
            db.session.bulk_save_objects(example_data)
            db.session.commit()

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
        task_type = data.get("task_type")
        benchmark = data.get("benchmark")
        model = data.get("model")
        language = data.get("language")
        

        # Query the database for the matching record
        record = Output.query.filter_by(benchmark=benchmark, model=model, language=language).first()
        if record:
            if os.path.exists(record.path):
                with open(record.path, "r", encoding="utf-8") as file:
                    json_array = [json.loads(line) for line in file.readlines()]
                    table_data = [
                        {**row, "task_type": record.task_type, "unique_id": f"{record.id}-{i + 1}"}
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


# Entry point for the script
if __name__ == "__main__":
    with app.app_context(): 
        init_db()  # Initialize database with sample data
    app.run(debug=True)