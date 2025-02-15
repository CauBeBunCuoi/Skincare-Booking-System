import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
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
import { Close } from "@mui/icons-material";

interface Appointment {
  id: number;
  patientName: string;
  department: string;
  age: number;
  dateTime: string;
  doctorName: string;
  fees: string;
  patientAvatar: string;
  doctorAvatar: string;
}

const appointments: Appointment[] = [
  {
    id: 1,
    patientName: "Richard James",
    department: "Richard James",
    age: 28,
    dateTime: "24th July, 2024, 10:AM",
    doctorName: "Dr. Richard James",
    fees: "$50",
    patientAvatar: "https://randomuser.me/api/portraits/men/75.jpg",
    doctorAvatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    id: 2,
    patientName: "Richard James",
    department: "Richard James",
    age: 28,
    dateTime: "24th July, 2024, 10:AM",
    doctorName: "Dr. Richard James",
    fees: "$50",
    patientAvatar: "https://randomuser.me/api/portraits/men/75.jpg",
    doctorAvatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

const Appointments: React.FC = () => {
  return (
    <Card sx={{ p: 2, boxShadow: "none", borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          All Appointments
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Patient</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Age</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date & Time</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Doctor</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Fees</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.id}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar src={appointment.patientAvatar} />
                      {appointment.patientName}
                    </Box>
                  </TableCell>
                  <TableCell>{appointment.department}</TableCell>
                  <TableCell>{appointment.age}</TableCell>
                  <TableCell>{appointment.dateTime}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar src={appointment.doctorAvatar} />
                      {appointment.doctorName}
                    </Box>
                  </TableCell>
                  <TableCell>{appointment.fees}</TableCell>
                  <TableCell>
                    <IconButton color="error">
                      <Close />
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

export default Appointments;
