import { Box, Typography, Grid, Paper } from "@mui/material";
import { Header } from "../components/Header/Header";

const AboutUs = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          maxWidth: "1280px",
          mx: "auto",
          mt: 15
        }}
      >
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              "& span": { color: "black" },
            }}
          >
            ABOUT <span>US</span>
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://storage.googleapis.com/a1aa/image/apy5BDjLZA9BCjMmoR0wv1aMehXx1Ww20hkDKF8ZGrs.jpg"
              alt="Two spa professionals smiling in a spa setting"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography paragraph sx={{ mb: 4 }}>
              Welcome To SpaEase, Your Trusted Partner In Managing Your Spa
              Appointments Conveniently And Efficiently. At SpaEase, We
              Understand The Challenges Individuals Face When It Comes To
              Scheduling Spa Treatments And Managing Their Wellness Routines.
            </Typography>

            <Typography paragraph sx={{ mb: 4 }}>
              SpaEase Is Committed To Excellence In Spa Management Technology.
              We Continuously Strive To Enhance Our Platform, Integrating The
              Latest Advancements To Improve User Experience And Deliver
              Superior Service. Whether You're Booking Your First Spa
              Appointment Or Managing Ongoing Wellness Sessions, SpaEase Is Here
              To Support You Every Step Of The Way.
            </Typography>

            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Our Vision
            </Typography>
            <Typography>
              Our Vision At SpaEase Is To Create A Seamless Spa Experience For
              Every User. We Aim To Bridge The Gap Between Clients And Spa
              Providers, Making It Easier For You To Access The Relaxation And
              Care You Need, When You Need It.
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              "& span": { color: "black" },
            }}
          >
            WHY <span>CHOOSE US</span>
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 6,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                EFFICIENCY:
              </Typography>
              <Typography>
                Streamlined Appointment Scheduling That Fits Into Your Busy
                Lifestyle.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 6,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                CONVENIENCE:
              </Typography>
              <Typography>
                Access To A Network Of Trusted Spa Professionals In Your Area.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 6,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                PERSONALIZATION:
              </Typography>
              <Typography>
                Tailored Recommendations And Reminders To Help You Stay On Top
                Of Your Wellness.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AboutUs;
