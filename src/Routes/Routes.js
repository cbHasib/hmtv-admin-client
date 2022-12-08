import DashboardLayout from "../Layout/DashboardLayout";
import Login from "../Pages/Auth/Login/Login";
import AddCategory from "../Pages/Dashboard/Admin/AddCategory/AddCategory";
import AddChannel from "../Pages/Dashboard/Admin/AddChannel/AddChannel";
import Categories from "../Pages/Dashboard/Admin/Categories/Categories";
import Channels from "../Pages/Dashboard/Admin/Channels/Channels";
import Dashboard from "../Pages/Dashboard/Admin/Dashboard/Dashboard";
import UpdateCategory from "../Pages/Dashboard/Admin/UpdateCategory/UpdateCategory";
import UpdateChannel from "../Pages/Dashboard/Admin/UpdateChannel/UpdateChannel";
import Profile from "../Pages/Dashboard/Profile/Profile/Profile";
import UpdateProfile from "../Pages/Dashboard/Profile/UpdateProfile/UpdateProfile";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");

const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },

      {
        path: "/channels",
        element: <Channels />,
      },
      {
        path: "/add-channel",
        element: <AddChannel />,
      },
      {
        path: "/update-channel/:id",
        element: <UpdateChannel />,
      },
      {
        path: "/add-category",
        element: <AddCategory />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/update-category/:id",
        element: <UpdateCategory />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
]);

export default Routes;
