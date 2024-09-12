"use client";

import React, { useState } from 'react';
import axios from 'axios';

const LinkedInApi = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  
  // Static dropdown options
  const jobTypesOptions = [
    { value: 'F', label: 'Full-time' },
    { value: 'P', label: 'Part-time' },
    { value: 'C', label: 'Contract' },
    { value: 'T', label: 'Temporary' },
    { value: 'V', label: 'Volunteer' }
  ];

  const experienceLevelsOptions = [
    { value: '1', label: 'Internship' },
    { value: '2', label: 'Entry level' },
    { value: '3', label: 'Associate' },
    { value: '4', label: 'Mid-Senior level' },
    { value: '5', label: 'Director' }
  ];

  const timePostedOptions = [
    { value: 'r604800', label: 'Past week' },
    { value: 'r2592000', label: 'Past month' },
    { value: 'r86400', label: 'Past 24 hours' },
    { value: 'any', label: 'Any time' }
  ];

  const workTypesOptions = [
    { value: '1', label: 'On-site' },
    { value: '2', label: 'Hybrid' },
    { value: '3', label: 'Remote' }
  ];

  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState([]);
  const [selectedTimePosted, setSelectedTimePosted] = useState('any');
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://192.168.18.20:8000/jobs', {
        params: {
          title,
          location,
          job_types: selectedJobTypes.join(','),
          experience_levels: selectedExperienceLevels.join(','),
          time_posted: selectedTimePosted,
          work_types: selectedWorkTypes.join(',')
        }
      });
      setJobs(response.data);
    } catch (err) {
      setError('Error fetching job data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (setter) => (e) => {
    const { value, checked, type } = e.target;
    setter((prev) =>
      type === 'checkbox'
        ? checked
          ? [...prev, value]
          : prev.filter((v) => v !== value)
        : value
    );
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

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Filters</h2>

        <div className="mb-4">
          <h3 className="font-semibold">Job Type</h3>
          <div className="flex flex-wrap gap-2">
            {jobTypesOptions.map(({ value, label }) => (
              <label key={value} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={value}
                  checked={selectedJobTypes.includes(value)}
                  onChange={handleChange(setSelectedJobTypes)}
                  className="form-checkbox"
                />
                <span className="ml-2">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Experience Level</h3>
          <div className="flex flex-wrap gap-2">
            {experienceLevelsOptions.map(({ value, label }) => (
              <label key={value} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={value}
                  checked={selectedExperienceLevels.includes(value)}
                  onChange={handleChange(setSelectedExperienceLevels)}
                  className="form-checkbox"
                />
                <span className="ml-2">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Time Posted</h3>
          <div className="flex flex-wrap gap-2">
            {timePostedOptions.map(({ value, label }) => (
              <label key={value} className="inline-flex items-center">
                <input
                  type="radio"
                  name="time_posted"
                  value={value}
                  checked={selectedTimePosted === value}
                  onChange={handleChange(setSelectedTimePosted)}
                  className="form-radio"
                />
                <span className="ml-2">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Work Type</h3>
          <div className="flex flex-wrap gap-2">
            {workTypesOptions.map(({ value, label }) => (
              <label key={value} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={value}
                  checked={selectedWorkTypes.includes(value)}
                  onChange={handleChange(setSelectedWorkTypes)}
                  className="form-checkbox"
                />
                <span className="ml-2">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {jobs.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-gray-600">Job Title</th>
                <th className="px-6 py-3 text-left text-gray-600">Company</th>
                <th className="px-6 py-3 text-left text-gray-600">Posted Time</th>
                <th className="px-6 py-3 text-left text-gray-600">Applicants</th>
                <th className="px-6 py-3 text-left text-gray-600">Location</th>
                <th className="px-6 py-3 text-left text-gray-600">Easy Apply</th>
                <th className="px-6 py-3 text-left text-gray-600">Job Type</th>
                <th className="px-6 py-3 text-left text-gray-600">Skills Required</th>
                <th className="px-6 py-3 text-left text-gray-600">Details</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{job.job_title}</td>
                  <td className="px-6 py-4">{job.company_name}</td>
                  <td className="px-6 py-4">{job.posted_time}</td>
                  <td className="px-6 py-4">{job.number_of_applicants}</td>
                  <td className="px-6 py-4">{job.location}</td>
                  <td className="px-6 py-4">{job.easy_apply ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4">
                    {Array.isArray(job.job_type) ? job.job_type.join(', ') : job.job_type}
                  </td>
                  <td className="px-6 py-4">
                    <ul>
                      {Array.isArray(job.skills_required) ? (
                        job.skills_required.map((skill, idx) => (
                          <li key={idx}>{skill}</li>
                        ))
                      ) : (
                        <li>{job.skills_required}</li>
                      )}
                    </ul>
                  </td>
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

export default LinkedInApi;
