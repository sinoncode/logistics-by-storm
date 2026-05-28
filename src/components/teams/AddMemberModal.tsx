"use client";

import {
  useEffect,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useRoleStore,
} from "@/store/teamStore";

import AddMemberForm
from "@/components/teams/AddMemberForm";

type Props = {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  onSuccess?: () => void;
};

export const AddMemberModal = ({
  open,
  onOpenChange,
  onSuccess,
}: Props) => {

  const {
    roles,
    fetchRoles,
    roleLoading,
  } = useRoleStore();

  useEffect(() => {

    fetchRoles();

  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >

      <DialogContent className="max-w-3xl">

        <DialogHeader>

          <DialogTitle>
            Add Team Member
          </DialogTitle>

        </DialogHeader>

        <AddMemberForm
          roles={
            Array.isArray(roles)
              ? roles
              : []
          }
          isLoading={
            roleLoading
          }
          onSuccess={() => {

            onSuccess?.();

            onOpenChange(false);
          }}
        />

      </DialogContent>

    </Dialog>
  );
};