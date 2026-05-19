import { create } from "zustand";
import axiosInstance from "@/lib/axios";

interface Address {
  id: number;
  label: string;
  full_name: string | null;
  phone: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country_id: number | null;
  is_default: boolean;
  created_at: string;
}

interface Shipment {
  id: string;
  status?: string;
  created_at?: string;
}

export interface CustomerDetails {
  id: string;
  customer_code: string | null;
  name: string;
  email: string;
  phone: string;
  status: string;
  addresses_count: number;
  shipments_count: number;
  addresses: Address[];
  shipments: Shipment[];
  created_at: string;
}

interface CustomerDetailsState {
  customer: CustomerDetails | null;
  loading: boolean;
  error: string | null;

  fetchCustomerDetails: (id: string) => Promise<void>;
}

export const useCustomerDetailsStore =
  create<CustomerDetailsState>((set) => ({
    customer: null,
    loading: false,
    error: null,

    fetchCustomerDetails: async (id) => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response = await axiosInstance.get(
          `/admin/customers/${id}`
        );

        set({
          customer: response.data.data,
          loading: false,
        });
      } catch (error: any) {
        set({
          error:
            error?.response?.data?.message ||
            "Failed to fetch customer details",
          loading: false,
        });
      }
    },
  }));