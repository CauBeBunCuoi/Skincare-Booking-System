import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Dermatologist",
    image:
      "https://res.cloudinary.com/dvupk17eh/image/upload/v1728290475/jcvjsxzehjxltazkadhn.png",
  },
  {
    name: "Dr. Michael Smith",
    specialty: "Aesthetic Specialist",
    image:
      "https://res.cloudinary.com/dvupk17eh/image/upload/v1728385436/okvd0ycokxbke9bsvtri.png",
  },
  {
    name: "Dr. Emily Davis",
    specialty: "Laser Treatment Expert",
    image:
      "https://res.cloudinary.com/dvupk17eh/image/upload/v1728557470/efv8covmlpelcahqkcfw.png",
  },
  {
    name: "Dr. Emily Davis",
    specialty: "Laser Treatment Expert",
    image:
      "https://res.cloudinary.com/dvupk17eh/image/upload/v1728557694/i0hrz6iiqom6z57dprnh.png",
  },
  {
    name: "Dr. Emily Davis",
    specialty: "Laser Treatment Expert",
    image:
      "https://res.cloudinary.com/dvupk17eh/image/upload/v1728557871/dtxdyry1wnjo9n2xzldq.png",
  },
];

const DoctorCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container sx={{ textAlign: "center", py: 4 }}>
      <Box sx={{ maxWidth: "100%", mx: "auto" }}>
        <Slider {...settings}>
          {doctors.map((doctor, index) => (
            <Box key={index} display="flex" justifyContent="center" px={1}>
              <Card
                sx={{
                  cursor: "pointer",
                  maxWidth: 345,
                  textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 6px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={doctor.image}
                  alt={doctor.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.specialty}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default DoctorCarousel;
