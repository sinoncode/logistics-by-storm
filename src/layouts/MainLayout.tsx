import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import SidebarLayout from "./SidebarLayout";

import NotificationInitializer from "@/components/NotificationInitializer";

const MainLayout = () => {
  return (
    <SidebarLayout>

      <NotificationInitializer />

      <div className="flex flex-col min-h-full">
        <Header />

        <div className="dashboard-body bg-neutral-100 dark:bg-[#1e2734] md:p-6 p-4 flex-1">
          <Outlet />
        </div>

        <Footer />
      </div>

    </SidebarLayout>
  );
};

export default MainLayout;