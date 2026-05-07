import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import type { Role } from "@/types/rbac";

import { Trash2, AlertTriangle } from "lucide-react";

interface DeleteRoleDialogProps {
  open: boolean;
  role: Role | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DeleteRoleDialog = ({
  open,
  role,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteRoleDialogProps) => {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(newOpen: boolean) => !newOpen && onCancel()}
    >
      <AlertDialogContent className="max-w-md rounded-3xl border-0 shadow-2xl p-0 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 px-6 py-5 text-white">
          <div className="flex items-center gap-4">
            
            {/* Icon */}
            <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-white/15 backdrop-blur-sm">
              <Trash2 className="h-7 w-7" />
            </div>

            {/* Title */}
            <div>
              <AlertDialogTitle className="text-2xl font-bold">
                Delete Role
              </AlertDialogTitle>

              <p className="text-red-100 text-sm mt-1">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          
          {/* Warning Box */}
          <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4">
            <div className="mt-0.5">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>

            <div>
              <AlertDialogDescription className="text-sm text-gray-700 leading-relaxed">
                Are you sure you want to delete the role{" "}
                <span className="font-semibold text-gray-900">
                  "{role?.name}"
                </span>
                ?
              </AlertDialogDescription>

              <p className="text-xs text-red-600 mt-2 font-medium">
                All assigned permissions for this role will be removed permanently.
              </p>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            
            {/* Cancel */}
            <AlertDialogCancel
              disabled={isLoading}
              className="
                h-11
                px-6
                rounded-xl
                border
                font-medium
                transition-all
                duration-300
              "
            >
              Cancel
            </AlertDialogCancel>

            {/* Delete */}
            <AlertDialogAction
              onClick={onConfirm}
              disabled={isLoading}
              className="
                h-11
                px-6
                rounded-xl
                bg-gradient-to-r
                from-red-600
                to-rose-600
                hover:from-red-700
                hover:to-rose-700
                text-white
                font-semibold
                shadow-lg
                hover:shadow-2xl
                hover:scale-[1.02]
                transition-all
                duration-300
                disabled:opacity-50
                disabled:hover:scale-100
              "
            >
              {isLoading ? "Deleting Role..." : "Delete Role"}
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};