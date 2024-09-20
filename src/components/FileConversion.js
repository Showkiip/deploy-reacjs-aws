// src/components/FileConversion.js
"use client"; 
import React, { useState } from 'react';
import axios from 'axios';

const FileConversion = () => {
  const [file, setFile] = useState(null);
  const [conversionType, setConversionType] = useState('pdf-to-word');
  const [resultUrl, setResultUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConversion = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64File = btoa(reader.result);

      try {
        const response = await axios.post('https://influential-laina-interviewsolutionshub-57864dd2.koyeb.app/convert-file', {
          file: base64File,
          type: conversionType === 'pdf-to-word' ? 'pdftodocx' : 'docxtopdf',
        });

        if (response.data.converted_file) {
          const downloadLink = `data:application/${conversionType === 'pdf-to-word' ? 'docx' : 'pdf'};base64,${response.data.converted_file}`;
          setResultUrl(downloadLink);
        }
      } catch (error) {
        console.error('Error during file conversion', error);
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <h1>File Conversion</h1>
      <select onChange={(e) => setConversionType(e.target.value)} value={conversionType}>
        <option value="pdf-to-word">PDF to Word</option>
        <option value="word-to-pdf">Word to PDF</option>
      </select>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleConversion}>Convert</button>
      {resultUrl && (
        <div>
          <a href={resultUrl} download={`converted-file.${conversionType === 'pdf-to-word' ? 'docx' : 'pdf'}`}>Download Converted File</a>
        </div>
      )}
    </div>
  );
};

export default FileConversion;
