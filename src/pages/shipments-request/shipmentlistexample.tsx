// ======================================================
// IMPORTS
// ======================================================

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";

import { useShipmentDetailsStore } from "@/store/shipmentDetailsStore";

import {
  AlertTriangle,
  BadgeDollarSign,
  Box,
  Calculator,
  CalendarDays,
  Download,
  FileImage,
  FileText,
  Mail,
  MapPin,
  PackageCheck,
  PauseCircle,
  Phone,
  ShieldCheck,
  Truck,
  User,
  ImageIcon,
  Weight,
  Ruler,
} from "lucide-react";

// ======================================================
// IMPORTANT
// ======================================================

// Make sure this import path is correct in your project
import { calculateShipmentCharge } from "@/services/shipmentService";

// ======================================================
// TYPES
// ======================================================

type CalculationResult = {
  actualWeight: number;
  volumetricWeight: string;
  deliveryType: string;
  itemType: string;
  length: number;
  width: number;
  height: number;
  declaredValue: number;
  finalPrice: string;
};

type ShipmentCalculationResponse = {
  success: boolean;
  message: string;

  data: {
    shipping_cost: number;
    tax_amount: number;
    final_amount: number;
    volumetric_weight: number;
    chargeable_weight: number;
  };
};

// ======================================================
// HELPERS
// ======================================================

const formatSentenceCase = (
  value?: string
) => {
  if (!value) return "--";

  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
};

