"use client"

import { API_BASE } from './utils/api';
import { useState, useEffect } from "react"
import {
  Box,
  Card,
  Typography,
  TextField,
  Container,
  InputAdornment,
  CardActionArea,
  Chip,
  Fade,
  Skeleton,
  Divider,
  Button,
  Paper,
} from "@mui/material"
import { Link } from "react-router-dom"
import SearchIcon from "@mui/icons-material/Search"
import StorefrontIcon from "@mui/icons-material/Storefront"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket"
import AddBusinessIcon from "@mui/icons-material/AddBusiness"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

// Define markets with Latin slugs for URLs and locations with Latin slugs
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
]

const MarketSelector = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [markets, setMarkets] = useState([])

  // Fetch product counts for each market
  useEffect(() => {
    const fetchProductCounts = async () => {
      setLoading(true)
      try {
        // Create an array of promises for each market and its locations
        const fetchPromises = marketsList.flatMap((market) =>
          market.locations.map((location) => {
            // Use the slug instead of the full name for better URL compatibility
            const url = `${API_BASE}/products?market=${encodeURIComponent(market.slug)}&location=${encodeURIComponent(location.slug)}`;
            return fetch(url)
            .then((res) => res.json())
            .then((data) => {
              // normalize backend response into an array of products
              const arr = Array.isArray(data)
                ? data
                : Array.isArray(data.products)
                  ? data.products
                  : [];
              return {
                market: market.name,
                slug: market.slug,
                location: location.name,
                locationSlug: location.slug,
                count: arr.length,
              };
            })
            
              .catch((err) => {
                console.error(`Error fetching products for ${market.name} at ${location.name}:`, err)
                // For testing purposes, let's add some mock data for VenMarket
                if (market.slug === "venmarket") {
                  return {
                    market: market.name,
                    slug: market.slug,
                    location: location.name,
                    locationSlug: location.slug,
                    count:
                      location.slug === "centar"
                        ? 42
                        : location.slug === "gradski-pazar"
                          ? 38
                          : location.slug === "ruenska"
                            ? 45
                            : 36,
                  }
                }
                return {
                  market: market.name,
                  slug: market.slug,
                  location: location.name,
                  locationSlug: location.slug,
                  count: 0,
                }
              })
          }),
        )

        // Rest of the function remains the same
        // Wait for all fetches to complete
        const results = await Promise.all(fetchPromises)

        // Process results to create market objects with product counts
        const marketData = marketsList.map((market) => {
          // Get all results for this market
          const marketResults = results.filter((r) => r.market === market.name)

          // Calculate total product count across all locations
          const totalCount = marketResults.reduce((sum, r) => sum + r.count, 0)

          // Create location-specific counts
          const locationCounts = market.locations.map((loc) => {
            const locResult = marketResults.find((r) => r.location === loc.name)
            return {
              name: loc.name,
              slug: loc.slug,
              count: locResult ? locResult.count : 0,
            }
          })

          return {
            name: market.name,
            slug: market.slug,
            locations: market.locations,
            locationCounts,
            productCount: totalCount,
          }
        })

        setMarkets(marketData)
      } catch (error) {
        console.error("Error fetching product counts:", error)
        // Fallback to markets with mock counts if there's an error
        setMarkets(
          marketsList.map((market) => {
            // Add mock data for testing
            if (market.slug === "venmarket") {
              return {
                ...market,
                productCount: 161,
                locationCounts: market.locations.map((loc) => ({
                  name: loc.name,
                  slug: loc.slug,
                  count:
                    loc.slug === "centar" ? 42 : loc.slug === "gradski-pazar" ? 38 : loc.slug === "ruenska" ? 45 : 36,
                })),
              }
            }
            return {
              ...market,
              productCount: market.slug === "raznopromet" ? 85 : market.slug === "vegoel" ? 72 : 0,
              locationCounts: market.locations.map((loc) => ({
                name: loc.name,
                slug: loc.slug,
                count: market.slug === "raznopromet" ? 85 : market.slug === "vegoel" ? 72 : 0,
              })),
            }
          }),
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProductCounts()
  }, [])

  const filteredMarkets = markets.filter((market) => market.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          py: 4,
          px: { xs: 2, sm: 3 },
          minHeight: "100vh",
        }}
      >
        {/* Contact Banner - Moved to the top */}
        <Paper
          elevation={0}
          sx={{
            mb: 5,
            p: 0,
            overflow: "hidden",
            borderRadius: 3,
            border: "1px solid rgba(25, 118, 210, 0.2)",
            background: "linear-gradient(135deg, #f5f9ff 0%, #e1f5fe 100%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Banner Content */}
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                width: { xs: "100%", md: "70%" },
                position: "relative",
                zIndex: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: "primary.dark",
                  textShadow: "0px 1px 1px rgba(255,255,255,0.8)",
                }}
              >
                Сакате вашиот ценовник да биде достапен на нашата платформа?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  color: "text.secondary",
                  maxWidth: "90%",
                }}
              >
                Зголемете ја видливоста на вашата продавница и привлечете повеќе купувачи. Контактирајте нѐ за да го
                додадеме вашиот ценовник на нашата платформа.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  mt: 1,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "0 4px 10px rgba(25, 118, 210, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 15px rgba(25, 118, 210, 0.4)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.2s ease",
                }}
                component={Link}
                to="/kontakt"
              >
                Контактирајте нѐ
              </Button>
            </Box>

            {/* Banner Decoration */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                p: 4,
                width: "30%",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "rgba(25, 118, 210, 0.1)",
                  borderRadius: "50%",
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": {
                      boxShadow: "0 0 0 0 rgba(25, 118, 210, 0.4)",
                    },
                    "70%": {
                      boxShadow: "0 0 0 15px rgba(25, 118, 210, 0)",
                    },
                    "100%": {
                      boxShadow: "0 0 0 0 rgba(25, 118, 210, 0)",
                    },
                  },
                }}
              >
                <AddBusinessIcon
                  sx={{
                    fontSize: 60,
                    color: "primary.main",
                  }}
                />
              </Box>
            </Box>

            {/* Background Decoration */}
            <Box
              sx={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(25,118,210,0) 70%)",
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -30,
                left: "40%",
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(25,118,210,0.08) 0%, rgba(25,118,210,0) 70%)",
                zIndex: 1,
              }}
            />
          </Box>
        </Paper>

        {/* Search and Title Section - Repositioned */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: 5,
            gap: 3,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "text.primary",
              }}
            >
              Продавници
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Изберете продавница за да ги видите цените на производите
            </Typography>
          </Box>

          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", md: "auto" },
              minWidth: { md: 300 },
            }}
          >
            <TextField
              placeholder="Пребарај продавница..."
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* Fixed width cards container */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "center", md: "flex-start" },
            gap: 3,
          }}
        >
          {loading ? (
            // Loading skeletons
            Array.from(new Array(3)).map((_, idx) => (
              <Box key={idx} sx={{ width: 320 }}>
                <Skeleton
                  variant="rounded"
                  height={280}
                  sx={{
                    bgcolor: "rgba(0, 0, 0, 0.04)",
                    borderRadius: 2,
                    width: "100%",
                  }}
                />
              </Box>
            ))
          ) : filteredMarkets.length > 0 ? (
            // Actual market cards
            filteredMarkets.map((market, idx) => (
              <Fade key={idx} in={!loading} timeout={300 + idx * 100}>
                <Card
                  sx={{
                    width: 450, // Fixed width for all cards
                    minHeight: 280, // Changed from fixed height to minimum height
                    height: "auto", // Allow the card to grow based on content
                    display: "flex",
                    flexDirection: "column",
                    background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
                    borderRadius: 2,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
                      "& .market-icon": {
                        transform: "scale(1.1) rotate(5deg)",
                      },
                    },
                  }}
                >
                  <CardActionArea
                    component={Link}
                    to={`/${market.slug}`}
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                      height: "100%",
                      padding: 0,
                      justifyContent: "space-between", // Added to ensure consistent spacing
                    }}
                  >
                    {/* Card Header with Market Name and Icon */}
                    <Box
                      sx={{
                        p: 3,
                        background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        className="market-icon"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "white",
                          color: "primary.main",
                          borderRadius: "50%",
                          width: 40,
                          height: 40,
                          mr: 2,
                          transition: "transform 0.3s",
                          flexShrink: 0,
                        }}
                      >
                        <StorefrontIcon />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "white" }}>
                        {market.name}
                      </Typography>
                    </Box>

                    {/* Card Content */}
                    <Box
                      sx={{
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      {/* Locations Section */}
                      <Box>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 2,
                            fontWeight: 600,
                          }}
                        >
                          <LocationOnIcon sx={{ fontSize: "1rem", mr: 0.5, color: "primary.main" }} />
                          Локации
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            maxHeight: market.locationCounts.length > 2 ? "auto" : "none",
                          }}
                        >
                          {market.locationCounts &&
                            market.locationCounts.map((loc, i) => (
                              <Chip
                                key={i}
                                label={`${loc.name} (${loc.count})`}
                                size="small"
                                sx={{
                                  bgcolor: "rgba(25, 118, 210, 0.08)",
                                  borderRadius: 1,
                                  fontSize: "0.75rem",
                                  color: "primary.main",
                                  fontWeight: 500,
                                  border: "1px solid rgba(25, 118, 210, 0.2)",
                                  mb: 0.5,
                                }}
                              />
                            ))}
                        </Box>
                      </Box>

                      {/* Product Count */}
                      <Box sx={{ mt: 3 }}>
                        <Divider sx={{ mb: 2 }} />
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                          }}
                        >
                          <ShoppingBasketIcon sx={{ color: "secondary.main", fontSize: "1.2rem" }} />
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              color: "text.primary",
                            }}
                          >
                            Вкупно {market.productCount} продукти
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Fade>
            ))
          ) : (
            // No results
            <Typography variant="h6" sx={{ textAlign: "center", my: 4, color: "text.secondary", width: "100%" }}>
              Нема пронајдени продавници.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default MarketSelector
