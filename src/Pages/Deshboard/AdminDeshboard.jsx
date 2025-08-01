 import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse, getAllCourse } from "../../Redux/Slices/CourseSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);
  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );
  const myCourses = useSelector((state) => state?.course?.courseData);

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["#facc15", "#22c55e"],
        borderWidth: 1,
        borderColor: ["#facc15", "#22c55e"],
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales/Month",
        data: monthlySalesRecord,
        backgroundColor: "#ef4444",
      },
    ],
  };

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        await dispatch(getAllCourse());
      }
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourse());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] py-10 px-4 flex flex-col gap-14 text-white">
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-yellow-400">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-10 mx-auto w-full max-w-6xl">
          <div className="flex flex-col items-center gap-8 p-6 bg-neutral-900 rounded-2xl shadow-xl">
            <div className="w-80 h-80">
              <Pie data={userData} />
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-800 shadow">
                <div className="text-center">
                  <p className="text-sm text-gray-300">Registered Users</p>
                  <h3 className="text-3xl font-bold text-yellow-400">{allUsersCount}</h3>
                </div>
                <FaUsers className="text-yellow-400 text-4xl" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-800 shadow">
                <div className="text-center">
                  <p className="text-sm text-gray-300">Subscribed Users</p>
                  <h3 className="text-3xl font-bold text-green-400">{subscribedCount}</h3>
                </div>
                <FaUsers className="text-green-400 text-4xl" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 p-6 bg-neutral-900 rounded-2xl shadow-xl">
            <div className="w-full h-80 relative">
              <Bar data={salesData} className="absolute bottom-0 h-full w-full" />
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-800 shadow">
                <div className="text-center">
                  <p className="text-sm text-gray-300">Subscription Count</p>
                  <h3 className="text-3xl font-bold text-yellow-400">{allPayments?.count}</h3>
                </div>
                <FcSalesPerformance className="text-4xl" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-800 shadow">
                <div className="text-center">
                  <p className="text-sm text-gray-300">Total Revenue</p>
                  <h3 className="text-3xl font-bold text-green-400">
                    ₹{allPayments?.count * 499}
                  </h3>
                </div>
                <GiMoneyStack className="text-4xl text-green-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Courses Overview</h2>
            <button
              onClick={() => navigate("/course/create")}
              className="bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 px-6 py-2 rounded-lg font-medium"
            >
              Create New Course
            </button>
          </div>

          <div className="overflow-x-auto bg-neutral-900 rounded-xl shadow-md">
            <table className="table-auto w-full text-left">
              <thead className="bg-neutral-800 text-gray-300">
                <tr>
                  <th className="px-4 py-3">S No</th>
                  <th className="px-4 py-3">Course Title</th>
                  <th className="px-4 py-3">Course Category</th>
                  <th className="px-4 py-3">Instructor</th>
                  <th className="px-4 py-3">Total Lectures</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {myCourses?.map((course, idx) => (
                  <tr key={course._id} className="border-b border-neutral-700">
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">
                      <textarea
                        readOnly
                        value={course?.title}
                        className="bg-transparent w-40 resize-none"
                      />
                    </td>
                    <td className="px-4 py-2">{course?.category}</td>
                    <td className="px-4 py-2">{course?.createdBy}</td>
                    <td className="px-4 py-2">{course?.numberOfLectures}</td>
                    <td className="px-4 py-2">
                      <textarea
                        readOnly
                        value={course?.description}
                        className="bg-transparent w-80 resize-none"
                      />
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() =>
                          navigate("/course/displaylecture", { state: { ...course } })
                        }
                        className="bg-green-500 hover:bg-green-600 p-2 rounded-md text-white text-lg"
                      >
                        <BsCollectionPlayFill />
                      </button>
                      <button
                        onClick={() =>
                          navigate("/course/edit", { state: { ...course } })
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-md text-white text-lg"
                      >
                        <TiEdit />
                      </button>
                      <button
                        onClick={() => onCourseDelete(course?._id)}
                        className="bg-red-500 hover:bg-red-600 p-2 rounded-md text-white text-lg"
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AdminDashboard;
