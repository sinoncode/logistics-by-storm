interface Props {
  permission: string;
  children: React.ReactNode;
}

const CanAccess = ({
  permission,
  children,
}: Props) => {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const permissions = user?.permissions || [];

  if (!permissions.includes(permission)) {
    return null;
  }

  return children;
};

export default CanAccess;