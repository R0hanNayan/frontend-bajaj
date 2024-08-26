import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post('https://backend-bajaj-cml3.onrender.com/bfhl', parsedInput);
      setResponseData(response.data);
      setError('');
      setShowDropdown(true); // Show dropdown after valid submission
    } catch (err) {
      console.error('POST request error:', err);
      setError('Invalid JSON or failed to connect to API');
      setShowDropdown(false); // Hide dropdown if submission fails
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedOptions((prev) => [...prev, value]);
    } else {
      setSelectedOptions((prev) => prev.filter((option) => option !== value));
    }
  };

  const renderFilteredResponse = () => {
    if (!responseData) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = responseData;
    const filteredResponse = {};

    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = numbers;
    }
    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = alphabets;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.highest_lowercase_alphabet = highest_lowercase_alphabet;
    }

    return (
      <div>
        {Object.entries(filteredResponse).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {JSON.stringify(value)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>JSON Input</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleJsonInputChange}
          rows="4"
          cols="50"
          placeholder='Enter JSON like {"data": ["A","C","z"]}'
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {showDropdown && (
        <div>
          <h2>Select Data to Display:</h2>
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="Highest lowercase alphabet"
              onChange={handleOptionChange}
            />
            Highest lowercase alphabet
          </label>
        </div>
      )}

      {renderFilteredResponse()}
    </div>
  );
};

export default App;
