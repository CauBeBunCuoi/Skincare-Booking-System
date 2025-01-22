import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookingPage from "./pages/Booking";

function App() {
  const router = createBrowserRouter([
    {
      path: "/booking",
      element: <BookingPage />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
