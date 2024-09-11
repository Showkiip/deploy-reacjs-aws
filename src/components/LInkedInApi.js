"use client";

import React, { useState } from 'react';
import axios from 'axios';

const LInkedInApi = () => {
  const [title, setTitle] = useState('python developer');
  const [location, setLocation] = useState('pakistan');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      // const response = await axios.get('http://192.168.18.20:8000/jobs', {
      //   params: { title, location }
      // });
      const response = await axios.get('https://influential-laina-interviewsolutionshub-57864dd2.koyeb.app/jobs', {
        params: { title, location }
      });
      setJobs(response.data);
    } catch (err) {
      setError('Error fetching job data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">LinkedIn Job Search</h1>

      <div className="mb-6 flex flex-col md:flex-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
          className="border p-2 mb-2 md:mb-0 md:mr-4 rounded flex-grow"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="border p-2 mb-2 md:mb-0 md:mr-4 rounded flex-grow"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex-shrink-0"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {jobs?.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Job Title</th>
                <th className="px-6 py-3 text-left text-gray-600">Company</th>
                <th className="px-6 py-3 text-left text-gray-600">Posted Time</th>
                <th className="px-6 py-3 text-left text-gray-600">Applicants</th>
                <th className="px-6 py-3 text-left text-gray-600">Details</th>
              </tr>
            </thead>
            <tbody>
              {jobs?.map((job, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{job.job_title}</td>
                  <td className="px-6 py-4">{job.company_name}</td>
                  <td className="px-6 py-4">{job.posted_time}</td>
                  <td className="px-6 py-4">{job.number_of_applicants}</td>
                  <td className="px-6 py-4">
                    <a
                      href={job.job_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Job
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LInkedInApi;
