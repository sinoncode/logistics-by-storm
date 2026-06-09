import { useEffect, useState } from "react";

import LazyWrapper from "@/components/LazyWrapper";
import Breadcrumb from "@/layouts/Breadcrumb";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createSetting,
  getSettings,
} from "@/services/settings.services";

import { toast } from "react-toastify";

const Company = () => {
  const [selectedLogo, setSelectedLogo] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [logoUrl, setLogoUrl] =
    useState("");

  const [inputKey, setInputKey] =
    useState(Date.now());

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response =
        await getSettings();

      const settings =
        response?.data || response;

      const companyLogo =
        settings?.find(
          (item: any) =>
            item.key === "company_logo"
        );

      if (companyLogo?.value) {
        setLogoUrl(
          companyLogo.value
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setSelectedLogo(file);
  };

  const handleUploadLogo = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!selectedLogo) {
      toast.error(
        "Please select a logo"
      );
      return;
    }

    try {
      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "key",
        "company_logo"
      );

      formData.append(
        "type",
        "image"
      );

      formData.append(
        "file",
        selectedLogo
      );

      await createSetting(
        formData
      );

      toast.success(
        "Logo uploaded successfully"
      );

      setSelectedLogo(null);

      setInputKey(Date.now());

      await loadSettings();
    } catch (error: any) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Failed to upload logo"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb
        title="Settings"
        text="Settings"
      />

      <LazyWrapper>
        <div>
          <div className="card h-full rounded-xl border-0 p-6">
            <div className="card-body p-0">

              <form
                onSubmit={
                  handleUploadLogo
                }
              >
                <div className="max-w-md mx-auto">

                  <div className="flex flex-col items-center">

                    <Label className="text-base font-semibold mb-5">
                      Company Logo
                    </Label>

                    <div className="relative">

                      <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/20 bg-slate-100 dark:bg-slate-800 shadow-xl">

                        {selectedLogo ||
                        logoUrl ? (
                          <img
                            src={
                              selectedLogo
                                ? URL.createObjectURL(
                                    selectedLogo
                                  )
                                : logoUrl
                            }
                            alt="Company Logo"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-10 h-10 mb-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 7l9-4 9 4v10l-9 4-9-4V7z"
                              />
                            </svg>

                            <span className="text-sm">
                              No Logo
                            </span>
                          </div>
                        )}
                      </div>

                      <label
                        htmlFor="logo-upload"
                        className="
                          absolute
                          bottom-2
                          right-2
                          w-12
                          h-12
                          rounded-full
                          bg-primary
                          text-white
                          flex
                          items-center
                          justify-center
                          cursor-pointer
                          shadow-lg
                          transition-all
                          hover:scale-105
                        "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v10m0 0l-4-4m4 4l4-4M4 20h16"
                          />
                        </svg>
                      </label>

                      <Input
                        key={inputKey}
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={
                          handleLogoChange
                        }
                        className="hidden"
                      />
                    </div>

                    {selectedLogo && (
                      <div className="mt-4 text-center">
                        <p className="text-sm font-medium text-green-600">
                          ✓{" "}
                          {
                            selectedLogo.name
                          }
                        </p>
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground text-center mt-4">
                      Click the upload icon to
                      select or replace your
                      company logo.
                    </p>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="
                        mt-6
                        h-12
                        w-full
                        md:w-[260px]
                        rounded-xl
                        font-medium
                      "
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin mr-2 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />

                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>

                          Uploading...
                        </>
                      ) : (
                        "Upload Logo"
                      )}
                    </Button>

                  </div>

                </div>
              </form>

            </div>
          </div>
        </div>
      </LazyWrapper>
    </>
  );
};

export default Company;