// src/MarketProducts.js
"use client"
import { API_BASE } from "./utils/api"
import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  InputAdornment,
  Tabs,
  Tab,
  Fade,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { useParams, useNavigate, Link } from "react-router-dom"
import SearchIcon from "@mui/icons-material/Search"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from "@mui/icons-material/Cancel"
import StorefrontIcon from "@mui/icons-material/Storefront"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import UpdateIcon from "@mui/icons-material/Update"

// Define markets with Latin slugs for URLs and Cyrillic names
const markets = [
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

const PAGE_SIZE = 20

// Empty placeholder
const EmptyValuePlaceholder = () => (
  <Typography variant="body2" sx={{ color: "text.disabled", textAlign: "center" }}>
    /
  </Typography>
)

const isEmpty = (v) => v == null || (typeof v === "string" && !v.trim())

const CellContent = ({ value }) => (isEmpty(value) ? <EmptyValuePlaceholder /> : value)

export default function MarketProducts() {
  const { market: marketSlug, location: locationSlug } = useParams()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [priceDate, setPriceDate] = useState("")
  const [lastUpdate, setLastUpdate] = useState("")
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  // find market object by slug
  const marketData = markets.find((m) => m.slug === marketSlug)
  const marketName = marketData?.name || ""

  // find location object by slug
  const locationObj = marketData ? marketData.locations.find((l) => l.slug === locationSlug) : null
  const locationName = locationObj?.name || ""

  // if multi‑loc market and no locationSlug → redirect to first location
  useEffect(() => {
    if (marketData?.locations.length > 0 && !locationSlug) {
      navigate(`/cenovnik/${marketSlug}/${marketData.locations[0].slug}`, { replace: true })
    }
  }, [marketData, locationSlug, navigate, marketSlug])

  // build GET‑products URL with slugs
  useEffect(() => {
    setLoading(true)
    let url = `${API_BASE}/products?market=${encodeURIComponent(marketSlug)}`
    if (locationSlug) {
      url += `&location=${encodeURIComponent(locationSlug)}`
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Check if the response has the new structure with products and updateInfo
        if (data.products) {
          setProducts(data.products || [])

          // Set the last update info if available
          if (data.updateInfo && data.updateInfo.formatted) {
            setLastUpdate(data.updateInfo.formatted)
          } else {
            setLastUpdate("")
          }
        } else {
          // Handle old API response format
          setProducts(data || [])
          setLastUpdate("")
        }

        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [marketSlug, locationSlug])

  // filtering & paging
  const filtered = products.filter((p) =>
    String(p.naziv || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  )
  const displayed = filtered.slice(0, displayCount)

  const handleLoadMore = () => setDisplayCount((c) => c + PAGE_SIZE)

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ width: "100%", minHeight: "calc(100vh - 200px)", px: { xs: 0, sm: 0, md: 0 } }}>
        {/* back + search */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: 3,
            gap: 2,
            px: 2,
          }}
        >
          {/* Updated Back button to match StoreProfile style */}
          <Button
            variant="outlined"
            component={Link}
            to={`/${marketSlug}`}
            startIcon={<ArrowBackIcon />}
            sx={{ mb: { xs: 1, md: 0 } }}
          >
            Назад
          </Button>

          <TextField
            placeholder="Пребарај продукти"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              maxWidth: { xs: "100%", md: 300 },
              backgroundColor: "background.paper",
              borderRadius: 1,
              "& .MuiOutlinedInput-root:hover fieldset": { borderColor: "primary.main" },
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* header */}
        <Paper elevation={1} sx={{ mb: 4, p: 2, mx: 2, borderRadius: 2, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <StorefrontIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h5" sx={{ fontWeight: 600, color: "text.primary" }}>
              {marketName}
            </Typography>
          </Box>
          {locationName && (
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <LocationOnIcon sx={{ mr: 0.5, fontSize: "0.9rem", color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {locationName}
              </Typography>
            </Box>
          )}
        </Paper>

        {/* location tabs */}
        {marketData?.locations.length > 1 && (
          <Box sx={{ mb: 4, overflowX: "auto", mx: 2 }}>
            <Tabs
              value={locationName}
              onChange={(e, newVal) =>
                navigate(`/cenovnik/${marketSlug}/${marketData.locations.find((l) => l.name === newVal).slug}`)
              }
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                "& .MuiTabs-indicator": { backgroundColor: "primary.main" },
                "& .MuiTab-root": { fontWeight: 500, minWidth: 100, "&.Mui-selected": { color: "primary.main" } },
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              {marketData.locations.map((loc) => (
                <Tab
                  key={loc.slug}
                  label={loc.name}
                  value={loc.name}
                  icon={<LocationOnIcon sx={{ fontSize: "1rem" }} />}
                  iconPosition="start"
                />
              ))}
            </Tabs>
          </Box>
        )}

        {/* Last Update Info */}
        {lastUpdate && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              p: 2,
              mx: 2,
              bgcolor: "rgba(25,118,210,0.05)",
              borderRadius: 2,
              border: "1px solid rgba(25,118,210,0.1)",
            }}
          >
            <UpdateIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="body1" fontWeight={500}>
              Последно ажурирање: {lastUpdate}
            </Typography>
          </Box>
        )}

        {/* table */}
        <Fade in={!loading}>
          <Box
            sx={{
              width: "100%",
              bgcolor: "rgba(0,0,0,0.01)",
              borderRadius: { xs: 0, sm: 3 },
              overflow: "hidden", // Hide overflow on the container
            }}
          >
            {displayed.length === 0 ? (
              <Box sx={{ minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                  Нема достапни производи.
                </Typography>
              </Box>
            ) : (
              <TableContainer
                component={Paper}
                sx={{
                  backgroundColor: "background.paper",
                  borderRadius: { xs: 0, sm: 2 },
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  width: "100%",
                  overflowX: "auto", // Enable horizontal scrolling
                  "&::-webkit-scrollbar": { height: "8px" },
                  "&::-webkit-scrollbar-track": { backgroundColor: "rgba(0,0,0,0.05)", borderRadius: "4px" },
                  "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(0,0,0,0.2)", borderRadius: "4px" },
                }}
              >
                <Table sx={{ minWidth: 1200 }}>
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: "rgba(0,0,0,0.02)",
                        "& th": { fontWeight: 600, borderBottom: "2px solid rgba(0,0,0,0.1)", color: "text.primary" },
                      }}
                    >
                      <TableCell width="20%">Назив</TableCell>
                      <TableCell width="10%">Продажна цена</TableCell>
                      <TableCell width="10%">Единечна цена</TableCell>
                      <TableCell width="10%">Опис</TableCell>
                      <TableCell width="10%">Достапност</TableCell>
                      <TableCell width="10%">Редовна цена</TableCell>
                      <TableCell width="10%">Цена со попуст</TableCell>
                      <TableCell width="10%">Вид на попуст</TableCell>
                      <TableCell width="10%">Времетраење на попуст</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayed.map((p, idx) => (
                      <TableRow
                        key={idx}
                        sx={{
                          "&:nth-of-type(odd)": { backgroundColor: "rgba(0,0,0,0.01)" },
                          "&:hover": { backgroundColor: "rgba(25,118,210,0.04)" },
                          transition: "background-color 0.2s",
                        }}
                      >
                        <TableCell
                          sx={{
                            borderRight: "1px solid rgba(0,0,0,0.05)",
                            fontWeight: 500,
                            color: "text.primary",
                            width: "20%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {p.cenaSoPopust && (
                              <Chip
                                icon={<CheckCircleIcon />}
                                label="Попуст"
                                size="small"
                                sx={{ backgroundColor: "rgba(46,125,50,0.1)", color: "#2e7d32", fontWeight: 500 }}
                              />
                            )}
                            <Box sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                              <CellContent value={p.naziv} />
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            borderRight: "1px solid rgba(0,0,0,0.05)",
                            fontWeight: 600,
                            color: p.cenaSoPopust ? "secondary.main" : "text.primary",
                            width: "10%",
                          }}
                        >
                          {isEmpty(p.prodazhnaCena) ? <EmptyValuePlaceholder /> : `${p.prodazhnaCena} ден.`}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderRight: "1px solid rgba(0,0,0,0.05)",
                            color: "text.primary",
                            width: "10%",
                          }}
                        >
                          {isEmpty(p.edinichnaCena) ? <EmptyValuePlaceholder /> : `${p.edinichnaCena} ден.`}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderRight: "1px solid rgba(0,0,0,0.05)",
                            color: "text.primary",
                            width: "10%",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <CellContent value={p.opis} />
                        </TableCell>
                        <TableCell
                          sx={{
                            borderRight: "1px solid rgba(0,0,0,0.05)",
                            width: "10%",
                          }}
                        >
                          {p.dostapnost === "Достапен" ? (
                            <Chip
                              icon={<CheckCircleIcon />}
                              label="Достапен"
                              size="small"
                              sx={{ backgroundColor: "rgba(46,125,50,0.1)", color: "#2e7d32", fontWeight: 500 }}
                            />
                          ) : p.dostapnost === "" || p.dostapnost?.toLowerCase() === "нема" ? (
                            <Chip
                              icon={<CancelIcon />}
                              label="Недостапен"
                              size="small"
                              sx={{ backgroundColor: "rgba(211,47,47,0.1)", color: "#d32f2f", fontWeight: 500 }}
                            />
                          ) : (
                            <CellContent value={p.dostapnost} />
                          )}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderRight: "1px solid rgba(0,0,0,0.05)",
                            textDecoration: p.cenaSoPopust ? "line-through" : "none",
                            color: p.cenaSoPopust ? "text.secondary" : "text.primary",
                            width: "10%",
                          }}
                        >
                          {isEmpty(p.redovnaCena) ? <EmptyValuePlaceholder /> : `${p.redovnaCena} ден.`}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderRight: "1px solid rgba(0,0,0,0.05)",
                            color: p.cenaSoPopust ? "secondary.main" : "text.secondary",
                            fontWeight: p.cenaSoPopust ? 600 : 400,
                            width: "10%",
                          }}
                        >
                          <CellContent value={p.cenaSoPopust} />
                        </TableCell>
                        <TableCell
                          sx={{
                            borderRight: "1px solid rgba(0,0,0,0.05)",
                            color: "text.primary",
                            width: "10%",
                          }}
                        >
                          <CellContent value={p.vidNaPopust} />
                        </TableCell>
                        <TableCell sx={{ color: "text.primary", width: "10%" }}>
                          <CellContent value={p.vremetraenjeNaPopust} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* load more */}
            {displayCount < filtered.length && (
              <Box sx={{ textAlign: "center", mt: 4, width: "100%", pb: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLoadMore}
                  sx={{
                    borderRadius: 6,
                    px: 4,
                    py: 1.5,
                    fontWeight: 500,
                    boxShadow: "0 4px 10px rgba(25,118,210,0.2)",
                  }}
                >
                  Прикажи повеќе
                </Button>
              </Box>
            )}
          </Box>
        </Fade>
      </Box>
    </Container>
  )
}
