import { create } from "zustand";

import api from "@/lib/axios";

/* =========================================================
   TEAM TYPES
========================================================= */

export interface TeamMember {
  id: string;

  name: string;

  email: string;

  phone: string;

  role?: string;

  status: string;

  created_at: string;
}

/* =========================================================
   CREATE TEAM PAYLOAD
========================================================= */

export interface CreateTeamPayload {
  first_name: string;

  last_name: string;

  email: string;

  phone: string;

  role: string;

  status: string;
}

/* =========================================================
   TEAM STORE TYPES
========================================================= */

interface TeamStore {
  members: TeamMember[];

  roleLoading: boolean;

  error: string | null;

  fetchMembers: () => Promise<void>;

  createMember: (
    payload: CreateTeamPayload
  ) => Promise<boolean>;

  deleteMember: (
    id: string
  ) => Promise<boolean>;
}

/* =========================================================
   TEAM STORE
========================================================= */

export const useTeamStore =
  create<TeamStore>((set, get) => ({

    members: [],

    roleLoading: false,

    error: null,

    /* =====================================================
       FETCH MEMBERS
    ===================================================== */

    fetchMembers: async () => {

      try {

        set({
          roleLoading: true,
          error: null,
        });

        const response =
          await api.get(
            "/admin/teams"
          );

        const formattedData =
          response?.data?.data?.map(
            (item: any) => ({

              id: item.id,

              name: item.name,

              email: item.email,

              phone:
                item.phone || "-",

              role:
                item.role || "-",

              status:
                item.status || "inactive",

              created_at:
                item.created_at,
            })
          ) || [];

        set({
          members: formattedData,
        });

      } catch (error: any) {

        console.error(error);

        set({
          error:
            error?.response?.data
              ?.message ||
            "Failed to fetch team members",
        });

      } finally {

        set({
          roleLoading: false,
        });
      }
    },

    /* =====================================================
       CREATE MEMBER
    ===================================================== */

    createMember:
      async (payload) => {

        try {

          set({
            roleLoading: true,
            error: null,
          });

          await api.post(
            "/admin/teams",
            payload
          );

          await get().fetchMembers();

          return true;

        } catch (error: any) {

          console.error(error);

          set({
            error:
              error?.response?.data
                ?.message ||
              "Failed to create member",
          });

          return false;

        } finally {

          set({
            roleLoading: false,
          });
        }
      },

    /* =====================================================
       DELETE MEMBER
    ===================================================== */

    deleteMember:
      async (id) => {

        try {

          await api.delete(
            `/admin/teams/${id}`
          );

          set({
            members:
              get().members.filter(
                (item) =>
                  item.id !== id
              ),
          });

          return true;

        } catch (error: any) {

          console.error(error);

          set({
            error:
              error?.response?.data
                ?.message ||
              "Failed to delete member",
          });

          return false;
        }
      },
  }));

/* =========================================================
   ROLE TYPES
========================================================= */

export interface Role {
  id: number;

  name: string;
}

/* =========================================================
   ROLE STORE TYPES
========================================================= */

type RoleStore = {
  roles: Role[];
  roleLoading: boolean;
  fetchRoles: () => Promise<void>;
};

/* =========================================================
   ROLE STORE
========================================================= */

export const useRoleStore =
  create<RoleStore>((set) => ({
    roles: [],
    roleLoading: false,

    fetchRoles: async () => {
      try {

        set({
          roleLoading: true,
        });

        const response =
          await api.get("/admin/roles");

        console.log(response.data);

       set({
  roles:
    response?.data?.data?.data || [],
});

      } catch (error) {

        console.error(error);

      } finally {

        set({
          roleLoading: false,
        });
      }
    },
  }));