"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import { toast } from "react-toastify";

import api from "@/lib/axios";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    .min(2, "First name is required"),

  last_name: z
    .string()
    .min(2, "Last name is required"),

  email: z
    .string()
    .email("Enter valid email"),

  phone: z
    .string()
    .min(10, "Phone number is required"),

  role: z
    .string()
    .min(1, "Role is required"),

  status: z
    .string()
    .min(1, "Status is required"),
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
  isLoading,
}: Props) => {

  const [loading, setLoading] =
    useState(false);

  const form = useForm<FormValues>({
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
          "Team member added successfully"
        );

        form.reset();

        onSuccess?.();

      } catch (error: any) {

        console.error(error);

        const apiErrors =
          error?.response?.data
            ?.errors;

        if (apiErrors) {

          Object.keys(
            apiErrors
          ).forEach((key) => {

            form.setError(
              key as any,
              {
                message:
                  apiErrors[key][0],
              }
            );
          });
        }

        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to add member"
        );

      } finally {

        setLoading(false);
      }
    };

 return (
  <form
    onSubmit={form.handleSubmit(handleSubmit)}
    className="space-y-6"
  >

    {/* FIRST + LAST NAME */}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div>
        <label className="text-sm font-medium">
          First Name
        </label>

        <Input
          placeholder="John"
          {...form.register("first_name")}
        />

        <p className="text-red-500 text-sm mt-1">
          {form.formState.errors.first_name?.message}
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">
          Last Name
        </label>

        <Input
          placeholder="Doe"
          {...form.register("last_name")}
        />

        <p className="text-red-500 text-sm mt-1">
          {form.formState.errors.last_name?.message}
        </p>
      </div>

    </div>

    {/* EMAIL + PHONE */}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div>
        <label className="text-sm font-medium">
          Email
        </label>

        <Input
          type="email"
          placeholder="john@example.com"
          {...form.register("email")}
        />

        <p className="text-red-500 text-sm mt-1">
          {form.formState.errors.email?.message}
        </p>
      </div>

      <div>
        <label className="text-sm font-medium">
          Phone
        </label>

        <Input
          type="tel"
          placeholder="9876543210"
          {...form.register("phone")}
        />

        <p className="text-red-500 text-sm mt-1">
          {form.formState.errors.phone?.message}
        </p>
      </div>

    </div>

    {/* ROLE */}

    <div>

      <label className="text-sm font-medium">
        Role
      </label>

      <Select
        onValueChange={(value) =>
          form.setValue("role", value)
        }
      >

        <SelectTrigger>
          <SelectValue placeholder="Select role" />
        </SelectTrigger>

        <SelectContent>

          {roles.map((role) => (
            <SelectItem
              key={role.id}
              value={role.name}
            >
              {role.name}
            </SelectItem>
          ))}

        </SelectContent>

      </Select>

      <p className="text-red-500 text-sm mt-1">
        {form.formState.errors.role?.message}
      </p>

    </div>

    {/* STATUS */}

    <div>

      <label className="text-sm font-medium">
        Status
      </label>

      <Select
        defaultValue="active"
        onValueChange={(value) =>
          form.setValue("status", value)
        }
      >

        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>

        <SelectContent>

          {STATUS_OPTIONS.map((status) => (
            <SelectItem
              key={status}
              value={status}
            >
              {status}
            </SelectItem>
          ))}

        </SelectContent>

      </Select>

    </div>

    {/* BUTTONS */}

    <div className="flex justify-end gap-3 pt-4 border-t">

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Adding..."
          : "Add Member"}
      </Button>

    </div>

  </form>
);
};

export default AddMemberForm;