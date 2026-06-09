import { useEffect } from "react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

import {
  Bell,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useNotificationStore } from "@/store/notificationStore";

const NotificationDropdown = () => {
  const notifications = useNotificationStore(
    (state) => state.notifications
  );

  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications
  );

  const clearNotifications = useNotificationStore(
    (state) => state.clearNotifications
  );

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className={cn(
            "rounded-[50%] sm:w-10 sm:h-10 w-8 h-8 text-neutral-900 dark:text-white bg-gray-200/75 hover:bg-gray-200 focus-visible:ring-0 dark:bg-slate-600 dark:hover:bg-slate-500 border-0 cursor-pointer data-[state=open]:bg-gray-300 dark:data-[state=open]:bg-slate-500"
          )}
        >
          <Bell className="h-[5.2rem] w-[5.2rem]" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="sm:w-[400px] max-h-[unset] me-6 p-0 rounded-2xl overflow-hidden shadow-lg block">
        <div>
          {/* Header */}
          <div className="py-3 px-4 rounded-lg bg-primary/10 dark:bg-primary/25 m-4 flex items-center justify-between">
            <h6 className="text-lg font-semibold">
              Notifications
            </h6>

            <div className="flex items-center gap-2">
              <span className="sm:w-10 sm:h-10 w-8 h-8 bg-white dark:bg-slate-800 text-primary font-bold flex justify-center items-center rounded-full">
                {notifications.length}
              </span>

            
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
            {notifications.length === 0 ? (
              <div className="py-5 text-center text-muted-foreground">
                No notifications found
              </div>
            ) : (
              notifications.map((notification) => (
                <div
  key={notification.id}
  className="
    group
    mx-2
    my-2
    rounded-2xl
    border
    border-transparent
    hover:border-primary/10
    hover:bg-primary/5
    transition-all
    duration-200
  "
>
  <div className="flex items-center justify-between gap-3 p-4">

    <Link
      to={notification.action_url}
      className="flex-1 min-w-0"
    >
      <div className="flex items-start gap-3">

        <div
          className="
            shrink-0
            w-12
            h-12
            rounded-2xl
            bg-primary/10
            text-primary
            flex
            items-center
            justify-center
          "
        >
          <Bell className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">

          <div className="flex items-center gap-2">

            <h6
              className="
                text-sm
                font-semibold
                text-neutral-900
                dark:text-white
                truncate
              "
            >
              {notification.title}
            </h6>

            <span
              className="
                h-2
                w-2
                rounded-full
                bg-primary
                shrink-0
              "
            />
          </div>

          <p
            className="
              mt-1
              text-sm
              text-muted-foreground
              line-clamp-2
            "
          >
            {notification.message}
          </p>


        </div>
      </div>
    </Link>

    <button
      type="button"
      className="
        opacity-0
        group-hover:opacity-100
        transition-all
        duration-200
        shrink-0
        w-9
        h-9
        rounded-full
        bg-red-50
        text-red-500
        hover:bg-red-500
        hover:text-white
        flex
        items-center
        justify-center
      "
    >
      <Trash2 className="w-4 h-4" />
    </button>

  </div>
</div>
              ))
            )}
          </div>

          <div className="text-center flex justify-center py-3 px-4 border-t">
       <Button
  variant="ghost"
  onClick={clearNotifications}
  className="flex border border-red-500 items-center gap-2 text-red-500 font-semibold"
>
  <Trash2 className="w-4 h-4" />
  Clear All Notifications
</Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;