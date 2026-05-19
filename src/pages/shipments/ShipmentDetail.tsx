import { useMemo, useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
  Calculator,
  Download,
  FileText,
  CheckCircle2,
  PauseCircle,
  AlertTriangle,
  Package,
  Warehouse,
  Building2,
  Home,
  Navigation,
} from "lucide-react";

const trackingSteps = [
  { id: "order_placed", label: "Order Placed", icon: Package },
  { id: "picked_up", label: "Package Picked Up", icon: PackageCheck },
  { id: "in_transit", label: "In Transit", icon: Truck },
  { id: "sorting_facility", label: "Arrived at Sorting Facility", icon: Warehouse },
  { id: "out_delivery", label: "Out for Delivery", icon: Navigation },
  { id: "delivered", label: "Delivered", icon: Home },
];

export default function ShipmentRequestPage() {
  // ======================================================
  // STATES
  // ======================================================

  const [previewOpen, setPreviewOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [standbyOpen, setStandbyOpen] = useState(false);
  const [standbyReason, setStandbyReason] = useState("");
  const [trackingStatus, setTrackingStatus] = useState("in_transit");
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Trigger animation restart when status changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [trackingStatus]);

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
  // MOCK DATA
  // ======================================================

  const shipmentData = {
    trackingNo: "#TRK102589",
    supplier: "Global Trade Supplier Ltd.",
    date: "08 May 2026",
    commodity: "Electronic Accessories",
    price: "$2,450",

    document: {
      type: "pdf",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      fileName: "shipment-document.pdf",
    },
  };

  const customerData = {
    customerId: "#CUS1025",
    name: "Kathryn Murphy",
    email: "kathryn@gmail.com",
    phone: "+91 9876543210",
    address: "A-302, Sector 62, Noida, Uttar Pradesh, India - 201309",
  };

  // ======================================================
  // TRACKING LOGIC
  // ======================================================

  const activeStepIndex = trackingSteps.findIndex(
    (step) => step.id === trackingStatus
  );

  const truckPosition = `${(activeStepIndex / (trackingSteps.length - 1)) * 100}%`;

  // Determine which options should be selectable
  const isStepSelectable = (index: number) => {
    // Only current step and next step are selectable
    return index === activeStepIndex || index === activeStepIndex + 1;
  };

  // ======================================================
  // CALCULATIONS
  // ======================================================

  const calculations = useMemo(() => {
    const volumetricWeight =
      (form.length_cm * form.width_cm * form.height_cm) / form.volumetric_divisor;

    const chargeableWeight = Math.max(form.actual_weight_lb, volumetricWeight);

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

    const shippingCost = chargeableWeight * baseRate * deliveryMultiplier;

    const declaredCharge = form.declared_value * 0.02;

    const subtotal = shippingCost + declaredCharge + form.manual_extra_charge;

    const taxAmount = (subtotal * form.tax_percentage) / 100;

    const finalAmount = subtotal + taxAmount - form.discount_amount;

    return {
      volumetricWeight: volumetricWeight.toFixed(2),
      chargeableWeight: chargeableWeight.toFixed(2),
      shippingCost: shippingCost.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      finalAmount: finalAmount.toFixed(2),
    };
  }, [form]);

  // ======================================================
  // HELPERS
  // ======================================================

  const updateField = (key: string, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCalculateShipment = () => {
    setCalculationResult({
      actualWeight: form.actual_weight_lb,
      volumetricWeight: calculations.volumetricWeight,
      deliveryType: form.delivery_type,
      itemType: form.item_type,
      length: form.length_cm,
      width: form.width_cm,
      height: form.height_cm,
      declaredValue: form.declared_value,
      finalPrice: calculations.finalAmount,
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
        <h3 className="text-xl font-semibold">Document Preview</h3>
        <p className="text-muted-foreground mt-2">Preview unavailable</p>
      </div>
    );
  };

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 sm:gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            Shipment Tracking Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Real-time shipment monitoring with advanced logistics tracking
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {/* <Button
            variant="outline"
            onClick={() => setStandbyOpen(true)}
            className="rounded-2xl h-10 sm:h-12 px-4 sm:px-6 border-amber-200 bg-amber-500 text-white hover:bg-amber-600 hover:text-white shadow-lg shadow-amber-500/30 transition-all duration-300"
          >
            <PauseCircle className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Standby Shipment</span>
          </Button>

          <Button
            onClick={() => setCalculatorOpen(true)}
            className="rounded-2xl h-10 sm:h-12 px-4 sm:px-6 shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            <Calculator className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" />
            <span className="hidden sm:inline">Shipment Calculator</span>
          </Button> */}

           <div className="w-full xl:w-[340px]">
              <Select value={trackingStatus} onValueChange={setTrackingStatus}>
                <SelectTrigger className="h-11 sm:h-14 rounded-2xl border-2 shadow-sm text-sm sm:text-base">
                  <SelectValue placeholder="Select Tracking Status" />
                </SelectTrigger>

                <SelectContent className="rounded-2xl">
                  {trackingSteps.map((step, index) => {
                    const selectable = isStepSelectable(index);
                    return (
                      <SelectItem
                        key={step.id}
                        value={step.id}
                        disabled={!selectable}
                        className={!selectable ? "opacity-40" : ""}
                      >
                        <div className="flex items-center gap-2">
                          <step.icon className="h-4 w-4" />
                          <span>{step.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* ADVANCED TRACKING SECTION */}
      {/* ====================================================== */}

      <Card className="rounded-[28px] sm:rounded-[36px] border-0 shadow-xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <CardHeader className="border-b bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 sm:p-6">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 sm:gap-5">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl sm:rounded-3xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold">
                  Live Shipment Tracking
                </CardTitle>
                <CardDescription className="mt-1 sm:mt-2 text-xs sm:text-sm">
                  Real-time shipment movement with intelligent route tracking
                </CardDescription>
              </div>
            </div>

            {/* <div className="w-full xl:w-[340px]">
              <Select value={trackingStatus} onValueChange={setTrackingStatus}>
                <SelectTrigger className="h-11 sm:h-14 rounded-2xl border-2 shadow-sm text-sm sm:text-base">
                  <SelectValue placeholder="Select Tracking Status" />
                </SelectTrigger>

                <SelectContent className="rounded-2xl">
                  {trackingSteps.map((step, index) => {
                    const selectable = isStepSelectable(index);
                    return (
                      <SelectItem
                        key={step.id}
                        value={step.id}
                        disabled={!selectable}
                        className={!selectable ? "opacity-40" : ""}
                      >
                        <div className="flex items-center gap-2">
                          <step.icon className="h-4 w-4" />
                          <span>{step.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div> */}
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 lg:p-8">
          {/* TRACKING VISUALIZATION */}
          <div className="relative h-50 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 lg:pb-14 overflow-x-auto">
            {/* BACKGROUND DECORATIVE GRADIENT */}
            <div className="absolute h-50 inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-3xl" />

            {/* MAIN TRACK LINE */}
            <div className="relative h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-slate-200 via-slate-200 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 shadow-inner">
              {/* ACTIVE PROGRESS LINE */}
              <div
                key={`progress-${animationKey}`}
                className="absolute left-0 top-0 h-full rounded-full bg-primary shadow-lg shadow-primary/50"
                style={{
                  width: truckPosition,
                  animation: "expandWidth 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                }}
              />

              {/* ANIMATED TRUCK */}
              <div
                key={`truck-${animationKey}`}
                className="absolute -top-12 sm:-top-16 transition-none"
                style={{
                  left: truckPosition,
                  transform: "translateX(-50%)",
                  animation: "moveTruck 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                }}
              >
                {/* TRUCK GLOW EFFECT */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-blue-500/40 to-cyan-500/40 blur-2xl rounded-full scale-150 animate-pulse" />

                {/* TRUCK CONTAINER */}
                <div className="relative">
                  {/* TRUCK BODY */}
                 <svg
      viewBox="0 0 850 380"
      width="100"
      height="90"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Gradients for Truck Body */}
        <linearGradient id="truckYellow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFDE4D" />
          <stop offset="30%" stopColor="#FBC02D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="truckYellowHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="100%" stopColor="#FBC02D" />
        </linearGradient>
        <linearGradient id="truckYellowDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Gradients for Cardboard Boxes */}
        <linearGradient id="boxLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E6C594" />
          <stop offset="100%" stopColor="#CDA36E" />
        </linearGradient>
        <linearGradient id="boxDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C59B67" />
          <stop offset="100%" stopColor="#A67C4E" />
        </linearGradient>
        <linearGradient id="boxShadow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B58C5A" />
          <stop offset="100%" stopColor="#966D40" />
        </linearGradient>

        {/* Gradients for Wheels and Chassis */}
        <linearGradient id="tireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#424242" />
          <stop offset="50%" stopColor="#212121" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
        <linearGradient id="rimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        {/* Window Gradient */}
        <linearGradient id="windowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0F7FA" />
          <stop offset="40%" stopColor="#B2EBF2" />
          <stop offset="100%" stopColor="#4DD0E1" />
        </linearGradient>
      </defs>

      {/* --- GROUND SOFT SHADOW --- */}
      <ellipse cx="450" cy="340" rx="370" ry="15" fill="#000000" opacity="0.15" />

      {/* --- UNDERCARRIAGE / CHASSIS --- */}
      <g id="chassis">
        <rect x="150" y="270" width="500" height="35" fill="#263238" rx="5" />
        <rect x="340" y="285" width="180" height="25" fill="#151B1E" rx="3" />
        <rect x="520" y="280" width="55" height="30" fill="#37474F" rx="4" />
        {/* Mudguards */}
        <path d="M 175 285 L 145 285 L 140 315 L 155 315 Z" fill="#1A1A1A" />
        <path d="M 275 285 L 305 285 L 300 305 L 285 305 Z" fill="#1A1A1A" />
      </g>

      {/* --- STACKED CARDBOARD BOXES (LEFT FLATBED) --- */}
      <g id="packages">
        {/* Box 1: Bottom Left */}
        <g id="box1">
          <rect x="95" y="190" width="100" height="95" fill="url(#boxLight)" stroke="#8D6E63" strokeWidth="2" rx="3" />
          <rect x="95" y="230" width="100" height="15" fill="#A1887F" opacity="0.5" /> {/* Tape */}
        </g>

        {/* Box 2: Bottom Center-Left */}
        <g id="box2">
          <rect x="190" y="155" width="115" height="130" fill="url(#boxDark)" stroke="#7D5C4C" strokeWidth="2" rx="3" />
          <rect x="240" y="155" width="15" height="130" fill="#8D6E63" opacity="0.6" /> {/* Tape */}
        </g>

        {/* Box 3: Bottom Center-Right */}
        <g id="box3">
          <rect x="300" y="190" width="85" height="95" fill="url(#boxLight)" stroke="#8D6E63" strokeWidth="2" rx="3" />
          <rect x="300" y="225" width="85" height="15" fill="#A1887F" opacity="0.5" /> {/* Tape */}
          {/* Fragile label sticker representation */}
          <rect x="320" y="200" width="20" height="15" fill="#FFF" rx="1" />
          <rect x="323" y="204" width="14" height="7" fill="#E53935" />
        </g>

        {/* Box 4: Middle Left */}
        <g id="box4">
          <rect x="145" y="125" width="110" height="65" fill="url(#boxLight)" stroke="#8D6E63" strokeWidth="2" rx="3" />
          <rect x="145" y="150" width="110" height="14" fill="#A1887F" opacity="0.5" />
        </g>

        {/* Box 5: Middle Center */}
        <g id="box5">
          <rect x="235" y="105" width="65" height="50" fill="url(#boxShadow)" stroke="#7D5C4C" strokeWidth="2" rx="3" />
          <rect x="260" y="105" width="14" height="50" fill="#8D6E63" opacity="0.6" />
        </g>

        {/* Box 6: Top Left */}
        <g id="box6">
          <rect x="148" y="72" width="100" height="53" fill="url(#boxDark)" stroke="#7D5C4C" strokeWidth="2" rx="3" />
          <rect x="190" y="72" width="15" height="53" fill="#8D6E63" opacity="0.6" />
        </g>

        {/* Box 7: Top Right (highest stack against container) */}
        <g id="box7">
          <rect x="315" y="55" width="65" height="50" fill="url(#boxLight)" stroke="#8D6E63" strokeWidth="2" rx="3" />
          <rect x="340" y="55" width="14" height="50" fill="#A1887F" opacity="0.5" />
        </g>
        <g id="box8">
          <rect x="300" y="105" width="80" height="85" fill="url(#boxDark)" stroke="#7D5C4C" strokeWidth="2" rx="3" />
          <rect x="300" y="135" width="80" height="15" fill="#8D6E63" opacity="0.6" />
        </g>
      </g>

      {/* --- MAIN TRUCK BODY --- */}
      {/* Flatbed Lower Guard rail */}
      <path d="M 70 285 L 380 285 L 380 300 L 70 300 Z" fill="url(#truckYellowDark)" />
      <path d="M 70 285 L 380 285 L 380 290 L 70 290 Z" fill="#FFF" opacity="0.3" />
      <rect x="73" y="289" width="8" height="8" rx="1" fill="#E53935" /> {/* Rear side reflector */}

      {/* Center Closed Cargo Box */}
      <g id="enclosedContainer">
        <rect x="380" y="32" width="220" height="253" fill="url(#truckYellow)" stroke="#D97706" strokeWidth="3" rx="4" />
        {/* Inner panel styling accents for depth */}
        <rect x="395" y="47" width="190" height="223" fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.5" rx="2" />
        {/* Dynamic environmental soft reflection map */}
        <path d="M 383 35 L 480 35 L 420 282 L 383 282 Z" fill="#FFF" opacity="0.15" />
      </g>

      {/* --- TRUCK CAB (FRONT) --- */}
      <g id="truckCab">
        {/* Main Cab Shell base path */}
        <path 
          d="M 595 45 
             C 645 45, 665 52, 685 85 
             L 770 170 
             C 790 190, 795 210, 795 235 
             L 795 300 
             L 600 300 
             Z" 
          fill="url(#truckYellow)" 
          stroke="#D97706" 
          strokeWidth="3" 
        />
        
        {/* Aerodynamic Wind Deflector Roof Highlight */}
        <path d="M 597 47 C 640 47, 660 54, 678 82 L 640 82 C 610 82, 597 70, 597 47 Z" fill="url(#truckYellowHighlight)" />

        {/* Front Windshield Window */}
        <path 
          d="M 685 95 
             L 750 165 
             C 758 173, 762 185, 762 195 
             L 715 195 
             C 700 195, 680 195, 670 170 
             L 655 125 
             C 650 110, 665 95, 685 95 Z" 
          fill="url(#windowGrad)" 
          stroke="#263238" 
          strokeWidth="3" 
        />
        
        {/* Windshield Gloss Highlight */}
        <path d="M 690 102 L 740 158 L 725 158 L 680 112 Z" fill="#FFF" opacity="0.4" />

        {/* Side Passenger Window Space / Mirror Mount Panel */}
        <path d="M 610 105 L 645 105 L 655 155 L 610 155 Z" fill="#263238" opacity="0.8" />
        {/* Driver Seat Silhouette inside window */}
        <path d="M 615 155 C 615 130, 625 120, 635 120 C 642 120, 645 125, 645 135 L 640 155 Z" fill="#151B1E" />

        {/* Front Grille */}
        <g id="grille">
          <path d="M 765 215 L 793 215 L 793 275 L 752 275 Z" fill="#37474F" rx="2" />
          <line x1="765" y1="227" x2="793" y2="227" stroke="#212121" strokeWidth="3" strokeLinecap="round" />
          <line x1="760" y1="239" x2="793" y2="239" stroke="#212121" strokeWidth="3" strokeLinecap="round" />
          <line x1="755" y1="251" x2="793" y2="251" stroke="#212121" strokeWidth="3" strokeLinecap="round" />
          <line x1="750" y1="263" x2="793" y2="263" stroke="#212121" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Headlight */}
        <path d="M 770 280 Q 790 280, 792 292 L 748 292 Q 752 280, 770 280 Z" fill="#ECEFF1" stroke="#78909C" strokeWidth="2" />
        <path d="M 775 281 Q 788 281, 790 288 L 760 288 Q 764 281, 775 281 Z" fill="#FFF" />

        {/* Door Handle */}
        <rect x="620" y="200" width="22" height="7" rx="2" fill="#212121" />
        <rect x="620" y="202" width="22" height="2" rx="1" fill="#757575" />

        {/* Side Mirror */}
        <g id="mirror">
          <rect x="665" y="115" width="12" height="35" rx="3" fill="#212121" />
          <rect x="667" y="118" width="8" height="29" rx="1" fill="#546E7A" />
          <path d="M 655 125 L 665 125 M 653 140 L 665 135" stroke="#212121" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Cab steps / Trim details */}
        <rect x="685" y="48" width="6" height="6" rx="3" fill="#FFB300" />
        <rect x="705" y="55" width="6" height="6" rx="3" fill="#FFB300" />
        <path d="M 730 297 L 785 297" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* --- WHEELS ARCHES & WHEELS --- */}
      {/* Rear Wheel Setup */}
      <g id="rearWheel">
        {/* Wheel Arch */}
        <path d="M 170 280 A 55 55 0 0 1 280 280" fill="none" stroke="#212121" strokeWidth="8" strokeLinecap="round" />
        {/* Tire */}
        <circle cx="225" cy="285" r="45" fill="url(#tireGrad)" />
        <circle cx="225" cy="285" r="32" fill="#121212" />
        {/* Rim */}
        <circle cx="225" cy="285" r="25" fill="url(#rimGrad)" stroke="#D97706" strokeWidth="1" />
        <circle cx="225" cy="285" r="14" fill="#212121" />
        {/* Lug Nuts / Center cap */}
        <circle cx="225" cy="285" r="7" fill="url(#rimGrad)" />
        <circle cx="225" cy="275" r="2" fill="#FFF" opacity="0.8" />
        <circle cx="235" cy="285" r="2" fill="#FFF" opacity="0.8" />
        <circle cx="225" cy="295" r="2" fill="#FFF" opacity="0.8" />
        <circle cx="215" cy="285" r="2" fill="#FFF" opacity="0.8" />
      </g>

      {/* Front Wheel Setup */}
      <g id="frontWheel">
        {/* Wheel Arch */}
        <path d="M 595 280 A 55 55 0 0 1 705 280" fill="none" stroke="#212121" strokeWidth="8" strokeLinecap="round" />
        {/* Tire */}
        <circle cx="650" cy="285" r="45" fill="url(#tireGrad)" />
        <circle cx="650" cy="285" r="32" fill="#121212" />
        {/* Rim */}
        <circle cx="650" cy="285" r="25" fill="url(#rimGrad)" stroke="#D97706" strokeWidth="1" />
        <circle cx="650" cy="285" r="14" fill="#212121" />
        {/* Lug Nuts / Center cap */}
        <circle cx="650" cy="285" r="7" fill="url(#rimGrad)" />
        <circle cx="650" cy="275" r="2" fill="#FFF" opacity="0.8" />
        <circle cx="660" cy="285" r="2" fill="#FFF" opacity="0.8" />
        <circle cx="650" cy="295" r="2" fill="#FFF" opacity="0.8" />
        <circle cx="640" cy="285" r="2" fill="#FFF" opacity="0.8" />
      </g>
    </svg>
                  {/* MOVEMENT DUST EFFECT */}
                  <div className="absolute bottom-5 left-1 -translate-x-1/2">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-1 w-1 rounded-full bg-slate-400/60 animate-ping"
                          style={{
                            animationDelay: `${i * 0.15}s`,
                            animationDuration: "1s",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* TRACKING STEPS */}
              <div className="absolute mt-4 -top-3 left-0 w-full -translate-y-1/2 flex justify-between px-0">
                {trackingSteps.map((step, index) => {
                  const completed = index <= activeStepIndex;
                  const active = index === activeStepIndex;
                  const StepIcon = step.icon;

                  return (
                    <div
                      key={step.id}
                      className="relative flex flex-col items-center"
                      style={{ width: `${100 / trackingSteps.length}%` }}
                    >
                      {/* CHECKPOINT DOT */}
                      <div
                        className={`relative h-6 w-6 sm:h-8 sm:w-8 rounded-full border-[3px] sm:border-[4px] transition-all duration-700 z-10 ${
                          completed
                            ? "bg-primary  border-primary shadow-lg shadow-primary/50 scale-110"
                            : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                        }`}
                      >
                        {completed && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                        )}

                        {/* PULSE EFFECT FOR ACTIVE */}
                        {active && (
                          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                        )}
                      </div>

                      {/* STEP LABEL */}
                      <div className="mt-3 sm:mt-6 lg:mt-8 w-[80px] sm:w-[110px] lg:w-[140px] text-center">
                        <div
  className={`inline-flex items-center justify-center gap-1 sm:gap-2 mb-1.5 sm:mb-2 ${
    completed
      ? "text-primary bg-white p-2 rounded-4xl"
      : "text-muted-foreground"
  }`}
>
                          <StepIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                        <p
                          className={`text-[10px] sm:text-xs lg:text-sm font-semibold leading-tight transition-colors duration-500 ${
                            completed
                              ? "text-slate-900 dark:text-slate-100"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.label}
                        </p>
                        {active && (
                          <Badge
                            variant="default"
                            className="mt-1.5 sm:mt-2 text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-primary"
                          >
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* STATUS CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mt-6 sm:mt-8 lg:mt-10">
            <StatusCard
              icon={<Truck className="w-4 h-4 sm:w-5 sm:h-5" />}
              label="Current Status"
              value={trackingSteps[activeStepIndex]?.label || "In Transit"}
              gradient="from-primary/10 to-blue-500/10"
              iconBg="bg-primary/10"
              iconColor="text-primary"
            />

            <StatusCard
              icon={<PackageCheck className="w-4 h-4 sm:w-5 sm:h-5" />}
              label="Tracking Number"
              value="#TRK102589"
              gradient="from-emerald-500/10 to-green-500/10"
              iconBg="bg-emerald-500/10"
              iconColor="text-emerald-600"
            />

            <StatusCard
              icon={<MapPin className="w-4 h-4 sm:w-5 sm:h-5" />}
              label="Destination"
              value="Nassau"
              gradient="from-orange-500/10 to-amber-500/10"
              iconBg="bg-orange-500/10"
              iconColor="text-orange-600"
            />

            <StatusCard
              icon={<CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />}
              label="Est. Delivery"
              value="22 May 2026"
              gradient="from-cyan-500/10 to-blue-500/10"
              iconBg="bg-cyan-500/10"
              iconColor="text-cyan-600"
            />
          </div>
        </CardContent>
      </Card>

      {/* ====================================================== */}
      {/* SHIPMENT DETAILS */}
      {/* ====================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="xl:col-span-3 space-y-4 sm:space-y-6">
          {/* SHIPMENT CARD */}
          <Card className="rounded-[28px] sm:rounded-[36px] border-0 shadow-xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
            <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-primary  flex items-center justify-center shadow-lg shadow-primary/30">
                    <Package className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>

                  <div>
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                      Shipment Information
                    </CardTitle>
                    <CardDescription className="mt-1 text-xs sm:text-sm">
                      Detailed shipment and logistics data
                    </CardDescription>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Badge className="rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm bg-primary">
                    {trackingSteps[activeStepIndex]?.label}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm border-2"
                  >
                    Express Delivery
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                <InfoCard
                  icon={<PackageCheck className="w-4 h-4 sm:w-5 sm:h-5" />}
                  title="Request Number"
                  value="SR-20260514155711"
                />
                <InfoCard
                  icon={<Truck className="w-4 h-4 sm:w-5 sm:h-5" />}
                  title="Supplier Tracking"
                  value="#215456"
                />
                <InfoCard
                  icon={<CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />}
                  title="Requested At"
                  value="14 May 2026"
                />
                <InfoCard
                  icon={<MapPin className="w-4 h-4 sm:w-5 sm:h-5" />}
                  title="Delivery Type"
                  value="Door Delivery"
                />
              </div>

              {/* ROUTE */}
              <div className="rounded-[24px] sm:rounded-[30px] border-2 bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-900/60 dark:to-slate-800/60 p-4 sm:p-6 lg:p-8 shadow-inner">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10">
                  <div className="text-center lg:text-left">
                    <p className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-2 sm:mb-3 font-semibold">
                      Origin
                    </p>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                      Miami Warehouse
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
                      United States
                    </p>
                  </div>

                  <div className="hidden lg:flex items-center justify-center flex-1 px-8">
                    <div className="relative w-full h-[4px] rounded-full bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 shadow-inner">
                      <div className="absolute inset-y-0 left-0 w-full bg-primary rounded-full animate-pulse" />
                      <div className="absolute left-1/2 -translate-x-1/2 -top-5">
                        <Navigation className="w-10 h-10 text-primary bg-white dark:bg-slate-900 rounded-full p-2 shadow-lg shadow-primary/30 animate-bounce" />
                      </div>
                    </div>
                  </div>

                  <div className="text-center lg:text-right">
                    <p className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-2 sm:mb-3 font-semibold">
                      Destination
                    </p>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                      Nassau Store
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
                      Bahamas
                    </p>
                  </div>
                </div>
              </div>

              {/* DOCUMENT */}
              <div className="rounded-[24px] sm:rounded-[28px] border-2 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900/60 dark:to-slate-800/60 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center">
                    <FileImage className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold">
                      Shipment Document
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      shipment-document.pdf
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="rounded-2xl border-2 hover:bg-primary hover:text-white transition-all duration-300 text-sm sm:text-base h-10 sm:h-11"
                  onClick={() => setPreviewOpen(true)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Document
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* CUSTOMER CARD */}
          <Card className="overflow-hidden rounded-[28px] sm:rounded-[36px] border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
            <div className="relative overflow-hidden border-b">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />

              <div className="relative p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-5">
                <div className="flex items-center gap-3 sm:gap-5">
                  <div className="h-14 w-14 sm:h-20 sm:w-20 rounded-2xl sm:rounded-3xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                    <User className="h-7 w-7 sm:h-10 sm:w-10 text-white" />
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                      {customerData.name}
                    </h2>
                    <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3 flex-wrap">
                      <Badge className="rounded-full px-2 sm:px-4 py-1 bg-gradient-to-r from-emerald-500 to-green-600 text-xs sm:text-sm">
                        Active Customer
                      </Badge>
                      <Badge
                        variant="outline"
                        className="rounded-full px-2 sm:px-4 py-1 border-2 text-xs sm:text-sm"
                      >
                        {customerData.customerId}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                <CustomerInfoCard
                  icon={<Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />}
                  title="Email Address"
                  value={customerData.email}
                  bg="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-500/10 dark:to-blue-500/5"
                />

                <CustomerInfoCard
                  icon={<Phone className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />}
                  title="Phone Number"
                  value={customerData.phone}
                  bg="bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-500/10 dark:to-emerald-500/5"
                />

                <CustomerInfoCard
                  icon={<MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />}
                  title="Shipping Address"
                  value={customerData.address}
                  bg="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-500/10 dark:to-orange-500/5"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ====================================================== */}
      {/* MODALS */}
      {/* ====================================================== */}

      {/* DOCUMENT MODAL */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-5xl rounded-3xl p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl">Shipment Document</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Preview shipment document
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            {renderDocumentPreview()}

            <div className="flex justify-end">
              <a
                href={shipmentData.document.url}
                download={shipmentData.document.fileName}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="rounded-2xl px-4 sm:px-6 h-10 sm:h-11">
                  <Download className="w-4 h-4 mr-2" />
                  Download Document
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* CALCULATOR MODAL */}
      {/* <Dialog open={calculatorOpen} onOpenChange={setCalculatorOpen}>
        <DialogContent className="w-[95vw] sm:w-[90vw] md:w-[800px] max-w-[800px] max-h-[90vh] overflow-hidden rounded-[28px] sm:rounded-[32px] border-0 bg-white dark:bg-slate-950 p-0">
          <div className="border-b px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-primary/10 to-transparent">
            <DialogHeader>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-white shadow-lg shadow-primary/30">
                  <Calculator className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>

                <div>
                  <DialogTitle className="text-xl sm:text-2xl font-bold">
                    Shipment Calculator
                  </DialogTitle>
                  <DialogDescription className="mt-1 sm:mt-2 text-xs sm:text-sm">
                    Calculate shipment pricing dynamically
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
          </div>

          <div className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
            <Tabs defaultValue="basic" className="space-y-4 sm:space-y-6">
              <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-slate-100 dark:bg-slate-900 p-1">
                <TabsTrigger value="basic" className="rounded-xl text-xs sm:text-sm">
                  Basic Details
                </TabsTrigger>
                <TabsTrigger value="advanced" className="rounded-xl text-xs sm:text-sm">
                  Advanced Charges
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 sm:space-y-6">
                <Card className="rounded-2xl sm:rounded-3xl border-2">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">Package Details</CardTitle>
                  </CardHeader>

                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 p-4 sm:p-6 pt-0">
                    <Input
                      type="number"
                      value={form.actual_weight_lb}
                      onChange={(e) =>
                        updateField("actual_weight_lb", Number(e.target.value))
                      }
                      className="h-10 sm:h-12 rounded-2xl text-sm sm:text-base"
                      placeholder="Weight (lb)"
                    />

                    <Input
                      type="number"
                      value={form.length_cm}
                      onChange={(e) => updateField("length_cm", Number(e.target.value))}
                      className="h-10 sm:h-12 rounded-2xl text-sm sm:text-base"
                      placeholder="Length (cm)"
                    />

                    <Input
                      type="number"
                      value={form.width_cm}
                      onChange={(e) => updateField("width_cm", Number(e.target.value))}
                      className="h-10 sm:h-12 rounded-2xl text-sm sm:text-base"
                      placeholder="Width (cm)"
                    />

                    <Input
                      type="number"
                      value={form.height_cm}
                      onChange={(e) => updateField("height_cm", Number(e.target.value))}
                      className="h-10 sm:h-12 rounded-2xl text-sm sm:text-base"
                      placeholder="Height (cm)"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4 sm:space-y-6">
                <Card className="rounded-2xl sm:rounded-3xl border-2">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg">
                      Additional Charges
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 p-4 sm:p-6 pt-0">
                    <Input
                      type="number"
                      value={form.declared_value}
                      onChange={(e) =>
                        updateField("declared_value", Number(e.target.value))
                      }
                      className="h-10 sm:h-12 rounded-2xl text-sm sm:text-base"
                      placeholder="Declared Value ($)"
                    />

                    <Input
                      type="number"
                      value={form.tax_percentage}
                      onChange={(e) =>
                        updateField("tax_percentage", Number(e.target.value))
                      }
                      className="h-10 sm:h-12 rounded-2xl text-sm sm:text-base"
                      placeholder="Tax (%)"
                    />

                    <Textarea
                      rows={4}
                      value={form.remarks}
                      onChange={(e) => updateField("remarks", e.target.value)}
                      className="rounded-2xl sm:col-span-2 text-sm sm:text-base"
                      placeholder="Remarks / Notes"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="rounded-2xl sm:rounded-3xl border-0 bg-gradient-to-br from-primary via-blue-600 to-cyan-600 text-white shadow-2xl shadow-primary/50">
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                <div className="flex items-center justify-between text-sm sm:text-base">
                  <span className="opacity-90">Shipping Cost</span>
                  <span className="text-lg sm:text-xl font-bold">
                    ${calculations.shippingCost}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm sm:text-base">
                  <span className="opacity-90">Tax Amount</span>
                  <span className="text-lg sm:text-xl font-bold">
                    ${calculations.taxAmount}
                  </span>
                </div>

                <div className="border-t border-white/20 pt-4 sm:pt-5 flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-xs sm:text-sm">
                      Final Shipment Price
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-1">
                      ${calculations.finalAmount}
                    </h2>
                  </div>

                  <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-white/10 flex items-center justify-center">
                    <BadgeDollarSign className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                </div>

                <Button
                  onClick={handleCalculateShipment}
                  className="h-11 sm:h-12 w-full rounded-2xl bg-white text-primary hover:bg-white/90 font-semibold shadow-lg text-sm sm:text-base"
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Save Calculation
                </Button>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog> */}

      {/* STANDBY MODAL */}
      {/* <Dialog open={standbyOpen} onOpenChange={setStandbyOpen}>
        <DialogContent className="w-[95vw] sm:max-w-lg rounded-2xl sm:rounded-3xl border-0 p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 sm:p-6 text-white">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white/15 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <div>
                <DialogTitle className="text-xl sm:text-2xl font-bold">
                  Put Shipment on Standby
                </DialogTitle>
                <DialogDescription className="text-amber-50 mt-1 sm:mt-2 text-xs sm:text-sm">
                  Provide a reason for standby shipment
                </DialogDescription>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            <Textarea
              value={standbyReason}
              onChange={(e) => setStandbyReason(e.target.value)}
              placeholder="Write reason for standby..."
              className="min-h-[120px] sm:min-h-[140px] rounded-2xl text-sm sm:text-base"
            />

            <div className="flex justify-end gap-2 sm:gap-3">
              <Button
                variant="outline"
                className="rounded-xl border-2 text-sm sm:text-base h-10 sm:h-11"
                onClick={() => setStandbyOpen(false)}
              >
                Cancel
              </Button>

              <Button className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30 text-sm sm:text-base h-10 sm:h-11">
                <PauseCircle className="w-4 h-4 mr-2" />
                Send Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog> */}

      {/* CSS ANIMATIONS */}
      <style>{`
        @keyframes expandWidth {
          from {
            width: 0%;
          }
          to {
            width: ${truckPosition};
          }
        }

        @keyframes moveTruck {
          from {
            left: 0%;
          }
          to {
            left: ${truckPosition};
          }
        }
      `}</style>
    </div>
  );
}

/* ====================================================== */
/* STATUS CARD COMPONENT */
/* ====================================================== */

const StatusCard = ({
  icon,
  label,
  value,
  gradient,
  iconBg,
  iconColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
}) => {
  return (
    <div
      className={`rounded-2xl sm:rounded-3xl border-2 bg-gradient-to-br ${gradient} p-3 sm:p-5 hover:shadow-lg hover:scale-105 transition-all duration-300`}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${iconBg} flex items-center justify-center ${iconColor}`}
        >
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-xs uppercase tracking-wide text-muted-foreground font-semibold">
            {label}
          </p>
          <h3 className="font-bold mt-0.5 sm:mt-1 text-xs sm:text-sm lg:text-base truncate">
            {value}
          </h3>
        </div>
      </div>
    </div>
  );
};

/* ====================================================== */
/* INFO CARD COMPONENT */
/* ====================================================== */

const InfoCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) => {
  return (
    <div className="rounded-2xl sm:rounded-3xl border-2 p-3 sm:p-5 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/60 dark:to-slate-800/60 hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center text-primary">
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-xs uppercase tracking-wide text-muted-foreground font-semibold">
            {title}
          </p>
          <h3 className="font-bold mt-0.5 sm:mt-1 text-xs sm:text-sm truncate">{value}</h3>
        </div>
      </div>
    </div>
  );
};

/* ====================================================== */
/* CUSTOMER INFO CARD COMPONENT */
/* ====================================================== */

const CustomerInfoCard = ({
  icon,
  title,
  value,
  bg,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  bg: string;
}) => {
  return (
    <div className="rounded-2xl sm:rounded-3xl border-2 p-3 sm:p-5 bg-white dark:bg-slate-900/60 hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl flex items-center justify-center ${bg} flex-shrink-0`}
        >
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-xs uppercase tracking-wide text-muted-foreground mb-1 sm:mb-2 font-semibold">
            {title}
          </p>
          <p className="font-semibold text-xs sm:text-sm leading-relaxed break-words">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};