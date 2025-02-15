import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Paper,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const ServiceManagement: React.FC = () => {
  const [services, setServices] = useState([
    { id: 1, name: "Richard James", description: "Richard James" },
    { id: 2, name: "Richard James", description: "Richard James" },
  ]);

  const [open, setOpen] = useState(false);
  const [newService, setNewService] = useState({ name: "", description: "" });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  // Open/Close modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Add new service
  const handleAddService = () => {
    if (newService.name.trim() && newService.description.trim()) {
      setServices([...services, { id: services.length + 1, ...newService }]);
      setNewService({ name: "", description: "" });
      handleClose();
    }
  };
  return (
    <Card sx={{ maxWidth: "90%", margin: "auto", mt: 3, p: 2, boxShadow: "none" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          All Services
        </Typography>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={handleOpen}>
                    <Add />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.id}</TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.description}</TableCell>
                  <TableCell align="right">
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
      </CardContent>

      {/* Add Service Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Service</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Service Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newService.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={newService.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddService} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ServiceManagement;
