import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TherapistPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [executionResult, setExecutionResult] = useState({
    customerDescription: "",
    treatmentDescription: "",
    therapistRecommend: "",
  });
  const navigate = useNavigate()

  const therapistId = "t789";
  const bookings = [
    {
      booking: {
        _id: "b1",
        assignedTherapistId: "t789",
        bookStatusId: 3,
        appointmentTime: "2025-03-18T13:10:07.083Z",
      },
      service: { name: "Full Body Massage" },
      bookingStatus: { name: "Up Coming" },
    },
    {
      booking: {
        _id: "b2",
        assignedTherapistId: "t789",
        bookStatusId: 4,
        appointmentTime: "2025-03-18T15:00:00.000Z",
      },
      service: { name: "Hot Stone Therapy" },
      bookingStatus: { name: "Has Check-in" },
    },
    {
      booking: {
        _id: "b3",
        assignedTherapistId: "t789",
        bookStatusId: 5,
        appointmentTime: "2025-03-17T11:00:00.000Z",
      },
      service: { name: "Aromatherapy Massage" },
      bookingStatus: { name: "Completed" },
    },
  ];

  const handleConfirmCompleted = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveExecutionResult = () => {
    console.log("Execution Result:", executionResult);
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{ width: "100%", padding: 3, bgcolor: "#f9f9f9", minHeight: "100vh" }}
    >
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate("/therapist/bookings")}
        >
          Booking Schedule
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/therapist/schedules")}
        >
          Schedule Management
        </Button>
      </Box>
      <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={(e, newIndex) => setTabIndex(newIndex)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Up Coming" />
          <Tab label="Has Check-in" />
          <Tab label="Completed" />
        </Tabs>
      </Paper>

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {bookings
          .filter((b) =>
            tabIndex === 0
              ? [3, 4].includes(b.booking.bookStatusId)
              : tabIndex === 1
              ? b.booking.bookStatusId === 4
              : b.booking.bookStatusId === 5
          )
          .map((b) => (
            <Grid item xs={12} sm={6} md={4} key={b.booking._id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: "#fff",
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {b.service.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {b.bookingStatus.name}
                  </Typography>
                  <Typography variant="body2">
                    Appointment:{" "}
                    {new Date(b.booking.appointmentTime).toLocaleString()}
                  </Typography>
                </CardContent>
                {tabIndex === 1 && b.booking.bookStatusId === 4 && (
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ m: 1, borderRadius: 2, textTransform: "none" }}
                    onClick={handleConfirmCompleted}
                  >
                    Confirm Completed
                  </Button>
                )}
              </Card>
            </Grid>
          ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Enter Execution Result</DialogTitle>
        <DialogContent>
          <TextField
            label="Customer Description"
            fullWidth
            margin="dense"
            variant="outlined"
            value={executionResult.customerDescription}
            onChange={(e) =>
              setExecutionResult({
                ...executionResult,
                customerDescription: e.target.value,
              })
            }
          />
          <TextField
            label="Treatment Description"
            fullWidth
            margin="dense"
            variant="outlined"
            value={executionResult.treatmentDescription}
            onChange={(e) =>
              setExecutionResult({
                ...executionResult,
                treatmentDescription: e.target.value,
              })
            }
          />
          <TextField
            label="Therapist Recommend"
            fullWidth
            margin="dense"
            variant="outlined"
            value={executionResult.therapistRecommend}
            onChange={(e) =>
              setExecutionResult({
                ...executionResult,
                therapistRecommend: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveExecutionResult}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TherapistPage;
