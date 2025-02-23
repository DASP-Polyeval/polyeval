import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Paper,
    CircularProgress,
    Alert,
} from '@mui/material';
import { Upload as UploadIcon, PlayArrow as PlayArrowIcon } from '@mui/icons-material';

const CustomEvaluator = () => {
    const [evaluatorFile, setEvaluatorFile] = useState(null);
    const [jsonlFile, setJsonlFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileSelection = (event, type) => {
        const file = event.target.files[0];
        if (!file) return;

        // Check file extension
        const fileExt = file.name.split('.').pop().toLowerCase();
        if (type === 'evaluator') {
            if (fileExt !== 'py' && fileExt !== 'js') {
                setError('Only Python (.py) and JavaScript (.js) files are allowed for evaluator');
                return;
            }
            setEvaluatorFile(file);
        } else if (type === 'jsonl') {
            if (fileExt !== 'jsonl') {
                setError('Only JSONL (.jsonl) files are allowed for data');
                return;
            }
            setJsonlFile(file);
        }
        setError(null);
    };

    const handleUploadAndEvaluate = async () => {
        if (!evaluatorFile || !jsonlFile) {
            setError('Please select both evaluator and JSONL files');
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            // Create FormData and append both files
            const formData = new FormData();
            formData.append('evaluator', evaluatorFile);
            formData.append('jsonl_file', jsonlFile);  

            // Upload both files and evaluate using the new combined endpoint
            const response = await fetch('/api/evaluator/upload', {  
                method: 'POST',
                body: formData,
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResult(data.results);
            setError(null);
        } catch (err) {
            setError('Failed to upload and evaluate: ' + err.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Box sx={{ mt: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                Custom Evaluation
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadIcon />}
                    >
                        Select Evaluator
                        <input
                            type="file"
                            hidden
                            accept=".py,.js"
                            onChange={(e) => handleFileSelection(e, 'evaluator')}
                        />
                    </Button>
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadIcon />}
                    >
                        Select JSONL
                        <input
                            type="file"
                            hidden
                            accept=".jsonl"
                            onChange={(e) => handleFileSelection(e, 'jsonl')}
                        />
                    </Button>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    onClick={handleUploadAndEvaluate}
                    disabled={!evaluatorFile || !jsonlFile || isUploading}
                    color="primary"
                >
                    {isUploading ? 'Processing...' : 'Upload and Evaluate'}
                </Button>
            </Box>

            {(evaluatorFile || jsonlFile) && (
                <Box sx={{ mb: 2 }}>
                    {evaluatorFile && (
                        <Alert severity="info" sx={{ mb: 1 }}>
                            Selected evaluator: {evaluatorFile.name}
                        </Alert>
                    )}
                    {jsonlFile && (
                        <Alert severity="info">
                            Selected JSONL: {jsonlFile.name}
                        </Alert>
                    )}
                </Box>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {result && (
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Evaluation Results
                    </Typography>
                    <pre style={{ 
                        backgroundColor: '#f5f5f5',
                        padding: '1rem',
                        borderRadius: '4px',
                        overflow: 'auto'
                    }}>
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </Paper>
            )}
        </Box>
    );
};

export default CustomEvaluator;
