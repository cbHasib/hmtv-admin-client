import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  HiOutlineArrowDown,
  HiOutlineArrowUp,
  HiOutlineStar,
  HiPencil,
  HiStar,
  HiTrash,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";

const Channels = () => {
  useScrollToTop();
  useTitle("Chanel List");
  const navigate = useNavigate();

  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getChannels = async () => {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tv-list`);
      const data = await response.json();
      if (data.success) {
        setChannels(data.data);
      } else {
        toast.error(data.error);
      }
      setLoading(false);
    };
    getChannels();
  }, [refresh]);

  const handleEditChannel = (id) => {
    navigate(`/update-channel/${id}`);
  };

  const handleFeaturedChannel = async (id, isFeatured) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/featured-channel/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, isFeatured }),
      }
    );
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
      const newChannels = channels.map((channel) => {
        if (channel._id === id) {
          channel.isFeatured = !channel.isFeatured;
        }
        return channel;
      });
      setChannels(newChannels);
    } else {
      toast.error(data.error);
    }
  };

  const handleDeleteChannel = async (id) => {
    const userConfirm = window.confirm("Are you sure you want to delete?");
    if (userConfirm) {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/delete-channel/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        const newChannels = channels.filter((channel) => channel._id !== id);
        setChannels(newChannels);
      } else {
        toast.error(data.error);
      }
    }
  };

  const handleSerialDown = (id, serial) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/channel-serial-down/${id}/${serial}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          setRefresh(!refresh);
        } else {
          toast.error(data.error);
        }
      });
  };

  const handleSerialUp = (id, serial) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/channel-serial-up/${id}/${serial}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          setRefresh(!refresh);
        } else {
          toast.error(data.error);
        }
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="px-5">
      <h4 className="mb-4 text-2xl font-semibold text-gray-600 dark:text-gray-300">
        All Channels
      </h4>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap ">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-700 uppercase border-b dark:border-gray-700 bg-gray-300 dark:text-gray-400 dark:bg-black">
                <th className="px-4 py-3">Serial</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Channel Link</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-900">
              {channels?.map((channel, index) => (
                <tr
                  className="text-gray-700 dark:text-gray-400"
                  key={channel?._id}
                >
                  <td className="px-4 py-3 text-xs font-bold">
                    {channel?.serial}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      {/* <!-- Avatar with inset shadow --> */}
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={channel?.channel_logo}
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">{channel.channel_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {channel?.category && channel.category.length > 0
                      ? channel.category.map((cat, index) => (
                          <p key={index}>
                            {cat}
                            {channel.category.length - 1 !== index ? ", " : ""}
                          </p>
                        ))
                      : "No Category"}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {
                      <a
                        href={channel.channel_link}
                        className="underline text-blue-700"
                      >
                        {channel.channel_link}
                      </a>
                    }
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {new Date(channel.last_updated).toLocaleString()}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <button
                        className={`${
                          channels.length === index + 1 && "hidden"
                        } flex items-center justify-between py-2 text-sm font-medium leading-5 text-orange-500 rounded-lg dark:text-gray-400 dark:hover:text-white hover:text-orange-900 focus:outline-none focus:shadow-outline-gray`}
                        aria-label="Edit"
                        title={channel?.serial}
                        disabled={channels.length === index + 1}
                        onClick={() =>
                          handleSerialDown(channel?._id, channel?.serial)
                        }
                      >
                        {<HiOutlineArrowDown className="w-5 h-5" />}
                      </button>
                      <button
                        className={`${
                          index === 0 && "hidden"
                        } flex items-center justify-between py-2 text-sm font-medium leading-5 text-orange-500 rounded-lg dark:text-gray-400 dark:hover:text-white hover:text-orange-900 focus:outline-none focus:shadow-outline-gray`}
                        aria-label="Down"
                        disabled={index === 0}
                        title={channel?.serial}
                        onClick={() =>
                          handleSerialUp(channel?._id, channel?.serial)
                        }
                      >
                        {<HiOutlineArrowUp className="w-5 h-5" />}
                      </button>
                      <button
                        className="flex items-center justify-between py-2 text-sm font-medium leading-5 text-orange-500 rounded-lg dark:text-gray-400 dark:hover:text-white hover:text-orange-900 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                        title={
                          channel?.isFeatured
                            ? "Remove from Featured"
                            : "Make Featured"
                        }
                        onClick={() =>
                          handleFeaturedChannel(
                            channel?._id,
                            !channel?.isFeatured
                          )
                        }
                      >
                        {channel?.isFeatured ? (
                          <HiStar className="w-5 h-5" />
                        ) : (
                          <HiOutlineStar className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        className="flex items-center justify-between py-2 text-sm font-medium leading-5 text-blue-700 rounded-lg dark:text-gray-400 dark:hover:text-white hover:text-blue-900 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Edit"
                        title="Edit This Channel"
                        onClick={() => handleEditChannel(channel?._id)}
                      >
                        <HiPencil className="w-5 h-5" />
                      </button>
                      <button
                        className="flex items-center justify-between py-2 text-sm font-medium leading-5 text-blue-700 rounded-lg dark:text-gray-400 dark:hover:text-white hover:text-blue-900 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                        title="Delete This Channel"
                        onClick={() => handleDeleteChannel(channel?._id)}
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

export default Channels;
