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
   UPDATE PROFILE TYPES
========================================================= */

export interface UpdateProfilePayload {
  name: string;

  phone?: string;

  preferred_language?: string;

  date_of_birth?: string;

  gender?: string;

  company_name?: string;

  tin?: string;

  avatar?: File | null;
}

/* =========================================================
   STORE TYPES
========================================================= */

interface ProfileState {
  profile: Profile | null;

  loading: boolean;

  updateLoading: boolean;

  error: string | null;

  fetchProfile: () => Promise<void>;

  updateProfile: (
    data: UpdateProfilePayload
  ) => Promise<boolean>;
}

/* =========================================================
   STORE
========================================================= */

export const useProfileStore =
  create<ProfileState>(
    (set) => ({
      profile: null,

      loading: false,

      updateLoading: false,

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

      /* =====================================================
         UPDATE PROFILE
      ===================================================== */

      updateProfile:
        async (
          data
        ) => {

          try {

            set({
              updateLoading: true,

              error: null,
            });

            const formData =
              new FormData();

            /* =========================================
               REQUIRED
            ========================================= */

            formData.append(
              "name",
              data.name
            );

            /* =========================================
               OPTIONAL
            ========================================= */

            if (data.phone) {

              formData.append(
                "phone",
                data.phone
              );
            }

            if (
              data.preferred_language
            ) {

              formData.append(
                "preferred_language",
                data.preferred_language
              );
            }

            if (
              data.date_of_birth
            ) {

              formData.append(
                "date_of_birth",
                data.date_of_birth
              );
            }

            if (data.gender) {

              formData.append(
                "gender",
                data.gender
              );
            }

            if (
              data.company_name
            ) {

              formData.append(
                "company_name",
                data.company_name
              );
            }

            if (data.tin) {

              formData.append(
                "tin",
                data.tin
              );
            }

            if (data.avatar) {

              formData.append(
                "avatar",
                data.avatar
              );
            }

            /* =========================================
               API CALL
            ========================================= */

         formData.append(
  "_method",
  "PUT"
);

await api.post(
  "/profile",
  formData,
  {
    headers: {
      "Content-Type":
        "multipart/form-data",
    },
  }
);

            /* =========================================
               REFRESH PROFILE
            ========================================= */

            const updatedProfile =
              await api.get(
                "/profile"
              );

            set({
              profile:
                updatedProfile
                  .data.data,

              updateLoading: false,
            });

            return true;

          } catch (error: any) {

            console.error(
              "Update Profile Error:",
              error
            );

            set({
              error:
                error?.response?.data
                  ?.message ||
                "Failed to update profile",

              updateLoading: false,
            });

            return false;
          }
        },
    })
  );