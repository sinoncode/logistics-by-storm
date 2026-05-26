import { create } from "zustand";

import api from "@/lib/axios";

import { z } from "zod";

/* ======================================================
   SCHEMA
====================================================== */

const ShipmentChartSchema =
  z.object({
    filter: z.string(),

    labels: z.array(
      z.string()
    ),

    data: z.array(
      z.number()
    ),

    points: z.array(
      z.object({
        label: z.string(),

        value: z.number(),
      })
    ),
  });

export type ShipmentChart =
  z.infer<
    typeof ShipmentChartSchema
  >;

/* ======================================================
   STORE
====================================================== */

interface ShipmentChartState {
  shipmentChart:
    | ShipmentChart
    | null;

  filter: string;

  loading: boolean;

  fetchShipmentChart: (
    filter: string
  ) => Promise<void>;

  setFilter: (
    filter: string
  ) => void;
}

export const useShipmentChartStore =
  create<ShipmentChartState>(
    (set) => ({
      shipmentChart: null,

      filter: "yearly",

      loading: false,

      setFilter: (
        filter
      ) =>
        set({
          filter,
        }),

      fetchShipmentChart:
        async (
          filter: string
        ) => {
          try {
            set({
              loading: true,
            });

            const response =
              await api.get(
                `/admin/dashboard/charts/shipments?filter=${filter}`
              );

            const validatedData =
              ShipmentChartSchema.parse(
                response.data.data
              );

            set({
              shipmentChart:
                validatedData,

              loading: false,
            });
          } catch (error) {
            console.error(
              "Shipment Chart Error:",
              error
            );

            set({
              loading: false,
            });
          }
        },
    })
  );