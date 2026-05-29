"use client";

import AuthImage from "@/assets/images/auth/create-password-image.png";

import ThemeLogo from "@/components/shared/ThemeLogo";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Field,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";

import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
} from "lucide-react";

import { useState } from "react";

import {
  Link,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import {
  Controller,
  useForm,
} from "react-hook-form";

import * as z from "zod";

import api from "@/lib/axios";

import { toast } from "react-toastify";

const formSchema = z
  .object({
    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters."
      )
      .max(
        20,
        "Password must be at most 20 characters."
      ),

    confirmPassword:
      z.string(),
  })
  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      message:
        "Passwords do not match.",
      path: [
        "confirmPassword",
      ],
    }
  );

const CreatePassword = () => {

  const navigate =
    useNavigate();

  const [
    searchParams,
  ] = useSearchParams();

  /* ======================================
     GET EMAIL & TOKEN FROM URL
  ====================================== */

  const email =
    searchParams.get(
      "email"
    ) || "";

  const token =
    searchParams.get(
      "token"
    ) || "";

  /* ======================================
     STATES
  ====================================== */

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  /* ======================================
     FORM
  ====================================== */

  const form = useForm<
    z.infer<
      typeof formSchema
    >
  >({
    resolver:
      zodResolver(
        formSchema
      ),

    defaultValues: {
      password: "",
      confirmPassword:
        "",
    },
  });

  /* ======================================
     SUBMIT
  ====================================== */

  const handleCreatePassword =
    async (
      data: z.infer<
        typeof formSchema
      >
    ) => {

      try {

        setIsLoading(true);

        await api.post(
          "/admin/create-password",
          {
            email,
            token,
            password:
              data.password,
          }
        );

        toast.success(
          "Password created successfully"
        );

        form.reset();

        navigate(
          "/login"
        );

      } catch (
        error: any
      ) {

        console.error(
          error
        );

        const apiErrors =
          error?.response
            ?.data
            ?.errors;

        /* ============================
           FIELD ERRORS
        ============================ */

        if (
          apiErrors
        ) {

          Object.keys(
            apiErrors
          ).forEach(
            (
              key
            ) => {

              form.setError(
                key as any,
                {
                  message:
                    apiErrors[
                      key
                    ][0],
                }
              );
            }
          );
        }

        toast.error(
          error?.response
            ?.data
            ?.message ||
            "Failed to create password"
        );

      } finally {

        setIsLoading(
          false
        );
      }
    };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f4fff3] via-white to-[#eefbea] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 lg:flex overflow-hidden">

      {/* LEFT IMAGE SECTION */}

      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">

        {/* GLOW EFFECTS */}

        <div className="absolute  w-full h-full bg-white/10 rounded-full blur-3xl" />

        <div className="absolute w-full h-full bg-lime-100/10 rounded-full blur-3xl" />

        <div className="flex items-center justify-center">

          <img
            src={
              AuthImage
            }
            alt="Create Password"
            className="w-full h-full object-cover"
          />

        </div>

      </div>

      {/* RIGHT FORM SECTION */}

      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-10">

        <div className="w-full max-w-[520px]">

          {/* CARD */}

          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-800 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 md:p-10">

            {/* LOGO */}

            <Link
              to="/"
              className="inline-flex"
            >

              <ThemeLogo />

            </Link>

            {/* HEADER */}

            <div className="mt-8 mb-8">

              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">

                Create New Password

              </h1>

              <p className="text-slate-500 dark:text-slate-400 mt-3 text-base leading-7">

                Create a secure password for your account.
                Make sure it is strong and easy for you to remember.

              </p>

            </div>

            {/* FORM */}

            <form
              onSubmit={form.handleSubmit(
                handleCreatePassword
              )}
              className="space-y-5"
            >

              {/* PASSWORD */}

              <FieldGroup>

                <Controller
                  name="password"
                  control={
                    form.control
                  }
                  render={({
                    field,
                    fieldState,
                  }) => (

                    <Field
                      data-invalid={
                        fieldState.invalid
                      }
                      className="gap-2"
                    >

                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">

                        Password

                      </label>

                      <div className="relative">

                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                        <Input
                          {...field}
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Enter password"
                          autoComplete="off"
                          className={cn(
                            "h-14 rounded-2xl border bg-slate-50 dark:bg-slate-800/60 pl-12 pr-12 text-base transition-all duration-200",
                            fieldState.invalid
                              ? "border-red-500 focus:border-red-500"
                              : "border-slate-200 dark:border-slate-700 focus:border-[#67C05E]"
                          )}
                        />

                        <Button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              !showPassword
                            )
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-0 bg-transparent hover:bg-transparent text-slate-500 shadow-none"
                        >

                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}

                        </Button>

                      </div>

                      {fieldState.invalid && (

                        <FieldError
                          errors={[
                            fieldState.error,
                          ]}
                        />

                      )}

                    </Field>
                  )}
                />

              </FieldGroup>

              {/* CONFIRM PASSWORD */}

              <FieldGroup>

                <Controller
                  name="confirmPassword"
                  control={
                    form.control
                  }
                  render={({
                    field,
                    fieldState,
                  }) => (

                    <Field
                      data-invalid={
                        fieldState.invalid
                      }
                      className="gap-2"
                    >

                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">

                        Confirm Password

                      </label>

                      <div className="relative">

                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                        <Input
                          {...field}
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Confirm password"
                          autoComplete="off"
                          className={cn(
                            "h-14 rounded-2xl border bg-slate-50 dark:bg-slate-800/60 pl-12 pr-12 text-base transition-all duration-200",
                            fieldState.invalid
                              ? "border-red-500 focus:border-red-500"
                              : "border-slate-200 dark:border-slate-700 focus:border-[#67C05E]"
                          )}
                        />

                        <Button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(
                              !showConfirmPassword
                            )
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-0 bg-transparent hover:bg-transparent text-slate-500 shadow-none"
                        >

                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}

                        </Button>

                      </div>

                      {fieldState.invalid && (

                        <FieldError
                          errors={[
                            fieldState.error,
                          ]}
                        />

                      )}

                    </Field>
                  )}
                />

              </FieldGroup>

              {/* BUTTON */}

              <Button
                type="submit"
                disabled={
                  isLoading
                }
                className="w-full h-14 rounded-2xl text-base font-semibold bg-gradient-to-r from-[#4A9E52] via-[#67C05E] to-[#84D279] hover:opacity-95 transition-all duration-300 shadow-lg shadow-green-200 dark:shadow-none mt-4"
              >

                {isLoading && (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                )}

                {isLoading
                  ? "Creating Password..."
                  : "Create Password"}

              </Button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CreatePassword;