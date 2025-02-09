import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { Header } from "../components/Header/Header";
import { DoctorProfile } from "../components/DoctorProfile/DoctorProfile";

// Form Data Structure
interface BookingFormData {
  name: string;
  email: string;
  message?: string;
}

// Time Slots
const timeSlots = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

// Date Generator
const generateDates = (days: number): string[] => {
  return [...Array(days)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toDateString();
  });
};

const BookingPage: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<BookingFormData>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const dates = generateDates(7);

  const handleTimeClick = (time: string) => setSelectedTime(time);
  const handleDateClick = (date: string) => setSelectedDate(date);
  const onSubmit: SubmitHandler<BookingFormData> = (data) => {
    reset();
    alert("Appointment booked successfully!");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <Container
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 10, // Adjust for fixed header
        }}
      >
        <DoctorProfile />
        <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
          Book an Appointment
        </Typography>

        <Paper sx={{ p: 3,  width: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Date Slots */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">Select Date</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                  {dates.map((date) => (
                    <Button
                      key={date}
                      variant={selectedDate === date ? "contained" : "outlined"}
                      onClick={() => handleDateClick(date)}
                    >
                      {date}
                    </Button>
                  ))}
                </Box>
              </Grid>

              {/* Time Slots */}
              <Grid item xs={12}>
                <Typography variant="subtitle1">Select Time</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "contained" : "outlined"}
                      onClick={() => handleTimeClick(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </Box>
              </Grid>

              {/* Message Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message (Optional)"
                  multiline
                  rows={3}
                  {...register("message")}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button type="submit" variant="contained">
                  Book Appointment
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default BookingPage;
