import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Role } from "@/types/rbac";

const roleSchema = z.object({
  name: z.string().min(2, "Role name must be at least 2 characters").max(50, "Role name must be less than 50 characters"),
});

type RoleFormValues = z.infer<typeof roleSchema>;

interface RoleModalProps {
  open: boolean;
  role?: Role | null;
  onClose: () => void;
  onSave: (data: { name: string; id?: string }) => void;
  isLoading?: boolean;
}

export const RoleModal = ({
  open,
  role,
  onClose,
  onSave,
  isLoading = false,
}: RoleModalProps) => {
  const isEditing = !!role;
  
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: role?.name || "",
    },
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset();
      onClose();
    }
  };

  const onSubmit = (data: RoleFormValues) => {
    onSave({
      name: data.name,
      id: role?.id,
    });
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Role" : "Create New Role"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the role name. Permissions will remain unchanged."
              : "Create a new role and configure its permissions."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Role Name</Label>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="e.g., Manager, Supervisor, Analyst"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Give your role a descriptive name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? "Saving..." : isEditing ? "Update Role" : "Create Role"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
