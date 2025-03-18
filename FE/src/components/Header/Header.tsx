import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const navigate = useNavigate();
  // Mapping các route theo roleId
  const navItems = user
    ? {
        4: [
          // Manager
          { path: "/manager/services", label: "Services" },
          { path: "/manager/bookings", label: "Bookings" },
          { path: "/manager/quizzes", label: "Quizzes" },
          { path: "/manager/staffs", label: "Staffs" },
          { path: "/manager/therapists", label: "Therapists" },
          { path: "/manager/customers", label: "Customers" },
        ],
        2: [
          // Staff
          { path: "/staff/bookings", label: "Booking Management" },
        ],
        3: [
          // Therapist
          { path: "/therapist/bookings", label: "Booking Management" },
          { path: "/therapist/schedules", label: "Schedules" },
        ],
      }[user.roleId] || []
    : []; // Không có user → Không có menu riêng

  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Lumina Derma
        </Link>

        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>

          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="hover:underline">
                {item.label}
              </Link>
            </li>
          ))}

          {user ? (
            <li>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
          )}
        </ul>
        {user && (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleLogOut()}
          >
            Log-out
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Header;
