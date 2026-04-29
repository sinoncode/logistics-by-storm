export type PermissionModule = "users" | "shipmentControl" | "changeRequest" | "checkPayments";

export interface Role {
  id: string;
  name: string;
  permissions: {
    users: {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
    };
    shipmentControl: {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
    };
    changeRequest: {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
    };
    checkPayments: {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
    };
  };
}

export const DEFAULT_ROLES: Role[] = [
  {
    id: "role-admin-001",
    name: "Admin",
    permissions: {
      users: { view: true, create: true, edit: true, delete: true },
      shipmentControl: { view: true, create: true, edit: true, delete: true },
      changeRequest: { view: true, create: true, edit: true, delete: true },
      checkPayments: { view: true, create: true, edit: true, delete: true },
    },
  },
  {
    id: "role-manager-001",
    name: "Manager",
    permissions: {
      users: { view: true, create: true, edit: true, delete: false },
      shipmentControl: { view: true, create: true, edit: true, delete: false },
      changeRequest: { view: true, create: true, edit: true, delete: false },
      checkPayments: { view: true, create: false, edit: false, delete: false },
    },
  },
  {
    id: "role-viewer-001",
    name: "Viewer",
    permissions: {
      users: { view: true, create: false, edit: false, delete: false },
      shipmentControl: { view: true, create: false, edit: false, delete: false },
      changeRequest: { view: true, create: false, edit: false, delete: false },
      checkPayments: { view: true, create: false, edit: false, delete: false },
    },
  },
];
