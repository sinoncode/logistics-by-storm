
export const hasMenuAccess = (
  userPermissions: string[],
  menuPermissions?: string[]
) => {
  if (!menuPermissions || menuPermissions.length === 0) {
    return true;
  }

  return menuPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
};