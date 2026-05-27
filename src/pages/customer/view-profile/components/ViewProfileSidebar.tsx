import { useEffect } from "react";

import UserGridBgImageHere from "@/assets/images/user-grid/logistics-by-storm-user-profile-background.png";

import UserGridImageHere from "@/assets/images/user-grid/logistics-by-storm-user-profile-image.png";

import { useProfileStore } from "@/store/profileStore";

const ViewProfileSidebar = () => {

  /* =====================================================
     PROFILE STORE
  ===================================================== */

  const {
    profile,
    loading,
    fetchProfile,
  } = useProfileStore();

  /* =====================================================
     FETCH PROFILE
  ===================================================== */

  useEffect(() => {
    fetchProfile();
  }, []);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full py-20">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#273142] h-full shadow-sm">

      {/* ============================================
          COVER IMAGE
      ============================================= */}

      <img
        src={UserGridBgImageHere}
        alt="Background"
        className="w-full h-[180px] object-cover"
      />

      {/* ============================================
          PROFILE SECTION
      ============================================= */}

      <div className="px-6 pb-6 -mt-[90px]">

        {/* PROFILE IMAGE */}

        <div className="flex flex-col items-center text-center border-b border-slate-200 dark:border-slate-700 pb-6">

          <img
            src={
              profile?.avatar ||
              UserGridImageHere
            }
            alt="Profile"
            className="w-[180px] h-[180px] rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-lg"
          />

          {/* NAME */}

          <h4 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white capitalize">
            {profile?.name || "-"}
          </h4>

          {/* EMAIL */}

          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-300">
            {profile?.email || "-"}
          </p>

          {/* STATUS */}

          <div className="mt-4">
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400 capitalize">
              {profile?.status || "Active"}
            </span>
          </div>

        </div>

        {/* ============================================
            PERSONAL INFO
        ============================================= */}

        <div className="mt-7">

          <h5 className="text-xl font-semibold mb-5 text-slate-900 dark:text-white">
            Personal Information
          </h5>

          <div className="space-y-4">

            {/* FULL NAME */}

            <div className="flex items-start">
              <span className="w-[38%] text-sm font-semibold text-slate-700 dark:text-slate-200">
                Full Name
              </span>

              <span className="w-[62%] text-sm text-neutral-500 dark:text-neutral-300 capitalize">
                : {profile?.name || "-"}
              </span>
            </div>

            {/* EMAIL */}

            <div className="flex items-start">
              <span className="w-[38%] text-sm font-semibold text-slate-700 dark:text-slate-200">
                Email
              </span>

              <span className="w-[62%] text-sm text-neutral-500 dark:text-neutral-300 break-all">
                : {profile?.email || "-"}
              </span>
            </div>

            {/* PHONE */}

            <div className="flex items-start">
              <span className="w-[38%] text-sm font-semibold text-slate-700 dark:text-slate-200">
                Phone Number
              </span>

              <span className="w-[62%] text-sm text-neutral-500 dark:text-neutral-300">
                : {profile?.phone || "-"}
              </span>
            </div>

            {/* GENDER */}

            <div className="flex items-start">
              <span className="w-[38%] text-sm font-semibold text-slate-700 dark:text-slate-200">
                Gender
              </span>

              <span className="w-[62%] text-sm text-neutral-500 dark:text-neutral-300 capitalize">
                : {profile?.gender || "-"}
              </span>
            </div>

            {/* LANGUAGE */}

            <div className="flex items-start">
              <span className="w-[38%] text-sm font-semibold text-slate-700 dark:text-slate-200">
                Language
              </span>

              <span className="w-[62%] text-sm text-neutral-500 dark:text-neutral-300 capitalize">
                :{" "}
                {profile?.preferred_language ||
                  "English"}
              </span>
            </div>

            {/* DATE OF BIRTH */}

            {/* <div className="flex items-start">
              <span className="w-[38%] text-sm font-semibold text-slate-700 dark:text-slate-200">
                Date Of Birth
              </span>

              <span className="w-[62%] text-sm text-neutral-500 dark:text-neutral-300">
                :{" "}
                {profile?.date_of_birth ||
                  "-"}
              </span>
            </div> */}

            {/* COMPANY */}

            {/* <div className="flex items-start">
              <span className="w-[38%] text-sm font-semibold text-slate-700 dark:text-slate-200">
                Company
              </span>

              <span className="w-[62%] text-sm text-neutral-500 dark:text-neutral-300">
                :{" "}
                {profile?.company_name ||
                  "Not Added"}
              </span>
            </div> */}

            {/* TIN */}

            {/* <div className="flex items-start">
              <span className="w-[38%] text-sm font-semibold text-slate-700 dark:text-slate-200">
                TIN Number
              </span>

              <span className="w-[62%] text-sm text-neutral-500 dark:text-neutral-300">
                : {profile?.tin || "-"}
              </span>
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfileSidebar;