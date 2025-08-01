 import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CourseDescripition() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { role, data } = useSelector((state) => state.auth);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 px-4 md:px-20 text-white flex items-center justify-center">
        <div className="bg-gray-900 md:shadow-[0_0_15px_black] rounded-lg w-full max-w-5xl p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-yellow-500 mb-6">
            {state?.title}
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left - Thumbnail and Info */}
            <div className="space-y-4">
              <img
                src={state?.thumbnail?.secure_url}
                alt="Course Thumbnail"
                className="w-full h-64 object-cover rounded-md border border-yellow-600"
              />

              <div className="text-center space-y-1 text-lg">
                <p className="font-semibold">
                  Total Lectures: <span className="text-yellow-400">{state?.numberOfLectures}</span>
                </p>
                <p className="font-semibold">
                  Instructor: <span className="text-yellow-400">{state?.createdBy}</span>
                </p>
              </div>
            </div>

            {/* Right - Description & Button */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <p className="text-yellow-400 font-semibold text-lg mb-2">
                  Course Description:
                </p>
                <p className="text-base leading-relaxed text-gray-300">
                  {state?.description}
                </p>
              </div>

              <div>
                {role === "ADMIN" || data?.subscription?.status === "active" ? (
                  <button
                    onClick={() => navigate("/course/displaylecture", { state: { ...state } })}
                    className="w-full py-3 bg-yellow-600 text-xl font-bold rounded-md hover:bg-yellow-500 transition"
                  >
                    Watch Lectures
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full py-3 bg-yellow-600 text-xl font-bold rounded-md hover:bg-yellow-500 transition"
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescripition;
