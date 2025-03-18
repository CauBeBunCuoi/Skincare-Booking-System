import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

type ScheduleItem = {
  title: string;
  date: string;
  type: "leave" | "service";
};

type Employee = {
  id: number;
  name: string;
  role: "Therapist" | "Receptionist"; // You can extend this with more roles
  schedule: ScheduleItem[];
};

const StaffManagement = () => {
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "John Doe",
      role: "Therapist",
      schedule: [
        { title: "Leave", date: "2025-02-20", type: "leave" },
        { title: "Massage Therapy", date: "2025-02-22", type: "service" },
      ],
    },
    { id: 2, name: "Jane Smith", role: "Receptionist", schedule: [] },
    {
      id: 3,
      name: "Alice Johnson",
      role: "Therapist",
      schedule: [
        { title: "Facial Treatment", date: "2025-02-21", type: "service" },
      ],
    },
  ]);

  const handleOpen = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <Card sx={{ p: 2, boxShadow: "none", borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Staff Management
          </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: "none", mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>
                    {employee.role === "Therapist" && (
                      <Button
                        variant="outlined"
                        onClick={() => handleOpen(employee)}
                      >
                        Manage Schedule
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: "50%",
            margin: "auto",
            marginTop: "10%",
            backgroundColor: "white",
            padding: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {selectedEmployee?.name}'s Schedule
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={selectedEmployee?.schedule || []}
              height="350px"
              width="100%"
            />
          </Box>
          <Button
            onClick={handleClose}
            variant="contained"
            color="secondary"
            sx={{ marginTop: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};

export default StaffManagement;
