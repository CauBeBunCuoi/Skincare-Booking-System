import React from "react";
import { Card, CardMedia, CardContent, Typography, Grid, Box } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const doctors = [
  {
    name: "Dr. Richard James",
    specialty: "General Physician",
    image: "https://storage.googleapis.com/a1aa/image/rE3dc8XocQutMDWO3Ys8O_3VeHLk6OuVJAS4YxBlLWw.jpg",
    available: true,
  },
  {
    name: "Dr. Emily Larson",
    specialty: "Gynecologist",
    image: "https://storage.googleapis.com/a1aa/image/RCv9AyL0kLqMAxjZMrRLEyMjwhGskqmUJnvfkXTxxNA.jpg",
    available: true,
  },
  {
    name: "Dr. Sarah Patel",
    specialty: "Dermatologist",
    image: "https://storage.googleapis.com/a1aa/image/NNDGdotk2NSuTpFqzrEKBtSssmkhHeqixQ4iqgRSi3U.jpg",
    available: true,
  },
  {
    name: "Dr. Christopher Lee",
    specialty: "Pediatrician",
    image: "https://storage.googleapis.com/a1aa/image/8UTqPZezw-j7idsW-H7tJebUgFDU5AmdQeHGgfKlv2Q.jpg",
    available: true,
  },
  {
    name: "Dr. Jane Doe",
    specialty: "Specialist",
    image: "https://storage.googleapis.com/a1aa/image/6CZ4ZYKcvQ4R3zSCrWWHlEY_YmLa9reUb8OaIp06N44.jpg",
    available: false,
  },
  {
    name: "Dr. John Smith",
    specialty: "Specialist",
    image: "https://storage.googleapis.com/a1aa/image/6CZ4ZYKcvQ4R3zSCrWWHlEY_YmLa9reUb8OaIp06N44.jpg",
    available: false,
  },
  {
    name: "Dr. Michael Brown",
    specialty: "Specialist",
    image: "https://storage.googleapis.com/a1aa/image/6CZ4ZYKcvQ4R3zSCrWWHlEY_YmLa9reUb8OaIp06N44.jpg",
    available: false,
  },
];

const DoctorList = () => {
  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      <Grid container spacing={3}>
        {doctors.map((doctor, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 6,
                  transform: "scale(1.03)",
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <CardMedia component="img" height="200" image={doctor.image} alt={doctor.name} />
              <CardContent>
                {doctor.available && (
                  <Box display="flex" alignItems="center" mb={1}>
                    <CircleIcon fontSize="small" sx={{ color: "green", marginRight: "5px" }} />
                    <Typography variant="body2" color="green">
                      Available
                    </Typography>
                  </Box>
                )}
                <Typography variant="h6" fontWeight="bold">
                  {doctor.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {doctor.specialty}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DoctorList;
