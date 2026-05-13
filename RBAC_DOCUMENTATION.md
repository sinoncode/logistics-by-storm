# RBAC System Documentation

## Overview
The Role-Based Access Control (RBAC) system has been enhanced to provide a complete, dynamic, and clean permission management solution.

## Architecture

### Core Components

#### 1. **RBAC Service** (`src/services/rbac.service.ts`)
Centralized API communication layer for RBAC operations.

**Key Functions:**
- `getPermissions()` - Fetch all available permissions (GET API)
- `getRoles(options?)` - Fetch roles with optional filtering (GET API)
  - `options.createdBy` - Filter by admin who created the role
  - `options.limit` - Pagination limit
  - `options.offset` - Pagination offset
- `getRoleById(roleId)` - Fetch a specific role
- `createRole(data)` - Create a new role (POST API)
- `updateRole(roleId, data)` - Update role permissions (PUT API)
- `deleteRole(roleId)` - Delete a role (DELETE API)

#### 2. **Permission Utilities** (`src/lib/permissions.ts`)
Robust permission checking and utility functions.

**Classes:**
- `PermissionChecker` - Main class for permission validation

**Key Methods:**
- `can(permission)` - Check single permission
- `canAny(permissions[])` - Check if user has any of the permissions
- `canAll(permissions[])` - Check if user has all permissions
- `canViewRoles()` - Check if user can view roles
- `canCreateRoles()` - Check if user can create roles
- `canUpdateRoles()` - Check if user can update roles
- `canDeleteRoles()` - Check if user can delete roles
- `canManageRoles()` - Check if user can manage roles

**Constants:**
```javascript
ROLE_PERMISSIONS = {
  ROLES_VIEW: "roles.view",
  ROLES_CREATE: "roles.create",
  ROLES_UPDATE: "roles.update",
  ROLES_DELETE: "roles.delete",
  ROLES_ASSIGN: "roles.assign",
  // ... more permissions
}
```

#### 3. **Permission Hook** (`src/hooks/usePermissions.ts`)
React hook for using permissions in components.

```typescript
const {
  can,
  canAny,
  canAll,
  canViewRoles,
  canCreateRoles,
  canUpdateRoles,
  canDeleteRoles,
  canManageRoles,
  permissions,
  getAllPermissions,
  getGroupedPermissions,
  hasPermissionWithin,
} = usePermissions();
```

#### 4. **Components**
- `RoleList` - Display and manage roles list
- `PermissionTable` - Edit permissions for selected role
- `RoleModal` - Create new role dialog
- `DeleteRoleDialog` - Confirm role deletion

#### 5. **Main Page** (`src/pages/TeamsPermissions.tsx`)
Complete RBAC management interface.

**Features:**
- Dynamic role fetching using GET API
- Real-time permission updates
- Role creation, update, duplicate, and deletion
- Permission grouping by module
- Comprehensive error handling
- Loading and saving states
- Refresh functionality

## Data Flow

### Fetching Roles
```
TeamsPermissions.fetchRoles()
  ↓
RBAC Service: getRoles(options?)
  ↓
API: GET /roles?created_by=admin_id
  ↓
Response: { data: Role[] }
  ↓
setRoles(roles)
```

### Creating a Role
```
User clicks "Add New Role"
  ↓
Permission check: canCreateRoles()
  ↓
RoleModal opens
  ↓
User submits form
  ↓
RBAC Service: createRole(payload)
  ↓
API: POST /roles
  ↓
Response: { data: NewRole }
  ↓
setRoles([...roles, newRole])
  ↓
setSelectedRole(newRole)
```

### Updating Permissions
```
User toggles permission checkbox
  ↓
Permission check: canUpdateRoles()
  ↓
handlePermissionChange(permission, value)
  ↓
Update local state: setSelectedRole(updatedRole)
  ↓
User clicks "Save Permissions"
  ↓
RBAC Service: updateRole(roleId, data)
  ↓
API: PUT /roles/:id
  ↓
Response: Success
  ↓
Toast: "Permissions updated successfully"
```

