 import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";

import HomeLayout from "../../Layouts/HomeLayout";
import { addCourseLectures } from "../../Redux/Slices/LectureSlice";

function AddCourseLectures() {
  const { state: courseDetails } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [lectureData, setLectureData] = useState({
    id: courseDetails?._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  // Handle text inputs (title, description)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLectureData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle video file input
  const handleVideo = (e) => {
    const file = e.target.files[0];
    const preview = window.URL.createObjectURL(file);

    setLectureData((prev) => ({
      ...prev,
      lecture: file,
      videoSrc: preview,
    }));
  };

  // Form submission handler
  const onFormSubmit = async (e) => {
    e.preventDefault();

    const { lecture, title, description } = lectureData;
    if (!lecture || !title || !description) {
      toast.error("All fields are required");
      return;
    }

    const response = await dispatch(addCourseLectures(lectureData));

    if (response?.payload?.success) {
      toast.success("Lecture added successfully");
      setLectureData({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
      navigate(-1);
    }
  };

  // Redirect if course details not found
  useEffect(() => {
    if (!courseDetails) navigate("/courses");
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center text-white px-4 sm:px-16 md:px-20">
        <div className="w-full max-w-md p-6 rounded-lg shadow-[0_0_10px_black] bg-black/20">
          <header className="relative mb-4 flex items-center justify-center">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 text-2xl text-green-500"
            >
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl font-semibold text-yellow-500">
              Add New Lecture
            </h1>
          </header>

          <form onSubmit={onFormSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              placeholder="Lecture Title"
              value={lectureData.title}
              onChange={handleInputChange}
              className="bg-transparent border px-3 py-2 rounded"
            />

            <textarea
              name="description"
              placeholder="Lecture Description"
              value={lectureData.description}
              onChange={handleInputChange}
              className="bg-transparent border px-3 py-2 rounded resize-none h-32 overflow-y-scroll"
            />

            {lectureData.videoSrc ? (
              <video
                src={lectureData.videoSrc}
                controls
                muted
                controlsList="nodownload nofullscreen"
                disablePictureInPicture
                className="w-full rounded"
              />
            ) : (
              <label
                htmlFor="lecture"
                className="h-48 border flex items-center justify-center cursor-pointer rounded"
              >
                <span className="font-medium text-sm text-center text-white/80">
                  Click to choose video file
                </span>
                <input
                  type="file"
                  id="lecture"
                  name="lecture"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideo}
                />
              </label>
            )}

            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded transition duration-200"
            >
              Upload Lecture
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AddCourseLectures;
