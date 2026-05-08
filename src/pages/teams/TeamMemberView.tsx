import { useParams } from "react-router-dom";
import { useState } from "react";
import { Save } from "lucide-react";
import { toast } from "react-toastify";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import Breadcrumb from "@/layouts/Breadcrumb";

const rolesList = [
  "Manager",
  "Admin",
  "Shipment Care",
  "Delivery Agents",
  "Super Admin",
];

const TeamMemberView = () => {
  const { id } = useParams();
  const { members, setMembers } = useLocalStorage();

  const member = members.find((m) => m.id === id);
const [formData, setFormData] = useState({
  role: member?.role || "",
  status: member?.status || "",
});

  if (!member) {
    return (
      <div className="p-6 text-red-500 font-semibold">
        Member not found
      </div>
    );
  }

 
  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Save updated data
  const handleSave = () => {

    const updatedMembers = members.map((m) =>
      m.id === id
      ? {
    ...m,
    role: formData.role,
    status: formData.status,
  }
        : m
    );

    setMembers(updatedMembers);

    toast.success("Member details updated successfully!");
  };

  return (
    <>
      <Breadcrumb title="Team Member" text="Member Details" />

     <div className="  bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 animate-in fade-in duration-500">

        <div className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white/20 overflow-hidden transition-all duration-300">

          {/* HEADER */}
         <div className="relative overflow-hidden bg-[#02374C] from-primary via-blue-500 to-indigo-600 p-10">

            <div className="flex flex-col lg:flex-row items-center gap-6">

              {/* IMAGE */}
              <div>
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-40 h-40 rounded-[28px] object-cover border-[6px] border-white/30 shadow-2xl backdrop-blur-md hover:scale-105 transition duration-300"
                />
              </div>

              {/* INFO */}
              <div className="flex-1 text-center lg:text-left">

                <h2 className="text-5xl font-black tracking-tight text-white">
                  {member.name}
                </h2>

               <p className="text-xl text-blue-100 mt-3 font-medium">
                  {formData.role}
                </p>

                <div className="mt-4">
                  <span
                    className={`px-6 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-sm font-semibold ${
                      formData.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {formData.status}
                  </span>
                </div>

              </div>

            </div>
<div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
<div className="absolute bottom-0 left-0 w-52 h-52 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {/* BODY */}
          <div className="p-8">

            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-8">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">

              {/* EMAIL */}
              <div className="group bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <p className="text-sm font-medium uppercase tracking-wide text-gray-400">
                  Email Address
                </p>

                <h4 className="text-xl pt-3 font-semibold text-gray-800 dark:text-white break-all">
                  {member.email}
                </h4>
              </div>

              {/* PHONE */}
              <div className="group bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <p className="text-sm font-medium uppercase tracking-wide text-gray-400">
                  Phone Number
                </p>

                <h4 className="text-xl pt-3 font-semibold text-gray-800 dark:text-white">
                  {member.phone}
                </h4>
              </div>

              {/* DATE JOINED */}
              {/* <div className="group bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <p className="text-sm font-medium uppercase tracking-wide text-gray-400">
                  Date Joined
                </p>

                <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {member.joinDate}
                </h4>
              </div> */}

              {/* ROLE */}
              <div className="group bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <p className="text-sm font-medium uppercase tracking-wide text-gray-400">
                  Role
                </p>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full h-12 mt-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 text-sm outline-none focus:ring-2 focus:ring-primary"
                >
                  {rolesList.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* STATUS */}
              <div className="group bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <p className="text-sm font-medium uppercase tracking-wide text-gray-400">
                  Status
                </p>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full h-12 mt-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 text-sm outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* MEMBER ID */}
              {/* <div className="group bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <p className="text-sm text-gray-500 mb-2">
                  Member ID
                </p>

                <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {member.id}
                </h4>
              </div> */}

            </div>

            {/* PASSWORD SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

              {/* PASSWORD */}
              {/* <div className="group bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                <p className="text-sm text-gray-500 mb-3">
                  Password
                </p>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full h-14 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 text-xl font-medium outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                   className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff size={22} />
                    ) : (
                      <Eye size={22} />
                    )}
                  </button>

                </div>

              </div> */}

              {/* CONFIRM PASSWORD */}
              {/* <div className="group bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                <p className="text-sm text-gray-500 mb-3">
                  Confirm Password
                </p>

                <div className="relative">

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full h-14 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 text-xl font-medium outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={22} />
                    ) : (
                      <Eye size={22} />
                    )}
                  </button>

                </div>

              </div> */}

            </div>

            {/* SAVE BUTTON */}
            <div className="flex justify-end mt-2">

              <button
  onClick={handleSave}
  className="h-14 px-10 rounded-2xl bg-green-600 hover:bg-[#02374C] hover:scale-[1.02] hover:shadow-2xl text-white text-lg font-semibold flex items-center gap-3 transition-all duration-300"
>
  <Save size={20} />
  Save Changes
</button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default TeamMemberView;