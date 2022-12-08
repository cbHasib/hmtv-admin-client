import React, { useContext } from "react";
import {
  HiOutlineHome,
  HiOutlineLogout,
  HiOutlinePlus,
  HiOutlineVideoCamera,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Contexts/UserContext";

const DashboardSidebar = () => {
  const { logout } = useContext(AuthContext);

  const adminMenu = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:bg-gray-600 text-white-800 border-l-4 border-transparent border-blue-400 dark:border-gray-800 pr-6"
              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <HiOutlineHome className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            isActive
              ? "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:bg-gray-600 text-white-800 border-l-4 border-transparent border-blue-400 dark:border-gray-800 pr-6"
              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <HiOutlineViewGrid className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">
            Categories
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/channels"
          className={({ isActive }) =>
            isActive
              ? "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:bg-gray-600 text-white-800 border-l-4 border-transparent border-blue-400 dark:border-gray-800 pr-6"
              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <HiOutlineVideoCamera className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">Channels</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/add-channel"
          className={({ isActive }) =>
            isActive
              ? "relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:bg-gray-600 text-white-800 border-l-4 border-transparent border-blue-400 dark:border-gray-800 pr-6"
              : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
          }
        >
          <span className="inline-flex justify-center items-center ml-4">
            <HiOutlinePlus className="w-5 h-5" />
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">
            Add Channel
          </span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed flex flex-col top-0 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-300 uppercase">
                Main
              </div>
            </div>
          </li>

          {adminMenu}

          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center mt-5 h-8">
              <div className="text-sm font-light tracking-wide text-gray-300 uppercase">
                Settings
              </div>
            </div>
          </li>

          <li>
            <button
              onClick={logout}
              className="relative w-full flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <HiOutlineLogout className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Logout
              </span>
            </button>
          </li>
        </ul>
        <p className="mb-5 px-5 py-3 hidden md:block text-center text-xs">
          Copyright © 2022 HMTV. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default DashboardSidebar;
