// src/AdminDashboard.js
import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material'

const marketsList = [
  {
    name: "Разнопромет",
    slug: "raznopromet",
    locations: [{ name: "Кочани", slug: "kocani" }],
  },
  {
    name: "ВенМаркет",
    slug: "venmarket",
    locations: [
      { name: "ВенМаркет1 - Центар", slug: "centar" },
      { name: "ВенМаркет2 - Градски пазар", slug: "gradski-pazar" },
      { name: "ВенМаркет4 - Руенска", slug: "ruenska" },
      { name: "ВенМаркет5 - Стоковна", slug: "stokovna" },
    ],
  },
  {
    name: "Вегоел",
    slug: "vegoel",
    locations: [{ name: "Кочани", slug: "kocani" }],
  },
  {
    name: "Пепи Сан",
    slug: "pepisan",
    locations: [{ name: "Македонска Каменица", slug: "kamenica" }]
  },
  {
    name: "Памист",
    slug: "pamist",
    locations: [{ name: "Делчево", slug: "delcevo" }]
  },
  {
    name: "Симпли Трејд",
    slug: "simpli-trejd",
    locations: [{ name: "Македонска Каменица", slug: "kamenica" }]
  }
]

const AdminDashboard = () => (
  <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
    <Typography variant="h5" gutterBottom>Админ панел</Typography>
    <Typography variant="body1" sx={{ mb: 2 }}>Избери маркет:</Typography>
    <List>
      {marketsList.map((m, i) => (
        <Box key={i}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{m.name}</Typography>
          <List sx={{ pl: 2, mb: 2 }}>
            {m.locations.map((loc, j) => (
              <ListItem key={j} disableGutters>
                <ListItemText>
                  <Link
                    to={`/admin/upload/${m.slug}/${loc.slug}`}
                    style={{ textDecoration: 'none', color: '#1976d2' }}
                  >
                    Прикачи за {m.name} – {loc.name}
                  </Link>
                </ListItemText>
              </ListItem>
            ))}
          </List>
          {i < marketsList.length - 1 && <Divider />}
        </Box>
      ))}
    </List>
    <Box sx={{ mt: 2 }}>
      <Link to="/">Назад до почетна</Link>
    </Box>
  </Box>
)

export default AdminDashboard
