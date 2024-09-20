"use client"; 
import React, { useState } from 'react';
import axios from 'axios';

const LInkedInApi = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState([]);
  const [selectedTimePosted, setSelectedTimePosted] = useState('any');
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div>
      <h1>LinkedIn Job Search</h1>
      <div>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title" />
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        <h2>Filters</h2>
        <div>
          <h3>Job Type</h3>
          <div>
            {jobTypesOptions.map(({ value, label }) => (
              <label key={value}>
                <input
                  type="checkbox"
                  value={value}
                  checked={selectedJobTypes.includes(value)}
                  onChange={handleChange(setSelectedJobTypes)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3>Experience Level</h3>
          <div>
            {experienceLevelsOptions.map(({ value, label }) => (
              <label key={value}>
                <input
                  type="checkbox"
                  value={value}
                  checked={selectedExperienceLevels.includes(value)}
                  onChange={handleChange(setSelectedExperienceLevels)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3>Time Posted</h3>
          <div>
            {timePostedOptions.map(({ value, label }) => (
              <label key={value}>
                <input
                  type="radio"
                  name="time_posted"
                  value={value}
                  checked={selectedTimePosted === value}
                  onChange={handleChange(setSelectedTimePosted)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3>Work Type</h3>
          <div>
            {workTypesOptions.map(({ value, label }) => (
              <label key={value}>
                <input
                  type="checkbox"
                  value={value}
                  checked={selectedWorkTypes.includes(value)}
                  onChange={handleChange(setSelectedWorkTypes)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {jobs.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Posted Time</th>
              <th>Applicants</th>
              <th>Location</th>
              <th>Easy Apply</th>
              <th>Job Type</th>
              <th>Skills Required</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index}>
                <td>{job.job_title}</td>
                <td>{job.company_name}</td>
                <td>{job.posted_time}</td>
                <td>{job.number_of_applicants}</td>
                <td>{job.location}</td>
                <td>{job.easy_apply ? 'Yes' : 'No'}</td>
                <td>{Array.isArray(job.job_type) ? job.job_type.join(', ') : job.job_type}</td>
                <td>
                  <ul>
                    {Array.isArray(job.skills_required) ? (
                      job.skills_required.map((skill, idx) => <li key={idx}>{skill}</li>)
                    ) : (
                      <li>{job.skills_required}</li>
                    )}
                  </ul>
                </td>
                <td>
                  <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                    View Job
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LInkedInApi;
