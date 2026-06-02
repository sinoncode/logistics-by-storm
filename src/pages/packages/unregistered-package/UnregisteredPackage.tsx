import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "@/lib/axios";
import Breadcrumb from "@/layouts/Breadcrumb";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Package,
  Truck,
  Globe,
  Weight,
  User,
  Loader2,
  ArrowRight,
} from "lucide-react";

import { toast } from "react-toastify";

const formSchema = z.object({
  user_id: z.string().min(1, "User ID is required"),
  supplier_tracking_number: z
    .string()
    .min(1, "Tracking Number is required"),

  supplier_name: z
    .string()
    .min(1, "Supplier Name is required"),

  service_type_id: z.coerce
    .number()
    .min(1, "Service Type ID is required"),

  origin_facility_id: z.coerce
    .number()
    .min(1, "Origin Facility ID is required"),

  destination_country_id: z.coerce
    .number()
    .min(1, "Destination Country ID is required"),

  delivery_type: z
    .string()
    .min(1, "Delivery Type is required"),

  actual_weight_lb: z.coerce
    .number()
    .positive("Weight must be greater than 0"),

  admin_remarks: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function UnregisteredReceive() {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: "",
      supplier_tracking_number: "",
      supplier_name: "",
      service_type_id: undefined,
      origin_facility_id: undefined,
      destination_country_id: undefined,
      delivery_type: "",
      actual_weight_lb: undefined,
      admin_remarks: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);

      await api.post(
        "/admin/warehouse/shipment-requests/unregistered-receive",
        values
      );

      toast.success(
        "Package received successfully"
      );

      reset();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to receive package"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb
        title="Receive Package"
        text="Receive unregistered warehouse package"
      />

      <div className="p-6">
        <div className="grid xl:grid-cols-[450px_1fr] gap-8">
          {/* LEFT SIDE */}

          <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-[#02374C] via-[#03506F] to-[#046C94] text-white">
            <CardContent className="p-10 h-full flex flex-col justify-center">
              <div className="space-y-8">
                <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center">
                  <Package size={40} />
                </div>

                <div>
                  <h1 className="text-4xl font-bold leading-tight">
                    Receive
                    <br />
                    Unregistered Package
                  </h1>

                  <p className="text-white/80 mt-4 text-lg">
                    Register warehouse packages
                    quickly and attach them to
                    customer shipments.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FeatureCard
                    icon={<Truck size={22} />}
                    title="Fast Processing"
                  />

                  <FeatureCard
                    icon={<Globe size={22} />}
                    title="Global Delivery"
                  />

                  <FeatureCard
                    icon={<Weight size={22} />}
                    title="Weight Tracking"
                  />

                  <FeatureCard
                    icon={<User size={22} />}
                    title="Customer Linked"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT SIDE */}

          <Card className="border-0 shadow-2xl rounded-[32px]">
            <CardContent className="p-8 lg:p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-bold">
                  Package Information
                </h2>

                <p className="text-muted-foreground mt-2">
                  Enter all package details below.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* User */}
<div className="grid md:grid-cols-2 gap-5">
                <CustomField
                  label="User ID"
                  error={errors.user_id?.message}
                >
                  <Input
                    placeholder="Enter User ID"
                    {...register("user_id")}
                  />
                </CustomField>

                {/* Tracking + Supplier */}

                
                  <CustomField
                    label="Tracking Number"
                    error={
                      errors
                        .supplier_tracking_number
                        ?.message
                    }
                  >
                    <Input
                      placeholder="Tracking Number"
                      {...register(
                        "supplier_tracking_number"
                      )}
                    />
                  </CustomField>

                  <CustomField
                    label="Supplier Name"
                    error={
                      errors.supplier_name?.message
                    }
                  >
                    <Input
                      placeholder="Supplier Name"
                      {...register(
                        "supplier_name"
                      )}
                    />
                  </CustomField>
                </div>

                {/* IDs */}

                <div className="grid md:grid-cols-3 gap-5">
                  <CustomField
                    label="Service Type ID"
                    error={
                      errors.service_type_id
                        ?.message
                    }
                  >
                    <Input
                      type="number"
                      placeholder="16"
                      {...register(
                        "service_type_id"
                      )}
                    />
                  </CustomField>

                  <CustomField
                    label="Origin Facility ID"
                    error={
                      errors.origin_facility_id
                        ?.message
                    }
                  >
                    <Input
                      type="number"
                      placeholder="16"
                      {...register(
                        "origin_facility_id"
                      )}
                    />
                  </CustomField>

                  <CustomField
                    label="Destination Country ID"
                    error={
                      errors
                        .destination_country_id
                        ?.message
                    }
                  >
                    <Input
                      type="number"
                      placeholder="16"
                      {...register(
                        "destination_country_id"
                      )}
                    />
                  </CustomField>
                </div>

                {/* Delivery + Weight */}

                <div className="grid md:grid-cols-2 gap-5">
                  <CustomField
                    label="Delivery Type"
                    error={
                      errors.delivery_type
                        ?.message
                    }
                  >
                    <Select
                      value={watch(
                        "delivery_type"
                      )}
                      onValueChange={(value) =>
                        setValue(
                          "delivery_type",
                          value,
                          {
                            shouldValidate: true,
                          }
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Delivery Type" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="door_delivery">
                          Door Delivery
                        </SelectItem>

                        <SelectItem value="pickup">
                          Pickup
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </CustomField>

                  <CustomField
                    label="Actual Weight (LB)"
                    error={
                      errors.actual_weight_lb
                        ?.message
                    }
                  >
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="39"
                      {...register(
                        "actual_weight_lb"
                      )}
                    />
                  </CustomField>
                </div>

                {/* Remarks */}

                <CustomField
                  label="Admin Remarks"
                  error={
                    errors.admin_remarks?.message
                  }
                >
                  <Textarea
                    rows={5}
                    placeholder="Enter remarks..."
                    {...register(
                      "admin_remarks"
                    )}
                  />
                </CustomField>

                {/* Submit */}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 text-base"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Receive Package
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

function CustomField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold">
        {label}
      </label>

      {children}

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function FeatureCard({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
      {icon}

      <p className="mt-3 font-medium text-sm">
        {title}
      </p>
    </div>
  );
}