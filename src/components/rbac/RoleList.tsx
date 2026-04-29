import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Role } from "@/types/rbac";
import { Search, Trash2, Copy, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RoleListProps {
  roles: Role[];
  selectedRole: Role | null;
  onSelectRole: (role: Role) => void;
  onDeleteRole: (roleId: string) => void;
  onDuplicateRole: (role: Role) => void;
  onAddRole: () => void;
}

export const RoleList = ({
  roles,
  selectedRole,
  onSelectRole,
  onDeleteRole,
  onDuplicateRole,
  onAddRole,
}: RoleListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="border shadow-sm h-full">
      <CardHeader className="border-b pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg">Roles</CardTitle>
            <CardDescription>
              {roles.length} role{roles.length !== 1 ? "s" : ""}
            </CardDescription>
          </div>
          <Button
            size="sm"
            onClick={onAddRole}
            className="bg-green-600 hover:bg-green-700 text-white gap-2"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Role</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-full">
        <div className="p-4 pb-0">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9"
            />
          </div>
        </div>

        {filteredRoles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center flex-1">
            <div className="text-muted-foreground text-sm">
              {searchQuery ? "No roles found" : "No roles yet"}
            </div>
            {!searchQuery && (
              <Button
                variant="link"
                onClick={onAddRole}
                className="mt-2 text-primary"
              >
                Create your first role
              </Button>
            )}
          </div>
        ) : (
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {filteredRoles.map((role) => (
                <div
                  key={role.id}
                  className={cn(
                    "group relative p-3 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50",
                    selectedRole?.id === role.id
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-transparent hover:bg-muted/50"
                  )}
                  onClick={() => onSelectRole(role)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{role.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        ID: {role.id.slice(0, 8)}...
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDuplicateRole(role);
                        }}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                        title="Duplicate role"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteRole(role.id);
                        }}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        title="Delete role"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
