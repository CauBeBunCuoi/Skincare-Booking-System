import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { publicApi } from "../../../api/instance/axiosInstance";
import { callApi } from "../../../api/main/api_call/api";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

interface Staff {
  _id: string;
  username: string;
  password?: string;
  phoneNumber: number;
  email: string;
  roleId: number;
  fullName: string;
  imageUrl?: string;
}

const Staffs: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [imageBase64, setImageBase64] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredStaffs, setFilteredStaffs] = useState<Staff[]>([]);

  useEffect(() => {
    fetchStaffs();
  }, []);

  useEffect(() => {
    const filtered = staffs.filter(staff =>
      staff.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStaffs(filtered);
  }, [searchQuery, staffs]);

  const fetchStaffs = async () => {
    setLoading(true);
    const response = await callApi({
      instance: publicApi,
      method: "get",
      url: "/accounts/staffs",
    });

    if (response.success) {
      setStaffs(response.data.accounts);
      setFilteredStaffs(response.data.accounts);
    } else {
      toast.error("Error when fetching staff data: " + response.message);
    }
    setLoading(false);
  };

  console.log(staffs)

  const handleEdit = (staff: Staff) => {
    setSelectedStaff(staff);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStaff(null);
    setImageBase64("");
  };

  const handleSave = async () => {
    if (!selectedStaff) return;

    if (!selectedStaff.email || !selectedStaff.fullName || !selectedStaff.imageUrl || !selectedStaff.phoneNumber || !selectedStaff.username) {
      return
    }

    const response = await callApi({
      instance: publicApi,
      method: selectedStaff._id ? "post" : "post",
      url: selectedStaff._id ? `/accounts/${selectedStaff._id}` : "/accounts",
      data: {
        accountId: selectedStaff._id,
        account: {
          username: selectedStaff.username,
          password: selectedStaff.password || "",
          phoneNumber: selectedStaff.phoneNumber,
          email: selectedStaff.email,
          roleId: selectedStaff.roleId,
          fullName: selectedStaff.fullName,
        },
        imageBase64,
      },
    });

    if (response.success) {
      toast.success("Staff updated successfully");
      fetchStaffs();
      handleClose();
    } else {
      toast.error("error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;

    const response = await callApi({
      instance: publicApi,
      method: "delete",
      url: `/accounts/${id}`,
    });

    if (response.success) {
      toast.success("Staff deleted successfully");
      setStaffs(staffs.filter((staff) => staff._id !== id));
    } else {
      toast.error("Error when deleting staff: " + response.message);
    }
  };

  const handleAdd = () => {
    setSelectedStaff({ _id: "", username: "", password: "", phoneNumber: 0, email: "", roleId: 2, fullName: "" });
    setOpen(true);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mt-10">Staff List</h1>
      <div className="w-[90%] mx-auto mt-5 flex justify-between">
        <TextField
          label="Search Staff"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="w-[90%] mx-auto mt-5 flex justify-end">
        <Button onClick={() => handleAdd()} variant="contained" >
          Add Staff
        </Button>
      </div>

      <div className="w-[90%] mx-auto mt-10 mb-10">
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
              {filteredStaffs.map((staff) => (
                <tr key={staff._id} className="border hover:bg-gray-100">
                  <td className="border p-2 text-center">
                    <img
                      src={staff.imageUrl || "https://via.placeholder.com/50"}
                      alt={staff.fullName}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </td>
                  <td className="border p-2">{staff.fullName}</td>
                  <td className="border p-2">{staff.username}</td>
                  <td className="border p-2">{staff.email}</td>
                  <td className="border p-2">{staff.phoneNumber}</td>
                  <td className="border p-2 text-center">
                    <Button variant="contained" color="warning" size="small" sx={{ marginRight: 1 }} onClick={() => handleEdit(staff)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" size="small" onClick={() => handleDelete(staff._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Staff</DialogTitle>
        <DialogContent>
          <TextField label="Full Name" fullWidth margin="dense" value={selectedStaff?.fullName || ""} onChange={(e) => setSelectedStaff({ ...selectedStaff!, fullName: e.target.value })} />
          <TextField label="Username" fullWidth margin="dense" value={selectedStaff?.username || ""} onChange={(e) => setSelectedStaff({ ...selectedStaff!, username: e.target.value })} />
          <TextField type="email" label="Email" fullWidth margin="dense" value={selectedStaff?.email || ""} onChange={(e) => setSelectedStaff({ ...selectedStaff!, email: e.target.value })} />
          <TextField label="Phone Number" fullWidth margin="dense" value={selectedStaff?.phoneNumber || ""} onChange={(e) => setSelectedStaff({ ...selectedStaff!, phoneNumber: Number(e.target.value) })} />
          <TextField label="Image" fullWidth margin="dense" value={selectedStaff?.imageUrl || ""} onChange={(e) => setSelectedStaff({ ...selectedStaff!, imageUrl: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Staffs;
