"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, CircularProgress } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import { API_BASE } from "./utils/api"

const AdminLogout = ({ onLogout }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    setLoading(true)

    try {
      // Try both endpoints
      let response
      try {
        response = await fetch(`${API_BASE}/api/admin/logout`, {
          method: "POST",
          credentials: "include",
        })
      } catch (e) {
        response = await fetch(`${API_BASE}/admin/logout`, {
          method: "POST",
          credentials: "include",
        })
      }

      if (response.ok) {
        if (onLogout) onLogout()
        navigate("/admin")
      }
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={handleLogout}
      disabled={loading}
      startIcon={loading ? <CircularProgress size={20} /> : <LogoutIcon />}
    >
      Одјави се
    </Button>
  )
}

export default AdminLogout
