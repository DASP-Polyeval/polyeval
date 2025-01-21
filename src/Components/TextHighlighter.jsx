import React, { useState } from 'react';

function TextHighlighter() {
  // State to store the selected text range, the selected color, and annotations
  const [selection, setSelection] = useState(null);
  const [highlightColor, setHighlightColor] = useState('yellow');
  const [annotations, setAnnotations] = useState([]); // Array to store annotations
  const [undo, setUndo] = useState([]); // Track the history for undo

  // Mapping of colors to error types
  const errorType = {
    yellow: 'Grammar Error',
    lightblue: 'Spelling or Typographical Error',
    pink: 'Incoherent or Illogical',
    lightgreen: 'Off-topic or Irrelevant',
    red: 'Redundancy',
    orange: 'Ambiguity or Vagueness',
    brown: 'Cultural Sensitivity or Offensive Content',
  };

  // Handler function to capture the text selection
  const handleTextSelection = () => {
    const selectedText = window.getSelection();
    if (selectedText.toString().length > 0) { // Ensure that there is a selection
      const range = selectedText.getRangeAt(0); // Get the range of the selected text
      setSelection(range); // Store the selection in state
    }
  };

  // Function to apply a highlight color to selected text and save annotation
  const highlightText = () => {
    if (selection) {
      const span = document.createElement('span'); // Create a span to wrap selected text
      span.style.backgroundColor = highlightColor; // Apply the selected highlight color
      span.style.cursor = 'pointer'; // Optionally make it look interactive
      selection.surroundContents(span); // Surround the selected text with the span

      const parentElement = selection.commonAncestorContainer.nodeType === Node.TEXT_NODE
      ? selection.commonAncestorContainer.parentNode
      : selection.commonAncestorContainer;

    // Calculate starting and ending indices relative to the parent element
    const parentText = parentElement.textContent; // Full text of the parent element
    const selectedText = selection.toString();
    const starting_index = parentText.indexOf(selectedText, selection.startOffset);
    const ending_index = starting_index + selectedText.length;

      // Save the annotation
      const annotation = {
        text: selection.toString(),
        errorType: errorType[highlightColor],
        //element: span, // Store referent to the DOM element for undo
        span: [starting_index, ending_index],
        timestamp: new Date().toISOString(), // Optional timestamp
      };

      setAnnotations((prevAnnotations) => [...prevAnnotations, annotation]); // Add new annotation
      setUndo((prevStack) => [...prevStack, annotation]); // Add annotation to undo stack
      setSelection(null); // Reset the selection state
      
    }
  };

  // Function to handle color change
  const handleColorChange = (event) => {
    setHighlightColor(event.target.value); // Update the highlight color when user selects a color
  };

  // Function to undo last annotation
  const undoLastAnnotation = () =>{
    if(undo.length > 0) {
        const lastAnnotation = undo[undo.length - 1];

        // Remove the span and restore original text
        const parent = lastAnnotation.element.parentNode;
        while (lastAnnotation.element.firstChild){
            parent.insertBefore(lastAnnotation.element.firstChild, lastAnnotation.element);
        }
        parent.removeChild(lastAnnotation.element);

        // Update the state to remove the last annotation
        setAnnotations((prevAnnotations) => 
            prevAnnotations.filter((annotation) => annotation !== lastAnnotation)
        );
        setUndo((prevStack) => prevStack.slice(0, -1)); // Remove from undo stack

    }
  }

  // Function to export annotations as JSON
  const exportAnnotations = () => {
    const json = JSON.stringify(annotations, null, 2); // Convert annotations to JSON string
    const blob = new Blob([json], { type: 'application/json' }); // Create a Blob for the JSON file
    const url = URL.createObjectURL(blob); // Create a URL for the Blob
    const link = document.createElement('a'); // Create a temporary anchor element
    link.href = url;
    link.download = 'annotations.json'; // Name of the exported file
    document.body.appendChild(link); // Append the link to the document
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up the DOM
  };

  return (
    <div>
      <h1>Error Labeling</h1>
      <p>Select the text to label it as error and finally <strong>submit</strong> your annotation.</p>
      <p
        onMouseUp={handleTextSelection} // Detect when the user releases the mouse (after selecting text)
        style={{ padding: '10px', border: '1px solid #ccc', width: '90%', marginLeft: '30px' }}
      >
        Select some text in this paragraph to highlight it. This is just sample text to test the functionality. 
        Select some text in this paragraph to highlight it. This is just sample text to test the functionality.
        Select some text in this paragraph to highlight it. This is just sample text to test the functionality.
      </p>

      {(
        <div>
          <label htmlFor="colorPicker">Choose Error Type: </label>
          <select
            id="colorPicker"
            value={highlightColor}
            onChange={handleColorChange}
            style={{ marginLeft: '10px' }}
          >
            <option value="yellow">Grammar Error</option>
            <option value="lightblue">Spelling or Typographical Error</option>
            <option value="lightpink">Incoherent or Illogical</option>
            <option value="lightgreen">Off-topic or Irrelevant</option>
            <option value="red">Redundancy</option>
            <option value="orange">Ambiguity or Vagueness</option>
            <option value="brown">Cultural Sensitivity or Offensive Content</option>
          </select>

          <button
            onClick={highlightText}
            style={{ marginTop: '10px', marginLeft: '10px' }}
          >
            Label Selected Text
          </button>
          <br />

          <button
          onClick={undoLastAnnotation}
          style={{ marginTop: '10px', marginLeft: '10px' }}
          disabled={undo.length === 0} // Disable if no undo available
        >
          Undo
        </button>

          <button
            onClick={exportAnnotations}
            style={{ marginTop: '10px', marginLeft: '10px' }}
          >
            Export Annotations
          </button>
        </div>
      )}
    </div>
  );
}

export default TextHighlighter;
