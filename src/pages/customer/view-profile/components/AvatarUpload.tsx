import DefaultUploadedImage from "@/assets/images/user-grid/user-grid-img13.png";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Camera } from "lucide-react";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

/* =========================================================
   TYPES
========================================================= */

interface AvatarUploadProps {
  setAvatar: React.Dispatch<
    React.SetStateAction<File | null>
  >;

  currentImage?: string;
}

/* =========================================================
   COMPONENT
========================================================= */

const AvatarUpload = ({
  setAvatar,
  currentImage,
}: AvatarUploadProps) => {

  const [imagePreview, setImagePreview] =
    useState<string>(
      currentImage ||
        DefaultUploadedImage
    );

  const fileInputRef =
    useRef<HTMLInputElement>(
      null
    );

  /* =====================================================
     UPDATE IMAGE FROM API
  ===================================================== */

  useEffect(() => {

    if (currentImage) {
      setImagePreview(
        currentImage
      );
    }

  }, [currentImage]);

  /* =====================================================
     HANDLE IMAGE CHANGE
  ===================================================== */

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      e.target.files?.[0];

    if (file) {

      setAvatar(file);

      const reader =
        new FileReader();

      reader.onloadend =
        () => {

          setImagePreview(
            reader.result as string
          );
        };

      reader.readAsDataURL(
        file
      );
    }
  };

  return (
    <div className="avatar-upload relative inline-block">

      {/* ============================================
          CAMERA BUTTON
      ============================================= */}

      <div className="absolute bottom-0 right-0 z-10">

        <Input
          type="file"
          id="imageUpload"
          accept=".png,.jpg,.jpeg"
          ref={fileInputRef}
          onChange={
            handleImageChange
          }
          hidden
        />

        <Label
          htmlFor="imageUpload"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white shadow-lg border-2 border-white cursor-pointer hover:scale-105 transition-all duration-200"
        >
          <Camera className="w-4 h-4" />
        </Label>

      </div>

      {/* ============================================
          IMAGE PREVIEW
      ============================================= */}

      <div className="h-[150px] w-[150px] rounded-full border-4 border-primary/20 shadow-lg overflow-hidden bg-slate-100 dark:bg-slate-800">

        <img
          src={imagePreview}
          alt="Avatar Preview"
          className="w-full h-full object-cover"
        />

      </div>
    </div>
  );
};

export default AvatarUpload;