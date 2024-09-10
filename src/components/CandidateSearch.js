"use client";
import React, { useState } from 'react';
import axios from 'axios';

const CandidateSearch = () => {
  const [prompt, setPrompt] = useState('');
  const [candidateDetails, setCandidateDetails] = useState([]);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the prompt to the backend
      setCandidateDetails([]);
      const response = await axios.get('http://127.0.0.1:5001/get-candidates', {
        params: { prompt }  // Include the prompt as a query parameter
      });
      // Set the candidate details received from the backend
      setCandidateDetails(response.data.candidates);
    } catch (error) {
      console.error('Error fetching candidate details:', error);
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={handleInputChange}
          placeholder="Enter your search prompt"
          required
        />
        <button type="submit">Search</button>
      </form>

      {/* Display the candidate details */}
      {candidateDetails?.length > 0 && (
        <div>
          <h2>Candidate Details:</h2>
          <ul>
            {candidateDetails.map((candidate, index) => (
              <li key={index}>
                <strong>Name:</strong> {candidate.name} <br />
                <strong>Headline:</strong> {candidate.headline} <br />
                <strong>Schools:</strong> {candidate.schools} <br />
                <strong>Location:</strong> {candidate.location} <br />
                <strong>Skills:</strong> {candidate.skills} <br />
                <strong>Company Details:</strong> {candidate.company_details} <br />
                <strong>Profile URL:</strong> <a href={candidate.profile_url} target="_blank" rel="noopener noreferrer">{candidate.profile_url}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
