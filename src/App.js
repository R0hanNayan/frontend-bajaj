import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [getResponse, setGetResponse] = useState(null);
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post('https://backend-bajaj-cml3.onrender.com/bfhl', parsedInput, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setResponseData(response.data);
      setError('');
    } catch (err) {
      console.error('POST request error:', err);
      setError('Invalid JSON or failed to connect to API');
    }
  };

  useEffect(() => {
    const fetchGetResponse = async () => {
      try {
        const response = await axios.get('https://backend-bajaj-cml3.onrender.com/bfhl');
        setGetResponse(response.data);
        setError('');
      } catch (err) {
        console.error('GET request error:', err);
        setError('Failed to connect to API for GET request');
      }
    };

    fetchGetResponse();
  }, []);

  return (
    <div>
      <h1>React Frontend with GET and POST</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Enter JSON input"
        />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {responseData && (
        <div>
          <h2>POST Response Data:</h2>
          <p>User ID: {responseData.user_id}</p>
          <p>Email: {responseData.email}</p>
          <p>Roll Number: {responseData.roll_number}</p>
          <p>Numbers: {responseData.numbers.join(', ')}</p>
          <p>Alphabets: {responseData.alphabets.join(', ')}</p>
          <p>Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet.join(', ')}</p>
        </div>
      )}

      {getResponse && (
        <div>
          <h2>GET Response Data:</h2>
          <p>Operation Code: {getResponse.operation_code}</p>
        </div>
      )}
    </div>
  );
};

export default App;
