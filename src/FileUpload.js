import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './App.css';

const FileUpload = () => {
  const { market, location } = useParams();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async e => {
    e.preventDefault();
    if (!file) return;
    let url = `http://localhost:5000/upload?market=${encodeURIComponent(market)}`;
    if (location) {
      url += `&location=${encodeURIComponent(location)}`;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      setMessage(result.message);
    } catch (error) {
      console.error(error);
      setMessage('Upload failed.');
    }
  };

  return (
    <div className="container">
      <h2>Upload Products for: {market}{location ? ` - ${location}` : ""}</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
      <div>
        <Link to={`/market/${market}${location ? "/" + location : ""}`}>
          Back to Products
        </Link>
      </div>
    </div>
  );
};

export default FileUpload;
