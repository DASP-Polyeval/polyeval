# PolyEval - Multilingual Model Evaluation Platform

PolyEval is a comprehensive web-based platform for visualizing and analyzing the performance of multilingual language models across different languages and scripts. It provides interactive visualizations, custom evaluation capabilities, and detailed performance analysis tools.

## Features

### 1. Data Visualization
- Interactive visualization of model performance across different languages
- Support for multiple visualization modes:
  - Model-centric view: Compare a single model's performance across languages
  - Language-centric view: Compare multiple models' performance for specific languages
- Resource-based grouping of languages (High, Medium-High, Medium, Medium-Low, Low, Unseen)
- Downloadable visualizations in PNG format
- Support for various benchmarks and metrics:
  - Text Classification (SIB-200, Taxi-1500)
  - Machine Translation (Flores200)
  - Text Summarization (XLSum)
  - Open-ended Chat (Aya, PolyWrite)
  - Machine Comprehension (BELEBELE, arc_multilingual)
  - Intrinsic Evaluation (glot500, pbc)

### 2. Custom Evaluation
- Upload and execute custom evaluator scripts (Python/JavaScript)
- Support for custom evaluation metrics
- Download custom evaluation results in JSON format

### 3. Model Performance Analysis
- Upload custom model performance data via CSV
- Hierarchical language selection interface
- Filtering by model or language
- Resource group-based analysis
- Interactive data exploration

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.7 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/polyeval.git
cd polyeval
```

2. Set up the frontend:
```bash
cd frontend
npm install
```

3. Set up the backend:
```bash
cd ../server
pip install -r requirements.txt
npm install
```

### Running the Application

1. Start the backend server:
```bash
# In the server directory
python app.py
```
The server will start on http://localhost:3001

2. Start the frontend development server:
```bash
# In the frontend directory
npm start
```
The application will be available at http://localhost:3000

## Security Considerations

### Custom Evaluator Upload
The platform allows users to upload custom evaluator scripts, which presents several security considerations:

1. **Code Execution Risk**:
   - Uploaded evaluator scripts run in a sandboxed environment
   - However, malicious code could potentially:
     - Access system resources
     - Perform unauthorized operations
     - Execute harmful commands

2. **Best Practices**:
   - Only upload evaluator scripts from trusted sources
   - Review code before execution
   - Avoid scripts that require external dependencies
   - Don't include sensitive information in evaluator scripts

3. **Data Privacy**:
   - Be cautious with data used in evaluations
   - Don't process sensitive or personal information
   - Be aware of data retention policies

### CSV Data Upload
When uploading model performance data:

1. **Data Validation**:
   - Ensure CSV files follow the required format
   - Validate data types and ranges
   - Check for malformed or malicious content

2. **File Size Limits**:
   - CSV files should be reasonably sized
   - Large files may impact performance

## Data Format Specifications

### Model Performance CSV Format
```csv
Model,Avg,ace_Arab,ace_Latn,acm_Arab,...
ModelName,78.5,82.3,75.6,79.1,...
```
- First row: Header with language codes
- Subsequent rows: Model performance data
- Values: Float numbers representing performance metrics

### Custom Evaluator Format
Python evaluators should define:
```python
def evaluate(output, target):
    # Evaluation logic here
    return {
        'score': float,
        'analysis': dict
    }
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/Feature`)
3. Commit your changes (`git commit -m 'Add some Feature'`)
4. Push to the branch (`git push origin feature/Feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- React for the frontend framework
- Flask for the backend server
- All contributors and evaluators
- Shaoxiong Ji, Mengjie Wang, Praneeth Varma, Samea Yusofi, Sawal Devkota, Ananda Sreenidhi
