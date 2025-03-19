import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { publicApi } from "../../../api/instance/axiosInstance";
import { callApi } from "../../../api/main/api_call/api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
  Box,
} from "@mui/material";

interface Therapist {
  _id: string;
  username: string;
  password?: string;
  phoneNumber: number;
  email: string;
  roleId: number;
  fullName: string;
  imageUrl?: string;
}

interface Service {
  _id: string;
  name: string;
  description: string;
  fee: number;
  duration: number;
  imageUrl: string;
}

interface Background {
  _id: string;
  accountId: string;
  description: string;
}

interface RestSchedule {
  _id: string;
  accountId: string;
  restDate: string;
  workShiftId: number;
}

const Therapists: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [filteredTherapists, setFilteredTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTherapist, setSelectedTherapist] = useState<any>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    fetchTherapists();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = therapists.filter((therapist) =>
        therapist.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTherapists(filtered);
    } else {
      setFilteredTherapists(therapists);
    }
  }, [searchQuery, therapists]);

  const fetchTherapists = async () => {
    setLoading(true);
    const response = await callApi({
      instance: publicApi,
      method: "get",
      url: "/accounts/staffs",
    });

    if (response.success) {

      const therapisData = response.data.accounts.filter((i) => i.roleId === 3)
      setTherapists(therapisData);
      setFilteredTherapists(therapisData);
    } else {
      toast.error("Error when fetching therapists data: " + response.message);
    }
    setLoading(false);
  };

  const handleDetail = async (id: string) => {
    const response = await callApi({
      instance: publicApi,
      method: "get",
      url: `/accounts/${id}/therapist-detail`,
    });

    if (response.success) {
      setSelectedTherapist(response.data);
    } else {
      toast.error("Error when fetching therapist details: " + response.message);
    }
  };

  const handleShow = (id: string) => {
    setShow(true)
    handleDetail(id)
  }

  const handleEdit = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;

    const response = await callApi({
      instance: publicApi,
      method: "delete",
      url: `/accounts/${id}`,
    });

    if (response.success) {
      toast.success("Therapist deleted successfully");
      setTherapists(therapists.filter((therapist) => therapist._id !== id));
    } else {
      toast.error("Error when deleting staff: " + response.message);
    }
  };

  const handleSave = async () => {
    if (!selectedTherapist) return;

    const response = await callApi({
      instance: publicApi,
      method: "post",
      url: `/accounts/${selectedTherapist._id}`,
      data: {
        accountId: selectedTherapist._id,
        account: {
          username: selectedTherapist.username,
          password: selectedTherapist.password || "",
          phoneNumber: selectedTherapist.phoneNumber,
          email: selectedTherapist.email,
          roleId: selectedTherapist.roleId,
          fullName: selectedTherapist.fullName,
        },
      },
    });

    if (response.success) {
      toast.success("Therapist updated successfully");
      setTherapists(therapists.map((therapist) =>
        therapist._id === selectedTherapist._id ? selectedTherapist : therapist
      ));
      setOpen(false);
      setSelectedTherapist(null);
    } else {
      toast.error("Error when saving therapist: " + response.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTherapist(null);
  };

  console.log(selectedTherapist)


  return (
    <div className="container mx-auto">

      {/* Detail Modal */}
      <Dialog open={show} onClose={() => (setShow(false))} maxWidth="md" fullWidth>
        <DialogTitle>Therapist Details</DialogTitle>
        <DialogContent>
          {selectedTherapist ? (
            <Grid container spacing={3}>
              {/* Therapist Information */}
              <Grid item xs={12} sm={6}>
                <Box mb={2}>
                  <Typography variant="h6">Full Name</Typography>
                  <Typography variant="body1">{selectedTherapist.therapist?.fullName}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="h6">Username</Typography>
                  <Typography variant="body1">{selectedTherapist.therapist?.username}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="h6">Email</Typography>
                  <Typography variant="body1">{selectedTherapist.therapist?.email}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="h6">Phone Number</Typography>
                  <Typography variant="body1">{selectedTherapist.therapist?.phoneNumber}</Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant="h6">Role</Typography>
                  <Typography variant="body1">{selectedTherapist.therapist?.roleId === 3 && " Therapist"}</Typography>
                </Box>
                <img
                  src={selectedTherapist.therapist?.imageUrl || "https://via.placeholder.com/150"}
                  alt="Therapist"
                  className="w-32 h-32 object-cover mt-4"
                />
              </Grid>

              {/* Services */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">Services</Typography>
                <List>
                  {selectedTherapist?.services?.map((service: Service) => (
                    <ListItem key={service._id}>
                      <ListItemText
                        primary={service.name}
                        secondary={`Fee: $${service.fee} | Duration: ${service.duration} mins`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>

              {/* Backgrounds */}
              <Grid item xs={12}>
                <Typography variant="h6">Backgrounds</Typography>
                <List>
                  {selectedTherapist?.backgrounds?.map((background: Background) => (
                    <ListItem key={background._id}>
                      <ListItemText primary={background.description} />
                    </ListItem>
                  ))}
                </List>
              </Grid>

              {/* Rest Schedules */}
              <Grid item xs={12}>
                <Typography variant="h6">Rest Schedules</Typography>
                <List>
                  {selectedTherapist?.restSchedules?.map((schedule: RestSchedule) => (
                    <ListItem key={schedule._id}>
                      <ListItemText primary={`Rest Date: ${schedule.restDate}`} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="body1">Loading details...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => (setShow(false))} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <h1 className="text-2xl font-bold mt-10">Therapists List</h1>

      <div className="w-[90%] mx-auto mt-5">
        <TextField
          label="Search by Full Name"
          fullWidth
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="w-[90%] mx-auto mt-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Avatar</th>
                <th className="border p-2">Full Name</th>
                <th className="border p-2">Username</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone Number</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTherapists.map((therapist) => (
                <tr key={therapist._id} className="border hover:bg-gray-100">
                  <td className="border p-2 text-center">
                    <img
                      src={therapist.imageUrl || "https://via.placeholder.com/50"}
                      alt={therapist.fullName}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </td>
                  <td className="border p-2">{therapist.fullName}</td>
                  <td className="border p-2">{therapist.username}</td>
                  <td className="border p-2">{therapist.email}</td>
                  <td className="border p-2">{therapist.phoneNumber}</td>
                  <td className="border p-2 text-center">
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      sx={{ marginRight: 1 }}
                      onClick={() => handleEdit(therapist)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ marginRight: 1 }}
                      onClick={() => handleDelete(therapist._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      sx={{ marginRight: 1 }}
                      onClick={() => handleShow(therapist._id)}
                    >
                      Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      <Dialog open={open && selectedTherapist !== null} onClose={handleClose}>
        <DialogTitle>Edit Therapist</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            fullWidth
            margin="dense"
            value={selectedTherapist?.fullName || ""}
            onChange={(e) => setSelectedTherapist({ ...selectedTherapist!, fullName: e.target.value })}
          />
          <TextField
            label="Username"
            fullWidth
            margin="dense"
            value={selectedTherapist?.username || ""}
            onChange={(e) => setSelectedTherapist({ ...selectedTherapist!, username: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={selectedTherapist?.email || ""}
            onChange={(e) => setSelectedTherapist({ ...selectedTherapist!, email: e.target.value })}
          />
          <TextField
            label="Phone Number"
            fullWidth
            margin="dense"
            value={selectedTherapist?.phoneNumber || ""}
            onChange={(e) => setSelectedTherapist({ ...selectedTherapist!, phoneNumber: Number(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Therapists;
