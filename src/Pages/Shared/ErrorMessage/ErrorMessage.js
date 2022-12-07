import React from "react";

const ErrorMessage = ({ error }) => {
  return (
    <div className="h-[70vh] bg-white dark:bg-gray-800 w-full flex justify-center items-center text-4xl font-medium text-red-700 dark:text-red-600">
      <h2>{error}</h2>
    </div>
  );
};

export default ErrorMessage;
