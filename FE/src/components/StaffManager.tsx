import React, { useState } from "react";
import { Modal, Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const StaffManagement = () => {
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", role: "Therapist", schedule: [
      { title: "Leave", date: "2025-02-20", type: "leave" },
      { title: "Massage Therapy", date: "2025-02-22", type: "service" }
    ] },
    { id: 2, name: "Jane Smith", role: "Receptionist", schedule: [] },
    { id: 3, name: "Alice Johnson", role: "Therapist", schedule: [
      { title: "Facial Treatment", date: "2025-02-21", type: "service" }
    ] }
  ]);

  const handleOpen = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Employee Management</Typography>
      <TableContainer component={Paper}>
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
                    <Button variant="outlined" onClick={() => handleOpen(employee)}>Manage Schedule</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ 
          width: "50%", 
          margin: "auto", 
          marginTop: "10%", 
          backgroundColor: "white", 
          padding: 2, 
          textAlign: "center" 
        }}>
          <Typography variant="h6" gutterBottom>{selectedEmployee?.name}'s Schedule</Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <FullCalendar 
              plugins={[dayGridPlugin]} 
              initialView="dayGridMonth" 
              events={selectedEmployee?.schedule || []} 
              height="350px"
              width="100%"
            />
          </Box>
          <Button onClick={handleClose} variant="contained" color="secondary" sx={{ marginTop: 2 }}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default StaffManagement;
