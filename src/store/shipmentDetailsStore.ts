import { create } from "zustand";

import axios from "@/lib/axios";

interface ShipmentDetailsStore {
  shipment: any;

  loading: boolean;

  fetchShipmentDetails: (
    shipmentId: string
  ) => Promise<void>;
}

export const useShipmentDetailsStore =
  create<ShipmentDetailsStore>((set) => ({
    shipment: null,

    loading: false,

    fetchShipmentDetails: async (
      shipmentId
    ) => {
      try {
        set({ loading: true });

        const response = await axios.get(
          `/admin/shipment-requests/${shipmentId}`
        );

        set({
          shipment: response.data.data,
        });
      } catch (error) {
        console.error(
          "Failed to fetch shipment details",
          error
        );
      } finally {
        set({ loading: false });
      }
    },
  }));