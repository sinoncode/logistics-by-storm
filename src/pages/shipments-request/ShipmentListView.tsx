import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  PackageCheck,
  Truck,
  CalendarDays,
  BadgeDollarSign,
  FileImage,
  User,
  Mail,
  Phone,
  MapPin,
  StickyNote,
} from "lucide-react";

export default function ShipmentRequestPage() {
  const [previewOpen, setPreviewOpen] = useState(false);

  const shipmentData = {
    trackingNo: "#TRK102589",
    supplier: "Global Trade Supplier Ltd.",
    date: "08 May 2026",
    commodity: "Electronic Accessories",
    price: "$2,450",
    upload:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
    note: `Handle with care. These packages contain fragile electronic items. Avoid water exposure and ensure safe transportation during delivery.`,
  };

  const customerData = {
    customerId: "#CUS1025",
    name: "Kathryn Murphy",
    email: "kathryn@gmail.com",
    phone: "+91 9876543210",
    address: "A-302, Sector 62, Noida, Uttar Pradesh, India - 201309",
  };

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
      className={`group border border-neutral-200 dark:border-slate-700 rounded-2xl p-5 bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/40 ${className}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>

        <p className="text-sm font-medium text-muted-foreground">{label}</p>
      </div>

      <div className="text-[15px] font-semibold text-slate-800 dark:text-white leading-6">
        {value}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Page Heading */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Shipment Request
          </h1>

          {/* <p className="text-muted-foreground mt-1">
            Complete shipment and customer request details
          </p> */}
        </div>

        <Button className="rounded-xl px-5">Shipment Calculation</Button>
      </div>

      {/* Shipment Information Card */}
      <Card className="rounded-3xl border border-neutral-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="border-b border-neutral-200 dark:border-slate-800 px-6 py-5  from-primary/5 to-transparent">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            Shipment Information
          </h2>
        </div>

        <CardContent className="p-6 space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FieldCard
              icon={<PackageCheck className="w-4 h-4" />}
              label="Tracking No."
              value={shipmentData.trackingNo}
            />

            <FieldCard
              icon={<Truck className="w-4 h-4" />}
              label="Stores / Suppliers"
              value={shipmentData.supplier}
            />

            <FieldCard
              icon={<CalendarDays className="w-4 h-4" />}
              label="Date"
              value={shipmentData.date}
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FieldCard
              icon={<PackageCheck className="w-4 h-4" />}
              label="Commodity"
              value={shipmentData.commodity}
            />

            <FieldCard
              icon={<BadgeDollarSign className="w-4 h-4" />}
              label="Price"
              value={shipmentData.price}
            />

            {/* <FieldCard
              icon={<FileImage className="w-4 h-4" />}
              label="Uploads"
              value={
                <div className="flex">
                  <img
                    src={shipmentData.upload}
                    alt="Shipment"
                    onClick={() => setPreviewOpen(true)}
                    className="w-12 h-12 rounded-xl object-cover cursor-pointer border border-neutral-200 hover:scale-105 transition-all duration-300"
                  />

                  <p className="text-xs text-muted-foreground mt-2">
                    Click image to preview
                  </p>
                </div>
              }
            /> */}

            <div className="border rounded-xl flex flex-col items-center justify-center">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setPreviewOpen(true)}
                className="h-auto px-4 py-3 flex items-center gap-2 rounded-xl hover:bg-primary/5"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileImage className="w-6 h-6 text-primary" />
                </div>

                <span className="text-[16px] font-medium text-slate-900 dark:text-white">
                  View Document
                </span>
              </Button>
              <p className="text-xs text-muted-foreground">
                    Click image to preview
                  </p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1">
            <FieldCard
              icon={<StickyNote className="w-4 h-4" />}
              label="Note for Packages"
              value={
                <div className="min-h-[80px] whitespace-pre-line text-[15px] leading-7">
                  {shipmentData.note}
                </div>
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Customer Information Card */}
      <Card className="rounded-3xl border border-neutral-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="border-b border-neutral-200 dark:border-slate-800 px-6 py-5  from-primary/5 to-transparent">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Customer Information
          </h2>
        </div>

        <CardContent className="p-6 space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FieldCard
              icon={<User className="w-4 h-4" />}
              label="Customer Id"
              value={customerData.customerId}
            />

            <FieldCard
              icon={<User className="w-4 h-4" />}
              label="Name"
              value={customerData.name}
            />

            <FieldCard
              icon={<Mail className="w-4 h-4" />}
              label="Email"
              value={customerData.email}
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FieldCard
              icon={<Phone className="w-4 h-4" />}
              label="Phone No."
              value={customerData.phone}
            />

            <FieldCard
              icon={<MapPin className="w-4 h-4" />}
              label="Shipping Address"
              value={customerData.address}
              className="md:col-span-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Image Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl rounded-3xl p-6">
          <div className="space-y-5">
            <img
              src={shipmentData.upload}
              alt="Preview"
              className="w-full max-h-[70vh] object-cover rounded-2xl border border-neutral-200"
            />

            <div className="flex justify-end">
              <a
                href={shipmentData.upload}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="rounded-xl px-6">Download File</Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
