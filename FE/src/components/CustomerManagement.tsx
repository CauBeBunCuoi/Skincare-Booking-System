import React, { useState } from "react";
import { Modal, Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const CustomerManagement = () => {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [customers, setCustomers] = useState([
      { id: 1, name: "Michael Johnson", email: "michael@example.com", phone: "123-456-7890" },
      { id: 2, name: "Emily Davis", email: "emily@example.com", phone: "987-654-3210" }
    ]);
    const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "" });
    const [editCustomer, setEditCustomer] = useState(null);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditOpen = (customer) => {
      setEditCustomer(customer);
      setEditOpen(true);
    };
    const handleEditClose = () => setEditOpen(false);
    
    const handleAddCustomer = () => {
      setCustomers([...customers, { id: customers.length + 1, ...newCustomer }]);
      setNewCustomer({ name: "", email: "", phone: "" });
      handleClose();
    };
  
    const handleUpdateCustomer = () => {
      setCustomers(customers.map((cust) => (cust.id === editCustomer.id ? editCustomer : cust)));
      handleEditClose();
    };
  
    const handleDeleteCustomer = (id) => {
      setCustomers(customers.filter((customer) => customer.id !== id));
    };
  return (
    <div>
      <Typography variant="h4" gutterBottom>Customer Management</Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>Add Customer</Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                <IconButton
                      color="primary"
                      onClick={() => handleEditOpen(customer)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteCustomer(customer)}
                    >
                      <Delete />
                    </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: "40%", margin: "auto", marginTop: "10%", backgroundColor: "white", padding: 3, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>Add New Customer</Typography>
          <TextField fullWidth label="Name" margin="normal" value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} />
          <TextField fullWidth label="Email" margin="normal" value={newCustomer.email} onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })} />
          <TextField fullWidth label="Phone" margin="normal" value={newCustomer.phone} onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} />
          <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleAddCustomer}>Add</Button>
        </Box>
      </Modal>

      <Modal open={editOpen} onClose={handleEditClose}>
        <Box sx={{ width: "40%", margin: "auto", marginTop: "10%", backgroundColor: "white", padding: 3, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>Edit Customer</Typography>
          <TextField fullWidth label="Name" margin="normal" value={editCustomer?.name || ""} onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })} />
          <TextField fullWidth label="Email" margin="normal" value={editCustomer?.email || ""} onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })} />
          <TextField fullWidth label="Phone" margin="normal" value={editCustomer?.phone || ""} onChange={(e) => setEditCustomer({ ...editCustomer, phone: e.target.value })} />
          <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleUpdateCustomer}>Update</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomerManagement;
