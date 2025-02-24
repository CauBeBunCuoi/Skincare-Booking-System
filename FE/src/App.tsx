import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookingPage from "./pages/Booking";
import { Home } from "./pages/Home";
import DoctorList from "./pages/DoctorList";
import AboutUs from "./pages/AboutUs";
import Admin from "./pages/Admin";
import Staff from "./pages/Staff";

function App() {
  const router = createBrowserRouter([
    {
      path: "/booking",
      element: <BookingPage />,
    },
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/doctor-list",
      element: <DoctorList />
    },
    {
      path: "/aboutus",
      element: <AboutUs />
    },
    {
      path: "/admin",
      element: <Admin />
    },
    {
      path: "/staff",
      element: <Staff />
    }
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
