 import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../Compontents/Footer.jsx";
import { logout } from "../Redux/Slices/AuthSlice.js";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  const changeWidth = () => {
    const drawerSide = document.querySelector(".drawer-side");
    if (drawerSide) drawerSide.style.width = "auto";
  };

  const hideDrawer = () => {
    const drawerToggle = document.querySelector(".drawer-toggle");
    if (drawerToggle) drawerToggle.checked = false;

    const drawerSide = document.querySelector(".drawer-side");
    if (drawerSide) drawerSide.style.width = "0";
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await dispatch(logout());
    if (res?.payload?.success) navigate("/");
  };

  return (
    <div className="min-h-[90vh]">
      {/* Sidebar Drawer */}
      <div className="drawer absolute left-0 z-50 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={32}
              className="text-white m-4 font-bold"
            />
          </label>
        </div>

        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 sm:w-80 h-full bg-base-200 text-base-content relative">
            {/* Close Button */}
            <li className="absolute right-2 top-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>

            {/* Navigation Links */}
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">All Courses</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/about">About Us</Link></li>

            {isLoggedIn && role === "ADMIN" && (
              <>
                <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
                <li><Link to="/course/create">Create New Course</Link></li>
              </>
            )}

            {/* Bottom Auth Buttons */}
            <li className="absolute bottom-4 w-[90%]">
              <div className="flex flex-col items-center justify-center space-y-2">
                {!isLoggedIn ? (
                  <>
                    <Link to="/login" className="btn bg-blue-500 text-white w-full">
                      Login
                    </Link>
                    <Link to="/signup" className="btn bg-pink-600 text-white w-full">
                      Signup
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/user/profile" className="btn bg-blue-500 text-white w-full">
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="btn bg-pink-600 text-white w-full">
                      Logout
                    </button>
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomeLayout;
