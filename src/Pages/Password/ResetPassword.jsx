 import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { isPassword } from "../../Helpers/regexMatcher";
import HomeLayout from "../../Layouts/HomeLayout";
import { resetPassword } from "../../Redux/Slices/AuthSlice";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const [data, setData] = useState({
    password: "",
    cnfPassword: "",
    resetToken,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!data.password || !data.cnfPassword || !data.resetToken) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!isPassword(data.password)) {
      toast.error(
        "Password should be 6-16 characters with at least a number and special character"
      );
      return;
    }

    if (data.password !== data.cnfPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const response = await dispatch(resetPassword(data));
    if (response?.payload?.success) {
      toast.success("Password reset successfully");
      navigate("/login");
      setData({ password: "", cnfPassword: "", resetToken: "" });
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh] px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <form
          onSubmit={handleFormSubmit}
          className="w-full max-w-md bg-white/5 backdrop-blur-md border border-gray-600 p-8 rounded-2xl shadow-xl text-white space-y-6"
        >
          <h1 className="text-3xl font-bold text-center text-yellow-400">
            Reset Password
          </h1>

          {/* New Password */}
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter new password"
              className="px-4 py-2 rounded-md bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              value={data.password}
              onChange={handleUserInput}
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 cursor-pointer text-xl text-gray-300"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="cnfPassword" className="text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              type={showCnfPassword ? "text" : "password"}
              name="cnfPassword"
              id="cnfPassword"
              placeholder="Confirm your new password"
              className="px-4 py-2 rounded-md bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              value={data.cnfPassword}
              onChange={handleUserInput}
            />
            <div
              onClick={() => setShowCnfPassword((prev) => !prev)}
              className="absolute right-3 top-9 cursor-pointer text-xl text-gray-300"
            >
              {showCnfPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-lg font-semibold transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ResetPassword;
