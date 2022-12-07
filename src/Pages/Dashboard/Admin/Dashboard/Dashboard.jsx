import React, { useEffect, useState } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";
import ErrorMessage from "../../../Shared/ErrorMessage/ErrorMessage";

const Dashboard = () => {
  const [errorMessages, setErrorMessages] = useState("");
  const [counts, setCounts] = useState(0);
  const [loading, setLoading] = useState(false);

  useScrollToTop();
  useTitle("Dashboard");

  useEffect(() => {
    const getDashboardData = async () => {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/channelCount`
      );
      const data = await response.json();
      if (data.success) {
        setCounts(data.data);
      } else {
        setErrorMessages(data.error);
      }
      setLoading(false);
    };
    getDashboardData();
  }, []);

  if (errorMessages) {
    return <ErrorMessage error={errorMessages} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-blue-500 dark:bg-gray-900 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
        <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
          <HiOutlineVideoCamera className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out w-8 h-8" />
        </div>
        <div className="text-right">
          <p className="text-2xl">{loading ? "Loading..." : counts}</p>
          <p>Channels</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
