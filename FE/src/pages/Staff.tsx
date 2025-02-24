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
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdHomeRepairService } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

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
    return (
        <Tabs
            orientation="vertical"
            variant="scrollable"
            // value={value}
            // onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider", width: '240px' }}
        >
            <Tab label={<Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start' }}><MdDashboardCustomize size={20} /> <Typography sx={{ marginLeft: 2 }}>Dashboard</Typography></Box>} {...a11yProps(0)} />
            <Tab label={<Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start' }}><FaUserDoctor size={20} /> <Typography sx={{ marginLeft: 2 }}>Doctor List</Typography></Box>} {...a11yProps(0)} />
            <Tab label={<Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start' }}><MdOutlineAccountCircle size={20} /> <Typography sx={{ marginLeft: 2 }}>Account List</Typography></Box>} {...a11yProps(1)} />
            <Tab label={<Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start' }}><MdHomeRepairService size={20} /> <Typography sx={{ marginLeft: 2 }}>Service List</Typography></Box>} {...a11yProps(2)} />
            <Tab label={<Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start' }}><FaCalendarAlt size={20} /> <Typography sx={{ marginLeft: 2 }}>Appointments</Typography></Box>} {...a11yProps(2)} />
        </Tabs>
    )
}

export default Staff