 import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { isEmail } from "../../Helpers/regexMatcher";
import HomeLayout from "../../Layouts/HomeLayout";
import { forgetPassword } from "../../Redux/Slices/AuthSlice";

function ForgetPassword() {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!data.email) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!isEmail(data.email)) {
      toast.error("Invalid email ID");
      return;
    }

    const response = await dispatch(forgetPassword(data));
    if (response?.payload?.success) {
      toast.success("Verification link sent to your email.");
      setData({ email: "" });
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh] px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <form
          onSubmit={handleFormSubmit}
          className="w-full max-w-md bg-white/5 backdrop-blur-md border border-gray-600 p-8 rounded-2xl shadow-xl text-white space-y-6"
        >
          <h1 className="text-3xl font-bold text-center text-yellow-400">Forgot Password</h1>

          <p className="text-sm text-gray-300 text-center">
            Enter your registered email. We'll send you a verification link to reset your password.
          </p>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="your@email.com"
              className="px-4 py-2 rounded-md bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              value={data.email}
              onChange={(e) => setData({ email: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-lg font-semibold transition duration-300"
          >
            Get Verification Link
          </button>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ForgetPassword;
