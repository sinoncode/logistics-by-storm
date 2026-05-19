import { create } from "zustand";

import api from "@/lib/axios";

export interface Customer {
  id: string;
  customer_code: string | null;
  name: string;
  email: string;
  phone: string;
  status: string;
  addresses_count: number;
  shipments_count: number;
  created_at: string;
}

interface CustomerState {
  customers: Customer[];

  loading: boolean;

  fetchCustomers: () => Promise<void>;
}

export const useCustomerStore =
  create<CustomerState>((set) => ({
    customers: [],

    loading: false,

    fetchCustomers: async () => {
      try {
        set({ loading: true });

        const response = await api.get(
          "/admin/customers"
        );

        set({
          customers: response.data.data,
        });

      } catch (error) {
        console.error(
          "Fetch Customers Error:",
          error
        );
      } finally {
        set({ loading: false });
      }
    },
  }));