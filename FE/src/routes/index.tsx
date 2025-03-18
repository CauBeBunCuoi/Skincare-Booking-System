import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import Login from "../pages/Auth/Login";
import { Home } from "../pages/Home";
import AuthRoute from "./AuthRoute";
import Profile from "../pages/Profile";
import RoleRoute from "./RoleRoute";
import BookingManagement from "../pages/Staff/BookingManagement";
import BookingManagementTherapist from "../pages/Therapist/BookingManagement";
import Schedules from "../pages/Therapist/Schedules";
import Services from "../pages/Manager/Services";
import Bookings from "../pages/Manager/Bookings";
import Staffs from "../pages/Manager/Staffs";
import Therapists from "../pages/Manager/Therapist";
import Customers from "../pages/Manager/Customers";
import Quiz from "../pages/Manager/Quiz";
import CreateService from "../pages/Manager/Services/Widget/CreateService";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route element={<AuthRoute />}>
            <Route path="profile" element={<Profile />} />

            {/* Route dành cho Staff */}
            <Route element={<RoleRoute role={"Staff"} />}>
              <Route path="/staff/bookings" element={<BookingManagement />} />
            </Route>

            {/* Route dành cho Therapist */}
            <Route element={<RoleRoute role={"Therapist"} />}>
              <Route
                path="/therapist/bookings"
                element={<BookingManagementTherapist />}
              />
              <Route path="/therapist/schedules" element={<Schedules />} />
            </Route>

            {/* Route chỉ dành cho Manager */}
            <Route element={<RoleRoute role={"Manager"} />}>
              <Route path="/manager/services" element={<Services />} />
              <Route
                path="/manager/services/create"
                element={<CreateService />}
              />
              <Route path="/manager/bookings" element={<Bookings />} />
              <Route path="/manager/quizzes" element={<Quiz />} />
              <Route path="/manager/staffs" element={<Staffs />} />
              <Route path="/manager/therapists" element={<Therapists />} />
              <Route path="/manager/customers" element={<Customers />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
