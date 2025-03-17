// import React, { useState } from "react";
// import {
//     AppBar,
//     Toolbar,
//     Typography,
//     Button,
//     Card,
//     CardContent,
//     Avatar,
//     IconButton,
//     Box,
//     Tabs,
//     Tab,
// } from "@mui/material";
// import { FaUserDoctor } from "react-icons/fa6";
// import { MdOutlineAccountCircle } from "react-icons/md";
// import { MdHomeRepairService } from "react-icons/md";
// import { FaCalendarAlt } from "react-icons/fa";
// import StaffManagePatient from "../components/StaffManagePatient";
// import StaffAppointment from "../components/StaffAppointment";

// interface TabPanelProps {
//     children?: React.ReactNode;
//     index: number;
//     value: number;
// }

// function TabPanel(props: TabPanelProps) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`vertical-tabpanel-${index}`}
//             aria-labelledby={`vertical-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// function a11yProps(index: number) {
//     return {
//         id: `vertical-tab-${index}`,
//         "aria-controls": `vertical-tabpanel-${index}`,
//     };
// }

// function Staff() {
//     const [value, setValue] = useState(0);

//     const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//         setValue(newValue);
//     };

//     return (
//         <Box sx={{ display: "flex", height: "100vh" }}>
//             <Box sx={{
//                 bgcolor: "background.paper",
//                 display: "flex",
//                 height: "100%",
//                 width: "240px",
//                 borderRight: 1,
//                 borderColor: "divider"
//             }}>
//                 <Tabs
//                     orientation="vertical"
//                     variant="scrollable"
//                     value={value}
//                     onChange={handleChange}
//                     aria-label="Vertical tabs example"
//                     sx={{ width: "100%" }}
//                 >
//                     <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><FaUserDoctor size={20} /> <Typography>Patient List</Typography></Box>} {...a11yProps(0)} />
//                     <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><MdOutlineAccountCircle size={20} /> <Typography>Account List</Typography></Box>} {...a11yProps(1)} />
//                 </Tabs>
//             </Box>

//             <Box sx={{ flexGrow: 1, height: "100%", overflow: "auto" }}>
//                 <TabPanel value={value} index={0}>
//                     <StaffManagePatient />
//                 </TabPanel>
//                 <TabPanel value={value} index={1}>
//                     <StaffAppointment />
//                 </TabPanel>
//             </Box>
//         </Box>
//     );
// }

// export default Staff

import React, { useState } from "react";
import {
    Box,
    Tabs,
    Tab,
    Typography,
} from "@mui/material";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineAccountCircle } from "react-icons/md";
import BookingList from "../components/BookingList";
import FeedbackList from "../components/FeedbackList";

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
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
        <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f0f2f5" }}>
            <Box sx={{
                bgcolor: "white",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "260px",
                borderRight: 1,
                borderColor: "divider",
                boxShadow: 2,
                pt: 3
            }}>
                <Typography variant="h6" align="center" sx={{ mb: 3, fontWeight: "bold" }}>Staff Panel</Typography>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ width: "100%" }}
                >
                    <Tab
                        label={<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
                            <FaUserDoctor size={20} /> <Typography>Booking List</Typography>
                        </Box>}
                        {...a11yProps(0)}
                        sx={{ textAlign: "left", py: 2 }}
                    />
                    <Tab
                        label={<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
                            <MdOutlineAccountCircle size={20} /> <Typography>Feedback List</Typography>
                        </Box>}
                        {...a11yProps(1)}
                        sx={{ textAlign: "left", py: 2 }}
                    />
                </Tabs>
            </Box>

            <Box sx={{ flexGrow: 1, height: "100%", overflow: "auto", p: 3 }}>
                <TabPanel value={value} index={0}>
                    <BookingList />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <FeedbackList />
                </TabPanel>
            </Box>
        </Box>
    );
}

export default Staff;


