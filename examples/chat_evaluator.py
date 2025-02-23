import json
from collections import Counter
import re
from typing import Dict, List, Any

def count_chars_in_range(text: str, start: int, end: int) -> int:
    """Count characters in a Unicode range."""
    return sum(1 for c in text if start <= ord(c) <= end)

def detect_script(text: str) -> str:
    """Detect the dominant script in the text."""
    # Count characters in different Unicode ranges
    arabic_count = count_chars_in_range(text, 0x0600, 0x06FF)  # Arabic
    jawi_count = count_chars_in_range(text, 0x0600, 0x06FF)    # Jawi uses Arabic range
    persian_count = count_chars_in_range(text, 0xFB50, 0xFDFF)  # Arabic Presentation Forms-A
    persian_count += count_chars_in_range(text, 0xFE70, 0xFEFF) # Arabic Presentation Forms-B
    
    # Add Persian-specific characters to Persian count
    persian_specific = {'گ', 'چ', 'پ', 'ژ'}
    persian_count += sum(1 for c in text if c in persian_specific)
    
    counts = {
        'arabic': arabic_count,
        'jawi': jawi_count,
        'persian': persian_count
    }
    
    if not any(counts.values()):
        return 'unknown'
    
    return max(counts.items(), key=lambda x: x[1])[0]

def analyze_response_length(output: str, target: str) -> Dict[str, Any]:
    """Analyze the length characteristics of the response."""
    # Split on whitespace and common Arabic/Persian punctuation
    split_pattern = r'[\s\u060C\u061B\u061F\.]+'
    
    output_words = len([w for w in re.split(split_pattern, output) if w])
    target_words = len([w for w in re.split(split_pattern, target) if w])
    
    length_ratio = output_words / target_words if target_words > 0 else 0
    
    return {
        'output_length': output_words,
        'target_length': target_words,
        'length_ratio': round(length_ratio, 2),
        'length_match': 0.8 <= length_ratio <= 1.2  # Consider it a match if within 20% of target length
    }

def analyze_script_consistency(input_text: str, output: str, target: str) -> Dict[str, Any]:
    """Analyze script consistency between input, output, and target."""
    input_script = detect_script(input_text)
    output_script = detect_script(output)
    target_script = detect_script(target)
    
    return {
        'input_script': input_script,
        'output_script': output_script,
        'target_script': target_script,
        'script_match': output_script == target_script,
        'correct_script_used': output_script == input_script
    }

def analyze_response_structure(output: str) -> Dict[str, Any]:
    """Analyze structural elements of the response."""
    # Split into words considering Arabic/Persian text
    words = [w for w in re.split(r'[\s\u060C\u061B\u061F\.]+', output) if w]
    
    # Count repeated words
    word_counts = Counter(words)
    repetitions = sum(1 for count in word_counts.values() if count > 1)
    
    # Check for common formatting elements
    has_numbering = bool(re.search(r'[\d١-٩][\)\.]\s', output))  # Include Arabic numerals
    has_bullets = '*' in output or '•' in output or '-' in output
    has_newlines = '\n' in output
    
    return {
        'repetitions': repetitions,
        'has_formatting': {
            'numbered_list': has_numbering,
            'bullets': has_bullets,
            'multiple_lines': has_newlines
        }
    }

def evaluate(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Evaluate the chat response based on multiple criteria.
    """
    try:
        input_text = data.get('input', '')
        output = data.get('output', '')
        target = data.get('target', '')
        model_name = data.get('model_name', '')
        
        # Perform various analyses
        length_analysis = analyze_response_length(output, target)
        script_analysis = analyze_script_consistency(input_text, output, target)
        structure_analysis = analyze_response_structure(output)
        
        # Calculate overall quality score (0-100)
        quality_score = 0
        if script_analysis['script_match']:
            quality_score += 40  # Script matching is very important
        if script_analysis['correct_script_used']:
            quality_score += 20  # Using same script as input
        if length_analysis['length_match']:
            quality_score += 20  # Length within reasonable bounds
        if structure_analysis['repetitions'] < 3:  # Allow some repetition
            quality_score += 10  # No excessive repetitions
        if any(structure_analysis['has_formatting'].values()):
            quality_score += 10  # Good formatting
        
        # Compile results
        evaluation_results = {
            'model_name': model_name,
            'quality_score': quality_score,
            'script_analysis': script_analysis,
            'length_analysis': length_analysis,
            'structure_analysis': structure_analysis,
            'flags': {
                'wrong_script': not script_analysis['script_match'],
                'length_mismatch': not length_analysis['length_match'],
                'excessive_repetition': structure_analysis['repetitions'] > 2,
            }
        }
        
        return evaluation_results
    except Exception as e:
        return {'error': str(e)}
