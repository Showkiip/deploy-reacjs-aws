"use client";

import React, { useState } from "react";
import axios from "axios";

const FetchCandidates = () => {
  const [prompt, setPrompt] = useState("");
  const [candidates, setCandidates] = useState([]);


  async function handleFetchCandidates(prompt) {
    console.log(prompt);
    try {
      const response = await axios.get("http://127.0.0.1:5001/api/get_encoded_data", {
        params: { prompt }
      });
      console.log(response)
      setCandidates(response.data.head);  // Adjust based on your response structure
      console.log(candidates)
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  }


  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">LinkedIn Candidate Fetcher</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter job description or skill set"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full md:w-1/2 mr-2"
        />
        <button
          onClick={handleFetchCandidates}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Fetch Candidates
        </button>
      </div>

      {candidates?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Candidate Results:</h2>
          <ul className="list-disc list-inside">
            {candidates.map((candidate, index) => (
              <li key={index} className="mb-2 p-2 bg-white border border-gray-200 rounded-lg shadow">
                <strong className="text-lg">{candidate.Country}</strong> - {candidate.Continent} (Age: {candidate.Age})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FetchCandidates;
