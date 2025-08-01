 import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isPassword } from "../../Helpers/regexMatcher";
import HomeLayout from "../../Layouts/HomeLayout";
import { changePassword } from "../../Redux/Slices/AuthSlice";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUserPassword({ ...userPassword, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!userPassword.oldPassword || !userPassword.newPassword) {
      toast.error("All fields are mandatory");
      return;
    }
    if (!isPassword(userPassword.newPassword)) {
      toast.error(
        "Password should be 6-16 characters long with at least one number and special character"
      );
      return;
    }

    const response = await dispatch(changePassword(userPassword));
    if (response?.payload?.success) {
      toast.success("Password changed successfully!");
      navigate("/user/profile");
      setUserPassword({ oldPassword: "", newPassword: "" });
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
        <form
          onSubmit={handleFormSubmit}
          className="w-full max-w-md bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700 space-y-6"
        >
          <h1 className="text-3xl font-bold text-center text-white">
            Change Password
          </h1>

          {/* Old Password */}
          <div className="space-y-2">
            <label htmlFor="oldPassword" className="text-sm font-medium text-gray-200">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              value={userPassword.oldPassword}
              onChange={handlePasswordChange}
              placeholder="Enter old password"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium text-gray-200">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={userPassword.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Back to Profile Link */}
          <Link to="/user/profile" className="flex items-center justify-center gap-2 text-yellow-500 hover:underline transition-all text-sm">
            <AiOutlineArrowLeft /> Back to Profile
          </Link>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-lg rounded-lg transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Change Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ChangePassword;
