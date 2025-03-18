import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const therapistData = [
  {
    _id: "67b09c974b0a70299990bfb5",
    fullName: "Bác sĩ đây nè",
  },
];

const UnTherapistCard = ({ booking, onSelectTherapist }) => {
  const [open, setOpen] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAssignTherapist = () => {
    console.log("Therapist: ", selectedTherapist._id);
    onSelectTherapist(booking.booking._id, selectedTherapist._id);
  };

  function formatDateTime(isoString) {
    const date = new Date(isoString);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };

    const time = date.toLocaleTimeString("en-US", options).toUpperCase();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${time} - ${day}/${month}/${year}`;
  }

  const formatCurreny = (currency) => {
    return currency.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="w-full grid grid-cols-7 items-center">
      <div className="col-span-1 flex flex-col items-center justify-center">
        {booking.booking._id}
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        Lộc đẹp trai
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        {booking.service.name}
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        {formatDateTime(booking.booking.appointmentTime)}
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        {formatCurreny(booking.booking.totalFee)}
      </div>
      <div className="col-span-2 flex flex-col items-center justify-center">
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Select Therapist
        </Button>
      </div>

      {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose a Therapist</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Select Therapist</InputLabel>
            <Select
              value={selectedTherapist ? selectedTherapist._id : ""}
              onChange={(e) => {
                const therapist = therapistData.find(
                  (t) => t._id === e.target.value
                );
                setSelectedTherapist(therapist);
              }}
            >
              {therapistData.map((therapist) => (
                <MenuItem key={therapist._id} value={therapist._id}>
                  {therapist.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAssignTherapist}
            color="primary"
            disabled={!selectedTherapist}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UnTherapistCard;
