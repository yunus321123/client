 import { useEffect, useState } from "react";
import { MdAutoDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {
  deleteCourseLecture,
  getCourseLectures,
} from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state: courseDetails } = useLocation();

  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Handle delete lecture
  async function handleLectureDelete(courseId, lectureId) {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      await dispatch(deleteCourseLecture({ courseId, lectureId }));
      await dispatch(getCourseLectures(courseId));
    }
  }

  // Fetch course lectures on mount
  useEffect(() => {
    if (!courseDetails) {
      navigate("/course");
      return;
    }

    dispatch(getCourseLectures(courseDetails._id));
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
        <h2 className="text-center text-2xl font-semibold text-yellow-500">
          Course Name: {courseDetails?.title}
        </h2>

        {lectures && lectures.length > 0 ? (
          <div className="flex flex-col md:flex-row justify-center gap-10 w-full">
            {/* Left: Video and details */}
            <div className="space-y-5 md:w-[28rem] md:h-[35rem] p-2 rounded-lg shadow-[0_0_10px_black]">
              <video
                src={lectures[currentVideoIndex]?.lecture?.secure_url}
                className="object-fill rounded-tl-lg rounded-tr-lg max-h-96 w-full"
                controls
                controlsList="nodownload"
                muted
                disablePictureInPicture
              />

              <div>
                <h3>
                  <span className="text-yellow-500">Title: </span>
                  {lectures[currentVideoIndex]?.title}
                </h3>
                <p>
                  <span className="text-yellow-500">Description: </span>
                  {lectures[currentVideoIndex]?.description}
                </p>
              </div>
            </div>

            {/* Right: Lecture list */}
            <div className="md:w-[28rem] md:h-[35rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4 overflow-y-auto">
              <div className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p>Lectures List</p>

                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: courseDetails })
                    }
                    className="btn btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                  >
                    Add New Lecture
                  </button>
                )}
              </div>

              <ul className="space-y-4">
                {lectures.map((lecture, idx) => (
                  <li
                    key={lecture._id}
                    className="flex justify-between items-center"
                  >
                    <p
                      className="cursor-pointer text-white"
                      onClick={() => setCurrentVideoIndex(idx)}
                    >
                      <span className="text-md">
                        Lecture {idx + 1}:
                      </span>{" "}
                      {lecture?.title}
                    </p>

                    {role === "ADMIN" && (
                      <button
                        onClick={() =>
                          handleLectureDelete(courseDetails._id, lecture._id)
                        }
                        className="font-semibold text-2xl text-red-500 hover:text-red-700"
                      >
                        <MdAutoDelete />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          role === "ADMIN" && (
            <button
              onClick={() =>
                navigate("/course/addlecture", { state: courseDetails })
              }
              className="btn btn-active btn-primary px-4 py-2 rounded-md font-semibold text-lg"
            >
              Add New Lecture
            </button>
          )
        )}
      </div>
    </HomeLayout>
  );
}

export default DisplayLectures;
