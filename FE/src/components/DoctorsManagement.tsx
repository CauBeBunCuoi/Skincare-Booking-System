import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

interface Doctor {
  id: number;
  name: string;
  department: string;
  fees: string;
  avatar: string;
}

const initialDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Richard James",
    department: "Cardiology",
    fees: "$100",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    id: 2,
    name: "Dr. Susan Taylor",
    department: "Neurology",
    fees: "$120",
    avatar: "https://randomuser.me/api/portraits/women/60.jpg",
  },
];

const DoctorsManagement: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [form, setForm] = useState({ name: "", department: "", fees: "" });

  // Open Dialog for Editing or Adding
  const handleOpenDialog = (doctor?: Doctor) => {
    if (doctor) {
      setEditingDoctor(doctor);
      setForm({
        name: doctor.name,
        department: doctor.department,
        fees: doctor.fees,
      });
    } else {
      setEditingDoctor(null);
      setForm({ name: "", department: "", fees: "" });
    }
    setOpenDialog(true);
  };

  // Close Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save or Edit Doctor
  const handleSaveDoctor = () => {
    if (editingDoctor) {
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === editingDoctor.id ? { ...doc, ...form } : doc
        )
      );
    } else {
      const newDoctor: Doctor = {
        id: doctors.length + 1,
        name: form.name,
        department: form.department,
        fees: form.fees,
        avatar: "https://randomuser.me/api/portraits/men/80.jpg", // Default avatar
      };
      setDoctors([...doctors, newDoctor]);
    }
    handleCloseDialog();
  };

  // Delete Doctor
  const handleDeleteDoctor = (id: number) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
  };

  return (
    <Card sx={{ p: 2, boxShadow: "none", borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Doctor Management
          </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: "none", mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Doctor</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Fees</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  <IconButton color="primary" onClick={handleOpenDialog}>
                    <Add />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>{doctor.id}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar src={doctor.avatar} />
                      {doctor.name}
                    </Box>
                  </TableCell>
                  <TableCell>{doctor.department}</TableCell>
                  <TableCell>{doctor.fees}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(doctor)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteDoctor(doctor.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      {/* Add/Edit Doctor Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingDoctor ? "Edit Doctor" : "Add Doctor"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Fees"
            name="fees"
            value={form.fees}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">
            Cancel
          </Button>
          <Button onClick={handleSaveDoctor} variant="contained">
            {editingDoctor ? "Save Changes" : "Add Doctor"}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default DoctorsManagement;
