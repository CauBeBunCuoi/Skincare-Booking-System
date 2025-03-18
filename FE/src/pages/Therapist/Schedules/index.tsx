import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  MenuItem,
  Select,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const ScheduleManagement = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduleDialog, setScheduleDialog] = useState(false);
  const [leaveSchedules, setLeaveSchedules] = useState([]);
  const [newLeave, setNewLeave] = useState({ date: null, type: "" });
  const [bookings, setBookings] = useState<{ time: string; service: string }[]>(
    []
  );
  const navigate = useNavigate();

  const handleOpenScheduleDialog = () => setScheduleDialog(true);
  const handleCloseScheduleDialog = () => setScheduleDialog(false);

  const handleAddLeaveSchedule = () => {
    if (newLeave.date && newLeave.type.trim() !== "") {
      setLeaveSchedules([...leaveSchedules, newLeave]);
      setNewLeave({ date: null, type: "" });
      setScheduleDialog(false);
    }
  };

  const handleDeleteLeaveSchedule = (index) => {
    setLeaveSchedules(leaveSchedules.filter((_, i) => i !== index));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setBookings([
      { time: "10:00 AM", service: "Full Body Massage" },
      { time: "02:00 PM", service: "Hot Stone Therapy" },
    ]);
  };

  return (
    <Box
      sx={{ width: "100%", padding: 3, bgcolor: "#f9f9f9", minHeight: "100vh" }}
    >
      <Box className="flex gap-4 mb-4">
        <Button
          variant="contained"
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => navigate("/therapist/bookings")}
        >
          Booking Schedule
        </Button>
        <Button
          variant="contained"
          className="bg-green-500 hover:bg-green-600 text-white"
          onClick={() => navigate("/therapist/schedules")}
        >
          Schedule Management
        </Button>
      </Box>

      <Typography variant="h6" className="mt-4 font-bold">
        Manage Schedule
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={handleDateChange}
          className="mt-2 w-full"
        />
      </LocalizationProvider>

      {selectedDate && (
        <Box className="mt-4">
          <Typography variant="h6" className="font-semibold">
            Bookings for {selectedDate.format("DD/MM/YYYY")}
          </Typography>
          <List>
            {bookings.map((booking, index) => (
              <ListItem
                key={index}
                className="border rounded-lg shadow-sm p-2 my-2"
              >
                <ListItemText
                  primary={`${booking.time} - ${booking.service}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenScheduleDialog}
        className="mt-5 bg-purple-500 hover:bg-purple-600 text-white"
        startIcon={<CalendarMonthIcon />}
      >
        Register Leave Schedule
      </Button>

      <Typography variant="h6" className="mt-4 font-semibold">
        Leave Schedules
      </Typography>
      <List>
        {leaveSchedules.map((schedule, index) => (
          <Card key={index} className="my-2 p-2 shadow-md border rounded-lg">
            <CardContent>
              <ListItem>
                <ListItemText
                  primary={`Date: ${schedule.date.format("DD/MM/YYYY")}`}
                  secondary={`Type: ${schedule.type}`}
                />
                <Button
                  color="error"
                  onClick={() => handleDeleteLeaveSchedule(index)}
                  startIcon={<DeleteIcon />}
                  className="ml-4"
                >
                  Delete
                </Button>
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>

      <Dialog
        open={scheduleDialog}
        onClose={handleCloseScheduleDialog}
        className="p-4"
      >
        <DialogTitle className="font-bold">Register Leave Schedule</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Leave Date"
              value={newLeave.date}
              onChange={(date) => setNewLeave({ ...newLeave, date })}
              className="mb-4 w-full"
            />
          </LocalizationProvider>
          <Select
            fullWidth
            value={newLeave.type}
            onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
            className="mt-2"
          >
            <MenuItem value="Morning">Morning</MenuItem>
            <MenuItem value="Afternoon">Afternoon</MenuItem>
            <MenuItem value="Evening">Evening</MenuItem>
            <MenuItem value="Weekly">Weekly (e.g., every Tuesday)</MenuItem>
            <MenuItem value="Monthly">
              Monthly (e.g., first 2 days of the month)
            </MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseScheduleDialog}
            className="text-gray-600 hover:text-gray-800"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddLeaveSchedule}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ScheduleManagement;
