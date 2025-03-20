import React, { useEffect, useState } from "react";
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
import { callApi } from "../../../api/main/api_call/api";
import { loginRequiredApi } from "../../../api/instance/axiosInstance";
import { set } from "react-hook-form";
import { toast } from "react-toastify";
function formatDate(isoString) {
  const date = new Date(isoString);
  const time = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${time} - ${day}/${month}/${year}`;
}
const TherapistPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [upComingBookings, setUpComingBookings] = useState([]);
  const [hasCheckInBookings, setHasCheckInBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);

  const [executionResult, setExecutionResult] = useState({
    customerDescription: "",
    treatmentDescription: "",
    therapistRecommend: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const response = await callApi({
      instance: loginRequiredApi,
      method: "get",
      url: `/bookings/therapist/${accountId}`,
    });
    if (response.success) {
      setBookings(response.data.bookings);
      setUpComingBookings(
        response.data.bookings.filter((booking) => booking.bookStatusId === 3)
      );
      setHasCheckInBookings(
        response.data.bookings.filter((booking) => booking.bookStatusId === 4)
      );
      setCompletedBookings(
        response.data.bookings.filter((booking) => booking.bookStatusId === 6)
      );
      setLoading(false);
    } else {
      console.log("Error fetching data: ", response.message);
      setLoading(false);
    }
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const accountId = user?._id;

  const handleConfirmCompleted = (id) => {
    setSelectedBookingId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveExecutionResult = async () => {
    console.log("Handle Confirm For Booking ID: ", selectedBookingId);
    console.log("Execution Result:", executionResult);
    const response = await callApi({
      instance: loginRequiredApi,
      method: "post",
      url: `/bookings/${selectedBookingId}/execution-result`,
      data: executionResult,
    });
    if (response.success) {
      toast.success("Confirm Completed Successfully!");
      fetchBookings();
    } else {
      toast.error("Error when confirm completed: " + response.message);
    }
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

      {loading ? (
        <p>Loading....</p>
      ) : (
        <div className="w-[90%] mx-auto mt-10">
          {tabIndex === 0 && upComingBookings.length > 0 && (
            <div className="w-full grid grid-cols-3 gap-4">
              {upComingBookings.map((booking) => (
                <div className="rounded-md border border-gray-300 p-4">
                  <p>
                    <strong>Booking Id</strong>: #{booking._id}
                  </p>
                  <p>
                    <strong>AppointmentTime:</strong>{" "}
                    {formatDate(booking.appointmentTime)}
                  </p>
                  <p>
                    <strong>Customer:</strong> Hào nè
                  </p>
                  <p>
                    <strong>Service:</strong> Điều trị rỗ da
                  </p>
                </div>
              ))}
            </div>
          )}
          {tabIndex === 1 && hasCheckInBookings.length > 0 && (
            <div className="w-full grid grid-cols-3 gap-4">
              {hasCheckInBookings.map((booking) => (
                <div className="rounded-md border border-gray-300 p-4">
                  <p>
                    <strong>Booking Id</strong>: #{booking._id}
                  </p>
                  <p>
                    <strong>AppointmentTime:</strong>{" "}
                    {formatDate(booking.appointmentTime)}
                  </p>
                  <p>
                    <strong>Customer:</strong> Hào nè
                  </p>
                  <p className="mb-2">
                    <strong>Service:</strong> Điều trị rỗ da
                  </p>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => handleConfirmCompleted(booking._id)}
                  >
                    Confirm Completed
                  </Button>
                </div>
              ))}
            </div>
          )}
          {tabIndex === 2 && completedBookings.length > 0 && (
            <div className="w-full grid grid-cols-3 gap-4">
              {completedBookings.map((booking) => (
                <div className="rounded-md border border-gray-300 p-4">
                  <p>
                    <strong>Booking Id</strong>: #{booking._id}
                  </p>
                  <p>
                    <strong>AppointmentTime:</strong>{" "}
                    {formatDate(booking.appointmentTime)}
                  </p>
                  <p>
                    <strong>Customer:</strong> Hào nè
                  </p>
                  <p>
                    <strong>Service:</strong> Điều trị rỗ da
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Enter Execution Result For Booking ID:{" "}
          {selectedBookingId ? selectedBookingId : "N/A"}
        </DialogTitle>
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
