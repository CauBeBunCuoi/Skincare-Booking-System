import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import ReactStars from "react-rating-stars-component";
import { callApi } from "../../../../api/main/api_call/api";
import { loginRequiredApi } from "../../../../api/instance/axiosInstance";

const ProcessingCard = ({ onFeedBack, booking }) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [feedback, setFeedback] = useState("");

  function formatDateTime(isoString) {
    const date = new Date(isoString);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };

    const time = date.toLocaleTimeString("en-US", options).toUpperCase();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${time} - ${day}/${month}/${year}`;
  }

  const formatCurrency = (currency) => {
    return currency.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handleCheckOut = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onFeedBack(booking.booking, rating, feedback);
    setOpen(false);
  };

  return (
    <div className="w-full grid grid-cols-7 items-center py-3">
      <div className="col-span-1 flex flex-col items-center justify-center">
        {booking.booking._id}
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        {booking.customer?.fullName ?? "Unknown"}
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        {booking.service.name}
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        {formatDateTime(booking.booking.appointmentTime)}
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        {formatCurrency(booking.booking.totalFee)}
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        {booking.therapist?.fullName ?? "No therapist"}
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        <Button variant="contained" color="primary" onClick={handleCheckOut}>
          Confirm Check-out
        </Button>
      </div>

      {/* Dialog for Rating & Feedback */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Leave a Review</DialogTitle>
        <DialogContent>
          <ReactStars
            count={3}
            value={rating}
            onChange={(newValue) => setRating(newValue)}
            size={30}
            activeColor="#ffd700"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Feedback"
            type="text"
            fullWidth
            variant="outlined"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProcessingCard;
