import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getuserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";

function Profile() {
  const userData = useSelector((state) => state?.auth?.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleCancelation() {
    if (window.confirm("Are you sure you want to cancel the subscription?")) {
      toast("Initiating cancellation...");
      await dispatch(cancelCourseBundle());
      await dispatch(getuserData());
      toast.success("Cancellation completed!");
      navigate("/");
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800 px-4">
        <div className="w-full max-w-md bg-slate-900 text-white p-6 rounded-xl shadow-lg shadow-yellow-500/10 space-y-6">
          <div className="flex justify-center">
            <img
              src={userData?.avatar?.secure_url}
              alt="User Avatar"
              className="w-32 h-32 rounded-full border-4 border-yellow-500"
            />
          </div>

          <h2 className="text-2xl font-bold text-center capitalize text-yellow-500">
            {userData?.fullName}
          </h2>

          <div className="grid grid-cols-2 gap-y-2 text-sm sm:text-base">
            <p className="text-gray-400">Email:</p>
            <p>{userData?.email}</p>
            <p className="text-gray-400">Role:</p>
            <p className="capitalize">{userData?.role}</p>
            <p className="text-gray-400">Subscription:</p>
            <p className={userData?.subscription?.status === "active" ? "text-green-500" : "text-red-500"}>
              {userData?.subscription?.status === "active" ? "Active" : "Inactive"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/change-password" className="w-full">
              <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold py-2 rounded-md transition duration-300">
                Change Password
              </button>
            </Link>

            <Link to="/user/editprofile" className="w-full">
              <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold py-2 rounded-md transition duration-300">
                Edit Profile
              </button>
            </Link>
          </div>

          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCancelation}
              className="w-full bg-red-600 hover:bg-red-500 font-semibold py-2 rounded-md transition duration-300"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
