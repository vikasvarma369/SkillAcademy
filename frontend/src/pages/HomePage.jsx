import React from "react";
import { Link } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import homePageMainImage from '../assets/Images/homePageMainImage.png';

export default function HomePage() {
  return (
    <HomeLayout>
      <section className="md:py-10 py-7 mb-10 text-white flex md:flex-row flex-col-reverse items-center justify-center md:gap-10 gap-7 md:px-16 px-6 min-h-[85vh]">
        <div className="md:w-1/2 w-full space-y-7">
          <h1 className="md:text-5xl text-6xl font-semibold text-gray-900 dark:text-gray-200">
            Find out best
            <span className="text-yellow-500 font-bold font-open-sans">Online Courses</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-300 font-inter">
            We have a large library of courses taught by highly skilled and
            qualified faculties at a very affordable cost.
          </p>

          <div className="space-x-6 flex">
            <Link to="/courses">
              <button className="bg-yellow-500 hover:border-white hover:border hover:text-yellow-500 hover:bg-transparent  font-semibold text-gray-800 md:px-5 px-3 md:py-3 py-3 rounded-md  md:text-lg cursor-pointer transition-all ease-in-out duration-300">
                Explore courses
              </button>
            </Link>

            <Link to="/contact">
              <button className="border border-yellow-500 hover:text-yellow-500 hover:border-white text-gray-700 dark:text-white px-5 py-3 rounded-md font-semibold md:text-lg text-base cursor-pointer  transition-all ease-in-out duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 w-1/7 flex items-center justify-center">
          <img alt="homepage image" src={homePageMainImage} />
        </div>
      </section>
    </HomeLayout>
  );
}
