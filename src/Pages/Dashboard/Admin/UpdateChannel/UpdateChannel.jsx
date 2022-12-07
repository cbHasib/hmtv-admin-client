import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineCloudUpload, HiOutlineRefresh } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/UserContext";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";

const UpdateChannel = () => {
  useScrollToTop();
  const [channelLogo, setChannelLogo] = useState("");
  const [uploadFiles, setUploadFiles] = useState([]);
  const [submitLoad, setSubmitLoad] = useState(false);
  const { register, reset, handleSubmit } = useForm();
  const [channel, setChannel] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const { loading } = useContext(AuthContext);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const getChannel = async () => {
      setLoadingData(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/channel/${id}`
      );
      const data = await response.json();
      if (data.success) {
        setChannel(data.data);
        setChannelLogo(data.data.channel_logo);
      } else {
        toast.error(data.message);
        navigate("/channels");
      }
      setLoadingData(false);
    };
    getChannel();
  }, [id, navigate]);

  useTitle("Add New Channel");

  const handleUpdateChannel = async (data) => {
    setSubmitLoad(true);
    if (uploadFiles.length > 0) {
      const formData = new FormData();
      formData.append("image", uploadFiles[0]);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}&name=${data.channel_name}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imgData = await response.json();

      if (imgData.success) {
        data.channel_logo = imgData.data.display_url;
      }
    } else {
      setSubmitLoad(false);
      data.channel_logo = channel.channel_logo;
    }

    const newData = { ...data };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/update-channel/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        reset();
        setChannelLogo("");
        setUploadFiles([]);
        setChannel({});
        navigate("/channels");
      } else {
        toast.error(data.error);
      }
      setSubmitLoad(false);
    } catch (error) {
      toast.error(error.message);
      setSubmitLoad(false);
    }
  };

  if (loading || loadingData) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="lg:py-10 lg:px-20 mx-auto">
        <form
          onSubmit={handleSubmit(handleUpdateChannel)}
          className="flex flex-col gap-4 p-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <div>
            <div className="mb-2 block w-full">
              <Label htmlFor="channel_name" value="Channel Name" />
            </div>
            <TextInput
              id="channel_name"
              type="text"
              placeholder="GTV HD"
              required={true}
              shadow={true}
              defaultValue={channel.channel_name}
              {...register("channel_name")}
            />
          </div>

          <div>
            <div className="mb-2 block w-full">
              <Label htmlFor="channel_link" value="Channel Link" />
            </div>
            <TextInput
              id="channel_link"
              defaultValue={channel.channel_link}
              type="url"
              placeholder="https://stream.sunplex.live/T-SPORTS/index.m3u8"
              required={true}
              shadow={true}
              {...register("channel_link")}
            />
          </div>

          <div>
            <div className="mb-2 block w-full">
              <Label
                htmlFor="channel_category"
                value={`Channel Category (Previously: ${
                  channel?.category && channel?.category?.length > 0
                    ? channel?.category?.map((cat, idx) => {
                        return `${cat}${
                          idx === channel.category.length - 1 ? "" : ", "
                        }`;
                      })
                    : "No Category"
                })`}
              />
            </div>
            <div className="flex gap-4" id="checkbox">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="Bangladeshi"
                  value="Bangladeshi"
                  {...register("category")}
                />
                <Label htmlFor="Bangladeshi">Bangladeshi</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="News" value="News" {...register("category")} />
                <Label htmlFor="News">News</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="Sports"
                  value="Sports"
                  {...register("category")}
                />
                <Label htmlFor="Sports">Sports</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="Indian"
                  value="Indian"
                  {...register("category")}
                />
                <Label htmlFor="Indian">Indian</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="Entertainment"
                  value="Entertainment"
                  {...register("category")}
                />
                <Label htmlFor="Entertainment">Entertainment</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="Music" value="Music" {...register("category")} />
                <Label htmlFor="Music">Music</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="Hollywood"
                  value="Hollywood"
                  {...register("category")}
                />
                <Label htmlFor="Hollywood">Hollywood</Label>
              </div>
            </div>
          </div>

          <div className="flex flex-col mb-2 overflow-hidden">
            <div className="flex items-center justify-center w-full relative">
              <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
              >
                {channelLogo && (
                  <img
                    src={channelLogo}
                    alt=""
                    className="absolute w-full h-full rounded-lg object-cover opacity-50"
                    aria-disabled
                  />
                )}

                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <HiOutlineCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                    <span className="font-semibold">
                      Click to upload a Channel Logo
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Only Image file is allowed
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  className="opacity-0 absolute z-10 h-full w-full cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                      if (file.type.includes("image")) {
                        setUploadFiles(e.target.files);
                        const url = URL.createObjectURL(file);
                        setChannelLogo(url);
                      } else {
                        toast.error("Only Image file is allowed");
                      }
                    } else {
                      setChannelLogo(null);
                      setUploadFiles([]);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <Button type="submit" disabled={submitLoad}>
            {submitLoad ? (
              <Spinner className="w-5 h-5 mr-2" />
            ) : (
              <HiOutlineRefresh className="w-5 h-5 mr-2" />
            )}
            {submitLoad ? "Updating Channel..." : "Update Channel"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default UpdateChannel;
