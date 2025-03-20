import React, { useState, useEffect } from "react";
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
  TextField,
  IconButton,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { callApi } from "../api/main/api_call/api";
import { publicApi } from "../api/instance/axiosInstance";

interface Customer {
  _id: string;
  username: string;
  password: string;
  phoneNumber: number;
  email: string;
  roleId: number;
  fullName: string;
  isDeleted?: boolean;
  imageUrl?: string;
}

const CustomerManagement = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [newCustomer, setNewCustomer] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [editCustomer, setEditCustomer] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);

  // Fetch accounts data
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await callApi({
        instance: publicApi,
        method: "get",
        url: `/accounts/customers`,
      });

      setCustomers(response.data.accounts);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = (customer) => {
    setEditCustomer(customer);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);

  const handleAddCustomer = async () => {
    try {
      const response = await callApi({
        instance: publicApi,
        method: "post",
        url: "/accounts",
        data: {
          account: {
            username: newCustomer.username,
            password: newCustomer.password,
            phoneNumber: newCustomer.phoneNumber,
            email: newCustomer.email,
            roleId: newCustomer.roleId,
            fullName: newCustomer.fullName,
          },
          imageBase64: newCustomer.imageBase64 || "",
        },
      });

      // Add the new customer to the state
      setCustomers([...customers, response.data]);

      // Reset input fields
      setNewCustomer({
        username: "",
        password: "",
        phoneNumber: 0,
        email: "",
        roleId: 0,
        fullName: "",
        imageBase64: "",
      });

      fetchCustomers();

      handleClose();
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const handleUpdateCustomer = async () => {
    if (!editCustomer) return;

    try {
      const response = await callApi({
        instance: publicApi,
        method: "post",
        url: `/accounts/${editCustomer._id}`,
        data: {
          account: {
            username: editCustomer.username || "",
            password: editCustomer.password || "",
            phoneNumber: editCustomer.phoneNumber || 0,
            email: editCustomer.email || "",
            roleId: editCustomer.roleId || 0,
            fullName: editCustomer.fullName || "",
          },
          imageBase64: editCustomer.imageBase64 || "",
        },
      });

      setCustomers(
        customers.map((cust) =>
          cust._id === editCustomer._id ? response.data : cust
        )
      );

      fetchCustomers();

      handleEditClose();
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  // const handleUpdateCustomer = async () => {
  //   try {
  //     await axios.put(`${API_URL}/${editCustomer._id}`, editCustomer);
  //     setCustomers(
  //       customers.map((cust) =>
  //         cust._id === editCustomer._id ? editCustomer : cust
  //       )
  //     );
  //     handleEditClose();
  //   } catch (error) {
  //     console.error("Error updating customer:", error);
  //   }
  // };

  const handleDeleteConfirmOpen = (id: string) => {
    setCustomerToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirmClose = () => {
    setDeleteConfirmOpen(false);
    setCustomerToDelete(null);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      const response = await callApi({
        instance: publicApi,
        method: "delete",
        url: `/accounts/${customerToDelete}`,
      });

      if (!response.success) {
        throw new Error("Looix");
      }

      fetchCustomers();
      handleDeleteConfirmClose()
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <Card sx={{ p: 2, boxShadow: "none", borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Customer Management
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
            Add Customer
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: "none", mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>{customer._id}</TableCell>
                  <TableCell>{customer.fullName}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditOpen(customer)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteConfirmOpen(customer._id)}
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
      <Dialog open={deleteConfirmOpen} onClose={handleDeleteConfirmClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this customer?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteCustomer}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Customer Modal */}
      {/* Add Customer Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: "50%",
            margin: "auto",
            marginTop: "1%",
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
            Add New Customer
          </Typography>

          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={newCustomer.username}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, username: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type="password"
            value={newCustomer.password}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, password: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            value={newCustomer.fullName}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, fullName: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            type="email"
            value={newCustomer.email}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, email: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Phone Number"
            margin="normal"
            type="number"
            value={newCustomer.phoneNumber}
            onChange={(e) =>
              setNewCustomer({
                ...newCustomer,
                phoneNumber: Number(e.target.value),
              })
            }
          />

          <TextField
            fullWidth
            label="Role ID"
            margin="normal"
            type="number"
            value={newCustomer.roleId}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, roleId: Number(e.target.value) })
            }
          />

          <TextField
            fullWidth
            label="Image (Base64)"
            margin="normal"
            value={newCustomer.imageBase64}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, imageBase64: e.target.value })
            }
          />

          <Box mt={3} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCustomer}
            >
              Add Customer
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Edit Customer Modal */}
      <Modal open={editOpen} onClose={handleEditClose}>
        <Box
          sx={{
            width: "40%",
            margin: "auto",
            marginTop: "10%",
            backgroundColor: "white",
            padding: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Customer
          </Typography>
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            value={editCustomer?.fullName || ""}
            onChange={(e) =>
              setEditCustomer({ ...editCustomer, fullName: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={editCustomer?.email || ""}
            onChange={(e) =>
              setEditCustomer({ ...editCustomer, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Phone Number"
            margin="normal"
            value={editCustomer?.phoneNumber || ""}
            onChange={(e) =>
              setEditCustomer({ ...editCustomer, phoneNumber: e.target.value })
            }
            type="number"
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleUpdateCustomer}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};

export default CustomerManagement;
