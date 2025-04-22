// src/FileUpload.js
import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material'
import { API_BASE } from './utils/api';

const FileUpload = () => {
  // const { market, location } = useParams()        // <-- these are slugs
  const { market: marketSlug, location: locationSlug } = useParams()
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')

  const handleFileChange = e => setFile(e.target.files[0])

  const handleUpload = async e => {
    e.preventDefault()
    if (!file) return
    // let url = `http://localhost:8080/upload?market=${market}`
    // if (location) url += `&location=${location}`
    let url = `${API_BASE}/upload?market=${encodeURIComponent(marketSlug)}`;
    if (locationSlug) url += `&location=${encodeURIComponent(locationSlug)}`

    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch(url, { method: 'POST', body: formData })
      const result = await res.json()
      setMessage(result.message)
    } catch (err) {
      console.error(err)
      setMessage('Upload failed.')
    }
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {/* Прикачи за: {market}{location ? ` – ${location}` : ""} */}
        Прикачи за: {marketSlug}{locationSlug ? ` – ${locationSlug}` : ""}
      </Typography>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          style={{ marginBottom: 16 }}
        />
        <Button variant="contained" type="submit">Upload</Button>
      </form>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
      <Box sx={{ mt: 2 }}>
        <Link to="/admin/dashboard">Назад</Link>
      </Box>
    </Box>
  )
}

export default FileUpload
