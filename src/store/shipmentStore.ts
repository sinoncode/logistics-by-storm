import { create } from "zustand";

import axios from "@/lib/axios";

// ======================================================
// TYPES
// ======================================================

export interface ShipmentRequest {
  id: number;

  request_number: string;

  booking_status: string;

  user: {
    name: string;

    email: string;
  };

  items: {
    price: string;
  }[];
}

// ======================================================
// STORE
// ======================================================

interface ShipmentStore {
  shipments: ShipmentRequest[];

  loading: boolean;

  fetchShipments: () => Promise<void>;
}

export const useShipmentStore =
  create<ShipmentStore>((set) => ({
    shipments: [],

    loading: false,

    fetchShipments: async () => {
      try {
        set({ loading: true });

        const response = await axios.get(
          "/admin/shipment-requests"
        );

        set({
          shipments: response.data.data || [],
        });
      } catch (error) {
        console.error(
          "Shipment Fetch Error:",
          error
        );
      } finally {
        set({ loading: false });
      }
    },
  }));