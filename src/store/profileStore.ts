import { create } from "zustand";

import api from "@/lib/axios";

/* =========================================================
   PROFILE TYPES
========================================================= */

export interface Profile {
  user_id: string;

  name: string;

  email: string;

  phone: string | null;

  preferred_language:
    | string
    | null;

  date_of_birth:
    | string
    | null;

  gender: string | null;

  company_name:
    | string
    | null;

  tin: string | null;

  avatar: string | null;

  status: string;
}

/* =========================================================
   STORE TYPES
========================================================= */

interface ProfileState {
  profile: Profile | null;

  loading: boolean;

  error: string | null;

  fetchProfile: () => Promise<void>;
}

/* =========================================================
   STORE
========================================================= */

export const useProfileStore =
  create<ProfileState>(
    (set) => ({
      profile: null,

      loading: false,

      error: null,

      /* =====================================================
         FETCH PROFILE
      ===================================================== */

      fetchProfile:
        async () => {
          try {
            set({
              loading: true,

              error: null,
            });

            const response =
              await api.get(
                "/profile"
              );

            set({
              profile:
                response.data.data,

              loading: false,
            });

          } catch (error: any) {

            console.error(
              "Profile Fetch Error:",
              error
            );

            set({
              error:
                error?.response?.data
                  ?.message ||
                "Failed to fetch profile",

              loading: false,
            });
          }
        },
    })
  );