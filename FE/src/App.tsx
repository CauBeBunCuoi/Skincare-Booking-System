import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookingPage from "./pages/Booking";
import { Home } from "./pages/Home";
import DoctorList from "./pages/DoctorList";

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
    }
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
