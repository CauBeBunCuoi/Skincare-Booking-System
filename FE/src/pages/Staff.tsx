import React, { useState } from "react";
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
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdHomeRepairService } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import StaffManagePatient from "../components/StaffManagePatient";

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

function Staff() {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Box sx={{
                bgcolor: "background.paper",
                display: "flex",
                height: "100%",
                width: "240px",
                borderRight: 1,
                borderColor: "divider"
            }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ width: "100%" }}
                >
                    <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><FaUserDoctor size={20} /> <Typography>Patient List</Typography></Box>} {...a11yProps(0)} />
                    <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><MdOutlineAccountCircle size={20} /> <Typography>Account List</Typography></Box>} {...a11yProps(1)} />
                    <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><MdHomeRepairService size={20} /> <Typography>Service List</Typography></Box>} {...a11yProps(2)} />
                    <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><FaCalendarAlt size={20} /> <Typography>Appointments</Typography></Box>} {...a11yProps(3)} />
                </Tabs>
            </Box>

            <Box sx={{ flexGrow: 1, height: "100%", overflow: "auto" }}>
                <TabPanel value={value} index={0}>
                    <StaffManagePatient />
                </TabPanel>
            </Box>
        </Box>
    );
}

export default Staff