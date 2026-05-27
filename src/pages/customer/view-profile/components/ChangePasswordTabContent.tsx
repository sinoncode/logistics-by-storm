import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import api from "@/lib/axios";

const ChangePasswordTabContent = () => {
  /* =========================================
     STATES
  ========================================= */

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<any>({});

  /* =========================================
     HANDLE UPDATE PASSWORD
  ========================================= */

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};

    if (!currentPassword) {
      newErrors.current_password = "Current password is required";
    }

    if (!newPassword) {
      newErrors.new_password = "New password is required";
    } else if (newPassword.length < 6) {
      newErrors.new_password =
        "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirm_password =
        "Confirm password is required";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirm_password =
        "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await api.put("/update-password", {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      });

      toast.success(
        response?.data?.message ||
          "Password updated successfully"
      );

      // RESET FORM
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
    } catch (error: any) {
      console.error("Update Password Error:", error);

      const apiErrors =
        error?.response?.data?.errors || {};
      setErrors(apiErrors);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdatePassword}>
      {/* CURRENT PASSWORD */}
      <div className="mb-5">
        <Label className="text-sm mb-2 block">
          Current Password *
        </Label>

        <div className="relative">
          <Input
            type={
              showCurrentPassword ? "text" : "password"
            }
            value={currentPassword}
            placeholder="Enter Current Password"
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              setErrors((prev: any) => ({
                ...prev,
                current_password: null,
              }));
            }}
            className="pe-12"
          />

          <Button
            type="button"
            onClick={() =>
              setShowCurrentPassword(!showCurrentPassword)
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 !p-0 bg-transparent hover:bg-transparent text-muted-foreground h-[unset]"
          >
            {showCurrentPassword ? <EyeOff /> : <Eye />}
          </Button>
        </div>

        {errors?.current_password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.current_password}
          </p>
        )}
      </div>

      {/* NEW PASSWORD */}
      <div className="mb-5">
        <Label className="text-sm mb-2 block">
          New Password *
        </Label>

        <div className="relative">
          <Input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            placeholder="Enter New Password"
            onChange={(e) => {
              setNewPassword(e.target.value);
              setErrors((prev: any) => ({
                ...prev,
                new_password: null,
              }));
            }}
            className="pe-12"
          />

          <Button
            type="button"
            onClick={() =>
              setShowNewPassword(!showNewPassword)
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 !p-0 bg-transparent hover:bg-transparent text-muted-foreground h-[unset]"
          >
            {showNewPassword ? <EyeOff /> : <Eye />}
          </Button>
        </div>

        {errors?.new_password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.new_password}
          </p>
        )}
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="mb-6">
        <Label className="text-sm mb-2 block">
          Confirm Password *
        </Label>

        <div className="relative">
          <Input
            type={
              showConfirmPassword ? "text" : "password"
            }
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors((prev: any) => ({
                ...prev,
                confirm_password: null,
              }));
            }}
            className="pe-12"
          />

          <Button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 !p-0 bg-transparent hover:bg-transparent text-muted-foreground h-[unset]"
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </Button>
        </div>

        {errors?.confirm_password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirm_password}
          </p>
        )}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3">
        <Button
          type="reset"
          variant="outline"
          onClick={() => {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setErrors({});
          }}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Updating...
            </>
          ) : (
            "Update Password"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordTabContent;