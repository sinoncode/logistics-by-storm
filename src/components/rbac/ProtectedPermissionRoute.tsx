import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";

interface Props {
  permissions: string[];
  children: ReactNode;
  redirectTo?: string;
}

const ProtectedPermissionRoute = ({
  permissions,
  children,
  redirectTo = "/dashboard",
}: Props) => {
  const user = useAuthStore(
    (state) => state.user
  );

  const userPermissions =
    user?.permissions || [];

  const hasAccess =
    permissions.length === 0 ||
    permissions.some((permission) =>
      userPermissions.includes(permission)
    );

  if (!hasAccess) {
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    );
  }

  console.log("USER", user);
console.log("PERMISSIONS", userPermissions);
console.log("REQUIRED", permissions);
console.log("HAS ACCESS", hasAccess);

  return <>{children}</>;
};

export default ProtectedPermissionRoute;