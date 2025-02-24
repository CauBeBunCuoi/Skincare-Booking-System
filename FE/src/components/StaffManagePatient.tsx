import React, { useState } from "react";
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

interface Patient {
    id: number;
    patient: string;
    service: string;
    checkin_time: string;
    checkout_time: string;
    doctor: string;
    status: boolean;
    avatar: string;
}

const initialPatients: Patient[] = [
    {
        id: 1,
        patient: "Hào",
        service: "Cardiology",
        checkin_time: "10:00 AM",
        checkout_time: "11:00 AM",
        doctor: "Dr. Susan Taylor",
        status: true,
        avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        id: 2,
        patient: "Lộc",
        service: "Neurology",
        checkin_time: "10:00 AM",
        checkout_time: "11:00 AM",
        doctor: "Dr. Susan Taylor",
        status: false,
        avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
];

const StaffManagePatient: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>(initialPatients);

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>Manage Patients</Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 1, mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableCell>ID</TableCell>
                            <TableCell>Patient</TableCell>
                            <TableCell>Service</TableCell>
                            <TableCell>Check-in Time</TableCell>
                            <TableCell>Check-out Time</TableCell>
                            <TableCell>Doctor</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.map((p) => (
                            <TableRow key={p.id}>
                                <TableCell>{p.id}</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Avatar src={p.avatar} />
                                        {p.patient}
                                    </Box>
                                </TableCell>
                                <TableCell>{p.service}</TableCell>
                                <TableCell>{p.checkin_time}</TableCell>
                                <TableCell>{p.checkout_time}</TableCell>
                                <TableCell>{p.doctor}</TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            color: p.status ? "green" : "red",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {p.status ? "Checked Out" : "Checked In"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton color="primary">
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error">
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default StaffManagePatient;