## Usage Examples

### In Components

```typescript
import { usePermissions } from "@/hooks/usePermissions";

export const MyComponent = () => {
  const { can, canCreateRoles, canUpdateRoles } = usePermissions();

  return (
    <>
      {canCreateRoles() && <Button>Create Role</Button>}
      
      {can("roles.delete") && <Button>Delete Role</Button>}
      
      {canUpdateRoles() && <Button>Update Role</Button>}
    </>
  );
};
```

### With Permission Checker

```typescript
import { PermissionChecker, ROLE_PERMISSIONS } from "@/lib/permissions";

const checker = new PermissionChecker(userPermissions);

if (checker.can(ROLE_PERMISSIONS.ROLES_CREATE)) {
  // User can create roles
}

if (checker.canAll([
  ROLE_PERMISSIONS.ROLES_VIEW,
  ROLE_PERMISSIONS.ROLES_UPDATE
])) {
  // User can view and update roles
}
```

## API Integration

### GET /roles
**Fetch all roles with optional filtering**

Query Parameters:
- `created_by` (optional) - Filter by admin user ID
- `limit` (optional) - Pagination limit
- `offset` (optional) - Pagination offset

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "role-1",
      "name": "Admin",
      "permissions": ["roles.view", "roles.create", ...],
      "created_at": "2024-01-01",
      "updated_at": "2024-01-02"
    }
  ]
}
```

### GET /permissions
**Fetch all available permissions**

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "perm-1",
      "name": "roles.view",
      "guard_name": "api"
    }
  ]
}
```

## Permission Structure

Permissions follow the format: `module.action`

**Examples:**
- `roles.view` - View roles
- `roles.create` - Create roles
- `roles.update` - Update roles
- `roles.delete` - Delete roles
- `users.view` - View users
- `teams.create` - Create teams

## Features

### ✅ Dynamic Permissions
- Permissions are fetched from the backend
- Real-time permission validation
- Automatic permission grouping by module

### ✅ Complete CRUD Operations
- Create new roles
- Read/View roles and permissions
- Update role permissions
- Delete roles
- Duplicate roles

### ✅ Admin Role Filtering
- Support for filtering roles by admin creator
- Extensible query parameters

### ✅ Error Handling
- Comprehensive try-catch blocks
- User-friendly error messages via toast notifications
- Proper error logging to console

### ✅ Loading States
- Loading indicators during data fetch
- Saving state during API calls
- Refresh functionality

### ✅ Clean Code Structure
- Organized sections with comments
- Separated concerns (service, utilities, components, hooks)
- Reusable permission checking logic

## Route Configuration

**URL:** `/teams-permissions`
**Display Name:** "Permissions" (under Teams menu)
**Required Permission:** `roles.view` (to access the page)

## Accessibility

- Permission checks are performed dynamically
- All actions are gated by permissions
- Clear error messages when permissions are insufficient
- Tooltips explain permission requirements

## Best Practices

1. **Always use `usePermissions()` hook in components** for consistent permission checking
2. **Use permission constants** (`ROLE_PERMISSIONS`) instead of hardcoding strings
3. **Handle API responses properly** - Check for both `response.data.data` and `response.data`
4. **Show loading states** during async operations
5. **Provide user feedback** via toast notifications
6. **Group permissions by module** for better organization
7. **Validate permissions on the backend** - Frontend permissions are for UX only

## Troubleshooting

### Permissions not loading
- Check if `/permissions` endpoint returns data
- Verify user has `roles.view` permission
- Check browser console for errors

### Roles not displaying
- Ensure user has `roles.view` permission
- Check if `/roles` endpoint is working
- Verify API response structure

### Permission changes not saving
- Confirm user has `roles.update` permission
- Check network tab for API response
- Verify role ID is correct

### Refresh not working
- Check API connectivity
- Verify permissions are still valid
- Clear browser cache if needed
