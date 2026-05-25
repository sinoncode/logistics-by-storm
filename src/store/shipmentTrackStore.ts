import { create } from "zustand";
import axios from "@/lib/axios";

/* =========================================================
   TYPES
========================================================= */

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Country {
  id: string;
  name: string;
}

export interface Facility {
  id: string;
  name: string;
}

export interface ShipmentDetails {
  id: string;

  tracking_number: string;

  current_status: string;

  created_at: string;

  delivery_type: string;

  origin_country: Country;

  destination_country: Country;

  origin_facility: Facility;

  destination_facility: Facility;

  user: User;
}

/* =========================================================
   STORE TYPES
========================================================= */

interface ShipmentDetailsStore {
  shipmentDetails: ShipmentDetails | null;

  loading: boolean;

  error: string | null;

  getShipmentDetails: (id: string) => Promise<void>;

  updateTrackingStatus: (
    id: string,
    status: string
  ) => Promise<void>;

  clearShipmentDetails: () => void;
}

/* =========================================================
   API BASE URL
========================================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

/* =========================================================
   STORE
========================================================= */

export const useShipmentDetailsStore =
  create<ShipmentDetailsStore>((set) => ({
    shipmentDetails: null,

    loading: false,

    error: null,

    /* =====================================================
       GET SHIPMENT DETAILS
    ===================================================== */

    getShipmentDetails: async (id: string) => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response = await axios.get(
          `${API_BASE_URL}/admin/shipments/${id}`
        );

        const shipment =
          response.data?.data || response.data;

        set({
          shipmentDetails: shipment,
          loading: false,
        });
      } catch (error: any) {
        console.error(
          "GET SHIPMENT DETAILS ERROR:",
          error
        );

        set({
          loading: false,
          error:
            error?.response?.data?.message ||
            "Failed to fetch shipment details",
        });
      }
    },

    /* =====================================================
       UPDATE TRACKING STATUS
    ===================================================== */

    updateTrackingStatus: async (
  id: string,
  status: string
) => {
  try {
    set({
      loading: true,
      error: null,
    });

    await axios.post(
      `${API_BASE_URL}/admin/shipments/${id}/tracking/status`,
      {
        status,
      }
    );

    set((state) => ({
      shipmentDetails: state.shipmentDetails
        ? {
            ...state.shipmentDetails,
            current_status: status,
          }
        : null,

      loading: false,
    }));
  } catch (error: any) {
    console.error(
      "UPDATE TRACKING STATUS ERROR:",
      error
    );

    set({
      loading: false,
      error:
        error?.response?.data?.message ||
        "Failed to update tracking status",
    });
  }
},
    /* =====================================================
       CLEAR STORE
    ===================================================== */

    clearShipmentDetails: () => {
      set({
        shipmentDetails: null,
        error: null,
      });
    },
  }));