import axios from "@/lib/axios";

type CalculateShipmentPayload = {
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

type CalculateShipmentParams = {
  shipmentRequestId: string;
  payload: CalculateShipmentPayload;
};

export const calculateShipmentCharge = async ({
  shipmentRequestId,
  payload,
}: CalculateShipmentParams) => {
  const response = await axios.post(
    `/api/v1/admin/shipment-requests/${shipmentRequestId}/calculate-charge`,
    payload
  );

  return response.data;
};