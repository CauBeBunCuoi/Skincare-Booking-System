import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import { portServer } from "../utils/portserver";
import { callApi } from "../api/main/api_call/api";
import { publicApi } from "../api/instance/axiosInstance";
import BookingDetailPopup from "./BookingDetailPopup";

interface Booking {
  booking: {
    _id: string;
    appointmentTime: string;
    startTime: string;
    endTime: string;
    checkInTime?: string;
    checkOutTime?: string;
    totalFee: number;
    hasPaid: boolean;
    cancelReason?: string;
  };
  service: {
    name: string;
    duration: number;
    fee: number;
  };
  therapist: {
    fullName: string;
    experienceYears: number;
    imageUrl: string;
  };
  bookingStatus: {
    name: string;
  };
  executionResult?: {
    customerDescription: string;
    treatmentDescription: string;
    therapistRecommend: string;
  };
  feedback?: {
    feedbackContent: string;
    rate: number;
  };
}

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = (booking) => {
    setSelectedBooking(booking);
    setOpenPopup(true);
  };

  const getAllBookings = async () => {
    try {
      const res = await callApi({
        instance: publicApi,
        method: "get",
        url: "/bookings",
      });
      setBookings(res.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
      >
        Booking Management
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {[
                "Service",
                "Therapist",
                "Appointment Time",
                "Start Time",
                "End Time",
                "Total Fee",
                "Status",
                "Actions",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((b) => (
              <TableRow key={b.booking._id}>
                <TableCell sx={{ textAlign: "center" }}>
                  {b.service.name}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Box
                    display="flex"
                    alignItems="start"
                    justifyContent="start"
                    gap={1}
                  >
                    <Avatar
                      src={b.therapist?.imageUrl}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Typography>{b.therapist?.fullName}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {new Date(b.booking.appointmentTime).toLocaleString()}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {new Date(b.booking.startTime).toLocaleString()}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {new Date(b.booking.endTime).toLocaleString()}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  ${b.booking.totalFee.toFixed(2)}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color:
                        b.bookingStatus.name === "Completed"
                          ? "green"
                          : "orange",
                    }}
                  >
                    {b.bookingStatus.name}
                  </Typography>
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: "none" }}
                    onClick={() => handleOpenPopup(b)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <BookingDetailPopup
              open={openPopup}
              handleClose={() => setOpenPopup(false)}
              booking={selectedBooking}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BookingList;
