const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const cors = require('cors');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

router.use(cors());

// Handle file upload
router.post('/upload', upload.single('evaluator'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const fileExt = path.extname(file.originalname).toLowerCase();
    
    if (fileExt !== '.py' && fileExt !== '.js') {
        fs.unlinkSync(file.path); // Clean up
        return res.status(400).json({ error: 'Only .py and .js files are allowed' });
    }

    const newPath = path.join(uploadsDir, file.originalname);
    fs.renameSync(file.path, newPath);
    
    res.json({ 
        success: true, 
        filename: file.originalname,
        message: 'File uploaded successfully'
    });
});

// Handle evaluation
router.post('/evaluate', express.json(), async (req, res) => {
    const { filename, jsonlData } = req.body;
    
    if (!filename || !jsonlData) {
        return res.status(400).json({ error: 'Missing filename or JSONL data' });
    }

    const filePath = path.join(uploadsDir, filename);
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Evaluator file not found' });
    }

    const fileExt = path.extname(filename).toLowerCase();

    try {
        if (fileExt === '.py') {
            // Write JSONL data to temporary file
            const tempJsonlPath = path.join(uploadsDir, 'temp.jsonl');
            fs.writeFileSync(tempJsonlPath, jsonlData);

            // Execute Python script
            exec(`python "${filePath}" "${tempJsonlPath}"`, (error, stdout, stderr) => {
                // Clean up temp file
                fs.unlinkSync(tempJsonlPath);

                if (error) {
                    return res.status(500).json({ error: stderr });
                }
                try {
                    const result = JSON.parse(stdout);
                    res.json({ result });
                } catch (e) {
                    res.status(500).json({ error: 'Invalid output from evaluator' });
                }
            });
        } else {
            // For JavaScript files
            const evaluator = require(filePath);
            if (typeof evaluator.evaluate !== 'function') {
                return res.status(400).json({ error: 'No evaluate() function found in file' });
            }

            const jsonlLines = jsonlData.split('\n').filter(line => line.trim());
            const data = jsonlLines.map(line => JSON.parse(line));
            const result = evaluator.evaluate(data);
            res.json({ result });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
