import axios from "@/lib/axios";

import type { ShipmentListResponse } from "@/types/shipments-track";

// ======================================================
// GET SHIPMENTS
// ======================================================

export const getShipments =
  async (): Promise<ShipmentListResponse> => {
    const response = await axios.get(
      "/admin/shipments"
    );

    return response.data;
  };


  export const getShipmentDetails = async (id: string) => {
  const response = await axios.get(
    `/admin/shipments/${id}`
  );

  return response.data.data;
};


export const updateShipmentTrackingStatusApi = async (
  shipmentId: string | number,
  status: string
) => {
  const response = await axios.post(
    `/api/v1/admin/shipments/${shipmentId}/tracking/status`,
    {
      shipment_id: Number(shipmentId),
      status,
    }
  );

  

  return response.data;
};