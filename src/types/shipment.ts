// ======================================================
// FILE: src/types/shipment.ts
// ======================================================

export type CalculationResult = {
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