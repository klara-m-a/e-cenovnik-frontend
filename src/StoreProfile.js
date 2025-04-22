"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Box, Typography, Button, Container, Paper, Grid, Divider, useMediaQuery, useTheme } from "@mui/material"
import { LocationOn, Phone, Email, ShoppingBag, ArrowBack, Business } from "@mui/icons-material"

// Market data with Latin slugs for URLs and locations with Latin slugs
const marketDetails = {
  raznopromet: {
    name: "Разнопромет",
    slug: "raznopromet",
    company: "РАЗНОПРОМЕТ-АНА Д.О.О.Е.Л. КОЧАНИ",
    edb: "MK4013007500660",
    address: "Страшо Пинџур 7",
    place: "Кочани",
    phone: "033/276-369",
    email: "raznoprometana@t.mk",
    description:
      "Разнопромет, вашата дестинација број еден за широк спектар на свежи, квалитетни и вкусни производи во срцето на Кочани.",
    locations: {
      kocani: {
        name: "Кочани",
        mapUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.982320052564!2d22.403373389852153!3d41.914738788968315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135592167e06475d%3A0x26c552815f43a6fb!2sMarket%20Raznopromet!5e0!3m2!1sen!2suk!4v1744718294947!5m2!1sen!2suk",
      },
    },
    logo: "./logos/raznopromet-ana-logo.png",
  },
  venmarket: {
    name: "ВенМаркет",
    slug: "venmarket",
    company: "ВЕНИНВЕСТ Д.О.О.Е.Л МАКЕДОНСКА КАМЕНИЦА",
    edb: "MK4063009500185",
    address: "Александар Македонски 10",
    place: "Македонска Каменица",
    phone: "077/525-015",
    email: "klimentmk@yahoo.com",
    description: "Вен Маркет, вашиот најдобар избор за свежи и квалитетни производи во Македонска Каменица.",
    locations: {
      centar: {
        name: "ВенМаркет1 - Центар",
        mapUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2963.9311416961596!2d22.586705776489687!3d42.02320955631577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135587161d288a57%3A0xe8675f8aaf565cd8!2sVenMarket%201!5e0!3m2!1sen!2suk!4v1744718474326!5m2!1sen!2suk",
      },
      "gradski-pazar": {
        name: "ВенМаркет2 - Градски пазар",
        mapUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2699.1533996469457!2d22.586466836892495!3d42.02342594797431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135587f1c9e93c53%3A0xb9a393ebdab0bfe5!2sVeninvest%202!5e0!3m2!1sen!2smk!4v1744901155599!5m2!1sen!2smk",
      },
      ruenska: {
        name: "ВенМаркет4 - Руенска",
        mapUrl:
          "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2964.0037722449542!2d22.587654540401555!3d42.02165147833399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDLCsDAxJzEzLjYiTiAyMsKwMzUnMTMuNCJF!5e0!3m2!1sen!2smk!4v1744925854399!5m2!1sen!2smk",
      },
      stokovna: {
        name: "ВенМаркет5- Стоковна",
        mapUrl:
          "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2964.0312984428583!2d22.58856007609192!3d42.02106097122636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDLCsDAxJzE1LjgiTiAyMsKwMzUnMjguMSJF!5e0!3m2!1sen!2smk!4v1744925895840!5m2!1sen!2smk",
      },
    },
    logo: "/logos/venmarket-logo.png",
  },
  vegoel: {
    name: "Вегоел",
    slug: "vegoel",
    company: "ВЕ-ГО-ЕЛ Д.О.О.Е.Л. КОЧАНИ",
    edb: "MK4013995112360",
    address: "9-ти Мај 44",
    place: "Кочани",
    phone: "076/477-680",
    email: "t.goko@yahoo.com",
    description:
      "Вегоел е продавница за играчки, бебешка и детска опрема, домакинство, апарати за домакинство, сувенири.",
    locations: {
      kocani: {
        name: "Кочани",
        mapUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.8317168999984!2d22.4106945!3d41.917976200000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135592174fb25f67%3A0x3ac7854c1ce9a5a6!2sVE-GO-EL!5e0!3m2!1sen!2suk!4v1744732665576!5m2!1sen!2suk",
      },
    },
    logo: "/logos/vegoel-logo.png",
  },
  pepisan: {
    name: "Пепи Сан",
    slug: "pepisan",
    company: "ПЕПИ САН-АНДРЕЈ Д.О.О.Е.Л. МАКЕДОНСКА КАМЕНИЦА",
    edb: "MK4063010500342",
    address: "Осоговска 2/-",
    place: "Македонска Каменица",
    phone: "071/544-408",
    email: "altrejd@yahoo.com",
    description:
      "Трговија на мало во неспецијализирани продавници претежно со храна пијалаци и тутун",
    locations: {
      kamenica: {
        name: "Македонска Каменица",
        mapUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d741.0061147597312!2d22.590503469657904!3d42.02120769450457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13558715c2b6ac65%3A0xea82bc335ce04ece!2z0J7RgdC-0LPQvtCy0YHQutCwIDIsIE1ha2Vkb25za2EgS2FtZW5pdHNh!5e0!3m2!1sen!2smk!4v1745328410672!5m2!1sen!2smk",
      },
    },
    logo: "",
  },
  pamist: {
    name: "Памист",
    slug: "pamist",
    company: "ПАМИСТ 2015 Д.О.О.Е.Л. ДЕЛЧЕВО",
    edb: "MK4009015504910",
    address: "ПЕРЕ ТОШЕВ 41",
    place: "Делчево",
    phone: "077/854-890",
    email: "ivica.micevski@t-home.mk",
    description:
      "Трговија на мало во неспецијализирани продавници претежно со храна пијалаци и тутун.",
    locations: {
      delcevo: {
        name: "Делчево",
        mapUrl:
          "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1939.703794933368!2d22.874221836697853!3d41.98685208575142!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smk!4v1745329916813!5m2!1sen!2smk",
      },
    },
    logo: "/logos/pamist-logo.png",
  },
  'simpli-trejd': {
    name: "Симпли Трејд",
    slug: "simpli-trejd",
    company: "СИМПЛИ ТРЕЈД Д.О.О.Е.Л. МАКЕДОНСКА КАМЕНИЦА",
    edb: "MK4063015501320",
    address: "14-ТИ ЈУНИ 5",
    place: "Македонска Каменица",
    phone: "071/820-540",
    email: "perojule@yahoo.com",
    description:
      "Трговија на мало во неспецијализирани продавници претежно со храна пијалаци и тутун.",
    locations: {
      kamenica: {
        name: "Македонска Каменица",
        mapUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2963.768641538605!2d22.584703676489696!3d42.02669535609677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1355873c57788e37%3A0xd6ac49792d1df2a2!2sR1210%2C%20Makedonska%20Kamenitsa!5e0!3m2!1sen!2smk!4v1745329538977!5m2!1sen!2smk",
      },
    },
    logo: "/logos/simpli-trejd-logo.png",
  },
}

