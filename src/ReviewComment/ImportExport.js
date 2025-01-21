import React from 'react';
import { saveAs } from 'file-saver';

const ImportExport = ({ comments, onImport }) => {
  const handleExport = () => {
    const jsonBlob = new Blob([JSON.stringify(comments, null, 2)], { type: 'application/json' });
    saveAs(jsonBlob, 'comments.json');
  };

  return (
    <div>
      <button onClick={handleExport}>Export to JSON</button>
      <input
        type="file"
        accept=".json"
        onChange={onImport}
        style={{ display: 'block', marginTop: '10px' }}
      />
    </div>
  );
};

export default ImportExport;