import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Booking } from "./pages/Booking";

function App() {
  const router = createBrowserRouter([
    {
      path: "/booking",
      element: <Booking />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
