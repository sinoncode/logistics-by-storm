"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  Save,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  User,
} from "lucide-react";

import { toast } from "react-toastify";

import api from "@/lib/axios";

import Breadcrumb from "@/layouts/Breadcrumb";

type Member = {
  id: string;

  name: string;

  email: string;

  phone: string;

  status: string;

  created_at: string;

  role?: string;
};

type Role = {
  id: number;
  name: string;
};

const TeamMemberView = () => {

  const { id } = useParams();

  const [member, setMember] =
    useState<Member | null>(null);

  const [roles, setRoles] =
    useState<Role[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [formData, setFormData] =
    useState({
      role: "",
      status: "",
    });

  /* =========================================
     FETCH MEMBER DETAILS
  ========================================= */

  const fetchMember =
    async () => {

      try {

        const response =
          await api.get(
            `/admin/teams/${id}`
          );

        const data =
          response.data.data;

        setMember(data);

        setFormData({
          role:
            data.role || "",

          status:
            data.status || "inactive",
        });

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to fetch member details"
        );

      } finally {

        setLoading(false);
      }
    };

  /* =========================================
     FETCH ROLES
  ========================================= */

  const fetchRoles =
    async () => {

      try {

        const response =
          await api.get(
            "/admin/roles"
          );

        setRoles(
          response?.data?.data?.data || []
        );

      } catch (error) {

        console.error(error);
      }
    };

  useEffect(() => {

    fetchMember();

    fetchRoles();

  }, []);

  /* =========================================
     HANDLE CHANGE
  ========================================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  /* =========================================
     SAVE MEMBER
  ========================================= */

  const handleSave =
    async () => {

      try {

        setSaving(true);

        await api.put(
          `/admin/teams/${id}`,
          {
            role:
              formData.role,

            status:
              formData.status,
          }
        );

        toast.success(
          "Member updated successfully"
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to update member"
        );

      } finally {

        setSaving(false);
      }
    };

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {

    return (
      <div className="p-10 text-center text-lg font-medium">
        Loading member details...
      </div>
    );
  }

  /* =========================================
     NOT FOUND
  ========================================= */

  if (!member) {

    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Member not found
      </div>
    );
  }

  return (
    <>
      <Breadcrumb
        title="Team Member"
        text="Member Details"
      />

      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-black">

        <div className="max-w-7xl mx-auto rounded-[32px] overflow-hidden bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800">

          {/* HEADER */}

          <div className="relative overflow-hidden bg-[#02374C] p-8 md:p-12">

            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

            <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

            <div className="relative flex flex-col lg:flex-row gap-8 items-center">

              {/* AVATAR */}

              <div className="w-40 h-40 rounded-[32px] bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">

                <User
                  size={70}
                  className="text-white"
                />

              </div>

              {/* INFO */}

              <div className="flex-1 text-center lg:text-left">

                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  {member.name}
                </h1>

                <p className="text-blue-100 mt-3 text-lg">
                  Team Member Profile
                </p>

                <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">

                  <span
                    className={`px-5 py-2 rounded-full text-sm font-semibold ${
                      formData.status ===
                      "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {formData.status}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* BODY */}

          <div className="p-6 md:p-10">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* EMAIL */}

              <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-6 transition-all duration-300 hover:shadow-xl">

                <div className="flex items-center gap-3 mb-4">

                  <Mail
                    size={20}
                    className="text-primary"
                  />

                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Email Address
                  </p>

                </div>

                <h2 className="text-lg font-bold break-all">
                  {member.email}
                </h2>

              </div>

              {/* PHONE */}

              <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-6 transition-all duration-300 hover:shadow-xl">

                <div className="flex items-center gap-3 mb-4">

                  <Phone
                    size={20}
                    className="text-primary"
                  />

                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Phone Number
                  </p>

                </div>

                <h2 className="text-lg font-bold">
                  {member.phone}
                </h2>

              </div>

              {/* ROLE */}

              <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-6">

                <div className="flex items-center gap-3 mb-4">

                  <ShieldCheck
                    size={20}
                    className="text-primary"
                  />

                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Role
                  </p>

                </div>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full h-12 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 outline-none"
                >

                  <option value="">
                    Select Role
                  </option>

                  {roles.map((role) => (
                    <option
                      key={role.id}
                      value={role.name}
                    >
                      {role.name}
                    </option>
                  ))}

                </select>

              </div>

              {/* STATUS */}

              <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-6">

                <div className="flex items-center gap-3 mb-4">

                  <Calendar
                    size={20}
                    className="text-primary"
                  />

                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </p>

                </div>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full h-12 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 outline-none"
                >

                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>

                </select>

              </div>

            </div>

            {/* SAVE BUTTON */}

            <div className="flex justify-end mt-10">

              <button
                onClick={handleSave}
                disabled={saving}
                className="h-14 px-10 rounded-2xl bg-green-600 hover:bg-[#02374C] text-white font-semibold text-lg flex items-center gap-3 transition-all duration-300 hover:scale-[1.02]"
              >

                <Save size={20} />

                {saving
                  ? "Saving..."
                  : "Save Changes"}

              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default TeamMemberView;