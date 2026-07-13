// ======================================================
// IMPORTS
// ======================================================

import {
  useEffect,
  useState,
} from "react";

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
  BadgeDollarSign,
  Box,
  Calculator,
  Package,
  Ruler,
  ShieldCheck,
  Truck,
  Weight,
} from "lucide-react";

import { toast } from "react-toastify";

import { calculateShipmentCharge } from "@/services/shipment.service";

import type {
  CalculationResult,
  ShipmentCalculationResponse,
} from "@/types/shipment";

// ======================================================
// TYPES
// ======================================================

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

// ======================================================
// COMPONENT
// ======================================================

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

    // ======================================================
// ITEM CALCULATION SUMMARY
// ======================================================

type ItemCalculationSummary = {
  id: number;

  commodity: string;

  price: number;

  actualWeight: number;
};

const [
  itemCalculationSummary,
  setItemCalculationSummary,
] = useState<ItemCalculationSummary[]>(
  []
);

  // ======================================================
  // ITEM FORMS
  // ======================================================
type ItemForm = {
  id: number;

  actual_weight_lb: number;

  length_cm: number;

  width_cm: number;

  height_cm: number;

  declared_value: number;

  tariff_code: string;
};

  const [itemForms, setItemForms] =
  useState<ItemForm[]>([]);

  // ======================================================
  // GLOBAL FORM
  // ======================================================

  const [globalForm, setGlobalForm] =
    useState({
      manual_extra_charge: 0,

      discount_amount: 0,

      tax_percentage: 10,

      remarks: "",
    });

  // ======================================================
  // INITIALIZE ITEM FORMS
  // ======================================================

  useEffect(() => {
    if (shipment?.items?.length) {

      const forms =
        shipment.items.map(
          (item: any) => ({
            id: item.id,

            actual_weight_lb: 0,

            length_cm: 0,

            width_cm: 0,

            height_cm: 0,

            declared_value:
              item.price || 0,

            tariff_code:
              item?.commodity_type?.match(
                /\(tariff code:\s*([^)]+)\)/i
              )?.[1] || "",
          })
        );

      setItemForms(forms);
    }
  }, [shipment]);

  // ======================================================
  // HELPERS
  // ======================================================

  const updateItemField = (
    index: number,
    key: string,
    value: string | number
  ) => {
    setItemForms((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [key]: value,
            }
          : item
      )
    );
  };

  const updateGlobalField = (
    key: string,
    value: string | number
  ) => {
    setGlobalForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ======================================================
  // CALCULATE SHIPMENT
  // ======================================================

  const handleCalculateShipment =
    async () => {

      if (!shipmentId) return;

      try {
        setCalculationLoading(true);


        const incompleteItem =
  itemForms.find(
    (item, index) =>
      !item.actual_weight_lb ||
      !item.length_cm ||
      !item.width_cm ||
      !item.height_cm ||
      !item.declared_value
  );

if (incompleteItem) {

  const itemIndex =
    itemForms.findIndex(
      (item) =>
        item.id === incompleteItem.id
    );

  toast.error(
    `Please complete calculation details for Item ${
      itemIndex + 1
    }`
  );

  setCalculationLoading(false);

  return;
}

        const payload = {
          items: itemForms.map(
            (item) => ({
              id: item.id,

              actual_weight_lb:
                item.actual_weight_lb,

              length_cm:
                item.length_cm,

              width_cm:
                item.width_cm,

              height_cm:
                item.height_cm,

              declared_value:
                item.declared_value,

              tariff_code:
                item.tariff_code,
            })
          ),

          manual_extra_charge:
            globalForm.manual_extra_charge,

          discount_amount:
            globalForm.discount_amount,

          tax_percentage:
            globalForm.tax_percentage,

          remarks:
            globalForm.remarks,
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

        const itemSummary =
  shipment?.items?.map(
    (
      shipmentItem: any,
      index: number
    ) => {

      const currentForm =
        itemForms[index];

      return {
        id: shipmentItem.id,

        commodity:
          shipmentItem?.commodity_type?.split(
            " ("
          )[0],

        price:
          currentForm.declared_value,

        actualWeight:
          currentForm.actual_weight_lb,
      };
    }
  );

setItemCalculationSummary(
  itemSummary
);

      const summaries = shipment.items.map(
  (item: any, index: number) => ({
    id: item.id,

    commodity:
      item?.commodity_type?.split(" (")[0] ||
      "--",

    actualWeight:
      itemForms[index]?.actual_weight_lb || 0,

    volumetricWeight:
      (
        (itemForms[index]?.length_cm || 0) *
        (itemForms[index]?.width_cm || 0) *
        (itemForms[index]?.height_cm || 0)
      ) / 139,

    deliveryType:
      shipment?.delivery_type || "--",

    dimensions: `${
      itemForms[index]?.length_cm || 0
    } × ${
      itemForms[index]?.width_cm || 0
    } × ${
      itemForms[index]?.height_cm || 0
    }`,

    declaredValue:
      itemForms[index]?.declared_value || 0,

    commodityType:
      item?.commodity_type?.split(" (")[0] ||
      "--",
  })
);

onCalculationComplete?.({
  items: summaries,

  finalPrice:
    response?.data?.final_amount || 0,

  shippingCost:
    response?.data?.shipping_cost || 0,

  taxAmount:
    response?.data?.tax_amount || 0,
});

        toast.success(
          "Shipment calculation completed successfully"
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to calculate shipment charges"
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
      <DialogContent className="h-[100vh] max-w-[1400px] overflow-hidden rounded-[36px] border-0 bg-white p-0 shadow-[0_25px_120px_rgba(0,0,0,0.18)] dark:bg-slate-950">

        {/* HEADER */}

        <div className="border-b bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-6 text-white">

          <DialogHeader>

            <div className="flex items-start gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">

                <Calculator className="h-8 w-8" />

              </div>

              <div>

                <DialogTitle className="text-3xl font-bold">

                  Shipment Calculator

                </DialogTitle>

                <DialogDescription className="mt-2 text-white/80">

                  Calculate shipment pricing dynamically
                  for all shipment items.

                </DialogDescription>

              </div>

            </div>

          </DialogHeader>

        </div>

        {/* BODY */}

        <div className="h-[calc(95vh-120px)] overflow-y-auto px-8 py-6">

          <Tabs
  defaultValue={
    shipment?.items?.length
      ? `item-${shipment.items[0].id}`
      : ""
  }
            className="space-y-6"
          >

            {/* TABS */}

            <TabsList className="flex h-auto w-full gap-3 overflow-x-auto rounded-3xl bg-slate-100 p-3 dark:bg-slate-900">

              {shipment?.items?.map(
                (
                  item: any,
                  index: number
                ) => (
                  <TabsTrigger
                    key={item.id}
                    value={`item-${item.id}`}
                    className="min-w-fit rounded-2xl px-6 py-3"
                  >
                    Item {index + 1}
                  </TabsTrigger>
                )
              )}

            </TabsList>

            {/* ITEM TABS */}

            {shipment?.items?.map(
              (
                item: any,
                index: number
              ) => {

                const currentForm =
                  itemForms[index];

                const tariffCode =
                  item?.commodity_type?.match(
                    /\(tariff code:\s*([^)]+)\)/i
                  )?.[1] || "--";

                const commodityName =
                  item?.commodity_type?.split(
                    " ("
                  )[0] || "--";

                return (
                  <TabsContent
                    key={item.id}
                    value={`item-${item.id}`}
                    className="space-y-6"
                  >

                    {/* ITEM INFO */}

                    <Card className="rounded-3xl border-0 shadow-sm">

                      <CardHeader>

                        <CardTitle className="flex items-center gap-2">

                          <Package className="h-5 w-5 text-primary" />

                          Item Information

                        </CardTitle>

                        <CardDescription>

                          Shipment item details and pricing information.

                        </CardDescription>

                      </CardHeader>

                      <CardContent>

                        <div className="">

                          {/* COMMODITY */}

                          <div className="rounded-2xl border bg-slate-50 p-5 dark:bg-slate-900">

                            <p className="text-sm text-muted-foreground">
                              Commodity
                            </p>

                            <h3 className="mt-2 text-lg font-semibold">
                              {commodityName}
                            </h3>

                          </div>

                          {/* TARIFF */}

                          <div className="rounded-2xl border bg-slate-50 p-5 dark:bg-slate-900 my-2">

                            <p className="text-sm text-muted-foreground">
                              Tariff Code
                            </p>

                            <h3 className="mt-2 text-lg font-semibold">
                              {tariffCode}
                            </h3>

                          </div>

                          {/* PRICE */}

                          <div className="rounded-2xl border bg-slate-50 p-5 dark:bg-slate-900">

                            <p className="text-sm text-muted-foreground">
                              Item Price
                            </p>

                            <h3 className="mt-2 text-2xl font-bold text-primary">
                              ${item?.price || 0}
                            </h3>

                          </div>

                        </div>

                      </CardContent>

                    </Card>

                    {/* PACKAGE DIMENSIONS */}

                    <Card className="rounded-3xl border-0 shadow-sm">

                      <CardHeader>

                        <CardTitle className="flex items-center gap-2">

                          <Box className="h-5 w-5 text-primary" />

                          Package Dimensions

                        </CardTitle>

                        <CardDescription>

                          Enter package dimensions and weight details.

                        </CardDescription>

                      </CardHeader>

                      <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2">

                        {/* WEIGHT */}

                      

                        {/* LENGTH */}

                        <FieldInput
                          label="Length (CM)"
                          icon={
                            <Ruler className="h-4 w-4" />
                          }
                          value={
                            currentForm?.length_cm
                          }
                          onChange={(value) =>
                            updateItemField(
                              index,
                              "length_cm",
                              value
                            )
                          }
                        />

                        {/* WIDTH */}

                        <FieldInput
                          label="Width (CM)"
                          value={
                            currentForm?.width_cm
                          }
                          onChange={(value) =>
                            updateItemField(
                              index,
                              "width_cm",
                              value
                            )
                          }
                        />

                        {/* HEIGHT */}

                        <FieldInput
                          label="Height (CM)"
                          value={
                            currentForm?.height_cm
                          }
                          onChange={(value) =>
                            updateItemField(
                              index,
                              "height_cm",
                              value
                            )
                          }
                        />

                        {/* DECLARED VALUE */}

                        <FieldInput
                          label="Declared Value"
                          value={
                            currentForm?.declared_value
                          } 
                          readOnly
                          
                          onChange={(value) =>
                            updateItemField(
                              index,
                              "declared_value",
                              value
                            )
                          }
                        />
                          <FieldInput
                          label="Actual Weight (LB)"
                          icon={
                            <Weight className="h-4 w-4" />
                          }
                          value={
                            currentForm?.actual_weight_lb
                          }
                          onChange={(value) =>
                            updateItemField(
                              index,
                              "actual_weight_lb",
                              value
                            )
                          }
                        />

                      </CardContent>

                    </Card>

                  </TabsContent>
                );
              }
            )}

          </Tabs>

          {/* GLOBAL SETTINGS */}

          <Card className="mt-6 rounded-3xl border-0 shadow-sm">

            <CardHeader>

              <CardTitle className="flex items-center gap-2">

                <ShieldCheck className="h-5 w-5 text-primary" />

                Additional Charges & Remarks

              </CardTitle>

            </CardHeader>

            <CardContent className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <FieldInput
                label="Tax Percentage"
                value={
                  globalForm.tax_percentage
                }
                onChange={(value) =>
                  updateGlobalField(
                    "tax_percentage",
                    value
                  )
                }
              />

              <FieldInput
                label="Discount Amount"
                value={
                  globalForm.discount_amount
                }
                onChange={(value) =>
                  updateGlobalField(
                    "discount_amount",
                    value
                  )
                }
              />

              <FieldInput
                label="Extra Charges"
                value={
                  globalForm.manual_extra_charge
                }
                onChange={(value) =>
                  updateGlobalField(
                    "manual_extra_charge",
                    value
                  )
                }
              />

              {/* <div className="space-y-2 md:col-span-2">

                <Label>
                  Remarks
                </Label>

                <Textarea
                  rows={5}
                  value={
                    globalForm.remarks
                  }
                  onChange={(e) =>
                    updateGlobalField(
                      "remarks",
                      e.target.value
                    )
                  }
                  className="rounded-2xl"
                />

              </div> */}

            </CardContent>

          </Card>

          {/* SUMMARY */}

          <Card className="mt-6 rounded-3xl border-0 bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-xl">

            <CardContent className="space-y-5 p-8">

              <div className="flex items-center justify-between">

                <span className="text-lg">
                  Shipping Cost
                </span>

                <span className="text-2xl font-bold">

                  $
                  {calculationResponse?.data
                    ?.shipping_cost || "0.00"}

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-lg">
                  Tax Amount
                </span>

                <span className="text-2xl font-bold">

                  $
                  {calculationResponse?.data
                    ?.tax_amount || "0.00"}

                </span>

              </div>

              {/* ITEM CALCULATION SUMMARY */}

{itemCalculationSummary.length >
  0 && (
  <div className="space-y-4">

    <div className="border-b border-white/20 pb-3">

      <h3 className="text-xl font-semibold">
        Item Calculation Summary
      </h3>

    </div>

    {itemCalculationSummary.map(
      (item, index) => (
        <div
          key={item.id}
          className="rounded-2xl bg-white/10 p-4 backdrop-blur"
        >

          <div className="flex items-center justify-between gap-4">

            <div>

              <p className="text-sm text-white/70">
                Item {index + 1}
              </p>

              <h4 className="mt-1 text-lg font-semibold">
                {item.commodity}
              </h4>

            </div>

            <div className="text-right">

              <p className="text-sm text-white/70">
                Weight
              </p>

              <h4 className="font-semibold">
                {
                  item.actualWeight
                }{" "}
                LB
              </h4>

            </div>

            <div className="text-right">

              <p className="text-sm text-white/70">
                Declared Value
              </p>

              <h4 className="text-xl font-bold">
                ${item.price}
              </h4>

            </div>

          </div>

        </div>
      )
    )}
  </div>
)}

              <Button
                onClick={
                  handleCalculateShipment
                }
                disabled={
                  calculationLoading
                }
                className="h-14 w-full rounded-2xl bg-white text-lg font-semibold text-black hover:bg-white/90"
              >

                {calculationLoading
                  ? "Calculating Shipment..."
                  : "Save Shipment Calculation"}

              </Button>

            </CardContent>

          </Card>

        </div>

      </DialogContent>
    </Dialog>
  );
}

// ======================================================
// REUSABLE INPUT FIELD
// ======================================================

function FieldInput({
  label,
  value,
  onChange,
  icon,
  readOnly = false,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon?: React.ReactNode;
  readOnly?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-4 text-muted-foreground">
            {icon}
          </div>
        )}

        <Input
          type="number"
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`h-12 rounded-2xl ${icon ? "pl-10" : ""}`}
        />
      </div>
    </div>
  );
}