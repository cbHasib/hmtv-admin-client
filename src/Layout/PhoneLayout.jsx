import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Pages/Phones/Sidebar/Sidebar";
import Footer from "../Pages/Shared/Footer/Footer";
import Header from "../Pages/Shared/Header/Header";

const PhoneLayout = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-200 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-10 px-5">
          <div className="flex flex-col lg:flex-row gap-10">
            <div>
              <div className="lg:sticky lg:top-20">
                <Sidebar />
              </div>
            </div>
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PhoneLayout;
