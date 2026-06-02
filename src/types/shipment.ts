// ======================================================
// FILE: src/types/shipment.ts
// ======================================================

export interface CalculationItem {
  id: number;

  commodity: string;

  actualWeight: number;

  volumetricWeight: number;

  deliveryType: string;

  dimensions: string;

  declaredValue: number;

  commodityType: string;
}

export interface CalculationResult {
  items: CalculationItem[];

  shippingCost: number;

  taxAmount: number;

  finalPrice: number;
}
// ======================================================
// CALCULATION API RESPONSE
// ======================================================

export type ShipmentCalculationResponse =
  {
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
// CALCULATION FORM
// ======================================================

export type ShipmentCalculationForm =
  {
    actual_weight_lb: number;

    length_cm: number;

    width_cm: number;

    height_cm: number;

    declared_value: number;

    manual_extra_charge: number;

    discount_amount: number;

    tax_percentage: number;

    volumetric_divisor: number;

    remarks: string;

    item_type: string;

    delivery_type: string;
  };

// ======================================================
// CALCULATION PAYLOAD
// ======================================================

export type CalculateShipmentPayload =
  {
    items: {
      id?: number;

      actual_weight_lb: number;

      length_cm: number;

      width_cm: number;

      height_cm: number;

      declared_value: number;

      tariff_code: string;
    }[];

    manual_extra_charge: number;

    discount_amount: number;

    tax_percentage: number;

    remarks: string;
  };