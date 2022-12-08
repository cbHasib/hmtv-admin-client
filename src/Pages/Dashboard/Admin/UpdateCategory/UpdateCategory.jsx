import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/UserContext";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";

const UpdateCategory = () => {
  useScrollToTop();
  const [submitLoad, setSubmitLoad] = useState(false);
  const { register, reset, handleSubmit } = useForm();
  const [category, setCategory] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const { loading } = useContext(AuthContext);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const getCategory = async () => {
      setLoadingData(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/category/${id}`
      );
      const data = await response.json();
      if (data.success) {
        setCategory(data.data);
      } else {
        toast.error(data.error);
        navigate("/categories");
      }
      setLoadingData(false);
    };
    getCategory();
  }, [id, navigate]);

  useTitle("Add New Category");

  const handleUpdateCategory = async (formData) => {
    setSubmitLoad(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/update-category/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        reset();
        setCategory({});
        navigate("/categories");
      } else {
        toast.error(data.error);
      }
      setSubmitLoad(false);
    } catch (error) {
      toast.error(error.message);
      setSubmitLoad(false);
    }
  };

  useTitle(`Update Category`);
  if (loading || loadingData) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="lg:py-10 lg:px-20 mx-auto">
        <form
          onSubmit={handleSubmit(handleUpdateCategory)}
          className="flex flex-col gap-6 p-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg  max-w-lg mx-auto"
        >
          <div>
            <div className="mb-2 block w-full">
              <Label htmlFor="category_name" value="Category Name" />
            </div>
            <TextInput
              id="category_name"
              type="text"
              placeholder="Sports"
              required={true}
              shadow={true}
              defaultValue={category.category_name}
              {...register("category_name")}
            />
          </div>

          <Button type="submit" disabled={submitLoad}>
            {submitLoad ? (
              <Spinner className="w-5 h-5 mr-2" />
            ) : (
              <HiOutlineCloudUpload className="w-5 h-5 mr-2" />
            )}
            {submitLoad ? "Updating Category..." : "Update Category"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default UpdateCategory;
