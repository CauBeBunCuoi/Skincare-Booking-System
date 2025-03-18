import { Navigate, Outlet, useLocation } from "react-router-dom";

const RoleRoute = ({ role }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const location = useLocation();

  const roleMap = {
    Manager: 4,
    Staff: 2,
    Therapist: 3,
  };

  // Nếu chưa đăng nhập → Chuyển hướng đến trang đăng nhập
  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        state={{ message: "Bạn cần đăng nhập trước!" }}
        replace
      />
    );
  }
  if (roleMap[role] && user.role._id !== roleMap[role]) {
    console.log("lakjdslfkjas;lkdfj")
    return (
      <Navigate
        to="/"
        state={{ message: "Bạn không có quyền truy cập trang này!" }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default RoleRoute;
