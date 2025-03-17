import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Tooltip,
} from "@mui/material";
import { Edit, Delete, Payment } from "@mui/icons-material";
import axios from "axios";
import { portServer } from '../utils/portserver';

interface Booking {
    _id: string;
    booking: {
        patientName: string;
        checkinTime: string;
        checkoutTime?: string;
    };
    service: {
        name: string;
    };
    therapist: {
        fullName: string;
        imageUrl: string;
    };
    bookingStatus: string;
}

const BookingList: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([
        {
            "_id": "65a4bcdef123456789abcd01",
            "booking": {
                'patientName': "Lộc",
                "checkinTime": "2025-03-20T14:00:00Z",
                "checkoutTime": "2025-03-10T10:30:00Z"
            },
            "service": {
                "name": "Deep Tissue Massage",
            },
            "therapist": {
                "fullName": "Dr. John Doe",
                "imageUrl": "https://example.com/john-doe.jpg"
            },
            "bookingStatus": "confirmed",
            "executionResult": {
                "success": true,
                "message": "Booking completed successfully."
            },
            "feedback": {
                "rating": 5,
                "comment": "Amazing experience, very professional therapist!"
            }
        }
    ]);

    const getAllBookings = async () => {
        try {
            const res = await axios.get(`${portServer}/bookings`);
            setBookings(res.data.bookings);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const handleCheckOut = async (id: string) => {
        try {
            await axios.post(`${portServer}/bookings/${id}/check-out`);
            getAllBookings();
        } catch (error) {
            console.error("Error checking out:", error);
        }
    };

    const handlePayment = async (id: string) => {
        try {
            await axios.post(`${portServer}/bookings/${id}/payment-link`);
            handleCheckOut(id);
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };

    useEffect(() => {
        getAllBookings();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#333" }}>Manage Patients</Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#1976d2" }}>
                            {[
                                "ID", "Patient", "Service", "Check-in Time", "Check-out Time", "Therapist", "Status", "Actions"
                            ].map((header) => (
                                <TableCell key={header} sx={{ color: "#fff", fontWeight: "bold" }}>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((b) => (
                            <TableRow key={b._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: "#f9f9f9" } }}>
                                <TableCell>{b._id}</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Avatar src={b.therapist.imageUrl} />
                                        <Typography fontWeight="bold">{b.booking.patientName}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{b.service.name}</TableCell>
                                <TableCell>{b.booking.checkinTime}</TableCell>
                                <TableCell>{b.booking.checkoutTime || "N/A"}</TableCell>
                                <TableCell>{b.therapist.fullName}</TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            color: b.bookingStatus === "Completed" ? "green" : "orange",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {b.bookingStatus}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Edit">
                                        <IconButton color="primary">
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton color="error">
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Pay & Checkout">
                                        <Button
                                            variant="contained"
                                            color="success"
                                            sx={{ ml: 1, textTransform: "none" }}
                                            startIcon={<Payment />}
                                            onClick={() => handlePayment(b._id)}
                                        >
                                            Pay & Checkout
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default BookingList;
