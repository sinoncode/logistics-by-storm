import { create } from "zustand";

import api from "@/lib/axios";

import { z } from "zod";

/* =========================================================
   SHIPMENT SCHEMA
========================================================= */

const ShipmentItemSchema = z.object({
  id: z.number(),

  commodity_type: z.string(),

  price: z.number(),
});

const ShipmentUserSchema = z.object({
  name: z.string(),

  email: z.string(),

  phone: z.string(),
});

const ShipmentCountrySchema =
  z.object({
    id: z.number(),

    name: z.string(),
  });

const ShipmentFacilitySchema =
  z.object({
    id: z.number(),

    name: z.string(),
  });

const ShipmentRequestDetailsSchema =
  z.object({
    request_number:
      z.string(),

    supplier_name:
      z.string(),

    user:
      ShipmentUserSchema,

    origin_country:
      ShipmentCountrySchema,

    origin_facility:
      ShipmentFacilitySchema,

    destination_country:
      ShipmentCountrySchema,

    destination_facility:
      ShipmentFacilitySchema,

    items: z.array(
      ShipmentItemSchema
    ),
  });

export type ShipmentRequestDetails =
  z.infer<
    typeof ShipmentRequestDetailsSchema
  >;

/* =========================================================
   PAYMENT SCHEMA
========================================================= */

const UserSchema = z.object({
  id: z.string(),

  name: z.string(),

  email: z.string(),
});

const ShipmentRequestSchema =
  z.object({
    id: z.number(),
  });

const PaymentDetailsSchema =
  z.object({
    id: z.number(),

    shipment_request_id:
      z.number(),

    user_id: z.string(),

    invoice_id:
      z.number().nullable(),

    payment_reference:
      z.string().nullable(),

    gateway_name:
      z.string(),

    gateway_order_id:
      z.string().nullable(),

    gateway_transaction_id:
      z.string().nullable(),

    currency_code:
      z.string(),

    amount: z.string(),

    status: z.string(),

    initiated_at:
      z.string().nullable(),

    paid_at:
      z.string().nullable(),

    failed_at:
      z.string().nullable(),

    refunded_at:
      z.string().nullable(),

    created_at:
      z.string(),

    updated_at:
      z.string(),

    user: UserSchema,

    shipment_request:
      ShipmentRequestSchema,
  });

export type PaymentDetails =
  z.infer<
    typeof PaymentDetailsSchema
  >;

/* =========================================================
   STORE TYPES
========================================================= */

interface PaymentDetailsState {
  payment:
    | PaymentDetails
    | null;

  shipmentRequest:
    | ShipmentRequestDetails
    | null;

  loading: boolean;

  error: string | null;

  fetchPaymentDetails: (
    id: string
  ) => Promise<void>;

  clearPayment: () => void;
}

/* =========================================================
   STORE
========================================================= */

export const usePaymentDetailsStore =
  create<PaymentDetailsState>(
    (set) => ({
      payment: null,

      shipmentRequest: null,

      loading: false,

      error: null,

      fetchPaymentDetails:
        async (id: string) => {
          try {
            set({
              loading: true,

              error: null,
            });

            /* =========================================
               PAYMENT DETAILS
            ========================================= */

            const response =
              await api.get(
                `/admin/payments/${id}`
              );

            const validatedData =
              PaymentDetailsSchema.parse(
                response.data.data
              );

            /* =========================================
               SHIPMENT REQUEST DETAILS
            ========================================= */

            const shipmentResponse =
              await api.get(
                `/admin/shipment-requests/${validatedData.shipment_request.id}`
              );

            const shipmentValidatedData =
              ShipmentRequestDetailsSchema.parse(
                shipmentResponse
                  .data.data
              );

            /* =========================================
               SET STATE
            ========================================= */

            set({
              payment:
                validatedData,

              shipmentRequest:
                shipmentValidatedData,

              loading: false,
            });

          } catch (error: any) {
            console.error(
              "Fetch Payment Details Error:",
              error
            );

            set({
              loading: false,

              error:
                error?.response?.data
                  ?.message ||
                "Failed to fetch payment details",
            });
          }
        },

      clearPayment: () => {
        set({
          payment: null,

          shipmentRequest:
            null,

          error: null,
        });
      },
    })
  );