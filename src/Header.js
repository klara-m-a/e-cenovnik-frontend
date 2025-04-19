"use client"

import { useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Slide,
  Fade,
  Avatar,
} from "@mui/material"
import { Link, useLocation } from "react-router-dom"
import SellIcon from "@mui/icons-material/Sell"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import HomeIcon from "@mui/icons-material/Home"
import ContactsIcon from "@mui/icons-material/Contacts"

const Header = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  // Toggle drawer
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return
    }
    setDrawerOpen(open)
  }

  // Navigation items - removed Admin
  const navItems = [
    { text: "Почетна", path: "/", icon: <HomeIcon /> },
    { text: "Контакт", path: "/kontakt", icon: <ContactsIcon /> },
  ]

  // Check if a path is active
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true
    if (path !== "/" && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <AppBar
      position="sticky"
      elevation={scrolled ? 4 : 0}
      sx={{
        backgroundColor: "background.paper",
        borderBottom: scrolled ? "none" : "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "0 2px 4px rgba(0, 0, 0, 0.04)",
        transition: "all 0.3s ease",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            py: scrolled ? 1 : 1.5,
            transition: "all 0.3s ease",
          }}
        >
          {/* Logo */}
          <Fade in={true} timeout={1000}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                    color: "#fff",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    mr: 1.5,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05) rotate(5deg)",
                      boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                    },
                    boxShadow: "0 4px 8px rgba(25, 118, 210, 0.2)",
                  }}
                >
                  <SellIcon sx={{ fontSize: 24 }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    color: "text.primary",
                    fontWeight: 700,
                    letterSpacing: "-0.5px",
                    background: "linear-gradient(90deg, #1976d2, #f68e56)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      width: "100%",
                      height: "2px",
                      background: "linear-gradient(90deg, #1976d2, #f68e56)",
                      opacity: 0,
                      transition: "opacity 0.3s",
                    },
                    "&:hover::after": {
                      opacity: 1,
                    },
                  }}
                >
                  e-cenovnik
                </Typography>
              </Link>
            </Box>
          </Fade>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Slide direction="down" in={true} timeout={800}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      mx: 0.5,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      color: isActive(item.path) ? "primary.main" : "text.primary",
                      fontWeight: isActive(item.path) ? 600 : 500,
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "3px",
                        borderRadius: "3px 3px 0 0",
                        backgroundColor: "primary.main",
                        transform: isActive(item.path) ? "translateY(0)" : "translateY(3px)",
                        transition: "transform 0.3s ease",
                      },
                      "&:hover": {
                        backgroundColor: "rgba(25, 118, 210, 0.04)",
                        "&::before": {
                          transform: "translateY(0)",
                        },
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}

                {/* Email button - only visible on larger screens, not on tablet or mobile */}
                {!isMediumScreen && (
                  <Button
                    variant="contained"
                    color="secondary"
                    href="mailto:info@e-cenovnik.mk"
                    sx={{
                      ml: 2,
                      fontSize: "0.9rem",
                      borderRadius: 6,
                      fontWeight: 600,
                      px: 3,
                      py: 1,
                      boxShadow: "0 4px 10px rgba(246, 142, 86, 0.2)",
                      "&:hover": {
                        boxShadow: "0 6px 15px rgba(246, 142, 86, 0.3)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s",
                    }}
                  >
                    info@e-cenovnik.mk
                  </Button>
                )}
              </Box>
            </Slide>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="end"
              color="primary"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{
                border: "1px solid rgba(25, 118, 210, 0.2)",
                borderRadius: 2,
                p: 1,
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Mobile Drawer */}
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            sx={{
              "& .MuiDrawer-paper": {
                width: "80%",
                maxWidth: 300,
                boxSizing: "border-box",
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
                boxShadow: "-5px 0 25px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 32,
                    height: 32,
                    mr: 1,
                  }}
                >
                  <SellIcon sx={{ fontSize: 18 }} />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  e-cenovnik
                </Typography>
              </Box>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider />
            <List sx={{ pt: 1 }}>
              {navItems.map((item, index) => (
                <ListItem
                  key={index}
                  button
                  component={Link}
                  to={item.path}
                  onClick={toggleDrawer(false)}
                  sx={{
                    py: 1.5,
                    borderLeft: isActive(item.path) ? "4px solid" : "4px solid transparent",
                    borderColor: isActive(item.path) ? "primary.main" : "transparent",
                    bgcolor: isActive(item.path) ? "rgba(25, 118, 210, 0.08)" : "transparent",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                    <Box
                      sx={{
                        color: isActive(item.path) ? "primary.main" : "text.secondary",
                        mr: 2,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: isActive(item.path) ? 600 : 500,
                        color: isActive(item.path) ? "primary.main" : "text.primary",
                      }}
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
