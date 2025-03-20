import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
  { path: "/manager/services", label: "Services" },
  { path: "/manager/services/create", label: "Create Service" },
  { path: "/manager/bookings", label: "Bookings" },
  { path: "/manager/quizzes", label: "Quizzes" },
  { path: "/manager/staffs", label: "Staffs" },
  { path: "/manager/therapists", label: "Therapists" },
  { path: "/manager/customers", label: "Customers" },
];

export default function ManagerTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs
        value={location.pathname}
        onChange={(_, newValue) => navigate(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab) => (
          <Tab key={tab.path} label={tab.label} value={tab.path} />
        ))}
      </Tabs>
    </Box>
  );
}
