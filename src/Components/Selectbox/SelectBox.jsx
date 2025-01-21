import React, { useState } from 'react';
import Summarization from "./../Summarization/Summarization";
import "./../Selectbox/SelectBox.css";

function SelectBox() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (

    <div className='selectbox'>
      <label htmlFor="options" style={{ marginRight: '15px' }}>Select a Task:</label>
      <select id="options" value={selectedOption} onChange={handleChange}>
        <option value="" disabled>Select an option</option>
        <option value="Option 1">Translation</option>
        <option value="Option 2">Summarization</option>
        <option value="Option 3">Chat</option>
      </select>

      {selectedOption && (
        <div style={{ marginTop: '10px' }}>
            {<Summarization />}
        </div>
      )}

      
    </div>
  );
}

export default SelectBox;
