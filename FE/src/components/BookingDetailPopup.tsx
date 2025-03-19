import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

const BookingDetailPopup = ({ open, handleClose, booking }) => {
  if (!booking) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Booking Details</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={booking.therapist?.imageUrl} sx={{ width: 56, height: 56 }} />
          <Box>
            <Typography variant="h6">{booking.therapist.fullName}</Typography>
            <Typography variant="body2" color="textSecondary">
              {booking.therapist.email} | {booking.therapist.phoneNumber}
            </Typography>
          </Box>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1">Service:</Typography>
          <Typography variant="body1">{booking.service.name}</Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1">Booking Date:</Typography>
          <Typography variant="body1">{new Date(booking.booking.bookingDate).toLocaleDateString()}</Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1">Status:</Typography>
          <Typography
            variant="body1"
            sx={{ color: booking.bookingStatus.name === "Completed" ? "green" : "orange" }}
          >
            {booking.bookingStatus.name}
          </Typography>
        </Box>
        {booking.feedback && (
          <Box mt={2}>
            <Typography variant="subtitle1">Feedback:</Typography>
            <Typography variant="body1">{booking.feedback.feedbackContent || "No feedback provided"}</Typography>
            <Typography variant="body1">Rating: {booking.feedback.rate}/5</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingDetailPopup;
