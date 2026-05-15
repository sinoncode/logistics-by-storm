import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { PauseCircle, AlertTriangle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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

import {
  Truck,
  PackageCheck,
  CalendarDays,
  BadgeDollarSign,
  FileImage,
  User,
  Mail,
  Phone,
  MapPin,
  StickyNote,
  Calculator,
  Download,
  FileText,
  File,
  ImageIcon,
  Box,
  CheckCircle2,
  Weight,
  Ruler,
  ShieldCheck,
} from "lucide-react";

export default function ShipmentRequestPage() {
  // ======================================================
  // DOCUMENT PREVIEW
  // ======================================================

const [standbyOpen, setStandbyOpen] =
  useState(false);

const [standbyReason, setStandbyReason] =
  useState("");

const [calculationResult, setCalculationResult] =
  useState<any>(null);


  const [previewOpen, setPreviewOpen] = useState(false);

  // ======================================================
  // CALCULATOR MODAL
  // ======================================================

  const [calculatorOpen, setCalculatorOpen] =
    useState(false);

  // ======================================================
  // FORM STATE
  // ======================================================

  const [form, setForm] = useState({
    actual_weight_lb: 12,
    length_cm: 40,
    width_cm: 30,
    height_cm: 25,
    declared_value: 120,
    tariff_code: "ELEC-01",
    manual_extra_charge: 0,
    discount_amount: 0,
    tax_percentage: 18,
    volumetric_divisor: 5000,
    remarks: "",
    item_type: "electronics",
    delivery_type: "express",
  });

  // ======================================================
  // MOCK SHIPMENT DATA
  // ======================================================

  const shipmentData = {
    trackingNo: "#TRK102589",
    supplier: "Global Trade Supplier Ltd.",
    date: "08 May 2026",
    commodity: "Electronic Accessories",
    price: "$2,450",
    note: `Handle with care. These packages contain fragile electronic items. Avoid water exposure and ensure safe transportation during delivery.`,

    document: {
      type: "pdf", // pdf | image | doc
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      fileName: "shipment-document.pdf",
    },
  };

  // ======================================================
  // CUSTOMER DATA
  // ======================================================

  const customerData = {
    customerId: "#CUS1025",
    name: "Kathryn Murphy",
    email: "kathryn@gmail.com",
    phone: "+91 9876543210",
    address:
      "A-302, Sector 62, Noida, Uttar Pradesh, India - 201309",
  };

  // ======================================================
  // CALCULATION LOGIC
  // ======================================================

  const calculations = useMemo(() => {
    const volumetricWeight =
      (form.length_cm *
        form.width_cm *
        form.height_cm) /
      form.volumetric_divisor;

    const chargeableWeight = Math.max(
      form.actual_weight_lb,
      volumetricWeight
    );

    let baseRate = 8;

    if (form.item_type === "electronics") {
      baseRate = 12;
    }

    if (form.item_type === "fragile") {
      baseRate = 15;
    }

    if (form.item_type === "documents") {
      baseRate = 5;
    }

    let deliveryMultiplier = 1;

    if (form.delivery_type === "express") {
      deliveryMultiplier = 1.5;
    }

    if (form.delivery_type === "priority") {
      deliveryMultiplier = 2;
    }

    const shippingCost =
      chargeableWeight *
      baseRate *
      deliveryMultiplier;

    const declaredCharge =
      form.declared_value * 0.02;

    const subtotal =
      shippingCost +
      declaredCharge +
      form.manual_extra_charge;

    const taxAmount =
      (subtotal * form.tax_percentage) / 100;

    const finalAmount =
      subtotal +
      taxAmount -
      form.discount_amount;

    return {
      volumetricWeight:
        volumetricWeight.toFixed(2),
      chargeableWeight:
        chargeableWeight.toFixed(2),
      shippingCost: shippingCost.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      finalAmount: finalAmount.toFixed(2),
    };
  }, [form]);

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

  const handleCalculateShipment = () => {
  setCalculationResult({
    actualWeight: form.actual_weight_lb,
    volumetricWeight:
      calculations.volumetricWeight,

    deliveryType: form.delivery_type,

    itemType: form.item_type,

    length: form.length_cm,

    width: form.width_cm,

    height: form.height_cm,

    declaredValue:
      form.declared_value,

    finalPrice:
      calculations.finalAmount,
  });
};

  const renderDocumentPreview = () => {
    if (shipmentData.document.type === "image") {
      return (
        <img
          src={shipmentData.document.url}
          alt="Document"
          className="w-full max-h-[75vh] rounded-2xl object-contain"
        />
      );
    }

    if (shipmentData.document.type === "pdf") {
      return (
        <iframe
          src={shipmentData.document.url}
          className="w-full h-[75vh] rounded-2xl border"
          title="PDF Preview"
        />
      );
    }

    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <FileText className="w-16 h-16 text-primary mb-4" />

        <h3 className="text-xl font-semibold">
          Document Preview
        </h3>

        <p className="text-muted-foreground mt-2">
          Preview is unavailable for this file type.
        </p>
      </div>
    );
  };

  const getDocumentIcon = () => {
    if (shipmentData.document.type === "pdf") {
      return <FileText className="w-5 h-5" />;
    }

    if (shipmentData.document.type === "image") {
      return <ImageIcon className="w-5 h-5" />;
    }

    return <File className="w-5 h-5" />;
  };

  // ======================================================
  // FIELD CARD
  // ======================================================

  const FieldCard = ({
    icon,
    label,
    value,
    className = "",
  }: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={`rounded-3xl border bg-white dark:bg-slate-900 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            {label}
          </p>
        </div>
      </div>

      <div className="text-[15px] font-semibold text-slate-800 dark:text-white leading-7">
        {value}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-6 space-y-6">
      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          {/* <Badge className="rounded-full px-4 py-1 mb-3">
            Shipment Management
          </Badge> */}

          <h1 className="text-3xl font-bold tracking-tight">
            Shipment Request Details
          </h1>

          <p className="text-muted-foreground mt-2">
            View shipment information, customer
            details and calculate delivery pricing.
          </p>
        </div>
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <Button
  variant="outline"
  onClick={() => setStandbyOpen(true)}
  className="rounded-2xl h-12 px-6 bg-yellow-500 border-yellow-200 text-white hover:bg-yellow-600 hover:text-white shadow-sm transition-all duration-300"
>
  <PauseCircle className="w-4 h-4 mr-2" />
  Standby Shipment
</Button>

        <Button
          onClick={() =>
            setCalculatorOpen(true)
          }
          className="rounded-2xl h-12 px-0 text-base"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Shipment Calculation
        </Button>
        </div>
      </div>

      {/* ====================================================== */}
      {/* MAIN GRID */}
      {/* ====================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ====================================================== */}
        {/* LEFT SIDE */}
        {/* ====================================================== */}

        <div className="xl:col-span-2 space-y-6">
          {/* SHIPMENT CARD */}

          <Card className="rounded-[28px] border-0 shadow-sm overflow-hidden bg-white dark:bg-slate-950">
  {/* Header */}
  <CardHeader className="border-b bg-gradient-to-r from-primary/[0.04] to-transparent pb-5">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Truck className="w-5 h-5 text-primary" />
          </div>

          <div>
            <CardTitle className="text-2xl font-bold">
              Shipment Information
            </CardTitle>

            <CardDescription className="mt-1">
              Shipment request and logistics details
            </CardDescription>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge className="rounded-full px-4 py-1 text-xs capitalize">
          Waiting For Package Arrival
        </Badge>

        <Badge
          variant="outline"
          className="rounded-full px-4 py-1"
        >
          Standard
        </Badge>
      </div>
    </div>
  </CardHeader>

  <CardContent className="p-6 space-y-6">
    {/* TOP INFO */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {/* Request Number */}
      <div className="rounded-3xl border p-5 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
            <PackageCheck className="w-5 h-5 text-primary" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Request Number
            </p>

            <h3 className="font-semibold mt-1 text-sm">
              SR-20260514155711-BG93CB
            </h3>
          </div>
        </div>
      </div>

      {/* Tracking */}
      <div className="rounded-3xl border p-5 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-blue-500/10 flex items-center justify-center">
            <Truck className="w-5 h-5 text-blue-600" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Supplier Tracking
            </p>

            <h3 className="font-semibold mt-1 text-sm">
              #215456
            </h3>
          </div>
        </div>
      </div>

      {/* Requested Date */}
      <div className="rounded-3xl border p-5 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-emerald-600" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Requested At
            </p>

            <h3 className="font-semibold mt-1 text-sm">
              14 May 2026
            </h3>
          </div>
        </div>
      </div>

      {/* Delivery */}
      <div className="rounded-3xl border p-5 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-orange-500/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-orange-600" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Delivery Type
            </p>

            <h3 className="font-semibold mt-1 capitalize text-sm">
              Door Delivery
            </h3>
          </div>
        </div>
      </div>
    </div>

    {/* ROUTE SECTION */}
    <div className="rounded-[28px] border bg-slate-50 dark:bg-slate-900/40 p-6">
      <div className="flex items-center justify-between flex-wrap gap-6">
        {/* ORIGIN */}
        <div className="flex-1 min-w-[240px]">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Origin
          </p>

          <div className="space-y-2">
            <h3 className="text-lg font-bold">
              Miami Warehouse
            </h3>

            <p className="text-sm text-muted-foreground">
              US-MIA-WH1
            </p>

            <Badge
              variant="outline"
              className="rounded-full"
            >
              United States
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
              Nassau Store
            </h3>

            <p className="text-sm text-muted-foreground">
              BS-NAS-PALMDALE
            </p>

            <Badge
              variant="secondary"
              className="rounded-full"
            >
              Nassau
            </Badge>
          </div>
        </div>
      </div>
    </div>

    {/* DELIVERY ADDRESS */}
    <div className="rounded-[28px] border p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5 text-primary" />
        </div>

        <div className="space-y-2">
          <div>
            <p className="text-sm text-muted-foreground">
              Delivery Address
            </p>

            <h3 className="text-lg font-semibold mt-1">
              Home
            </h3>
          </div>

          <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300">
            Noida, Nassau, New Providence
          </p>
        </div>
      </div>
    </div>

    {/* ITEMS + DOCUMENTS */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* ITEMS */}
      <div className="rounded-[28px] border p-6">
        <div className="flex items-center gap-2 mb-5">
          <Box className="w-5 h-5 text-primary" />

          <h3 className="text-lg font-semibold">
            Shipment Items
          </h3>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 p-4 border">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Commodity
                </p>

                <h4 className="font-semibold mt-1 text-xl">
                  Iphone 15
                </h4>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  Price
                </p>

                <h4 className="font-bold text-primary mt-1 text-xl">
                  ₹70,000
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DOCUMENTS */}
      <div className="rounded-[28px] border p-6">
        <div className="flex items-center gap-2 mb-5">
          <FileText className="w-5 h-5 text-primary" />

          <h3 className="text-lg font-semibold ">
            Shipment Documents
          </h3>
        </div>

        <div className="rounded-2xl border bg-slate-50 dark:bg-slate-900/40 p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <FileImage className="w-6 h-6 text-primary" />
            </div>

            <div>
              <h4 className="font-semibold text-xl">
                Shipment Document
              </h4>

              <p className="text-sm text-muted-foreground">
                PNG File
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() =>
              setPreviewOpen(true)
            }
          >
            View
          </Button>
        </div>
      </div>
    </div>
  </CardContent>
</Card>

          {/* CUSTOMER CARD */}

         {/* Customer Information Card */}
<Card className="overflow-hidden rounded-3xl border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur-xl shadow-sm">
  
  {/* Header */}
  <div className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
    
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/0 to-primary/5" />

    <div className="relative px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

      {/* Left */}
      <div className="flex items-center gap-4">

        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm">
          <User className="h-8 w-8 text-primary" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {customerData.name}
          </h2>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
              Active Customer
            </div>

            <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
              {customerData.customerId}
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      {/* <div className="flex gap-3 flex-wrap">
        <Button
          variant="outline"
          className="rounded-xl"
        >
          Contact Customer
        </Button>

        <Button className="rounded-xl">
          View History
        </Button>
      </div> */}
    </div>
  </div>

  {/* Body */}
  <CardContent className="p-6">

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">

      {/* Email */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 p-5 hover:shadow-md transition-all duration-300">

        <div className="flex items-center  gap-3 mb-3">
          <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
            <Mail className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Email Address
            </p>

            <p className="font-semibold text-slate-900 dark:text-white">
              {customerData.email}
            </p>
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 p-5 hover:shadow-md transition-all duration-300">

        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
            <Phone className="h-5 w-5 text-emerald-600" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Phone Number
            </p>

            <p className="font-semibold text-slate-900 dark:text-white">
              {customerData.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 p-5 hover:shadow-md transition-all duration-300 md:col-span-2 xl:col-span-1">

        <div className="flex items-start gap-3">

          <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
            <MapPin className="h-5 w-5 text-orange-600" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Shipping Address
            </p>

            <p className="font-medium leading-7 text-slate-900 dark:text-white">
              {customerData.address}
            </p>
          </div>
        </div>
      </div>

    </div>

  </CardContent>
</Card>
        </div>

        {/* ====================================================== */}
        {/* RIGHT SIDE */}
        {/* ====================================================== */}

        <div className="space-y-6">
          <div className="space-y-6">
  <Card className="rounded-3xl border border-slate-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur-xl shadow-sm overflow-hidden">
    
    <CardHeader className="border-b border-slate-200 dark:border-slate-800 pb-4">
      <CardTitle className="flex items-center justify-between">
        <span>Shipment Summary</span>

        {calculationResult && (
          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-3 py-1">
            Calculated
          </Badge>
        )}
      </CardTitle>
    </CardHeader>

    <CardContent className="p-6 space-y-5">

      {/* Weight */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">
          Actual Weight
        </span>

        <span className="font-semibold text-slate-900 dark:text-white">
          {calculationResult?.actualWeight || "12"} LB
        </span>
      </div>

      {/* Volumetric Weight */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">
          Volumetric Weight
        </span>

        <span className="font-semibold text-slate-900 dark:text-white">
          {calculationResult?.volumetricWeight || "--"} LB
        </span>
      </div>

      {/* Delivery */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">
          Delivery
        </span>

        <Badge className="rounded-full">
          {calculationResult?.deliveryType || "Express"}
        </Badge>
      </div>

      {/* Package Type */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">
          Package Type
        </span>

        <span className="font-semibold text-slate-900 dark:text-white">
          {calculationResult?.itemType || "Electronics"}
        </span>
      </div>

      {/* Dimensions */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">
          Dimensions
        </span>

        <span className="font-semibold text-slate-900 dark:text-white text-right">
          {calculationResult
            ? `${calculationResult.length} × ${calculationResult.width} × ${calculationResult.height} CM`
            : "--"}
        </span>
      </div>

      {/* Declared Value */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">
          Declared Value
        </span>

        <span className="font-semibold text-slate-900 dark:text-white">
          $
          {calculationResult?.declaredValue || "0"}
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
            {calculationResult?.finalPrice || "0.00"}
          </span>
        </div>
      </div>

    </CardContent>
  </Card>
</div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* DOCUMENT MODAL */}
      {/* ====================================================== */}

      <Dialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      >
        <DialogContent className="max-w-5xl rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle>
              Shipment Document
            </DialogTitle>

            <DialogDescription>
              Preview and download shipment files
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            {renderDocumentPreview()}

            <div className="flex justify-end">
              <a
                href={shipmentData.document.url}
                download={
                  shipmentData.document.fileName
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="rounded-2xl px-6">
                  <Download className="w-4 h-4 mr-2" />
                  Download Document
                </Button>
              </a>
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
              ${calculations.shippingCost}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white font-bold">
              Tax Amount
            </span>

            <span className="text-lg font-semibold">
              ${calculations.taxAmount}
            </span>
          </div>

          <div className="border-t border-white/20 pt-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-white">
                  Final Shipment Price
                </p>

                <h3 className="text-3xl font-bold tracking-tight">
                  ${calculations.finalAmount}
                </h3>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <BadgeDollarSign className="h-8 w-8" />
              </div>
            </div>
          </div>

          <Button
            onClick={handleCalculateShipment}
            className="h-12 w-full text-lg rounded-2xl bg-white text-primary hover:bg-white/90"
          >
            <CheckCircle2 className="mr-1 h-5 w-5" />
            Save Calculation
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