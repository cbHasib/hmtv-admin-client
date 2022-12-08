import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";

const AddCategory = () => {
  useScrollToTop();
  useTitle("Add New Category");
  const [submitLoad, setSubmitLoad] = useState(false);
  const { register, reset, handleSubmit } = useForm();

  const navigate = useNavigate();

  const handleAddCategory = async (formData) => {
    console.log(formData);

    setSubmitLoad(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/add-category`,
        {
          method: "POST",
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

  return (
    <>
      <div className="lg:py-10 lg:px-20 mx-auto max-w-xl">
        <form
          onSubmit={handleSubmit(handleAddCategory)}
          className="flex flex-col gap-6 p-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
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
              {...register("category_name")}
            />
          </div>

          <Button type="submit" disabled={submitLoad}>
            {submitLoad ? (
              <Spinner className="w-5 h-5 mr-2" />
            ) : (
              <HiOutlinePlus className="w-5 h-5 mr-2" />
            )}
            {submitLoad ? "Adding Category..." : "Add Category"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