const StoreProfile = () => {
  const { storeSlug } = useParams()
  const [loading, setLoading] = useState(true)
  const [storeData, setStoreData] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      if (marketDetails[storeSlug]) {
        setStoreData(marketDetails[storeSlug])
        setSelectedLocation(Object.keys(marketDetails[storeSlug].locations)[0]) // Set initial location
      }
      setLoading(false)
    }, 500)
  }, [storeSlug])

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={{ width: 200, height: 30, bgcolor: "rgba(0, 0, 0, 0.1)", borderRadius: 1 }} />
          <Box sx={{ width: "100%", height: 200, bgcolor: "rgba(0, 0, 0, 0.1)", borderRadius: 1 }} />
        </Box>
      </Container>
    )
  }

  if (!storeData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Продавницата не е пронајдена
        </Typography>
        <Button component={Link} to="/" variant="contained" startIcon={<ArrowBack />} sx={{ mt: 2 }}>
          Назад
        </Button>
      </Container>
    )
  }

  const locationsArray = Object.entries(storeData.locations).map(([locationSlug, locationData]) => ({
    slug: locationSlug,
    name: locationData.name,
    mapUrl: locationData.mapUrl,
  }))

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button component={Link} to="/" variant="outlined" startIcon={<ArrowBack />} sx={{ mb: 3 }}>
        Назад
      </Button>

      <Paper
        elevation={1}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            mb: 3,
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {storeData.logo && (
              <img
                src={storeData.logo || "/placeholder.svg"}
                alt={`${storeData.name} Logo`}
                style={{ maxWidth: "80px", maxHeight: "80px", marginRight: "10px" }}
              />
            )}
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {storeData.company}
            </Typography>
          </Box>

          <Button
            component={Link}
            to={`/cenovnik/${storeData.slug}/${Object.keys(storeData.locations)[0]}`}
            variant="contained"
            size="large"
            startIcon={<ShoppingBag />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 8,
              boxShadow: "0 4px 10px rgba(25, 118, 210, 0.2)",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(25, 118, 210, 0.3)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s",
              width: isMobile ? "100%" : "auto",
            }}
          >
            Ценовник
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3} sx={{display: "block"}}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Информации
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Business sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="body1">
                    <strong>ЕДБ:</strong> {storeData.edb}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOn sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body1">
                  <strong>Адреса:</strong> {storeData.address}, {storeData.place}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Phone sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body1">
                  <strong>Телефон:</strong> {storeData.phone}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Email sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="body1">
                  <strong>Е-пошта:</strong> {storeData.email}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={12}>
            <Typography variant="h6" sx={{ mb: 2, pt: 5 }}>
              Опис
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {storeData.description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={1} sx={{ p: 2, borderRadius: 2, mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Локации и мапа
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {locationsArray.map((location) => (
            <Button
              key={location.slug}
              variant={selectedLocation === location.slug ? "contained" : "outlined"}
              onClick={() => setSelectedLocation(location.slug)}
              sx={{
                bgcolor: selectedLocation === location.slug ? "primary.main" : "transparent",
                color: selectedLocation === location.slug ? "white" : "primary.main",
                fontWeight: 500,
                padding: "5px 10px",
              }}
            >
              {location.name}
            </Button>
          ))}
        </Box>
        <Box
          sx={{
            width: "100%",
            height: { xs: 250, md: 350 },
            borderRadius: 1,
            overflow: "hidden",
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <iframe
            src={storeData.locations[selectedLocation]?.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${storeData.name} - ${storeData.locations[selectedLocation]?.name}`}
          ></iframe>
        </Box>
      </Paper>
    </Container>
  )
}

export default StoreProfile
