"use client";

import { useState } from "react";

import { useForm }
from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import * as z from "zod";

import { toast }
from "react-toastify";

import api
from "@/lib/axios";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  User2,
} from "lucide-react";

type Role = {
  id: number;
  name: string;
};

const STATUS_OPTIONS = [
  "active",
  "inactive",
];

const formSchema = z.object({
  first_name: z
    .string()
    .min(2),

  last_name: z
    .string()
    .min(2),

  email: z
    .string()
    .email(),

  phone: z
    .string()
    .min(10),

  role: z
    .string()
    .min(1),

  status: z
    .string()
    .min(1),
});

type FormValues =
  z.infer<typeof formSchema>;

type Props = {
  onSuccess?: () => void;
  roles: Role[];
  isLoading?: boolean;
};

const AddMemberForm = ({
  onSuccess,
  roles,
}: Props) => {

  const [loading, setLoading] =
    useState(false);

  const form =
    useForm<FormValues>({
      resolver:
        zodResolver(formSchema),

      defaultValues: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        role: "",
        status: "active",
      },
    });

  const handleSubmit =
    async (
      values: FormValues
    ) => {

      try {

        setLoading(true);

        await api.post(
          "/admin/teams",
          values
        );

        toast.success(
          "Member added successfully"
        );

        form.reset();

        onSuccess?.();

      } catch (error: any) {

        toast.error(
          error?.response?.data
            ?.message ||
          "Something went wrong"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <form
      onSubmit={form.handleSubmit(
        handleSubmit
      )}
      className="space-y-7"
    >

      {/* NAME */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="space-y-2">

          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            First Name
          </label>

          <div className="relative">

            <User2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <Input
              placeholder="First Name"
              className="h-12 pl-11 rounded-lg border-slate-200 focus-visible:ring-2"
              {...form.register(
                "first_name"
              )}
            />

          </div>

        </div>

        <div className="space-y-2">

          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Last Name
          </label>

          <div className="relative">

            <User2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <Input
              placeholder="Last Name"
              className="h-12 pl-11 rounded-lg"
              {...form.register(
                "last_name"
              )}
            />

          </div>

        </div>

      </div>

      {/* EMAIL + PHONE */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="space-y-2">

          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Email Address
          </label>

          <div className="relative">

            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <Input
              type="email"
              placeholder="team@example.com"
              className="h-12 pl-11 rounded-lg"
              {...form.register(
                "email"
              )}
            />

          </div>

        </div>

        <div className="space-y-2">

          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Phone Number
          </label>

          <div className="relative">

            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <Input
              type="tel"
              placeholder="000000000"
              className="h-12 pl-11 rounded-lg"
              {...form.register(
                "phone"
              )}
            />

          </div>

        </div>

      </div>

      {/* ROLE + STATUS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="space-y-2">

          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Role
          </label>

          <Select
            onValueChange={(value) =>
              form.setValue(
                "role",
                value
              )
            }
          >

            <SelectTrigger className="h-50 w-full rounded-lg">

              <ShieldCheck className="w-4 h-50 mr-2 text-slate-400" />

              <SelectValue placeholder="Select role" />

            </SelectTrigger>

            <SelectContent className="rounded-lg">

              {roles.map((role) => (
                <SelectItem
                  key={role.id}
                  value={role.name}
                >
                  {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                </SelectItem>
              ))}

            </SelectContent>

          </Select>

        </div>

        <div className="space-y-2">

          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Status
          </label>

          <Select
            defaultValue="active"
            onValueChange={(value) =>
              form.setValue(
                "status",
                value
              )
            }
          >

            <SelectTrigger className="h-12 w-full rounded-lg">

              <SelectValue placeholder="Select status" />

            </SelectTrigger>

            <SelectContent className="rounded-lg">

             {STATUS_OPTIONS.map((status) => (
  <SelectItem
    key={status}
    value={status}
  >
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </SelectItem>
))}

            </SelectContent>

          </Select>

        </div>

      </div>

      {/* FOOTER */}

      <div
        className="
          flex
          justify-center
          pt-6
          border-t
          border-slate-200
          dark:border-slate-800
        "
      >

        <Button
          type="submit"
          disabled={loading}
          className="
            h-12
            px-8
            rounded-2xl
            text-base
            font-semibold
            shadow-lg
          "
        >

          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Team Member"
          )}

        </Button>

      </div>

    </form>
  );
};

export default AddMemberForm;