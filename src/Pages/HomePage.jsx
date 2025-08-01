 import { Link } from "react-router-dom";
import homeimg from '../Assets/Images/homePageMainImage.png';
import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {
    return (
        <HomeLayout>
            <section className="min-h-[90vh] flex items-center justify-center px-4 sm:px-8 lg:px-16 bg-gradient-to-br from-gray-900 to-black">
                <div className="flex flex-col-reverse md:flex-row items-center gap-10 w-full max-w-7xl py-10">
                    
                    {/* Left Section - Text */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            Find the best{" "}
                            <span className="text-yellow-400 drop-shadow-md">
                                Online Courses
                            </span>
                        </h1>
                        <p className="text-gray-300 text-lg sm:text-xl max-w-xl">
                            Explore our extensive library of courses taught by expert educators — all available at affordable prices.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link to="/courses">
                                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg px-6 py-3 rounded-xl shadow transition duration-300">
                                    Explore Courses
                                </button>
                            </Link>
                            <Link to="/contact">
                                <button className="border border-yellow-400 hover:bg-yellow-500 hover:text-black text-yellow-400 font-semibold text-lg px-6 py-3 rounded-xl transition duration-300">
                                    Contact Us
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Section - Image */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img 
                            src={homeimg} 
                            alt="Learning Platform Banner" 
                            className="w-full max-w-md sm:max-w-lg lg:max-w-xl animate-fade-in-up rounded-lg"
                        />
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}

export default HomePage;
