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