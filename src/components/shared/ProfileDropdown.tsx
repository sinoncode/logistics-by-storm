import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import {
  LogOutIcon,
  Settings,
  User,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileDropdown = () => {

  const navigate = useNavigate();

  const [loggingOut, setLoggingOut] = useState(false);

  // Get user from localStorage
  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  // Logout
  const handleLogout = () => {

    setLoggingOut(true);

    setTimeout(() => {

      // Remove auth data
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      toast.success("You logged out successfully.");

      navigate("/auth/login");

      setLoggingOut(false);

    }, 800);
  };

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>

        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full sm:w-10 sm:h-10 w-8 h-8 bg-gray-200/75 hover:bg-slate-200 focus-visible:ring-0 dark:bg-slate-700 dark:hover:bg-slate-600 border-0 cursor-pointer data-[state=open]:bg-gray-300 data-[state=open]:ring-4 data-[state=open]:ring-slate-300 dark:data-[state=open]:ring-slate-500 dark:data-[state=open]:bg-slate-600 text-primary font-bold hover:text-primary"
          )}
        >

          {user?.name?.[0]?.toUpperCase() || "U"}

        </Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="sm:w-[300px] min-w-[250px] right-[40px] absolute p-4 rounded-2xl overflow-hidden shadow-lg"
        side="bottom"
        align="end"
      >

        {/* USER INFO */}
        <div className="py-3 px-4 rounded-lg bg-primary/10 flex items-center justify-between">

          <div>

            <h6 className="text-lg text-neutral-900 dark:text-white font-semibold mb-0">
              {user?.name || "User"}
            </h6>

            <span className="text-sm text-neutral-500 dark:text-neutral-300">
              {user?.role?.[0] || "Admin"}
            </span>

          </div>

        </div>

        {/* MENU */}
        <div className="max-h-[400px] overflow-y-auto scroll-sm pt-4">

          <ul className="flex flex-col gap-3">

            <li className="flex">

              <Link
                to="/view-profile"
                className="text-black dark:text-white hover:text-primary dark:hover:text-primary flex items-center gap-3 w-full"
              >
                <User className="w-5 h-5" />
                My Profile
              </Link>

            </li>

            <li className="flex">

              <Link
                to="/company"
                className="text-black dark:text-white hover:text-primary dark:hover:text-primary flex items-center gap-3 w-full"
              >
                <Settings className="w-5 h-5" />
                Settings
              </Link>

            </li>

            <li className="flex ms-[2px]">

              <Button
                variant="ghost"
                className={`!p-0 h-auto w-full justify-start font-normal !bg-transparent cursor-pointer dark:text-neutral-200 flex items-center gap-3 text-[16px] hover:text-red-600 focus:text-red-600 ${
                  loggingOut
                    ? "text-red-600"
                    : "text-black"
                }`}
                onClick={handleLogout}
              >

                <LogOutIcon className="size-5" />

                {loggingOut
                  ? "Logging out..."
                  : "Logout"}

              </Button>

            </li>

          </ul>

        </div>

      </DropdownMenuContent>

    </DropdownMenu>
  );
};

export default ProfileDropdown;