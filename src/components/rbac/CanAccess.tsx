import type { ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";
import { createPermissionChecker } from "@/lib/permissions";

interface Props {
  permission: string;
  children: ReactNode;
}

const CanAccess = ({
  permission,
  children,
}: Props) => {
  const user = useAuthStore(
    (state) => state.user
  );

  const checker =
    createPermissionChecker(user);

  if (!checker.can(permission)) {
    return null;
  }

  return <>{children}</>;
};

export default CanAccess;