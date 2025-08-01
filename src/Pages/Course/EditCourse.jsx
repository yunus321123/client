 import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { updateCourse } from "../../Redux/Slices/CourseSlice";

function EditCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [userInput, setUserInput] = useState({
    id: state?._id,
    title: state?.title || "",
    category: state?.category || "",
    description: state?.description || "",
    createdBy: state?.createdBy || "",
    thumbnail: null,
    previewImage: state?.thumbnail?.secure_url || "",
  });

  function handleImageUpload(e) {
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const reader = new FileReader();
      reader.readAsDataURL(uploadedImage);
      reader.onload = function () {
        setUserInput((prev) => ({
          ...prev,
          previewImage: reader.result,
          thumbnail: uploadedImage,
        }));
      };
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    const { title, category, description } = userInput;
    if (!title || !category || !description) {
      toast.error("All fields are mandatory");
      return;
    }

    const response = await dispatch(updateCourse(userInput));
    if (response?.payload?.success) {
      toast.success("Course updated successfully");
      navigate("/courses");
    } else {
      toast.error("Failed to update course");
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[100vh] px-4">
        <form
          onSubmit={onFormSubmit}
          className="w-full md:w-[700px] flex flex-col gap-6 p-6 sm:my-10 bg-black bg-opacity-40 text-white shadow-[0_0_10px_black] rounded-lg relative"
        >
          <Link to="/" className="absolute left-3 top-3 text-lg text-accent">
            <AiOutlineArrowLeft />
          </Link>

          <h1 className="text-center text-2xl font-bold">Edit Course</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left side */}
            <div className="flex flex-col gap-4">
              <label htmlFor="image_uploads" className="cursor-pointer">
                {userInput.previewImage ? (
                  <img
                    src={userInput.previewImage}
                    alt="thumbnail preview"
                    className="w-full h-44 object-cover border"
                  />
                ) : (
                  <div className="w-full h-44 border flex items-center justify-center">
                    <span className="text-lg font-semibold">
                      Upload course thumbnail
                    </span>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="image_uploads"
                name="image_uploads"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-lg font-semibold">
                  Course Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter course title"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="createdBy" className="text-lg font-semibold">
                  Course Instructor
                </label>
                <input
                  type="text"
                  id="createdBy"
                  name="createdBy"
                  placeholder="Enter instructor name"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-lg font-semibold">
                  Course Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  placeholder="Enter category"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.category}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-lg font-semibold">
                  Course Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  className="bg-transparent px-2 py-1 border h-24 resize-none"
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 py-2 rounded-sm text-lg font-semibold transition-all duration-300"
          >
            Update Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default EditCourse;
