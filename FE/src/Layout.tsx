import { Outlet } from "react-router-dom";
import Header from "../src/components/Header/Header";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Body */}
      <div className="flex-grow container mx-auto text-black">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} Lumina Skin Services Company.</p>
      </footer>
    </div>
  );
};

export default Layout;