const formatDate = (
  date?: string
) => {
  if (!date) return "--";

  return new Date(date).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

// ======================================================
// COMPONENT
// ======================================================

export default function ShipmentListView() {
  const { id } = useParams();

  const {
    shipment,
    loading,
    fetchShipmentDetails,
  } = useShipmentDetailsStore();

  // ======================================================
  // STATES
  // ======================================================

  const [
    calculationLoading,
    setCalculationLoading,
  ] = useState(false);

  const [
    calculationResponse,
    setCalculationResponse,
  ] =
    useState<ShipmentCalculationResponse | null>(
      null
    );

  const [
    previewOpen,
    setPreviewOpen,
  ] = useState(false);

  const [
    calculatorOpen,
    setCalculatorOpen,
  ] = useState(false);

  const [
    standbyOpen,
    setStandbyOpen,
  ] = useState(false);

  const [
    standbyReason,
    setStandbyReason,
  ] = useState("");

  const [
    calculationResult,
    setCalculationResult,
  ] =
    useState<CalculationResult | null>(
      null
    );

  // ======================================================
  // FORM
  // ======================================================

  const [form, setForm] = useState({
    actual_weight_lb: 12,
    length_cm: 40,
    width_cm: 30,
    height_cm: 25,
    declared_value: 120,
    manual_extra_charge: 0,
    discount_amount: 0,
    tax_percentage: 18,
    volumetric_divisor: 5000,
    remarks: "",
    item_type: "electronics",
    delivery_type: "express",
  });

  // ======================================================
  // EFFECTS
  // ======================================================

  useEffect(() => {
    if (id) {
      fetchShipmentDetails(id);
    }
  }, [id, fetchShipmentDetails]);

  // ======================================================
  // DOCUMENT
  // ======================================================

  const document =
    shipment?.documents?.[0];

  const fileUrl = document?.file_path
    ? `https://logisticsystems.webandappdevelopmenttech.com/storage/${document.file_path}`
    : "";

  const documentType =
    document?.mime_type ===
    "application/pdf"
      ? "Document"
      : document?.mime_type?.startsWith(
            "image/"
          )
        ? "Image"
        : "Unknown";

  // ======================================================
  // ADDRESS
  // ======================================================

  const fullAddress = [
    shipment?.delivery_address
      ?.address_line_1,

    shipment?.delivery_address
      ?.address_line_2,

    shipment?.delivery_address?.city,

    shipment?.delivery_address?.state,

    shipment?.delivery_address
      ?.postal_code,
  ]
    .filter(Boolean)
    .join(", ");

  // ======================================================
  // HELPERS
  // ======================================================

  const updateField = (
    key: string,
    value: string | number
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDownload = () => {
    if (!fileUrl) return;

    window.open(fileUrl, "_blank");
  };

  // ======================================================
  // CALCULATE SHIPMENT
  // ======================================================

  const handleCalculateShipment =
    async () => {
      if (!id) return;

      try {
        setCalculationLoading(true);

        const payload = {
          items: [
            {
              id:
                shipment?.items?.[0]
                  ?.id,

              actual_weight_lb:
                form.actual_weight_lb,

              length_cm:
                form.length_cm,

              width_cm:
                form.width_cm,

              height_cm:
                form.height_cm,

              declared_value:
                form.declared_value,

              tariff_code:
                shipment?.items?.[0]
                  ?.tariff_code ||
                "2914.1100",
            },
          ],

          manual_extra_charge:
            form.manual_extra_charge,

          discount_amount:
            form.discount_amount,

          tax_percentage:
            form.tax_percentage,

          remarks: form.remarks,
        };

        const response =
          await calculateShipmentCharge({
            shipmentRequestId: id,
            payload,
          });

        setCalculationResponse(
          response
        );

        setCalculationResult({
          actualWeight:
            form.actual_weight_lb,

          volumetricWeight:
            String(
              response?.data
                ?.volumetric_weight
            ),

          deliveryType:
            form.delivery_type,

          itemType:
            form.item_type,

          length:
            form.length_cm,

          width:
            form.width_cm,

          height:
            form.height_cm,

          declaredValue:
            form.declared_value,

          finalPrice: String(
            response?.data
              ?.final_amount
          ),
        });

        setCalculatorOpen(false);
      } catch (error) {
        console.error(
          "Calculation failed",
          error
        );
      } finally {
        setCalculationLoading(false);
      }
    };

  // ======================================================
  // DOCUMENT PREVIEW
  // ======================================================

  const renderDocumentPreview =
    () => {
      if (!document) {
        return (
          <div className="py-10 text-center">
            No document available
          </div>
        );
      }

      // IMAGE
      if (
        document.mime_type?.startsWith(
          "image/"
        )
      ) {
        return (
          <img
            src={fileUrl}
            alt="Shipment Document"
            className="max-h-[75vh] w-full rounded-2xl object-contain"
          />
        );
      }

      // PDF
      if (
        document.mime_type ===
        "application/pdf"
      ) {
        return (
          <iframe
            src={fileUrl}
            title="PDF Preview"
            className="h-[75vh] w-full rounded-2xl border"
          />
        );
      }

      // FALLBACK
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="mb-4 h-16 w-16 text-primary" />

          <h3 className="text-xl font-semibold">
            Document Preview
          </h3>

          <p className="mt-2 text-muted-foreground">
            Preview unavailable for
            this file type.
          </p>
        </div>
      );
    };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium">
          Loading shipment
          details...
        </p>
      </div>
    );
  }

  // ======================================================
  // JSX
  // ======================================================

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-4 dark:bg-slate-950 md:p-6">

      {/* HEADER */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Shipment Request
            Details
          </h1>

          <p className="mt-2 text-muted-foreground">
            View shipment
            information, customer
            details and calculate
            delivery pricing.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() =>
              setStandbyOpen(true)
            }
            className="h-12 rounded-2xl border-yellow-200 bg-yellow-500 px-6 text-white hover:bg-yellow-600 hover:text-white"
          >
            <PauseCircle className="mr-2 h-4 w-4" />
            Standby Shipment
          </Button>

          <Button
            onClick={() =>
              setCalculatorOpen(true)
            }
            className="h-12 rounded-2xl px-6"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Shipment
            Calculation
          </Button>
        </div>
      </div>

      {/* CONTENT */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* LEFT */}

        <div className="space-y-6 xl:col-span-2">

          {/* SHIPMENT INFO */}

          <Card className="overflow-hidden rounded-[28px] border-0 bg-white shadow-sm dark:bg-slate-950">

            <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <CardTitle className="text-2xl">
                      Shipment
                      Information
                    </CardTitle>

                    <CardDescription>
                      Shipment request
                      and logistics
                      details
                    </CardDescription>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">

                  <Badge className="rounded-full px-4 py-1 capitalize">
                    {shipment?.booking_status ||
                      "--"}
                  </Badge>

                  <Badge
                    variant="outline"
                    className="rounded-full px-4 py-1"
                  >
                    {formatSentenceCase(
                      shipment?.payment_status
                    )}
                  </Badge>

                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 p-6">

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

                <InfoCard
                  icon={
                    <PackageCheck className="h-5 w-5 text-primary" />
                  }
                  title="Request Number"
                  value={
                    shipment?.request_number
                  }
                />

                <InfoCard
                  icon={
                    <Truck className="h-5 w-5 text-blue-600" />
                  }
                  title="Supplier Tracking"
                  value={
                    shipment?.supplier_tracking_number
                  }
                />

                <InfoCard
                  icon={
                    <CalendarDays className="h-5 w-5 text-emerald-600" />
                  }
                  title="Requested At"
                  value={formatDate(
                    shipment?.requested_at
                  )}
                />

                <InfoCard
                  icon={
                    <MapPin className="h-5 w-5 text-orange-600" />
                  }
                  title="Delivery Type"
                  value={formatSentenceCase(
                    shipment?.delivery_type
                  )}
                />

              </div>

            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}

        <div>

          <Card className="rounded-3xl border bg-white shadow-sm dark:bg-slate-950">

            <CardHeader>
              <CardTitle>
                Shipment Summary
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">

              <SummaryRow
                label="Supplier"
                value={formatSentenceCase(
                  shipment?.supplier_name
                )}
              />

              <SummaryRow
                label="Origin Country"
                value={
                  shipment
                    ?.origin_country
                    ?.name || "--"
                }
              />

              <SummaryRow
                label="Destination Country"
                value={
                  shipment
                    ?.destination_country
                    ?.name || "--"
                }
              />

              <SummaryRow
                label="Commodity"
                value={
                  shipment?.items?.[0]
                    ?.commodity_type ||
                  "--"
                }
              />

              <SummaryRow
                label="Final Shipment Price"
                value={`$${calculationResult?.finalPrice || "0.00"
                  }`}
              />

            </CardContent>
          </Card>
        </div>
      </div>

      {/* DOCUMENT PREVIEW */}

      <Dialog
        open={previewOpen}
        onOpenChange={
          setPreviewOpen
        }
      >
        <DialogContent className="max-h-[92vh] max-w-6xl overflow-hidden rounded-[32px] border-0 bg-white p-0 shadow-2xl dark:bg-slate-950">

          <div className="border-b bg-primary px-8 py-6 text-white">

            <DialogHeader>

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">

                    {document?.mime_type?.startsWith(
                      "image/"
                    ) ? (
                      <ImageIcon className="h-7 w-7" />
                    ) : (
                      <FileText className="h-7 w-7" />
                    )}

                  </div>

                  <div>
                    <DialogTitle className="text-2xl font-bold">
                      Shipment
                      Document
                    </DialogTitle>

                    <DialogDescription className="mt-1 text-white/80">
                      Preview and
                      download shipment
                      attachments
                    </DialogDescription>
                  </div>
                </div>

                <Badge className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-white backdrop-blur">
                  {documentType}
                </Badge>

              </div>
            </DialogHeader>
          </div>

          <div className="space-y-6 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-950">

            <div className="overflow-hidden rounded-[28px] border bg-white shadow-sm dark:bg-slate-900">
              {renderDocumentPreview()}
            </div>

            <div className="flex justify-center">
              <Button
                onClick={
                  handleDownload
                }
                disabled={!document}
                className="h-12 rounded-2xl px-6"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Document
              </Button>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ======================================================
// REUSABLE COMPONENTS
// ======================================================

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value?: string;
}) {
  return (
    <div className="rounded-3xl border bg-slate-50 p-5 dark:bg-slate-900/50">

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
          {icon}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {title}
          </p>

          <h3 className="mt-1 text-sm font-semibold">
            {value || "--"}
          </h3>
        </div>

      </div>
    </div>
  );
}

function ContactCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value?: string;
}) {
  return (
    <div className="rounded-2xl border bg-slate-50/70 p-5 dark:bg-slate-900/50">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
          {icon}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {title}
          </p>

          <p className="font-semibold">
            {value || "--"}
          </p>
        </div>

      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-muted-foreground">
        {label}
      </span>

      <span className="font-semibold">
        {value || "--"}
      </span>

    </div>
  );
}