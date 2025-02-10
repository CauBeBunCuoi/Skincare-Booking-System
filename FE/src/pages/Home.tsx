import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import { Header } from "../components/Header/Header";
import DoctorCarousel from "../components/DoctorCarousel";

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
      <Box sx={{ px: 10, py: 10 }}>
        <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 6px 20px rgba(0,0,0,0.2)",
                  },
                  cursor: 'pointer',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={service.image}
                  alt={service.title}
                />
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
      </Box>

      <Box sx={{ px: 10, py: 10 }}>
        <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
          Our Doctors
        </Typography>
        <DoctorCarousel />
      </Box>

      {/* About Us Section */}
      <Box bgcolor="grey.200" py={10}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <img
                src="https://storage.googleapis.com/a1aa/image/cZk_mWEr_TAK-M9J7hC1T1SiN65RU7eTHiEEOm_uLpM.jpg"
                alt="A beautifully decorated spa interior"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontWeight="bold">
                About Us
              </Typography>
              <Typography color="textSecondary" mt={2}>
                At SpaBooking, we are dedicated to providing you with the best
                spa experience. Our team of professionals is here to ensure you
                leave feeling relaxed and rejuvenated.
              </Typography>
              <Typography color="textSecondary" mt={2}>
                We offer a variety of services tailored to meet your needs, from
                massage therapy to facial treatments and luxurious spa baths.
                Come and experience the ultimate in relaxation and wellness.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

const services = [
  {
    title: "Dermatological Treatment",
    description:
      "Our dermatological treatments are designed to address various skin concerns, including acne, pigmentation, and sensitive skin conditions. We ensure your skin receives the best care for long-term health.",
    image:
      "https://www.thevelvetskincentre.com/blog/wp-content/uploads/2024/11/best-dermatologist-in-lucknow-the-velvet-skin-centre-indira-nagar-hydrafacial-in-lucknow.png",
  },
  {
    title: "Aesthetic Dermatology",
    description:
      "Enhance your natural beauty with our aesthetic dermatology services. From anti-aging treatments to facial rejuvenation, our experts use non-invasive and minimally invasive procedures to restore youthful glow and boost skin elasticity.",
    image:
      "https://drhassanmedical.com/wp-content/uploads/2024/01/Filler-1.jpg",
  },
  {
    title: "Advanced Skincare",
    description:
      "Experience the next level of skincare with our customized solutions. We offer personalized skin analysis and tailor-made treatments that target deep skin layers, ensuring hydration, nourishment, and revitalization for all skin types.",
    image:
      "https://img1.wsimg.com/isteam/ip/3808fdd6-2d5f-45d3-9de4-14078340a916/BEAUTY%20SKIN%20CRE.webp/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:400,cg:true",
  },
  {
    title: "Laser and High-Tech Treatment",
    description:
      "Utilizing cutting-edge technology, our laser and high-tech treatments effectively address issues such as hair removal, skin tightening, and pigmentation correction. These safe and efficient procedures deliver noticeable results with minimal downtime.",
    image: "https://www.dragarwalclinic.com/uploaded_files/laser-treatment.jpg",
  },
];
