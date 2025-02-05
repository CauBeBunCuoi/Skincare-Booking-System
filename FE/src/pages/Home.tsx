import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, Box } from "@mui/material";
import { Header } from "../components/Header/Header";

export const Home = () => {
    return (
        <>
            <Header />
          {/* Hero Section */}
          <Box position="relative" height={600} mt={10}>
            <img
              src="https://storage.googleapis.com/a1aa/image/LaZ91k6Uqrq_7CsXbdenCO6hzjauailXivduAmyQLEU.jpg"
              alt="A serene spa environment with candles and flowers"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bgcolor="rgba(0,0,0,0.5)"
            >
              <Typography variant="h2" color="white" fontWeight="bold">
                Relax, Rejuvenate, Renew
              </Typography>
              <Typography variant="h5" color="white" mt={2}>
                Book your spa experience today
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                Book Now
              </Button>
            </Box>
          </Box>
    
          {/* Services Section */}
          <Container sx={{ py: 10 }}>
            <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
              Our Services
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {services.map((service, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card>
                    <CardMedia component="img" height="200" image={service.image} alt={service.title} />
                    <CardContent>
                      <Typography variant="h5" fontWeight="bold">
                        {service.title}
                      </Typography>
                      <Typography color="textSecondary" mt={1}>
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
    
          {/* About Us Section */}
          <Box bgcolor="grey.200" py={10}>
            <Container>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <img
                    src="https://storage.googleapis.com/a1aa/image/cZk_mWEr_TAK-M9J7hC1T1SiN65RU7eTHiEEOm_uLpM.jpg"
                    alt="A beautifully decorated spa interior"
                    style={{ width: "100%", borderRadius: 8, boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h3" fontWeight="bold">
                    About Us
                  </Typography>
                  <Typography color="textSecondary" mt={2}>
                    At SpaBooking, we are dedicated to providing you with the best spa experience. Our team of professionals is here to ensure you leave feeling relaxed and rejuvenated.
                  </Typography>
                  <Typography color="textSecondary" mt={2}>
                    We offer a variety of services tailored to meet your needs, from massage therapy to facial treatments and luxurious spa baths. Come and experience the ultimate in relaxation and wellness.
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      );
}

const services = [
    {
      title: "Massage Therapy",
      description: "Experience the ultimate relaxation with our massage therapy services.",
      image: "https://placehold.co/400x300",
    },
    {
      title: "Facial Treatments",
      description: "Rejuvenate your skin with our specialized facial treatments.",
      image: "https://placehold.co/400x300",
    },
    {
      title: "Spa Baths",
      description: "Indulge in a luxurious spa bath experience.",
      image: "https://storage.googleapis.com/a1aa/image/ZVFECQLnBFJgdyuxfjxCsRgb5gVvFG2i3tM_sLCe6E4.jpg",
    },
  ];
  