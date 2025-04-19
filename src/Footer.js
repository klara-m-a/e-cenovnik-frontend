import { Box, Typography, Link as MuiLink, Container, Grid, Divider } from "@mui/material"
import { Link } from "react-router-dom"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import SellIcon from "@mui/icons-material/Sell"
import { ContactEmergency, ContactPage, ContactSupportRounded } from "@mui/icons-material"

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        color: "text.secondary",
        py: 6,
        borderTop: "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.03)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "primary.main",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  mr: 1.5,
                }}
              >
                <SellIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                  background: "linear-gradient(90deg, #1976d2, #f68e56)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                e-cenovnik
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, maxWidth: 300, color: "text.secondary" }}>
              Платформа за проверка на цени на производи од различни продавници.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}>
              Контакт
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <EmailIcon sx={{ mr: 1, fontSize: "1.2rem", color: "primary.main" }} />
              <MuiLink
                href="mailto:info@e-cenovnik.mk"
                sx={{
                  color: "text.primary",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                  transition: "color 0.3s ease",
                }}
              >
                info@e-cenovnik.mk
              </MuiLink>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PhoneIcon sx={{ mr: 1, fontSize: "1.2rem", color: "primary.main" }} />
              <MuiLink
                href="tel:075213967"
                sx={{
                  color: "text.primary",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                  transition: "color 0.3s ease",
                }}
              >
                +389 75 213 967
              </MuiLink>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}>
              Линкови
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <MuiLink
                component={Link}
                to="/"
                sx={{
                  color: "text.primary",
                  textDecoration: "none",
                  "&:hover": { color: "primary.main" },
                  transition: "color 0.3s ease",
                }}
              >
                Почетна
              </MuiLink>
              <MuiLink
                component={Link}
                to="kontakt"
                sx={{
                  color: "text.primary",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { color: "primary.main" },
                  transition: "color 0.3s ease",
                }}
              >
                <ContactPage sx={{ mr: 1, fontSize: "1.2rem" }} />
                Контакт
              </MuiLink>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(0, 0, 0, 0.1)" }} />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} e-cenovnik.mk. Сите права задржани. Изработено од <a href="https://manasievkompjuteri.com.mk/" target="__blank" style={{ color: "#1976d2", textDecoration: "none", transition: 'color 0.3s ease' }}>MSoft</a>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer