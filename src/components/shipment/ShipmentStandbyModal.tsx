// ======================================================
// IMPORTS
// ======================================================

import { useState } from "react";

import {
  AlertTriangle,
  PauseCircle,
} from "lucide-react";

import { toast } from "react-toastify";

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

import {
  updateShipmentBookingStatus,
} from "@/services/shipment.service";

// ======================================================
// TYPES
// ======================================================

type Props = {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  shipmentId?: string;

  onSuccess?: () => void;
};

// ======================================================
// COMPONENT
// ======================================================

export default function ShipmentStandbyModal({
  open,
  onOpenChange,
  shipmentId,
  onSuccess,
}: Props) {

  // ======================================================
  // STATES
  // ======================================================

  const [standbyReason, setStandbyReason] =
    useState("");

  const [
    standbyLoading,
    setStandbyLoading,
  ] = useState(false);

  // ======================================================
  // HANDLE STANDBY
  // ======================================================

  const handleStandbyShipment =
    async () => {

      if (!shipmentId) {

        toast.error(
          "Shipment ID is missing"
        );

        return;
      }

      if (!standbyReason.trim()) {

        toast.error(
          "Please enter standby reason"
        );

        return;
      }

      try {

        setStandbyLoading(true);

        await updateShipmentBookingStatus({
          shipmentRequestId:
            shipmentId,

          payload: {
            booking_status:
              "standby",

            admin_remarks:
              standbyReason,
          },
        });

        toast.success(
          "Shipment moved to standby successfully"
        );

        setStandbyReason("");

        onOpenChange(false);

        onSuccess?.();

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to update shipment status"
        );

      } finally {

        setStandbyLoading(false);

      }
    };

  // ======================================================
  // JSX
  // ======================================================

  return (
    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >

      <DialogContent className="overflow-hidden rounded-[32px] border-0 p-0 shadow-[0_20px_80px_rgba(0,0,0,0.15)] sm:max-w-xl">

        {/* HEADER */}

        <div className="relative overflow-hidden bg-gradient-to-r from-yellow-500 to-amber-500 px-6 py-6 text-white">

          <div className="absolute inset-0 bg-black/5" />

          <DialogHeader className="relative">

            <div className="flex items-start gap-4">

              {/* ICON */}

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur">

                <AlertTriangle className="h-7 w-7" />

              </div>

              {/* TEXT */}

              <div>

                <DialogTitle className="text-2xl font-bold tracking-tight">

                  Put Shipment on Standby

                </DialogTitle>

                <DialogDescription className="mt-2 text-sm leading-6 text-yellow-50">

                  Provide a reason for putting this shipment
                  on standby. This action may temporarily
                  pause shipment processing until reviewed
                  by operations.

                </DialogDescription>

              </div>

            </div>

          </DialogHeader>

        </div>

        {/* BODY */}

        <div className="space-y-6 p-6">

          {/* REASON */}

          <div className="space-y-3">

            <Label className="text-sm font-semibold">

              Standby Reason

            </Label>

            <div className="relative">

              <Textarea
                value={
                  standbyReason
                }
                onChange={(e) =>
                  setStandbyReason(
                    e.target.value
                  )
                }
                placeholder="Write the reason for standby shipment..."
                className="min-h-[160px] resize-none rounded-2xl border-slate-200 text-[15px] leading-7 shadow-sm focus-visible:ring-2 focus-visible:ring-yellow-500 dark:border-slate-700"
              />

              <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">

                {
                  standbyReason.length
                }
                /500

              </div>

            </div>

          </div>

          {/* WARNING */}

          <div className="flex items-start gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-4">

            <div className="mt-0.5">

              <AlertTriangle className="h-5 w-5 text-yellow-600" />

            </div>

            <div>

              <p className="text-sm font-semibold text-yellow-800">

                Shipment Status Warning

              </p>

              <p className="mt-1 text-sm leading-6 text-yellow-700">

                Once marked as standby, shipment processing
                may pause until reviewed by operations.

              </p>

            </div>

          </div>

          {/* FOOTER */}

          <div className="flex items-center justify-end gap-3 pt-2">

            {/* CANCEL */}

            <Button
              variant="outline"
              onClick={() =>
                onOpenChange(
                  false
                )
              }
              disabled={
                standbyLoading
              }
              className="h-11 rounded-xl px-5"
            >

              Cancel

            </Button>

            {/* SUBMIT */}

            <Button
              onClick={
                handleStandbyShipment
              }
              disabled={
                !standbyReason.trim() ||
                standbyLoading
              }
              className="h-11 rounded-xl bg-yellow-500 px-6 text-white shadow-sm hover:bg-yellow-600"
            >

              <PauseCircle className="mr-2 h-4 w-4" />

              {standbyLoading
                ? "Sending Request..."
                : "Send Standby Request"}

            </Button>

          </div>

        </div>

      </DialogContent>

    </Dialog>
  );
}