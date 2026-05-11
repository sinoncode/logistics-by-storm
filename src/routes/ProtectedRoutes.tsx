import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {

  const token = localStorage.getItem("access_token");

  // Optional loading screen
  if (token === undefined) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
        <Loader2 className="h-11 w-11 animate-spin text-neutral-900" />
        <p className="mt-4 text-neutral-900 font-semibold animate-pulse text-xl">
          Loading...
        </p>
      </div>
    );
  }

  // If no token → redirect login
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  // If token exists → allow routes
  return <Outlet />;
};

export default ProtectedRoutes;