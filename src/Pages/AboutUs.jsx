import Carousel from "../Helpers/Carousel"

 import HomeLayout from "../Layouts/HomeLayout"
import illustration from "../Assets/Images/about.svg";

function About() {
  return (
    <HomeLayout>
      <div className="pt-16 text-white flex flex-col items-center mx-6 lg:mx-16">
        {/* Top Section - Text + Illustration */}
        <div className="flex flex-col-reverse lg:flex-row  w-full max-w-7xl">
          {/* Left Side - Text */}
          <div className="w-full lg:w-1/2 space-y-8">
            <h1 className="text-5xl font-bold leading-tight pt-10">Empowering Education for the Digital Age</h1>
            <p className="text-lg text-gray-300">
              At LearnHub, we believe in making quality education accessible to everyone. Our platform offers a wide
              range of expertly designed courses, interactive lessons, and hands-on projects to help learners at all
              levels achieve their goals.
            </p>
            <p className="text-lg text-gray-400">
              Whether you're a student, a professional looking to upskill, or simply curious, we're here to guide your
              learning journey — one step at a time.
            </p>
          </div>

          {/* Right Side - Illustration */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={illustration}
              alt="Online learning illustration"
              className="w-[45%] max-w-md object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Carousel Section */}
        <div className="w-full mt-14">
          <h2 className="text-3xl font-semibold text-center mb-6">What Our Learners Are Exploring</h2>
          <Carousel />
        </div>
      </div>
    </HomeLayout>
  );
}

export default About;
