 import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    description: "",
    createdBy: "",
    thumbnail: null,
    previewImage: "",
  });

  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.onloadend = () => {
        setUserInput((prev) => ({
          ...prev,
          previewImage: fileReader.result,
          thumbnail: uploadedImage,
        }));
      };
    }
  };

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const OnFormSubmit = async (e) => {
    e.preventDefault();
    const { title, category, description, createdBy, thumbnail } = userInput;
    if (!title || !category || !description || !createdBy || !thumbnail) {
      toast.error("All fields are required");
      return;
    }

    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      toast.success("Course created successfully!");
      setUserInput({
        title: "",
        category: "",
        description: "",
        createdBy: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <form
          onSubmit={OnFormSubmit}
          className="bg-gray-900 text-white w-[90vw] max-w-4xl p-6 rounded-lg shadow-[0_0_20px_black] relative"
        >
          <Link
            to="/courses"
            className="absolute left-4 top-4 text-xl text-yellow-500 hover:text-yellow-400"
          >
            <AiOutlineArrowLeft />
          </Link>

          <h1 className="text-center text-3xl font-bold mb-6">Create New Course</h1>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Thumbnail Section */}
            <div className="flex flex-col gap-4">
              <label htmlFor="image_uploads" className="cursor-pointer group">
                {userInput.previewImage ? (
                  <img
                    src={userInput.previewImage}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-md border-2 border-yellow-500 group-hover:opacity-80 transition"
                  />
                ) : (
                  <div className="w-full h-48 border-2 border-dashed border-yellow-500 flex items-center justify-center rounded-md text-center px-4">
                    <span className="font-semibold text-yellow-400">
                      Click to upload course thumbnail
                    </span>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="image_uploads"
                name="image_uploads"
                accept=".jpg, .jpeg, .png"
                className="hidden"
                onChange={handleImageUpload}
              />

              <div className="flex flex-col">
                <label htmlFor="title" className="font-semibold text-lg mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={userInput.title}
                  onChange={handleUserInput}
                  placeholder="Enter course title"
                  className="px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-yellow-500"
                />
              </div>
            </div>

            {/* Text Inputs */}
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="createdBy" className="font-semibold text-lg mb-1">
                  Course Instructor
                </label>
                <input
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                  placeholder="Enter instructor name"
                  className="px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-yellow-500 w-full"
                />
              </div>

              <div>
                <label htmlFor="category" className="font-semibold text-lg mb-1">
                  Course Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={userInput.category}
                  onChange={handleUserInput}
                  placeholder="Enter course category"
                  className="px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-yellow-500 w-full"
                />
              </div>

              <div>
                <label htmlFor="description" className="font-semibold text-lg mb-1">
                  Course Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={userInput.description}
                  onChange={handleUserInput}
                  placeholder="Enter course description"
                  rows="4"
                  className="px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-yellow-500 w-full resize-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full py-3 rounded-md bg-yellow-600 hover:bg-yellow-500 transition text-lg font-semibold"
          >
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
