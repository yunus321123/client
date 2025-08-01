 import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../Compontents/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourse } from "../../Redux/Slices/CourseSlice";

function CourseList() {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllCourse());
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-16 px-4 sm:px-8 md:px-12 lg:px-20 text-white">
        <h1 className="text-center text-3xl sm:text-4xl font-semibold mb-10">
          Explore Courses by{" "}
          <span className="text-yellow-500 font-bold">Industry Experts</span>
        </h1>

        {courseData?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
            {courseData.map((course) => (
              <CourseCard key={course._id} data={course} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg mt-10 text-gray-300">
            No courses available at the moment. Please check back later.
          </p>
        )}
      </div>
    </HomeLayout>
  );
}

export default CourseList;
