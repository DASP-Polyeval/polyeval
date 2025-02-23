/**
 * Evaluate model performance on the given data
 * @param {Array} data - Array of objects containing predictions and true labels
 * @returns {Object} Evaluation metrics
 */
exports.evaluate = function(data) {
    const metrics = {
        total_samples: data.length,
        correct: 0,
        incorrect: 0,
        accuracy: 0.0,
        per_class: {}
    };
    
    for (const item of data) {
        const trueLabel = item.true_label;
        const predLabel = item.predicted_label;
        
        if (trueLabel === predLabel) {
            metrics.correct++;
        } else {
            metrics.incorrect++;
        }
        
        // Per-class metrics
        if (!metrics.per_class[trueLabel]) {
            metrics.per_class[trueLabel] = {
                total: 0,
                correct: 0,
                accuracy: 0.0
            };
        }
        
        metrics.per_class[trueLabel].total++;
        if (trueLabel === predLabel) {
            metrics.per_class[trueLabel].correct++;
        }
    }
    
    // Calculate accuracies
    if (metrics.total_samples > 0) {
        metrics.accuracy = metrics.correct / metrics.total_samples;
    }
    
    for (const label in metrics.per_class) {
        const classTotal = metrics.per_class[label].total;
        if (classTotal > 0) {
            metrics.per_class[label].accuracy = 
                metrics.per_class[label].correct / classTotal;
        }
    }
    
    return metrics;
};
