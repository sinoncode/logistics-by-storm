"use client";

import {
  useEffect,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  UserPlus,
} from "lucide-react";

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

      <DialogContent
        className="
          w-full
          max-w-5xl
          border-0
          overflow-hidden
          rounded-[32px]
          p-0
          bg-white
          dark:bg-slate-950
          shadow-[0_20px_80px_rgba(0,0,0,0.18)]
        "
      >

        {/* TOP HEADER */}

        <div
          className="
            relative
            overflow-hidden
            bg-gradient-to-br
            from-[#4A9E52]
            via-[#67C05E]
            to-[#A4E29A]
            px-8
            py-8
          "
        >

          {/* GLOW EFFECTS */}

          <div className="absolute -top-16 -right-10 w-52 h-52 bg-white/10 rounded-full blur-3xl" />

          <div className="absolute -bottom-20 left-0 w-60 h-60 bg-cyan-300/10 rounded-full blur-3xl" />

          <DialogHeader className="relative z-10">

            <div className="flex items-center gap-4">

              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/20
                  flex
                  items-center
                  justify-center
                  shadow-xl
                "
              >

                <UserPlus
                  className="
                    w-8
                    h-8
                    text-white
                  "
                />

              </div>

              <div>

                <DialogTitle
                  className="
                    text-3xl
                    font-black
                    tracking-tight
                    text-white
                  "
                >
                  Add Team Member
                </DialogTitle>

                <DialogDescription
                  className="
                    text-slate-200
                    text-sm
                    mt-1
                  "
                >
                  Create and manage your
                  organization members
                  professionally.
                </DialogDescription>

              </div>

            </div>

          </DialogHeader>

        </div>

        {/* BODY */}

        <div
          className="
            px-8
            py-8
            bg-gradient-to-b
            from-slate-50
            to-white
            dark:from-slate-950
            dark:to-slate-900
          "
        >

          <div
            className="
              rounded-xl
              border
              border-slate-200
              dark:border-slate-800
              bg-white/80
              dark:bg-slate-900/80
              backdrop-blur-xl
              p-6
              shadow-lg
            "
          >

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

          </div>

        </div>

      </DialogContent>

    </Dialog>
  );
};