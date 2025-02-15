import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Logout,
  Edit,
  Delete,
} from "@mui/icons-material";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdHomeRepairService } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import Appointments from "../components/Appointments";
import DoctorsManagement from "../components/DoctorsManagement";

interface Patient {
  name: string;
  date: string;
}

const patients: Patient[] = [
  { name: "Dr. Richard James", date: "Booking on 24th July, 2024" },
  { name: "Dr. Richard James", date: "Booking on 24th July, 2024" },
  { name: "Dr. Richard James", date: "Booking on 24th July, 2024" },
  { name: "Dr. Richard James", date: "Booking on 24th July, 2024" },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Admin: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", width: '240px' }}
        >
          <Tab label={<Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start'}}><MdDashboardCustomize size={20}/> <Typography sx={{marginLeft: 2}}>Dashboard</Typography></Box>} {...a11yProps(0)} />
          <Tab label={<Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start'}}><FaUserDoctor size={20}/> <Typography sx={{marginLeft: 2}}>Doctor List</Typography></Box>} {...a11yProps(0)} />
          <Tab label={<Box sx={{width: '100%',display: 'flex', alignItems: 'center', justifyContent: 'start'}}><MdOutlineAccountCircle size={20}/> <Typography sx={{marginLeft: 2}}>Account List</Typography></Box>} {...a11yProps(1)} />
          <Tab label={<Box sx={{width: '100%',display: 'flex', alignItems: 'center', justifyContent: 'start'}}><MdHomeRepairService  size={20}/> <Typography sx={{marginLeft: 2}}>Service List</Typography></Box>} {...a11yProps(2)} />
          <Tab label={<Box sx={{width: '100%',display: 'flex', alignItems: 'center', justifyContent: 'start'}}><FaCalendarAlt  size={20}/> <Typography sx={{marginLeft: 2}}>Appointments</Typography></Box>} {...a11yProps(2)} />
        </Tabs>
        <Box
          sx={{
            flex: 1, // This makes the right section take up all available space
            overflowY: "auto", // Adds scrolling if content overflows
            p: 3,
          }}
        >
          <TabPanel value={value} index={0}>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                backgroundColor: "#f9f9f9"
              }}
            >
              <AppBar
                position="static"
                sx={{ background: "transparent", boxShadow: "none" }}
              >
                <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    startIcon={<Logout />}
                    color="primary"
                  >
                    Logout
                  </Button>
                </Toolbar>
              </AppBar>
              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Card sx={{ flex: 1, textAlign: "center" }}>
                  <CardContent>
                    <Typography variant="h5">14</Typography>
                    <Typography variant="subtitle1">Doctors</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ flex: 1, textAlign: "center" }}>
                  <CardContent>
                    <Typography variant="h5">2</Typography>
                    <Typography variant="subtitle1">Appointments</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ flex: 1, textAlign: "center" }}>
                  <CardContent>
                    <Typography variant="h5">5</Typography>
                    <Typography variant="subtitle1">Patients</Typography>
                  </CardContent>
                </Card>
              </Box>
              <Box mt={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Manage Patients
                    </Typography>
                    {patients.map((patient, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: 2,
                          p: 1,
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar src="https://randomuser.me/api/portraits/men/75.jpg" />
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold" }}
                            >
                              {patient.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {patient.date}
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <IconButton color="primary">
                            <Edit />
                          </IconButton>
                          <IconButton color="error">
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DoctorsManagement/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Appointments />
          </TabPanel>
          <TabPanel value={value} index={5}>
            Item Six
          </TabPanel>
          <TabPanel value={value} index={6}>
            Item Seven
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
