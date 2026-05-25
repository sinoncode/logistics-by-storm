import { create } from "zustand";

import api from "@/lib/axios";

/* =========================================================
   USER TYPES
========================================================= */

export interface PaymentUser {
  id: string;

  name: string;

  email: string;
}

/* =========================================================
   SHIPMENT REQUEST TYPES
========================================================= */

export interface ShipmentRequest {
  id: number;
}

/* =========================================================
   PAYMENT TYPES
========================================================= */

export interface Payments {
  id: string;

  payment_reference: string | null;

  gateway_name: string;

  gateway_transaction_id: string;

  currency_code: string;

  amount: string;

  paid_at: string | null;

  created_at: string;

  shipments_count: number;

  shipment_request_id: number;

  customer_name: string;

  customer_email: string;

  shipment_request?: ShipmentRequest;
}

/* =========================================================
   STORE TYPES
========================================================= */

interface PaymentsState {
  payments: Payments[];

  loading: boolean;

  error: string | null;

  fetchPayments: () => Promise<void>;
}

/* =========================================================
   STORE
========================================================= */

export const usePaymentsStore =
  create<PaymentsState>((set) => ({
    payments: [],

    loading: false,

    error: null,

    /* =====================================================
       FETCH PAYMENTS
    ===================================================== */

    fetchPayments: async () => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response = await api.get(
          "/admin/payments"
        );

        const paymentsData =
          response?.data?.data || [];

        const formattedPayments: Payments[] =
          paymentsData.map((item: any) => ({
            id: String(item.id),

            payment_reference:
              item.payment_reference,

            gateway_name: item.gateway_name,

            gateway_transaction_id:
              item.gateway_transaction_id,

            currency_code:
              item.currency_code,

            amount: item.amount,

            paid_at: item.paid_at,

            created_at: item.created_at,

            shipment_request_id:
              item.shipment_request_id,

            shipments_count: 1,

            customer_name:
              item.user?.name || "-",

            customer_email:
              item.user?.email || "-",

            shipment_request:
              item.shipment_request,
          }));

        set({
          payments: formattedPayments,

          loading: false,
        });
      } catch (error: any) {
        console.error(
          "Fetch Payments Error:",
          error
        );

        set({
          error:
            error?.response?.data?.message ||
            "Failed to fetch payments",

          loading: false,
        });
      }
    },
  }));