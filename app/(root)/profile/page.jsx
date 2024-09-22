"use client";

import Loader from "@components/Loader";
import { PersonOutline } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      reset({
        username: user?.username,
        profileImage: user?.profileImage,
      });
    }
    setLoading(false);
  }, [user]);

  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { error },
  } = useForm();

  const uploadPhoto = (result) => {
    setValue("profileImage", result?.info?.secure_url);
  };

  const updateUser = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user._id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="profile-page bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-newgreen mb-6 text-center">
        Edit Your Profile
      </h1>

      <form
        className="edit-profile flex flex-col gap-6 "
        onSubmit={handleSubmit(updateUser)}
      >
        {/* Username input field */}
        <div className="input flex items-center gap-2 border rounded-lg p-3 bg-white shadow-sm">
          <input
            {...register("username", {
              required: "Username is required",
              validate: (value) => {
                if (value.length < 3) {
                  return "Username must be at least 3 characters";
                }
              },
            })}
            type="text"
            placeholder="Username"
            className="w-full outline-none bg-transparent text-gray-700"
          />
          <PersonOutline sx={{ color: "#737373" }} />
        </div>
        {error?.username && (
          <p className="text-red-500">{error.username.message}</p>
        )}

        {/* Profile picture upload*/}
        <div className="flex items-center justify-between gap-6">
          <img
            src={
              watch("profileImage") ||
              user?.profileImage ||
              "/assets/person.jpg"
            }
            alt="profile"
            className="w-40 h-40 rounded-full border shadow-md"
          />
          <CldUploadButton
            options={{ maxFiles: 1 }}
            onUpload={uploadPhoto}
            uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
          >
            <button className="bg-neworange text-white py-2 px-4 rounded-md shadow-md hover:bg-newgreen transition">
              Upload new photo
            </button>
          </CldUploadButton>
        </div>

        {/* save changes button. */}
        <button
          className="bg-newgreen text-white py-3 rounded-md shadow-md hover:bg-neworange transition w-full"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
