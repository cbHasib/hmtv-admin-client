import { Button, Card, Spinner } from "flowbite-react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { HiBadgeCheck } from "react-icons/hi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Contexts/UserContext";
import useDbUser from "../../../hooks/useDbUser";
import useScrollToTop from "../../../hooks/useScrollToTop";
import useTitle from "../../../hooks/useTitle";
import ErrorMessage from "../../Shared/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const DashboardHome = () => {
  const { user, loading } = useContext(AuthContext);
  const [dbUser, isDbUserLoading] = useDbUser(user?.email);

  const [VerifyLoading, setVerifyLoading] = useState(false);

  useScrollToTop();
  useTitle("Dashboard");

  if (loading || isDbUserLoading) return <LoadingSpinner />;

  if (!dbUser) return <ErrorMessage error="User not found" />;

  const handleVerificationRequest = (id) => {
    setVerifyLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/users/verification-request/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email: dbUser.email,
        image: dbUser.image,
        name: dbUser.name,
        phone: dbUser.phone,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.error);
        }
        setVerifyLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setVerifyLoading(false);
      });
  };

  return (
    <div className="max-w-screen">
      <Card>
        <div className="flex flex-col items-center pb-10">
          <h1 className="text-2xl font-bold mb-5 dark:text-white">
            Welcome{" "}
            <span className="text-blue-600 dark:text-blue-500">
              {dbUser?.name}
            </span>{" "}
          </h1>
          <img
            className="mb-3 h-36 w-3h-36 rounded-full shadow-lg"
            src={dbUser?.image}
            alt={dbUser?.name}
          />
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center gap-2">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {dbUser?.name}
              </h5>
              {dbUser?.isVerified && (
                <HiBadgeCheck className="text-green-500 text-2xl" />
              )}
            </div>
            {dbUser.role === "seller" && !dbUser.isVerified && (
              <Button
                size="xs"
                className="ml-2"
                color="warning"
                disabled={VerifyLoading}
                onClick={() => handleVerificationRequest(dbUser?._id)}
              >
                {VerifyLoading ? (
                  <Spinner className="mr-1 w-3 h-3" />
                ) : (
                  <HiBadgeCheck className="mr-1" />
                )}
                {VerifyLoading ? "Verifying..." : "Verify Your Account"}
              </Button>
            )}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {dbUser?.email}
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <Link
              to="/dashboard/profile"
              className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              My Profile
            </Link>
            <Link
              to="/dashboard/update-profile"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Update Profile
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardHome;
