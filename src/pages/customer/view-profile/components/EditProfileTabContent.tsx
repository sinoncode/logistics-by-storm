"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";


import AvatarUpload from "./AvatarUpload";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

// import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useProfileStore }
  from "@/store/updateProfileStore";

import api from "@/lib/axios";

const languageOptions = [
  "dansk",
  "deutsch",
  "english",
  "espanol",
  "suomi",
  "francais",
  "kreyol_ayisyen",
  "nederlands",
];

const genderOptions = [
  "male",
  "female",
  "other",
  "prefer_not_to_say",
];

const EditProfileTabContent =
  () => {

    /* =====================================================
       STORE
    ===================================================== */

    const {
      profile,
      fetchProfile,
    } = useProfileStore();

    /* =====================================================
       STATES
    ===================================================== */

    const [loading, setLoading] =
      useState(false);

    const [avatar, setAvatar] =
      useState<File | null>(
        null
      );

    const [formData, setFormData] =
      useState({
        name: "",

        email: "",

        phone: "",

        preferred_language:
          "english",

        date_of_birth: "",

        gender: "male",

        company_name: "",

        tin: "",

        description: "",
      });

      const [errors, setErrors] = useState<any>({});

    /* =====================================================
       FETCH PROFILE
    ===================================================== */

    useEffect(() => {
      fetchProfile();
    }, []);

    /* =====================================================
       SET PROFILE DATA
    ===================================================== */

    useEffect(() => {
      if (profile) {
        setFormData({
          name:
            profile.name || "",

          email:
            profile.email || "",

          phone:
            profile.phone || "",

          preferred_language:
            profile.preferred_language ||
            "english",

          date_of_birth:
            profile.date_of_birth ||
            "",

          gender:
            profile.gender ||
            "male",

          company_name:
            profile.company_name ||
            "",

          tin:
            profile.tin || "",

          description: "",
        });
      }
    }, [profile]);

    /* =====================================================
       HANDLE CHANGE
    ===================================================== */

   const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement |
    HTMLTextAreaElement
  >
) => {

  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

  setErrors((prev: any) => ({
    ...prev,
    [e.target.name]: null,
  }));

  
};


    /* =====================================================
       HANDLE SUBMIT
    ===================================================== */

  const handleSubmit =
  async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setErrors({});

    try {

      setLoading(true);

      const payload =
        new FormData();

      payload.append(
        "name",
        formData.name
      );

      payload.append(
        "phone",
        formData.phone
      );

      payload.append(
        "preferred_language",
        formData.preferred_language
      );

      payload.append(
        "date_of_birth",
        formData.date_of_birth
      );

      payload.append(
        "gender",
        formData.gender
      );

      payload.append(
        "company_name",
        formData.company_name
      );

      payload.append(
        "tin",
        formData.tin
      );

      if (avatar) {

        payload.append(
          "avatar",
          avatar
        );
      }

      /* =====================================
         IMPORTANT FIX
      ===================================== */

      payload.append(
        "_method",
        "PUT"
      );

      await api.post(
        "/profile",
        payload,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Profile updated successfully"
      );

      fetchProfile();

    } catch (error: any) {

  console.error(error);

  const validationErrors =
    error?.response?.data?.errors || {};

  setErrors(validationErrors);

  toast.error(
    error?.response?.data?.message ||
    "Failed to update profile"
  );

} finally {

  setLoading(false);
}
  }

    return (
      <div>

        {/* ============================================
            PROFILE IMAGE
        ============================================= */}

        <h6 className="text-base text-neutral-600 dark:text-neutral-200 mb-4">
          Profile Image
        </h6>

        <div className="mb-8 mt-4">
          <AvatarUpload
            setAvatar={
              setAvatar
            }
            currentImage={
              profile?.avatar ||
              ""
            }
          />
        </div>

        {/* ============================================
            FORM
        ============================================= */}

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-6">

            {/* FULL NAME */}

            <div className="col-span-12 sm:col-span-6">

              <div className="mb-5">

                <Label className="inline-block font-semibold text-sm mb-2">
                  Full Name
                  <span className="text-red-600">
                    {" "}
                    *
                  </span>
                </Label>

                <Input
  name="name"
  type="text"
  placeholder="Enter Full Name"
  value={formData.name}
  onChange={handleChange}
  required
/>

{errors?.name && (
  <p className="mt-1 text-sm text-red-500 font-medium">
    {errors.name[0]}
  </p>
)}
              </div>
            </div>

            {/* EMAIL */}

            <div className="col-span-12 sm:col-span-6">

              <div className="mb-5">

                <Label className="inline-block font-semibold text-sm mb-2">
                  Email
                </Label>

                <Input
                  type="email"
                  value={
                    formData.email
                  }
                  disabled
                />
              </div>
            </div>

            {/* PHONE */}

            <div className="col-span-12 sm:col-span-6">

              <div className="mb-5">

                <Label className="inline-block font-semibold text-sm mb-2">
                  Phone
                </Label>

               <Input
  name="phone"
  type="tel"
  placeholder="Enter phone number"
  value={formData.phone}
  onChange={handleChange}
/>

{errors?.phone && (
  <p className="mt-1 text-sm text-red-500 font-medium">
    {errors.phone[0]}
  </p>
)}
              </div>
            </div>

            {/* DATE OF BIRTH */}

            <div className="col-span-12 sm:col-span-6">

              <div className="mb-5">

                <Label className="inline-block font-semibold text-sm mb-2">
                  Date Of Birth
                </Label>

                <Input
                  name="date_of_birth"
                  type="date"
                  value={
                    formData.date_of_birth
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>
            </div>

            {/* LANGUAGE */}

            <div className="col-span-12 sm:col-span-6">

              <div className="mb-5">

                <Label className="inline-block font-semibold text-sm mb-2">
                  Preferred Language
                </Label>

         <Select
  value={formData.preferred_language}
  onValueChange={(value) => {
    setFormData({
      ...formData,
      preferred_language: value,
    });

    setErrors((prev: any) => ({
      ...prev,
      preferred_language: null,
    }));
  }}
>

                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>

                  <SelectContent>

                    {languageOptions.map(
                      (
                        language
                      ) => (
                        <SelectItem
                          key={
                            language
                          }
                          value={
                            language
                          }
                        >
                          {language
                            .replace(
                              /_/g,
                              " "
                            )
                            .replace(
                              /\b\w/g,
                              (
                                char
                              ) =>
                                char.toUpperCase()
                            )}
                        </SelectItem>
                      )
                    )}

                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* GENDER */}

            <div className="col-span-12 sm:col-span-6">

              <div className="mb-5">

                <Label className="inline-block font-semibold text-sm mb-2">
                  Gender
                </Label>

                <Select
  value={formData.gender}
  onValueChange={(value) => {
    setFormData({
      ...formData,
      gender: value,
    });

    setErrors((prev: any) => ({
      ...prev,
      gender: null,
    }));
  }}
>

                    {errors?.gender && (
  <p className="mt-1 text-sm text-red-500 font-medium">
    {errors.gender[0]}
  </p>
)}

                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>

                  <SelectContent>

                    {genderOptions.map(
                      (
                        gender
                      ) => (
                        <SelectItem
                          key={
                            gender
                          }
                          value={
                            gender
                          }
                        >
                          {gender
                            .replace(
                              /_/g,
                              " "
                            )
                            .replace(
                              /\b\w/g,
                              (
                                char
                              ) =>
                                char.toUpperCase()
                            )}
                        </SelectItem>
                      )
                    )}

                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* COMPANY */}

            {/* <div className="col-span-12 sm:col-span-6">

              <div className="mb-5">

                <Label className="inline-block font-semibold text-sm mb-2">
                  Company Name
                </Label>

                <Input
                  name="company_name"
                  placeholder="Enter Company Name"
                  value={
                    formData.company_name
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>
            </div> */}

            {/* TIN */}

            {/* <div className="col-span-12 sm:col-span-6">

              <div className="mb-5">

                <Label className="inline-block font-semibold text-sm mb-2">
                  TIN Number
                </Label>

                <Input
  name="tin"
  placeholder="Enter TIN Number"
  value={formData.tin}
  onChange={handleChange}
/>

{errors?.tin && (
  <p className="mt-1 text-sm text-red-500 font-medium">
    {errors.tin[0]}
  </p>
)}
              </div>
            </div> */}

            {/* DESCRIPTION */}

            {/* <div className="col-span-12">

              <div className="mb-5">

                <Label className="inline-block font-semibold text-sm mb-2">
                  Description
                </Label>

                <Textarea
                  name="description"
                  placeholder="Write something about yourself"
                  value={
                    formData.description
                  }
                  onChange={
                    handleChange
                  }
                  className="min-h-[120px]"
                />
              </div>
            </div> */}

          </div>

          {/* ============================================
              BUTTONS
          ============================================= */}

          <div className="flex items-center justify-center gap-3 mt-2">

            <Button
              type="reset"
              variant="outline"
              className="h-[48px] border border-red-600 bg-transparent hover:bg-red-600/10 text-red-600 text-base px-14 rounded-xl"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="h-[48px] text-base px-14 rounded-xl"
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </Button>

          </div>
        </form>
      </div>
    );
  };

export default EditProfileTabContent;