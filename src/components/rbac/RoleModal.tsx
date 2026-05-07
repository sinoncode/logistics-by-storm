import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const roleSchema = z.object({
  name: z
    .string()
    .min(2, "Role name must be at least 2 characters")
    .max(30, "Role name is too long"),
});

type RoleFormData = z.infer<typeof roleSchema>;

interface RoleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string }) => void;
  isLoading?: boolean;
}

export const RoleModal = ({
  open,
  onClose,
  onSave,
  isLoading = false,
}: RoleModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: "",
      });
    }
  }, [open, reset]);

  const onSubmit = (data: RoleFormData) => {
    onSave({
      name: data.name.trim(),
    });

    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl border-0 shadow-2xl p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Create New Role
            </DialogTitle>

            <DialogDescription className="text-green-100 mt-1">
              Add a new role to manage permissions and access.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-6"
        >
          {/* Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Role Name
            </label>

            <Input
              {...register("name")}
              placeholder="Enter role name"
              className="h-12 rounded-xl border-gray-300 focus-visible:ring-2 focus-visible:ring-green-500 text-base"
            />

            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="h-11 px-6 rounded-xl"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 px-6 rounded-xl bg-green-600 hover:bg-[#02374C] text-white transition-all duration-300"
            >
              {isLoading ? "Creating..." : "Create Role"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};