import { useState } from "react";

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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

import {
  BadgeDollarSign,
  Box,
  Calculator,
  ShieldCheck,
  Truck,
  Weight,
  Ruler,
} from "lucide-react";

import { calculateShipmentCharge } from "@/services/shipment.service";

import type {
  CalculationResult,
  ShipmentCalculationResponse,
} from "@/types/shipment";

type Props = {
  open: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  shipmentId?: string;

  shipment: any;

  onCalculationComplete?: (
    data: CalculationResult
  ) => void;
};

export default function ShipmentCalculationModal({
  open,
  onOpenChange,
  shipmentId,
  shipment,
  onCalculationComplete,
}: Props) {

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

  const [form, setForm] = useState({
    actual_weight_lb: 12,

    length_cm: 40,

    width_cm: 30,

    height_cm: 25,

    declared_value: 120,

    manual_extra_charge: 0,

    discount_amount: 0,

    tax_percentage: 18,

    remarks: "",

    item_type: "electronics",

    delivery_type: "express",
  });

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

  // ======================================================
  // HANDLE CALCULATION
  // ======================================================

  const handleCalculateShipment =
    async () => {

      if (!shipmentId) return;

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
            shipmentRequestId:
              shipmentId,

            payload,
          });

        setCalculationResponse(
          response
        );

        const result = {
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
        };

        onCalculationComplete?.(
          result
        );

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
  // JSX
  // ======================================================

  return (
    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <DialogContent className="w-[800px] max-w-[800px] h-[90vh] overflow-hidden rounded-[32px] border-0 bg-white p-0 shadow-[0_20px_80px_rgba(0,0,0,0.12)] dark:bg-slate-950">

        {/* HEADER */}

        <div className="border-b border-slate-200/70 bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-5">

          <DialogHeader>
            <div className="flex items-start gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">

                <Calculator className="h-7 w-7" />

              </div>

              <div>

                <DialogTitle className="text-2xl font-bold text-white">

                  Shipment Calculator

                </DialogTitle>

                <DialogDescription className="mt-1 text-white/80">

                  Calculate shipment charges dynamically.

                </DialogDescription>

              </div>

            </div>
          </DialogHeader>
        </div>

        {/* BODY */}

        <div className="h-[calc(90vh-110px)] overflow-y-auto px-6 pb-24 pt-6">

          <Tabs
            defaultValue="basic"
            className="space-y-6"
          >

            {/* TABS */}

            <TabsList className="grid w-full grid-cols-2 rounded-2xl bg-slate-100 p-1">

              <TabsTrigger
                value="basic"
                className="rounded-xl"
              >
                Basic Details
              </TabsTrigger>

              <TabsTrigger
                value="advanced"
                className="rounded-xl"
              >
                Advanced Charges
              </TabsTrigger>

            </TabsList>

            {/* BASIC */}

            <TabsContent
              value="basic"
              className="space-y-6"
            >

              <Card className="rounded-3xl">

                <CardHeader>

                  <CardTitle className="flex items-center gap-2 text-lg">

                    <Box className="h-5 w-5 text-primary" />

                    Package Dimensions

                  </CardTitle>

                  <CardDescription>

                    Enter package dimensions and actual weight.

                  </CardDescription>

                </CardHeader>

                <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  {/* WEIGHT */}

                  <div className="space-y-2">

                    <Label>
                      Actual Weight (LB)
                    </Label>

                    <div className="relative">

                      <Weight className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />

                      <Input
                        type="number"
                        value={
                          form.actual_weight_lb
                        }
                        onChange={(e) =>
                          updateField(
                            "actual_weight_lb",
                            Number(
                              e.target.value
                            )
                          )
                        }
                        className="h-12 rounded-2xl pl-10"
                      />

                    </div>
                  </div>

                  {/* LENGTH */}

                  <div className="space-y-2">

                    <Label>
                      Length (CM)
                    </Label>

                    <div className="relative">

                      <Ruler className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />

                      <Input
                        type="number"
                        value={
                          form.length_cm
                        }
                        onChange={(e) =>
                          updateField(
                            "length_cm",
                            Number(
                              e.target.value
                            )
                          )
                        }
                        className="h-12 rounded-2xl pl-10"
                      />

                    </div>
                  </div>

                  {/* WIDTH */}

                  <div className="space-y-2">

                    <Label>
                      Width (CM)
                    </Label>

                    <Input
                      type="number"
                      value={
                        form.width_cm
                      }
                      onChange={(e) =>
                        updateField(
                          "width_cm",
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="h-12 rounded-2xl"
                    />

                  </div>

                  {/* HEIGHT */}

                  <div className="space-y-2">

                    <Label>
                      Height (CM)
                    </Label>

                    <Input
                      type="number"
                      value={
                        form.height_cm
                      }
                      onChange={(e) =>
                        updateField(
                          "height_cm",
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="h-12 rounded-2xl"
                    />

                  </div>

                </CardContent>

              </Card>

              {/* SHIPMENT PREFERENCES */}

              <Card className="rounded-3xl">

                <CardHeader>

                  <CardTitle className="flex items-center gap-2 text-lg">

                    <Truck className="h-5 w-5 text-primary" />

                    Shipment Preferences

                  </CardTitle>

                </CardHeader>

                <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  {/* ITEM TYPE */}

                  <div className="space-y-2">

                    <Label>
                      Item Type
                    </Label>

                    <Select
                      value={
                        form.item_type
                      }
                      onValueChange={(
                        value
                      ) =>
                        updateField(
                          "item_type",
                          value
                        )
                      }
                    >

                      <SelectTrigger className="h-12 rounded-2xl">

                        <SelectValue />

                      </SelectTrigger>

                      <SelectContent>

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

                  {/* DELIVERY TYPE */}

                  <div className="space-y-2">

                    <Label>
                      Delivery Preference
                    </Label>

                    <Select
                      value={
                        form.delivery_type
                      }
                      onValueChange={(
                        value
                      ) =>
                        updateField(
                          "delivery_type",
                          value
                        )
                      }
                    >

                      <SelectTrigger className="h-12 rounded-2xl">

                        <SelectValue />

                      </SelectTrigger>

                      <SelectContent>

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

            {/* ADVANCED */}

            <TabsContent
              value="advanced"
              className="space-y-6"
            >

              <Card className="rounded-3xl">

                <CardHeader>

                  <CardTitle className="flex items-center gap-2 text-lg">

                    <ShieldCheck className="h-5 w-5 text-primary" />

                    Advanced Charges

                  </CardTitle>

                </CardHeader>

                <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  <div className="space-y-2">

                    <Label>
                      Declared Value
                    </Label>

                    <Input
                      type="number"
                      value={
                        form.declared_value
                      }
                      onChange={(e) =>
                        updateField(
                          "declared_value",
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="h-12 rounded-2xl"
                    />

                  </div>

                  <div className="space-y-2">

                    <Label>
                      Tax Percentage
                    </Label>

                    <Input
                      type="number"
                      value={
                        form.tax_percentage
                      }
                      onChange={(e) =>
                        updateField(
                          "tax_percentage",
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="h-12 rounded-2xl"
                    />

                  </div>

                  <div className="space-y-2">

                    <Label>
                      Discount Amount
                    </Label>

                    <Input
                      type="number"
                      value={
                        form.discount_amount
                      }
                      onChange={(e) =>
                        updateField(
                          "discount_amount",
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="h-12 rounded-2xl"
                    />

                  </div>

                  <div className="space-y-2">

                    <Label>
                      Extra Charges
                    </Label>

                    <Input
                      type="number"
                      value={
                        form.manual_extra_charge
                      }
                      onChange={(e) =>
                        updateField(
                          "manual_extra_charge",
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="h-12 rounded-2xl"
                    />

                  </div>

                  <div className="space-y-2 sm:col-span-2">

                    <Label>
                      Remarks
                    </Label>

                    <Textarea
                      rows={4}
                      value={
                        form.remarks
                      }
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

          <Card className="mt-6 rounded-3xl border-0 bg-gradient-to-r from-green-600 to-emerald-700 text-white">

            <CardContent className="space-y-5 p-6">

              <div className="flex items-center justify-between">

                <span>
                  Shipping Cost
                </span>

                <span className="text-lg font-semibold">

                  $
                  {calculationResponse
                    ?.data
                    ?.shipping_cost ||
                    "0.00"}

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span>
                  Tax Amount
                </span>

                <span className="text-lg font-semibold">

                  $
                  {calculationResponse
                    ?.data
                    ?.tax_amount ||
                    "0.00"}

                </span>

              </div>

              <div className="border-t border-white/20 pt-5">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-lg font-bold">

                      Final Shipment Price

                    </p>

                    <h3 className="text-3xl font-bold">

                      $
                      {calculationResponse
                        ?.data
                        ?.final_amount ||
                        "0.00"}

                    </h3>

                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">

                    <BadgeDollarSign className="h-8 w-8" />

                  </div>

                </div>

              </div>

              <Button
                onClick={
                  handleCalculateShipment
                }
                disabled={
                  calculationLoading
                }
                className="h-12 w-full rounded-2xl bg-white text-black hover:bg-white/90"
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
  );
}