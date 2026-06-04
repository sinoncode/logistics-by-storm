import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const GuestRoutes = () => {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default GuestRoutes;