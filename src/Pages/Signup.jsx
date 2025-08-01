 import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail, isPassword } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";
import { creatAccount } from "../Redux/Slices/AuthSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [prevImage, setPrevImage] = useState("");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function getImage(event) {
    event.preventDefault();
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPrevImage(this.result);
      });
    }
  }

  async function createNewAccount(event) {
    event.preventDefault();

    if (!signupData.email || !signupData.fullName || !signupData.avatar || !signupData.password) {
      toast.error("Please fill all the details");
      return;
    }

    if (signupData.fullName.length < 5) {
      toast.error("Name should be at least 5 characters");
      return;
    }

    if (!isEmail(signupData.email)) {
      toast.error("Invalid email id");
      return;
    }

    if (!isPassword(signupData.password)) {
      toast.error("Password should be 6-16 characters with a number & special character");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    const response = await dispatch(creatAccount(formData));
    if (response?.payload?.success) {
      navigate("/");
      setSignupData({ fullName: "", email: "", password: "", avatar: "" });
      setPrevImage("");
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-r from-slate-900 to-slate-800 px-4">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="w-full max-w-md bg-slate-900 p-6 rounded-xl shadow-lg shadow-yellow-500/10 text-white space-y-5"
        >
          <h1 className="text-3xl font-bold text-center text-blue-600">Register Account</h1>

          <label htmlFor="image_uploads" className="cursor-pointer flex justify-center">
            {prevImage ? (
              <img className="w-24 h-24 rounded-full object-cover border-4 border-blue-500" src={prevImage} alt="avatar preview" />
            ) : (
              <BsPersonCircle className="w-24 h-24 " />
            )}
          </label>

          <input
            className="hidden"
            type="file"
            name="image_uploads"
            id="image_uploads"
            accept=".jpg, .jpeg, .png, .svg"
            onChange={getImage}
          />

          <div className="space-y-1">
            <label htmlFor="fullName" className="font-semibold">Name</label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter your full name"
              className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={handleUserInput}
              value={signupData.fullName}
            />
          </div>

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
              value={signupData.email}
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
              value={signupData.password}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-2 rounded-md transition-all duration-300"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
