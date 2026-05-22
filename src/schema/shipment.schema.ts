import { z } from "zod";

export const ShipmentDetailsResponseSchema = z.object({
  id: z.number(),

  tracking_number: z.string(),

  delivery_type: z.string(),

  current_status: z.string(),

  created_at: z.string(),

  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
  }),

  origin_country: z.object({
    id: z.number(),
    name: z.string(),
    code: z.string().nullable(),
  }),

  origin_facility: z.object({
    id: z.number(),
    name: z.string(),
  }),

  destination_country: z.object({
    id: z.number(),
    name: z.string(),
    code: z.string().nullable(),
  }),

  destination_facility: z.object({
    id: z.number(),
    name: z.string(),
  }),

  delivery_address: z.object({
    id: z.number(),
    address_line_1: z.string(),
    address_line_2: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    postal_code: z.string().nullable(),
    country_id: z.number(),
  }),

  tracking_logs: z.array(
    z.object({
      id: z.number(),
      status: z.string(),
      description: z.string().nullable(),
      created_at: z.string(),
    })
  ),
});

export type ShipmentResponse = z.infer<typeof ShipmentDetailsResponseSchema>;