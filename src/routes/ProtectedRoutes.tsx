import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const ProtectedRoutes = () => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;