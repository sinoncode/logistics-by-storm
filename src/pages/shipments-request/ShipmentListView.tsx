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

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import { Badge } from "@/components/ui/badge";

import { useShipmentDetailsStore } from "@/store/shipmentDetailsStore";

import ShipmentCalculationModal from "@/components/shipment/ShipmentCalculationModal";
import ShipmentStandbyModal from "@/components/shipment/ShipmentStandbyModal";

import {
  AlertTriangle,
  Calculator,
  Download,
  FileImage,
  FileText,
  Mail,
  MapPin,
  PackageCheck,
  PauseCircle,
  Phone,
  User,
  ImageIcon,
  CalendarDays,
  Truck,
  Box,
  Store,
  Fence,
  ShoppingBag,
} from "lucide-react";

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
    useState<any>(null);

  // ======================================================
  // HELPERS
  // ======================================================

  const document =
    shipment?.documents?.[1];

    console.log(document);

  const fileUrl = document?.file_path
    ? `${document.file_path}`
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

  const handleDownload = () => {
    if (!fileUrl) return;

    window.open(fileUrl, "_blank");
  };

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
             onClick={() => setStandbyOpen(true)}
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
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                    <Store className="h-5 w-5 text-violet-600" />
                  }
                  title="Supplier"
                  value={
                    shipment?.supplier_name
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

                {/* <InfoCard
                  icon={
                    <Fence className="h-5 w-5 text-blue-900" />
                  }
                  title="Tariff code"
                  value={
  formatSentenceCase(
    shipment?.items?.[0]?.commodity_type
      ?.match(/\(tariff code:\s*([^)]+)\)/i)?.[1] || "--"
  )
}
                /> */}
              </div>

              {/* DOCUMENT */}

              {/* <div className="rounded-[28px] border p-6">
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
              </div> */}
            </CardContent>
          </Card>
{/* ROUTE SECTION */}
    <div className="rounded-[28px] border bg-white dark:bg-slate-950 p-6">
      <div className="flex items-center justify-between flex-wrap gap-6">
        {/* ORIGIN */}
        <div className="flex-1 min-w-[240px]">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Origin
          </p>

          <div className="space-y-2">
            <h3 className="text-lg font-bold">
             {
                  shipment
                    ?.origin_facility
                    ?.name || "--"
                }
            </h3>

            {/* <p className="text-sm text-muted-foreground">
              US-MIA-WH1
            </p> */}

            <Badge
              variant="outline"
              className="rounded-full"
            >
              {
                  shipment
                    ?.origin_country?.name ||
                  "--"
                }
            </Badge>
          </div>
        </div>

        {/* CENTER */}
        <div className="hidden lg:flex items-center justify-center px-4">
          <div className="relative w-40 h-[2px] bg-border">
            <div className="absolute left-0 -top-[6px] w-3 h-3 rounded-full bg-primary"></div>

            <div className="absolute right-0 -top-[6px] w-3 h-3 rounded-full bg-primary"></div>

            <Truck className="absolute left-1/2 -translate-x-1/2 -top-4 w-7 h-7 text-primary bg-white dark:bg-slate-950 rounded-full p-1" />
          </div>
        </div>

        {/* DESTINATION */}
        <div className="flex-1 min-w-[240px] lg:text-right">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Destination
          </p>

          <div className="space-y-2">
            <h3 className="text-lg font-bold">
            {
                  shipment
                    ?.destination_facility
                    ?.name || "--"
                }
            </h3>

            {/* <p className="text-sm text-muted-foreground">
              BS-NAS-PALMDALE
            </p> */}

            <Badge
              variant="secondary"
              className="rounded-full"
            >
             {
                  shipment
                    ?.destination_country
                    ?.name || "--"
                }
            </Badge>
          </div>
        </div>
      </div>
    </div>

          {/* ITEMS + DOCUMENTS */}
          <div className="space-y-6">
  {shipment?.items?.map((item, index) => (
    <Card
      key={item.id}
      className="overflow-hidden rounded-3xl border bg-white shadow-sm dark:bg-slate-950"
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 px-6 pt-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <ShoppingBag className="h-5 w-5 text-primary" />
        </div>

        <div>
          <CardTitle className="text-2xl">
            Item {index + 1}
          </CardTitle>
        </div>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 p-6">
        {/* ITEM DETAILS */}
        <div className="rounded-[28px] border p-5 bg-slate-50 dark:bg-slate-900/40">
          <div className="flex items-center gap-2 mb-5">
            <Box className="w-5 h-5 text-primary" />

            <h3 className="text-lg font-semibold">
              Shipment Item
            </h3>
          </div>

          <div className=" rounded-2xl border bg-white dark:bg-slate-950 p-5 flex items-center  justify-between">
            {/* Commodity */}
            <div>
              <p className="text-sm text-muted-foreground">
                Commodity
              </p>

              <h4 className="mt-1 text-xl font-semibold">
                {
                  item?.commodity_type
                    ?.split(" (")[0] || "--"
                }
              </h4>
            </div>

            {/* Tariff Code */}
            {/* <div>
              <p className="text-sm text-muted-foreground">
                Tariff Code
              </p>

              <h4 className="mt-1 text-lg font-semibold">
                {
                  item?.commodity_type
                    ?.match(
                      /\(tariff code:\s*([^)]+)\)/i
                    )?.[1] || "--"
                }
              </h4>
            </div> */}

            {/* Price */}
            <div>
              <p className="text-sm text-muted-foreground">
                Price
              </p>

              <h4 className="mt-1 text-xl font-bold text-primary">
                ${item?.price || 0}
              </h4>
            </div>
          </div>
        </div>

        {/* DOCUMENT */}
        <div className="rounded-[28px] border p-5 bg-slate-50 dark:bg-slate-900/40">
          <div className="flex items-center gap-2 mb-5">
            <FileText className="w-5 h-5 text-primary" />

            <h3 className="text-lg font-semibold">
              Shipment Document
            </h3>
          </div>

          <div className="rounded-2xl border bg-white dark:bg-slate-950 p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FileImage className="w-6 h-6 text-primary" />
              </div>

              <div>
                <h4 className="font-semibold text-lg">
                  {document?.original_name
                    ? document.original_name.length >
                      15
                      ? `${document.original_name.slice(
                          0,
                          15
                        )}...`
                      : document.original_name
                    : "No Document"}
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
      </div>
    </Card>
  ))}
</div>


 {/* DELIVERY ADDRESS */}
    <div className="rounded-[28px] bg-white dark:bg-slate-950 border p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 mt-3 flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5 text-primary" />
        </div>

        <div className="">
          <div>
            <p className="text-sm text-muted-foreground">
              Delivery Address
            </p>

            <h3 className="text-lg font-semibold mt-1">
               {
  shipment?.delivery_address?.label
    ? shipment.delivery_address.label
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    : "--"
}
            </h3>
          </div>

          <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300">
           {fullAddress || "--"}
          </p>
        </div>
      </div>
    </div>
   
    
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

                  {/* <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-emerald-500 text-white">
                      Active Customer
                    </Badge>

                    <Badge variant="outline">
                      {shipment?.user?.id ||
                        "--"}
                    </Badge>
                  </div> */}
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
          {/* <Card className="rounded-3xl border bg-white shadow-sm dark:bg-slate-950">
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
          </Card> */}

                 <Card className="rounded-3xl border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur-xl shadow-sm overflow-hidden">
    
    <CardHeader className="border-b border-slate-200 dark:border-slate-800 pb-4">
      <CardTitle className="flex items-center justify-between">
        <span>Shipment Summary</span>

        
          <Badge className=" text-white rounded-full px-3 py-1">
            Item 1
          </Badge>

      </CardTitle>
    </CardHeader>

    <CardContent className="p-6 space-y-5">

      {/* Weight */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">
          Actual Weight
        </span>

        <span className="font-semibold text-slate-900 dark:text-white">
         12LB
        </span>
      </div>

      {/* Volumetric Weight */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">
          Volumetric Weight
        </span>

        <span className="font-semibold text-slate-900 dark:text-white">
          42 LB
        </span>
      </div>

      {/* Delivery */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">
          Delivery
        </span>

        <Badge className="rounded-full">
          Express
        </Badge>
      </div>

      {/* Package Type */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">
          Package Type
        </span>

        <span className="font-semibold text-slate-900 dark:text-white">
          Electronics
        </span>
      </div>

      {/* Dimensions */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">
          Dimensions
        </span>

        <span className="font-semibold text-slate-900 dark:text-white text-right">
          41
        </span>
      </div>

      {/* Declared Value */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">
          Declared Value
        </span>

        <span className="font-semibold text-slate-900 dark:text-white">
          $
         0
        </span>
      </div>

      {/* Final Price */}
      <div className="pt-4 border-t border-dashed border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">
            Final Shipment Price
          </span>

          <span className="text-2xl font-bold text-primary">
            $
            0.00
          </span>
        </div>
      </div>

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

          <div className="space-y-6 overflow-y-auto max-h-[calc(92vh-150px)] bg-slate-50 p-6 dark:bg-slate-950">
            {/* PREVIEW */}

            <div className="rounded-[28px] border bg-white shadow-sm dark:bg-slate-900">
              {renderDocumentPreview()}
            </div>

            {/* DOWNLOAD BUTTON */}

            <div className="flex justify-center">
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

      {/* CALCULATOR MODAL */}

      <ShipmentCalculationModal
        open={calculatorOpen}
        onOpenChange={setCalculatorOpen}
        shipmentId={id}
        shipment={shipment}
        onCalculationComplete={(result) => {
          setCalculationResult(result);
        }}
      />

    <ShipmentStandbyModal
  open={standbyOpen}
  onOpenChange={setStandbyOpen}
  shipmentId={shipment?.id}
/>
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

          <h3 className="mt-1 break-all text-sm font-semibold">
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