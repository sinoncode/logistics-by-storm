import { create } from "zustand";

import api from "@/lib/axios";

import { z } from "zod";

/* =========================================================
   ZOD SCHEMAS
========================================================= */

const DashboardChartSchema =
  z.object({
    filter: z.string(),

    labels: z.array(z.string()),

    data: z.array(z.number()),

    points: z.array(
      z.object({
        label: z.string(),

        value: z.number(),
      })
    ),
  });

const RecentShipmentSchema =
  z.object({
    id: z.number(),

    tracking_number:
      z.string(),

    customer_name:
      z.string(),

    status: z.string(),

    created_at:
      z.string(),
  });

const RecentPaymentSchema =
  z.object({
    id: z.number(),

    shipment_id:
      z.number().nullable(),

    tracking_number:
      z.string().nullable(),

    customer_name:
      z.string(),

    amount: z.number(),

    status: z.string(),

    paid_at:
      z.string().nullable(),
  });

const DashboardSchema = z.object({
  tiles: z.object({
    total_users:
      z.number(),

    total_shipments:
      z.number(),

    requested_shipments:
      z.number(),

    completed_shipments:
      z.number(),

    total_revenue:
      z.number(),
  }),

  shipment_chart:
    DashboardChartSchema,

  revenue_chart:
    DashboardChartSchema,

  recent_shipments:
    z.array(
      RecentShipmentSchema
    ),

  recent_payments:
    z.array(
      RecentPaymentSchema
    ),
});

/* =========================================================
   TYPES
========================================================= */

export type DashboardData =
  z.infer<
    typeof DashboardSchema
  >;

/* =========================================================
   STORE TYPES
========================================================= */

interface DashboardState {
  dashboard: DashboardData | null;

  loading: boolean;

  error: string | null;

  fetchDashboard: () => Promise<void>;
}

/* =========================================================
   STORE
========================================================= */

export const useDashboardStore =
  create<DashboardState>(
    (set) => ({
      dashboard: null,

      loading: false,

      error: null,

      fetchDashboard:
        async () => {
          try {
            set({
              loading: true,

              error: null,
            });

            const response =
              await api.get(
                "/admin/dashboard"
              );

            const validatedData =
              DashboardSchema.parse(
                response.data.data
              );

            set({
              dashboard:
                validatedData,

              loading: false,
            });
          } catch (error: any) {
            console.error(
              "Dashboard Fetch Error:",
              error
            );

            set({
              loading: false,

              error:
                error?.response?.data
                  ?.message ||
                "Failed to fetch dashboard",
            });
          }
        },
    })
  );