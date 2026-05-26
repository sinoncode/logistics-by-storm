import { create } from "zustand";

import api from "@/lib/axios";

import { z } from "zod";

/* ======================================================
   SCHEMA
====================================================== */

const RevenueChartSchema =
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

export type RevenueChart =
  z.infer<
    typeof RevenueChartSchema
  >;

/* ======================================================
   STORE
====================================================== */

interface RevenueChartState {
  revenueChart:
    | RevenueChart
    | null;

  filter: string;

  loading: boolean;

  fetchRevenueChart: (
    filter: string
  ) => Promise<void>;

  setFilter: (
    filter: string
  ) => void;
}

export const useRevenueChartStore =
  create<RevenueChartState>(
    (set) => ({
      revenueChart: null,

      filter: "monthly",

      loading: false,

      setFilter: (
        filter
      ) =>
        set({
          filter,
        }),

      fetchRevenueChart:
  async (
    filter: string
  ) => {
    try {
      set({
        loading: true,
      });

      const response =
        await api.get(
          "/admin/dashboard/charts/revenue",
          {
            params: {
              filter,
            },
          }
        );

      const validatedData =
        RevenueChartSchema.parse(
          response.data.data
        );

      set({
        revenueChart:
          validatedData,

        loading: false,
      });

    } catch (error) {

      console.error(
        "Revenue Chart Error:",
        error
      );

      set({
        loading: false,
      });
    }
  },
    })
  );