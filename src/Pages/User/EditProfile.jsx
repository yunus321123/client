 import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getuserData, updateProfile } from "../../Redux/Slices/AuthSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state?.auth?.data?._id);
  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    userId,
  });

  function handleImageUpload(e) {
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.onload = function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      };
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }

    if (data.fullName.length < 5) {
      toast.error("Name must be at least 5 characters long");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    await dispatch(updateProfile(formData));
    await dispatch(getuserData());

    navigate("/user/profile");
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center px-4 py-10">
        <form
          onSubmit={onFormSubmit}
          className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-xl shadow-[0_0_15px_#00000080] text-white space-y-6"
        >
          <h1 className="text-2xl font-bold text-center">Edit Profile</h1>

          <label htmlFor="image_uploads" className="cursor-pointer flex justify-center">
            {data.previewImage ? (
              <img
                src={data.previewImage}
                alt="Avatar Preview"
                className="w-28 h-28 rounded-full object-cover border-2 border-yellow-500"
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 text-gray-400" />
            )}
          </label>

          <input
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png, .svg"
            className="hidden"
            onChange={handleImageUpload}
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm font-semibold text-gray-200">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your full name"
              value={data.fullName}
              onChange={handleInputChange}
              className="bg-transparent border border-gray-400 rounded-md px-3 py-2 placeholder-gray-300 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-yellow-600 hover:bg-yellow-500 transition-all font-semibold text-lg"
          >
            Update Profile
          </button>

          <Link
            to="/user/profile"
            className="flex items-center justify-center gap-2 text-yellow-400 hover:text-yellow-500 text-sm font-medium transition-all"
          >
            <AiOutlineArrowLeft /> Go back to profile
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;
