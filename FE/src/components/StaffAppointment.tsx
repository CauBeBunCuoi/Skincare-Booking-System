import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Select,
    MenuItem,
    IconButton,
    Typography,
    Paper,
    Box,
    Card,
    CardContent,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

interface Doctor {
    id: number;
    name: string;
    image: string;
}

interface Appointment {
    id: number;
    patient: string;
    patientImage: string;
    department: string;
    age: number;
    dateTime: string;
    doctor: Doctor | null;
    status: "pending" | "confirmed";
}

const doctors: Doctor[] = [
    { id: 1, name: "Dr. Richard James", image: "https://via.placeholder.com/40" },
    { id: 2, name: "Dr. Emily Carter", image: "https://via.placeholder.com/40" },
];

const StaffAppointment: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([
        {
            id: 1,
            patient: "Richard James",
            patientImage: "https://via.placeholder.com/40",
            department: "Dermatology",
            age: 28,
            dateTime: "24th July, 2024, 10:AM",
            doctor: null,
            status: "pending",
        },
        {
            id: 2,
            patient: "Richard James",
            patientImage: "https://via.placeholder.com/40",
            department: "Dermatology",
            age: 28,
            dateTime: "24th July, 2024, 10:AM",
            doctor: doctors[0],
            status: "confirmed",
        },
    ]);

    const handleDoctorChange = (id: number, doctor: Doctor | null): void => {
        setAppointments((prev) =>
            prev.map((app) =>
                app.id === id ? { ...app, doctor, status: doctor ? "confirmed" : "pending" } : app
            )
        );
    };

    return (
        <Card sx={{ p: 2, boxShadow: "none", borderRadius: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight="bold">
                        Appointment Management
                    </Typography>
                </Box>

                <TableContainer component={Paper} sx={{ padding: 2, boxShadow: "none" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Patient</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Date & Time</TableCell>
                                <TableCell>Doctor</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointments.map((appointment) => (
                                <TableRow key={appointment.id}>
                                    <TableCell>{appointment.id}</TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <Avatar src={appointment.patientImage} sx={{ marginRight: 1 }} />
                                            {appointment.patient}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{appointment.department}</TableCell>
                                    <TableCell>{appointment.age}</TableCell>
                                    <TableCell>{appointment.dateTime}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={appointment.doctor || ""}
                                            onChange={(e) =>
                                                handleDoctorChange(appointment.id, e.target.value as Doctor | null)
                                            }
                                            displayEmpty
                                            fullWidth
                                        >
                                            <MenuItem value="">Select Doctor</MenuItem>
                                            {doctors.map((doc) => (
                                                <MenuItem key={doc.id} value={doc}>
                                                    <Box display="flex" alignItems="center">
                                                        <Avatar src={doc.image} sx={{ marginRight: 1 }} />
                                                        {doc.name}
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color={appointment.status === "confirmed" ? "success" : "error"}>
                                            {appointment.status === "confirmed" ? <CheckCircle /> : <Cancel />}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    );
};

export default StaffAppointment;
