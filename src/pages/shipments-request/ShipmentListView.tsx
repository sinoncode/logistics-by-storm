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

const formatDate = (date?: string) => {
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

export default function ShipmentRequestPage() {
  const { id } = useParams();

  const {
    shipment,
    loading,
    fetchShipmentDetails,
  } = useShipmentDetailsStore();

  // ======================================================
  // EFFECTS
  // ======================================================
  const [calculationLoading, setCalculationLoading] =
  useState(false);

const [
  calculationResponse,
  setCalculationResponse,
] =
  useState<ShipmentCalculationResponse | null>(
    null
  );

  useEffect(() => {
    if (id) {
      fetchShipmentDetails(id);
    }
  }, [id, fetchShipmentDetails]);

  // ======================================================
  // DIALOG STATES
  // ======================================================

  const [previewOpen, setPreviewOpen] =
    useState(false);

  const [calculatorOpen, setCalculatorOpen] =
    useState(false);

  const [standbyOpen, setStandbyOpen] =
    useState(false);

  // ======================================================
  // STANDBY STATE
  // ======================================================

  const [standbyReason, setStandbyReason] =
    useState("");

  // ======================================================
  // CALCULATION RESULT
  // ======================================================

  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(
      null
    );

  // ======================================================
  // FORM STATE
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
  // DOCUMENT
  // ======================================================

  const document =
    shipment?.documents?.[0];

  const fileUrl = document?.file_path
    ? `https://logisticsystems.webandappdevelopmenttech.com/storage/${document.file_path}`
    : "";


 const handleDownload = () => {
  if (!fileUrl) return;

  window.open(fileUrl, "_blank");
};


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
  // CALCULATIONS
  // ======================================================

  // const calculations = useMemo(() => {
  //   const volumetricWeight =
  //     (form.length_cm *
  //       form.width_cm *
  //       form.height_cm) /
  //     form.volumetric_divisor;

  //   const chargeableWeight = Math.max(
  //     form.actual_weight_lb,
  //     volumetricWeight
  //   );

  //   let baseRate = 8;

  //   switch (form.item_type) {
  //     case "electronics":
  //       baseRate = 12;
  //       break;

  //     case "fragile":
  //       baseRate = 15;
  //       break;

  //     case "documents":
  //       baseRate = 5;
  //       break;

  //     default:
  //       baseRate = 8;
  //   }

  //   let deliveryMultiplier = 1;

  //   switch (form.delivery_type) {
  //     case "express":
  //       deliveryMultiplier = 1.5;
  //       break;

  //     case "priority":
  //       deliveryMultiplier = 2;
  //       break;

  //     default:
  //       deliveryMultiplier = 1;
  //   }

  //   const shippingCost =
  //     chargeableWeight *
  //     baseRate *
  //     deliveryMultiplier;

  //   const declaredCharge =
  //     form.declared_value * 0.02;

  //   const subtotal =
  //     shippingCost +
  //     declaredCharge +
  //     form.manual_extra_charge;

  //   const taxAmount =
  //     (subtotal * form.tax_percentage) /
  //     100;

  //   const finalAmount =
  //     subtotal +
  //     taxAmount -
  //     form.discount_amount;

  //   return {
  //     volumetricWeight:
  //       volumetricWeight.toFixed(2),

  //     shippingCost:
  //       shippingCost.toFixed(2),

  //     taxAmount: taxAmount.toFixed(2),

  //     finalAmount: finalAmount.toFixed(2),
  //   };
  // }, [form]);

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

 const handleCalculateShipment =
  async () => {
    if (!id) return;

    try {
      setCalculationLoading(true);

      const payload = {
        items: [
          {
            id:
              shipment?.items?.[0]?.id,

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

      setCalculationResponse(response);

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

        itemType: form.item_type,

        length: form.length_cm,

        width: form.width_cm,

        height: form.height_cm,

        declaredValue:
          form.declared_value,

        finalPrice: String(
          response?.data?.final_amount
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

  const calculationPayload = {
  items: [
    {
      id:
        shipment?.items?.[0]?.id,

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
        "",
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

await calculateShipmentCharge({
  shipmentRequestId: id,
  payload: calculationPayload,
});

  // ======================================================
  // DOCUMENT PREVIEW
  // ======================================================

  const renderDocumentPreview = () => {
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
          Preview unavailable for this
          file type.
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
          Loading shipment details...
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
            Shipment Request Details
          </h1>

          <p className="mt-2 text-muted-foreground">
            View shipment information,
            customer details and calculate
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
            Shipment Calculation
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
                      Shipment Information
                    </CardTitle>

                    <CardDescription>
                      Shipment request and
                      logistics details
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

              {/* DOCUMENT */}

              <div className="rounded-[28px] border p-6">
                <div className="mb-5 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />

                  <h3 className="text-lg font-semibold">
                    Shipment Documents
                  </h3>
                </div>

                <div className="flex items-center justify-between rounded-2xl border bg-slate-50 p-5 dark:bg-slate-900/40">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                      <FileImage className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold">
                        {document?.original_name ||
                          "No Document"}
                      </h4>

                     <p className="text-sm text-muted-foreground">
  {documentType}
</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() =>
                      setPreviewOpen(true)
                    }
                    disabled={!document}
                  >
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CUSTOMER */}

          <Card className="overflow-hidden rounded-3xl border bg-white shadow-sm dark:bg-slate-950">
            <div className="border-b px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <User className="h-8 w-8 text-primary" />
                </div>

                <div>
                  <h2 className="text-2xl font-semibold">
                    {formatSentenceCase(
                      shipment?.user?.name
                    )}
                  </h2>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-emerald-500 text-white">
                      Active Customer
                    </Badge>

                    <Badge variant="outline">
                      {shipment?.user?.id ||
                        "--"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
              <ContactCard
                icon={
                  <Mail className="h-5 w-5 text-blue-600" />
                }
                title="Email Address"
                value={
                  shipment?.user?.email
                }
              />

              <ContactCard
                icon={
                  <Phone className="h-5 w-5 text-emerald-600" />
                }
                title="Phone Number"
                value={
                  shipment?.user?.phone
                }
              />

              <div className="rounded-2xl border bg-slate-50/70 p-5 md:col-span-2 dark:bg-slate-900/50">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100">
                    <MapPin className="h-5 w-5 text-orange-600" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Shipping Address
                    </p>

                    <p className="mt-2 leading-7">
                      {fullAddress || "--"}
                    </p>
                  </div>
                </div>
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
                    ?.origin_country?.name ||
                  "--"
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
                label="Warehouse"
                value={
                  shipment
                    ?.origin_facility
                    ?.name || "--"
                }
              />

              <SummaryRow
                label="Destination Facility"
                value={
                  shipment
                    ?.destination_facility
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
                label="Item Price"
                value={`$${
                  shipment?.items?.[0]
                    ?.price || "0"
                }`}
              />

              <SummaryRow
                label="Final Shipment Price"
                value={`$${
                  calculationResult?.finalPrice ||
                  "0.00"
                }`}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* DOCUMENT MODAL */}

   <Dialog
  open={previewOpen}
  onOpenChange={setPreviewOpen}
>
  <DialogContent className="max-h-[92vh] max-w-6xl overflow-hidden rounded-[32px] border-0 bg-white p-0 shadow-2xl dark:bg-slate-950">
    {/* HEADER */}

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
                Shipment Document
              </DialogTitle>

              <DialogDescription className="mt-1 text-white/80">
                Preview and download shipment
                attachments
              </DialogDescription>
            </div>
          </div>

          <Badge className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-white backdrop-blur">
            {document?.mime_type ===
            "application/pdf"
              ? "Document"
              : document?.mime_type?.startsWith(
                  "image/"
                )
              ? "Image"
              : "File"}
          </Badge>
        </div>
      </DialogHeader>
    </div>

    {/* BODY */}

    <div className="space-y-6 overflow-y-scroll h-200 bg-slate-50 p-6 dark:bg-slate-950">
      {/* PREVIEW */}

      <div className="overflow-scroll h-150 rounded-[28px] border bg-white shadow-sm dark:bg-slate-900">
        {renderDocumentPreview()}
      </div>

      {/* FILE INFO */}

      <div className="flex flex-col overflow-y-scroll gap-4  dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-center">
        {/* <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <File className="h-7 w-7 text-primary" />
          </div>

          <div>
            <h3 className="max-w-[300px] truncate text-lg font-semibold">
              {document?.original_name ||
                "Shipment File"}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {document?.mime_type ===
              "application/pdf"
                ? "PDF Document"
                : document?.mime_type?.startsWith(
                    "image/"
                  )
                ? "Image File"
                : "Attachment"}
            </p>
          </div>
        </div> */}

        {/* DOWNLOAD BUTTON */}

        <Button
          onClick={handleDownload}
          disabled={!document}
          className="h-12 rounded-2xl bg-primary px-6 text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90"
        >
            <Download className="mr-2 h-4 w-4" />
            Download Document
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>



     {/* ====================================================== */}
      {/* CALCULATOR MODAL */}
      {/* ====================================================== */}

   <Dialog
  open={calculatorOpen}
  onOpenChange={setCalculatorOpen}
>
  <DialogContent className="w-[800px] max-w-[800px] h-[90vh] overflow-hidden rounded-[32px] border-0 bg-white p-0 shadow-[0_20px_80px_rgba(0,0,0,0.12)] dark:bg-slate-950">

    {/* HEADER */}
    <div className="border-b border-slate-200/70 bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-5 dark:border-slate-800 dark:from-primary/10 dark:via-slate-950 dark:to-slate-950 ">
      <DialogHeader>
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-25 items-center justify-center rounded-2xl bg-primary/50 text-white shadow-sm">
            <Calculator className="h-7 w-7 " />
          </div>

          <div className="space-y-1">
            <DialogTitle className="text-2xl text-white font-bold tracking-tight">
              Shipment Calculator
            </DialogTitle>

            <DialogDescription className="text-sm text-white leading-6">
              Calculate shipment charges dynamically using
              dimensions, weight, delivery preference and
              additional shipment charges.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>
    </div>

    {/* BODY */}
    <div className="h-[calc(90vh-110px)] overflow-y-auto px-6 pb-25">

      <Tabs
        defaultValue="basic"
        className="space-y-6"
      >
        {/* TABS */}
        <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-slate-100 p-1 dark:bg-slate-900">
          <TabsTrigger
            value="basic"
            className="rounded-xl data-[state=active]:shadow-sm"
          >
            Basic Details
          </TabsTrigger>

          <TabsTrigger
            value="advanced"
            className="rounded-xl data-[state=active]:shadow-sm"
          >
            Advanced Charges
          </TabsTrigger>
        </TabsList>

        {/* BASIC TAB */}
        <TabsContent
          value="basic"
          className="space-y-6"
        >

          {/* DIMENSIONS */}
          <Card className="rounded-3xl border border-slate-200/70 shadow-sm dark:border-slate-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Box className="h-5 w-5 text-primary" />
                Package Dimensions
              </CardTitle>

              <CardDescription>
                Enter package dimensions and actual weight.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Actual Weight (LB)
                </Label>

                <div className="relative">
                  <Weight className="absolute left-33 top-[-1.5rem] h-4 w-4 text-muted-foreground" />

                  <Input
                    type="number"
                    value={form.actual_weight_lb}
                    onChange={(e) =>
                      updateField(
                        "actual_weight_lb",
                        Number(e.target.value)
                      )
                    }
                    className="h-12 rounded-2xl pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Length (CM)
                </Label>

                <div className="relative">
                  <Ruler className="absolute left-23 top-[-1.5rem] h-4 w-4 text-muted-foreground" />

                  <Input
                    type="number"
                    value={form.length_cm}
                    onChange={(e) =>
                      updateField(
                        "length_cm",
                        Number(e.target.value)
                      )
                    }
                    className="h-12 rounded-2xl pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Width (CM)
                </Label>

                <Input
                  type="number"
                  value={form.width_cm}
                  onChange={(e) =>
                    updateField(
                      "width_cm",
                      Number(e.target.value)
                    )
                  }
                  className="h-12 rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Height (CM)
                </Label>

                <Input
                  type="number"
                  value={form.height_cm}
                  onChange={(e) =>
                    updateField(
                      "height_cm",
                      Number(e.target.value)
                    )
                  }
                  className="h-12 rounded-2xl"
                />
              </div>

            </CardContent>
          </Card>

          {/* SHIPPING OPTIONS */}
          <Card className="rounded-3xl border border-slate-200/70 shadow-sm dark:border-slate-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Truck className="h-5 w-5 text-primary" />
                Shipment Preferences
              </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div className="space-y-2">
                <Label>Item Type</Label>

                <Select
                  value={form.item_type}
                  onValueChange={(value) =>
                    updateField("item_type", value)
                  }
                >
                  <SelectTrigger className="h-12 rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent className="rounded-2xl">
                    <SelectItem value="electronics">
                      Electronics
                    </SelectItem>

                    <SelectItem value="fragile">
                      Fragile
                    </SelectItem>

                    <SelectItem value="documents">
                      Documents
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Delivery Preference</Label>

                <Select
                  value={form.delivery_type}
                  onValueChange={(value) =>
                    updateField("delivery_type", value)
                  }
                >
                  <SelectTrigger className="h-12 rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent className="rounded-2xl">
                    <SelectItem value="standard">
                      Standard
                    </SelectItem>

                    <SelectItem value="express">
                      Express
                    </SelectItem>

                    <SelectItem value="priority">
                      Priority
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* ADVANCED TAB */}
        <TabsContent
          value="advanced"
          className="space-y-6"
        >

          <Card className="rounded-3xl border border-slate-200/70 shadow-sm dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Advanced Charges
              </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div className="space-y-2">
                <Label>Declared Value</Label>

                <Input
                  type="number"
                  value={form.declared_value}
                  onChange={(e) =>
                    updateField(
                      "declared_value",
                      Number(e.target.value)
                    )
                  }
                  className="h-12 rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label>Tax Percentage</Label>

                <Input
                  type="number"
                  value={form.tax_percentage}
                  onChange={(e) =>
                    updateField(
                      "tax_percentage",
                      Number(e.target.value)
                    )
                  }
                  className="h-12 rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label>Discount Amount</Label>

                <Input
                  type="number"
                  value={form.discount_amount}
                  onChange={(e) =>
                    updateField(
                      "discount_amount",
                      Number(e.target.value)
                    )
                  }
                  className="h-12 rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label>Extra Charges</Label>

                <Input
                  type="number"
                  value={form.manual_extra_charge}
                  onChange={(e) =>
                    updateField(
                      "manual_extra_charge",
                      Number(e.target.value)
                    )
                  }
                  className="h-12 rounded-2xl"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Remarks</Label>

                <Textarea
                  rows={4}
                  value={form.remarks}
                  onChange={(e) =>
                    updateField(
                      "remarks",
                      e.target.value
                    )
                  }
                  className="rounded-2xl"
                />
              </div>

            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

      {/* SUMMARY */}
      <Card className="mt-6 rounded-3xl border-0 bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-xl">
        <CardContent className="p-6 space-y-5">

          <div className="flex items-center justify-between">
            <span className="text-white font-bold">
              Shipping Cost
            </span>

            <span className="text-lg font-semibold">
              ${
  calculationResponse?.data
    ?.shipping_cost || "0.00"
}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white font-bold">
              Tax Amount
            </span>

            <span className="text-lg font-semibold">
             ${
  calculationResponse?.data
    ?.tax_amount || "0.00"
}
            </span>
          </div>

          <div className="border-t border-white/20 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-white">
                  Final Shipment Price
                </p>

                <h3 className="text-3xl font-bold tracking-tight">
                  ${
  calculationResponse?.data
    ?.final_amount || "0.00"
}
                </h3>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <BadgeDollarSign className="h-8 w-8" />
              </div>
            </div>
          </div>

          <Button
  onClick={handleCalculateShipment}
  disabled={calculationLoading}
>
  {calculationLoading
    ? "Calculating..."
    : "Save Calculation"}
</Button>

        </CardContent>
      </Card>

    </div>
  </DialogContent>
</Dialog>

      <Dialog
  open={standbyOpen}
  onOpenChange={setStandbyOpen}
>
  <DialogContent className="sm:max-w-lg rounded-3xl border-0 p-0 overflow-hidden shadow-2xl">

    {/* Header */}
    <div className="relative overflow-hidden bg-gradient-to-r from-yellow-500 to-amber-500 px-6 py-6 text-white">

      <div className="absolute inset-0 bg-black/5" />

      <div className="relative flex items-start gap-4">

        <div className="h-12 w-25 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Put Shipment on Standby
          </DialogTitle>

          <DialogDescription className="text-yellow-50 mt-2 text-sm leading-6">
            Provide a reason for putting this shipment
            on standby. This message will be recorded
            for tracking and operational review.
          </DialogDescription>
        </div>

      </div>
    </div>

    {/* Body */}
    <div className="p-6 space-y-5">

      {/* Reason Input */}
      <div className="space-y-3">

        <Label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Reason
        </Label>

        <div className="relative">

          <Textarea
            value={standbyReason}
            onChange={(e) =>
              setStandbyReason(e.target.value)
            }
            placeholder="Write the reason for standby shipment..."
            className="min-h-[140px] rounded-2xl border-slate-200 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-yellow-500 resize-none text-[15px] leading-7 shadow-sm"
          />

          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
            {standbyReason.length}/500
          </div>

        </div>
      </div>

      {/* Info Box */}
      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-4 flex items-start gap-3">

        <div className="mt-0.5">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
        </div>

        <div>
          <p className="text-sm font-semibold text-yellow-800">
            Shipment Status Warning
          </p>

          <p className="text-sm text-yellow-700 mt-1 leading-6">
            Once marked as standby, shipment processing
            may pause until reviewed by operations.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 pt-2">

        <Button
          variant="outline"
          onClick={() =>
            setStandbyOpen(false)
          }
          className="rounded-xl h-11 px-5"
        >
          Cancel
        </Button>

        <Button
          disabled={!standbyReason.trim()}
          onClick={() => {
            console.log(
              "Standby Reason:",
              standbyReason
            );

            setStandbyOpen(false);
            setStandbyReason("");
          }}
          className="rounded-xl h-11 px-6 bg-yellow-500 hover:bg-yellow-600 text-white shadow-sm"
        >
          <PauseCircle className="w-4 h-4 mr-2" />
          Send Standby Request
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