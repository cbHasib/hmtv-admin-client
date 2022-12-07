import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../Pages/Dashboard/DashboardSidebar/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800">
        <div>
          <DashboardSidebar />
        </div>
        <div className="h-full min-h-screen pl-14 pt-4 pb-10 md:pl-64">
          <div className="p-4 ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
