import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";

const Categories = () => {
  useScrollToTop();
  useTitle("Category List");
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/category-list`
      );
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      } else {
        toast.error(data.error);
      }
      setLoading(false);
    };
    getCategories();
  }, []);

  const handleEdit = (id) => {
    navigate(`/update-category/${id}`);
  };

  const handleDelete = async (id) => {
    const userConfirm = window.confirm("Are you sure you want to delete?");
    if (userConfirm) {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/delete-category/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        const newCategories = categories.filter(
          (category) => category._id !== id
        );
        setCategories(newCategories);
      } else {
        toast.error(data.error);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="px-5">
      <h4 className="mb-4 text-2xl font-semibold text-gray-600 dark:text-gray-300">
        Category List
      </h4>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap ">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-700 uppercase border-b dark:border-gray-700 bg-gray-300 dark:text-gray-400 dark:bg-black">
                <th className="px-4 py-3">Serial</th>
                <th className="px-4 py-3">Category Name</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-900">
              {categories?.map((category, index) => (
                <tr
                  className="text-gray-700 dark:text-gray-400"
                  key={category?._id}
                >
                  <td className="px-4 py-3 text-xs font-bold">{index + 1}</td>

                  <td className="px-4 py-3 text-xs">
                    {category.category_name}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {new Date(category.last_updated).toLocaleString()}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <button
                        className="flex items-center justify-between py-2 text-sm font-medium leading-5 text-blue-700 rounded-lg dark:text-gray-400 dark:hover:text-white hover:text-blue-900 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                        title="Edit This Category"
                        onClick={() => handleEdit(category?._id)}
                      >
                        <HiPencil className="w-5 h-5" />
                      </button>
                      <button
                        className="flex items-center justify-between py-2 text-sm font-medium leading-5 text-blue-700 rounded-lg dark:text-gray-400 dark:hover:text-white hover:text-blue-900 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                        title="Delete This Category"
                        onClick={() => handleDelete(category?._id)}
                      >
                        <HiTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;
