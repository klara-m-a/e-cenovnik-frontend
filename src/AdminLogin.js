// src/AdminLogin.js
import React, { useState } from 'react'
import { useNavigate }      from 'react-router-dom'
import { Box, TextField, Button, Typography } from '@mui/material'
import { API_BASE }         from './utils/api'  // e.g. '' or '/api'

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const navigate                = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ username, password })
      })

      if (res.ok) {
        onLogin()
        navigate('/admin/dashboard')
      } else {
        // pull any error message from the server
        const { error: msg } = await res.json()
        setError(msg || 'Невалидни податоци')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Серверска грешка, обиди се повторно')
    }
  }

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx:       'auto',
        mt:       4,
        p:        3,
        border:   '1px solid #ddd',
        borderRadius: 2,
        backgroundColor: '#fff'
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Админ Пријава
      </Typography>
      {error && (
        <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Корисничко име"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Лозинка"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Пријави се
        </Button>
      </form>
    </Box>
  )
}
