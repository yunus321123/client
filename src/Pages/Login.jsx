 import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function onLogin(event) {
    event.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    const response = await dispatch(login(loginData));
    if (response?.payload?.success) {
      navigate("/");
      setLoginData({ email: "", password: "" });
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-r from-slate-900 to-slate-800 px-4">
        <form
          noValidate
          onSubmit={onLogin}
          className="w-full max-w-md bg-slate-900 p-6 rounded-xl shadow-lg shadow-yellow-500/10 text-white space-y-5"
        >
          <h1 className="text-3xl font-bold text-center text-yellow-500">Login to Account</h1>

          <div className="space-y-1">
            <label htmlFor="email" className="font-semibold">Email</label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={handleUserInput}
              value={loginData.email}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="font-semibold">Password</label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={handleUserInput}
              value={loginData.password}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-2 rounded-md transition-all duration-300"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-300">
            <Link to="/forget-password" className="text-yellow-400 hover:underline">
              Forgot Password?
            </Link>
          </p>

          <p className="text-center text-sm text-gray-300">
            Don't have an account?{" "}
            <Link to="/signup" className="text-yellow-400 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
