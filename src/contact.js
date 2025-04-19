"use client"
import { Box, Container, Typography, useTheme, useMediaQuery, Card, CardContent } from "@mui/material"
import { Email, Phone, AutoAwesome } from "@mui/icons-material"

const Contact = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          mb: 6,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: "linear-gradient(90deg, #1976d2, #42a5f5)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          Контактирајте нѐ
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            maxWidth: "600px",
            fontSize: { xs: "1rem", md: "1.1rem" },
          }}
        >
          Имате прашања или сакате да соработувате со нас? Слободно контактирајте нѐ.
        </Typography>
      </Box>

      {/* Contact Card */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid rgba(0,0,0,0.08)",
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          mb: 6,
          overflow: "hidden",
          position: "relative",
          maxWidth: "600px",
          mx: "auto",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          "&:hover": {
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
            transform: "translateY(-5px)",
          },
          transition: "all 0.3s ease",
        }}
      >
        {/* Decorative Element */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "6px",
            background: "linear-gradient(90deg, #1976d2, #42a5f5)",
          }}
        />

        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* Email */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 3,
                borderRadius: 2,
                bgcolor: "rgba(25, 118, 210, 0.05)",
                border: "1px solid rgba(25, 118, 210, 0.1)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                  mr: 3,
                  boxShadow: "0 4px 10px rgba(25, 118, 210, 0.2)",
                }}
              >
                <Email fontSize="medium" />
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.primary", mb: 0.5 }}>
                  Е-пошта
                </Typography>
                <Typography
                  variant="h6"
                  component="a"
                  href="mailto:info@e-cenovnik.mk"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  info@e-cenovnik.mk
                </Typography>
              </Box>
            </Box>

            {/* Phone */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 3,
                borderRadius: 2,
                bgcolor: "rgba(25, 118, 210, 0.05)",
                border: "1px solid rgba(25, 118, 210, 0.1)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                  mr: 3,
                  boxShadow: "0 4px 10px rgba(25, 118, 210, 0.2)",
                }}
              >
                <Phone fontSize="medium" />
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.primary", mb: 0.5 }}>
                  Телефон
                </Typography>
                <Typography
                  variant="h6"
                  component="a"
                  href="tel:+38975213967"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  +389 75 213 967
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Why Choose Us Section */}
      <Box sx={{ maxWidth: "800px", mx: "auto", textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 4,
            color: "text.primary",
            position: "relative",
            display: "inline-block",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: "60px",
              height: "3px",
              background: "linear-gradient(90deg, #1976d2, #42a5f5)",
              borderRadius: "10px",
            },
          }}
        >
          Зошто да нѐ изберете нас?
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 4,
            mt: 6,
          }}
        >
          {[
            {
              title: "Едноставно користење",
              description:
                "Нашата платформа е дизајнирана да биде едноставна и интуитивна за користење, овозможувајќи брзо и лесно пребарување.",
              icon: <AutoAwesome sx={{ fontSize: 40, color: "#1976d2" }} />,
            },
            {
              title: "Редовно ажурирање",
              description:
                "Нашиот тим постојано работи на ажурирање на цените и додавање нови продавници за да ви обезбедиме најточни информации.",
              icon: <AutoAwesome sx={{ fontSize: 40, color: "#1976d2" }} />,
            },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                p: 4,
                borderRadius: 4,
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative top border */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "4px",
                  background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                }}
              />

              {/* Icon with circle background */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                  background: "rgba(25, 118, 210, 0.08)",
                  boxShadow: "0 4px 20px rgba(25, 118, 210, 0.15)",
                }}
              >
                {item.icon}
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "text.primary",
                }}
              >
                {item.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default Contact
